// @strict: true
// @declaration: true

export var basePrototype = {
  get primaryPath() {
    var _this = this;
    return _this.collection.schema.primaryPath;
  },  
};
