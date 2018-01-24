#pragma strict

/***********************************
OverworldCharacter
Holds information for overworld characters
Mark Murphy
Start	- 1/11/2018
Update	- 1/24/2018
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
	if(isMoving)
	{
		var hasChangedDir : boolean = (dirLastFacing != dirFacing);
		var animName : String;
		switch(dirFacing)
		{
		case dirEnum.NORTH:
			//animName = hasChangedDir ? "Idle_N" : "Walk_N";
			animName = "Walk_N";
			break;
		case dirEnum.SOUTH:
			//animName = hasChangedDir ? "Idle_S" : "Walk_S";
			animName = "Walk_S";
			break;
		case dirEnum.EAST:
			//animName = hasChangedDir ? "Idle_E" : "Walk_E";
			animName = "Walk_E";
			break;
		case dirEnum.WEST:
			//animName = hasChangedDir ? "Idle_W" : "Walk_W";
			animName = "Walk_W";
			break;
		default:
			animName = "Idle_S";
			break;
		}

		animator.Play(animName);
	}
}
