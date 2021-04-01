<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form
      class="search-form"
      action="/"
    >
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    ></search-history>

    <!--
        搜索结果: 默认false, onSearch 提交 变为 true

        联想建议 searchText 是否为空

        搜索历史记录 默认状态

        搜索栏绑定 focus 事件， focus 触发 false
     -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果展示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []// 历史记录
    }
  },
  components: {
    SearchHistory, SearchSuggestion, SearchResult
  },
  methods: {
    onSearch (searchText) {
      // this.$toast(searchText)
      // 更新文本框内容
      this.searchText = searchText
      // 存储历史记录, 不要有重复数据，最新的排在最前面
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(searchText)
      // 渲染结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.push('/')
    }
  },
  watch: {
    searchHistories (val) {
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
