//// Object.create(null);
//// const x = Promise.resolve(Number.MAX_VALUE);
//// if (x instanceof Promise) {}

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("class.defaultLibrary", "Object"), 
    c2.semanticToken("member.defaultLibrary", "create"), 
    c2.semanticToken("variable.declaration.readonly", "x"), 
    c2.semanticToken("class.defaultLibrary", "Number"), 
    c2.semanticToken("property.readonly.defaultLibrary", "MAX_VALUE"), 
    c2.semanticToken("variable.readonly", "x"), 
);;