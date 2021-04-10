<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="followLoading"
    @click="onFollow"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    @click="onFollow"
  >关注</van-button>

</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow () {
      this.followLoading = true
      try {
        if (this.isFollowed) {
          // 取消关注
          await deleteFollow(this.userId)
        } else {
          // 添加关注
          await addFollow(this.userId)
        }
        // this.isFollowed = !this.isFollowed
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，请重试'
        if (error.response && error.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.followLoading = false
    }
  }
}
</script>

<style>
</style>
