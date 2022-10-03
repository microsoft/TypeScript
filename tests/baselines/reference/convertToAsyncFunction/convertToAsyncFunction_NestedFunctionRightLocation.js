// ==ORIGINAL==

function f() {
    function fn2(){
        function /*[#|*/fn3/*|]*/(){
            return fetch("https://typescriptlang.org").then(res => console.log(res));
        }
        return fn3();
    }
    return fn2();
}

// ==ASYNC FUNCTION::Convert to async function==

function f() {
    function fn2(){
        async function fn3(){
            const res = await fetch("https://typescriptlang.org");
            return console.log(res);
        }
        return fn3();
    }
    return fn2();
}
