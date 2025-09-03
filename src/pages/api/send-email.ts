export const prerender = false

import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, phone, message } = await request.json()

    // Validación básica
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ success: false, error: 'Faltan campos obligatorios' }),
        { status: 400 }
      )
    }

    console.log(request)

    // Enviar a EmailJS REST API
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: import.meta.env.EMAILJS_SERVICE_ID,
        template_id: import.meta.env.EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.EMAILJS_PUBLIC_KEY, // también llamado public key
        template_params: {
          name,
          email,
          phone,
          message,
        },
      }),
    })

    console.log(res)

    if (!res.ok) {
      const errorText = await res.text()
      console.error('EmailJS error:', errorText)
      return new Response(
        JSON.stringify({ success: false, error: 'Error en EmailJS' }),
        { status: 500 }
      )
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error('Server error:', err)
    return new Response(
      JSON.stringify({ success: false, error: 'Error interno del servidor' }),
      { status: 500 }
    )
  }
}
