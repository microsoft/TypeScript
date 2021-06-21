//// [topLevelAwaitErrors.1.ts]
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


//// [topLevelAwaitErrors.1.js]
// reparse call as invalid await should error
await (1, );
await , string > (1);
// reparse tagged template as invalid await should error
await , string > ``;
// reparse class extends clause should fail
class C extends await {
}
// await in class decorators should fail
let C1 = class C1 {
};
C1 = __decorate([
    (await )
], C1);
x;
;
class C2 {
}
C3;
{ }
// await in member decorators should fail
class C4 {
    "foo";
}
__decorate([
    await
], C4.prototype, "foo", void 0);
;
class C5 {
    1;
    ["foo"]() { }
}
__decorate([
    await
], C5.prototype, 1, void 0);
class C6 {
    ["foo"]() { }
}
__decorate([
    (await )
], C6.prototype, "foo", null);
// await in parameter decorators should fail
class C7 {
}
__decorate([
    __param(0, await)
], C7.prototype, "method1", null);
method2(await (1)[x]);
{ }
method3((await )[x]);
{ }
;
export {};
