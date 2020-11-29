import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Container } from "react-bootstrap";
import PublicNavbar from "./components/PublicNavbar";
import { ClipLoader } from "react-spinners";
import SearchForm from "./components/SearchForm";
import PaginationBar from "./components/PaginationBar";
import IssueList from "./components/IssueList";
import IssueModal from "./components/IssueModal";
// import IssueModal from "./components/IssueModal";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("facebook/react");

  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [issues, setIssues] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [issueClick, setIssueClick] = useState([]);
  const [comments, setComments] = useState([]);
  const [urlComments, setURLcomments] = useState("");
  // const [loadingComments, setLoadingComments] = useState(false);

  const issueUserClicked = (item) => {
    setShowModal(true);
    setIssueClick(item);
    setURLcomments(
      `https://api.github.com/repos/${owner}/${repo}/issues/${item.number}/comments`
    );
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // searchInput = owner/repo
    const temp = searchInput.split("/");
    if (temp.length === 2) {
      setOwner(temp[0]);
      setRepo(temp[1]);
    } else {
      setErrorMessage("Wrong format of search input");
    }
  };

  useEffect(() => {
    if (!owner || !repo) return;
    const fetchIssueData = async () => {
      setLoading(true);
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
          const link = res.headers.get("link");
          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            );
            if (getTotalPage) setTotalPageNum(Number(getTotalPage[1]));
          }
          setIssues(data);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
          setIssues([]);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchIssueData();
  }, [owner, repo, pageNum]);

  useEffect(() => {
    // if (!urlComments || !showModal) return;
    const fetchCommentURL = async () => {
      try {
        const response = await fetch(urlComments);
        const data = await response.json();
        console.log(data);
        if (response.status !== 200) {
          setErrorMessage(data.message);
        } else {
          setComments(data);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchCommentURL();
  }, [urlComments, showModal]);

  return (
    <>
      <PublicNavbar />
      <Container>
        <h1 className="text-center">Github Issues</h1>
        <SearchForm
          loading={loading}
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
          handleSubmit={handleSubmit}
        />
        <div className="d-flex flex-column align-items-center">
          {errorMessage && (
            <Alert variant="danger" className="mt-4">
              {errorMessage}
            </Alert>
          )}
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
          />
        </div>
        {loading ? (
          <ClipLoader color="blue" size={80} loading={true} />
        ) : (
          <IssueList
            itemList={issues}
            setShowModal={setShowModal}
            showModal={showModal}
            issueUserClicked={issueUserClicked}
          />
        )}
        <IssueModal
          item={issueClick}
          showModal={showModal}
          setShowModal={setShowModal}
          comments={comments}
        />
      </Container>
    </>
  );
}

export default App;
