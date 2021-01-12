<template>
  <!-- 歌词播放页面的旋转图片 组件 -->
  <div class="showChar">
    <div class="rotateChar">
      <div class="rotateBg">
        <div class="rotateImg" :class="{ paused: paused }">
          <img
            :src="picUrl"
            alt=""
            @click.stop="$emit('update:paused', paused)"
          />
        </div>
        <div
          class="playPause"
          v-if="paused"
          @click.stop="$emit('update:paused', paused)"
        >
          <span class="paused">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="currentColor"
              class="bi bi-play-circle"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fill-rule="evenodd"
                d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="introChar" @click="$emit('show-play-lyric')">
      <p>歌词详情</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>

    </div>
  </div>
</template>
<script>
export default {
  props: ["currentMusic", "paused"],
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
.showChar {
  .rotateChar {
    width: 100%;
    height: 53vh;
    .rotateBg {
      position: relative;
      margin: 0 auto;
      margin-top: 15px;
      width: 296px;
      height: 296px;
      background: url("https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4602256867/5855/63fb/325b/d7e4e3a244701ee85fecb5d4f6b5bd57.png?imageView=&quality=75&thumbnail=200y200")
        no-repeat;
      background-size: contain;
      padding-top: 56px;
      .rotateImg {
        width: 184px;
        height: 184px;
        margin: auto;
        border-radius: 50%;
        background: url("//s3.music.126.net/mobile-new/img/disc_default.png?ba7c53e25dbac9fe14f024846ddb57d2=")
          no-repeat;
        background-size: contain;
        animation: playing 6s linear infinite 0s;
        &.paused {
          animation-play-state: paused;
        }
        img {
          border-radius: 50%;
          width: 184px;
          height: 184px;
        }
      }

      .playPause {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -40px;
        margin-left: -40px;
        span {
          color: white;
        }
      }
    }
  }
  .introChar {
    color: white;
    text-align: center;
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