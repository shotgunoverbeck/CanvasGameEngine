var player = 
{
	x: 103,
	z: 93,
	posY: 3,
	cameraDegrees: 
	{
		x: 0,
		y: 0
	},
	walkspeed: 275 //ms to walk 1 tile
};
player.posX = (player.x * tileSize);
player.posZ = (player.z * tileSize);

var canWalk = true;
var walkTimeoutSpeed = 20;
function doWalking(distX, distZ, curPerc, time, percIncr)
{
	for (var i=0; i<landscape[player.x+distX][player.z+distZ].length; i++)
	{
		if (getTileInfo(landscape[player.x+distX][player.z+distZ][i]).canwalk == 2) return;
	}
	canWalk = false;
	curPerc = curPerc || 0;
	time = time || Math.sqrt(Math.pow(Math.abs(distX), 2) + Math.pow(Math.abs(distZ), 2)) * player.walkspeed;
	percIncr =  percIncr || 100/((time / walkTimeoutSpeed)+1);

	player.posX += (distX * tileSize) * (percIncr/100);
	player.posZ += (distZ * tileSize) * (percIncr/100);
	curPerc += percIncr;
	if (curPerc >= 100)
	{
		//end walk cycle
		player.x = player.x + distX;
		player.z = player.z + distZ;
		player.posX = (player.x * tileSize);
		player.posZ = (player.z * tileSize);
		generateLocalTiles();
		canWalk = true;
		return;
	}
	else setTimeout(function(){doWalking(distX, distZ, curPerc, time, percIncr)}, walkTimeoutSpeed);
}

function playerWalk(dir)
{
	if (!canWalk)
	{
		return;
	}
	//determine relative direction
	var blockAngle = 65;
	var diagnAngle = (360 - (4 * blockAngle))/4;
	var pwalkAngle = player.cameraDegrees.y;
	switch (dir)
	{
		case 'w':
			pwalkAngle += 0;
			break;
		case 'a':
			pwalkAngle += 90;
			break;
		case 's':
			pwalkAngle += 180;
			break;
		case 'd':
			pwalkAngle += 270;
			break;
	}
	pwalkAngle = pwalkAngle % 360;
	if (360 - (0.5 * blockAngle) < pwalkAngle || pwalkAngle <= (0.5 * blockAngle) + (0 * diagnAngle))
	{
		//console.log('Walking N');
		setTimeout(function(){doWalking(0, -1)}, 0);
	}
	else if ((0.5 * blockAngle) + (0 * diagnAngle) < pwalkAngle && pwalkAngle <= (0.5 * blockAngle) + (1 * diagnAngle))
	{
		//console.log('Walking NW');
		setTimeout(function(){doWalking(-1, -1)}, 0);
	}
	else if ((0.5 * blockAngle) + (1 * diagnAngle) < pwalkAngle && pwalkAngle <= (1.5 * blockAngle) + (1 * diagnAngle))
	{
		//console.log('Walking W');
		setTimeout(function(){doWalking(-1, 0)}, 0);
	}
	else if ((1.5 * blockAngle) + (1 * diagnAngle) < pwalkAngle && pwalkAngle <= (1.5 * blockAngle) + (2 * diagnAngle))
	{
		//console.log('Walking SW');
		setTimeout(function(){doWalking(-1, 1)}, 0);
	}
	else if ((1.5 * blockAngle) + (2 * diagnAngle) < pwalkAngle && pwalkAngle <= (2.5 * blockAngle) + (2 * diagnAngle))
	{
		//console.log('Walking S');
		setTimeout(function(){doWalking(0, 1)}, 0);
	}
	else if ((2.5 * blockAngle) + (2 * diagnAngle) < pwalkAngle && pwalkAngle <= (2.5 * blockAngle) + (3 * diagnAngle))
	{
		//console.log('Walking SE');
		setTimeout(function(){doWalking(1, 1)}, 0);
	}
	else if ((2.5 * blockAngle) + (2 * diagnAngle) < pwalkAngle && pwalkAngle <= (3.5 * blockAngle) + (3 * diagnAngle))
	{
		//console.log('Walking E');
		setTimeout(function(){doWalking(1, 0)}, 0);
	}
	else if ((3.5 * blockAngle) + (3 * diagnAngle) < pwalkAngle && pwalkAngle <= (3.5 * blockAngle) + (4 * diagnAngle))
	{
		//console.log('Walking NE');
		setTimeout(function(){doWalking(1, -1)}, 0);
	}
}