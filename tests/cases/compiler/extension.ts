interface I {
    x;
}

interface I {
    y;
}

declare module M {
    export class C {
        public p:number;
    }
}

declare module M {
    export extension class C {
        public pe:string;
    }
}

var c=new M.C();
c.pe;
c.p;
var i:I;
i.x;
i.y;

