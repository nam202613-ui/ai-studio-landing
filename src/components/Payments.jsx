import { useState } from 'react';

const PACKAGES = [
  { id: 'free', name: 'Free', credits: 30, price: 0, current: true },
  { id: 'basic', name: 'Basic', credits: 500, price: 199000 },
  { id: 'pro', name: 'Pro', credits: 2000, price: 499000, popular: true },
  { id: 'business', name: 'Business', credits: 10000, price: 1999000 },
];

const TRANSACTIONS = [
  { id: 1, date: '30/05/2026', description: 'Đăng ký tài khoản - Free Plan', amount: 30, type: 'bonus' },
  { id: 2, date: '30/05/2026', description: 'Tạo ảnh cyberpunk city', amount: -4, type: 'usage' },
  { id: 3, date: '30/05/2026', description: 'Chat với GPT-5.5 Mini', amount: -1, type: 'usage' },
  { id: 4, date: '29/05/2026', description: 'Tạo video sunset timelapse', amount: -10, type: 'usage' },
  { id: 5, date: '29/05/2026', description: 'Nhập mã WELCOME100', amount: 100, type: 'bonus' },
];

const Payments = () => {
  const [showBuyModal, setShowBuyModal] = useState(false);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Thanh toán</h1>
          <p className="text-gray-500 text-sm">Quản lý credits và lịch sử giao dịch</p>
        </div>
        <button
          onClick={() => setShowBuyModal(true)}
          className="bg-[#ff6b00] hover:bg-[#ff7a1a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          + Mua thêm credits
        </button>
      </div>

      {/* Current Balance */}
      <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-400 text-sm mb-1">Số dư hiện tại</div>
            <div className="text-4xl font-bold text-white">30 <span className="text-lg text-gray-400">credits</span></div>
          </div>
          <div className="text-6xl">⚡</div>
        </div>
        <div className="mt-4 flex gap-3">
          <button className="bg-white/[0.1] hover:bg-white/[0.15] text-white px-4 py-2 rounded-xl text-sm transition-colors">
            Nhập mã giftcode
          </button>
          <button className="bg-white/[0.1] hover:bg-white/[0.15] text-white px-4 py-2 rounded-xl text-sm transition-colors">
            Lịch sử giao dịch
          </button>
        </div>
      </div>

      {/* Packages */}
      <h3 className="text-white font-semibold mb-4">Gói credits</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PACKAGES.map(pkg => (
          <div
            key={pkg.id}
            className={`rounded-2xl p-5 border transition-all ${
              pkg.current
                ? 'bg-indigo-500/10 border-indigo-500/40'
                : pkg.popular
                ? 'bg-white/[0.03] border-[#ff6b00]/40'
                : 'bg-white/[0.03] border-white/[0.06] hover:border-white/[0.1]'
            }`}
          >
            {pkg.popular && (
              <div className="text-[10px] text-[#ff6b00] font-bold uppercase tracking-wider mb-2">Phổ biến nhất</div>
            )}
            <div className="text-white font-bold text-lg mb-1">{pkg.name}</div>
            <div className="text-yellow-400 font-bold text-sm mb-3">⚡ {pkg.credits.toLocaleString()} credits</div>
            <div className="text-white font-bold text-2xl mb-4">
              {pkg.price === 0 ? 'Miễn phí' : `${pkg.price.toLocaleString()}đ`}
              {pkg.price > 0 && <span className="text-gray-500 text-xs font-normal"> /tháng</span>}
            </div>
            <button
              className={`w-full py-2 rounded-xl text-sm font-semibold transition-colors ${
                pkg.current
                  ? 'bg-white/[0.06] text-gray-400 cursor-not-allowed'
                  : 'bg-white/[0.08] text-white hover:bg-white/[0.12]'
              }`}
              disabled={pkg.current}
            >
              {pkg.current ? 'Đang dùng' : 'Nâng cấp'}
            </button>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/[0.06]">
          <h3 className="text-white font-semibold">Lịch sử giao dịch</h3>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {TRANSACTIONS.map(tx => (
            <div key={tx.id} className="flex items-center gap-4 px-5 py-4">
              <span className="text-lg">
                {tx.type === 'bonus' ? '🎁' : '🎨'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm">{tx.description}</div>
                <div className="text-gray-600 text-xs">{tx.date}</div>
              </div>
              <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount} CR
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
