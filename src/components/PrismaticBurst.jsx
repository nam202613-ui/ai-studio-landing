import { useEffect, useRef, memo } from 'react';

const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;
precision highp int;
out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;
uniform float uIntensity;
uniform float uSpeed;
uniform vec2 uMouse;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 20.0, -uTime * 14.0), 512.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.50 * hash21(q);
    n += 0.30 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0);
    return n;
}

vec3 rayDir(vec2 frag, vec2 res, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * frag - res, focal));
}

float edgeFade(vec2 frag, vec2 res){
    vec2 toC = frag - 0.5 * res;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    return pow(q * 0.5, 1.5);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0,s, 0,1,0, -s,0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0, s,c,0, 0,0,1); }

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    return 0.8 * sin(q.x * 0.55 + t * 0.6)
         + 0.7 * sin(q.y * 0.50 - t * 0.5)
         + 0.6 * sin(q.z * 0.60 + t * 0.7);
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    vec3 dir = rayDir(frag, uResolution, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = 0.15;

    vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
    mat3 rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);

    for (int i = 0; i < 24; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));
        Pl = rot3dMat * Pl;

        float stepLen = min(rad - 0.3, n * 0.1) + 0.1;
        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

        float rayPattern = smoothstep(0.5, 0.7,
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))
        );

        vec3 spectral = 1.0 + vec3(
            cos(marchT * 3.0),
            cos(marchT * 3.0 + 1.0),
            cos(marchT * 3.0 + 2.0)
        );

        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        col += base * rayPattern;
        marchT += stepLen;
    }

    col *= edgeFade(frag, uResolution);
    col *= uIntensity;
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const PrismaticBurst = memo(({
  intensity = 1.5,
  speed = 0.3,
  mixBlendMode = 'screen'
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(performance.now());
  const mouseRef = useRef([0.5, 0.5]);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    if (mixBlendMode && mixBlendMode !== 'none') {
      canvas.style.mixBlendMode = mixBlendMode;
    }
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    glRef.current = gl;

    const compileShader = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vertexShader);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    programRef.current = program;

    const vertices = new Float32Array([-1,-1, 0,0, 1,-1, 1,0, -1,1, 0,1, 1,1, 1,1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    const uvLoc = gl.getAttribLocation(program, 'uv');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

    const uniforms = {};
    ['uResolution', 'uTime', 'uIntensity', 'uSpeed', 'uMouse'].forEach(name => {
      uniforms[name] = gl.getUniformLocation(program, name);
    });

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      entries => { isVisibleRef.current = entries[0]?.isIntersecting ?? false; },
      { threshold: 0.01 }
    );
    io.observe(container);

    const onMouse = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = [
        Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
        Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
      ];
    };
    container.addEventListener('pointermove', onMouse, { passive: true });

    let lastTime = performance.now();

    const render = (now) => {
      const dt = (now - lastTime) * 0.001;
      lastTime = now;

      if (isVisibleRef.current && !document.hidden) {
        const t = (now - startTimeRef.current) * 0.001;
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.uTime, t * speed);
        gl.uniform1f(uniforms.uIntensity, intensity);
        gl.uniform1f(uniforms.uSpeed, 1.0);
        gl.uniform2f(uniforms.uMouse, mouseRef.current[0], mouseRef.current[1]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      animFrameRef.current = requestAnimationFrame(render);
    };
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      container.removeEventListener('pointermove', onMouse);
      ro.disconnect();
      io.disconnect();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current && mixBlendMode) {
      canvasRef.current.style.mixBlendMode = mixBlendMode !== 'none' ? mixBlendMode : '';
    }
  }, [mixBlendMode]);

  return <div ref={containerRef} className="w-full h-full relative overflow-hidden" />;
});

PrismaticBurst.displayName = 'PrismaticBurst';

export default PrismaticBurst;
