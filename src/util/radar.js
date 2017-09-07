import * as d3 from 'd3'

export function draw (id, d, options) {
  var cfg = {
    radius: 5,
    w: 600,
    h: 600,
    factor: 1,
    factorLegend: 0.9,
    levels: 3,
    maxValue: 0.1,
    radians: 2 * Math.PI,
    opacityArea: 0.5,
    ToRight: 5,
    TranslateX: 80,
    TranslateY: 30,
    ExtraWidthX: 200,
    ExtraWidthY: 100,
    // color: d3.scale.category10()
    color: ['50e3c2']
  }

  if (typeof options !== 'undefined') {
    for (var i in options) {
      if (typeof options[i] !== 'undefined') {
        cfg[i] = options[i]
      }
    }
  }
  cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function (i) {
    return d3.max(i.map(function (o) {
      return o.score
    }))
  }))
  var allAxis = (d[0].map(function (i, j) {
    return i.feature
  }))
  var total = allAxis.length
  var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2)
  d3.select(id).select('svg').remove()

  var g = d3.select(id)
  .append('svg')
  .attr('width', cfg.w + cfg.ExtraWidthX)
  .attr('height', cfg.h + cfg.ExtraWidthY)
  .append('g')
  .attr('transform', 'translate(' + cfg.TranslateX + ',' + cfg.TranslateY + ')')

  // Circular segments
  var levelFactor
  if (options && options.segments) {
    for (var j = 0; j < cfg.levels - 1; j++) {
      levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels)
      g.selectAll('.levels')
        .data(allAxis)
        .enter()
        .append('svg:line')
        .attr('x1', function (d, i) {
          return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total))
        })
        .attr('y1', function (d, i) {
          return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total))
        })
        .attr('x2', function (d, i) {
          return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total))
        })
        .attr('y2', function (d, i) {
          return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total))
        })
        .attr('class', 'line')
        .style('stroke', 'grey')
        .style('stroke-opacity', '0.75')
        .style('stroke-width', '0.3px')
        .attr('transform', 'translate(' + (cfg.w / 2 - levelFactor) + ', ' + (cfg.h / 2 - levelFactor) + ')')
    }
  }
  levelFactor = cfg.factor * radius
  g.selectAll('.levels')
    .data(allAxis)
    .enter()
    .append('svg:line')
    .attr('x1', function (d, i) {
      return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total))
    })
    .attr('y1', function (d, i) {
      return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total))
    })
    .attr('x2', function (d, i) {
      return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total))
    })
    .attr('y2', function (d, i) {
      return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total))
    })
    .attr('class', 'line')
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .attr('transform', 'translate(' + (cfg.w / 2 - levelFactor) + ', ' + (cfg.h / 2 - levelFactor) + ')')

  var series = 0
  d.forEach(function (y, x) {
    var dataValues = []
    g.selectAll('.nodes').data(y, function (j, i) {
      dataValues.push([
        cfg.w / 2 * (1 - (parseFloat(Math.max(j.score, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
        cfg.h / 2 * (1 - (parseFloat(Math.max(j.score, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
      ])
      dataValues.push([
        cfg.w / 2 * (1 - (parseFloat(Math.max(j.score, 0)) / cfg.maxValue) * cfg.factor * Math.sin((i + 1) * cfg.radians / total)),
        cfg.h / 2 * (1 - (parseFloat(Math.max(j.score, 0)) / cfg.maxValue) * cfg.factor * Math.cos((i + 1) * cfg.radians / total))
      ])
      dataValues.push([
        cfg.w / 2, cfg.h / 2
      ])
    })
    dataValues.push(dataValues[0])
    dataValues.forEach(function (y, x) {
      g.selectAll('.area')
        .data([dataValues])
        .enter()
        .append('polygon')
        .attr('class', 'radar-chart-serie' + series)
        .style('stroke-width', '2px')
        .style('stroke', cfg.color[series])
        .attr('points', function (d) {
          var str = ''
          for (var pti = 0; pti < d.length; pti++) {
            str = str + d[pti][0] + ',' + d[pti][1] + ' '
          }
          return str
        })
        .style('fill', function (j, i) {
          return cfg.color[series]
        })
        .style('fill-opacity', cfg.opacityArea)
        .on('mouseover', function (d) {
          var z = 'polygon.' + d3.select(this).attr('class')
          g.selectAll('polygon')
            .transition(200)
            .style('fill-opacity', 0.1)
          g.selectAll(z)
            .transition(200)
            .style('fill-opacity', 0.7)
        })
        .on('mouseout', function () {
          g.selectAll('polygon')
            .transition(200)
            .style('fill-opacity', cfg.opacityArea)
        })
    })
    series++
  })
  series = 0

  var axis = g.selectAll('.axis')
    .data(allAxis)
    .enter()
    .append('g')
    .attr('class', 'axis')
  axis.append('line')
    .attr('x1', cfg.w / 2)
    .attr('y1', cfg.h / 2)
    .attr('x2', function (d, i) {
      return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total))
    })
    .attr('y2', function (d, i) {
      return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total))
    })
    .attr('class', 'line')
    .style('stroke', 'black')
    .style('r', 100)
    .style('stroke-width', '1px')

  axis.append('text')
      .attr('class', 'legend')
      .text(function (d) { return d })
      .style('font-family', 'sans-serif')
      .style('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .attr('transform', function (d, i) { return 'translate(0, -10)' })
      .attr('x', function (d, i) {
        var angle = i * cfg.radians / total
        var delta = cfg.radians / (2 * total)
        return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(delta + angle)) - 60 * Math.sin(delta + angle)
      })
      .attr('y', function (d, i) {
        var angle = i * cfg.radians / total
        var delta = cfg.radians / (2 * total)
        return cfg.h / 2 * (1 - cfg.factorLegend * Math.cos(delta + angle)) - 20 * Math.cos(delta + angle)
      })
}
