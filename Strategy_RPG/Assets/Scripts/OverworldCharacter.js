#pragma strict

/***********************************
OverworldCharacter
Holds information for overworld characters
Mark Murphy
Start	- 1/11/2018
Update	- 1/25/2018
***********************************/

public var dirFacing : int;
public var isMoving : boolean;

private var dirLastFacing : int;
private var animator : Animator;

function Start ()
{
	isMoving = false;
	dirFacing = dirEnum.SOUTH;
	dirLastFacing = dirEnum.SOUTH;

	animator = this.GetComponentInChildren(Animator);

	animator.Play("Idle_S");
}

function Update ()
{
	var animName : String;

	switch(dirFacing)
	{
	case dirEnum.NORTH:
		animName = isMoving ? "Walk_N" : "Idle_N";
		break;
	case dirEnum.SOUTH:
		animName = isMoving ? "Walk_S" : "Idle_S";
		break;
	case dirEnum.EAST:
		animName = isMoving ? "Walk_E" : "Idle_E";
		break;
	case dirEnum.WEST:
		animName = isMoving ? "Walk_W" : "Idle_W";
		break;
	default:
		animName = "Idle_S";
		break;
	}

	animator.Play(animName);
}
