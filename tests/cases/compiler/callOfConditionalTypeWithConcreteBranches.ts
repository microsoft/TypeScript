type Q<T> = number extends T ? (n: number) => void : never;
function fn<T>(arg: Q<T>) {
  // Expected: OK
  // Actual: Cannot convert 10 to number & T
  arg(10);
}
// Legal invocations are not problematic
fn<string | number>(m => m.toFixed());
fn<number>(m => m.toFixed());