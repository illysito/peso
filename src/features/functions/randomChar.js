import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

// gsap.registerPlugin(ScrollTrigger)

function randomChar(input, proportion, duration) {
  // const input = document.querySelector('.content-h')

  if (!proportion) {
    proportion = 0.5
  }
  if (!duration) {
    duration = 18
  }
  // split hero heading
  const split = new SplitType(input, {
    type: 'chars',
  })

  const charPool = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'ñ',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]

  // pick three random chars from the input text, never uppercase, never with accents
  let charCounter = 0
  const selectedChars = []
  for (const char of split.chars) {
    if (charCounter >= split.chars.length * proportion) break

    const isValid = /^[a-zñ]$/.test(char.textContent)

    let r = Math.random()
    if (r > 0.5 && isValid) {
      selectedChars.push(char)
      charCounter++
    }
  }

  // animation function
  function animateChars() {
    selectedChars.forEach((char) => {
      let targetChar = char.textContent
      let i = 0
      let delay = 12

      function tick() {
        const randomIndex = Math.floor(Math.random() * charPool.length)
        const randomOffset = Math.floor(8 * Math.random() - 4)
        char.textContent = charPool[randomIndex]

        i++
        delay *= 1.12 // slows down progressively

        gsap.fromTo(
          char,
          { y: 1, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: 'power2.inOut',
          }
        )

        if (i > duration + randomOffset) {
          // control duration by iteration count
          char.textContent = targetChar
          return
        }

        setTimeout(tick, delay)
      }
      tick()
    })
  }
  animateChars()

  // // trigger on scroll
  // ScrollTrigger.create({
  //   trigger: input,
  //   start: 'top bottom',
  //   onEnter: () => {
  //     animateChars()
  //   },
  // })
}

export default randomChar
