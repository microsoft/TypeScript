// @esModuleInterop: true
// @resolveJsonModule: true
// @strict: true
// @outDir: dist
// @filename: index.ts
import data from "./data.json";

interface Foo {
  str: string;
}

fn(data.foo);
fn(data.foo); // <-- shouldn't error!

function fn(arg: Foo[]) { }
// @filename: data.json
{
    "foo": [
      {
        "bool": true,
        "str": "123"
      }
    ]
}