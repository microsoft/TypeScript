/// <reference path="./webgl.d.ts" />

interface HTMLCanvasElement extends HTMLElement {
    getContext(contextId: "webgl2" | "experimental-webgl2", contextAttributes?: WebGLContextAttributes): WebGL2RenderingContext | null;
}

type GLint64 = number
type GLuint64 = number
interface WebGLQuery extends WebGLObject {
	__WebGLObjectBrand: 'WebGLQuery'
}
declare var WebGLQuery: {
	prototype: WebGLQuery
	new(_: never): WebGLQuery
}

interface WebGLSampler extends WebGLObject {
	__WebGLObjectBrand: 'WebGLSampler'
}
declare var WebGLSampler: {
	prototype: WebGLSampler
	new(_: never): WebGLSampler
}

interface WebGLSync extends WebGLObject {
	__WebGLObjectBrand: 'WebGLSync'
}
declare var WebGLSync: {
	prototype: WebGLSync
	new(_: never): WebGLSync
}

interface WebGLTransformFeedback extends WebGLObject {
	__WebGLObjectBrand: 'WebGLTransformFeedback'
}
declare var WebGLTransformFeedback: {
	prototype: WebGLTransformFeedback
	new(_: never): WebGLTransformFeedback
}

interface WebGLVertexArrayObject extends WebGLObject {
	__WebGLObjectBrand: 'WebGLVertexArrayObject'
}
declare var WebGLVertexArrayObject: {
	prototype: WebGLVertexArrayObject
	new(_: never): WebGLVertexArrayObject
}

