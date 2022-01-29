import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { DateTime } from "luxon";
const MarketModal = ({ market, show, handleClose }) => {
  //adjusted israel time
  const time = {
    hour: market
      ? DateTime.fromSeconds(market.regularMarketTime.raw, { locale: "he-IL" })
          .hour
      : NaN,
    minute: market
      ? DateTime.fromSeconds(market.regularMarketTime.raw, { locale: "he-IL" })
          .minute
      : NaN,
  };
  return (
    <>
      {market ? (
        <ModalWrapper show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <ModalTitle>
              <div>
                <p>{market.fullExchangeName}</p>
                <p className="marketmodal__modal-title__subheading">
                  {/* in case there isnt a shortName */}(
                  {market.shortName || market.symbol + " " + market.quoteType})
                </p>
              </div>

              <div className="marketmodal__modal-title__realttimeprice">
                <p>{market.regularMarketPrice.fmt}</p>
                <p className="marketmodal__modal-title__subheading">
                  Real-Time Quote
                </p>
                <p className="marketmodal__modal-title__subheading">
                  {`As of ${time.hour}:${time.minute} Israel-Time`}
                </p>
              </div>

              <div className="marketmodal__modal-title__changePercent">
                <p
                  style={
                    market.regularMarketChangePercent.fmt.indexOf("-") === 0
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {market.regularMarketChangePercent.fmt}/
                  {market.regularMarketChange.fmt}
                </p>
                <p className="marketmodal__modal-title__subheading">
                  Today's change
                </p>
              </div>
            </ModalTitle>
          </Modal.Header>

          <ModalBody>
            <div className="marketmodal__modal-body__quoteDetails">
              <p>Previous Close: {market.regularMarketPreviousClose.fmt}</p>
              <p>Symbol: {market.symbol}</p>
              <p>Region: {market.region}</p>
            </div>
          </ModalBody>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </ModalWrapper>
      ) : (
        ""
      )}
    </>
  );
};
const ModalTitle = styled(Modal.Title)`
  display: flex;
  flex-flow: row wrap;
  p {
    margin: 0;
  }
  .marketmodal__modal-title__realttimeprice {
    padding-left: 15px;
  }
  .marketmodal__modal-title__subheading {
    font-size: 0.7rem;
    font-weight: 400;
  }
  .marketmodal__modal-title__changePercent {
    padding-left: 15px;
  }
`;

const ModalBody = styled(Modal.Body)`
  justify-content: space-between;
  border-bottom: 1px solid gray;
  .marketmodal__modal-body__quoteDetails {
    display: flex;
    align-items: center;
    flex-flow: column wrap;
  }
`;

const ModalWrapper = styled(Modal)`
  .modal-content {
    padding: 10px;
  }
`;
export default MarketModal;
