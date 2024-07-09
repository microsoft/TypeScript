// @strict: true
// @noEmit: true
// @lib: esnext

let cond: boolean;

async function len(s: string) {
    return s.length;
}

async function f1() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x = await len(x);
        x;
    }
    x;
}

async function f2() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x;
        x = await len(x);
    }
    x;
}

declare function foo(x: string): Promise<number>;
declare function foo(x: number): Promise<string>;

async function g1() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x = await foo(x);
        x;
    }
    x;
}

async function g2() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x;
        x = await foo(x);
    }
    x;
}

async function asNumber(x: string | number): Promise<number> {
    return +x;
}

async function h1() {
    let x: string | number | boolean;
    x = "0";
    while (cond) {
        x = +x + 1;
        x;
    }
}

async function h2() {
    let x: string | number | boolean;
    x = "0";
    while (cond) {
        x = await asNumber(x) + 1;
        x;
    }
}

async function h3() {
    let x: string | number | boolean;
    x = "0";
    while (cond) {
        let y = await asNumber(x);
        x = y + 1;
        x;
    }
}

async function h4() {
    let x: string | number | boolean;
    x = "0";
    while (cond) {
        x;
        let y = await asNumber(x);
        x = y + 1;
        x;
    }
}

// repro #51115

async function get_things(_: number | undefined) {
    return [0];
}

async function foobar() {
    let before: number | undefined = undefined;
    for (let i = 0; i < 2; i++) {
        const results = await get_things(before);
        before = results[0];
    }
}

// repro #43047#issuecomment-821453073

declare function foox(x: string | undefined): Promise<string>

async () => {
  let bar: string | undefined = undefined;
  do {
    const baz = await foox(bar);
    bar = baz
  } while (bar)
}

// repro #43047#issuecomment-874221939

declare function myQuery(input: { lastId: number | undefined }): Promise<{ entities: number[] }>;

async function myFunc(): Promise<void> {
  let lastId: number | undefined = undefined;

  while (true) {
    const { entities } = await myQuery({
        lastId,
    });

    lastId = entities[entities.length - 1];
  } 
}
