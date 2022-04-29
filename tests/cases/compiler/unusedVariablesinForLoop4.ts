//@noUnusedLocals:true
//@noUnusedParameters:true

function f1 () {
    for (const elem of ["a", "b", "c"]) {
        elem;
        var x = 20;
    }
}