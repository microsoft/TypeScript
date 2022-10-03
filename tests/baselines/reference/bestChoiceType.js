//// [bestChoiceType.ts]
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


//// [bestChoiceType.js]
// Repro from #10041
(''.match(/ /) || []).map(function (s) { return s.toLowerCase(); });
// Similar cases
function f1() {
    var x = ''.match(/ /);
    var y = x || [];
    var z = y.map(function (s) { return s.toLowerCase(); });
}
function f2() {
    var x = ''.match(/ /);
    var y = x ? x : [];
    var z = y.map(function (s) { return s.toLowerCase(); });
}
