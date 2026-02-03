//// [tests/cases/compiler/conditionalEqualityOnLiteralObjects.ts] ////

//// [conditionalEqualityOnLiteralObjects.ts]
const a = { a: 1 }
const b = [1]

if ({ a: 1 } === { a: 1 }) {
}
if ([1] === [1]) {
}
if (a === { a: 1 }) {
}
if (b === [1]) {
}
if ({ a: 1 } === a) {
}
if ([1] === b) {
}

if ({ a: 1 } !== { a: 1 }) {
}
if ([1] !== [1]) {
}
if (a !== { a: 1 }) {
}
if (b !== [1]) {
}
if ({ a: 1 } !== a) {
}
if ([1] !== b) {
}

if ({ a: 1 } == { a: 1 }) {
}
if ([1] == [1]) {
}
if (a == { a: 1 }) {
}
if (b == [1]) {
}
if ({ a: 1 } == a) {
}
if ([1] == b) {
}

if ({ a: 1 } != { a: 1 }) {
}
if ([1] != [1]) {
}
if (a != { a: 1 }) {
}
if (b != [1]) {
}
if ({ a: 1 } != a) {
}
if ([1] != b) {
}


//// [conditionalEqualityOnLiteralObjects.js]
var a = { a: 1 };
var b = [1];
if ({ a: 1 } === { a: 1 }) {
}
if ([1] === [1]) {
}
if (a === { a: 1 }) {
}
if (b === [1]) {
}
if ({ a: 1 } === a) {
}
if ([1] === b) {
}
if ({ a: 1 } !== { a: 1 }) {
}
if ([1] !== [1]) {
}
if (a !== { a: 1 }) {
}
if (b !== [1]) {
}
if ({ a: 1 } !== a) {
}
if ([1] !== b) {
}
if ({ a: 1 } == { a: 1 }) {
}
if ([1] == [1]) {
}
if (a == { a: 1 }) {
}
if (b == [1]) {
}
if ({ a: 1 } == a) {
}
if ([1] == b) {
}
if ({ a: 1 } != { a: 1 }) {
}
if ([1] != [1]) {
}
if (a != { a: 1 }) {
}
if (b != [1]) {
}
if ({ a: 1 } != a) {
}
if ([1] != b) {
}
