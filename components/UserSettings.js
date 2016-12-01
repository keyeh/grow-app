import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {
  Page,
  Button
} from 'react-onsenui';
import NavBar from './NavBar';
import {signoutUser} from '../actions/sign_out'
import MainPage from './MainPage'

class UserSettings extends Component {

    signOut() {
        this.props.navigator.pushPage({component: MainPage})
        this.props.signoutUser();
    }



    render() {
        return (
          <Page renderToolbar={() => <NavBar title='Settings' navigator={this.props.navigator} backButton={true}/>}>
            <strong>Signed in as {this.props.auth.email}</strong><br/>
            <Button onClick={() => this.signOut() }>Sign Out</Button>
          </Page>
        );
    }
}

function mapStateToProps (state) {
    return { auth: state.auth}
}

export default connect(mapStateToProps, {signoutUser})(UserSettings);