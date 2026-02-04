// @strict: false
// @target: ES5, ES2015
// @experimentaldecorators: true
declare function dec(target: Function): void;

class C {
    @dec prop;
}