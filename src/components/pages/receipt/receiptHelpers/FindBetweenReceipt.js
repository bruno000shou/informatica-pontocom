function FindBetweenReceipt(allJson, initDate, finalDate) {
  let fullJason = allJson;
  let searchElementsJson = [];

  fullJason.map((e) => {
    if (initDate <= e.date && finalDate >= e.date) {
      searchElementsJson.push(e);
    }
  });
  return searchElementsJson;
}

export default FindBetweenReceipt;
