// import gsap from 'gsap'

import randomChar from '../../functions/randomChar'
import revealLines from '../../functions/revealLines'

function content() {
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
    w.addEventListener('mouseenter', () => {
      randomChar(title)
    })
  })
}

export default content
