import React,{Component} from 'react';
import { Navbar ,Nav ,NavbarToggler ,NavItem ,Collapse , NavbarBrand,Jumbotron,Modal,ModalHeader,ModalBody,Button, Form, FormGroup, Label, Input} from "reactstrap";
import { NavLink } from "react-router-dom"; //marks the url active if entered correctly//


class Header extends Component{
    constructor(props) {
      super(props);
      this.state={
        isNavOpen : false ,
        isModal : false
      };
      this.toggleNav = this.toggleNav.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav(){
      this.setState({
          isNavOpen:!this.state.isNavOpen
      });
    }

    toggleModal(){
      this.setState({
        isModal:!this.state.isModal
      })
    }

    handleLogin(event){
      this.toggleModal();
      alert("UserName: "+this.username.value + "Password: "+this.password.value + "Remember: " + this.remember.checked)
      event.preventDefault();
    }
    render(){
        return (
          <>
            <Navbar dark expand="md">
              <div className="container">
                <NavbarToggler onClick={this.toggleNav} />
                <NavbarBrand className="mr-auto" href="/">
                  <img
                    src="assets/images/logo.png"
                    height="30"
                    width="41"
                    alt="Restorante Con Fusion"
                  />
                </NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink className="nav-link" to="/home">
                        <span className="fa fa-home fa-lg"></span> Home
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/aboutus">
                        <span className="fa fa-info fa-lg"></span> About us
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/menu">
                        <span className="fa fa-list fa-lg"></span> Menu
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/contactus">
                        <span className="fa fa-address-card fa-lg"></span>{" "}
                        Contact us
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-sign-in fa-lg"></span>Login
                      </Button>
                    </NavItem>
                  </Nav>
                </Collapse>
              </div>
            </Navbar>
            <Jumbotron>
              <div className="container">
                <div className="row header-row">
                  <div className="col-12 col-sm-6">
                    <h1>Restorante Con Fusion</h1>
                    <p>
                      We take inpiration from world's best cuisines and provide
                      with lipsmacking dishes that will tinkle your tastebuds.
                    </p>
                  </div>
                </div>
              </div> 
            </Jumbotron>
            <Modal isOpen={this.state.isModal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
              <ModalBody> 
                <Form onSubmit={this.handleLogin}>
                  <FormGroup>
                    <Label htmlFor="username">UserName</Label>
                    <Input type="text" id="username" name="username" innerRef={(input)=>this.username = input} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" innerRef={(input)=>this.password = input} />
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" name="remember" innerRef={(input)=>this.remember = input} />
                      Remember me
                    </Label>
                  </FormGroup>
                  <Button type="submit" value="submit" color="primary">Login</Button> 
                </Form>
              </ModalBody>
            </Modal>
          </>
        );
    }
}

export default Header;