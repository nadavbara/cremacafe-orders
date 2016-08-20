import React, { Component } from 'react';

import {
  Alert,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';

import Collapsible from 'react-native-collapsible';
import Order from '../components/Order';


const styles = StyleSheet.create({
header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    flex:1,
    flexDirection:'row-reverse',
    justifyContent:'space-between',
  	
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto'
  },
});

export default class OrderContainer extends Component{
	constructor(props){
		super(props);
		this.fetchOrderDetails = this.fetchOrderDetails.bind(this);
		this.state = {
			collapsed: true,
			userName:'',
			phoneNumber:'',
			timeForPickup:'',
			totalAmount:'',
			orderProducts:[],
			orderId:'',
		};
	}

	_toggleExpanded = () => {
    	this.setState({ collapsed: !this.state.collapsed });
    }

	componentDidMount = () => {
		const orderId = this.props.orderId;
		this.setState({orderId});
		this.fetchOrderDetails(orderId);
	}
	componentWillReceiveProps = (nextProps) =>{
		if(nextProps.orderId !== this.state.orderId){
			this.setState({orderId: nextProps.orderId});
			this.fetchOrderDetails(nextProps.orderId);
		}	
	}

	fetchOrderDetails(orderId){
		var url = 'http://192.168.0.109:5000/admin/orders/'+orderId;
		fetch(url)
				.then((response) => response.json())
				.then((responseJson)=> {
					this.extractValue(responseJson);
				})
				.catch((err) => {
					console.log(err);
				});
		this.setState({collapsed: true});

		}

	extractValue = (order) =>{
		const {userName,phoneNumber,timeForPickup,totalAmount,orderProducts} = order;
		const trimPhoneNumber = '0' + phoneNumber.substring(4,phoneNumber.length);
		this.setState({userName,phoneNumber:trimPhoneNumber,timeForPickup,totalAmount,orderProducts})
	}

	render(){	
		const {orderId,onOrderReady} = this.props;
		return(
			<View>
				<TouchableHighlight onPress={this._toggleExpanded}>
					<View style={styles.header}>
						<Text style={styles.headerText}>{this.state.phoneNumber}</Text>
						<Text style={styles.headerText}>{this.state.userName}</Text>
						<Text style={styles.headerText}>{this.state.timeForPickup}</Text>
					</View>
				</TouchableHighlight>
				<Collapsible collapsed={this.state.collapsed} align="center">
					<Order totalAmount={this.state.totalAmount} orderId={orderId} onOrderReady={onOrderReady} products={this.state.orderProducts}/>
				</Collapsible>
			</View>
		)
	}
}
