/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_class.baseline
// @Filename: bpSpan_class.ts
////class Greeter {
////    constructor(public greeting: string, ...b: string[]) {
////    }
////    greet() {
////        return "<h1>" + this.greeting + "</h1>";
////    }
////    private x: string;
////    private x1: number = 10;
////    private fn() {
////        return this.greeting;
////    }
////    get greetings() {
////        return this.greeting;
////    }
////    set greetings(greetings: string) {
////        this.greeting = greetings;
////    }
////}
////class Greeter2 {
////}
////class Greeter1 
////{
////    constructor(public greeting: string, ...b: string[])
////    {
////    }
////    greet()
////    {
////        return "<h1>" + this.greeting + "</h1>";
////    }
////    private x: string;
////    private x1: number = 10;
////    private fn()
////    {
////        return this.greeting;
////    }
////    get greetings() 
////    {
////        return this.greeting;
////    }
////    set greetings(greetings: string)
////    {
////        this.greeting = greetings;
////    }
////}
////class Greeter12
////{
////}

verify.baselineCurrentFileBreakpointLocations();