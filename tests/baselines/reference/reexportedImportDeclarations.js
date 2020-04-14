//// [reexportedImportDeclarations.ts]
declare class C {
    method(): any;
}

declare namespace ns1 {
    export { C as A1 };
}
declare namespace ns2 {
    import A2 = ns1.A1;
    namespace ns21 {
        export { A2 as A3 };
    }
}
declare namespace ns3 {
    import A4 = ns1.A1;
    export { A4 as A5 };
}

export class C2 extends ns2.ns21.A3 {}
export class C3 extends ns3.A5 {}


//// [reexportedImportDeclarations.js]
export class C2 extends ns2.ns21.A3 {
}
export class C3 extends ns3.A5 {
}
