export default class Conference {
  constructor(title = '', description = '', location = '', date = '', quota = { capacity:'', remain: '', subscribers: Array }, owner) {
    this.title = title;
    this.description = description;
    this.location = location;
    this.date = date;
    this.quota = {
        capacity : quota.capacity,
        remain : quota.remain,
        subscribers : quota.subscribers,
    };
    this.owner = owner;
  }
}