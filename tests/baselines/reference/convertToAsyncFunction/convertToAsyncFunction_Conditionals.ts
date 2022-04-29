// ==ORIGINAL==

function /*[#|*/f/*|]*/(){
    return fetch("https://typescriptlang.org").then(res => {
      if (res.ok) {
        return fetch("https://microsoft.com");
      }
      else {
        if (res.buffer.length > 5) {
          return res;
        }
        else {
            return fetch("https://github.com");
        }
      }
    });
}

// ==ASYNC FUNCTION::Convert to async function==

async function f(){
    const res = await fetch("https://typescriptlang.org");
    if (res.ok) {
        return fetch("https://microsoft.com");
    }
    else {
        if (res.buffer.length > 5) {
            return res;
        }
        else {
            return fetch("https://github.com");
        }
    }
}
