// ==ORIGINAL==

switch (1) {
    case /*[#|*/2/*|]*/:
        break;
}

// ==SCOPE::Extract to constant in enclosing scope==
const newLocal = 2;
switch (1) {
    case /*RENAME*/newLocal:
        break;
}
