const userController = {
  generateId() {
    return Math.random().toString(36).slice(-10);
  },
  async add(params) {
    const user = await userModal.getUserByName(params.name);
    if (user) {
      return false; // 用户名已被注册
    }
    const addUser = { ...params, code: userController.generateId() };
    return await userModal.add(addUser);
  },
  async edit(params) {
    return await userModal.edit(params);
  },
  async del(code) {
    return await userModal.del(code);
  },
  async getList() {
    return userModal.getList();
  },
  async getUserByCode(code) {
    return userModal.getUserByCode(code);
  },
};
