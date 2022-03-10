//// let x = 1, y = 1;
//// const a1 = { e: 1 };
//// var a2 = { x };

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable.declaration", "x"), 
    c2.semanticToken("variable.declaration", "y"), 
    c2.semanticToken("variable.declaration.readonly", "a1"), 
    c2.semanticToken("property.declaration", "e"), 
    c2.semanticToken("variable.declaration", "a2"), 
    c2.semanticToken("property.declaration", "x"), 
);;