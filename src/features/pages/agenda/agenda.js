import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

import randomChar from '../../functions/randomChar'
// import revealLines from '../../functions/revealLines'

function agenda() {
  const agendaContainer = document.querySelector('.agendas-container')
  const agendaRows = document.querySelectorAll('.agenda-row')
  const yearHeadings = [...document.querySelectorAll('.agenda-heading')]
  const agendaWrappers = [
    ...document.querySelectorAll('.agenda-content-wrapper'),
  ]

  // set initial year styles to avoid bumps
  yearHeadings.forEach((h, i) => {
    if (i === 0) {
      gsap.set(h, {
        opacity: 1,
        y: 2,
        fontSize: '6em',
      })
    } else {
      gsap.set(h, {
        opacity: 0.2,
        y: 0,
        fontSize: '2em',
      })
    }
  })

  // randomChar for rows
  agendaRows.forEach((row) => {
    const wrapper = row.firstElementChild
    const title = wrapper.firstElementChild
    row.addEventListener('mouseenter', () => {
      randomChar(title, 0.2, 18)
    })
  })

  // year's interactions
  function animateClickedYears(currentIndex) {
    yearHeadings.forEach((h, index) => {
      if (index === currentIndex) {
        gsap.to(h, {
          opacity: 1,
          y: 2,
          fontSize: '6em',
          duration: 0.8,
          ease: 'power3.inOut',
        })
      } else {
        gsap.to(h, {
          opacity: 0.2,
          y: 0,
          fontSize: '2em',
          duration: 0.8,
          ease: 'power3.inOut',
        })
      } // meaning if it's the clicked one
    })
  }

  // function displayAgenda(startIndex, targetIndex) {
  function displayAgenda(startIndex, targetIndex) {
    gsap.to(agendaWrappers, {
      delay: 0.03,
      xPercent: 100 * targetIndex,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    // DISPLACE
    const startRows = [
      ...agendaWrappers[startIndex].querySelectorAll('.agenda-row'),
    ]
    const targetRows = [
      ...agendaWrappers[targetIndex].querySelectorAll('.agenda-row'),
    ]

    startRows.forEach((r, i) => {
      gsap.to(r, {
        x: 20 * i * direction,
        delay: 0.01 * i,
      })
    })
    targetRows.forEach((r, i) => {
      gsap.to(r, {
        x: 20 * i * direction,
        delay: 0.01 * i,
      })
    })

    // PUT IN PLACE
    startRows.forEach((r, i) => {
      gsap.to(r, {
        x: 0,
        delay: 0.4 + 0.01 * i,
      })
    })
    targetRows.forEach((r, i) => {
      gsap.to(r, {
        x: 0,
        delay: 0.6 + 0.01 * i,
      })
    })

    // need to adjust HEIGHT based on selected agendaWrapper
    const targetHeight =
      agendaWrappers[targetIndex].getBoundingClientRect().height
    gsap.to(agendaContainer, {
      height: targetHeight,
      duration: 0.4,
      ease: 'power1.inOut',
    })
  }

  let indexOfClicked = 0
  let startIndex = 0
  let direction = 1
  yearHeadings.forEach((h, currentIndex) => {
    h.addEventListener('click', () => {
      if (startIndex === currentIndex) return
      // to animate YEARS
      indexOfClicked = currentIndex
      if (indexOfClicked - startIndex > 0) {
        direction = 1
      } else {
        direction = -1
      }
      animateClickedYears(currentIndex)
      displayAgenda(startIndex, indexOfClicked, direction)
      startIndex = indexOfClicked
    })

    h.addEventListener('mouseenter', () => {
      gsap.to(h, {
        opacity: 0.8,
        duration: 0.4,
        ease: 'linear',
        overwrite: 'auto',
      })
    })

    h.addEventListener('mouseleave', () => {
      if (currentIndex == indexOfClicked) {
        gsap.to(h, {
          opacity: 1,
          duration: 0.2,
          ease: 'linear',
          overwrite: 'auto',
        })
      } else {
        gsap.to(h, {
          opacity: 0.2,
          duration: 0.2,
          ease: 'linear',
          overwrite: 'auto',
        })
      }
    })
  })
}

export default agenda
