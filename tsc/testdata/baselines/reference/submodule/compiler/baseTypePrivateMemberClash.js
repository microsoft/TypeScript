//// [tests/cases/compiler/baseTypePrivateMemberClash.ts] ////

//// [baseTypePrivateMemberClash.ts]
class X {
    private m: number;
}
class Y {
    private m: string;
}

interface Z extends X, Y { }

//// [baseTypePrivateMemberClash.js]
class X {
    m;
}
class Y {
    m;
}
