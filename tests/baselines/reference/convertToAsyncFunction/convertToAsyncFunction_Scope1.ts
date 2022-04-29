// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
    var var1: Response, var2;
    return fetch('https://typescriptlang.org').then( _ =>
      Promise.resolve().then( res => {
        var2 = "test";
        return fetch("https://microsoft.com");
      }).then(res =>
         var1 === res
      )
    ).then(res);
  }
  function res(response){
      console.log(response);
  }

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
    var var1: Response, var2;
    const _ = await fetch('https://typescriptlang.org');
    const res = await Promise.resolve();
    var2 = "test";
    const res_1 = await fetch("https://microsoft.com");
    const response = var1 === res_1;
    return res(response);
  }
  function res(response){
      console.log(response);
  }
