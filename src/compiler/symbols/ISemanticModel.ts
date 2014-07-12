///<reference path='ICompilation.ts' />
///<reference path='ISymbolInfo.ts' />
///<reference path='ITypeInfo.ts' />

enum LookupOptions {
    /**
     * Consider all symbols.
     */
    Default = 0,

    /**
     * Consider only namespaces and types.
     */
    ModulesOrTypesOnly = 1 << 1,
}

interface ISemanticModel {
    compilation(): ICompilation;
    syntaxTree(): SyntaxTree;

    getSymbolInfo(syntaxNode: SyntaxNode, cancellationToken: ICancellationToken): ISymbolInfo;
    getTypeInfo(syntaxNode: SyntaxNode, cancellationToken: ICancellationToken): ITypeInfo;

    getDiagnostics(cancellationToken: ICancellationToken): Diagnostic[];

    /**
     * Gets the symbol associated with a declaration syntax node. Returns the symbol declared by the node or null if the node is not a declaration.
     * @param declaration A syntax node that is a declaration. This can be any type
     * derived from MemberDeclarationSyntax, TypeDeclarationSyntax, EnumDeclarationSyntax,
     * NamespaceDeclarationSyntax, ParameterSyntax, TypeParameterSyntax, or the alias part of a
     * UsingDirectiveSyntax
     * @param cancellationToken The cancellation token.
     */
    getDeclaredSymbol(declaration: SyntaxNode, cancellationToken: ICancellationToken): ISymbol;
    /**
     * Gets the symbol associated with a declaration syntax node. Returns the symbol declared by the node or null if the node is not a declaration.
     * @param declaration A syntax node that is a declaration. This can be any type
     * derived from MemberDeclarationSyntax, TypeDeclarationSyntax, EnumDeclarationSyntax,
     * NamespaceDeclarationSyntax, ParameterSyntax, TypeParameterSyntax, or the alias part of a
     * UsingDirectiveSyntax
     * @param cancellationToken The cancellation token.
     */
    getDeclaredSymbol(declaration: ModuleDeclarationSyntax, cancellationToken: ICancellationToken): IModuleSymbol;
    /**
     * Gets the symbol associated with a declaration syntax node. Returns the symbol declared by the node or null if the node is not a declaration.
     * @param declaration A syntax node that is a declaration. This can be any type
     * derived from MemberDeclarationSyntax, TypeDeclarationSyntax, EnumDeclarationSyntax,
     * NamespaceDeclarationSyntax, ParameterSyntax, TypeParameterSyntax, or the alias part of a
     * UsingDirectiveSyntax
     * @param cancellationToken The cancellation token.
     */
    getDeclaredSymbol(declaration: SourceUnitSyntax, cancellationToken: ICancellationToken): IModuleSymbol;
    /**
     * Gets the symbol associated with a declaration syntax node. Returns the symbol declared by the node or null if the node is not a declaration.
     * @param declaration A syntax node that is a declaration. This can be any type
     * derived from MemberDeclarationSyntax, TypeDeclarationSyntax, EnumDeclarationSyntax,
     * NamespaceDeclarationSyntax, ParameterSyntax, TypeParameterSyntax, or the alias part of a
     * UsingDirectiveSyntax
     * @param cancellationToken The cancellation token.
     */
    getDeclaredSymbol(declaration: ClassDeclarationSyntax, cancellationToken: ICancellationToken): IObjectTypeSymbol;
    /**
     * Gets the symbol associated with a declaration syntax node. Returns the symbol declared by the node or null if the node is not a declaration.
     * @param declaration A syntax node that is a declaration. This can be any type
     * derived from MemberDeclarationSyntax, TypeDeclarationSyntax, EnumDeclarationSyntax,
     * NamespaceDeclarationSyntax, ParameterSyntax, TypeParameterSyntax, or the alias part of a
     * UsingDirectiveSyntax
     * @param cancellationToken The cancellation token.
     */
    getDeclaredSymbol(declaration: InterfaceDeclarationSyntax, cancellationToken: ICancellationToken): IObjectTypeSymbol;
    /**
     * Gets the symbol associated with a declaration syntax node. Returns the symbol declared by the node or null if the node is not a declaration.
     * @param declaration A syntax node that is a declaration. This can be any type
     * derived from MemberDeclarationSyntax, TypeDeclarationSyntax, EnumDeclarationSyntax,
     * NamespaceDeclarationSyntax, ParameterSyntax, TypeParameterSyntax, or the alias part of a
     * UsingDirectiveSyntax
     * @param cancellationToken The cancellation token.
     */
    getDeclaredSymbol(declaration: EnumDeclarationSyntax, cancellationToken: ICancellationToken): IObjectTypeSymbol;
    /**
     * Gets the symbol associated with a declaration syntax node. Returns the symbol declared by the node or null if the node is not a declaration.
     * @param declaration A syntax node that is a declaration. This can be any type
     * derived from MemberDeclarationSyntax, TypeDeclarationSyntax, EnumDeclarationSyntax,
     * NamespaceDeclarationSyntax, ParameterSyntax, TypeParameterSyntax, or the alias part of a
     * UsingDirectiveSyntax
     * @param cancellationToken The cancellation token.
     */
    getDeclaredSymbol(declarator: VariableDeclaratorSyntax, cancellationToken: ICancellationToken): IVariableSymbol;
    
