// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

// Valid: Try-catch inside case
switch (1) {
    case 0:
        try {
            using inTry = { [Symbol.dispose]() {} };
        } catch {
            using inCatch = { [Symbol.dispose]() {} };
        } finally {
            using inFinally = { [Symbol.dispose]() {} };
        }
        break;
}

// Valid: For loop inside case
switch (2) {
    case 0:
        for (let i = 0; i < 10; i++) {
            using inForBody = { [Symbol.dispose]() {} };
        }
        break;
}

// Valid: While loop inside case
switch (3) {
    case 0:
        while (true) {
            using inWhile = { [Symbol.dispose]() {} };
            break;
        }
        break;
}

// Valid: Do-while loop inside case
switch (4) {
    case 0:
        do {
            using inDoWhile = { [Symbol.dispose]() {} };
            break;
        } while (false);
        break;
}

// Valid: For-in loop inside case
switch (5) {
    case 0:
        for (const key in {}) {
            using inForIn = { [Symbol.dispose]() {} };
        }
        break;
}

// Valid: For-of loop inside case
switch (6) {
    case 0:
        for (const item of []) {
            using inForOf = { [Symbol.dispose]() {} };
        }
        break;
}

// Valid: Function declaration inside case
switch (7) {
    case 0:
        function foo() {
            using inFunction = { [Symbol.dispose]() {} };
        }
        break;
}

// Valid: Arrow function inside case
switch (8) {
    case 0:
        const arrow = () => {
            using inArrow = { [Symbol.dispose]() {} };
        };
        break;
}

// Valid: Class inside case
switch (9) {
    case 0:
        class C {
            method() {
                using inMethod = { [Symbol.dispose]() {} };
            }

            constructor() {
                using inConstructor = { [Symbol.dispose]() {} };
            }
        }
        break;
}

// Valid: Nested function expressions
switch (10) {
    case 0:
        const outer = function() {
            const inner = function() {
                using deeplyNested = { [Symbol.dispose]() {} };
            };
        };
        break;
}

// Valid: Generator function inside case
switch (11) {
    case 0:
        function* gen() {
            using inGenerator = { [Symbol.dispose]() {} };
            yield 1;
        }
        break;
}

// Valid: Async function inside case
switch (12) {
    case 0:
        async function asyncFn() {
            using inAsync = { [Symbol.dispose]() {} };
            await Promise.resolve();
        }
        break;
}

// Valid: Async arrow function inside case
switch (13) {
    case 0:
        const asyncArrow = async () => {
            using inAsyncArrow = { [Symbol.dispose]() {} };
            await Promise.resolve();
        };
        break;
}

// Valid: Object method inside case
switch (14) {
    case 0:
        const obj = {
            method() {
                using inObjectMethod = { [Symbol.dispose]() {} };
            }
        };
        break;
}

// Valid: Labeled block inside case
switch (15) {
    case 0:
        label: {
            using inLabeledBlock = { [Symbol.dispose]() {} };
        }
        break;
}

// Valid: With statement inside case (if not in strict mode)
// Note: This would normally require @strict: false but including for completeness
switch (16) {
    case 0:
        // with ({}) { using inWith = { [Symbol.dispose]() {} }; }
        break;
}

export {};
