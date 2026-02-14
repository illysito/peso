const vert = `
#ifdef GL_ES
precision highp float;
#endif

attribute vec3 a_position;
attribute vec2 a_texcoord;

uniform float u_time;

varying vec2 v_texcoord;

void main() {
    float PI = 3.14159265;

    vec3 pos = a_position;

    // float u = (pos.x * 0.5) + 0.5;
    // pos.y += 0.1 * sin((u * 6. + u_time/2.) * 0.2);

    // varyings
    v_texcoord = a_texcoord;

    // output
    gl_Position = vec4(pos, 1.0);
}
`
export default vert
