import nodemailer from 'nodemailer'
import twilio from 'twilio'

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Twilio client setup
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

/**
 * Send email notification
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    }

    await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${to}`)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

/**
 * Send SMS notification
 */
export const sendSMS = async (to, message) => {
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
    console.log(`SMS sent to ${to}`)
  } catch (error) {
    console.error('Error sending SMS:', error)
    throw error
  }
}

/**
 * Send group invite email
 */
export const sendGroupInvite = async (email, inviteCode, groupName) => {
  const subject = `You've been invited to join ${groupName} on CarePulse`
  const html = `
    <h2>You've been invited!</h2>
    <p>You've been invited to join the care group "${groupName}" on CarePulse.</p>
    <p>Use this invite code to join: <strong>${inviteCode}</strong></p>
    <p><a href="${process.env.CLIENT_URL}/register?code=${inviteCode}">Click here to join</a></p>
  `
  await sendEmail(email, subject, html)
}

/**
 * Send medication reminder
 */
export const sendMedicationReminder = async (user, medication) => {
  const subject = `Medication Reminder: ${medication.name}`
  const html = `
    <h2>Time to take your medication</h2>
    <p>It's time to take: <strong>${medication.name}</strong></p>
    <p>Dose: ${medication.dose}</p>
  `

  if (user.notifications?.email) {
    await sendEmail(user.email, subject, html)
  }

  if (user.notifications?.sms && user.phone) {
    await sendSMS(user.phone, `Reminder: Take ${medication.name} (${medication.dose})`)
  }
}

/**
 * Send appointment reminder
 */
export const sendAppointmentReminder = async (user, appointment) => {
  const subject = `Appointment Reminder: ${appointment.doctor}`
  const html = `
    <h2>Upcoming Appointment</h2>
    <p>You have an appointment with <strong>${appointment.doctor}</strong></p>
    <p>Date: ${new Date(appointment.datetime).toLocaleString()}</p>
    <p>Location: ${appointment.location}</p>
  `

  if (user.notifications?.email) {
    await sendEmail(user.email, subject, html)
  }

  if (user.notifications?.sms && user.phone) {
    await sendSMS(
      user.phone,
      `Appointment reminder: ${appointment.doctor} on ${new Date(appointment.datetime).toLocaleString()}`
    )
  }
}

/**
 * Send emergency alert
 */
export const sendEmergencyAlert = async (users, alert) => {
  const subject = `🚨 URGENT ALERT: ${alert.title}`
  const html = `
    <h2 style="color: red;">URGENT ALERT</h2>
    <p><strong>${alert.title}</strong></p>
    <p>${alert.message}</p>
  `

  for (const user of users) {
    if (user.notifications?.email) {
      await sendEmail(user.email, subject, html)
    }
    if (user.notifications?.sms && user.phone) {
      await sendSMS(user.phone, `🚨 URGENT: ${alert.title} - ${alert.message}`)
    }
  }
}

