//// [generatorNoImplicitReturns.ts]
 
function* testGenerator () { 
  if (Math.random() > 0.5) { 
      return; 
  } 
  yield 'hello'; 
}


//// [generatorNoImplicitReturns.js]
function* testGenerator() {
    if (Math.random() > 0.5) {
        return;
    }
    yield 'hello';
}
