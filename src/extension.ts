// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Spawn a terminal and run dmoj-submit in it
function callDmojSubmit(fileName: string) {
	let terminal = vscode.window.createTerminal("dmoj-submit");
	terminal.show();
	terminal.sendText(`dmoj-submit submit '${fileName}'`);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dmoj-submit-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('dmoj-submit-vscode.submit', () => {
		// The code you place here will be executed every time your command is executed

		// try to get current active document
		let activeDocument = vscode.window.activeTextEditor?.document;
		if (activeDocument === undefined) {
			return vscode.window.showErrorMessage("Could not get the current active document");
		}
		let fileName = activeDocument.fileName;
		// check some error cases before trying to submit
		if (activeDocument.isUntitled) {
			// untitled file (has not been saved yet)
			vscode.window.showErrorMessage("File cannot be submitted because it is untitled");
		} else if (activeDocument.isDirty) {
			// unsaved changes
			vscode.window.showWarningMessage("File has unsaved changes. Submit anyway?", "Yes", "No").then((res) => {
				if (res === "Yes") {
					callDmojSubmit(fileName);
				}
			});
		} else {
			callDmojSubmit(fileName);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
