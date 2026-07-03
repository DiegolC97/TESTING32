import type { ReactNode } from "react";

interface BaseLayoutProps {
  /** Optional content rendered in the sticky page header slot. */
  header?: ReactNode;
  /** Optional content rendered in the page footer slot. */
  footer?: ReactNode;
  /** Main page content. */
  children: ReactNode;
}

/**
 * Presentation shell for full pages. Provides a responsive, centered
 * container and three structural slots: header, main, and footer.
 *
 * This is a pure presentation component (interfaces/adapters layer):
 * it holds no business logic and calls no use cases directly.
 */
export function BaseLayout({ header, footer, children }: BaseLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {header ? (
        <header className="border-b border-pink-200 bg-pink-50">
          <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      ) : null}

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {children}
        </div>
      </main>

      {footer ? (
        <footer className="border-t border-pink-200 bg-pink-50">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {footer}
          </div>
        </footer>
      ) : null}
    </div>
  );
}
