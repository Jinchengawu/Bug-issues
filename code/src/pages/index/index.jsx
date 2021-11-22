import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Navigator } from '@tarojs/components'
import './index.scss'



export default class Index extends Component {
  componentDidMount () {
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        {/* <avatar tData={'2333'}/> */}
        <Navigator url='plugin://myPlugin/list'>
          Go to pages/list!
        </Navigator>
      </View>
    )
  }
}
  