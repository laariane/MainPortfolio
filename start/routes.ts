/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ReviewsController = () => import('#controllers/reviews_controller')
const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'index']).as('home')
router.post('/', [ReviewsController, 'store']).as('reviews.store')
router.get('/reviews', [ReviewsController, 'create']).as('reviews.create')
router.get('/reviews/verify', [ReviewsController, 'verify']).as('reviews.verify')
