// @target: es2015
// @experimentaldecorators: true

declare function decorator(constructor: any): any;

@decorator
default class {}