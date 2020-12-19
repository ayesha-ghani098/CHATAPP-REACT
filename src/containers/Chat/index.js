import React from "react";
import { connect } from "react-redux";
import { get_users } from "../../store/action";
import firebase from "firebase";
import "./style.css";
import Slider from "react-slick";
import Send from "../../assets/send.png";
import Logout from "../../assets/logout.png";

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      chat_user: {},
      chats: [],
      message: "",
    };
  }

  // ----- set the chat in state------//

  chat = (user) => {
    let current_user = this.props.current_user;
    let merge_uid = this.uidmerge(current_user.uid, user.uid);
    this.getMessages(merge_uid);
    this.setState({
      chat_user: user,
    });
  };

  //---- Send messages to firebase----//
  sendMessage = () => {
    let user = this.props.current_user;
    let chat_user = this.state.chat_user;
    let merge_uid = this.uidmerge(user.uid, chat_user.uid);

    firebase.database().ref("/").child(`chats/${merge_uid}`).push({
      message: this.state.message,
      name: user.name,
      uid: user.uid,
    });
    this.setState({
      message: "",
    });
  };

  // -----get messages from firebase and setstate in chat---//
  getMessages = (uid) => {
    firebase
      .database()
      .ref("/")
      .child(`chats/${uid}`)
      .on("child_added", (messages) => {
        this.state.chats.push(messages.val());
        this.setState({
          chats: this.state.chats,
        });
      });
  };

  // ---when component render get data of users from global state---//
  componentDidMount() {
    this.props.get_users();
  }

  //--- merge uid to set messages in a single uid---//
  uidmerge = (uid1, uid2) => {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  };

  render() {
    // ---users slick slider settings---//
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 8,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 8,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 8,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 7,
          },
        },
      ],
    };

    // ---Current User ---//
    let user = this.props.current_user;
    return (
      <div className="container">
        <div className="error">
          <h2>it is for desktop screen </h2>
        </div>
        <div className="container-2">
          <div className="row no-gutters">
            <div className="col-sm-4">
              <div className="chat">
                <div className="chat-heading">
                  <h2>Chat</h2>
                  <img
                    className="logout"
                    onClick={() => this.logout()}
                    src={Logout}
                  />
                </div>
                <div className="MyProfile">
                  <img className="profileimage" src={user.profile} alt="" />
                  <h1 className="profileheading">{user.name}</h1>
                </div>
                <div className="userlist overflow-auto">
                  <Slider {...settings}>
                    {this.props.users.map((v, i) => {
                      return (
                        v.uid !== user.uid && (
                          <div className="userslist" key={i}>
                            <img
                              width="40"
                              width="40"
                              className="user-img"
                              alt=""
                              src={v.profile}
                              onClick={() => this.chat(v)}
                            />
                          </div>
                        )
                      );
                    })}
                  </Slider>
                </div>
                <div className="uuserlist">
                  {this.props.users.map((v, i) => {
                    return (
                      v.uid !== user.uid && (
                        <div className="userslist" key={i}>
                          <div className="userdiv" onClick={() => this.chat(v)}>
                            <img
                              width="40"
                              width="40"
                              className="user-img"
                              alt=""
                              src={v.profile}
                            />
                            <h6 className="username">{v.name}</h6>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-sm-8">
              <div className="chatsection">
                {Object.keys(this.state.chat_user).length ? (
                  <div>
                    <div>
                      <img
                        width="50"
                        width="50"
                        className="user-img"
                        alt=""
                        src={this.state.chat_user.profile}
                        alt=""
                      />
                      <h4 className="username2">{this.state.chat_user.name}</h4>
                    </div>

                    <div className="messages-list overflow-auto">
                      {this.state.chats.map((v, i) => {
                        return (
                          <li
                            className={v.uid === user.uid ? "v-user" : "u-user"}
                            key={i}
                          >
                            {v.message}
                          </li>
                        );
                      })}
                    </div>
                    <div>
                      <input
                        value={this.state.message}
                        onChange={(e) =>
                          this.setState({ message: e.target.value })
                        }
                        placeholder="Enter your message"
                      ></input>
                      <img
                        className="send"
                        src={Send}
                        onClick={() => this.sendMessage()}
                      />
                    </div>
                  </div>
                ) : (
                  <h4>No user</h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//We ll get  redux state in its parameter
const mapStateToProps = (state) => ({
  current_user: state.current_user,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  // Define Functions that we made in actions
  get_users: () => dispatch(get_users()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
