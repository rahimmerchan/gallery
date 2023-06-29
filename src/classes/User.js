export default class User {
  constructor(email, password, images) {
    this.email = email;
    this.password = password;
    this.images = images; // This is a list of ImageObjects
  }
}