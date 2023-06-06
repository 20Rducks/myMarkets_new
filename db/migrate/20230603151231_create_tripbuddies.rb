class CreateTripbuddies < ActiveRecord::Migration[7.0]
  def change
    create_table :tripbuddies do |t|
      t.references :user, null: false, foreign_key: true
      t.references :trip, null: false, foreign_key: true
      t.boolean :accepted, null: false, default: false

      t.timestamps
    end
  end
end
