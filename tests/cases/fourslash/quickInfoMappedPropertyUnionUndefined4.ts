// @strict: true

//// type A/*1*/ = { [K in keyof { a?: string }]-?: string }
//// type B/*2*/ = { [K in keyof A]: string | undefined }

verify.quickInfoAt("1", `type A = {
    a: string;
}`);
verify.quickInfoAt("2", `type B = {
    a: string | undefined;
}`);
