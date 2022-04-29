//// [thisTypeInFunctions2.ts]
interface IndexedWithThis {
    // this is a workaround for React
    init?: (this: this) => void;
    willDestroy?: (this: any) => void;
    [propName: string]: number | string | boolean | symbol | undefined | null | {} | ((this: any, ...args:any[]) => any);
}
interface IndexedWithoutThis {
    // this is what React would like to write (and what they write today)
    init?: () => void;
    willDestroy?: () => void;
    [propName: string]: any;
}
interface SimpleInterface {
    foo(n: string);
    bar(): number;
}
declare function extend1(args: IndexedWithThis): void;
declare function extend2(args: IndexedWithoutThis): void;
declare function simple(arg: SimpleInterface): void;

extend1({
    init() {
        this // this: IndexedWithThis because of contextual typing.
        // this.mine
        this.willDestroy
    },
    mine: 12,
    foo() {
        this.url; // this: any because 'foo' matches the string indexer
        this.willDestroy;
    }
});
extend2({
    init() {
        this // this: IndexedWithoutThis because of contextual typing
        this.mine
    },
    mine: 13,
    foo() {
        this // this: IndexedWithoutThis because of contextual typing
        this.mine
    }
});

simple({
    foo(n) {
        return n.length + this.bar();
    },
    bar() {
        return 14;
    }
})


//// [thisTypeInFunctions2.js]
extend1({
    init: function () {
        this; // this: IndexedWithThis because of contextual typing.
        // this.mine
        this.willDestroy;
    },
    mine: 12,
    foo: function () {
        this.url; // this: any because 'foo' matches the string indexer
        this.willDestroy;
    }
});
extend2({
    init: function () {
        this; // this: IndexedWithoutThis because of contextual typing
        this.mine;
    },
    mine: 13,
    foo: function () {
        this; // this: IndexedWithoutThis because of contextual typing
        this.mine;
    }
});
simple({
    foo: function (n) {
        return n.length + this.bar();
    },
    bar: function () {
        return 14;
    }
});
