import React, { Component } from 'react';

import {
  Text,
  View,
} from 'react-native';

export default class Product extends Component{

	

	render(){
		console.log(this.props)
		const {productName,productDetails,comments,productAmount,productSum} = this.props;
		return(
			<View>
				<Text> פרטי ההזמנה:  {productDetails}</Text>
				<Text> הערות הלקוח:  {comments}</Text>
				<Text> כמות:                {productAmount}</Text>
				<Text> סכום כולל:        {productSum} </Text>
				
			</View>
		)
	}

}