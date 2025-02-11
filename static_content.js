import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// DOM element
const canvas = document.querySelector('#matrix-canvas');

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth * .7, window.innerHeight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.lookAt(0, 0, 0)
camera.position.set(0, 5, 20)

const controls = new OrbitControls(camera, renderer.domElement) 
controls.enableDamping = true

export const origin = new THREE.Vector3()
export const scene = new THREE.Scene()

// rgb - xyz
const x_axis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-10, 0, 0), 20, 'red', 0.4)
const y_axis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -10, 0), 20, 'green', 0.4)
const z_axis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -10), 20, 'blue', 0.4)

// Create the xz plane
const xz_plane_vertices = [new THREE.Vector3(9, 0, 9), new THREE.Vector3(-9, 0, 9), 
    new THREE.Vector3(-9, 0, -9), new THREE.Vector3(9, 0, -9)]
const positions_xz_plane = new Float32Array([ // Why is it Float32Array?
    xz_plane_vertices[0].x, xz_plane_vertices[0].y, xz_plane_vertices[0].z, 
    xz_plane_vertices[1].x, xz_plane_vertices[1].y, xz_plane_vertices[1].z, 
    xz_plane_vertices[2].x, xz_plane_vertices[2].y, xz_plane_vertices[2].z, 
    xz_plane_vertices[3].x, xz_plane_vertices[3].y, xz_plane_vertices[3].z, 
])

const xz_plane_triang_geom = new THREE.BufferGeometry()
xz_plane_triang_geom.setAttribute('position', new THREE.BufferAttribute(positions_xz_plane, 3))
const xz_plane_indices = [
    0, 1, 2,
    0, 2, 3
]
xz_plane_triang_geom.setIndex(xz_plane_indices)

const xz_plane_material = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide, transparent: true, opacity: 0.1 });

const xz_plane = new THREE.Mesh(xz_plane_triang_geom, xz_plane_material)

// Create the xz plane-grid
const grid_material = new THREE.LineBasicMaterial({ color: 'grey', linewidth: 1, opacity: 0.4, transparent: true })
for (let i = 1; i <= 9; i++) {
    // parallel to x-axis
    const geom_left = new THREE.BufferGeometry().setFromPoints(
        [new THREE.Vector3(10, 0, -i), new THREE.Vector3(-10, 0, -i)])
    const geom_right = new THREE.BufferGeometry().setFromPoints(
        [new THREE.Vector3(10, 0, i), new THREE.Vector3(-10, 0, i)])
    
    // parallel to z-axis
    const geom_front = new THREE.BufferGeometry().setFromPoints(
        [new THREE.Vector3(-i, 0, 10), new THREE.Vector3(-i, 0, -10)])
    const geom_back = new THREE.BufferGeometry().setFromPoints(
        [new THREE.Vector3(i, 0, 10), new THREE.Vector3(i, 0, -10)])

    scene.add(
        new THREE.Line(geom_left, grid_material), 
        new THREE.Line(geom_right, grid_material),
        new THREE.Line(geom_front, grid_material),
        new THREE.Line(geom_back, grid_material))
}

/*
 * 
 *  Paiting and Update 
 */

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth * .7, window.innerHeight);
    camera.aspect = window.innerWidth * .7 / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Add before the renderer loop
(function initialPaint() {
    scene.add(x_axis, y_axis, z_axis)
    scene.add(xz_plane)
})()

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate()


