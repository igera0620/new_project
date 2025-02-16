class ContactMailer < ApplicationMailer
  def send_mail(contact)
    @contact = contact
    mail(
      to: ENV.fetch('TOMAIL') || 'default@example.com', # TOMAILがnilならデフォルトアドレスを指定
      from: @contact.email,
      subject: "【お問い合わせ】#{@contact.subject}"
    )
  end
end
