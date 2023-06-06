class Store {
  constructor(nameSpace) {
    // super();
    this.nameSpace = nameSpace;
    this._data = {};
    this.syncToData();
  }

  generateKey(key) {
    // return `${this.nameSpace}__${key}`;
    return key;
  }

  /**
   * 获取相应键对应的值
   */
  get(key) {
    return this._data[this.generateKey(key)];
  }

  /**
   * 设置相应键对应的值
   */
  set(key, value) {
    this._data[this.generateKey(key)] = value;
    this.syncToStorage();
  }

  /**
   * 删除元素
   */
  del(key) {
    delete this._data[this.generateKey(key)];
    this.syncToStorage();
    return true;
  }

  /**
   * 清空
   */
  clear() {
    this._data = {};
    this.syncToStorage();
  }

  /**
   * 本地存储同步到_data;
   */
  syncToData() {
    try {
      this._data = JSON.parse(localStorage.getItem(this.nameSpace)) || {};
    } catch (err) {
      this._data = {};
    }
  }

  /**
   * _data同步到本地存储;
   */
  syncToStorage() {
    localStorage.setItem(this.nameSpace, JSON.stringify(this._data));
  }
}
