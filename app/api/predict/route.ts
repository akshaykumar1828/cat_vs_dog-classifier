const EXTERNAL_API = "https://cat-vs-dog-classifier-1-jy5y.onrender.com"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof Blob)) {
      return Response.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    const externalFormData = new FormData()
    externalFormData.append("file", file)

    const response = await fetch(`${EXTERNAL_API}/predict`, {
      method: "POST",
      body: externalFormData,
    })

    if (!response.ok) {
      const text = await response.text()
      return Response.json(
        { error: `API error: ${response.status}`, details: text },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Prediction proxy error:", error)
    return Response.json(
      { error: "Failed to connect to the prediction API. The server may be starting up - please try again in a moment." },
      { status: 502 }
    )
  }
}
