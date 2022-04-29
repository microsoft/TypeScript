//// [instanceMemberInitialization.ts]
class C {
    x = 1;
}

var c = new C();
c.x = 3;
var c2 = new C();
var r = c.x === c2.x;

// #31792



class MyMap<K, V> {
    constructor(private readonly Map_: { new<K, V>(): any }) {}
    private readonly store = new this.Map_<K, V>();
}

//// [instanceMemberInitialization.js]
var C = /** @class */ (function () {
    function C() {
        this.x = 1;
    }
    return C;
}());
var c = new C();
c.x = 3;
var c2 = new C();
var r = c.x === c2.x;
// #31792
var MyMap = /** @class */ (function () {
    function MyMap(Map_) {
        this.Map_ = Map_;
        this.store = new this.Map_();
    }
    return MyMap;
}());
