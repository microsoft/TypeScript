// undefined type guard adds no new type information
function test1(a: any) {
    if (typeof a !== "undefined") {
        if (typeof a === "boolean") {
            a;
        }
    }
}

function test2(a: any) {
    if (typeof a === "undefined") {
        if (typeof a === "boolean") {
            a;
        }
    }
}

function test3(a: any) {
    if (typeof a === "undefined" || typeof a === "boolean") {
		a;
    }
}

function test4(a: any) {
    if (typeof a !== "undefined" && typeof a === "boolean") {
		a;
    }
}
