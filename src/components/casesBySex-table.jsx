import React, { Component } from "react";
import { Table, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import { ReactComponent as Search } from "../ds/icons/svg/ontario-icon-search.svg";
import ReducedData from "../reducedData.json";
import dict from "../dictionary";
import trans from "../translations.json";
const SearchOutlined = () => <Search />;

class StackedTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: undefined,
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          //   icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const cData = Object.values(ReducedData.reduceSex);

    var data = cData.map((item, z) => {
      switch (item[dict.CLIENT_GENDER]) {
        case "MALE":
          item[dict.CLIENT_GENDER] = trans.casesBySex.male[this.props.lang];
          break;
        case "FEMALE":
          item[dict.CLIENT_GENDER] = trans.casesBySex.female[this.props.lang];
          break;
        case "TRANSGENDER":
          item[dict.CLIENT_GENDER] = trans.casesBySex.trans[this.props.lang];
          break;
        case "OTHER":
          item[dict.CLIENT_GENDER] = trans.casesBySex.other[this.props.lang];
          break;
        case "UNKNOWN":
          item[dict.CLIENT_GENDER] = trans.casesBySex.unknown[this.props.lang];
          break;
      }
      return {
        ...item,
        index: z,
        [dict.resolved]:
          item[dict.resolved] && item[dict.resolved].toLocaleString(),
        [dict.NotResolved]:
          item[dict.NotResolved] && item[dict.NotResolved].toLocaleString(),
        [dict.deaths]: item[dict.deaths] && item[dict.deaths].toLocaleString(),
        total: (
          item[dict.resolved] +
          item[dict.NotResolved] +
          item[dict.deaths]
        ).toLocaleString(),
      };
    });

    const columns = [
      {
        title: trans.casesBySex.sex[this.props.lang],
        dataIndex: dict.CLIENT_GENDER,
        key: dict.CLIENT_GENDER,
        //...this.getColumnSearchProps('name'),
      },
      {
        title: trans.overview.total[this.props.lang],
        dataIndex: "total",
        key: "total",
        //...this.getColumnSearchProps('address'),
      },
      {
        title: trans.casesBySex.active[this.props.lang],
        dataIndex: dict.NotResolved,
        key: dict.NotResolved,
        //...this.getColumnSearchProps('address'),
      },
      {
        title: trans.casesBySex.resolved[this.props.lang],
        dataIndex: dict.resolved,
        key: dict.resolved,
        //...this.getColumnSearchProps('address'),
      },

      {
        title: trans.casesBySex.fatal[this.props.lang],
        dataIndex: dict.deaths,
        key: dict.deaths,
        //...this.getColumnSearchProps('address'),
      },
    ];
    return (
      <React.Fragment>
        <Table columns={columns} dataSource={data} pagination={false} />
      </React.Fragment>
    );
  }
}

export default StackedTable;
