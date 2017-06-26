<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="block all" :class="{'active':selectType===2}">{{desc.all}}<span class="count">57</span></span>
			<span class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">47</span></span>
			<span class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">10</span></span>
		</div>
		<div class="switch">
			<span class="icon-check_circle">√</span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  name: 'ratingselect',
  props: {
    ratings: {
      type: Array
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.ratingselect {
	.rating-type {
		padding: 18px 0;
		margin: 0 18px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.2);
		font-size: 0;
		.block {
			display: inline-block;
			padding: 8px 12px;
			margin-right: 8px;
			font-size: 12px;
			border-radius: 1px;
			color: rgb(77, 85, 93);
			.count {
				font-size: 8px;
				margin-left: 2px;
				line-height: 16px;
			}
			&.all {
				background-color: rgba(0, 160, 220, 0.2);
				&.active {
					color: #fff;
					background-color: rgb(0, 160, 220);
				}
			}
			&.positive {
				background-color: rgba(0, 160, 220, 0.2);
				&.active {
					color: #fff;
					background-color: rgb(0, 160, 220);
				}
			}
			&.negative {
				background-color: rgba(77, 85, 93, 0.1);
				&.active {
					color: #fff;
					background-color: rgb(77, 85, 93);
				}
			}
		}
	}
	.switch {
		padding: 12px 18px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.2);
		font-size: 0;
		.icon-check_circle {
			display: inline-block;
			width: 24px;
			height: 24px;
			line-height: 24px;
			text-align: center;
			border-radius: 50%;
			color: #fff;
			font-size: 24px;
			margin-right: 8px;
			background-color: rgb(147, 153, 159);
			vertical-align: top;
		}
		.text {
			font-size: 12px;
			display: inline-block;
			line-height: 24px;
			color: rgb(147, 153, 159);
		}
	}
}
</style>
