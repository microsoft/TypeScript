// ==ORIGINAL==
/*[#|*/x.y/*|]*/.z();
// ==SCOPE::Extract to constant in enclosing scope==
const y = x.y;
/*RENAME*/y.z();