import React, { Component } from 'react';
import StickyFooter from 'react-sticky-footer';
import {Jumbotron,Container, Row, Col } from 'reactstrap';

class Appfooter extends Component {

  render() {
    return (
      <div>

      <Jumbotron fluid className="JumbotronStyle">
        <Container>
        <h1 class="display-4">About Us</h1>
          <hr className="my-4" />
          <Row>
          <Col xs="6" sm="4">
          <h3> Group Leader: </h3>
          </Col>
          <Col xs="6" sm="4">
          <h3> Group Member 1</h3>
          </Col>
          <Col sm="4">
          <h3> Group Member 2</h3>
          </Col>
        </Row>
        <Row>
        </Row>
        <Row>
        <Col xs="6" sm="4">
        <h5> Alla </h5>
        </Col>

        <Col xs="6" sm="4">
        <h5> Reema </h5>
        </Col>
        <Col sm="4">
        <h5>Asrar</h5>
        </Col>
      </Row>
        </Container>
      </Jumbotron>
        </div>

//       <StickyFooter
//     bottomThreshold={100}
//     normalStyles={{
//     backgroundColor: "#999999",
//     padding: "2rem",
//     marginTop: "10rem"
//     }}
//     stickyStyles={{
//     backgroundColor: "rgba(255,255,255,.8)",
//     padding: "10rem"
//     }}
// >
//     Group Leader:
// </StickyFooter>



    );
  }
}

export default Appfooter;
