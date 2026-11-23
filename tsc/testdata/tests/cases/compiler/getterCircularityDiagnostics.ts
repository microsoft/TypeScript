// @target: es2015
// @strict: true

declare const props: Options;

class Container {
    get options() {
        return { container: this, ...props } as Options;
    }
}

interface Options {
    container?: Container;
}