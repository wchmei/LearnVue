<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type='3'
            :pull-up-load="true"
            @pullingUp='loadMore'
            @scroll="contentScroll">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control class="tab-control"
                  :titles="['流行', '新款', '精选']" @tabClick='tabClick'>
                  </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 监听组件的点击 加上.native就可以监听组件的-->
    <!-- 在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

// 养成好的习惯把同类型的放到一起
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import BackTop from 'components/content/backTop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomeMultidata, getHomeGoods} from 'network/home'


export default {
  name: 'Home',
  data() {
    return {
      // 将home里面的数据先保存起来
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    Scroll,
    BackTop,

    GoodsList,
    TabControl,
  },
  computed: {
    showGoods() {
      console.log(this.currentType);
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },

  mounted() {
            // 3监听itme中图片加载完成 itemImageLoad,最好放到 mountedl里面来，这样才能保证能获取到scroll
    this.$bus.$on('itemImageLoad', () => {
      console.log('itemImageLoad');
      this.$refs.scroll.refresh()
    })
  },

  methods: {
    // 事件监听的相关方法
      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
    },

    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = (-position.y > 1000)
    },

    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },

    // 网络请求的相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 为了继续上拉加载更多，需要在这里加上 scroll.finishPullUp
        this.$refs.scroll.finishPullUp()
      })
    },
    backClick() {
      // 500ms内返回到顶部
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
</script>

// 加上了scoped后就只有在本作用域内有效
<style scoped>
  #home {
    /* padding-top: 44px; */
    /* 视口高度 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    /* 设置导航栏 */
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 51px;
  } */
</style>
