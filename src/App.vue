<template>
  <div id="app">
    <Play
      v-if="currentMusic"
      :currentMusic="currentMusic"
      @update:paused="paused = $event"
      :playList="playList"
      :currentIndex="currentIndex"
      @update:currentMusic="
        currentMusic = $event.newListitem;
        currentIndex = $event.index;
      "
    ></Play>
    <!-- v-bind:paused.sync="paused" (需要用v-bind接收并挂载在router-view上) ==  @update:paused="paused = $event" -->

    <HomeNav class="homeFixed" v-if="$route.meta.isShowNav"></HomeNav>

    <keep-alive>
      <router-view
        @update:currentMusic="
          currentMusic = $event.newListitem;
          currentIndex = $event.index;
        "
        v-bind:currentMusic="currentMusic"
        v-bind:paused="paused"
        @update:playList="playList = $event"
      />
    </keep-alive>
    <div class="bottomEmpty" v-if="currentMusic"></div>
  </div>
</template>
<script>
import HomeNav from "@/components/HomeNav";
import Play from "@/components/Play.vue";
export default {
  components: {
    HomeNav,
    Play,
  },
  data() {
    return {
      currentMusic: null,
      paused: null,
      playList: [],
      currentIndex: 0,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
body {
  margin: 0;
  padding: 0;
}
.bottomEmpty {
  height: 50px;
  width: 100%;
}

:root {
  --animate-duration: 300ms;
  /* --animate-delay: 0.9s; */
}
</style>
