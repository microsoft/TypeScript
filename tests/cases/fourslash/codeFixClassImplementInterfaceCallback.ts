/// <reference path='fourslash.ts' />

// #35508

////interface IFoo1 {
////    parse(reviver: () => any): void;
////}
////
////class Foo1 implements IFoo1 {
////}
////
////interface IFoo2 {
////    parse(reviver: { (): any }): void;
////}
////
////class Foo2 implements IFoo2 {
////}
////
////interface IFoo3 {
////    parse(reviver: new () => any): void;
////}
////
////class Foo3 implements IFoo3 {
////}
////
////interface IFoo4 {
////    parse(reviver: { new (): any }): void;
////}
////
////class Foo4 implements IFoo4 {
////}

verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Implement_all_unimplemented_interfaces.message,
  fixId: "fixClassIncorrectlyImplementsInterface",
  newFileContent:
`interface IFoo1 {
    parse(reviver: () => any): void;
}

class Foo1 implements IFoo1 {
    parse(reviver: () => any): void {
        throw new Error("Method not implemented.");
    }
}

interface IFoo2 {
    parse(reviver: { (): any }): void;
}

class Foo2 implements IFoo2 {
    parse(reviver: { (): any; }): void {
        throw new Error("Method not implemented.");
    }
}

interface IFoo3 {
    parse(reviver: new () => any): void;
}

class Foo3 implements IFoo3 {
    parse(reviver: new () => any): void {
        throw new Error("Method not implemented.");
    }
}

interface IFoo4 {
    parse(reviver: { new (): any }): void;
}

class Foo4 implements IFoo4 {
    parse(reviver: { new(): any; }): void {
        throw new Error("Method not implemented.");
    }
}`});
