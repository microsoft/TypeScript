# Grammar { #grammar }

This appendix contains a summary of the grammar found in the main document. As described in section [#grammar-conventions]<!--2.1-->, the TypeScript grammar is a superset of the grammar defined in the [ECMAScript 2015 Language Specification](http://www.ecma-international.org/ecma-262/6.0/) (specifically, the ECMA-262 Standard, 6th Edition) and this appendix lists only productions that are new or modified from the ECMAScript grammar.

## Types { #grammar-types }

&emsp;&emsp;*TypeParameters:*
&emsp;&emsp;&emsp;`<`&emsp;*TypeParameterList*&emsp;`>`

&emsp;&emsp;*TypeParameterList:*
&emsp;&emsp;&emsp;*TypeParameter*
&emsp;&emsp;&emsp;*TypeParameterList*&emsp;`,`&emsp;*TypeParameter*

&emsp;&emsp;*TypeParameter:*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;*Constraint<sub>opt</sub>*

&emsp;&emsp;*Constraint:*
&emsp;&emsp;&emsp;`extends`&emsp;*Type*

&emsp;&emsp;*TypeArguments:*
&emsp;&emsp;&emsp;`<`&emsp;*TypeArgumentList*&emsp;`>`

&emsp;&emsp;*TypeArgumentList:*
&emsp;&emsp;&emsp;*TypeArgument*
&emsp;&emsp;&emsp;*TypeArgumentList*&emsp;`,`&emsp;*TypeArgument*

&emsp;&emsp;*TypeArgument:*
&emsp;&emsp;&emsp;*Type*

&emsp;&emsp;*Type:*
&emsp;&emsp;&emsp;*UnionOrIntersectionOrPrimaryType*
&emsp;&emsp;&emsp;*FunctionType*
&emsp;&emsp;&emsp;*ConstructorType*

&emsp;&emsp;*UnionOrIntersectionOrPrimaryType:*
&emsp;&emsp;&emsp;*UnionType*
&emsp;&emsp;&emsp;*IntersectionOrPrimaryType*

&emsp;&emsp;*IntersectionOrPrimaryType:*
&emsp;&emsp;&emsp;*IntersectionType*
&emsp;&emsp;&emsp;*PrimaryType*

&emsp;&emsp;*PrimaryType:*
&emsp;&emsp;&emsp;*ParenthesizedType*
&emsp;&emsp;&emsp;*PredefinedType*
&emsp;&emsp;&emsp;*TypeReference*
&emsp;&emsp;&emsp;*ObjectType*
&emsp;&emsp;&emsp;*ArrayType*
&emsp;&emsp;&emsp;*TupleType*
&emsp;&emsp;&emsp;*TypeQuery*
&emsp;&emsp;&emsp;*ThisType*

&emsp;&emsp;*ParenthesizedType:*
&emsp;&emsp;&emsp;`(`&emsp;*Type*&emsp;`)`

&emsp;&emsp;*PredefinedType:*
&emsp;&emsp;&emsp;`any`
&emsp;&emsp;&emsp;`number`
&emsp;&emsp;&emsp;`boolean`
&emsp;&emsp;&emsp;`string`
&emsp;&emsp;&emsp;`symbol`
&emsp;&emsp;&emsp;`void`

&emsp;&emsp;*TypeReference:*
&emsp;&emsp;&emsp;*TypeName*&emsp;*[no LineTerminator here]*&emsp;*TypeArguments<sub>opt</sub>*

&emsp;&emsp;*TypeName:*
&emsp;&emsp;&emsp;*IdentifierReference*
&emsp;&emsp;&emsp;*NamespaceName*&emsp;`.`&emsp;*IdentifierReference*

&emsp;&emsp;*NamespaceName:*
&emsp;&emsp;&emsp;*IdentifierReference*
&emsp;&emsp;&emsp;*NamespaceName*&emsp;`.`&emsp;*IdentifierReference*

&emsp;&emsp;*ObjectType:*
&emsp;&emsp;&emsp;`{`&emsp;*TypeBody<sub>opt</sub>*&emsp;`}`

&emsp;&emsp;*TypeBody:*
&emsp;&emsp;&emsp;*TypeMemberList*&emsp;`;`*<sub>opt</sub>*
&emsp;&emsp;&emsp;*TypeMemberList*&emsp;`,`*<sub>opt</sub>*

&emsp;&emsp;*TypeMemberList:*
&emsp;&emsp;&emsp;*TypeMember*
&emsp;&emsp;&emsp;*TypeMemberList*&emsp;`;`&emsp;*TypeMember*
&emsp;&emsp;&emsp;*TypeMemberList*&emsp;`,`&emsp;*TypeMember*

&emsp;&emsp;*TypeMember:*
&emsp;&emsp;&emsp;*PropertySignature*
&emsp;&emsp;&emsp;*CallSignature*
&emsp;&emsp;&emsp;*ConstructSignature*
&emsp;&emsp;&emsp;*IndexSignature*
&emsp;&emsp;&emsp;*MethodSignature*

&emsp;&emsp;*ArrayType:*
&emsp;&emsp;&emsp;*PrimaryType*&emsp;*[no LineTerminator here]*&emsp;`[`&emsp;`]`

&emsp;&emsp;*TupleType:*
&emsp;&emsp;&emsp;`[`&emsp;*TupleElementTypes*&emsp;`]`

&emsp;&emsp;*TupleElementTypes:*
&emsp;&emsp;&emsp;*TupleElementType*
&emsp;&emsp;&emsp;*TupleElementTypes*&emsp;`,`&emsp;*TupleElementType*

&emsp;&emsp;*TupleElementType:*
&emsp;&emsp;&emsp;*Type*

&emsp;&emsp;*UnionType:*
&emsp;&emsp;&emsp;*UnionOrIntersectionOrPrimaryType*&emsp;`|`&emsp;*IntersectionOrPrimaryType*

&emsp;&emsp;*IntersectionType:*
&emsp;&emsp;&emsp;*IntersectionOrPrimaryType*&emsp;`&`&emsp;*PrimaryType*

&emsp;&emsp;*FunctionType:*
&emsp;&emsp;&emsp;*TypeParameters<sub>opt</sub>*&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`=>`&emsp;*Type*

&emsp;&emsp;*ConstructorType:*
&emsp;&emsp;&emsp;`new`&emsp;*TypeParameters<sub>opt</sub>*&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`=>`&emsp;*Type*

&emsp;&emsp;*TypeQuery:*
&emsp;&emsp;&emsp;`typeof`&emsp;*TypeQueryExpression*

&emsp;&emsp;*TypeQueryExpression:*
&emsp;&emsp;&emsp;*IdentifierReference*
&emsp;&emsp;&emsp;*TypeQueryExpression*&emsp;`.`&emsp;*IdentifierName*

&emsp;&emsp;*ThisType:*
&emsp;&emsp;&emsp;`this`

&emsp;&emsp;*PropertySignature:*
&emsp;&emsp;&emsp;*PropertyName*&emsp;`?`*<sub>opt</sub>*&emsp;*TypeAnnotation<sub>opt</sub>*

&emsp;&emsp;*PropertyName:*
&emsp;&emsp;&emsp;*IdentifierName*
&emsp;&emsp;&emsp;*StringLiteral*
&emsp;&emsp;&emsp;*NumericLiteral*

&emsp;&emsp;*TypeAnnotation:*
&emsp;&emsp;&emsp;`:`&emsp;*Type*

&emsp;&emsp;*CallSignature:*
&emsp;&emsp;&emsp;*TypeParameters<sub>opt</sub>*&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;*TypeAnnotation<sub>opt</sub>*

&emsp;&emsp;*ParameterList:*
&emsp;&emsp;&emsp;*RequiredParameterList*
&emsp;&emsp;&emsp;*OptionalParameterList*
&emsp;&emsp;&emsp;*RestParameter*
&emsp;&emsp;&emsp;*RequiredParameterList*&emsp;`,`&emsp;*OptionalParameterList*
&emsp;&emsp;&emsp;*RequiredParameterList*&emsp;`,`&emsp;*RestParameter*
&emsp;&emsp;&emsp;*OptionalParameterList*&emsp;`,`&emsp;*RestParameter*
&emsp;&emsp;&emsp;*RequiredParameterList*&emsp;`,`&emsp;*OptionalParameterList*&emsp;`,`&emsp;*RestParameter*

&emsp;&emsp;*RequiredParameterList:*
&emsp;&emsp;&emsp;*RequiredParameter*
&emsp;&emsp;&emsp;*RequiredParameterList*&emsp;`,`&emsp;*RequiredParameter*

&emsp;&emsp;*RequiredParameter:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;*BindingIdentifierOrPattern*&emsp;*TypeAnnotation<sub>opt</sub>*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;`:`&emsp;*StringLiteral*

&emsp;&emsp;*AccessibilityModifier:*
&emsp;&emsp;&emsp;`public`
&emsp;&emsp;&emsp;`private`
&emsp;&emsp;&emsp;`protected`

&emsp;&emsp;*BindingIdentifierOrPattern:*
&emsp;&emsp;&emsp;*BindingIdentifier*
&emsp;&emsp;&emsp;*BindingPattern*

&emsp;&emsp;*OptionalParameterList:*
&emsp;&emsp;&emsp;*OptionalParameter*
&emsp;&emsp;&emsp;*OptionalParameterList*&emsp;`,`&emsp;*OptionalParameter*

&emsp;&emsp;*OptionalParameter:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;*BindingIdentifierOrPattern*&emsp;`?`&emsp;*TypeAnnotation<sub>opt</sub>*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;*BindingIdentifierOrPattern*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;`?`&emsp;`:`&emsp;*StringLiteral*

&emsp;&emsp;*RestParameter:*
&emsp;&emsp;&emsp;`...`&emsp;*BindingIdentifier*&emsp;*TypeAnnotation<sub>opt</sub>*

&emsp;&emsp;*ConstructSignature:*
&emsp;&emsp;&emsp;`new`&emsp;*TypeParameters<sub>opt</sub>*&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;*TypeAnnotation<sub>opt</sub>*

&emsp;&emsp;*IndexSignature:*
&emsp;&emsp;&emsp;`[`&emsp;*BindingIdentifier*&emsp;`:`&emsp;`string`&emsp;`]`&emsp;*TypeAnnotation*
&emsp;&emsp;&emsp;`[`&emsp;*BindingIdentifier*&emsp;`:`&emsp;`number`&emsp;`]`&emsp;*TypeAnnotation*

&emsp;&emsp;*MethodSignature:*
&emsp;&emsp;&emsp;*PropertyName*&emsp;`?`*<sub>opt</sub>*&emsp;*CallSignature*

&emsp;&emsp;*TypeAliasDeclaration:*
&emsp;&emsp;&emsp;`type`&emsp;*BindingIdentifier*&emsp;*TypeParameters<sub>opt</sub>*&emsp;`=`&emsp;*Type*&emsp;`;`

## Expressions { #grammar-expressions }

&emsp;&emsp;*PropertyDefinition:*  *( Modified )*
&emsp;&emsp;&emsp;*IdentifierReference*
&emsp;&emsp;&emsp;*CoverInitializedName*
&emsp;&emsp;&emsp;*PropertyName*&emsp;`:`&emsp;*AssignmentExpression*
&emsp;&emsp;&emsp;*PropertyName*&emsp;*CallSignature*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`
&emsp;&emsp;&emsp;*GetAccessor*
&emsp;&emsp;&emsp;*SetAccessor*

&emsp;&emsp;*GetAccessor:*
&emsp;&emsp;&emsp;`get`&emsp;*PropertyName*&emsp;`(`&emsp;`)`&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`

&emsp;&emsp;*SetAccessor:*
&emsp;&emsp;&emsp;`set`&emsp;*PropertyName*&emsp;`(`&emsp;*BindingIdentifierOrPattern*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;`)`&emsp;`{`&emsp;*FunctionBody*&emsp;`}`

&emsp;&emsp;*FunctionExpression:*  *( Modified )*
&emsp;&emsp;&emsp;`function`&emsp;*BindingIdentifier<sub>opt</sub>*&emsp;*CallSignature*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`

&emsp;&emsp;*ArrowFormalParameters:*  *( Modified )*
&emsp;&emsp;&emsp;*CallSignature*

&emsp;&emsp;*Arguments:*  *( Modified )*
&emsp;&emsp;&emsp;*TypeArguments<sub>opt</sub>*&emsp;`(`&emsp;*ArgumentList<sub>opt</sub>*&emsp;`)`

&emsp;&emsp;*UnaryExpression:*  *( Modified )*
&emsp;&emsp;&emsp;…
&emsp;&emsp;&emsp;`<`&emsp;*Type*&emsp;`>`&emsp;*UnaryExpression*

## Statements { #grammar-statements }

&emsp;&emsp;*Declaration:*  *( Modified )*
&emsp;&emsp;&emsp;…
&emsp;&emsp;&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;*EnumDeclaration*

&emsp;&emsp;*VariableDeclaration:*  *( Modified )*
&emsp;&emsp;&emsp;*SimpleVariableDeclaration*
&emsp;&emsp;&emsp;*DestructuringVariableDeclaration*

&emsp;&emsp;*SimpleVariableDeclaration:*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer<sub>opt</sub>*

&emsp;&emsp;*DestructuringVariableDeclaration:*
&emsp;&emsp;&emsp;*BindingPattern*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer*

&emsp;&emsp;*LexicalBinding:*  *( Modified )*
&emsp;&emsp;&emsp;*SimpleLexicalBinding*
&emsp;&emsp;&emsp;*DestructuringLexicalBinding*

&emsp;&emsp;*SimpleLexicalBinding:*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer<sub>opt</sub>*

&emsp;&emsp;*DestructuringLexicalBinding:*
&emsp;&emsp;&emsp;*BindingPattern*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer<sub>opt</sub>*

## Functions { #grammar-functions }

&emsp;&emsp;*FunctionDeclaration:*  *( Modified )*
&emsp;&emsp;&emsp;`function`&emsp;*BindingIdentifier<sub>opt</sub>*&emsp;*CallSignature*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`
&emsp;&emsp;&emsp;`function`&emsp;*BindingIdentifier<sub>opt</sub>*&emsp;*CallSignature*&emsp;`;`

## Interfaces { #grammar-interfaces }

&emsp;&emsp;*InterfaceDeclaration:*
&emsp;&emsp;&emsp;`interface`&emsp;*BindingIdentifier*&emsp;*TypeParameters<sub>opt</sub>*&emsp;*InterfaceExtendsClause<sub>opt</sub>*&emsp;*ObjectType*

&emsp;&emsp;*InterfaceExtendsClause:*
&emsp;&emsp;&emsp;`extends`&emsp;*ClassOrInterfaceTypeList*

&emsp;&emsp;*ClassOrInterfaceTypeList:*
&emsp;&emsp;&emsp;*ClassOrInterfaceType*
&emsp;&emsp;&emsp;*ClassOrInterfaceTypeList*&emsp;`,`&emsp;*ClassOrInterfaceType*

&emsp;&emsp;*ClassOrInterfaceType:*
&emsp;&emsp;&emsp;*Expression*&emsp;*TypeArguments*

## Classes { #grammar-classes }

&emsp;&emsp;*ClassDeclaration:*  *( Modified )*
&emsp;&emsp;&emsp;`class`&emsp;*BindingIdentifier<sub>opt</sub>*&emsp;*TypeParameters<sub>opt</sub>*&emsp;*ClassHeritage*&emsp;`{`&emsp;*ClassBody*&emsp;`}`

&emsp;&emsp;*ClassHeritage:*  *( Modified )*
&emsp;&emsp;&emsp;*ClassExtendsClause<sub>opt</sub>*&emsp;*ImplementsClause<sub>opt</sub>*

&emsp;&emsp;*ClassExtendsClause:*
&emsp;&emsp;&emsp;`extends`&emsp; *ClassType*

&emsp;&emsp;*ClassType:*
&emsp;&emsp;&emsp;*Expression*&emsp;*TypeArguments*

&emsp;&emsp;*ImplementsClause:*
&emsp;&emsp;&emsp;`implements`&emsp;*ClassOrInterfaceTypeList*

&emsp;&emsp;*ClassElement:*  *( Modified )*
&emsp;&emsp;&emsp;*ConstructorDeclaration*
&emsp;&emsp;&emsp;*PropertyMemberDeclaration*
&emsp;&emsp;&emsp;*IndexMemberDeclaration*

&emsp;&emsp;*ConstructorDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`constructor`&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`{`&emsp;*FunctionBody*&emsp;`}`
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`constructor`&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`;`

&emsp;&emsp;*PropertyMemberDeclaration:*
&emsp;&emsp;&emsp;*MemberVariableDeclaration*
&emsp;&emsp;&emsp;*MemberFunctionDeclaration*
&emsp;&emsp;&emsp;*MemberAccessorDeclaration*

&emsp;&emsp;*MemberVariableDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer<sub>opt</sub>*&emsp;`;`

&emsp;&emsp;*MemberFunctionDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*CallSignature*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*CallSignature*&emsp;`;`

&emsp;&emsp;*MemberAccessorDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*GetAccessor*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*SetAccessor*

&emsp;&emsp;*IndexMemberDeclaration:*
&emsp;&emsp;&emsp;*IndexSignature*&emsp;`;`

## Enums { #grammar-enums }

&emsp;&emsp;*EnumDeclaration:*
&emsp;&emsp;&emsp;`const`*<sub>opt</sub>*&emsp;`enum`&emsp;*BindingIdentifier*&emsp;`{`&emsp;*EnumBody<sub>opt</sub>*&emsp;`}`

&emsp;&emsp;*EnumBody:*
&emsp;&emsp;&emsp;*EnumMemberList*&emsp;`,`*<sub>opt</sub>*

&emsp;&emsp;*EnumMemberList:*
&emsp;&emsp;&emsp;*EnumMember*
&emsp;&emsp;&emsp;*EnumMemberList*&emsp;`,`&emsp;*EnumMember*

&emsp;&emsp;*EnumMember:*
&emsp;&emsp;&emsp;*PropertyName*
&emsp;&emsp;&emsp;*PropertyName*&emsp;=&emsp;*EnumValue*

&emsp;&emsp;*EnumValue:*
&emsp;&emsp;&emsp;*AssignmentExpression*

## Namespaces { #grammar-namespaces }

&emsp;&emsp;*NamespaceDeclaration:*
&emsp;&emsp;&emsp;`namespace`&emsp;*IdentifierPath*&emsp;`{`&emsp;*NamespaceBody*&emsp;`}`

&emsp;&emsp;*IdentifierPath:*
&emsp;&emsp;&emsp;*BindingIdentifier*
&emsp;&emsp;&emsp;*IdentifierPath*&emsp;`.`&emsp;*BindingIdentifier*

&emsp;&emsp;*NamespaceBody:*
&emsp;&emsp;&emsp;*NamespaceElements<sub>opt</sub>*

&emsp;&emsp;*NamespaceElements:*
&emsp;&emsp;&emsp;*NamespaceElement*
&emsp;&emsp;&emsp;*NamespaceElements*&emsp;*NamespaceElement*

&emsp;&emsp;*NamespaceElement:*
&emsp;&emsp;&emsp;*Statement*
&emsp;&emsp;&emsp;*LexicalDeclaration*
&emsp;&emsp;&emsp;*FunctionDeclaration*
&emsp;&emsp;&emsp;*GeneratorDeclaration*
&emsp;&emsp;&emsp;*ClassDeclaration*
&emsp;&emsp;&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;*EnumDeclaration*
&emsp;&emsp;&emsp;*NamespaceDeclaration
&emsp;&emsp;&emsp;AmbientDeclaration
&emsp;&emsp;&emsp;ImportAliasDeclaration
&emsp;&emsp;&emsp;ExportNamespaceElement*

&emsp;&emsp;*ExportNamespaceElement:*
&emsp;&emsp;&emsp;`export`&emsp;*VariableStatement*
&emsp;&emsp;&emsp;`export`&emsp;*LexicalDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*FunctionDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*GeneratorDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*ClassDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*EnumDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*NamespaceDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*AmbientDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*ImportAliasDeclaration*

&emsp;&emsp;*ImportAliasDeclaration:*
&emsp;&emsp;&emsp;`import`&emsp;*BindingIdentifier*&emsp;`=`&emsp;*EntityName*&emsp;`;`

&emsp;&emsp;*EntityName:*
&emsp;&emsp;&emsp;*NamespaceName*
&emsp;&emsp;&emsp;*NamespaceName*&emsp;`.`&emsp;*IdentifierReference*

## Scripts and Modules { #grammar-scripts-and-modules }

&emsp;&emsp;*SourceFile:*
&emsp;&emsp;&emsp;*ImplementationSourceFile*
&emsp;&emsp;&emsp;*DeclarationSourceFile*

&emsp;&emsp;*ImplementationSourceFile:*
&emsp;&emsp;&emsp;*ImplementationScript*
&emsp;&emsp;&emsp;*ImplementationModule*

&emsp;&emsp;*DeclarationSourceFile:*
&emsp;&emsp;&emsp;*DeclarationScript*
&emsp;&emsp;&emsp;*DeclarationModule*

&emsp;&emsp;*ImplementationScript:*
&emsp;&emsp;&emsp;*ImplementationScriptElements<sub>opt</sub>*

&emsp;&emsp;*ImplementationScriptElements:*
&emsp;&emsp;&emsp;*ImplementationScriptElement*
&emsp;&emsp;&emsp;*ImplementationScriptElements*&emsp;*ImplementationScriptElement*

&emsp;&emsp;*ImplementationScriptElement:*
&emsp;&emsp;&emsp;*ImplementationElement*
&emsp;&emsp;&emsp;*AmbientModuleDeclaration*

&emsp;&emsp;*ImplementationElement:*
&emsp;&emsp;&emsp;*Statement*
&emsp;&emsp;&emsp;*LexicalDeclaration*
&emsp;&emsp;&emsp;*FunctionDeclaration*
&emsp;&emsp;&emsp;*GeneratorDeclaration*
&emsp;&emsp;&emsp;*ClassDeclaration*
&emsp;&emsp;&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;*EnumDeclaration*
&emsp;&emsp;&emsp;*NamespaceDeclaration*
&emsp;&emsp;&emsp;*AmbientDeclaration*
&emsp;&emsp;&emsp;*ImportAliasDeclaration*

&emsp;&emsp;*DeclarationScript:*
&emsp;&emsp;&emsp;*DeclarationScriptElements<sub>opt</sub>*

&emsp;&emsp;*DeclarationScriptElements:*
&emsp;&emsp;&emsp;*DeclarationScriptElement*
&emsp;&emsp;&emsp;*DeclarationScriptElements*&emsp;*DeclarationScriptElement*

&emsp;&emsp;*DeclarationScriptElement:*
&emsp;&emsp;&emsp;*DeclarationElement*
&emsp;&emsp;&emsp;*AmbientModuleDeclaration*

&emsp;&emsp;*DeclarationElement:*
&emsp;&emsp;&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;*NamespaceDeclaration*
&emsp;&emsp;&emsp;*AmbientDeclaration*
&emsp;&emsp;&emsp;*ImportAliasDeclaration*

&emsp;&emsp;*ImplementationModule:*
&emsp;&emsp;&emsp;*ImplementationModuleElements<sub>opt</sub>*

&emsp;&emsp;*ImplementationModuleElements:*
&emsp;&emsp;&emsp;*ImplementationModuleElement*
&emsp;&emsp;&emsp;*ImplementationModuleElements*&emsp;*ImplementationModuleElement*

&emsp;&emsp;*ImplementationModuleElement:*
&emsp;&emsp;&emsp;*ImplementationElement*
&emsp;&emsp;&emsp;*ImportDeclaration*
&emsp;&emsp;&emsp;*ImportAliasDeclaration*
&emsp;&emsp;&emsp;*ImportRequireDeclaration*
&emsp;&emsp;&emsp;*ExportImplementationElement*
&emsp;&emsp;&emsp;*ExportDefaultImplementationElement*
&emsp;&emsp;&emsp;*ExportListDeclaration*
&emsp;&emsp;&emsp;*ExportAssignment*

&emsp;&emsp;*DeclarationModule:*
&emsp;&emsp;&emsp;*DeclarationModuleElements<sub>opt</sub>*

&emsp;&emsp;*DeclarationModuleElements:*
&emsp;&emsp;&emsp;*DeclarationModuleElement*
&emsp;&emsp;&emsp;*DeclarationModuleElements*&emsp;*DeclarationModuleElement*

&emsp;&emsp;*DeclarationModuleElement:*
&emsp;&emsp;&emsp;*DeclarationElement*
&emsp;&emsp;&emsp;*ImportDeclaration*
&emsp;&emsp;&emsp;*ImportAliasDeclaration*
&emsp;&emsp;&emsp;*ExportDeclarationElement*
&emsp;&emsp;&emsp;*ExportDefaultDeclarationElement*
&emsp;&emsp;&emsp;*ExportListDeclaration*
&emsp;&emsp;&emsp;*ExportAssignment*

&emsp;&emsp;*ImportRequireDeclaration:*
&emsp;&emsp;&emsp;`import`&emsp;*BindingIdentifier*&emsp;`=`&emsp;`require`&emsp;`(`&emsp;*StringLiteral*&emsp;`)`&emsp;`;`

&emsp;&emsp;*ExportImplementationElement:*
&emsp;&emsp;&emsp;`export`&emsp;*VariableStatement*
&emsp;&emsp;&emsp;`export`&emsp;*LexicalDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*FunctionDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*GeneratorDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*ClassDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*EnumDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*NamespaceDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*AmbientDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*ImportAliasDeclaration*

&emsp;&emsp;*ExportDeclarationElement:*
&emsp;&emsp;&emsp;`export`&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*AmbientDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*ImportAliasDeclaration*

&emsp;&emsp;*ExportDefaultImplementationElement:*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*FunctionDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*GeneratorDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*ClassDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*AssignmentExpression*&emsp;`;`

&emsp;&emsp;*ExportDefaultDeclarationElement:*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*AmbientFunctionDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*AmbientClassDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*IdentifierReference*&emsp;`;`

&emsp;&emsp;*ExportListDeclaration:*
&emsp;&emsp;&emsp;`export`&emsp;`*`&emsp;*FromClause*&emsp;`;`
&emsp;&emsp;&emsp;`export`&emsp;*ExportClause*&emsp;*FromClause*&emsp;`;`
&emsp;&emsp;&emsp;`export`&emsp;*ExportClause*&emsp;`;`

&emsp;&emsp;*ExportAssignment:*
&emsp;&emsp;&emsp;`export`&emsp;`=`&emsp;*IdentifierReference*&emsp;`;`

## Ambients { #grammar-ambients }

&emsp;&emsp;*AmbientDeclaration:*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientVariableDeclaration*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientFunctionDeclaration*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientClassDeclaration*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientEnumDeclaration*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientNamespaceDeclaration*

&emsp;&emsp;*AmbientVariableDeclaration:*
&emsp;&emsp;&emsp;`var`&emsp;*AmbientBindingList*&emsp;`;`
&emsp;&emsp;&emsp;`let`&emsp;*AmbientBindingList*&emsp;`;`
&emsp;&emsp;&emsp;`const`&emsp;*AmbientBindingList*&emsp;`;`

&emsp;&emsp;*AmbientBindingList:*
&emsp;&emsp;&emsp;*AmbientBinding*
&emsp;&emsp;&emsp;*AmbientBindingList*&emsp;`,`&emsp;*AmbientBinding*

&emsp;&emsp;*AmbientBinding:*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;*TypeAnnotation<sub>opt</sub>*

&emsp;&emsp;*AmbientFunctionDeclaration:*
&emsp;&emsp;&emsp;`function`&emsp;*BindingIdentifier*&emsp;*CallSignature*&emsp;`;`

&emsp;&emsp;*AmbientClassDeclaration:*
&emsp;&emsp;&emsp;`class`&emsp;*BindingIdentifier*&emsp;*TypeParameters<sub>opt</sub>*&emsp;*ClassHeritage*&emsp;`{`&emsp;*AmbientClassBody*&emsp;`}`

&emsp;&emsp;*AmbientClassBody:*
&emsp;&emsp;&emsp;*AmbientClassBodyElements<sub>opt</sub>*

&emsp;&emsp;*AmbientClassBodyElements:*
&emsp;&emsp;&emsp;*AmbientClassBodyElement*
&emsp;&emsp;&emsp;*AmbientClassBodyElements*&emsp;*AmbientClassBodyElement*

&emsp;&emsp;*AmbientClassBodyElement:*
&emsp;&emsp;&emsp;*AmbientConstructorDeclaration*
&emsp;&emsp;&emsp;*AmbientPropertyMemberDeclaration*
&emsp;&emsp;&emsp;*IndexSignature*

&emsp;&emsp;*AmbientConstructorDeclaration:*
&emsp;&emsp;&emsp;`constructor`&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`;`

&emsp;&emsp;*AmbientPropertyMemberDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;`;`
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*CallSignature*&emsp;`;`

&emsp;&emsp;*AmbientEnumDeclaration:*
&emsp;&emsp;&emsp;*EnumDeclaration*

&emsp;&emsp;*AmbientNamespaceDeclaration:*
&emsp;&emsp;&emsp;`namespace`&emsp;*IdentifierPath*&emsp;`{`&emsp;*AmbientNamespaceBody*&emsp;`}`

&emsp;&emsp;*AmbientNamespaceBody:*
&emsp;&emsp;&emsp;*AmbientNamespaceElements<sub>opt</sub>*

&emsp;&emsp;*AmbientNamespaceElements:*
&emsp;&emsp;&emsp;*AmbientNamespaceElement*
&emsp;&emsp;&emsp;*AmbientNamespaceElements*&emsp;*AmbientNamespaceElement*

&emsp;&emsp;*AmbientNamespaceElement:*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientVariableDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientLexicalDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientFunctionDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientClassDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientEnumDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientNamespaceDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*ImportAliasDeclaration*

&emsp;&emsp;*AmbientModuleDeclaration:*
&emsp;&emsp;&emsp;`declare`&emsp;`module`&emsp;*StringLiteral*&emsp;`{`&emsp; *DeclarationModule*&emsp;`}`

