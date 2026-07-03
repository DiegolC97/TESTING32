import { BaseLayout } from "@interfaces/components/BaseLayout";
import { Footer } from "@interfaces/components/Footer";

/**
 * Landing page rendered at the root route ("/").
 *
 * Uses the BaseLayout presentation shell to lay out a responsive page
 * with header, main, and footer slots. Slot contents below are
 * placeholders to be filled in by later landing-page tasks.
 */
export default function HomePage() {
  return (
    <BaseLayout
      header={
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-brand">
            TEAMTEST
          </span>
          {/* Placeholder: primary navigation goes here */}
          <nav aria-label="Primary" className="text-sm text-slate-500">
            Nav
          </nav>
        </div>
      }
      footer={<Footer />}
    >
      {/* Placeholder: main landing content (hero, features, etc.) goes here */}
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Welcome to TEAMTEST
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Next.js · TypeScript · Tailwind CSS · Clean Architecture
        </p>
      </section>
    </BaseLayout>
  );
}
