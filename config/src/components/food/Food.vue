<template>
	<transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutLeft">
		<div v-show="showFlag" class="food" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
					<span class="back" @click="back()"><</span>
				</div>
				<div class="content">
					<div class="title">{{food.name}}</div>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span><span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<div class="buy" @click="addFirst($event)" v-show="!food.count || food.count === 0">加入购物车</div>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<div class="title">商品介绍</div>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="ratings">
					<h1 class="title">商品评价</h1>
					<ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import Cartcontrol from '../cartcontrol/Cartcontrol.vue'
import Split from '../split/Split.vue'
import Ratingselect from '../ratingselect/Ratingselect.vue'
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  name: 'food',
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
      // 这里一定要用$nextTick，因为只有当$nextTick的时候我们才能保证这个dom是渲染的，才能计算出他的高度，当他的子元素超过父元素时，页面就能做滚动
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        }
        this.scroll.refresh()  // 这里就不用每次都去new了
      })
    },
    back() {
      this.showFlag = false
    },
    addFirst(event) {
      if (!event._constructed) {
        return false
      }
      Vue.set(this.food, 'count', 1)
    }
  },
  components: {
    'cartcontrol': Cartcontrol,
    'split': Split,
    'ratingselect': Ratingselect
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	.food {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background-color: #fff;
		.food-content {
			.image-header {
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;
				img {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
				.back {
					position: absolute;
					padding: 5px;
					z-index: 1;
					font-size: 40px;
					left: 0;
					top: 0;
					color: green;
				}
			}
			.content {
				box-sizing: border-box;
				width: 100%;
				padding: 18px;
				position: relative;
				.title {
					font-size: 14px;
					line-height: 14px;
					font-weight: 700;
					color: rgb(7, 17, 27);
					padding-bottom: 8px;
				}
				.detail {
					font-size: 10px;
					height: 10px;
					line-height: 10px;
					color: rgb(147,153,159);
					padding-bottom: 18px;
					.sell-count {
						margin-right: 12px;
					}
				}
				.price {
					font-size: 20px;
					line-height: 24px;
					font-weight: 700;
					.now {
						color: rgb(240, 20, 20);
						margin-right: 12px;
					}
					.old {
						color: rgb(147, 153, 159);
						text-decoration: line-through;
					}
				}
				.cartcontrol-wrapper {
					position: absolute;
					right: 18px;
					bottom: 18px;
				}
				.buy {
					position: absolute;
					right: 18px;
					bottom: 18px;
					background-color: rgb(0, 160, 220);
					z-index: 10;
					color: #fff;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing: border-box;
					font-size: 10px;
					border-radius: 12px;
				}
			}
			.info {
				padding: 18px;
				.title {
					font-size: 14px;
					line-height: 14px;
					margin-bottom: 6px;
					color: rgb(7, 17, 27);
				}
				.text {
					padding: 0 8px;
					font-size: 12px;
					line-height: 24px;
					color: rgb(77, 85, 93);
					font-weight: 200;
				}
			}
			.ratings {
				padding-top: 18px;
				.title {
					font-size: 14px;
					line-height: 14px;
					margin-left: 18px;
					color: rgb(7, 17, 27);
				}
			}
		}
	}
</style>
