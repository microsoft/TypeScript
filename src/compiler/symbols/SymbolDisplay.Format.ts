
module SymbolDisplay {
    /**
     * Specifies the options for whether types are qualified when displayed in the description of a symbol.
     */
    export enum TypeQualificationStyle {
        /**
         * e.g. Class1
         */
        NameOnly,

        /**
         * ParentClass.NestedClass
         */
        NameAndContainingModules,
    }

    export enum TypeOptions {
        None = 0,
        InlineAnonymousTypes = 1 << 0,
    }

    export enum GenericsOptions {
        /**
         * Omit generics entirely.
         */
        None = 0,

        /**
         * Type parameters. e.g. "Foo&lt;T&gt;".
         */
        IncludeTypeArguments = 1 << 0,

        /**
         * Type parameter constraints.  e.g. "<T extends Foo>".
         */
        IncludeTypeConstraints = 1 << 1,
    }

    /**
     * Specifies the options for how members are displayed in the description of a symbol.
     */
    export enum MemberOptions {
        /**
         * Display only the name of the member.
         */
        None = 0,

        /**
         * Include the (return) type of the method/field/property.
         */
        IncludeType = 1 << 0,

        /**
         * Include modifiers.  e.g. "static"
         */
        IncludeModifiers = 1 << 1,

        /**
         * Include accessibility.  e.g. "public"
         */
        IncludeAccessibility = 1 << 2,

        /**
         * Include method/indexer parameters.  (See ParameterFlags for fine-grained settings.)
         */
        IncludeParameters = 1 << 4,

        /**
         * Include the name of the containing type.
         */
        IncludeContainingType = 1 << 5,

        /**
         * Include the value of the member if is a constant.
         */
        IncludeConstantValue = 1 << 6,
    }

    /**
     * Specifies the options for how parameters are displayed in the description of a symbol.
     */
    export enum ParameterOptions {
        /**
         * If MemberFlags.IncludeParameters is set, but this value is used, then only the parentheses will be shown
         * (e.g. M()).
         */
        None = 0,

        /**
         * Include the params/public/.../etc. parameters.
         */
        IncludeModifiers = 1 << 1,

        /**
         * Include the parameter type.
         */
        IncludeType = 1 << 2,

        /**
         * Include the parameter name.
         */
        IncludeName = 1 << 3,

        /**
         * Include the parameter default value.
         */
        IncludeDefaultValue = 1 << 4,
    }

    /**
     * Specifies the options for how property/event accessors are displayed in the description of a symbol.
     */
    export enum AccessorStyle {
        /**
         * Only show the name of the property (formatted using MemberFlags).
         */
        NameOnly,

        /**
         * Show the getter and/or setter of the property.
         */
        ShowAccessors,
    }

    /**
     * Specifies the options for how locals are displayed in the description of a symbol.
     */
    export enum LocalOptions {
        /**
         * Only show the name of the local. (e.g. "x").
         */
        None = 0,

        /**
         * Include the type of the local. (e.g. "x : number").
         */
        IncludeType = 1 << 0,

        /**
         * Include the value of the local if is a constant. (e.g. "x : number = 1").
         */
        IncludeConstantValue = 1 << 1,
    }

    /**
     * Specifies the options for whether the type's kind should be displayed in the description of a symbol.
     */
    export enum KindOptions {
        /**
         * None
         */
        None = 0,

        /**
         * Use the type's kind.  e.g. "class M1.C1" instead of "M1.C1"
         */
        IncludeKind = 1 << 0,
    }

    export class Format {
        /**
         * Determines how types are qualified (e.g. Nested vs Containing.Nested vs Namespace.Containing.Nested).
         */
        private _typeQualificationStyle: TypeQualificationStyle;

        private _typeOptions: TypeOptions;

        /**
         * Determines how generics (on types and methods) should be described (i.e. level of detail).
         */
        private _genericsOptions: GenericsOptions;

        /**
         * Formatting options that apply to fields, properties, and methods.
         */
        private _memberOptions: MemberOptions;

        /**
         * Formatting options that apply to method and indexer parameters (i.e. level of detail).
         */
        private _parameterOptions: ParameterOptions;

        /**
         * Determines how properties are displayed. "Prop" vs "Prop { get; set; }"
         */
        private _accessorStyle: AccessorStyle;

        /**
         * Determines how local variables are displayed.
         */
        private _localOptions: LocalOptions;

        /**
         * Formatting options that apply to types.
         */
        private _kindOptions: KindOptions;

        constructor(typeQualificationStyle: TypeQualificationStyle = TypeQualificationStyle.NameOnly,
            typeOptions: TypeOptions = TypeOptions.None,
            genericsOptions: GenericsOptions = GenericsOptions.None,
            memberOptions: MemberOptions = MemberOptions.None,
            parameterOptions: ParameterOptions = ParameterOptions.None,
            accessorStyle: AccessorStyle = AccessorStyle.NameOnly,
            localOptions: LocalOptions = LocalOptions.None,
            kindOptions: KindOptions = KindOptions.None) {
            this._typeQualificationStyle = typeQualificationStyle;
            this._typeOptions = typeOptions;
            this._genericsOptions = genericsOptions;
            this._memberOptions = memberOptions;
            this._parameterOptions = parameterOptions;
            this._accessorStyle = accessorStyle;
            this._localOptions = localOptions;
            this._kindOptions = kindOptions;
        }

        public typeQualificationStyle(): TypeQualificationStyle {
            return this._typeQualificationStyle;
        }

        public typeOptions(): TypeOptions {
            return this._typeOptions;
        }

        public genericsOptions(): GenericsOptions {
            return this._genericsOptions;
        }

        public memberOptions(): MemberOptions {
            return this._memberOptions;
        }
    }

    export var errorMessageFormat: Format =
        new Format(
            TypeQualificationStyle.NameAndContainingModules,
            TypeOptions.InlineAnonymousTypes,
            GenericsOptions.IncludeTypeArguments,
            MemberOptions.IncludeParameters | MemberOptions.IncludeContainingType,
            ParameterOptions.IncludeModifiers | ParameterOptions.IncludeType,
            AccessorStyle.NameOnly);

    /**
     * Fully qualified name format.
     */
    //export var fullyQualifiedFormat: Format =
    //    new Format(
    //        TypeQualificationStyle.NameAndContainingModules,
    //        GenericsOptions.IncludeTypeParameters);

    /**
     * Format used by default when asking to minimally qualify a symbol.
     */
    export var minimallyQualifiedFormat: Format =
        new Format(
            TypeQualificationStyle.NameOnly,
            TypeOptions.None,
            GenericsOptions.IncludeTypeArguments,
            MemberOptions.IncludeParameters | MemberOptions.IncludeType | MemberOptions.IncludeContainingType,
            ParameterOptions.IncludeName | ParameterOptions.IncludeType | ParameterOptions.IncludeModifiers | ParameterOptions.IncludeDefaultValue,
            AccessorStyle.NameOnly,
            LocalOptions.IncludeType);
}