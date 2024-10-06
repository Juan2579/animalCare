import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith("/sign-in")) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (user && request.nextUrl.pathname.startsWith("/sign-in")) {
    // user is logged in, potentially respond by redirecting the user to the home page
    const url = request.nextUrl.clone();
    url.pathname = "/animales";
    return NextResponse.redirect(url);
  }

  if (
    user &&
    !["/animales", "/usuarios", "/usuarios/crearUsuario"].includes(
      request.nextUrl.pathname
    )
  ) {
    // user is logged in, but trying to enter to unexisting pages
    const url = request.nextUrl.clone();
    url.pathname = "/animales";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
