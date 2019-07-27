import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button , Table, Badge  } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
      <h1 className="display-3"> Preview the uploades CV`s</h1>
      <hr className="my-2" />
       <p className="lead">All the CV`s on Database are here, you can add your CV by click on  <Badge color="secondary"> Add CV</Badge></p>

      <Table bordereds>

        <thead>
     <tr>
       <th> </th>
       <th>First Name</th>
       <th>Last Name</th>
       <th>University</th>
       <th>Mmajor</th>
       <th>CV file Name</th>
     </tr>
    </thead>
    <tbody>


            {items.map(({ _id, first_name,last_name,university,major,cv }) => (

              <CSSTransition key={_id} timeout={500} classNames="fade">
                  <tr>
                            <th scope="row">
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              onClick={this.onDeleteClick.bind(this, _id)}
                            >
                              &times;
                            </Button>
                             </th>
                            <td> {first_name +"\t\t"} </td>
                            <td> {last_name+"\t\t"}</td>
                            <td>  {university+"\t\t"} </td>
                            <td>   {major+"\t\t"} </td>
                            <td>   {cv+"\t\t" } </td>
                          </tr>
              </CSSTransition>
            ))}

            </tbody>
        </Table>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
