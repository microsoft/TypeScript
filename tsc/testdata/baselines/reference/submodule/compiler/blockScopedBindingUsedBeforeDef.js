//// [tests/cases/compiler/blockScopedBindingUsedBeforeDef.ts] ////

//// [blockScopedBindingUsedBeforeDef.ts]
// 1:
for (let {[a]: a} of [{ }]) continue;

// 2:
for (let {[a]: a} = { }; false; ) continue;

// 3:
let {[b]: b} = { };

//// [blockScopedBindingUsedBeforeDef.js]
for (let { [a]: a } of [{}])
    continue;
for (let { [a]: a } = {}; false;)
    continue;
let { [b]: b } = {};
