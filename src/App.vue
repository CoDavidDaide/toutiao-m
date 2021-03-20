<template>
  <div id="app">
    <router-view />
    <h1>黑马头条</h1>
    <div>
      <i class="toutiao toutiao-shipin"></i>
    </div>

    <van-button round type="info">圆形按钮</van-button>

    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>

    <div class="box">hello world</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.box {
  width: 555px;
  height: 84px;
  background-color: pink;
}
</style>
