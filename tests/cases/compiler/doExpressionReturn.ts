//@target: ES2021
declare let v: boolean

function returnTypeInfer() {
    const y = do { return 1 }
}

function returnTypeCheck(): string {
    const y = do { return 1 }
}

function avoidFalsePositive() {
    const y = do {
        function z() {
            return 1
        }
        1
    }
}

function tryCatch() {
    try {
        const y = do { if (v) return; 1; }
    } catch { 1 }
    try {
        const y = do { if (v) return; 1; }
    } catch (e) { 1 }
    try {
        const y = do { if (v) return; 1; }
    } catch ({ a = 1 }) { 1 }
}

function avoidSignatureToBeCaptured(): void {
    const a = do {
        try {
            if (v) return; 1;
        } catch { 1 }
    };
    const b = do {
        try {
            if (v) return; 1;
        } catch (d) { 1 }
    };
    const c = do {
        try {
            if (v) return; 1;
        } catch ({ a = 1 }) { 1 }
    };
}
