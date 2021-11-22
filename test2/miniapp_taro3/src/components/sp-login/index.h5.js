import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View } from "@tarojs/components";
import { connect } from "react-redux";
import { AtButton } from "taro-ui";
import S from "@/spx";
import api from "@/api";
import { showToast, classNames, navigateTo } from "@/utils";
import { Tracker } from "@/service";
import "./index.scss";

// @connect(
//   () => ( {} ),
//   dispatch => ( {
//     setMemberInfo: memberInfo =>
//       dispatch( { type: "member/init", payload: memberInfo } )
//   } )
// )

function SpLogin(props) {
  const { className, children, size = "normal", circle = false, onChange } = this.props;
  const isLogin = S.getAuthToken();

  /**
   *
   */

  const handleOnChange = () => {
    onChange && onChange();
  };

  /**
   *
   */
  const handleOAuthLogin = () => {
    const { path } = this.$router;
    Taro.navigateTo({
      url: `/subpage/pages/auth/login?redirect=${encodeURIComponent(path)}`
    });
  };

  return (
    <View
      className={classNames(
        {
          "sp-login": true
        },
        className
      )}
    >
      {isLogin && children}
      {!isLogin && (
        <AtButton
          className="login-btn"
          type="primary"
          size={size}
          circle={circle}
          onClick={handleOAuthLogin}
        >
          {children}
        </AtButton>
      )}
    </View>
  );
}

export default SpLogin;
