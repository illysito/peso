import gsap from 'gsap'

import randomChar from '../../functions/randomChar'
import revealLines from '../../functions/revealLines'

function catalogue() {
  const catalogueHeadings = document.querySelectorAll('.catalogue-h')
  const catalogueMetadata = document.querySelectorAll('.catalogue-metadata-p')
  const catalogueCards = document.querySelectorAll('.catalogue-card')
  const videos = document.querySelectorAll('.catalogue-video')
  const filterWrappers = document.querySelectorAll('.filter-wrapper')

  const highlightColors = []
  let colorIndex = 0
  highlightColors.push('#fff8bb') // yellow
  highlightColors.push('#f2ffbb') // pistacho
  highlightColors.push('#dfffcc') // acid
  highlightColors.push('#ffe6e6') // pink

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
        backgroundColor: highlightColors[colorIndex],
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

    video.addEventListener('mouseenter', () => {
      // console.log('yay', img)
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

  // change color
  window.addEventListener('keydown', (e) => {
    if (e.key === '1') {
      colorIndex = 0
    }
    if (e.key === '2') {
      colorIndex = 1
    }
    if (e.key === '3') {
      colorIndex = 2
    }
    if (e.key === '4') {
      colorIndex = 3
    }
  })

  // filter
  let filterTags = ['is--all', 'is--original', 'is--curation', 'is--ian'] // [all, originals, curation, ian]
  let currentFilter = 'is--all'
  let previousFilter = 'is-all'
  filterWrappers.forEach((w, index) => {
    w.addEventListener('click', () => {
      // reset array and put to 1 de corresponding filter tag
      currentFilter = filterTags[index]
      if (currentFilter === previousFilter) return
      previousFilter = currentFilter
      // all opacity 0
      const tl = gsap.timeline()
      tl.to(catalogueCards, {
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.inOut',
        onComplete: () => {
          catalogueCards.forEach((c) => {
            if (currentFilter === 'is--all') {
              c.style.display = 'flex'
            }
            if (
              !c.classList.contains(currentFilter) &&
              currentFilter != 'is--all'
            ) {
              c.style.display = 'none'
            } else {
              c.style.display = 'flex'
            }
          })
        },
      }).to(catalogueCards, {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.inOut',
      })
    })
  })
}

export default catalogue
