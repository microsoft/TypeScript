# The `__generator` helper

The `__generator` helper is a function designed to support TypeScript's down-level emit for
async functions when targeting ES5 and earlier. But how, exactly, does it work?

Here's the body of the `__generator` helper:

```js
__generator = function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
```

And here's an example of it in use:

```ts
// source
async function func(x) {
    try {
        await x;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        console.log("finally");
    }
}

// generated
function func(x) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 1, 3, 4]);
                    return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 3:
                    console.log("finally");
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
```

There is a lot going on in this function, so the following will break down what each part of the
`__generator` helper does and how it works.

# Opcodes

The `__generator` helper uses opcodes which represent various operations that are interpreted by
the helper to affect its internal state. The following table lists the various opcodes, their
arguments, and their purpose:

| Opcode         | Arguments | Purpose                                                                                                                        |
|----------------|-----------|--------------------------------------------------------------------------------------------------------------------------------|
| 0 (next)       | *value*   | Starts the generator, or resumes the generator with *value* as the result of the `AwaitExpression` where execution was paused. |
| 1 (throw)      | *value*   | Resumes the generator, throwing *value* at `AwaitExpression` where execution was paused.                                       |
| 2 (return)     | *value*   | Exits the generator, executing any `finally` blocks starting at the `AwaitExpression` where execution was paused.              |
| 3 (break)      | *label*   | Performs an unconditional jump to the specified label, executing any `finally` between the current instruction and the label.  |
| 4 (yield)      | *value*   | Suspends the generator, setting the resume point at the next label and yielding the value.                                     |
| 5 (yieldstar)  | *value*   | Suspends the generator, setting the resume point at the next label and delegating operations to the supplied value.            |
| 6 (catch)      | *error*   | An internal instruction used to indicate an exception that was thrown from the body of the generator.                          |
| 7 (endfinally) |           | Exits a finally block, resuming any previous operation (such as a break, return, throw, etc.)                                  |

# State
The `_`, `f`, `y`, and `t` variables make up the persistent state of the `__generator` function. Each variable
has a specific purpose, as described in the following sections:

## The `_` variable
The `__generator` helper must share state between its internal `step` orchestration function and
the `body` function passed to the helper.

```ts
var _ = {
    label: 0,
    sent: function() {
        if (t[0] & 1) // NOTE: true for `throw`, but not `next` or `catch`
            throw t[1];
        return sent[1];
    },
    trys: [],
    ops: []
};
```

The following table describes the members of the `_` state object and their purpose:

| Name    | Description                                                                                                               |
|---------|---------------------------------------------------------------------------------------------------------------------------|
| `label` | Specifies the next switch case to execute in the `body` function.                                                         |
| `sent`  | Handles the completion result passed to the generator.                                                                    |
| `trys`  | A stack of **Protected Regions**, which are 4-tuples that describe the labels that make up a `try..catch..finally` block. |
| `ops`   | A stack of pending operations used for `try..finally` blocks.                                                             |

The `__generator` helper passes this state object to the `body` function for use with switching
between switch cases in the body, handling completions from `AwaitExpression`, etc.

## The `f` variable
The `f` variable indicates whether the generator is currently executing, to prevent re-entry of
the same generator during its execution.

## The `y` variable
The `y` variable stores the iterator passed to a `yieldstar` instruction to which operations should be delegated.

## The `t` variable
The `t` variable is a temporary variable that stores one of the following values:

- The completion value when resuming from a `yield` or `yield*`.
- The error value for a catch block.
- The current **Protected Region**.
- The verb (`next`, `throw`, or `return` method) to delegate to the expression of a `yield*`.
- The result of evaluating the verb delegated to the expression of a `yield*`.

> NOTE: None of the above cases overlap.

# Protected Regions
A **Protected Region** is a region within the `body` function that indicates a
`try..catch..finally` statement. It consists of a 4-tuple that contains 4 labels:

| Offset | Description                                                                             |
|--------|-----------------------------------------------------------------------------------------|
| 0      | *Required* The label that indicates the beginning of a `try..catch..finally` statement. |
| 1      | *Optional* The label that indicates the beginning of a `catch` clause.                  |
| 2      | *Optional* The label that indicates the beginning of a `finally` clause.                |
| 3      | *Required* The label that indicates the end of the `try..catch..finally` statement.     |

# The generator object
The final step of the `__generator` helper is the allocation of an object that implements the
`Generator` protocol, to be used by the `__awaiter` helper:

```ts
return { next: verb(0), "throw": verb(1), "return": verb(2) };
function verb(n) { return function (v) { return step([n, v]); }; }
```

