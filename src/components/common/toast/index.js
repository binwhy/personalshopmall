import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  //思路一 不行这里，vue初始化的时候还为挂载
  //console.log(Toast.$el);
  //document.body.appendChild(Toast.$el)


  //思路二：
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.new的形式，根据组件构造器，可以创建出一个组件对象
  const toast = new toastContrustor()

  //3.手动的将组件对象挂载到某个元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el对象就是div 我们再将整个对象挂载到body里面
  document.body.appendChild(toast.$el)

  //在Vue原型中定义一个$toast
   Vue.prototype.$toast = toast;
}

export default obj
