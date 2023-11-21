// @declaration: true
// @isolatedDeclarationFixedDiffReason: Function declarations are not fixed
function foo() {}
foo.null = true;

function bar() {}
bar.async = true;
bar.normal = false;

function baz() {}
baz.class = true;
baz.normal = false;