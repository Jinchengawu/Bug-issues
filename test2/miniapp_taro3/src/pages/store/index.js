import React, { Component } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components'
import { connect } from "react-redux";
import { SpToast, Loading, BackToTop } from '@/components'
import { AtTabBar } from 'taro-ui'
import req from '@/api/req'
import api from '@/api'
import { pickBy, normalizeQuerys, getCurrentRoute } from '@/utils'
import { setPageTitle, platformTemplateName } from "@/utils/platform";
import { withBackToTop } from '@/hocs'
import qs from 'qs';
import S from "@/spx";
import { WgtSlider, WgtImgHotZone, WgtMarquees, WgtNavigation, WgtCoupon, WgtGoodsScroll, WgtGoodsGrid, WgtShowcase, WgtSearchHome, WgtFilm } from '../home/wgts'

import './index.scss'

@connect(store => ({
  store
}))
@withBackToTop
export default class StoreIndex extends Component {
  $instance = getCurrentInstance();
  constructor (props) {
    super(props)

    this.state = {
      wgts: null,
      authStatus: false,
      isShowAddTip: false,
      localCurrent: 0,
      storeInfo: null,
      tabList: [
        { title: '店铺首页', iconType: 'home', iconPrefixClass: 'icon', url: '/pages/store/index' },
        { title: '商品列表', iconType: 'list', iconPrefixClass: 'icon', url: '/others/pages/store/list' },
        { title: '商品分类', iconType: 'category', iconPrefixClass: 'icon', url: '/others/pages/store/category' }
      ]
    }
  }


  async componentDidMount () { 
    const options = await normalizeQuerys(this.$instance.router.params)
    const id = options.id || options.dtid
      if(id){
      this.fetchInfo(id)
      }
  }

  componentDidShow = () => {
    Taro.getStorage({ key: 'addTipIsShow' })
      .then(() => {})
      .catch((error) => {
        console.log(error)
        this.setState({
          isShowAddTip: true
        })
      })
  }

  onShareAppMessage (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: this.state.storeInfo ? this.state.storeInfo.name : '店铺商品',
      path: `/pages/store/index?id=${this.$instance.router.params.id}`
    };
  }

  async fetchInfo (distributorId) {
    let id = ''
    let storeInfo = null
    if (distributorId) {
      id = distributorId
    } else {
      id = await Taro.getStorageSync('curStore').distributor_id
    }
    const { name, logo } = await api.shop.getShop({distributor_id: id})
        storeInfo = {
          name,
          brand: logo
        }
    const pathparams=qs.stringify({
      template_name:platformTemplateName,
      weapp_pages:'index',
      distributor_id:id
    })
        
    const url = `pagestemplate/shopDetail?${pathparams}`
    try {
      const info = await req.get(url)
      if (!S.getAuthToken()) {
        this.setState({
          authStatus: true
        })
      }
      this.setState({
        wgts: info.config,
        storeInfo: storeInfo
      },()=>{
        if(info.config) {
          info.config.map(item => {
            if(item.name === 'setting' && item.config.faverite) {
              this.nextPage()
            }
          })
        }
      })
    } catch (e) {
      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    }
  }

  async fetch (params) {
    const { page_no: page, page_size: pageSize } = params
    const query = {
      page,
      pageSize
    }
    const { list, total_count: total } = await api.cart.likeList(query)

    const nList = pickBy(list, {
      img: 'pics[0]',
      item_id: 'item_id',
      title: 'itemName',
      desc: 'brief',
    })

    this.setState({
      likeList: [...this.state.likeList, ...nList],
    })

    return {
      total
    }
  }

  handleClickLicense = () => {
    Taro.navigateTo({
      url: '/pages/home/license'
    })
  }

  handleClickCloseAddTip = () => {
    Taro.setStorage({ key: 'addTipIsShow', data: {isShowAddTip: false} })
    this.setState({
      isShowAddTip: false
    })
  }

  handleClick = async (current) => {
    const cur = this.state.localCurrent
    if (cur !== current) {
      const curTab = this.state.tabList[current]
      const { url } = curTab
      const options = await normalizeQuerys(this.$instance.router.params)
      const id = options.id || options.dtid
      const param = current === 1 ? `?dis_id=${id}` : `?id=${id}`
      const fullPath = ((getCurrentRoute(this.$instance.router).fullPath).split('?'))[0]
      if (url && fullPath !== url) {
        Taro.redirectTo({ url: `${url}${param}` })
      }
    }
  }

  render () {
    const { wgts, storeInfo, showBackToTop, scrollTop, tabList, localCurrent, isShowAddTip, authStatus } = this.state
    const user = Taro.getStorageSync('userinfo')
    const isPromoter = user && user.isPromoter

    

    if (!wgts || !this.props.store) {
      return <Loading />
    }
    return (
      <View className='page-store-index'>
        <ScrollView
          className='wgts-wrap wgts-wrap__fixed'
          scrollTop={scrollTop}
          onScroll={this.handleScroll}
          onScrollToLower={this.nextPage}
          scrollY
        >
          <View className='wgts-wrap__cont'>
            <View className='store-header'>
              <View>
                <Image className='store-brand' src={storeInfo.brand || 'https://fakeimg.pl/120x120/FFF/CCC/?text=brand&font=lobster'} />
              </View>
              <View className='store-name'>{storeInfo.name}</View>
            </View>
            {
              wgts.map((item, idx) => {
                return (
                  <View className='wgt-wrap' key={`${item.name}${idx}`}>
                    {item.name === 'search' && <WgtSearchHome info={item} dis_id={this.$instance.router.params.id} />}
                    {item.name === 'slider' && <WgtSlider info={item} />}
                    {item.name === 'film' && <WgtFilm info={item} />}
                    {item.name === 'marquees' && <WgtMarquees info={item} />}
                    {item.name === 'navigation' && <WgtNavigation info={item} />}
                    {item.name === 'coupon' && <WgtCoupon info={item} dis_id={this.$instance.router.params.id} />}
                    {item.name === 'imgHotzone' && <WgtImgHotZone info={item} />}
                    {item.name === 'goodsScroll' && <WgtGoodsScroll info={item} dis_id={this.$instance.router.params.id} />}
                    {item.name === 'goodsGrid' && <WgtGoodsGrid info={item} dis_id={this.$instance.router.params.id} />}
                    {item.name === 'showcase' && <WgtShowcase info={item} />}
                  </View>
                );
              })
            }
          </View>
        </ScrollView>

        <BackToTop
          show={showBackToTop}
          onClick={this.scrollBackToTop}
        />

        <SpToast />
        <AtTabBar
          fixed
          tabList={tabList}
          onClick={this.handleClick}
          current={localCurrent}
        />        
      </View>
    );
  }
}
