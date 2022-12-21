// ==ORIGINAL==

function /*[#|*/f/*|]*/(){
    var i:number;
    return fetch("https://typescriptlang.org").then(i => i.ok).then(res => i+1).catch(err => i-1)
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(){
    var i:number;
    try {
        const i_1 = await fetch("https://typescriptlang.org");
        const res = i_1.ok;
        return i + 1;
    } catch (err) {
        return i - 1;
    }
}
