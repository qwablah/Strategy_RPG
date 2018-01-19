#pragma strict

/***********************************
MouseInput
Manages mouse input
Mark Murphy
Start	- 1/11/2018
Update	- 1/11/2018
***********************************/

public var startLocation : GameObject;
public var moveToLocation : GameObject;
public var targetLocation : GameObject;
public var character : GameObject;
public var scriptHandler : GameObject;

private var cam : Camera;
private var movementScript : Movement;

function Start () 
{
	cam = Camera.main;
	movementScript = scriptHandler.GetComponent(Movement);
}

function Update ()
{
	// Left Click
	if(Input.GetMouseButtonDown(0))
	{
		targetLocation.transform.position = cam.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, cam.nearClipPlane));
		targetLocation.transform.position.z = 0;

		if(!movementScript.moving)
		{
			moveToLocation.transform.position = targetLocation.transform.position;
			startLocation.transform.position = character.transform.position;
		}
	}

	if(!movementScript.moving)
	{
		moveToLocation.transform.position = targetLocation.transform.position;
		startLocation.transform.position = character.transform.position;
	}
}
