import React from "react";
import { useForm } from "react-hook-form";
const rentalOptions = ['apartment','condo','house'];
const RentalForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    {...register("title")}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    {...register("city")}
                    name="city"
                    type="text"
                    className="form-control"
                    id="city"
                />
            </div>

            <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                    {...register("street")}
                    name="street"
                    type="text"
                    className="form-control"
                    id="street"
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>

                <select className="form-control" id="category" name="category">
                    {rentalOptions.map((option) => <option key = {option}> {option} </option>)}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="bedrooms">Image Url</label>
                <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    {...register("image")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="bedrooms">Rooms</label>
                <input
                    type="number"
                    className="form-control"
                    id="numOfRooms"
                    name="numOfRooms"
                    {...register("numOfRooms")}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    {...register("description")}
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="dailyRate">Daily Price</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                    </div>
                    <input
                        {...register("dailyPrice")}
                        name="dailyPrice"
                        type="number"
                        className="form-control"
                        id="dailyPrice"
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="shared">Shared</label>
                <input
                    type="checkbox"
                    className="form-control"
                    id="shared"
                    name="shared"
                    {...register("shared")}
                />
            </div>
            <button type="submit" className="btn btn-bwm-main">
                Create
            </button>
        </form>
    );
};

export default RentalForm;
