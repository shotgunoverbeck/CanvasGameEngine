//create canvas element
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(canvasWidth, canvasHeight);
document.getElementById('canvasContainer').appendChild(renderer.domElement);
renderer.domElement.id = 'gameRenderCanvas';
document.getElementById('gameRenderCanvas').requestPointerLock = document.getElementById('gameRenderCanvas').requestPointerLock || document.getElementById('gameRenderCanvas').mozRequestPointerLock || document.getElementById('gameRenderCanvas').webkitRequestPointerLock;
document.getElementById('gameRenderCanvas').onclick = document.getElementById('gameRenderCanvas').requestPointerLock;

//create scene and camera
var scene = new THREE.Scene();
var sceneCamera = new THREE.PerspectiveCamera(45, canvasWidth/canvasHeight, 0.1, 10000);
sceneCamera.rotation.order = 'YXZ';
scene.add(sceneCamera);

//camera movement
document.getElementById('gameRenderCanvas').onmousemove = function(event)
{
	var movementX = event.movementX||event.mozMovementX||event.webkitMovementX;
	var movementY = event.movementY||event.mozMovementY||event.webkitMovementY;
	player.cameraDegrees.y-=movementX*mouseAccelMultiplier;
	player.cameraDegrees.x-=movementY*mouseAccelMultiplier;
	if (player.cameraDegrees.x<-90)
	{
		player.cameraDegrees.x=-90;
	}
	else if (player.cameraDegrees.x>90)
	{
		player.cameraDegrees.x=90;
	}
	while (player.cameraDegrees.y < 0)
	{
		player.cameraDegrees.y = 360 + player.cameraDegrees.y;
	}
	player.cameraDegrees.x = player.cameraDegrees.x%360;
	player.cameraDegrees.y = player.cameraDegrees.y%360;
}

//key input/movement
var keysPressed = [];

document.body.onkeypress = function(event)
{
	switch(event.keyCode)
	{
		//move forward
		case keycodeInfo.w:
			playerWalk('w');
			break;
		//move backward
		case keycodeInfo.s:
			playerWalk('s');
			break;
		//move left
		case keycodeInfo.a:
			playerWalk('a');
			break;
		//move right
		case keycodeInfo.d:
			playerWalk('d');
			break;
	}
}

document.body.onkeydown = function(event)
{
	switch(event.keyCode)
	{
		default:
			keysPressed[event.keyCode] = true;
			break;
	}
}
document.body.onkeyup = function(event)
{
	switch(event.keyCode)
	{
		default:
			keysPressed[event.keyCode] = false;
			break;
	}
}

//rendering functions
function renderScene()
{
	//move sceneCamera relative to player
	sceneCamera.position.z = player.posZ;
	sceneCamera.position.x = player.posX;
	sceneCamera.position.y = player.posY;
	sceneCamera.rotation.y = player.cameraDegrees.y*(Math.PI/180);
	sceneCamera.rotation.x = player.cameraDegrees.x*(Math.PI/180);

	//move skybox with player
	

	renderer.render(scene, sceneCamera);
}

var renderLoop = setInterval(renderScene, 1000/refreshRate);