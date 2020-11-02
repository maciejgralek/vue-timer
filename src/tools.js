export default {
  copyObjectProperties(obj, obj2) {
    for (var key in obj) {
      obj2[key]  = Number(obj[key]);
    }
  }
}
