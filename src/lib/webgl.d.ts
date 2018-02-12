/**
 * Strict .d.ts for WebGLRenderingContext, manually written from the spec.
 *
 * The [SharedArrayBuffer] attribute indicates that the view can be backed by a SharedArrayBuffer.
 * By default, ArrayBufferView parameters can not be a view of a SharedArrayBuffer, and will throw an exception in that case.
 */

type GLboolean = boolean; // WebIDL: boolean
type GLbitfield = number; // WebIDL: unsigned long
type GLbyte = number; // WebIDL: byte                   /* 'byte' should be a signed 8 bit type. */
type GLshort = number; // WebIDL: short
type GLint = number; // WebIDL: long
type GLsizei = number; // WebIDL: long
type GLintptr = number; // WebIDL: long long
type GLsizeiptr = number; // WebIDL: long long
type GLubyte = number; // ideally unsigned byte. WebIDL: octet /* 'octet' should be an unsigned 8 bit type. */
type GLushort = number; // WebIDL: unsigned short
type GLuint = number; // WebIDL: unsigned long
type GLfloat = number; // WebIDL: unrestricted float
type GLclampf = number; // WebIDL: unrestricted float
type DOMString = string

type Nullable<T> = T | undefined | null
type sequence<T> = T[]

// The power preference settings are documented in the WebGLContextAttributes
// section of the specification.
type WebGLPowerPreference = "default" | "low-power" | "high-performance"

interface WebGLContextAttributes {
	alpha: GLboolean // = true
	depth: GLboolean // = true
	stencil: GLboolean // = false
	antialias: GLboolean // = true
	premultipliedAlpha: GLboolean // = true
	preserveDrawingBuffer: GLboolean // = false
	powerPreference: WebGLPowerPreference // = "default"
	failIfMajorPerformanceCaveat: GLboolean // = false
}

interface WebGLObject {
	__WebGLObjectBrand: string
}

interface WebGLBuffer extends WebGLObject {
	__WebGLObjectBrand: 'WebGLBuffer'
}
declare var WebGLBuffer: {
	prototype: WebGLBuffer
	new(_: never): WebGLBuffer
}

interface WebGLFramebuffer extends WebGLObject {
	__WebGLObjectBrand: 'WebGLFramebuffer'
}
declare var WebGLFramebuffer: {
	prototype: WebGLFramebuffer
	new(_: never): WebGLFramebuffer
}

interface WebGLProgram extends WebGLObject {
	__WebGLObjectBrand: 'WebGLProgram'
}
declare var WebGLProgram: {
	prototype: WebGLProgram
	new(_: never): WebGLProgram
}

interface WebGLRenderbuffer extends WebGLObject {
	__WebGLObjectBrand: 'WebGLRenderbuffer'
}
declare var WebGLRenderbuffer: {
	prototype: WebGLRenderbuffer
	new(_: never): WebGLRenderbuffer
}

interface WebGLShader extends WebGLObject {
	__WebGLObjectBrand: 'WebGLShader'
}
declare var WebGLShader: {
	prototype: WebGLShader
	new(_: never): WebGLShader
}

interface WebGLTexture extends WebGLObject {
	__WebGLObjectBrand: 'WebGLTexture'
}
declare var WebGLTexture: {
	prototype: WebGLTexture
	new(_: never): WebGLTexture
}

interface WebGLUniformLocation {
	__WebGLObjectBrand: 'WebGLUniformLocation'
}
declare var WebGLUniformLocation: {
	prototype: WebGLUniformLocation
	new(_: never): WebGLUniformLocation
}

interface WebGLActiveInfo<T = any> {
    readonly size: GLint;
    readonly type: T;
    readonly name: DOMString;
}
declare var WebGLActiveInfo: {
	prototype: WebGLActiveInfo
	new(_: never): WebGLActiveInfo
}

interface WebGLShaderPrecisionFormat {
    readonly rangeMin: GLint;
    readonly rangeMax: GLint;
    readonly precision: GLint;
}

type TexImageSource = ImageBitmap |
         ImageData |
         HTMLImageElement |
         HTMLCanvasElement |
         HTMLVideoElement

type Float32List = (/* [AllowShared] */ Float32Array | sequence<GLfloat>); // WebIDL: ([AllowShared] Float32Array or sequence<GLfloat>)
type Int32List = (/* [AllowShared] */ Int32Array | sequence<GLint>); // WebIDL: ([AllowShared] Int32Array or sequence<GLint>)
// const GLenum (\w+)( +)= (\w+); --> readonly $1:$2GL_CONST<$3, '$1'>;
declare namespace WebGLRenderingContextStrict {
	interface GLConst {
		__brandGlConst: true
	}
	type GLenum<S extends string> = S & GLConst
	interface Constants {
		/* ClearBufferMask: Used as ORed bits, so need to be actual numbers: */
		readonly DEPTH_BUFFER_BIT:                0x00000100;
		readonly STENCIL_BUFFER_BIT:              0x00000400;
		readonly COLOR_BUFFER_BIT:                0x00004000;

		/* BeginMode */
		readonly POINTS:                          /* 0x0000 */ GLenum<'POINTS'>
		readonly LINES:                           /* 0x0001 */ GLenum<'LINES'>
		readonly LINE_LOOP:                       /* 0x0002 */ GLenum<'LINE_LOOP'>
		readonly LINE_STRIP:                      /* 0x0003 */ GLenum<'LINE_STRIP'>
		readonly TRIANGLES:                       /* 0x0004 */ GLenum<'TRIANGLES'>
		readonly TRIANGLE_STRIP:                  /* 0x0005 */ GLenum<'TRIANGLE_STRIP'>
		readonly TRIANGLE_FAN:                    /* 0x0006 */ GLenum<'TRIANGLE_FAN'>

		/* AlphaFunction (not supported in ES20) */
		/*      NEVER */
		/*      LESS */
		/*      EQUAL */
		/*      LEQUAL */
		/*      GREATER */
		/*      NOTEQUAL */
		/*      GEQUAL */
		/*      ALWAYS */

		/* BlendingFactorDest */
		readonly ZERO:                            /* 0 */ GLenum<'ZERO'>
		readonly ONE:                             /* 1 */ GLenum<'ONE'>
		readonly SRC_COLOR:                       /* 0x0300 */ GLenum<'SRC_COLOR'>
		readonly ONE_MINUS_SRC_COLOR:             /* 0x0301 */ GLenum<'ONE_MINUS_SRC_COLOR'>
		readonly SRC_ALPHA:                       /* 0x0302 */ GLenum<'SRC_ALPHA'>
		readonly ONE_MINUS_SRC_ALPHA:             /* 0x0303 */ GLenum<'ONE_MINUS_SRC_ALPHA'>
		readonly DST_ALPHA:                       /* 0x0304 */ GLenum<'DST_ALPHA'>
		readonly ONE_MINUS_DST_ALPHA:             /* 0x0305 */ GLenum<'ONE_MINUS_DST_ALPHA'>

		/* BlendingFactorSrc */
		/*      ZERO */
		/*      ONE */
		readonly DST_COLOR:                       /* 0x0306 */ GLenum<'DST_COLOR'>
		readonly ONE_MINUS_DST_COLOR:             /* 0x0307 */ GLenum<'ONE_MINUS_DST_COLOR'>
		readonly SRC_ALPHA_SATURATE:              /* 0x0308 */ GLenum<'SRC_ALPHA_SATURATE'>
		/*      SRC_ALPHA */
		/*      ONE_MINUS_SRC_ALPHA */
		/*      DST_ALPHA */
		/*      ONE_MINUS_DST_ALPHA */

		/* BlendEquationSeparate */
		readonly FUNC_ADD:                        /* 0x8006 */ GLenum<'FUNC_ADD'>
		readonly BLEND_EQUATION:                  /* 0x8009 */ GLenum<'BLEND_EQUATION'>
		readonly BLEND_EQUATION_RGB:              /* 0x8009 */ GLenum<'BLEND_EQUATION_RGB'>   /* same as BLEND_EQUATION */
		readonly BLEND_EQUATION_ALPHA:            /* 0x883D */ GLenum<'BLEND_EQUATION_ALPHA'>

		/* BlendSubtract */
		readonly FUNC_SUBTRACT:                   /* 0x800A */ GLenum<'FUNC_SUBTRACT'>
		readonly FUNC_REVERSE_SUBTRACT:           /* 0x800B */ GLenum<'FUNC_REVERSE_SUBTRACT'>

		/* Separate Blend Functions */
		readonly BLEND_DST_RGB:                   /* 0x80C8 */ GLenum<'BLEND_DST_RGB'>
		readonly BLEND_SRC_RGB:                   /* 0x80C9 */ GLenum<'BLEND_SRC_RGB'>
		readonly BLEND_DST_ALPHA:                 /* 0x80CA */ GLenum<'BLEND_DST_ALPHA'>
		readonly BLEND_SRC_ALPHA:                 /* 0x80CB */ GLenum<'BLEND_SRC_ALPHA'>
		readonly CONSTANT_COLOR:                  /* 0x8001 */ GLenum<'CONSTANT_COLOR'>
		readonly ONE_MINUS_CONSTANT_COLOR:        /* 0x8002 */ GLenum<'ONE_MINUS_CONSTANT_COLOR'>
		readonly CONSTANT_ALPHA:                  /* 0x8003 */ GLenum<'CONSTANT_ALPHA'>
		readonly ONE_MINUS_CONSTANT_ALPHA:        /* 0x8004 */ GLenum<'ONE_MINUS_CONSTANT_ALPHA'>
		readonly BLEND_COLOR:                     /* 0x8005 */ GLenum<'BLEND_COLOR'>

		/* Buffer Objects */
		readonly ARRAY_BUFFER:                    /* 0x8892 */ GLenum<'ARRAY_BUFFER'>
		readonly ELEMENT_ARRAY_BUFFER:            /* 0x8893 */ GLenum<'ELEMENT_ARRAY_BUFFER'>
		readonly ARRAY_BUFFER_BINDING:            /* 0x8894 */ GLenum<'ARRAY_BUFFER_BINDING'>
		readonly ELEMENT_ARRAY_BUFFER_BINDING:    /* 0x8895 */ GLenum<'ELEMENT_ARRAY_BUFFER_BINDING'>

		readonly STREAM_DRAW:                     /* 0x88E0 */ GLenum<'STREAM_DRAW'>
		readonly STATIC_DRAW:                     /* 0x88E4 */ GLenum<'STATIC_DRAW'>
		readonly DYNAMIC_DRAW:                    /* 0x88E8 */ GLenum<'DYNAMIC_DRAW'>

		readonly BUFFER_SIZE:                     /* 0x8764 */ GLenum<'BUFFER_SIZE'>
		readonly BUFFER_USAGE:                    /* 0x8765 */ GLenum<'BUFFER_USAGE'>

		readonly CURRENT_VERTEX_ATTRIB:           /* 0x8626 */ GLenum<'CURRENT_VERTEX_ATTRIB'>

		/* CullFaceMode */
		readonly FRONT:                           /* 0x0404 */ GLenum<'FRONT'>
		readonly BACK:                            /* 0x0405 */ GLenum<'BACK'>
		readonly FRONT_AND_BACK:                  /* 0x0408 */ GLenum<'FRONT_AND_BACK'>

		/* DepthFunction */
		/*      NEVER */
		/*      LESS */
		/*      EQUAL */
		/*      LEQUAL */
		/*      GREATER */
		/*      NOTEQUAL */
		/*      GEQUAL */
		/*      ALWAYS */

		/* EnableCap */
		/* TEXTURE_2D */
		readonly CULL_FACE:                       /* 0x0B44 */ GLenum<'CULL_FACE'>
		readonly BLEND:                           /* 0x0BE2 */ GLenum<'BLEND'>
		readonly DITHER:                          /* 0x0BD0 */ GLenum<'DITHER'>
		readonly STENCIL_TEST:                    /* 0x0B90 */ GLenum<'STENCIL_TEST'>
		readonly DEPTH_TEST:                      /* 0x0B71 */ GLenum<'DEPTH_TEST'>
		readonly SCISSOR_TEST:                    /* 0x0C11 */ GLenum<'SCISSOR_TEST'>
		readonly POLYGON_OFFSET_FILL:             /* 0x8037 */ GLenum<'POLYGON_OFFSET_FILL'>
		readonly SAMPLE_ALPHA_TO_COVERAGE:        /* 0x809E */ GLenum<'SAMPLE_ALPHA_TO_COVERAGE'>
		readonly SAMPLE_COVERAGE:                 /* 0x80A0 */ GLenum<'SAMPLE_COVERAGE'>

		/* ErrorCode */
		readonly NO_ERROR:                        /* 0 */ GLenum<'NO_ERROR'>
		readonly INVALID_ENUM:                    /* 0x0500 */ GLenum<'INVALID_ENUM'>
		readonly INVALID_VALUE:                   /* 0x0501 */ GLenum<'INVALID_VALUE'>
		readonly INVALID_OPERATION:               /* 0x0502 */ GLenum<'INVALID_OPERATION'>
		readonly OUT_OF_MEMORY:                   /* 0x0505 */ GLenum<'OUT_OF_MEMORY'>

		/* FrontFaceDirection */
		readonly CW:                              /* 0x0900 */ GLenum<'CW'>
		readonly CCW:                             /* 0x0901 */ GLenum<'CCW'>

