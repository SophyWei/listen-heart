<template>
  <li
    class="newListItem"
    @click="
      $emit('update:currentMusic', { newListitem, index });
      $emit('update:playList');
    "
  >
    <template v-if="newListitem.ar">
      <div :class="{ redcolor: index < 3}" class="musicIcon">
        {{ indexList }}
      </div>
    </template>
    <div class="newLeft">
      <p class="newListName">{{ newListitem.name }}</p>
      <div class="newListRecom">
        <template v-if="!remSongListId">
          <span class="iconSQ"></span>
        </template>
        <span> {{ singer }} </span>-
        <span>{{ newListitem.name }}</span>
      </div>
    </div>
    <div class="newRight">
      <span
        v-if="currentMusic && currentMusic.id === newListitem.id"
        class="palying"
        :class="{ paused: paused }"
      >
        <i></i>
        <i></i>
        <i></i>
      </span>
      <span class="pause" v-else></span>
    </div>
  </li>
</template>
<script>
export default {
  props: ["newListitem", "index", "currentMusic", "paused", "remSongListId"],
  data() {
    return {
      isShowList: false,
    };
  },
  methods: {},
  computed: {
    singer() {
      let singArr = [];
      if (this.newListitem.song) {
        this.newListitem.song.artists.forEach((element) => {
          // 渲染最新音乐数据
          // console.log(element);
          singArr.push(element.name);
        });
      } else if (this.newListitem.artists) {
        this.newListitem.artists.forEach((element) => {
          // 渲染搜索最佳推荐数据
          // console.log(element);
          singArr.push(element.name);
        });
      } else {
        // 渲染热歌榜数据
        this.newListitem.ar.forEach((element) => {
          singArr.push(element.name);
        });
      }
      return singArr.join(" / ");
    },
    indexList() {
      var num = this.index + 1;
      return num < 10 ? "0" + num : num;
    },
  },
};
</script>
<style scoped lang="less">
.newListItem {
  border-bottom: 1px solid rgba(148, 142, 142, 0.1);
  padding-left: 10px;
  display: flex;
  .musicIcon {
    // 热歌榜的列表起那面的图标
    display: flex;
    justify-self: center;
    align-items: center;
    width: 40px;
    color: #999;
    margin-right: -10px;
  }
  .redcolor {
    color: #df3436 !important;
  }
  .newLeft {
    flex: 1 1 auto;
    padding: 6px 0;
    .newListName {
      width: 70vw;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      line-height: 25px;
      font-size: 17px;
      color: #333333;
    }
    .newListRecom {
      font-size: 12px;
      position: relative;
      color: #888888;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 70vw;

      .iconSQ {
        display: inline-block;
        content: "";
        width: 12px;
        height: 8px;
        background: url("//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
          no-repeat;
        background-size: 166px 97px;
        margin-right: 4px;
      }
    }
  }
  .newRight {
    width: 42px;
    padding: 0 10px;
    display: flex;
    justify-self: center;
    align-items: center;

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
      &.paused {
        i {
          animation-play-state: paused;
        }
      }
    }
    .pause {
      display: inline-block;
      background: url("//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
        no-repeat -24px 0;
      width: 24px;
      height: 24px;
      background-size: 166px 97px;
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
</style>