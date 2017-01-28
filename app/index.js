import chart from './chart'
import './main.css'

var h1 = document.createElement('h1')
h1.innerHTML = 'D3 Force Directed Graph'
document.body.appendChild(h1)
var h3 = document.createElement('h3')
h3.innerHTML = 'Showing Countries National Contiguity'
document.body.appendChild(h3)

chart()