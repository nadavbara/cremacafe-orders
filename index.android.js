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

import Product from './components/Product';
import ProductsList from './containers/ProductsList';

const MK = require('react-native-material-kit');

import Collapsible from 'react-native-collapsible';

const {
  MKButton,
  MKColor,
} = MK;

MK.setTheme({
	primaryColor: MKColor.DeepOrange,
	accentColor: MKColor.Yellow,
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto'
  },
  content: {
  	borderTopColor: '#EE7600',
  	borderTopWidth: 1,
    borderBottomColor: '#EE7600',
    borderBottomWidth: 1,
    flex: 1,
    padding: 20,
    height: 300,
    backgroundColor : 'white'
  },
  buttonHolder: {
  	marginTop: 30,
    
    
  },
});

const ColoredRaisedButton = MKButton.coloredButton()
  .withText('ההזמנה מוכנה')
  .withOnPress(() => {
    console.log('pressed');
  })
  .build();


export default class Example extends Component {
	constructor(props){
		super(props);
		
		this.state = {collapsed: true,};
	}

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Accordion Example</Text>      
        <TouchableHighlight onPress={this._toggleExpanded}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Single Collapsible</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.content}>
          	<ProductsList orderId="456"/>
            <View style={styles.buttonHolder}>
            	<ColoredRaisedButton />
            </View>
          </View>
        </Collapsible>
        </View>

    );
  }
}

AppRegistry.registerComponent('Example', ()=> Example);