import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import revealLines from '../../functions/revealLines'

gsap.registerPlugin(ScrollTrigger)

function footer() {
  const footerHeading = document.querySelector('.footer-h')
  const footerLinks = document.querySelectorAll('.footer-link-wrapper')

  // split footer heading
  const split = new SplitType(footerHeading, {
    type: 'chars',
  })

  // hover on links
  footerLinks.forEach((link) => {
    const txt = link.firstElementChild
    revealLines(txt)
    gsap.set(txt, {
      fontVariationSettings: `"wght" ${300}`,
    })
    link.addEventListener('mouseenter', () => {
      gsap.to(txt, {
        fontVariationSettings: `"wght" ${500}`,
      })
    })
    link.addEventListener('mouseleave', () => {
      gsap.to(txt, {
        fontVariationSettings: `"wght" ${300}`,
      })
    })
  })

  // change weight on mousemove
  let mouseX = 0
  const MIN_WEIGHT = 200
  const MIN_WEIGHT_MID = 300
  const MAX_WEIGHT_MID = 500
  const MAX_WEIGHT = 600
  function updateWeight() {
    // p from peso and from producciones
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
    gsap.to(split.chars[4], {
      fontVariationSettings: `"wght" ${pWeight}`,
    })
    // r from producciones
    let rWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MAX_WEIGHT - 25,
      MIN_WEIGHT + 25,
      mouseX
    )
    gsap.to(split.chars[5], {
      fontVariationSettings: `"wght" ${rWeight}`,
    })
    // ..o..from producciones
    let ooWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MAX_WEIGHT - 50,
      MIN_WEIGHT + 50,
      mouseX
    )
    gsap.to(split.chars[6], {
      fontVariationSettings: `"wght" ${ooWeight}`,
    })
    // ..d..from producciones
    let dWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MAX_WEIGHT - 75,
      MIN_WEIGHT + 75,
      mouseX
    )
    gsap.to(split.chars[7], {
      fontVariationSettings: `"wght" ${dWeight}`,
    })
    // e from peso and u from producciones
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
    gsap.to(split.chars[8], {
      fontVariationSettings: `"wght" ${eWeight}`,
    })
    let c1Weight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MAX_WEIGHT_MID - 25,
      MIN_WEIGHT_MID + 25,
      mouseX
    )
    gsap.to(split.chars[9], {
      fontVariationSettings: `"wght" ${c1Weight}`,
    })
    let c2Weight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MAX_WEIGHT_MID - 50,
      MIN_WEIGHT_MID + 50,
      mouseX
    )
    gsap.to(split.chars[10], {
      fontVariationSettings: `"wght" ${c2Weight}`,
    })
    let iWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MAX_WEIGHT_MID - 75,
      MIN_WEIGHT_MID + 75,
      mouseX
    )
    gsap.to(split.chars[11], {
      fontVariationSettings: `"wght" ${iWeight}`,
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
    gsap.to(split.chars[12], {
      fontVariationSettings: `"wght" ${sWeight}`,
    })
    let oooWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MIN_WEIGHT + 25,
      MAX_WEIGHT - 25,
      mouseX
    )
    gsap.to(split.chars[13], {
      fontVariationSettings: `"wght" ${oooWeight}`,
    })
    let nWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MIN_WEIGHT + 50,
      MAX_WEIGHT - 50,
      mouseX
    )
    gsap.to(split.chars[14], {
      fontVariationSettings: `"wght" ${nWeight}`,
    })
    let eeWeight = gsap.utils.mapRange(
      0,
      window.innerWidth,
      MIN_WEIGHT + 75,
      MAX_WEIGHT - 75,
      mouseX
    )
    gsap.to(split.chars[15], {
      fontVariationSettings: `"wght" ${eeWeight}`,
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
    gsap.to(split.chars[15], {
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

export default footer
