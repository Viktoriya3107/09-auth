import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value

  const isAuthPage =
    req.nextUrl.pathname.startsWith('/sign-in') ||
    req.nextUrl.pathname.startsWith('/sign-up')

  const isPrivatePage =
    req.nextUrl.pathname.startsWith('/profile') ||
    req.nextUrl.pathname.startsWith('/notes')

  
  if (!token && isPrivatePage) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

 
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', req.url))
  }

  return NextResponse.next()
}


export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
}