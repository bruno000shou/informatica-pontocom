function HandleChangeInputs(e, setStateOne, setStateTwo) {
  if (setStateOne !== null) setStateOne(e);
  if (setStateTwo !== undefined) setStateTwo(e.target.value);
}

export default HandleChangeInputs;
