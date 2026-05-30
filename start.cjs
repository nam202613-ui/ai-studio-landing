const { execSync, spawn } = require('child_process');
const path = require('path');

const root = 'D:\\fas2_video\\landing-page';
process.chdir(root);

const child = spawn('node', [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'), '--port', '3003', '--host'], {
  cwd: root,
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => {
  console.error('Failed to start:', err);
});
