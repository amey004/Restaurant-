import {Card,CardBody,CardTitle,CardText,CardImg,Breadcrumb,BreadcrumbItem,Label,Modal,ModalBody,ModalHeader,Button, Row} from 'reactstrap'
import {Link} from 'react-router-dom'
import {LocalForm,Control,Errors} from "react-redux-form"
import React,{Component} from "react"
import { Loading } from './LoadingComponent';
import {baseUrl} from "../shared/baseUrl";
import { FadeTransform , Fade ,Stagger } from "react-animation-components"

function RenderDish({dish}){    
    if(dish!=null)
        {   return (
            <div className="col-12 col-md-5 m-1">
              <FadeTransform in
                transformProps={{
                    exitTransform : 'scale(0.5) translateY(-50%)'
                }}>
              <Card>
                <CardImg src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
              </FadeTransform>
            </div>
        );
        }
        else{
            return(<div></div>)
        }
        
    }

    function RenderComments({comments,postComment,dishId}){   
        
        if(comments!=null){
            return (
              <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                  <Stagger in>
                    {comments.map((comment) => {
                      return (
                        <Fade in>
                          <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>
                              --{comment.author},
                              {new Intl.DateTimeFormat("en-us", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }).format(new Date(Date.parse(comment.date)))}
                            </p>
                          </li>
                        </Fade>
                      );
                    })}
                  </Stagger>
                </ul>
                <CommentForm postComment={postComment} dishId={dishId} />
              </div>
            );
        }else{
            return(
                <div></div>
            )
        }
    }

    const DishDetail = (props) =>{
        
        if(props.isLoading){
          return(
            <div className="container">
              <div className="row">
                <Loading/>
              </div>
            </div>
          )
        }
        else if(props.errMess){
          <div className="container">
            <div className="row">
              <h4>{props.errMess}</h4>
            </div>
          </div>
        }
        else if(props.dish!=null){
        return (
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/menu">Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>

              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
              </div>
            </div>
            <div className="row">
              <RenderDish dish={props.dish} />
              <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
 
            </div>
            <div className="row"></div>
          </div>
        );
        }else {
          return (
            <div></div>
          )
        }
    }

const minLength = (len) => (val) => val && (val.length >= len)
const maxLength = (len) => (val) => !val || (val.length <= len)

class CommentForm extends Component {
  constructor (props){
    super(props);

    this.state={
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  handleSubmit(values){
    this.toggleModal();
    this.props.postComment(this.props.dishId,values.rating,values.name,values.comment)
  }
  render(){
    return (
      <>
        <div>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"></span>
            {"  "}Submit Comments
          </Button>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                {/*eslint-disable-next-line*/}
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label html="name">Your Name </Label>
                {/*eslint-disable-next-line*/}
                <Control.text
                  model=".name"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  validators={{
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Row>
              <Row>
                <Label htmlFor="comment">Comment</Label>
                {/*eslint-disable-next-line*/}
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  className="form-control"
                  rows="6"
                />
              </Row>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default DishDetail