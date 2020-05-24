<template>
  <div class="cart-bottom-bar">
    <div class="checked-all">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="selectAll"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计{{totalPrice}}
    </div>
    <div class="calculate">
      去计算:{{totalCount}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {SELECT_ALL} from "../../../store/mutations-types";
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.newPrice * item.count
        },0)
      },
      totalCount() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length != 0){
          //1.购物车不为空存在为未选择的商品 全选按钮为未选择状态
          if (this.$store.state.cartList.find(item => item.checked === false)){
            return false
          }else{//2.购物车不为空不存在未选择的商品 全选按钮为选择选择状态
            return true
          }
        }else{//为空默认为不全选
          return false
        }
      }
    },
    methods: {
      selectAll() {
        this.$store.commit(SELECT_ALL,!this.isSelectAll)
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    display: flex;
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 49px;
    line-height: 40px;
    font-size: 14px;
  }

  .checked-all {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    display: flex;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    flex: 1;
    margin-left: 30px;
    width: 40px;
  }

  .calculate {
    width: 100px;
    background-color: var(--color-high-text);
    color: #fff;
    text-align: center;
  }
</style>
