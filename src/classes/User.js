export default class User {
  constructor(name, password, images) {
    this.name = name;
    this.password = password;
    this.images = images; // This is a list of ImageObjects
  }
}