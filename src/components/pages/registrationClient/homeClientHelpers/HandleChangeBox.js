function HandleChangeBox(handleBox, setHandleBox) {
  if (handleBox === false) {
    setHandleBox(true);
  } else {
    setHandleBox(false);
  }
}

export default HandleChangeBox;
