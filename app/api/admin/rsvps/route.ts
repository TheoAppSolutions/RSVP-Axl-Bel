import { NextResponse } from "next/server";
import rsvps from "@/lib/admin-rsvps.json";

export const dynamic = "force-dynamic";

function authorize(req: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return NextResponse.json({ error: "Admin dashboard is not configured" }, { status: 503 });
  }
  if (req.headers.get("x-admin-password") !== password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function GET(req: Request) {
  const unauthorized = authorize(req);
  if (unauthorized) return unauthorized;

  return NextResponse.json({ rsvps }, { headers: { "Cache-Control": "no-store" } });
}
