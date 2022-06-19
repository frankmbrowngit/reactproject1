import React from "react";
import { useForm} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import FormError from "Components/FormError";
const Error = ({children}) => {
    return <div className="alert alert-danger">{children}</div>
}
// eslint-disable-next-line
const Email_Pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const LoginForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                   {...register("email",{required: "Email is required", pattern: {value: Email_Pattern, message: "Invalid Email Format"}})}
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                />
                <FormError errors = {errors} name = "email">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    {...register("password",{required: "Password is required", maxLength: 50, minLength: {value: 8, message: "Minimum length of password is 8 characters"}})}
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                   
                />
                <ErrorMessage as={<Error />} errors = {errors} name = "password">
                {({message}) => <p>{message}</p>}
                </ErrorMessage>
                {/* {
                    errors.password && <div className = "alert alert-danger">
                    {errors.password?.type === 'required' && <span>Password is Required</span>}
                    {errors.password?.type === 'minLength' && <span>Password Min Length is 8 characters</span>}
                    {errors.password?.type === 'maxLength' && <span>Password Max Length is 50 characters</span>}
                    </div>
                } */}
            </div>
            <button type="submit" className="btn btn-bwm-main">
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
