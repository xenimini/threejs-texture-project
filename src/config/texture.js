// Конфигурация текстур для разных материалов
export const textureConfigs = {
    metal: {
        name: 'Металл',
        path: '/textures/metal',
        maps: {
            color: 'color.jpg',
            normal: 'normal.jpg',
            roughness: 'roughness.jpg',
            metalness: 'metalness.jpg',
            ao: 'ao.jpg'
        }
    },
    wood: {
        name: 'Дерево',
        path: '/textures/wood',
        maps: {
            color: 'color.jpg',
            normal: 'normal.jpg',
            roughness: 'roughness.jpg',
            metalness: 'metalness.jpg',
            ao: 'ao.jpg'
        }
    },
    stone: {
        name: 'Камень',
        path: '/textures/stone',
        maps: {
            color: 'color.jpg',
            normal: 'normal.jpg',
            roughness: 'roughness.jpg',
            metalness: 'metalness.jpg',
            ao: 'ao.jpg'
        }
    },
    brick: {
        name: 'Кирпич',
        path: '/textures/brick',
        maps: {
            color: 'color.jpg',
            normal: 'normal.jpg',
            roughness: 'roughness.jpg',
            metalness: 'metalness.jpg',
            ao: 'ao.jpg'
        }
    }
};

// Доступные типы текстур
export const textureTypes = ['metal', 'wood', 'stone', 'brick'];

// Получить конфиг по типу
export function getTextureConfig(type) {
    return textureConfigs[type] || textureConfigs.metal;
}