//// [tests/cases/compiler/es5SetterparameterDestructuringNotElided.ts] ////

//// [es5SetterparameterDestructuringNotElided.ts]
const foo = {
    set foo([start, end]: [any, any]) {
        void start;
        void end;
    },
};

//// [es5SetterparameterDestructuringNotElided.js]
const foo = {
    set foo([start, end]) {
        void start;
        void end;
    },
};
