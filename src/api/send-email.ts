import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()

    // Validamos que vengan los campos requeridos
    if (!body.name || !body.email || !body.phone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Campos requeridos faltantes',
        }),
        { status: 400 }
      )
    }

    // Llamada a EmailJS REST API
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: import.meta.env.EMAILJS_SERVICE_ID,
        template_id: import.meta.env.EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          message: body.message || '',
        },
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      return new Response(
        JSON.stringify({ success: false, error: errorText }),
        { status: 500 }
      )
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    )
  }
}
