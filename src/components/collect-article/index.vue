<template>
  <van-icon
    :color="value ? '#ffa500' : '#777'"
    :name="value ? 'star' : 'star-o'"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
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
        if (this.value) {
          //   取消收藏
          await deleteCollect(this.articleId)
        } else {
          //   添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        // console.log(this.value + '--' + this.articleId)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败,请重试!')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
