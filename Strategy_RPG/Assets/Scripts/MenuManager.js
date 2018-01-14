#pragma strict

public var menu: GameObject;

public var northKeyBinding: GameObject;
public var southKeyBinding: GameObject;
public var eastKeyBinding: GameObject;
public var westKeyBinding: GameObject;

public var actionKeyBinding: GameObject;
public var menuKeyBinding: GameObject;
public var acceptKeyBinding: GameObject;
public var backKeyBinding: GameObject;

public var swapTeamForwardKeyBinding: GameObject;
public var swapTeamBackKeyBinding: GameObject;
public var swapTabForwardKeyBinding: GameObject;
public var swapTabBackKeyBinding: GameObject;

public var useSameAsTeamToggle: GameObject;

private var isActive: boolean;
private var useSameAsTeam: boolean;

function Start ()
{
	isActive = false;
	menu.SetActive(false);
}

function Update () {
	
}

public function setActive()
{
	isActive = !isActive;
	menu.SetActive(isActive);
}

public function setNorthKeyBinding()
{
	//var text = northKeyBinding.GetComponent(Text);
	//text.text = "W";
}