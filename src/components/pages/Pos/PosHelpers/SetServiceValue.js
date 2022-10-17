function SetServiceValue(
  name,
  servStateType,
  setSellDailyInsertService,
  setService
) {
  setService({ ...servStateType, [name]: true });
  setSellDailyInsertService(name);
}

export default SetServiceValue;
