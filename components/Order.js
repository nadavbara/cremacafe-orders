import React ,{Component} from 'react';
import ProductsList from '../containers/ProductsList';

const MK = require('react-native-material-kit');
const {
  MKButton
} = MK;

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';



const styles = StyleSheet.create({
	content: {
  	//borderTopColor: '#EE7600',
  	//borderTopWidth: 1,
    //borderBottomColor: '#EE7600',
    //borderBottomWidth: 1,
    flex: 1,
    padding: 20,
    //height: 300,
    backgroundColor : 'white'
  },
  buttonHolder: {
  	marginTop: 30,
  },
  text: {
  	textAlign:'center',
  	fontWeight:'bold',
  	padding:0,
  	marginBottom : 5,
  }
})

const Order = (props) => {

		const {orderId,onOrderReady,products,totalAmount,type} = props;
    var text = (type == 'new') ? 'הזמנה מוכנה' : 'הזמנה נלקחה';
		const ColoredRaisedButton = MKButton.coloredButton()
		.withText(text)
		.withOnPress(() => {
			console.log(orderId);
			onOrderReady(orderId);
		})
		.build();

		return(
			<View style={styles.content}>
          		<ProductsList orderId={orderId} products={products}/>
            	<View style={styles.buttonHolder}>
            		<Text style={styles.text}> סכום כולל: {totalAmount} ש"ח</Text>
            		<ColoredRaisedButton/>
            	</View>
          	</View>
		)
	
}

export default Order;

