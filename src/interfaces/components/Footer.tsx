import { EasterEgg } from "./EasterEgg";

/**
 * Site footer: copyright text plus a few navigation links.
 *
 * Pure presentation component (interfaces/adapters layer) — no business
 * logic. The full-width band is provided by the surrounding footer slot
 * in BaseLayout; this component lays out its own content responsively.
 */
export function Footer() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Team", href: "/api/team-members" },
    { label: "GitHub", href: "https://github.com" },
  ];

  return (
    <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
      <p className="flex items-center gap-1.5">
        © 2026 TEAMTEST. All rights reserved.
        <EasterEgg />
      </p>
      <nav aria-label="Footer">
        <ul className="flex items-center gap-4">
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
