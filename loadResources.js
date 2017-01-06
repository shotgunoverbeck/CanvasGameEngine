var resourcesToLoad = 1;
var resourcesLoaded = 0;

THREE.ImageUtils.crossOrigin = '';
textures = {
	standardGrass: THREE.ImageUtils.loadTexture('resources/textures/grass.png'),
	stoneWall: THREE.ImageUtils.loadTexture('resources/textures/wall.jpg'),
	water: THREE.ImageUtils.loadTexture('resources/textures/water.png'),
	bush: THREE.ImageUtils.loadTexture('resources/textures/leaves.jpg'),
	tiles: THREE.ImageUtils.loadTexture('resources/textures/tiles.jpg'),
	gravel: THREE.ImageUtils.loadTexture('resources/textures/gravel.png')
}