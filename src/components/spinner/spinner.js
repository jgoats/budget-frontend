import React from "react";
import "./spinner.scss";

export default class Spinner extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0
        }
    }
    componentDidMount() {
        const { counter } = this.state;
        const { turnOnorOff } = this.props;

        if (turnOnorOff == "off") clearSpinner();
        console.log(turnOnorOff);
        function animateSpinner() {
            if (counter <= 9) {
                for (let i = 1; i <= 9; i++) {
                    if (counter === i) {
                        let e = document.getElementsByClassName(`c${counter}`)[0];
                        e.style.opacity = "1.0";
                    }
                    else if ((counter - 1) === i) {
                        let e2 = document.getElementsByClassName(`c${counter - 1}`)[0];
                        e2.style.opacity = "0.5";
                    }
                    else if ((counter - 2) === i) {
                        let e3 = document.getElementsByClassName(`c${counter - 2}`)[0];
                        e3.style.opacity = "0.3";
                    }
                    else if ((counter - 3) === i) {
                        let e4 = document.getElementsByClassName(`c${counter - 3}`)[0];
                        e4.style.opacity = "0.1";
                    }

                    else {
                        let e = document.getElementsByClassName(`c${i}`)[0];
                        e.style.opacity = "0";

                    }
                }
                counter === 9 ? counter = 1 : counter++;
            }

        }
        function clearSpinner() {
            for (let i = 1; i <= 9; i++) {
                document.getElementsByClassName(`c${i}`)[0].style.opacity = "0";
            }
        }
    }
    render() {
        return (
            <svg id="spinner" enableBackground="new 0 0 497 497" height="512" viewBox="0 0 497 497" width="512"
                xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle className="c6" cx="98" cy="376" fill="#909ba6" r="53" />
                    <circle className="c3" cx="439" cy="336" fill="#c8d2dc" r="46" />
                    <circle className="c1" cx="397" cy="112" fill="#e9edf1" r="38" />
                    <ellipse className="c7" cx="56.245" cy="244.754" fill="#7e8b96" rx="56.245" ry="54.874" />
                    <ellipse className="c5" cx="217.821" cy="447.175" fill="#a2abb8" rx="51.132" ry="49.825" />
                    <ellipse className="c4" cx="349.229" cy="427.873" fill="#b9c3cd" rx="48.575" ry="47.297" />
                    <ellipse className="c8" cx="117.092" cy="114.794" fill="#5f6c75" rx="58.801" ry="57.397" />
                    <ellipse className="c2" cx="453.538" cy="216.477" fill="#dce6eb" rx="43.462" ry="42.656" />
                    <circle className="c9" cx="263" cy="62" fill="#4e5a61" r="62" />
                </g>
            </svg>
        )
    }
}