function findBetween(allJson, initDate, finalDate, setSearchComplete) {
  let fullJason = allJson;
  let searchElementsJson = [];

  function findElements() {
    fullJason.map((e) => {
      if (initDate <= e.datePos && finalDate >= e.datePos) {
        searchElementsJson.push(e);
      }
    });
    setSearchComplete(searchElementsJson);
  }
  return findElements();
}

export default findBetween;
