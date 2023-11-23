import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, side: THREE.FrontSide });
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);

frontSideMesh.position.z = 4;
frontSideMesh.position.y = 0.5;
frontSideMesh.castShadow = true;
frontSideMesh.receiveShadow = true;
scene.add(frontSideMesh);

// add backside mesh
const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.BackSide });
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.set(2, 0.51, 4);
// backSideMesh.castShadow = true;
backSideMesh.receiveShadow = true;
scene.add(backSideMesh);

// add double side mesh
const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.set(4, 0.51, 4);
// doubleSideMesh.castShadow = true;
doubleSideMesh.receiveShadow = true;
scene.add(doubleSideMesh);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.1, 100, 20);

const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
torusKnotMaterial.roughness = 0.5;
torusKnotMaterial.metalness = 1;
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotMesh.position.set(-4, 1, 0);
torusKnotMesh.castShadow = true;
torusKnotMesh.receiveShadow = true;
scene.add(torusKnotMesh);

// add torus knot lamber material
const torusKnotLamberMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
torusKnotLamberMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotLamberMaterial.emissiveIntensity = 0.2;
const torusKnotLamberMesh = new THREE.Mesh(torusKnotGeometry, torusKnotLamberMaterial);
torusKnotLamberMesh.castShadow = true;
torusKnotLamberMesh.receiveShadow = true;
torusKnotLamberMesh.position.set(-2, 1, 0);
scene.add(torusKnotLamberMesh);

// add mesh phong material
const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color(0xf0ff0f);
torusKnotPhongMaterial.shininess = 100;
const torusKnotPhongMesh = new THREE.Mesh(torusKnotGeometry, torusKnotPhongMaterial);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
torusKnotPhongMesh.position.set(0, 1, 0);
scene.add(torusKnotPhongMesh);

// add mesh basic material
const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// torusKnotBasicMaterial.wireframe = true;
const torusKnotBasicMesh = new THREE.Mesh(torusKnotGeometry, torusKnotBasicMaterial);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
torusKnotBasicMesh.position.set(2, 1, 0);
scene.add(torusKnotBasicMesh);

// add mesh depth material
const torusKnotDepthMaterial = new THREE.MeshDepthMaterial();
torusKnotDepthMaterial.opacity = 0.5;
const torusKnotDepthMesh = new THREE.Mesh(torusKnotGeometry, torusKnotDepthMaterial);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
torusKnotDepthMesh.position.set(4, 1, 0);
scene.add(torusKnotDepthMesh);

const textureLoader = new THREE.TextureLoader();
// textureLoader.load("/threejs.webp", (texture) => {
//     const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
//     const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
//     const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
//     textureMesh.castShadow = true;
//     textureMesh.receiveShadow = true;
//     textureMesh.position.set(0, 0.5, 2);
//     scene.add(textureMesh);
// });

const texture = await textureLoader.loadAsync("/threejs.webp");
    const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
    const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
    textureMesh.castShadow = true;
    textureMesh.receiveShadow = true;
    textureMesh.position.set(0, 0.5, 2);
    scene.add(textureMesh);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const meterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const mesh = new THREE.Mesh(geometry, meterial);
// mesh.castShadow = true;
// mesh.position.y = 0.5
// scene.add(mesh);

// const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
// const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
// const capsulMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
// capsulMesh.position.set(3, 1.75, 0)
// capsulMesh.castShadow = true;
// capsulMesh.receiveShadow = true;
// scene.add(capsulMesh);

// // add cylinder geometry
// const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
// const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
// const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
// cylinderMesh.position.set(-3, 1, 0);
// cylinderMesh.castShadow = true;
// cylinderMesh.receiveShadow = true;
// scene.add(cylinderMesh);

// // add torus geometry
// const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
// const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
// const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
// torusMesh.position.set(0, 0.5, 1);
// torusMesh.castShadow = true;
// torusMesh.receiveShadow = true;
// scene.add(torusMesh);

// const startShape = new THREE.Shape();
// startShape.moveTo(0, 1);
// startShape.lineTo(0.2, 0.2);
// startShape.lineTo(1, 0.2);
// startShape.lineTo(0.4, -0.1);
// startShape.lineTo(0.6, -1);
// startShape.lineTo(0, -0.5);
// startShape.lineTo(-0.6, -1);
// startShape.lineTo(-0.4, -0.1);
// startShape.lineTo(-1, 0.2);
// startShape.lineTo(-0.2, 0.2);

// const shapeGeometry = new THREE.ShapeGeometry(startShape);
// const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
// const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
// shapeMesh.position.set(0, 1, 2);
// shapeMesh.castShadow = true;
// shapeMesh.receiveShadow = true;
// scene.add(shapeMesh);

// // add extrude geometry
// const extrudeSettings = {
//     steps: 1,
//     depth: 0.1,
//     bevelEnabled: true,
//     bevelThickness: 0.1,
//     bevelSize: 0.3,
//     bevelSegments: 100,
// };
// const extrudeGeometry = new THREE.ExtrudeGeometry(startShape, extrudeSettings);
// const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf });
// const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
// extrudeMesh.position.set(2, 1.3, 2);
// extrudeMesh.castShadow = true;
// extrudeMesh.receiveShadow = true;
// scene.add(extrudeMesh);

// // add sphere geometry
// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0dafff });
// const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphereMesh.position.set(0, 1, -3);
// sphereMesh.castShadow = true;
// sphereMesh.receiveShadow = true;
// // scene.add(sphereMesh);

// const numPoints = 1000;
// const positions = new Float32Array(numPoints * 3);
// for (let i = 0; i < numPoints * 3; i++) {
//     const x = (Math.random() - 0.5) * 1
//     const y = (Math.random() - 0.5) * 1
//     const z = (Math.random() - 0.5) * 1

//     positions[i * 3] = x;
//     positions[i * 3 + 1] = y;
//     positions[i * 3 + 2] = z;
// }

// const bufferGeometry = new THREE.BufferGeometry();
// bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// const pointMeterial = new THREE.PointsMaterial({ color: 0xffff00, size: 0.05 });

// const point = new THREE.Points(sphereGeometry, pointMeterial);
// point.position.set(0,0,-5)
// scene.add(point);


const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
})

const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    textureMesh.rotation.y += 0.01;
}

render();