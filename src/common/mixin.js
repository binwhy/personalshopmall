//这里存放公共的混入的东西
//什么时候使用混入 当我们多个地方使用相同的代码 或逻辑时 我们可以将这些抽离到一个文件中
//使用混入的方式进行使用
//它不会影响我们在相同的地方其他的调用
//例如下面的mounted里面 我们在组件中做了其他事情，当我们混入时它会合并一起执行 类似于类的继承
import {debounce} from "./utils";

export const itemListenerMixin ={
  data() {
    return {
      itemListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemListener = () => {
      newRefresh()
    }

    this.$bus.$on('itemImageLoad',this.itemListener)
  }
}
