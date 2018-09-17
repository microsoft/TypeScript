// ==ORIGINAL==

function /*[#|*/f/*|]*/():Promise<void>{
    return Promise.all([fetch('https://typescriptlang.org'), fetch('https://microsoft.com'), fetch('https://youtube.com')]).then(function(vals){
        vals.forEach(console.log);
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function f():Promise<void>{
    const vals = await Promise.all([fetch('https://typescriptlang.org'), fetch('https://microsoft.com'), fetch('https://youtube.com')]);
    vals.forEach(console.log);
}
