import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
export default class Review extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare email: string
  @column({ columnName: 'is_email_verified' })
  declare isEmailVerified: boolean
  @column({ columnName: 'email_verification_Token' })
  declare emailVerificationToken: string | null
  @column()
  declare rating: number
  @column()
  declare review: string
  @column()
  declare approved: boolean
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static assignVerificationToken(review: Review) {
    review.emailVerificationToken = randomUUID()
    review.isEmailVerified = false
  }
}
