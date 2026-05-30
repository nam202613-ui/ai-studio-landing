const Dashboard = () => {
  const stats = [
    { label: 'Tổng credits đã dùng', value: '127', icon: '⚡', color: 'text-yellow-400' },
    { label: 'Ảnh đã tạo', value: '43', icon: '🎨', color: 'text-pink-400' },
    { label: 'Video đã tạo', value: '12', icon: '🎬', color: 'text-blue-400' },
    { label: 'Cuộc chat', value: '89', icon: '💬', color: 'text-green-400' },
  ];

  const recentActivity = [
    { type: 'image', title: 'Tạo ảnh cyberpunk city', time: '2 phút trước', credits: -4 },
    { type: 'chat', title: 'Chat với GPT-5.5 Mini', time: '15 phút trước', credits: -1 },
    { type: 'video', title: 'Tạo video sunset timelapse', time: '1 giờ trước', credits: -10 },
    { type: 'image', title: 'Tạo ảnh anime portrait', time: '3 giờ trước', credits: -4 },
    { type: 'chat', title: 'Chat với Claude Sonnet', time: '5 giờ trước', credits: -1 },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-1">Bảng điều khiển</h1>
      <p className="text-gray-500 text-sm mb-8">Tổng quan về hoạt động của bạn</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-gray-500 text-xs font-medium">{stat.label}</span>
            </div>
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Usage Chart Placeholder */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-8">
        <h3 className="text-white font-semibold mb-4">Lượt sử dụng 7 ngày qua</h3>
        <div className="flex items-end gap-2 h-40">
          {[35, 52, 28, 65, 42, 78, 45].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-indigo-500/30 rounded-t-lg relative" style={{ height: `${h}%` }}>
                <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg" style={{ height: `${h}%` }} />
              </div>
              <span className="text-[10px] text-gray-600">T{i + 2}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Hoạt động gần đây</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-white/[0.04] last:border-0">
              <span className="text-lg">
                {activity.type === 'image' ? '🎨' : activity.type === 'video' ? '🎬' : '💬'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{activity.title}</div>
                <div className="text-gray-600 text-xs">{activity.time}</div>
              </div>
              <span className={`text-sm font-semibold ${activity.credits < 0 ? 'text-red-400' : 'text-green-400'}`}>
                {activity.credits > 0 ? '+' : ''}{activity.credits} CR
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
