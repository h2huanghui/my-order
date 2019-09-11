import React, { Component } from "react";
import OrderItem from "../OrderItem";

class OrderList extends Component {
  constructor(props) {
    super(props);
    // state is similar to props,but it is private and fully controlled by the component.
    this.state = {
      orderList: []
    };
  }
  componentDidMount() {
    fetch("/mock/orders.json").then(res => {
      if (res.ok) {
        res.json().then(data => {
          this.setState({
            orderList: data
          });
        });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.orderList.map((item, index) => {
          return (
            <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit} />
          );
        })}
      </div>
    );
  }
  handleSubmit = (id, comment, stars) => {

    // fetch('/saveComment').then(()=> {

    // })
    const newOrderList = this.state.orderList.map(item => {
      return item.id === id
        ? {
            ...item,
            comment,
            stars,
            ifCommented: true
          }
        : item;
    });

    this.setState({
      orderList: newOrderList
    });
  };
}

export default OrderList;
