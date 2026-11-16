# Contact form

The static site posts contact messages to FormSubmit over HTTPS and emails them to
the `EMAIL` address in `src/lib/site.ts`. No API key, paid plan, or server is needed.

## Activate delivery

1. Deploy the updated site using your usual deployment process.
2. Submit a message from the contact section on the deployed site.
3. Open the FormSubmit activation email at `ashwin.hingave123@gmail.com` and confirm
   the form. Check spam if it does not appear. Confirm again if you change the
   recipient address or FormSubmit requests activation for a new site URL.
4. Submit another message and verify it arrives. Reply to that email to respond
   to the visitor's supplied address.

An accepted submission does not prove inbox delivery. FormSubmit holds messages
pending activation for up to 30 days. The UI reports submission acceptance, keeps
drafts after failures, and offers direct email as a fallback. Browser tests mock
the provider; they do not send email or activate the form.

FormSubmit processes visitors' names, email addresses, and messages. A disclosure
and privacy link appear below the form. Its availability and spam filtering
affect delivery.

For WhatsApp instead, supply a WhatsApp number with country code. A click-to-chat
link can open a prefilled conversation without a paid API; the visitor still
presses Send in WhatsApp. No phone number is currently configured in this repo.

Provider references: https://formsubmit.co/documentation and https://formsubmit.co/help
WhatsApp: https://faq.whatsapp.com/5913398998672934
