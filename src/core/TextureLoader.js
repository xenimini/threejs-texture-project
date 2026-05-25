import * as THREE from 'three';

export class TextureLoader {
    constructor() {
        this.loader = new THREE.TextureLoader();
        this.textureCache = new Map();
    }
    
    // Загрузка текстуры с кэшированием
    loadTexture(url, onProgress) {
        if (this.textureCache.has(url)) {
            return this.textureCache.get(url);
        }
        
        const texture = this.loader.load(url, 
            (tex) => {
                console.log(` Texture loaded: ${url}`);
                tex.wrapS = THREE.RepeatWrapping;
                tex.wrapT = THREE.RepeatWrapping;
                tex.repeat.set(1, 1);
            },
            onProgress,
            (err) => {
                console.error(` Error loading texture: ${url}`, err);
            }
        );
        
        this.textureCache.set(url, texture);
        return texture;
    }
    
    // Загрузка всех карт текстуры для PBR материала
    loadTextureSet(basePath, maps) {
        const textures = {};
        
        for (const [type, fileName] of Object.entries(maps)) {
            const url = `${basePath}/${fileName}`;
            textures[type] = this.loadTexture(url);
        }
        
        return textures;
    }
    
    // Загрузка конкретной карты текстуры
    loadTextureMap(textureType, mapType, mapFile) {
        const url = `/textures/${textureType}/${mapFile}`;
        return this.loadTexture(url);
    }
    
    // Очистка кэша
    disposeTexture(url) {
        if (this.textureCache.has(url)) {
            this.textureCache.get(url).dispose();
            this.textureCache.delete(url);
        }
    }
}