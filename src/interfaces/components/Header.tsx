/**
 * Site header: brand text plus primary navigation links.
 *
 * Pure presentation component (interfaces/adapters layer) — no business
 * logic. The full-width band is provided by the surrounding header slot
 * in BaseLayout; this component lays out its own content responsively.
 */
export function Header() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Team", href: "/#team" },
  ];

  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      <a href="/" className="text-lg font-bold tracking-tight text-brand">
        TEAMTEST
      </a>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-4 text-sm text-slate-600">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
