#pragma strict

/***********************************
OverworldCharacter
Holds information for overworld characters
Mark Murphy
Start	- 1/11/2018
Update	- 1/24/2018
***********************************/

var dirFacing : int;
var isMoving : boolean;

//private var animator : Animator;

function Start ()
{
	isMoving = false;
	dirFacing = dirEnum.SOUTH;

	//animator = this.GetComponentInChildren(Animator);
}

function Update ()
{
	switch(dirFacing)
	{
	case dirEnum.NORTH:
		//animator.SetTrigger("WalkNorth");
		break;
	case dirEnum.SOUTH:
		//animator.SetTrigger("WalkSouth");
		break;
	case dirEnum.EAST:
		//animator.SetTrigger("WalkEast");
		break;
	case dirEnum.WEST:
		//animator.SetTrigger("WalkWest");
		break;
	}

	//animator.SetBool("Moving", true);
	//animator.SetBool("Moving", false);
}
