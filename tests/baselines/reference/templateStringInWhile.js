//// [templateStringInWhile.ts]
while (`abc${0}abc`) {
    `def${1}def`;
}

//// [templateStringInWhile.js]
while ("abc" + 0 + "abc") {
    "def" + 1 + "def";
}
