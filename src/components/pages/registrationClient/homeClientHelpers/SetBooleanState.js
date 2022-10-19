function SetBooleanState(setStateOne, stateOne, setStateTwo, stateTwo) {
  if (stateOne === true) {
    setStateOne(false);
  } else {
    setStateOne(true);
  }

  if (setStateTwo !== undefined && stateTwo !== undefined) {
    if (stateTwo === true) {
      setStateTwo(false);
    } else {
      setStateTwo(true);
    }
  }
}

export default SetBooleanState;
