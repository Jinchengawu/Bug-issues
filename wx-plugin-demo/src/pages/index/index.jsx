import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Navigator } from '@tarojs/components'
import './index.css'

const myPluginInterface = Taro.requirePlugin('myPlugin')

export default class Index extends Component {
  componentDidMount () {
    myPluginInterface.sayHello()
    const answer = myPluginInterface.answer
    console.log('answer: ', answer)
  }
  componentWillMount(){
    console.log('Taro.request',Taro.request) 
    console.log('wx.request',wx.request)
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <avatar />
        <Navigator url='plugin://myPlugin/list'>
          Go to pages/list!
        </Navigator>
      </View>
    )
  }
}
  