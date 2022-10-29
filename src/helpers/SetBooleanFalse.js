function SetBooleanFalse(
  setStateOne,
  setStateTwo,
  setStateThree,
  setStateFour
) {
  if (setStateOne) {
    setStateOne(false);
  }
  if (setStateTwo) {
    setStateTwo(false);
  }
  if (setStateThree) {
    setStateThree(false);
  }
  if (setStateFour) {
    setStateFour(false);
  }
}

export default SetBooleanFalse;
