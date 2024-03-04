//// [tests/cases/compiler/mergeSameGenericParentMethodPropUnions-100.ts] ////

//// [-incompasig-200.ts]
namespace ns4 {

declare var y: Array<string>|Array<number>;

declare const a: number|string;

y.indexOf(a);

y.push(a);

y.unshift(a);

y.splice(1,1,a);

}


/**********************/
//// [-incompasig-110.ts]
namespace ns0 {

interface Test110<T> {
    f(cb:(x:T)=>T):T[];
    f<U>(cb:(x:T)=>U):U[];
}

declare const arr: Test110<number> | Test110<string>;
const result = arr.f(x => x);

}


/**********************/
//// [-incompasig-111.ts]
namespace ns1 {

interface Test111<T> {
    f(cb:(a:T, x:T)=>T):T[];
    f<U>(cb:(a:U, x:T)=>U,init:U):U[];
}

declare const arr: Test111<number> | Test111<bigint>;
const result = arr.f((a:bigint, x) => a * BigInt(x), 1n);

}





//// [-incompasig-200.js]
"use strict";
var ns4;
(function (ns4) {
    y.indexOf(a);
    y.push(a);
    y.unshift(a);
    y.splice(1, 1, a);
})(ns4 || (ns4 = {}));
/**********************/ 
//// [-incompasig-110.js]
"use strict";
var ns0;
(function (ns0) {
    const result = arr.f(x => x);
})(ns0 || (ns0 = {}));
/**********************/ 
//// [-incompasig-111.js]
"use strict";
var ns1;
(function (ns1) {
    const result = arr.f((a, x) => a * BigInt(x), 1n);
})(ns1 || (ns1 = {}));
