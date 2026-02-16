const main_frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_offset;
uniform sampler2D u_displacement;

varying vec2 v_texcoord;

vec2 aspect(vec2 uv, float image_ratio, float canvas_ratio){
  // if canvas is taller than image, stretch downwards
  // if canvas is landscape to the image, stretch across
  if(image_ratio >= canvas_ratio){
    float ratio = canvas_ratio / image_ratio;
    uv.x *= ratio;
    uv.x += (1.0 - ratio) / 2.0; 
  } else {
    float ratio = image_ratio / canvas_ratio;
    uv.y *= ratio;
    uv.y += (1.0 - ratio) / 2.0; 
  }
  return uv;
}

void main()
{

  // CREO EL VECTOR UV Y LO AJUSTO A RESOLLUCION

  vec2 uv = v_texcoord;

  // find out the ratios
  float image_ratio = 800.0 / 800.0;
  float canvas_ratio = u_resolution.x / u_resolution.y;

  vec2 coords = aspect(uv, image_ratio, canvas_ratio);

  // COLORS

  vec4 color = vec4(1.0, 0.99216, 0.90196, 1.0);
  vec4 transparent = vec4(1.0, 0.99216, 0.90196, 0.0);

  // float displacementCoef = 1.0 * (0.1 - uv.y * 2.0);
  float displacementCoef = 1.0;

  vec4 displacement = texture2D(u_displacement, coords);
  float displaceForce = u_offset * displacement.r + u_offset * displacementCoef;
  // float displaceForce = displacement.r * sin(u_time) * displacementCoef;

  vec4 background = mix(color, transparent, 1.0 - displaceForce);

  gl_FragColor = background;
}
`
export default main_frag
