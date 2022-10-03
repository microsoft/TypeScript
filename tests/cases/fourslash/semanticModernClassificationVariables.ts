////   var x = 9, y1 = [x];
////   try {
////     for (const s of y1) { x = s }
////   } catch (e) {
////     throw y1;
////   }

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable.declaration", "x"), 
    c2.semanticToken("variable.declaration", "y1"), 
    c2.semanticToken("variable", "x"), 
    c2.semanticToken("variable.declaration.readonly.local", "s"), 
    c2.semanticToken("variable", "y1"), 
    c2.semanticToken("variable", "x"), 
    c2.semanticToken("variable.readonly.local", "s"), 
    c2.semanticToken("variable.declaration.local", "e"), 
    c2.semanticToken("variable", "y1"), 
);;