var tileSize = 2;

function tileStandard(info)
{
	return {
		canwalk: info.canwalk || 1,
		mesh: info.mesh || new THREE.Mesh(
			new THREE.BoxGeometry(tileSize, 0, tileSize),
			new THREE.MeshLambertMaterial({color: 'rgb(0, 0, 0)'})
			),
		y: info.y || 0
	}
}

function getTileInfo(id)
{
	id = id.toString().toUpperCase();
	switch (id)
	{
		default:
		case '0':
		case 0:
			var info = {
				canwalk: 2
			}
			break;
		case '000000': //random colored flat tile
			var info = {
				mesh: new THREE.Mesh(
					new THREE.BoxGeometry(tileSize, 0, tileSize),
					new THREE.MeshLambertMaterial({color: 'rgb('+getRandomInt(0, 255).toString()+', '+getRandomInt(0, 255).toString()+', '+getRandomInt(0, 255).toString()+')'})
					),
				canwalk: 1
			}
			break;
		case '000001': //black flat tile
			var info = {
				canwalk: 2
			}
			break;
		case '000002': //tall random colored column
			var info = {
				mesh: new THREE.Mesh(
					new THREE.BoxGeometry(tileSize, getRandomInt(10,50), tileSize),
					new THREE.MeshLambertMaterial({color: 'rgb('+getRandomInt(0, 255).toString()+', '+getRandomInt(0, 255).toString()+', '+getRandomInt(0, 255).toString()+')'})
					),
				canwalk: 2
			}
			break;
		case '003300': //standard grass
			var info = {
				mesh: new THREE.Mesh(
					new THREE.BoxGeometry(tileSize, 2, tileSize),
					//new THREE.MeshLambertMaterial({color: '#003300'})
					new THREE.MeshLambertMaterial({map: textures.standardGrass})
					),
				y: -1
			}
			break;
		case '1F1F1F': //dark floor
			var info = {
				mesh: new THREE.Mesh(
					new THREE.BoxGeometry(tileSize, 1, tileSize),
					//new THREE.MeshLambertMaterial({color: '#1F1F1F'})
					new THREE.MeshLambertMaterial({map: textures.tiles})
					),
				y: -1
			}
			break;
		case 'C3E34F': //tree
			var info = {
				mesh: new THREE.Mesh(
					new THREE.BoxGeometry(tileSize, getRandomInt(85,150)/10, tileSize),
					//new THREE.MeshLambertMaterial({color: '#1D8F0E'})
					new THREE.MeshLambertMaterial({map: textures.bush})
					),
				canwalk: 2
			}
			break;
		case '616161': //gravel path
			var info = {
				mesh: new THREE.Mesh(
					new THREE.BoxGeometry(tileSize, 1.76, tileSize),
					//new THREE.MeshLambertMaterial({color: '#616161'})
					new THREE.MeshLambertMaterial({map: textures.gravel})
					),
				y: -1
			}
			break;
		case 'E34F8D': //house wall
			var info = {
				mesh: new THREE.Mesh(
					new THREE.BoxGeometry(tileSize, 10, tileSize),
					//new THREE.MeshLambertMaterial({color: '#3D3D3D'})
					new THREE.MeshLambertMaterial({map: textures.stoneWall})
					),
				canwalk: 2
			}
			break;
		case '131313': //roof
			var info = {
				y: 5,
				mesh: new THREE.Mesh(
					new THREE.BoxGeometry(tileSize, 1, tileSize),
					//new THREE.MeshLambertMaterial({color: '#3D3D3D'})
					new THREE.MeshLambertMaterial({map: textures.stoneWall})
					)
			}
			break;
		case '1528BD': //water
			var info = {
				mesh: new THREE.Mesh(
					new THREE.BoxGeometry(tileSize, 0.5, tileSize),
					//new THREE.MeshLambertMaterial({color: '#1528BD'})
					new THREE.MeshLambertMaterial({map: textures.water})
					),
				canwalk: 2,
				y: -1
			}
			break;
	}
	return tileStandard(info);
}