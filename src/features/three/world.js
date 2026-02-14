import gsap from 'gsap'
import * as THREE from 'three'

import frag from './fragmentShader'
import vert from './vertexShader'

const canvas = document.getElementById('three-canvas')
const wrapper = document.querySelector('.canvas')
const dpr = Math.min(window.devicePixelRatio || 1, 2)

function githubToJsDelivr(permalink) {
  return permalink
    .replace('github.com', 'cdn.jsdelivr.net/gh')
    .replace('/blob/', '@')
}

export default class World {
  constructor() {
    this.time = 0

    // sizes
    this.w = canvas.clientWidth
    this.h = canvas.clientHeight

    // scene
    this.scene = new THREE.Scene()

    // camera
    this.fov = 45
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.w / this.h,
      0.01,
      10
    )
    this.camera.position.z = 1

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(this.w, this.h)
    this.renderer.setPixelRatio(dpr)
    this.renderer.setClearColor(0x000000, 0)

    this.resize()
    this.setupResize()
    this.init()
  }

  async init() {
    await this.addObjects()
    this.render()
    this.gsap()
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.w = wrapper.clientWidth
    this.h = wrapper.clientHeight
    this.renderer.setSize(this.w, this.h)
    this.renderer.setPixelRatio(dpr)
    this.camera.aspect = this.w / this.h
    this.camera.updateProjectionMatrix()
  }

  async addObjects() {
    // images
    const loader = new THREE.TextureLoader()

    const [img1, disp] = await Promise.all([
      // loader.loadAsync(
      //   githubToJsDelivr(
      //     'https://github.com/illysito/peso/blob/0294519c879b1beb194295665bea435293f643fa/imgs/example.webp'
      //   )
      // ),
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0b6597b7e24369b4a3c5158416d13a7b701cb236/imgs/test%20img%202.webp'
        )
      ),
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0294519c879b1beb194295665bea435293f643fa/imgs/perlinSquare.jpg'
        )
      ),
    ])

    // object
    this.geometry = new THREE.PlaneGeometry(0.4, 0.4, 1)
    this.material = new THREE.ShaderMaterial({
      fragmentShader: frag,
      vertexShader: vert,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_offset: { value: 0 },
        u_red: { value: 0 },
        u_green: { value: 0 },
        u_blue: { value: 0 },
        u_image_1: { value: img1 },
        u_displacement: { value: disp },
      },
    })
    // console.log(this.material)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  render() {
    this.time += 0.5

    // animate here
    this.material.uniforms.u_time.value = 0.002 * this.time
    // this.material.uniforms.u_offset.value = 0.02 * this.time

    // render & loop
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }

  // gsap
  gsap() {
    const navLink = document.querySelector('.nav-link')
    const dur = 1.2
    const offsetColors = [0.0, 0.0, 0.0]

    navLink.addEventListener('mouseenter', () => {
      const randomIndex = Math.floor(Math.random() * offsetColors.length)
      const randomOffset = 0.02 + Math.random() * 0.08
      offsetColors[randomIndex] = randomOffset
      const tl = gsap.timeline({
        onComplete: () => {
          offsetColors.forEach((_, i) => {
            offsetColors[i] = 0.0
          })
        },
      })

      tl.to(this.material.uniforms.u_offset, {
        value: 1,
        duration: dur,
        ease: 'power3.inOut',
      })
        .to(
          [this.material.uniforms.u_red],
          {
            value: offsetColors[0],
            duration: dur / 2,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.to([this.material.uniforms.u_red], {
                value: 0,
                duration: dur / 2,
                ease: 'power2.inOut',
              })
            },
          },
          '<0'
        )
        .to(
          [this.material.uniforms.u_green],
          {
            value: offsetColors[1],
            duration: dur / 2,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.to([this.material.uniforms.u_green], {
                value: 0,
                duration: dur / 2,
                ease: 'power2.inOut',
              })
            },
          },
          '<0'
        )
        .to(
          [this.material.uniforms.u_blue],
          {
            value: offsetColors[2],
            duration: dur / 2,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.to([this.material.uniforms.u_blue], {
                value: 0,
                duration: dur / 2,
                ease: 'power2.inOut',
              })
            },
          },
          '<0'
        )
    })

    navLink.addEventListener('mouseleave', () => {
      const randomIndex = Math.floor(Math.random() * offsetColors.length)
      offsetColors[randomIndex] = 0.1
      const tl = gsap.timeline({
        onComplete: () => {
          offsetColors.forEach((_, i) => {
            offsetColors[i] = 0.0
          })
        },
      })
      tl.to(this.material.uniforms.u_offset, {
        value: 0,
        duration: dur,
        ease: 'power3.inOut',
      })
        .to(
          [this.material.uniforms.u_red],
          {
            value: offsetColors[0],
            duration: dur / 2,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.to([this.material.uniforms.u_red], {
                value: 0,
                duration: dur / 2,
                ease: 'power2.inOut',
              })
            },
          },
          '<0'
        )
        .to(
          [this.material.uniforms.u_green],
          {
            value: offsetColors[1],
            duration: dur / 2,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.to([this.material.uniforms.u_green], {
                value: 0,
                duration: dur / 2,
                ease: 'power2.inOut',
              })
            },
          },
          '<0'
        )
        .to(
          [this.material.uniforms.u_blue],
          {
            value: offsetColors[2],
            duration: dur / 2,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.to([this.material.uniforms.u_blue], {
                value: 0,
                duration: dur / 2,
                ease: 'power2.inOut',
              })
            },
          },
          '<0'
        )
    })
  }
}
