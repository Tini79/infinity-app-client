"use client"
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (token) {    
    if (req.nextUrl.pathname == '/login' || req.nextUrl.pathname == '/registration') return NextResponse.redirect(new URL('/', req.nextUrl))
  } else {
    if (req.nextUrl.pathname == '/logout') return NextResponse.redirect(new URL('/', req.nextUrl))
  }
}

export const config = {
  matcher: ['/(login|registration|logout)']
}