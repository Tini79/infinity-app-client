"use client"
import { NextRequest, NextResponse } from 'next/server'
// import { handleIsAuth } from './app/lib/config';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (token) {
    // handleIsAuth({ isLogged: true })
    if (req.nextUrl.pathname == '/login' || req.nextUrl.pathname == '/registration') return NextResponse.redirect(new URL('/', req.nextUrl))
  } else {
    if (req.nextUrl.pathname == '/logout') return NextResponse.redirect(new URL('/', req.nextUrl))
  }
}

export const config = {
  matcher: ['/(login|registration|logout)']
}
