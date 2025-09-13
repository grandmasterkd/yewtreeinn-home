// app/api/resos/debug/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.RESOS_API_KEY!
  const baseUrl = process.env.RESOS_BASE_URL || "https://api.getresos.com/v1"
  
  const testEndpoints = [
    `${baseUrl}/restaurants`,
    `${baseUrl}/bookings/availability` // Another endpoint to test
  ]

  const results = []

  for (const endpoint of testEndpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      
      results.push({
        endpoint,
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        data: response.ok ? await response.json() : await response.text()
      })
    } catch (error) {
      results.push({
        endpoint,
        error: error instanceof Error ? error.message : String(error),
        success: false
      })
    }
  }

  return NextResponse.json({ 
    apiKey: apiKey ? '***' + apiKey.slice(-4) : 'MISSING',
    baseUrl,
    results 
  })
}