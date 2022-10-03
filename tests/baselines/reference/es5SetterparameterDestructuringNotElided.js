//// [es5SetterparameterDestructuringNotElided.ts]
const foo = {
    set foo([start, end]: [any, any]) {
        void start;
        void end;
    },
};

//// [es5SetterparameterDestructuringNotElided.js]
var foo = {
    set foo(_a) {
        var start = _a[0], end = _a[1];
        void start;
        void end;
    },
};
