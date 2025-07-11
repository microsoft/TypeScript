/**
 * Logs method calls and their arguments.
 *
 * @param originalMethod The original method being decorated.
 * @param context The context of the decorator, providing information about the method.
 */
export function log<This, Args extends any[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
  const methodName = String(context.name);

  function replacementMethod(this: This, ...args: Args): Return {
    console.log(`LOG: Entering method '${methodName}'.`);
    console.log(`LOG: Arguments for '${methodName}':`, args);
    const result = originalMethod.apply(this, args);
    console.log(`LOG: Exiting method '${methodName}'.`);
    console.log(`LOG: Return value for '${methodName}':`, result);
    return result;
  }

  return replacementMethod;
}

// Example usage (not part of the library, just for demonstration)
/*
class ExampleClass {
  @log
  greet(name: string, times: number): string[] {
    const messages: string[] = [];
    for (let i = 0; i < times; i++) {
      messages.push(`Hello, ${name}! (${i + 1}/${times})`);
    }
    return messages;
  }
}

const instance = new ExampleClass();
instance.greet("World", 3);
// Expected console output:
// LOG: Entering method 'greet'.
// LOG: Arguments for 'greet': [ 'World', 3 ]
// LOG: Exiting method 'greet'.
// LOG: Return value for 'greet': [ 'Hello, World! (1/3)', 'Hello, World! (2/3)', 'Hello, World! (3/3)' ]
*/
