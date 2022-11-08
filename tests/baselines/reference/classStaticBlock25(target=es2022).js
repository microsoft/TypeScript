//// [classStaticBlock25.ts]
const a = 1;
const b = 2;

class C {
    static {
        const a = 11;

        a;
        b;
    }

    static {
        const a = 11;

        a;
        b;
    }
}


//// [classStaticBlock25.js]
const a = 1;
const b = 2;
class C {
    static {
        const a = 11;
        a;
        b;
    }
    static {
        const a = 11;
        a;
        b;
    }
}
//# sourceMappingURL=classStaticBlock25.js.map

//// [classStaticBlock25.d.ts]
declare const a = 1;
declare const b = 2;
declare class C {
}
//# sourceMappingURL=classStaticBlock25.d.ts.map