		/* GetPName */
		readonly LINE_WIDTH:                      /* 0x0B21 */ GLenum<'LINE_WIDTH'>
		readonly ALIASED_POINT_SIZE_RANGE:        /* 0x846D */ GLenum<'ALIASED_POINT_SIZE_RANGE'>
		readonly ALIASED_LINE_WIDTH_RANGE:        /* 0x846E */ GLenum<'ALIASED_LINE_WIDTH_RANGE'>
		readonly CULL_FACE_MODE:                  /* 0x0B45 */ GLenum<'CULL_FACE_MODE'>
		readonly FRONT_FACE:                      /* 0x0B46 */ GLenum<'FRONT_FACE'>
		readonly DEPTH_RANGE:                     /* 0x0B70 */ GLenum<'DEPTH_RANGE'>
		readonly DEPTH_WRITEMASK:                 /* 0x0B72 */ GLenum<'DEPTH_WRITEMASK'>
		readonly DEPTH_CLEAR_VALUE:               /* 0x0B73 */ GLenum<'DEPTH_CLEAR_VALUE'>
		readonly DEPTH_FUNC:                      /* 0x0B74 */ GLenum<'DEPTH_FUNC'>
		readonly STENCIL_CLEAR_VALUE:             /* 0x0B91 */ GLenum<'STENCIL_CLEAR_VALUE'>
		readonly STENCIL_FUNC:                    /* 0x0B92 */ GLenum<'STENCIL_FUNC'>
		readonly STENCIL_FAIL:                    /* 0x0B94 */ GLenum<'STENCIL_FAIL'>
		readonly STENCIL_PASS_DEPTH_FAIL:         /* 0x0B95 */ GLenum<'STENCIL_PASS_DEPTH_FAIL'>
		readonly STENCIL_PASS_DEPTH_PASS:         /* 0x0B96 */ GLenum<'STENCIL_PASS_DEPTH_PASS'>
		readonly STENCIL_REF:                     /* 0x0B97 */ GLenum<'STENCIL_REF'>
		readonly STENCIL_VALUE_MASK:              /* 0x0B93 */ GLenum<'STENCIL_VALUE_MASK'>
		readonly STENCIL_WRITEMASK:               /* 0x0B98 */ GLenum<'STENCIL_WRITEMASK'>
		readonly STENCIL_BACK_FUNC:               /* 0x8800 */ GLenum<'STENCIL_BACK_FUNC'>
		readonly STENCIL_BACK_FAIL:               /* 0x8801 */ GLenum<'STENCIL_BACK_FAIL'>
		readonly STENCIL_BACK_PASS_DEPTH_FAIL:    /* 0x8802 */ GLenum<'STENCIL_BACK_PASS_DEPTH_FAIL'>
		readonly STENCIL_BACK_PASS_DEPTH_PASS:    /* 0x8803 */ GLenum<'STENCIL_BACK_PASS_DEPTH_PASS'>
		readonly STENCIL_BACK_REF:                /* 0x8CA3 */ GLenum<'STENCIL_BACK_REF'>
		readonly STENCIL_BACK_VALUE_MASK:         /* 0x8CA4 */ GLenum<'STENCIL_BACK_VALUE_MASK'>
		readonly STENCIL_BACK_WRITEMASK:          /* 0x8CA5 */ GLenum<'STENCIL_BACK_WRITEMASK'>
		readonly VIEWPORT:                        /* 0x0BA2 */ GLenum<'VIEWPORT'>
		readonly SCISSOR_BOX:                     /* 0x0C10 */ GLenum<'SCISSOR_BOX'>
		/*      SCISSOR_TEST */
		readonly COLOR_CLEAR_VALUE:               /* 0x0C22 */ GLenum<'COLOR_CLEAR_VALUE'>
		readonly COLOR_WRITEMASK:                 /* 0x0C23 */ GLenum<'COLOR_WRITEMASK'>
		readonly UNPACK_ALIGNMENT:                /* 0x0CF5 */ GLenum<'UNPACK_ALIGNMENT'>
		readonly PACK_ALIGNMENT:                  /* 0x0D05 */ GLenum<'PACK_ALIGNMENT'>
		readonly MAX_TEXTURE_SIZE:                /* 0x0D33 */ GLenum<'MAX_TEXTURE_SIZE'>
		readonly MAX_VIEWPORT_DIMS:               /* 0x0D3A */ GLenum<'MAX_VIEWPORT_DIMS'>
		readonly SUBPIXEL_BITS:                   /* 0x0D50 */ GLenum<'SUBPIXEL_BITS'>
		readonly RED_BITS:                        /* 0x0D52 */ GLenum<'RED_BITS'>
		readonly GREEN_BITS:                      /* 0x0D53 */ GLenum<'GREEN_BITS'>
		readonly BLUE_BITS:                       /* 0x0D54 */ GLenum<'BLUE_BITS'>
		readonly ALPHA_BITS:                      /* 0x0D55 */ GLenum<'ALPHA_BITS'>
		readonly DEPTH_BITS:                      /* 0x0D56 */ GLenum<'DEPTH_BITS'>
		readonly STENCIL_BITS:                    /* 0x0D57 */ GLenum<'STENCIL_BITS'>
		readonly POLYGON_OFFSET_UNITS:            /* 0x2A00 */ GLenum<'POLYGON_OFFSET_UNITS'>
		/*      POLYGON_OFFSET_FILL */
		readonly POLYGON_OFFSET_FACTOR:           /* 0x8038 */ GLenum<'POLYGON_OFFSET_FACTOR'>
		readonly TEXTURE_BINDING_2D:              /* 0x8069 */ GLenum<'TEXTURE_BINDING_2D'>
		readonly SAMPLE_BUFFERS:                  /* 0x80A8 */ GLenum<'SAMPLE_BUFFERS'>
		readonly SAMPLES:                         /* 0x80A9 */ GLenum<'SAMPLES'>
		readonly SAMPLE_COVERAGE_VALUE:           /* 0x80AA */ GLenum<'SAMPLE_COVERAGE_VALUE'>
		readonly SAMPLE_COVERAGE_INVERT:          /* 0x80AB */ GLenum<'SAMPLE_COVERAGE_INVERT'>

		/* GetTextureParameter */
		/*      TEXTURE_MAG_FILTER */
		/*      TEXTURE_MIN_FILTER */
		/*      TEXTURE_WRAP_S */
		/*      TEXTURE_WRAP_T */

		readonly COMPRESSED_TEXTURE_FORMATS:      /* 0x86A3 */ GLenum<'COMPRESSED_TEXTURE_FORMATS'>

		/* HintMode */
		readonly DONT_CARE:                       /* 0x1100 */ GLenum<'DONT_CARE'>
		readonly FASTEST:                         /* 0x1101 */ GLenum<'FASTEST'>
		readonly NICEST:                          /* 0x1102 */ GLenum<'NICEST'>

		/* HintTarget */
		readonly GENERATE_MIPMAP_HINT:             /* 0x8192 */ GLenum<'GENERATE_MIPMAP_HINT'>

		/* DataType */
		readonly BYTE:                            /* 0x1400 */ GLenum<'BYTE'>
		readonly UNSIGNED_BYTE:                   /* 0x1401 */ GLenum<'UNSIGNED_BYTE'>
		readonly SHORT:                           /* 0x1402 */ GLenum<'SHORT'>
		readonly UNSIGNED_SHORT:                  /* 0x1403 */ GLenum<'UNSIGNED_SHORT'>
		readonly INT:                             /* 0x1404 */ GLenum<'INT'>
		readonly UNSIGNED_INT:                    /* 0x1405 */ GLenum<'UNSIGNED_INT'>
		readonly FLOAT:                           /* 0x1406 */ GLenum<'FLOAT'>

		/* PixelFormat */
		readonly DEPTH_COMPONENT:                 /* 0x1902 */ GLenum<'DEPTH_COMPONENT'>
		readonly ALPHA:                           /* 0x1906 */ GLenum<'ALPHA'>
		readonly RGB:                             /* 0x1907 */ GLenum<'RGB'>
		readonly RGBA:                            /* 0x1908 */ GLenum<'RGBA'>
		readonly LUMINANCE:                       /* 0x1909 */ GLenum<'LUMINANCE'>
		readonly LUMINANCE_ALPHA:                 /* 0x190A */ GLenum<'LUMINANCE_ALPHA'>

		/* PixelType */
		/*      UNSIGNED_BYTE */
		readonly UNSIGNED_SHORT_4_4_4_4:          /* 0x8033 */ GLenum<'UNSIGNED_SHORT_4_4_4_4'>
		readonly UNSIGNED_SHORT_5_5_5_1:          /* 0x8034 */ GLenum<'UNSIGNED_SHORT_5_5_5_1'>
		readonly UNSIGNED_SHORT_5_6_5:            /* 0x8363 */ GLenum<'UNSIGNED_SHORT_5_6_5'>

		/* Shaders */
		readonly FRAGMENT_SHADER:                   /* 0x8B30 */ GLenum<'FRAGMENT_SHADER'>
		readonly VERTEX_SHADER:                     /* 0x8B31 */ GLenum<'VERTEX_SHADER'>
		readonly MAX_VERTEX_ATTRIBS:                /* 0x8869 */ GLenum<'MAX_VERTEX_ATTRIBS'>
		readonly MAX_VERTEX_UNIFORM_VECTORS:        /* 0x8DFB */ GLenum<'MAX_VERTEX_UNIFORM_VECTORS'>
		readonly MAX_VARYING_VECTORS:               /* 0x8DFC */ GLenum<'MAX_VARYING_VECTORS'>
		readonly MAX_COMBINED_TEXTURE_IMAGE_UNITS:  /* 0x8B4D */ GLenum<'MAX_COMBINED_TEXTURE_IMAGE_UNITS'>
		readonly MAX_VERTEX_TEXTURE_IMAGE_UNITS:    /* 0x8B4C */ GLenum<'MAX_VERTEX_TEXTURE_IMAGE_UNITS'>
		readonly MAX_TEXTURE_IMAGE_UNITS:           /* 0x8872 */ GLenum<'MAX_TEXTURE_IMAGE_UNITS'>
		readonly MAX_FRAGMENT_UNIFORM_VECTORS:      /* 0x8DFD */ GLenum<'MAX_FRAGMENT_UNIFORM_VECTORS'>
		readonly SHADER_TYPE:                       /* 0x8B4F */ GLenum<'SHADER_TYPE'>
		readonly DELETE_STATUS:                     /* 0x8B80 */ GLenum<'DELETE_STATUS'>
		readonly LINK_STATUS:                       /* 0x8B82 */ GLenum<'LINK_STATUS'>
		readonly VALIDATE_STATUS:                   /* 0x8B83 */ GLenum<'VALIDATE_STATUS'>
		readonly ATTACHED_SHADERS:                  /* 0x8B85 */ GLenum<'ATTACHED_SHADERS'>
		readonly ACTIVE_UNIFORMS:                   /* 0x8B86 */ GLenum<'ACTIVE_UNIFORMS'>
		readonly ACTIVE_ATTRIBUTES:                 /* 0x8B89 */ GLenum<'ACTIVE_ATTRIBUTES'>
		readonly SHADING_LANGUAGE_VERSION:          /* 0x8B8C */ GLenum<'SHADING_LANGUAGE_VERSION'>
		readonly CURRENT_PROGRAM:                   /* 0x8B8D */ GLenum<'CURRENT_PROGRAM'>

		/* StencilFunction */
		readonly NEVER:                           /* 0x0200 */ GLenum<'NEVER'>
		readonly LESS:                            /* 0x0201 */ GLenum<'LESS'>
		readonly EQUAL:                           /* 0x0202 */ GLenum<'EQUAL'>
		readonly LEQUAL:                          /* 0x0203 */ GLenum<'LEQUAL'>
		readonly GREATER:                         /* 0x0204 */ GLenum<'GREATER'>
		readonly NOTEQUAL:                        /* 0x0205 */ GLenum<'NOTEQUAL'>
		readonly GEQUAL:                          /* 0x0206 */ GLenum<'GEQUAL'>
		readonly ALWAYS:                          /* 0x0207 */ GLenum<'ALWAYS'>

		/* StencilOp */
		/*      ZERO */
		readonly KEEP:                            /* 0x1E00 */ GLenum<'KEEP'>
		readonly REPLACE:                         /* 0x1E01 */ GLenum<'REPLACE'>
		readonly INCR:                            /* 0x1E02 */ GLenum<'INCR'>
		readonly DECR:                            /* 0x1E03 */ GLenum<'DECR'>
		readonly INVERT:                          /* 0x150A */ GLenum<'INVERT'>
		readonly INCR_WRAP:                       /* 0x8507 */ GLenum<'INCR_WRAP'>
		readonly DECR_WRAP:                       /* 0x8508 */ GLenum<'DECR_WRAP'>

		/* StringName */
		readonly VENDOR:                          /* 0x1F00 */ GLenum<'VENDOR'>
		readonly RENDERER:                        /* 0x1F01 */ GLenum<'RENDERER'>
		readonly VERSION:                         /* 0x1F02 */ GLenum<'VERSION'>

		/* TextureMagFilter */
		readonly NEAREST:                         /* 0x2600 */ GLenum<'NEAREST'>
		readonly LINEAR:                          /* 0x2601 */ GLenum<'LINEAR'>

		/* TextureMinFilter */
		/*      NEAREST */
		/*      LINEAR */
		readonly NEAREST_MIPMAP_NEAREST:          /* 0x2700 */ GLenum<'NEAREST_MIPMAP_NEAREST'>
		readonly LINEAR_MIPMAP_NEAREST:           /* 0x2701 */ GLenum<'LINEAR_MIPMAP_NEAREST'>
		readonly NEAREST_MIPMAP_LINEAR:           /* 0x2702 */ GLenum<'NEAREST_MIPMAP_LINEAR'>
		readonly LINEAR_MIPMAP_LINEAR:            /* 0x2703 */ GLenum<'LINEAR_MIPMAP_LINEAR'>

		/* TextureParameterName */
		readonly TEXTURE_MAG_FILTER:              /* 0x2800 */ GLenum<'TEXTURE_MAG_FILTER'>
		readonly TEXTURE_MIN_FILTER:              /* 0x2801 */ GLenum<'TEXTURE_MIN_FILTER'>
		readonly TEXTURE_WRAP_S:                  /* 0x2802 */ GLenum<'TEXTURE_WRAP_S'>
		readonly TEXTURE_WRAP_T:                  /* 0x2803 */ GLenum<'TEXTURE_WRAP_T'>

		/* TextureTarget */
		readonly TEXTURE_2D:                      /* 0x0DE1 */ GLenum<'TEXTURE_2D'>
		readonly TEXTURE:                         /* 0x1702 */ GLenum<'TEXTURE'>

		readonly TEXTURE_CUBE_MAP:                /* 0x8513 */ GLenum<'TEXTURE_CUBE_MAP'>
		readonly TEXTURE_BINDING_CUBE_MAP:        /* 0x8514 */ GLenum<'TEXTURE_BINDING_CUBE_MAP'>
		readonly TEXTURE_CUBE_MAP_POSITIVE_X:     /* 0x8515 */ GLenum<'TEXTURE_CUBE_MAP_POSITIVE_X'>
		readonly TEXTURE_CUBE_MAP_NEGATIVE_X:     /* 0x8516 */ GLenum<'TEXTURE_CUBE_MAP_NEGATIVE_X'>
		readonly TEXTURE_CUBE_MAP_POSITIVE_Y:     /* 0x8517 */ GLenum<'TEXTURE_CUBE_MAP_POSITIVE_Y'>
		readonly TEXTURE_CUBE_MAP_NEGATIVE_Y:     /* 0x8518 */ GLenum<'TEXTURE_CUBE_MAP_NEGATIVE_Y'>
		readonly TEXTURE_CUBE_MAP_POSITIVE_Z:     /* 0x8519 */ GLenum<'TEXTURE_CUBE_MAP_POSITIVE_Z'>
		readonly TEXTURE_CUBE_MAP_NEGATIVE_Z:     /* 0x851A */ GLenum<'TEXTURE_CUBE_MAP_NEGATIVE_Z'>
		readonly MAX_CUBE_MAP_TEXTURE_SIZE:       /* 0x851C */ GLenum<'MAX_CUBE_MAP_TEXTURE_SIZE'>

		/* TextureUnit */
		readonly TEXTURE0:                        /* 0x84C0 */ GLenum<'TEXTURE0'>
		readonly TEXTURE1:                        /* 0x84C1 */ GLenum<'TEXTURE1'>
		readonly TEXTURE2:                        /* 0x84C2 */ GLenum<'TEXTURE2'>
		readonly TEXTURE3:                        /* 0x84C3 */ GLenum<'TEXTURE3'>
		readonly TEXTURE4:                        /* 0x84C4 */ GLenum<'TEXTURE4'>
		readonly TEXTURE5:                        /* 0x84C5 */ GLenum<'TEXTURE5'>
		readonly TEXTURE6:                        /* 0x84C6 */ GLenum<'TEXTURE6'>
		readonly TEXTURE7:                        /* 0x84C7 */ GLenum<'TEXTURE7'>
		readonly TEXTURE8:                        /* 0x84C8 */ GLenum<'TEXTURE8'>
		readonly TEXTURE9:                        /* 0x84C9 */ GLenum<'TEXTURE9'>
		readonly TEXTURE10:                       /* 0x84CA */ GLenum<'TEXTURE10'>
		readonly TEXTURE11:                       /* 0x84CB */ GLenum<'TEXTURE11'>
		readonly TEXTURE12:                       /* 0x84CC */ GLenum<'TEXTURE12'>
		readonly TEXTURE13:                       /* 0x84CD */ GLenum<'TEXTURE13'>
		readonly TEXTURE14:                       /* 0x84CE */ GLenum<'TEXTURE14'>
		readonly TEXTURE15:                       /* 0x84CF */ GLenum<'TEXTURE15'>
		readonly TEXTURE16:                       /* 0x84D0 */ GLenum<'TEXTURE16'>
		readonly TEXTURE17:                       /* 0x84D1 */ GLenum<'TEXTURE17'>
		readonly TEXTURE18:                       /* 0x84D2 */ GLenum<'TEXTURE18'>
		readonly TEXTURE19:                       /* 0x84D3 */ GLenum<'TEXTURE19'>
		readonly TEXTURE20:                       /* 0x84D4 */ GLenum<'TEXTURE20'>
		readonly TEXTURE21:                       /* 0x84D5 */ GLenum<'TEXTURE21'>
		readonly TEXTURE22:                       /* 0x84D6 */ GLenum<'TEXTURE22'>
		readonly TEXTURE23:                       /* 0x84D7 */ GLenum<'TEXTURE23'>
		readonly TEXTURE24:                       /* 0x84D8 */ GLenum<'TEXTURE24'>
		readonly TEXTURE25:                       /* 0x84D9 */ GLenum<'TEXTURE25'>
		readonly TEXTURE26:                       /* 0x84DA */ GLenum<'TEXTURE26'>
		readonly TEXTURE27:                       /* 0x84DB */ GLenum<'TEXTURE27'>
		readonly TEXTURE28:                       /* 0x84DC */ GLenum<'TEXTURE28'>
		readonly TEXTURE29:                       /* 0x84DD */ GLenum<'TEXTURE29'>
		readonly TEXTURE30:                       /* 0x84DE */ GLenum<'TEXTURE30'>
		readonly TEXTURE31:                       /* 0x84DF */ GLenum<'TEXTURE31'>
		readonly ACTIVE_TEXTURE:                  /* 0x84E0 */ GLenum<'ACTIVE_TEXTURE'>

