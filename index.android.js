import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import OrdersList from './containers/OrdersList';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;

MK.setTheme({
	primaryColor: MKColor.DeepOrange,
	accentColor: MKColor.Yellow,
})

export default class Example extends Component {
	constructor(props){
		super(props);
	}

	refreshReady = (tab) => {
		var ref = tab.ref.ref;
		this.refs[ref].fetchNewOrders();
	}
  
  render() {
    return (
      <ScrollableTabView onChangeTab={this.refreshReady} tabBarUnderlineColor='#EE7600' tabBarActiveTextColor='#EE7600'  initialPage={2}>
      	<OrdersList ref="untaken" type = "untaken" tabLabel="לא נלקחו"/>
        <OrdersList ref="ready" type = "ready" tabLabel="מוכנות"/>
      	<OrdersList ref="new" type = "new" tabLabel="הזמנות"/>
      </ScrollableTabView>

    );
  }
}

AppRegistry.registerComponent('Example', ()=> Example);