import * as THREE from 'three';
import { TextureLoader } from './TextureLoader.js';
import { getTextureConfig } from '../config/texture.js';

export class MaterialManager {
    constructor() {
        this.textureLoader = new TextureLoader();
        this.materialCache = new Map();
    }
    
    // Создание PBR материала с текстурами
    createPBRMaterial(textureType, options = {}) {
        const cacheKey = `${textureType}_${JSON.stringify(options)}`;
        
        if (this.materialCache.has(cacheKey)) {
            return this.materialCache.get(cacheKey);
        }
        
        const config = getTextureConfig(textureType);
        
        if (!config) {
            return new THREE.MeshStandardMaterial({ color: 0x888888 });
        }
        
        // Загружаем текстуры
        const textures = this.textureLoader.loadTextureSet(config.path, config.maps);
        
        // Создаем материал
        const material = new THREE.MeshStandardMaterial({
            map: textures.color || null,
            normalMap: textures.normal || null,
            roughnessMap: textures.roughness || null,
            metalnessMap: textures.metalness || null,
            aoMap: textures.ao || null,
            roughness: options.roughness !== undefined ? options.roughness : 0.5,
            metalness: options.metalness !== undefined ? options.metalness : 0.5,
            color: options.color || 0xffffff,
            ...options
        });
        
        this.materialCache.set(cacheKey, material);
        return material;
    }
    
    // Создание простого цветного материала
    createSimpleMaterial(color, options = {}) {
        return new THREE.MeshStandardMaterial({
            color: color,
            roughness: options.roughness || 0.5,
            metalness: options.metalness || 0.5,
            ...options
        });
    }
    
    // Очистка кэша
    disposeAll() {
        for (const [key, material] of this.materialCache) {
            material.dispose();
        }
        this.materialCache.clear();
    }
}