import * as THREE from 'three';
import { MaterialManager } from '../core/MaterialManager.js';

export class TestObjects {
    constructor(scene, materialManager) {
        this.scene = scene;
        this.materialManager = materialManager;
        this.group = null;
        this.objects = [];
    }
    
    // Создание группы с тестовыми примитивами
    createTestGroup() {
        // Создаем группу
        this.group = new THREE.Group();
        
        // Создаем три примитива с разными текстурами
        
        // 1. Куб с металлической текстурой
        const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const cubeMaterial = this.materialManager.createPBRMaterial('metal', {
            roughness: 0.3,
            metalness: 0.8
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(-2, 0.75, 0);
        cube.userData = { type: 'cube', materialType: 'metal' };
        this.group.add(cube);
        this.objects.push(cube);
        
        // 2. Сфера с деревянной текстурой
        const sphereGeometry = new THREE.SphereGeometry(0.8, 64, 64);
        const sphereMaterial = this.materialManager.createPBRMaterial('wood', {
            roughness: 0.6,
            metalness: 0.1
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(0, 0.8, 0);
        sphere.userData = { type: 'sphere', materialType: 'wood' };
        this.group.add(sphere);
        this.objects.push(sphere);
        
        // 3. Цилиндр с каменной текстурой
        const cylinderGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.4, 32);
        const cylinderMaterial = this.materialManager.createPBRMaterial('stone', {
            roughness: 0.4,
            metalness: 0.2
        });
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.position.set(2, 0.7, 0);
        cylinder.userData = { type: 'cylinder', materialType: 'stone' };
        this.group.add(cylinder);
        this.objects.push(cylinder);
        
        // Добавляем группу на сцену
        this.scene.add(this.group);
        
        console.log('Тестовая группа с примитивами создана');
        return this.group;
    }
    
    // Создание дополнительных примитивов с кирпичной текстурой
    createExtraObjects() {
        // Тор с кирпичной текстурой
        const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 64, 64);
        const torusMaterial = this.materialManager.createPBRMaterial('brick', {
            roughness: 0.5,
            metalness: 0.1
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(-2, 1.5, 2);
        torus.rotation.x = Math.PI / 2;
        torus.userData = { type: 'torus', materialType: 'brick' };
        this.scene.add(torus);
        this.objects.push(torus);
        
        // Конус с металлической текстурой
        const coneGeometry = new THREE.ConeGeometry(0.7, 1.2, 32);
        const coneMaterial = this.materialManager.createPBRMaterial('metal', {
            roughness: 0.2,
            metalness: 0.9
        });
        const cone = new THREE.Mesh(coneGeometry, coneMaterial);
        cone.position.set(2, 0.6, 2);
        cone.userData = { type: 'cone', materialType: 'metal' };
        this.scene.add(cone);
        this.objects.push(cone);
        
        return { torus, cone };
    }
    
    // Анимация объектов
    animate(time) {
        this.objects.forEach((obj, index) => {
            if (obj.userData.type === 'cube') {
                obj.rotation.x = time * 0.5;
                obj.rotation.y = time * 0.3;
            } else if (obj.userData.type === 'sphere') {
                obj.rotation.y = time * 0.5;
                obj.rotation.x = time * 0.2;
            } else if (obj.userData.type === 'cylinder') {
                obj.rotation.z = time * 0.4;
            } else if (obj.userData.type === 'torus') {
                obj.rotation.z = time * 0.6;
                obj.rotation.x = Math.PI / 2 + Math.sin(time) * 0.2;
            } else if (obj.userData.type === 'cone') {
                obj.rotation.y = time * 0.5;
            }
        });
    }
    
    // Получить все объекты для панели настроек
    getAllObjects() {
        return this.objects;
    }
    
    // Удаление группы
    dispose() {
        this.objects.forEach(obj => {
            if (obj.material) {
                obj.material.dispose();
            }
            if (obj.geometry) {
                obj.geometry.dispose();
            }
        });
        
        if (this.group) {
            this.scene.remove(this.group);
        }
    }
}
