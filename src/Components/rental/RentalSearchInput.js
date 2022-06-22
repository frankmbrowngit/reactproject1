import React, {useState} from "react";
import { useHistory } from "react-router-dom";
const RentalSearchInput = () => {
    const [location, setLocation] = useState("");
    const history = useHistory();
    const [clicked, handleClick] = useState(false);
    const handleSearch = () => {
        if (clicked) {
            trim(location) ? history.push(`/rentals/${trim(location)}/homes`) : history.push('/');
        } 
    }
    const trim = (x) => {
        return x.replace(/^\s+|\s+$/gm, '');
      }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleClick(true);
            handleSearch();
        }
    }
    return (
        <div className="form-inline my-2 my-lg-0">
            <input
                onKeyDown={handleKeyDown}
                onChange = {e => setLocation(e.target.value)}
                value = {location}
                className="form-control mr-sm-2 bwm-search"
                type="search"
                placeholder="Search"
            />
            <button
                className="btn btn-outline-success btn-bwm-main my-2 my-sm-0"
                type="button"
                onClick={() => {
                    handleClick(true);
                    handleSearch();
                }}
            >
                Search
            </button>
        </div>
    );
};
export default RentalSearchInput;
