import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const reviewPostValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50).trim().escape(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique({
        table: 'users',
        column: 'email',
      })
      .escape(),
    rating: vine.number().min(1).max(5),
    review: vine.string().minLength(10).maxLength(500).trim().escape(),
  })
)
/**
 * Validates the update action
 */
export const reviewUpdateValidator = vine.compile(
  vine.object({
    approve: vine.string().in(['approve', 'deny']),
  })
)
