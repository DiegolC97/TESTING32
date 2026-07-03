import { NextResponse } from "next/server";
import { container } from "@infrastructure/config/container";
import { TeamMemberController } from "@interfaces/http/TeamMemberController";

/**
 * Framework glue (Next.js Route Handler). It translates the Next Request
 * into a plain value, delegates to the interfaces controller, and turns
 * the controller's result back into a NextResponse.
 */
function makeController(): TeamMemberController {
  return new TeamMemberController(
    container.createTeamMember,
    container.listTeamMembers,
  );
}

export async function GET() {
  const result = await makeController().list();
  return NextResponse.json(result.body, { status: result.status });
}

export async function POST(request: Request) {
  let rawBody: unknown = null;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const result = await makeController().create(rawBody);
  return NextResponse.json(result.body, { status: result.status });
}
