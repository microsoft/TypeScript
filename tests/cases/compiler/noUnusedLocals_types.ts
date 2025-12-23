// @noUnusedLocals: true
// Test specifically for type declarations with underscore prefix

// These should all produce errors (no underscore)
type UnusedType1 = string;
interface UnusedInterface1 { x: number; }
class UnusedClass1 { }

// These should NOT produce errors (underscore prefix)
type _UnusedType2 = string;
interface _UnusedInterface2 { x: number; }  
class _UnusedClass2 { }

// Mixed usage - only the one without underscore should error
type UsedInOther = number;
type _Helper = UsedInOther; // _Helper is not an error, but it uses UsedInOther

export {};