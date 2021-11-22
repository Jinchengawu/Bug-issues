
import { useCreateWgts,$w_store } from '../wgtsStore'
import {getRandwords} from './utils'


function getPropsInfo(type) {
  const getCmp = $w_store.getCmpList(type)
  console.log('getCmp',type,getCmp)
  for(let i in getCmp){
    const val = getCmp[i]
    if(val.type){
      val.type = false
      $w_store.setCmp(type,i,val)
      return {id:i,pProps:val}
    } 
  }  
}

function propsUpdatefetch(ctx,props){
  return setTimeout(() =>{
    ctx.forceUpdate(()=>{
      // console.log('propsUpdatefetch',ctx.props)
    })
  },100)
}

// 子组件使用信道
export default function withInformation(targetCtx) {

  return function(Component){
    return class withInformationComponent extends Component {
      constructor(props) {     
        props = props || {}

        super(props)
        // console.log('withInformationComponent:this',this)
        console.log('withInformationComponent:props',this.props)
        // console.log('withInformationComponent:state',this)
        const { className,propsDefault } = this
        if(className){
          const {id,pProps} = getPropsInfo(className)
          const propsMap = Object.assign({},propsDefault,pProps)
          // console.log('getCmp_id',id,propsMap)
          this.setState(pProps)
          for(let i in propsMap){
            let key = className+'_'+i +'_' + id //getRandwords()
            $w_store.addListener(key,(val)=>{
              // console.log('change_this',this)
              // console.log('withInformationComponent:change',i,key,val)
              // this.setState({[i]:val})
              this.props[i] = val
              // propsUpdatefetch(this)
            })
            // 初次绑定即init
            $w_store.emit(key,propsMap[i]) 
          }
        }
        // 
      }

      // componentDidUpdate(prevProps) {
        
      //   if (this.props.realCounter !== prevProps.virtualCounter) {
      //     this.props.realCounter  = prevProps.virtualCounter
      //     setTimeout(() =>{
      //       this.forceUpdate(()=>{
      //         // console.log('forceUpdate-run2',this.props)
      //         if(updatefetch&&updatefetch.length){
      //           // console.log('updatefetch',updatefetch)
      //           updatefetch.forEach(fn=>this[fn](prevProps))
      //         }
      //       })
      //     },100)          
      //   }
      // }      
    }
  }
}
