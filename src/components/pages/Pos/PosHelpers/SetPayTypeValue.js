function SetPayTypeValue(
  name,
  payTypeType,
  setSellDailyInsertType,
  setPayType
) {
  setPayType({ ...payTypeType, [name]: true });
  setSellDailyInsertType(name);
}
export default SetPayTypeValue;
