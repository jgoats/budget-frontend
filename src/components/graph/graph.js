import React from "react";
import { Doughnut } from 'react-chartjs-2';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { data, backgroundColor, blackBorder } = this.props;
        return (
            <div>
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
            </div>
        )
    }
}