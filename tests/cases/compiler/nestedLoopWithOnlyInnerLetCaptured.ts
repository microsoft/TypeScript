// @strict: false
// @target: es5, es2015
declare let doSomething;

for (let a1 of [])
    for (let a2 of a1.someArray)
        doSomething(() => a2);