//// class A { onEvent: () => void; }
//// const x = new A().onEvent;
//// const match = (s: any) => x();
//// const other = match;
//// match({ other });
//// interface B = { (): string; }; var b: B
//// var s: String;
//// var t: { (): string; foo: string};

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("class.declaration", "A"), 
    c2.semanticToken("member.declaration", "onEvent"), 
    c2.semanticToken("function.declaration.readonly", "x"), 
    c2.semanticToken("class", "A"), 
    c2.semanticToken("member", "onEvent"), 
    c2.semanticToken("function.declaration.readonly", "match"), 
    c2.semanticToken("parameter.declaration", "s"), 
    c2.semanticToken("function.readonly", "x"), 
    c2.semanticToken("function.declaration.readonly", "other"), 
    c2.semanticToken("function.readonly", "match"), 
    c2.semanticToken("function.readonly", "match"), 
    c2.semanticToken("member.declaration", "other"), 
    c2.semanticToken("interface.declaration", "B"), 
    c2.semanticToken("variable.declaration", "b"), 
    c2.semanticToken("interface", "B"), 
    c2.semanticToken("variable.declaration", "s"), 
    c2.semanticToken("interface.defaultLibrary", "String"), 
    c2.semanticToken("variable.declaration", "t"), 
    c2.semanticToken("property.declaration", "foo"), 
);;