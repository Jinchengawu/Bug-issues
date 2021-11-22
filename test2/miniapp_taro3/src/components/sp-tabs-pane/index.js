import React, { Component } from 'react';
import { View, Text } from "@tarojs/components";
import { connect } from "react-redux";
import { classNames, navigateTo } from "@/utils";
import "./index.scss";

function SpTabsPane(props) {
  let { className, children, index, current } = this.props;

  return (
    <View
      className={classNames(
        {
          "sp-tabs-pane": true,
          "sp-tabs-pane--active": index === current
        },
        className
      )}
    >
      {children}
    </View>
  );
}

export default SpTabsPane;
