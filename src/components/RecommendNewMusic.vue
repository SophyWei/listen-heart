<template>
  <!-- 最新音乐 组件 -->
  <section>
    <BorderTitle><slot></slot></BorderTitle>

    <ul class="newList">
      <NewListItem
        @update:currentMusic="$emit('update:currentMusic', $event)"
        @update:playList="$emit('update:playList', recommendNewMusic)"
        v-for="(item, index) in recommendNewMusic"
        :key="index"
        :newListitem="item"
        :index="index"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      ></NewListItem>
    </ul>
  </section>
</template>
<script>
import BorderTitle from "@/components/BorderTitle.vue";
import NewListItem from "@/components/NewListItem.vue";
export default {
  props: {
    recommendNewMusic: {
      type: Array,
    },
  },

  components: {
    BorderTitle,
    NewListItem,
  },
};
</script>
<style scoped lang="less">

</style>