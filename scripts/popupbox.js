'use strict';

class PopUpBox {
	constructor() {
		this.getHtmlCode();
		this.ok = true;
	}

	// Methods

	confirm(msg_title, msg_content, btn_yes_label, btn_no_label, height_adjust, confirm_callback) {
		try {
			utils.ShowHtmlDialog(0, this.confirmHtmlCode, {
				data: [msg_title, msg_content, btn_yes_label, btn_no_label, height_adjust, confirm_callback]
			});
		} catch (e) {
			return true;
		}
	}

	getHtmlCode() {
		let cssPath = `${my_utils.packagePath}/assets/html/`;
		if (this.getWindowsVersion() === '6.1') {
			cssPath += 'styles7.css';
		} else {
			cssPath += 'styles10.css';
		}
		this.configHtmlCode = my_utils.getAsset('\\html\\config.html').replace(/href="styles10.css"/i, `href="${cssPath}"`);
		this.inputHtmlCode = my_utils.getAsset('\\html\\input.html').replace(/href="styles10.css"/i, `href="${cssPath}"`);
		this.confirmHtmlCode = my_utils.getAsset('\\html\\confirm.html').replace(/href="styles10.css"/i, `href="${cssPath}"`);
	}

	getWindowsVersion() {
		let version = '';

		try {
			version = (WshShell.RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\CurrentMajorVersionNumber')).toString();
			version += '.';
			version += (WshShell.RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\CurrentMinorVersionNumber')).toString();
			return version;
		} catch (e) {}
		try {
			version = WshShell.RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\CurrentVersion');
			return version;
		} catch (e) {}
		return '6.1';
	}

	config(ppt, cfg, dialogWindow, ok_callback, lang, recycler) {
		try {
			utils.ShowHtmlDialog(0, this.configHtmlCode, {
				data: [ppt, cfg, dialogWindow, window.IsTransparent, ok_callback, this.tf_callback, lang, recycler],
				resizable: true
			});
		} catch (e) {
			this.ok = false;
			$.trace('options dialog isn\'t available with current operating system. All settings in options are available elsewhere: 1) panel settings are in panel properties; 2) server settings that apply to all panels are in the cfg file - default settings should be fine for most users, but can be changed by careful editing in a text editor. Common settings are on the menu.');
		}
	}

	input(title, msg, ok_callback, input, def) {
		try {
			utils.ShowHtmlDialog(0, this.inputHtmlCode, {
				data: [title, msg, 'Cancel', ok_callback, input, def]
			});
		} catch (e) {
			return true;
		}
	}

	tf_callback(tf, tfAll, type, sFind, sReplace) {
		return cfg.preview(tf, tfAll, type, sFind, sReplace);
	}
}