const stats = [
  { value: '100%', label: 'Miễn phí & mã nguồn mở' },
  { value: '50+', label: 'Công cụ AI' },
  { value: '4K', label: 'Chất lượng Ultra HD' },
  { value: '24/7', label: 'Luôn luôn sẵn sàng' },
];

const Stats = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{stat.value}</div>
            <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
