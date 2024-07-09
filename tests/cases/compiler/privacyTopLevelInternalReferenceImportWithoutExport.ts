//@module: amd
//@declaration: true

// private elements
module m_private {
    export class c_private {
    }
    export enum e_private {
        Happy,
        Grumpy
    }
    export function f_private() {
        return new c_private();
    }
    export var v_private = new c_private();
    export interface i_private {
    }
    export module mi_private {
        export class c {
        }
    }
    export module mu_private {
        export interface i {
        }
    }
}

// Public elements
export module m_public {
    export class c_public {
    }
    export enum e_public {
        Happy,
        Grumpy
    }
    export function f_public() {
        return new c_public();
    }
    export var v_public = 10;
    export interface i_public {
    }
    export module mi_public {
        export class c {
        }
    }
    export module mu_public {
        export interface i {
        }
    }
}

// No Privacy errors - importing private elements
import im_private_c_private = m_private.c_private;
import im_private_e_private = m_private.e_private;
import im_private_f_private = m_private.f_private;
import im_private_v_private = m_private.v_private;
import im_private_i_private = m_private.i_private;
import im_private_mi_private = m_private.mi_private;
import im_private_mu_private = m_private.mu_private;

// Usage of above decls
var privateUse_im_private_c_private = new im_private_c_private();
export var publicUse_im_private_c_private = new im_private_c_private();
var privateUse_im_private_e_private = im_private_e_private.Happy;
export var publicUse_im_private_e_private = im_private_e_private.Grumpy;
var privateUse_im_private_f_private = im_private_f_private();
export var publicUse_im_private_f_private = im_private_f_private();
var privateUse_im_private_v_private = im_private_v_private;
export var publicUse_im_private_v_private = im_private_v_private;
var privateUse_im_private_i_private: im_private_i_private;
export var publicUse_im_private_i_private: im_private_i_private;
var privateUse_im_private_mi_private = new im_private_mi_private.c();
export var publicUse_im_private_mi_private = new im_private_mi_private.c();
var privateUse_im_private_mu_private: im_private_mu_private.i;
export var publicUse_im_private_mu_private: im_private_mu_private.i;


// No Privacy errors - importing public elements
import im_private_c_public = m_public.c_public;
import im_private_e_public = m_public.e_public;
import im_private_f_public = m_public.f_public;
import im_private_v_public = m_public.v_public;
import im_private_i_public = m_public.i_public;
import im_private_mi_public = m_public.mi_public;
import im_private_mu_public = m_public.mu_public;

// Usage of above decls
var privateUse_im_private_c_public = new im_private_c_public();
export var publicUse_im_private_c_public = new im_private_c_public();
var privateUse_im_private_e_public = im_private_e_public.Happy;
export var publicUse_im_private_e_public = im_private_e_public.Grumpy;
var privateUse_im_private_f_public = im_private_f_public();
export var publicUse_im_private_f_public = im_private_f_public();
var privateUse_im_private_v_public = im_private_v_public;
export var publicUse_im_private_v_public = im_private_v_public;
var privateUse_im_private_i_public: im_private_i_public;
export var publicUse_im_private_i_public: im_private_i_public;
var privateUse_im_private_mi_public = new im_private_mi_public.c();
export var publicUse_im_private_mi_public = new im_private_mi_public.c();
var privateUse_im_private_mu_public: im_private_mu_public.i;
export var publicUse_im_private_mu_public: im_private_mu_public.i;
