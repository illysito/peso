import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import randomChar from '../../functions/randomChar'
import revealLines from '../../functions/revealLines'

function content() {
  const projectHeadings = document.querySelectorAll('.content-h')
  const projectDescriptions = document.querySelectorAll('.content-p')
  const projectImgWrappers = document.querySelectorAll('.content-img-wrapper')
  const projectLines = document.querySelectorAll('.section-header-line')
  const projectHeaderWrapper = document.querySelectorAll(
    '.section-header-txt-wrapper'
  )
  const contentLinks = document.querySelectorAll('.content-link')

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
    w.addEventListener('mouseenter', () => {
      randomChar(title)
    })
  })

  projectLines.forEach((line) => {
    gsap.to(line, {
      width: '100%',
      duration: 1.6,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: line,
        start: 'top bottom',
      },
    })
  })

  projectHeaderWrapper.forEach((w) => {
    gsap.to(w, {
      opacity: 1,
      duration: 1.2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: w,
        start: 'top bottom',
      },
    })
  })

  contentLinks.forEach((link) => {
    const txt = link.firstElementChild
    const arrow = link.nextElementSibling
    gsap.set(txt, {
      fontVariationSettings: `"wght" ${350}`,
    })
    link.addEventListener('mouseenter', () => {
      gsap.to(txt, {
        fontVariationSettings: `"wght" ${500}`,
      })
      gsap.to(arrow, {
        x: 2,
      })
    })
    link.addEventListener('mouseleave', () => {
      gsap.to(txt, {
        fontVariationSettings: `"wght" ${350}`,
      })
      gsap.to(arrow, {
        x: 0,
      })
    })
  })
}

export default content
