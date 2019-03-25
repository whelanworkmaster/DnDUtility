import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    console.log(state);
    return { userLoggedIn: state.userLoggedIn };
};

const ConnectedUserLoggedIn = ({ userLoggedIn }) => (
    <div>
        <div>{userLoggedIn}</div>
    </div>
);

const UserLoggedIn = connect(mapStateToProps)(ConnectedUserLoggedIn);
export default UserLoggedIn;