type Uint32List = /* [AllowShared] */ Uint32Array | sequence<GLuint>;
declare namespace WebGL2RenderingContext {
	import GL = WebGLRenderingContextStrict
	import GLenum = GL.GLenum
	import GL2 = WebGL2RenderingContext
	interface Constants {
		readonly READ_BUFFER:                                   /* 0x0C02 */ GLenum<'READ_BUFFER'>
		readonly UNPACK_ROW_LENGTH:                             /* 0x0CF2 */ GLenum<'UNPACK_ROW_LENGTH'>
		readonly UNPACK_SKIP_ROWS:                              /* 0x0CF3 */ GLenum<'UNPACK_SKIP_ROWS'>
		readonly UNPACK_SKIP_PIXELS:                            /* 0x0CF4 */ GLenum<'UNPACK_SKIP_PIXELS'>
		readonly PACK_ROW_LENGTH:                               /* 0x0D02 */ GLenum<'PACK_ROW_LENGTH'>
		readonly PACK_SKIP_ROWS:                                /* 0x0D03 */ GLenum<'PACK_SKIP_ROWS'>
		readonly PACK_SKIP_PIXELS:                              /* 0x0D04 */ GLenum<'PACK_SKIP_PIXELS'>
		readonly COLOR:                                         /* 0x1800 */ GLenum<'COLOR'>
		readonly DEPTH:                                         /* 0x1801 */ GLenum<'DEPTH'>
		readonly STENCIL:                                       /* 0x1802 */ GLenum<'STENCIL'>
		readonly RED:                                           /* 0x1903 */ GLenum<'RED'>
		readonly RGB8:                                          /* 0x8051 */ GLenum<'RGB8'>
		readonly RGBA8:                                         /* 0x8058 */ GLenum<'RGBA8'>
		readonly RGB10_A2:                                      /* 0x8059 */ GLenum<'RGB10_A2'>
		readonly TEXTURE_BINDING_3D:                            /* 0x806A */ GLenum<'TEXTURE_BINDING_3D'>
		readonly UNPACK_SKIP_IMAGES:                            /* 0x806D */ GLenum<'UNPACK_SKIP_IMAGES'>
		readonly UNPACK_IMAGE_HEIGHT:                           /* 0x806E */ GLenum<'UNPACK_IMAGE_HEIGHT'>
		readonly TEXTURE_3D:                                    /* 0x806F */ GLenum<'TEXTURE_3D'>
		readonly TEXTURE_WRAP_R:                                /* 0x8072 */ GLenum<'TEXTURE_WRAP_R'>
		readonly MAX_3D_TEXTURE_SIZE:                           /* 0x8073 */ GLenum<'MAX_3D_TEXTURE_SIZE'>
		readonly UNSIGNED_INT_2_10_10_10_REV:                   /* 0x8368 */ GLenum<'UNSIGNED_INT_2_10_10_10_REV'>
		readonly MAX_ELEMENTS_VERTICES:                         /* 0x80E8 */ GLenum<'MAX_ELEMENTS_VERTICES'>
		readonly MAX_ELEMENTS_INDICES:                          /* 0x80E9 */ GLenum<'MAX_ELEMENTS_INDICES'>
		readonly TEXTURE_MIN_LOD:                               /* 0x813A */ GLenum<'TEXTURE_MIN_LOD'>
		readonly TEXTURE_MAX_LOD:                               /* 0x813B */ GLenum<'TEXTURE_MAX_LOD'>
		readonly TEXTURE_BASE_LEVEL:                            /* 0x813C */ GLenum<'TEXTURE_BASE_LEVEL'>
		readonly TEXTURE_MAX_LEVEL:                             /* 0x813D */ GLenum<'TEXTURE_MAX_LEVEL'>
		readonly MIN:                                           /* 0x8007 */ GLenum<'MIN'>
		readonly MAX:                                           /* 0x8008 */ GLenum<'MAX'>
		readonly DEPTH_COMPONENT24:                             /* 0x81A6 */ GLenum<'DEPTH_COMPONENT24'>
		readonly MAX_TEXTURE_LOD_BIAS:                          /* 0x84FD */ GLenum<'MAX_TEXTURE_LOD_BIAS'>
		readonly TEXTURE_COMPARE_MODE:                          /* 0x884C */ GLenum<'TEXTURE_COMPARE_MODE'>
		readonly TEXTURE_COMPARE_FUNC:                          /* 0x884D */ GLenum<'TEXTURE_COMPARE_FUNC'>
		readonly CURRENT_QUERY:                                 /* 0x8865 */ GLenum<'CURRENT_QUERY'>
		readonly QUERY_RESULT:                                  /* 0x8866 */ GLenum<'QUERY_RESULT'>
		readonly QUERY_RESULT_AVAILABLE:                        /* 0x8867 */ GLenum<'QUERY_RESULT_AVAILABLE'>
		readonly STREAM_READ:                                   /* 0x88E1 */ GLenum<'STREAM_READ'>
		readonly STREAM_COPY:                                   /* 0x88E2 */ GLenum<'STREAM_COPY'>
		readonly STATIC_READ:                                   /* 0x88E5 */ GLenum<'STATIC_READ'>
		readonly STATIC_COPY:                                   /* 0x88E6 */ GLenum<'STATIC_COPY'>
		readonly DYNAMIC_READ:                                  /* 0x88E9 */ GLenum<'DYNAMIC_READ'>
		readonly DYNAMIC_COPY:                                  /* 0x88EA */ GLenum<'DYNAMIC_COPY'>
		readonly MAX_DRAW_BUFFERS:                              /* 0x8824 */ GLenum<'MAX_DRAW_BUFFERS'>
		readonly DRAW_BUFFER0:                                  /* 0x8825 */ GLenum<'DRAW_BUFFER0'>
		readonly DRAW_BUFFER1:                                  /* 0x8826 */ GLenum<'DRAW_BUFFER1'>
		readonly DRAW_BUFFER2:                                  /* 0x8827 */ GLenum<'DRAW_BUFFER2'>
		readonly DRAW_BUFFER3:                                  /* 0x8828 */ GLenum<'DRAW_BUFFER3'>
		readonly DRAW_BUFFER4:                                  /* 0x8829 */ GLenum<'DRAW_BUFFER4'>
		readonly DRAW_BUFFER5:                                  /* 0x882A */ GLenum<'DRAW_BUFFER5'>
		readonly DRAW_BUFFER6:                                  /* 0x882B */ GLenum<'DRAW_BUFFER6'>
		readonly DRAW_BUFFER7:                                  /* 0x882C */ GLenum<'DRAW_BUFFER7'>
		readonly DRAW_BUFFER8:                                  /* 0x882D */ GLenum<'DRAW_BUFFER8'>
		readonly DRAW_BUFFER9:                                  /* 0x882E */ GLenum<'DRAW_BUFFER9'>
		readonly DRAW_BUFFER10:                                 /* 0x882F */ GLenum<'DRAW_BUFFER10'>
		readonly DRAW_BUFFER11:                                 /* 0x8830 */ GLenum<'DRAW_BUFFER11'>
		readonly DRAW_BUFFER12:                                 /* 0x8831 */ GLenum<'DRAW_BUFFER12'>
		readonly DRAW_BUFFER13:                                 /* 0x8832 */ GLenum<'DRAW_BUFFER13'>
		readonly DRAW_BUFFER14:                                 /* 0x8833 */ GLenum<'DRAW_BUFFER14'>
		readonly DRAW_BUFFER15:                                 /* 0x8834 */ GLenum<'DRAW_BUFFER15'>
		readonly MAX_FRAGMENT_UNIFORM_COMPONENTS:               /* 0x8B49 */ GLenum<'MAX_FRAGMENT_UNIFORM_COMPONENTS'>
		readonly MAX_VERTEX_UNIFORM_COMPONENTS:                 /* 0x8B4A */ GLenum<'MAX_VERTEX_UNIFORM_COMPONENTS'>
		readonly SAMPLER_3D:                                    /* 0x8B5F */ GLenum<'SAMPLER_3D'>
		readonly SAMPLER_2D_SHADOW:                             /* 0x8B62 */ GLenum<'SAMPLER_2D_SHADOW'>
		readonly FRAGMENT_SHADER_DERIVATIVE_HINT:               /* 0x8B8B */ GLenum<'FRAGMENT_SHADER_DERIVATIVE_HINT'>
		readonly PIXEL_PACK_BUFFER:                             /* 0x88EB */ GLenum<'PIXEL_PACK_BUFFER'>
		readonly PIXEL_UNPACK_BUFFER:                           /* 0x88EC */ GLenum<'PIXEL_UNPACK_BUFFER'>
		readonly PIXEL_PACK_BUFFER_BINDING:                     /* 0x88ED */ GLenum<'PIXEL_PACK_BUFFER_BINDING'>
		readonly PIXEL_UNPACK_BUFFER_BINDING:                   /* 0x88EF */ GLenum<'PIXEL_UNPACK_BUFFER_BINDING'>
		readonly FLOAT_MAT2x3:                                  /* 0x8B65 */ GLenum<'FLOAT_MAT2x3'>
		readonly FLOAT_MAT2x4:                                  /* 0x8B66 */ GLenum<'FLOAT_MAT2x4'>
		readonly FLOAT_MAT3x2:                                  /* 0x8B67 */ GLenum<'FLOAT_MAT3x2'>
		readonly FLOAT_MAT3x4:                                  /* 0x8B68 */ GLenum<'FLOAT_MAT3x4'>
		readonly FLOAT_MAT4x2:                                  /* 0x8B69 */ GLenum<'FLOAT_MAT4x2'>
		readonly FLOAT_MAT4x3:                                  /* 0x8B6A */ GLenum<'FLOAT_MAT4x3'>
		readonly SRGB:                                          /* 0x8C40 */ GLenum<'SRGB'>
		readonly SRGB8:                                         /* 0x8C41 */ GLenum<'SRGB8'>
		readonly SRGB8_ALPHA8:                                  /* 0x8C43 */ GLenum<'SRGB8_ALPHA8'>
		readonly COMPARE_REF_TO_TEXTURE:                        /* 0x884E */ GLenum<'COMPARE_REF_TO_TEXTURE'>
		readonly RGBA32F:                                       /* 0x8814 */ GLenum<'RGBA32F'>
		readonly RGB32F:                                        /* 0x8815 */ GLenum<'RGB32F'>
		readonly RGBA16F:                                       /* 0x881A */ GLenum<'RGBA16F'>
		readonly RGB16F:                                        /* 0x881B */ GLenum<'RGB16F'>
		readonly VERTEX_ATTRIB_ARRAY_INTEGER:                   /* 0x88FD */ GLenum<'VERTEX_ATTRIB_ARRAY_INTEGER'>
		readonly MAX_ARRAY_TEXTURE_LAYERS:                      /* 0x88FF */ GLenum<'MAX_ARRAY_TEXTURE_LAYERS'>
		readonly MIN_PROGRAM_TEXEL_OFFSET:                      /* 0x8904 */ GLenum<'MIN_PROGRAM_TEXEL_OFFSET'>
		readonly MAX_PROGRAM_TEXEL_OFFSET:                      /* 0x8905 */ GLenum<'MAX_PROGRAM_TEXEL_OFFSET'>
		readonly MAX_VARYING_COMPONENTS:                        /* 0x8B4B */ GLenum<'MAX_VARYING_COMPONENTS'>
		readonly TEXTURE_2D_ARRAY:                              /* 0x8C1A */ GLenum<'TEXTURE_2D_ARRAY'>
		readonly TEXTURE_BINDING_2D_ARRAY:                      /* 0x8C1D */ GLenum<'TEXTURE_BINDING_2D_ARRAY'>
		readonly R11F_G11F_B10F:                                /* 0x8C3A */ GLenum<'R11F_G11F_B10F'>
		readonly UNSIGNED_INT_10F_11F_11F_REV:                  /* 0x8C3B */ GLenum<'UNSIGNED_INT_10F_11F_11F_REV'>
		readonly RGB9_E5:                                       /* 0x8C3D */ GLenum<'RGB9_E5'>
		readonly UNSIGNED_INT_5_9_9_9_REV:                      /* 0x8C3E */ GLenum<'UNSIGNED_INT_5_9_9_9_REV'>
		readonly TRANSFORM_FEEDBACK_BUFFER_MODE:                /* 0x8C7F */ GLenum<'TRANSFORM_FEEDBACK_BUFFER_MODE'>
		readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS:    /* 0x8C80 */ GLenum<'MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS'>
		readonly TRANSFORM_FEEDBACK_VARYINGS:                   /* 0x8C83 */ GLenum<'TRANSFORM_FEEDBACK_VARYINGS'>
		readonly TRANSFORM_FEEDBACK_BUFFER_START:               /* 0x8C84 */ GLenum<'TRANSFORM_FEEDBACK_BUFFER_START'>
		readonly TRANSFORM_FEEDBACK_BUFFER_SIZE:                /* 0x8C85 */ GLenum<'TRANSFORM_FEEDBACK_BUFFER_SIZE'>
		readonly TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN:         /* 0x8C88 */ GLenum<'TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN'>
		readonly RASTERIZER_DISCARD:                            /* 0x8C89 */ GLenum<'RASTERIZER_DISCARD'>
		readonly MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: /* 0x8C8A */ GLenum<'MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS'>
		readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS:       /* 0x8C8B */ GLenum<'MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS'>
		readonly INTERLEAVED_ATTRIBS:                           /* 0x8C8C */ GLenum<'INTERLEAVED_ATTRIBS'>
		readonly SEPARATE_ATTRIBS:                              /* 0x8C8D */ GLenum<'SEPARATE_ATTRIBS'>
		readonly TRANSFORM_FEEDBACK_BUFFER:                     /* 0x8C8E */ GLenum<'TRANSFORM_FEEDBACK_BUFFER'>
		readonly TRANSFORM_FEEDBACK_BUFFER_BINDING:             /* 0x8C8F */ GLenum<'TRANSFORM_FEEDBACK_BUFFER_BINDING'>
		readonly RGBA32UI:                                      /* 0x8D70 */ GLenum<'RGBA32UI'>
		readonly RGB32UI:                                       /* 0x8D71 */ GLenum<'RGB32UI'>
		readonly RGBA16UI:                                      /* 0x8D76 */ GLenum<'RGBA16UI'>
		readonly RGB16UI:                                       /* 0x8D77 */ GLenum<'RGB16UI'>
		readonly RGBA8UI:                                       /* 0x8D7C */ GLenum<'RGBA8UI'>
		readonly RGB8UI:                                        /* 0x8D7D */ GLenum<'RGB8UI'>
		readonly RGBA32I:                                       /* 0x8D82 */ GLenum<'RGBA32I'>
		readonly RGB32I:                                        /* 0x8D83 */ GLenum<'RGB32I'>
		readonly RGBA16I:                                       /* 0x8D88 */ GLenum<'RGBA16I'>
		readonly RGB16I:                                        /* 0x8D89 */ GLenum<'RGB16I'>
		readonly RGBA8I:                                        /* 0x8D8E */ GLenum<'RGBA8I'>
		readonly RGB8I:                                         /* 0x8D8F */ GLenum<'RGB8I'>
		readonly RED_INTEGER:                                   /* 0x8D94 */ GLenum<'RED_INTEGER'>
		readonly RGB_INTEGER:                                   /* 0x8D98 */ GLenum<'RGB_INTEGER'>
		readonly RGBA_INTEGER:                                  /* 0x8D99 */ GLenum<'RGBA_INTEGER'>
		readonly SAMPLER_2D_ARRAY:                              /* 0x8DC1 */ GLenum<'SAMPLER_2D_ARRAY'>
		readonly SAMPLER_2D_ARRAY_SHADOW:                       /* 0x8DC4 */ GLenum<'SAMPLER_2D_ARRAY_SHADOW'>
		readonly SAMPLER_CUBE_SHADOW:                           /* 0x8DC5 */ GLenum<'SAMPLER_CUBE_SHADOW'>
		readonly UNSIGNED_INT_VEC2:                             /* 0x8DC6 */ GLenum<'UNSIGNED_INT_VEC2'>
		readonly UNSIGNED_INT_VEC3:                             /* 0x8DC7 */ GLenum<'UNSIGNED_INT_VEC3'>
		readonly UNSIGNED_INT_VEC4:                             /* 0x8DC8 */ GLenum<'UNSIGNED_INT_VEC4'>
		readonly INT_SAMPLER_2D:                                /* 0x8DCA */ GLenum<'INT_SAMPLER_2D'>
		readonly INT_SAMPLER_3D:                                /* 0x8DCB */ GLenum<'INT_SAMPLER_3D'>
		readonly INT_SAMPLER_CUBE:                              /* 0x8DCC */ GLenum<'INT_SAMPLER_CUBE'>
		readonly INT_SAMPLER_2D_ARRAY:                          /* 0x8DCF */ GLenum<'INT_SAMPLER_2D_ARRAY'>
		readonly UNSIGNED_INT_SAMPLER_2D:                       /* 0x8DD2 */ GLenum<'UNSIGNED_INT_SAMPLER_2D'>
		readonly UNSIGNED_INT_SAMPLER_3D:                       /* 0x8DD3 */ GLenum<'UNSIGNED_INT_SAMPLER_3D'>
		readonly UNSIGNED_INT_SAMPLER_CUBE:                     /* 0x8DD4 */ GLenum<'UNSIGNED_INT_SAMPLER_CUBE'>
		readonly UNSIGNED_INT_SAMPLER_2D_ARRAY:                 /* 0x8DD7 */ GLenum<'UNSIGNED_INT_SAMPLER_2D_ARRAY'>
		readonly DEPTH_COMPONENT32F:                            /* 0x8CAC */ GLenum<'DEPTH_COMPONENT32F'>
		readonly DEPTH32F_STENCIL8:                             /* 0x8CAD */ GLenum<'DEPTH32F_STENCIL8'>
		readonly FLOAT_32_UNSIGNED_INT_24_8_REV:                /* 0x8DAD */ GLenum<'FLOAT_32_UNSIGNED_INT_24_8_REV'>
		readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING:         /* 0x8210 */ GLenum<'FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING'>
		readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE:         /* 0x8211 */ GLenum<'FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE'>
		readonly FRAMEBUFFER_ATTACHMENT_RED_SIZE:               /* 0x8212 */ GLenum<'FRAMEBUFFER_ATTACHMENT_RED_SIZE'>
		readonly FRAMEBUFFER_ATTACHMENT_GREEN_SIZE:             /* 0x8213 */ GLenum<'FRAMEBUFFER_ATTACHMENT_GREEN_SIZE'>
		readonly FRAMEBUFFER_ATTACHMENT_BLUE_SIZE:              /* 0x8214 */ GLenum<'FRAMEBUFFER_ATTACHMENT_BLUE_SIZE'>
		readonly FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE:             /* 0x8215 */ GLenum<'FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE'>
		readonly FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE:             /* 0x8216 */ GLenum<'FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE'>
		readonly FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE:           /* 0x8217 */ GLenum<'FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE'>
		readonly FRAMEBUFFER_DEFAULT:                           /* 0x8218 */ GLenum<'FRAMEBUFFER_DEFAULT'>
		readonly DEPTH_STENCIL_ATTACHMENT:                      /* 0x821A */ GLenum<'DEPTH_STENCIL_ATTACHMENT'>
		readonly DEPTH_STENCIL:                                 /* 0x84F9 */ GLenum<'DEPTH_STENCIL'>
		readonly UNSIGNED_INT_24_8:                             /* 0x84FA */ GLenum<'UNSIGNED_INT_24_8'>
		readonly DEPTH24_STENCIL8:                              /* 0x88F0 */ GLenum<'DEPTH24_STENCIL8'>
		readonly UNSIGNED_NORMALIZED:                           /* 0x8C17 */ GLenum<'UNSIGNED_NORMALIZED'>
		readonly DRAW_FRAMEBUFFER_BINDING:                      /* 0x8CA6 */ GLenum<'DRAW_FRAMEBUFFER_BINDING'> /* Same as FRAMEBUFFER_BINDING */
		readonly READ_FRAMEBUFFER:                              /* 0x8CA8 */ GLenum<'READ_FRAMEBUFFER'>
		readonly DRAW_FRAMEBUFFER:                              /* 0x8CA9 */ GLenum<'DRAW_FRAMEBUFFER'>
		readonly READ_FRAMEBUFFER_BINDING:                      /* 0x8CAA */ GLenum<'READ_FRAMEBUFFER_BINDING'>
		readonly RENDERBUFFER_SAMPLES:                          /* 0x8CAB */ GLenum<'RENDERBUFFER_SAMPLES'>
		readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER:          /* 0x8CD4 */ GLenum<'FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER'>
		readonly MAX_COLOR_ATTACHMENTS:                         /* 0x8CDF */ GLenum<'MAX_COLOR_ATTACHMENTS'>
		readonly COLOR_ATTACHMENT1:                             /* 0x8CE1 */ GLenum<'COLOR_ATTACHMENT1'>
		readonly COLOR_ATTACHMENT2:                             /* 0x8CE2 */ GLenum<'COLOR_ATTACHMENT2'>
		readonly COLOR_ATTACHMENT3:                             /* 0x8CE3 */ GLenum<'COLOR_ATTACHMENT3'>
		readonly COLOR_ATTACHMENT4:                             /* 0x8CE4 */ GLenum<'COLOR_ATTACHMENT4'>
		readonly COLOR_ATTACHMENT5:                             /* 0x8CE5 */ GLenum<'COLOR_ATTACHMENT5'>
		readonly COLOR_ATTACHMENT6:                             /* 0x8CE6 */ GLenum<'COLOR_ATTACHMENT6'>
		readonly COLOR_ATTACHMENT7:                             /* 0x8CE7 */ GLenum<'COLOR_ATTACHMENT7'>
		readonly COLOR_ATTACHMENT8:                             /* 0x8CE8 */ GLenum<'COLOR_ATTACHMENT8'>
		readonly COLOR_ATTACHMENT9:                             /* 0x8CE9 */ GLenum<'COLOR_ATTACHMENT9'>
		readonly COLOR_ATTACHMENT10:                            /* 0x8CEA */ GLenum<'COLOR_ATTACHMENT10'>
		readonly COLOR_ATTACHMENT11:                            /* 0x8CEB */ GLenum<'COLOR_ATTACHMENT11'>
		readonly COLOR_ATTACHMENT12:                            /* 0x8CEC */ GLenum<'COLOR_ATTACHMENT12'>
		readonly COLOR_ATTACHMENT13:                            /* 0x8CED */ GLenum<'COLOR_ATTACHMENT13'>
		readonly COLOR_ATTACHMENT14:                            /* 0x8CEE */ GLenum<'COLOR_ATTACHMENT14'>
		readonly COLOR_ATTACHMENT15:                            /* 0x8CEF */ GLenum<'COLOR_ATTACHMENT15'>
		readonly FRAMEBUFFER_INCOMPLETE_MULTISAMPLE:            /* 0x8D56 */ GLenum<'FRAMEBUFFER_INCOMPLETE_MULTISAMPLE'>
		readonly MAX_SAMPLES:                                   /* 0x8D57 */ GLenum<'MAX_SAMPLES'>
		readonly HALF_FLOAT:                                    /* 0x140B */ GLenum<'HALF_FLOAT'>
		readonly RG:                                            /* 0x8227 */ GLenum<'RG'>
		readonly RG_INTEGER:                                    /* 0x8228 */ GLenum<'RG_INTEGER'>
		readonly R8:                                            /* 0x8229 */ GLenum<'R8'>
		readonly RG8:                                           /* 0x822B */ GLenum<'RG8'>
		readonly R16F:                                          /* 0x822D */ GLenum<'R16F'>
		readonly R32F:                                          /* 0x822E */ GLenum<'R32F'>
		readonly RG16F:                                         /* 0x822F */ GLenum<'RG16F'>
		readonly RG32F:                                         /* 0x8230 */ GLenum<'RG32F'>
		readonly R8I:                                           /* 0x8231 */ GLenum<'R8I'>
		readonly R8UI:                                          /* 0x8232 */ GLenum<'R8UI'>
		readonly R16I:                                          /* 0x8233 */ GLenum<'R16I'>
		readonly R16UI:                                         /* 0x8234 */ GLenum<'R16UI'>
		readonly R32I:                                          /* 0x8235 */ GLenum<'R32I'>
		readonly R32UI:                                         /* 0x8236 */ GLenum<'R32UI'>
		readonly RG8I:                                          /* 0x8237 */ GLenum<'RG8I'>
		readonly RG8UI:                                         /* 0x8238 */ GLenum<'RG8UI'>
		readonly RG16I:                                         /* 0x8239 */ GLenum<'RG16I'>
		readonly RG16UI:                                        /* 0x823A */ GLenum<'RG16UI'>
		readonly RG32I:                                         /* 0x823B */ GLenum<'RG32I'>
		readonly RG32UI:                                        /* 0x823C */ GLenum<'RG32UI'>
		readonly VERTEX_ARRAY_BINDING:                          /* 0x85B5 */ GLenum<'VERTEX_ARRAY_BINDING'>
		readonly R8_SNORM:                                      /* 0x8F94 */ GLenum<'R8_SNORM'>
		readonly RG8_SNORM:                                     /* 0x8F95 */ GLenum<'RG8_SNORM'>
		readonly RGB8_SNORM:                                    /* 0x8F96 */ GLenum<'RGB8_SNORM'>
		readonly RGBA8_SNORM:                                   /* 0x8F97 */ GLenum<'RGBA8_SNORM'>
		readonly SIGNED_NORMALIZED:                             /* 0x8F9C */ GLenum<'SIGNED_NORMALIZED'>
		readonly COPY_READ_BUFFER:                              /* 0x8F36 */ GLenum<'COPY_READ_BUFFER'>
		readonly COPY_WRITE_BUFFER:                             /* 0x8F37 */ GLenum<'COPY_WRITE_BUFFER'>
		readonly COPY_READ_BUFFER_BINDING:                      /* 0x8F36 */ GLenum<'COPY_READ_BUFFER_BINDING'> /* Same as COPY_READ_BUFFER */
		readonly COPY_WRITE_BUFFER_BINDING:                     /* 0x8F37 */ GLenum<'COPY_WRITE_BUFFER_BINDING'> /* Same as COPY_WRITE_BUFFER */
		readonly UNIFORM_BUFFER:                                /* 0x8A11 */ GLenum<'UNIFORM_BUFFER'>
		readonly UNIFORM_BUFFER_BINDING:                        /* 0x8A28 */ GLenum<'UNIFORM_BUFFER_BINDING'>
		readonly UNIFORM_BUFFER_START:                          /* 0x8A29 */ GLenum<'UNIFORM_BUFFER_START'>
		readonly UNIFORM_BUFFER_SIZE:                           /* 0x8A2A */ GLenum<'UNIFORM_BUFFER_SIZE'>
		readonly MAX_VERTEX_UNIFORM_BLOCKS:                     /* 0x8A2B */ GLenum<'MAX_VERTEX_UNIFORM_BLOCKS'>
		readonly MAX_FRAGMENT_UNIFORM_BLOCKS:                   /* 0x8A2D */ GLenum<'MAX_FRAGMENT_UNIFORM_BLOCKS'>
		readonly MAX_COMBINED_UNIFORM_BLOCKS:                   /* 0x8A2E */ GLenum<'MAX_COMBINED_UNIFORM_BLOCKS'>
		readonly MAX_UNIFORM_BUFFER_BINDINGS:                   /* 0x8A2F */ GLenum<'MAX_UNIFORM_BUFFER_BINDINGS'>
		readonly MAX_UNIFORM_BLOCK_SIZE:                        /* 0x8A30 */ GLenum<'MAX_UNIFORM_BLOCK_SIZE'>
		readonly MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS:        /* 0x8A31 */ GLenum<'MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS'>
		readonly MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS:      /* 0x8A33 */ GLenum<'MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS'>
		readonly UNIFORM_BUFFER_OFFSET_ALIGNMENT:               /* 0x8A34 */ GLenum<'UNIFORM_BUFFER_OFFSET_ALIGNMENT'>
		readonly ACTIVE_UNIFORM_BLOCKS:                         /* 0x8A36 */ GLenum<'ACTIVE_UNIFORM_BLOCKS'>
		readonly UNIFORM_TYPE:                                  /* 0x8A37 */ GLenum<'UNIFORM_TYPE'>
		readonly UNIFORM_SIZE:                                  /* 0x8A38 */ GLenum<'UNIFORM_SIZE'>
		readonly UNIFORM_BLOCK_INDEX:                           /* 0x8A3A */ GLenum<'UNIFORM_BLOCK_INDEX'>
		readonly UNIFORM_OFFSET:                                /* 0x8A3B */ GLenum<'UNIFORM_OFFSET'>
		readonly UNIFORM_ARRAY_STRIDE:                          /* 0x8A3C */ GLenum<'UNIFORM_ARRAY_STRIDE'>
		readonly UNIFORM_MATRIX_STRIDE:                         /* 0x8A3D */ GLenum<'UNIFORM_MATRIX_STRIDE'>
		readonly UNIFORM_IS_ROW_MAJOR:                          /* 0x8A3E */ GLenum<'UNIFORM_IS_ROW_MAJOR'>
		readonly UNIFORM_BLOCK_BINDING:                         /* 0x8A3F */ GLenum<'UNIFORM_BLOCK_BINDING'>
		readonly UNIFORM_BLOCK_DATA_SIZE:                       /* 0x8A40 */ GLenum<'UNIFORM_BLOCK_DATA_SIZE'>
		readonly UNIFORM_BLOCK_ACTIVE_UNIFORMS:                 /* 0x8A42 */ GLenum<'UNIFORM_BLOCK_ACTIVE_UNIFORMS'>
		readonly UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES:          /* 0x8A43 */ GLenum<'UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES'>
		readonly UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER:     /* 0x8A44 */ GLenum<'UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER'>
		readonly UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER:   /* 0x8A46 */ GLenum<'UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER'>
		readonly INVALID_INDEX:                                 /* 0xFFFFFFFF */ GLenum<'INVALID_INDEX'>
		readonly MAX_VERTEX_OUTPUT_COMPONENTS:                  /* 0x9122 */ GLenum<'MAX_VERTEX_OUTPUT_COMPONENTS'>
		readonly MAX_FRAGMENT_INPUT_COMPONENTS:                 /* 0x9125 */ GLenum<'MAX_FRAGMENT_INPUT_COMPONENTS'>
		readonly MAX_SERVER_WAIT_TIMEOUT:                       /* 0x9111 */ GLenum<'MAX_SERVER_WAIT_TIMEOUT'>
		readonly OBJECT_TYPE:                                   /* 0x9112 */ GLenum<'OBJECT_TYPE'>
		readonly SYNC_CONDITION:                                /* 0x9113 */ GLenum<'SYNC_CONDITION'>
		readonly SYNC_STATUS:                                   /* 0x9114 */ GLenum<'SYNC_STATUS'>
		readonly SYNC_FLAGS:                                    /* 0x9115 */ GLenum<'SYNC_FLAGS'>
		readonly SYNC_FENCE:                                    /* 0x9116 */ GLenum<'SYNC_FENCE'>
		readonly SYNC_GPU_COMMANDS_COMPLETE:                    /* 0x9117 */ GLenum<'SYNC_GPU_COMMANDS_COMPLETE'>
		readonly UNSIGNALED:                                    /* 0x9118 */ GLenum<'UNSIGNALED'>
		readonly SIGNALED:                                      /* 0x9119 */ GLenum<'SIGNALED'>
		readonly ALREADY_SIGNALED:                              /* 0x911A */ GLenum<'ALREADY_SIGNALED'>
		readonly TIMEOUT_EXPIRED:                               /* 0x911B */ GLenum<'TIMEOUT_EXPIRED'>
		readonly CONDITION_SATISFIED:                           /* 0x911C */ GLenum<'CONDITION_SATISFIED'>
		readonly WAIT_FAILED:                                   /* 0x911D */ GLenum<'WAIT_FAILED'>
		readonly SYNC_FLUSH_COMMANDS_BIT:                       0x00000001;
		readonly VERTEX_ATTRIB_ARRAY_DIVISOR:                   /* 0x88FE */ GLenum<'VERTEX_ATTRIB_ARRAY_DIVISOR'>
		readonly ANY_SAMPLES_PASSED:                            /* 0x8C2F */ GLenum<'ANY_SAMPLES_PASSED'>
		readonly ANY_SAMPLES_PASSED_CONSERVATIVE:               /* 0x8D6A */ GLenum<'ANY_SAMPLES_PASSED_CONSERVATIVE'>
		readonly SAMPLER_BINDING:                               /* 0x8919 */ GLenum<'SAMPLER_BINDING'>
		readonly RGB10_A2UI:                                    /* 0x906F */ GLenum<'RGB10_A2UI'>
		readonly INT_2_10_10_10_REV:                            /* 0x8D9F */ GLenum<'INT_2_10_10_10_REV'>
		readonly TRANSFORM_FEEDBACK:                            /* 0x8E22 */ GLenum<'TRANSFORM_FEEDBACK'>
		readonly TRANSFORM_FEEDBACK_PAUSED:                     /* 0x8E23 */ GLenum<'TRANSFORM_FEEDBACK_PAUSED'>
		readonly TRANSFORM_FEEDBACK_ACTIVE:                     /* 0x8E24 */ GLenum<'TRANSFORM_FEEDBACK_ACTIVE'>
		readonly TRANSFORM_FEEDBACK_BINDING:                    /* 0x8E25 */ GLenum<'TRANSFORM_FEEDBACK_BINDING'>
		readonly TEXTURE_IMMUTABLE_FORMAT:                      /* 0x912F */ GLenum<'TEXTURE_IMMUTABLE_FORMAT'>
		readonly MAX_ELEMENT_INDEX:                             /* 0x8D6B */ GLenum<'MAX_ELEMENT_INDEX'>
		readonly TEXTURE_IMMUTABLE_LEVELS:                      /* 0x82DF */ GLenum<'TEXTURE_IMMUTABLE_LEVELS'>

