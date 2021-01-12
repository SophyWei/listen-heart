<template>
  <!-- 搜索 组件组页面面 -->
  <div class="searchPage">
    <SearchBar
      @searchList="searchList1"
      @searchValue="searchValue = $event"
      :hotSearchMusic="hotSearchMusic"
      @focusInput="focusInput"
      @hotSearchMusic="hotSearchList = $event"
    ></SearchBar>
    <div v-if="!searchList" v-show="!hotSearchList" class="mDefault">
      <div class="hotSearch">
        <p>热门搜索</p>
        <ul>
          <li
            @click="passHotSearchMusic(item.first)"
            class="list-bd"
            v-for="(item, index) in hotList"
            :key="index"
          >
            <a href="javascript:void(0);">
              {{ item.first }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="searchList" class="suggestListBar">
      <h3 class="searchValue">搜索:"{{ searchValue }}"</h3>
      <ul class="suggestListUl">
        <li
          v-for="(item, index) in searchList"
          :key="index"
          @click="passHotSearchMusic(item.keyword)"
        >
          <i class="search_icon icon"></i>
          <span class="searchInfo">
            {{ item.keyword }}
          </span>
        </li>
      </ul>
    </div>
    <div v-if="hotSearchList" class="hotListBar">
      <h3 class="searchValue">最佳匹配</h3>
      <ul class="suggestListUl">
        <NewListItem
          @update:currentMusic="$emit('update:currentMusic', $event)"
          @update:playList="$emit('update:playList', hotSearchList)"
          v-for="(item, index) in hotSearchList"
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
import SearchBar from "@/components/SearchBar.vue";
import NewListItem from "@/components/NewListItem.vue";
export default {
  components: {
    SearchBar,
    NewListItem,
  },
  data() {
    return {
      searchList: "",
      hotList: [],
      hotSearchMusic: null,
      searchValue: null,
      hotSearchList: "",
      isLoading: false,
    };
  },
  methods: {
    passHotSearchMusic(m) {
      this.hotSearchMusic = m;
      this.getHotSearchList(m);
      this.searchList = "";
    },
    focusInput(n) {
      if (n) {
        this.hotSearchList = "";
      }
    },
    getHotSearchList(m) {
      this.axios.get("/search?keywords=" + m).then((response) => {
        this.hotSearchList = response.data.result.songs;
      });
    },
    searchList1(n) {
      if (this.searchValue) {
        this.searchList = n;
      }
    },
  },

  created() {
    this.axios.get("/search/hot").then((response) => {
      this.hotList = response.data.result.hots;
    });
  },
};
</script>
<style lang="less">
.searchPage {
  .mDefault {
    .hotSearch {
      p {
        font-size: 12px;
        line-height: 12px;
        color: #666;
        margin-left: 10px;
        margin-top: 10px;
      }
      ul {
        margin: 10px 10px 7px;
        li {
          display: inline-block;
          height: 32px;
          margin-right: 15px;
          margin-bottom: 10px;
          padding: 0 14px;
          font-size: 14px;
          line-height: 32px;
          color: #333;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 65px;
          a {
            color: #333;
            text-decoration: none;
          }
        }
      }
    }
  }
  .suggestListBar {
    padding-left: 10px;
    h3 {
      height: 50px;
      padding-right: 10px;
      font-size: 15px;
      line-height: 50px;
      color: #507daf;
      border-bottom: 1px solid rgba(179, 167, 167, 0.1);
    }
    ul {
      li {
        display: flex;
        align-items: center;
        height: 45px;
        border-bottom: 1px solid rgba(179, 167, 167, 0.1);
        .search_icon {
          vertical-align: middle;
          margin-right: 7px;
        }
        .icon {
          width: 15px;
          height: 15px;
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
          background-repeat: no-repeat;
        }
        span.searchInfo {
          display: inline-block;
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          width: 1%;
          padding-right: 10px;
          font-size: 15px;
          line-height: 45px;
          color: #333;
        }
      }
    }
  }
}
.isLoading {
  width: 100vw;
  height: 30vh;
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