#pragma strict

/***********************************
MenuManager
Manages menu
Mark Murphy
Start	- 1/11/2018
Update	- 1/18/2018
***********************************/

public var menu: GameObject;

private var isActive: boolean;

function Start ()
{
	isActive = false;
	menu.SetActive(false);
}

function Update ()
{
	
}

public function setActive()
{
	isActive = !isActive;
	menu.SetActive(isActive);
}