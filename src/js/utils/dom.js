'use strict';

import document from 'global/document';
import mejs from '../core/mejs';

/**
 *
 * @param {string} eventName
 * @param {*} target
 * @return {Event|Object}
 */
export function createEvent (eventName, target) {

	if (typeof eventName !== 'string') {
		throw new Error('Event name must be a string');
	}

	let event;

	if (document.createEvent) {
		event = document.createEvent('Event');
		event.initEvent(eventName, true, false);
	} else {
		event = {};
		event.type = eventName;
		event.target = target;
		event.canceleable = true;
		event.bubbable = false;
	}

	return event;
}

/**
 *
 * @param {Object} obj
 * @param {String} type
 * @param {Function} fn
 */
export function addEvent (obj, type, fn) {
	obj.addEventListener(type, fn, false);
}

/**
 *
 * @param {Object} obj
 * @param {String} type
 * @param {Function} fn
 */
export function removeEvent (obj, type, fn) {
	obj.removeEventListener(type, fn, false);
}

/**
 * Returns true if targetNode appears after sourceNode in the dom.
 * @param {HTMLElement} sourceNode - the source node for comparison
 * @param {HTMLElement} targetNode - the node to compare against sourceNode
 */
export function isNodeAfter (sourceNode, targetNode) {
	return !!(
		sourceNode &&
		targetNode &&
		sourceNode.compareDocumentPosition(targetNode) && Node.DOCUMENT_POSITION_PRECEDING
	);
}

mejs.Utils = mejs.Utils || {};
mejs.Utils.createEvent = createEvent;
mejs.Utils.removeEvent = removeEvent;
mejs.Utils.isNodeAfter = isNodeAfter;
