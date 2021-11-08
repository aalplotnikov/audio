Z8.define('org.zenframework.z8.template.controls.Audio', {
	extend: 'Z8.form.field.Text',

	isFile: true,
	editor: false,

	setValue: function(value, displayValue) {
		this.callParent(value, displayValue);
	},

	valueToRaw: function(value) {
		return Z8.isEmpty(value) ? '' : value[0].name;
	},

	htmlMarkup: function() {
		var triggers = this.triggers;
		triggers.push({ icon: 'fa-upload', tooltip: 'Загрузить файл', handler: this.onUploadFile, scope: this });
		triggers.push({ icon: 'fa-download', tooltip: 'Скачать файл', handler: this.onDownloadFile, scope: this });
		triggers.push({ icon: 'fa-play', tooltip: 'Прослушить файл', handler: this.onPlayFile, scope: this });

		return this.callParent();
	},

	getCls: function() {
		return Z8.form.field.Text.prototype.getCls.call(this).pushIf('file');
	},

	completeRender: function() {
		this.callParent();

		var fileInput = this.fileInput = DOM.append(this, { tag: 'input', type: 'file' });

		DOM.on(fileInput, 'change', this.onFileInputChange, this);

		DOM.on(this, 'dragEnter', this.onDragEnter, this);
		DOM.on(this, 'dragOver', this.onDragOver, this);
		DOM.on(this, 'drop', this.onDrop, this);

		DOM.on(window, 'dragEnter', this.onWindowDragEnter, this);
		DOM.on(window, 'dragOver', this.onWindowDragOver, this);
		DOM.on(window, 'dragLeave', this.onWindowDragLeave, this);
		DOM.on(window, 'drop', this.onWindowDrop, this);
	},

	onDestroy: function() {
		DOM.un(window, 'dragEnter', this.onWindowDragEnter, this);
		DOM.un(window, 'dragOver', this.onWindowDragOver, this);
		DOM.un(window, 'dragLeave', this.onWindowDragLeave, this);
		DOM.un(window, 'drop', this.onWindowDrop, this);

		DOM.un(this, 'dragEnter', this.onDragEnter, this);
		DOM.un(this, 'dragOver', this.onDragOver, this);
		DOM.un(this, 'drop', this.onDrop, this);

		DOM.un(this.fileInput, 'change', this.onFileInputChange, this);

		DOM.remove(this.fileInput);

		this.fileInput = null;

		this.callParent();
	},

	getUploadTrigger: function() {
		return this.getTrigger(0);
	},

	getDownloadTrigger: function() {
		return this.getTrigger(1);
	},
	
	getPlayTrigger: function() {
		return this.getTrigger(2);
	},


	onUploadFile: function(button) {
		this.fileInput.value = null;
		this.fileInput.click();
	},

	onDownloadFile: function(button) {
		var files = this.getValue();

		if(Z8.isEmpty(files))
			return;

		var callback = function(success) {
			this.getDownloadTrigger().setBusy(false);
		};

		this.getDownloadTrigger().setBusy(true);

		var file = files[0];
		DOM.download(file.path, file.id, null, { fn: callback, scope: this });
	},
	
	audio: '',
	
	onPlayFile: function() {
		var files = this.getValue();

		if(Z8.isEmpty(files))
			return;
		
		var filePath = files[0].path;
		var fileId = files[0].id;
		
		var src = encodeURI((window._DEBUG_ ? "/" : "") +
					filePath.replace(/\\/g, "/")) + "?&session=" +
					Application.session + (null != fileId ? "&id=" + fileId : "") +
					(null != null ? "&serverId=" + null : "") + (null ? "&noCache" : "");
					
		if(this.audio.src === undefined || this.audio.src.slice(-12) !== src.slice(-12))
			this.audio = new Audio(src);
		
		if (this.audio.paused) {
			this.audio.play();
			this.getPlayTrigger().setIcon('fa-pause');
		}
		else {
			this.audio.pause();
			this.getPlayTrigger().setIcon('fa-play');
		}
	},

	onFileInputChange: function() {
		this.upload(this.fileInput.files);
	},

	onDragEnter: function(event) {
		var dataTransfer = event.dataTransfer;
		if(dataTransfer == null || this.isReadOnly() || !this.isEnabled())
				return;

		dataTransfer.effectAllowed = dataTransfer.dropEffect = 'copy';
		event.stopEvent();
	},

	onDragOver: function(event) {
		if(event.dataTransfer != null && !this.isReadOnly() && this.isEnabled())
			event.stopEvent();
	},

	onDrop: function(event) {
		var dataTransfer = event.dataTransfer;
		if(dataTransfer == null || this.isReadOnly() || !this.isEnabled())
			return;

		dataTransfer.effectAllowed = dataTransfer.dropEffect = 'copy';
		event.stopEvent();

		this.upload(dataTransfer.files);
	},

	onWindowDragEnter: function(event) {
	},

	onWindowDragLeave: function(event) {
	},

	onWindowDragOver: function(event) {
		var dataTransfer = event.dataTransfer;
		if(!event.dataTransfer)
			return;

		dataTransfer.effectAllowed = dataTransfer.dropEffect = 'none';
		event.stopEvent();
	},

	onWindowDrop: function(event) {
		if(event.dataTransfer != null)
			event.stopEvent();
	},

	upload: function(files) {
		if(files.length == 0)
			return;

		this.getUploadTrigger().setBusy(true);

		var callback = function(record, files, success) {
			this.getUploadTrigger().setBusy(false);
		};

		var record = this.getRecord();
		record.attach(this.name, files, { fn: callback, scope: this });
	}
});