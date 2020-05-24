import {ADD_COUNTER,ADD_TO_CART,CHANGE_CHECK_STATUS,SELECT_ALL,SUBSTRACT_COUNTER} from "./mutations-types";

const mutations = {
  //mutations 唯一目的是修改state中状态
  [ADD_COUNTER](state,payload) {
    payload.count++
  },
  [SUBSTRACT_COUNTER](tate,payload) {
    if (payload.count !== 1){//最低减到一件
      payload.count--
    }
  },
  [ADD_TO_CART](state,payload) {
    state.cartList.push(payload)
  },
  //修改购物车中的商品是否被选中
  [CHANGE_CHECK_STATUS](state,payload){
    payload.checked = !payload.checked
  },
  [SELECT_ALL](state,payload) {
    for (let item of state.cartList){
      item.checked = payload
    }
  }
}

export default mutations
