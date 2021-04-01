<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell
        v-for="(article,index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  methods: {
    async onLoad () {
      //  如果有更新下一个页码
      //  没有 加载结束
      try {
        // 1.请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.per_page, // 每页大小
          q: this.searchText // 查询关键词
        })

        // // 模拟随机失败情况
        // if (Math.random() > 0.2) {
        //   JSON.parse('asssss')
        // }

        // 2. 将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        // 3. 将本次加载中的loading 关闭
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        // 展示加载失败
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
