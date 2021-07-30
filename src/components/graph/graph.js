import React from "react";
import { Pie, Doughnut } from 'react-chartjs-2';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { data, backgroundColor, blackBorder, graph } = this.props;
        return (
            <div> {
                graph === "Pie" ?
                    <Pie data={{
                        labels: [],
                        datasets: [
                            {
                                label: "TeamA Score",
                                data: data,
                                backgroundColor: backgroundColor,
                                borderColor: blackBorder,
                                borderWidth: [1, 1, 1, 1, 1]
                            }
                        ]
                    }} /> :
                    <Doughnut data={{
                        labels: [],
                        datasets: [
                            {
                                label: "TeamA Score",
                                data: data,
                                backgroundColor: backgroundColor,
                                borderColor: blackBorder,
                                borderWidth: [1, 1, 1, 1, 1]
                            }
                        ]
                    }} />
            }
            </div>
        )
    }
}