class Log < ActiveRecord::Base
  validates :user_id, presence: true
  validates :message, presence: true

  enum flag:[:info, :alert, :security]

  before_create :set_created_at

  belongs_to :user

  def set_created_at
    self.created_at = Time.now
  end
end
