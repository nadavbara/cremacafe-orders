import React ,{Component} from 'react';
import ProductsList from '../containers/ProductsList';

const MK = require('react-native-material-kit');
const {
  MKButton,
  MKColor
} = MK;

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';



const styles = StyleSheet.create({
	content: {
    flex: 1,
    padding: 20,
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
  },
  buttons:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around' 
  }
})

const Order = (props) => {

		const {orderId,onOrderReady,onOrderUntaken,products,totalAmount,type} = props;
    let orderUntakenButton;
    let orderReadyButton;
    if(type !== 'untaken'){
      var readyText = (type == 'new') ? 'הזמנה מוכנה' : 'הזמנה נלקחה';
      var untakenText = (type == 'new') ? 'הזמנה בוטלה' : 'הזמנה לא נלקחה';
      const OrderReadyButton = MKButton.coloredButton()
        .withText(readyText)
  		  .withOnPress(() => {
  			   onOrderReady(orderId);
  		  })
  		  .build();
        
      const OrderUntakenButton = MKButton.coloredButton()
        .withBackgroundColor(MKColor.Orange)
        .withText(untakenText)
        .withOnPress(() => {
          onOrderUntaken(orderId);
        })
      .build();

      orderReadyButton = <OrderReadyButton/>
      orderUntakenButton = <OrderUntakenButton/>
    }
    

		return(
			<View style={styles.content}>
          		<ProductsList orderId={orderId} products={products}/>
            	<View style={styles.buttonHolder}>
            		<Text style={styles.text}> סכום כולל: {totalAmount} ש"ח</Text>
                <View style={styles.buttons}>
                    {orderUntakenButton}
                    {orderReadyButton}
                </View>
            	</View>
          	</View>
		)
	
}

export default Order;

