// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

// Error: using in case clause
switch (1) {
    case 0:
        using x = { [Symbol.dispose]() {} };
        break;
}

// Error: using in default clause
switch (2) {
    default:
        using y = { [Symbol.dispose]() {} };
        break;
}

// Error: await using in case clause (top-level of module would need to be async, so wrap minimally)
{
    // Note: await using requires async context, tested separately in async functions
}

// Error: Multiple using statements in same case
switch (5) {
    case 0:
        using c = { [Symbol.dispose]() {} };
        using d = { [Symbol.dispose]() {} };
        break;
}

// Error: Nested switch with using
switch (6) {
    case 0:
        switch (7) {
            case 1:
                using e = { [Symbol.dispose]() {} };
                break;
        }
        break;
}

// Valid: using before switch statement
using beforeSwitch = { [Symbol.dispose]() {} };
switch (8) {
    case 0:
        console.log("ok");
        break;
}

// Valid: Block-wrapped in case
switch (9) {
    case 0: {
        using valid1 = { [Symbol.dispose]() {} };
        break;
    }
}

// Valid: Block-wrapped in default
switch (10) {
    default: {
        using valid2 = { [Symbol.dispose]() {} };
        break;
    }
}

// Valid: Nested block in case
switch (11) {
    case 0: {
        {
            using valid3 = { [Symbol.dispose]() {} };
        }
        break;
    }
}

// Valid: If statement inside case with block
switch (12) {
    case 0:
        if (true) {
            using valid4 = { [Symbol.dispose]() {} };
        }
        break;
}

// Error: Fall-through cases
switch (13) {
    case 0:
    case 1:
        using fallthrough = { [Symbol.dispose]() {} };
        break;
}

// Error: Case with no break
switch (14) {
    case 0:
        using nobreak = { [Symbol.dispose]() {} };
    case 1:
        console.log("fallthrough");
        break;
}

// Error: Empty case before default
switch (15) {
    case 0:
        // empty
    default:
        using inDefault = { [Symbol.dispose]() {} };
        break;
}

export {};
