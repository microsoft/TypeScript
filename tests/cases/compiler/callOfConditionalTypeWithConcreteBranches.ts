type Q<T> = number extends T ? (n: number) => void : never;
function fn<T>(arg: Q<T>) {
  // Expected: OK
  // Actual: Cannot convert 10 to number & T
  arg(10);
}
// Legal invocations are not problematic
fn<string | number>(m => m.toFixed());
fn<number>(m => m.toFixed());

// Ensure the following real-world example that relies on substitution still works
type ExtractParameters<T> = "parameters" extends keyof T
  // The above allows "parameters" to index `T` since all later
  // instances are actually implicitly `"parameters" & keyof T`
  ?  {
        [K in keyof T["parameters"]]: T["parameters"][K];
      }[keyof T["parameters"]]
  : {};