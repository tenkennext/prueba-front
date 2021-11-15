export default class Quota {
  constructor(capacity = '', remain = '', subscribers = {}) {
    this.capacity = capacity;
    this.remain = remain;
    this.subscribers = subscribers;
  }
}