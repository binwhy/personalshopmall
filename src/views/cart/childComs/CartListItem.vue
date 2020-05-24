<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <CheckButton
        @CheckButtonClick="selectItem"
        :is-checked="shopInfo.checked"
      ></CheckButton>
    </div>
    <div class="item-img">
      <img :src="shopInfo.img" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{shopInfo.title}}</div>
      <div class="item-desc">商品描述: {{shopInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{shopInfo.newPrice}}</div>
        <div class="item-count right">
          <span @click="decrement">-</span>
          {{shopInfo.count}}
          <span @click="increment">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {CHANGE_CHECK_STATUS,ADD_COUNTER,SUBSTRACT_COUNTER} from "../../../store/mutations-types";
  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      shopInfo: {
        type:Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      selectItem() {
        this.$store.commit(CHANGE_CHECK_STATUS,this.shopInfo)
      },
      increment() {//只有选中才能加减
        if (this.shopInfo.checked === true){
          this.$store.commit(ADD_COUNTER,this.shopInfo)
        }
      },
      decrement(){
        if (this.shopInfo.checked === true){
          this.$store.commit(SUBSTRACT_COUNTER,this.shopInfo)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-list-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
