// @strict: true
// @useUnknownInCatchVariables: true, false


try {} catch ({ x }) { x }
try {} catch ([ x ]) { x }

try {} catch ({ a: { x } }) { x }
try {} catch ({ a: [ x ] }) { x }

try {} catch ([{ x }]) { x }
try {} catch ([[ x ]]) { x }

try {} catch ({ a: { b: { c: { x }} }}) { x }


try {} catch ({ x }: any) { x }
try {} catch ([ x ]: any) { x }

try {} catch ({ a: { x } }: any) { x }
try {} catch ({ a: [ x ] }: any) { x }

try {} catch ([{ x }]: any) { x }
try {} catch ([[ x ]]: any) { x }

try {} catch ({ a: { b: { c: { x }} }}: any) { x }


try {} catch ({ x }: unknown) { x }
try {} catch ([ x ]: unknown) { x }

try {} catch ({ a: { x } }: unknown) { x }
try {} catch ({ a: [ x ] }: unknown) { x }

try {} catch ([{ x }]: unknown) { x }
try {} catch ([[ x ]]: unknown) { x }

try {} catch ({ a: { b: { c: { x }} }}: unknown) { x }