		/* TextureWrapMode */
		readonly REPEAT:                          /* 0x2901 */ GLenum<'REPEAT'>
		readonly CLAMP_TO_EDGE:                   /* 0x812F */ GLenum<'CLAMP_TO_EDGE'>
		readonly MIRRORED_REPEAT:                 /* 0x8370 */ GLenum<'MIRRORED_REPEAT'>

		/* Uniform Types */
		readonly FLOAT_VEC2:                      /* 0x8B50 */ GLenum<'FLOAT_VEC2'>
		readonly FLOAT_VEC3:                      /* 0x8B51 */ GLenum<'FLOAT_VEC3'>
		readonly FLOAT_VEC4:                      /* 0x8B52 */ GLenum<'FLOAT_VEC4'>
		readonly INT_VEC2:                        /* 0x8B53 */ GLenum<'INT_VEC2'>
		readonly INT_VEC3:                        /* 0x8B54 */ GLenum<'INT_VEC3'>
		readonly INT_VEC4:                        /* 0x8B55 */ GLenum<'INT_VEC4'>
		readonly BOOL:                            /* 0x8B56 */ GLenum<'BOOL'>
		readonly BOOL_VEC2:                       /* 0x8B57 */ GLenum<'BOOL_VEC2'>
		readonly BOOL_VEC3:                       /* 0x8B58 */ GLenum<'BOOL_VEC3'>
		readonly BOOL_VEC4:                       /* 0x8B59 */ GLenum<'BOOL_VEC4'>
		readonly FLOAT_MAT2:                      /* 0x8B5A */ GLenum<'FLOAT_MAT2'>
		readonly FLOAT_MAT3:                      /* 0x8B5B */ GLenum<'FLOAT_MAT3'>
		readonly FLOAT_MAT4:                      /* 0x8B5C */ GLenum<'FLOAT_MAT4'>
		readonly SAMPLER_2D:                      /* 0x8B5E */ GLenum<'SAMPLER_2D'>
		readonly SAMPLER_CUBE:                    /* 0x8B60 */ GLenum<'SAMPLER_CUBE'>

		/* Vertex Arrays */
		readonly VERTEX_ATTRIB_ARRAY_ENABLED:         /* 0x8622 */ GLenum<'VERTEX_ATTRIB_ARRAY_ENABLED'>
		readonly VERTEX_ATTRIB_ARRAY_SIZE:            /* 0x8623 */ GLenum<'VERTEX_ATTRIB_ARRAY_SIZE'>
		readonly VERTEX_ATTRIB_ARRAY_STRIDE:          /* 0x8624 */ GLenum<'VERTEX_ATTRIB_ARRAY_STRIDE'>
		readonly VERTEX_ATTRIB_ARRAY_TYPE:            /* 0x8625 */ GLenum<'VERTEX_ATTRIB_ARRAY_TYPE'>
		readonly VERTEX_ATTRIB_ARRAY_NORMALIZED:      /* 0x886A */ GLenum<'VERTEX_ATTRIB_ARRAY_NORMALIZED'>
		readonly VERTEX_ATTRIB_ARRAY_POINTER:         /* 0x8645 */ GLenum<'VERTEX_ATTRIB_ARRAY_POINTER'>
		readonly VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:  /* 0x889F */ GLenum<'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING'>

		/* Read Format */
		readonly IMPLEMENTATION_COLOR_READ_TYPE:    /* 0x8B9A */ GLenum<'IMPLEMENTATION_COLOR_READ_TYPE'>
		readonly IMPLEMENTATION_COLOR_READ_FORMAT:  /* 0x8B9B */ GLenum<'IMPLEMENTATION_COLOR_READ_FORMAT'>

		/* Shader Source */
		readonly COMPILE_STATUS:                  /* 0x8B81 */ GLenum<'COMPILE_STATUS'>

		/* Shader Precision-Specified Types */
		readonly LOW_FLOAT:                       /* 0x8DF0 */ GLenum<'LOW_FLOAT'>
		readonly MEDIUM_FLOAT:                    /* 0x8DF1 */ GLenum<'MEDIUM_FLOAT'>
		readonly HIGH_FLOAT:                      /* 0x8DF2 */ GLenum<'HIGH_FLOAT'>
		readonly LOW_INT:                         /* 0x8DF3 */ GLenum<'LOW_INT'>
		readonly MEDIUM_INT:                      /* 0x8DF4 */ GLenum<'MEDIUM_INT'>
		readonly HIGH_INT:                        /* 0x8DF5 */ GLenum<'HIGH_INT'>

		/* Framebuffer Object. */
		readonly FRAMEBUFFER:                     /* 0x8D40 */ GLenum<'FRAMEBUFFER'>
		readonly RENDERBUFFER:                    /* 0x8D41 */ GLenum<'RENDERBUFFER'>

		readonly RGBA4:                           /* 0x8056 */ GLenum<'RGBA4'>
		readonly RGB5_A1:                         /* 0x8057 */ GLenum<'RGB5_A1'>
		readonly RGB565:                          /* 0x8D62 */ GLenum<'RGB565'>
		readonly DEPTH_COMPONENT16:               /* 0x81A5 */ GLenum<'DEPTH_COMPONENT16'>
		readonly STENCIL_INDEX8:                  /* 0x8D48 */ GLenum<'STENCIL_INDEX8'>
		readonly DEPTH_STENCIL:                   /* 0x84F9 */ GLenum<'DEPTH_STENCIL'>

		readonly RENDERBUFFER_WIDTH:              /* 0x8D42 */ GLenum<'RENDERBUFFER_WIDTH'>
		readonly RENDERBUFFER_HEIGHT:             /* 0x8D43 */ GLenum<'RENDERBUFFER_HEIGHT'>
		readonly RENDERBUFFER_INTERNAL_FORMAT:    /* 0x8D44 */ GLenum<'RENDERBUFFER_INTERNAL_FORMAT'>
		readonly RENDERBUFFER_RED_SIZE:           /* 0x8D50 */ GLenum<'RENDERBUFFER_RED_SIZE'>
		readonly RENDERBUFFER_GREEN_SIZE:         /* 0x8D51 */ GLenum<'RENDERBUFFER_GREEN_SIZE'>
		readonly RENDERBUFFER_BLUE_SIZE:          /* 0x8D52 */ GLenum<'RENDERBUFFER_BLUE_SIZE'>
		readonly RENDERBUFFER_ALPHA_SIZE:         /* 0x8D53 */ GLenum<'RENDERBUFFER_ALPHA_SIZE'>
		readonly RENDERBUFFER_DEPTH_SIZE:         /* 0x8D54 */ GLenum<'RENDERBUFFER_DEPTH_SIZE'>
		readonly RENDERBUFFER_STENCIL_SIZE:       /* 0x8D55 */ GLenum<'RENDERBUFFER_STENCIL_SIZE'>

		readonly FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE:            /* 0x8CD0 */ GLenum<'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE'>
		readonly FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:            /* 0x8CD1 */ GLenum<'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME'>
		readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL:          /* 0x8CD2 */ GLenum<'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL'>
		readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE:  /* 0x8CD3 */ GLenum<'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE'>

		readonly COLOR_ATTACHMENT0:               /* 0x8CE0 */ GLenum<'COLOR_ATTACHMENT0'>
		readonly DEPTH_ATTACHMENT:                /* 0x8D00 */ GLenum<'DEPTH_ATTACHMENT'>
		readonly STENCIL_ATTACHMENT:              /* 0x8D20 */ GLenum<'STENCIL_ATTACHMENT'>
		readonly DEPTH_STENCIL_ATTACHMENT:        /* 0x821A */ GLenum<'DEPTH_STENCIL_ATTACHMENT'>

		readonly NONE:                            /* 0 */ GLenum<'NONE'>

		readonly FRAMEBUFFER_COMPLETE:                       /* 0x8CD5 */ GLenum<'FRAMEBUFFER_COMPLETE'>
		readonly FRAMEBUFFER_INCOMPLETE_ATTACHMENT:          /* 0x8CD6 */ GLenum<'FRAMEBUFFER_INCOMPLETE_ATTACHMENT'>
		readonly FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:  /* 0x8CD7 */ GLenum<'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT'>
		readonly FRAMEBUFFER_INCOMPLETE_DIMENSIONS:          /* 0x8CD9 */ GLenum<'FRAMEBUFFER_INCOMPLETE_DIMENSIONS'>
		readonly FRAMEBUFFER_UNSUPPORTED:                    /* 0x8CDD */ GLenum<'FRAMEBUFFER_UNSUPPORTED'>

		readonly FRAMEBUFFER_BINDING:             /* 0x8CA6 */ GLenum<'FRAMEBUFFER_BINDING'>
		readonly RENDERBUFFER_BINDING:            /* 0x8CA7 */ GLenum<'RENDERBUFFER_BINDING'>
		readonly MAX_RENDERBUFFER_SIZE:           /* 0x84E8 */ GLenum<'MAX_RENDERBUFFER_SIZE'>

		readonly INVALID_FRAMEBUFFER_OPERATION:   /* 0x0506 */ GLenum<'INVALID_FRAMEBUFFER_OPERATION'>

		/* WebGL-specific enums */
		readonly UNPACK_FLIP_Y_WEBGL:             /* 0x9240 */ GLenum<'UNPACK_FLIP_Y_WEBGL'>
		readonly UNPACK_PREMULTIPLY_ALPHA_WEBGL:  /* 0x9241 */ GLenum<'UNPACK_PREMULTIPLY_ALPHA_WEBGL'>
		readonly CONTEXT_LOST_WEBGL:              /* 0x9242 */ GLenum<'CONTEXT_LOST_WEBGL'>
		readonly UNPACK_COLORSPACE_CONVERSION_WEBGL:  /* 0x9243 */ GLenum<'UNPACK_COLORSPACE_CONVERSION_WEBGL'>
		readonly BROWSER_DEFAULT_WEBGL:           /* 0x9244 */ GLenum<'BROWSER_DEFAULT_WEBGL'>
	}
	import GL = WebGLRenderingContextStrict
	interface Base extends Constants {
		readonly canvas: HTMLCanvasElement;
		readonly drawingBufferWidth: GLsizei;
		readonly drawingBufferHeight: GLsizei;

		/* [WebGLHandlesContextLoss] */ getContextAttributes(): WebGLContextAttributes | null;
		/* [WebGLHandlesContextLoss] */ isContextLost(): boolean;

		getExtension(name: 'EXT_texture_filter_anisotropic'): EXT_texture_filter_anisotropic | null
		getExtension(name: 'OES_texture_float_linear'): {} | null
		getExtension(name: 'WEBGL_compressed_texture_astc'): WEBGL_compressed_texture_astc | null
		getExtension(name: 'WEBGL_compressed_texture_atc'): WEBGL_compressed_texture_atc | null
		getExtension(name: 'WEBGL_compressed_texture_etc'): WEBGL_compressed_texture_etc | null
		getExtension(name: 'WEBGL_compressed_texture_etc1'): WEBGL_compressed_texture_etc1 | null
		getExtension(name: 'WEBGL_compressed_texture_pvrtc'): WEBGL_compressed_texture_pvrtc | null
		getExtension(name: 'WEBGL_compressed_texture_s3tc'): WEBGL_compressed_texture_s3tc | null
		getExtension(name: 'WEBGL_compressed_texture_s3tc_srgb'): WEBGL_compressed_texture_s3tc_srgb | null
		getExtension(name: 'WEBGL_debug_renderer_info'): WEBGL_debug_renderer_info | null
		getExtension(name: 'WEBGL_debug_shaders'): WEBGL_debug_shaders | null
		getExtension(name: 'WEBGL_lose_context'): WEBGL_lose_context | null

		getSupportedExtensions(): sequence<DOMString> | null;

		activeTexture(texture: GL.TextureUnits): void;
		attachShader(program: WebGLProgram, shader: WebGLShader): void
		bindAttribLocation(program: WebGLProgram, index: GLuint, name: DOMString): void
		bindBuffer(target: GL.BufferTarget, buffer: Nullable<WebGLBuffer>): void
		bindFramebuffer(target: GL.FramebufferTarget, framebuffer: Nullable<WebGLFramebuffer>): void
		bindRenderbuffer(target: GL.RenderbufferTarget, renderbuffer: Nullable<WebGLRenderbuffer>): void
		bindTexture(target: GL.TextureTarget, texture: Nullable<WebGLTexture>): void
		blendColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void
		blendEquation(mode: GL.BlendEquationMode): void
		blendEquationSeparate(modeRGB: GL.BlendEquationMode, modeAlpha: GL.BlendEquationMode): void
		/**In the WebGL API, constant color and constant alpha cannot be used together as source and destination factors in the blend function. A call to blendFunc will generate an INVALID_OPERATION error if one of the two factors is set to CONSTANT_COLOR or ONE_MINUS_CONSTANT_COLOR and the other to CONSTANT_ALPHA or ONE_MINUS_CONSTANT_ALPHA. */
		blendFunc(sfactor: Base['CONSTANT_COLOR'] | Base['ONE_MINUS_CONSTANT_COLOR'], dfactor: GL.BlendFuncDstFactorNoConstantAlpha): void
		blendFunc(sfactor: GL.BlendFuncDstFactorNoConstantAlpha, dfactor: Base['CONSTANT_COLOR'] | Base['ONE_MINUS_CONSTANT_COLOR']): void
		blendFunc(sfactor: Base['CONSTANT_ALPHA'] | Base['ONE_MINUS_CONSTANT_ALPHA'], dfactor: GL.BlendFuncDstFactorNoConstantColor): void
		blendFunc(sfactor: GL.BlendFuncDstFactorNoConstantColor, dfactor: Base['CONSTANT_ALPHA'] | Base['ONE_MINUS_CONSTANT_ALPHA']): void
		blendFunc(sfactor: GL.BlendFuncDstFactorNoConstant | Base['SRC_ALPHA_SATURATE'], dfactor: GL.BlendFuncDstFactorNoConstant): void

