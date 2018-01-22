#pragma strict

/***********************************
UniversalVariables
Holds variables used by multiple classes
Mark Murphy
Start	- 1/22/2018
Update	- 1/22/2018
***********************************/

public var totalKeys : int = 12;
public var spriteHeight : int = 1;

public var buttonPressed : int;
public var isMovePressed : boolean;
public var isActionPressed : boolean;
public var isMoving : boolean;

public var controls : BoundControls;

function Start ()
{
	isMovePressed = false;
	isActionPressed = false;
	isMoving = false;
}

function Update ()
{
	
}
