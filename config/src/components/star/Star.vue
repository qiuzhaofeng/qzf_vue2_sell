<template>
  <div class="star" :class="starType">
	<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let integer = Math.floor(score)
      let hasDecimal = score % 1 !== 0
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
        return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .star {
  	font-size: 0;
  	.star-item {
  		display: inline-block;
  		background-repeat: no-repeat;
  		&:last-child {
  			margin-right: 0;
  		}
  	}
  	&.star-48 {
  		.star-item {
	  		width: 20px;
			height: 20px;
			margin-right: 22px;
			background-size: 20px 20px;
			&.on {
				background-image: url('star48_on@2x.png');
			}
			&.half {
				background-image: url('star48_half@2x.png');
			}
			&.off {
				background-image: url('star48_off@2x.png');
			}
  		}
	}
	&.star-36 {
		.star-item {
			width: 15px;
			height: 15px;
			margin-right: 16px;
			background-size: 15px 15px;
			&.on {
				background-image: url('star36_on@2x.png');
			}
			&.half {
				background-image: url('star36_half@2x.png');
			}
			&.off {
				background-image: url('star36_off@2x.png');
			}
			&.last-child {
	  			margin-right: 0;
	  		}
		}
	}
	&.star-24 {
		.star-item {
			width: 10px;
			height: 10px;
			margin-right: 13px;
			background-size: 10px 10px;
			&.on {
				background-image: url('star24_on@2x.png');
			}
			&.half {
				background-image: url('star24_half@2x.png');
			}
			&.off {
				background-image: url('star24_off@2x.png');
			}
			&.last-child {
	  			margin-right: 0;
	  		}
		}
	}
  }
</style>
