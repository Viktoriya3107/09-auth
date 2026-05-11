import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  const isAuthPage =
    req.nextUrl.pathname.startsWith('/sign-in') ||
    req.nextUrl.pathname.startsWith('/sign-up')

  const isPrivatePage =
    req.nextUrl.pathname.startsWith('/profile') ||
    req.nextUrl.pathname.startsWith('/notes')

  let validToken = accessToken

  
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

        
        const setCookie = res.headers.get('set-cookie')

        if (setCookie) {
          response.headers.set('set-cookie', setCookie)
        }

        return response
      }
    } catch {}
  }

  
  if (!validToken && isPrivatePage) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  
  if (validToken && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
}