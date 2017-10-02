// ==ORIGINAL==
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let x = 1;
    }
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = 1;

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let x = /*RENAME*/newLocal;
    }
}