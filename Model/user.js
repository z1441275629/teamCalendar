const userStore = new Store("user");

/**
 * 用户
 * @typedef User
 * @property {string} name - 姓名
 * @property {string} [tel] - 电话
 * @property {1|2} [sex] - 性别
 * @property {string} [code] - code编码
 */

const userModal = {
  /**
   * 添加用户
   * @param {User} params
   * @returns {User}
   */
  async add(params) {
    const list = await userModal.getList();
    await userStore.set("list", list.concat(params));
    return params;
  },
  /**
   * 编辑用户
   * @param {User} params
   * @returns {User | boolean}
   */
  async edit(params) {
    const list = await userModal.getList();
    const index = list.findIndex((item) => item.code === params.code);
    if (index !== -1) {
      list.splice(index, 1, params);
      await userStore.set("list", list);
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
    const list = await userModal.getList();
    const index = list.findIndex((item) => item.code === code);
    if (index !== -1) {
      list.splice(index, 1);
      await userStore.set("list", list);
      return true;
    }
    return false;
  },
  /**
   * 获取用户列表
   * @returns {User[]}
   */
  async getList() {
    return (await userStore.get("list")) || [];
  },
  /**
   * 通过用户名获取用户信息
   * @returns {User}
   */
  async getUserByName(name) {
    const list = await userModal.getList();
    return list.find((item) => item.name === name);
  },
  /**
   * 通过code获取用户信息
   * @returns {User}
   */
  async getUserByCode(code) {
    const list = await userModal.getList();
    return list.find((item) => item.code === code);
  },
};
