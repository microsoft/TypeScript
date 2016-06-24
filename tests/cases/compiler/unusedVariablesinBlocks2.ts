//@noUnusedLocals:true
//@noUnusedParameters:true

function f1 () {
    let x = 10;
    {
        let x = 11;
    }
    x++;
}