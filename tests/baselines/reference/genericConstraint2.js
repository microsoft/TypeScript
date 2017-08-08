//// [genericConstraint2.ts]
interface Comparable<T> {
    comparer(other: T): number;
}

function compare<T extends Comparable<T>>(x: T, y: T): number {
    if (x == null) return y == null ? 0 : -1;
    if (y == null) return 1;
    return x.comparer(y);
}

class ComparableString implements Comparable<string>{
    constructor(public currentValue: string) { }

    localeCompare(other) {
        return 0;
    }
}

var a = new ComparableString("a");
var b = new ComparableString("b");
var c = compare<ComparableString>(a, b);

//// [genericConstraint2.js]
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
function compare(x, y) {
    if (x == null)
        return y == null ? 0 : -1;
    if (y == null)
        return 1;
    return x.comparer(y);
}
var ComparableString = (function () {
    function ComparableString(currentValue) {
        this.currentValue = currentValue;
    }
    ComparableString.prototype.localeCompare = function (other) {
        return 0;
    };
    __names(ComparableString.prototype, ["localeCompare"]);
    return ComparableString;
}());
var a = new ComparableString("a");
var b = new ComparableString("b");
var c = compare(a, b);
