import User from '#models/user'
import { loginFormValidator } from '#validators/login_form'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }
  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    const validatedData = await loginFormValidator.validate(data)
    const user = await User.verifyCredentials(validatedData.email, validatedData.password)
    await auth.use('web').login(user)
    return response.redirect().toRoute('dashboard')
  }
  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}
}
