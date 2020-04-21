function getTypedArray(flag: boolean) {
  return flag ? new Float32Array(10) : new Float64Array(10);
}
function getTypedArrayConstructor(flag: boolean) {
  return flag ? Float32Array : Float64Array;
}
const a = getTypedArray(true);              // Float64Array | Float32Array
const b = getTypedArrayConstructor(false);  // Float64ArrayConstructor | Float32ArrayConstructor

if (!(a instanceof b)) {
  console.log(a.length);  // Property 'length' does not exist on type 'never'.
}
