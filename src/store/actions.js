import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

const actions = {
  //我们一般把复杂的操作放到actions里面
  //当我们想要获取vuex里面执行状态时 可以直接返回一个Promise
  addCart(context,payload){
    //判断新加入的商品是否已经加入过
    //写法一
    // let product = null;
    // for (let item of state.cartList) {
    //   if (payload.iid === item.iid){
    //     product = item
    //   }
    // }

    //写法二
    // let product = context.state.cartList.find(item => item.iid === payload.iid)
    // //如果已经加入过了 直接将count+1
    // //是第一次加入 就设置count = 1
    // if (product){
    //   context.commit(ADD_COUNTER,product)
    //   //product.count += 1
    // }else{
    //   payload.checked=true//默认加入就是选中状态
    //   payload.count = 1
    //   context.commit(ADD_TO_CART,payload)
    //   //context.state.cartList.push(payload)
    // }

    // console.log(context.state.cartList);
    return new Promise((resolve,reject)=>{
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      if (product){
        context.commit(ADD_COUNTER,product);
        resolve('当前物品数量加一')
      }else{
        payload.checked=true
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('物品加入购物车成功')
      }
    })
  }
}

export default actions
