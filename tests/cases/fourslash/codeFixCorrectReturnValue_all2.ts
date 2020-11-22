/// <reference path='fourslash.ts' />

//// interface A {
////     bar: string
//// }
////
//// function foo1 (_a: () => number ) { }
//// foo1(() => {
////     1
//// })
//// function foo2 (_a: () => A) { }
//// foo2(() => {
////     { bar: '1' }
//// })
//// foo2(() => {
////     bar: '1'
//// })
//// function foo3 (_a: () => A | number) { }
//// foo3(() => {
////     1
//// })
//// foo3(() => {
////     bar: '1'
//// })
////
//// function bar1 (): number {
////     1
//// }
//// function bar2 (): A {
////     { bar: '1' }
//// }
//// function bar3 (): A {
////     bar: '1'
//// }
//// function bar4 (): A | number {
////     1
//// }
//// function bar5(): A | number {
////     bar: '1'
//// }
//
//// const baz1: () => number = () => {
////     1
//// }
//// const baz2: () => A = () => {
////     { bar: '1' }
//// }
//// const baz3: () => A = () => {
////     bar: '1'
//// }
//// const baz4: ((() => number) | (() => A)) = () => {
////     1
//// }
//// const baz5: ((() => number) | (() => A)) = () => {
////     bar: '1'
//// }
//// 
//// const test: { a: () => A } = { a: () => { bar: '1' } }

verify.codeFixAll({
    fixId: "fixRemoveBracesFromArrowFunctionBody",
    fixAllDescription: ts.Diagnostics.Remove_braces_from_all_arrow_function_bodies_with_relevant_issues.message,
    newFileContent:
`interface A {
    bar: string
}

function foo1 (_a: () => number ) { }
foo1(() => 1)
function foo2 (_a: () => A) { }
foo2(() => ({ bar: '1' }))
foo2(() => ({ bar: '1' }))
function foo3 (_a: () => A | number) { }
foo3(() => 1)
foo3(() => ({ bar: '1' }))

function bar1 (): number {
    1
}
function bar2 (): A {
    { bar: '1' }
}
function bar3 (): A {
    bar: '1'
}
function bar4 (): A | number {
    1
}
function bar5(): A | number {
    bar: '1'
}
const baz1: () => number = () => 1
const baz2: () => A = () => ({ bar: '1' })
const baz3: () => A = () => ({ bar: '1' })
const baz4: ((() => number) | (() => A)) = () => 1
const baz5: ((() => number) | (() => A)) = () => ({ bar: '1' })

const test: { a: () => A } = { a: () => ({ bar: '1' }) }`,
});
