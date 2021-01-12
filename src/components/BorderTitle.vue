<template>
<!-- 带上边框的线 的组件-->
  <h3><slot></slot></h3>
</template>
<script>
export default {
    
}
</script>
<style scoped lang="less">
    h3{
        border-left: 2px solid #dd001b;
        padding-left: 10px;
        margin: 15px 0;
        line-height: 1rem;
    }
</style>