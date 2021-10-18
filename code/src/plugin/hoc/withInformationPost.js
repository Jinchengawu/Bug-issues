
import { useCreateWgts,$w_store } from '../wgtsStore'
import {getRandwords} from './utils'
// 初始化子组件
function initPropsVal(target,key,val){

}
// 绑定普通字段
function doBindKey(key,val,ctx){
  const post = ctx.setState
  ctx.setState = (...arg)=>{
    post.apply(ctx,...arg)
    console.log('bindPropsMap-setState',...arg)
    console.log('bindPropsMap-key',key)
  }
}
// 绑定回调方法
function doBindFun(key,val,target){
  
}
function bindPropsMap(maps,ctx){
  const keys = Object.keys(maps)
  const values = Object.values(maps)
  keys.forEach((d,idx)=>doBindKey(d,values[idx],ctx))
  values.forEach((d,idx)=>{
    if(typeof d == 'function'){

    }
  })
}

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
        this.state['__propsMap'] = {}
        // 
      }

      // 要保证 页面多次加载 缓存不冲突；
      bindOnly(type,index,bindProps){
        const key = getRandwords()
        console.log('生产id',type,'_'+key+'_',index) 

        const __cmpList = this.state['__cmpList'][type]
        const __propsMap = this.state['__propsMap'][type]
        console.log('__cmpList',__cmpList)
        console.log('__propsMap',__propsMap)
        if(__cmpList&&__cmpList.indexOf(index)>-1) return 
        if(!__cmpList) this.state['__cmpList'][type] = []
        if(!__propsMap) this.state['__propsMap'][type] = []

        

        bindPropsMap(bindProps,this)
        // this.state[key] = true
        $w_store.setCmp(type,key,true)
        this.setState({
          __cmpList:this.state['__cmpList'][type].push(index),
          __propsMap:this.state['__propsMap'][type].push(propsKey)
        })
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
