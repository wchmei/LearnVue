<template>
<!-- ref/children 找到子组件
  ref 如果是绑定在组件中的，那么通过 this.$refs.refname获取到的是一个组件对象
  ref 如果是绑定在普通的元素中，那么通过 this.$refs.refname获取到的是一个元素对象
-->
  <div class="wrapper" ref="wrapper">
    <div class='content'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 这样 this.$refs.wrapper 就是上面ref定义的wrapper
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 这里必须得加上click:true不然滚动插件里的点击事件不生效
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    this.scroll.on('scroll', (position) => {
      // console.log(position);
      // 将参数传出去
      this.$emit('scroll', position)
    })

    // 解决上拉的时候回卡住的bug，主要原因是 this.scroll.scrollerHeight的值在图片加载之前就获取好了
    // 所以scrollerHeight的值需要在所有图片加载完成以后再来一次 this.scroll.refresh()获得最新的值
    console.log(this.scroll);


    // 监听上拉加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      // console.log('上拉加载更多');
    })
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
