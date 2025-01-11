import Review from '#models/review'
import { reviewPostValidator } from '#validators/review'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
export default class ReviewsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/reviews/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const validatedData = await reviewPostValidator.validate(
      request.only(['name', 'email', 'rating', 'review'])
    )
    const result = await Review.create(validatedData)
    const domain = `${request.protocol()}://${request.host()}`
    const verificationUrl = `${domain}/reviews/verify?token=${result.emailVerificationToken}`
    // send an email here
    mail.send((message) => {
      message
        .to(validatedData.email)
        .from('laarianeamine@gmail.com')
        .subject('thank you for posting your review')
        .htmlView('emails/review_email', { name: validatedData.name, verificationUrl })
    })
    return response.redirect('/#reviews')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}

  async verify({ request, response }: HttpContext) {
    const { token } = request.qs()
    console.log(token)
    const review = await Review.findBy('emailVerificationToken', token)
    if (!review) {
      return response.redirect('/email_Verification_error')
    }
    review.isEmailVerified = true
    review.emailVerificationToken = null
    await review.save()
    return response.redirect('/thank_you')
  }
}
