import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
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
    console.log('tData',props)
    console.log('$w_store',$w_store)
    this.state={
      className:'Avatar',
      d:$w_store.wgts_store.tData
    }
  }
  render () {
    const {tData2} = this.state
    return (
      <View>
        {tData2}
        <Image src='http://storage.360buyimg.com/taro-static/static/images/logo.png' />
      </View>
    )
  }
}
