'use server'

import React from 'react'
import { Resend } from 'resend'
import {
  contactFormSchema,
  TContactFormSchema,
} from '@/schemas/contactFormSchema'
import ContactEmail from '../../email/ContactEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmailAction = async (email: TContactFormSchema) => {
  const validatedEmail = contactFormSchema.safeParse(email)

  if (!validatedEmail.success) {
    return {
      message: 'Invalid email',
    }
  }

  const { name, senderEmail, message } = validatedEmail.data

  try {
    await resend.emails.send({
      from: `Ny melding fra ${name} <onboarding@resend.dev>`,
      to: 'akselhskaar@hotmail.no',
      subject: `Ny melding fra kontakt skjema på akselskaar.no`,
      reply_to: senderEmail,
      react: React.createElement(ContactEmail, {
        name: name,
        senderEmail: senderEmail,
        message: message,
      }),
    })
    return {
      message:
        'Thank you for your message. I will get back to you as soon as possible.',
      reset: true,
    }
  } catch (e) {
    return {
      message: 'Something went wrong. Please try again later.',
      reset: false,
    }
  }
}
