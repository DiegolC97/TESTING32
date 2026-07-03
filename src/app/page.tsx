import { container } from "@infrastructure/config/container";
import { TeamMemberController } from "@interfaces/http/TeamMemberController";
import { Hero } from "./components/Hero";

/**
 * Server Component acting as an entry point. It composes the interfaces
 * controller with the wired use cases from the composition root, then
 * renders the result. No business logic lives here.
 */
export default async function HomePage() {
  const controller = new TeamMemberController(
    container.createTeamMember,
    container.listTeamMembers,
  );
  const { body } = await controller.list();
  const members = body as Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    active: boolean;
  }>;

  return (
    <main className="mx-auto max-w-2xl px-6 pb-16">
      <Hero />

      <section
        id="team"
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 text-lg font-semibold">Team Members</h2>
        {members.length === 0 ? (
          <p className="text-slate-500">
            No team members yet. Create one via{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
              POST /api/team-members
            </code>
            .
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {members.map((m) => (
              <li key={m.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-slate-500">{m.email}</p>
                </div>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                  {m.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-8 text-center text-sm text-slate-400">
        Data flows: page → interfaces → application → domain
      </p>
    </main>
  );
}
