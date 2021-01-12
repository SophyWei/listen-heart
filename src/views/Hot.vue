<template>
  <!-- 热歌榜 组件  主界面 -->
  <div class="hotPage">
    <div class="hotTop">
      <div class="hotopct">
        <div class="u-hmsprt hoticon"></div>
        <div class="hotTime">
          <span>更新日期：</span>
          <span>{{ nowTime }}</span>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="isLoading">
      <span class="palying">
        <i></i>
        <i></i>
        <i></i>
      </span>
    </div>
    <div v-else class="hotList">
      <ul>
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
    </div>
  </div>
</template>
<script>
import NewListItem from "@/components/NewListItem.vue";
export default {
  components: {
    NewListItem,
  },
  data() {
    return {
      recommendNewMusic: [],
      isLoading: false,
    };
  },
  computed: {
    nowTime() {
      var times = new Date();
      return times.getMonth() + 1 + " 月 " + times.getDate() + " 日";
    },
    // 处理歌手名字
  },

  created() {
    this.isLoading = true;
    this.axios
      .get("/top/list?idx=1")
      .then((response) => {
        response.data.playlist.trackIds
          .slice(0, 20)
          .map((e) => e.id)
          .join();
        this.axios
          .get(
            "/song/detail?ids=" +
              response.data.playlist.trackIds
                .slice(0, 20)
                .map((e) => e.id)
                .join()
          )
          .then((response) => {
            this.recommendNewMusic = response.data.songs;
          });
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>
<style lang="less">
.hotPage {
  .hotTop {
    position: relative;
    padding-top: 38.9%;
    overflow: hidden;
    background: url(//s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252…=)
      no-repeat;
    background-size: contain;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .hotopct {
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      padding-left: 20px;
      box-sizing: border-box;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: center;
      .hoticon {
        width: 142px;
        height: 67px;
      }
      .u-hmsprt {
        background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
          no-repeat;
        background-position: -24px -30px;
        background-size: 166px 97px;
      }
      .hotTime {
        margin-top: 10px;
        color: hsla(0, 0%, 100%, 0.8);
        font-size: 12px;
        transform-origin: left top;
        transform: scale(0.91);
      }
    }
  }
}
.isLoading {
  width: 100vw;
  height: 80vh;
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
