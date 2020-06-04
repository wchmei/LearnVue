<template>
<!-- 所有的item都展示同一个图片，同一个文字 -->
  <div class='tab-bar-item' @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>

  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  // 参数传递的属性需要和name同级
  props: {
    path: String,
    activeColor: {
    type: String,
    default: 'red'
    }
  },
  data() {
    return {
      // isActive:  true
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      console.log('itemClick');
      console.log(this.$route);
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
  .tab-bar-item {
    /* 会对 tab-bar-item 所有的元素均等分 */
    flex: 1;
    /* 文字中对齐 一般tab-bar的高度为49*/
    text-align: center;
    height: 49px;
    /* 调整文字大小 */
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 30px;
    height: 30px;
    /* 图标向下移动3px */
    margin-top: 3px;
    /* 图标与文字直接空隙有点大，使用middle就会好很多 */
    vertical-align: middle;
    /* 图标与文字直接只有两个像素 */
    /* margin-bottom: 2px; */
  }

/* .active {
  color: #FF0000;
} */

</style>
