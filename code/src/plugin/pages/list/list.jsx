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
    }],t:0
  }
  constructor(props){
    super(props)
    let t = 0;
    setInterval(()=>{      
      // $w_store.set('tData',t++)
      // console.log('setInterval',t)
      // $w_store.showEvent()
      // $w_store.emit('Avatar_tData2',t++) 
      let {list} = this.state
      // list = list.map(d=>d.value += t)
      // this.setState({list})
      // this.setState({t:t++},()=>{
      //   console.log('this.state',this.state)
      //   console.log('this.state',t)
      // })
      // this.add()
      
    },3000)
    
  }
  add(){
    const list = [...this.state.cmpList]
    // console.log('add-this.state',this)
    list[0].val+=1
    list[1].val+=2
    this.setState({cmpList:list})
    // this.forceUpdate(()=>{
    // })
    // console.log('cmpList[0].val',cmpList[0].val)
    // console.log('add-this.state',this.state)
  }
  testCall(...arg){
    console.log('testCall',...arg)
    this.add()
  }
  render () {
    const {cmpList,list,t} = this.state
   
    return (
      <View>
        {cmpList[0].val}
        {
          cmpList.map((cmp,index)=>{
            return <avatar key={cmp.val} bindStore={this.bindOnly('Avatar',this.getId(),index,{'tData2':cmp.val,'testCall':(arg)=>this.testCall(arg),'list':list})} />
          })
        }
        {/* <avatar bindStore={this.bindOnly('Avatar',0,['tData2'])} id='avatar1' tData={222}/> */}
        {list.map(item => {
          return <ListItem  name={item.name} value={item.value} key={item.name} />
        })}
        {t}
        <View onClick={()=>this.add()}>点击测试</View>
        {/* <avatar bindStore={this.bindOnly('Avatar',1,['tData2'])}  id='avatar2' tData={222}/> */}
      </View>
    )
  }
}
