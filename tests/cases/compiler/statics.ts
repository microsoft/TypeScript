module M {
    export class C {
        x: number;
        constructor(public c1: number, public c2: number, c3: number) {
            this.x = C.y+this.c1+this.c2+c3;
            this.g = (v:number) => C.f(this.x+C.y+v+this.c1+this.c2+C.pub);
        }

        static priv=2;
        static pub=3;
        static y=C.priv;
        static f(n:number) {
            return "wow: "+(n+C.y+C.pub+C.priv);

        }        
    }
    var c=C.y;
    export function f() {
        var result="";
        result+=(c);
        result+=(new C(0,1,2).x);
        result+=(C.f(10));
        result+=(new C(5,10,20).g(C.y));
        return result;
    }
}

M.f();


