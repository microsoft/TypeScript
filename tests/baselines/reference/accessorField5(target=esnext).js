//// [accessorField5.ts]
class C1 {
    accessor ["w"]: any;
    accessor ["x"] = 1;
    static accessor ["y"]: any;
    static accessor ["z"] = 2;
}

declare var f: any;
class C2 {
    // @ts-ignore
    accessor [f()] = 1;
}

//// [accessorField5.js]
class C1 {
    accessor ["w"];
    accessor ["x"] = 1;
    static accessor ["y"];
    static accessor ["z"] = 2;
}
class C2 {
    // @ts-ignore
    accessor [f()] = 1;
}
