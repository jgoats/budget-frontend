import React from "react";
import { Doughnut } from 'react-chartjs-2';

export default class Graph extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Doughnut data={{
                    labels: ["food", "gasoline", "rent", "misc", "cloths"],
                    datasets: [
                        {
                            label: "TeamA Score",
                            data: [40, 10, 50, 30, 20],
                            backgroundColor: [
                                "#DEB887",
                                "#A9A9A9",
                                "#DC143C",
                                "#F4A460",
                                "#2E8B57"
                            ],
                            borderColor: [
                                "#CDA776",
                                "#989898",
                                "#CB252B",
                                "#E39371",
                                "#1D7A46"
                            ],
                            borderWidth: [2, 2, 2, 2, 2]
                        }
                    ]
                }} />
            </div>
        )
    }
}