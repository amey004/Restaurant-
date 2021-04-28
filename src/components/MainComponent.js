import { Component } from "react";
import Dishdetail from "./DishdetailComponents";
import Menu from "./MenuComponents";
import About from "./AboutComponent";
import Header from "./HeaderComponent"
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Contact from './ContactComponent';
import { connect } from "react-redux";
import {postComment,fetchComments,fetchDishes,fetchPromos, fetchLeaders,postFeedback} from "../redux/ActionCreators"
import {actions} from "react-redux-form"
import {TransitionGroup,CSSTransition} from "react-transition-group"

const mapStateToProps = state =>{

    return {
      dishes: state.dishes,
      comments : state.comments,
      promotions : state.promotions,
      leaders : state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm : () => dispatch(actions.reset('feedback')),
  fetchComments : () => dispatch(fetchComments()),
  fetchPromos : () => dispatch(fetchPromos()),
  fetchLeaders : () => dispatch(fetchLeaders()),
  postFeedback : (firstname,lastname,telnum,email,agree,ContactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,ContactType,message))
})

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () =>{
      return(
        <Home  dish = {this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading = {this.props.dishes.isLoading}
        dishesErrMess = {this.props.dishes.errMess}
        promotion = {this.props.promotions.promotions.filter((promotion)=>promotion.featured)[0]}
        promosLoading = {this.props.promotions.isLoading}
        promosErrMess = {this.props.promotions.errMess}
        leader = {this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
        leadersLoading = {this.props.leaders.isLoading}
        leadersErrMess = {this.props.leaders.errMess}
        />
      )
    }

    const DishWithId = ({match}) =>{
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        isLoading = {this.props.dishes.isLoading}
        errMess = {this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess = {this.props.comments.errmess}
        postComment={this.props.postComment}/>
      )
    }

    const AboutUs = () =>{
      return (
        <About
          leaders={this.props.leaders}
        />
      );
    }

    return (
      <div className="App">
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component = {() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} 
                postFeedback={this.props.postFeedback}/>}/>
              <Route exact path="/aboutus" component={AboutUs}/>
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
