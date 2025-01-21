import Review from '#models/review'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const reviews = await Review.findManyBy('is_email_verified', true)
    console.log(reviews[0].createdAt.diff(reviews[0].updatedAt).toObject())
    return view.render('pages/dashboard/index', { reviews })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

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
}
