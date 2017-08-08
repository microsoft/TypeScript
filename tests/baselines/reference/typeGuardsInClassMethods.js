//// [typeGuardsInClassMethods.ts]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 

// variables in global
var num: number;
var var1: string | number;
class C1 {
    constructor(param: string | number) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables in function declaration
        var var2: string | number;
        num = typeof var2 === "string" && var2.length; // string

        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    }
    // Inside function declaration
    private p1(param: string | number) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables in function declaration
        var var2: string | number;
        num = typeof var2 === "string" && var2.length; // string

        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    }
    // Inside function declaration
    p2(param: string | number) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables in function declaration
        var var2: string | number;
        num = typeof var2 === "string" && var2.length; // string

        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    }
    // Inside function declaration
    private static s1(param: string | number) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables in function declaration
        var var2: string | number;
        num = typeof var2 === "string" && var2.length; // string

        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    }
    // Inside function declaration
    static s2(param: string | number) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string

        // variables in function declaration
        var var2: string | number;
        num = typeof var2 === "string" && var2.length; // string

        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    }
}


//// [typeGuardsInClassMethods.js]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 
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
// variables in global
var num;
var var1;
var C1 = (function () {
    function C1(param) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string
        // variables in function declaration
        var var2;
        num = typeof var2 === "string" && var2.length; // string
        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    }
    // Inside function declaration
    C1.prototype.p1 = function (param) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string
        // variables in function declaration
        var var2;
        num = typeof var2 === "string" && var2.length; // string
        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    };
    // Inside function declaration
    C1.prototype.p2 = function (param) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string
        // variables in function declaration
        var var2;
        num = typeof var2 === "string" && var2.length; // string
        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    };
    // Inside function declaration
    C1.s1 = function (param) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string
        // variables in function declaration
        var var2;
        num = typeof var2 === "string" && var2.length; // string
        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    };
    // Inside function declaration
    C1.s2 = function (param) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string
        // variables in function declaration
        var var2;
        num = typeof var2 === "string" && var2.length; // string
        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    };
    __names(C1.prototype, ["p1", "p2"]);
    return C1;
}());
