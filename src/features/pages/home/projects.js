import gsap from 'gsap'

import randomChar from '../../functions/randomChar'
import revealLines from '../../functions/revealLines'

function projects() {
  const projectHeadings = document.querySelectorAll('.content-h')
  const projectDescriptions = document.querySelectorAll('.content-p')
  const projectImgWrappers = document.querySelectorAll('.content-img-wrapper')

  projectHeadings.forEach((h) => {
    revealLines(h)
    // randomChar(h)
  })

  projectDescriptions.forEach((p) => {
    revealLines(p)
    // randomChar(h)
  })

  projectImgWrappers.forEach((w) => {
    const desc = w.previousElementSibling
    const title = desc.previousElementSibling
    const img = w.firstElementChild
    gsap.set(img, {
      filter: 'saturate(60%)',
    })
    w.addEventListener('mouseenter', () => {
      randomChar(title)
      gsap.to(img, {
        y: 6,
        filter: 'saturate(120%)',
        duration: 0.8,
        ease: 'power2.out',
      })
      gsap.to(w, {
        borderRadius: 8,
        duration: 0.6,
        ease: 'power2.out',
      })
    })
    w.addEventListener('mouseleave', () => {
      gsap.to(img, {
        y: 0,
        filter: 'saturate(60%)',
        duration: 0.8,
        ease: 'power2.out',
      })
      gsap.to(w, {
        borderRadius: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    })
  })
}

export default projects
