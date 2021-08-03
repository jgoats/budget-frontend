import React from "react";
import "./handledelete.scss";
import Cancel from "../../images/cancel.svg";
import Check from "../../images/checkmark.svg";

export default class HandleDelete extends React.Component {
    constructor() {
        super();
        this.delete = this.delete.bind(this);
        this.dontDelete = this.dontDelete.bind(this);
    }
    delete() {
        this.props.deleteData(true);
    }
    dontDelete() {
        this.props.deleteData(false);
    }
    render() {
        const { data } = this.props;
        return (
            <div className="handle-delete-main-container">
                <div className="handle-delete-question">
                    {`Are you sure you want to delete ${data.name} ?`}
                </div>
                <div className="handle-delete-options">
                    <div onClick={this.dontDelete} className="handle-delete-cancel">
                        <p className="handle-delete-text">No</p>
                        <img className="model-image" src={Cancel} />
                    </div>
                    <div onClick={this.delete} className="handle-delete-confirm">
                        <p className="handle-delete-text">Yes</p>
                        <img className="model-image" src={Check} />
                    </div>
                </div>
            </div>
        )
    }
}