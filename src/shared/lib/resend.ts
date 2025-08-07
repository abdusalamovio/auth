import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Подтверждение почты",
    html: `<p>Нажмите <a href="${confirmLink}">здесь</a>, чтобы подтвердить почту.</p>`,
  });
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Сброс пароля",
    html: `<p>Нажмите <a href="${resetLink}">здесь</a>, чтобы сбросить пароль.</p>`,
  });
}
