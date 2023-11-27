// @strict: true
// @declaration: true
// @target: es6

declare const arrsn : string[]|number[];
declare function strmapol(x:string):string;
declare function strmapol(x:number):number;
//declare function strmap(x:number|string):number|string;

declare function strmapgen<T extends string|number>(x:T):T;

//type ID = <I>() => (i: I) => I;

declare const fstrmapgen: <T extends string|number>()=>(x:T)=>T;

const fstrmapol = ()=>strmapol;




arrsn.map(strmapgen); // 5.2.2. no error

arrsn.map(fstrmapgen()); // 5.2.2. error

arrsn.map(strmapol); // 5.2.2 error

arrsn.map(fstrmapol()); // 5.2.2. error