		/** A call to blendFuncSeparate will generate an INVALID_OPERATION error if srcRGB is set to CONSTANT_COLOR or ONE_MINUS_CONSTANT_COLOR and dstRGB is set to CONSTANT_ALPHA or ONE_MINUS_CONSTANT_ALPHA or vice versa.
		 * This doesn't seem to apply to srcAlpha/dstAlpha.
		 */
		blendFuncSeparate(sfactor: Base['CONSTANT_COLOR'] | Base['ONE_MINUS_CONSTANT_COLOR'], dfactor: GL.BlendFuncDstFactorNoConstantAlpha,
			srcAlpha: GL.BlendFuncDstFactor | Base['SRC_ALPHA_SATURATE'], dstAlpha: GL.BlendFuncDstFactor): void;
		blendFuncSeparate(sfactor: GL.BlendFuncDstFactorNoConstantAlpha, dfactor: Base['CONSTANT_COLOR'] | Base['ONE_MINUS_CONSTANT_COLOR'],
			srcAlpha: GL.BlendFuncDstFactor | Base['SRC_ALPHA_SATURATE'], dstAlpha: GL.BlendFuncDstFactor): void;
		blendFuncSeparate(sfactor: Base['CONSTANT_ALPHA'] | Base['ONE_MINUS_CONSTANT_ALPHA'], dfactor: GL.BlendFuncDstFactorNoConstantColor,
			srcAlpha: GL.BlendFuncDstFactor | Base['SRC_ALPHA_SATURATE'], dstAlpha: GL.BlendFuncDstFactor): void;
		blendFuncSeparate(sfactor: GL.BlendFuncDstFactorNoConstantColor, dfactor: Base['CONSTANT_ALPHA'] | Base['ONE_MINUS_CONSTANT_ALPHA'],
			srcAlpha: GL.BlendFuncDstFactor | Base['SRC_ALPHA_SATURATE'], dstAlpha: GL.BlendFuncDstFactor): void;
		blendFuncSeparate(sfactor: GL.BlendFuncDstFactorNoConstant | Base['SRC_ALPHA_SATURATE'], dfactor: GL.BlendFuncDstFactorNoConstant,
			srcAlpha: GL.BlendFuncDstFactor | Base['SRC_ALPHA_SATURATE'], dstAlpha: GL.BlendFuncDstFactor): void;

		bufferData(target: GL.BufferTarget, size: GLsizeiptr, usage: GL.BufferDataUsage): void
		bufferData(target: GL.BufferTarget, /* [AllowShared] */ data: Nullable<BufferSource>, usage: GL.BufferDataUsage): void
		bufferSubData(target: GL.BufferTarget, offset: GLintptr, /* [AllowShared] */ data: BufferSource): void

