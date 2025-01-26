import Review from '#models/review'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const reviews = await Review.query()
      .where('is_email_verified', true)
      .andWhere('approved', true)
      .orderBy('created_at', 'desc')
    return view.render('pages/home', { reviews })
  }
}
