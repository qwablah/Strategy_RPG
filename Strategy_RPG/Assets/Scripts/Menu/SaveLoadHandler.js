#pragma strict

/***********************************
SaveLoadHandler
Handles saving and loading
Mark Murphy
Start	- 1/19/2018
Update	- 1/19/2018
***********************************/

private var dirName : String;
private var folderName : String;
private var fileName : String;
private var completeFilePath : String;

function Start ()
{
	dirName = "test_save_SRPG";
	folderName = "KeyBindings";
	fileName = "CustomKeyboardBinding.json";
}

function Update ()
{
	
}

function setFilePath()
{
	var systemPath = System.Environment.GetFolderPath (System.Environment.SpecialFolder.ApplicationData);
	var withFile = Path.Combine(systemPath, dirName);
	withFile = Path.Combine(withFile, folderName);
	Directory.CreateDirectory(withFile);
	completeFilePath = Path.Combine(withFile, fileName);
}

function save(obj)
{
	File.WriteAllText(completeFilePath, JsonUtility.ToJson(obj));
}

function load(obj)
{
	try
	{
		JsonUtility.FromJsonOverwrite(File.ReadAllText(completeFilePath), obj);
		print("load succeded!");
	}
	catch(e)
	{
		print("load failed! - " + e.Message);
	}
}