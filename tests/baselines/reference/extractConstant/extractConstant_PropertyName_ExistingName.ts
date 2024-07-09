// ==ORIGINAL==
let y;
/*[#|*/x.y/*|]*/.z();
// ==SCOPE::Extract to constant in enclosing scope==
let y;
const newLocal = x.y;
/*RENAME*/newLocal.z();