// ==ORIGINAL==
import { abc, Abc } from 'b';
import { I, M, R } from 'a';
const x = abc + Abc + I + M + R;
// ==ORGANIZED==
import { I, M, R } from 'a';
import { abc, Abc } from 'b';
const x = abc + Abc + I + M + R;