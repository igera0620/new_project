class ContactMailer < ApplicationMailer
  default to: ENV.fetch('TOMAIL', nil) # 送信先メールアドレス

  def send_mail(contact)
    @contact = contact
    mail(from: @contact.email, subject: "【お問い合わせ】#{@contact.subject}")
  end
end
