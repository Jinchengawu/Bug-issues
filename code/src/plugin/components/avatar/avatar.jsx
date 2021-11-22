import React, { Component } from 'react'
import { View, Image ,Text} from '@tarojs/components'
import './avatar.scss'
// import { useCreateWgts } from '@p/spx/wgtsStore'
import { useCreateWgts,$w_store } from '../../wgtsStore'
import withInformation from '../../hoc/withInformation'

@withInformation()
export default class Avatar extends Component {
  propsDefault = {
    tData2:'233'
  }
  className = 'Avatar'

  constructor(props) {
    super(props)
    console.log('Avatar',this)
    
    console.log('$w_store',$w_store)
    this.state={
      className:'Avatar',
      d:$w_store.wgts_store.tData
    }
  }
  propsTestCall(){
    this.props.testCall(this.props.tData2)
  }
  render () {
    const {tData2} = this.state
    const {list} = this.props
    const propstData2 = this.props.tData2
    return (
      <View onClick={()=>this.propsTestCall()}>
        state:
        {tData2}
        props:
        {propstData2}
        {
          list&&list.map((d,index)=>(
            <View key={index}>
              <Text> {d.name}</Text>
              <Text> {d.value}</Text>
            </View>  
          ))
        }
        {/* <Image src='http://storage.360buyimg.com/taro-static/static/images/logo.png' /> */}
      </View>
    )
  }
}
