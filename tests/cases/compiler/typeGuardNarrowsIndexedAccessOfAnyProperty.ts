// @strict: true
namespace Problem1 {
  declare const obj: { [key: string]: string | undefined };
  declare let key: "a";
  if (obj[key]) { obj[key].toUpperCase() } // should Ok
}

namespace Problem2 {
  declare const obj: { [key: string]: string | undefined };
  declare const key: string;
  if (obj[key]) { obj[key].toUpperCase() } // should Ok
}

namespace Problem3 {
  declare const obj: { a?: string, b?: string };
  declare const key: "a" | "b";
  if (obj[key]) { obj[key].toUpperCase() } // should Ok
}

namespace Problem4 {
  function f<K extends string>(obj: { [P in K]?: string }, k: K) {
    const key: K = k;
    if (obj[key]) { obj[key].toUpperCase() } // should Ok
  }
}

namespace Problem5 {
  declare const obj: { [key: string]: string | undefined };
  declare const key: string;
  if (obj[key]) {
    while(!!true) {
      obj[key].toUpperCase() // should Ok
    }
  } 
}

namespace Problem6 {
  declare const obj: { [key: string]: string | undefined };
  declare const key: string;
  while(!!true) {
    if (obj[key]) {
      obj[key].toUpperCase() // should Ok
    } 
  }
}

namespace Problem7 {
  declare const obj: { [key: string]: string | undefined };
  declare const key: string;
  if (obj[key]) {
    while(!!true) {
      obj[key].toUpperCase() // should error
      obj[key] = undefined
    }
  } 
}
