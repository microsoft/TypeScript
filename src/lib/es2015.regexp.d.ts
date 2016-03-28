interface RegExp {
    /**
      * Returns a string indicating the flags of the regular expression in question. This field is read-only.
      * The characters in this string are sequenced and concatenated in the following order:
      *
      *    - "g" for global
      *    - "i" for ignoreCase
      *    - "m" for multiline
      *    - "u" for unicode
      *    - "y" for sticky
      *
      * If no flags are set, the value is the empty string.
      */
    readonly flags: string;

    /** 
      * Returns a Boolean value indicating the state of the sticky flag (y) used with a regular 
      * expression. Default is false. Read-only. 
      */
    readonly sticky: boolean;

    /** 
      * Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular 
      * expression. Default is false. Read-only. 
      */
    readonly unicode: boolean;
}
