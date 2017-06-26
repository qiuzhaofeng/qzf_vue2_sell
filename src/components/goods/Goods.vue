<template>
	<div class="goods">
	<div class="menu-wrapper" ref="menuWrapper">
		<ul>
			<li v-for="(item, key) in goods" class="menu-item" :class="{'current':currentIndex==key}" @click="selectMenu(key, $event)">
				<span class="text">
					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
				</span>
			</li>
		</ul>
	</div>
	<div class="foods-wrapper" ref="foodsWrapper">
		<ul>
			<li v-for="(item, key) in goods" class="food-list food-list-hook">
				<h1 class="title">{{item.name}}</h1>
				<ul>
					<li v-for="(food, key) in item.foods" class="food-item" @click="selectFood(food, $event)">
						<div class="icon">
							<img width="57px" height="57px" :src="food.icon">
						</div>
						<div class="content">
							<h2 class="name">{{food.name}}</h2>
							<p class="desc">{{food.description}}</p>
							<div class="extra">
								<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
							</div>
							<div class="price">
								<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods"></shopcart>
	<food :food="selectedFood" ref='food'></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Shopcart from '../shopcart/Shopcart.vue'
import Cartcontrol from '../cartcontrol/Cartcontrol.vue'
import Food from '../food/Food.vue'
const ERR_OK = 0
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length++; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
    },
    selectFoods() {
      let selectFoods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            selectFoods.push(food)
          }
        })
      })
      return selectFoods
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    selectMenu(key, event) {
      if (!event._constructed) {
        return false
      }
      // console.log(key)
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[key]
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return false
      }
      this.selectedFood = food
      this.$refs.food.show()  // 引入子组件
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height = height + item.clientHeight
        this.listHeight.push(height)
      }
      this.listHeight = this.listHeight.slice(1, this.listHeight.length - 1)
      // console.log(this.listHeight)
    }
  },
  components: {
    'shopcart': Shopcart,
    'cartcontrol': Cartcontrol,
    'food': Food
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	.goods {
		display: flex;
		position: absolute;
		width: 100%;
		top: 174px;
		bottom: 46px;
		overflow: hidden;
		.menu-wrapper {
			flex: 0 0 80px;
			width: 80px;
			background-color: #f3f5f7;
			.menu-item {
				display: table;
				height: 54px;
				width: 56px;
				line-height: 14px;
				padding: 0 12px;
				&.current {
					position: relative;
					margin-top: 1px;
					z-index: 10;
					background-color: #fff;
					font-weight: 700;
					&.text {
						border-bottom: none;
					}
				}
				.icon {
					display: inline-block;
		  	  	    width: 12px;
		  	  	    height: 12px;
		  	  	    margin-right: 2px;
					vertical-align: top;
		  	  	    background-size: 12px 12px;
		  	  	    background-repeat: no-repeat;
		  	  	    &.decrease {
		  	  	      background-image: url("./decrease_3@2x.png");
		  	  	    };
		  	  	    &.discount {
		  	  	      background-image: url("./discount_3@2x.png");
		  	  	    };
		  	  	    &.special {
		  	  	      background-image: url("./special_3@2x.png");
		  	  	    };
		  	  	    &.invoice {
		  	  	      background-image: url("./invoice_3@2x.png");
		  	  	    };
		  	  	    &.guarantee {
		  	  	      background-image: url("./guarantee_3@2x.png");
		  	  	    }
				}
				.text {
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					font-size: 12px;
					border-bottom: 1px solid rgba(7, 17, 27, 0.1);
				}
			}
		}
		.foods-wrapper {
			flex: 1;
			.title {
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147, 153, 159); 
				background-color: #f3f5f7;
			}
			.food-item {
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				border-bottom: 1px solid rgba(7, 17, 27, 0.1);
				&:last-child {
					border-bottom: none;
					margin-bottom: 0;
				}
				.icon {
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content {
					flex: 1;
					position: relative;
					.name {
						margin: 2px 0 8px 0;
						font-size: 14px;
						line-height: 14px;
						color: rgb(7, 17, 27);
					}
					.desc, .extra {	
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
					.desc {
						margin-bottom: 8px;
						line-height: 12px;
					}
					.extra {
						.count {
							margin-right: 12px;
						}
					}
					.price {
						line-height: 24px;
						font-weight: 700;
						.now {
							margin-right: 8px;
							font-size: 14px;
							color: rgb(240, 20, 20);
						}
						.old {
							font-size: 10px;
							text-decoration: line-through;
							color: rgb(147, 153, 159);
						}
					}
					.cartcontrol-wrapper {
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}
			}
		}
	}
</style>
