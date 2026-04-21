import { Resend } from 'resend';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { name, company, email, phone, message } = await req.json() as {
    name: string; company: string; email: string; phone?: string; message?: string;
  };

  if (!name || !email || !company) {
    return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const notifyHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Inter, sans-serif; background: #f8f8f8; padding: 32px;">
  <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <div style="background: linear-gradient(135deg, #7C3AED, #2563EB); padding: 32px 40px;">
      <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: 800;">Nueva consulta desde inflexiumlabs.com</h1>
    </div>
    <div style="padding: 32px 40px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; color: #888; font-size: 13px; width: 120px;">Nombre</td><td style="padding: 10px 0; font-weight: 600; color: #111;">${name}</td></tr>
        <tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Empresa</td><td style="padding: 10px 0; font-weight: 600; color: #111;">${company}</td></tr>
        <tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #7C3AED; font-weight: 600;">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Teléfono</td><td style="padding: 10px 0; font-weight: 600; color: #111;">${phone}</td></tr>` : ''}
        ${message ? `<tr><td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Mensaje</td><td style="padding: 10px 0; color: #333; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td></tr>` : ''}
      </table>
      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee;">
        <a href="mailto:${email}" style="display: inline-block; background: #7C3AED; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Responder a ${name}</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Inter, sans-serif; background: #f8f8f8; padding: 32px;">
  <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <div style="background: linear-gradient(135deg, #7C3AED, #2563EB); padding: 32px 40px;">
      <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: 800;">inflexiumlabs</h1>
      <p style="color: rgba(255,255,255,0.75); margin: 8px 0 0; font-size: 14px;">Recibimos tu consulta</p>
    </div>
    <div style="padding: 32px 40px;">
      <p style="font-size: 16px; color: #111; margin: 0 0 16px;">Hola <strong>${name}</strong>,</p>
      <p style="color: #555; line-height: 1.7; margin: 0 0 24px;">
        Recibimos tu consulta y nuestro equipo te va a contactar en menos de 24 horas hábiles.
      </p>
      <div style="background: #f5f3ff; border-radius: 12px; padding: 20px 24px; border-left: 4px solid #7C3AED; margin-bottom: 24px;">
        <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Tu empresa</p>
        <p style="margin: 6px 0 0; color: #111; font-weight: 700; font-size: 16px;">${company}</p>
      </div>
      <p style="color: #555; line-height: 1.7; margin: 0 0 24px;">
        Mientras tanto podés escribirnos por WhatsApp o al email de ventas si necesitás una respuesta urgente.
      </p>
      <div style="display: flex; gap: 12px;">
        <a href="https://wa.me/59897574400" style="display: inline-block; background: #22c55e; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">WhatsApp</a>
        <a href="mailto:ventas@inflexiumlabs.com" style="display: inline-block; background: #f5f3ff; color: #7C3AED; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">ventas@inflexiumlabs.com</a>
      </div>
    </div>
    <div style="padding: 20px 40px; background: #fafafa; border-top: 1px solid #eee;">
      <p style="margin: 0; color: #aaa; font-size: 12px;">inflexiumlabs · Tecnología que transforma empresas · Uruguay & México</p>
    </div>
  </div>
</body>
</html>`;

  try {
    await Promise.all([
      resend.emails.send({
        from: 'Formulario Web <noreply@forms.inflexiumlabs.com>',
        to: 'ventas@inflexiumlabs.com',
        replyTo: email,
        subject: `Nueva consulta: ${name} — ${company}`,
        html: notifyHtml,
      }),
      resend.emails.send({
        from: 'Inflexiumlabs <noreply@forms.inflexiumlabs.com>',
        to: email,
        subject: 'Recibimos tu consulta — Inflexiumlabs',
        html: confirmHtml,
      }),
    ]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Error al enviar' }), { status: 500 });
  }
}
