//// [thisTypeInFunctions2.ts]
interface Arguments {
    init?: (this: void) => void;
    willDestroy?: (this: any) => void;
    [propName: string]: number | string | boolean | symbol | undefined | null | {} | ((this: any, ...args:any[]) => any);
}
declare function extend(arguments: Arguments): void;
class Mixin {
    stuff: number;
}

extend({
    init() {
        this
    },
    mine: 12,
    bar() {
        this.init();
    },
    foo() {
        this.bar;
        this.url
        this.handler()
        this.baz
        this.willDestroy
    }
})


//// [thisTypeInFunctions2.js]
var Mixin = (function () {
    function Mixin() {
    }
    return Mixin;
}());
extend({
    init: function () {
        this;
    },
    mine: 12,
    bar: function () {
        this.init();
    },
    foo: function () {
        this.bar;
        this.url;
        this.handler();
        this.baz;
        this.willDestroy;
    }
});
