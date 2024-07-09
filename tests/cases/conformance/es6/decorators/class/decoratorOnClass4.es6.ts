// @target:es6
// @experimentaldecorators: true
declare function dec<T>(target: T): T;

@dec
export default class {
}