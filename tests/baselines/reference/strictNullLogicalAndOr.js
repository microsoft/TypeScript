//// [strictNullLogicalAndOr.ts]
// Repro from #9113

let sinOrCos = Math.random() < .5;
let choice = sinOrCos && Math.sin || Math.cos;

choice(Math.PI);

function sq(n?: number): number {
  const r = n !== undefined && n*n || 0;
  return r;
}

sq(3);

//// [strictNullLogicalAndOr.js]
// Repro from #9113
var sinOrCos = Math.random() < .5;
var choice = sinOrCos && Math.sin || Math.cos;
choice(Math.PI);
function sq(n) {
    var r = n !== undefined && n * n || 0;
    return r;
}
sq(3);
