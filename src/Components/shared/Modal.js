import Modal from "react-modal";
import React from "react";
import { useState } from "react";
import '../../styles/_booking-reserve.scss';
const customStyles = {
    content: {
        position: "relative",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        height: "40%",
        width: "40%"
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.7)",
    },
};

const BwmModal = ({title ="Modal Window", subtitle = "Confirm Data", children, openBtn: OpenBtn}) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
        {!OpenBtn &&
            <button onClick={openModal} className="btn btn-success">
                Open Modal
            </button>
        } {
            OpenBtn &&
            <div onClick = {openModal}>{OpenBtn}</div>
        }
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h4 className="booking-modal modal-title title" style = {{fontSize: "3rem"}}>
                    {title}
                </h4>
                <p className='booking-modal modal-subtitle' style =  {{fontSize: "2rem", left: "inherit"}}>{subtitle}</p>
                <div className="booking-modal modal-body" style = {{fontSize: "1.5rem", paddingLeft: "0"}}>{children}</div>
                <div className = "booking-modal modal-footer">
                    <button type = "button" className = 'btn btn-success'>Confirm</button>
                    <button type = "button"  className = 'btn btn-danger'>Cancel</button>
                    <button type = "button"  className = 'btn btn-secondary' onClick = {closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};
export default BwmModal;
