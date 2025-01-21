/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ReviewsController = () => import('#controllers/reviews_controller')
const HomeController = () => import('#controllers/home_controller')
const SessionController = () => import('#controllers/session_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/', [HomeController, 'index']).as('home')
router.post('/', [ReviewsController, 'store']).as('reviews.store')
router.get('/reviews', [ReviewsController, 'create']).as('reviews.create')
router.get('/reviews/verify', [ReviewsController, 'verify']).as('reviews.verify')
router.get('/login', [SessionController, 'create']).as('login')
router.post('/login', [SessionController, 'store']).as('session.store')
router
  .get('/admin/dashboard', [DashboardController, 'index'])
  .as('dashboard')
  .use(middleware.auth())
router
  .put('/admin/dashboard/review/:id', [ReviewsController, 'update'])
  .as('reviews.update')
  .use(middleware.auth())
router
  .delete('/admin/dashboard/review/:id', [ReviewsController, 'destroy'])
  .as('reviews.delete')
  .use(middleware.auth())
