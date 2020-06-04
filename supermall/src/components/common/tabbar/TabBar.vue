<template>
  <div id='tab-bar'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>


  #tab-bar {
    /* 水平分布 */
    display: flex;
    background-color: #f6f6f6;

    /* 将tab-bar的位置设置到下方 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* x为0就是左对齐，y-3就是想上3个px */
    box-shadow: 0 -3px 1px rgba(100, 100, 100, .2)
  }
</style>
