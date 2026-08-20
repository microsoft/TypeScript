// @strict: true
// @target: es2015

for (const [,] of doesNotExist) {
}

for (const [,] of undefined) {
}

for (const [,] of []) {
}

for (const [] of []) {
}