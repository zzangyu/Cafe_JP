package com.cafe.control;

import com.cafe.action.Action;
import com.cafe.action.*;

public class ActionFactory {
private static ActionFactory instance;
	
	private ActionFactory() {}
	
	public static synchronized ActionFactory getInstance() {
		if(instance == null) {
			instance = new ActionFactory();
		}
		return instance;
	}
	
	public Action getAction(String cmd) {
		Action action = null;
		
		switch (cmd) {
		
		case "a":
			action = new AAction();
			break;

		default:
			action = new IndexAction();
			break;
		}
	
		return action;
	}
}