import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const container = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 8; 

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);


scene.add(new THREE.AmbientLight(0xffffff, 2));
const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);


let cokeCan;
const loader = new GLTFLoader();
loader.load('classic-coca-cola.glb', (gltf) => {
    cokeCan = gltf.scene;
    cokeCan.scale.set(15, 15, 15); 
    cokeCan.position.y = -2;
    scene.add(cokeCan);
}, undefined, (err) => console.error("Model Load Error:", err));


const scrollContainer = document.getElementById('scroll-container');
const canWrapper = document.getElementById('can-container');
let scrollFraction = 0;

scrollContainer.addEventListener('scroll', () => {
    const scrollTop = scrollContainer.scrollTop;
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    scrollFraction = scrollTop / maxScroll;

    
    const currentX = 75 - (50 * scrollFraction);
    canWrapper.style.left = `${currentX}%`;
});

function animate() {
    requestAnimationFrame(animate);
    if (cokeCan) {
        
        cokeCan.rotation.y += 0.01;
        
        cokeCan.rotation.z = THREE.MathUtils.lerp(cokeCan.rotation.z, (scrollFraction * Math.PI), 0.05);
        
        
        const tilt = Math.sin(scrollFraction * Math.PI) * 15;
        canWrapper.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`;
    }
    renderer.render(scene, camera);
}


window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
