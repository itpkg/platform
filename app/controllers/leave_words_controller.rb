class LeaveWordsController < ApplicationController

  def create
    lw = LeaveWord.create params.require(:leave_word).permit(:content)
    if lw.valid?
      flash[:notice] = ' '
    else
      flash[:alert] = lw.errors
    end
    redirect_back fallback_location: params[:back]
  end

  def destroy
    lw = LeaveWord.find params[:id]
    lw.destroy
    render :index
  end

  def index
    if current_user && curr_user.is_admin?
      @items = LeaveWord.order(id: :desc).page params[:page]
    else
      head :forbidden
    end
  end
end