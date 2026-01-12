interface I {
    x;
}

interface I {
    y;
}

declare namespace M {
    export class C {
        public p:number;
    }
}

declare namespace M {
    export extension class C {
        public pe:string;
    }
}

var c=new M.C();
c.pe;
c.p;
declare var i:I;
i.x;
i.y;

