import React, { Children, useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import data from "../data";
import MarketModal from "./MarketModal";
import Filters from "./Filters";
import {
  sortMarketsByName,
  sortMarketsByChange,
  filterMarkets,
} from "./marketListFunctions";
import axios from "axios";
import ostrich from "../assets/ostrich.png";
const MarketList = () => {
  const [markets, setMarkets] = useState([]);
  const [abcSwitch, setAbcSwitch] = useState(-1);
  const [changeSwitch, setChangeSwitch] = useState(-1);
  const [show, setShow] = useState(false);
  const [activeMarket, setActiveMarket] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  var options = {
    method: "GET",
    url: "https://yfapi.net/v6/finance/quote/marketSummary?lang=en&region=US",
    params: { modules: "defaultKeyStatistics,assetProfile" },
    headers: {
      "x-api-key": "OaKh08IC0v9cSFWgZWCscauymzKCQPchaA2La4vj",
    },
  };

  const handleShow = (market) => {
    setActiveMarket(market);
    setShow(true);
  };

  const handleClose = (market) => {
    setShow(false);
  };

  //sorts the array of markets based on a-z/z-a
  const sortByName = () => {
    setMarkets([...sortMarketsByName(markets, abcSwitch)]);
    setAbcSwitch(abcSwitch * -1);
  };

  const sortByChange = () => {
    setMarkets([...sortMarketsByChange(markets, changeSwitch)]);
    setChangeSwitch(changeSwitch * -1);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setInputFilter(e.target.value);
    console.log(inputFilter);
    // console.log(e.target.value);
    // setMarkets(filterMarkets(markets, e.target.value));
  };

  useEffect(() => {
    // setMarkets(data.marketSummaryResponse.result);
    axios
      .request(options)
      .then((res) => {
        setMarkets(res.data.marketSummaryResponse.result);
      })
      .catch((err) => {
        console.log(err);
        setMarkets(data.marketSummaryResponse.result);
      });
    return () => {
      setMarkets([]);
    };
  }, []);

  return (
    <MarketListWrapper>
      <Filters
        sortByName={sortByName}
        sortByChange={sortByChange}
        handleFilter={handleFilter}
      />
      {markets.length > 0 && inputFilter === "" ? (
        <ContainerWrapper>
          {markets.map((market) => (
            <RowWrapper
              xs={2}
              md={5}
              lg={10}
              onClick={() => handleShow(market)}
              key={market.symbol}
            >
              <Col>{market.fullExchangeName}</Col>
              <Col>{market.shortName}</Col>
              <Col
                style={
                  market.regularMarketChangePercent.fmt.indexOf("-") === 0
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {market.regularMarketPrice.fmt}
                {"/"}
                {market.regularMarketChangePercent.fmt}
              </Col>
            </RowWrapper>
          ))}
        </ContainerWrapper>
      ) : inputFilter !== "" ? (
        markets
          .filter((market) => {
            if (
              market.fullExchangeName
                .toLowerCase()
                .includes(inputFilter.toLowerCase())
            )
              return market;
          })
          .map((market) => (
            <ContainerWrapper>
              <RowWrapper
                xs={2}
                md={5}
                lg={10}
                onClick={() => handleShow(market)}
                key={market.symbol}
              >
                <Col>{market.fullExchangeName}</Col>
                <Col>{market.shortName}</Col>
                <Col
                  style={
                    market.regularMarketChangePercent.fmt.indexOf("-") === 0
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {market.regularMarketPrice.fmt}
                  {"/"}
                  {market.regularMarketChangePercent.fmt}
                </Col>
              </RowWrapper>
            </ContainerWrapper>
          ))
      ) : (
        <img className="marketlist__ostrichSplash" src={ostrich} alt="" />
      )}

      <MarketModal
        handleClose={handleClose}
        show={show}
        market={activeMarket}
      ></MarketModal>
    </MarketListWrapper>
  );
};

const MarketListWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 150px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .marketlist__ostrichSplash {
    -webkit-animation-name: marketlist__ostrichSplash;
    animation-name: marketlist__ostrichSplash;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @-webkit-keyframes marketlist__ostrichSplash {
    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
      transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
      -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    60% {
      opacity: 1;
      -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
      transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
      -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    }
  }
  @keyframes marketlist__ostrichSplash {
    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
      transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
      -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    60% {
      opacity: 1;
      -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
      transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
      -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    }
  }
`;
const ContainerWrapper = styled(Container)``;

const RowWrapper = styled(Row)`
  padding: 5px;
  display: flex;
  justify-content: center;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
  &:nth-child(odd) {
    background: rgba(190, 178, 219, 0.7);
  }
  &:nth-child(even) {
    background: white;
  }
  &:nth-child(odd):hover {
    background: rgba(190, 178, 219, 0.9);
  }
  &:nth-child(even):hover {
    background: rgba(155, 155, 155, 0.4);
  }
`;

export default MarketList;
