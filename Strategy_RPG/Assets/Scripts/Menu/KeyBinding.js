#pragma strict
import System.IO;
import System.Collections.Generic;
import UnityEngine.UI;

/***********************************
KeyBinding
Handles key bindings
Mark Murphy
Start	- 1/12/2018
Update	- 1/19/2018
***********************************/

enum controlEnum 
{
	NORTH, SOUTH, EAST, WEST,
	ACTION, MENU, ACCEPT, BACK,
	SWAP_TEAM_FORWARD, SWAP_TEAM_BACK,
	SWAP_TAB_FORWARD, SWAP_TAB_BACK
};


class KeyBind
{
	public var boundKey : controlEnum;
	public var keyboardBind : List.<KeyCode>;

	function KeyBind (key : controlEnum, binding : List.<KeyCode>)
	{
		this.boundKey = key;
		this.keyboardBind = binding;
	}
};

class BoundControls
{
	public var controlList : List.<KeyBind>;

	function start()
	{
		controlList = new List.<KeyBind>();
	}

	function sortControls()
	{
		controlList.Sort(function(x : KeyBind){return x.boundKey;});
	}
};

public var uv : UniversalVariables;
public var saveLoad : SaveLoadHandler;

public var bindButtons : List.<Button>;
public var clearButtons : List.<Button>;
public var useSameAsTeamToggle : Toggle;

private var controls : BoundControls;
private var bindingIndex : int;
private var addingBinding : boolean;
private var useSameAsTeam : boolean;

function Start ()
{
	addingBinding = false;

	saveLoad.setFilePath();
	setToDefault();
	saveLoad.load(controls);
	setAllBindingText();
	uv.controls = controls;

	bindButtons.ForEach(function(bind)
	{
		bind.onClick.AddListener(function()
		{
			bindingIndex = bindButtons.IndexOf(bind);
			addingBinding = true;
			print("Button Clicked: " + bind.name);
		});
	});

	clearButtons.ForEach(function(clear)
	{
		clear.onClick.AddListener(function()
		{
			clearKeyBinding(clearButtons.IndexOf(clear));
			print("Button Clicked: " + clear.name);
		});
	});
}

function Update ()
{

}

function checkToggle(key : KeyCode)
{
	if(useSameAsTeamToggle.isOn)
	{
		switch(bindingIndex)
		{
		case controlEnum.SWAP_TEAM_FORWARD:
			setKeyBinding(controlEnum.SWAP_TAB_FORWARD, key);
			break;
		case controlEnum.SWAP_TEAM_BACK:
			setKeyBinding(controlEnum.SWAP_TAB_BACK, key);
			break;
		case controlEnum.SWAP_TAB_FORWARD:
			setKeyBinding(controlEnum.SWAP_TEAM_FORWARD, key);
			break;
		case controlEnum.SWAP_TAB_BACK:
			setKeyBinding(controlEnum.SWAP_TEAM_BACK, key);
			break;
		}
	}
}

function OnGUI()
{
	var e : Event = Event.current;
	if(e && addingBinding)
	{
		if(e.isKey && Input.GetKeyDown(e.keyCode))
		{
			checkToggle(e.keyCode);
			setKeyBinding(bindingIndex, e.keyCode);
			addingBinding = false;
			print("Key Detected! - " + e.keyCode);
		}
		else if(e.isMouse && Input.GetMouseButtonDown(e.button))
		{
			print("Key Detected! - " + e.button);
		}
	}
}

function setKeyBinding(index : controlEnum, value : KeyCode)
{
	controls.controlList[index].keyboardBind.Add(value);
	setBindingText(index);
}

function clearKeyBinding(index : controlEnum)
{
	if(useSameAsTeamToggle.isOn)
	{
		switch(index)
		{
		case controlEnum.SWAP_TEAM_FORWARD:
			clearKeys(controlEnum.SWAP_TAB_FORWARD);
			break;
		case controlEnum.SWAP_TEAM_BACK:
			clearKeys(controlEnum.SWAP_TAB_BACK);
			break;
		case controlEnum.SWAP_TAB_FORWARD:
			clearKeys(controlEnum.SWAP_TEAM_FORWARD);
			break;
		case controlEnum.SWAP_TAB_BACK:
			clearKeys(controlEnum.SWAP_TEAM_BACK);
			break;
		}
	}
	clearKeys(index);
}

function clearKeys(index : controlEnum)
{
	controls.controlList[index].keyboardBind = new List.<KeyCode>();
	setBindingText(index);
}

function setAllBindingText()
{
	bindButtons.ForEach(function(bind)
	{
		setBindingText(bindButtons.IndexOf(bind));
	});
}

function setBindingText(index : int)
{
	var text : Text = bindButtons[index].GetComponentInChildren(Text);

	var keyString : String = "";
	controls.controlList[index].keyboardBind.ForEach(function(bind)
	{
		if(keyString != "") keyString += ", ";
		keyString += bind.ToString();
	});

	text.text = keyString;
}

function setToDefault()
{
	controls = new BoundControls();
	controls.controlList = new List.<KeyBind>();

	// Directions
	controls.controlList.Add(new KeyBind(controlEnum.NORTH, new List.<KeyCode>([KeyCode.W]) ));
	controls.controlList.Add(new KeyBind(controlEnum.SOUTH, new List.<KeyCode>([KeyCode.S]) ));
	controls.controlList.Add(new KeyBind(controlEnum.EAST,  new List.<KeyCode>([KeyCode.A]) ));
	controls.controlList.Add(new KeyBind(controlEnum.WEST,  new List.<KeyCode>([KeyCode.D]) ));

	// Actions
	controls.controlList.Add(new KeyBind(controlEnum.ACTION, new List.<KeyCode>([KeyCode.N]) ));
	controls.controlList.Add(new KeyBind(controlEnum.MENU, 	 new List.<KeyCode>([KeyCode.J]) ));
	controls.controlList.Add(new KeyBind(controlEnum.ACCEPT, new List.<KeyCode>([KeyCode.M]) ));
	controls.controlList.Add(new KeyBind(controlEnum.BACK, 	 new List.<KeyCode>([KeyCode.K]) ));

	// Swaping
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TEAM_FORWARD, new List.<KeyCode>([KeyCode.B]) ));
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TEAM_BACK, 	new List.<KeyCode>([KeyCode.H]) ));
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TAB_FORWARD, 	new List.<KeyCode>([KeyCode.B]) ));
	controls.controlList.Add(new KeyBind(controlEnum.SWAP_TAB_BACK, 	new List.<KeyCode>([KeyCode.H]) ));

	setAllBindingText();
}

function saveControls()
{
	saveLoad.save(controls);
	uv.controls = controls;
}