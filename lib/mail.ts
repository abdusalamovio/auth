import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Сброс пароля",
    html: `<p>Нажмите <a href="${resetLink}">здесь</a>, чтобы сбросить пароль.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Подтверждение электронной почты",
    html: `<p>Нажмите <a href="${confirmLink}">здесь</a>, чтобы подтвердить вашу почту.</p>`,
  });
};
