//// [tests/cases/compiler/elidedEmbeddedStatementsReplacedWithSemicolon.ts] ////

//// [elidedEmbeddedStatementsReplacedWithSemicolon.ts]
if (1)
    const enum A {}
else
    const enum B {}

do
    const enum C {}
while (0);

while (0)
    const enum D {}

for (;0;)
    const enum E {}

for (let _ in [])
    const enum F {}

for (let _ of [])
    const enum G {}

// @ts-ignore suppress `with` statement error
with (window)
    const enum H {}

//// [elidedEmbeddedStatementsReplacedWithSemicolon.js]
if (1)
    ;
else
    ;
do
    ;
while (0);
while (0)
    ;
for (; 0;)
    ;
for (var _ in [])
    ;
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var _ = _a[_i];
    ;
}
// @ts-ignore suppress `with` statement error
with (window)
    ;
