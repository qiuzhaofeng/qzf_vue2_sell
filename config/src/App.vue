<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to='/goods'>商品</router-link></div>
      <div class="tab-item"><router-link to='/ratings'>评论</router-link></div>
      <div class="tab-item"><router-link to='/seller'>商家</router-link></div>
    </div>
    <div class="content"></div>
    <div>
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>
<script>
import Header from './components/header/Header.vue'
const ERR_OK = 0
export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = response.data
        // console.log(this.seller)
      }
    })
  },
  components: {
    'v-header': Header
  }
}
</script>
<style scoped lang='less'>
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        color: rgb(77, 85, 93);
        font-size: 14px;
        text-decoration: none;
        &.router-link-active {
          color: rgb(240, 20, 20);
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
      }
    }
  }
}
</style>
