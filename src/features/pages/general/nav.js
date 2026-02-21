import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function nav() {
  const heroSection = document.querySelector('.hero__section')
  const heroHeading = document.querySelector('.logo-h')
  const navLinks = document.querySelectorAll('.nav-link-wrapper')
  const logo = document.querySelector('.logo-h')
  const underscores = document.querySelectorAll('.underscore')
  const asteriscs = document.querySelectorAll('.asterisc')

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

  // set underscores
  gsap.set(underscores, {
    scaleX: 0,
    transformOrigin: 'right center',
  })
  if (asteriscs) {
    if (document.body.classList.contains('body__projects')) {
      gsap.set(asteriscs[1], {
        opacity: 1,
      })
    }
    if (document.body.classList.contains('body__project')) {
      gsap.set(asteriscs[1], {
        opacity: 1,
      })
    }
    if (document.body.classList.contains('body__catalogue')) {
      gsap.set(asteriscs[2], {
        opacity: 1,
      })
    }
    if (document.body.classList.contains('body__agenda')) {
      gsap.set(asteriscs[3], {
        opacity: 1,
      })
    }
    if (document.body.classList.contains('body__about')) {
      gsap.set(asteriscs[4], {
        opacity: 1,
      })
    }
    if (document.body.classList.contains('body__contact')) {
      gsap.set(asteriscs[5], {
        opacity: 1,
      })
    }
  }

  // hover on links
  navLinks.forEach((link, index) => {
    const txt = link.firstElementChild
    gsap.set(txt, {
      fontVariationSettings: `"wght" ${300}`,
    })
    link.addEventListener('mouseenter', () => {
      gsap.to(txt, {
        fontVariationSettings: `"wght" ${500}`,
      })
      gsap.to(underscores[index], {
        duration: 0.4,
        ease: 'power2.inOut',
        scaleX: 1,
        transformOrigin: 'left center',
      })
    })
    link.addEventListener('mouseleave', () => {
      gsap.to(txt, {
        fontVariationSettings: `"wght" ${300}`,
      })
      gsap.to(underscores[index], {
        duration: 0.4,
        ease: 'power2.inOut',
        scaleX: 0,
        transformOrigin: 'right center',
      })
    })
    link.addEventListener('click', () => {
      gsap.to(underscores[index], {
        duration: 0.4,
        ease: 'power2.inOut',
        scaleX: 0,
        transformOrigin: 'right center',
      })
    })
  })

  logo.addEventListener('mouseenter', () => {
    gsap.to(logo, {
      scale: 0.96,
    })
  })
  logo.addEventListener('mouseleave', () => {
    gsap.to(logo, {
      scale: 1,
    })
  })

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
