import React, { Component } from "react";
import Waypoint from "react-waypoint";
import { Code } from "react-content-loader";
import https from "https";
import axios from "axios";
import Noticecard from "../components/Noticecard";
import "../styles/section.css";
import "../styles/noticeboard.css";

import { connect } from "react-redux";
import { fetchNotices as fetchNotices_ } from "../actions/actions";
const veritas_url = "https://hermes.mykgp.com/";
const notice_urls = ["acad_ug", "acad_pg", "bcrth", "public"];

axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

class Noticeboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // notices: [],
      notice_type: 0
      // notice_next_page: null,
      // all_fetched: false
    };
    // this.getNotices = this.getNotices.bind(this);
    // this.switchType = this.switchType.bind(this);
    this.updateNotices(0);
  }

  switchType = type_index => {
    this.setState({ notice_type: type_index });
    // this.updateNotices(type_index);
    // if (type_index !== this.state.notice_type) {
    //   this.setState({
    //     notices: [],
    //     notice_type: type_index,
    //     notice_next_page: null,
    //     all_fetched: false
    //   });
    // }
  };

  updateNotices = noticeType => {
    const { fetchNotices } = this.props;
    fetchNotices(noticeType);
  };

  // getNotices(notice_type, next_page) {
  //   var requestUrl = veritas_url + notice_urls[notice_type] + "/";
  //   if (next_page) {
  //     requestUrl =
  //       veritas_url + notice_urls[notice_type] + "/page/" + next_page;
  //   }
  //   axios
  //     .get(requestUrl)
  //     .then(response => {
  //       this.setState({
  //         notices: this.state.notices.concat(response["data"]["data"]),
  //         notice_next_page: response["data"]["next_cursor"]
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.notice_next_page === this.state.notice_next_page &&
  //     !this.state.all_fetched
  //   ) {
  //     this.setState({
  //       all_fetched: true
  //     });
  //   }
  // }

  _handleWaypointEnter = () => {
    this.updateNotices(this.state.notice_type);
    // this.getNotices(this.state.notice_type, this.state.notice_next_page);
  };

  _handleWaypointLeave = () => {};

  render() {
    const { notices } = this.props;
    // console.log(notices);
    // console.log(notices[this.state.notice_type]);
    console.log(this.state.notice_type);
    const { data } = notices[this.state.notice_type];
    console.log(data);
    // const data = notices[this.state.notice_type].data;
    // console.log(data);
    return (
      <div className="section-main">
        <div className="section-title">Noticeboard</div>
        <div className="type-list">
          <ul>
            <li>
              <a
                className={
                  this.state.notice_type === 0
                    ? "active type-button"
                    : "type-button"
                }
                onClick={() => this.switchType(0)}
              >
                UG
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.notice_type === 1
                    ? "active type-button"
                    : "type-button"
                }
                onClick={() => this.switchType(1)}
              >
                PG
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.notice_type === 2
                    ? "active type-button"
                    : "type-button"
                }
                onClick={() => this.switchType(2)}
              >
                BC Roy
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.notice_type === 3
                    ? "active type-button"
                    : "type-button"
                }
                onClick={() => this.switchType(3)}
              >
                General
              </a>
            </li>
          </ul>
        </div>
        <div className="notice-list">
          {data.map((notice, i) => (
            <Noticecard
              key={i}
              title={notice.title}
              time={notice.time}
              content={notice.html}
              attachment={notice.attachment}
            />
          ))}
          <Waypoint
            onEnter={this._handleWaypointEnter}
            onLeave={this._handleWaypointLeave}
          />
          {/*(() => {
            if (!this.state.all_fetched) {
              return (
                <Code
                  className="placeholderNotice"
                  height={50}
                  primaryColor="#fff"
                />
              );
            }
          })()*/}
        </div>
      </div>
    );
  }
}
Noticeboard = connect(
  ({ notices }) => ({ notices }),
  dispatch => ({
    fetchNotices: noticeType => dispatch(fetchNotices_(noticeType))
  })
)(Noticeboard);
export default Noticeboard;
