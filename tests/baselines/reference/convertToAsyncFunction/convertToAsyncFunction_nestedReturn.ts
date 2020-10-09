// ==ORIGINAL==

function /*[#|*/getTheNumber2/*|]*/(): Promise<number> {
    return Promise.resolve()
        .then(() => {
            if (true) {
                return 1;
            }
        })
        .then(function name(foo) {
            while (true) {
                return Promise.resolve(3);
            }
        })
        .then(() => {
            if (true) {
                return Promise.resolve(123)
            }
        })
        .then((bar) => {
            if (true) {
                return 2;
            }
        });
    }

// ==ASYNC FUNCTION::Convert to async function==

async function getTheNumber2(): Promise<number> {
    await Promise.resolve();
    const foo = (() => {
        if (true) {
            return 1;
        }
    })();
    await function name() {
        while (true) {
            return Promise.resolve(3);
        }
    } ();
    const bar = await (() => {
        if (true) {
            return Promise.resolve(123);
        }
    })();
    if (true) {
        return 2;
    }
    }
