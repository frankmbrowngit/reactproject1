import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux/es/exports";
import { fetchRentalById } from "actions";
import BookingReserve from "Components/booking/BookingReserve";
import RentalInfo from "Components/rental/RentalInfo";
import TomMap from "Components/map/TomMap";

class RentalDetail extends React.Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.dispatch(fetchRentalById(id));
    }

    componentWillUnmount() {
        this.props.dispatch({ type: "UNMOUNT_RENTAL" });
    }

    getLocation() {
        const {
            rental: { street, city },
        } = this.props;
        return street && city && city + ", " + street;
    }
    render() {
        const { rental, isFetching, isAuth } = this.props;
        if (isFetching || !rental._id) {
            return null;
        }
        return (
            <section id="rentalDetails">
                <div className="upper-section">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={rental.image} alt={rental.title} />
                        </div>
                        <div className="col-md-6">
                            <TomMap location={this.getLocation()} />
                        </div>
                    </div>
                </div>

                <div className="details-section">
                    <div className="row">
                        <div className="col-md-8">
                            <RentalInfo rental={rental} /> 
                        </div>
                        <div className="col-md-4"> 
                        <BookingReserve rental = {rental} isAuth={isAuth}/>  
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ rental, auth: {isAuth} }) => ({
    rental: rental.item,
    isFetching: rental.isFetching,
    isAuth : isAuth
});

const RentalDetailWithRouter = withRouter(RentalDetail);
export default connect(mapStateToProps)(RentalDetailWithRouter);
