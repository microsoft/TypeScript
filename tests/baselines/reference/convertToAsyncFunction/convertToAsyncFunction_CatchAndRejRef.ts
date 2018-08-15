// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<void> {
    return fetch('https://typescriptlang.org').then(res, rej).catch(catch_err)
}
function res(result){
    console.log(result);
}
function rej(rejection){
    return rejection.ok;
}
function catch_err(err){
    console.log(err);
}
// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<void> {
    try {
        try {
            const result = await fetch('https://typescriptlang.org');
            return res(result);
        }
        catch (rejection) {
            return rej(rejection);
        }
    }
    catch (err) {
        return catch_err(err);
    }
}
function res(result){
    console.log(result);
}
function rej(rejection){
    return rejection.ok;
}
function catch_err(err){
    console.log(err);
}