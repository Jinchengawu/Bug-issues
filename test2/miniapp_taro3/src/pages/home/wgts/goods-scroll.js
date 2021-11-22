import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtCountdown } from "taro-ui";
import { calcTimer,classNames } from "@/utils";
import { SpImg,SpMoreImg } from "@/components";
import { linkPage } from "./helper";
import { getDistributorId } from "@/utils/helper";
import { withLoadMore } from '@/hocs';

import "./goods-scroll.scss";

// @withLoadMore
export default class WgtGoodsScroll extends Component {
  static options = {
    addGlobalClass: true,
    info: null
  };

  constructor(props) {
    super(props);

    this.state = {
      timer: null
    };
  }

  setTimer(){
    console.log("---setTimer---")
    const { info } = this.props;
    const { config } = info; 
    if (config.lastSeconds) {
      const timer = calcTimer(config.lastSeconds);
      this.setState({
        timer
      });
    }
  }

  componentDidMount() {
    this.setTimer() 
  }

  navigateTo(url) {
    Taro.navigateTo({ url });
  }

  handleClickItem(item) { 
    const { distributor_id } = item;
    const dtid = distributor_id ? distributor_id : getDistributorId();
    Taro.navigateTo({
      url: `/pages/item/espier-detail?id=${item.goodsId}&dtid=${dtid}`,
    });
  }

  navigateToList = (type, seckillId) => { 
    if (type === "goods") {
      this.navigateTo(`/pages/item/list?dis_id=${this.props.dis_id || ""}`);
    } else if (type === "limitTimeSale") {
      Taro.navigateTo({
        url: `/marketing/pages/item/seckill-goods-list?seckill_type=limited_time_sale&seckill_id=${seckillId}&dis_id=${this
          .props.dis_id || ""}`
      });
    } else {
      Taro.navigateTo({
        url: `/marketing/pages/item/seckill-goods-list?seckill_type=normal&seckill_id=${seckillId}&dis_id=${this
          .props.dis_id || ""}`
      });
    }
  };

  handleClickMore = () => {
    const { config } = this.props.info;
    const { moreLink={} } = config; 
    if (moreLink) {
      linkPage(moreLink.linkPage, moreLink);
    } else {
      this.navigateToList(config.type, config.seckillId);
    }
  };

  render() {
 
    const { info } = this.props;
    if (!info) {
      return null;
    }

    const { base, data, config,more } = info;
    const { timer } = this.state;  
 
    return (
      <View className={`wgt ${base.padded ? "wgt__padded" : null}`}>
        {base.title && (
          <View className="wgt__header">
            <View className="wgt__title">
              <Text>{base.title}</Text>
              {config.type === "goods" ? (
                <View className="wgt__subtitle">{base.subtitle}</View>
              ) : (
                <View>
                  {timer && config.lastSeconds != 0 ? (
                    <View>
                      <AtCountdown
                        className="countdown__time"
                        isShowDay
                        day={timer.dd}
                        hours={timer.hh}
                        minutes={timer.mm}
                        seconds={timer.ss}
                      />
                      {config.status==="in_the_notice"?"后开始":"后结束"}
                    </View>
                  ) : (
                    <View className="countdown__time">活动已结束</View>
                  )}
                </View>
              )}
            </View>
            <View className="wgt__more" onClick={this.handleClickMore}>
              <View className="three-dot"></View>
            </View>
          </View>
        )}
        <View className="wgt-body">
          <ScrollView className="scroll-goods" scrollX>
            {data.map((item, idx) => {
              const price = (
                (item.act_price
                  ? item.act_price
                  : item.member_price
                  ? item.member_price
                  : item.price) / 100
              ).toFixed(2);
              const marketPrice = (
                (item.act_price
                  ? item.price
                  : item.member_price
                  ? item.price
                  : item.market_price) / 100
              ).toFixed(2);
              return (
                <View
                  key={`${idx}1`}  
                  className={classNames("scroll-item", { 
                    "lastItem":idx===data.length-1
                  })}
                  onClick={this.navigateTo.bind(
                    this,
                    `/pages/item/espier-detail?id=${item.goodsId}&dtid=${item.distributor_id}`
                  )}
                >
                  {config.leaderboard && (
                    <View className="subscript">
                      <View className="subscript-text">NO.{idx + 1}</View>
                      <Image
                        className="subscript-img"
                        lazyLoad
                        src="/assets/imgs/paihang.png"
                      />
                    </View>
                  )}
                  <View className="thumbnail">
                    <SpImg
                      img-class="goods-img"
                      src={item.imgUrl}
                      mode="aspectFill"
                      width="240"
                      lazyLoad
                    />
                  </View>
                  {item.type === "1" && (
                    <View className="nationalInfo">
                      <Image
                        className="nationalFlag"
                        src={item.origincountry_img_url}
                        mode="aspectFill"
                        lazyLoad
                      />
                      <Text className="nationalTitle">
                        {item.origincountry_name}
                      </Text>
                    </View>
                  )}
                  {config.showPrice && (
                    <View className="goods-price">
                      <Text className="cur">¥</Text>
                      {price}
                      {marketPrice != 0 && (
                        <Text className="market-price">{marketPrice}</Text>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
            
            <SpMoreImg dataLength={data.length} config={config}  base={base} more={more} />

          </ScrollView>
        </View>
      </View>
    );
  }
}
