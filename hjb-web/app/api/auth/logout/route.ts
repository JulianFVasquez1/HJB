import { NextResponse } from "next/server";
import { clearAdminSession } from "@/src/modules/auth/auth.middleware";

export async function POST() {
  await clearAdminSession();
  return NextResponse.json({ success: true });
}
