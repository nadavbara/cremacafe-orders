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
  },
  content: {
  	borderColor: '#EE7600',
  	borderWidth: 1,
    flex: 1,
    padding: 20,
    height: 300,
    backgroundColor : 'white'
  },
  buttonHolder: {
  	marginTop: 30,
    
    
  },
  scrollView: {

  },

  row:{
  	height: 80,
  }
});

const ColoredRaisedButton = MKButton.coloredButton()
  .withText('ההזמנה מוכנה')
  .withOnPress(() => {
    console.log('pressed');
  })
  .build();


 var testData = [
 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
 ];

export default class Example extends Component {
	constructor(props){
		super(props);
		ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			collapsed: true,
			dataSource : ds.cloneWithRows(testData),
		};
	}

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  buttonClicked = () => {
  	Alert.alert('title','message');
  }

  renderRow = (rowData) => {

    return (
    	<View style={styles.row}>
    		<Product {...rowData}/>
    	</View>
    	)
  }

  renderSeparator =  (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 4,
          backgroundColor: '#EE7600',
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Accordion Example</Text>      
        <TouchableHighlight onPress={this._toggleExpanded}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Single Collapsible</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed} style={styles.content} align="center">
          <View >
          	<ListView style={styles.scrollView}
          		scrollEventThrottle={200}
          		dataSource={this.state.dataSource}
          		renderRow={this.renderRow}
          		renderSeparator = {this.renderSeparator}
          		>
            </ListView>
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