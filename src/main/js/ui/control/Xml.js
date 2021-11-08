/**
 * 
 */
Z8.define('org.zenframework.z8.template.controls.Xml', {
	// Имя наследуемого класса
	extend: 'Z8.form.field.TextArea',

	// Переопределение метода validate(), который вызывается при каждом изменении значения поля
	onInput: function() {
		var el = document.querySelector("#" + this.getId());
		var str = this.getValue();
		for(var i = 0; i < str.length; i++) {
			if (str[i] === '<')
				str[i] = '&lt;';
			if (str[i] === '>')
				str[i] = '&gt;';
		}
		this.setValue(str);
		hljs.highlightElement(el, {language: 'xml'});
		console.log(this.dom);
	}

});