import React, { Component } from "react";
import "./style.css";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      stars: this.props.data.stars || 0,
      comment: this.props.data.comment || ""
    };
  }

  handleOpenEditArea = () => {
    this.setState({
      editing: true
    });
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleClickStars = stars => {
    this.setState({
      stars: stars
    });
  };

  handelSubmitComment = () => {
    const { id } = this.props.data;
    const { comment, stars } = this.state;
    this.setState({
      editing: false
    });
    this.props.onSubmit(id, comment, stars);
  };

  handleCancelComment = () => {
    this.setState({
      editing: false,
      stars: this.props.data.stars || 0,
      comment: this.props.data.comment || ""
    });
  };

  renderEditArea() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          className="orderItem__comment"
          onChange={this.handleCommentChange}
          value={this.state.comment}
        />
        {this.renderStars()}
        <button
          className="orderItem__btn orderItem__btn--red"
          onClick={this.handelSubmitComment}
        >
          提交
        </button>
        <button
          className="orderItem__btn orderItem__btn--grey"
          onClick={this.handleCancelComment}
        >
          取消
        </button>
      </div>
    );
  }
  renderStars() {
    const { stars } = this.state;
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = stars < item ? "orderItem__stars--light " : "";
          return (
            <span
              key={index}
              className={`orderItem__stars ${lightClass}`}
              onClick={this.handleClickStars.bind(this, item)}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }

  render() {
    const { pic, product, shop, price, ifCommented } = this.props.data;
    const orderListIndex = this.props.orderListIndex;
    return (
      <div className="orderItem">
        <div className="orderItem__picContainer">
          <img className="orderItem__pic" src={pic} />
        </div>
        <div className="orderItem__content">
          <div className="orderItem__product">{product}</div>
          <div className="orderItem__shop">{shop}</div>
          <div className="orderItem__detail">
            <div className="orderItem__price">{price}</div>
            <div>
              {ifCommented ? (
                <button className="orderItem__btn orderItem__btn--grey">
                  已评价
                </button>
              ) : (
                <button
                  className="orderItem__btn orderItem__btn--red"
                  onClick={this.handleOpenEditArea}
                >
                  评价
                </button>
              )}
            </div>
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() : null}
      </div>
    );
  }
}

export default OrderItem;
