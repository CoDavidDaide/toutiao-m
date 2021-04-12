<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({ message: '保存中...', forbidClick: true, duration: 0 })
      try {
        const localGender = this.localGender
        console.log(localGender)

        const { data } = await updateUserProfile({
          gender: localGender
        })

        console.log(data)
        // 更新视图
        this.$emit('input', localGender)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    onPickerChange (picker, value, index) {
      // console.log(picker + value + index)
      this.localGender = index
      // console.log(this.localGender)
    }
  }
}
</script>

<style scoped lang="less">
</style>
