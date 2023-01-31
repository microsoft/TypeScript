//// [tests/cases/compiler/verbatimModuleSyntaxDefaultValue.ts] ////

//// [package.json]
{ "name": "foo", "type": "module" }

//// [index.ts]
class Task {}

function task(): Task { return new Task(); }

export const build = task();
export default build;


//// [index.js]
class Task {
}
function task() { return new Task(); }
export const build = task();
export default build;
