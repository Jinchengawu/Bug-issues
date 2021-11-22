import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from "@tarojs/components";
import { SpGoodsItem } from "@/components";
import { pickBy, classNames, log } from "@/utils";
import { linkPage } from "./helper";
import { Tracker } from "@/service";
import { getDistributorId } from "@/utils/helper";
// import { CreateIntersectionObserver } from "@/utils/platform";
import { withLoadMore } from "@/hocs";
import "./goods-grid.scss";

// @withLoadMore
export default class WgtGoodsGrid extends Component {
  static options = {
    addGlobalClass: true
  };

  componentDidMount() {
    this.startTrack();
  }

  navigateTo(url, item) {
    Taro.navigateTo({ url });
    if (item) {
      // 商品卡触发
      Tracker.dispatch("TRIGGER_SKU_COMPONENT", item);
    }
  }

  handleClickMore = () => {
    const { moreLink } = this.props.info.config;
    if (moreLink.linkPage) {
      linkPage(moreLink.linkPage, moreLink);
    } else {
      this.navigateTo(`/pages/item/list?dis_id=${this.props.dis_id || ""}`);
    }
  };

  startTrack() {
    // const observer = new CreateIntersectionObserver({
    //   el: ".wgt-grid__loader-more"
    // });
    // observer.on( 'on-observer', () => {
    //   debugger
    // })

    // this.endTrack();
    // const observer = Taro.createIntersectionObserver({
    //   observeAll: true
    // });
    // observer.relativeToViewport({ bottom: 0 }).observe(".grid-item", res => {
    //   if (res.intersectionRatio > 0) {
    //     const { id } = res.dataset;
    //     const { data } = this.state.info;
    //     const curGoods = data.find(item => item.goodsId == id);
    //     Tracker.dispatch("EXPOSE_SKU_COMPONENT", curGoods);
    //   }
    // });
    // const observer = new IntersectionObserver(
    //   res => {
    //     const { isIntersecting } = res[0]
    //     if ( isIntersecting ) {
          
    //     }
    //   },
    //   {
    //     // root: document.querySelector(".home-wgts"),
    //     // threshold: [0, 0.8]
    //   }
    // );

    // observer.observe(document.querySelector(".wgt-grid__loader-more"));
    // this.observe = observer;
  }

  endTrack() {
    if (this.observer) {
      this.observer.disconnect();
      this.observe = null;
    }
  }

  handleClickItem(item) {
    const { distributor_id } = item;
    const dtid = distributor_id ? distributor_id : getDistributorId();
    Taro.navigateTo({
      url: `/pages/item/espier-detail?id=${item.goodsId}&dtid=${dtid}`
    });
    if (item) {
      // 商品卡触发
      Tracker.dispatch("TRIGGER_SKU_COMPONENT", item);
    }
  }

  render() {
    const { info, dis_id = "" } = this.props;
    if (!info) {
      return null;
    }

    const { base, data, config } = info;
    const goods = pickBy(data, {
      origincountry_img_url: {
        key: "origincountry_img_url",
        default: []
      },
      pics: ({ imgUrl }) => {
        return [imgUrl];
      },
      itemId: 'goodsId',
      itemName: "title",
      brief: "brief",
      promotion_activity: "promotion_activity",
      distributor_id: 'distributor_id',
      is_point: "is_point",
      price: ({ act_price, member_price, price }) => {
        if (act_price > 0) {
          return act_price;
        } else if (member_price > 0) {
          return member_price;
        } else {
          return price;
        }
      },
      market_price: "market_price"
    });
    log.debug("goods-grid:", goods);

    return (
      <View className={`wgt wgt-grid ${base.padded ? "wgt__padded" : null}`}>
        {base.title && (
          <View className="wgt__header">
            <View className="wgt__title">
              <Text>{base.title}</Text>
              <View className="wgt__subtitle">{base.subtitle}</View>
            </View>
            <View className="wgt__more" onClick={this.handleClickMore}>
              <View className="three-dot"></View>
            </View>
          </View>
        )}
        <View className="wgt__body with-padding">
          <View className="grid-goods out-padding grid-goods__type-grid wgt-grid__goods-wrap">
            {goods.map((item, idx) => (
              <View className="goods-item-wrap" key={`goods-item-wrap__${idx}`}>
                <SpGoodsItem info={item} />
              </View>
            ))}
          </View>
          <View className="wgt-grid__loader-more"></View>
        </View>
      </View>
    );
  }
}
