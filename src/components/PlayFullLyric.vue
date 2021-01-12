<template>
  <!-- 歌词播放页面的歌词 组件 -->
  <div @click="$emit('show-play-lyric')" class="parseLyric">
    <!-- <div class="noLyric" v-if="!lyric">该歌曲没有歌词</div> -->
    <ul
      class="ulLyric"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      ref="ulLyric"
    >
      <li
        :class="{ listcolor: isShowColor == index }"
        v-for="(item, index) in lyricArr"
        :key="index"
      >
        {{ item.text || "---" }}
      </li>
    </ul>
    <div class="guideLine" v-if="isShowLine">
      <span class="leftTime"
        >时间

        <i class="line">----------------------------------------------------</i>
      </span>
      <span class="rightPlay" @click.stop="currentPlay">
        <svg
          data-v-49f11f1e=""
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          class="bi bi-play-circle"
        >
          <path
            data-v-49f11f1e=""
            fill-rule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          ></path>
          <path
            data-v-49f11f1e=""
            fill-rule="evenodd"
            d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["currentMusic", "currentTime"],
  data() {
    return {
      lyric: "",
      lyricArr: [],
      isShowColor: 0,
      touchScrollY: 0,
      currentY: 0, // 记录当前元素滑动的距离
      isShowLine: false,
      scrollIndex: 0, // 记录n滑动了的li数
    };
  },
  mounted() {
    this.axios.get("/lyric?id=" + this.currentMusic.id).then((response) => {
      this.lyric = response.data.lrc.lyric;
      this.lyricArr = this.parseLyric(this.lyric);
      this.playLyric(this.currentY);
    });
  },
  methods: {
    // 歌词处理
    parseLyric(lyric) {
      var reg = /\[\d{2,3}:\d{2}\.\d{2,3}\]/gi;
      var arr = lyric
        .split("\n")
        .filter((e) => e)
        .map((str) => {
          var time = str.match(reg)[0].replace(/(\[|\])/gi, "");
          var timeArr = time.split(":");
          time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
          var text = str.replace(reg, "");
          return {
            time,
            text,
          };
        });
      return arr;
    },
    // 歌词高亮
    playLyric(n) {
      this.i = this.lyricArr.findIndex((ele) => {
        // 存在就返回元素下标，不存在就返回-1
        return ele.time > this.currentTime;
      });
      this.i = this.i < 0 ? this.lyricArr.length : this.i;

      this.$refs.ulLyric.style.marginTop =
        -36 * (this.i - 1 + n + this.scrollIndex) + 100 + "px";
      // 因为有些歌词不独占一行，所以高亮的时候，会往下掉，或者是高亮的位置不过margionTop位置不对

      this.isShowColor = this.i - 1;
    },

    // 音乐播放到当前li
    currentPlay() {
      // clearTimeout(this.setTimer);
      this.$emit(
        "update:currentTime",
        this.lyricArr[this.i + this.scrollIndex].time
      );
    },

    // 触摸事件
    touchstart(e) {
      // 清空延时器
      clearTimeout(this.setTimer);

      // 触摸开始的位置
      this.touchstartY = e.touches[0].clientY;
    },
    touchmove(e) {
      this.isShowLine = true;
      this.playLyric(this.currentY);
      // 计算距离的差异
      // this.this.touchScrollY = this.touchstartY - e.touches[0].clientY;

      this.touchScrollY = Math.floor(
        (this.touchstartY - e.touches[0].clientY) / 36
      );
    },
    touchend() {
      this.currentY += this.touchScrollY;
      this.setTimer = setTimeout(() => {
        this.isShowLine = false;
        this.scrollIndex = 0;
      }, 3000);
    },
  },
  watch: {
    currentTime() {
      this.playLyric(this.currentY);
    },
    touchScrollY(n) {
      this.scrollIndex += n;
      // console.log("n",n, "\nscrollIndex",this.scrollIndex);
    },

    currentMusic() {
      this.axios.get("/lyric?id=" + this.currentMusic.id).then((response) => {
        this.lyric = response.data.lrc.lyric;
        this.parseLyric(this.lyric);
        this.lyricArr = this.parseLyric(this.lyric);
      });
    },
  },
};
</script>
<style scoped lang="less">
.parseLyric {
  width: 100%;
  height: 420px;
  overflow: hidden;
  margin-top: 30px;
  padding: 40px;

  ul {
    margin-top: 100px;
    transition: all 1s;
    li {
      text-align: center;
      line-height: 36px;
      color: white;
      &.listcolor {
        color: rgb(221, 219, 95);
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
  .guideLine {
    width: 98%;
    position: fixed;
    top: 45%;
    left: 1%;
    color: rgb(221, 219, 95);
    .leftTime {
      float: left;
      i {
        padding-right: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .rightPlay {
      float: right;
      vertical-align: middle;
      margin-top: 3px;
    }
  }
  .noLyric {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>