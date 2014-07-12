//// [genericCloneReturnTypes2.js]
var MyList = (function () {
    function MyList(n) {
        this.size = n;
        this.data = new Array(this.size);
    }
    MyList.prototype.clone = function () {
        return new MyList(this.size);
    };
    return MyList;
})();
var a;
var b = a.clone();
var c = a.clone();
var d = a.clone(); // error
