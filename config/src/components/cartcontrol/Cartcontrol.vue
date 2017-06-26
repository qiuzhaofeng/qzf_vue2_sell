<template>
	<div class="cartcontrol">
		<transition-group enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
			<div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)" :key="1">-</div>
			<div class="cart-count" v-show="food.count>0" :key="2">{{food.count}}</div>
		</transition-group>
		<div class="cart-add" @click.stop="addCart($event)">+</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return false
      }
      // console.log(1)
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return false  // 为了在pc端点击不出现两次
      }
      if (this.food.count === 0) {
        return  // 防止点到0时还能点击，因为动画还有阴影
      }
      this.food.count--
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	.cartcontrol {
		font-size: 0;
		.cart-decrease, .cart-add {
			display: inline-block;
			vertical-align: bottom;
			width: 24px;
			height: 24px;
			font-weight: 700;
			font-size: 24px;
			text-align: center;
			border-radius: 50%;
			box-sizing: border-box;
		}
		.cart-decrease {
			color: rgb(0, 160, 220);
			border: 3px solid rgb(0, 160, 220);
			line-height: 16px;
		}
		.cart-count {
			display: inline-block;
			vertical-align: bottom;
			width: 24px;
			height: 24px;
			text-align: center;
			font-size: 10px;
			line-height: 24px;
			color: rgb(147, 153, 159);
		}
		.cart-add {
			background-color: rgb(0, 160, 220);
			color: #fff;
			line-height: 24px;
		}
	}
</style>
