//// [typeGuardsOnClassProperty.ts]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 

// Note that the class's property must be copied to a local variable for
// the type guard to have an effect
class D {
    data: string | string[];
    getData() {
        var data = this.data;
        return typeof data === "string" ? data : data.join(" ");
    }

    getData1() {
        return typeof this.data === "string" ? this.data : this.data.join(" ");
    }
}

var o: {
    prop1: number|string;
    prop2: boolean|string;
} = {
        prop1: "string" ,
        prop2: true
    }

if (typeof o.prop1 === "string" && o.prop1.toLowerCase()) {}
var prop1 = o.prop1;
if (typeof prop1 === "string" && prop1.toLocaleLowerCase()) { }

//// [typeGuardsOnClassProperty.js]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 
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
// Note that the class's property must be copied to a local variable for
// the type guard to have an effect
var D = (function () {
    function D() {
    }
    D.prototype.getData = function () {
        var data = this.data;
        return typeof data === "string" ? data : data.join(" ");
    };
    D.prototype.getData1 = function () {
        return typeof this.data === "string" ? this.data : this.data.join(" ");
    };
    __names(D.prototype, ["getData", "getData1"]);
    return D;
}());
var o = {
    prop1: "string",
    prop2: true
};
if (typeof o.prop1 === "string" && o.prop1.toLowerCase()) { }
var prop1 = o.prop1;
if (typeof prop1 === "string" && prop1.toLocaleLowerCase()) { }
