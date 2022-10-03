//// [asOpEmitParens.ts]
declare var x;
// Must emit as (x + 1) * 3
(x + 1 as number) * 3;

// Should still emit as x.y
(x as any).y;

// Emit as new (x())
new (x() as any);


//// [asOpEmitParens.js]
// Must emit as (x + 1) * 3
(x + 1) * 3;
// Should still emit as x.y
x.y;
// Emit as new (x())
new (x());
