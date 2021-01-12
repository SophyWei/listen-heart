<template>
  <!-- 推荐 歌单组件  组页面 -->
  <div class="recommend">
    <div v-if="isLoading" class="isLoading">
      <span class="palying">
        <i></i>
        <i></i>
        <i></i>
      </span>
    </div>
    <template v-else>
      <RecommendPlayList :currentRecommends="currentRecommends"
        >推荐歌单</RecommendPlayList
      >
      <RecommendNewMusic
        @update:currentMusic="$emit('update:currentMusic', $event)"
        @update:playList="$emit('update:playList', $event)"
        :recommendNewMusic="recommendNewMusic"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
        >最新音乐</RecommendNewMusic
      >
    </template>
  </div>
</template>
<script>
import RecommendPlayList from "@/components/RecommendPlayList.vue";
import RecommendNewMusic from "@/components/RecommendNewMusic.vue";
export default {
  components: {
    RecommendNewMusic,
    RecommendPlayList,
  },
  data() {
    return {
      recommend: [],
      recommendNewMusic: [],
      currentRandomIndex: 0,
      isLoading: false,
      countComplated: 0,
    };
  },
  computed: {
    currentRecommends() {
      return this.recommend.slice(
        this.currentRandomIndex,
        this.currentRandomIndex + 6
      );
    },
  },

  created() {
    this.isLoading = true;
    this.axios
      .get("/personalized")
      .then((response) => {
        this.recommend = response.data.result;
      })
      .finally(() => {
        this.countComplated = this.countComplated + 1;
      });
    this.axios
      .get("/personalized/newsong")
      .then((response) => {
        this.recommendNewMusic = response.data.result;
      })
      .finally(() => {
        this.countComplated = this.countComplated + 1;
      });
  },
  activated() {
    this.currentRandomIndex = Math.floor(Math.random() * 24);
  },
  watch: {
    countComplated(n) {
      if (n >= 2) {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style lang="less">
.isLoading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .palying {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    i {
      width: 6px;
      height: 30px;
      background-color: lightcoral;

      animation: playing 0.6s linear -0.2s infinite alternate-reverse;

      transform-origin: bottom center;

      &:first-of-type {
        animation-delay: 0.1s;
        background-color: lightskyblue;
      }
      &:last-of-type {
        animation-delay: -0.4s;
        background-color: lightgreen;
      }
    }
  }
  @keyframes playing {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(0.2);
    }
  }
}
</style>