Z8 Template - пример проекта на базе фреймворка [Z8](https://github.com/zenframework/z8/)

Описание фреймворка Z8, а также проекта Z8 Template приведено в [Wiki проекта Z8](https://github.com/zenframework/z8/wiki)

# Z8 Template Project Build How-to

Copy _gradle.properties.default_ to _gradle.properties_ then choose one of project building options.

You have 2 options to develope Z8 porject:
1. Using Z8 Project sources from Git - _z8.home_ must point to Z8 Project folder, Gradle build script assumes Z8 Project is in Eclipse workspace
1. Using Z8 Project binaries - _z8Home_ must not be set

Eclipse workspace configuration:
1. If you use Z8 Project sources, Z8 Project must be in the same workspace.
1. If you use Z8 Project binaries, subproject _org.zenframework.z8.lang_ must be in the same workspace. Other Z8 dependencies are resolved with Gradle Maven plugin.



Выполненные задания:

Задание №3
В классе Document.bl есть поле doc типа FileField, хранящее ссылку на файл. Предполагая, что в это поле загружается аудиофайл (любой формат по выбору соискателя),
реализовать JavaScript-расширение стандартного компонента Z8.form.field.Text (js/form/field/Text.js) таким образом, чтобы он встраивал в форму проигрыватель аудиофайлов, ссылки на которые хранятся в поле "doc".
(В Documents.bl использовать атрибут [ui], аналогично тому, как это сделано для поля "email".)

Задание которое выполняю сейчас: 

Задание №1
В языке BL, помимо StringField (см. org/zenframework/z8/template/view/Document.bl) с ограничением длины значения, предусмотрено поле TextField для хранения текста неограниченной длины.
В классе Document.bl добавить поле "xml" типа TextField для хранения XML-текста документа, добавить поле "xml" в массив controls в классе Documents.bl.
Реализовать JavaScript-расширение стандартного компонента Z8.form.field.TextArea (js/form/field/TextArea.js) таким образом, чтобы он подсвечивал синтаксис XML-текста документа в поле "xml".
(В Documents.bl использовать атрибут [ui], аналогично тому, как это сделано для поля "email".)
Допускается использование JavaScript-библиотек с открытым исходным кодом, реализующих подсветку синтаксиса, например, highlight.js, или аналогов.