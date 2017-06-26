<template>
    <div class="header">
        <div class="content-wrapper">
    		<div class="avatar">
    			<img width="64" height="64" :src="seller.avatar">
    		</div>
    		<div class="content">
    			<div class="title">
    				<span class="brand"></span>
    				<span class="name">{{seller.name}}</span>
    			</div>
    			<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
    			<div class="support" v-if="seller.supports">
    				<span class="icon" :class="classMap[seller.supports[0].type]"></span>
    				<span class="text">{{seller.supports[0].description}}</span>
    			</div>
    		</div>
    		<div class="support-count" v-if="seller.supports" @click="showDetail()">
    			<span class="count">{{seller.supports.length}}个</span>
    			<span class="icon-keyboard_arrow_right">></span>
    		</div>
        </div>
    	<div class="bulletin-wrapper" @click="showDetail()">
    		<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    		<span class="icon">></span>
    	</div>
    	<div class="background">
    		<img  :src="seller.avatar" width="100%" height="100%">
    	</div>
    	<transition name="fade">
    		<div class="detail" v-show="detailShow">
    			<div class="detail-wrapper clearfix">
    				<div class="detail-main">
    					<h1 class="name">{{seller.name}}</h1>
    					<div class="star-wrapper">
    						<star :size="48" :score="seller.score"></star>
    					</div>
    					<div class="title">
    						<div class="line"></div>
    						<div class="text">优惠信息</div>
    						<div class="line"></div>
    					</div>
    					<ul v-if="seller.supports" class="supports">
    						<li class="support-item" v-for="(item, key) in seller.supports">
    							<span class="icon" :class="classMap[item.type]"></span>
    							<span class="text">{{item.description}}</span>
    						</li>
    					</ul>
    					<div class="title">
    						<div class="line"></div>
    						<div class="text">商家公告</div>
    						<div class="line"></div>
    					</div>
    					<div class="bulletin">
                <p class="content">{{seller.bulletin}}</p>
    					</div>		
    				</div>
    			</div>
    			<div class="detail-close" @click="hideDetail()">
    				<span class="icon">X</span>
    			</div>
    		</div>
    	</transition>
    </div>
</template>

