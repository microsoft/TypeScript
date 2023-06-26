// @target: esnext,es2022,es2017,es2015,es5
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

await using d1 = { async [Symbol.asyncDispose]() {} };

async function af() {
    await using d3 = { async [Symbol.asyncDispose]() {} };
    await null;
}

async function * ag() {
    await using d5 = { async [Symbol.asyncDispose]() {} };
    yield;
    await null;
}

const a = async () => {
    await using d6 = { async [Symbol.asyncDispose]() {} };
};

class C1 {
    a = async () => {
        await using d7 = { async [Symbol.asyncDispose]() {} };
    };

    async am() {
        await using d13 = { async [Symbol.asyncDispose]() {} };
        await null;
    }

    async * ag() {
        await using d15 = { async [Symbol.asyncDispose]() {} };
        yield;
        await null;
    }
}

{
    await using d19 = { async [Symbol.asyncDispose]() {} };
}

switch (Math.random()) {
    case 0:
        await using d20 = { async [Symbol.asyncDispose]() {} };
        break;

    case 1:
        await using d21 = { async [Symbol.asyncDispose]() {} };
        break;
}

if (true)
    switch (0) {
        case 0:
            await using d22 = { async [Symbol.asyncDispose]() {} };
            break;
    }

try {
    await using d23 = { async [Symbol.asyncDispose]() {} };
}
catch {
    await using d24 = { async [Symbol.asyncDispose]() {} };
}
finally {
    await using d25 = { async [Symbol.asyncDispose]() {} };
}

if (true) {
    await using d26 = { async [Symbol.asyncDispose]() {} };
}
else {
    await using d27 = { async [Symbol.asyncDispose]() {} };
}

while (true) {
    await using d28 = { async [Symbol.asyncDispose]() {} };
    break;
}

do {
    await using d29 = { async [Symbol.asyncDispose]() {} };
    break;
}
while (true);

for (;;) {
    await using d30 = { async [Symbol.asyncDispose]() {} };
    break;
}

for (const x in {}) {
    await using d31 = { async [Symbol.asyncDispose]() {} };
}

for (const x of []) {
    await using d32 = { async [Symbol.asyncDispose]() {} };
}

export {};