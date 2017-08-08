//// [genericCloneReturnTypes2.ts]
class MyList<T> {
    public size: number;
    public data: T[];
    constructor(n: number) {
        this.size = n;
        this.data = new Array<T>(this.size);
    }
    public clone() {
        return new MyList<T>(this.size);
    }
}
var a: MyList<string>;
var b: MyList<any> = a.clone(); // ok
var c: MyList<string> = a.clone(); // bug was there was an error on this line
var d: MyList<number> = a.clone(); // error

//// [genericCloneReturnTypes2.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var MyList = (function () {
    function MyList(n) {
        this.size = n;
        this.data = new Array(this.size);
    }
    MyList.prototype.clone = function () {
        return new MyList(this.size);
    };
    __names(MyList.prototype, ["clone"]);
    return MyList;
}());
var a;
var b = a.clone(); // ok
var c = a.clone(); // bug was there was an error on this line
var d = a.clone(); // error
