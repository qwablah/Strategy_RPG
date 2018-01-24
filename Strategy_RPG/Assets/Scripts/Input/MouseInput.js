#pragma strict

/***********************************
MouseInput
Manages mouse input
Mark Murphy
Start	- 1/11/2018
Update	- 1/11/2018
***********************************/

public var uv : UniversalVariables;
public var goh : GameplayObjectHolder;

public var scriptHandler : GameObject;

private var cam : Camera;

function Start () 
{
	cam = Camera.main;
}

function Update ()
{
	// Left Click
	if(Input.GetMouseButtonDown(0))
	{
		goh.targetLocation.transform.position = cam.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, cam.nearClipPlane));
		goh.targetLocation.transform.position.z = 10;
	}

	if(!uv.isMoving)
	{
		goh.moveToLocation.transform.position = goh.targetLocation.transform.position;
		goh.startLocation.transform.position = goh.character.transform.position;
	}
}
