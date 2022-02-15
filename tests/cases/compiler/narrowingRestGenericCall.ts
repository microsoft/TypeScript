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
  //               ~~~ Property 'bar' does not exist on type 'Omit<T, "foo">'. ts(2339)
});