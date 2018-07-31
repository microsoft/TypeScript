// ==ORIGINAL==

function /*[#|*/f/*|]*/(){
    var res = 100;
    if (res > 50) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    else {
        return fetch("https://typescriptlang.org").then(res_func);
    }
}

function res_func(result){
    console.log(result);
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(){
    var res = 100;
    if (res > 50) {
        let res_2 = await fetch("https://typescriptlang.org");
        return console.log(res_2);
    }
    else {
        let result = await fetch("https://typescriptlang.org");
        return res_func(result);
    }
}

function res_func(result){
    console.log(result);
}
