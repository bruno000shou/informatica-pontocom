function Resetsellstates(setStateOne, setStateTwo, stateOne, stateTwo) {
  setStateOne({ ...stateOne, key: false });
  setStateTwo({ ...stateTwo, key: false });
}

export default Resetsellstates;
