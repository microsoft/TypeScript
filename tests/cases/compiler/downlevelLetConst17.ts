// @target:es5
// @allowUnreachableCode: true
'use strict'

declare function use(a: any);

var x;
for (let x = 10; ;) {
    use(x);
}
use(x);

for (const x = 10; ;) {
    use(x);
}

for (; ;) {
    let x = 10;
    use(x);
    x = 1;
}

for (; ;) {
    const x = 10;
    use(x);
}

for (let x; ;) {
    use(x);
    x = 1;
}

for (; ;) {
    let x;
    use(x);
    x = 1;
}

while (true) {
    let x;
    use(x);
}

while (true) {
    const x = true;
    use(x);
}

do {
    let x;
    use(x);
} while (true);

do {
    let x;
    use(x);
} while (true);

for (let x in []) {
    use(x);
}

for (const x in []) {
    use(x);
}

for (const x of []) {
    use(x);
}