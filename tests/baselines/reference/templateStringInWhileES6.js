//// [templateStringInWhileES6.ts]
while (`abc${0}abc`) {
    `def${1}def`;
}

//// [templateStringInWhileES6.js]
while (`abc${0}abc`) {
    `def${1}def`;
}
