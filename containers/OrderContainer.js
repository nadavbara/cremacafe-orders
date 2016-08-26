import React, { Component } from 'react';
import Config from 'react-native-config';

import {
  Alert,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

import Collapsible from 'react-native-collapsible';
import Order from '../components/Order';


const styles = StyleSheet.create({
header: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    marginTop: 1,
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
		var type = this.props.type;
		var url = Config.admin_url+type+'/'+orderId;
		fetch(url,{
			headers:{
					'X-Authoriztion-Admin': Config.admin_pass
				},
				'timeout':1000*5,
		})
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
		const {orderId,onOrderReady,type} = this.props;
		return(
			<View>
				<TouchableNativeFeedback onPress={this._toggleExpanded} 
									     background={TouchableNativeFeedback.SelectableBackground()}>
					<View style={styles.header}>
						<Text style={styles.headerText}>{this.state.phoneNumber}</Text>
						<Text style={styles.headerText}>{this.state.userName}</Text>
						<Text style={styles.headerText}>{this.state.timeForPickup}</Text>
					</View>
				</TouchableNativeFeedback>
				<Collapsible collapsed={this.state.collapsed} align="center">
					<Order type={type} totalAmount={this.state.totalAmount} orderId={orderId} onOrderReady={onOrderReady} products={this.state.orderProducts}/>
				</Collapsible>
			</View>
		)
	}
}
