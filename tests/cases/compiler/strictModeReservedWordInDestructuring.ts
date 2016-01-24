"use strict"
var [public] = [1];
var { x: public } = { x: 1 };
var [[private]] = [["hello"]];
var { y: { s: static }, z: { o: { p: package } }} = { y: { s: 1 }, z: { o: { p: 'h' } } };
var { public, protected } = { public: 1, protected: 2 };
var { public: a, protected: b } = { public: 1, protected: 2 };
