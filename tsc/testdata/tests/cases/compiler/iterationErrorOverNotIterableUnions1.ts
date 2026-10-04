// @strict: true

type A = { a: string };
type B = { b: string };

declare const data: A[] | B;

for (const item of data) {
    item.b;
}

for (const ignoredItem of data) {
    ignoredItem.b;
}

const [el] = data;
el.b;

const el2 = data[0];
el2.b;
