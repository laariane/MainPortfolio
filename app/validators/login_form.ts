import vine from '@vinejs/vine'

export const loginFormValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().maxLength(50),
  })
)
