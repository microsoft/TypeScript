//@target: es5

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