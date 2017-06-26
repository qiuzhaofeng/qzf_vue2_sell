import Goods from './components/goods/Goods.vue'
import Ratings from './components/ratings/Ratings.vue'
import Seller from './components/seller/Seller.vue'

export default {
  routes: [
{path: '/goods', component: Goods},
{path: '/ratings', component: Ratings},
{path: '/seller', component: Seller},
{path: '*', redirect: './goods'}
  ]
}
