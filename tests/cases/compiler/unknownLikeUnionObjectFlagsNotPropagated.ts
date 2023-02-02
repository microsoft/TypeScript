// @strict: true
// @noEmit: true
// @lib: esnext

// repro from #52475#issuecomment-1411215277

type MyType = {} | null | undefined;

const myVar: MyType = null as MyType;

myVar?.toLocaleString;
myVar;

async function myUnusedFunction() {
    const fetch1 = Promise.resolve(['hello', 'world']);
    const [data1] = await Promise.all([fetch1]);
    data1.length;
}
