//// [nestedRedeclarationInES6AMD.ts]
function a() {
    {
        let status = 1;
        status = 2;
    }
}

//// [nestedRedeclarationInES6AMD.js]
function a() {
    {
        let status = 1;
        status = 2;
    }
}
