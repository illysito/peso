import './styles/style.css'

// -- general
import footer from './features/pages/general/footer'
import nav from './features/pages/general/nav'

const footerSection = document.querySelector('.footer__section')

function runGeneralFunctions() {
  nav()
  if (footerSection) {
    footer()
  }
}

async function runHomeFunctions() {
  const { default: WorldHome } = await import('./features/three/worldHome')
  const { default: content } = await import('./features/pages/home/content')
  const { default: claim } = await import('./features/pages/home/claim')
  const { default: mousetrack } = await import(
    './features/pages/home/mousetrack'
  )
  const domImageWrappers = [
    ...document.querySelectorAll('.content-img-wrapper'),
  ]

  new WorldHome()
  content()
  mousetrack(domImageWrappers)
  claim()
}

async function runProjectsFunctions() {
  const { default: WorldProjects } = await import(
    './features/three/worldProjects'
  )
  const { default: projects } = await import(
    './features/pages/projects/projects'
  )
  const { default: mousetrack } = await import(
    './features/pages/home/mousetrack'
  )
  const domImageWrappers = [
    ...document.querySelectorAll('.project-img-wrapper'),
  ]

  new WorldProjects()
  projects()
  mousetrack(domImageWrappers)
}

async function runProjectFunctions() {
  const { default: WorldTransition } = await import(
    './features/three/worldTransition'
  )
  const { default: projectGallery } = await import(
    './features/pages/project/projectGallery'
  )

  new WorldTransition()
  projectGallery()
}

async function runCatalogueFunctions() {
  const { default: catalogue } = await import(
    './features/pages/catalogue/catalogue'
  )
  const { default: WorldTransition } = await import(
    './features/three/worldTransition'
  )
  const { default: mousetrack } = await import(
    './features/pages/home/mousetrack'
  )
  const domImageWrappers = [
    ...document.querySelectorAll('.catalogue-vid-wrapper'),
  ]

  new WorldTransition()
  catalogue()
  mousetrack(domImageWrappers)
}

async function runAgendaFunctions() {
  const { default: agenda } = await import('./features/pages/agenda/agenda')
  const { default: WorldTransition } = await import(
    './features/three/worldTransition'
  )

  new WorldTransition()
  agenda()
}

async function runAboutFunctions() {
  const { default: about } = await import('./features/pages/about/about')
  // const { default: worldAbout } = await import('./features/three/worldAbout')
  const { default: WorldTransition } = await import(
    './features/three/worldTransition'
  )

  new WorldTransition()
  // new worldAbout()
  about()
}

runGeneralFunctions()
if (document.body.classList.contains('body__home')) runHomeFunctions()
if (document.body.classList.contains('body__projects')) runProjectsFunctions()
if (document.body.classList.contains('body__project')) runProjectFunctions()
if (document.body.classList.contains('body__catalogue')) runCatalogueFunctions()
if (document.body.classList.contains('body__agenda')) runAgendaFunctions()
if (document.body.classList.contains('body__about')) runAboutFunctions()
