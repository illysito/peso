import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// import randomChar from '../../functions/randomChar'
// import revealLines from '../../functions/revealLines'

function projectGallery() {
  // const gallerySection = document.querySelector('.gallery__section')
  const galleryWrappers = [...document.querySelectorAll('.gallery-img-wrapper')]

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  shuffle(galleryWrappers)

  let mouseX = 0
  let mouseY = 0
  let amplitude = 20
  function animateGallery() {
    let currentX = gsap.utils.mapRange(
      0,
      window.innerWidth,
      -amplitude,
      amplitude,
      mouseX
    )
    let currentY = gsap.utils.mapRange(
      0,
      window.innerHeight,
      -amplitude,
      amplitude,
      mouseY
    )
    galleryWrappers.forEach((w, index) => {
      if (index === 1) {
        index = 3
      }
      const p = (index + 1) / 32
      gsap.to(w, {
        x: currentX * p,
        y: currentY * p,
        duration: 0.6,
        ease: 'linear',
        overwrite: 'auto',
      })
    })

    requestAnimationFrame(animateGallery)
  }
  animateGallery()

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })
}

export default projectGallery
