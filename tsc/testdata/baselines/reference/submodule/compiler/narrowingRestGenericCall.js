//// [tests/cases/compiler/narrowingRestGenericCall.ts] ////

//// [narrowingRestGenericCall.ts]
interface Slugs {
  foo: string;
  bar: string;
}

function call<T extends object>(obj: T, cb: (val: T) => void) {
  cb(obj);
}

declare let obj: Slugs;
call(obj, ({foo, ...rest}) => {
  console.log(rest.bar);
});

//// [narrowingRestGenericCall.js]
function call(obj, cb) {
    cb(obj);
}
call(obj, ({ foo, ...rest }) => {
    console.log(rest.bar);
});
