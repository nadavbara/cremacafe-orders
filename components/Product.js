import React from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
	text:{
		fontFamily:"VarelaRound-Regular",
		fontWeight: 'bold'
	},
	textHolder:{
		flex:1,
		//flexWrap:'wrap',
		flexDirection:'column',
		justifyContent: 'center'
	}
})

 const Product  = ({productName,productDetails,productExtraInfo,productAmount,productPrice}) => {
		return(
			<View style={styles.textHolder}>
				<Text style={styles.text}> פרטי ההזמנה:  {productDetails}</Text>
				<Text style={styles.text}> הערות הלקוח:  {productExtraInfo}</Text>
				<Text style={styles.text}> כמות:                 {productAmount} יחידות</Text>
				<Text style={styles.text}> סכום:                 {productPrice} ש"ח</Text>
			</View>
		)
}

export default Product;