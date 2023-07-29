import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./MyRequests.css";
import { delet, get, post } from "../../utilities";

import { Layout, Spin, Switch } from "antd";
const { Content } = Layout;
import RequestList from "../modules/RequestList";

function MyRequests({ user }) {
  const [requests, setRequests] = useState([]);
  const [tableMode, setTableMode] = useState(false);

  const fetchRequests = () => {
    get("/api/my-requests", {
      cursor: requests.length ? requests[requests.length - 1].requestDate : "",
    }).then((newReqs) => setRequests([...requests, ...newReqs]));
  };

  useEffect(() => {
    document.title = "My Requests";
  }, []);

  useEffect(() => {
    if (!user._id) return;
    fetchRequests();
  }, [user]);

  if (user.loggedOut) {
    return (
      <Content className="u-flex-justifyCenter">
        <h2 className="MyRequests-login">Log in to view your requests</h2>
      </Content>
    );
  }

  if (!user._id || !requests) {
    return (
      <Content className="u-flex-justifyCenter">
        <div className="MyRequests-loading">
          <Spin size="large" />
        </div>
      </Content>
    );
  }

  return (
    <Content className="content">
      <div className="MyRequests-compact-toggle">
        <span className="MyRequests-compact-toggle-label">Table Mode:</span>
        <Switch checked={tableMode} onClick={() => setTableMode(!tableMode)} />
      </div>
      <h1 className="MyRequests-header">Requests to Modders</h1>
      <RequestList
        requests={requests}
        requesterMode={true}
        tableMode={tableMode}
        onShowMore={fetchRequests}
      />
    </Content>
  );
}

export default MyRequests;
