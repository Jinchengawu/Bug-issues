
import { useCreateWgts,$w_store } from '../wgtsStore'
import {getRandwords} from './utils'
//父组件信道
export default function withInformationPost(targetCtx) {

  return function(Component){
    return class withInformationPostComponent extends Component {
      constructor(props) {     
        super(props)
        const post = this.setState
        this.setState = (...arg)=>{
          post.apply(this,...arg)
        }


        // 本地存储一个 页面 -> 同类型组件 下表数组；用来缓存渲染历史；防止多次创建;
        this.state['__cmpList'] = {}
        // 
      }

      // 要保证 页面多次加载 缓存不冲突；
      bindOnly(type,index){
        console.log('生产id',getRandwords()) 
        const __cmpList = this.state['__cmpList'][type]
        if(__cmpList&&__cmpList.find(index)>-1) return 
        if(!__cmpList) this.state['__cmpList'][type] = []
        
        const key = getRandwords()
        // this.state[key] = true
        $w_store.setCmp(type,key,true)
        this.setState({__cmpList:this.state['__cmpList'][type].push(index)})
        
        console.log('__cmpList',__cmpList)
      }

      componentDidUpdate(prevProps) {
        
        if (this.props.realCounter !== prevProps.virtualCounter) {
          this.props.realCounter  = prevProps.virtualCounter
          setTimeout(() =>{
            this.forceUpdate(()=>{
              // console.log('forceUpdate-run2',this.props)
              if(updatefetch&&updatefetch.length){
                // console.log('updatefetch',updatefetch)
                updatefetch.forEach(fn=>this[fn](prevProps))
              }
            })
          },100)          
        }
      }      
    }
  }
}
