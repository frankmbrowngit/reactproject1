
import React from 'react';
import RentalForm from '../Components/forms/RentalForm.js';
import { createRental } from '../actions/index.js';
import { Redirect } from 'react-router-dom';
class RentalNew extends React.Component {
  state = {
    shouldRedirect: false
  }
  handleRentalCreate = (rentalData) => {
    rentalData.dailyPrice = Number(rentalData.dailyPrice);
    rentalData.numOfRooms = Number(rentalData.numOfRooms);
    createRental(rentalData)
    .then(() => {this.setState({shouldRedirect: true})})
    .catch(errors => console.log(errors))
  }
  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) {
      return (<Redirect to = {{pathname: "/"}} />)
    }
    return (
      <section id="newRental">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Rental</h1>
              <RentalForm onSubmit={this.handleRentalCreate} />
              {/* <div>
                <p>
                  Some Errors
                </p>
              </div> */}
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                <img src="/images/create-rental.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section> 
    )
  }
}

export default RentalNew; 