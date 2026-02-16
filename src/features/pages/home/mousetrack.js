import gsap from 'gsap'

function mousetrack() {
  const blob = document.querySelector('.mousetrack-container')
  const blobTxt = blob.firstElementChild
  const domImageWrappers = [
    ...document.querySelectorAll('.content-img-wrapper'),
  ]

  let blobRadius = 40 // update if changed in webflow

  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0

  const speed = 0.1

  function updateBlob() {
    currentX += (targetX - currentX) * speed
    currentY += (targetY - currentY) * speed

    blob.style.left = `${currentX}px`
    blob.style.top = `${currentY}px`

    requestAnimationFrame(updateBlob)
  }
  updateBlob()

  window.addEventListener(
    'mousemove',
    (e) => {
      targetX = e.clientX - blobRadius
      targetY = e.clientY + window.scrollY - blobRadius
    },
    { passive: true }
  )

  domImageWrappers.forEach((img) => {
    img.addEventListener('mouseenter', () => {
      gsap.to(blob, {
        scale: 1,
        duration: 0.8,
        ease: 'expo.inOut',
      })
      gsap.to(blobTxt, {
        opacity: 1,
        duration: 0.8,
        ease: 'expo.inOut',
      })
    })
    img.addEventListener('mouseleave', () => {
      gsap.to(blob, {
        scale: 0,
        duration: 0.8,
        ease: 'expo.inOut',
      })
      gsap.to(blobTxt, {
        opacity: 0,
        duration: 0.8,
        ease: 'expo.inOut',
      })
    })
  })
}

export default mousetrack
