/**
 * 
 */
Z8.define('org.zenframework.z8.template.controls.Xml', {
	// Имя наследуемого класса
	extend: 'Z8.form.field.TextArea',
	tag: 'div',
	id: 'editor',
	editor: '',
	
	initComponent: function() {
		Z8.form.field.TextArea.prototype.initComponent.call(this);
	},
	
	completeRender: function() {
		Z8.form.field.TextArea.prototype.completeRender.call(this);

    	this.editor = ace.edit("editor");
		this.editor.session.setMode("ace/mode/xml");
		
	},
	
	onFocusOut: function(event, target) {
		var dom = DOM.get(this);
		target = event.relatedTarget;

		if(dom == target || DOM.isParentOf(dom, target))
			return false;

		if(this.autoSave && !this.instantAutoSave) {
			if(this.isValid()) {
				this.suspendCheckChange--;
				this.setValue(this.editor.getValue());
				this.suspendCheckChange++;
			} else
				this.initValue(this.originalValue, this.originalDisplayValue);
		}

		DOM.removeCls(this, 'focus');
		this.fireEvent('focusOut', this);
		return true;
	},
	
	initValue: function(value, displayValue) {
		value = value !== undefined ?  value : this.value;

		this.initializing = true;
		this.suspendCheckChange++;
		this.setValue(value, displayValue);
		this.suspendCheckChange--;
		this.initializing = false;

		this.initialValue = this.originalValue = this.lastValue = this.getValue();
		this.originalDisplayValue = displayValue;
		if(this.editor.setValue !== undefined)
			this.editor.setValue(value);
	},
});



