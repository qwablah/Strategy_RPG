#pragma strict

/***********************************
OverworldCharacter
Holds information for overworld characters
Mark Murphy
Start	- 1/11/2018
Update	- 1/11/2018
***********************************/

enum dirEnum { NORTH, SOUTH, EAST, WEST };
var dirFacing;
var isMoving : boolean;

function Start ()
{
	isMoving = false;
	dirFacing = dirEnum.SOUTH;
}

function Update ()
{
	
}
