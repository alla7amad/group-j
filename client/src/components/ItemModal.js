import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    modal: false,
    first_name: '',
    last_name: '',
    university: '',
    major: '',
    cv: null
  };

  this.toggle = this.toggle.bind(this);
    }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChangeFirstName = e => {
    this.setState({ first_name: e.target.value });
  };
  onChangeLastName = e => {
    this.setState({ last_name: e.target.value });
  };
  onChangeUniversity = e => {
    this.setState({ university: e.target.value });
  };
  onChangeMajor = e => {
    this.setState({ major: e.target.value });
  };

uploadFile(e){
  const formData = new FormData();
  let files=e.target.files[0];
  this.setState({ cv: e.target.files[0].name });
  formData.append('file', files);
  console.log(e.target.files[0]);
  console.log(formData);
  axios.post("http://localhost:5000/uploadDB", formData, { // receive two parameter endpoint url ,form data
  }).then(res => { // then print response status
    console.log("send to server "+res.statusText);
  }).catch((error) => {
    console.log("erooooorrrr!");
  });

}


saveFile(e){
  axios.get("/fileName", " ", { // receive two parameter endpoint url ,form data
  }).then(res => { // then print response status
    console.log("got it from server "+res.statusText);
  }).catch((error) => {
    console.log("erooooorrrr!");
  });
}




  onSubmit = e => {

    e.preventDefault();
    const newItem = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      university: this.state.university,
      major: this.state.major,
      cv: this.state.cv,
    };


    // Add item via addItem action
    this.props.addItem(newItem);

            // Close modal
            this.toggle();

  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add CV
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Upload CV</ModalHeader>
          <ModalBody>
            <Form  onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">First Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add First Name"
                  onChange={this.onChangeFirstName}
                />
                <Label style={{ marginTop: '0.5rem' }} for="item">Last Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add Last Name"
                  onChange={this.onChangeLastName}
                />
                <Label style={{ marginTop: '0.5rem' }} for="item">University</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add University"
                  onChange={this.onChangeUniversity}
                />
                <Label style={{ marginTop: '0.5rem' }} for="item">Major</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add Major"
                  onChange={this.onChangeMajor}
                />




                <Label style={{ marginTop: '0.5rem' }} for="item">CV file</Label>
                <Input
                 // type="submit"
                  type="file"
                  name="file"
                  id="item"
                  placeholder="Add CV file"
                  onChange={(e)=>this.uploadFile(e)}
                />

                <Button color="dark" style={{ marginTop: '2rem' }} onClick={(e)=>this.saveFile(e)} block>
                  Save File <small className="text-muted">(for now is static on specific file & path)</small>
                </Button>
                <Button color="dark" style={{ marginTop: '2rem' }} onClick={(e)=>this.onSubmit(e)} block>
                  Add CV
                </Button>
                </FormGroup>
                </Form>

          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
