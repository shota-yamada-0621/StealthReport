import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Form from './components/Form';
import ImpressionHistory from './components/ImpressionHistory';
import ImpressionDetails from './components/ImpressionDetails';
import ImpressionEdit from './components/ImpressionEdit';
import LoginForm from './pages/LoginForm';
import PrivateRoute from './PrivateRoute';
import SignupForm from './pages/SignUpForm';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route path="/form" component={Form} />
      <Route path="/impression" component={ImpressionHistory} />
      <Route path="/details/:id" component={ImpressionDetails} />
      <Route path="/edit/:id" component={ImpressionEdit} />
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignupForm} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
