<template>
  <!-- 歌词播放页面的头部 组件 -->
  <div class="fullTop">
    <div class="back">
      <span @click="$emit('show-play-bar')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </span>
    </div>
    <div class="musicRec">
      <p class="musicName">{{ currentMusic.name }}</p>
      <p class="autoName">
        <span>
          {{ singer }}
        </span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["currentMusic"],
  computed: {
    singer() {
      let singArr = [];
      if (this.currentMusic.song) {
        this.currentMusic.song.artists.forEach((element) => {
          // 渲染最新音乐数据
          // console.log(element);
          singArr.push(element.name);
        });
      } else if (this.currentMusic.artists) {
        this.currentMusic.artists.forEach((element) => {
          // 渲染搜索最佳推荐数据
          // console.log(element);
          singArr.push(element.name);
        });
      } else {
        // 渲染热歌榜数据
        this.currentMusic.ar.forEach((element) => {
          singArr.push(element.name);
        });
      }
      return singArr.join(" / ");
    },
  },
};
</script>

<style scoped lang="less">
.fullTop {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(134, 134, 134, 0.904);
}
.back {
  position: absolute;
  top: 13px;
  left: 0;
  span {
    font-size: 20px;
    color: aliceblue;
  }
}
.musicRec {
  width: 100%;
  color: aliceblue;
  // text-align: center;
  padding: 0px 40px;
  margin-top: 5px;

  .musicName {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
  }
  .autoName {
    width: 100%;
    font-size: 16px;
    color: rgb(170, 170, 170);
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>