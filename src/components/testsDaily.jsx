import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import {
  labelStyle,
  tooltip,
  legend,
  responsiveFun,
  stroke,
  lineXaxis,
} from "./options";
import dict from "../dictionary";
import covidData from "../covidData.json";
import trans from "../translations.json";

class TestingYday extends Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }
  state = {
    ready: false,
    dates: [],
    series: [],
    options: {},
  };

  componentDidMount() {
    this.setData();
  }

  setData() {
    const datz = [...covidData.result.records].filter(
      (item) => item[dict.totalTestsCompletedinthelastday]
    );

    var dailydata = datz
      .map((item, z) => {
        if (datz[z - 1]) {
          return [
            item[dict.reportedDate],
            item[dict.patientsApprovedTestingasofDate] -
              datz[z - 1][dict.patientsApprovedTestingasofDate],
          ];
        }
      })
      .filter((item) => item !== undefined);

    this.setState({
      series: [
        {
          name: trans.testing.testsDoneYesterday[this.props.lang],
          data: dailydata,
        },
      ],
      options: {
        colors: ["#00b2e3"],
        legend: legend,
        tooltip: tooltip,
        chart: {
          type: "bar",
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
          },
          zoom: { enabled: true },
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          title: {
            text: trans.testing.yaxis[this.props.lang],
          },
          labels: {
            style: { ...labelStyle },
          },
        },
        stroke: stroke,
        xaxis: {
          ...lineXaxis,
        },
        responsive: responsiveFun().map((item) => {
          item.options.xaxis = { ...lineXaxis };
          return item;
        }),
        fill: {
          opacity: 1,
        },
      },
      ready: true,
    });
  }

  render() {
    return (
      <div id="stacked" className="chart">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height="500px"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default TestingYday;
