// @target: ES5
// @experimentaldecorators: true
declare function dec(target: Function): void;

class C {
    @dec prop;
}