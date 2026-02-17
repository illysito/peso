import './styles/style.css'

// -- general
import nav from './features/pages/general/nav'

function runGeneralFunctions() {
  nav()
}

function runHomeFunctions() {
  const { default: WorldHome } = await import('./features/three/worldHome')
  const { default: content } = await import('./features/pages/home/content')
  const { default: mousetrack } = await import(
    './features/pages/home/mousetrack'
  )

  new WorldHome()
  content()
  mousetrack()
}

function runProjectFunctions() {
  const { default: WorldProjects } = await import(
    './features/three/worldProjects'
  )
  const { default: projects } = await import(
    './features/pages/projects/projects'
  )

  new WorldProjects()
  projects()
}

runGeneralFunctions()
if (document.body.classList.contains('body__home')) runHomeFunctions()
if (document.body.classList.contains('body__projects')) runProjectFunctions()
