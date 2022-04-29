// ==ORIGINAL==

switch (1) {
    case /*[#|*/1/*|]*/:
        break;
}

// ==SCOPE::Extract to constant in enclosing scope==
const newLocal = 1;
switch (1) {
    case /*RENAME*/newLocal:
        break;
}
