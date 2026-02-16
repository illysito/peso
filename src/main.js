import './styles/style.css'

// -- general
import nav from './features/pages/general/nav'
// -- home
import content from './features/pages/home/content'
import mousetrack from './features/pages/home/mousetrack'
// -- three
import World from './features/three/world'

console.log('Everything setup!')

nav()
content()
mousetrack()
new World()
