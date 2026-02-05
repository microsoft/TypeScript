//// [tests/cases/compiler/noImplicitAnyDestructuringInPrivateMethod.ts] ////

//// [noImplicitAnyDestructuringInPrivateMethod.ts]
type Arg = {
    a: number;
};
export class Bar {
    private bar({ a, }: Arg): number {
        return a;
    }
}
export declare class Bar2 {
    private bar({ a, });
}

//// [noImplicitAnyDestructuringInPrivateMethod.js]
export class Bar {
    bar({ a, }) {
        return a;
    }
}


//// [noImplicitAnyDestructuringInPrivateMethod.d.ts]
export declare class Bar {
    private bar;
}
export declare class Bar2 {
    private bar;
}
