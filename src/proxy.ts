import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/en/dashboard")) {
    return updateSession(request, requestHeaders);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
