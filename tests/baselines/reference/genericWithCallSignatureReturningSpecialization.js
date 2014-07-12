//// [genericWithCallSignatureReturningSpecialization.ts]
interface B<T> {
    f(): B<number>;
    (value: T): void;
}
var x: B<boolean>;
x(true); // was error


//// [genericWithCallSignatureReturningSpecialization.js]
var x;
x(true); // was error