This object translates calls to `next`, `throw`, and `return` to the appropriate Opcodes and
invokes the `step` orchestration function to continue execution. The `throw` and `return` method
names are quoted to better support ES3.

# Orchestration
The `step` function is the main orechestration mechanism for the `__generator` helper. It
interprets opcodes, handles **protected regions**, and communicates results back to the caller.

Here's a closer look at the `step` function:

```ts
function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
        if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [0, t.value];
        switch (op[0]) {
            case 0: case 1: t = op; break;
            case 4: _.label++; return { value: op[1], done: false };
            case 5: _.label++; y = op[1]; op = [0]; continue;
            case 7: op = _.ops.pop(); _.trys.pop(); continue;
            default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                if (t[2]) _.ops.pop();
                _.trys.pop(); continue;
        }
        op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
}
```

The main body of `step` exists in a `while` loop. This allows us to continually interpret
operations until we have reached some completion value, be it a `return`, `await`, or `throw`.

## Preventing re-entry
The first part of the `step` function is used as a check to prevent re-entry into a currently
executing generator:

```ts
if (f) throw new TypeError("Generator is already executing.");
```

## Running the generator
The main body of the `step` function consists of a `while` loop which continues to evaluate
instructions until the generator exits or is suspended:

```ts
while (_) try ...
```

When the generator has run to completion, the `_` state variable will be cleared, forcing the loop
to exit.

## Evaluating the generator body.
```ts
try {
    ...
    op = body.call(thisArg, _);
}
catch (e) {
    op = [6, e];
    y = 0;
}
finally {
    f = t = 0;
}
```

Depending on the current operation, we re-enter the generator body to start or continue execution.
Here we invoke `body` with `thisArg` as the `this` binding and the `_` state object as the only
argument. The result is a tuple that contains the next Opcode and argument.

If evaluation of the body resulted in an exception, we convert this into an Opcode 6 ("catch")
operation to be handled in the next spin of the `while` loop. We also clear the `y` variable in
case it is set to ensure we are no longer delegating operations as the exception occurred in
user code *outside* of, or at the function boundary of, the delegated iterator (otherwise the
iterator would have handled the exception itself).

After executing user code, we clear the `f` flag that indicates we are executing the generator,
as well as the `t` temporary value so that we don't hold onto values sent to the generator for
longer than necessary.

Inside of the `try..finally` statement are a series of statements that are used to evaluate the
operations of the transformed generator body.

The first thing we do is mark the generator as executing:

```ts
if (f = 1, ...)
```

Despite the fact this expression is part of the head of an `if` statement, the comma operator
causes it to be evaluated and the result thrown out. This is a minification added purely to
reduce the overall footprint of the helper.

## Delegating `yield*`

The first two statements of the `try..finally` statement handle delegation for `yield*`:

```ts
if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
if (y = 0, t) op = [0, t.value];
```

If the `y` variable is set, and `y` has a `next`, `throw`, or `return` method (depending on the
current operation), we invoke this method and store the return value (an IteratorResult) in `t`.

If `t` indicates it is a yielded value (e.g. `t.done === false`), we return `t` to the caller.
If `t` indicates it is a returned value (e.g. `t.done === true`), we mark the operation with the
`next` Opcode, and the returned value.
If `y` did not have the appropriate method, or `t` was a returned value, we reset `y` to a falsey
value and continue processing the operation.

## Handling operations

The various Opcodes are handled in the following switch statement:

```ts
switch (op[0]) {
    case 0: case 1: t = op; break;
    case 4: _.label++; return { value: op[1], done: false };
    case 5: _.label++; y = op[1]; op = [0]; continue;
    case 7: op = _.ops.pop(); _.trys.pop(); continue;
    default:
        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
        if (t[2]) _.ops.pop();
        _.trys.pop(); continue;
}
```

The following sections describe the various Opcodes:

### Opcode 0 ("next") and Opcode 1 ("throw")
```ts
case 0: // next
case 1: // throw
    t = op;
    break;
```

Both Opcode 0 ("next") and Opcode 1 ("throw") have the same behavior. The current operation is
stored in the `t` variable and the `body` function is invoked. The `body` function should call
`_.sent()` which will evaluate the appropriate completion result.

### Opcode 4 ("yield")
```ts
case 4: // yield
    _.label++;
    return { value: op[1], done: false };
```

When we encounter Opcode 4 ("yield"), we increment the label by one to indicate the point at which
the generator will resume execution. We then return an `IteratorResult` whose `value` is the
yielded value, and `done` is `false`.

