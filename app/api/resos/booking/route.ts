// app/api/resos/booking/route.ts
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { people, date, time, customerInfo } = await request.json()

    const apiKey = process.env.UAT_RESOS_API_KEY
    const restaurantId = process.env.UAT_RESOS_RESTAURANT_ID
    const baseUrl = process.env.RESOS_BASE_URL || "https://api.resos.com/v1"

    if (!apiKey || !restaurantId) {
      return NextResponse.json(
        { error: "Missing required environment variables: RESOS_API_KEY, RESOS_RESTAURANT_ID" },
        { status: 400 },
      )
    }

    // Correct Basic auth format
    const encodedKey = Buffer.from(`${apiKey}:`).toString("base64")

    // Parse the time
    const [timeStart] = time.split(" - ")

    // Use the exact field names from Resos documentation
    const bookingData = {
      date: date, // Format: "YYYY-MM-DD"
      time: timeStart, // Format: "HH:MM"
      people: people, // Changed from "party_size" to "people"
      duration: 120,
      tables: [], // Empty array as shown in docs, or you might need to get table IDs
      guest: { // Changed from "customer" to "guest"
        name: customerInfo?.name || "Yew Tree Inn Online Booking",
        email: customerInfo?.email || "",
        phone: customerInfo?.phone || "",
        notificationSms: false,
        notificationEmail: true
      },
      status: "request", // Added required field
      source: "website",
      comment: customerInfo?.notes || "", // Guest-facing comment
      note: "", // Internal note for restaurant
      noteAuthor: "Yew Tree Inn Booking",
      referrer: "https://yewtreeinn.com",
      languageCode: "en"
    }

    console.log("[v0] Creating booking with data:", bookingData)

    // Use the correct endpoint from documentation
    const response = await fetch(`${baseUrl}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })

    console.log("[v0] Booking response status:", response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] Booking error:", errorData)
      return NextResponse.json({ error: "Failed to create booking", details: errorData }, { status: response.status })
    }

    const result = await response.json()
    console.log("[v0] Booking created successfully:", result)

    return NextResponse.json({
      success: true,
      booking: result,
      message: "Booking created successfully!",
    })
  } catch (error) {
    console.error("[v0] Booking creation error:", error)
    return NextResponse.json({ error: "Failed to process booking request" }, { status: 500 })
  }
}