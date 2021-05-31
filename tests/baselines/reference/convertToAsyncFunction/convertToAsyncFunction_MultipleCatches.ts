// ==ORIGINAL==

function /*[#|*/f/*|]*/(): Promise<void> {
    return fetch('https://typescriptlang.org').then(res => console.log(res)).catch(err => console.log("err", err)).catch(err2 => console.log("err2", err2));
}
// ==ASYNC FUNCTION::Convert to async function==

async function f(): Promise<void> {
    try {
        try {
            const res = await fetch('https://typescriptlang.org');
            return console.log(res);
        } catch (err) {
            return console.log("err", err);
        }
    } catch (err2) {
        return console.log("err2", err2);
    }
}