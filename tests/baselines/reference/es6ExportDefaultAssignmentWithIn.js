//// [es6ExportDefaultAssignmentWithIn.ts]

function b() {
    return {
        a: 10
    };
}
export default a in b();

//// [es6ExportDefaultAssignmentWithIn.js]
function b() {
    return {
        a: 10
    };
}


//// [es6ExportDefaultAssignmentWithIn.d.ts]
