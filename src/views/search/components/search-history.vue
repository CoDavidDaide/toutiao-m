<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>

      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow = true"
      ></van-icon>
    </van-cell>

    <van-cell
      :title="item"
      v-for="(item,index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item,index)"
    >
      <van-icon
        v-show="isDeleteShow"
        name="close"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    // props 普通数据 {数字，字符串，布尔值} 绝对不能修改，改了不会传给父组件
    // 引用数据 {Object Array} 可以修改，不能重新赋值 xxx = [] 父组件不会改变
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除状态
        this.searchHistories.splice(index, 1)
      } else {
        // 查找状态，进入结果
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
