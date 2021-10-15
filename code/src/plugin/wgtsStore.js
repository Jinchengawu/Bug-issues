import { useState } from 'react'
import EventBus from './eventBus'
class WgtsStore {
  wgts_store = {
    __cmp_map:{

    }
  }
  self = null
  static create() {
    if (!this.self || window.wgts_store) {
      this.self = new WgtsStore()
      window.wgts_store = this.self
    }
    return this.self || window.wgts_store
  }
  set(key,val){
    this.wgts_store[key] = val    
  }
  // 对于组件队列的读写;
  setCmp(type,key,val){
    if(!this.wgts_store.__cmp_map[type]){
      this.wgts_store.__cmp_map[type] = {[key]:val}
    }else{
      this.wgts_store.__cmp_map[type][key] = val
    }
  }
  getCmp(type,key){
    return this.wgts_store.__cmp_map[type][key]
  }
  // 获取组件code map；
  getCmpList(type){
    return this.wgts_store.__cmp_map[type]
  }


  addListener(key,fn){
    EventBus.addListener(key,fn)
  }
  emit(key,arg){
    EventBus.emit(key,arg)
  }
  showEvent(){
    console.log('EventBus',EventBus)
  }
  get(key){
    return this.wgts_store[key]
  }
}
function getStore() {
  return WgtsStore.create()
}

export const $w_store = getStore()

function useCreateWgtsFn(refId = '', value = null) {
  //console.log('useCreateWgtsFn----value----->', value)
  const [wgt_value, _setValue] = useState(value)
  $w_store.wgts_store[refId] = wgt_value
  const setValue = (_value) => {
    console.log('setValue__value', _value)
    $w_store.wgts_store[refId] = _value
    return _setValue(_value)
  }
  return [wgt_value, setValue]
}

// eslint-disable-next-line import/prefer-default-export
export const useCreateWgts = useCreateWgtsFn
