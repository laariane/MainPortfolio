import Review from '#models/review'
import { reviewPostValidator, reviewUpdateValidator } from '#validators/review'
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
  async show({ params, view }: HttpContext) {
    const { id } = params

    return view.render('pages/dashboard/index', {})
  }

  /**
   * Edit individual record
   */
  // async edit({ params, request }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.only(['approve'])
    //i need to validate data
    const validatedData = await reviewUpdateValidator.validate(data)
    if (validatedData.approve === 'approve') {
      const review = await Review.findOrFail(params.id)
      review.approved = true
      review.save()
    }
    if (validatedData.approve === 'deny') {
      const review = await Review.findOrFail(params.id)
      review.approved = false
      review.save()
    }
    return response.redirect().toRoute('dashboard')
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}

  async verify({ request, response }: HttpContext) {
    const { token } = request.qs()
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
