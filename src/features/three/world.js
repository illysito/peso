import gsap from 'gsap'
import * as THREE from 'three'

import frag from './fragmentShader'
import main_frag from './mainFragmentShader'
import vert from './vertexShader'

const canvas = document.getElementById('three-canvas')
const navLink = document.querySelector('.nav-link')
const wrapper = document.querySelector('.canvas')
const dpr = Math.min(window.devicePixelRatio || 1, 2)

function githubToJsDelivr(permalink) {
  return permalink
    .replace('github.com', 'cdn.jsdelivr.net/gh')
    .replace('/blob/', '@')
}

export default class World {
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

    // images
    this.domImageWrappers = [
      ...document.querySelectorAll('.content-img-wrapper'),
    ]

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
    // await this.loadTextures()
    await this.addImages()
    await this.addPlane()
    this.setupListeners()
    this.setImagePositions()
    // this.addObjects()
    this.render()
    this.resize()
    this.gsap()
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

    if (this.imageStore) {
      this.imageStore.forEach((item) => {
        const rect = item.img.getBoundingClientRect()

        item.mesh.scale.set(rect.width, rect.height, 1)
      })
    }

    this.renderer.setSize(this.w, this.h)
    this.camera.aspect = this.w / this.h
    this.updateCamera()
    this.camera.updateProjectionMatrix()
  }

  render() {
    this.time += 0.5

    // FPS
    this.frameCount++
    const now = performance.now()
    if (now - this.lastTime >= 1000) {
      console.log('FPS:', this.frameCount)
      this.frameCount = 0
      this.lastTime = now
    }

    // time for main canvas
    this.mainMesh.material.uniforms.u_time.value = 0.02 * this.time

    // time for image canvas
    if (this.imageStore) {
      this.imageStore.forEach((img) => {
        img.mesh.material.uniforms.u_time.value = 0.002 * this.time
      })
    }
    this.setImagePositions()

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
      fragmentShader: main_frag,
      vertexShader: vert,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(this.w, this.h) },
        u_offset: { value: 0 },
        u_displacement: { value: perlin },
      },
    })
    mainMaterial.transparent = true
    mainMaterial.depthWrite = false
    this.mainMesh = new THREE.Mesh(mainGeometry, mainMaterial)

    this.scene.add(this.mainMesh)
  }

  // images
  async loadTextures() {
    const loader = new THREE.TextureLoader()
    const perlin = await loader.loadAsync(
      githubToJsDelivr(
        'https://github.com/illysito/peso/blob/0294519c879b1beb194295665bea435293f643fa/imgs/perlinSquare.jpg'
      )
    )

    const texturesFront = await Promise.all([
      // galdar en danza
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0b321199ab67aa71ec8601bcf7461aa1525e9cee/imgs/GaldarEnDanza_1.webp'
        )
      ),
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0294519c879b1beb194295665bea435293f643fa/imgs/example.webp'
        )
      ),
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0294519c879b1beb194295665bea435293f643fa/imgs/example.webp'
        )
      ),
      // david y goliat
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0b321199ab67aa71ec8601bcf7461aa1525e9cee/imgs/DavidGoliat_1.webp'
        )
      ),
      // azahar
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/44ca43cf8d88d16f4fa3bce0caeb8f25b0c31a60/imgs/_Azahar1.webp'
        )
      ),
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/1d881a991d9562135d7a3123b4d44682860c2e89/imgs/Azahar1.jpg'
        )
      ),
    ])

    const texturesBack = await Promise.all([
      // galdar en danza
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/53ea88445a66cd11da545f987ef8fc53a0d330c3/imgs/GaldarEnDanza_2.webp'
        )
      ),
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0b6597b7e24369b4a3c5158416d13a7b701cb236/imgs/test%20img%202.webp'
        )
      ),
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0b6597b7e24369b4a3c5158416d13a7b701cb236/imgs/test%20img%202.webp'
        )
      ),
      // david y goliat
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/53ea88445a66cd11da545f987ef8fc53a0d330c3/imgs/DavidGoliat_2.webp'
        )
      ),
      // azahar
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/44ca43cf8d88d16f4fa3bce0caeb8f25b0c31a60/imgs/_Azahar2.webp'
        )
      ),
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0294519c879b1beb194295665bea435293f643fa/imgs/example.webp'
        )
      ),
    ])

    return { perlin, texturesFront, texturesBack }
  }

  async addImages() {
    const { perlin, texturesFront, texturesBack } = await this.loadTextures()
    this.imageStore = this.domImageWrappers.map((img, index) => {
      let bounds = img.getBoundingClientRect()

      // create a mesh for each image
      // let geometry = new THREE.PlaneGeometry(bounds.width, bounds.height, 1, 1)
      let geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
      let material = new THREE.ShaderMaterial({
        fragmentShader: frag,
        vertexShader: vert,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_offset: { value: 0 },
          u_red: { value: 0 },
          u_green: { value: 0 },
          u_blue: { value: 0 },
          u_image_1: { value: texturesFront[index] },
          u_image_2: { value: texturesBack[index] },
          u_displacement: { value: perlin },
        },
      })
      let mesh = new THREE.Mesh(geometry, material)

      this.scene.add(mesh)

      return {
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
      }
    })

    this.renderer.compile(this.scene, this.camera)
    this.renderer.render(this.scene, this.camera)
  }

  setImagePositions() {
    // console.log(this.imageStore)
    this.imageStore.forEach((item) => {
      const rect = item.img.getBoundingClientRect()

      item.mesh.position.x = rect.left - this.w / 2 + rect.width / 2 // operating with img width and screen width shift coord system from DOM to three.js
      item.mesh.position.y = -rect.top + this.h / 2 - rect.height / 2
    })
  }

  // gsap
  gsap() {
    const dur = 1.2
    const offsetColors = [0.0, 0.0, 0.0]

    this.domImageWrappers.forEach((img, index) => {
      img.addEventListener('mouseenter', () => {
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

        tl.to(this.imageStore[index].mesh.material.uniforms.u_offset, {
          value: 1,
          duration: dur,
          ease: 'power3.inOut',
        })
          .to(
            this.imageStore[index].mesh.material.uniforms.u_red,
            {
              value: offsetColors[0],
              duration: dur / 2,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.to(this.imageStore[index].mesh.material.uniforms.u_red, {
                  value: 0,
                  duration: dur / 2,
                  ease: 'power2.inOut',
                })
              },
            },
            '<0'
          )
          .to(
            [this.imageStore[index].mesh.material.uniforms.u_green],
            {
              value: offsetColors[1],
              duration: dur / 2,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.to(this.imageStore[index].mesh.material.uniforms.u_green, {
                  value: 0,
                  duration: dur / 2,
                  ease: 'power2.inOut',
                })
              },
            },
            '<0'
          )
          .to(
            this.imageStore[index].mesh.material.uniforms.u_blue,
            {
              value: offsetColors[2],
              duration: dur / 2,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.to(this.imageStore[index].mesh.material.uniforms.u_blue, {
                  value: 0,
                  duration: dur / 2,
                  ease: 'power2.inOut',
                })
              },
            },
            '<0'
          )
      })

      img.addEventListener('mouseleave', () => {
        const randomIndex = Math.floor(Math.random() * offsetColors.length)
        offsetColors[randomIndex] = 0.1
        const tl = gsap.timeline({
          onComplete: () => {
            offsetColors.forEach((_, i) => {
              offsetColors[i] = 0.0
            })
          },
        })
        tl.to(this.imageStore[index].mesh.material.uniforms.u_offset, {
          value: 0,
          duration: dur,
          ease: 'power3.inOut',
        })
          .to(
            this.imageStore[index].mesh.material.uniforms.u_red,
            {
              value: offsetColors[0],
              duration: dur / 2,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.to(this.imageStore[index].mesh.material.uniforms.u_red, {
                  value: 0,
                  duration: dur / 2,
                  ease: 'power2.inOut',
                })
              },
            },
            '<0'
          )
          .to(
            this.imageStore[index].mesh.material.uniforms.u_green,
            {
              value: offsetColors[1],
              duration: dur / 2,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.to(this.imageStore[index].mesh.material.uniforms.u_green, {
                  value: 0,
                  duration: dur / 2,
                  ease: 'power2.inOut',
                })
              },
            },
            '<0'
          )
          .to(
            this.imageStore[index].mesh.material.uniforms.u_blue,
            {
              value: offsetColors[2],
              duration: dur / 2,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.to(this.imageStore[index].mesh.material.uniforms.u_blue, {
                  value: 0,
                  duration: dur / 2,
                  ease: 'power2.inOut',
                })
              },
            },
            '<0'
          )
      })
    })

    navLink.addEventListener('mouseenter', () => {
      gsap.to(this.mainMesh.material.uniforms.u_offset, {
        value: 1,
        duration: 1.4 * dur,
        ease: 'power2.inOut',
      })
    })
    navLink.addEventListener('mouseleave', () => {
      gsap.to(this.mainMesh.material.uniforms.u_offset, {
        value: 0,
        duration: 1.4 * dur,
        ease: 'power2.inOut',
      })
    })
  }
}
