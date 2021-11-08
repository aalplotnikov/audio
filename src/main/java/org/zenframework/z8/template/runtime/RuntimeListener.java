package org.zenframework.z8.template.runtime;

import org.zenframework.z8.server.db.generator.DBGenerator;
import org.zenframework.z8.server.runtime.IObject;
import org.zenframework.z8.server.runtime.OBJECT;

/**
 * 
 * Класс RuntimeListener является реализацией BL-класса RuntimeListener
 * Эземпляры наследников RuntimeListener регистриуются в качестве слушателей в генераторе схемы БД
 * (класс org.zenframework.z8.server.db.generator.DBGenerator)
 *
 * Методам с префиксом "z8_" соответствуют методы BL-класса с таким же именем, но без префикса
 * 
 * @author Oleg S. Lekshin
 *
 */
public class RuntimeListener extends OBJECT implements DBGenerator.Listener{

	/**
	 * 
	 * Класс, описывающий метаданные BL-класса RuntimeListener
	 * 
	 * @author Oleg S. Lekshin
	 *
	 */
	public static class CLASS<T extends RuntimeListener> extends OBJECT.CLASS<T> {
		public CLASS(IObject container) {
			super(container);
			setJavaClass(RuntimeListener.class);
		}

		@Override
		public Object newObject(IObject container) {
			return new RuntimeListener(container);
		}
	}

	public RuntimeListener(IObject container) {
		super(container);
	}

	@Override
	public void beforeStart() {
		z8_beforeDBGenerate();
	}

	@Override
	public void afterFinish() {
		z8_afterDBGenerate();
	}

	public void z8_beforeDBGenerate() {}

	public void z8_afterDBGenerate() {}

}
