//// [thisInObjectLiterals.ts]
class MyClass {
    t: number;

    fn() {
        type ContainingThis = this;
        //type of 'this' in an object literal is the containing scope's this
        var t = { x: this, y: this.t };
        var t: { x: ContainingThis; y: number };
    }
}

//type of 'this' in an object literal method is the type of the object literal
var obj = {
    f() {
        return this.spaaace;
    }
};
var obj: { f: () => any; };


//// [thisInObjectLiterals.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.prototype.fn = function () {
        //type of 'this' in an object literal is the containing scope's this
        var t = { x: this, y: this.t };
        var t;
    };
    __names(MyClass.prototype, ["fn"]);
    return MyClass;
}());
//type of 'this' in an object literal method is the type of the object literal
var obj = {
    f: function () {
        return this.spaaace;
    }
};
var obj;
