import colours from "../ds/styles/sass/variables/colours.variables.scss";

export const labelStyle = {
  fontSize: "16px",
  colors: [colours.black],
};

export const dataLabelsSize = "15px";

export const tooltip = {
  followCursor: true,
  style: { ...labelStyle },
};

export const stroke = {
  width: 2,
  curve: "straight",
  dashArray: [0, 8, 0, 15],
};

export const markers = {
  size: 7,
  colors: [colours.blue],
  strokeColors: "#fff",
  strokeWidth: 3,
  hover: {
    size: 9,
  },
};

export const legend = {
  fontSize: dataLabelsSize,
  position: "top",
  horizontalAlign: "left",
  onItemClick: {
    toggleDataSeries: true,
  },
  onItemHover: {
    highlightDataSeries: true,
  },
};

export const responsiveA = () => [
  {
    breakpoint: 640,
    options: {
      chart: {
        height: "300px",
        width: "100%",
        toolbar: {
          tools: {
            zoomin: false,
            zoomout: false,
          },
        },
      },
      xaxis: {
        labels: {
          hideOverlappingLabels: true,
          offsetY: 10,
          style: { ...labelStyle, fontSize: "12px" },
        },
      },
      legend: {
        fontSize: "12px",
      },
      dataLabels: {
        offsetY: -18,
        style: { ...labelStyle, fontSize: "10px" },
        orientation: "horizontal",
        background: {
          enabled: true,
          foreColor: "#fff",
          padding: 2,
          borderRadius: 1,
          borderWidth: 1,
          borderColor: "#fff",
          opacity: 0.8,
        },
      },
    },
  },
  {
    breakpoint: 1163,
    options: {
      chart: {
        height: "400px",
        width: "100%",
      },
      xaxis: {
        labels: {
          hideOverlappingLabels: true,
          offsetY: 10,
          style: { ...labelStyle },
        },
      },
    },
  },
  {
    breakpoint: 1530,
    options: {
      chart: {
        height: "500px",
        width: "100%",
      },
      xaxis: {
        labels: {
          offsetY: 10,
          style: { ...labelStyle },
        },
      },
    },
  },
];

export const responsiveB = () => [
  {
    breakpoint: 640,
    options: {
      chart: {
        offsetX: 10,
        height: "300px",
        width: "100%",
        toolbar: {
          tools: {
            zoomin: false,
            zoomout: false,
          },
        },
      },
      yaxis: {
        labels: {
          style: { ...labelStyle, fontSize: "12px" },
        },
      },
      xaxis: {
        labels: {
          hideOverlappingLabels: true,
          offsetY: 10,
          style: { ...labelStyle, fontSize: "12px" },
        },
      },
      legend: {
        fontSize: "12px",
      },
      dataLabels: {
        offsetX: -4,
        style: { ...labelStyle, fontSize: "12px" },
        orientation: "horizontal",
      },
    },
  },
  {
    breakpoint: 1163,
    options: {
      chart: {
        height: "400px",
        width: "100%",
      },
      xaxis: {
        labels: {
          hideOverlappingLabels: true,
          offsetY: 10,
          style: { ...labelStyle },
        },
      },
    },
  },
  {
    breakpoint: 1530,
    options: {
      chart: {
        height: "500px",
        width: "100%",
      },
      xaxis: {
        labels: {
          offsetY: 10,
          style: { ...labelStyle },
        },
      },
    },
  },
];

export const responsiveFun = () => [
  {
    breakpoint: 640,
    options: {
      chart: {
        offsetX: 10,
        height: "300px",
        width: "100%",
        toolbar: {
          tools: {
            zoomin: false,
            zoomout: false,
          },
        },
      },
      yaxis: {
        labels: {
          style: { ...labelStyle, fontSize: "12px" },
        },
      },
      xaxis: {
        labels: {
          hideOverlappingLabels: true,
          offsetY: 10,
          style: { ...labelStyle, fontSize: "12px" },
        },
      },
      legend: {
        fontSize: "12px",
      },
      dataLabels: {
        style: { ...labelStyle, fontSize: "12px" },
        orientation: "horizontal",
      },
    },
  },
  {
    breakpoint: 1163,
    options: {
      chart: {
        height: "400px",
        width: "100%",
      },
      xaxis: {
        labels: {
          hideOverlappingLabels: true,
          offsetY: 10,
          style: { ...labelStyle },
        },
      },
    },
  },
  {
    breakpoint: 1530,
    options: {
      chart: {
        height: "500px",
        width: "100%",
      },
      xaxis: {
        labels: {
          offsetY: 10,
          style: { ...labelStyle },
        },
      },
    },
  },
];
