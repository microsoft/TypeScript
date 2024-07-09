import * as ng from "angular2/core";

declare function foo(...args: any[]);

@foo
export class MyClass1 {
    constructor(private _elementRef: ng.ElementRef){}
}