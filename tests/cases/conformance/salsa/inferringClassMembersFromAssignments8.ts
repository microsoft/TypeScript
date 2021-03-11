// no inference in TS files, even for `this` aliases:

var app = function() {
    var _this = this;
    _this.swap = function() { }
}
var a = new app()
a
