const form = document.getElementById('leadForm') as HTMLFormElement | null
const formMessage = document.getElementById('formMessage') as HTMLElement | null

if (form && formMessage) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    formMessage.classList.remove('hidden', 'text-green-600', 'text-red-600')
    formMessage.textContent = 'Enviando...'
    formMessage.classList.add('text-gray-600')

    const data = {
      name: (form.querySelector('[name="name"]') as HTMLInputElement).value,
      email: (form.querySelector('[name="email"]') as HTMLInputElement).value,
      phone: (form.querySelector('[name="phone"]') as HTMLInputElement).value,
      message:
        (form.querySelector('[name="message"]') as HTMLInputElement)?.value ||
        '',
    }

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        formMessage.textContent =
          '✅ ¡Mensaje enviado correctamente! Te contactaré pronto.'
        formMessage.classList.remove('text-gray-600')
        formMessage.classList.add('text-green-600')
        form.reset()
      } else {
        throw new Error(result.error || 'Error desconocido')
      }
    } catch (err) {
      formMessage.textContent =
        '❌ Hubo un error al enviar el mensaje. Intenta nuevamente.'
      formMessage.classList.remove('text-gray-600')
      formMessage.classList.add('text-red-600')
    }
  })
}
