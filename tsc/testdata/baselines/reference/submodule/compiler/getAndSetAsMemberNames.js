//// [tests/cases/compiler/getAndSetAsMemberNames.ts] ////

//// [getAndSetAsMemberNames.ts]
class C1 {
    set: boolean;
    get = 1;
}
class C2 {
    set;
}
class C3 {
    set (x) {
        return x + 1;
    }
}
class C4 {
    get: boolean = true;
}
class C5 {
    public set: () => boolean = function () { return true; };
    get (): boolean { return true; }
    set t(x) { }
}


//// [getAndSetAsMemberNames.js]
class C1 {
    set;
    get = 1;
}
class C2 {
    set;
}
class C3 {
    set(x) {
        return x + 1;
    }
}
class C4 {
    get = true;
}
class C5 {
    set = function () { return true; };
    get() { return true; }
    set t(x) { }
}
