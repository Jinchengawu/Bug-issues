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
    }],
    cmpList:[{
      val:222
    },{
      val:333
    }]
  }
  constructor(props){
    super(props)
    let t = 0;
    setInterval(()=>{      
      // $w_store.set('tData',t++)
      // console.log('setInterval',t)
      $w_store.showEvent()
      // $w_store.emit('Avatar_tData2',t++) 
      this.setState({t:t})
    },3000)
    
  }
  testCall(...arg){
    console.log('testCall',...arg)
  }
  render () {
    
    return (
      <View>
        {
          this.state.cmpList.map((cmp,index)=>{
            return <avatar bindStore={this.bindOnly('Avatar',index,{'tData2':cmp.val,'testCall':this.testCall})} />
          })
        }
        <avatar bindStore={this.bindOnly('Avatar',0,['tData2'])} id='avatar1' tData={222}/>
        {this.state.list.map(item => {
          return <ListItem name={item.name} value={item.value} key={item.name} />
        })}
        {this.state.t}
        <avatar bindStore={this.bindOnly('Avatar',1,['tData2'])}  id='avatar2' tData={222}/>
      </View>
    )
  }
}
