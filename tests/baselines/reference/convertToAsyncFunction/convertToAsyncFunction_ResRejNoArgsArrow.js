// ==ORIGINAL==

    function /*[#|*/f/*|]*/() {
        return Promise.resolve().then(() => 1, () => "a");
    }

// ==ASYNC FUNCTION::Convert to async function==

    async function f() {
        try {
            await Promise.resolve();
        }
        catch (e) {
            return "a";
        }
        return 1;
    }
