<template>
  <div class="play" :class="{ paused: paused }">
    <!-- 播放组件 -->
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      controls
      autoplay
      style="width: 100%; height: 40px"
      ref="audio"
      controlslist="nodownload nofullscreen noremoteplayback"
      :disablePictureInPicture="true"
    ></audio>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated animate__animated animate__slideInUp"
      leave-active-class="animated animate__animated animate__slideOutDown"
    >
      <div class="play-bar" v-show="showPlayBar" @click="showPlayBar = false">
        <img :src="picUrl" alt="" />
        <h6>{{ currentMusic.name }}</h6>
        <div class="control">
          <canvas width="45" height="45" ref="circle"></canvas>
          <span class="icon" v-if="paused" @click.stop="togglePlay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-play"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
              />
            </svg>
          </span>
          <span class="icon" v-else @click.stop="togglePlay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-pause"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"
              />
            </svg>
          </span>
        </div>

        <div class="progressBar">
          <ProgressBar
            :currentTime="currentTime"
            :duration="duration"
            @update:currentTime="$refs.audio.currentTime = $event"
          ></ProgressBar>
        </div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated animate__animated animate__slideInLeft"
      leave-active-class="animated animate__animated animate__slideOutLeft"
    >
      <div class="play-full" v-if="!showPlayBar">
        <!-- 遮罩层 -->
        <!-- || currentMusic.al.picUrl -->
        <div
          class="fullMask"
          :style="{ background: `url('${currentMusic.picUrl}')` }"
        ></div>

        <PlayFullTop
          @show-play-bar="showPlayBar = true"
          :currentMusic="currentMusic"
          >PlayFullTop</PlayFullTop
        >
        <template>
          <PlayFullLyric
            v-if="showLyric"
            @show-play-lyric="showLyric = !showLyric"
            :currentMusic="currentMusic"
            :currentTime="currentTime"
            @update:currentTime="$refs.audio.currentTime = $event"
            >PlayFullLyric</PlayFullLyric
          >
          <PlayFullChar
            v-else
            :paused="paused"
            @show-play-lyric="showLyric = !showLyric"
            :currentMusic="currentMusic"
            @update:paused="fullPaused"
            >PlayFullChar</PlayFullChar
          >
        </template>
        <PlayFullBottom
          :currentTime="currentTime"
          :duration="duration"
          @update:currentTime="$refs.audio.currentTime = $event"
          :paused="paused"
          @update:paused="bottomPaused"
          @nextPlay="nextPlay"
          @prevPlay="prevPlay"
          >PlayFullBottom</PlayFullBottom
        >
      </div>
    </transition>
  </div>
</template>
<script>
import PlayFullTop from "@/components/PlayFullTop.vue";
import PlayFullChar from "@/components/PlayFullChar.vue";
import PlayFullLyric from "@/components/PlayFullLyric.vue";
import PlayFullBottom from "@/components/PlayFullBottom.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  components: {
    PlayFullTop,
    PlayFullChar,
    PlayFullLyric,
    PlayFullBottom,
    ProgressBar,
  },
  props: ["currentMusic", "playList", "currentIndex"],
  methods: {
    drawCircle(n, total) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 45, 45);
      ctx.beginPath();
      ctx.strokeStyle = "#93cdf3";
      ctx.arc(21, 22, 21, Math.PI * -0.5, Math.PI * ((n / total) * 2 - 0.5));
      ctx.lineWidth = "3";
      ctx.stroke();
    },
    togglePlay() {
      let audio = this.$refs.audio;
      if (this.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    calculateNext() {
      // 计算当前播放模式  随机 单曲循环 顺序循环
    },
    nextPlay() {
      // console.log("下一曲");
      // 小说需要↓
      // this.currentIndex = this.playList.findIndex(
      //   (song) => this.currentMusic.id === song.id
      // );
      let nextIndex;
      if (this.currentIndex < this.playList.length - 1) {
        nextIndex = this.currentIndex + 1;
      } else {
        nextIndex = 0;
      }
      this.$emit("update:currentMusic", {
        newListitem: this.playList[nextIndex],
        index: nextIndex,
      });
      // console.log(nextIndex, this.playList[nextIndex]);
    },
    prevPlay() {
      let prevIndex;
      if (this.currentIndex > 0) {
        prevIndex = this.currentIndex - 1;
      } else {
        prevIndex = this.playList.length - 1;
      }
      this.$emit("update:currentMusic", {
        newListitem: this.playList[prevIndex],
        index: prevIndex,
      });
    },
    fullPaused(p) {
      this.paused = p;
      this.togglePlay();
    },
    bottomPaused(p) {
      this.paused = p;
      this.togglePlay();
    },
  },

  data() {
    return {
      paused: null,
      showPlayBar: true,
      showLyric: false,
      duration: 0,
      currentTime: 0,
    };
  },

  mounted() {
    // console.log("mounted", this.$refs.audio);

    let audio = this.$refs.audio;
    audio.addEventListener("pause", () => {
      this.paused = true;
    });
    audio.addEventListener("play", () => {
      this.paused = false;
    });
    audio.addEventListener("ended", () => {
      this.nextPlay();
    });

    //  var _this = this;  方法一，普通函数（this指向vue对象）
    // 箭头函数，this执行vue实例对象   this.duration = this.$refs.audio.duration;

    audio.addEventListener("durationchange", () => {
      this.duration = audio.duration;
    });
    audio.addEventListener("timeupdate", () => {
      this.currentTime = audio.currentTime;
      this.drawCircle(this.currentTime, this.duration);
    });
  },
  watch: {
    paused(bool) {
      this.$emit("update:paused", bool);
    },
  },
  computed: {
    picUrl() {
      var picUrl;
      // 判断点击的currenMusic音乐的图片地址
      if (this.currentMusic.al) {
        picUrl = this.currentMusic.al.picUrl;
      } else if (this.currentMusic.artists) {
        picUrl = this.currentMusic.artists[0].img1v1Url;
      } else {
        picUrl = this.currentMusic.picUrl;
      }
      return picUrl;
    },
  },
};
</script>
<style scoped lang="less">
.play {
  &.paused {
    .play-bar {
      img {
        animation-play-state: paused;
      }
    }
  }
  audio {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
}
.play-bar {
  background-color: rgb(255, 255, 255);
  border-top: 1px solid #eeeeee;
  box-shadow: 0px 0px 1px #000;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  z-index: 7;
  img {
    width: 40px;
    height: 40px;
    margin-top: 5px;
    border-radius: 50%;
    animation: playing 5s linear infinite 0s;
  }
  h6 {
    margin-left: 12px;
    width: 146px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0;
    color: #333;
  }
  .control {
    position: absolute;
    top: 4px;
    left: 0;
    span.icon {
      position: absolute;
      top: 12px;
      left: 45px;
      width: 30px;
      height: 30px;
      color: #333;
    }
  }
  .progressBar {
    position: absolute;
    top: 22px;
    left: 75px;
  }
}
.play-full {
  background: linear-gradient(
    to right,
    rgb(56, 56, 56),
    rgb(95, 95, 95),
    rgb(56, 56, 56)
  );

  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .fullMask {
    background-image: url("http://p2.music.126.net/1Sv8Koz6vioE6H-Pv2kjgw==/109951165451866191.jpg?imageView&thumbnail=50y50&quality=15&tostatic=0");
    // background-color: #161824;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transform: scale(1.5);
    transform-origin: center center;
    filter: blur(30px) brightness(0.5);
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: -1;
  }
}

@keyframes playing {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>