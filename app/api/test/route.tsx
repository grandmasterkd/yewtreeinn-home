// /app/api/test/route.ts
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Test endpoint received:", body)
    return NextResponse.json({ success: true, message: "Test successful", data: body })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Test failed" }, { status: 500 })
  }
}