import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Positive extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
    this.setData = this.setData.bind(this);
  }
  state = {
    dataz: this.props.data,
    ready: false,
    datez: [],
    confPosi: [],
    series: [{}],
    options: {}
  };

  componentDidMount() {
    this.setData();
  }

  setData() {
    setTimeout(() => {
      const data = this.state.dataz;

      //const dates = [];
      // const confPos = [];

      // for (var i = 1; i < data.length - 1; i++) {
      //   var row = data[i];

      //   dates[i - 1] = row[0];
      //   if (!row[5]) {
      //     if (!confPos[i - 2]) {
      //       confPos[i - 1] = 0;
      //     } else {
      //       confPos[i - 1] = confPos[i - 2];
      //     }
      //   } else {
      //     confPos[i - 1] = row[5];
      //   }
      // }

      const confi = data.map(function(row) {
        if (!row[5]) {
          return 0;
        } else {
          return row[5];
        }
      });
      const confiPos = confi.slice(1, confi.length - 1);

      const datez = data.map(function(row) {
        return row[0];
      });
      const dates = datez.slice(1, datez.length - 1);

      this.setState({ confPosi: confiPos, datez: dates });
      this.makeChart();
    }, 0.001);
  }

  makeChart() {
    const confPos = this.state.confPosi;
    const dates = this.state.datez;

    this.setState({
      series: [
        {
          name: "Confirmed Positives",
          data: confPos
        }
      ]
    });
    this.setState({
      options: {
        chart: {
          height: 650,
          type: "line",
          zoom: { enabled: true }
        },
        title: { text: "Positive Cases of COVID-19 in Ontario" },
        xaxis: {
          categories: dates,
          range: 30
        },
        colors: ["#C64A1C"]
        // responsive: [
        //   {
        //     breakpoint: "1000px",
        //     options: {}
        //   }
        // ]
      }
    });
    this.setState({ ready: true });
  }

  render() {
    return (
      <div id="positive" className="chart">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={650}
            width={1200}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Positive;
