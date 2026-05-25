import * as THREE from 'three';
import { Pane } from 'tweakpane';

export class PaneConstructor {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.pane = new Pane({ title: 'Настройки сцены' });
        this.objects = []; // Массив для хранения объектов с их настройками
        this.folders = {}; // Папки для разных типов настроек
    }
    
    // Создание основной папки
    createMainFolder(title) {
        if (!this.folders[title]) {
            this.folders[title] = this.pane.addFolder({ title: title, expanded: true });
        }
        return this.folders[title];
    }
    
    // Добавление объекта с настройками position, scale, rotation
    addObjectControls(obj, name, folderTitle = 'Объекты') {
        const folder = this.createMainFolder(folderTitle);
        const objFolder = folder.addFolder({ title: name, expanded: true });
        
        // Сохраняем объект с его настройками
        const controls = {
            name: name,
            object: obj,
            position: {
                x: obj.position.x,
                y: obj.position.y,
                z: obj.position.z
            },
            scale: {
                x: obj.scale.x,
                y: obj.scale.y,
                z: obj.scale.z
            },
            rotation: {
                x: obj.rotation.x,
                y: obj.rotation.y,
                z: obj.rotation.z
            }
        };
        
        // Добавление контролов для позиции
        const positionFolder = objFolder.addFolder({ title: 'Позиция', expanded: true });
        positionFolder.addBinding(controls.position, 'x', { min: -10, max: 10, step: 0.1 }).on('change', (ev) => {
            obj.position.x = ev.value;
        });
        positionFolder.addBinding(controls.position, 'y', { min: -10, max: 10, step: 0.1 }).on('change', (ev) => {
            obj.position.y = ev.value;
        });
        positionFolder.addBinding(controls.position, 'z', { min: -10, max: 10, step: 0.1 }).on('change', (ev) => {
            obj.position.z = ev.value;
        });
        
        // Добавление контролов для масштаба
        const scaleFolder = objFolder.addFolder({ title: 'Масштаб', expanded: true });
        scaleFolder.addBinding(controls.scale, 'x', { min: 0.1, max: 3, step: 0.01 }).on('change', (ev) => {
            obj.scale.x = ev.value;
        });
        scaleFolder.addBinding(controls.scale, 'y', { min: 0.1, max: 3, step: 0.01 }).on('change', (ev) => {
            obj.scale.y = ev.value;
        });
        scaleFolder.addBinding(controls.scale, 'z', { min: 0.1, max: 3, step: 0.01 }).on('change', (ev) => {
            obj.scale.z = ev.value;
        });
        
        // Добавление контролов для вращения
        const rotationFolder = objFolder.addFolder({ title: 'Вращение', expanded: true });
        rotationFolder.addBinding(controls.rotation, 'x', { min: -Math.PI, max: Math.PI, step: 0.01 }).on('change', (ev) => {
            obj.rotation.x = ev.value;
        });
        rotationFolder.addBinding(controls.rotation, 'y', { min: -Math.PI, max: Math.PI, step: 0.01 }).on('change', (ev) => {
            obj.rotation.y = ev.value;
        });
        rotationFolder.addBinding(controls.rotation, 'z', { min: -Math.PI, max: Math.PI, step: 0.01 }).on('change', (ev) => {
            obj.rotation.z = ev.value;
        });
        
        this.objects.push(controls);
        
        return controls;
    }
    
    // Добавление контролов для материала
    addMaterialControls(material, name, folderTitle = 'Материалы') {
        const folder = this.createMainFolder(folderTitle);
        const matFolder = folder.addFolder({ title: name, expanded: true });
        
        const materialParams = {
            roughness: material.roughness,
            metalness: material.metalness,
            color: '#' + material.color.getHexString()
        };
        
        matFolder.addBinding(materialParams, 'roughness', { min: 0, max: 1, step: 0.01 }).on('change', (ev) => {
            material.roughness = ev.value;
        });
        
        matFolder.addBinding(materialParams, 'metalness', { min: 0, max: 1, step: 0.01 }).on('change', (ev) => {
            material.metalness = ev.value;
        });
        
        matFolder.addBinding(materialParams, 'color').on('change', (ev) => {
            material.color.set(ev.value);
        });
        
        return materialParams;
    }
    
    // Добавление контролов для камеры
    addCameraControls() {
        const cameraFolder = this.createMainFolder('Камера');
        
        const cameraParams = {
            fov: this.camera.fov,
            near: this.camera.near,
            far: this.camera.far,
            positionX: this.camera.position.x,
            positionY: this.camera.position.y,
            positionZ: this.camera.position.z
        };
        
        cameraFolder.addBinding(cameraParams, 'fov', { min: 30, max: 120, step: 1 }).on('change', (ev) => {
            this.camera.fov = ev.value;
            this.camera.updateProjectionMatrix();
        });
        
        cameraFolder.addBinding(cameraParams, 'near', { min: 0.01, max: 10, step: 0.01 }).on('change', (ev) => {
            this.camera.near = ev.value;
            this.camera.updateProjectionMatrix();
        });
        
        cameraFolder.addBinding(cameraParams, 'far', { min: 100, max: 2000, step: 10 }).on('change', (ev) => {
            this.camera.far = ev.value;
            this.camera.updateProjectionMatrix();
        });
        
        const positionFolder = cameraFolder.addFolder({ title: 'Позиция', expanded: true });
        positionFolder.addBinding(cameraParams, 'positionX', { min: -20, max: 20, step: 0.1 }).on('change', (ev) => {
            this.camera.position.x = ev.value;
        });
        positionFolder.addBinding(cameraParams, 'positionY', { min: -20, max: 20, step: 0.1 }).on('change', (ev) => {
            this.camera.position.y = ev.value;
        });
        positionFolder.addBinding(cameraParams, 'positionZ', { min: -30, max: 30, step: 0.1 }).on('change', (ev) => {
            this.camera.position.z = ev.value;
        });
        
        return cameraParams;
    }
    
    // Добавление контролов для освещения
    addLightControls(light, name, folderTitle = 'Освещение') {
        const folder = this.createMainFolder(folderTitle);
        const lightFolder = folder.addFolder({ title: name, expanded: true });
        
        const lightParams = {
            intensity: light.intensity,
            distance: light.distance || 0,
            angle: light.angle || 0,
            penumbra: light.penumbra || 0,
            positionX: light.position?.x || 0,
            positionY: light.position?.y || 0,
            positionZ: light.position?.z || 0
        };
        
        lightFolder.addBinding(lightParams, 'intensity', { min: 0, max: 10, step: 0.1 }).on('change', (ev) => {
            light.intensity = ev.value;
        });
        
        if (lightParams.distance !== undefined) {
            lightFolder.addBinding(lightParams, 'distance', { min: 0, max: 50, step: 1 }).on('change', (ev) => {
                light.distance = ev.value;
            });
        }
        
        if (light.position) {
            const posFolder = lightFolder.addFolder({ title: 'Позиция', expanded: true });
            posFolder.addBinding(lightParams, 'positionX', { min: -20, max: 20, step: 0.1 }).on('change', (ev) => {
                light.position.x = ev.value;
            });
            posFolder.addBinding(lightParams, 'positionY', { min: -20, max: 20, step: 0.1 }).on('change', (ev) => {
                light.position.y = ev.value;
            });
            posFolder.addBinding(lightParams, 'positionZ', { min: -20, max: 20, step: 0.1 }).on('change', (ev) => {
                light.position.z = ev.value;
            });
        }
        
        return lightParams;
    }
    
    // Добавление контролов для фона
    addBackgroundControls() {
        const bgFolder = this.createMainFolder('Фон');
        
        const bgParams = {
            color: '#' + this.scene.background.getHexString()
        };
        
        bgFolder.addBinding(bgParams, 'color').on('change', (ev) => {
            this.scene.background = new THREE.Color(ev.value);
        });
        
        return bgParams;
    }
}
