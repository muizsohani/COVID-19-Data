import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import {
  labelStyle,
  tooltip,
  legend,
  lgXaxisLabels,
  responsiveFun,
} from "./options";
import { findAllByAltText } from "@testing-library/react";
import trans from "../translations.json";
import ReducedData from "../reducedData.json";
import dict from "../dictionary";

class SexBreak extends Component {
  constructor(props) {
    super(props);
    this.sortByAge = this.sortByAge.bind(this);
  }
  state = {
    ready: false,
    series: [{}],
    options: {},
  };

  componentDidMount() {
    this.sortByAge();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.sortByAge();
    }
  }

  sortByAge() {
    var cD = Object.values(ReducedData.reduceSex);
    var a = 0;
    var b = 0;
    var c = 0;

    const reso = cD.map((item) => {
      return item[dict.resolved];
    });

    const active = cD.map((item) => {
      return item[dict.NotResolved];
    });
    const fatal = cD.map((item) => {
      return item[dict.deaths];
    });

    this.setState({
      series: [
        {
          name: trans.casesBySex.active[this.props.lang],
          data: active,
        },
        {
          name: trans.casesBySex.resolved[this.props.lang],
          data: reso,
        },
        {
          name: trans.casesBySex.fatal[this.props.lang],
          data: fatal,
        },
      ],
      options: {
        legend: legend,
        tooltip: tooltip,
        responsive: responsiveFun().map((item) => {
          item.options.chart.height = "300px";
          return item;
        }),
        chart: {
          type: "bar",
          stacked: true,
          // zoom: { enabled: true },
        },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          offsetX: 10,
          style: { ...labelStyle },
          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            let indices = w.config.series.map((item, i) => i);
            indices = indices.filter(
              (i) =>
                !w.globals.collapsedSeriesIndices.includes(i) &&
                w.config.series[i].data[dataPointIndex] > 0
            );
            if (seriesIndex === indices[indices.length - 1])
              return w.globals.stackedSeriesTotals[dataPointIndex];
            return "";
          },
        },

        colors: ["#00B2E3", "#8dc63f", "#4d4d4d"],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "60%",
            dataLabels: {
              position: "bottom",
            },
          },
        },
        stroke: {
          width: 2,
          colors: ["#fff"],
        },
        yaxis: {
          title: {
            text: trans.casesBySex.sex[this.props.lang],
          },
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          title: {
            offsetY: 20,
            text: trans.casesTotal.yaxis[this.props.lang],
          },
          categories: [
            trans.casesBySex.male[this.props.lang],
            trans.casesBySex.female[this.props.lang],
            trans.casesBySex.trans[this.props.lang],
            trans.casesBySex.other[this.props.lang],
            trans.casesBySex.unknown[this.props.lang],
          ],
          labels: {
            ...lgXaxisLabels,
          },
        },
      },
    });

    var unknowns = a;
    var trand = b;
    var other = c;
    this.setState({ ready: true, unk: unknowns, trank: trand, other: other });
  }

  render() {
    return (
      <div id="regional" className="chart">
        {this.state.ready ? (
          <React.Fragment>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="250"
            />
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default SexBreak;
