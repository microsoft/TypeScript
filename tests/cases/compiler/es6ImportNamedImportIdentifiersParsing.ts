// @target: es6

import { yield } from "somemodule"; // Allowed
import { default } from "somemodule"; // Error - as this is keyword that is not allowed as identifier
import { yield as default } from "somemodule"; // error to use default as binding name
import { default as yield } from "somemodule"; // no error 
import { default as default } from "somemodule"; // default as is ok, error of default binding name