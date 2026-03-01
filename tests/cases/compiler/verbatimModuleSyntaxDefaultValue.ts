// @verbatimModuleSyntax: true
// @module: node16
// @moduleResolution: node16
// @target: es2018

// @filename: package.json
{ "name": "foo", "type": "module" }

// @filename: index.ts
class Task {}

function task(): Task { return new Task(); }

export const build = task();
export default build;
