/**
 * Presentational features section. Pure UI — no business logic, no data access.
 *
 * Renders a small set of content cards in a responsive grid that stacks on
 * mobile and spreads to three columns on larger screens.
 */
const features = [
  {
    icon: "🧱",
    title: "Clean foundation",
    text: "A layered architecture keeps your domain logic isolated and easy to reason about.",
  },
  {
    icon: "⚡",
    title: "Ready to scale",
    text: "Swap infrastructure without touching your business rules as your team grows.",
  },
  {
    icon: "🧩",
    title: "Simple to extend",
    text: "Add new features by composing existing use cases instead of rewriting them.",
  },
];

export function Features() {
  return (
    <section className="mx-auto mb-12 max-w-6xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <span className="text-3xl" aria-hidden="true">
              {feature.icon}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
