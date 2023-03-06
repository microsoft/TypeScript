// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    return my_print(fetch("https://typescriptlang.org").then(res => console.log(res))).catch(err => console.log("Error!", err));
}
function my_print (resp): Promise<void> {
    if (resp.ok) {
        console.log(resp.buffer);
    }
    return resp;
}



// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    try {
        return await my_print(fetch("https://typescriptlang.org").then(res => console.log(res)));
    } catch (err) {
        return console.log("Error!", err);
    }
}
function my_print (resp): Promise<void> {
    if (resp.ok) {
        console.log(resp.buffer);
    }
    return resp;
}


