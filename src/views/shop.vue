<template>
  <div id="main">
    <div class="sku-box store-content"> 
      <div class="gray-box">
        <div class="item-box">
          <shop-item
            v-for="(item, index) in goodsShow"
            :item="item"
            :key="index"
          ></shop-item>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
import goodData from '@/lib/newGoodsData'
import shopItem from '@/components/shop-item'
import prompt from '@/components/prompt'
import axios from 'axios/index';
export default {
  data() {
    return {
      goodsList: goodData,
      goodsShow: []
    }
  },
  watch: {
    "$route": 'reseat'
  },
  mounted() { 
    this.getDataList();

    const param1=this.$route.query.a
    console.log(param1);
  },
  components: {
    shopItem,
    prompt
  },

  computed: {
    shopType(){
      return this.$route.query.a
    }
  },

  methods: {
    reseat() {
      if (this.$route.path == '/phone') {
        this.goodsShow = this.goodsList[1];
      } else {
        //this.goodsShow = this.goodsList[0];
        this.getDataList();
      }
    },

    //获取商品列表
    getDataList() {
      //console.log("dddd",this.shopType);
      const params ={
        entityQuery:{
        PageSize:20,
        StartIndex:0,
        TypeCode:this.shopType,
      }};

      axios.get("/api/GoodsInfo/CustomQueryEntityList", {params}).then(response => {
        console.log('responseabc', response);
        //this.goodsShow = response;
        if (response && response.data && response.data.Data && response.data.Data.Page) {
          //total.value = response.data.Data.TotalCount;
          const lists = response.data.Data.Page;
          this.goodsShow = lists;          
          //console.log("dddd2",lists);
          //console.log('response', this.goodsShow);
        } else {
          this.goodsShow = [];
        }
      });
    }
  },
  watch:{
    shopType(newVal,oldVal)
    {
      this.getDataList()
    }
  }
}
</script>

<style>
.sku-box {
  position: relative;
}

.sort-option {
  border-top: 1px solid #d8d8d8;
  color: #999;
}

.sort-option ul {
  height: 60px;
  line-height: 60px;
}

.sort-option li {
  position: relative;
  float: left;
  padding-left: 42px;
}

.sort-option li:first-child {
  padding-left: 9px;
}

.sort-option li:before {
  content: " ";
  display: block;
  position: absolute;
  left: 20px;
  top: 50%;
  width: 2px;
  height: 2px;
  margin-top: -1px;
  background: #c7c7c7;
}

.sort-option li:first-child:before {
  display: none;
}

.sort-option a {
  display: block;
  font-size: 12px;
  color: #999;
}

.sort-option a.active,
.sort-option a:hover {
  color: #5683ea;
}

.gray-box {
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}

.sku-box .item-box {
  clear: both;
  overflow: hidden;
  margin: 0 -1px -1px -1px;
}
</style>
