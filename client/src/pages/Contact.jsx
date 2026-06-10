export default function Contact() {
  return (
    <div className="min-h-screen relative px-6 py-16 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
        <div className="absolute inset-0 bg-gray-900/65" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl shadow-black/20 backdrop-blur md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">Contact us</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Let’s make your next trip feel effortless.</h1>
          <p className="mt-5 max-w-xl text-lg text-slate-200">Need help with stays, bookings, or recommendations? Reach out and our team will guide you in the best direction.</p>
          <ul className="mt-8 space-y-4 text-slate-100">
            <li>📧 hello@findstays.example</li>
            <li>📞 +62 812 3456 7890</li>
            <li>📍 Jakarta, Indonesia</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/60">
          <h2 className="text-2xl font-bold text-slate-900">Send a quick note</h2>
          <p className="mt-2 text-slate-600">We usually reply within one business day.</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Your name" />
            <input required type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Email address" />
            <textarea required className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="How can we help?" />
            <button type="submit" className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700">Send message</button>
          </form>
        </section>
      </div>
    </div>
  );
}
