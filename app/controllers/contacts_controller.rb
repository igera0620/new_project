class ContactsController < ApplicationController
  skip_before_action :require_login

  def new
    @contact = Contact.new
  end

  def confirm
    if request.get?
      redirect_to new_contact_path, alert: "フォームから入力してください"
      return
    end

    @contact = Contact.new(contact_params)
    render :confirm
  end

  def back
    @contact = Contact.new(contact_params)
    render :new
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      ContactMailer.send_mail(@contact).deliver_later
      redirect_to done_path, notice: "お問い合わせが送信されました！"
    else
      render :new
    end
  end

  def done; end

  private

  def contact_params
    params.require(:contact).permit(:email, :name, :phone_number, :subject, :message)
  end
end
