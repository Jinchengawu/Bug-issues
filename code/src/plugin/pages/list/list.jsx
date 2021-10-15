import React, { Component } from 'react'
import { View } from '@tarojs/components'
import ListItem from '../../components/listItem/listItem'
// import Avatar from '../../components/avatar/avatar'
// import './index.scss'
import { useCreateWgts,$w_store } from '../../wgtsStore'
import withInformationPost from '../../hoc/withInformationPost'

@withInformationPost()
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
  constructor(props){
    super(props)
    let t = 0;
    setInterval(()=>{      
      // $w_store.set('tData',t++)
      // console.log('setInterval',t)
      $w_store.showEvent()
      $w_store.emit('Avatar_tData2',t++) 
      
    },3000)
    
  }

  render () {
    
    return (
      <View>
        <avatar bindStore={this.bindOnly('avatar',0)} id='avatar1' tData={222}/>
        {this.state.list.map(item => {
          return <ListItem name={item.name} value={item.value} key={item.name} />
        })}
        <avatar bindStore={this.bindOnly('avatar',1)}  id='avatar2' tData={222}/>
      </View>
    )
  }
}
