// @strictNullChecks: true

// Repro from #10041

(''.match(/ /) || []).map(s => s.toLowerCase());

// Similar cases

function f1() {
    let x = ''.match(/ /);
    let y = x || [];
    let z = y.map(s => s.toLowerCase());
}

function f2() {
    let x = ''.match(/ /);
    let y = x ? x : [];
    let z = y.map(s => s.toLowerCase());
}
