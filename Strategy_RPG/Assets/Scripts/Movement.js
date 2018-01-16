#pragma strict

/***********************************
Movement
Manages all sprite movement
Mark Murphy
Start	- 1/9/2018
Update	- 1/16/2018
***********************************/

public var moveObj : GameObject;
public var targetLocation : GameObject;
public var moving : boolean;

private var moveSpeed : float;
private var snapTolerance : float;
private var translation : Vector3;

function Start ()
{
	moving = false;
	moveSpeed = 0.1;
	snapTolerance = 0.1;
}

function Update ()
{
	if(moveObj.transform.position != targetLocation.transform.position)
	{
		translation = targetLocation.transform.position - moveObj.transform.position;
		if(!moving)
		{
			moving = true;
			MoveTo();
		}
	}
}

// Move in strait line from current location
function MoveTo()
{
	StartCoroutine(MoveObject(moveObj));
}

function MoveObject (moveObj : GameObject)
{
	var loop = true;
	while (loop)
	{
		var velocity = translation.normalized * moveSpeed;
		moveObj.transform.Translate(velocity);

		var moveObjPos = moveObj.transform.position;
		var targetLocPos = targetLocation.transform.position;

		// Exit loop when target location is reached
		if(Mathf.Abs(moveObjPos.x - targetLocPos.x) < snapTolerance
		&& Mathf.Abs(moveObjPos.y - targetLocPos.y) < snapTolerance
		&& Mathf.Abs(moveObjPos.z - targetLocPos.z) < snapTolerance)
		{
			moveObj.transform.position = targetLocation.transform.position;
			loop = false;
		}

        // Yield execution of this coroutine and return to the main loop until next frame
        yield;
    }
    moving = false;
}