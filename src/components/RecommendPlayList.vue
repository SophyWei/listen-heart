<template> 
<!-- 推荐音乐  组件 -->
  <section>
    <BorderTitle><slot></slot></BorderTitle>

    <ul class="playList">
      <PlayListItem v-for="(item ,index) in currentRecommends" :key="index" :item="item"></PlayListItem>

    </ul>
  </section>
</template>
<script>
import BorderTitle from "@/components/BorderTitle.vue";
import PlayListItem from "@/components/PlayListItem.vue";
export default {
  props: {
    currentRecommends: {
      type: Array,
    },
  },
  components: {
    BorderTitle,
    PlayListItem,
  },
};
</script>
<style lang="less">
  .playList{
    display: flex;
    flex-wrap: wrap;
  }
</style>