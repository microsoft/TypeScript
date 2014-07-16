//// [thisInObjectLiterals.ts]
class MyClass {
    t: number;

    fn() {
        //type of 'this' in an object literal is the containing scope's this
        var t = { x: this, y: this.t };
        var t: { x: MyClass; y: number };
    }
}

//type of 'this' in an object literal property of a function type is Any
var obj = {
    f() {
        return this.spaaace;
    }
};
var obj: { f: () => any; };


//// [thisInObjectLiterals.js]
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.prototype.fn = function () {
        var t = { x: this, y: this.t };
        var t;
    };
    return MyClass;
})();
var obj = {
    f: function f() {
        return this.spaaace;
    }
};
var obj;
