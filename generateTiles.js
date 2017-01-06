function Tile(x, z, layer, id)
{
	basicTileInfo = getTileInfo(id);
	mesh = basicTileInfo.mesh;
	mesh.position.set(x*tileSize, basicTileInfo.y, z*tileSize);
	return {
		x: x,
		y: basicTileInfo.y,
		z: z,
		id: id,
		mesh: mesh
	}
}

//get local tiles relative to player
var localTileSet = [];

function generateLocalTiles()
{
	var startTime = new Date().getTime();
	//first, find tiles in the localtileset that can be deleted
	for (var i=0; i<localTileSet.length; i++)
	{
		if (Math.sqrt(Math.pow(Math.abs(player.x - localTileSet[i].x), 2) + Math.pow(Math.abs(player.z - localTileSet[i].z), 2)) > tileRenderDist)
		{
			scene.remove(localTileSet[i].mesh);
			localTileSet.splice(i, 1);
		}
	}
	//generate local tiles
	for (var x=player.x - tileRenderDist; x<player.x + tileRenderDist; x++)
	{
		if (x < 0  || x >= landscape.length) continue;
		for (var z=player.z - tileRenderDist; z<player.z + tileRenderDist; z++)
		{
			if (z < 0 || z >= landscape[0].length) continue;
			//check that tile is in range
			if (Math.sqrt(Math.pow(Math.abs(player.x - x), 2) + Math.pow(Math.abs(player.z - z), 2)) >= tileRenderDist) continue;
			//check if tile already exists
			var tileExists = false;
			for (var i=0; i<localTileSet.length; i++)
			{
				if (localTileSet[i].x == x && localTileSet[i].z == z) tileExists = true;
			}
			tilesToAdd = []
			if (!tileExists)
			{
				for (var y=0; y<landscape[x][z].length; y++)
				{
					tilesToAdd.push(Tile(x, z, y, landscape[x][z][y]));
				}
				for (var i=0; i<tilesToAdd.length; i++)
				{
					localTileSet.push(tilesToAdd[i]);
					scene.add(localTileSet[localTileSet.length-1].mesh);
				}
			}
		}
	}
	//console.log('New Tiles: ' + (new Date().getTime() - startTime).toString() + 'ms')
}
generateLocalTiles();