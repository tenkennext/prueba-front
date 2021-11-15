export default class User {
  constructor(title = '', description = '', location = '', date = '', quota = '', owner) {
    this.title = title;
    this.description = description;
    this.location = location;
    this.date = date;
    this.quota = quota;
    this.owner = owner;
  }
}