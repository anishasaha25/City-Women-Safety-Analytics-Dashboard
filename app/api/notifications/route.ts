import { NextRequest, NextResponse } from "next/server"

// In-memory notification storage (replace with database in production)
const notifications: any[] = []

let notificationIdCounter = 1

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId parameter is required" },
        { status: 400 }
      )
    }

    const userNotifications = notifications.filter(
      (notification) => notification.userId === userId && !notification.read
    )

    return NextResponse.json({
      success: true,
      data: userNotifications,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch notifications" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, alertId, type, title, message } = body

    if (!userId || !alertId || !type || !title || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const newNotification = {
      id: notificationIdCounter.toString(),
      userId,
      alertId,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    }

    notifications.push(newNotification)
    notificationIdCounter++

    return NextResponse.json({
      success: true,
      data: newNotification,
      message: "Notification created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create notification" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { notificationId } = body

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: "notificationId is required" },
        { status: 400 }
      )
    }

    const notificationIndex = notifications.findIndex(
      (notification) => notification.id === notificationId
    )

    if (notificationIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Notification not found" },
        { status: 404 }
      )
    }

    notifications[notificationIndex].read = true

    return NextResponse.json({
      success: true,
      data: notifications[notificationIndex],
      message: "Notification marked as read",
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update notification" },
      { status: 500 }
    )
  }
}