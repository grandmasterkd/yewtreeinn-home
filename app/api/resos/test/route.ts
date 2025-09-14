import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.RESOS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "RESOS_API_KEY environment variable is required" }, { status: 400 })
    }

    // Test the API connection and get restaurant details
    const encodedKey = Buffer.from(apiKey).toString("base64")

    // Try common Resos API endpoints to discover your setup
    const baseUrls = ["https://api.resos.com/v1", "https://app.resos.com/api/v1"]

    for (const baseUrl of baseUrls) {
      try {
        console.log(`[v0] Testing API endpoint: ${baseUrl}/restaurants`)

        const response = await fetch(`${baseUrl}/restaurants`, {
          method: "GET",
          headers: {
            Authorization: `Basic ${encodedKey}`,
            "Content-Type": "application/json",
          },
        })

        console.log(`[v0] Response status: ${response.status}`)

        if (response.ok) {
          const data = await response.json()
          console.log(`[v0] Success! Restaurant data:`, data)

          const restaurantId = process.env.RESOS_RESTAURANT_ID
          if (restaurantId) {
            try {
              const bookingResponse = await fetch(`${baseUrl}/restaurants/${restaurantId}/bookings`, {
                method: "GET",
                headers: {
                  Authorization: `Basic ${encodedKey}`,
                  "Content-Type": "application/json",
                },
              })
              console.log(`[v0] Booking endpoint test status: ${bookingResponse.status}`)
            } catch (bookingError) {
              console.log(`[v0] Booking endpoint test failed:`, bookingError)
            }
          }

          return NextResponse.json({
            success: true,
            baseUrl,
            restaurantData: data,
            message: "API connection successful!",
            instructions: {
              restaurantId: "Use the 'id' field from restaurantData as your RESOS_RESTAURANT_ID",
              baseUrl: `Set RESOS_BASE_URL to: ${baseUrl}`,
            },
          })
        }
      } catch (error) {
        console.log(`[v0] Error with ${baseUrl}:`, error)
        continue
      }
    }

    return NextResponse.json(
      { error: "Could not connect to Resos API. Please check your API key and try the manual setup." },
      { status: 400 },
    )
  } catch (error) {
    console.error("[v0] API test error:", error)
    return NextResponse.json({ error: "Failed to test API connection" }, { status: 500 })
  }
}
