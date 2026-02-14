import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function nav() {
  const heroSection = document.querySelector('.hero__section')
  const heroHeading = document.querySelector('.logo-h')

  // split hero heading
  const split = new SplitType(heroHeading, {
    type: 'chars',
  })

  // disperse vertically on scroll
  split.chars.forEach((char, index) => {
    const dispersion = 0.4 * (index / 4 - 0.5)
    gsap.to(char, {
      yPercent: 100 * dispersion,
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  // scale down on scroll
  // gsap.to(heroHeading, {
  //   scale: 0.5,
  //   scrollTrigger: {
  //     trigger: heroSection,
  //     start: 'top top',
  //     end: 'bottom top',
  //     scrub: true,
  //   },
  // })

  // change weight on mousemove
  let mouseX = 0
  const MIN_WEIGHT = 200
  const MIN_WEIGHT_MID = 300
  const MAX_WEIGHT_MID = 500
  const MAX_WEIGHT = 600
  function updateWeight() {
    // p
    let pWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MAX_WEIGHT,
      MIN_WEIGHT,
      mouseX
    )
    gsap.to(split.chars[0], {
      fontVariationSettings: `"wght" ${pWeight}`,
    })
    // e
    let eWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MAX_WEIGHT_MID,
      MIN_WEIGHT_MID,
      mouseX
    )
    gsap.to(split.chars[1], {
      fontVariationSettings: `"wght" ${eWeight}`,
    })
    // s
    let sWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MIN_WEIGHT_MID,
      MAX_WEIGHT_MID,
      mouseX
    )
    gsap.to(split.chars[2], {
      fontVariationSettings: `"wght" ${sWeight}`,
    })
    // o
    let oWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MIN_WEIGHT,
      MAX_WEIGHT,
      mouseX
    )
    gsap.to(split.chars[3], {
      fontVariationSettings: `"wght" ${oWeight}`,
    })
    // loop
    requestAnimationFrame(updateWeight)
  }
  updateWeight()

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
  })
}

export default nav
