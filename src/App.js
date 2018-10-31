import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import {connect} from 'react-redux';
import * as actions from './actions/actions';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataObj: [],
      dataKeys: [],
      offset: 0,
      limit: 10,
      pagingCount: 0,
      activePage: 1,
      dataLength: 0,
      sorting: {
        first_name: 'atoz',
        last_name: 'atoz',
        gender: 'atoz',
        email: 'atoz'
      }
    }

  }

  componentDidMount() {
    $("#spnPrev").addClass('span-disabled')
    var _that = this;
    var offset = this.state.offset;
    var limit = this.state.limit;
    $.ajax({
      url: 'https://my.api.mockaroo.com/users.json?key=cde45810',
      type: 'GET',
      dataType: "json",
      contentType: "application/json",
      success: function(res){
        _that.props.loadData(res, offset, limit);
        _that.props.limitData(offset, limit);
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    var pgCount = Math.round(nextProps.data.length / this.state.limit);
    var dataLen = nextProps.data.length;
    var objKeys = Object.keys(nextProps.data[0]);
    delete objKeys[0];
    this.setState({
      dataObj: nextProps.dataObj.data,
      dataKeys: objKeys,
      pagingCount: pgCount,
      dataLength: dataLen
    })
  }

  changePage = (v) => {
    var limit = this.state.limit;
    var offset = v*limit - limit;
    console.log(offset, limit);
    this.setState({
      activePage: v,
      offset: offset
    },() => {
      this.props.limitData(this.state.offset, this.state.limit);
      this.state.activePage === 1 ? $("#spnPrev").addClass('span-disabled') : $("#spnPrev").removeClass('span-disabled');
      this.state.activePage === this.state.pagingCount ? $("#spnNext").addClass('span-disabled') : $("#spnNext").removeClass('span-disabled');
    });
  }

  changePagination = (e) => {
    console.log(e.target.value);
    var val = e.target.value ? e.target.value : 10;
    this.setState({
      offset : 0,
      limit: parseInt(val),
      activePage: 1
    },() => {
      this.props.limitData(this.state.offset, this.state.limit);
    })
  }

  applySort = (data) => {
    let flag = Object.assign({}, this.state.sorting);
    flag[data] === 'atoz' ? flag[data] = 'ztoa' : flag[data] = 'atoz';
    this.setState({
      sorting: flag
    },() => {
      this.props.sortData(data, this.state.sorting[data])
    })
    $('#'+data+' i').removeClass('opacity').toggleClass('rotate');
  }

  render() {
    let page = [];
    let pagingNum = this.state.pagingCount;
    for(let v=1; v<=pagingNum; v++){
        page.push(<span key={v} className={this.state.activePage === v ? 'active' : ''}  onClick={() => this.changePage(v)}>{v}</span>);
    }

    return (
      <div className="App">
        <header className="App-header">
          <input type="number" className="paging-number" placeholder="Pagination" min='0' max={this.state.dataLength} onChange={(e) => this.changePagination(e)}/>
          <div className="table-container">
            <div className="table">
              {
                this.state.dataKeys && this.state.dataKeys.map((data, index) => (
                    <div key={index} id={data} className="table-head-cell" onClick={() => this.applySort(data)}>
                      {data}
                      <i className="fas fa-arrow-up opacity"></i>
                    </div>
                ))
              }
            </div>
            {
              this.state.dataObj && this.state.dataObj.map((data, index) => (
                <div key={index} className="table">
                  <div className="table-cell">{data.first_name}</div>
                  <div className="table-cell">{data.last_name}</div>
                  <div className="table-cell">{data.email}</div>
                  <div className="table-cell">{data.gender}</div>
                </div>
              ))
            }
          </div>
          <div className="pagination">
            {
              <div>
                  <span onClick={() => this.changePage(this.state.activePage-1)} id="spnPrev">Prev</span>
                  {page}
                  <span onClick={() => this.changePage(this.state.activePage+1)} id="spnNext">Next</span>
              </div>
            }
                
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    dataObj: state.dataObj
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: function(data, offset, limit){
      actions.loadData(dispatch, data, offset, limit);
    },
    limitData: function(offset, limit){
      actions.limitData(dispatch, offset, limit)
    },
    sortData: function(sortField, sortType) {
      actions.sortData(dispatch, sortField, sortType)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
