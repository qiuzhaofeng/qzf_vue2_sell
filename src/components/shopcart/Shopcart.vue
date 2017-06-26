<template>
	<div class="ShopCart">
	 	<div class="shopcart">
			<div class="content" @click="toggleList()">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight': totalCount > 0}">
							<span class="icon-shopping_cart" :class="{'highlight': totalCount > 0}">车</span>
						</div>
						<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
				</div>
				<div class="content-right" @click.stop="pay()">
					<div class="pay" :class="payClass">{{payDesc}}</div>
				</div>
			</div>
			<transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
				<div class="shopcart-list" v-show="listShow" :class="{'slideUp':listShow}">
					<div class="list-header">
						<div class="title">购物车</div>
						<span class="empty" @click="empty()">清空</span>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<span class="price">￥{{food.price*food.count}}</span>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div class="list-mask" v-show="listShow" @click="hideList()"></div>
		</transition>
	</div>
</template>

<script>
import Cartcontrol from '../cartcontrol/Cartcontrol.vue'
import BScroll from 'better-scroll'
export default {
  name: 'shopcart',
  props: {
    selectFoods: {
      type: Array
      // default() {
      //   return [
      //     {
      //       price: 10,
      //       count: 1
      //     }
      //   ]
      // }
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  data() {
    return {
      fold: true
    }
  },
  methods: {
    toggleList() {
      this.fold = !this.fold
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList() {
      this.fold = true
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      alert(`支付${this.totalPrice}元`)
      // this.fold = true
      this.empty()
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice === 0) {
        return ''
      } else if (this.totalPrice < this.minPrice && this.totalPrice > 0) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true  // 如果不加这句话，再清空购物车后，再加入购物车时会自动弹出列表因为这时的fold仍然是false
        return false
      }
      let show = !this.fold
      // 当列表显示时初始化BScroll
      if (show) {
        // BScroll是严重依赖于dom的，所以还是用$nextTick()
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          }
          this.scroll.refresh()  // 这里就不用每次都去new了
        })
      }
      return show
    }
  },
  components: {
    'cartcontrol': Cartcontrol
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.ShopCart {
	.shopcart {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 48px;
		z-index: 50;
		.content {
			display: flex;
			background-color: #141d27;
			.content-left {
				flex: 1;
				font-size: 0;
				.logo-wrapper {
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					border-radius: 50%;
					background-color: #141d27;
					.logo {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background-color: #2b343c;
						text-align: center;
						&.highlight {
							background-color: rgb(0, 160, 220);
						}
						.icon-shopping_cart {
							font-size: 24px;
							color: #80858a;
							line-height: 44px;
							&.highlight {
								color: #fff;
							}
						}
					}
					.num {
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color: #fff;
						background-color: rgb(240, 20, 20);
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
					}
				}
				.price {
					display: inline-block;
					margin-top: 12px;
					box-sizing: border-box;
					padding-right: 12px;
					font-size: 16px;
					line-height: 24px;
					border-right: 1px solid rgba(255, 255, 255, 0.1);
					color: rgba(255, 255, 255, 0.4);
					font-weight: 700;
					vertical-align: top;
					&.highlight {
						color: #fff;
					}
				}
				.desc {
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin: 12px 0;
					color: rgba(255, 255, 255, 0.4);
					font-size: 10px;
					padding-left: 12px;
				}
			}
			.content-right {
				flex: 0 0 105px;
				width: 105px;
				.pay {
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					color: rgba(255, 255, 255, 0.4);
					font-weight: 700;
					background-color: #2b333b;
					&.not-enough {
						color: #fff;
						background-color: rgb(240, 20, 20);
					}
					&.enough {
						color: #fff;
						background-color: #00b43c;
					}
				}
			}
		}
		.shopcart-list {
			position: absolute;
			bottom: -100%;
			left: 0;
			z-index: -1;
			width: 100%;
			&.slideUp {
				bottom: 48px;
			}
			.list-header {
				height: 40px;
				line-height: 40px;
				padding: 0 18px;
				background-color: #f3f5f7;
				border-bottom: 1px solid rgba(7, 17, 27, 0.1);
				.title {
					float: left;
					font-size: 14px;
					color: rgb(7, 17, 27);
				}
				.empty {
					float: right;
					font-size: 12px;
					color: rgb(0, 160, 220);
				}
			}
			.list-content {
				padding: 0 18px;
				max-height: 200px;
				overflow: hidden;
				background-color: #fff;
				.food {
					position: relative;
					height: 48px;
					line-height: 48px;
					box-sizing: border-box;
					border-bottom: 1px solid rgba(7, 17, 27, 0.1);
					.name {
						padding:  12px 0;
						font-size: 14px;
						color: rgb(7, 17, 27);
					}
					.price {
						position: absolute;
						right: 90px;
						color: rgb(240, 20, 20);
					}
					.cartcontrol-wrapper {
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}
	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
		background-color: rgba(7, 17, 27, 0.8);
		backdrop-filter: blur(10px);
	}	
}

</style>
