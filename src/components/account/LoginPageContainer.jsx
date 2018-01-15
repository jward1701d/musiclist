import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementProgress, decrementProgress } from '../../actions/progress';
import { loginAttempt, loginSuccess, loginFailure } from '../../actions/authentication';

import LoginPage from './LoginPage';
import { Error } from 'mongoose';

export class LoginPageContainer extends React.Component {
  constructor(props) {
    super(props);

    // bound function
    this.attemptLogIn = this.attemptLogIn.bind(this);

    // component state
    this.state = {
      redirect: false,
    };
  }

  async attemptLogIn(userData) {
    const {
        decrementProgressAction,
        incrementProgressAction,
        loginAttemptAction,
        loginFailureAction,
        loginSuccessAction,
    } = this.props;

    // turn the spinner
    incrementProgressAction();

    // Register that a login attempt is being made
    loginAttemptAction();

    // contact the API
    await fetch(
        // Where to contact
        '/api/authentication/login',
        // What to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json) {
        loginSuccessAction(json);
        this.setState({ redirect: true });
      } else {
        loginFailureAction(new Error('Authentication Failed'));
      }
    })
    .catch((error) => {
      loginFailureAction(new Error(error));
    });

    // turn off spinner
    decrementProgressAction();
  }

  render() {
    const { redirect } = this.state;

    if(redirect) {
        return (
            <Redirect to="/" />
        );
    }
    
    return (
      <div>
        <LoginPage loginFunction={this.attemptLogIn} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    incrementProgressAction: incrementProgress,
    decrementProgressAction: decrementProgress,
    loginAttemptAction: loginAttempt,
    loginFailureAction: loginFailure,
    loginSuccessAction: loginSuccess,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPageContainer);
