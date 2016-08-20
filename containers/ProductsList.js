import React, { Component } from 'react';
import Product from '../components/Product'

import {
  Text,
  ListView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';


const styles = StyleSheet.create({
  listView: {
  	//flex: 1,
  },

  row:{
  	borderBottomColor:'#EE7600',
  	borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default class ProductsList extends Component{

		constructor(props){
			super(props);
			this.state = {products:[]};
		}

		componentWillReceiveProps(nextProps){
			var products = nextProps.products;
			this.setState({products});
		}

		renderRow = (rowData,index) => {
			return (
				<View key={index} style={styles.row}>
					<Product key={index} {...rowData}/>
				</View>
			)
		}

		render(){
			return(
				<View>
					{this.state.products.map(this.renderRow)}
				</View>
            
			)
		}
}

