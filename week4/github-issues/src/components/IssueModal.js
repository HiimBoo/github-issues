import React from "react";
import { Media, Modal } from "react-bootstrap";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
// import { ClipLoader } from "react-spinners";

const IssueModal = ({ item, showModal, setShowModal, comments }) => {
  return (
    <div>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <label className="mr-1">#{item.number}</label>
            {item.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown source={item.body} />
          <hr />
          <h4>Comments: </h4>
          <ul className="list-unstyled">
            {comments && comments.length ? (
              comments.map((comment) => (
                <Media as="li" className="mb-3" key={comment.id}>
                  <img
                    src={comment.user.avatar_url}
                    alt="User Avatar"
                    className="avatar mr-3"
                    width="130"
                    height="130"
                  />
                  <Media.Body className="text-left">
                    <div>
                      <span className="text-grey mr-2">
                        @{comment.user.login}
                      </span>
                      <span className="text-grey">
                        commented <Moment fromNow>{comment.created_at}</Moment>
                      </span>
                    </div>
                    <ReactMarkdown className="mb-5" source={comment.body} />
                    {/* {loading ? (
                      <ClipLoader color="black" size={75} loading={loading} />
                    ) : (
                      <Button
                        type="button"
                        onClick={() => handleMoreComments}
                      >
                        Show More
                      </Button>
                    )} */}
                  </Media.Body>
                </Media>
              ))
            ) : (
              <li>There are no comments of this issue</li>
            )}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IssueModal;
