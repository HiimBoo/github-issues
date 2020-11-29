import React, { useState } from "react";
import { Media, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import IssueModal from "./IssueModal";

const IssueList = ({ itemList, setShowModal, showModal, issueUserClicked }) => {
  return (
    <ul className="list-unstyled">
      {itemList.map((item) => (
        <Button
          variant="light"
          key={item.id}
          onClick={() => issueUserClicked(item)}
          className="button mb-4"
        >
          <Item
            key={item.id}
            item={item}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </Button>
      ))}
    </ul>
  );
};

const Item = ({ item }) => {
  return (
    <Media as="li" className="mt-4">
      <img
        width={150}
        height={150}
        className="mr-3"
        src={item.user.avatar_url}
        alt="Generic placeholder"
      />

      <Media.Body className="container-media">
        <h5 className="font-weight-bold">
          #{item.number} {item.title}
        </h5>
        <span className="font-italic font-weight-light mt-5">
          Last update: <Moment fromNow>{item.updated_at}</Moment>
        </span>
        <div>
          <ReactMarkdown>
            {item.body.length <= 100 ? item.body : item.body.slice(0, 99)}
          </ReactMarkdown>
        </div>
      </Media.Body>
    </Media>
  );
};

export default IssueList;
