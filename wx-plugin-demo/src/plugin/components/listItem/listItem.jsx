import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './listItem.css'
import Taro from '@tarojs/taro'

export default class ListItem extends Component {
  componentWillMount(){
    console.log('Taro.request',Taro.request) 
    console.log('wx.request',wx.request)
  }
  render () {
    const { name, value } = this.props
    return (
      <View>
        <View>name: {name}</View>
        <View>value: {value}</View>
      </View>
    )
  }
}
