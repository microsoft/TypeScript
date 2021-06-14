//@target: ES2021
function x() {
    const y = do { return }
}

function w() {
    const y = do {
        function z() {
            return
        }
        1
     }
}

function z() {
    try {
        const y = do { return }
    } catch {}
    try {
        const y = do { return }
    } catch(e) {}
    try {
        const y = do { return }
    } catch ({ a = 1 }) {}
}

function q() {
    (do {
        try {
            return
        } catch {}
    });
    (do {
        try {
            return
        } catch(d) {}
    });
    (do {
        try {
            return
        } catch({a = 1}) {}
    });
}
