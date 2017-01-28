import * as d3 from 'd3'
import './flags.css'
import tip from 'd3-tip'
import $ from 'jquery'
//import './flags.png'

const dataUrl = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json'
const chart = () => {
    let width = 960,
        height = 720
    let nodeContainer = d3.select('body').append('div')
            .attr('class', 'node-container')
    let svg = nodeContainer.append('svg')
        .attr('width', width)
        .attr('height', height)
        
    let tooltip = nodeContainer.append('span')    
        .attr('class', 'tooltip')
        .style('opacity', 0)
//        svg.call(tooltip)
    
    d3.json(dataUrl, (json) => {
        let force = d3.forceSimulation(json.nodes)
            .force('link', d3.forceLink(json.links).distance(50))
            .force('center', d3.forceCenter(width/2, height/2 - 50))
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
        
        
        
        let node = nodeContainer.selectAll('.node')
            .data(json.nodes).enter()
            .append('img')
            .attr('class', d=>`node flag flag-${d.code}`)
            .on('mouseover', d=>{
                tooltip.html(`<strong>${d.country}</strong>`)
                let position = $(d3.event.target).position(),
                    width =  $('.tooltip').width()
                
                tooltip.style('opacity', 1)
                    .style('left', position.left - width/2 + 'px')
                    .style('top', position.top - 30 + 'px')

            })
            .on('mouseout', d=>{
                tooltip.style('opacity', 0)
            })

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