// ==ORIGINAL==

function /*[#|*/fSync/*|]*/() {
    return Promise.resolve(0).then(x => {
        console.log(x); // note: added to illustrate refactor
        throw new Error('Failure!');
    }, () => null);
};

// ==ASYNC FUNCTION::Convert to async function==

async function fSync() {
    let x: number;
    try {
        x = await Promise.resolve(0);
    }
    catch (e) {
        return null;
    }
    console.log(x); // note: added to illustrate refactor
    throw new Error('Failure!');
};
