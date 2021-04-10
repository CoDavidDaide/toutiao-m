<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      v-for="(item,index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click',$event)"
    ></comment-item>
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  methods: {
    async onLoad () {
      //   请求获取数据
      // 将数据添加到列表
      // 将loading 关闭
      // 判断是否还有数据
      // 有更新获取下一页
      // 没有 finished 设置为true
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })

        const { results } = data.data

        this.$emit('onload-success', data.data)

        this.list.push(...results)

        this.loading = false

        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}

</script>

<style scoped lang="less">
</style>
