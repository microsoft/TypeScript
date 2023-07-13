/// <reference path='fourslash.ts' />

////class C {
////    constructor() {
////        this.foo({
////            'foo.a': '',
////            'foo.b': '',
////            'foo.c': '',
////            'foo.d': '',
////            'foo.e': '',
////            'foo.f': '',
////            'foo.g': '',
////            'foo.h': '',
////            'foo.i': '',
////            'foo.j': '',
////            'foo.k': '',
////            'foo.l': '',
////            'foo.m': '',
////            'foo.n': '',
////            'foo.o': '',
////            'foo.p': '',
////            'foo.q': '',
////            'foo.r': '',
////            'foo.s': '',
////            'foo.t': '',
////            'foo.u': '',
////            'foo.v': '',
////            'foo.w': '',
////            'foo.x': '',
////            'foo.y': '',
////            'foo.z': '',
////        });
////    }
////}

verify.codeFix({
    description: [ts.Diagnostics.Declare_method_0.message, "foo"],
    index: 0,
    newFileContent:
`class C {
    constructor() {
        this.foo({
            'foo.a': '',
            'foo.b': '',
            'foo.c': '',
            'foo.d': '',
            'foo.e': '',
            'foo.f': '',
            'foo.g': '',
            'foo.h': '',
            'foo.i': '',
            'foo.j': '',
            'foo.k': '',
            'foo.l': '',
            'foo.m': '',
            'foo.n': '',
            'foo.o': '',
            'foo.p': '',
            'foo.q': '',
            'foo.r': '',
            'foo.s': '',
            'foo.t': '',
            'foo.u': '',
            'foo.v': '',
            'foo.w': '',
            'foo.x': '',
            'foo.y': '',
            'foo.z': '',
        });
    }
    foo(arg0: { 'foo.a': string; 'foo.b': string; 'foo.c': string; 'foo.d': string; 'foo.e': string; 'foo.f': string; 'foo.g': string; 'foo.h': string; 'foo.i': string; 'foo.j': string; 'foo.k': string; 'foo.l': string; 'foo.m': string; 'foo.n': string; 'foo.o': string; 'foo.p': string; 'foo.q': string; 'foo.r': string; 'foo.s': string; 'foo.t': string; 'foo.u': string; 'foo.v': string; 'foo.w': string; 'foo.x': string; 'foo.y': string; 'foo.z': string; }) {
        throw new Error("Method not implemented.");
    }
}`,
});
