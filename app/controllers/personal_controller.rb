class PersonalController < ApplicationController
  layout 'personal'
  before_action :authenticate_user!

end