import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    console.log("NavBar");
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h4 className="usercount"> Users Online {this.props.count} </h4>
        </nav>
    )
  }
}
export default NavBar;