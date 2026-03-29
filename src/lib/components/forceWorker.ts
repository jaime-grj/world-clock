import * as d3 from 'd3';
import { rectCollide } from '../utils/d3-forces';

self.addEventListener('message', (event) => {
  const { id, nodes } = event.data;

  if (!nodes || nodes.length === 0) {
    self.postMessage({ id, nodes: [] });
    return;
  }

  const simulation = d3.forceSimulation(nodes)
    .force('x', d3.forceX((d: any) => d.targetX).strength(0.1))
    .force('y', d3.forceY((d: any) => d.targetY).strength(0.1))
    .force('collide', rectCollide())
    .stop();

  const ticks = nodes.length > 300 ? 15 : (nodes.length > 50 ? 60 : 250);
  for (let i = 0; i < ticks; ++i) simulation.tick();

  self.postMessage({ id, nodes });
});