### Opcode 5 ("yieldstar")
```ts
case 5: // yieldstar
    _.label++;
    y = op[1];
    op = [0];
    continue;
```

When we receive Opcode 5 ("yieldstar"), we increment the label by one to indicate the point at which
the generator will resume execution. We then store the iterator in `op[1]` in the `y` variable, and
set the operation to delegate to Opcode 0 ("next") with no value. Finally, we continue execution at
the top of the loop to start delegation.

### Opcode 7 ("endfinally")
```ts
case 7:
    op = _.ops.pop();
    _.trys.pop();
    continue;
```

Opcode 7 ("endfinally") indicates that we have hit the end of a `finally` clause, and that the last
operation recorded before entering the `finally` block should be evaluated.

### Opcode 2 ("return"), Opcode 3 ("break"), and Opcode 6 ("catch")
```ts
default:
    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
        _ = 0;
        continue;
    }
    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
        _.label = op[1];
        break;
    }
    if (op[0] === 6 && _.label < t[1]) {
        _.label = t[1];
        t = op;
        break;
    }
    if (t && _.label < t[2]) {
        _.label = t[2];
        _.ops.push(op);
        break;
    }
    if (t[2])
        _.ops.pop();
    _.trys.pop();
    continue;
}
```

The handling for Opcode 2 ("return"), Opcode 3 ("break") and Opcode 6 ("catch") is more
complicated, as we must obey the specified runtime semantics of generators. The first line in this
clause gets the current **Protected Region** if found and stores it in the `t` temp variable:

```ts
if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && ...) ...
```

The remainder of this statement, as well as the following by several `if` statements test for more
complex conditions. The first of these is the following:

```ts
if (!(t = ...) && (op[0] === 6 || op[0] === 2)) {
    _ = 0;
    continue;
}
```

If we encounter an Opcode 6 ("catch") or Opcode 2 ("return"), and we are not in a protected region,
then this operation completes the generator by setting the `_` variable to a falsey value. The
`continue` statement resumes execution at the top of the `while` statement, which will exit the loop
so that we continue execution at the statement following the loop.

```ts
if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
    _.label = op[1];
    break;
}
```

The `if` statement above handles Opcode 3 ("break") when we are either not in a **protected region**, or
are performing an unconditional jump to a label inside of the current **protected region**. In this case
we can unconditionally jump to the specified label.

```ts
if (op[0] === 6 && _.label < t[1]) {
    _.label = t[1];
    t = op;
    break;
}
```

The `if` statement above handles Opcode 6 ("catch") when inside the `try` block of a **protected
region**. In this case we jump to the `catch` block, if present. We replace the value of `t` with
the operation so that the exception can be read as the first statement of the transformed `catch`
clause of the transformed generator body.

```ts
if (t && _.label < t[2]) {
    _.label = t[2];
    _.ops.push(op);
    break;
}
```

This `if` statement handles all Opcodes when in a **protected region** with a `finally` clause.
As long as we are not already inside the `finally` clause, we jump to the `finally` clause and
push the pending operation onto the `_.ops` stack. This allows us to resume execution of the
pending operation once we have completed execution of the `finally` clause, as long as it does not
supersede this operation with its own completion value.

```ts
if (t[2])
    _.ops.pop();
```

Any other completion value inside of a `finally` clause will supersede the pending completion value
from the `try` or `catch` clauses. The above `if` statement pops the pending completion from the
stack.

```ts
_.trys.pop();
continue;
```

The remaining statements handle the point at which we exit a **protected region**. Here we pop the
current **protected region** from the stack and spin the `while` statement to evaluate the current
operation again in the next **protected region** or at the function boundary.

## Handling a completed generator
Once the generator has completed, the `_` state variable will be falsey. As a result, the `while`
loop will terminate and hand control off to the final statement of the orchestration function,
which deals with how a completed generator is evaluated:

```ts
if (op[0] & 5)
    throw op[1];
return { value: op[0] ? op[1] : void 0, done: true };
```

If the caller calls `throw` on the generator it will send Opcode 1 ("throw"). If an exception
is uncaught within the body of the generator, it will send Opcode 6 ("catch"). As the generator has
completed, it throws the exception. Both of these cases are caught by the bitmask `5`, which does
not collide with the only two other valid completion Opcodes.

If the caller calls `next` on the generator, it will send Opcode 0 ("next"). As the generator has
completed, it returns an `IteratorResult` where `value` is `undefined` and `done` is true.

If the caller calls `return` on the generator, it will send Opcode 2 ("return"). As the generator
has completed, it returns an `IteratorResult` where `value` is the value provided to `return`, and
`done` is true.