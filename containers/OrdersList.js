import React, { Component } from 'react';
import OrderContainer from './OrderContainer';
import Config from 'react-native-config';

import {
  Alert,	
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
} from 'react-native';


const styles = StyleSheet.create({

});

export default class OrdersList extends Component{

		constructor(props){
			super(props);
			this.createOrderContainer = this.createOrderContainer.bind(this);
			this.removeOrder = this.removeOrder.bind(this);
			this.state = {
				ordersIds:[],
				isRefreshing: false,
				frequency: 1000*60,
				interval: 0,
			};


		}

		componentDidMount = () => {
			//setInterval(this.fetchNewOrders.bind(this),this.state.frequency);
			this.fetchNewOrders();
		}

		fetchNewOrders(){
			var type = this.props.type;
			var url = Config.admin_url+type;
			fetch(url)
				.then((response) => response.json())
				.then((responseJson)=> {
					this.setOrderIds(responseJson);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		removeOrder(orderId){
			var ids = this.state.ordersIds;
			var index = ids.indexOf(orderId);
			ids.splice(index, 1);
			this.setState({orderIds:ids});
		}

		onOrderReady = (orderId) => {
			Alert.alert(
				'הזמנה מוכנה',
				'הודעה נשלחה ללקוח',
				[{text:'אישור',onPress: () => this.onOrderReadyAPICall(orderId)}]
			)
		}

		onOrderReadyAPICall = (orderId) => {
			var type = this.props.type;
			var url = Config.admin_orders_url+type+'/'+orderId;
			fetch(url)
				.then((response) => {
					this.removeOrder(orderId);
					this.fetchNewOrders();
					})
				.catch((err) => {
					console.log(err);
				});

		}

		setOrderIds(ordersIds){
			this.setState({ordersIds});
			this.setState({isRefreshing: false});
		}

		createOrderContainer(orderId,index){
			var handler = this.props.type == 'new' ? this.onOrderReady.bind(this) : this.onOrderReadyAPICall.bind(this)
			return <OrderContainer key={index} orderId ={orderId} type={this.props.type} onOrderReady={handler}/>
		}

		onRefresh(){
			this.setState({isRefreshing: true});
			this.fetchNewOrders();
		}

		render(){
			return(
				<ScrollView ref={(scrollView) => { _scrollView = scrollView; }}
							refreshControl={
								 <RefreshControl refreshing={this.state.isRefreshing} 
								 				 onRefresh={this.onRefresh.bind(this)}
								 				 />}
							automaticallyAdjustContentInsets={false}
							onScroll={() => { console.log('onScroll!'); }}
							scrollEventThrottle={200}
							style={styles.scrollView}>
							{this.state.ordersIds.map(this.createOrderContainer)}
				</ScrollView>
				
			)
		}
}

