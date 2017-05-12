
declare let a: false | 0;
declare let b: true | 1 | "hello";

function nope() {
    if (Math.random() < 0.5) {
        a = b;
    }
    else {
        b = a;
    }
}

a === b;

b === a;
