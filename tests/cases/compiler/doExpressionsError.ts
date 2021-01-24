// No return
function a() {
    const x = do {
        function ok() {
            return 1;
        }
        return 2; // error on this node
    };
}
// No break / continue across do expr
// Todo:

// No iteration / declaration at the end

;[
    do { var a = 1 },
    do { function x() { } },
    do { const a = 1 },
    do { let a = 1 },
    do { class T {} },
    do { enum T {} },
]

;[
    do { for (const x of []) {} },
    do { for (const x in {}) {} },
    do { for (let i = 0; i < [].length; i++) {} },
    do { while(true) {} },
    do { do {} while(true) }
]
;

// But in non-end position

;[
    do { var a = 1; a },
    do { function x() { }; x },
    do { const a = 1; a },
    do { let a = 1; a },
    do { class T {}; T },
    do { enum T {}; T },
]

;[
    do { for (const x of []) {}; 1 },
    do { for (const x in {}) {}; 1 },
    do { for (let i = 0; i < [].length; i++) {}; 1 },
    do { while(true) {}; 1 },
    do { do {} while(true); 1 }
]