import React,{Component} from "react";
import {BreadcrumbItem,Breadcrumb,Button,Col,Label, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,Form, Errors} from "react-redux-form"


const required = (val) => val && (val.length);
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(val)



class Contact extends Component {

  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(values){
    this.props.postFeedback(values.firstname,values.lastname,values.telnum,values.email,values.agree,values.ContactType,values.message);
    this.props.resetFeedbackForm();
  }


  render(){
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>

        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road
            <br />
            Clear Water Bay, Kowloon
            <br />
            HONG KONG
            <br />
            <i className="fa fa-phone"></i>: +852 1234 5678
            <br />
            <i className="fa fa-fax"></i>: +852 8765 4321
            <br />
            <i className="fa fa-envelope"></i>:{" "}
            <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" className="btn btn-info" href="skype.com">
              <i className="fa fa-skype" ></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:confusion@food.net"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Send us Your feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          <Form
            model="feedback"
            onSubmit={(values) => this.handleSubmit(values)}
          >
            <Row className="form-group">
              <Label htmlFor="firstname" md={2}>
                First Name
              </Label>
              <Col md={10}>
                {/*eslint-disable-next-line*/}
                <Control.text
                  model=".firstname"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".firstname"
                  show="touched"
                  messages={{
                    required: " Required",
                    minLength: " Length shoud be greater than 2",
                    maxLength: " Length should be 15 or less",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="lastname" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                {/*eslint-disable-next-line*/}
                <Control.text
                  model=".lastname"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".lastname"
                  show="touched"
                  messages={{
                    required: " Required",
                    minLength: " Length should be greater than 2",
                    maxLength: " Length should be less than or equal to 15",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="telnum" md={2}>
                Contact Tel.
              </Label>
              <Col md={10}>
                {/*eslint-disable-next-line*/}
                <Control.text
                  model=".telnum"
                  id="telnum"
                  className="form-control"
                  name="telnum"
                  placeholder="Tel. Number"
                  validators={{
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(10),
                    isNumber,
                  }}
                />

                <Errors
                  className="text-danger"
                  model=".telnum"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: " Phone number should be of 10 numbers",
                    maxLength: " Phone number should be of 10 numbers",
                    isNumber: " Phone number should be a number",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                {/*eslint-disable-next-line*/}
                <Control.text
                  model=".email"
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Email"
                  validators={{
                    required,
                    validEmail,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".email"
                  show="touched"
                  messages={{
                    required: "Required",
                    validEmail: "Invalid email address",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 6, offset: 2 }}>
                <div className="form-check">
                  <Label check>
                    {/*eslint-disable-next-line*/}
                    <Control.checkbox
                      className="form-check-input"
                      model=".agree"
                      name="agree"
                    />
                    <strong>May we contact you?</strong>
                  </Label>
                </div>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                {/*eslint-disable-next-line*/}
                <Control.select
                  model=".contactType"
                  className="form-control"
                  name="contactType"
                >
                  <option>Tel.</option>
                  <option>Email</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="feedback" md={2}>
                Your Feedback
              </Label>
              <Col md={10}>
                {/*eslint-disable-next-line*/}
                <Control.textarea
                  model=".message"
                  name="message"
                  className="form-control"
                  id="message"
                  rows="8"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}
}
export default Contact;
