import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

// Инициализация
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111122);
scene.fog = new THREE.FogExp2(0x111122, 0.02);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(8, 6, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// Вспомогательные элементы
const gridHelper = new THREE.GridHelper(20, 20, 0x4488ff, 0x335588);
gridHelper.position.y = -0.5;
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

// Пол с текстурой (светло-серый)
const planeGeometry = new THREE.PlaneGeometry(15, 15);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x4a6ea5, roughness: 0.7, metalness: 0.1 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5;
plane.receiveShadow = true;
scene.add(plane);

// Освещение - добавляем больше света
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Добавляем второй направленный свет с другой стороны
const directionalLight2 = new THREE.DirectionalLight(0xffaa88, 0.8);
directionalLight2.position.set(-3, 5, 4);
scene.add(directionalLight2);

// Задний свет
const backLight = new THREE.PointLight(0x6688ff, 0.6);
backLight.position.set(-3, 2, -4);
scene.add(backLight);

// Заполняющий свет спереди
const fillLight = new THREE.PointLight(0xffaa66, 0.5);
fillLight.position.set(2, 3, 5);
scene.add(fillLight);

// Контровой свет
const rimLight = new THREE.PointLight(0xff88aa, 0.5);
rimLight.position.set(-2, 2, 4);
scene.add(rimLight);

// Свет снизу для подсветки
const bottomLight = new THREE.PointLight(0x88aaff, 0.3);
bottomLight.position.set(0, -1, 0);
scene.add(bottomLight);

// КУБЫ: красный и синий
const redCube = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.MeshStandardMaterial({ color: 0xff4444, roughness: 0.3, metalness: 0.1, emissive: 0x220000 })
);
redCube.position.set(-3.5, 0.6, 0);
redCube.castShadow = true;
scene.add(redCube);

const blueCube = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x4444ff, roughness: 0.3, metalness: 0.1, emissive: 0x000022 })
);
blueCube.position.set(3.5, 0.6, 0);
blueCube.castShadow = true;
scene.add(blueCube);

// СФЕРЫ: желтая и зеленая
const yellowSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 64, 64),
    new THREE.MeshStandardMaterial({ color: 0xffdd44, roughness: 0.2, metalness: 0.3, emissive: 0x442200 })
);
yellowSphere.position.set(0, 0.6, -3.5);
yellowSphere.castShadow = true;
scene.add(yellowSphere);

const greenSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 64, 64),
    new THREE.MeshStandardMaterial({ color: 0x44ff44, roughness: 0.2, metalness: 0.3, emissive: 0x004400 })
);
greenSphere.position.set(0, 2.2, -3.5);
greenSphere.castShadow = true;
scene.add(greenSphere);

// ЦИЛИНДРЫ: серый и светлый
const darkCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.6, 1.2, 32),
    new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.4, metalness: 0.5 })
);
darkCylinder.position.set(-2.5, 0.6, 3.5);
darkCylinder.castShadow = true;
scene.add(darkCylinder);

const lightCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.6, 1.2, 32),
    new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.4, metalness: 0.5 })
);
lightCylinder.position.set(2.5, 0.6, 3.5);
lightCylinder.castShadow = true;
scene.add(lightCylinder);

// Tweakpane панель
const pane = new Pane({ title: ' Управление сценой', expanded: true });

// Настройки фона
const bgFolder = pane.addFolder({ title: ' Фон', expanded: true });
const bgParams = { color: '#111122' };
bgFolder.addBinding(bgParams, 'color').on('change', (ev) => {
    scene.background = new THREE.Color(ev.value);
});

// Настройки камеры
const cameraFolder = pane.addFolder({ title: ' Камера', expanded: true });
const cameraParams = { x: 8, y: 6, z: 10 };
cameraFolder.addBinding(cameraParams, 'x', { min: -20, max: 20, step: 0.5 }).on('change', (ev) => {
    camera.position.x = ev.value;
});
cameraFolder.addBinding(cameraParams, 'y', { min: -20, max: 20, step: 0.5 }).on('change', (ev) => {
    camera.position.y = ev.value;
});
cameraFolder.addBinding(cameraParams, 'z', { min: -30, max: 30, step: 0.5 }).on('change', (ev) => {
    camera.position.z = ev.value;
});

// Настройки освещения
const lightFolder = pane.addFolder({ title: ' Освещение', expanded: true });
const lightIntensity = { main: 1.2, ambient: 0.5 };
lightFolder.addBinding(lightIntensity, 'main', { min: 0, max: 2, step: 0.1, label: 'Основной свет' }).on('change', (ev) => {
    directionalLight.intensity = ev.value;
});
lightFolder.addBinding(lightIntensity, 'ambient', { min: 0, max: 1, step: 0.1, label: 'Ambient свет' }).on('change', (ev) => {
    ambientLight.intensity = ev.value;
});

// Настройки вращения
const rotationFolder = pane.addFolder({ title: ' Скорость вращения', expanded: true });
const speeds = { cubes: 1.0, spheres: 1.0, cylinders: 1.0 };
rotationFolder.addBinding(speeds, 'cubes', { min: 0, max: 3, step: 0.1, label: 'Кубы (ось X)' });
rotationFolder.addBinding(speeds, 'spheres', { min: 0, max: 3, step: 0.1, label: 'Сферы (ось Y)' });
rotationFolder.addBinding(speeds, 'cylinders', { min: 0, max: 3, step: 0.1, label: 'Цилиндры (ось Z)' });

// Анимация
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.02;
    
    // Кубы вращаются вокруг X
    redCube.rotation.x = time * speeds.cubes;
    blueCube.rotation.x = time * speeds.cubes;
    
    // Сферы вращаются вокруг Y
    yellowSphere.rotation.y = time * speeds.spheres;
    greenSphere.rotation.y = time * speeds.spheres;
    
    // Цилиндры вращаются вокруг Z
    darkCylinder.rotation.z = time * speeds.cylinders;
    lightCylinder.rotation.z = time * speeds.cylinders;
    
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log(' Сцена готова! Все фигуры яркие и хорошо видны');