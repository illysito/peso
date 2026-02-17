import gsap from 'gsap'
import * as THREE from 'three'

import transition_frag from './shaders/transitionFrag'
import vert from './shaders/vertexShader'

const canvas = document.getElementById('three-canvas')
const nav = document.querySelector('.nav__section')
const transitionOverlay = document.querySelector('.transition-overlay')
const navLinks = document.querySelectorAll('.nav-link-wrapper')
const wrapper = document.querySelector('.canvas')
const dpr = Math.min(window.devicePixelRatio || 1, 2)

function githubToJsDelivr(permalink) {
  return permalink
    .replace('github.com', 'cdn.jsdelivr.net/gh')
    .replace('/blob/', '@')
}

export default class WorldTransition {
  constructor() {
    this.lastTime = performance.now()
    this.frameCount = 0

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
      100,
      2000
    )
    this.camera.position.z = 600
    this.updateCamera()

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
    this.init()
  }

  async init() {
    await this.addPlane()
    this.setupListeners()
    this.render()
    this.resize()
    this.fadeIn()
    this.fadeOut()
  }

  setupListeners() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.w = wrapper.clientWidth
    this.h = wrapper.clientHeight
    this.renderer.setPixelRatio(dpr)
    const pr = this.renderer.getPixelRatio()

    // update canvas resolutions (only need it for the big one, the others are always squares)
    if (this.mainMesh) {
      this.mainMesh.material.uniforms.u_resolution.value.set(
        this.w * pr,
        this.h * pr
      )
      this.mainMesh.scale.set(this.w, this.h, 1)
    }

    this.renderer.setSize(this.w, this.h)
    this.camera.aspect = this.w / this.h
    this.updateCamera()
    this.camera.updateProjectionMatrix()
  }

  render() {
    // this.time += 0.5

    // FPS
    // this.frameCount++
    // const now = performance.now()
    // if (now - this.lastTime >= 1000) {
    //   console.log('FPS:', this.frameCount)
    //   this.frameCount = 0
    //   this.lastTime = now
    // }

    // time for main canvas

    // render & loop
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }

  updateCamera() {
    this.fov =
      (2 * Math.atan(window.innerHeight / 2 / this.camera.position.z) * 180) /
      Math.PI
    this.camera.fov = this.fov
    // console.log(this.camera.fov)
  }

  // main plane
  async loadMainTextures() {
    const loader = new THREE.TextureLoader()
    const perlin = await loader.loadAsync(
      githubToJsDelivr(
        'https://github.com/illysito/peso/blob/0294519c879b1beb194295665bea435293f643fa/imgs/perlinSquare.jpg'
      )
    )

    return perlin
  }

  async addPlane() {
    const perlin = await this.loadMainTextures()
    // create a mesh for each image
    // let mainGeometry = new THREE.PlaneGeometry(this.w, this.h, 1, 1)
    let mainGeometry = new THREE.PlaneGeometry(1, 1, 1, 1)
    let mainMaterial = new THREE.ShaderMaterial({
      fragmentShader: transition_frag,
      vertexShader: vert,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(this.w, this.h) },
        u_offset: { value: 1 },
        u_displacement: { value: perlin },
      },
    })
    mainMaterial.transparent = true
    mainMaterial.depthWrite = false
    this.mainMesh = new THREE.Mesh(mainGeometry, mainMaterial)

    this.scene.add(this.mainMesh)
  }

  // transitions
  fadeIn() {
    const dur = 1.2
    gsap.set(transitionOverlay, {
      zIndex: -30,
    })
    gsap.to(this.mainMesh.material.uniforms.u_offset, {
      delay: 0.8,
      value: 0,
      duration: 1.4 * dur,
      // ease: 'power2.inOut',
      ease: 'power1.inOut',
    })
    gsap.to(nav, {
      delay: 0.8,
      opacity: 1,
      duration: 1.4 * dur,
      // ease: 'power2.inOut',
      ease: 'power1.inOut',
    })
  }

  fadeOut() {
    const dur = 1.2
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const href = e.currentTarget.href
        gsap.to(this.mainMesh.material.uniforms.u_offset, {
          value: 1,
          duration: 1.4 * dur,
          // ease: 'power2.inOut',
          ease: 'power1.inOut',
        })
        gsap.to(nav, {
          opacity: 0,
          duration: 1.4 * dur,
          // ease: 'power2.inOut',
          ease: 'power1.inOut',
          onComplete: () => {
            window.location.href = href
          },
        })
      })
    })
  }
}
