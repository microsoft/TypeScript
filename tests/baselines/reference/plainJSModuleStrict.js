//// [plainJSMultipleDefaultExport.js]
export default 12
export default 13
const await = 1
const yield = 2
async function f() {
    const await = 3
}
function* g() {
    const yield = 4
}
class C {
    #constructor = 1
}


//// [plainJSMultipleDefaultExport.js]
export default 12;
export default 13;
const await = 1;
const yield = 2;
async function f() {
    const await = 3;
}
function* g() {
    const yield = 4;
}
class C {
    #constructor = 1;
}