		readonly  TIMEOUT_IGNORED: GLint64//                              = -1;

		/* WebGL-specific enums */
		readonly MAX_CLIENT_WAIT_TIMEOUT_WEBGL:                 /* 0x9247 */ GLenum<'MAX_CLIENT_WAIT_TIMEOUT_WEBGL'>
	}

	interface Base extends Constants {
		getExtension(name: 'EXT_disjoint_timer_query_webgl2'): EXT_disjoint_timer_query_webgl2 | null
		getExtension(name: 'EXT_color_buffer_float'): {} | null

		bindBuffer(target: BufferTarget, buffer: Nullable<WebGLBuffer>): void
		bindFramebuffer(target: FramebufferTarget, framebuffer: Nullable<WebGLFramebuffer>): void
		bindTexture(target: TextureTarget, texture: Nullable<WebGLTexture>): void

		/** Get the WebGLBuffer bound to a buffer target with #bindBuffer */
		getParameter(pname: BufferTargetBinding): WebGLBuffer
		/** Get one of the values set with #drawBuffers  */
		getParameter(pname: GL.DrawBuffer): GL['NONE'] | GL['BACK'] | GL.ColorAttachment
		/** Get the WebGLFramebuffer (or null == the default framebuffer) bound to DRAW_FRAMEBUFFER. See also #bindFramebuffer */
		getParameter(pname: GL2['DRAW_FRAMEBUFFER_BINDING']): WebGLFramebuffer | null
		/** Get the WebGLFramebuffer (or null == the default framebuffer) bound to READ_FRAMEBUFFER. See also #bindFramebuffer */
		getParameter(pname: GL2['READ_FRAMEBUFFER_BINDING']): WebGLFramebuffer | null
		getParameter(pname: GL2['FRAGMENT_SHADER_DERIVATIVE_HINT']): GL.HintMode
		getParameter(pname: GL2['MAX_3D_TEXTURE_SIZE']): GLint
		getParameter(pname: GL2['MAX_ARRAY_TEXTURE_LAYERS']): GLint
		getParameter(pname: GL2['MAX_CLIENT_WAIT_TIMEOUT_WEBGL']): GLint64
		getParameter(pname: GL2['MAX_COLOR_ATTACHMENTS']): GLint
		getParameter(pname: GL2['MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS']): GLint64
		getParameter(pname: GL2['MAX_COMBINED_UNIFORM_BLOCKS']): GLint
		getParameter(pname: GL2['MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS']): GLint64
		getParameter(pname: GL2['MAX_DRAW_BUFFERS']): GLint
		getParameter(pname: GL2['MAX_ELEMENT_INDEX']): GLint64
		getParameter(pname: GL2['MAX_ELEMENTS_INDICES']): GLint
		getParameter(pname: GL2['MAX_ELEMENTS_VERTICES']): GLint
		getParameter(pname: GL2['MAX_FRAGMENT_INPUT_COMPONENTS']): GLint
		getParameter(pname: GL2['MAX_FRAGMENT_UNIFORM_BLOCKS']): GLint
		getParameter(pname: GL2['MAX_FRAGMENT_UNIFORM_COMPONENTS']): GLint
		getParameter(pname: GL2['MAX_PROGRAM_TEXEL_OFFSET']): GLint
		getParameter(pname: GL2['MAX_SAMPLES']): GLint
		getParameter(pname: GL2['MAX_SERVER_WAIT_TIMEOUT']): GLint64
		getParameter(pname: GL2['MAX_TEXTURE_LOD_BIAS']): GLfloat
		getParameter(pname: GL2['MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS']): GLint
		getParameter(pname: GL2['MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS']): GLint
		getParameter(pname: GL2['MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS']): GLint
		getParameter(pname: GL2['MAX_UNIFORM_BLOCK_SIZE']): GLint64
		getParameter(pname: GL2['MAX_UNIFORM_BUFFER_BINDINGS']): GLint
		getParameter(pname: GL2['MAX_VARYING_COMPONENTS']): GLint
		getParameter(pname: GL2['MAX_VERTEX_OUTPUT_COMPONENTS']): GLint
		getParameter(pname: GL2['MAX_VERTEX_UNIFORM_BLOCKS']): GLint
		getParameter(pname: GL2['MAX_VERTEX_UNIFORM_COMPONENTS']): GLint
		getParameter(pname: GL2['MIN_PROGRAM_TEXEL_OFFSET']): GLint
		getParameter(pname: GL2['PACK_ROW_LENGTH']): GLint
		getParameter(pname: GL2['PACK_SKIP_PIXELS']): GLint
		getParameter(pname: GL2['PACK_SKIP_ROWS']): GLint
		getParameter(pname: GL2['RASTERIZER_DISCARD']): GLboolean
		getParameter(pname: GL2['READ_BUFFER']): GL2['BACK'] | GL2['NONE'] | GL.ColorAttachment
		getParameter(pname: GL2['SAMPLER_BINDING']): WebGLSampler
		/** Get the texture */
		getParameter(pname: GL2['TEXTURE_BINDING_2D_ARRAY']): WebGLTexture | null
		getParameter(pname: GL2['TEXTURE_BINDING_3D']): WebGLTexture | null
		getParameter(pname: GL2['TRANSFORM_FEEDBACK_ACTIVE']): GLboolean
		getParameter(pname: GL2['TRANSFORM_FEEDBACK_BINDING']): WebGLTransformFeedback
		getParameter(pname: GL2['TRANSFORM_FEEDBACK_PAUSED']): GLboolean
		getParameter(pname: GL2['UNIFORM_BUFFER_OFFSET_ALIGNMENT']): GLint
		getParameter(pname: GL2['UNPACK_IMAGE_HEIGHT']): GLint
		getParameter(pname: GL2['UNPACK_ROW_LENGTH']): GLint
		getParameter(pname: GL2['UNPACK_SKIP_IMAGES']): GLint
		getParameter(pname: GL2['UNPACK_SKIP_PIXELS']): GLint
		getParameter(pname: GL2['UNPACK_SKIP_ROWS']): GLint
		getParameter(pname: GL2['VERTEX_ARRAY_BINDING']): WebGLVertexArrayObject
		getParameter(pname: GL2['VERSION']): DOMString // of the form `WebGL<space>2.0<optional><space><vendor-specific information></optional>`
		getParameter(pname: GL2['SHADING_LANGUAGE_VERSION']): DOMString // of the form `WebGL<space>GLSL<space>ES<space>3.00<optional><space><vendor-specific information></optional>`

