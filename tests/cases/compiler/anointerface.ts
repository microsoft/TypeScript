module M {
    export class C {
        m(fn:{ (n:number):string; },n2:number):string {
            return fn(n2);
        }
    }
}

var c=new M.C();
c.m(function(n) { return "hello: "+n; },18);



