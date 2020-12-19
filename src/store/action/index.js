import firebase from "firebase";

const facebook_login = (history) => {
  console.log("chl rha h");
  return (dispatch) => {
    var provider = new firebase.auth.FacebookAuthProvider();
    console.log(provider);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        let create_user = {
          name: user.displayName,
          email: user.email,
          profile: user.photoURL,
          uid: user.uid,
        };
        firebase
          .database()
          .ref("/")
          .child(`users/${user.uid}`)
          .set(create_user)
          .then(() => {
            dispatch({ type: "SETUSER", payload: create_user });
            alert("successfully logged in");
            history.push("/chat");
          });
      })
      .catch(function (error) {
        var errorMessage = error.message;
        console.log("firebase-error", errorMessage);
      });
  };
};

// get users from firebase
const get_users = () => {
  return (dispatch) => {
    let users = [];
    firebase
      .database()
      .ref("/")
      .child("users")
      .on("child_added", (data) => {
        users.push(data.val());
        // to send users in state
        dispatch({ type: "SETFIREBASEUSERS", payload: users });
      });
  };
};
// single dispatch cannot have two types you can make multiiple dispatches

export { facebook_login, get_users };
