//// [tests/cases/compiler/overloadRet.ts] ////

//// [overloadRet.ts]
interface I {
    f(s:string):number;  
    f(n:number):string;
    g(n:number):any; 
    g(n:number,m:number):string;
    h(n:number):I;  
    h(b:boolean):number;
    i(b:boolean):number;
    i(b:boolean):any;
}

//// [overloadRet.js]
