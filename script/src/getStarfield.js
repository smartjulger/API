import * as THREE from 'three';

export default function getStarfield({ numStars = 500 } = {}) {
  const verts = [];
  const colors = [];

  for (let i = 0; i < numStars; i++) {
    const radius = Math.random() * 2000 + 500;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    verts.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
    const col = new THREE.Color().setHSL(0.6, 0.2, Math.random());
    colors.push(col.r, col.g, col.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ size: 2, vertexColors: true });
  return new THREE.Points(geo, mat);
}
