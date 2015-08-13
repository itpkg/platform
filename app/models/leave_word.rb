class LeaveWord < ActiveRecord::Base
  validates :message, presence: true

  before_create :set_created_at

  def set_created_at
    self.created_at = Time.now
  end
end
