<template>
<!-- 主页组件 -->
  <ul id="home-nav">
    <li>
      <router-link to="/">推荐音乐</router-link>
    </li>
    <li>
      <router-link to="/hot">热歌榜</router-link>
    </li>
    <li>
      <router-link to="/search">搜索</router-link>
    </li>
  </ul>
</template>
<script>
export default {};
</script>
<style lang="less">
#home-nav {
  display: flex;
  border-bottom: 1px solid #eeeeee;

  li {
    flex: 1;
    text-align: center;
    a {
      color: #000;
    display: inline-block;
    line-height: 41px;
      text-decoration: none;

      &.router-link-exact-active {
        color: #dd001b;
        border-bottom: 2px solid #dd001b;
        padding: 0 10px;
      }
    }
  }
}
</style>

  