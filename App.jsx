import React, { Component } from "react";
import Users from "./components/Users.jsx";
import AddUser from "./components/AddUser.jsx";
import Modal from "react-modal";

class App extends Component {
  // Default dummy data
  state = {
    users: [
      {
        avatarImg: "https://img.mobiscroll.com/demos/Requiem_for_a_Dream.png",
        name: "Kissan",
        companyName: "gtpl",
        emailId: "mani@gmail.com",
        contactNo: "8344887993",
        designation: "developer",
        isEditing: false
      }
    ],
    openModal: false,
    deleteIndex: null
  };
  addUser = newUser => {
    let that = this;
    fetch("https://randomuser.me/api/?gender=male")
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          const derivedState = {
            ...newUser,
            avatarImg: data.results[0].picture.thumbnail
          };
          let users = [...that.state.users, derivedState];
          that.setState({
            users
          });
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };

  pressViewBtn = i => {
    alert();
  };

  pressEditBtn = i => {
    let users = this.state.users;
    users[i].isEditing = true;
    this.setState({
      users
    });
  };

  updateUser = (i, name, companyName, emailId, contactNo, designation) => {
    let users = this.state.users;
    users[i].name = name;
    users[i].companyName = companyName;
    users[i].emailId = emailId;
    users[i].contactNo = contactNo;
    users[i].designation = designation;
    users[i].isEditing = false;

    this.setState({
      users
    });
  };

  pressDelete = () => {
    let users = this.state.users.filter((u, index) => {
      return index !== this.state.deleteIndex;
    });
    this.setState({
      users,
      openModal: false
    });
  };
  toggleModal = i => {
    this.setState({
      openModal: !this.state.openModal,
      deleteIndex: i
    });
  };
  render() {
    const customStyles = {
      content: {
        top: "15%",
        left: "15%",
        right: "15%",
        zIndex: "9999",
        bottom: "auto"
      }
    };
    return (
      <div className="Main-Wrapper">
        <center>
          <h1 className="titleText">Employee Management App</h1>
        </center>
        <div className="block-addEmployee">
          <AddUser addUser={this.addUser} />
        </div>

        <Users
          allUsers={this.state.users}
          pressViewBtn={this.pressViewBtn}
          pressEditBtn={this.pressEditBtn}
          updateUser={this.updateUser}
          pressDelete={this.toggleModal}
        />
        <Modal
          isOpen={this.state.openModal}
          ariaHideApp={false}
          key="delete-modal"
          onRequestClose={() => this.toggleModal()}
          contentLabel="Modal"
          style={customStyles}
          overlayClassName="Overlay"
        >
          <button className="modal-close" onClick={e => this.toggleModal(e)}>
            <span>X</span>
          </button>
          {this.state.openModal && (
            <div className= "block-model">
              <h1 className="element-title">Are you sure</h1>
              <button onClick={this.pressDelete}>Ok </button>
              <button onClick={this.toggleModal}>Cancel</button>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

export default App;
