// ==ORIGINAL==

function /*[#|*/fSync/*|]*/() {
    return Promise.resolve(0).then(x => {
        console.log(x); // note: added to illustrate refactor
        throw new Error('Failure!');
    }, () => {
        throw new Error('Thrown from onRejected');
    });
};

// ==ASYNC FUNCTION::Convert to async function==

async function fSync() {
    let x;
    try {
        x = await Promise.resolve(0);
    }
    catch (e) {
        throw new Error('Thrown from onRejected');
    }
    console.log(x); // note: added to illustrate refactor
    throw new Error('Failure!');
};
