// @strict: true
// @noemit: true

type Foo = {
    foo: string;
}

type Bar = {
    extraProp: string;
}

const bar: Bar = { extraProp: "" };

const foo: Foo = { bar: "", foo: "" };
const foo2: Foo = { ...bar, foo: "" };
const foo3: Foo = { ...{ ...bar}, foo: ""};
const foo4: Foo = { ...{ bar: "" }, foo: ""};


const noBar = { extraProp2: "" };
const foo5: Foo = { extraProp2: "", foo: "" };
const foo6: Foo = { ...noBar, foo: "" };
const foo7: Foo = { ...{ ...noBar}, foo: ""};
const foo8: Foo = { ...{ noBar: "" }, foo: ""};
