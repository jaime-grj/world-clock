import * as d3 from 'd3';

export function rectCollide() {
  let simNodes: any[];
  
  function force(alpha: number) {
    const quadtree = d3.quadtree(simNodes, (d: any) => d.x, (d: any) => d.y);
    // Dynamically lower precision iterations for large lists to prevent lagging 
    //const iterations = simNodes.length > 300 ? 1 : (simNodes.length > 50 ? 1: 1);
    const iterations = 1;
    
    for (let iter = 0; iter < iterations; ++iter) {
      for (let i = 0, n = simNodes.length; i < n; ++i) {
        const a = simNodes[i];
        const wa = (a.label.length * 10) + 60; 
        const ha = 48;
        const searchRadius = wa / 2 + 150;
        
        quadtree.visit((node: any, x1: number, y1: number, x2: number, y2: number) => {
          if (!node.length) {
            do {
              const b = node.data;
              if (b.index > a.index) {
                const wb = (b.label.length * 8) + 60;
                const hb = 48;

                let dx = a.x - b.x;
                let dy = a.y - b.y;
                
                // Add slight jitter to prevent perfectly straight lines and division by zero
                if (Math.abs(dx) < 0.1) dx += (Math.random() - 0.5) * 5 || 0.1;
                if (Math.abs(dy) < 0.1) dy += (Math.random() - 0.5) * 5 || 0.1;

                const w = (wa + wb) / 2;
                const h = (ha + hb) / 2;
                const pushStrength = simNodes.length > 300 ? alpha * 1.5 : alpha * 0.8;

                if (Math.abs(dx) < w && Math.abs(dy) < h) {
                  const overlapX = w - Math.abs(dx);
                  const overlapY = h - Math.abs(dy);

                  let nx = dx / w;
                  let ny = dy / h;
                  let len = Math.sqrt(nx * nx + ny * ny);

                  nx /= len;
                  ny /= len;
                  
                  // We apply a smooth force distributed across both axes
                  const pushX = nx * overlapX * pushStrength * 0.5;
                  const pushY = ny * overlapY * pushStrength * 0.5;

                  a.x += pushX;
                  a.y += pushY;
                  b.x -= pushX;
                  b.y -= pushY;
                }

                // Label A vs Dot B
                let dxDotB = a.x - b.targetX;
                let dyDotB = a.y - b.targetY;
                if (Math.abs(dxDotB) < 0.1) dxDotB += (Math.random() - 0.5) * 5 || 0.1;
                if (Math.abs(dyDotB) < 0.1) dyDotB += (Math.random() - 0.5) * 5 || 0.1;

                const wDotA = (wa / 2) + 8;
                const hDotA = (ha / 2) + 8;
                if (Math.abs(dxDotB) < wDotA && Math.abs(dyDotB) < hDotA) {
                  const overlapX = wDotA - Math.abs(dxDotB);
                  const overlapY = hDotA - Math.abs(dyDotB);

                  let nx = dxDotB / wDotA;
                  let ny = dyDotB / hDotA;
                  let len = Math.sqrt(nx * nx + ny * ny);
                  nx /= len;
                  ny /= len;

                  a.x += nx * overlapX * pushStrength;
                  a.y += ny * overlapY * pushStrength;
                }

                // Label B vs Dot A
                let dxDotA = b.x - a.targetX;
                let dyDotA = b.y - a.targetY;
                if (Math.abs(dxDotA) < 0.1) dxDotA += (Math.random() - 0.5) * 5 || 0.1;
                if (Math.abs(dyDotA) < 0.1) dyDotA += (Math.random() - 0.5) * 5 || 0.1;

                const wDotB = (wb / 2) + 8;
                const hDotB = (hb / 2) + 8;
                if (Math.abs(dxDotA) < wDotB && Math.abs(dyDotA) < hDotB) {
                  const overlapX = wDotB - Math.abs(dxDotA);
                  const overlapY = hDotB - Math.abs(dyDotA);

                  let nx = dxDotA / wDotB;
                  let ny = dyDotA / hDotB;
                  let len = Math.sqrt(nx * nx + ny * ny);
                  nx /= len;
                  ny /= len;

                  b.x += nx * overlapX * pushStrength;
                  b.y += ny * overlapY * pushStrength;
                }
              }
            } while ((node = node.next));
          }
          return x1 > a.x + searchRadius || x2 < a.x - searchRadius || y1 > a.y + searchRadius || y2 < a.y - searchRadius;
        });
      }
    }
  }
  
  force.initialize = (initNodes: any[]) => { simNodes = initNodes; };
  return force;
}