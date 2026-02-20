import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// import SplitType from 'split-type'

// import revealLines from '../../functions/revealLines'

gsap.registerPlugin(ScrollTrigger)

function claim() {
  // const claimSection = document.querySelector('.claim__section')
  // const claimHeading = document.querySelectorAll('.claim-h')
  // change weight on mousemove
  // let mouseX = 0
  // let currentX = 0
  // let ease = 0.08
  // function getInertiaX() {
  //   currentX += (mouseX - currentX) * ease
  //   return currentX
  // }
  // const MIN_WEIGHT = 200
  // const MIN_WEIGHT_MID = 300
  // const MAX_WEIGHT_MID = 500
  // const MAX_WEIGHT = 600
  // let rafId
  // let isActive = false
  // function updateWeight() {
  //   if (!isActive) return
  //   const smoothX = getInertiaX()
  //   // p from peso and from producciones
  //   let pWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MAX_WEIGHT,
  //     MIN_WEIGHT,
  //     smoothX
  //   )
  //   split.chars[0].style.fontVariationSettings = `"wght" ${pWeight}`
  //   split.chars[4].style.fontVariationSettings = `"wght" ${pWeight}`
  //   // r from producciones
  //   let rWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MAX_WEIGHT - 25,
  //     MIN_WEIGHT + 25,
  //     smoothX
  //   )
  //   split.chars[5].style.fontVariationSettings = `"wght" ${rWeight}`
  //   // ..o..from producciones
  //   let ooWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MAX_WEIGHT - 50,
  //     MIN_WEIGHT + 50,
  //     smoothX
  //   )
  //   split.chars[6].style.fontVariationSettings = `"wght" ${ooWeight}`
  //   // ..d..from producciones
  //   let dWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MAX_WEIGHT - 75,
  //     MIN_WEIGHT + 75,
  //     smoothX
  //   )
  //   split.chars[7].style.fontVariationSettings = `"wght" ${dWeight}`
  //   // e from peso and u from producciones
  //   let eWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MAX_WEIGHT_MID,
  //     MIN_WEIGHT_MID,
  //     smoothX
  //   )
  //   split.chars[1].style.fontVariationSettings = `"wght" ${eWeight}`
  //   split.chars[8].style.fontVariationSettings = `"wght" ${eWeight}`
  //   let c1Weight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MAX_WEIGHT_MID - 25,
  //     MIN_WEIGHT_MID + 25,
  //     smoothX
  //   )
  //   split.chars[9].style.fontVariationSettings = `"wght" ${c1Weight}`
  //   let c2Weight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MAX_WEIGHT_MID - 50,
  //     MIN_WEIGHT_MID + 50,
  //     smoothX
  //   )
  //   split.chars[10].style.fontVariationSettings = `"wght" ${c2Weight}`
  //   let iWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MAX_WEIGHT_MID - 75,
  //     MIN_WEIGHT_MID + 75,
  //     smoothX
  //   )
  //   split.chars[11].style.fontVariationSettings = `"wght" ${iWeight}`
  //   // s
  //   let sWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MIN_WEIGHT_MID,
  //     MAX_WEIGHT_MID,
  //     smoothX
  //   )
  //   split.chars[2].style.fontVariationSettings = `"wght" ${sWeight}`
  //   split.chars[12].style.fontVariationSettings = `"wght" ${sWeight}`
  //   let oooWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MIN_WEIGHT + 75,
  //     MAX_WEIGHT - 25,
  //     smoothX
  //   )
  //   split.chars[13].style.fontVariationSettings = `"wght" ${oooWeight}`
  //   let nWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MIN_WEIGHT + 50,
  //     MAX_WEIGHT - 50,
  //     smoothX
  //   )
  //   split.chars[14].style.fontVariationSettings = `"wght" ${nWeight}`
  //   let eeWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MIN_WEIGHT + 75,
  //     MAX_WEIGHT - 25,
  //     smoothX
  //   )
  //   gsap.to(split.chars[15], {
  //     fontVariationSettings: `"wght" ${eeWeight}`,
  //   })
  //   // o
  //   let oWeight = gsap.utils.mapRange(
  //     0,
  //     window.innerWidth,
  //     MIN_WEIGHT,
  //     MAX_WEIGHT,
  //     smoothX
  //   )
  //   split.chars[3].style.fontVariationSettings = `"wght" ${oWeight}`
  //   split.chars[15].style.fontVariationSettings = `"wght" ${oWeight}`
  //   // loop
  //   rafId = requestAnimationFrame(updateWeight)
  // }
  // updateWeight()
  // window.addEventListener('mousemove', (e) => {
  //   mouseX = e.clientX
  // })
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         isActive = true
  //         updateWeight()
  //       } else {
  //         isActive = false
  //         cancelAnimationFrame(rafId)
  //       }
  //     })
  //   },
  //   {
  //     threshold: 0.2, // triggers when 20% of footer is visible
  //   }
  // )
  // observer.observe(claimSection)
}

export default claim
