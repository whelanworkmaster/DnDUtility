import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    console.log(state.user);
    return { userLoggedIn: state.user };
};

const ConnectedUserLoggedIn = ({ userLoggedIn }) => (
    <div>
        <div>{userLoggedIn}</div>
    </div>
);

const UserLoggedIn = connect(mapStateToProps)(ConnectedUserLoggedIn);
export default UserLoggedIn;