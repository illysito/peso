import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

// import randomChar from './randomChar'

gsap.registerPlugin(ScrollTrigger)

function revealLines(input) {
  // console.log(input)
  // const input = document.querySelector('.content-h')

  // split hero heading
  const split = new SplitType(input, {
    type: 'lines',
  })

  split.lines.forEach((line) => {
    const wrapper = document.createElement('div')

    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    // Insert wrapper before the line
    line.parentNode.insertBefore(wrapper, line)

    // Move the line inside the wrapper
    wrapper.appendChild(line)

    gsap.set(line, {
      yPercent: -100,
      opacity: 0,
    })
  })

  // trigger on scroll
  split.lines.forEach((l) => {
    gsap.to(l, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: l,
        start: 'top 96%',
      },
    })
  })

  // apply randomChar if it's a title of a project or catalogue
  // if (input.classList.contains('content-h')) {
  //   split.lines.forEach((line) => {
  //     console.log(line)
  //     randomChar(line)
  //   })
  // }
  // console.log(randomChar)
}

export default revealLines
