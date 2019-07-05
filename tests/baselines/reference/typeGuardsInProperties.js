//// [typeGuardsInProperties.ts]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 

var num: number;
var strOrNum: string | number;
class C1 {
    private pp1: string | number;
    pp2: string | number;
    // Inside public accessor getter
    get pp3() {
        return strOrNum;
    }
    method() {
        strOrNum = typeof this.pp1 === "string" && this.pp1; // string | number
        strOrNum = typeof this.pp2 === "string" && this.pp2; // string | number
        strOrNum = typeof this.pp3 === "string" && this.pp3; // string | number
    }
}
var c1: C1;
strOrNum = typeof c1.pp2 === "string" && c1.pp2; // string | number
strOrNum = typeof c1.pp3 === "string" && c1.pp3; // string | number
var obj1: {
    x: string | number;
};
strOrNum = typeof obj1.x === "string" && obj1.x;  // string | number

//// [typeGuardsInProperties.js]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 
var num;
var strOrNum;
var C1 = /** @class */ (function () {
    function C1() {
    }
    Object.defineProperty(C1.prototype, "pp3", {
        // Inside public accessor getter
        get: function () {
            return strOrNum;
        },
        enumerable: false,
        configurable: true
    });
    C1.prototype.method = function () {
        strOrNum = typeof this.pp1 === "string" && this.pp1; // string | number
        strOrNum = typeof this.pp2 === "string" && this.pp2; // string | number
        strOrNum = typeof this.pp3 === "string" && this.pp3; // string | number
    };
    return C1;
}());
var c1;
strOrNum = typeof c1.pp2 === "string" && c1.pp2; // string | number
strOrNum = typeof c1.pp3 === "string" && c1.pp3; // string | number
var obj1;
strOrNum = typeof obj1.x === "string" && obj1.x; // string | number
