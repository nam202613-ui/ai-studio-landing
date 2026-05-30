import { useState } from 'react';

const Settings = () => {
  const [name, setName] = useState('Nam');
  const [email, setEmail] = useState('nam202613@gmail.com');
  const [language, setLanguage] = useState('vi');
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-1">Cài đặt</h1>
      <p className="text-gray-500 text-sm mb-8">Quản lý tài khoản và tùy chọn</p>

      {/* Profile */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">Thông tin tài khoản</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
            N
          </div>
          <div>
            <button className="bg-white/[0.06] text-white text-sm px-4 py-2 rounded-xl hover:bg-white/[0.1] transition-colors">
              Đổi ảnh đại diện
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1.5 block">Họ tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">Tùy chọn</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-sm">Ngôn ngữ</div>
              <div className="text-gray-600 text-xs">Chọn ngôn ngữ hiển thị</div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-sm">Giao diện</div>
              <div className="text-gray-600 text-xs">Chọn theme cho ứng dụng</div>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            >
              <option value="dark">Tối</option>
              <option value="light">Sáng</option>
              <option value="system">Hệ thống</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-sm">Thông báo</div>
              <div className="text-gray-600 text-xs">Nhận thông báo qua email</div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${notifications ? 'bg-indigo-500' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notifications ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">Bảo mật</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.04] rounded-xl text-sm text-white hover:bg-white/[0.06] transition-colors">
            <span>Đổi mật khẩu</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.04] rounded-xl text-sm text-white hover:bg-white/[0.06] transition-colors">
            <span>Bật xác thực 2 lớp</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.04] rounded-xl text-sm text-white hover:bg-white/[0.06] transition-colors">
            <span>Phiên đăng nhập</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
        <h3 className="text-red-400 font-semibold mb-2">Vùng nguy hiểm</h3>
        <p className="text-gray-500 text-sm mb-4">Các hành động không thể hoàn tác</p>
        <button className="bg-red-500/10 text-red-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors">
          Xóa tài khoản
        </button>
      </div>

      {/* Save */}
      <div className="flex justify-end mt-6">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default Settings;
