import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import BwmModal from "Components/shared/Modal";
import { dateFormat } from "helpers/functions";
import { createBooking, getBookings } from '../../actions/bookings'
class BookingReserve extends React.Component {
    constructor() {
        super();
        this.dateRef = React.createRef();
        this.bookedOutDates = [];
        this.state = {
            guests: "",
            startAt: null,
            endAt: null,
            nights: "",
            price: 0,
        };
    }
    async componentDidMount() {
        const { rental } = this.props;
        const bookings = await getBookings(rental._id);
    }
    initBookedOutDates = (bookings) => {
        bookings.forEach(booking => this.bookedOutDates.push(booking));
        this.initBookedOutDates(bookings);
    }
    handleApply = (_, { endDate, startDate }) => {
        startDate = startDate._d;
        endDate = endDate._d;
        this.setState({ startAt: startDate, endAt: endDate });
    };
    handleGuestChange = (event) => {
        this.setState({ guests: parseInt(event.target.value, 10) });
    };
    clearData = () => {
        this.setState({
            guests: "",
            startAt: null,
            endAt: null,
            nights: "",
            price: 0,
        })
    }
    reserveRental = (closeCallback) => {
        console.log(JSON.stringify(this.state));
        createBooking(this.state)
        .then(newBooking => {
            alert("Success");
            closeCallback();
            this.clearData();
        })
        .catch(() => alert("Error"));
    };
    checkInvalidDates = (date) => {
        debugger
        return (date._d.getTime() - Date.now().getTime() < 0);
    };
    get getDates() {
        return this.state.startAt
            ? `${dateFormat(this.state.startAt)} to ${dateFormat(
                  this.state.endAt
              )}`
            : "";
    }
    get isBookingValid() {
        const { startAt, endAt, guests } = this.state;
        return startAt && endAt && guests && (guests > 0) && (startAt.getTime() - Date.now() > 0);
    }
    processData = () => {
        const rentalPrice = this.props.rental.dailyPrice;
        // alert("In processData");
        if (this.isBookingValid) {
            this.setState({
                nights: Math.ceil(
                    (this.state.endAt.getTime() -
                        this.state.startAt.getTime()) /
                        (1000 * 60 * 60 * 24)
                ),
                price:
                    Math.ceil(
                        (this.state.endAt.getTime() -
                            this.state.startAt.getTime()) /
                            (1000 * 60 * 60 * 24)
                    ) * rentalPrice,
                rental: this.props.rental
            });
        }
    };

    render() {
        const { rental } = this.props;
        return (
            <div className="booking">
                <h3 className="booking-price">
                    $ {rental.dailyPrice}{" "}
                    <span className="booking-per-night">per night</span>
                </h3>
                <hr></hr>
                <div className="form-group">
                    <label htmlFor="dates">Dates</label>
                    <DateRangePicker
                        
                        onApply={this.handleApply}
                        containerStyles={{ display: "block" }}
                        opens="left"
                        isInvalidDate = {this.checkInvalidDates}
                    >
                        <input
                            id="dates"
                            type="text"
                            className="form-control"
                        ></input>
                    </DateRangePicker>
                </div>
                <div className="form-group">
                    <label htmlFor="guests">Guests</label>
                    <input
                        onChange={this.handleGuestChange}
                        value={this.state.guests}
                        type="number"
                        className="form-control"
                        id="guests"
                        aria-describedby="guests"
                    ></input>
                </div>
                <BwmModal
                    onSubmit={this.reserveRental}
                    openBtn={
                        <button
                            disabled={!this.isBookingValid}
                            className="btn btn-bwm-main btn-block"
                            onClick={() => this.processData()}
                        >
                            Reserve place now
                        </button>
                    }
                    title="Confirm Booking"
                    subtitle={this.getDates}
                >
                    <em>{this.state.nights}</em> Nights /{"  "}
                    <em>${rental.dailyPrice}</em> per Night
                    <p>
                        Guests: <em>{this.state.guests} </em>
                    </p>
                    <p>
                        Price: <em>${this.state.price}</em>
                    </p>
                    <p>Do you confirm your booking for selected days?</p>
                </BwmModal>

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
