import { NextRequest, NextResponse } from 'next/server'

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  const isAuthPage =
    req.nextUrl.pathname.startsWith('/sign-in') ||
    req.nextUrl.pathname.startsWith('/sign-up')

  const isPrivatePage =
    req.nextUrl.pathname.startsWith('/profile') ||
    req.nextUrl.pathname.startsWith('/notes')

  let validToken = accessToken

  // refresh flow
  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
        {
          headers: {
            Cookie: req.headers.get('cookie') || '',
          },
        }
      )

      const session = await res.json()

      if (session?.accessToken) {
        validToken = session.accessToken

        const response = NextResponse.next()
        response.cookies.set('accessToken', session.accessToken)

        return response
      }
    } catch {}
  }

  // protect private routes
  if (!validToken && isPrivatePage) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // redirect auth pages
  if (validToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
}