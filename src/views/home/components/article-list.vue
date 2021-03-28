<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >

        <article-item
          v-for="(article,index) in list"
          :key="index"
          :article="article"
        ></article-item>
        <!-- <van-cell
          v-for="(article,index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false, // 失败提示状态,
      isRefreshLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    // //   铺不满一屏 触发两次
    // onLoad () {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }

    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now(), // 继续加载 或 第一页
          with_top: 1
        })

        // 模拟随机失败情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('asssss')
        // }

        // 请求结果放到list中
        const { results } = data.data
        // console.log(results)
        // 把数组一个一个拿出来，而不是覆盖
        this.list.push(...results)

        // 加载结束之后设置为结束
        this.loading = false

        if (results.length) {
          // 更新时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },

    async onRefresh () {
      // console.log('onRefresh')
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(), // 继续加载 或 第一页,下拉刷新 最新时间戳
          with_top: 1
        })

        // // 模拟随机失败情况
        // if (Math.random() > 0.2) {
        //   JSON.parse('asssss')
        // }

        const { results } = data.data
        this.list.unshift(...results)

        this.isRefreshLoading = false
        this.refreshSuccessText = `刷新成功，更新${results.length}条数据`
      } catch (error) {
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang="less">
// 利用自己的滚动容器
.article-list {
  // 百分比单位相对于父元素
  height: 79vh;
  overflow-y: auto;
}
</style>
