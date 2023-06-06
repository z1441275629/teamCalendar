const calendarController = {
  async set(params) {
    const userCalendar = await calendarModal.getCalendarByCode(params.code);
    if (userCalendar) {
      return await calendarModal.edit(params);
    }
    return await calendarModal.add(params);
  },
  async del(code) {
    return await calendarModal.del(code);
  },
  async getList() {
    return calendarModal.getList();
  },
};
