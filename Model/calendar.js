const calendarStore = new Store("calendar");

/**
 * 用户
 * @typedef Calendar
 * @property {string} code - 用户code
 * @property {CalendarType} [type] - 工作日历类型
 * @property {number} beginDate - 周期开始日期

 */

/**
 * 工作日历类型
 * @enum {number}
 * @readonly
 */
const CalendarType = {
  /**
   * 4天一循环（白班 夜班 下夜班 空白班）
   */
  Four: 1,
};

const calendarModal = {
  /**
   * 添加用户日历
   * @param {Calendar} params
   * @returns {Calendar}
   */
  async add(params) {
    const list = await calendarModal.getList();
    await calendarStore.set("list", list.concat(params));
    return params;
  },
  /**
   * 编辑用户日历
   * @param {Calendar} params
   * @returns {Calendar | boolean}
   */
  async edit(params) {
    const list = await calendarModal.getList();
    const index = list.findIndex((item) => item.code === params.code);
    if (index !== -1) {
      list.splice(index, 1, params);
      await calendarStore.set("list", list);
      return params;
    }
    return false;
  },
  /**
   * 通过code删除用户
   * @param {string} code
   * @returns {boolean}
   */
  async del(code) {
    const list = await calendarModal.getList();
    const index = list.findIndex((item) => item.code === code);
    if (index !== -1) {
      list.splice(index, 1);
      await calendarStore.set("list", list);
      return true;
    }
    return false;
  },
  /**
   * 获取用户日历列表
   * @returns {Calendar[]}
   */
  async getList() {
    return (await calendarStore.get("list")) || [];
  },
  /**
   * 通过code获取用户信息
   * @returns {Calendar}
   */
  async getCalendarByCode(code) {
    const list = await calendarModal.getList();
    return list.find((item) => item.code === code);
  },
};
