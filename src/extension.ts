// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fetchtest" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');

		// vscode.tasks.fetchTasks({ type: 'shell' }).then((value) => {
		// 	console.log('shell fulfilled', value);
		// }, (reason) => {
		// 	console.log('rejected', reason);
		// });

		vscode.tasks.fetchTasks({ type: 'npm' }).then((fetchedTasks) => {
			console.log('npm tasks found: ', fetchedTasks.length);
			for (const task of fetchedTasks) {
				console.log('\n\nlooking at ', task.name, '\n\n');
				vscode.tasks.executeTask(task);
			}
		}, (reason) => {
			console.log('fetch task was rejected', reason);
		});

		// const myTask = new vscode.Task(
		// 	{ type: 'shell' }, // task definition
		// 	vscode.TaskScope.Workspace,
		// 	'test',
		// 	'testExtension',
		// 	new vscode.ShellExecution('ls -alR', { cwd: '/home/elaihau/dev' })
		// );
		// vscode.tasks.executeTask(myTask);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
