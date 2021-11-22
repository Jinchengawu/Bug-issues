import Taro from "@tarojs/taro";
import { Component } from "react";
import { View, Image, Navigator } from "@tarojs/components";

import req from "@/api/req";
import api from "@/api";
import {
  pickBy,
  classNames,
  isArray,
  styleNames,
  getThemeStyle,
} from "@/utils";
import {
  // AccountOfficial,
  SpStorePicker,
  // SpScancode,
  // SpRecommend,
  // SpSearch,
} from "@/components";
// import S from "@/spx";
import { Tracker } from "@/service";
import { setPageTitle, platformTemplateName } from "@/utils/platform";
// import HomeWgts from "./home/comps/home-wgts";

export default class Index extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        {/* <avatar tData={'2333'}/> */}
        <Navigator>test2</Navigator>

        <View className="block-hd">
          <SpStorePicker />
        </View>
      </View>
    );
  }
}