    // TODO: add more getDeclaredSymbol overloads.

    /**
     * Gets the list of available named symbols in the context of the specified location and optional container. 
     * Only symbols that are accessible and visible from the given location are returned, if no symbols were found, an empty list is returned. 
     * The "position" is used to determine what variables are visible and accessible. Even if "container" is
     * specified, the "position" location is significant for determining which members of "containing" are
     * accessible. 
     * @param position The character position for determining the enclosing declaration scope and
     * accessibility.
     */
    lookupSymbols(position: number): ISymbol[];
    /**
     * Gets the list of available named symbols in the context of the specified location and optional container. 
     * Only symbols that are accessible and visible from the given location are returned, if no symbols were found, an empty list is returned. 
     * The "position" is used to determine what variables are visible and accessible. Even if "container" is
     * specified, the "position" location is significant for determining which members of "containing" are
     * accessible. 
     * @param position The character position for determining the enclosing declaration scope and
     * accessibility.
     * @param container The container to search for symbols within. If null then the enclosing declaration
     * scope around position is used.
     */
    lookupSymbols(position: number, container: IModuleOrTypeSymbol): ISymbol[];
    /**
     * Gets the list of available named symbols in the context of the specified location and optional container. 
     * Only symbols that are accessible and visible from the given location are returned, if no symbols were found, an empty list is returned. 
     * The "position" is used to determine what variables are visible and accessible. Even if "container" is
     * specified, the "position" location is significant for determining which members of "containing" are
     * accessible. 
     * @param position The character position for determining the enclosing declaration scope and
     * accessibility.
     * @param container The container to search for symbols within. If null then the enclosing declaration
     * scope around position is used.
     * @param name The name of the symbol to find. If null is specified then symbols
     * with any names are returned.
     */
    lookupSymbols(position: number, container: IModuleOrTypeSymbol, name: string): ISymbol[];
    /**
     * Gets the list of available named symbols in the context of the specified location and optional container. 
     * Only symbols that are accessible and visible from the given location are returned, if no symbols were found, an empty list is returned. 
     * The "position" is used to determine what variables are visible and accessible. Even if "container" is
     * specified, the "position" location is significant for determining which members of "containing" are
     * accessible. 
     * @param position The character position for determining the enclosing declaration scope and
     * accessibility.
     * @param container The container to search for symbols within. If null then the enclosing declaration
     * scope around position is used.
     * @param name The name of the symbol to find. If null is specified then symbols
     * with any names are returned.
     * @param arity The number of generic type parameters the symbol has. If null is specified then symbols
     * with any arity are returned.
     */
    lookupSymbols(position: number, container: IModuleOrTypeSymbol, name: string, arity: number): ISymbol[];
    /**
     * Gets the list of available named symbols in the context of the specified location and optional container. 
     * Only symbols that are accessible and visible from the given location are returned, if no symbols were found, an empty list is returned. 
     * The "position" is used to determine what variables are visible and accessible. Even if "container" is
     * specified, the "position" location is significant for determining which members of "containing" are
     * accessible. 
     * @param position The character position for determining the enclosing declaration scope and
     * accessibility.
     * @param container The container to search for symbols within. If null then the enclosing declaration
     * scope around position is used.
     * @param name The name of the symbol to find. If null is specified then symbols
     * with any names are returned.
     * @param arity The number of generic type parameters the symbol has. If null is specified then symbols
     * with any arity are returned.
     * @param options Additional options that affect the lookup process.
     */
    lookupSymbols(position: number, container: IModuleOrTypeSymbol, name: string, arity: number, options: LookupOptions): ISymbol[];

    getMethodGroup(node: SyntaxNode, cancellationToken: ICancellationToken): ISymbol[];

    /**
     * Given a position in the SyntaxTree for this ISemanticModel returns the innermost ISymbol
     * that the position is considered inside of.
     */
    getEnclosingSymbol(position: number, cancellationToken: ICancellationToken): ISymbol;

    /**
     * Determines if the symbol is accessible from the specified location. Returns true if "symbol is accessible, false otherwise.
     * @param position A character position used to identify a declaration scope and
     * accessibility. This character position must be within the FullSpan of the Root syntax
     * node in this SemanticModel.
     * @param symbol The symbol that we are checking to see if it accessible.
    */
    isAccessible(position: number, symbol: ISymbol): boolean;
}