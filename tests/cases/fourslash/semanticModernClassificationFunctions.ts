//// function foo(p1) {
////   return foo(Math.abs(p1))
//// }
//// `/${window.location}`.split("/").forEach(s => foo(s));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("function.declaration", "foo"), 
    c2.semanticToken("parameter.declaration", "p1"), 
    c2.semanticToken("function", "foo"), 
    c2.semanticToken("variable.defaultLibrary", "Math"), 
    c2.semanticToken("member.defaultLibrary", "abs"), 
    c2.semanticToken("parameter", "p1"), 
    c2.semanticToken("member.defaultLibrary", "split"), 
    c2.semanticToken("member.defaultLibrary", "forEach"), 
    c2.semanticToken("parameter.declaration", "s"), 
    c2.semanticToken("function", "foo"), 
    c2.semanticToken("parameter", "s"), 
);;