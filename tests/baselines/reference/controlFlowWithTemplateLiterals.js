//// [controlFlowWithTemplateLiterals.ts]
declare const envVar: string | undefined;
if (typeof envVar === `string`) {
  envVar.slice(0)
}

declare const obj: {test: string} | {}
if (`test` in obj) {
  obj.test.slice(0)
}


//// [controlFlowWithTemplateLiterals.js]
if (typeof envVar === "string") {
    envVar.slice(0);
}
if ("test" in obj) {
    obj.test.slice(0);
}
