import { useState } from 'react';

const plans = [
  {
    name: 'Free',
    description: 'Dùng thử miễn phí',
    price: 0,
    credits: 50,
    features: [
      '50 credits miễn phí',
      'Tạo ảnh AI',
      'Độ phân giải HD',
      'Hỗ trợ cộng đồng',
    ],
    cta: 'Bắt đầu ngay',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Cho người sáng tạo',
    price: 199000,
    credits: 500,
    features: [
      '500 credits / tháng',
      'Tạo ảnh & video AI',
      'Độ phân giải 4K',
      'Xóa nền không giới hạn',
      'Phục chế ảnh cũ',
      'Hỗ trợ ưu tiên',
    ],
    cta: 'Nâng cấp Pro',
    popular: true,
  },
  {
    name: 'Business',
    description: 'Cho doanh nghiệp & nhóm',
    price: 499000,
    credits: 2000,
    features: [
      '2,000 credits / tháng',
      'Tất cả tính năng Pro',
      'Tích hợp API',
      'Xử lý hàng loạt',
      'Nhãn hiệu tùy chỉnh',
      'Hỗ trợ riêng biệt',
      'SLA 99.9%',
    ],
    cta: 'Liên hệ bán hàng',
    popular: false,
  },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4">
          Đầu tư cho sự sáng tạo
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
          Bắt đầu miễn phí, nâng cấp khi bạn cần nhiều hơn.
        </p>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-gray-500'}`}>Hàng tháng</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-indigo-500' : 'bg-gray-700'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${annual ? 'left-[26px]' : 'left-0.5'}`} />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-gray-500'}`}>
            Hàng năm
            <span className="ml-1.5 text-xs text-green-400 font-bold">-20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const price = annual && plan.price > 0 ? Math.floor(plan.price * 0.8) : plan.price;
            const display = price === 0 ? 'Miễn phí' : `${price.toLocaleString('vi-VN')}đ`;

            return (
              <div
                key={i}
                className={`relative p-6 rounded-2xl transition-all ${
                  plan.popular
                    ? 'bg-white/[0.06] border-2 border-indigo-500/40'
                    : 'bg-white/[0.02] border border-white/[0.06]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    Phổ biến nhất
                  </div>
                )}

                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{plan.name}</div>
                <div className="text-3xl font-extrabold text-white mb-1">{display}</div>
                {plan.price > 0 && <div className="text-sm text-gray-500 mb-4">/tháng</div>}
                {plan.price === 0 && <div className="text-sm text-gray-500 mb-4">{plan.description}</div>}

                <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-full mb-6">
                  {plan.credits.toLocaleString()} credits / tháng
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                    plan.popular
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-white/[0.06] text-white hover:bg-white/[0.12]'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
