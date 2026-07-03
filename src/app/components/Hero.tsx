/**
 * Presentational hero section. Pure UI — no business logic, no data access.
 */
export function Hero() {
  return (
    <section className="flex flex-col items-center px-6 py-16 text-center sm:py-24">
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
        Build your team on a <span className="text-brand">clean foundation</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600 sm:text-xl">
        TEAMTEST keeps your team roster simple, structured, and ready to scale.
      </p>
      <a
        href="#team"
        className="mt-8 inline-block rounded-lg bg-brand px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        Get started
      </a>
    </section>
  );
}
