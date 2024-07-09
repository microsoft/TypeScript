// ==ORIGINAL==

function /*[#|*/f/*|]*/() {
  var obj;
  return fetch("https://typescriptlang.org").then(function (res) {
    obj = {
      func: function f() {
        console.log(res);
      }
    };
  });
}

// ==ASYNC FUNCTION::Convert to async function==

async function f() {
  var obj;
  const res = await fetch("https://typescriptlang.org");
    obj = {
        func: function f() {
            console.log(res);
        }
    };
}
