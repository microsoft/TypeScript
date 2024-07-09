// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noFallthroughCasesInSwitch: true
// @allowUnreachableCode: false
// @allowUnusedLabels: false

// @filename: a.js
function foo(a, b) {
    switch (a) {
        case 10:
            if (b) {
                return b;
            }
        case 20:
            return a;
    }
}

function bar() {
    return x;
    function bar2() {
    }
    var x = 10; // error
}

label1:  var x2 = 10;