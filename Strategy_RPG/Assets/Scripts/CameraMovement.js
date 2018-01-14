#pragma strict

/***********************************
CameraMovement
Makes the camera follow main character
Mark Murphy
Start	- 1/12/2018
Update	- 1/12/2018
***********************************/

public var target: GameObject;
private var offset: Vector3;

function Start ()
{
	offset = new Vector3(0, 0, -10);
}

function Update ()
{
	if(target)
	{
		this.transform.position = offset + target.transform.position;
	}
}
