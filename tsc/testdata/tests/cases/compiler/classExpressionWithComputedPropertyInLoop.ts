// @target: es2015

// Class expression in a loop with a computed property name on an instance field.
// The class temp variable should be block-scoped (let) to ensure each iteration
// gets its own binding, matching the behavior when BlockScopedBindingInLoop is set.

const array: any[] = [];
const key = "myKey";
for (let i = 0; i < 3; i++) {
    array.push(class C {
        [key] = i;
        #field = i;
    });
}
