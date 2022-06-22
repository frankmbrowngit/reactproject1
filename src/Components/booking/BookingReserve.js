import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import BwmModal from "Components/shared/Modal";
import { dateFormat } from "helpers/functions";
import { createBooking, getBookings } from "../../actions/bookings";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
class BookingReserve extends React.Component {
    constructor() {
        super();
        this.dateRef = React.createRef();
        this.bookedOutDates = [];
        this.state = {
            guests: 0,
            startAt: null,
            endAt: null,
            nights: "",
            price: 0,
        };
        this.errorMessage = "";
    }
    async componentDidMount() {
        const { rental } = this.props;
        this.bookedOutDates = await getBookings(rental._id);
        console.log("booked out dates:");
        console.log(this.bookedOutDates);
    }
    handleApply = (_, { endDate, startDate }) => {
        startDate = startDate._d;
        endDate = endDate._d;
        this.setState({ startAt: startDate, endAt: endDate });
    };
    handleGuestChange = (event) => {
        this.setState({
            guests: parseInt(
                event.target.value >= 0 ? event.target.value : 0,
                10
            ),
        });
    };
    clearData = () => {
        this.setState({
            guests: 0,
            startAt: null,
            endAt: null,
            nights: "",
            price: 0,
        });
    };
    reserveRental = (closeCallback) => {
        console.log(JSON.stringify(this.state));
        createBooking(this.state)
            .then((newBooking) => {
                this.bookedOutDates.push(newBooking);
                closeCallback();
                debugger;
                toast.success("Booking has been created", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.clearData();
            })
            .catch(() => {
                console.log("Error");
                closeCallback();
            });
    };
    checkInvalidDates = (date) => {
        // For some reason, this is not called. Date Range picker relies on 'moment' lib which is not compatible with this version of react
        // USe different component libraries when creating new project, see library
        // let isBookedOut = false;
        // this.bookedOutDates.some(booking => {
        //     return (date.startDate._d < booking && booking < date.endDate._d)
        // })
        // debugger;
        return date.startAt._d.getTime() - Date.now().getTime() < 0;
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
        return (
            startAt &&
            endAt &&
            guests &&
            guests > 0 &&
            startAt.getTime() - Date.now() > 0
        );
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
                rental: this.props.rental,
            });
        }
    };

    render() {
        const { rental, isAuth } = this.props;
        return (
            <div className="booking">
                <h3 className="booking-price">
                    $ {rental.dailyPrice}{" "}
                    <span className="booking-per-night">per night</span>
                </h3>
                <hr></hr>
        
        {!isAuth && <Link to = "/login" className = 'btn btn-bwm-main btn-block'>Login to book this place</Link>}
        
        {isAuth &&
                <>
                    <div className="form-group">
                        <label htmlFor="dates">Dates</label>
                        <DateRangePicker
                            onApply={this.handleApply}
                            containerStyles={{ display: "block" }}
                            opens="left"
                            isInvalidDate={this.checkInvalidDates}
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
                </>
                } 
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
