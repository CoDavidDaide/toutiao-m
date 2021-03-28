<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div
        slot="title"
        class="title-text"
      >我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{isEdit? '完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid
      :gutter="10"
      class="my-grid"
    >
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixedChannels.includes(channel.id)"
        ></van-icon>
        <span
          slot="text"
          :class="{ active: index === active}"
          class="text"
        >{{channel.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div
        slot="title"
        class="title-text"
      >频道推荐</div>
    </van-cell>
    <van-grid
      :gutter="10"
      class="recommend-grid"
    >
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false, // 控制编辑状态显示
      fixedChannels: [0]
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (error) {
        // console.log(error)
        this.$toast('频道列表数据获取失败')
      }
    },

    async onAddChannel (channel) {
      this.myChannels.push(channel)
      //  数据持久化处理

      if (this.user) {
        try {
          //  已登录
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length// 序号
          })
        } catch (error) {
          this.$toast('保存频道失败，请稍后重试')
        }
      } else {
        //  未登录
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },

    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fixedChannels.includes(channel.id)) {
          return
        }
        //   删除
        this.myChannels.splice(index, 1)
        // 更新active
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // 持久化
        this.deleteChannel(channel)
      } else {
        //   切换操作
        this.$emit('update-active', index, false)
      }
    },

    async deleteChannel (channel) {
      if (this.user) {
        // 已登录
        try {
          await deleteUserChannel(channel.id)
        } catch (error) {
          this.$toast('删除指定频道失败')
        }
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  },
  computed: {
    recommendChannels () {
      //   const channels = []
      //   this.allChannels.forEach(channel => {
      //     const ret = this.myChannels.find(myChannel => {
      //       return myChannel.id === channel.id
      //     })
      //     if (!ret) {
      //       channels.push(channel)
      //     }
      //   })
      //   return channels

      // 方法2
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => { return myChannel.id === channel.id })
      })
    },
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 2px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
