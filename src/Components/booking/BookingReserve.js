import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";

class BookingReserve extends React.Component {
    constructor() {
        super();
        this.state = {
            guests: '',
            startAt: null,
            endAt: null
        }
    }
    
    handleApply = (_, { endDate, startDate }) => {
        startDate = startDate._d;
        endDate = endDate._d;
        this.setState({startAt: startDate, endAt: endDate })
    }
    handleGuestChange = (event) => {
        this.setState({guests: event.target.value});
    }
    reserveRental = () => {
        alert(JSON.stringify(this.state));
    }
    checkInvalidDates = (date) => {
        return date._d < Date.now(); // Doesn't work, moment is deprecated
    }
    render() {
        const { rental } = this.props;
        return (
            <div className="booking">
                <h3 className="booking-price">
                    $ {rental.dailyPrice} <span className="booking-per-night">per night</span>
                </h3>
                <hr></hr>
                <div className="form-group">
                    <label htmlFor="dates">Dates</label>
                    <DateRangePicker
                    onApply={this.handleApply}
                    containerStyles={{display: 'block'}}
                    opens = "left"
                    
                    >
                        <input
                        id = "dates"
                        type = "text"
                        className = "form-control"
                        >
                        
                        </input>
                    </DateRangePicker>
                </div>
                <div className="form-group">
                    <label htmlFor="guests">Guests</label>
                    <input
                        onChange = {this.handleGuestChange} 
                        value={this.state.guests}
                        type="number"
                        className="form-control"
                        id="guests"
                        aria-describedby="guests"
                    ></input>
                </div>
                <button 
                onClick = {this.reserveRental}
                className="btn btn-bwm-main btn-block">
                    Reserve place now
                </button>
                <hr></hr>
                <p className="booking-note-title">
                    People are interested into this house
                </p>
                <p className="booking-note-text">
                    More than 500 people checked this rental in last month.
                </p>
            </div>
        );
    }
}

export default BookingReserve;
