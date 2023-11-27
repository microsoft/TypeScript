// @strict: true
// @target: es6


type AnyTup = [...any[]];
type FN<Args extends AnyTup,Ret> = (...args:Args)=>Ret;

declare function fproxy<A extends AnyTup,R>(fn:FN<A,R>, ...args: A):R;
declare function f1(s:string):number;

declare function fol1(s:string):string;
declare function fol1(n:number):number;



const x1 = fproxy(f1,"test");
