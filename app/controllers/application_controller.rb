require './config/environment'
use Rack::JSONBodyParser

class ApplicationController < Sinatra::Base

  configure do
    set :public_folder, 'public'
    set :views, 'app/views'
  end

  get "/" do
  end

end
