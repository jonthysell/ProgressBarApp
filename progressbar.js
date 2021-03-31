'use strict';
import React from 'react';
import { requireNativeComponent } from 'react-native';

const MUXCProgressBar = requireNativeComponent('MUXCProgressBar');

export default class ProgressBar extends React.Component {
  render() {
    const {style, height, width, ...remaining} = this.props;
    const stylesFromProps = {
      width: width,
      height: height,
    };
    return (
      <MUXCProgressBar {...remaining} style={[stylesFromProps, style]} />
    )
  }
}
