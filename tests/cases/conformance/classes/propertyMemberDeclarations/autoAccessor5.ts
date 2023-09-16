// @target: esnext, es2022, es2015, es5

class C1 {
    accessor ["w"]: any;
    accessor ["x"] = 1;
    static accessor ["y"]: any;
    static accessor ["z"] = 2;
}

declare var f: any;
class C2 {
    accessor [f()] = 1;
}