
import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  connections: number[];
  size: number;
  glowing: boolean;
}

interface DataPacket {
  currentNode: number;
  targetNode: number;
  progress: number;
  speed: number;
}

const NetworkAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to match parent dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create a deltoidal hexecontahedron (60-faced polyhedron)
    const createDeltoidalHexecontahedron = (centerX: number, centerY: number, radius: number) => {
      const nodes: Node[] = [];
      
      // Golden ratio for icosahedron coordinates
      const phi = (1 + Math.sqrt(5)) / 2;
      
      // Base icosahedron vertices
      const baseVertices = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
      ];
      
      const vertices = [...baseVertices];
      
      // Add some mid-edge vertices to better approximate a deltoidal hexecontahedron
      for (let i = 0; i < baseVertices.length; i++) {
        for (let j = i + 1; j < baseVertices.length; j++) {
          // Only connect close vertices
          const [x1, y1, z1] = baseVertices[i];
          const [x2, y2, z2] = baseVertices[j];
          
          const dist = Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2);
          if (dist < 2.5) {
            // Create midpoint
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const midZ = (z1 + z2) / 2;
            
            // Normalize to push to surface
            const len = Math.sqrt(midX**2 + midY**2 + midZ**2);
            const normalizedVert = [
              midX / len * 1.5, 
              midY / len * 1.5, 
              midZ / len * 1.5
            ];
            
            vertices.push(normalizedVert);
          }
        }
      }
      
      // Projection parameters - adjusted to match the reference image
      const angleX = Math.PI / 8; // Adjusted angle
      const angleY = Math.PI / 10; // Adjusted angle
      
      // Adjusted position to be more to the right, but not overlapping text
      const rightOffset = canvas.width * 0.18; // Adjusted offset
      
      // Project 3D vertices to 2D - keep larger size
      for (const [x, y, z] of vertices) {
        // Rotate in X
        const y1 = y * Math.cos(angleX) - z * Math.sin(angleX);
        const z1 = y * Math.sin(angleX) + z * Math.cos(angleX);
        
        // Rotate in Y
        const x2 = x * Math.cos(angleY) + z1 * Math.sin(angleY);
        const z2 = -x * Math.sin(angleY) + z1 * Math.cos(angleY);
        
        // Scale and project to 2D - maintain the scale factor
        const projectedX = centerX + rightOffset + (x2 * radius * 0.8);
        const projectedY = centerY + (y1 * radius * 0.8);
        
        nodes.push({
          x: projectedX,
          y: projectedY,
          connections: [],
          size: 6,
          glowing: false
        });
      }
      
      // Create connections based on distance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect nodes that are close to each other
          if (distance < radius * 0.8) {
            nodes[i].connections.push(j);
          }
        }
      }
      
      return nodes;
    };
    
    // Repositioned to match the reference image - not too left, not too right
    const centerX = canvas.width * 0.55; // Adjusted to move figure to the right
    const centerY = canvas.height * 0.5;
    const radius = Math.min(canvas.width, canvas.height) * 0.3; // Keep same size
    const nodes = createDeltoidalHexecontahedron(centerX, centerY, radius);
    
    // Create data packets that move along the connections
    const packets: DataPacket[] = [];
    
    // Add new data packets regularly
    const addPacket = () => {
      // Increased the maximum number of packets from 3 to 8
      if (packets.length < 8) {
        const startNode = Math.floor(Math.random() * nodes.length);
        const connectedNodes = nodes[startNode].connections;
        
        if (connectedNodes.length > 0) {
          const targetNode = connectedNodes[Math.floor(Math.random() * connectedNodes.length)];
          packets.push({
            currentNode: startNode,
            targetNode,
            progress: 0,
            speed: 0.006 + Math.random() * 0.006  // Doubled speed (previously 0.003 + random * 0.003)
          });
        }
      }
      
      // Schedule next packet creation - reduced time between packet creations
      setTimeout(addPacket, 800 + Math.random() * 600); // Previously 1500 + Math.random() * 1000
    };
    
    // Start with multiple packets immediately
    for (let i = 0; i < 4; i++) {
      setTimeout(() => addPacket(), i * 200);
    }
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.lineWidth = 0.8;
      nodes.forEach((node, i) => {
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          
          // Draw connection line
          const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
          gradient.addColorStop(0, 'rgba(74, 222, 128, 0.2)');
          gradient.addColorStop(1, 'rgba(26, 31, 44, 0.2)');
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });
      
      // Reset all nodes to non-glowing state
      nodes.forEach(node => {
        node.glowing = false;
      });
      
      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i];
        packet.progress += packet.speed;
        
        // Make the target node glow when packet is approaching or just arrived
        if (packet.progress >= 0.8 && packet.progress <= 1.0) {
          nodes[packet.targetNode].glowing = true;
        }
        
        if (packet.progress >= 1) {
          // Turn off source node glow
          nodes[packet.currentNode].glowing = false;
          
          // Find next node
          const currentNode = packet.targetNode;
          const connections = nodes[currentNode].connections;
          
          if (connections.length > 0 && Math.random() > 0.3) { // 70% chance to continue
            const nextTargetIndex = connections[Math.floor(Math.random() * connections.length)];
            packet.currentNode = currentNode;
            packet.targetNode = nextTargetIndex;
            packet.progress = 0;
          } else {
            // Remove packet
            packets.splice(i, 1);
            continue;
          }
        }
        
        // Draw packet
        const sourceNode = nodes[packet.currentNode];
        const targetNode = nodes[packet.targetNode];
        const x = sourceNode.x + (targetNode.x - sourceNode.x) * packet.progress;
        const y = sourceNode.y + (targetNode.y - sourceNode.y) * packet.progress;
        
        ctx.beginPath();
        // Gradient for glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
        gradient.addColorStop(0, 'rgba(74, 222, 128, 1)');
        gradient.addColorStop(0.6, 'rgba(74, 222, 128, 0.4)');
        gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw nodes
      nodes.forEach((node) => {
        // Base node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.glowing ? '#4ADE80' : 'rgba(26, 31, 44, 0.8)';
        ctx.fill();
        
        // Glowing effect when a node is active
        if (node.glowing) {
          ctx.beginPath();
          const glow = ctx.createRadialGradient(node.x, node.y, node.size, node.x, node.y, node.size * 3);
          glow.addColorStop(0, 'rgba(74, 222, 128, 0.8)');
          glow.addColorStop(1, 'rgba(74, 222, 128, 0)');
          
          ctx.fillStyle = glow;
          ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default NetworkAnimation;
