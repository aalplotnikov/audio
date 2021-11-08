package org.zenframework.z8.template.runtime;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Enumeration;

import org.zenframework.z8.server.db.generator.DBGenerator;
import org.zenframework.z8.server.logs.Trace;
import org.zenframework.z8.server.request.Loader;
import org.zenframework.z8.server.runtime.AbstractRuntime;

/**
 * 
 * Класс Z8TemplateRuntime реализует загрузку классов-слушателей, являющихся наследниками RuntimeListener
 * Имена классов-слушателей должны быть перечислены в файле META-INF/z8/runtime.listener
 * 
 * Сам класс Z8TemplateRuntime грузится сервером Z8 при старте за счёт того, что его имя (org.zenframework.z8.template.runtime.Z8TemplateRuntime)
 * указано в специальном ресурсе META-INF/z8.runtime
 * 
 * @author Oleg S. Lekshin
 *
 */
public class Z8TemplateRuntime extends AbstractRuntime {

	private static final String RUNTIME_LISTENERS = "META-INF/z8/runtime.listener";

	public Z8TemplateRuntime() {
		try {
			Enumeration<URL> resources = getClass().getClassLoader().getResources(RUNTIME_LISTENERS);
			while (resources.hasMoreElements()) {
				BufferedReader in = new BufferedReader(new InputStreamReader(resources.nextElement().openStream()));
				for (String line = in.readLine(); line != null; line = in.readLine()) {
					DBGenerator.addListener((DBGenerator.Listener) Loader.getInstance(line.trim()));
					Trace.logEvent("Runtime listener added: " + line);
				}
			}
		} catch (IOException e) {
			Trace.logError("Couldn't read resources '" + RUNTIME_LISTENERS + "'", e);
		}
	}

}
