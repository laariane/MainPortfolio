import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 150).notNullable()
      table.string('email', 150).notNullable().unique()
      table.boolean('is_email_verified').defaultTo(false)
      table.string('email_verification_Token')
      table.integer('rating').notNullable()
      table.text('review').notNullable()
      table.boolean('approved').defaultTo(false)
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
