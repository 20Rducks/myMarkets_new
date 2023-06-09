class User < ApplicationRecord

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :trips, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :friendships_as_asker, class_name: "Friendship", foreign_key: "asker_id", dependent: :destroy
  has_many :friendships_as_receiver, class_name: "Friendship", foreign_key: "receiver_id", dependent: :destroy
end

# sanitized params application controller DEVISE NOTES
