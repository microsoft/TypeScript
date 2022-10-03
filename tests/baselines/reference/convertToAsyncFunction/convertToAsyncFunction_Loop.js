// ==ORIGINAL==

function /*[#|*/f/*|]*/(){
    return fetch("https://typescriptlang.org").then(res => { for(let i=0; i<10; i++){
        console.log(res);
    }})
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(){
    const res = await fetch("https://typescriptlang.org");
    for (let i = 0; i < 10; i++) {
        console.log(res);
    }
}
