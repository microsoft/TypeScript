// @target: esnext
// @module: es2022,esnext
// @experimentalDecorators: true
// @noEmitHelpers: true

export {};

// reparse call as invalid await should error
await (1,);
await <number, string>(1);

// reparse tagged template as invalid await should error
await <number, string> ``;

// reparse class extends clause should fail
class C extends await<string> {
}

// await in class decorators should fail
@(await)
class C1 {}

@await(x)
class C2 {}

@await
class C3 {}

// await in member decorators should fail
class C4 {
    @await
    ["foo"]() {}
}
class C5 {
    @await(1)
    ["foo"]() {}
}
class C6 {
    @(await)
    ["foo"]() {}
}

// await in parameter decorators should fail
class C7 {
    method1(@await [x]) {}
    method2(@await(1) [x]) {}
    method3(@(await) [x]) {}
}