		enable(cap: Capability): void
		isEnabled(cap: Capability): GLboolean

		framebufferRenderbuffer(target: FramebufferTarget, attachment: FramebufferAttachment, renderbuffertarget: GL.RenderbufferTarget, renderbuffer: Nullable<WebGLRenderbuffer>): void;
		framebufferTexture2D(target: FramebufferTarget, attachment: FramebufferAttachment, textarget: GL.TexImage2DTarget, texture: Nullable<WebGLTexture>, level: GLint): void;

		generateMipmap(target: TextureTarget): void

		getBufferParameter(target: BufferTarget, pname: GL2['BUFFER_SIZE']): GLint;
		getBufferParameter(target: BufferTarget, pname: GL2['BUFFER_USAGE']): BufferDataUsage;

		getFramebufferAttachmentParameter(target: FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE']): GLint
		getFramebufferAttachmentParameter(target: FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_BLUE_SIZE']): GLint
		getFramebufferAttachmentParameter(target: FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING']): GL2['LINEAR'] | GL2['SRGB']
		getFramebufferAttachmentParameter(target: FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE']): GL2['FLOAT'] | GL2['INT'] | GL2['UNSIGNED_INT'] | GL2['SIGNED_NORMALIZED'] | GL2['UNSIGNED_NORMALIZED']
		getFramebufferAttachmentParameter(target: FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE']): GLint
		getFramebufferAttachmentParameter(target: FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_GREEN_SIZE']): GLint
		getFramebufferAttachmentParameter(target: FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_RED_SIZE']): GLint
		getFramebufferAttachmentParameter(target: FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE']): GLint
		getFramebufferAttachmentParameter(target: FramebufferTarget, attachment: GL.FramebufferRenderbufferAttachment, pname: Base['FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER']): GLint

		getProgramParameter(program: Nullable<WebGLProgram>, pname: GL2['TRANSFORM_FEEDBACK_BUFFER_MODE']): GL2['SEPARATE_ATTRIBS'] | GL2['INTERLEAVED_ATTRIBS']
		getProgramParameter(program: Nullable<WebGLProgram>, pname: GL2['TRANSFORM_FEEDBACK_VARYINGS']): GLint
		getProgramParameter(program: Nullable<WebGLProgram>, pname: GL2['ACTIVE_UNIFORM_BLOCKS']): GLint

		getRenderbufferParameter(target: GL.RenderbufferTarget, pname: GL2['RENDERBUFFER_SAMPLES']): GLint

		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_MAG_FILTER']): GL.TextureMagFilter
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_MIN_FILTER']): GL.TextureMinFilter
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_WRAP_S']): GL.TextureWrap
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_WRAP_T']): GL.TextureWrap
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_BASE_LEVEL']): GLint
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_COMPARE_FUNC']): GL.ComparisonFunc
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_COMPARE_MODE']): GL2['COMPARE_REF_TO_TEXTURE'] | GL2['NONE']
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_IMMUTABLE_FORMAT']): GLboolean
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_IMMUTABLE_LEVELS']): GLuint
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_MAX_LEVEL']): GLint
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_MAX_LOD']): GLfloat
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_MIN_LOD']): GLfloat
		getTexParameter(target: TextureTarget, pname: GL2['TEXTURE_WRAP_R']): GL.TextureWrap

		getUniform(program: WebGLProgram, location: WebGLUniformLocation): UniformValue;

		getActiveAttrib(program: WebGLProgram, index: GLuint): WebGLActiveInfo<AttribType> | null;
		getActiveUniform(program: WebGLProgram, index: GLuint): WebGLActiveInfo<UniformType> | null;

		getVertexAttrib(index: GLuint, pname: GL2['VERTEX_ATTRIB_ARRAY_INTEGER']): GLboolean
		getVertexAttrib(index: GLuint, pname: GL2['VERTEX_ATTRIB_ARRAY_DIVISOR']): GLint

		hint(target: GL2['FRAGMENT_SHADER_DERIVATIVE_HINT'], mode: GL.HintMode): void

		pixelStorei(pname: GL2['PACK_ROW_LENGTH'], param: GLint): void;
		pixelStorei(pname: GL2['PACK_SKIP_PIXELS'], param: GLint): void;
		pixelStorei(pname: GL2['PACK_SKIP_ROWS'], param: GLint): void;
		pixelStorei(pname: GL2['UNPACK_ROW_LENGTH'], param: GLint): void;
		pixelStorei(pname: GL2['UNPACK_IMAGE_HEIGHT'], param: GLint): void;
		pixelStorei(pname: GL2['UNPACK_SKIP_PIXELS'], param: GLint): void;
		pixelStorei(pname: GL2['UNPACK_SKIP_ROWS'], param: GLint): void;
		pixelStorei(pname: GL2['UNPACK_SKIP_IMAGES'], param: GLint): void;

		renderbufferStorage(target: GL.RenderbufferTarget, internalformat: RenderbufferInternalFormat, width: GLsizei, height: GLsizei): void;

		texParameterf(target: TextureTarget, pname: never, param: GLfloat): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_MAG_FILTER'], param: GL.TextureMagFilter): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_MIN_FILTER'], param: GL.TextureMinFilter): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_WRAP_S'], param: GL.TextureWrap): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_WRAP_T'], param: GL.TextureWrap): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_BASE_LEVEL'], param: GLint): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_COMPARE_FUNC'], param: GL.ComparisonFunc): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_COMPARE_MODE'], param: GL2['COMPARE_REF_TO_TEXTURE'] | GL2['NONE']): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_IMMUTABLE_FORMAT'], param: GLboolean): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_IMMUTABLE_LEVELS'], param: GLuint): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_MAX_LEVEL'], param: GLint): void
		texParameterf(target: TextureTarget, pname: GL2['TEXTURE_MAX_LOD'], param: GLfloat): void
		texParameterf(target: TextureTarget, pname: GL2['TEXTURE_MIN_LOD'], param: GLfloat): void
		texParameteri(target: TextureTarget, pname: GL2['TEXTURE_WRAP_R'], param: GL.TextureWrap): void

		/* Buffer objects */
		// WebGL1:
		bufferData(target: BufferTarget, size: GLsizeiptr, usage: BufferDataUsage): void;
		bufferData(target: BufferTarget, /* [AllowShared] */ srcData: Nullable<BufferSource>, usage: BufferDataUsage): void;
		bufferSubData(target: BufferTarget, dstByteOffset: GLintptr, /* [AllowShared] */ srcData: BufferSource): void;
		// WebGL2:
		bufferData(target: BufferTarget, /* [AllowShared] */ srcData: ArrayBufferView, usage: BufferDataUsage, srcOffset: GLuint, length?: GLuint /* = 0 */): void;
		bufferSubData(target: BufferTarget, dstByteOffset: GLintptr, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset: GLuint, length?: GLuint /* = 0 */): void;

		copyBufferSubData(readTarget: BufferTarget, writeTarget: BufferTarget, readOffset: GLintptr, writeOffset: GLintptr, size: GLsizeiptr): void;
		// MapBufferRange, in particular its read-only and write-modes: only,
		// can not be exposed safely to JavaScript. GetBufferSubData
		// replaces it for the purpose of fetching data back from the GPU.
		getBufferSubData(target: BufferTarget, srcByteOffset: GLintptr, /* [AllowShared] */ dstBuffer: ArrayBufferView, dstOffset?: GLuint /* = 0 */, length?: GLuint /* = 0 */): void;

		/* Framebuffer objects */
		blitFramebuffer(srcX0: GLint, srcY0: GLint, srcX1: GLint, srcY1: GLint, dstX0: GLint, dstY0: GLint, dstX1: GLint, dstY1: GLint, mask: GLbitfield, filter: GL2['LINEAR'] | GL2['NEAREST']): void;
		framebufferTextureLayer(target: FramebufferTarget, attachment: FramebufferAttachment, texture: Nullable<WebGLTexture>, level: GLint, layer: GLint): void;
		invalidateFramebuffer(target: FramebufferTarget, attachments: sequence<FramebufferAttachment>): void;
		invalidateSubFramebuffer(target: FramebufferTarget, attachments: sequence<FramebufferAttachment>, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
		readBuffer(src: GL2['BACK'] | GL2['NONE'] | GL.ColorAttachment): void;

		/* Renderbuffer objects */
		getInternalformatParameter(target: GL2['RENDERBUFFER'], internalformat: RenderbufferInternalFormat, pname: GL2['SAMPLES']): Int32Array;
		renderbufferStorageMultisample(target: GL2['RENDERBUFFER'], samples: GLsizei, internalformat: RenderbufferInternalFormat, width: GLsizei, height: GLsizei): void;

		/* Texture objects */
		texStorage2D(target: GL.TextureTarget, levels: GLsizei, internalformat: TextureInternalFormat, width: GLsizei, height: GLsizei): void;
		texStorage3D(target: TexImage3DTarget, levels: GLsizei, internalformat: TextureInternalFormat, width: GLsizei, height: GLsizei, depth: GLsizei): void;

		// WebGL1 legacy entrypoints:
		//#region texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: INTERNALFORMAT, width: GLsizei, height: GLsizei, border: 0, format: FORMAT, type: TYPE, /* [AllowShared] */ pixels: Nullable<ArrayBufferView>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE'], width: GLsizei, height: GLsizei, border: 0, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'], /* [AllowShared] */ pixels: Nullable<Uint32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8_ALPHA8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_5_5_5_1'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB10_A2'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], /* [AllowShared] */ pixels: Nullable<Uint32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		//#endregion
		//#region texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: INTERNALFORMAT, format: FORMAT, type: TYPE, source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB'], format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA'], format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE_ALPHA'], format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE'], format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['ALPHA'], format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8'], format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R16F'], format: GL2['RED'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R32F'], format: GL2['RED'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8UI'], format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8'], format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG16F'], format: GL2['RG'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG32F'], format: GL2['RG'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8UI'], format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8'], format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8'], format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB565'], format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB9_E5'], format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB16F'], format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB32F'], format: GL2['RGB'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8UI'], format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8'], format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8_ALPHA8'], format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB5_A1'], format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_5_5_1'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB10_A2'], format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA4'], format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA16F'], format: GL2['RGBA'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA32F'], format: GL2['RGBA'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8UI'], format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		//#endregion

		//#region texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: FORMAT, type: TYPE, /* [AllowShared] */ pixels: Nullable<ArrayBufferView>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'] | GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'], /* [AllowShared] */ pixels: Nullable<Uint32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'] | GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], /* [AllowShared] */ pixels: Nullable<Uint32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ pixels: Nullable<Float32Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ pixels: Nullable<Uint16Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ pixels: Nullable<Uint8Array>): void;
		//#endregion
		//#region texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: FORMAT, type: TYPE, source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'] | GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'] | GL2['UNSIGNED_INT_2_10_10_10_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		//#endregion

		// WebGL2 entrypoints:
		//#region texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: INTERNALFORMAT, width: GLsizei, height: GLsizei, border: 0, format: FORMAT, type: TYPE, pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE'], width: GLsizei, height: GLsizei, border: 0, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8_ALPHA8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_5_5_1'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB10_A2'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		//#endregion
		//#region texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: INTERNALFORMAT, width: GLsizei, height: GLsizei, border: 0, format: FORMAT, type: TYPE, source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE'], width: GLsizei, height: GLsizei, border: 0, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8_ALPHA8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_5_5_1'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB10_A2'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		//#endregion
		//#region texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: INTERNALFORMAT, width: GLsizei, height: GLsizei, border: 0, format: FORMAT, type: TYPE, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['LUMINANCE'], width: GLsizei, height: GLsizei, border: 0, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['ALPHA'], width: GLsizei, height: GLsizei, border: 0, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RG8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'], /* [AllowShared] */ srcData: Uint32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['SRGB8_ALPHA8'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_5_5_5_1'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGB10_A2'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], /* [AllowShared] */ srcData: Uint32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA32F'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GL2['RGBA8UI'], width: GLsizei, height: GLsizei, border: 0, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		//#endregion

		//#region texImage3D(target: TexImage3DTarget, level: GLint, internalformat: INTERNALFORMAT, width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: FORMAT, type: TYPE, pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['LUMINANCE'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['ALPHA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['SRGB8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['SRGB8_ALPHA8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_5_5_1'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB10_A2'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], pboOffset: GLintptr): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		//#endregion
		//#region texImage3D(target: TexImage3DTarget, level: GLint, internalformat: INTERNALFORMAT, width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: FORMAT, type: TYPE, source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['LUMINANCE'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['ALPHA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['SRGB8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['SRGB8_ALPHA8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_5_5_1'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB10_A2'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		//#endregion
		//#region texImage3D(target: TexImage3DTarget, level: GLint, internalformat: INTERNALFORMAT, width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: FORMAT, type: TYPE, /* [AllowShared] */ srcData: Nullable<ArrayBufferView>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['LUMINANCE'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['ALPHA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['SRGB8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'], /* [AllowShared] */ srcData: Nullable<Uint32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['SRGB8_ALPHA8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_5_5_5_1'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB10_A2'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], /* [AllowShared] */ srcData: Nullable<Uint32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>): void;
		//#endregion
		//#region texImage3D(target: TexImage3DTarget, level: GLint, internalformat: INTERNALFORMAT, width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: FORMAT, type: TYPE, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['LUMINANCE_ALPHA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['LUMINANCE'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['ALPHA'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RG8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['SRGB8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB565'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['R11F_G11F_B10F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'], /* [AllowShared] */ srcData: Uint32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB9_E5'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['SRGB8_ALPHA8'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_5_5_5_1'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB5_A1'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGB10_A2'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], /* [AllowShared] */ srcData: Uint32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA4'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA16F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA32F'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texImage3D(target: TexImage3DTarget, level: GLint, internalformat: GL2['RGBA8UI'], width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		//#endregion

		//#region texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: FORMAT, type: TYPE, pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'] | GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'] | GL2['UNSIGNED_INT_2_10_10_10_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		//#endregion
		//#region texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: FORMAT, type: TYPE, source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'] | GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'] | GL2['UNSIGNED_INT_2_10_10_10_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		//#endregion
		//#region texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: FORMAT, type: TYPE, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'] | GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'], /* [AllowShared] */ srcData: Uint32Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'] | GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], /* [AllowShared] */ srcData: Uint32Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Float32Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Uint16Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		texSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Uint8Array, srcOffset: GLuint): void;
		//#endregion

		//#region texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: FORMAT, type: TYPE, pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'] | GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'] | GL2['UNSIGNED_INT_2_10_10_10_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], pboOffset: GLintptr): void;
		//#endregion
		//#region texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: FORMAT, type: TYPE, source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_5_6_5'] | GL2['UNSIGNED_INT_10F_11F_11F_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'] | GL2['UNSIGNED_INT_2_10_10_10_REV'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'] | GL2['HALF_FLOAT'] | GL2['FLOAT'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], source: TexImageSource): void; // May throw DOMException
		//#endregion
		//#region texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: FORMAT, type: TYPE, /* [AllowShared] */ srcData: Nullable<ArrayBufferView>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGB'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_SHORT_5_6_5'] | GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_INT_10F_11F_11F_REV'], /* [AllowShared] */ srcData: Nullable<Uint32Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGB'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGBA'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_SHORT_4_4_4_4'] | GL2['UNSIGNED_SHORT_5_5_5_1'] | GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_INT_2_10_10_10_REV'], /* [AllowShared] */ srcData: Nullable<Uint32Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['LUMINANCE_ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['LUMINANCE'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['ALPHA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RED'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RED'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RED'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RED_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RG'], type: GL2['FLOAT'], /* [AllowShared] */ srcData: Nullable<Float32Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RG'], type: GL2['HALF_FLOAT'], /* [AllowShared] */ srcData: Nullable<Uint16Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RG'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RG_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGB_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		texSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ srcData: Nullable<Uint8Array>, srcOffset?: GLuint /* = 0 */): void;
		//#endregion

		copyTexSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;

		// no compressed formats are supported by default
		// compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: 0, imageSize: GLsizei, offset: GLintptr): void;
		// compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset?: GLuint /* = 0 */, srcLengthOverride?: GLuint /* = 0 */): void;

		// compressedTexImage3D(target: TexImage3DTarget, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, imageSize: GLsizei, offset: GLintptr): void;
		// compressedTexImage3D(target: TexImage3DTarget, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset?: GLuint /* = 0 */, srcLengthOverride?: GLuint /* = 0 */): void;

		// compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2enum, imageSize: GLsizei, offset: GLintptr): void;
		// compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GL2enum, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset?: GLuint /* = 0 */, srcLengthOverride?: GLuint /* = 0 */): void;

		// compressedTexSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2enum, imageSize: GLsizei, offset: GLintptr): void;
		// compressedTexSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GL2enum, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset?: GLuint /* = 0 */, srcLengthOverride?: GLuint /* = 0 */): void;

		/* Programs and shaders */
		/* [WebGLHandlesContextLoss] */ getFragDataLocation(program: WebGLProgram, name: DOMString): GLint;

		/* Uniforms */
		uniform1ui(location: Nullable<WebGLUniformLocation>, v0: GLuint): void;
		uniform2ui(location: Nullable<WebGLUniformLocation>, v0: GLuint, v1: GLuint): void;
		uniform3ui(location: Nullable<WebGLUniformLocation>, v0: GLuint, v1: GLuint, v2: GLuint): void;
		uniform4ui(location: Nullable<WebGLUniformLocation>, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void;

		uniform1fv(location: Nullable<WebGLUniformLocation>, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniform2fv(location: Nullable<WebGLUniformLocation>, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniform3fv(location: Nullable<WebGLUniformLocation>, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniform4fv(location: Nullable<WebGLUniformLocation>, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;

		uniform1iv(location: Nullable<WebGLUniformLocation>, data: Int32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniform2iv(location: Nullable<WebGLUniformLocation>, data: Int32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniform3iv(location: Nullable<WebGLUniformLocation>, data: Int32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniform4iv(location: Nullable<WebGLUniformLocation>, data: Int32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;

		uniform1uiv(location: Nullable<WebGLUniformLocation>, data: Uint32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniform2uiv(location: Nullable<WebGLUniformLocation>, data: Uint32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniform3uiv(location: Nullable<WebGLUniformLocation>, data: Uint32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniform4uiv(location: Nullable<WebGLUniformLocation>, data: Uint32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;

		uniformMatrix2fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniformMatrix3x2fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniformMatrix4x2fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;

		uniformMatrix2x3fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniformMatrix3fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniformMatrix4x3fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;

		uniformMatrix2x4fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniformMatrix3x4fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;
		uniformMatrix4fv(location: Nullable<WebGLUniformLocation>, transpose: GLboolean, data: Float32List, srcOffset?: GLuint /* = 0 */, srcLength?: GLuint /* = 0 */): void;

		/* Vertex attribs */
		vertexAttribI4i(index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void;
		vertexAttribI4iv(index: GLuint, values: Int32List): void;
		vertexAttribI4ui(index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void;
		vertexAttribI4uiv(index: GLuint, values: Uint32List): void;
		vertexAttribIPointer(index: GLuint, size: GLint, type: GL.ArrayType, stride: GLsizei, offset: GLintptr): void;

		/* Writing to the drawing buffer */
		vertexAttribDivisor(index: GLuint, divisor: GLuint): void;
		drawArraysInstanced(mode: GL.DrawMode, first: GLint, count: GLsizei, instanceCount: GLsizei): void;
		drawElementsInstanced(mode: GL.DrawMode, count: GLsizei, type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT'], offset: GLintptr, instanceCount: GLsizei): void;
		drawRangeElements(mode: GL.DrawMode, start: GLuint, end: GLuint, count: GLsizei, type: GL2['UNSIGNED_BYTE'] | GL2['UNSIGNED_SHORT'] | GL2['UNSIGNED_INT'], offset: GLintptr): void;

		/* Reading back pixels */
		// WebGL2:
		/** For normalized fixed-point rendering surfaces */
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], offset: GLintptr): void;
		/** For normalized fixed-point rendering surfaces */
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA'], type: GL2['UNSIGNED_BYTE'], /* [AllowShared] */ dstData: ArrayBufferView, dstOffset: GLuint): void;
		/** For signed integer rendering surfaces */
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['INT'], offset: GLintptr): void;
		/** For signed integer rendering surfaces */
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['INT'], /* [AllowShared] */ dstData: ArrayBufferView, dstOffset: GLuint): void;
		/** For unsigned integer rendering surfaces */
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_INT'], offset: GLintptr): void;
		/** For unsigned integer rendering surfaces */
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GL2['RGBA_INTEGER'], type: GL2['UNSIGNED_INT'], /* [AllowShared] */ dstData: ArrayBufferView, dstOffset: GLuint): void;
		/** Implementation-chosen format; see getParameter(gl.IMPLEMENTATION_COLOR_READ_FORMAT) and getParameter(gl.IMPLEMENTATION_COLOR_READ_type) */
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: ReadPixelsFormat, type: ReadPixelsType, offset: GLintptr): void;
		/** Implementation-chosen format; see getParameter(gl.IMPLEMENTATION_COLOR_READ_FORMAT) and getParameter(gl.IMPLEMENTATION_COLOR_READ_type) */
		readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: ReadPixelsFormat, type: ReadPixelsType, /* [AllowShared] */ dstData: ArrayBufferView, dstOffset: GLuint): void;

		/* Multiple Render Targets */
		drawBuffers(buffers: sequence<GL2['BACK'] | GL2['NONE'] | GL.ColorAttachment>): void;

		// see https://www.khronos.org/registry/OpenGL/specs/es/3.0/es_spec_3.0.pdf#chapter.4
		clearBufferfv(buffer: GL2['COLOR'], drawbuffer: GLint, values: Float32List, srcOffset?: GLuint /* = 0 */): void;
		clearBufferfv(buffer: GL2['DEPTH'], drawbuffer: 0, values: Float32List, srcOffset?: GLuint /* = 0 */): void;
		clearBufferiv(buffer: GL2['COLOR'], drawbuffer: GLint, values: Int32List, srcOffset?: GLuint /* = 0 */): void;
		clearBufferiv(buffer: GL2['STENCIL'], drawbuffer: 0, values: Int32List, srcOffset?: GLuint /* = 0 */): void;
		clearBufferuiv(buffer: GL2['COLOR'], drawbuffer: GLint, values: Uint32List, srcOffset?: GLuint /* = 0 */): void;

		clearBufferfi(buffer: GL2['DEPTH_STENCIL'], drawbuffer: 0, depth: GLfloat, stencil: GLint): void;

		/* Query Objects */
		createQuery(): WebGLQuery | null
		deleteQuery(query: Nullable<WebGLQuery>): void;
		/* [WebGLHandlesContextLoss] */ isQuery(query: Nullable<WebGLQuery>): GLboolean;
		beginQuery(target: QueryTarget, query: WebGLQuery): void;
		endQuery(target: QueryTarget): void;
		getQuery(target: QueryTarget, pname: GL2['CURRENT_QUERY']): WebGLQuery | null
		getQueryParameter(query: WebGLQuery, pname: GL2['QUERY_RESULT']): GLuint;
		getQueryParameter(query: WebGLQuery, pname: GL2['QUERY_RESULT_AVAILABLE']): GLboolean;

		/* Sampler Objects */
		createSampler(): WebGLSampler | null
		deleteSampler(sampler: Nullable<WebGLSampler>): void;
		/* [WebGLHandlesContextLoss] */ isSampler(sampler: Nullable<WebGLSampler>): GLboolean
		bindSampler(unit: GLuint, sampler: Nullable<WebGLSampler>): void;
		// use samplerParameterf, everything is a float in JS
		samplerParameteri(sampler: WebGLSampler, pname: never, param: GLint): void;
		samplerParameterf(sampler: WebGLSampler, pname: GL2['TEXTURE_COMPARE_FUNC'], param: GL.ComparisonFunc): void;
		samplerParameterf(sampler: WebGLSampler, pname: GL2['TEXTURE_COMPARE_MODE'], param: GL2['COMPARE_REF_TO_TEXTURE'] | GL2['NONE']): void;
		samplerParameterf(sampler: WebGLSampler, pname: GL2['TEXTURE_MAG_FILTER'], param: GL.TextureMagFilter): void;
		samplerParameterf(sampler: WebGLSampler, pname: GL2['TEXTURE_MIN_FILTER'], param: GL.TextureMinFilter): void;
		samplerParameterf(sampler: WebGLSampler, pname: GL2['TEXTURE_MAX_LOD'], param: GLfloat): void;
		samplerParameterf(sampler: WebGLSampler, pname: GL2['TEXTURE_MIN_LOD'], param: GLfloat): void;
		samplerParameterf(sampler: WebGLSampler, pname: GL2['TEXTURE_WRAP_R'], param: GL.TextureWrap): void;
		samplerParameterf(sampler: WebGLSampler, pname: GL2['TEXTURE_WRAP_S'], param: GL.TextureWrap): void;
		samplerParameterf(sampler: WebGLSampler, pname: GL2['TEXTURE_WRAP_T'], param: GL.TextureWrap): void;

		getSamplerParameter(sampler: WebGLSampler, pname: GL2['TEXTURE_COMPARE_FUNC']): GL.ComparisonFunc // indicating the texture comparison function.
		getSamplerParameter(sampler: WebGLSampler, pname: GL2['TEXTURE_COMPARE_MODE']): GL2['COMPARE_REF_TO_TEXTURE'] | GL2['NONE'] // indicating the texture comparison mode.
		getSamplerParameter(sampler: WebGLSampler, pname: GL2['TEXTURE_MAG_FILTER']): GL.TextureMagFilter // indicating the texture magnification filter.
		getSamplerParameter(sampler: WebGLSampler, pname: GL2['TEXTURE_MIN_FILTER']): GL.TextureMinFilter // indicating the texture minification filter
		getSamplerParameter(sampler: WebGLSampler, pname: GL2['TEXTURE_MAX_LOD']): GLfloat // indicating the maximum level-of-detail value.
		getSamplerParameter(sampler: WebGLSampler, pname: GL2['TEXTURE_MIN_LOD']): GLfloat // indicating the minimum level-of-detail value.
		getSamplerParameter(sampler: WebGLSampler, pname: GL2['TEXTURE_WRAP_R']): GL.TextureWrap // indicating the texture wrapping function for the texture coordinate r.
		getSamplerParameter(sampler: WebGLSampler, pname: GL2['TEXTURE_WRAP_S']): GL.TextureWrap // indicating the texture wrapping function for the texture coordinate s.
		getSamplerParameter(sampler: WebGLSampler, pname: GL2['TEXTURE_WRAP_T']): GL.TextureWrap // indicating the texture wrapping function for the texture coordinate t.


		/* Sync objects */
		fenceSync(condition: GL2['SYNC_GPU_COMMANDS_COMPLETE'], flags: 0): WebGLSync | null
		/* [WebGLHandlesContextLoss] */ isSync(sync: Nullable<WebGLSync>): GLboolean
		deleteSync(sync: Nullable<WebGLSync>): void;
		clientWaitSync(sync: WebGLSync, flags: 0 | GL2['SYNC_FLUSH_COMMANDS_BIT'], timeout: GLuint64): ClientWaitSyncStatus;
		waitSync(sync: WebGLSync, flags: 0, timeout: GLint64): void;

		getSyncParameter(sync: WebGLSync, pname: GL2['OBJECT_TYPE']): GL2['SYNC_FENCE']
		getSyncParameter(sync: WebGLSync, pname: GL2['SYNC_STATUS']): GL2['SIGNALED'] | GL2['UNSIGNALED']
		getSyncParameter(sync: WebGLSync, pname: GL2['SYNC_CONDITION']): GL2['SYNC_GPU_COMMANDS_COMPLETE']
		getSyncParameter(sync: WebGLSync, pname: GL2['SYNC_FLAGS']): 0

		/* Transform Feedback */
		createTransformFeedback(): WebGLTransformFeedback | null
		deleteTransformFeedback(tf: Nullable<WebGLTransformFeedback>): void;
		/* [WebGLHandlesContextLoss] */ isTransformFeedback(tf: Nullable<WebGLTransformFeedback>): GLboolean
		bindTransformFeedback(target: GL2['TRANSFORM_FEEDBACK'], tf: Nullable<WebGLTransformFeedback>): void;
		beginTransformFeedback(primitiveMode: TransformFeedbackPrimitiveMode): void;
		endTransformFeedback(): void;
		transformFeedbackVaryings(program: WebGLProgram, varyings: sequence<DOMString>, bufferMode: GL2['INTERLEAVED_ATTRIBS'] | GL2['SEPARATE_ATTRIBS']): void;
		getTransformFeedbackVarying(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null
		pauseTransformFeedback(): void;
		resumeTransformFeedback(): void;

		/* Uniform Buffer Objects and Transform Feedback Buffers */
		bindBufferBase(target: GL2['TRANSFORM_FEEDBACK_BUFFER'] | GL2['UNIFORM_BUFFER'], index: GLuint, buffer: Nullable<WebGLBuffer>): void;
		bindBufferRange(target: GL2['TRANSFORM_FEEDBACK_BUFFER'] | GL2['UNIFORM_BUFFER'], index: GLuint, buffer: Nullable<WebGLBuffer>, offset: GLintptr, size: GLsizeiptr): void;

		getIndexedParameter(target: GL2['TRANSFORM_FEEDBACK_BUFFER_BINDING'], index: GLuint): WebGLBuffer;
		getIndexedParameter(target: GL2['TRANSFORM_FEEDBACK_BUFFER_SIZE'], index: GLuint): GLsizeiptr;
		getIndexedParameter(target: GL2['TRANSFORM_FEEDBACK_BUFFER_START'], index: GLuint): GLintptr;
		getIndexedParameter(target: GL2['UNIFORM_BUFFER_BINDING'], index: GLuint): WebGLBuffer;
		getIndexedParameter(target: GL2['UNIFORM_BUFFER_SIZE'], index: GLuint): GLsizeiptr;
		getIndexedParameter(target: GL2['UNIFORM_BUFFER_START'], index: GLuint): GLintptr;

		getUniformIndices(program: WebGLProgram, uniformNames: sequence<DOMString>): sequence<GLuint> | null;

		getActiveUniforms(program: WebGLProgram, uniformIndices: sequence<GLuint>, pname: GL2['UNIFORM_TYPE']): sequence<UniformType>
		getActiveUniforms(program: WebGLProgram, uniformIndices: sequence<GLuint>, pname: GL2['UNIFORM_SIZE']): sequence<GLuint>
		getActiveUniforms(program: WebGLProgram, uniformIndices: sequence<GLuint>, pname: GL2['UNIFORM_BLOCK_INDEX']): sequence<GLint>
		getActiveUniforms(program: WebGLProgram, uniformIndices: sequence<GLuint>, pname: GL2['UNIFORM_OFFSET']): sequence<GLint>
		getActiveUniforms(program: WebGLProgram, uniformIndices: sequence<GLuint>, pname: GL2['UNIFORM_ARRAY_STRIDE']): sequence<GLint>
		getActiveUniforms(program: WebGLProgram, uniformIndices: sequence<GLuint>, pname: GL2['UNIFORM_MATRIX_STRIDE']): sequence<GLint>
		getActiveUniforms(program: WebGLProgram, uniformIndices: sequence<GLuint>, pname: GL2['UNIFORM_IS_ROW_MAJOR']): sequence<GLboolean>

		getUniformBlockIndex(program: WebGLProgram, uniformBlockName: DOMString): GLuint;

		getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GL2['UNIFORM_BLOCK_BINDING']): GLuint
		getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GL2['UNIFORM_BLOCK_DATA_SIZE']): GLuint
		getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GL2['UNIFORM_BLOCK_ACTIVE_UNIFORMS']): GLuint
		getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GL2['UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES']): Uint32Array
		getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GL2['UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER']): GLboolean
		getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GL2['UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER']): GLboolean

		getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: GLuint): DOMString | null
		uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: GLuint, uniformBlockBinding: GLuint): void;

		/* Vertex Array Objects */
		createVertexArray(): WebGLVertexArrayObject | null;
		deleteVertexArray(vertexArray: Nullable<WebGLVertexArrayObject>): void;
		/* [WebGLHandlesContextLoss] */ isVertexArray(vertexArray: Nullable<WebGLVertexArrayObject>): GLboolean
		bindVertexArray(array: Nullable<WebGLVertexArrayObject>): void;
	}
	type FramebufferTarget = GL2['FRAMEBUFFER'] | GL2['DRAW_FRAMEBUFFER'] | GL2['READ_FRAMEBUFFER']
	type FramebufferAttachment = GL.FramebufferRenderbufferAttachment | GL.ColorAttachment
	type RenderbufferInternalFormat = GL2['R8']
		| GL2['R8UI']
		| GL2['R8I']
		| GL2['R16UI']
		| GL2['R16I']
		| GL2['R32UI']
		| GL2['R32I']
		| GL2['RG8']
		| GL2['RG8UI']
		| GL2['RG8I']
		| GL2['RG16UI']
		| GL2['RG16I']
		| GL2['RG32UI']
		| GL2['RG32I']
		| GL2['RGB8']
		| GL2['RGBA8']
		| GL2['SRGB8_ALPHA8']
		| GL2['RGBA4']
		| GL2['RGB565']
		| GL2['RGB5_A1']
		| GL2['RGB10_A2']
		| GL2['RGBA8UI']
		| GL2['RGBA8I']
		| GL2['RGB10_A2UI']
		| GL2['RGBA16UI']
		| GL2['RGBA16I']
		| GL2['RGBA32I']
		| GL2['RGBA32UI']
		| GL2['DEPTH_COMPONENT16']
		| GL2['DEPTH_COMPONENT24']
		| GL2['DEPTH_COMPONENT32F']
		| GL2['DEPTH_STENCIL']
		| GL2['DEPTH24_STENCIL8']
		| GL2['DEPTH32F_STENCIL8']
		| GL2['STENCIL_INDEX8']
	type BufferTarget = GL.BufferTarget
		| GL2['COPY_READ_BUFFER']
		| GL2['COPY_WRITE_BUFFER']
		| GL2['TRANSFORM_FEEDBACK_BUFFER']
		| GL2['UNIFORM_BUFFER']
		| GL2['PIXEL_PACK_BUFFER']
		| GL2['PIXEL_UNPACK_BUFFER']
	type BufferTargetBinding =  GL.BufferTargetBinding
		| GL2['COPY_READ_BUFFER_BINDING']
		| GL2['COPY_WRITE_BUFFER_BINDING']
		| GL2['PIXEL_PACK_BUFFER_BINDING']
		| GL2['PIXEL_UNPACK_BUFFER_BINDING']
		| GL2['TRANSFORM_FEEDBACK_BUFFER_BINDING']
		| GL2['UNIFORM_BUFFER_BINDING']
	type QueryTarget = GL2['ANY_SAMPLES_PASSED'] // Specifies an occlusion query: these queries detect whether an object is visible (whether the scoped drawing commands pass the depth test and if so, how many samples pass).
		| GL2['ANY_SAMPLES_PASSED_CONSERVATIVE'] // Same as above above, but less accurate and faster version.
		| GL2['TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN'] // Number of primitives that are written to transform feedback buffers.
		type TransformFeedbackPrimitiveMode = GL2['POINTS'] | GL2['LINES'] | GL2['TRIANGLES']
	type ClientWaitSyncStatus = GL2['ALREADY_SIGNALED'] // Indicates that the sync object was signaled when this method was called.
		| GL2['TIMEOUT_EXPIRED'] // Indicates that the timeout time passed and that the sync object did not become signaled.
		| GL2['CONDITION_SATISFIED'] // Indicates that the sync object was signaled before the timeout expired.
		| GL2['WAIT_FAILED'] // Indicates that an error occurred during the execution.
	type AttribType = GL.AttribType
		| GL2['FLOAT_MAT2x3']
		| GL2['FLOAT_MAT2x4']
		| GL2['FLOAT_MAT3x2']
		| GL2['FLOAT_MAT3x4']
		| GL2['FLOAT_MAT4x2']
		| GL2['FLOAT_MAT4x3']
		| GL2['INT']
		| GL2['INT_VEC2']
		| GL2['INT_VEC3']
		| GL2['INT_VEC4']
		| GL2['UNSIGNED_INT']
		| GL2['UNSIGNED_INT_VEC2']
		| GL2['UNSIGNED_INT_VEC3']
		| GL2['UNSIGNED_INT_VEC4']
	type UniformType = GL.UniformType
		| GL2['UNSIGNED_INT']
		| GL2['UNSIGNED_INT_VEC2']
		| GL2['UNSIGNED_INT_VEC3']
		| GL2['UNSIGNED_INT_VEC4']
		| GL2['FLOAT_MAT2x3']
		| GL2['FLOAT_MAT2x4']
		| GL2['FLOAT_MAT3x2']
		| GL2['FLOAT_MAT3x4']
		| GL2['FLOAT_MAT4x2']
		| GL2['FLOAT_MAT4x3']
		| GL2['SAMPLER_2D']
		| GL2['SAMPLER_3D']
		| GL2['SAMPLER_CUBE']
		| GL2['SAMPLER_2D_SHADOW']
		| GL2['SAMPLER_2D_ARRAY']
		| GL2['SAMPLER_2D_ARRAY_SHADOW']
		| GL2['SAMPLER_CUBE_SHADOW']
		| GL2['INT_SAMPLER_2D']
		| GL2['INT_SAMPLER_3D']
		| GL2['INT_SAMPLER_CUBE']
		| GL2['INT_SAMPLER_2D_ARRAY']
		| GL2['UNSIGNED_INT_SAMPLER_2D']
		| GL2['UNSIGNED_INT_SAMPLER_3D']
		| GL2['UNSIGNED_INT_SAMPLER_CUBE']
		| GL2['UNSIGNED_INT_SAMPLER_2D_ARRAY']
	type UniformValue = GLboolean
		| GLint
		| GLfloat
		| Float32Array
		| Int32Array
		| Uint32Array
		| GLboolean[]
		| GLuint
	type BufferDataUsage = GL.BufferDataUsage
		| GL2['STATIC_READ'] // Contents of the buffer are likely to be used often and not change often. Contents are read from the buffer, but not written.
		| GL2['DYNAMIC_READ'] // Contents of the buffer are likely to be used often and change often. Contents are read from the buffer, but not written.
		| GL2['STREAM_READ'] // Contents of the buffer are likely to not be used often. Contents are read from the buffer, but not written.
		| GL2['STATIC_COPY'] // Contents of the buffer are likely to be used often and not change often. Contents are neither written or read by the user.
		| GL2['DYNAMIC_COPY'] // Contents of the buffer are likely to be used often and change often. Contents are neither written or read by the user.
		| GL2['STREAM_COPY'] // Contents of the buffer are likely to be used often and not change often. Contents are neither written or read by the user.
	type TextureTarget = GL.TextureTarget | TexImage3DTarget
	type Capability = GL.Capability | GL2['RASTERIZER_DISCARD']
	type TexImage3DTarget = GL2['TEXTURE_3D'] | GL2['TEXTURE_2D_ARRAY']
	type TextureInternalFormat = GL.TextureInternalFormat
		| GL2['R8']
		| GL2['R16F']
		| GL2['R32F']
		| GL2['R8UI']
		| GL2['RG8']
		| GL2['RG16F']
		| GL2['RG32F']
		| GL2['RG8UI']
		| GL2['RGB8']
		| GL2['SRGB8']
		| GL2['RGB565']
		| GL2['R11F_G11F_B10F']
		| GL2['RGB9_E5']
		| GL2['RGB16F']
		| GL2['RGB32F']
		| GL2['RGB8UI']
		| GL2['RGBA8']
		| GL2['SRGB8_ALPHA8']
		| GL2['RGB5_A1']
		| GL2['RGB10_A2']
		| GL2['RGBA4']
		| GL2['RGBA16F']
		| GL2['RGBA32F']
		| GL2['RGBA8UI']
	// see https://www.khronos.org/registry/OpenGL/specs/es/3.0/es_spec_3.0.pdf#table.3.2
	type ReadPixelsFormat = GL2['RGBA']
		| GL2['RGBA_INTEGER']
		| GL2['RGB']
		| GL2['RGB_INTEGER']
		| GL2['RG']
		| GL2['RG_INTEGER']
		| GL2['RED']
		| GL2['RED_INTEGER']
	// see https://www.khronos.org/registry/OpenGL/specs/es/3.0/es_spec_3.0.pdf#table.3.2
	type ReadPixelsType = GL.ArrayType
		| GL2['UNSIGNED_SHORT_4_4_4_4']
		| GL2['UNSIGNED_SHORT_5_5_5_1']
		| GL2['UNSIGNED_INT_2_10_10_10_REV']
		| GL2['UNSIGNED_SHORT_5_6_5']
		| GL2['UNSIGNED_INT_10F_11F_11F_REV']
		| GL2['UNSIGNED_INT_5_9_9_9_REV']


	// https://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/
	interface Base_EXT_texture_filter_anisotropic {
		getParameter(pname: GL.EXT_texture_filter_anisotropic['MAX_TEXTURE_MAX_ANISOTROPY_EXT']): GLfloat
		getTexParameter(target: TextureTarget, pname: GL.EXT_texture_filter_anisotropic['TEXTURE_MAX_ANISOTROPY_EXT']): GLfloat
		texParameterf(target: TextureTarget, pname: GL.EXT_texture_filter_anisotropic['TEXTURE_MAX_ANISOTROPY_EXT'], param: GLfloat): void
	}

	// https://www.khronos.org/registry/webgl/extensions/EXT_disjoint_timer_query_webgl2/
	type GLuint64EXT = number; // WebIDL: unsigned long long
	/* [NoInterfaceObject] */
	interface EXT_disjoint_timer_query_webgl2 {
		readonly QUERY_COUNTER_BITS_EXT:       /* 0x8864 */ GLenum<'QUERY_COUNTER_BITS_EXT'>;
		readonly TIME_ELAPSED_EXT:             /* 0x88BF */ GLenum<'TIME_ELAPSED_EXT'>;
		readonly TIMESTAMP_EXT:                /* 0x8E28 */ GLenum<'TIMESTAMP_EXT'>;
		readonly GPU_DISJOINT_EXT:             /* 0x8FBB */ GLenum<'GPU_DISJOINT_EXT'>;

		queryCounterEXT(query: WebGLQuery, target: EXT_disjoint_timer_query_webgl2['TIMESTAMP_EXT']): void;
	}
	interface Base_EXT_disjoint_timer_query_webgl2 {
		beginQuery(target: EXT_disjoint_timer_query_webgl2['TIME_ELAPSED_EXT'], query: Nullable<WebGLQuery>): void
		endQuery(target: EXT_disjoint_timer_query_webgl2['TIME_ELAPSED_EXT']): void

		getQueryEXT(target: EXT_disjoint_timer_query_webgl2['TIME_ELAPSED_EXT'], pname: GL2['CURRENT_QUERY']): WebGLQuery | null;
		getQueryEXT(target: EXT_disjoint_timer_query_webgl2['TIMESTAMP_EXT'], pname: GL2['CURRENT_QUERY']): null;
		getQueryEXT(target: EXT_disjoint_timer_query_webgl2['TIME_ELAPSED_EXT'], pname: EXT_disjoint_timer_query_webgl2['QUERY_COUNTER_BITS_EXT']): GLint;
		getQueryEXT(target: EXT_disjoint_timer_query_webgl2['TIMESTAMP_EXT'], pname: EXT_disjoint_timer_query_webgl2['QUERY_COUNTER_BITS_EXT']): GLint;

		getParameter(pname: EXT_disjoint_timer_query_webgl2['TIMESTAMP_EXT']): GLuint64EXT
		getParameter(pname: EXT_disjoint_timer_query_webgl2['GPU_DISJOINT_EXT']): boolean
	}

	// https://www.khronos.org/registry/webgl/extensions/EXT_color_buffer_float/
	interface Base_EXT_color_float {
		renderbufferStorage(target: GL.RenderbufferTarget, internalformat: RenderbufferInternalFormatEXTColorFloat, width: GLsizei, height: GLsizei): void;
	}
	type RenderbufferInternalFormatEXTColorFloat = GL2['R16F']
		| GL2['RG16F']
		| GL2['RGBA16F']
		| GL2['R32F']
		| GL2['RG32F']
		| GL2['RGBA32F']
		| GL2['R11F_G11F_B10F']

	// compressed formats extensions
	interface Base_compressedTextureFormat {
		// See https://stackoverflow.com/a/36239727/1980909 for which formats support 3D
		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: CompressedTextureFormat, width: GLsizei, height: GLsizei, border: 0, imageSize: GLsizei, offset: GLintptr): void;
		compressedTexImage2D(target: GL.TexImage2DTarget, level: GLint, internalformat: CompressedTextureFormat, width: GLsizei, height: GLsizei, border: 0, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset?: GLuint /* = 0 */, srcLengthOverride?: GLuint /* = 0 */): void;

		compressedTexImage3D(target: TexImage3DTarget, level: GLint, internalformat: CompressedTextureFormat3D, width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, imageSize: GLsizei, offset: GLintptr): void;
		compressedTexImage3D(target: TexImage3DTarget, level: GLint, internalformat: CompressedTextureFormat3D, width: GLsizei, height: GLsizei, depth: GLsizei, border: 0, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset?: GLuint /* = 0 */, srcLengthOverride?: GLuint /* = 0 */): void;

		compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: CompressedTextureFormatNoEtc1, imageSize: GLsizei, offset: GLintptr): void;
		compressedTexSubImage2D(target: GL.TexImage2DTarget, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: CompressedTextureFormatNoEtc1, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset?: GLuint /* = 0 */, srcLengthOverride?: GLuint /* = 0 */): void;

		compressedTexSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: CompressedTextureFormat3D, imageSize: GLsizei, offset: GLintptr): void;
		compressedTexSubImage3D(target: TexImage3DTarget, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: CompressedTextureFormat3D, /* [AllowShared] */ srcData: ArrayBufferView, srcOffset?: GLuint /* = 0 */, srcLengthOverride?: GLuint /* = 0 */): void;
	}
	type CompressedTextureFormat3D = GL.CompressedTextureFormatAstc | GL.CompressedTextureFormatEtc | GL.CompressedTextureFormatS3tc | GL.CompressedTextureFormatS3tcSrgb
	type CompressedTextureFormatNoEtc1 = CompressedTextureFormat3D | GL.CompressedTextureFormatAtc | GL.CompressedTextureFormatPvrtc
	type CompressedTextureFormat = CompressedTextureFormatNoEtc1 | GL.WEBGL_compressed_texture_etc1['COMPRESSED_RGB_ETC1_WEBGL']
}
type WebGL2RenderingContext = WebGLRenderingContextStrict.Base
	& WebGLRenderingContextStrict.Base_WEBGL_debug_renderer_info
	& WebGL2RenderingContext.Base
	& WebGL2RenderingContext.Base_EXT_texture_filter_anisotropic
	& WebGL2RenderingContext.Base_EXT_disjoint_timer_query_webgl2
	& WebGL2RenderingContext.Base_compressedTextureFormat
declare var WebGL2RenderingContext: WebGL2RenderingContext.Constants & {
	prototype: WebGL2RenderingContext
	new(_:never): WebGL2RenderingContext
}
