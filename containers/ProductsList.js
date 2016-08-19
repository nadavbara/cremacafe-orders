import React, { Component } from 'react';
import Product from '../components/Product'

import {
  Text,
  ListView,
  StyleSheet,
  View,
} from 'react-native';


const styles = StyleSheet.create({
  listView: {
  	//flex: 1,
  },

  row:{
  	/*flex: 1,
  	flexWrap:'wrap',*/
    /*flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent:'flex-start',*/
  }
});

export default class ProductsList extends Component{

		constructor(props){
			super(props);
			productsData =  [];
			ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.state = {ds};
		}

		componentDidMount(){
			// var orderId = this.props.orderId;

			fetch('http://192.168.0.109:5000/admin/orders/57946716349bf81100368cc2')
				.then((response) => response.json())
				.then((responseJson)=> {
					this.setProductsData(responseJson.orderProducts);
				})
				.catch((err) => {
					console.log(err);
				});

			/*productsData = [
				 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
				 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
				 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
				 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
				 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
				 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
				 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
				 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
				 	{'productAmount':'2', 'productSum':'15.5', 'comments':'בלי קצף', 'productDetails':'כריך טונה, שתייה, זיתים', 'productName':'כריך טונה'},
			];

			this.setProductsData(productsData);*/
			
		};



		setProductsData = (data) => {
			this.setState({
				ds: this.state.ds.cloneWithRows(data),

			});
		}

		renderRow = (rowData) => {
			return (
				<View style={styles.row}>
					<Product {...rowData}/>
				</View>
			)
		}

  renderSeparator =  (sectionID, rowID, adjacentRowHighlighted) => {
    return (
      <View
        key={rowID}
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: '#EE7600',
        }}
      />
    );
  };


		render(){
			return(
				<ListView style={styles.listView}
						  automaticallyAdjustContentInsets={false}
						  initialListSize={2}
						  scrollEventThrottle={200}
						  dataSource={this.state.ds}
						  renderRow={this.renderRow}
						  renderSeparator = {this.renderSeparator}/>
            
			)
		}
}

