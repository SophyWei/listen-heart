<template>
  <form class="m-input" action="#">
    <div class="inputCover">
      <i class="search_icon icon"> </i>
      <input
        v-model.trim="musicValue"
        type="search"
        class="input"
        @focus="focusInput = true"
        @blur="focusInput = false"
        placeholder="搜索歌曲、歌手、专辑"
        @musicValue="musicValue = $event"
      />

      <!-- 点击删除输入框 -->
      <figure class="close" @click="musicValue = ''">
        <i class="empty-icon" :class="{ close_icon: !musicValue }"></i>
      </figure>
    </div>
  </form>
</template>
<script>
let _ = require("lodash");
export default {
  props: ["hotSearchMusic"],
  data() {
    return {
      musicValue: "",
      focusInput: false,
    };
  },
  methods: {
    getData: function () {
      if (this.musicValue) {
        this.axios
          .get("/search/suggest?keywords= " + this.musicValue + "&type=mobile")
          .then((response) => {
            this.$emit("searchList", response.data.result.allMatch);
          });
      }
    },
  },
  // 生命周期 【创建】之后才有 this
  created() {
    this.debouncedGetData = _.debounce(this.getData, 100);
  },

  watch: {
    focusInput(n) {
      this.$emit("focusInput", n);
      if (n) {
        if (this.musicValue) {
          this.debouncedGetData();
        } else {
          this.$emit("searchList", "");
        }
      }
    },
    musicValue: function (n) {
      // 如果输入框中有数据（n存在），就执行ajax请求
      if (n) {
        if (this.focusInput) {
          this.debouncedGetData();
        }
        this.$emit("searchValue", this.musicValue);
      } else {
        this.$emit("searchList", "");
        this.$emit("searchValue", "");
        this.$emit("hotSearchMusic", "");
      }
    },
    hotSearchMusic: function () {
      this.musicValue = this.hotSearchMusic;
    },
  },
};
</script>
<style lang="less">
form.m-input {
  padding: 15px 10px;
  border-bottom: 1px solid rgba(179, 167, 167, 0.1);
  .inputCover {
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
    .search_icon {
      position: absolute;
      left: 0;
      top: 9px;
      margin: 0 8px;
      vertical-align: middle;
    }
    .icon {
      width: 13px;
      height: 13px;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
    }
  }
  .input {
    width: 100%;
    height: 30px;
    line-height: 18px;
    background: rgba(0, 0, 0, 0);
    font-size: 14px;
    color: #333;
    border-radius: 0;
    border: 0;
    &:focus {
      border-radius: 0;
      border: 0;
      outline: none;
    }
    &:active {
      border-radius: 0;
      border: 0;
      outline: none;
    }
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    .close_icon {
      vertical-align: middle;
      display: none;
    }
    .empty-icon {
      vertical-align: middle;
      width: 14px;
      height: 14px;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==");
    }
  }
}
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}

.empty-icon {
  display: inline-block;
  background-position: 0 0;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>