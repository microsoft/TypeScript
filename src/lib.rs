#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

const UNDERSCORE: char = '_';

/** Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__' */
#[napi(js_name = "escapeLeadingUnderscores", ts_return_type = "__String")]
pub fn escape_leading_underscores(identifier: String) -> String {
    if identifier.len() >= 2 && identifier.chars().nth(0).unwrap() == UNDERSCORE && identifier.chars().nth(1).unwrap() == UNDERSCORE {
        return UNDERSCORE.to_string() + &identifier;
    }
    return identifier
}

/**
* Remove extra underscore from escaped identifier text content.
*
* @param identifier The escaped identifier text.
* @returns The unescaped identifier text.
*/
#[napi(js_name = "unescapeLeadingUnderscores", ts_args_type="identifier: __String")]
pub fn unescape_leading_underscores(mut identifier: String) -> String {
        if identifier.len() >= 3 && identifier.chars().nth(0).unwrap() == UNDERSCORE && identifier.chars().nth(1).unwrap() == UNDERSCORE && identifier.chars().nth(2).unwrap() == UNDERSCORE {
            identifier.remove(0);
            return identifier;
        }
        return identifier
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_escape_leading_underscores() {
        assert_eq!(escape_leading_underscores("_".to_string()), "_".to_string());
        assert_eq!(escape_leading_underscores("__".to_string()), "___".to_string());
        assert_eq!(escape_leading_underscores("___".to_string()), "____".to_string());
        assert_eq!(escape_leading_underscores("____".to_string()), "_____".to_string());
        assert_eq!(escape_leading_underscores("_proto_".to_string()), "_proto_".to_string());
        assert_eq!(escape_leading_underscores("__proto__".to_string()), "___proto__".to_string());
        assert_eq!(escape_leading_underscores("___proto__".to_string()), "____proto__".to_string());
        assert_eq!(escape_leading_underscores("____proto__".to_string()), "_____proto__".to_string());
    }

    #[test]
    fn test_unescape_leading_underscores() {
        assert_eq!(unescape_leading_underscores("_".to_string()), "_".to_string());
        assert_eq!(unescape_leading_underscores("__".to_string()), "__".to_string());
        assert_eq!(unescape_leading_underscores("___".to_string()), "__".to_string());
        assert_eq!(unescape_leading_underscores("____".to_string()), "___".to_string());
        assert_eq!(unescape_leading_underscores("_proto_".to_string()), "_proto_".to_string());
        assert_eq!(unescape_leading_underscores("__proto__".to_string()), "__proto__".to_string());
        assert_eq!(unescape_leading_underscores("___proto__".to_string()), "__proto__".to_string());
        assert_eq!(unescape_leading_underscores("____proto__".to_string()), "___proto__".to_string());
    }
}
