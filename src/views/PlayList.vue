<template>
  <div class="playlist">
    <div class="topInfo">
      <!-- 遮罩层 -->
      <div
        class="mask"
        :style="{
          background: `url('${remSongList.coverImgUrl}') 50% center / cover no-repeat`,
        }"
      ></div>
      <div class="InfoBar">
        <div class="infoLeft">
          <img :src="remSongList.coverImgUrl" alt="" />
          <span class="songList">歌单</span>
          <span class="playcount">{{
            remSongList.playCount | formatPlayCount
          }}</span>
        </div>
        <div class="infoRight">
          <h2>{{ remSongList.name }}</h2>
          <div class="authodId authodClip" v-if="remSongList">
            <a href="javascript:void(0);">
              <div class="authodhead">
                <img :src="remSongList.creator.avatarUrl" alt="" />
              </div>
              {{ remSongList.creator.nickname }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="play_list">
      <h3>歌曲列表</h3>
      <ul class="songIdsList">
        <NewListItem
          @update:currentMusic="$emit('update:currentMusic', $event)"
          @update:playList="$emit('update:playList', remSongIdsList)"
          v-for="(item, index) in remSongIdsList"
          :key="index"
          :newListitem="item"
          :index="index"
          :currentMusic="$attrs.currentMusic"
          :paused="$attrs.paused"
          :remSongListId="$route.query.id"
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
      remSongList: "",
      remSongIds: "",
      remSongIdsList: "",
    };
  },
  created() {
    this.getSongListDate();
  },
  methods: {
    getSongListDate() {
      if (this.$route.query.id) {
        this.axios
          .get("/playlist/detail?id=" + this.$route.query.id)
          .then((response) => {
            this.remSongList = response.data.playlist;
          });
        this.axios
          .get("/playlist/detail?id=" + this.$route.query.id)
          .then((response) => {
            this.remSongIds = response.data.playlist.trackIds
              .slice(0, 10)
              .map((e) => e.id)
              .join();
            this.axios
              .get("/song/detail?ids=" + this.remSongIds)
              .then((response) => {
                this.remSongIdsList = response.data.songs;
              });
          });
      }
    },
  },
  watch: {
    "$route.query.id"() {
      this.getSongListDate();
    },
  },
  // 过滤器管道
  filters: {
    formatPlayCount(value) {
      if (!value) return "";
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>
<style lang="less" scoped>
.playlist {
  .topInfo {
    background: linear-gradient(
      to right,
      rgb(75, 74, 74),
      rgb(189, 186, 186),
      rgb(58, 57, 57)
    );
    overflow: hidden;

    width: 100vw;
    height: 186px;
    position: relative;
    padding: 30px 10px 30px 15px;
    z-index: 1;
    .mask {
      // 遮罩层
      height: 100%;
      width: 100%;
      background-image: url("//music.163.com/api/img/blur/109951165525778915?param=170y170");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      transform: scale(1.5);
      position: absolute;
      left: 0;
      top: 0;
      transform-origin: center center;
      filter: blur(20px);
      overflow: hidden;
      z-index: -1;
    }
    .InfoBar {
      z-index: 2;
      display: flex;
      .infoLeft {
        width: 126px;
        height: 126px;
        background-color: #333;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        span.songList {
          position: absolute;
          z-index: 3;
          top: 10px;
          left: 0;
          padding: 0 8px;
          height: 17px;
          color: #fff;
          font-size: 9px;
          text-align: center;
          line-height: 17px;
          background-color: rgba(217, 48, 48, 0.8);
          border-top-right-radius: 17px;
          border-bottom-right-radius: 17px;
        }

        span.playcount {
          position: absolute;
          font-size: 12px;
          top: 0;
          right: 0;
          margin-right: 2px;
          color: #fff;
          width: 100%;
          height: 18px;
          text-align: right;
          background-image: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.2)
          );

          &::before {
            content: "";
            margin-right: 3px;
            background: no-repeat
              url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
            background-size: auto 100%;
            background-position: left center;
            display: inline-block;
            width: 1.2em;
            height: 0.9em;
          }
        }
      }
      .infoRight {
        flex: 1 1 auto;
        width: 1%;
        margin-left: 16px;
        h2 {
          padding-top: 1px;
          font-size: 17px;
          line-height: 1.3;
          color: #fefefe;
          height: 44px;
          display: -webkit-box;
          -webkit-box-pack: center;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .authodId {
          display: block;
          position: relative;
          margin-top: 20px;
          a {
            text-decoration: none;
            display: inline-block;
            color: hsla(0, 0%, 100%, 0.7);
            .authodhead {
              display: inline-block;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 5px;
              position: relative;
              img {
                width: 100%;
                vertical-align: middle;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
  .play_list {
    h3 {
      height: 23px;
      line-height: 23px;
      padding: 0 10px;
      font-size: 12px;
      color: #666;
      background-color: #eeeff0;
    }
  }
}

// 作者头像昵称那一栏
.authodClip {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
}
</style>