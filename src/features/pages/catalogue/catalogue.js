import gsap from 'gsap'

import randomChar from '../../functions/randomChar'
import revealLines from '../../functions/revealLines'

function catalogue() {
  const catalogueHeadings = document.querySelectorAll('.catalogue-h')
  const catalogueMetadata = document.querySelectorAll('.catalogue-metadata-p')
  const catalogueCards = document.querySelectorAll('.catalogue-card')
  const videos = document.querySelectorAll('.catalogue-video')

  catalogueHeadings.forEach((h) => {
    revealLines(h)
  })

  catalogueMetadata.forEach((p) => {
    revealLines(p)
  })

  catalogueCards.forEach((w) => {
    // console.log('yeka')
    const infoWrapper = w.lastElementChild
    const title = infoWrapper.firstElementChild
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

  videos.forEach((video) => {
    const subWrapper = video.parentElement
    const wrapper = subWrapper.parentElement
    const container = wrapper.parentElement
    const img = container.lastElementChild
    console.log(img)
    video.addEventListener('mouseenter', () => {
      console.log('yay', img)
      gsap.to(img, {
        opacity: 0,
        duration: 0.2,
      })
      video.play().catch(() => {})
    })

    video.addEventListener('mouseleave', () => {
      gsap.to(img, {
        opacity: 1,
        duration: 0.2,
        onComplete: () => {
          video.pause()
          video.currentTime = 0 // remove this line if you DON'T want reset
        },
      })
    })
  })
}

export default catalogue
