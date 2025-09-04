const form = document.getElementById('leadForm') as HTMLFormElement | null;
const formMessage = document.getElementById(
    'formMessage'
) as HTMLElement | null;

if (form && formMessage) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formMessage.classList.remove(
            'hidden',
            'text-green-600',
            'text-red-600'
        );
        formMessage.textContent = 'Enviando...';
        formMessage.classList.add('text-gray-600');

        const data = {
            name: (form.querySelector('[name="name"]') as HTMLInputElement)
                .value,
            email: (form.querySelector('[name="email"]') as HTMLInputElement)
                .value,
            phone: (form.querySelector('[name="phone"]') as HTMLInputElement)
                .value,
            challenge: (
                form.querySelector('[name="challenge"]') as HTMLSelectElement
            ).value,
            message:
                (form.querySelector('[name="message"]') as HTMLTextAreaElement)
                    ?.value || '',
        };

        try {
            // ⚡ Fetch directo a EmailJS REST API
            const res = await fetch(
                'https://api.emailjs.com/api/v1.0/email/send',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        service_id: 'service_ejj6ajo',
                        template_id: 'template_7narbbn',
                        user_id: 'pGo3CF4024yitHKl_', // public key de EmailJS
                        template_params: data,
                    }),
                }
            );

            if (res.ok) {
                formMessage.textContent =
                    '✅ ¡Mensaje enviado correctamente! Te contactaré pronto.';
                formMessage.classList.remove('text-gray-600');
                formMessage.classList.add('text-green-600');
                form.reset();
            } else {
                throw new Error(`Error ${res.status}`);
            }
        } catch (err) {
            console.error(err);
            formMessage.textContent =
                '❌ Hubo un error al enviar el mensaje. Intenta nuevamente.';
            formMessage.classList.remove('text-gray-600');
            formMessage.classList.add('text-red-600');
        }
    });
}
