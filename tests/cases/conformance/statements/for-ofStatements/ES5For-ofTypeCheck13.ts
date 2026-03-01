//@target: ES5, ES2015
//@lib: ES6
const strSet: Set<string> = new Set()
strSet.add('Hello')
strSet.add('World')
for (const str of strSet) { }