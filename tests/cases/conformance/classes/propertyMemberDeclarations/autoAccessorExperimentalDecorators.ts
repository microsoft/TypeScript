// @target: esnext, es2022, es2015
// @experimentalDecorators: true

declare var dec: (target: any, key: PropertyKey, desc: PropertyDescriptor) => void;

class C1 {
    @dec
    accessor a: any;

    @dec
    static accessor b: any;
}

class C2 {
    @dec
    accessor #a: any;

    @dec
    static accessor #b: any;
}
