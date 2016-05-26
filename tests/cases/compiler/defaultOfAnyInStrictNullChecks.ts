// @strictNullChecks: true

// Regression test for #8295

function foo() {
    try {
    }
    catch (e) {
        let s = e.message; 
    }
}
