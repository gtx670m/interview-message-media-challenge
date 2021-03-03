import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import {
  fetchTrending,
} from "./gallerySlice";
import {
  Image,
  Container,
  Row,
  Col,
  Card,
  Pagination,
  Spinner,
  Modal,
} from "react-bootstrap";
import heart from "../../assets/heart.png";
import message from "../../assets/speech-bubble.png";
import eye from "../../assets/view.png";
import clip from "../../assets/paper-clip.png";

export function Gallery() {
  const [show, setShow] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (url) => {
    setShow(true);
    setImgUrl(url);
  };

  const {
    listTrending = [],
    pagination: { offset = 0 } = {},
    loading = false,
  } = useSelector((state) => state.gallery);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrending({}));
  }, []);

  const renderCard = () => {
    return listTrending.map((item, index) => {
      console.log("item", item);
      const {
        images: { original: { url = "" } = {} } = {},
        user: { avatar_url = "", display_name = "", username = "" } = {},
      } = item;
      return (
        <Col key={`card-${index}`} className="col" md={6} lg={4} xl={3}>
          <Card className="card" onClick={() => handleShow(url)}>
            <Card.Img className="card-img" variant="top" src={url} />
            <Card.Body className="card-body">
              {!!Math.round(Math.random()) ? (
                <Image className="icon" src={clip} />
              ) : (
                <div />
              )}
              <div className="flex-box">
                <div className="review">
                  <Image className="icon" src={eye} />
                  {Math.round(Math.random() * 7000)}
                </div>
                <div className="review">
                  <Image className="icon" src={message} />
                  {Math.round(Math.random() * 50)}
                </div>
                <div className="review">
                  <Image className="icon" src={heart} />
                  {Math.round(Math.random() * 500)}
                </div>
              </div>
            </Card.Body>
          </Card>
          <div className="user">
            <Image className="avatar" src={avatar_url} roundedCircle />{" "}
            {display_name || username || "unknown"}
          </div>
        </Col>
      );
    });
  };

  const onNext = () => {
    dispatch(fetchTrending({ offset: offset + 20 }));
  };

  const onPrev = () => {
    if (offset >= 20) {
      dispatch(fetchTrending({ offset: offset - 20 }));
    }
  };

  return (
    <Container fluid className="gallery">
      <Row className="pagination">
        <Pagination>
          <Pagination.Prev onClick={onPrev} />
          <Pagination.Next onClick={onNext} />
        </Pagination>
      </Row>
      {loading ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Row>{renderCard()}</Row>
      )}
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Full screen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image className="fullscreen-img" fluid src={imgUrl} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
