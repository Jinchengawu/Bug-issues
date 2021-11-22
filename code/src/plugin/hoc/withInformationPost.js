
import { useCreateWgts,$w_store } from '../wgtsStore'
import {getRandwords} from './utils'

// 绑定普通字段
function doBindKey(keys,key,type,ctx){
  // 
  // ctx.setState(
  //   {'__propsMap':ctx.state['__propsMap'][type][index](key)}
  // )  

  const setState = ctx.setState
  ctx.setState = (...arg)=>{
    setState.apply(ctx,...arg)
    if(arg.length){
      for(let i in arg[0]){
        if(keys.indexOf(i)>-1){
          // $w_store.emit(type+'_'+i+'_'+key,arg[i])          
          // setTimeout(()=>ctx.forceUpdate(),100)
        }
        // console.log('bindPropsMap-key',type+'_'+i+'_'+key)
      }
      // console.log('bindPropsMap-setState1',...arg)
      // console.log('bindPropsMap-setState2',arg[0])
    }
  }
}
// 绑定回调方法
function doBindFun(key,val,target){

}
function bindPropsMap(maps,ctx){
  const keys = Object.keys(maps)
  const values = Object.values(maps)

  // doBindKey(keys,maps.__key,maps.__type,ctx)
  // keys.forEach((d,idx)=>doBindKey(d,values[idx],type,ctx))
  // values.forEach((d,idx)=>{
  //   if(typeof d == 'function'){
  //     doBindFun(keys[idx],d,null)
  //   }
  // })
}

//父组件信道
export default function withInformationPost(targetCtx) {

  return function(Component){
    return class withInformationPostComponent extends Component {
      constructor(props) {     
        super(props)
        
        // const setState = this.setState
        // this.setState = (...arg)=>{
        //   setState.apply(this,...arg)
        //   if(arg.length){
        //     for(let i in arg[0]){
        //       // if(keys.indexOf(i)>-1){
        //       //   // $w_store.emit(type+'_'+i+'_'+key,arg[i])          
        //       //   // setTimeout(()=>ctx.forceUpdate(),100)
        //       // }
        //       // console.log('bindPropsMap-key',type+'_'+i+'_'+key)
        //     }
        //     // console.log('bindPropsMap-setState1',...arg)
        //     // console.log('bindPropsMap-setState2',arg[0])
        //   }
        // }


        // 本地存储一个 页面 -> 同类型组件 下表数组；用来缓存渲染历史；防止多次创建;
        this.state['__cmpList'] = {}
        this.state['__propsMap'] = {}
      }
      getId(){
        console.log('getId:getRandwords')
        return getRandwords()
      }
      // 要保证 页面多次加载 缓存不冲突；
      bindOnly(type,key,index,bindProps){
        bindProps.__key = key
        bindProps.__type = type
        // console.log('生产id',cmp_key) 
        const n__cmpList = this.state['__cmpList'][type] || {}
        // const __propsMap = this.state['__propsMap'][type] &&
        console.log('bindProps',bindProps)
        // console.log('__propsMap',__propsMap)
        // if(__cmpList&&__cmpList.indexOf(index)>-1) return 

        // if(!__cmpList) this.state['__cmpList'][type] = {}
        n__cmpList[key] = {
          ...bindProps
        }
        // if(!__propsMap) this.state['__propsMap'][type] = []
        
        // bindPropsMap(bindProps,this)
        // this.state[key] = true
        $w_store.setCmp(type,key,{...bindProps,type:true})
        this.state['__cmpList'][type] = n__cmpList

        // this.state['__cmpList'] = 
        // this.setState({
        //   __cmpList:this.state['__cmpList'],
        // })
        // console.log('n__cmpList2',this.state['__cmpList'])
      }
    }
  }
}
