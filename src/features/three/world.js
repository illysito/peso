import * as THREE from 'three'

import frag from './fragmentShader'
import vert from './vertexShader'

const canvas = document.getElementById('three-canvas')
const wrapper = document.querySelector('.canvas')
const dpr = Math.min(window.devicePixelRatio || 1, 2)

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
    })
    this.renderer.setSize(this.w, this.h)
    this.renderer.setPixelRatio(dpr)

    this.resize()
    this.setupResize()
    this.addObjects()
    this.render()
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

  addObjects() {
    // object
    this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    this.material = new THREE.ShaderMaterial({
      fragmentShader: frag,
      vertexShader: vert,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  render() {
    this.time += 0.5

    // animate here
    this.mesh.rotation.x = 0.002 * this.time
    this.mesh.rotation.y = 0.002 * this.time

    // render & loop
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}
