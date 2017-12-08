// @target: esnext 
// @noImplicitReturns: true 
// @strictNullChecks: false 
 
function* testGenerator () { 
  if (Math.random() > 0.5) { 
      return; 
  } 
  yield 'hello'; 
}
