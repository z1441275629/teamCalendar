const oneDayTime = 1000 * 60 * 60 * 24;
const dateUtil = {
  /**
   * 判断某一年是否是闰年
   */
  isLeapYear(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  },
  getMonthTotalDays(year, month) {
    month = month + 1;
    const monthDaysMap = {
      1: 31,
      2: dateUtil.isLeapYear(year) ? 29 : 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };
    return monthDaysMap[month];
  },
  getDays(y, m) {
    const days = [];
    const totalDays = dateUtil.getMonthTotalDays(y, m);

    // 月度第一天星期几
    const firstDay = new Date(y, m, 1).getDay();
    const preEmptyDays = (firstDay + 7 - 1) % 7;
    const rows = Math.ceil((totalDays + preEmptyDays) / 7);
    for (let i = 0; i < rows; i++) {
      const row = [];
      days.push(row);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 1; j <= 7; j++) {
        const order = i * 7 + j;
        if (order <= preEmptyDays || order > totalDays + preEmptyDays) {
          days[i][j - 1] = undefined;
        } else {
          days[i][j - 1] = order - preEmptyDays;
        }
      }
    }

    return days;
  },
  getDateInfo(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const week = date.getDay();
    return {
      year,
      month,
      day,
      hour,
      minute,
      second,
      date,
      week,
    };
  },
  formatter(date) {
    const { year, month, day } = dateUtil.getDateInfo(new Date(date));
    function double(n) {
      return n > 9 ? `${n}` : `0${n}`;
    }
    return [year, month + 1, day].map(double).join("-");
  },
  getDiffDay(date1, date2) {
    const diff = new Date(date2) - new Date(date1);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    return days;
  },
  getPreMonth(year, month) {
    if (month > 0) {
      month--;
    } else {
      year--;
      month = 11;
    }
    return { year, month };
  },
  getNextMonth(year, month) {
    if (month < 11) {
      month++;
    } else {
      year++;
      month = 0;
    }
    return { year, month };
  },
  /**
   * 获取某个日期所在的一周
   * @param {Date | TimeStep | String} date
   * @returns {Array<{year, month, day}>}
   */
  getCurrentWeek(date) {
    const current = new Date(date);
    let { week } = dateUtil?.getDateInfo(current);
    week = week || 7; // 星期0 改为星期七，实现周日放到一周的最后面
    const oneWeek = [];
    for (i = 1; i <= 7; i++) {
      const { year, month, day } = dateUtil?.getDateInfo(
        current.getTime() - (week - i) * oneDayTime
      );
      oneWeek.push({ year, month, day });
    }
    // console.log(oneWeek);
    return oneWeek;
  },

  /**
   * 获取相邻一个周期
   * @param {Array<{year, month, day}>} currentCycle 当前周期
   * @param {boolean} isNext 是否是下一个周期
   * @returns {Array<{year, month, day}>}
   */
  getAdjacentCycle(currentCycle, isNext) {
    const oneWeek = [];
    const begin = currentCycle[0];
    const cycleLen = currentCycle.length;
    const { year, month, day } = begin;
    const coefficient = isNext ? 1 : -1;
    const beginDate = new Date(
      new Date(year, month, day).getTime() + coefficient * cycleLen * oneDayTime
    );
    for (i = 0; i < cycleLen; i++) {
      const { year, month, day } = dateUtil.getDateInfo(
        beginDate.getTime() + i * oneDayTime
      );
      oneWeek.push({ year, month, day });
    }
    // console.log(oneWeek);
    return oneWeek;
  },
  /**
   * 获取前一个周期
   * @param {Array<{year, month, day}>} currentCycle
   * @returns {Array<{year, month, day}>}
   */
  getPreCycle(currentCycle) {
    return dateUtil?.getAdjacentCycle(currentCycle, false);
  },
  /**
   * 获取前一个周期
   * @param {Array<{year, month, day}>} currentCycle
   * @returns {Array<{year, month, day}>}
   */
  getNextCycle(currentCycle) {
    return dateUtil.getAdjacentCycle(currentCycle, true);
  },
  /**
   * 是否是今天
   */
  isToday(year, month, day) {
    const now = new Date();
    const d = new Date(year, month, day);
    const diff = now - d;
    return diff >= 0 && diff < 24 * 60 * 60 * 1000;
  },
  /**
   * 获取某个日期0点的日期/时间戳
   */
  getDate0Time(date = new Date()) {
    const { year, month, day } = dateUtil.getDateInfo(date);
    return new Date(year, month, day);
  },
};
