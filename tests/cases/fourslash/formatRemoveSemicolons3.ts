/// <reference path="fourslash.ts" />

////(<InterfaceTypeWithDeclaredMembers>type).declaredProperties = getNamedMembers(members);
////// Start with signatures at empty array in case of recursive types
////(<InterfaceTypeWithDeclaredMembers>type).declaredCallSignatures = emptyArray;

format.setFormatOptions({ ...format.copyFormatOptions(), insertTrailingSemicolon: false });
format.document();
verify.currentFileContentIs(`(<InterfaceTypeWithDeclaredMembers>type).declaredProperties = getNamedMembers(members);
// Start with signatures at empty array in case of recursive types
(<InterfaceTypeWithDeclaredMembers>type).declaredCallSignatures = emptyArray`);