<script>
import Star from '../star/Star.vue'
export default {
  name: 'header',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    'star': Star
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.header {
  	background-color: rgba(7, 17, 27, 0.5);
  	color: #fff;
  	position: relative;
  	overflow: hidden;
  	.content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
        .avatar {
            display: inline-block;
        }
        .content {
            display: inline-block;
            font-size: 14px;
            margin-left: 16px;
            .title {
                margin: 2px 0 8px 0;
                .brand {
                	display: inline-block;
                	vertical-align: top;
                	width: 30px;
                	height: 18px;
                	border-radius: 2px;
                	background-image: url("./brand@2x.png");
                	background-size: 30px 18px;
                }
                .name {
                	font-size: 16px;
                	font-weight: bold;
                	line-height: 18px;
                }
            }
      	  	.description {
                font-size: 12px;
                line-height: 12px;
                font-weight: 200;
                margin-bottom: 10px;
      	  	}
      	  	.support {
                font-size: 0;
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    margin-bottom: 2px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    &.decrease {
                      background-image: url("./decrease_1@2x.png");
                    };
                    &.discount {
                      background-image: url("./discount_1@2x.png");
                    };
                    &.special {
                      background-image: url("./special_1@2x.png");
                    };
                    &.invoice {
                      background-image: url("./invoice_1@2x.png");
                    };
                    &.guarantee {
                      background-image: url("./guarantee_1@2x.png");
                    }
                }
                .text {
                    font-size: 10px;
                    line-height: 12px;
                    font-weight: 200;  
                    vertical-align: bottom;
                }
      	  	}
        }
        .support-count {
            position: absolute;
            height: 24px;
            right: 12px;
            bottom: 18px;
            padding: 0 8px;
            line-height: 24px;
            border-radius: 14px;
            background-color: rgba(0, 0, 0, 0.2);
            text-align: center;
            .count {
            	font-size: 10px;
            }
            .icon-keyboard_arrow_right {
            	font-size: 10px;
            }
        }
  	}
  	.bulletin-wrapper {
  		height: 28px;
  		line-height: 28px;
  		padding: 0 22px 0 12px;
  		white-space: nowrap;	
  		overflow: hidden;
  		text-overflow: ellipsis;
  		background-color: rgba(7, 17, 27, 0.2);
  		position: relative;
  		.bulletin-title {
  			display: inline-block;
  			width: 22px;
  			height: 12px;
  			background-image: url("./bulletin@2x.png");
  			background-size: 22px 12px;
  			background-repeat: no-repeat;
  			margin-top: 8px;
  		}
  		.bulletin-text {
  			font-size: 10px;
  			margin: 0 4px;
  			vertical-align: middle;
  		}
  		.icon {
			font-size: 10px;
			position: absolute;
			right: 8px;
			top: 0px;
  		}
  	}
  	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px);
  	}
  	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.5s;
  	}
  	.fade-enter, .fade-leave-active {
  		opacity: 0;
  	}
  	.detail {
  		position: fixed;
  		top: 0;
  		left: 0;
  		z-index: 100;
  		width: 100%;
  		height: 100%;
  		overflow: auto;
  		transition: all 0.5s;
  		background-color: rgba(7, 17, 27, 0.8);
  		backdrop-filter: blur(10px);
  		.detail-wrapper {
  			width: 100%;
  			min-height: 100%;
  			.detail-main {
  				padding-top: 64px;
  				padding-bottom: 64px;
  				.name {
  					font-size: 16px;
  					line-height: 16px;
  					font-weight: 700;
  					text-align: center;
  				}
  				.star-wrapper {
  					margin-top: 18px;
  					padding: 2px 0;
  					text-align: center;
  				}
  				.title {
  					display: flex;
  					width: 80%;
  					margin: 28px auto 24px;
					.line {
						flex: 1;
						position: relative;
						top: -6px;
						border-bottom: 1px solid rgba(255, 255, 255, 0.2);
					}
					.text {
						padding: 0 12px;
						font-size: 14px;
						font-weight: 700;
					}
  				}
  				.supports {
  					width: 80%;
  					margin: 0 auto;
  					.support-item {
  						padding: 0 12px;
  						margin-bottom: 12px;
  						font-size: 0;
  						&:last-child {
  							margin-bottom: 0;
  						}
  						.icon {
  							display: inline-block;
  							width: 16px;
  							height: 16px;
  							vertical-align: top;
  							margin-right: 6px;
  							background-size: 16px 16px;
  							background-repeat: no-repeat;
				  			&.decrease {
				  	  	      background-image: url("./decrease_2@2x.png");
				  	  	    };
				  	  	    &.discount {
				  	  	      background-image: url("./discount_2@2x.png");
				  	  	    };
				  	  	    &.special {
				  	  	      background-image: url("./special_2@2x.png");
				  	  	    };
				  	  	    &.invoice {
				  	  	      background-image: url("./invoice_2@2x.png");
				  	  	    };
				  	  	    &.guarantee {
				  	  	      background-image: url("./guarantee_2@2x.png");
				  	  	    }
  						}
  						.text {
  							font-size: 12px;
  							line-height: 16px;
  							font-weight: 200;
  						}
  					}
  				}
				.bulletin {
					width: 80%;
					margin: 0 auto;
					.content {
						padding: 0 12px;
						line-height: 24px;
						font-size: 12px;
						font-weight: 200;
					}
				}
  			}
  		}
  		.detail-close {
  			position: relative;
  			width: 32px;
  			height: 32px;
  			margin: -64px auto 0;
  			clear: both;
  			font-size: 32px;
  		}
  	}
  }
</style>
