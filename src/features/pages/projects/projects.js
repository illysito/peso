import gsap from 'gsap'

import randomChar from '../../functions/randomChar'
import revealLines from '../../functions/revealLines'

function projects() {
  const projectHeadings = document.querySelectorAll('.project-h')
  const projectDescriptions = document.querySelectorAll('.project-p')
  const projectMetadata = document.querySelectorAll('.project-metadata-p')
  const projectCards = document.querySelectorAll('.project-card')

  projectHeadings.forEach((h) => {
    revealLines(h)
  })

  projectDescriptions.forEach((p) => {
    revealLines(p)
  })

  projectMetadata.forEach((p) => {
    revealLines(p)
  })

  projectCards.forEach((w) => {
    // console.log('yeka')
    const desc = w.lastElementChild
    const title = desc.previousElementSibling
    w.addEventListener('mouseenter', () => {
      randomChar(title)
      gsap.to(w, {
        backgroundColor: '#fff8bb',
        duration: 0.2,
        ease: 'linear',
      })
    })
    w.addEventListener('mouseleave', () => {
      gsap.to(w, {
        backgroundColor: '#fff8bb00',
        duration: 0.2,
        ease: 'linear',
      })
    })
  })
}

export default projects
