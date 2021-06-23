import React, { Component } from 'react'
import { View } from '@tarojs/components'
import ListItem from '../../components/listItem/listItem'
import './list.css'
import Taro from '@tarojs/taro'
export default class Index extends Component {
  state = {
    list: [{
      name: 'A',
      value: '1'
    }, {
      name: 'B',
      value: '2'
    }, {
      name: 'C',
      value: '3'
    }]
  }
  componentWillMount(){
    console.log('Taro.request',Taro.request) 
    console.log('wx.request',wx.request)
  }
  render () {
    return (
      <View>
        {this.state.list.map(item => {
          return <ListItem name={item.name} value={item.value} key={item.name} />
        })}
      </View>
    )
  }
}
