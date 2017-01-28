import * as d3 from 'd3'
import './flags.css'
//import './flags.png'

const dataUrl = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json'
const chart = () => {
    let svg = d3.select('body').append('svg')
        .attr('width', '960')
        .attr('height', '600')
        
    
    d3.json(dataUrl, (json) => {
        let force = d3.forceSimulation(json.nodes)
            .force('link', d3.forceLink(json.links).distance(50))
            .force('center', d3.forceCenter(480, 300))
            .force('charge', d3.forceManyBody()
                    .strength(-30)
                    .distanceMin(25)
                    .distanceMax(100))
            .force('collision', d3.forceCollide(16)
                    .strength(0.25))
        
        let link = svg.selectAll('.link')
            .data(json.links).enter()
            .append('line')
            .attr('class', 'link')
        
        let node = d3.select('body').append('div')
            .attr('class', 'node-container')
            .data(json.nodes).enter()
            .append('img')
            .attr('class', d=>`node flag flag-${d.code}`)

        force.on('tick', ()=>{
            link.attr('x1', d=>d.source.x)
                .attr('y1', d=>d.source.y)
                .attr('x2', d=>d.target.x)
                .attr('y2', d=>d.target.y)
            
            node.style('left', d=>d.x - 8 + 'px')
                .style('top', d=>d.y - 6.5 + 'px')
        })
        
//        force.start()
    })
}

export default chart