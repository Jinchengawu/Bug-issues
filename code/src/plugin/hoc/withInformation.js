
import { useCreateWgts,$w_store } from '../wgtsStore'
import {getRandwords} from './utils'


function getId(type) {
  const getCmp = $w_store.getCmpList(type)
  console.log('getCmp',type,getCmp)
  for(let i in getCmp){
    if(getCmp[i]){
      $w_store.setCmp(type,i,false)
      return i
    } 
  }  
}
// 子组件使用信道
export default function withInformation(targetCtx) {

  return function(Component){
    return class withInformationComponent extends Component {
      constructor(props) {     
        super(props)
        console.log('withInformationComponent:this',this)
        console.log('withInformationComponent:props',this.props)
        console.log('withInformationComponent:state',this)
        const { className,propsDefault } = this
        if(className){
          const id = getId(className)
          console.log('getCmp_id',id)
          for(let i in propsDefault){
            let key = className+'_'+i +'_' + id //getRandwords()
            $w_store.addListener(key,(val)=>{
              console.log('change_this',this)
              console.log('withInformationComponent:change',i,key,val)
              this.setState({[i]:val})
            })
          }
        }
        // 
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
