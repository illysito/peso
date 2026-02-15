const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_offset;
uniform float u_grain;
uniform float u_red;
uniform float u_green;
uniform float u_blue;
uniform sampler2D u_image_1;
uniform sampler2D u_image_2;
uniform sampler2D u_displacement;

varying vec2 v_texcoord;

float random(vec2 uv) {
  return fract(sin(dot(uv.xy,
      vec2(12.9898,78.233))) *
          43758.5453123);
}

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

  // NOISE

  float noise = random(uv + sin(u_time));
  float noiseFactor = 0.1 + 0.1 * u_grain;

  // IMG

  // float displacementCoef = 1.0 * (0.1 - uv.y * 2.0);
  float displacementCoef = 0.4;

  // gravity
  float g = 1.0 - uv.y;
  g = pow(g, 2.0);    
  float gravityStrength = 1.0;

  vec4 img_1 = texture2D(u_image_1, coords);
  vec4 img_2 = texture2D(u_image_2, coords);
  vec4 displacement = texture2D(u_displacement, coords);

  float displaceForce1 = displacement.r * u_offset * displacementCoef * (1.0 + gravityStrength * g);
  vec2 uvDisplaced1 = vec2(uv.x, uv.y + displaceForce1);

  float displaceForce2 = displacement.r * (1.0 - u_offset) * displacementCoef * (1.0 + gravityStrength * g);
  vec2 uvDisplaced2 = vec2(uv.x, uv.y - displaceForce2);

  // displacement + color split
  vec4 d_img_1 = texture2D(u_image_1, uvDisplaced1);
  float r1 = texture2D(u_image_1, vec2(uvDisplaced1.x, uvDisplaced1.y + 0.15 * u_red)).r;
  float g1 = texture2D(u_image_1, vec2(uvDisplaced1.x, uvDisplaced1.y + 0.1 * u_green)).g;
  float b1 = texture2D(u_image_1, vec2(uvDisplaced1.x - 0.08 * u_blue, uvDisplaced1.y + 0.15 * u_blue)).b;
  d_img_1 = vec4(r1, g1, b1, 1.0);

  vec4 d_img_2 = texture2D(u_image_2, uvDisplaced2);
  float r2 = texture2D(u_image_2, vec2(uvDisplaced2.x, uvDisplaced2.y - 0.1 * u_red)).r;
  float g2 = texture2D(u_image_2, vec2(uvDisplaced2.x, uvDisplaced2.y - 0.05 * u_green)).g;
  float b2 = texture2D(u_image_2, vec2(uvDisplaced2.x + 0.08 * u_red, uvDisplaced2.y - 0.1 * u_blue)).b;
  d_img_2 = vec4(r2, g2, b2, 1.0);

  vec4 img = (d_img_1 * (1.0 - u_offset) + d_img_2 * u_offset);

  img += noise * noiseFactor;

  gl_FragColor = img;
}
`
export default frag
