/// <reference path="fourslash.ts" />

////declare function alert(message?: string): void;
////class Animal<T> {
////    constructor(public name: T) { }
////    move(meters: number) {
////        alert(this.name + " moved " + meters + "m.");
////    }
////}
////class Animal2 extends Animal<string> {
////    constructor(name: string) { super(name); }
////    /*1*/get name2() { return this.name; }
////}
////var a = new Animal2('eprst');



goTo.marker('1');
verify.noErrors();

edit.insert("//");
verify.noErrors();
