<template>
  <!-- <div class="goods-item">
    <a :href="GoodsItem.link">
      <img :src="GoodsItem.show.img" alt="">
      <div :class="goods-info">
        <p>{{GoodsItem.title}}</p>
        <span class="price">{{GoodsItem.price}}</span>
        <span class="collect">{{GoodsItem.cfav}}</span>
      </div>
    </a>
  </div> -->
  <div class="goods-item">
    <!-- Vue创建了load函数用来监听图片是否加载完成 -->
    <img :src="GoodsItem.showLarge.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{GoodsItem.title}}</p>
      <span class="price">{{GoodsItem.price}}</span>
      <span class="collect">{{GoodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    GoodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
      // console.log('imageLoad');
    }
  }
}
</script>

// 加上scoped后，就只会在作用域里面有效
<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
