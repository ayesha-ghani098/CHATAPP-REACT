import "./style.css";
import React from "react";
import { connect } from "react-redux";
import { facebook_login } from "../../store/action";
import Logo from '../../assets/chatapplogo.PNG'

class Home extends React.Component {
  render() {
    return (
      <div>
      <div className="Home-logo">
       <img className="logoimage" src={Logo}></img>
      </div>
      <div className="Home-logo-heading">
      <h2 className="chatappheading">ChatApp</h2>
      </div>
      <div className="Home-button">
      <button
          className="Facebooklogin"
          onClick={() => this.props.facebook_login(this.props.history)}
        >
          Facebook Login
        </button>
      </div>
      </div>
    );
  }
}
//We ll get  redux state in its parameter
const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  // Define Functions that we made in actions
  facebook_login: (history) => dispatch(facebook_login(history)),
});

// Connect take two parameters first : redux state and second redux functions
export default connect(mapStateToProps, mapDispatchToProps)(Home);
