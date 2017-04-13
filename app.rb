require 'sinatra'

set :views,         Proc.new { root }
set :public_folder, Proc.new { root }


get '/' do
  erb :index
end



post '/' do
  @email = params[:user_email]
  @pass  = params[:user_password]
  @order_no = params[:order_number]

  # we have email, pass, order_no, we want some sort of xml
  # idk how that happens, but it happens here
  @xml = "<xml abc=\"whatever\">#{@order_no}</xml>"

  erb :index
end


# this is asynchronous
post '/ship-notification' do
  # at this point we send it off to be shipped for real
  xml = params[:data]
  puts "Saw the XML: #{xml.inspect}"

  # apparently there is no meaningful response here
end
