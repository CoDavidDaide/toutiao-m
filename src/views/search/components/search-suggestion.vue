<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search',text)"
    >
      <div
        slot="title"
        v-html="highlight(text)"
      ></div>
    </van-cell>
    <!-- {{}} 纯文本 -->
    <!-- <div v-html="htmlStr"></div> -->
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: [] // 建议数据
      //   htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      //   当searchText 改变就会调用handler
      //   handler 固定 第一次拿不到 没有被渲染
      //   immediate 第一次也拿
      //   handler (val) {
      //     this.loadSearchSuggestions(val)
      //   },
      //   handler (val) {
      //     console.log(val)
      //   },
      //   debounce 参数1 函数 参数2 延迟时间
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    // 高亮推荐文字
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则 // 都会当作匹配字符
      //   需要根据数据变量动态创建正则 new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
