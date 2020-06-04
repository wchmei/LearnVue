<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
        :key="index" class="tab-control-item"
        :class="{active: index===currentIndex}"
        @click="btnClick(index)">
      <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  methods: {
    btnClick(index) {
      this.currentIndex = index
      // 将属性传出去
      this.$emit('tabClick', index)
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }

</style>
