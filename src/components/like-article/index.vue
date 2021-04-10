<template>
  <van-icon
    :color="value === 1 ? '#e5645f' : '#777'"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      requred: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          //   取消点赞
          await deleteLike(this.articleId)
        } else {
          // 点赞
          await addLike(this.articleId)
          status = 1
        }

        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
