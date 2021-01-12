<template>
  <div class="progressPlay">
    <span class="current">{{ current }}</span>
    <input
      type="range"
      :max="duration"
      step="1"
      @input="getVule"
      :value="currentTime"
      
    />
    <span class="durationTime">{{ durationTime }}</span>
  </div>
</template>
<script>
export default {
  props: ["currentTime", "duration"],

  computed: {
    current() {
      var currentMin = parseInt(this.currentTime / 60);
      var currentSec = parseInt(this.currentTime % 60);
      currentMin = currentMin < 10 ? "0" + currentMin : currentMin;
      currentSec = currentSec < 10 ? "0" + currentSec : currentSec;
      return currentMin + ":" + currentSec;
    },
    durationTime() {
      var durationMin = parseInt(this.duration / 60);
      var durationSec = parseInt(this.duration % 60);
      durationMin = durationMin < 10 ? "0" + durationMin : durationMin;
      durationSec = durationSec < 10 ? "0" + durationSec : durationSec;
      return durationMin + ":" + durationSec;
    },
  },
  methods: {
    getVule(e) {
      //   console.log(e.target.value);
      this.$emit("update:currentTime", e.target.value);
    },
  },
};
</script>

<style lang="less">
.progressPlay {
  color: #333;
  span{
    display: inline-block;
    padding: 0 5px;
    vertical-align: middle;;
  }

  input[type="range"] {
    margin-top: 2px;
    background-color: #ddddea;
    border-radius: 15px;
    width: 180px;
    -webkit-appearance: none;
    height: 6px;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: default;
    top: -5px;
    height: 13px;
    width: 13px;
    // transform: translateY(-4px);
    background: none repeat scroll 0 0 #777;
    border-radius: 15px;
    // -webkit-box-shadow: 0 -1px 1px black inset;
  }
}
</style>