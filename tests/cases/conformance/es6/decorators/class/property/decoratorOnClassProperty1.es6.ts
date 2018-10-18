// @target: ES2015
// @module: ES2015
// @experimentaldecorators: true
declare function dec(target: any, propertyKey: string): void;

export default class {
    @dec prop;
}