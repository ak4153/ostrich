function sortMarketsByName(markets, flipSwitch) {
  var helperMarkets;
  // function to sort based on A-Z Z-A
  helperMarkets = markets.sort((a, b) => {
    if (a.fullExchangeName.substring(0, 1) < b.fullExchangeName.substring(0, 1))
      return 1 * flipSwitch;
    if (a.fullExchangeName.substring(0, 1) > b.fullExchangeName.substring(0, 1))
      return -1 * flipSwitch;
  });

  return helperMarkets;
}
// function to sort based on change
function sortMarketsByChange(markets, flipSwitch) {
  var heplerMarkets;
  heplerMarkets = markets.sort((a, b) => {
    if (a.regularMarketChangePercent.raw < b.regularMarketChangePercent.raw)
      return 1 * flipSwitch;
    if (a.regularMarketChangePercent.raw > b.regularMarketChangePercent.raw)
      return -1 * flipSwitch;
  });
  return heplerMarkets;
}

function filterMarkets(markets, input) {
  var heplerMarkets;
  heplerMarkets = markets.filter((market) => {
    if (market.fullExchangeName.toLowerCase().includes(input.toLowerCase()))
      return market;
  });

  return heplerMarkets;
}

export { sortMarketsByName, sortMarketsByChange, filterMarkets };
