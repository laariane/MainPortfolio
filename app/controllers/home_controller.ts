import Review from '#models/review'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const reviews = await Review.query()
      .where('is_email_verified', true)
      .orderBy('created_at', 'desc')
    return view.render('pages/home', { reviews })
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
