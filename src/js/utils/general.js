'use strict';

import mejs from '../core/mejs';

/**
 *
 * @param {String} input
 * @return {string}
 */
export function escapeHTML (input) {

	if (typeof input !== 'string') {
		throw new Error('Argument passed must be a string');
	}

	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;'
	};

	return input.replace(/[&<>"]/g, (c) => {
		return map[c];
	});
}

// taken from underscore
export function debounce (func, wait, immediate = false) {

	if (typeof func !== 'function') {
		throw new Error('First argument must be a function');
	}

	if (typeof wait !== 'number') {
		throw new Error('Second argument must be a numeric value');
	}

	let timeout;
	return () => {
		const context = this, args = arguments;
		const later = () => {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args);
		}
	};
}

/**
 * Determine if an object contains any elements
 *
 * @see http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
 * @param {Object} instance
 * @return {Boolean}
 */
export function isObjectEmpty (instance) {
	return (Object.getOwnPropertyNames(instance).length <= 0);
}

export function splitEvents (events, id) {
	const rwindow = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
	// add player ID as an event namespace so it's easier to unbind them all later
	const ret = {d: [], w: []};
	(events || '').split(' ').forEach((v) => {
		const eventName = v + '.' + id;

		if (eventName.startsWith('.')) {
			ret.d.push(eventName);
			ret.w.push(eventName);
		}
		else {
			ret[rwindow.test(v) ? 'w' : 'd'].push(eventName);
		}
	});


	ret.d = ret.d.join(' ');
	ret.w = ret.w.join(' ');
	return ret;
}

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
mejs.Utils.escapeHTML = escapeHTML;
mejs.Utils.debounce = debounce;
mejs.Utils.isObjectEmpty = isObjectEmpty;
mejs.Utils.splitEvents = splitEvents;
mejs.Utils.createEvent = createEvent;
mejs.Utils.isNodeAfter = isNodeAfter;