		/* [WebGLHandlesContextLoss] */ checkFramebufferStatus(target: GL.FramebufferTarget): GL.FramebufferStatus;
		clear(mask: GLbitfield): void
		clearColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void
		clearDepth(depth: GLclampf): void
		clearStencil(s: GLint): void
		colorMask(red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void
		compileShader(shader: WebGLShader): void

		createBuffer(): WebGLBuffer | null;
		createFramebuffer(): WebGLFramebuffer | null;
		createProgram(): WebGLProgram | null;
		createRenderbuffer(): WebGLRenderbuffer | null;
		createShader(type: GL.ShaderType): WebGLShader | null;
		createTexture(): WebGLTexture | null;

		cullFace(mode: GL.CullFaceMode): void

		deleteBuffer(buffer: Nullable<WebGLBuffer>): void
		deleteFramebuffer(framebuffer: Nullable<WebGLFramebuffer>): void
		deleteProgram(program: Nullable<WebGLProgram>): void
		deleteRenderbuffer(renderbuffer: Nullable<WebGLRenderbuffer>): void
		deleteShader(shader: Nullable<WebGLShader>): void
		deleteTexture(texture: Nullable<WebGLTexture>): void

		depthFunc(func: GL.ComparisonFunc): void
		depthMask(flag: GLboolean): void
		depthRange(zNear: GLclampf, zFar: GLclampf): void
		detachShader(program: WebGLProgram, shader: WebGLShader): void
		disable(cap: GL.Capability): void
		disableVertexAttribArray(index: GLuint): void
		drawArrays(mode: GL.DrawMode, first: GLint, count: GLsizei): void
		drawElements(mode: GL.DrawMode, count: GLsizei, type: Base['UNSIGNED_BYTE'] | Base['UNSIGNED_SHORT'], offset: GLintptr): void

		enable(cap: GL.Capability): void
		enableVertexAttribArray(index: GLuint): void
		finish(): void
		flush(): void
		framebufferRenderbuffer(target: GL.FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, renderbuffertarget: GL.RenderbufferTarget, renderbuffer: Nullable<WebGLRenderbuffer>): void;
		framebufferTexture2D(target: GL.FramebufferTarget, attachment: GL.FramebufferTexture2DAttachment, textarget: GL.TexImage2DTarget, texture: Nullable<WebGLTexture>, level: 0): void;
		frontFace(mode: GL.FrontFaceMode): void

		generateMipmap(target: GL.TextureTarget): void

		getAttachedShaders(program: WebGLProgram): sequence<WebGLShader> | null;

		/* [WebGLHandlesContextLoss] */ getAttribLocation(program: WebGLProgram, name: DOMString): GLint;

		getBufferParameter(target: GL.BufferTarget, pname: Base['BUFFER_SIZE']): GLint;

		getParameter(pname: Base['ACTIVE_TEXTURE']): GL.TextureUnits
		getParameter(pname: Base['ALIASED_LINE_WIDTH_RANGE']): Float32Array // (with 2 elements)
		getParameter(pname: Base['ALIASED_POINT_SIZE_RANGE']): Float32Array // (with 2 elements)
		getParameter(pname: Base['ALPHA_BITS']): GLint
		getParameter(pname: Base['ARRAY_BUFFER_BINDING']): WebGLBuffer
		getParameter(pname: Base['BLEND']): GLboolean
		getParameter(pname: Base['BLEND_COLOR']): Float32Array // (with 4 values)
		getParameter(pname: Base['BLEND_DST_ALPHA']): GL.BlendFuncDstFactor
		getParameter(pname: Base['BLEND_DST_RGB']): GL.BlendFuncDstFactor
		getParameter(pname: Base['BLEND_EQUATION_ALPHA']): GL.BlendEquationMode
		getParameter(pname: Base['BLEND_EQUATION_RGB']): GL.BlendEquationMode
		getParameter(pname: Base['BLEND_SRC_ALPHA']): GL.BlendFuncSrcFactor | Base['SRC_ALPHA_SATURATE']
		getParameter(pname: Base['BLEND_SRC_RGB']): GL.BlendFuncSrcFactor | Base['SRC_ALPHA_SATURATE']
		getParameter(pname: Base['BLUE_BITS']): GLint
		getParameter(pname: Base['COLOR_CLEAR_VALUE']): Float32Array // (with 4 values)
		getParameter(pname: Base['COLOR_WRITEMASK']): sequence<GLboolean> // (with 4 values)
		getParameter(pname: Base['COMPRESSED_TEXTURE_FORMATS']): Uint32Array
		getParameter(pname: Base['CULL_FACE']): GLboolean
		getParameter(pname: Base['CULL_FACE_MODE']): GL.CullFaceMode
		getParameter(pname: Base['CURRENT_PROGRAM']): WebGLProgram
		getParameter(pname: Base['DEPTH_BITS']): GLint
		getParameter(pname: Base['DEPTH_CLEAR_VALUE']): GLfloat
		getParameter(pname: Base['DEPTH_FUNC']): GL.ComparisonFunc
		getParameter(pname: Base['DEPTH_RANGE']): Float32Array // (with 2 elements)
		getParameter(pname: Base['DEPTH_TEST']): GLboolean
		getParameter(pname: Base['DEPTH_WRITEMASK']): GLboolean
		getParameter(pname: Base['DITHER']): GLboolean
		getParameter(pname: Base['ELEMENT_ARRAY_BUFFER_BINDING']): WebGLBuffer
		getParameter(pname: Base['FRAMEBUFFER_BINDING']): WebGLFramebuffer
		getParameter(pname: Base['FRONT_FACE']): GL.FrontFaceMode
		getParameter(pname: Base['GENERATE_MIPMAP_HINT']): GL.HintMode
		getParameter(pname: Base['GREEN_BITS']): GLint
		getParameter(pname: Base['LINE_WIDTH']): GLfloat
		getParameter(pname: Base['MAX_COMBINED_TEXTURE_IMAGE_UNITS']): GLint
		getParameter(pname: Base['MAX_CUBE_MAP_TEXTURE_SIZE']): GLint
		getParameter(pname: Base['MAX_FRAGMENT_UNIFORM_VECTORS']): GLint
		getParameter(pname: Base['MAX_RENDERBUFFER_SIZE']): GLint
		getParameter(pname: Base['MAX_TEXTURE_IMAGE_UNITS']): GLint
		getParameter(pname: Base['MAX_TEXTURE_SIZE']): GLint
		getParameter(pname: Base['MAX_VARYING_VECTORS']): GLint
		getParameter(pname: Base['MAX_VERTEX_ATTRIBS']): GLint
		getParameter(pname: Base['MAX_VERTEX_TEXTURE_IMAGE_UNITS']): GLint
		getParameter(pname: Base['MAX_VERTEX_UNIFORM_VECTORS']): GLint
		getParameter(pname: Base['MAX_VIEWPORT_DIMS']): Int32Array // (with 2 elements)
		getParameter(pname: Base['PACK_ALIGNMENT']): GLint
		getParameter(pname: Base['POLYGON_OFFSET_FACTOR']): GLfloat
		getParameter(pname: Base['POLYGON_OFFSET_FILL']): GLboolean
		getParameter(pname: Base['POLYGON_OFFSET_UNITS']): GLfloat
		getParameter(pname: Base['RED_BITS']): GLint
		getParameter(pname: Base['RENDERBUFFER_BINDING']): WebGLRenderbuffer
		getParameter(pname: Base['RENDERER']): DOMString
		getParameter(pname: Base['SAMPLE_ALPHA_TO_COVERAGE']): GLboolean
		getParameter(pname: Base['SAMPLE_BUFFERS']): GLint
		getParameter(pname: Base['SAMPLE_COVERAGE']): GLboolean
		getParameter(pname: Base['SAMPLE_COVERAGE_INVERT']): GLboolean
		getParameter(pname: Base['SAMPLE_COVERAGE_VALUE']): GLfloat
		getParameter(pname: Base['SAMPLES']): GLint
		getParameter(pname: Base['SCISSOR_BOX']): Int32Array // (with 4 elements)
		getParameter(pname: Base['SCISSOR_TEST']): GLboolean
		getParameter(pname: Base['SHADING_LANGUAGE_VERSION']): DOMString
		getParameter(pname: Base['STENCIL_BACK_FAIL']): GL.StencilOp
		getParameter(pname: Base['STENCIL_BACK_FUNC']): GL.ComparisonFunc
		getParameter(pname: Base['STENCIL_BACK_PASS_DEPTH_FAIL']): GL.StencilOp
		getParameter(pname: Base['STENCIL_BACK_PASS_DEPTH_PASS']): GL.StencilOp
		getParameter(pname: Base['STENCIL_BACK_REF']): GLint
		getParameter(pname: Base['STENCIL_BACK_VALUE_MASK']): GLuint
		getParameter(pname: Base['STENCIL_BACK_WRITEMASK']): GLuint
		getParameter(pname: Base['STENCIL_BITS']): GLint
		getParameter(pname: Base['STENCIL_CLEAR_VALUE']): GLint
		getParameter(pname: Base['STENCIL_FAIL']): GL.StencilOp
		getParameter(pname: Base['STENCIL_FUNC']): GL.ComparisonFunc
		getParameter(pname: Base['STENCIL_PASS_DEPTH_FAIL']): GL.StencilOp
		getParameter(pname: Base['STENCIL_PASS_DEPTH_PASS']): GL.StencilOp
		getParameter(pname: Base['STENCIL_REF']): GLint
		getParameter(pname: Base['STENCIL_TEST']): GLboolean
		getParameter(pname: Base['STENCIL_VALUE_MASK']): GLuint
		getParameter(pname: Base['STENCIL_WRITEMASK']): GLuint
		getParameter(pname: Base['SUBPIXEL_BITS']): GLint
		getParameter(pname: Base['TEXTURE_BINDING_2D']): WebGLTexture
		getParameter(pname: Base['TEXTURE_BINDING_CUBE_MAP']): WebGLTexture
		getParameter(pname: Base['UNPACK_ALIGNMENT']): GLint
		getParameter(pname: Base['UNPACK_COLORSPACE_CONVERSION_WEBGL']): Base['BROWSER_DEFAULT_WEBGL'] | Base['NONE']
		getParameter(pname: Base['UNPACK_FLIP_Y_WEBGL']): GLboolean
		getParameter(pname: Base['UNPACK_PREMULTIPLY_ALPHA_WEBGL']): GLboolean
		getParameter(pname: Base['VENDOR']): DOMString
		getParameter(pname: Base['VERSION']): DOMString
		getParameter(pname: Base['VIEWPORT']): Int32Array // (with 4 elements)

		/* [WebGLHandlesContextLoss] */ getError(): GL.Error;

		getFramebufferAttachmentParameter(target: GL.FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE']):
			Base['RENDERBUFFER'] | Base['TEXTURE'] | Base['NONE']
		getFramebufferAttachmentParameter(target: GL.FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_OBJECT_NAME']): WebGLRenderbuffer | WebGLTexture
		getFramebufferAttachmentParameter(target: GL.FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL']): GLint
		getFramebufferAttachmentParameter(target: GL.FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE']): GL.CubeMapFaces | 0

		getProgramParameter(program: WebGLProgram, pname: Base['DELETE_STATUS']): GLboolean
		getProgramParameter(program: WebGLProgram, pname: Base['LINK_STATUS']): GLboolean
		getProgramParameter(program: WebGLProgram, pname: Base['VALIDATE_STATUS']): GLboolean
		getProgramParameter(program: WebGLProgram, pname: Base['ATTACHED_SHADERS']): GLint
		getProgramParameter(program: WebGLProgram, pname: Base['ACTIVE_ATTRIBUTES']): GLint
		getProgramParameter(program: WebGLProgram, pname: Base['ACTIVE_UNIFORMS']): GLint

		getProgramInfoLog(program: WebGLProgram): DOMString | null;

		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: Base['RENDERBUFFER_WIDTH']): GLint
		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: Base['RENDERBUFFER_HEIGHT']): GLint
		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: Base['RENDERBUFFER_RED_SIZE']): GLint
		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: Base['RENDERBUFFER_GREEN_SIZE']): GLint
		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: Base['RENDERBUFFER_BLUE_SIZE']): GLint
		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: Base['RENDERBUFFER_ALPHA_SIZE']): GLint
		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: Base['RENDERBUFFER_DEPTH_SIZE']): GLint
		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: Base['RENDERBUFFER_STENCIL_SIZE']): GLint

		getShaderParameter(shader: WebGLShader, pname: Base['SHADER_TYPE']): GL.ShaderType
		getShaderParameter(shader: WebGLShader, pname: Base['DELETE_STATUS']): GLboolean
		getShaderParameter(shader: WebGLShader, pname: Base['COMPILE_STATUS']): GLboolean

		getShaderPrecisionFormat(shadertype: GL.ShaderType, precisiontype: GL.ShaderPrecisionType): WebGLShaderPrecisionFormat | null;
		getShaderInfoLog(shader: WebGLShader): DOMString | null;

		getShaderSource(shader: WebGLShader): DOMString | null;

		getTexParameter(target: GL.TextureTarget, pname: Base['TEXTURE_MAG_FILTER']): GL.TextureMagFilter
		getTexParameter(target: GL.TextureTarget, pname: Base['TEXTURE_MIN_FILTER']): GL.TextureMinFilter
		getTexParameter(target: GL.TextureTarget, pname: Base['TEXTURE_WRAP_S']): GL.TextureWrap
		getTexParameter(target: GL.TextureTarget, pname: Base['TEXTURE_WRAP_T']): GL.TextureWrap

		getUniformLocation(program: WebGLProgram, name: DOMString): WebGLUniformLocation | null;

		getVertexAttrib(index: GLuint, pname: Base['VERTEX_ATTRIB_ARRAY_BUFFER_BINDING']): WebGLBuffer
		getVertexAttrib(index: GLuint, pname: Base['VERTEX_ATTRIB_ARRAY_ENABLED']): GLboolean
		getVertexAttrib(index: GLuint, pname: Base['VERTEX_ATTRIB_ARRAY_SIZE']): GLint
		getVertexAttrib(index: GLuint, pname: Base['VERTEX_ATTRIB_ARRAY_STRIDE']): GLint
		getVertexAttrib(index: GLuint, pname: Base['VERTEX_ATTRIB_ARRAY_TYPE']): GL.ArrayType
		getVertexAttrib(index: GLuint, pname: Base['VERTEX_ATTRIB_ARRAY_NORMALIZED']): GLboolean
		getVertexAttrib(index: GLuint, pname: Base['CURRENT_VERTEX_ATTRIB']): Float32Array // (with 4 elements)

		/* [WebGLHandlesContextLoss] */ getVertexAttribOffset(index: GLuint, pname: Base['VERTEX_ATTRIB_ARRAY_POINTER']): GLintptr;

		hint(target: Base['GENERATE_MIPMAP_HINT'], mode: GL.HintMode): void
		/* [WebGLHandlesContextLoss] */ isBuffer(buffer: Nullable<WebGLBuffer>): GLboolean
		/* [WebGLHandlesContextLoss] */ isEnabled(cap: GL.Capability): GLboolean
		/* [WebGLHandlesContextLoss] */ isFramebuffer(framebuffer: Nullable<WebGLFramebuffer>): GLboolean
		/* [WebGLHandlesContextLoss] */ isProgram(program: Nullable<WebGLProgram>): GLboolean
		/* [WebGLHandlesContextLoss] */ isRenderbuffer(renderbuffer: Nullable<WebGLRenderbuffer>): GLboolean
		/* [WebGLHandlesContextLoss] */ isShader(shader: Nullable<WebGLShader>): GLboolean
		/* [WebGLHandlesContextLoss] */ isTexture(texture: Nullable<WebGLTexture>): GLboolean
		lineWidth(width: GLfloat): void
		linkProgram(program: WebGLProgram): void

		pixelStorei(pname: Base['PACK_ALIGNMENT'], param: 1 | 2 | 4 | 8): void
		pixelStorei(pname: Base['UNPACK_ALIGNMENT'], param: 1 | 2 | 4 | 8): void
		pixelStorei(pname: Base['UNPACK_FLIP_Y_WEBGL'], param: boolean): void
		pixelStorei(pname: Base['UNPACK_PREMULTIPLY_ALPHA_WEBGL'], param: boolean): void
		pixelStorei(pname: Base['UNPACK_COLORSPACE_CONVERSION_WEBGL'], param: Base['BROWSER_DEFAULT_WEBGL'] | Base['NONE']): void

		polygonOffset(factor: GLfloat, units: GLfloat): void

		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GL.ReadPixelsFormat, type: Base['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Uint8Array): void;
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GL.ReadPixelsFormat,
			type: Base['UNSIGNED_SHORT_5_6_5'] | Base['UNSIGNED_SHORT_4_4_4_4'] | Base['UNSIGNED_SHORT_5_5_5_1'],
			/* [AllowShared] */ pixels: Uint16Array): void;
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GL.ReadPixelsFormat, type: Base['FLOAT'], /* [AllowShared] */ pixels: Float32Array): void;

		renderbufferStorage(target: GL.RenderbufferTarget, internalformat: GL.RenderbufferInternalFormat, width: GLsizei, height: GLsizei): void;
		sampleCoverage(value: GLclampf, invert: GLboolean): void
		scissor(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void

		shaderSource(shader: WebGLShader, source: DOMString): void

		stencilFunc(func: GL.ComparisonFunc, ref: GLint, mask: GLuint): void
		stencilFuncSeparate(face: GL.CullFaceMode, func: GL.ComparisonFunc, ref: GLint, mask: GLuint): void
		stencilMask(mask: GLuint): void
		stencilMaskSeparate(face: GL.CullFaceMode, mask: GLuint): void
		stencilOp(fail: GL.StencilOp, zfail: GL.StencilOp, zpass: GL.StencilOp): void
		stencilOpSeparate(face: GL.CullFaceMode, fail: GL.StencilOp, zfail: GL.StencilOp, zpass: GL.StencilOp): void

		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['ALPHA'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGB'], width: GLsizei, height: GLsizei, border: 0, format: Constants['RGB'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGB'], width: GLsizei, height: GLsizei, border: 0, format: Constants['RGB'], type: Constants['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['RGBA'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['RGBA'], type: Constants['UNSIGNED_SHORT_5_5_5_1'] | Constants['UNSIGNED_SHORT_4_4_4_4'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['LUMINANCE_ALPHA'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE'], width: GLsizei, height: GLsizei, border: 0, format: Constants['LUMINANCE'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;

		// May throw DOMException:
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['ALPHA'], format: Constants['ALPHA'], type: Constants['UNSIGNED_BYTE'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGB'], format: Constants['RGB'], type: Constants['UNSIGNED_BYTE'] | Constants['UNSIGNED_SHORT_5_6_5'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGBA'], format: Constants['RGBA'], type: Constants['UNSIGNED_BYTE'] | Constants['UNSIGNED_SHORT_5_5_5_1'] | Constants['UNSIGNED_SHORT_4_4_4_4'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE_ALPHA'], format: Constants['LUMINANCE_ALPHA'], type: Constants['UNSIGNED_BYTE'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE'], format: Constants['LUMINANCE'], type: Constants['UNSIGNED_BYTE'], source: TexImageSource): void;

		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['ALPHA'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['RGB'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['RGB'], type: Constants['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['RGBA'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['RGBA'], type: Constants['UNSIGNED_SHORT_5_5_5_1'] | Constants['UNSIGNED_SHORT_4_4_4_4'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['LUMINANCE_ALPHA'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['LUMINANCE'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;

		// May throw DOMException:
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['ALPHA'], type: Constants['UNSIGNED_BYTE'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['RGB'], type: Constants['UNSIGNED_BYTE'] | Constants['UNSIGNED_SHORT_5_6_5'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['RGBA'], type: Constants['UNSIGNED_BYTE'] | Constants['UNSIGNED_SHORT_5_5_5_1'] | Constants['UNSIGNED_SHORT_4_4_4_4'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['LUMINANCE_ALPHA'], type: Constants['UNSIGNED_BYTE'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['LUMINANCE'], type: Constants['UNSIGNED_BYTE'], source: TexImageSource): void;

		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: never, width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ data: ArrayBufferView): void;
		compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: never, /* [AllowShared] */ data: ArrayBufferView): void;

		copyTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL.TextureInternalFormat, x: GLint, y: GLint, width: GLsizei, height: GLsizei, border: 0): void;
		copyTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;

		texParameterf(target: GL.TextureTarget, pname: never, param: GLfloat): void
		texParameteri(target: GL.TextureTarget, pname: Base['TEXTURE_MAG_FILTER'], param: GL.TextureMagFilter): void
		texParameteri(target: GL.TextureTarget, pname: Base['TEXTURE_MIN_FILTER'], param: GL.TextureMinFilter): void
		texParameteri(target: GL.TextureTarget, pname: Base['TEXTURE_WRAP_S'], param: GL.TextureWrap): void
		texParameteri(target: GL.TextureTarget, pname: Base['TEXTURE_WRAP_T'], param: GL.TextureWrap): void

		uniform1f(location: Nullable<WebGLUniformLocation>, x: GLfloat): void
		uniform2f(location: Nullable<WebGLUniformLocation>, x: GLfloat, y: GLfloat): void
		uniform3f(location: Nullable<WebGLUniformLocation>, x: GLfloat, y: GLfloat, z: GLfloat): void
		uniform4f(location: Nullable<WebGLUniformLocation>, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void

		uniform1i(location: Nullable<WebGLUniformLocation>, x: GLint): void
		uniform2i(location: Nullable<WebGLUniformLocation>, x: GLint, y: GLint): void
		uniform3i(location: Nullable<WebGLUniformLocation>, x: GLint, y: GLint, z: GLint): void
		uniform4i(location: Nullable<WebGLUniformLocation>, x: GLint, y: GLint, z: GLint, w: GLint): void

		uniform1fv(location: Nullable<WebGLUniformLocation>, v: Float32List): void
		uniform2fv(location: Nullable<WebGLUniformLocation>, v: Float32List): void
		uniform3fv(location: Nullable<WebGLUniformLocation>, v: Float32List): void
		uniform4fv(location: Nullable<WebGLUniformLocation>, v: Float32List): void

		uniform1iv(location: Nullable<WebGLUniformLocation>, v: Int32List): void
		uniform2iv(location: Nullable<WebGLUniformLocation>, v: Int32List): void
		uniform3iv(location: Nullable<WebGLUniformLocation>, v: Int32List): void
		uniform4iv(location: Nullable<WebGLUniformLocation>, v: Int32List): void

		uniformMatrix2fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, value: Float32List): void
		uniformMatrix3fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, value: Float32List): void
		uniformMatrix4fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, value: Float32List): void

		useProgram(program: Nullable<WebGLProgram>): void
		validateProgram(program: WebGLProgram): void

		vertexAttrib1f(index: GLuint, x: GLfloat): void
		vertexAttrib2f(index: GLuint, x: GLfloat, y: GLfloat): void
		vertexAttrib3f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat): void
		vertexAttrib4f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void

		vertexAttrib1fv(index: GLuint, values: Float32List): void
		vertexAttrib2fv(index: GLuint, values: Float32List): void
		vertexAttrib3fv(index: GLuint, values: Float32List): void
		vertexAttrib4fv(index: GLuint, values: Float32List): void

		vertexAttribPointer(index: GLuint, size: GLint, type: GL.ArrayType, normalized: GLboolean, stride: GLsizei, offset: GLintptr): void;

		viewport(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void
	}

	// WebGLRenderingContext members which aren't common to WebGL2, mostly because their return values
	// are extended in WebGL2
	interface Extra {
		// Khronos ratified WebGL Extensions
		getExtension(name: 'ANGLE_instanced_arrays '): ANGLE_instanced_arrays | null
		getExtension(name: 'EXT_blend_minmax '): EXT_blend_minmax  | null
		getExtension(name: 'EXT_frag_depth'): {} | null
		getExtension(name: 'EXT_shader_texture_lod'): {} | null
		getExtension(name: 'OES_element_index_uint'): {} | null
		getExtension(name: 'OES_standard_derivatives'): OES_standard_derivatives | null
		getExtension(name: 'OES_texture_float'): OES_texture_float | null
		getExtension(name: 'OES_texture_half_float'): OES_texture_half_float | null
		getExtension(name: 'OES_texture_half_float_linear'): {} | null
		getExtension(name: 'OES_vertex_array_object'): OES_vertex_array_object | null
		getExtension(name: 'WEBGL_depth_texture'): WEBGL_depth_texture | null
		getExtension(name: 'WEBGL_draw_buffers'): WEBGL_draw_buffers | null

		// Community approved WebGL Extensions
		getExtension(name: 'EXT_color_buffer_half_float'): EXT_color_buffer_half_float | null
		getExtension(name: 'EXT_disjoint_timer_query'): EXT_disjoint_timer_query | null
		getExtension(name: 'EXT_sRGB'): EXT_sRGB | null
		getExtension(name: 'WEBGL_color_buffer_float'): WEBGL_color_buffer_float | null

		getActiveAttrib(program: WebGLProgram, index: GLuint): WebGLActiveInfo<AttribType> | null;
		getActiveUniform(program: WebGLProgram, index: GLuint): WebGLActiveInfo<UniformType> | null;

		// this method exists on WebGL2RenderingContext, so defining it as undefined here is useful for type narrowing
		createTransformFeedback: undefined

		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: Base['RENDERBUFFER_INTERNAL_FORMAT']): GL.RenderbufferInternalFormat

		getParameter(pname: Base['IMPLEMENTATION_COLOR_READ_FORMAT']): GL.ReadPixelsFormat
		getParameter(pname: Base['IMPLEMENTATION_COLOR_READ_TYPE']): GL.ReadPixelsType

		getBufferParameter(target: GL.BufferTarget, pname: Base['BUFFER_USAGE']): GL.BufferDataUsage;

		getUniform(program: WebGLProgram, location: WebGLUniformLocation): UniformType;
	}

	// parameter types:
	export type TextureUnits = Constants['TEXTURE0']
		| Constants['TEXTURE1']
		| Constants['TEXTURE2']
		| Constants['TEXTURE3']
		| Constants['TEXTURE4']
		| Constants['TEXTURE5']
		| Constants['TEXTURE6']
		| Constants['TEXTURE7']
		| Constants['TEXTURE8']
		| Constants['TEXTURE9']
		| Constants['TEXTURE10']
		| Constants['TEXTURE11']
		| Constants['TEXTURE12']
		| Constants['TEXTURE13']
		| Constants['TEXTURE14']
		| Constants['TEXTURE15']
		| Constants['TEXTURE16']
		| Constants['TEXTURE17']
		| Constants['TEXTURE18']
		| Constants['TEXTURE19']
		| Constants['TEXTURE20']
		| Constants['TEXTURE21']
		| Constants['TEXTURE22']
		| Constants['TEXTURE23']
		| Constants['TEXTURE24']
		| Constants['TEXTURE25']
		| Constants['TEXTURE26']
		| Constants['TEXTURE27']
		| Constants['TEXTURE28']
		| Constants['TEXTURE29']
		| Constants['TEXTURE30']
		| Constants['TEXTURE31'];
	export type BufferTarget = Constants['ARRAY_BUFFER'] | Constants['ELEMENT_ARRAY_BUFFER']
	export type BufferTargetBinding = Constants['ARRAY_BUFFER_BINDING'] | Constants['ELEMENT_ARRAY_BUFFER']
	export type FramebufferTarget = Constants['FRAMEBUFFER']
	export type RenderbufferTarget = Constants['RENDERBUFFER']
	export type RenderbufferInternalFormat = Constants['RGBA4']
		| Constants['RGB565']
		| Constants['RGB5_A1']
		| Constants['DEPTH_COMPONENT16']
		| Constants['STENCIL_INDEX8']
		| Constants['DEPTH_STENCIL']
	export type TextureTarget = Constants['TEXTURE_2D'] | Constants['TEXTURE_CUBE_MAP']
	export type BlendEquationMode = Constants['FUNC_ADD'] | Constants['FUNC_SUBTRACT'] | Constants['FUNC_REVERSE_SUBTRACT']
	export type BlendFuncDstFactorNoConstant = Constants['ZERO']
		| Constants['ONE']
		| Constants['SRC_COLOR']
		| Constants['ONE_MINUS_SRC_COLOR']
		| Constants['DST_COLOR']
		| Constants['ONE_MINUS_DST_COLOR']
		| Constants['SRC_ALPHA']
		| Constants['ONE_MINUS_SRC_ALPHA']
		| Constants['DST_ALPHA']
		| Constants['ONE_MINUS_DST_ALPHA']
	export type BlendFuncDstFactorNoConstantColor = BlendFuncDstFactorNoConstant
		| Constants['CONSTANT_ALPHA']
		| Constants['ONE_MINUS_CONSTANT_ALPHA']
	export type BlendFuncDstFactorNoConstantAlpha = BlendFuncDstFactorNoConstant
		| Constants['CONSTANT_COLOR']
		| Constants['ONE_MINUS_CONSTANT_COLOR']
	export type BlendFuncDstFactor = BlendFuncDstFactorNoConstantAlpha | BlendFuncDstFactorNoConstantColor
	export type BlendFuncSrcFactor = BlendFuncDstFactor | Constants['SRC_ALPHA_SATURATE']
	export type BufferDataUsage = Constants['STREAM_DRAW'] | Constants['STATIC_DRAW'] | Constants['DYNAMIC_DRAW']
	export type FramebufferStatus = Constants['FRAMEBUFFER_COMPLETE']
		| Constants['FRAMEBUFFER_INCOMPLETE_ATTACHMENT']
		| Constants['FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT']
		| Constants['FRAMEBUFFER_INCOMPLETE_DIMENSIONS']
		| Constants['FRAMEBUFFER_UNSUPPORTED']
	export type CubeMapFaces = Constants['TEXTURE_CUBE_MAP_POSITIVE_X']
		| Constants['TEXTURE_CUBE_MAP_NEGATIVE_X']
		| Constants['TEXTURE_CUBE_MAP_POSITIVE_Y']
		| Constants['TEXTURE_CUBE_MAP_NEGATIVE_Y']
		| Constants['TEXTURE_CUBE_MAP_POSITIVE_Z']
		| Constants['TEXTURE_CUBE_MAP_NEGATIVE_Z']
	export type TexImage2DTarget = Constants['TEXTURE_2D'] | CubeMapFaces
	export type TextureInternalFormat = Constants['ALPHA']
		| Constants['RGB']
		| Constants['RGBA']
		| Constants['LUMINANCE']
		| Constants['LUMINANCE_ALPHA']
	export type ShaderType = Constants['FRAGMENT_SHADER'] | Constants['VERTEX_SHADER']
	export type CullFaceMode = Constants['FRONT'] | Constants['BACK'] | Constants['FRONT_AND_BACK']
	export type Capability = Constants['BLEND']
		| Constants['CULL_FACE']
		| Constants['DEPTH_TEST']
		| Constants['DITHER']
		| Constants['POLYGON_OFFSET_FILL']
		| Constants['SAMPLE_ALPHA_TO_COVERAGE']
		| Constants['SAMPLE_COVERAGE']
		| Constants['SCISSOR_TEST']
		| Constants['STENCIL_TEST']
	export type ComparisonFunc = Constants['NEVER']
		| Constants['LESS']
		| Constants['EQUAL']
		| Constants['LEQUAL']
		| Constants['GREATER']
		| Constants['NOTEQUAL']
		| Constants['GEQUAL']
		| Constants['ALWAYS']
	export type DrawMode = Constants['POINTS']
		| Constants['LINE_STRIP']
		| Constants['LINE_LOOP']
		| Constants['LINES']
		| Constants['TRIANGLE_STRIP']
		| Constants['TRIANGLE_FAN']
		| Constants['TRIANGLES']
	export type FramebufferRenderbufferAttachment = Constants['COLOR_ATTACHMENT0']
		| Constants['DEPTH_ATTACHMENT']
		| Constants['DEPTH_STENCIL_ATTACHMENT']
		| Constants['STENCIL_ATTACHMENT']
	export type FramebufferTexture2DAttachment = Constants['COLOR_ATTACHMENT0']
		| Constants['DEPTH_ATTACHMENT']
		| Constants['STENCIL_ATTACHMENT']
	export type Error = Constants['NO_ERROR']
		| Constants['INVALID_ENUM']
		| Constants['INVALID_VALUE']
		| Constants['INVALID_OPERATION']
		| Constants['OUT_OF_MEMORY']
		| Constants['CONTEXT_LOST_WEBGL']
	export type ShaderPrecisionType = Constants['LOW_FLOAT']
		| Constants['MEDIUM_FLOAT']
		| Constants['HIGH_FLOAT']
		| Constants['LOW_INT']
		| Constants['MEDIUM_INT']
		| Constants['HIGH_INT']
	export type ArrayType = Constants['BYTE']
		| Constants['UNSIGNED_BYTE']
		| Constants['SHORT']
		| Constants['UNSIGNED_SHORT']
		| Constants['FLOAT']
	export type HintMode = Constants['FASTEST'] | Constants['NICEST'] | Constants['DONT_CARE']
	export type StencilOp = Constants['KEEP']
		| Constants['ZERO']
		| Constants['REPLACE']
		| Constants['INCR']
		| Constants['INCR_WRAP']
		| Constants['DECR']
		| Constants['DECR_WRAP']
		| Constants['INVERT']
	export type TextureMagFilter = Constants['LINEAR'] | Constants['NEAREST']
	export type TextureMinFilter = Constants['LINEAR'] | Constants['NEAREST'] | Constants['NEAREST_MIPMAP_NEAREST'] | Constants['LINEAR_MIPMAP_NEAREST'] | Constants['NEAREST_MIPMAP_LINEAR'] | Constants['LINEAR_MIPMAP_LINEAR']
	export type TextureWrap = Constants['REPEAT'] | Constants['CLAMP_TO_EDGE'] | Constants['MIRRORED_REPEAT']
	export type FrontFaceMode = Constants['CW'] | Constants['CCW']
	export type AttribType = Constants['FLOAT']
		| Constants['FLOAT_VEC2']
		| Constants['FLOAT_VEC3']
		| Constants['FLOAT_VEC4']
		| Constants['FLOAT_MAT2']
		| Constants['FLOAT_MAT3']
		| Constants['FLOAT_MAT4']
	export type UniformType = Constants['FLOAT']
		| Constants['FLOAT_VEC2']
		| Constants['FLOAT_VEC3']
		| Constants['FLOAT_VEC4']
		| Constants['INT']
		| Constants['INT_VEC2']
		| Constants['INT_VEC3']
		| Constants['INT_VEC4']
		| Constants['BOOL']
		| Constants['BOOL_VEC2']
		| Constants['BOOL_VEC3']
		| Constants['BOOL_VEC4']
		| Constants['FLOAT_MAT2']
		| Constants['FLOAT_MAT3']
		| Constants['FLOAT_MAT4']
		| Constants['SAMPLER_2D']
		| Constants['SAMPLER_CUBE']
	export type ReadPixelsFormat = Constants['ALPHA'] | Constants['RGB'] | Constants['RGBA']
	export type ReadPixelsType = Constants['UNSIGNED_BYTE'] | Constants['UNSIGNED_SHORT_5_6_5'] | Constants['UNSIGNED_SHORT_4_4_4_4'] | Constants['UNSIGNED_SHORT_5_5_5_1'] | Constants['FLOAT']

	// #######################################
	// ## Khronos ratified WebGL Extensions ##
	// #######################################

	// https://www.khronos.org/registry/webgl/extensions/ANGLE_instanced_arrays/
	/* [NoInterfaceObject] */
	interface ANGLE_instanced_arrays {
		readonly VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: /* 0x88FE */ GLenum<'VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE'>;
		drawArraysInstancedANGLE(mode: GL.DrawMode, first: GLint, count: GLsizei, primcount:GLsizei ): void
		drawElementsInstancedANGLE(mode: GL.DrawMode, count: GLsizei, type: Base['UNSIGNED_BYTE'] | Base['UNSIGNED_SHORT'], offset: GLintptr): void
		// Only with OES_element_index_uint
		drawElementsInstancedANGLE(mode: GL.DrawMode, count: GLsizei, type: Base['UNSIGNED_INT'], offset: GLintptr): void
		vertexAttribDivisorANGLE(index: GLuint, divisor: GLuint): void;
	}
	interface Base_ANGLE_instanced_arrays {
		getParameter(pname: WEBGL_draw_buffers['MAX_COLOR_ATTACHMENTS_WEBGL']): GLuint
		getParameter(pname: WEBGL_draw_buffers['MAX_DRAW_BUFFERS_WEBGL']): GLuint
		getParameter(pname: DrawBuffer): GL['NONE'] | GL['BACK'] | GL.ColorAttachment // accurate?
		framebufferRenderbuffer(target: GL.FramebufferTarget, attachment: GL.ColorAttachment, renderbuffertarget: Base['RENDERBUFFER'], renderbuffer: Nullable<WebGLRenderbuffer>): void;
		framebufferTexture2D(target: GL.FramebufferTarget, attachment: GL.ColorAttachment, textarget: GL.TexImage2DTarget, texture: Nullable<WebGLTexture>, level: GLint): void;
		drawBuffersWEBGL(buffers: sequence<GL['NONE'] | GL['BACK'] | GL.ColorAttachment>): void;
		getVertexAttrib(index: GLuint, pname: WEBGL_draw_buffers['MAX_COLOR_ATTACHMENTS_WEBGL']): GLint
	}

	// https://www.khronos.org/registry/webgl/extensions/OES_texture_half_float/
	interface Base_OES_texture_float {
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['ALPHA'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGB'], width: GLsizei, height: GLsizei, border: 0, format: Constants['RGB'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['RGBA'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['LUMINANCE_ALPHA'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE'], width: GLsizei, height: GLsizei, border: 0, format: Constants['LUMINANCE'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;

		// May throw DOMException:
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['ALPHA'], format: Constants['ALPHA'], type: Constants['FLOAT'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGB'], format: Constants['RGB'], type: Constants['FLOAT'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGBA'], format: Constants['RGBA'], type: Constants['FLOAT'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE_ALPHA'], format: Constants['LUMINANCE_ALPHA'], type: Constants['FLOAT'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE'], format: Constants['LUMINANCE'], type: Constants['FLOAT'], source: TexImageSource): void;

		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['ALPHA'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['RGB'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['RGBA'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['LUMINANCE_ALPHA'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['LUMINANCE'], type: Constants['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;

		// May throw DOMException:
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['ALPHA'], type: Constants['FLOAT'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['RGB'], type: Constants['FLOAT'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['RGBA'], type: Constants['FLOAT'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['LUMINANCE_ALPHA'], type: Constants['FLOAT'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['LUMINANCE'], type: Constants['FLOAT'], source: TexImageSource): void;
	}

	// https://www.khronos.org/registry/webgl/extensions/OES_texture_half_float/
	interface OES_texture_half_float {
		readonly HALF_FLOAT_OES: /* 0x8D61 */ GLenum<'HALF_FLOAT_OES'>;
	}
	interface Base_OES_texture_half_float {
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['ALPHA'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGB'], width: GLsizei, height: GLsizei, border: 0, format: Constants['RGB'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['RGBA'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: Constants['LUMINANCE_ALPHA'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE'], width: GLsizei, height: GLsizei, border: 0, format: Constants['LUMINANCE'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;

		// May throw DOMException:
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['ALPHA'], format: Constants['ALPHA'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGB'], format: Constants['RGB'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['RGBA'], format: Constants['RGBA'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE_ALPHA'], format: Constants['LUMINANCE_ALPHA'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['LUMINANCE'], format: Constants['LUMINANCE'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;

		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['ALPHA'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['RGB'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['RGBA'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['LUMINANCE_ALPHA'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: Constants['LUMINANCE'], type: OES_texture_half_float['HALF_FLOAT_OES'], /* [AllowShared] */ pixels: Nullable< Uint16Array >): void;

		// May throw DOMException:
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['ALPHA'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['RGB'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['RGBA'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['LUMINANCE_ALPHA'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: Constants['LUMINANCE'], type: OES_texture_half_float['HALF_FLOAT_OES'], source: TexImageSource): void;
	}

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_lose_context/
	/* [NoInterfaceObject] */
	interface WEBGL_lose_context {
		loseContext(): void;
		restoreContext(): void;
	}

	// https://www.khronos.org/registry/webgl/extensions/OES_standard_derivatives/
	interface OES_standard_derivatives {
		readonly FRAGMENT_SHADER_DERIVATIVE_HINT_OES: /* 0x8B8B */ GLenum<'FRAGMENT_SHADER_DERIVATIVE_HINT_OES'>;
	}
	interface Base_OES_standard_derivatives {
		hint(target: OES_standard_derivatives['FRAGMENT_SHADER_DERIVATIVE_HINT_OES'], mode: HintMode): void
		getParameter(pname: OES_standard_derivatives['FRAGMENT_SHADER_DERIVATIVE_HINT_OES']): HintMode
	}

	// https://www.khronos.org/registry/webgl/extensions/OES_vertex_array_object/
	/* [NoInterfaceObject] */
	interface WebGLVertexArrayObjectOES extends WebGLObject {
		__WebGLObjectBrand: 'WebGLVertexArrayObjectOES'
	}
	/* [NoInterfaceObject] */
	interface OES_vertex_array_object {
		readonly VERTEX_ARRAY_BINDING_OES: /* 0x85B5 */ GLenum<'VERTEX_ARRAY_BINDING_OES'>;

		createVertexArrayOES(): WebGLVertexArrayObjectOES | null;
		deleteVertexArrayOES(arrayObject: Nullable<WebGLVertexArrayObjectOES>): void;
		/* [WebGLHandlesContextLoss] */ isVertexArrayOES(arrayObject: Nullable<WebGLVertexArrayObjectOES>): GLboolean;
		bindVertexArrayOES(arrayObject: Nullable<WebGLVertexArrayObjectOES>): void;
	}

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_debug_renderer_info/
	/* [NoInterfaceObject] */
	interface WEBGL_debug_renderer_info {
		readonly UNMASKED_VENDOR_WEBGL: /* 0x9245 */ GLenum<'UNMASKED_VENDOR_WEBGL'>;
		readonly UNMASKED_RENDERER_WEBGL: /* 0x9246 */ GLenum<'UNMASKED_RENDERER_WEBGL'>;
	}
	interface Base_WEBGL_debug_renderer_info {
		getParameter(pname: WEBGL_debug_renderer_info['UNMASKED_VENDOR_WEBGL']): DOMString
		getParameter(pname: WEBGL_debug_renderer_info['UNMASKED_RENDERER_WEBGL']): DOMString
	}

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_debug_shaders/
	/* [NoInterfaceObject] */
	interface WEBGL_debug_shaders {
		getTranslatedShaderSource(shader: WebGLShader): DOMString;
	}

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
	/* [NoInterfaceObject] */
	interface WEBGL_compressed_texture_s3tc {
		/* Compressed Texture Formats */
		readonly COMPRESSED_RGB_S3TC_DXT1_EXT: /* 0x83F0 */ GLenum<'COMPRESSED_RGB_S3TC_DXT1_EXT'>;
		readonly COMPRESSED_RGBA_S3TC_DXT1_EXT: /* 0x83F1 */ GLenum<'COMPRESSED_RGBA_S3TC_DXT1_EXT'>;
		readonly COMPRESSED_RGBA_S3TC_DXT3_EXT: /* 0x83F2 */ GLenum<'COMPRESSED_RGBA_S3TC_DXT3_EXT'>;
		readonly COMPRESSED_RGBA_S3TC_DXT5_EXT: /* 0x83F3 */ GLenum<'COMPRESSED_RGBA_S3TC_DXT5_EXT'>;
	}
	interface Base_WEBGL_compressed_texture_s3tc {
		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: CompressedTextureFormatS3tc, width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ data: ArrayBufferView): void;
		compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: CompressedTextureFormatS3tc, /* [AllowShared] */ data: ArrayBufferView): void;
	}
	export type CompressedTextureFormatS3tc = WEBGL_compressed_texture_s3tc['COMPRESSED_RGB_S3TC_DXT1_EXT']
		| WEBGL_compressed_texture_s3tc['COMPRESSED_RGBA_S3TC_DXT1_EXT']
		| WEBGL_compressed_texture_s3tc['COMPRESSED_RGBA_S3TC_DXT3_EXT']
		| WEBGL_compressed_texture_s3tc['COMPRESSED_RGBA_S3TC_DXT5_EXT']

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/
	/* [NoInterfaceObject] */
	interface WEBGL_depth_texture {
		readonly UNSIGNED_INT_24_8_WEBGL: /* 0x84FA */ GLenum<'UNSIGNED_INT_24_8_WEBGL'>;
	}
	interface Base_WEBGL_depth_texture {
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['DEPTH_COMPONENT'], width: GLsizei, height: GLsizei, border: 0, format: Constants['DEPTH_COMPONENT'], type: Constants['UNSIGNED_SHORT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['DEPTH_COMPONENT'], width: GLsizei, height: GLsizei, border: 0, format: Constants['DEPTH_COMPONENT'], type: Constants['UNSIGNED_INT'], /* [AllowShared] */ pixels: Nullable<Uint32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['DEPTH_STENCIL'], width: GLsizei, height: GLsizei, border: 0, format: Constants['DEPTH_STENCIL'], type: WEBGL_depth_texture['UNSIGNED_INT_24_8_WEBGL'], /* [AllowShared] */ pixels: Nullable<Uint32Array>): void;

		// May throw DOMException:
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['DEPTH_COMPONENT'], format: Constants['DEPTH_COMPONENT'], type: Constants['UNSIGNED_SHORT'] | Constants['UNSIGNED_INT'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: Constants['DEPTH_STENCIL'], format: Constants['DEPTH_STENCIL'], type: WEBGL_depth_texture['UNSIGNED_INT_24_8_WEBGL'], source: TexImageSource): void;

		framebufferTexture2D(target: GL.FramebufferTarget, attachment: Constants['DEPTH_STENCIL_ATTACHMENT'], textarget: GL.TexImage2DTarget, texture: Nullable<WebGLTexture>, level: GLint): void;
	}

	// https://www.khronos.org/registry/webgl/extensions/Base_OES_element_index_uint/
	interface Base_OES_element_index_uint {
		drawElements(mode: GL.DrawMode, count: GLsizei, type: Base['UNSIGNED_INT'], offset: GLintptr): void
	}

	// https://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/
	/* [NoInterfaceObject] */
	interface EXT_texture_filter_anisotropic {
		readonly TEXTURE_MAX_ANISOTROPY_EXT:       /* 0x84FE */ GLenum<'TEXTURE_MAX_ANISOTROPY_EXT'>;
		readonly MAX_TEXTURE_MAX_ANISOTROPY_EXT:   /* 0x84FF */ GLenum<'MAX_TEXTURE_MAX_ANISOTROPY_EXT'>;
	}
	interface Base_EXT_texture_filter_anisotropic {
		getParameter(pname: EXT_texture_filter_anisotropic['MAX_TEXTURE_MAX_ANISOTROPY_EXT']): GLfloat
		getTexParameter(target: GL.TextureTarget, pname: EXT_texture_filter_anisotropic['TEXTURE_MAX_ANISOTROPY_EXT']): GLfloat
		texParameterf(target: GL.TextureTarget, pname: EXT_texture_filter_anisotropic['TEXTURE_MAX_ANISOTROPY_EXT'], param: GLfloat): void
	}

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_draw_buffers/
	/* [NoInterfaceObject] */
	interface WEBGL_draw_buffers {
		readonly COLOR_ATTACHMENT0_WEBGL: /* 0x8CE0 */ GLenum<'COLOR_ATTACHMENT0'>;
		readonly COLOR_ATTACHMENT1_WEBGL: /* 0x8CE1 */ GLenum<'COLOR_ATTACHMENT1_WEBGL'>;
		readonly COLOR_ATTACHMENT2_WEBGL: /* 0x8CE2 */ GLenum<'COLOR_ATTACHMENT2_WEBGL'>;
		readonly COLOR_ATTACHMENT3_WEBGL: /* 0x8CE3 */ GLenum<'COLOR_ATTACHMENT3_WEBGL'>;
		readonly COLOR_ATTACHMENT4_WEBGL: /* 0x8CE4 */ GLenum<'COLOR_ATTACHMENT4_WEBGL'>;
		readonly COLOR_ATTACHMENT5_WEBGL: /* 0x8CE5 */ GLenum<'COLOR_ATTACHMENT5_WEBGL'>;
		readonly COLOR_ATTACHMENT6_WEBGL: /* 0x8CE6 */ GLenum<'COLOR_ATTACHMENT6_WEBGL'>;
		readonly COLOR_ATTACHMENT7_WEBGL: /* 0x8CE7 */ GLenum<'COLOR_ATTACHMENT7_WEBGL'>;
		readonly COLOR_ATTACHMENT8_WEBGL: /* 0x8CE8 */ GLenum<'COLOR_ATTACHMENT8_WEBGL'>;
		readonly COLOR_ATTACHMENT9_WEBGL: /* 0x8CE9 */ GLenum<'COLOR_ATTACHMENT9_WEBGL'>;
		readonly COLOR_ATTACHMENT10_WEBGL: /* 0x8CEA */ GLenum<'COLOR_ATTACHMENT10_WEBGL'>;
		readonly COLOR_ATTACHMENT11_WEBGL: /* 0x8CEB */ GLenum<'COLOR_ATTACHMENT11_WEBGL'>;
		readonly COLOR_ATTACHMENT12_WEBGL: /* 0x8CEC */ GLenum<'COLOR_ATTACHMENT12_WEBGL'>;
		readonly COLOR_ATTACHMENT13_WEBGL: /* 0x8CED */ GLenum<'COLOR_ATTACHMENT13_WEBGL'>;
		readonly COLOR_ATTACHMENT14_WEBGL: /* 0x8CEE */ GLenum<'COLOR_ATTACHMENT14_WEBGL'>;
		readonly COLOR_ATTACHMENT15_WEBGL: /* 0x8CEF */ GLenum<'COLOR_ATTACHMENT15_WEBGL'>;

		readonly DRAW_BUFFER0_WEBGL: /* 0x8825 */ GLenum<'DRAW_BUFFER0_WEBGL'>;
		readonly DRAW_BUFFER1_WEBGL: /* 0x8826 */ GLenum<'DRAW_BUFFER1_WEBGL'>;
		readonly DRAW_BUFFER2_WEBGL: /* 0x8827 */ GLenum<'DRAW_BUFFER2_WEBGL'>;
		readonly DRAW_BUFFER3_WEBGL: /* 0x8828 */ GLenum<'DRAW_BUFFER3_WEBGL'>;
		readonly DRAW_BUFFER4_WEBGL: /* 0x8829 */ GLenum<'DRAW_BUFFER4_WEBGL'>;
		readonly DRAW_BUFFER5_WEBGL: /* 0x882A */ GLenum<'DRAW_BUFFER5_WEBGL'>;
		readonly DRAW_BUFFER6_WEBGL: /* 0x882B */ GLenum<'DRAW_BUFFER6_WEBGL'>;
		readonly DRAW_BUFFER7_WEBGL: /* 0x882C */ GLenum<'DRAW_BUFFER7_WEBGL'>;
		readonly DRAW_BUFFER8_WEBGL: /* 0x882D */ GLenum<'DRAW_BUFFER8_WEBGL'>;
		readonly DRAW_BUFFER9_WEBGL: /* 0x882E */ GLenum<'DRAW_BUFFER9_WEBGL'>;
		readonly DRAW_BUFFER10_WEBGL: /* 0x882F */ GLenum<'DRAW_BUFFER10_WEBGL'>;
		readonly DRAW_BUFFER11_WEBGL: /* 0x8830 */ GLenum<'DRAW_BUFFER11_WEBGL'>;
		readonly DRAW_BUFFER12_WEBGL: /* 0x8831 */ GLenum<'DRAW_BUFFER12_WEBGL'>;
		readonly DRAW_BUFFER13_WEBGL: /* 0x8832 */ GLenum<'DRAW_BUFFER13_WEBGL'>;
		readonly DRAW_BUFFER14_WEBGL: /* 0x8833 */ GLenum<'DRAW_BUFFER14_WEBGL'>;
		readonly DRAW_BUFFER15_WEBGL: /* 0x8834 */ GLenum<'DRAW_BUFFER15_WEBGL'>;

		readonly MAX_COLOR_ATTACHMENTS_WEBGL: /* 0x8CDF */ GLenum<'MAX_COLOR_ATTACHMENTS_WEBGL'>;
		readonly MAX_DRAW_BUFFERS_WEBGL: /* 0x8824 */ GLenum<'MAX_DRAW_BUFFERS_WEBGL'>;

		drawBuffersWEBGL(buffers: sequence<GL['NONE'] | GL['BACK'] | GL.ColorAttachment>): void;
	}
	interface Base_WEBGL_draw_buffers {
		getParameter(pname: WEBGL_draw_buffers['MAX_COLOR_ATTACHMENTS_WEBGL']): GLuint
		getParameter(pname: WEBGL_draw_buffers['MAX_DRAW_BUFFERS_WEBGL']): GLuint
		getParameter(pname: DrawBuffer): GL['NONE'] | GL['BACK'] | GL.ColorAttachment
		framebufferRenderbuffer(target: GL.FramebufferTarget, attachment: GL.ColorAttachment, renderbuffertarget: Base['RENDERBUFFER'], renderbuffer: Nullable<WebGLRenderbuffer>): void;
		framebufferTexture2D(target: GL.FramebufferTarget, attachment: GL.ColorAttachment, textarget: GL.TexImage2DTarget, texture: Nullable<WebGLTexture>, level: GLint): void;
	}
	// TODO: remove "_WEBGL" os it works with wgl2
	export type ColorAttachment = WEBGL_draw_buffers['COLOR_ATTACHMENT0_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT1_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT2_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT3_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT4_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT5_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT6_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT7_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT8_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT9_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT10_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT11_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT12_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT13_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT14_WEBGL']
		| WEBGL_draw_buffers['COLOR_ATTACHMENT15_WEBGL']
	export type DrawBuffer = WEBGL_draw_buffers['DRAW_BUFFER0_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER1_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER2_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER3_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER4_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER5_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER6_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER7_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER8_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER9_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER10_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER11_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER12_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER13_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER14_WEBGL']
		| WEBGL_draw_buffers['DRAW_BUFFER15_WEBGL']

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_draw_buffers/
	/* [NoInterfaceObject] */
	interface EXT_blend_minmax {
		readonly MIN_EXT: /* 0x8007 */ GLenum<'MIN_EXT'>;
		readonly MAX_EXT: /* 0x8008 */ GLenum<'MAX_EXT'>;
	}
	interface Base_EXT_blend_minmax {
		blendEquation(mode: GL.BlendEquationModeMinMax): void
		blendEquationSeparate(modeRGB: GL.BlendEquationModeMinMax, modeAlpha: GL.BlendEquationModeMinMax): void
	}
	type BlendEquationModeMinMax = EXT_blend_minmax['MIN_EXT'] | EXT_blend_minmax['MAX_EXT']

	// #########################################
	// ## Community approved WebGL Extensions ##
	// #########################################

	// https://www.khronos.org/registry/webgl/extensions/EXT_color_buffer_half_float/
	/* [NoInterfaceObject] */
	interface EXT_color_buffer_half_float {
		readonly RGBA16F_EXT:  /* 0x881A */ GLenum<'RGBA16F_EXT'>;
		readonly RGB16F_EXT:  /* 0x881B */ GLenum<'RGB16F_EXT'>;
		readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT:  /* 0x8211 */ GLenum<'FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT'>;
		readonly UNSIGNED_NORMALIZED_EXT:  /* 0x8C17 */ GLenum<'UNSIGNED_NORMALIZED_EXT'>;
	}
	interface Base_EXT_color_buffer_half_float {
		renderbufferStorage(target: GL.RenderbufferTarget, internalformat: EXT_color_buffer_half_float['RGBA16F_EXT'] | EXT_color_buffer_half_float['RGB16F_EXT'], width: GLsizei, height: GLsizei): void;
	}

	// https://www.khronos.org/registry/webgl/extensions/EXT_disjoint_timer_query/
	type GLuint64EXT = number; // WebIDL: unsigned long long
	/* [NoInterfaceObject] */
	interface WebGLTimerQueryEXT extends WebGLObject {
		__WebGLObjectBrand: 'WebGLTimerQueryEXT'
	}
	/* [NoInterfaceObject] */
	interface EXT_disjoint_timer_query {
		readonly QUERY_COUNTER_BITS_EXT:       /* 0x8864 */ GLenum<'QUERY_COUNTER_BITS_EXT'>;
		readonly CURRENT_QUERY_EXT:            /* 0x8865 */ GLenum<'CURRENT_QUERY_EXT'>;
		readonly QUERY_RESULT_EXT:             /* 0x8866 */ GLenum<'QUERY_RESULT_EXT'>;
		readonly QUERY_RESULT_AVAILABLE_EXT:   /* 0x8867 */ GLenum<'QUERY_RESULT_AVAILABLE_EXT'>;
		readonly TIME_ELAPSED_EXT:             /* 0x88BF */ GLenum<'TIME_ELAPSED_EXT'>;
		readonly TIMESTAMP_EXT:                /* 0x8E28 */ GLenum<'TIMESTAMP_EXT'>;
		readonly GPU_DISJOINT_EXT:             /* 0x8FBB */ GLenum<'GPU_DISJOINT_EXT'>;

		createQueryEXT(): WebGLTimerQueryEXT | null;
		deleteQueryEXT(query: Nullable<WebGLTimerQueryEXT>): void;
 		/* [WebGLHandlesContextLoss] */ isQueryEXT(query: Nullable<WebGLTimerQueryEXT>): boolean;
		beginQueryEXT(target: EXT_disjoint_timer_query['TIME_ELAPSED_EXT'], query: WebGLTimerQueryEXT): void;
		endQueryEXT(target: EXT_disjoint_timer_query['TIME_ELAPSED_EXT']): void;
		queryCounterEXT(query: WebGLTimerQueryEXT, target: EXT_disjoint_timer_query['TIMESTAMP_EXT']): void;

		getQueryEXT(target: EXT_disjoint_timer_query['TIME_ELAPSED_EXT'], pname: EXT_disjoint_timer_query['CURRENT_QUERY_EXT']): WebGLTimerQueryEXT | null;
		getQueryEXT(target: EXT_disjoint_timer_query['TIMESTAMP_EXT'], pname: EXT_disjoint_timer_query['CURRENT_QUERY_EXT']): null;
		getQueryEXT(target: EXT_disjoint_timer_query['TIME_ELAPSED_EXT'], pname: EXT_disjoint_timer_query['QUERY_COUNTER_BITS_EXT']): GLint;
		getQueryEXT(target: EXT_disjoint_timer_query['TIMESTAMP_EXT'], pname: EXT_disjoint_timer_query['QUERY_COUNTER_BITS_EXT']): GLint;

		getQueryObjectEXT(query: WebGLTimerQueryEXT, pname: EXT_disjoint_timer_query['QUERY_RESULT_EXT']): GLuint64EXT;
		getQueryObjectEXT(query: WebGLTimerQueryEXT, pname: EXT_disjoint_timer_query['QUERY_RESULT_AVAILABLE_EXT']): boolean;
	}
	interface Base_EXT_disjoint_timer_query {
		getParameter(pname: EXT_disjoint_timer_query['TIMESTAMP_EXT']): GLuint64EXT
		getParameter(pname: EXT_disjoint_timer_query['GPU_DISJOINT_EXT']): boolean
	}

	// https://www.khronos.org/registry/webgl/extensions/EXT_sRGB/
	/* [NoInterfaceObject] */
    interface EXT_sRGB {
      readonly SRGB_EXT:                                      /* 0x8C40 */ GLenum<'SRGB_EXT'>;
      readonly SRGB_ALPHA_EXT:                                /* 0x8C42 */ GLenum<'SRGB_ALPHA_EXT'>;
      readonly SRGB8_ALPHA8_EXT:                              /* 0x8C43 */ GLenum<'SRGB8_ALPHA8_EXT'>;
      readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT:     /* 0x8210 */ GLenum<'FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT'>;
    }
	interface Base_EXT_sRGB {
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: EXT_sRGB['SRGB_EXT'], width: GLsizei, height: GLsizei, border: 0, format: EXT_sRGB['SRGB_EXT'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable< Uint8Array >): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: EXT_sRGB['SRGB_ALPHA_EXT'], width: GLsizei, height: GLsizei, border: 0, format: EXT_sRGB['SRGB_ALPHA_EXT'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable< Uint8Array >): void;

		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: EXT_sRGB['SRGB_EXT'], format: EXT_sRGB['SRGB_EXT'], type: Constants['UNSIGNED_BYTE'], source: TexImageSource): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: EXT_sRGB['SRGB_ALPHA_EXT'], format: EXT_sRGB['SRGB_ALPHA_EXT'], type: Constants['UNSIGNED_BYTE'], source: TexImageSource): void;

		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: EXT_sRGB['SRGB_EXT'] | EXT_sRGB['SRGB_ALPHA_EXT'], type: Constants['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable< Uint8Array >): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: EXT_sRGB['SRGB_EXT'] | EXT_sRGB['SRGB_ALPHA_EXT'], type: Constants['UNSIGNED_BYTE'], source: TexImageSource): void;

		renderbufferStorage(target: GL.RenderbufferTarget, internalformat: EXT_sRGB['SRGB8_ALPHA8_EXT'], width: GLsizei, height: GLsizei): void;

		getFramebufferAttachmentParameter(target: GL['FRAMEBUFFER'], attachment: GL.ColorAttachment, pname: EXT_sRGB['FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT']): GL['LINEAR'] | EXT_sRGB['SRGB_EXT']
	}

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_color_buffer_float/
	/* [NoInterfaceObject] */
	interface WEBGL_color_buffer_float {
		readonly RGBA32F_EXT:  /* 0x8814 */ GLenum<'RGBA32F_EXT'>;
		readonly RGB32F_EXT:  /* 0x8815 */ GLenum<'RGB32F_EXT'>;
		readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT:  /* 0x8211 */ GLenum<'FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT'>;
		readonly UNSIGNED_NORMALIZED_EXT:  /* 0x8C17 */ GLenum<'UNSIGNED_NORMALIZED_EXT'>;
	}
	interface Base_WEBGL_color_buffer_float {
		renderbufferStorage(target: GL.RenderbufferTarget, internalformat: WEBGL_color_buffer_float['RGBA32F_EXT'] | WEBGL_color_buffer_float['RGB32F_EXT'], width: GLsizei, height: GLsizei): void;
	}

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
	/* [NoInterfaceObject] */
	interface WEBGL_compressed_texture_astc {
		/* Compressed Texture Format */
		readonly COMPRESSED_RGBA_ASTC_4x4_KHR:  /* 0x93B0 */ GLenum<'COMPRESSED_RGBA_ASTC_4x4_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_5x4_KHR:  /* 0x93B1 */ GLenum<'COMPRESSED_RGBA_ASTC_5x4_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_5x5_KHR:  /* 0x93B2 */ GLenum<'COMPRESSED_RGBA_ASTC_5x5_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_6x5_KHR:  /* 0x93B3 */ GLenum<'COMPRESSED_RGBA_ASTC_6x5_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_6x6_KHR:  /* 0x93B4 */ GLenum<'COMPRESSED_RGBA_ASTC_6x6_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_8x5_KHR:  /* 0x93B5 */ GLenum<'COMPRESSED_RGBA_ASTC_8x5_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_8x6_KHR:  /* 0x93B6 */ GLenum<'COMPRESSED_RGBA_ASTC_8x6_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_8x8_KHR:  /* 0x93B7 */ GLenum<'COMPRESSED_RGBA_ASTC_8x8_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_10x5_KHR:  /* 0x93B8 */ GLenum<'COMPRESSED_RGBA_ASTC_10x5_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_10x6_KHR:  /* 0x93B9 */ GLenum<'COMPRESSED_RGBA_ASTC_10x6_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_10x8_KHR:  /* 0x93BA */ GLenum<'COMPRESSED_RGBA_ASTC_10x8_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_10x10_KHR:  /* 0x93BB */ GLenum<'COMPRESSED_RGBA_ASTC_10x10_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_12x10_KHR:  /* 0x93BC */ GLenum<'COMPRESSED_RGBA_ASTC_12x10_KHR'>;
		readonly COMPRESSED_RGBA_ASTC_12x12_KHR:  /* 0x93BD */ GLenum<'COMPRESSED_RGBA_ASTC_12x12_KHR'>;

		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:  /* 0x93D0 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:  /* 0x93D1 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:  /* 0x93D2 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:  /* 0x93D3 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:  /* 0x93D4 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:  /* 0x93D5 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:  /* 0x93D6 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:  /* 0x93D7 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:  /* 0x93D8 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:  /* 0x93D9 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:  /* 0x93DA */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:  /* 0x93DB */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:  /* 0x93DC */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:  /* 0x93DD */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR'>;

		// Profile query support.
		getSupportedProfiles(): sequence<DOMString>;
	}
	interface Base_WEBGL_compressed_texture_astc {
		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: CompressedTextureFormatAstc, width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ data: ArrayBufferView): void;
		compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: CompressedTextureFormatAstc, /* [AllowShared] */ data: ArrayBufferView): void;
	}
	type CompressedTextureFormatAstc = WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_4x4_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_5x4_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_5x5_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_6x5_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_6x6_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_8x5_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_8x6_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_8x8_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_10x5_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_10x6_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_10x8_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_10x10_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_12x10_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_RGBA_ASTC_12x12_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR']
		| WEBGL_compressed_texture_astc['COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR']

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_atc/
	/* [NoInterfaceObject] */
	interface WEBGL_compressed_texture_atc {
		/* Compressed Texture Formats */
		readonly COMPRESSED_RGB_ATC_WEBGL:                      /* 0x8C92 */ GLenum<'COMPRESSED_RGB_ATC_WEBGL'>;
		readonly COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL:      /* 0x8C93 */ GLenum<'COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL'>;
		readonly COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL:  /* 0x87EE */ GLenum<'COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL'>;
	}
	interface Base_WEBGL_compressed_texture_atc {
		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: CompressedTextureFormatAtc, width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ data: ArrayBufferView): void;
		compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: CompressedTextureFormatAtc, /* [AllowShared] */ data: ArrayBufferView): void;
	}
	type CompressedTextureFormatAtc = WEBGL_compressed_texture_atc['COMPRESSED_RGB_ATC_WEBGL']
		| WEBGL_compressed_texture_atc['COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL']
		| WEBGL_compressed_texture_atc['COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL']

		// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc/
		/* [NoInterfaceObject] */
		interface WEBGL_compressed_texture_etc {
			/* Compressed Texture Formats */
		readonly COMPRESSED_R11_EAC:                         /* 0x9270 */ GLenum<'COMPRESSED_R11_EAC'>;
		readonly COMPRESSED_SIGNED_R11_EAC:                  /* 0x9271 */ GLenum<'COMPRESSED_SIGNED_R11_EAC'>;
		readonly COMPRESSED_RG11_EAC:                        /* 0x9272 */ GLenum<'COMPRESSED_RG11_EAC'>;
		readonly COMPRESSED_SIGNED_RG11_EAC:                 /* 0x9273 */ GLenum<'COMPRESSED_SIGNED_RG11_EAC'>;
		readonly COMPRESSED_RGB8_ETC2:                       /* 0x9274 */ GLenum<'COMPRESSED_RGB8_ETC2'>;
		readonly COMPRESSED_SRGB8_ETC2:                      /* 0x9275 */ GLenum<'COMPRESSED_SRGB8_ETC2'>;
		readonly COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2:   /* 0x9276 */ GLenum<'COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2'>;
		readonly COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2:  /* 0x9277 */ GLenum<'COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2'>;
		readonly COMPRESSED_RGBA8_ETC2_EAC:                  /* 0x9278 */ GLenum<'COMPRESSED_RGBA8_ETC2_EAC'>;
		readonly COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:           /* 0x9279 */ GLenum<'COMPRESSED_SRGB8_ALPHA8_ETC2_EAC'>;
	}
	interface Base_WEBGL_compressed_texture_etc {
		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: CompressedTextureFormatEtc, width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ data: ArrayBufferView): void;
		compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: CompressedTextureFormatEtc, /* [AllowShared] */ data: ArrayBufferView): void;
	}
	type CompressedTextureFormatEtc = WEBGL_compressed_texture_etc['COMPRESSED_R11_EAC']
		| WEBGL_compressed_texture_etc['COMPRESSED_SIGNED_R11_EAC']
		| WEBGL_compressed_texture_etc['COMPRESSED_RG11_EAC']
		| WEBGL_compressed_texture_etc['COMPRESSED_SIGNED_RG11_EAC']
		| WEBGL_compressed_texture_etc['COMPRESSED_RGB8_ETC2']
		| WEBGL_compressed_texture_etc['COMPRESSED_SRGB8_ETC2']
		| WEBGL_compressed_texture_etc['COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2']
		| WEBGL_compressed_texture_etc['COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2']
		| WEBGL_compressed_texture_etc['COMPRESSED_RGBA8_ETC2_EAC']
		| WEBGL_compressed_texture_etc['COMPRESSED_SRGB8_ALPHA8_ETC2_EAC']

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc1/
	/* [NoInterfaceObject] */
	interface WEBGL_compressed_texture_etc1 {
		/* Compressed Texture Formats */
		readonly COMPRESSED_RGB_ETC1_WEBGL:  /* 0x8D64 */ GLenum<'COMPRESSED_RGB_ETC1_WEBGL'>;
	}
	interface Base_WEBGL_compressed_texture_etc1 {
		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: WEBGL_compressed_texture_etc1['COMPRESSED_RGB_ETC1_WEBGL'], width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ data: ArrayBufferView): void;
		// not supported for compressedTexSubImage2D
	}

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/
	/* [NoInterfaceObject] */
	interface WEBGL_compressed_texture_pvrtc {
		/* Compressed Texture Formats */
		readonly COMPRESSED_RGB_PVRTC_4BPPV1_IMG:       /* 0x8C00 */ GLenum<'COMPRESSED_RGB_PVRTC_4BPPV1_IMG'>;
		readonly COMPRESSED_RGB_PVRTC_2BPPV1_IMG:       /* 0x8C01 */ GLenum<'COMPRESSED_RGB_PVRTC_2BPPV1_IMG'>;
		readonly COMPRESSED_RGBA_PVRTC_4BPPV1_IMG:      /* 0x8C02 */ GLenum<'COMPRESSED_RGBA_PVRTC_4BPPV1_IMG'>;
		readonly COMPRESSED_RGBA_PVRTC_2BPPV1_IMG:      /* 0x8C03 */ GLenum<'COMPRESSED_RGBA_PVRTC_2BPPV1_IMG'>;
	}
	interface Base_WEBGL_compressed_texture_pvrtc {
		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: CompressedTextureFormatPvrtc, width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ data: ArrayBufferView): void;
		compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: CompressedTextureFormatPvrtc, /* [AllowShared] */ data: ArrayBufferView): void;
	}
	type CompressedTextureFormatPvrtc = WEBGL_compressed_texture_pvrtc['COMPRESSED_RGB_PVRTC_4BPPV1_IMG']
		| WEBGL_compressed_texture_pvrtc['COMPRESSED_RGB_PVRTC_2BPPV1_IMG']
		| WEBGL_compressed_texture_pvrtc['COMPRESSED_RGBA_PVRTC_4BPPV1_IMG']
		| WEBGL_compressed_texture_pvrtc['COMPRESSED_RGBA_PVRTC_2BPPV1_IMG']

	// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
	/* [NoInterfaceObject] */
	interface WEBGL_compressed_texture_s3tc_srgb {
		/* Compressed Texture Formats */
		readonly COMPRESSED_SRGB_S3TC_DXT1_EXT:         /* 0x8C4C */ GLenum<'COMPRESSED_SRGB_S3TC_DXT1_EXT'>;
		readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT:   /* 0x8C4D */ GLenum<'COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT'>;
		readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT:   /* 0x8C4E */ GLenum<'COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT'>;
		readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT:   /* 0x8C4F */ GLenum<'COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT'>;
	}
	interface Base_WEBGL_compressed_texture_s3tc_srgb {
		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: CompressedTextureFormatS3tcSrgb, width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ data: ArrayBufferView): void;
		compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: CompressedTextureFormatS3tcSrgb, /* [AllowShared] */ data: ArrayBufferView): void;
	}
	type CompressedTextureFormatS3tcSrgb = WEBGL_compressed_texture_s3tc_srgb['COMPRESSED_SRGB_S3TC_DXT1_EXT']
		| WEBGL_compressed_texture_s3tc_srgb['COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT']
		| WEBGL_compressed_texture_s3tc_srgb['COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT']
		| WEBGL_compressed_texture_s3tc_srgb['COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT']
}

type WebGLRenderingContextStrict = WebGLRenderingContextStrict.Base &
	WebGLRenderingContextStrict.Extra &
	WebGLRenderingContextStrict.Base_ANGLE_instanced_arrays &
	WebGLRenderingContextStrict.Base_EXT_blend_minmax &
	WebGLRenderingContextStrict.Base_EXT_texture_filter_anisotropic &
	WebGLRenderingContextStrict.Base_OES_element_index_uint &
	WebGLRenderingContextStrict.Base_OES_standard_derivatives &
	WebGLRenderingContextStrict.Base_OES_texture_float &
	WebGLRenderingContextStrict.Base_OES_texture_half_float &
	WebGLRenderingContextStrict.Base_WEBGL_compressed_texture_s3tc &
	WebGLRenderingContextStrict.Base_WEBGL_debug_renderer_info &
	WebGLRenderingContextStrict.Base_WEBGL_depth_texture &
	WebGLRenderingContextStrict.Base_WEBGL_draw_buffers &

	WebGLRenderingContextStrict.Base_EXT_color_buffer_half_float &
	WebGLRenderingContextStrict.Base_EXT_disjoint_timer_query &
	WebGLRenderingContextStrict.Base_EXT_sRGB &
	WebGLRenderingContextStrict.Base_WEBGL_color_buffer_float &
	WebGLRenderingContextStrict.Base_WEBGL_compressed_texture_astc &
	WebGLRenderingContextStrict.Base_WEBGL_compressed_texture_atc &
	WebGLRenderingContextStrict.Base_WEBGL_compressed_texture_etc &
	WebGLRenderingContextStrict.Base_WEBGL_compressed_texture_etc1 &
	WebGLRenderingContextStrict.Base_WEBGL_compressed_texture_pvrtc &
	WebGLRenderingContextStrict.Base_WEBGL_compressed_texture_s3tc_srgb

declare var WebGLRenderingContext: WebGLRenderingContextStrict.Constants & {
	prototype: WebGLRenderingContextStrict
	new(_: never): WebGLRenderingContextStrict
}

interface WebGLContextEvent extends Event {
    readonly statusMessage: string;
}


// EventInit is defined in the DOM4 specification.
interface WebGLContextEventInit extends EventInit {
    statusMessage?: string;
}
declare var WebGLContextEvent: {
    prototype: WebGLContextEvent;
    new(typeArg: string, eventInitDict?: WebGLContextEventInit): WebGLContextEvent;
}
