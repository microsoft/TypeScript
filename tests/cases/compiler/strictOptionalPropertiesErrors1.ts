// @strict: true
// @exactOptionalPropertyTypes: true
// @noEmit: true

function test1(arg: [string, (boolean | number)?]) {}
test1(['foo', 'bar']);
