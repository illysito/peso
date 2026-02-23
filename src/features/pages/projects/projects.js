import gsap from 'gsap'

import randomChar from '../../functions/randomChar'
import revealLines from '../../functions/revealLines'

function projects() {
  const projectHeadings = document.querySelectorAll('.project-h')
  const projectDescriptions = document.querySelectorAll('.project-p')
  const projectMetadata = document.querySelectorAll('.project-metadata-p')
  const projectCards = document.querySelectorAll('.project-card')
  // const nav = document.querySelector('.nav__section')
  const highlightColor = '#fff8bb'

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
        backgroundColor: highlightColor,
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

  // let isClicked = false
  // nav.addEventListener('click', () => {
  //   if (!isClicked) {
  //     projectCards[1].style.display = 'none'
  //     projectCards[3].style.display = 'none'
  //     // gsap.to(projectCards[3], {
  //     //   width: 0,
  //     //   duration: 0.2,
  //     //   ease: 'linear',
  //     //   onComplete: () => {
  //     //   },
  //     // })
  //   } else {
  //     projectCards[1].style.display = 'flex'
  //     projectCards[3].style.display = 'flex'
  //     // gsap.to(projectCards[3], {
  //     //   width: '33.3333%',
  //     //   duration: 0.2,
  //     //   ease: 'linear',
  //     // })
  //   }
  //   isClicked = !isClicked
  // })
}

export default projects
