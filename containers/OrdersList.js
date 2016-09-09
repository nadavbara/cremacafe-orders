import React, { Component } from 'react';
import OrderContainer from './OrderContainer';
import Config from 'react-native-config';
var Sound = require('react-native-sound');

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
			var whoosh = new Sound('notify.wav', Sound.MAIN_BUNDLE, (error) => {
				if (error) {
					console.log('failed to load the sound', error);
					} else { // loaded successfully
						console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
					}
				});
			this.state = {
				ordersIds:[],
				isRefreshing: false,
				frequency: 1000*60,
				interval: 0,
				whoosh: whoosh,
			};

			
		}

		componentDidMount = () => {
			setInterval(this.fetchNewOrders.bind(this),this.state.frequency);
			this.fetchNewOrders();
		}

		fetchNewOrders(){
			var type = this.props.type;
			var url = Config.admin_url+type;
			fetch(url,{
				headers:{
					'X-Authoriztion-Admin': Config.admin_pass
				},
				'timeout':1000*5,
			})
				.then((response) => response.json())
				.then((responseJson)=> {
					this.checkForNewOrders(responseJson);
					this.setOrderIds(responseJson);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		checkForNewOrders(ordersIds){
			if(this.props.type == 'new'){
				if(this.state.ordersIds.toString() != ordersIds.toString()){
					this.state.whoosh.play((success) => {
						if (success) {
							console.log('successfully finished playing');
						} else {
							console.log('playback failed due to audio decoding errors');
						}
					});

				}
			}
		}

		removeOrder(orderId){
			var ids = this.state.ordersIds;
			var index = ids.indexOf(orderId);
			ids.splice(index, 1);
			this.setState({orderIds:ids});
		}

		onOrderUntaken = (orderId) => {
			Alert.alert(
				'ההזמנה תבוטל',
				'אתה בטוח?',
				[
					{text:'אישור',onPress: () => this.onOrderReadyAPICall(orderId,'untaken')},
					{text:'ביטול'}
				]
			)
		}

		onOrderReady = (orderId) => {
			Alert.alert(
				'הזמנה מוכנה',
				'הודעה נשלחה ללקוח',
				[{text:'אישור',onPress: () => this.onOrderReadyAPICall(orderId,this.props.type)}]
			)
		}

		onOrderTaken = (orderId) => {
			this.onOrderReadyAPICall(orderId,this.props.type);
		}

		onOrderReadyAPICall = (orderId,type) => {
			var url = Config.admin_orders_url+type+'/'+orderId;
			fetch(url,{
				headers:{
					'X-Authoriztion-Admin': Config.admin_pass
				},
				'timeout':1000*5,
			})
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
			var orderReadyHandler = this.props.type == 'new' ? this.onOrderReady.bind(this) : this.onOrderTaken.bind(this)
			var orderUntakenHandler = this.onOrderUntaken.bind(this);
			return <OrderContainer key={index} orderId ={orderId} type={this.props.type} onOrderReady={orderReadyHandler} onOrderUntaken={orderUntakenHandler}/>
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
							scrollEventThrottle={200}
							style={styles.scrollView}>
							{this.state.ordersIds.map(this.createOrderContainer)}
				</ScrollView>
				
			)
		}
}

