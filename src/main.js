import './styles/style.css'

// -- general
import nav from './features/pages/general/nav'

function runGeneralFunctions() {
  nav()
}

async function runHomeFunctions() {
  const { default: WorldHome } = await import('./features/three/worldHome')
  const { default: content } = await import('./features/pages/home/content')
  const { default: mousetrack } = await import(
    './features/pages/home/mousetrack'
  )

  new WorldHome()
  content()
  mousetrack()
}

async function runProjectsFunctions() {
  const { default: WorldProjects } = await import(
    './features/three/worldProjects'
  )
  const { default: projects } = await import(
    './features/pages/projects/projects'
  )

  new WorldProjects()
  projects()
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

runGeneralFunctions()
if (document.body.classList.contains('body__home')) runHomeFunctions()
if (document.body.classList.contains('body__projects')) runProjectsFunctions()
if (document.body.classList.contains('body__project')) runProjectFunctions()
