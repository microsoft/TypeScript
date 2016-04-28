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
