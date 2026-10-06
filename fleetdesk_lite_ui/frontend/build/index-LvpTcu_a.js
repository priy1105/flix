//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.iterator;
	function p(e) {
		return typeof e != "object" || !e ? null : (e = f && e[f] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var m = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, h = Object.assign, g = {};
	function _(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	_.prototype.isReactComponent = {}, _.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, _.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function v() {}
	v.prototype = _.prototype;
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	var b = y.prototype = new v();
	b.constructor = y, h(b, _.prototype), b.isPureReactComponent = !0;
	var x = Array.isArray, S = Object.prototype.hasOwnProperty, C = { current: null }, w = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function ee(e, n, r) {
		var i, a = {}, o = null, s = null;
		if (n != null) for (i in n.ref !== void 0 && (s = n.ref), n.key !== void 0 && (o = "" + n.key), n) S.call(n, i) && !w.hasOwnProperty(i) && (a[i] = n[i]);
		var c = arguments.length - 2;
		if (c === 1) a.children = r;
		else if (1 < c) {
			for (var l = Array(c), u = 0; u < c; u++) l[u] = arguments[u + 2];
			a.children = l;
		}
		if (e && e.defaultProps) for (i in c = e.defaultProps, c) a[i] === void 0 && (a[i] = c[i]);
		return {
			$$typeof: t,
			type: e,
			key: o,
			ref: s,
			props: a,
			_owner: C.current
		};
	}
	function te(e, n) {
		return {
			$$typeof: t,
			type: e.type,
			key: n,
			ref: e.ref,
			props: e.props,
			_owner: e._owner
		};
	}
	function ne(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function T(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var E = /\/+/g;
	function D(e, t) {
		return typeof e == "object" && e && e.key != null ? T("" + e.key) : t.toString(36);
	}
	function re(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n: c = !0;
			}
		}
		if (c) return c = e, o = o(c), e = a === "" ? "." + D(c, 0) : a, x(o) ? (i = "", e != null && (i = e.replace(E, "$&/") + "/"), re(o, r, i, "", function(e) {
			return e;
		})) : o != null && (ne(o) && (o = te(o, i + (!o.key || c && c.key === o.key ? "" : ("" + o.key).replace(E, "$&/") + "/") + e)), r.push(o)), 1;
		if (c = 0, a = a === "" ? "." : a + ":", x(e)) for (var l = 0; l < e.length; l++) {
			s = e[l];
			var u = a + D(s, l);
			c += re(s, r, i, u, o);
		}
		else if (u = p(e), typeof u == "function") for (e = u.call(e), l = 0; !(s = e.next()).done;) s = s.value, u = a + D(s, l++), c += re(s, r, i, u, o);
		else if (s === "object") throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		return c;
	}
	function O(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return re(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ie(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var k = { current: null }, A = { transition: null }, ae = {
		ReactCurrentDispatcher: k,
		ReactCurrentBatchConfig: A,
		ReactCurrentOwner: C
	};
	function oe() {
		throw Error("act(...) is not supported in production builds of React.");
	}
	e.Children = {
		map: O,
		forEach: function(e, t, n) {
			O(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return O(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return O(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!ne(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	}, e.Component = _, e.Fragment = r, e.Profiler = a, e.PureComponent = y, e.StrictMode = i, e.Suspense = l, e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ae, e.act = oe, e.cloneElement = function(e, n, r) {
		if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
		var i = h({}, e.props), a = e.key, o = e.ref, s = e._owner;
		if (n != null) {
			if (n.ref !== void 0 && (o = n.ref, s = C.current), n.key !== void 0 && (a = "" + n.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
			for (l in n) S.call(n, l) && !w.hasOwnProperty(l) && (i[l] = n[l] === void 0 && c !== void 0 ? c[l] : n[l]);
		}
		var l = arguments.length - 2;
		if (l === 1) i.children = r;
		else if (1 < l) {
			c = Array(l);
			for (var u = 0; u < l; u++) c[u] = arguments[u + 2];
			i.children = c;
		}
		return {
			$$typeof: t,
			type: e.type,
			key: a,
			ref: o,
			props: i,
			_owner: s
		};
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null
		}, e.Provider = {
			$$typeof: o,
			_context: e
		}, e.Consumer = e;
	}, e.createElement = ee, e.createFactory = function(e) {
		var t = ee.bind(null, e);
		return t.type = e, t;
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = ne, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ie
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = A.transition;
		A.transition = {};
		try {
			e();
		} finally {
			A.transition = t;
		}
	}, e.unstable_act = oe, e.useCallback = function(e, t) {
		return k.current.useCallback(e, t);
	}, e.useContext = function(e) {
		return k.current.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e) {
		return k.current.useDeferredValue(e);
	}, e.useEffect = function(e, t) {
		return k.current.useEffect(e, t);
	}, e.useId = function() {
		return k.current.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return k.current.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return k.current.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return k.current.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return k.current.useMemo(e, t);
	}, e.useReducer = function(e, t, n) {
		return k.current.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return k.current.useRef(e);
	}, e.useState = function(e) {
		return k.current.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return k.current.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return k.current.useTransition();
	}, e.version = "18.3.1";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = typeof setTimeout == "function" ? setTimeout : null, _ = typeof clearTimeout == "function" ? clearTimeout : null, v = typeof setImmediate < "u" ? setImmediate : null;
	typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function y(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function b(e) {
		if (h = !1, y(e), !m) {
			if (n(c) !== null) m = !0, O(x);
			else {
				var t = n(l);
				t !== null && ie(b, t.startTime - e);
			}
		}
	}
	function x(t, i) {
		m = !1, h && (h = !1, _(w), w = -1), p = !0;
		var a = f;
		try {
			for (y(i), d = n(c); d !== null && (!(d.expirationTime > i) || t && !ne());) {
				var o = d.callback;
				if (typeof o == "function") {
					d.callback = null, f = d.priorityLevel;
					var s = o(d.expirationTime <= i);
					i = e.unstable_now(), typeof s == "function" ? d.callback = s : d === n(c) && r(c), y(i);
				} else r(c);
				d = n(c);
			}
			if (d !== null) var u = !0;
			else {
				var g = n(l);
				g !== null && ie(b, g.startTime - i), u = !1;
			}
			return u;
		} finally {
			d = null, f = a, p = !1;
		}
	}
	var S = !1, C = null, w = -1, ee = 5, te = -1;
	function ne() {
		return !(e.unstable_now() - te < ee);
	}
	function T() {
		if (C !== null) {
			var t = e.unstable_now();
			te = t;
			var n = !0;
			try {
				n = C(!0, t);
			} finally {
				n ? E() : (S = !1, C = null);
			}
		} else S = !1;
	}
	var E;
	if (typeof v == "function") E = function() {
		v(T);
	};
	else if (typeof MessageChannel < "u") {
		var D = new MessageChannel(), re = D.port2;
		D.port1.onmessage = T, E = function() {
			re.postMessage(null);
		};
	} else E = function() {
		g(T, 0);
	};
	function O(e) {
		C = e, S || (S = !0, E());
	}
	function ie(t, n) {
		w = g(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_continueExecution = function() {
		m || p || (m = !0, O(x));
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e || (ee = 0 < e ? Math.floor(1e3 / e) : 5);
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_getFirstCallbackNode = function() {
		return n(c);
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (_(w), w = -1) : h = !0, ie(b, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, O(x))), r;
	}, e.unstable_shouldYield = ne, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u(), n = f();
	function r(e) {
		for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var i = /* @__PURE__ */ new Set(), a = {};
	function o(e, t) {
		s(e, t), s(e + "Capture", t);
	}
	function s(e, t) {
		for (a[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
	}
	var c = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, l = Object.prototype.hasOwnProperty, d = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, p = {}, m = {};
	function h(e) {
		return l.call(m, e) ? !0 : l.call(p, e) ? !1 : d.test(e) ? m[e] = !0 : (p[e] = !0, !1);
	}
	function g(e, t, n, r) {
		if (n !== null && n.type === 0) return !1;
		switch (typeof t) {
			case "function":
			case "symbol": return !0;
			case "boolean": return r ? !1 : n === null ? (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-") : !n.acceptsBooleans;
			default: return !1;
		}
	}
	function _(e, t, n, r) {
		if (t == null || g(e, t, n, r)) return !0;
		if (r) return !1;
		if (n !== null) switch (n.type) {
			case 3: return !t;
			case 4: return !1 === t;
			case 5: return isNaN(t);
			case 6: return isNaN(t) || 1 > t;
		}
		return !1;
	}
	function v(e, t, n, r, i, a, o) {
		this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = a, this.removeEmptyString = o;
	}
	var y = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
		y[e] = new v(e, 0, !1, e, null, !1, !1);
	}), [
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(function(e) {
		var t = e[0];
		y[t] = new v(t, 1, !1, e[1], null, !1, !1);
	}), [
		"contentEditable",
		"draggable",
		"spellCheck",
		"value"
	].forEach(function(e) {
		y[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1);
	}), [
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha"
	].forEach(function(e) {
		y[e] = new v(e, 2, !1, e, null, !1, !1);
	}), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
		y[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1);
	}), [
		"checked",
		"multiple",
		"muted",
		"selected"
	].forEach(function(e) {
		y[e] = new v(e, 3, !0, e, null, !1, !1);
	}), ["capture", "download"].forEach(function(e) {
		y[e] = new v(e, 4, !1, e, null, !1, !1);
	}), [
		"cols",
		"rows",
		"size",
		"span"
	].forEach(function(e) {
		y[e] = new v(e, 6, !1, e, null, !1, !1);
	}), ["rowSpan", "start"].forEach(function(e) {
		y[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1);
	});
	var b = /[\-:]([a-z])/g;
	function x(e) {
		return e[1].toUpperCase();
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, null, !1, !1);
	}), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
	}), [
		"xml:base",
		"xml:lang",
		"xml:space"
	].forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
	}), ["tabIndex", "crossOrigin"].forEach(function(e) {
		y[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1);
	}), y.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), [
		"src",
		"href",
		"action",
		"formAction"
	].forEach(function(e) {
		y[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0);
	});
	function S(e, t, n, r) {
		var i = y.hasOwnProperty(t) ? y[t] : null;
		(i === null ? r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N" : i.type !== 0) && (_(t, n, i, r) && (n = null), r || i === null ? h(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type !== 3 && "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
	}
	var C = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, w = Symbol.for("react.element"), ee = Symbol.for("react.portal"), te = Symbol.for("react.fragment"), ne = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), E = Symbol.for("react.provider"), D = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), ie = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), ae = Symbol.for("react.offscreen"), oe = Symbol.iterator;
	function se(e) {
		return typeof e != "object" || !e ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var j = Object.assign, ce;
	function le(e) {
		if (ce === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ce = t && t[1] || "";
		}
		return "\n" + ce + e;
	}
	var ue = !1;
	function de(e, t) {
		if (!e || ue) return "";
		ue = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			if (t) {
				if (t = function() {
					throw Error();
				}, Object.defineProperty(t.prototype, "props", { set: function() {
					throw Error();
				} }), typeof Reflect == "object" && Reflect.construct) {
					try {
						Reflect.construct(t, []);
					} catch (e) {
						var r = e;
					}
					Reflect.construct(e, [], t);
				} else {
					try {
						t.call();
					} catch (e) {
						r = e;
					}
					e.call(t.prototype);
				}
			} else {
				try {
					throw Error();
				} catch (e) {
					r = e;
				}
				e();
			}
		} catch (t) {
			if (t && r && typeof t.stack == "string") {
				for (var i = t.stack.split("\n"), a = r.stack.split("\n"), o = i.length - 1, s = a.length - 1; 1 <= o && 0 <= s && i[o] !== a[s];) s--;
				for (; 1 <= o && 0 <= s; o--, s--) if (i[o] !== a[s]) {
					if (o !== 1 || s !== 1) do
						if (o--, s--, 0 > s || i[o] !== a[s]) {
							var c = "\n" + i[o].replace(" at new ", " at ");
							return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
						}
					while (1 <= o && 0 <= s);
					break;
				}
			}
		} finally {
			ue = !1, Error.prepareStackTrace = n;
		}
		return (e = e ? e.displayName || e.name : "") ? le(e) : "";
	}
	function fe(e) {
		switch (e.tag) {
			case 5: return le(e.type);
			case 16: return le("Lazy");
			case 13: return le("Suspense");
			case 19: return le("SuspenseList");
			case 0:
			case 2:
			case 15: return e = de(e.type, !1), e;
			case 11: return e = de(e.type.render, !1), e;
			case 1: return e = de(e.type, !0), e;
			default: return "";
		}
	}
	function pe(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case te: return "Fragment";
			case ee: return "Portal";
			case T: return "Profiler";
			case ne: return "StrictMode";
			case O: return "Suspense";
			case ie: return "SuspenseList";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case D: return (e.displayName || "Context") + ".Consumer";
			case E: return (e._context.displayName || "Context") + ".Provider";
			case re:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case k: return t = e.displayName || null, t === null ? pe(e.type) || "Memo" : t;
			case A:
				t = e._payload, e = e._init;
				try {
					return pe(e(t));
				} catch {}
		}
		return null;
	}
	function me(e) {
		var t = e.type;
		switch (e.tag) {
			case 24: return "Cache";
			case 9: return (t.displayName || "Context") + ".Consumer";
			case 10: return (t._context.displayName || "Context") + ".Provider";
			case 18: return "DehydratedFragment";
			case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
			case 7: return "Fragment";
			case 5: return t;
			case 4: return "Portal";
			case 3: return "Root";
			case 6: return "Text";
			case 16: return pe(t);
			case 8: return t === ne ? "StrictMode" : "Mode";
			case 22: return "Offscreen";
			case 12: return "Profiler";
			case 21: return "Scope";
			case 13: return "Suspense";
			case 19: return "SuspenseList";
			case 25: return "TracingMarker";
			case 1:
			case 0:
			case 17:
			case 2:
			case 14:
			case 15:
				if (typeof t == "function") return t.displayName || t.name || null;
				if (typeof t == "string") return t;
		}
		return null;
	}
	function M(e) {
		switch (typeof e) {
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function he(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function ge(e) {
		var t = he(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
		if (!e.hasOwnProperty(t) && n !== void 0 && typeof n.get == "function" && typeof n.set == "function") {
			var i = n.get, a = n.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					r = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: n.enumerable }), {
				getValue: function() {
					return r;
				},
				setValue: function(e) {
					r = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function _e(e) {
		e._valueTracker ||= ge(e);
	}
	function ve(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = he(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function ye(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function be(e, t) {
		var n = t.checked;
		return j({}, t, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: n ?? e._wrapperState.initialChecked
		});
	}
	function xe(e, t) {
		var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked == null ? t.defaultChecked : t.checked;
		n = M(t.value == null ? n : t.value), e._wrapperState = {
			initialChecked: r,
			initialValue: n,
			controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
		};
	}
	function Se(e, t) {
		t = t.checked, t != null && S(e, "checked", t, !1);
	}
	function Ce(e, t) {
		Se(e, t);
		var n = M(t.value), r = t.type;
		if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
		else if (r === "submit" || r === "reset") {
			e.removeAttribute("value");
			return;
		}
		t.hasOwnProperty("value") ? Te(e, t.type, n) : t.hasOwnProperty("defaultValue") && Te(e, t.type, M(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
	}
	function we(e, t, n) {
		if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
			var r = t.type;
			if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
			t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
		}
		n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
	}
	function Te(e, t, n) {
		(t !== "number" || ye(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
	}
	var Ee = Array.isArray;
	function N(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + M(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function De(e, t) {
		if (t.dangerouslySetInnerHTML != null) throw Error(r(91));
		return j({}, t, {
			value: void 0,
			defaultValue: void 0,
			children: "" + e._wrapperState.initialValue
		});
	}
	function Oe(e, t) {
		var n = t.value;
		if (n == null) {
			if (n = t.children, t = t.defaultValue, n != null) {
				if (t != null) throw Error(r(92));
				if (Ee(n)) {
					if (1 < n.length) throw Error(r(93));
					n = n[0];
				}
				t = n;
			}
			t ??= "", n = t;
		}
		e._wrapperState = { initialValue: M(n) };
	}
	function ke(e, t) {
		var n = M(t.value), r = M(t.defaultValue);
		n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
	}
	function Ae(e) {
		var t = e.textContent;
		t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
	}
	function je(e) {
		switch (e) {
			case "svg": return "http://www.w3.org/2000/svg";
			case "math": return "http://www.w3.org/1998/Math/MathML";
			default: return "http://www.w3.org/1999/xhtml";
		}
	}
	function Me(e, t) {
		return e == null || e === "http://www.w3.org/1999/xhtml" ? je(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
	}
	var Ne, Pe = function(e) {
		return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
			MSApp.execUnsafeLocalFunction(function() {
				return e(t, n, r, i);
			});
		} : e;
	}(function(e, t) {
		if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
		else {
			for (Ne ||= document.createElement("div"), Ne.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ne.firstChild; e.firstChild;) e.removeChild(e.firstChild);
			for (; t.firstChild;) e.appendChild(t.firstChild);
		}
	});
	function Fe(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Ie = {
		animationIterationCount: !0,
		aspectRatio: !0,
		borderImageOutset: !0,
		borderImageSlice: !0,
		borderImageWidth: !0,
		boxFlex: !0,
		boxFlexGroup: !0,
		boxOrdinalGroup: !0,
		columnCount: !0,
		columns: !0,
		flex: !0,
		flexGrow: !0,
		flexPositive: !0,
		flexShrink: !0,
		flexNegative: !0,
		flexOrder: !0,
		gridArea: !0,
		gridRow: !0,
		gridRowEnd: !0,
		gridRowSpan: !0,
		gridRowStart: !0,
		gridColumn: !0,
		gridColumnEnd: !0,
		gridColumnSpan: !0,
		gridColumnStart: !0,
		fontWeight: !0,
		lineClamp: !0,
		lineHeight: !0,
		opacity: !0,
		order: !0,
		orphans: !0,
		tabSize: !0,
		widows: !0,
		zIndex: !0,
		zoom: !0,
		fillOpacity: !0,
		floodOpacity: !0,
		stopOpacity: !0,
		strokeDasharray: !0,
		strokeDashoffset: !0,
		strokeMiterlimit: !0,
		strokeOpacity: !0,
		strokeWidth: !0
	}, Le = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(Ie).forEach(function(e) {
		Le.forEach(function(t) {
			t = t + e.charAt(0).toUpperCase() + e.substring(1), Ie[t] = Ie[e];
		});
	});
	function Re(e, t, n) {
		return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ie.hasOwnProperty(e) && Ie[e] ? ("" + t).trim() : t + "px";
	}
	function ze(e, t) {
		for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
			var r = n.indexOf("--") === 0, i = Re(n, t[n], r);
			n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
		}
	}
	var P = j({ menuitem: !0 }, {
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});
	function Be(e, t) {
		if (t) {
			if (P[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(r(137, e));
			if (t.dangerouslySetInnerHTML != null) {
				if (t.children != null) throw Error(r(60));
				if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(r(61));
			}
			if (t.style != null && typeof t.style != "object") throw Error(r(62));
		}
	}
	function Ve(e, t) {
		if (e.indexOf("-") === -1) return typeof t.is == "string";
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var He = null;
	function Ue(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var We = null, Ge = null, Ke = null;
	function qe(e) {
		if (e = Gi(e)) {
			if (typeof We != "function") throw Error(r(280));
			var t = e.stateNode;
			t && (t = qi(t), We(e.stateNode, e.type, t));
		}
	}
	function Je(e) {
		Ge ? Ke ? Ke.push(e) : Ke = [e] : Ge = e;
	}
	function Ye() {
		if (Ge) {
			var e = Ge, t = Ke;
			if (Ke = Ge = null, qe(e), t) for (e = 0; e < t.length; e++) qe(t[e]);
		}
	}
	function Xe(e, t) {
		return e(t);
	}
	function Ze() {}
	var Qe = !1;
	function $e(e, t, n) {
		if (Qe) return e(t, n);
		Qe = !0;
		try {
			return Xe(e, t, n);
		} finally {
			Qe = !1, (Ge !== null || Ke !== null) && (Ze(), Ye());
		}
	}
	function et(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var i = qi(n);
		if (i === null) return null;
		n = i[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(i = !i.disabled) || (e = e.type, i = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !i;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(r(231, t, typeof n));
		return n;
	}
	var tt = !1;
	if (c) try {
		var nt = {};
		Object.defineProperty(nt, "passive", { get: function() {
			tt = !0;
		} }), window.addEventListener("test", nt, nt), window.removeEventListener("test", nt, nt);
	} catch {
		tt = !1;
	}
	function rt(e, t, n, r, i, a, o, s, c) {
		var l = Array.prototype.slice.call(arguments, 3);
		try {
			t.apply(n, l);
		} catch (e) {
			this.onError(e);
		}
	}
	var it = !1, at = null, ot = !1, st = null, ct = { onError: function(e) {
		it = !0, at = e;
	} };
	function lt(e, t, n, r, i, a, o, s, c) {
		it = !1, at = null, rt.apply(ct, arguments);
	}
	function ut(e, t, n, i, a, o, s, c, l) {
		if (lt.apply(this, arguments), it) {
			if (it) {
				var u = at;
				it = !1, at = null;
			} else throw Error(r(198));
			ot || (ot = !0, st = u);
		}
	}
	function dt(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function ft(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function pt(e) {
		if (dt(e) !== e) throw Error(r(188));
	}
	function mt(e) {
		var t = e.alternate;
		if (!t) {
			if (t = dt(e), t === null) throw Error(r(188));
			return t === e ? e : null;
		}
		for (var n = e, i = t;;) {
			var a = n.return;
			if (a === null) break;
			var o = a.alternate;
			if (o === null) {
				if (i = a.return, i !== null) {
					n = i;
					continue;
				}
				break;
			}
			if (a.child === o.child) {
				for (o = a.child; o;) {
					if (o === n) return pt(a), e;
					if (o === i) return pt(a), t;
					o = o.sibling;
				}
				throw Error(r(188));
			}
			if (n.return !== i.return) n = a, i = o;
			else {
				for (var s = !1, c = a.child; c;) {
					if (c === n) {
						s = !0, n = a, i = o;
						break;
					}
					if (c === i) {
						s = !0, i = a, n = o;
						break;
					}
					c = c.sibling;
				}
				if (!s) {
					for (c = o.child; c;) {
						if (c === n) {
							s = !0, n = o, i = a;
							break;
						}
						if (c === i) {
							s = !0, i = o, n = a;
							break;
						}
						c = c.sibling;
					}
					if (!s) throw Error(r(189));
				}
			}
			if (n.alternate !== i) throw Error(r(190));
		}
		if (n.tag !== 3) throw Error(r(188));
		return n.stateNode.current === n ? e : t;
	}
	function ht(e) {
		return e = mt(e), e === null ? null : gt(e);
	}
	function gt(e) {
		if (e.tag === 5 || e.tag === 6) return e;
		for (e = e.child; e !== null;) {
			var t = gt(e);
			if (t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var _t = n.unstable_scheduleCallback, vt = n.unstable_cancelCallback, yt = n.unstable_shouldYield, bt = n.unstable_requestPaint, F = n.unstable_now, xt = n.unstable_getCurrentPriorityLevel, St = n.unstable_ImmediatePriority, Ct = n.unstable_UserBlockingPriority, wt = n.unstable_NormalPriority, Tt = n.unstable_LowPriority, Et = n.unstable_IdlePriority, Dt = null, Ot = null;
	function kt(e) {
		if (Ot && typeof Ot.onCommitFiberRoot == "function") try {
			Ot.onCommitFiberRoot(Dt, e, void 0, (e.current.flags & 128) == 128);
		} catch {}
	}
	var At = Math.clz32 ? Math.clz32 : Nt, jt = Math.log, Mt = Math.LN2;
	function Nt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (jt(e) / Mt | 0) | 0;
	}
	var Pt = 64, Ft = 4194304;
	function It(e) {
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 4194240;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return e & 130023424;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 1073741824;
			default: return e;
		}
	}
	function Lt(e, t) {
		var n = e.pendingLanes;
		if (n === 0) return 0;
		var r = 0, i = e.suspendedLanes, a = e.pingedLanes, o = n & 268435455;
		if (o !== 0) {
			var s = o & ~i;
			s === 0 ? (a &= o, a !== 0 && (r = It(a))) : r = It(s);
		} else o = n & ~i, o === 0 ? a !== 0 && (r = It(a)) : r = It(o);
		if (r === 0) return 0;
		if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, a = t & -t, i >= a || i === 16 && a & 4194240)) return t;
		if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t;) n = 31 - At(t), i = 1 << n, r |= e[n], t &= ~i;
		return r;
	}
	function Rt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4: return t + 250;
			case 8:
			case 16:
			case 32:
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return -1;
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function zt(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes; 0 < a;) {
			var o = 31 - At(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Rt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
	}
	function Bt(e) {
		return e = e.pendingLanes & -1073741825, e === 0 ? e & 1073741824 ? 1073741824 : 0 : e;
	}
	function Vt() {
		var e = Pt;
		return Pt <<= 1, !(Pt & 4194240) && (Pt = 64), e;
	}
	function Ht(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Ut(e, t, n) {
		e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - At(t), e[t] = n;
	}
	function Wt(e, t) {
		var n = e.pendingLanes & ~t;
		e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
		var r = e.eventTimes;
		for (e = e.expirationTimes; 0 < n;) {
			var i = 31 - At(n), a = 1 << i;
			t[i] = 0, r[i] = -1, e[i] = -1, n &= ~a;
		}
	}
	function Gt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - At(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	var I = 0;
	function Kt(e) {
		return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
	}
	var qt, Jt, Yt, Xt, Zt, Qt = !1, $t = [], en = null, tn = null, nn = null, rn = /* @__PURE__ */ new Map(), an = /* @__PURE__ */ new Map(), on = [], sn = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function cn(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				en = null;
				break;
			case "dragenter":
			case "dragleave":
				tn = null;
				break;
			case "mouseover":
			case "mouseout":
				nn = null;
				break;
			case "pointerover":
			case "pointerout":
				rn.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": an.delete(t.pointerId);
		}
	}
	function ln(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Gi(t), t !== null && Jt(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function un(e, t, n, r, i) {
		switch (t) {
			case "focusin": return en = ln(en, e, t, n, r, i), !0;
			case "dragenter": return tn = ln(tn, e, t, n, r, i), !0;
			case "mouseover": return nn = ln(nn, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return rn.set(a, ln(rn.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, an.set(a, ln(an.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function dn(e) {
		var t = Wi(e.target);
		if (t !== null) {
			var n = dt(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = ft(n), t !== null) {
						e.blockedOn = t, Zt(e.priority, function() {
							Yt(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function fn(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = Cn(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				He = r, n.target.dispatchEvent(r), He = null;
			} else return t = Gi(n), t !== null && Jt(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function pn(e, t, n) {
		fn(e) && n.delete(t);
	}
	function mn() {
		Qt = !1, en !== null && fn(en) && (en = null), tn !== null && fn(tn) && (tn = null), nn !== null && fn(nn) && (nn = null), rn.forEach(pn), an.forEach(pn);
	}
	function hn(e, t) {
		e.blockedOn === t && (e.blockedOn = null, Qt || (Qt = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, mn)));
	}
	function gn(e) {
		function t(t) {
			return hn(t, e);
		}
		if (0 < $t.length) {
			hn($t[0], e);
			for (var n = 1; n < $t.length; n++) {
				var r = $t[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
		}
		for (en !== null && hn(en, e), tn !== null && hn(tn, e), nn !== null && hn(nn, e), rn.forEach(t), an.forEach(t), n = 0; n < on.length; n++) r = on[n], r.blockedOn === e && (r.blockedOn = null);
		for (; 0 < on.length && (n = on[0], n.blockedOn === null);) dn(n), n.blockedOn === null && on.shift();
	}
	var _n = C.ReactCurrentBatchConfig, vn = !0;
	function yn(e, t, n, r) {
		var i = I, a = _n.transition;
		_n.transition = null;
		try {
			I = 1, xn(e, t, n, r);
		} finally {
			I = i, _n.transition = a;
		}
	}
	function bn(e, t, n, r) {
		var i = I, a = _n.transition;
		_n.transition = null;
		try {
			I = 4, xn(e, t, n, r);
		} finally {
			I = i, _n.transition = a;
		}
	}
	function xn(e, t, n, r) {
		if (vn) {
			var i = Cn(e, t, n, r);
			if (i === null) gi(e, t, r, Sn, n), cn(e, r);
			else if (un(i, e, t, n, r)) r.stopPropagation();
			else if (cn(e, r), t & 4 && -1 < sn.indexOf(e)) {
				for (; i !== null;) {
					var a = Gi(i);
					if (a !== null && qt(a), a = Cn(e, t, n, r), a === null && gi(e, t, r, Sn, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else gi(e, t, r, null, n);
		}
	}
	var Sn = null;
	function Cn(e, t, n, r) {
		if (Sn = null, e = Ue(r), e = Wi(e), e !== null) {
			if (t = dt(e), t === null) e = null;
			else if (n = t.tag, n === 13) {
				if (e = ft(t), e !== null) return e;
				e = null;
			} else if (n === 3) {
				if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
				e = null;
			} else t !== e && (e = null);
		}
		return Sn = e, null;
	}
	function wn(e) {
		switch (e) {
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 1;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "toggle":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 4;
			case "message": switch (xt()) {
				case St: return 1;
				case Ct: return 4;
				case wt:
				case Tt: return 16;
				case Et: return 536870912;
				default: return 16;
			}
			default: return 16;
		}
	}
	var Tn = null, En = null, Dn = null;
	function On() {
		if (Dn) return Dn;
		var e, t = En, n = t.length, r, i = "value" in Tn ? Tn.value : Tn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Dn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function kn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function An() {
		return !0;
	}
	function jn() {
		return !1;
	}
	function Mn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? An : jn, this.isPropagationStopped = jn, this;
		}
		return j(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = An);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = An);
			},
			persist: function() {},
			isPersistent: An
		}), t;
	}
	var Nn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Pn = Mn(Nn), Fn = j({}, Nn, {
		view: 0,
		detail: 0
	}), In = Mn(Fn), Ln, Rn, zn, Bn = j({}, Fn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Zn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== zn && (zn && e.type === "mousemove" ? (Ln = e.screenX - zn.screenX, Rn = e.screenY - zn.screenY) : Rn = Ln = 0, zn = e), Ln);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Rn;
		}
	}), Vn = Mn(Bn), Hn = Mn(j({}, Bn, { dataTransfer: 0 })), Un = Mn(j({}, Fn, { relatedTarget: 0 })), Wn = Mn(j({}, Nn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Gn = Mn(j({}, Nn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Kn = Mn(j({}, Nn, { data: 0 })), qn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Jn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Yn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Xn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Yn[e]) ? !!t[e] : !1;
	}
	function Zn() {
		return Xn;
	}
	var Qn = Mn(j({}, Fn, {
		key: function(e) {
			if (e.key) {
				var t = qn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = kn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Jn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Zn,
		charCode: function(e) {
			return e.type === "keypress" ? kn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? kn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), $n = Mn(j({}, Bn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), er = Mn(j({}, Fn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Zn
	})), tr = Mn(j({}, Nn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), nr = Mn(j({}, Bn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), rr = [
		9,
		13,
		27,
		32
	], ir = c && "CompositionEvent" in window, ar = null;
	c && "documentMode" in document && (ar = document.documentMode);
	var or = c && "TextEvent" in window && !ar, sr = c && (!ir || ar && 8 < ar && 11 >= ar), cr = " ", lr = !1;
	function ur(e, t) {
		switch (e) {
			case "keyup": return rr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function dr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var fr = !1;
	function pr(e, t) {
		switch (e) {
			case "compositionend": return dr(t);
			case "keypress": return t.which === 32 ? (lr = !0, cr) : null;
			case "textInput": return e = t.data, e === cr && lr ? null : e;
			default: return null;
		}
	}
	function mr(e, t) {
		if (fr) return e === "compositionend" || !ir && ur(e, t) ? (e = On(), Dn = En = Tn = null, fr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return sr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var hr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function gr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!hr[e.type] : t === "textarea";
	}
	function _r(e, t, n, r) {
		Je(r), t = vi(t, "onChange"), 0 < t.length && (n = new Pn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var vr = null, yr = null;
	function br(e) {
		di(e, 0);
	}
	function xr(e) {
		if (ve(Ki(e))) return e;
	}
	function Sr(e, t) {
		if (e === "change") return t;
	}
	var Cr = !1;
	if (c) {
		var wr;
		if (c) {
			var Tr = "oninput" in document;
			if (!Tr) {
				var Er = document.createElement("div");
				Er.setAttribute("oninput", "return;"), Tr = typeof Er.oninput == "function";
			}
			wr = Tr;
		} else wr = !1;
		Cr = wr && (!document.documentMode || 9 < document.documentMode);
	}
	function Dr() {
		vr && (vr.detachEvent("onpropertychange", Or), yr = vr = null);
	}
	function Or(e) {
		if (e.propertyName === "value" && xr(yr)) {
			var t = [];
			_r(t, yr, e, Ue(e)), $e(br, t);
		}
	}
	function kr(e, t, n) {
		e === "focusin" ? (Dr(), vr = t, yr = n, vr.attachEvent("onpropertychange", Or)) : e === "focusout" && Dr();
	}
	function Ar(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return xr(yr);
	}
	function jr(e, t) {
		if (e === "click") return xr(t);
	}
	function Mr(e, t) {
		if (e === "input" || e === "change") return xr(t);
	}
	function Nr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Pr = typeof Object.is == "function" ? Object.is : Nr;
	function Fr(e, t) {
		if (Pr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!l.call(t, i) || !Pr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Ir(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Lr(e, t) {
		var n = Ir(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Ir(n);
		}
	}
	function Rr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Rr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function zr() {
		for (var e = window, t = ye(); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = ye(e.document);
		}
		return t;
	}
	function Br(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	function Vr(e) {
		var t = zr(), n = e.focusedElem, r = e.selectionRange;
		if (t !== n && n && n.ownerDocument && Rr(n.ownerDocument.documentElement, n)) {
			if (r !== null && Br(n)) {
				if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
				else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
					e = e.getSelection();
					var i = n.textContent.length, a = Math.min(r.start, i);
					r = r.end === void 0 ? a : Math.min(r.end, i), !e.extend && a > r && (i = r, r = a, a = i), i = Lr(n, a);
					var o = Lr(n, r);
					i && o && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), a > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
				}
			}
			for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
				element: e,
				left: e.scrollLeft,
				top: e.scrollTop
			});
			for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
		}
	}
	var Hr = c && "documentMode" in document && 11 >= document.documentMode, Ur = null, Wr = null, Gr = null, Kr = !1;
	function qr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Kr || Ur == null || Ur !== ye(r) || (r = Ur, "selectionStart" in r && Br(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Gr && Fr(Gr, r) || (Gr = r, r = vi(Wr, "onSelect"), 0 < r.length && (t = new Pn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Ur)));
	}
	function Jr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Yr = {
		animationend: Jr("Animation", "AnimationEnd"),
		animationiteration: Jr("Animation", "AnimationIteration"),
		animationstart: Jr("Animation", "AnimationStart"),
		transitionend: Jr("Transition", "TransitionEnd")
	}, Xr = {}, Zr = {};
	c && (Zr = document.createElement("div").style, "AnimationEvent" in window || (delete Yr.animationend.animation, delete Yr.animationiteration.animation, delete Yr.animationstart.animation), "TransitionEvent" in window || delete Yr.transitionend.transition);
	function Qr(e) {
		if (Xr[e]) return Xr[e];
		if (!Yr[e]) return e;
		var t = Yr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Zr) return Xr[e] = t[n];
		return e;
	}
	var $r = Qr("animationend"), ei = Qr("animationiteration"), ti = Qr("animationstart"), ni = Qr("transitionend"), ri = /* @__PURE__ */ new Map(), ii = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function ai(e, t) {
		ri.set(e, t), o(t, [e]);
	}
	for (var oi = 0; oi < ii.length; oi++) {
		var si = ii[oi];
		ai(si.toLowerCase(), "on" + (si[0].toUpperCase() + si.slice(1)));
	}
	ai($r, "onAnimationEnd"), ai(ei, "onAnimationIteration"), ai(ti, "onAnimationStart"), ai("dblclick", "onDoubleClick"), ai("focusin", "onFocus"), ai("focusout", "onBlur"), ai(ni, "onTransitionEnd"), s("onMouseEnter", ["mouseout", "mouseover"]), s("onMouseLeave", ["mouseout", "mouseover"]), s("onPointerEnter", ["pointerout", "pointerover"]), s("onPointerLeave", ["pointerout", "pointerover"]), o("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), o("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), o("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), o("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), o("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), o("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var ci = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), li = new Set("cancel close invalid load scroll toggle".split(" ").concat(ci));
	function ui(e, t, n) {
		var r = e.type || "unknown-event";
		e.currentTarget = n, ut(r, t, void 0, e), e.currentTarget = null;
	}
	function di(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					ui(i, s, l), a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					ui(i, s, l), a = c;
				}
			}
		}
		if (ot) throw e = st, ot = !1, st = null, e;
	}
	function L(e, t) {
		var n = t[Vi];
		n === void 0 && (n = t[Vi] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (hi(t, e, 2, !1), n.add(r));
	}
	function fi(e, t, n) {
		var r = 0;
		t && (r |= 4), hi(n, e, r, t);
	}
	var pi = "_reactListening" + Math.random().toString(36).slice(2);
	function mi(e) {
		if (!e[pi]) {
			e[pi] = !0, i.forEach(function(t) {
				t !== "selectionchange" && (li.has(t) || fi(t, !1, e), fi(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[pi] || (t[pi] = !0, fi("selectionchange", !1, t));
		}
	}
	function hi(e, t, n, r) {
		switch (wn(t)) {
			case 1:
				var i = yn;
				break;
			case 4:
				i = bn;
				break;
			default: i = xn;
		}
		n = i.bind(null, t, n, e), i = void 0, !tt || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function gi(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var s = r.stateNode.containerInfo;
				if (s === i || s.nodeType === 8 && s.parentNode === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var c = o.tag;
					if ((c === 3 || c === 4) && (c = o.stateNode.containerInfo, c === i || c.nodeType === 8 && c.parentNode === i)) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = Wi(s), o === null) return;
					if (c = o.tag, c === 5 || c === 6) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		$e(function() {
			var r = a, i = Ue(n), o = [];
			a: {
				var s = ri.get(e);
				if (s !== void 0) {
					var c = Pn, l = e;
					switch (e) {
						case "keypress": if (kn(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = Qn;
							break;
						case "focusin":
							l = "focus", c = Un;
							break;
						case "focusout":
							l = "blur", c = Un;
							break;
						case "beforeblur":
						case "afterblur":
							c = Un;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							c = Vn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = Hn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = er;
							break;
						case $r:
						case ei:
						case ti:
							c = Wn;
							break;
						case ni:
							c = tr;
							break;
						case "scroll":
							c = In;
							break;
						case "wheel":
							c = nr;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = Gn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup": c = $n;
					}
					var u = !!(t & 4), d = !u && e === "scroll", f = u ? s === null ? null : s + "Capture" : s;
					u = [];
					for (var p = r, m; p !== null;) {
						m = p;
						var h = m.stateNode;
						if (m.tag === 5 && h !== null && (m = h, f !== null && (h = et(p, f), h != null && u.push(_i(p, h, m)))), d) break;
						p = p.return;
					}
					0 < u.length && (s = new c(s, l, null, n, i), o.push({
						event: s,
						listeners: u
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== He && (l = n.relatedTarget || n.fromElement) && (Wi(l) || l[Bi])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Wi(l) : null, l !== null && (d = dt(l), l !== d || l.tag !== 5 && l.tag !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
						if (u = Vn, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = $n, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : Ki(c), m = l == null ? s : Ki(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Wi(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
							for (u = c, f = l, p = 0, m = u; m; m = yi(m)) p++;
							for (m = 0, h = f; h; h = yi(h)) m++;
							for (; 0 < p - m;) u = yi(u), p--;
							for (; 0 < m - p;) f = yi(f), m--;
							for (; p--;) {
								if (u === f || f !== null && u === f.alternate) break b;
								u = yi(u), f = yi(f);
							}
							u = null;
						}
						else u = null;
						c !== null && bi(o, s, c, u, !1), l !== null && d !== null && bi(o, d, l, u, !0);
					}
				}
				a: {
					if (s = r ? Ki(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = Sr;
					else if (gr(s)) {
						if (Cr) g = Mr;
						else {
							g = Ar;
							var _ = kr;
						}
					} else (c = s.nodeName) && c.toLowerCase() === "input" && (s.type === "checkbox" || s.type === "radio") && (g = jr);
					if (g &&= g(e, r)) {
						_r(o, g, n, i);
						break a;
					}
					_ && _(e, s, r), e === "focusout" && (_ = s._wrapperState) && _.controlled && s.type === "number" && Te(s, "number", s.value);
				}
				switch (_ = r ? Ki(r) : window, e) {
					case "focusin":
						(gr(_) || _.contentEditable === "true") && (Ur = _, Wr = r, Gr = null);
						break;
					case "focusout":
						Gr = Wr = Ur = null;
						break;
					case "mousedown":
						Kr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Kr = !1, qr(o, n, i);
						break;
					case "selectionchange": if (Hr) break;
					case "keydown":
					case "keyup": qr(o, n, i);
				}
				var v;
				if (ir) b: {
					switch (e) {
						case "compositionstart":
							var y = "onCompositionStart";
							break b;
						case "compositionend":
							y = "onCompositionEnd";
							break b;
						case "compositionupdate":
							y = "onCompositionUpdate";
							break b;
					}
					y = void 0;
				}
				else fr ? ur(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (y = "onCompositionStart");
				y && (sr && n.locale !== "ko" && (fr || y !== "onCompositionStart" ? y === "onCompositionEnd" && fr && (v = On()) : (Tn = i, En = "value" in Tn ? Tn.value : Tn.textContent, fr = !0)), _ = vi(r, y), 0 < _.length && (y = new Kn(y, e, null, n, i), o.push({
					event: y,
					listeners: _
				}), v ? y.data = v : (v = dr(n), v !== null && (y.data = v)))), (v = or ? pr(e, n) : mr(e, n)) && (r = vi(r, "onBeforeInput"), 0 < r.length && (i = new Kn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: i,
					listeners: r
				}), i.data = v));
			}
			di(o, t);
		});
	}
	function _i(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function vi(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			i.tag === 5 && a !== null && (i = a, a = et(e, n), a != null && r.unshift(_i(e, a, i)), a = et(e, t), a != null && r.push(_i(e, a, i))), e = e.return;
		}
		return r;
	}
	function yi(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5);
		return e || null;
	}
	function bi(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (c !== null && c === r) break;
			s.tag === 5 && l !== null && (s = l, i ? (c = et(n, a), c != null && o.unshift(_i(n, c, s))) : i || (c = et(n, a), c != null && o.push(_i(n, c, s)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var xi = /\r\n?/g, Si = /\u0000|\uFFFD/g;
	function Ci(e) {
		return (typeof e == "string" ? e : "" + e).replace(xi, "\n").replace(Si, "");
	}
	function wi(e, t, n) {
		if (t = Ci(t), Ci(e) !== t && n) throw Error(r(425));
	}
	function Ti() {}
	var Ei = null, Di = null;
	function Oi(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var ki = typeof setTimeout == "function" ? setTimeout : void 0, Ai = typeof clearTimeout == "function" ? clearTimeout : void 0, ji = typeof Promise == "function" ? Promise : void 0, Mi = typeof queueMicrotask == "function" ? queueMicrotask : ji === void 0 ? ki : function(e) {
		return ji.resolve(null).then(e).catch(Ni);
	};
	function Ni(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Pi(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$") {
					if (r === 0) {
						e.removeChild(i), gn(t);
						return;
					}
					r--;
				} else n !== "$" && n !== "$?" && n !== "$!" || r++;
			}
			n = i;
		} while (n);
		gn(t);
	}
	function Fi(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
				if (t === "/$") return null;
			}
		}
		return e;
	}
	function Ii(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?") {
					if (t === 0) return e;
					t--;
				} else n === "/$" && t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	var Li = Math.random().toString(36).slice(2), Ri = "__reactFiber$" + Li, zi = "__reactProps$" + Li, Bi = "__reactContainer$" + Li, Vi = "__reactEvents$" + Li, Hi = "__reactListeners$" + Li, Ui = "__reactHandles$" + Li;
	function Wi(e) {
		var t = e[Ri];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Bi] || n[Ri]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ii(e); e !== null;) {
					if (n = e[Ri]) return n;
					e = Ii(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Gi(e) {
		return e = e[Ri] || e[Bi], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
	}
	function Ki(e) {
		if (e.tag === 5 || e.tag === 6) return e.stateNode;
		throw Error(r(33));
	}
	function qi(e) {
		return e[zi] || null;
	}
	var Ji = [], Yi = -1;
	function Xi(e) {
		return { current: e };
	}
	function R(e) {
		0 > Yi || (e.current = Ji[Yi], Ji[Yi] = null, Yi--);
	}
	function z(e, t) {
		Yi++, Ji[Yi] = e.current, e.current = t;
	}
	var Zi = {}, B = Xi(Zi), Qi = Xi(!1), $i = Zi;
	function ea(e, t) {
		var n = e.type.contextTypes;
		if (!n) return Zi;
		var r = e.stateNode;
		if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
		var i = {}, a;
		for (a in n) i[a] = t[a];
		return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
	}
	function ta(e) {
		return e = e.childContextTypes, e != null;
	}
	function na() {
		R(Qi), R(B);
	}
	function ra(e, t, n) {
		if (B.current !== Zi) throw Error(r(168));
		z(B, t), z(Qi, n);
	}
	function ia(e, t, n) {
		var i = e.stateNode;
		if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
		for (var a in i = i.getChildContext(), i) if (!(a in t)) throw Error(r(108, me(e) || "Unknown", a));
		return j({}, n, i);
	}
	function aa(e) {
		return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Zi, $i = B.current, z(B, e), z(Qi, Qi.current), !0;
	}
	function oa(e, t, n) {
		var i = e.stateNode;
		if (!i) throw Error(r(169));
		n ? (e = ia(e, t, $i), i.__reactInternalMemoizedMergedChildContext = e, R(Qi), R(B), z(B, e)) : R(Qi), z(Qi, n);
	}
	var sa = null, ca = !1, la = !1;
	function ua(e) {
		sa === null ? sa = [e] : sa.push(e);
	}
	function da(e) {
		ca = !0, ua(e);
	}
	function fa() {
		if (!la && sa !== null) {
			la = !0;
			var e = 0, t = I;
			try {
				var n = sa;
				for (I = 1; e < n.length; e++) {
					var r = n[e];
					do
						r = r(!0);
					while (r !== null);
				}
				sa = null, ca = !1;
			} catch (t) {
				throw sa !== null && (sa = sa.slice(e + 1)), _t(St, fa), t;
			} finally {
				I = t, la = !1;
			}
		}
		return null;
	}
	var pa = [], ma = 0, ha = null, ga = 0, _a = [], va = 0, ya = null, ba = 1, xa = "";
	function Sa(e, t) {
		pa[ma++] = ga, pa[ma++] = ha, ha = e, ga = t;
	}
	function Ca(e, t, n) {
		_a[va++] = ba, _a[va++] = xa, _a[va++] = ya, ya = e;
		var r = ba;
		e = xa;
		var i = 32 - At(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - At(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ba = 1 << 32 - At(t) + i | n << i | r, xa = a + e;
		} else ba = 1 << a | n << i | r, xa = e;
	}
	function wa(e) {
		e.return !== null && (Sa(e, 1), Ca(e, 1, 0));
	}
	function Ta(e) {
		for (; e === ha;) ha = pa[--ma], pa[ma] = null, ga = pa[--ma], pa[ma] = null;
		for (; e === ya;) ya = _a[--va], _a[va] = null, xa = _a[--va], _a[va] = null, ba = _a[--va], _a[va] = null;
	}
	var Ea = null, Da = null, V = !1, Oa = null;
	function ka(e, t) {
		var n = Gl(5, null, null, 0);
		n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
	}
	function Aa(e, t) {
		switch (e.tag) {
			case 5:
				var n = e.type;
				return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null && (e.stateNode = t, Ea = e, Da = Fi(t.firstChild), !0);
			case 6: return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null && (e.stateNode = t, Ea = e, Da = null, !0);
			case 13: return t = t.nodeType === 8 ? t : null, t !== null && (n = ya === null ? null : {
				id: ba,
				overflow: xa
			}, e.memoizedState = {
				dehydrated: t,
				treeContext: n,
				retryLane: 1073741824
			}, n = Gl(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ea = e, Da = null, !0);
			default: return !1;
		}
	}
	function ja(e) {
		return !!(e.mode & 1) && !(e.flags & 128);
	}
	function Ma(e) {
		if (V) {
			var t = Da;
			if (t) {
				var n = t;
				if (!Aa(e, t)) {
					if (ja(e)) throw Error(r(418));
					t = Fi(n.nextSibling);
					var i = Ea;
					t && Aa(e, t) ? ka(i, n) : (e.flags = e.flags & -4097 | 2, V = !1, Ea = e);
				}
			} else {
				if (ja(e)) throw Error(r(418));
				e.flags = e.flags & -4097 | 2, V = !1, Ea = e;
			}
		}
	}
	function Na(e) {
		for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
		Ea = e;
	}
	function Pa(e) {
		if (e !== Ea) return !1;
		if (!V) return Na(e), V = !0, !1;
		var t;
		if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Oi(e.type, e.memoizedProps)), t &&= Da) {
			if (ja(e)) throw Fa(), Error(r(418));
			for (; t;) ka(e, t), t = Fi(t.nextSibling);
		}
		if (Na(e), e.tag === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(r(317));
			a: {
				for (e = e.nextSibling, t = 0; e;) {
					if (e.nodeType === 8) {
						var n = e.data;
						if (n === "/$") {
							if (t === 0) {
								Da = Fi(e.nextSibling);
								break a;
							}
							t--;
						} else n !== "$" && n !== "$!" && n !== "$?" || t++;
					}
					e = e.nextSibling;
				}
				Da = null;
			}
		} else Da = Ea ? Fi(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Fa() {
		for (var e = Da; e;) e = Fi(e.nextSibling);
	}
	function Ia() {
		Da = Ea = null, V = !1;
	}
	function La(e) {
		Oa === null ? Oa = [e] : Oa.push(e);
	}
	var Ra = C.ReactCurrentBatchConfig;
	function za(e, t, n) {
		if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
			if (n._owner) {
				if (n = n._owner, n) {
					if (n.tag !== 1) throw Error(r(309));
					var i = n.stateNode;
				}
				if (!i) throw Error(r(147, e));
				var a = i, o = "" + e;
				return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(e) {
					var t = a.refs;
					e === null ? delete t[o] : t[o] = e;
				}, t._stringRef = o, t);
			}
			if (typeof e != "string") throw Error(r(284));
			if (!n._owner) throw Error(r(290, e));
		}
		return e;
	}
	function Ba(e, t) {
		throw e = Object.prototype.toString.call(t), Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
	}
	function Va(e) {
		var t = e._init;
		return t(e._payload);
	}
	function Ha(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function i(e, t) {
			for (e = /* @__PURE__ */ new Map(); t !== null;) t.key === null ? e.set(t.index, t) : e.set(t.key, t), t = t.sibling;
			return e;
		}
		function a(e, t) {
			return e = Jl(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 2, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 2), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Ql(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === te ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === A && Va(i) === t.type) ? (r = a(t, n.props), r.ref = za(e, t, n), r.return = e, r) : (r = Yl(n.type, n.key, n.props, null, e.mode, r), r.ref = za(e, t, n), r.return = e, r);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = $l(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Xl(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number") return t = Ql("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case w: return n = Yl(t.type, t.key, t.props, null, e.mode, n), n.ref = za(e, null, t), n.return = e, n;
					case ee: return t = $l(t, e.mode, n), t.return = e, t;
					case A:
						var r = t._init;
						return f(e, r(t._payload), n);
				}
				if (Ee(t) || se(t)) return t = Xl(t, e.mode, n, null), t.return = e, t;
				Ba(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case w: return n.key === i ? l(e, t, n, r) : null;
					case ee: return n.key === i ? u(e, t, n, r) : null;
					case A: return i = n._init, p(e, t, i(n._payload), r);
				}
				if (Ee(n) || se(n)) return i === null ? d(e, t, n, r, null) : null;
				Ba(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case w: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case ee: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case A:
						var a = r._init;
						return m(e, t, n, a(r._payload), i);
				}
				if (Ee(r) || se(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				Ba(t, r);
			}
			return null;
		}
		function h(r, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(r, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(r, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(r, d), V && Sa(r, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(r, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return V && Sa(r, h), l;
			}
			for (d = i(r, d); h < s.length; h++) g = m(d, r, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(r, e);
			}), V && Sa(r, h), l;
		}
		function g(a, s, c, l) {
			var u = se(c);
			if (typeof u != "function") throw Error(r(150));
			if (c = u.call(c), c == null) throw Error(r(151));
			for (var d = u = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), V && Sa(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return V && Sa(a, g), u;
			}
			for (h = i(a, h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), V && Sa(a, g), u;
		}
		function _(e, r, i, o) {
			if (typeof i == "object" && i && i.type === te && i.key === null && (i = i.props.children), typeof i == "object" && i) {
				switch (i.$$typeof) {
					case w:
						a: {
							for (var c = i.key, l = r; l !== null;) {
								if (l.key === c) {
									if (c = i.type, c === te) {
										if (l.tag === 7) {
											n(e, l.sibling), r = a(l, i.props.children), r.return = e, e = r;
											break a;
										}
									} else if (l.elementType === c || typeof c == "object" && c && c.$$typeof === A && Va(c) === l.type) {
										n(e, l.sibling), r = a(l, i.props), r.ref = za(e, l, i), r.return = e, e = r;
										break a;
									}
									n(e, l);
									break;
								}
								t(e, l), l = l.sibling;
							}
							i.type === te ? (r = Xl(i.props.children, e.mode, o, i.key), r.return = e, e = r) : (o = Yl(i.type, i.key, i.props, null, e.mode, o), o.ref = za(e, r, i), o.return = e, e = o);
						}
						return s(e);
					case ee:
						a: {
							for (l = i.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === i.containerInfo && r.stateNode.implementation === i.implementation) {
										n(e, r.sibling), r = a(r, i.children || []), r.return = e, e = r;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							r = $l(i, e.mode, o), r.return = e, e = r;
						}
						return s(e);
					case A: return l = i._init, _(e, r, l(i._payload), o);
				}
				if (Ee(i)) return h(e, r, i, o);
				if (se(i)) return g(e, r, i, o);
				Ba(e, i);
			}
			return typeof i == "string" && i !== "" || typeof i == "number" ? (i = "" + i, r !== null && r.tag === 6 ? (n(e, r.sibling), r = a(r, i), r.return = e, e = r) : (n(e, r), r = Ql(i, e.mode, o), r.return = e, e = r), s(e)) : n(e, r);
		}
		return _;
	}
	var Ua = Ha(!0), Wa = Ha(!1), Ga = Xi(null), Ka = null, qa = null, Ja = null;
	function Ya() {
		Ja = qa = Ka = null;
	}
	function Xa(e) {
		var t = Ga.current;
		R(Ga), e._currentValue = t;
	}
	function Za(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Qa(e, t) {
		Ka = e, Ja = qa = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Ls = !0), e.firstContext = null);
	}
	function $a(e) {
		var t = e._currentValue;
		if (Ja !== e) {
			if (e = {
				context: e,
				memoizedValue: t,
				next: null
			}, qa === null) {
				if (Ka === null) throw Error(r(308));
				qa = e, Ka.dependencies = {
					lanes: 0,
					firstContext: e
				};
			} else qa = qa.next = e;
		}
		return t;
	}
	var eo = null;
	function to(e) {
		eo === null ? eo = [e] : eo.push(e);
	}
	function no(e, t, n, r) {
		var i = t.interleaved;
		return i === null ? (n.next = n, to(t)) : (n.next = i.next, i.next = n), t.interleaved = n, ro(e, r);
	}
	function ro(e, t) {
		e.lanes |= t;
		var n = e.alternate;
		for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
		return n.tag === 3 ? n.stateNode : null;
	}
	var io = !1;
	function ao(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				interleaved: null,
				lanes: 0
			},
			effects: null
		};
	}
	function oo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			effects: e.effects
		});
	}
	function so(e, t) {
		return {
			eventTime: e,
			lane: t,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function co(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, J & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, ro(e, n);
		}
		return i = r.interleaved, i === null ? (t.next = t, to(r)) : (t.next = i.next, i.next = t), r.interleaved = t, ro(e, n);
	}
	function lo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194240)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Gt(e, n);
		}
	}
	function uo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						eventTime: n.eventTime,
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: n.callback,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				effects: r.effects
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	function fo(e, t, n, r) {
		var i = e.updateQueue;
		io = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane, p = s.eventTime;
				if ((r & f) === f) {
					u !== null && (u = u.next = {
						eventTime: p,
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: s.callback,
						next: null
					});
					a: {
						var m = e, h = s;
						switch (f = t, p = n, h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(p, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(p, d, f) : m, f == null) break a;
								d = j({}, d, f);
								break a;
							case 2: io = !0;
						}
					}
					s.callback !== null && s.lane !== 0 && (e.flags |= 64, f = i.effects, f === null ? i.effects = [s] : f.push(s));
				} else p = {
					eventTime: p,
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					f = s, s = f.next, f.next = null, i.lastBaseUpdate = f, i.shared.pending = null;
				}
			} while (1);
			if (u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, t = i.shared.interleaved, t !== null) {
				i = t;
				do
					o |= i.lane, i = i.next;
				while (i !== t);
			} else a === null && (i.shared.lanes = 0);
			Jc |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function po(e, t, n) {
		if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
			var i = e[t], a = i.callback;
			if (a !== null) {
				if (i.callback = null, i = n, typeof a != "function") throw Error(r(191, a));
				a.call(i);
			}
		}
	}
	var mo = {}, ho = Xi(mo), go = Xi(mo), _o = Xi(mo);
	function vo(e) {
		if (e === mo) throw Error(r(174));
		return e;
	}
	function yo(e, t) {
		switch (z(_o, t), z(go, e), z(ho, mo), e = t.nodeType, e) {
			case 9:
			case 11:
				t = (t = t.documentElement) ? t.namespaceURI : Me(null, "");
				break;
			default: e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Me(t, e);
		}
		R(ho), z(ho, t);
	}
	function bo() {
		R(ho), R(go), R(_o);
	}
	function xo(e) {
		vo(_o.current);
		var t = vo(ho.current), n = Me(t, e.type);
		t !== n && (z(go, e), z(ho, n));
	}
	function So(e) {
		go.current === e && (R(ho), R(go));
	}
	var H = Xi(0);
	function Co(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var wo = [];
	function To() {
		for (var e = 0; e < wo.length; e++) wo[e]._workInProgressVersionPrimary = null;
		wo.length = 0;
	}
	var Eo = C.ReactCurrentDispatcher, Do = C.ReactCurrentBatchConfig, Oo = 0, U = null, W = null, G = null, ko = !1, Ao = !1, jo = 0, Mo = 0;
	function No() {
		throw Error(r(321));
	}
	function Po(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Pr(e[n], t[n])) return !1;
		return !0;
	}
	function Fo(e, t, n, i, a, o) {
		if (Oo = o, U = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Eo.current = e === null || e.memoizedState === null ? vs : ys, e = n(i, a), Ao) {
			o = 0;
			do {
				if (Ao = !1, jo = 0, 25 <= o) throw Error(r(301));
				o += 1, G = W = null, t.updateQueue = null, Eo.current = bs, e = n(i, a);
			} while (Ao);
		}
		if (Eo.current = _s, t = W !== null && W.next !== null, Oo = 0, G = W = U = null, ko = !1, t) throw Error(r(300));
		return e;
	}
	function Io() {
		var e = jo !== 0;
		return jo = 0, e;
	}
	function Lo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return G === null ? U.memoizedState = G = e : G = G.next = e, G;
	}
	function Ro() {
		if (W === null) {
			var e = U.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = W.next;
		var t = G === null ? U.memoizedState : G.next;
		if (t !== null) G = t, W = e;
		else {
			if (e === null) throw Error(r(310));
			W = e, e = {
				memoizedState: W.memoizedState,
				baseState: W.baseState,
				baseQueue: W.baseQueue,
				queue: W.queue,
				next: null
			}, G === null ? U.memoizedState = G = e : G = G.next = e;
		}
		return G;
	}
	function zo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Bo(e) {
		var t = Ro(), n = t.queue;
		if (n === null) throw Error(r(311));
		n.lastRenderedReducer = e;
		var i = W, a = i.baseQueue, o = n.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			i.baseQueue = a = o, n.pending = null;
		}
		if (a !== null) {
			o = a.next, i = i.baseState;
			var c = s = null, l = null, u = o;
			do {
				var d = u.lane;
				if ((Oo & d) === d) l !== null && (l = l.next = {
					lane: 0,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}), i = u.hasEagerState ? u.eagerState : e(i, u.action);
				else {
					var f = {
						lane: d,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					};
					l === null ? (c = l = f, s = i) : l = l.next = f, U.lanes |= d, Jc |= d;
				}
				u = u.next;
			} while (u !== null && u !== o);
			l === null ? s = i : l.next = c, Pr(i, t.memoizedState) || (Ls = !0), t.memoizedState = i, t.baseState = s, t.baseQueue = l, n.lastRenderedState = i;
		}
		if (e = n.interleaved, e !== null) {
			a = e;
			do
				o = a.lane, U.lanes |= o, Jc |= o, a = a.next;
			while (a !== e);
		} else a === null && (n.lanes = 0);
		return [t.memoizedState, n.dispatch];
	}
	function Vo(e) {
		var t = Ro(), n = t.queue;
		if (n === null) throw Error(r(311));
		n.lastRenderedReducer = e;
		var i = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Pr(o, t.memoizedState) || (Ls = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, i];
	}
	function Ho() {}
	function Uo(e, t) {
		var n = U, i = Ro(), a = t(), o = !Pr(i.memoizedState, a);
		if (o && (i.memoizedState = a, Ls = !0), i = i.queue, ts(Ko.bind(null, n, i, e), [e]), i.getSnapshot !== t || o || G !== null && G.memoizedState.tag & 1) {
			if (n.flags |= 2048, Xo(9, Go.bind(null, n, i, a, t), void 0, null), Y === null) throw Error(r(349));
			Oo & 30 || Wo(n, t, a);
		}
		return a;
	}
	function Wo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = U.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, U.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Go(e, t, n, r) {
		t.value = n, t.getSnapshot = r, qo(t) && Jo(e);
	}
	function Ko(e, t, n) {
		return n(function() {
			qo(t) && Jo(e);
		});
	}
	function qo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Pr(e, n);
		} catch {
			return !0;
		}
	}
	function Jo(e) {
		var t = ro(e, 1);
		t !== null && ml(t, e, 1, -1);
	}
	function Yo(e) {
		var t = Lo();
		return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: zo,
			lastRenderedState: e
		}, t.queue = e, e = e.dispatch = ps.bind(null, U, e), [t.memoizedState, e];
	}
	function Xo(e, t, n, r) {
		return e = {
			tag: e,
			create: t,
			destroy: n,
			deps: r,
			next: null
		}, t = U.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, U.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
	}
	function Zo() {
		return Ro().memoizedState;
	}
	function Qo(e, t, n, r) {
		var i = Lo();
		U.flags |= e, i.memoizedState = Xo(1 | t, n, void 0, r === void 0 ? null : r);
	}
	function $o(e, t, n, r) {
		var i = Ro();
		r = r === void 0 ? null : r;
		var a = void 0;
		if (W !== null) {
			var o = W.memoizedState;
			if (a = o.destroy, r !== null && Po(r, o.deps)) {
				i.memoizedState = Xo(t, n, a, r);
				return;
			}
		}
		U.flags |= e, i.memoizedState = Xo(1 | t, n, a, r);
	}
	function es(e, t) {
		return Qo(8390656, 8, e, t);
	}
	function ts(e, t) {
		return $o(2048, 8, e, t);
	}
	function ns(e, t) {
		return $o(4, 2, e, t);
	}
	function rs(e, t) {
		return $o(4, 4, e, t);
	}
	function is(e, t) {
		if (typeof t == "function") return e = e(), t(e), function() {
			t(null);
		};
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function as(e, t, n) {
		return n = n == null ? null : n.concat([e]), $o(4, 4, is.bind(null, t, e), n);
	}
	function os() {}
	function ss(e, t) {
		var n = Ro();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Po(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function cs(e, t) {
		var n = Ro();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Po(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
	}
	function ls(e, t, n) {
		return Oo & 21 ? (Pr(n, t) || (n = Vt(), U.lanes |= n, Jc |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ls = !0), e.memoizedState = n);
	}
	function us(e, t) {
		var n = I;
		I = n !== 0 && 4 > n ? n : 4, e(!0);
		var r = Do.transition;
		Do.transition = {};
		try {
			e(!1), t();
		} finally {
			I = n, Do.transition = r;
		}
	}
	function ds() {
		return Ro().memoizedState;
	}
	function fs(e, t, n) {
		var r = pl(e);
		if (n = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ms(e)) hs(t, n);
		else if (n = no(e, t, n, r), n !== null) {
			var i = fl();
			ml(n, e, r, i), gs(n, t, r);
		}
	}
	function ps(e, t, n) {
		var r = pl(e), i = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ms(e)) hs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Pr(s, o)) {
					var c = t.interleaved;
					c === null ? (i.next = i, to(t)) : (i.next = c.next, c.next = i), t.interleaved = i;
					return;
				}
			} catch {}
			n = no(e, t, i, r), n !== null && (i = fl(), ml(n, e, r, i), gs(n, t, r));
		}
	}
	function ms(e) {
		var t = e.alternate;
		return e === U || t !== null && t === U;
	}
	function hs(e, t) {
		Ao = ko = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function gs(e, t, n) {
		if (n & 4194240) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Gt(e, n);
		}
	}
	var _s = {
		readContext: $a,
		useCallback: No,
		useContext: No,
		useEffect: No,
		useImperativeHandle: No,
		useInsertionEffect: No,
		useLayoutEffect: No,
		useMemo: No,
		useReducer: No,
		useRef: No,
		useState: No,
		useDebugValue: No,
		useDeferredValue: No,
		useTransition: No,
		useMutableSource: No,
		useSyncExternalStore: No,
		useId: No,
		unstable_isNewReconciler: !1
	}, vs = {
		readContext: $a,
		useCallback: function(e, t) {
			return Lo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: $a,
		useEffect: es,
		useImperativeHandle: function(e, t, n) {
			return n = n == null ? null : n.concat([e]), Qo(4194308, 4, is.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Qo(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			return Qo(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Lo();
			return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
		},
		useReducer: function(e, t, n) {
			var r = Lo();
			return t = n === void 0 ? t : n(t), r.memoizedState = r.baseState = t, e = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: t
			}, r.queue = e, e = e.dispatch = fs.bind(null, U, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Lo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: Yo,
		useDebugValue: os,
		useDeferredValue: function(e) {
			return Lo().memoizedState = e;
		},
		useTransition: function() {
			var e = Yo(!1), t = e[0];
			return e = us.bind(null, e[1]), Lo().memoizedState = e, [t, e];
		},
		useMutableSource: function() {},
		useSyncExternalStore: function(e, t, n) {
			var i = U, a = Lo();
			if (V) {
				if (n === void 0) throw Error(r(407));
				n = n();
			} else {
				if (n = t(), Y === null) throw Error(r(349));
				Oo & 30 || Wo(i, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, es(Ko.bind(null, i, o, e), [e]), i.flags |= 2048, Xo(9, Go.bind(null, i, o, n, t), void 0, null), n;
		},
		useId: function() {
			var e = Lo(), t = Y.identifierPrefix;
			if (V) {
				var n = xa, r = ba;
				n = (r & ~(1 << 32 - At(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = jo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
			} else n = Mo++, t = ":" + t + "r" + n.toString(32) + ":";
			return e.memoizedState = t;
		},
		unstable_isNewReconciler: !1
	}, ys = {
		readContext: $a,
		useCallback: ss,
		useContext: $a,
		useEffect: ts,
		useImperativeHandle: as,
		useInsertionEffect: ns,
		useLayoutEffect: rs,
		useMemo: cs,
		useReducer: Bo,
		useRef: Zo,
		useState: function() {
			return Bo(zo);
		},
		useDebugValue: os,
		useDeferredValue: function(e) {
			return ls(Ro(), W.memoizedState, e);
		},
		useTransition: function() {
			return [Bo(zo)[0], Ro().memoizedState];
		},
		useMutableSource: Ho,
		useSyncExternalStore: Uo,
		useId: ds,
		unstable_isNewReconciler: !1
	}, bs = {
		readContext: $a,
		useCallback: ss,
		useContext: $a,
		useEffect: ts,
		useImperativeHandle: as,
		useInsertionEffect: ns,
		useLayoutEffect: rs,
		useMemo: cs,
		useReducer: Vo,
		useRef: Zo,
		useState: function() {
			return Vo(zo);
		},
		useDebugValue: os,
		useDeferredValue: function(e) {
			var t = Ro();
			return W === null ? t.memoizedState = e : ls(t, W.memoizedState, e);
		},
		useTransition: function() {
			return [Vo(zo)[0], Ro().memoizedState];
		},
		useMutableSource: Ho,
		useSyncExternalStore: Uo,
		useId: ds,
		unstable_isNewReconciler: !1
	};
	function xs(e, t) {
		if (e && e.defaultProps) {
			for (var n in t = j({}, t), e = e.defaultProps, e) t[n] === void 0 && (t[n] = e[n]);
			return t;
		}
		return t;
	}
	function Ss(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : j({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Cs = {
		isMounted: function(e) {
			return (e = e._reactInternals) ? dt(e) === e : !1;
		},
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = fl(), i = pl(e), a = so(r, i);
			a.payload = t, n != null && (a.callback = n), t = co(e, a, i), t !== null && (ml(t, e, i, r), lo(t, e, i));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = fl(), i = pl(e), a = so(r, i);
			a.tag = 1, a.payload = t, n != null && (a.callback = n), t = co(e, a, i), t !== null && (ml(t, e, i, r), lo(t, e, i));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = fl(), r = pl(e), i = so(n, r);
			i.tag = 2, t != null && (i.callback = t), t = co(e, i, r), t !== null && (ml(t, e, r, n), lo(t, e, r));
		}
	};
	function ws(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Fr(n, r) || !Fr(i, a) : !0;
	}
	function Ts(e, t, n) {
		var r = !1, i = Zi, a = t.contextType;
		return typeof a == "object" && a ? a = $a(a) : (i = ta(t) ? $i : B.current, r = t.contextTypes, a = (r = r != null) ? ea(e, i) : Zi), t = new t(n, a), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Cs, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = a), t;
	}
	function Es(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Cs.enqueueReplaceState(t, t.state, null);
	}
	function Ds(e, t, n, r) {
		var i = e.stateNode;
		i.props = n, i.state = e.memoizedState, i.refs = {}, ao(e);
		var a = t.contextType;
		typeof a == "object" && a ? i.context = $a(a) : (a = ta(t) ? $i : B.current, i.context = ea(e, a)), i.state = e.memoizedState, a = t.getDerivedStateFromProps, typeof a == "function" && (Ss(e, t, a, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Cs.enqueueReplaceState(i, i.state, null), fo(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
	}
	function Os(e, t) {
		try {
			var n = "", r = t;
			do
				n += fe(r), r = r.return;
			while (r);
			var i = n;
		} catch (e) {
			i = "\nError generating stack: " + e.message + "\n" + e.stack;
		}
		return {
			value: e,
			source: t,
			stack: i,
			digest: null
		};
	}
	function ks(e, t, n) {
		return {
			value: e,
			source: null,
			stack: n ?? null,
			digest: t ?? null
		};
	}
	var As = typeof WeakMap == "function" ? WeakMap : Map;
	function js(e, t, n) {
		n = so(-1, n), n.tag = 3, n.payload = { element: null };
		var r = t.value;
		return n.callback = function() {
			nl || (nl = !0, rl = r);
		}, n;
	}
	function Ms(e, t, n) {
		n = so(-1, n), n.tag = 3;
		var r = e.type.getDerivedStateFromError;
		if (typeof r == "function") {
			var i = t.value;
			n.payload = function() {
				return r(i);
			}, n.callback = function() {};
		}
		var a = e.stateNode;
		return a !== null && typeof a.componentDidCatch == "function" && (n.callback = function() {
			typeof r != "function" && (il === null ? il = /* @__PURE__ */ new Set([this]) : il.add(this));
			var e = t.stack;
			this.componentDidCatch(t.value, { componentStack: e === null ? "" : e });
		}), n;
	}
	function Ns(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new As();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (i.add(n), e = Rl.bind(null, e, t, n), t.then(e, e));
	}
	function Ps(e) {
		do {
			var t;
			if ((t = e.tag === 13) && (t = e.memoizedState, t = t === null || t.dehydrated !== null), t) return e;
			e = e.return;
		} while (e !== null);
		return null;
	}
	function Fs(e, t, n, r, i) {
		return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = so(-1, 1), t.tag = 2, co(n, t, 1))), n.lanes |= 1), e);
	}
	var Is = C.ReactCurrentOwner, Ls = !1;
	function Rs(e, t, n, r) {
		t.child = e === null ? Wa(t, null, n, r) : Ua(t, e.child, n, r);
	}
	function zs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		return Qa(t, i), r = Fo(e, t, n, r, a, i), n = Io(), e !== null && !Ls ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, ac(e, t, i)) : (V && n && wa(t), t.flags |= 1, Rs(e, t, r, i), t.child);
	}
	function Bs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Kl(a) && a.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = a, Vs(e, t, a, r, i)) : (e = Yl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, (e.lanes & i) === 0) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Fr : n, n(o, r) && e.ref === t.ref) return ac(e, t, i);
		}
		return t.flags |= 1, e = Jl(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Vs(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Fr(a, r) && e.ref === t.ref) {
				if (Ls = !1, t.pendingProps = r = a, (e.lanes & i) !== 0) e.flags & 131072 && (Ls = !0);
				else return t.lanes = e.lanes, ac(e, t, i);
			}
		}
		return Ws(e, t, n, r, i);
	}
	function Hs(e, t, n) {
		var r = t.pendingProps, i = r.children, a = e === null ? null : e.memoizedState;
		if (r.mode === "hidden") {
			if (!(t.mode & 1)) t.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			}, z(Kc, Gc), Gc |= n;
			else {
				if (!(n & 1073741824)) return e = a === null ? n : a.baseLanes | n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
					baseLanes: e,
					cachePool: null,
					transitions: null
				}, t.updateQueue = null, z(Kc, Gc), Gc |= e, null;
				t.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null
				}, r = a === null ? n : a.baseLanes, z(Kc, Gc), Gc |= r;
			}
		} else a === null ? r = n : (r = a.baseLanes | n, t.memoizedState = null), z(Kc, Gc), Gc |= r;
		return Rs(e, t, i, n), t.child;
	}
	function Us(e, t) {
		var n = t.ref;
		(e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
	}
	function Ws(e, t, n, r, i) {
		var a = ta(n) ? $i : B.current;
		return a = ea(t, a), Qa(t, i), n = Fo(e, t, n, r, a, i), r = Io(), e !== null && !Ls ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, ac(e, t, i)) : (V && r && wa(t), t.flags |= 1, Rs(e, t, n, i), t.child);
	}
	function Gs(e, t, n, r, i) {
		if (ta(n)) {
			var a = !0;
			aa(t);
		} else a = !1;
		if (Qa(t, i), t.stateNode === null) ic(e, t), Ts(t, n, r), Ds(t, n, r, i), r = !0;
		else if (e === null) {
			var o = t.stateNode, s = t.memoizedProps;
			o.props = s;
			var c = o.context, l = n.contextType;
			typeof l == "object" && l ? l = $a(l) : (l = ta(n) ? $i : B.current, l = ea(t, l));
			var u = n.getDerivedStateFromProps, d = typeof u == "function" || typeof o.getSnapshotBeforeUpdate == "function";
			d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || c !== l) && Es(t, o, r, l), io = !1;
			var f = t.memoizedState;
			o.state = f, fo(t, r, o, i), c = t.memoizedState, s !== r || f !== c || Qi.current || io ? (typeof u == "function" && (Ss(t, n, u, r), c = t.memoizedState), (s = io || ws(t, n, s, r, f, c, l)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), o.props = r, o.state = c, o.context = l, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			o = t.stateNode, oo(e, t), s = t.memoizedProps, l = t.type === t.elementType ? s : xs(t.type, s), o.props = l, d = t.pendingProps, f = o.context, c = n.contextType, typeof c == "object" && c ? c = $a(c) : (c = ta(n) ? $i : B.current, c = ea(t, c));
			var p = n.getDerivedStateFromProps;
			(u = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== d || f !== c) && Es(t, o, r, c), io = !1, f = t.memoizedState, o.state = f, fo(t, r, o, i);
			var m = t.memoizedState;
			s !== d || f !== m || Qi.current || io ? (typeof p == "function" && (Ss(t, n, p, r), m = t.memoizedState), (l = io || ws(t, n, l, r, f, m, c) || !1) ? (u || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, m, c), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, m, c)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), o.props = r, o.state = m, o.context = c, r = l) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return Ks(e, t, n, r, a, i);
	}
	function Ks(e, t, n, r, i, a) {
		Us(e, t);
		var o = !!(t.flags & 128);
		if (!r && !o) return i && oa(t, n, !1), ac(e, t, a);
		r = t.stateNode, Is.current = t;
		var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
		return t.flags |= 1, e !== null && o ? (t.child = Ua(t, e.child, null, a), t.child = Ua(t, null, s, a)) : Rs(e, t, s, a), t.memoizedState = r.state, i && oa(t, n, !0), t.child;
	}
	function qs(e) {
		var t = e.stateNode;
		t.pendingContext ? ra(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ra(e, t.context, !1), yo(e, t.containerInfo);
	}
	function Js(e, t, n, r, i) {
		return Ia(), La(i), t.flags |= 256, Rs(e, t, n, r), t.child;
	}
	var Ys = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};
	function Xs(e) {
		return {
			baseLanes: e,
			cachePool: null,
			transitions: null
		};
	}
	function Zs(e, t, n) {
		var r = t.pendingProps, i = H.current, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(i & 2)), s ? (a = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), z(H, i & 1), e === null) return Ma(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.lanes = t.mode & 1 ? e.data === "$!" ? 8 : 1073741824 : 1, null) : (o = r.children, e = r.fallback, a ? (r = t.mode, a = t.child, o = {
			mode: "hidden",
			children: o
		}, !(r & 1) && a !== null ? (a.childLanes = 0, a.pendingProps = o) : a = Zl(o, r, 0, null), e = Xl(e, r, n, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = Xs(n), t.memoizedState = Ys, e) : Qs(t, o));
		if (i = e.memoizedState, i !== null && (s = i.dehydrated, s !== null)) return ec(e, t, o, r, s, i, n);
		if (a) {
			a = r.fallback, o = t.mode, i = e.child, s = i.sibling;
			var c = {
				mode: "hidden",
				children: r.children
			};
			return !(o & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = Jl(i, c), r.subtreeFlags = i.subtreeFlags & 14680064), s === null ? (a = Xl(a, o, n, null), a.flags |= 2) : a = Jl(s, a), a.return = t, r.return = t, r.sibling = a, t.child = r, r = a, a = t.child, o = e.child.memoizedState, o = o === null ? Xs(n) : {
				baseLanes: o.baseLanes | n,
				cachePool: null,
				transitions: o.transitions
			}, a.memoizedState = o, a.childLanes = e.childLanes & ~n, t.memoizedState = Ys, r;
		}
		return a = e.child, e = a.sibling, r = Jl(a, {
			mode: "visible",
			children: r.children
		}), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
	}
	function Qs(e, t) {
		return t = Zl({
			mode: "visible",
			children: t
		}, e.mode, 0, null), t.return = e, e.child = t;
	}
	function $s(e, t, n, r) {
		return r !== null && La(r), Ua(t, e.child, null, n), e = Qs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function ec(e, t, n, i, a, o, s) {
		if (n) return t.flags & 256 ? (t.flags &= -257, i = ks(Error(r(422))), $s(e, t, s, i)) : t.memoizedState === null ? (o = i.fallback, a = t.mode, i = Zl({
			mode: "visible",
			children: i.children
		}, a, 0, null), o = Xl(o, a, s, null), o.flags |= 2, i.return = t, o.return = t, i.sibling = o, t.child = i, t.mode & 1 && Ua(t, e.child, null, s), t.child.memoizedState = Xs(s), t.memoizedState = Ys, o) : (t.child = e.child, t.flags |= 128, null);
		if (!(t.mode & 1)) return $s(e, t, s, null);
		if (a.data === "$!") {
			if (i = a.nextSibling && a.nextSibling.dataset, i) var c = i.dgst;
			return i = c, o = Error(r(419)), i = ks(o, i, void 0), $s(e, t, s, i);
		}
		if (c = (s & e.childLanes) !== 0, Ls || c) {
			if (i = Y, i !== null) {
				switch (s & -s) {
					case 4:
						a = 2;
						break;
					case 16:
						a = 8;
						break;
					case 64:
					case 128:
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072:
					case 262144:
					case 524288:
					case 1048576:
					case 2097152:
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432:
					case 67108864:
						a = 32;
						break;
					case 536870912:
						a = 268435456;
						break;
					default: a = 0;
				}
				a = (a & (i.suspendedLanes | s)) === 0 ? a : 0, a !== 0 && a !== o.retryLane && (o.retryLane = a, ro(e, a), ml(i, e, a, -1));
			}
			return Ol(), i = ks(Error(r(421))), $s(e, t, s, i);
		}
		return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Bl.bind(null, e), a._reactRetry = t, null) : (e = o.treeContext, Da = Fi(a.nextSibling), Ea = t, V = !0, Oa = null, e !== null && (_a[va++] = ba, _a[va++] = xa, _a[va++] = ya, ba = e.id, xa = e.overflow, ya = t), t = Qs(t, i.children), t.flags |= 4096, t);
	}
	function tc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Za(e.return, t, n);
	}
	function nc(e, t, n, r, i) {
		var a = e.memoizedState;
		a === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i
		} : (a.isBackwards = t, a.rendering = null, a.renderingStartTime = 0, a.last = r, a.tail = n, a.tailMode = i);
	}
	function rc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		if (Rs(e, t, r.children, n), r = H.current, r & 2) r = r & 1 | 2, t.flags |= 128;
		else {
			if (e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && tc(e, n, t);
				else if (e.tag === 19) tc(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			r &= 1;
		}
		if (z(H, r), !(t.mode & 1)) t.memoizedState = null;
		else switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && Co(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), nc(t, !1, i, n, a);
				break;
			case "backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Co(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				nc(t, !0, n, null, a);
				break;
			case "together":
				nc(t, !1, null, null, void 0);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function ic(e, t) {
		!(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
	}
	function ac(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Jc |= t.lanes, (n & t.childLanes) === 0) return null;
		if (e !== null && t.child !== e.child) throw Error(r(153));
		if (t.child !== null) {
			for (e = t.child, n = Jl(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Jl(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function oc(e, t, n) {
		switch (t.tag) {
			case 3:
				qs(t), Ia();
				break;
			case 5:
				xo(t);
				break;
			case 1:
				ta(t.type) && aa(t);
				break;
			case 4:
				yo(t, t.stateNode.containerInfo);
				break;
			case 10:
				var r = t.type._context, i = t.memoizedProps.value;
				z(Ga, r._currentValue), r._currentValue = i;
				break;
			case 13:
				if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (z(H, H.current & 1), e = ac(e, t, n), e === null ? null : e.sibling) : Zs(e, t, n) : (z(H, H.current & 1), t.flags |= 128, null);
				z(H, H.current & 1);
				break;
			case 19:
				if (r = (n & t.childLanes) !== 0, e.flags & 128) {
					if (r) return rc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), z(H, H.current), r) break;
				return null;
			case 22:
			case 23: return t.lanes = 0, Hs(e, t, n);
		}
		return ac(e, t, n);
	}
	var sc = function(e, t) {
		for (var n = t.child; n !== null;) {
			if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
			else if (n.tag !== 4 && n.child !== null) {
				n.child.return = n, n = n.child;
				continue;
			}
			if (n === t) break;
			for (; n.sibling === null;) {
				if (n.return === null || n.return === t) return;
				n = n.return;
			}
			n.sibling.return = n.return, n = n.sibling;
		}
	}, cc = function(e, t, n, r) {
		var i = e.memoizedProps;
		if (i !== r) {
			e = t.stateNode, vo(ho.current);
			var o = null;
			switch (n) {
				case "input":
					i = be(e, i), r = be(e, r), o = [];
					break;
				case "select":
					i = j({}, i, { value: void 0 }), r = j({}, r, { value: void 0 }), o = [];
					break;
				case "textarea":
					i = De(e, i), r = De(e, r), o = [];
					break;
				default: typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ti);
			}
			Be(n, r);
			var s;
			for (u in n = null, i) if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null) {
				if (u === "style") {
					var c = i[u];
					for (s in c) c.hasOwnProperty(s) && (n ||= {}, n[s] = "");
				} else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (a.hasOwnProperty(u) ? o ||= [] : (o ||= []).push(u, null));
			}
			for (u in r) {
				var l = r[u];
				if (c = i?.[u], r.hasOwnProperty(u) && l !== c && (l != null || c != null)) {
					if (u === "style") {
						if (c) {
							for (s in c) !c.hasOwnProperty(s) || l && l.hasOwnProperty(s) || (n ||= {}, n[s] = "");
							for (s in l) l.hasOwnProperty(s) && c[s] !== l[s] && (n ||= {}, n[s] = l[s]);
						} else n || (o ||= [], o.push(u, n)), n = l;
					} else u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, c = c ? c.__html : void 0, l != null && c !== l && (o ||= []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (o ||= []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (a.hasOwnProperty(u) ? (l != null && u === "onScroll" && L("scroll", e), o || c === l || (o = [])) : (o ||= []).push(u, l));
				}
			}
			n && (o ||= []).push("style", n);
			var u = o;
			(t.updateQueue = u) && (t.flags |= 4);
		}
	}, lc = function(e, t, n, r) {
		n !== r && (t.flags |= 4);
	};
	function uc(e, t) {
		if (!V) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function dc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function fc(e, t, n) {
		var i = t.pendingProps;
		switch (Ta(t), t.tag) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return dc(t), null;
			case 1: return ta(t.type) && na(), dc(t), null;
			case 3: return i = t.stateNode, bo(), R(Qi), R(B), To(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Pa(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Oa !== null && (vl(Oa), Oa = null))), dc(t), null;
			case 5:
				So(t);
				var o = vo(_o.current);
				if (n = t.type, e !== null && t.stateNode != null) cc(e, t, n, i, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
				else {
					if (!i) {
						if (t.stateNode === null) throw Error(r(166));
						return dc(t), null;
					}
					if (e = vo(ho.current), Pa(t)) {
						i = t.stateNode, n = t.type;
						var s = t.memoizedProps;
						switch (i[Ri] = t, i[zi] = s, e = !!(t.mode & 1), n) {
							case "dialog":
								L("cancel", i), L("close", i);
								break;
							case "iframe":
							case "object":
							case "embed":
								L("load", i);
								break;
							case "video":
							case "audio":
								for (o = 0; o < ci.length; o++) L(ci[o], i);
								break;
							case "source":
								L("error", i);
								break;
							case "img":
							case "image":
							case "link":
								L("error", i), L("load", i);
								break;
							case "details":
								L("toggle", i);
								break;
							case "input":
								xe(i, s), L("invalid", i);
								break;
							case "select":
								i._wrapperState = { wasMultiple: !!s.multiple }, L("invalid", i);
								break;
							case "textarea": Oe(i, s), L("invalid", i);
						}
						for (var c in Be(n, s), o = null, s) if (s.hasOwnProperty(c)) {
							var l = s[c];
							c === "children" ? typeof l == "string" ? i.textContent !== l && (!0 !== s.suppressHydrationWarning && wi(i.textContent, l, e), o = ["children", l]) : typeof l == "number" && i.textContent !== "" + l && (!0 !== s.suppressHydrationWarning && wi(i.textContent, l, e), o = ["children", "" + l]) : a.hasOwnProperty(c) && l != null && c === "onScroll" && L("scroll", i);
						}
						switch (n) {
							case "input":
								_e(i), we(i, s, !0);
								break;
							case "textarea":
								_e(i), Ae(i);
								break;
							case "select":
							case "option": break;
							default: typeof s.onClick == "function" && (i.onclick = Ti);
						}
						i = o, t.updateQueue = i, i !== null && (t.flags |= 4);
					} else {
						c = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = je(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = c.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = c.createElement(n, { is: i.is }) : (e = c.createElement(n), n === "select" && (c = e, i.multiple ? c.multiple = !0 : i.size && (c.size = i.size))) : e = c.createElementNS(e, n), e[Ri] = t, e[zi] = i, sc(e, t, !1, !1), t.stateNode = e;
						a: {
							switch (c = Ve(n, i), n) {
								case "dialog":
									L("cancel", e), L("close", e), o = i;
									break;
								case "iframe":
								case "object":
								case "embed":
									L("load", e), o = i;
									break;
								case "video":
								case "audio":
									for (o = 0; o < ci.length; o++) L(ci[o], e);
									o = i;
									break;
								case "source":
									L("error", e), o = i;
									break;
								case "img":
								case "image":
								case "link":
									L("error", e), L("load", e), o = i;
									break;
								case "details":
									L("toggle", e), o = i;
									break;
								case "input":
									xe(e, i), o = be(e, i), L("invalid", e);
									break;
								case "option":
									o = i;
									break;
								case "select":
									e._wrapperState = { wasMultiple: !!i.multiple }, o = j({}, i, { value: void 0 }), L("invalid", e);
									break;
								case "textarea":
									Oe(e, i), o = De(e, i), L("invalid", e);
									break;
								default: o = i;
							}
							for (s in Be(n, o), l = o, l) if (l.hasOwnProperty(s)) {
								var u = l[s];
								s === "style" ? ze(e, u) : s === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Pe(e, u)) : s === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Fe(e, u) : typeof u == "number" && Fe(e, "" + u) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (a.hasOwnProperty(s) ? u != null && s === "onScroll" && L("scroll", e) : u != null && S(e, s, u, c));
							}
							switch (n) {
								case "input":
									_e(e), we(e, i, !1);
									break;
								case "textarea":
									_e(e), Ae(e);
									break;
								case "option":
									i.value != null && e.setAttribute("value", "" + M(i.value));
									break;
								case "select":
									e.multiple = !!i.multiple, s = i.value, s == null ? i.defaultValue != null && N(e, !!i.multiple, i.defaultValue, !0) : N(e, !!i.multiple, s, !1);
									break;
								default: typeof o.onClick == "function" && (e.onclick = Ti);
							}
							switch (n) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									i = !!i.autoFocus;
									break a;
								case "img":
									i = !0;
									break a;
								default: i = !1;
							}
						}
						i && (t.flags |= 4);
					}
					t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
				}
				return dc(t), null;
			case 6:
				if (e && t.stateNode != null) lc(e, t, e.memoizedProps, i);
				else {
					if (typeof i != "string" && t.stateNode === null) throw Error(r(166));
					if (n = vo(_o.current), vo(ho.current), Pa(t)) {
						if (i = t.stateNode, n = t.memoizedProps, i[Ri] = t, (s = i.nodeValue !== n) && (e = Ea, e !== null)) switch (e.tag) {
							case 3:
								wi(i.nodeValue, n, !!(e.mode & 1));
								break;
							case 5: !0 !== e.memoizedProps.suppressHydrationWarning && wi(i.nodeValue, n, !!(e.mode & 1));
						}
						s && (t.flags |= 4);
					} else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[Ri] = t, t.stateNode = i;
				}
				return dc(t), null;
			case 13:
				if (R(H), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (V && Da !== null && t.mode & 1 && !(t.flags & 128)) Fa(), Ia(), t.flags |= 98560, s = !1;
					else if (s = Pa(t), i !== null && i.dehydrated !== null) {
						if (e === null) {
							if (!s) throw Error(r(318));
							if (s = t.memoizedState, s = s === null ? null : s.dehydrated, !s) throw Error(r(317));
							s[Ri] = t;
						} else Ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						dc(t), s = !1;
					} else Oa !== null && (vl(Oa), Oa = null), s = !0;
					if (!s) return t.flags & 65536 ? t : null;
				}
				return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || H.current & 1 ? Q === 0 && (Q = 3) : Ol())), t.updateQueue !== null && (t.flags |= 4), dc(t), null);
			case 4: return bo(), e === null && mi(t.stateNode.containerInfo), dc(t), null;
			case 10: return Xa(t.type._context), dc(t), null;
			case 17: return ta(t.type) && na(), dc(t), null;
			case 19:
				if (R(H), s = t.memoizedState, s === null) return dc(t), null;
				if (i = !!(t.flags & 128), c = s.rendering, c === null) {
					if (i) uc(s, !1);
					else {
						if (Q !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (c = Co(e), c !== null) {
								for (t.flags |= 128, uc(s, !1), i = c.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null;) s = n, e = i, s.flags &= 14680066, c = s.alternate, c === null ? (s.childLanes = 0, s.lanes = e, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = c.childLanes, s.lanes = c.lanes, s.child = c.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = c.memoizedProps, s.memoizedState = c.memoizedState, s.updateQueue = c.updateQueue, s.type = c.type, e = c.dependencies, s.dependencies = e === null ? null : {
									lanes: e.lanes,
									firstContext: e.firstContext
								}), n = n.sibling;
								return z(H, H.current & 1 | 2), t.child;
							}
							e = e.sibling;
						}
						s.tail !== null && F() > el && (t.flags |= 128, i = !0, uc(s, !1), t.lanes = 4194304);
					}
				} else {
					if (!i) {
						if (e = Co(c), e !== null) {
							if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), uc(s, !0), s.tail === null && s.tailMode === "hidden" && !c.alternate && !V) return dc(t), null;
						} else 2 * F() - s.renderingStartTime > el && n !== 1073741824 && (t.flags |= 128, i = !0, uc(s, !1), t.lanes = 4194304);
					}
					s.isBackwards ? (c.sibling = t.child, t.child = c) : (n = s.last, n === null ? t.child = c : n.sibling = c, s.last = c);
				}
				return s.tail === null ? (dc(t), null) : (t = s.tail, s.rendering = t, s.tail = t.sibling, s.renderingStartTime = F(), t.sibling = null, n = H.current, z(H, i ? n & 1 | 2 : n & 1), t);
			case 22:
			case 23: return wl(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Gc & 1073741824 && (dc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : dc(t), null;
			case 24: return null;
			case 25: return null;
		}
		throw Error(r(156, t.tag));
	}
	function pc(e, t) {
		switch (Ta(t), t.tag) {
			case 1: return ta(t.type) && na(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return bo(), R(Qi), R(B), To(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 5: return So(t), null;
			case 13:
				if (R(H), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(r(340));
					Ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return R(H), null;
			case 4: return bo(), null;
			case 10: return Xa(t.type._context), null;
			case 22:
			case 23: return wl(), null;
			case 24: return null;
			default: return null;
		}
	}
	var mc = !1, hc = !1, gc = typeof WeakSet == "function" ? WeakSet : Set, K = null;
	function _c(e, t) {
		var n = e.ref;
		if (n !== null) {
			if (typeof n == "function") try {
				n(null);
			} catch (n) {
				$(e, t, n);
			}
			else n.current = null;
		}
	}
	function vc(e, t, n) {
		try {
			n();
		} catch (n) {
			$(e, t, n);
		}
	}
	var yc = !1;
	function bc(e, t) {
		if (Ei = vn, e = zr(), Br(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var i = n.getSelection && n.getSelection();
				if (i && i.rangeCount !== 0) {
					n = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Di = {
			focusedElem: e,
			selectionRange: n
		}, vn = !1, K = t; K !== null;) if (t = K, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, K = e;
		else for (; K !== null;) {
			t = K;
			try {
				var h = t.alternate;
				if (t.flags & 1024) switch (t.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						if (h !== null) {
							var g = h.memoizedProps, _ = h.memoizedState, v = t.stateNode;
							v.__reactInternalSnapshotBeforeUpdate = v.getSnapshotBeforeUpdate(t.elementType === t.type ? g : xs(t.type, g), _);
						}
						break;
					case 3:
						var y = t.stateNode.containerInfo;
						y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
						break;
					case 5:
					case 6:
					case 4:
					case 17: break;
					default: throw Error(r(163));
				}
			} catch (e) {
				$(t, t.return, e);
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, K = e;
				break;
			}
			K = t.return;
		}
		return h = yc, yc = !1, h;
	}
	function xc(e, t, n) {
		var r = t.updateQueue;
		if (r = r === null ? null : r.lastEffect, r !== null) {
			var i = r = r.next;
			do {
				if ((i.tag & e) === e) {
					var a = i.destroy;
					i.destroy = void 0, a !== void 0 && vc(t, n, a);
				}
				i = i.next;
			} while (i !== r);
		}
	}
	function Sc(e, t) {
		if (t = t.updateQueue, t = t === null ? null : t.lastEffect, t !== null) {
			var n = t = t.next;
			do {
				if ((n.tag & e) === e) {
					var r = n.create;
					n.destroy = r();
				}
				n = n.next;
			} while (n !== t);
		}
	}
	function Cc(e) {
		var t = e.ref;
		if (t !== null) {
			var n = e.stateNode;
			switch (e.tag) {
				case 5:
					e = n;
					break;
				default: e = n;
			}
			typeof t == "function" ? t(e) : t.current = e;
		}
	}
	function wc(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, wc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ri], delete t[zi], delete t[Vi], delete t[Hi], delete t[Ui])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	function Tc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 4;
	}
	function Ec(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Tc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Dc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ti));
		else if (r !== 4 && (e = e.child, e !== null)) for (Dc(e, t, n), e = e.sibling; e !== null;) Dc(e, t, n), e = e.sibling;
	}
	function Oc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (e = e.child, e !== null)) for (Oc(e, t, n), e = e.sibling; e !== null;) Oc(e, t, n), e = e.sibling;
	}
	var q = null, kc = !1;
	function Ac(e, t, n) {
		for (n = n.child; n !== null;) jc(e, t, n), n = n.sibling;
	}
	function jc(e, t, n) {
		if (Ot && typeof Ot.onCommitFiberUnmount == "function") try {
			Ot.onCommitFiberUnmount(Dt, n);
		} catch {}
		switch (n.tag) {
			case 5: hc || _c(n, t);
			case 6:
				var r = q, i = kc;
				q = null, Ac(e, t, n), q = r, kc = i, q !== null && (kc ? (e = q, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : q.removeChild(n.stateNode));
				break;
			case 18:
				q !== null && (kc ? (e = q, n = n.stateNode, e.nodeType === 8 ? Pi(e.parentNode, n) : e.nodeType === 1 && Pi(e, n), gn(e)) : Pi(q, n.stateNode));
				break;
			case 4:
				r = q, i = kc, q = n.stateNode.containerInfo, kc = !0, Ac(e, t, n), q = r, kc = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!hc && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
					i = r = r.next;
					do {
						var a = i, o = a.destroy;
						a = a.tag, o !== void 0 && (a & 2 || a & 4) && vc(n, t, o), i = i.next;
					} while (i !== r);
				}
				Ac(e, t, n);
				break;
			case 1:
				if (!hc && (_c(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
					r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
				} catch (e) {
					$(n, t, e);
				}
				Ac(e, t, n);
				break;
			case 21:
				Ac(e, t, n);
				break;
			case 22:
				n.mode & 1 ? (hc = (r = hc) || n.memoizedState !== null, Ac(e, t, n), hc = r) : Ac(e, t, n);
				break;
			default: Ac(e, t, n);
		}
	}
	function Mc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			e.updateQueue = null;
			var n = e.stateNode;
			n === null && (n = e.stateNode = new gc()), t.forEach(function(t) {
				var r = Vl.bind(null, e, t);
				n.has(t) || (n.add(t), t.then(r, r));
			});
		}
	}
	function Nc(e, t) {
		var n = t.deletions;
		if (n !== null) for (var i = 0; i < n.length; i++) {
			var a = n[i];
			try {
				var o = e, s = t, c = s;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 5:
							q = c.stateNode, kc = !1;
							break a;
						case 3:
							q = c.stateNode.containerInfo, kc = !0;
							break a;
						case 4:
							q = c.stateNode.containerInfo, kc = !0;
							break a;
					}
					c = c.return;
				}
				if (q === null) throw Error(r(160));
				jc(o, s, a), q = null, kc = !1;
				var l = a.alternate;
				l !== null && (l.return = null), a.return = null;
			} catch (e) {
				$(a, t, e);
			}
		}
		if (t.subtreeFlags & 12854) for (t = t.child; t !== null;) Pc(t, e), t = t.sibling;
	}
	function Pc(e, t) {
		var n = e.alternate, i = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (Nc(t, e), Fc(e), i & 4) {
					try {
						xc(3, e, e.return), Sc(3, e);
					} catch (t) {
						$(e, e.return, t);
					}
					try {
						xc(5, e, e.return);
					} catch (t) {
						$(e, e.return, t);
					}
				}
				break;
			case 1:
				Nc(t, e), Fc(e), i & 512 && n !== null && _c(n, n.return);
				break;
			case 5:
				if (Nc(t, e), Fc(e), i & 512 && n !== null && _c(n, n.return), e.flags & 32) {
					var a = e.stateNode;
					try {
						Fe(a, "");
					} catch (t) {
						$(e, e.return, t);
					}
				}
				if (i & 4 && (a = e.stateNode, a != null)) {
					var o = e.memoizedProps, s = n === null ? o : n.memoizedProps, c = e.type, l = e.updateQueue;
					if (e.updateQueue = null, l !== null) try {
						c === "input" && o.type === "radio" && o.name != null && Se(a, o), Ve(c, s);
						var u = Ve(c, o);
						for (s = 0; s < l.length; s += 2) {
							var d = l[s], f = l[s + 1];
							d === "style" ? ze(a, f) : d === "dangerouslySetInnerHTML" ? Pe(a, f) : d === "children" ? Fe(a, f) : S(a, d, f, u);
						}
						switch (c) {
							case "input":
								Ce(a, o);
								break;
							case "textarea":
								ke(a, o);
								break;
							case "select":
								var p = a._wrapperState.wasMultiple;
								a._wrapperState.wasMultiple = !!o.multiple;
								var m = o.value;
								m == null ? p !== !!o.multiple && (o.defaultValue == null ? N(a, !!o.multiple, o.multiple ? [] : "", !1) : N(a, !!o.multiple, o.defaultValue, !0)) : N(a, !!o.multiple, m, !1);
						}
						a[zi] = o;
					} catch (t) {
						$(e, e.return, t);
					}
				}
				break;
			case 6:
				if (Nc(t, e), Fc(e), i & 4) {
					if (e.stateNode === null) throw Error(r(162));
					a = e.stateNode, o = e.memoizedProps;
					try {
						a.nodeValue = o;
					} catch (t) {
						$(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Nc(t, e), Fc(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
					gn(t.containerInfo);
				} catch (t) {
					$(e, e.return, t);
				}
				break;
			case 4:
				Nc(t, e), Fc(e);
				break;
			case 13:
				Nc(t, e), Fc(e), a = e.child, a.flags & 8192 && (o = a.memoizedState !== null, a.stateNode.isHidden = o, !o || a.alternate !== null && a.alternate.memoizedState !== null || ($c = F())), i & 4 && Mc(e);
				break;
			case 22:
				if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (hc = (u = hc) || d, Nc(t, e), hc = u) : Nc(t, e), Fc(e), i & 8192) {
					if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1) for (K = e, d = e.child; d !== null;) {
						for (f = K = d; K !== null;) {
							switch (p = K, m = p.child, p.tag) {
								case 0:
								case 11:
								case 14:
								case 15:
									xc(4, p, p.return);
									break;
								case 1:
									_c(p, p.return);
									var h = p.stateNode;
									if (typeof h.componentWillUnmount == "function") {
										i = p, n = p.return;
										try {
											t = i, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
										} catch (e) {
											$(i, n, e);
										}
									}
									break;
								case 5:
									_c(p, p.return);
									break;
								case 22: if (p.memoizedState !== null) {
									zc(f);
									continue;
								}
							}
							m === null ? zc(f) : (m.return = p, K = m);
						}
						d = d.sibling;
					}
					a: for (d = null, f = e;;) {
						if (f.tag === 5) {
							if (d === null) {
								d = f;
								try {
									a = f.stateNode, u ? (o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = f.stateNode, l = f.memoizedProps.style, s = l != null && l.hasOwnProperty("display") ? l.display : null, c.style.display = Re("display", s));
								} catch (t) {
									$(e, e.return, t);
								}
							}
						} else if (f.tag === 6) {
							if (d === null) try {
								f.stateNode.nodeValue = u ? "" : f.memoizedProps;
							} catch (t) {
								$(e, e.return, t);
							}
						} else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
							f.child.return = f, f = f.child;
							continue;
						}
						if (f === e) break a;
						for (; f.sibling === null;) {
							if (f.return === null || f.return === e) break a;
							d === f && (d = null), f = f.return;
						}
						d === f && (d = null), f.sibling.return = f.return, f = f.sibling;
					}
				}
				break;
			case 19:
				Nc(t, e), Fc(e), i & 4 && Mc(e);
				break;
			case 21: break;
			default: Nc(t, e), Fc(e);
		}
	}
	function Fc(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				a: {
					for (var n = e.return; n !== null;) {
						if (Tc(n)) {
							var i = n;
							break a;
						}
						n = n.return;
					}
					throw Error(r(160));
				}
				switch (i.tag) {
					case 5:
						var a = i.stateNode;
						i.flags & 32 && (Fe(a, ""), i.flags &= -33), Oc(e, Ec(e), a);
						break;
					case 3:
					case 4:
						var o = i.stateNode.containerInfo;
						Dc(e, Ec(e), o);
						break;
					default: throw Error(r(161));
				}
			} catch (t) {
				$(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Ic(e, t, n) {
		K = e, Lc(e, t, n);
	}
	function Lc(e, t, n) {
		for (var r = !!(e.mode & 1); K !== null;) {
			var i = K, a = i.child;
			if (i.tag === 22 && r) {
				var o = i.memoizedState !== null || mc;
				if (!o) {
					var s = i.alternate, c = s !== null && s.memoizedState !== null || hc;
					s = mc;
					var l = hc;
					if (mc = o, (hc = c) && !l) for (K = i; K !== null;) o = K, c = o.child, o.tag === 22 && o.memoizedState !== null || c === null ? Bc(i) : (c.return = o, K = c);
					for (; a !== null;) K = a, Lc(a, t, n), a = a.sibling;
					K = i, mc = s, hc = l;
				}
				Rc(e, t, n);
			} else i.subtreeFlags & 8772 && a !== null ? (a.return = i, K = a) : Rc(e, t, n);
		}
	}
	function Rc(e) {
		for (; K !== null;) {
			var t = K;
			if (t.flags & 8772) {
				var n = t.alternate;
				try {
					if (t.flags & 8772) switch (t.tag) {
						case 0:
						case 11:
						case 15:
							hc || Sc(5, t);
							break;
						case 1:
							var i = t.stateNode;
							if (t.flags & 4 && !hc) {
								if (n === null) i.componentDidMount();
								else {
									var a = t.elementType === t.type ? n.memoizedProps : xs(t.type, n.memoizedProps);
									i.componentDidUpdate(a, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
								}
							}
							var o = t.updateQueue;
							o !== null && po(t, o, i);
							break;
						case 3:
							var s = t.updateQueue;
							if (s !== null) {
								if (n = null, t.child !== null) switch (t.child.tag) {
									case 5:
										n = t.child.stateNode;
										break;
									case 1: n = t.child.stateNode;
								}
								po(t, s, n);
							}
							break;
						case 5:
							var c = t.stateNode;
							if (n === null && t.flags & 4) {
								n = c;
								var l = t.memoizedProps;
								switch (t.type) {
									case "button":
									case "input":
									case "select":
									case "textarea":
										l.autoFocus && n.focus();
										break;
									case "img": l.src && (n.src = l.src);
								}
							}
							break;
						case 6: break;
						case 4: break;
						case 12: break;
						case 13:
							if (t.memoizedState === null) {
								var u = t.alternate;
								if (u !== null) {
									var d = u.memoizedState;
									if (d !== null) {
										var f = d.dehydrated;
										f !== null && gn(f);
									}
								}
							}
							break;
						case 19:
						case 17:
						case 21:
						case 22:
						case 23:
						case 25: break;
						default: throw Error(r(163));
					}
					hc || t.flags & 512 && Cc(t);
				} catch (e) {
					$(t, t.return, e);
				}
			}
			if (t === e) {
				K = null;
				break;
			}
			if (n = t.sibling, n !== null) {
				n.return = t.return, K = n;
				break;
			}
			K = t.return;
		}
	}
	function zc(e) {
		for (; K !== null;) {
			var t = K;
			if (t === e) {
				K = null;
				break;
			}
			var n = t.sibling;
			if (n !== null) {
				n.return = t.return, K = n;
				break;
			}
			K = t.return;
		}
	}
	function Bc(e) {
		for (; K !== null;) {
			var t = K;
			try {
				switch (t.tag) {
					case 0:
					case 11:
					case 15:
						var n = t.return;
						try {
							Sc(4, t);
						} catch (e) {
							$(t, n, e);
						}
						break;
					case 1:
						var r = t.stateNode;
						if (typeof r.componentDidMount == "function") {
							var i = t.return;
							try {
								r.componentDidMount();
							} catch (e) {
								$(t, i, e);
							}
						}
						var a = t.return;
						try {
							Cc(t);
						} catch (e) {
							$(t, a, e);
						}
						break;
					case 5:
						var o = t.return;
						try {
							Cc(t);
						} catch (e) {
							$(t, o, e);
						}
				}
			} catch (e) {
				$(t, t.return, e);
			}
			if (t === e) {
				K = null;
				break;
			}
			var s = t.sibling;
			if (s !== null) {
				s.return = t.return, K = s;
				break;
			}
			K = t.return;
		}
	}
	var Vc = Math.ceil, Hc = C.ReactCurrentDispatcher, Uc = C.ReactCurrentOwner, Wc = C.ReactCurrentBatchConfig, J = 0, Y = null, X = null, Z = 0, Gc = 0, Kc = Xi(0), Q = 0, qc = null, Jc = 0, Yc = 0, Xc = 0, Zc = null, Qc = null, $c = 0, el = Infinity, tl = null, nl = !1, rl = null, il = null, al = !1, ol = null, sl = 0, cl = 0, ll = null, ul = -1, dl = 0;
	function fl() {
		return J & 6 ? F() : ul === -1 ? ul = F() : ul;
	}
	function pl(e) {
		return e.mode & 1 ? J & 2 && Z !== 0 ? Z & -Z : Ra.transition === null ? (e = I, e === 0 ? (e = window.event, e = e === void 0 ? 16 : wn(e.type), e) : e) : (dl === 0 && (dl = Vt()), dl) : 1;
	}
	function ml(e, t, n, i) {
		if (50 < cl) throw cl = 0, ll = null, Error(r(185));
		Ut(e, n, i), (!(J & 2) || e !== Y) && (e === Y && (!(J & 2) && (Yc |= n), Q === 4 && bl(e, Z)), hl(e, i), n === 1 && J === 0 && !(t.mode & 1) && (el = F() + 500, ca && fa()));
	}
	function hl(e, t) {
		var n = e.callbackNode;
		zt(e, t);
		var r = Lt(e, e === Y ? Z : 0);
		if (r === 0) n !== null && vt(n), e.callbackNode = null, e.callbackPriority = 0;
		else if (t = r & -r, e.callbackPriority !== t) {
			if (n != null && vt(n), t === 1) e.tag === 0 ? da(xl.bind(null, e)) : ua(xl.bind(null, e)), Mi(function() {
				!(J & 6) && fa();
			}), n = null;
			else {
				switch (Kt(r)) {
					case 1:
						n = St;
						break;
					case 4:
						n = Ct;
						break;
					case 16:
						n = wt;
						break;
					case 536870912:
						n = Et;
						break;
					default: n = wt;
				}
				n = Ul(n, gl.bind(null, e));
			}
			e.callbackPriority = t, e.callbackNode = n;
		}
	}
	function gl(e, t) {
		if (ul = -1, dl = 0, J & 6) throw Error(r(327));
		var n = e.callbackNode;
		if (Il() && e.callbackNode !== n) return null;
		var i = Lt(e, e === Y ? Z : 0);
		if (i === 0) return null;
		if (i & 30 || (i & e.expiredLanes) !== 0 || t) t = kl(e, i);
		else {
			t = i;
			var a = J;
			J |= 2;
			var o = Dl();
			(Y !== e || Z !== t) && (tl = null, el = F() + 500, Tl(e, t));
			do
				try {
					jl();
					break;
				} catch (t) {
					El(e, t);
				}
			while (1);
			Ya(), Hc.current = o, J = a, X === null ? (Y = null, Z = 0, t = Q) : t = 0;
		}
		if (t !== 0) {
			if (t === 2 && (a = Bt(e), a !== 0 && (i = a, t = _l(e, a))), t === 1) throw n = qc, Tl(e, 0), bl(e, i), hl(e, F()), n;
			if (t === 6) bl(e, i);
			else {
				if (a = e.current.alternate, !(i & 30) && !yl(a) && (t = kl(e, i), t === 2 && (o = Bt(e), o !== 0 && (i = o, t = _l(e, o))), t === 1)) throw n = qc, Tl(e, 0), bl(e, i), hl(e, F()), n;
				switch (e.finishedWork = a, e.finishedLanes = i, t) {
					case 0:
					case 1: throw Error(r(345));
					case 2:
						Pl(e, Qc, tl);
						break;
					case 3:
						if (bl(e, i), (i & 130023424) === i && (t = $c + 500 - F(), 10 < t)) {
							if (Lt(e, 0) !== 0) break;
							if (a = e.suspendedLanes, (a & i) !== i) {
								fl(), e.pingedLanes |= e.suspendedLanes & a;
								break;
							}
							e.timeoutHandle = ki(Pl.bind(null, e, Qc, tl), t);
							break;
						}
						Pl(e, Qc, tl);
						break;
					case 4:
						if (bl(e, i), (i & 4194240) === i) break;
						for (t = e.eventTimes, a = -1; 0 < i;) {
							var s = 31 - At(i);
							o = 1 << s, s = t[s], s > a && (a = s), i &= ~o;
						}
						if (i = a, i = F() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * Vc(i / 1960)) - i, 10 < i) {
							e.timeoutHandle = ki(Pl.bind(null, e, Qc, tl), i);
							break;
						}
						Pl(e, Qc, tl);
						break;
					case 5:
						Pl(e, Qc, tl);
						break;
					default: throw Error(r(329));
				}
			}
		}
		return hl(e, F()), e.callbackNode === n ? gl.bind(null, e) : null;
	}
	function _l(e, t) {
		var n = Zc;
		return e.current.memoizedState.isDehydrated && (Tl(e, t).flags |= 256), e = kl(e, t), e !== 2 && (t = Qc, Qc = n, t !== null && vl(t)), e;
	}
	function vl(e) {
		Qc === null ? Qc = e : Qc.push.apply(Qc, e);
	}
	function yl(e) {
		for (var t = e;;) {
			if (t.flags & 16384) {
				var n = t.updateQueue;
				if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Pr(a(), i)) return !1;
					} catch {
						return !1;
					}
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function bl(e, t) {
		for (t &= ~Xc, t &= ~Yc, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
			var n = 31 - At(t), r = 1 << n;
			e[n] = -1, t &= ~r;
		}
	}
	function xl(e) {
		if (J & 6) throw Error(r(327));
		Il();
		var t = Lt(e, 0);
		if (!(t & 1)) return hl(e, F()), null;
		var n = kl(e, t);
		if (e.tag !== 0 && n === 2) {
			var i = Bt(e);
			i !== 0 && (t = i, n = _l(e, i));
		}
		if (n === 1) throw n = qc, Tl(e, 0), bl(e, t), hl(e, F()), n;
		if (n === 6) throw Error(r(345));
		return e.finishedWork = e.current.alternate, e.finishedLanes = t, Pl(e, Qc, tl), hl(e, F()), null;
	}
	function Sl(e, t) {
		var n = J;
		J |= 1;
		try {
			return e(t);
		} finally {
			J = n, J === 0 && (el = F() + 500, ca && fa());
		}
	}
	function Cl(e) {
		ol !== null && ol.tag === 0 && !(J & 6) && Il();
		var t = J;
		J |= 1;
		var n = Wc.transition, r = I;
		try {
			if (Wc.transition = null, I = 1, e) return e();
		} finally {
			I = r, Wc.transition = n, J = t, !(J & 6) && fa();
		}
	}
	function wl() {
		Gc = Kc.current, R(Kc);
	}
	function Tl(e, t) {
		e.finishedWork = null, e.finishedLanes = 0;
		var n = e.timeoutHandle;
		if (n !== -1 && (e.timeoutHandle = -1, Ai(n)), X !== null) for (n = X.return; n !== null;) {
			var r = n;
			switch (Ta(r), r.tag) {
				case 1:
					r = r.type.childContextTypes, r != null && na();
					break;
				case 3:
					bo(), R(Qi), R(B), To();
					break;
				case 5:
					So(r);
					break;
				case 4:
					bo();
					break;
				case 13:
					R(H);
					break;
				case 19:
					R(H);
					break;
				case 10:
					Xa(r.type._context);
					break;
				case 22:
				case 23: wl();
			}
			n = n.return;
		}
		if (Y = e, X = e = Jl(e.current, null), Z = Gc = t, Q = 0, qc = null, Xc = Yc = Jc = 0, Qc = Zc = null, eo !== null) {
			for (t = 0; t < eo.length; t++) if (n = eo[t], r = n.interleaved, r !== null) {
				n.interleaved = null;
				var i = r.next, a = n.pending;
				if (a !== null) {
					var o = a.next;
					a.next = i, r.next = o;
				}
				n.pending = r;
			}
			eo = null;
		}
		return e;
	}
	function El(e, t) {
		do {
			var n = X;
			try {
				if (Ya(), Eo.current = _s, ko) {
					for (var i = U.memoizedState; i !== null;) {
						var a = i.queue;
						a !== null && (a.pending = null), i = i.next;
					}
					ko = !1;
				}
				if (Oo = 0, G = W = U = null, Ao = !1, jo = 0, Uc.current = null, n === null || n.return === null) {
					Q = 1, qc = t, X = null;
					break;
				}
				a: {
					var o = e, s = n.return, c = n, l = t;
					if (t = Z, c.flags |= 32768, typeof l == "object" && l && typeof l.then == "function") {
						var u = l, d = c, f = d.tag;
						if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
							var p = d.alternate;
							p ? (d.updateQueue = p.updateQueue, d.memoizedState = p.memoizedState, d.lanes = p.lanes) : (d.updateQueue = null, d.memoizedState = null);
						}
						var m = Ps(s);
						if (m !== null) {
							m.flags &= -257, Fs(m, s, c, o, t), m.mode & 1 && Ns(o, u, t), t = m, l = u;
							var h = t.updateQueue;
							if (h === null) {
								var g = /* @__PURE__ */ new Set();
								g.add(l), t.updateQueue = g;
							} else h.add(l);
							break a;
						}
						if (!(t & 1)) {
							Ns(o, u, t), Ol();
							break a;
						}
						l = Error(r(426));
					} else if (V && c.mode & 1) {
						var _ = Ps(s);
						if (_ !== null) {
							!(_.flags & 65536) && (_.flags |= 256), Fs(_, s, c, o, t), La(Os(l, c));
							break a;
						}
					}
					o = l = Os(l, c), Q !== 4 && (Q = 2), Zc === null ? Zc = [o] : Zc.push(o), o = s;
					do {
						switch (o.tag) {
							case 3:
								o.flags |= 65536, t &= -t, o.lanes |= t;
								var v = js(o, l, t);
								uo(o, v);
								break a;
							case 1:
								c = l;
								var y = o.type, b = o.stateNode;
								if (!(o.flags & 128) && (typeof y.getDerivedStateFromError == "function" || b !== null && typeof b.componentDidCatch == "function" && (il === null || !il.has(b)))) {
									o.flags |= 65536, t &= -t, o.lanes |= t;
									var x = Ms(o, c, t);
									uo(o, x);
									break a;
								}
						}
						o = o.return;
					} while (o !== null);
				}
				Nl(n);
			} catch (e) {
				t = e, X === n && n !== null && (X = n = n.return);
				continue;
			}
			break;
		} while (1);
	}
	function Dl() {
		var e = Hc.current;
		return Hc.current = _s, e === null ? _s : e;
	}
	function Ol() {
		(Q === 0 || Q === 3 || Q === 2) && (Q = 4), Y === null || !(Jc & 268435455) && !(Yc & 268435455) || bl(Y, Z);
	}
	function kl(e, t) {
		var n = J;
		J |= 2;
		var i = Dl();
		(Y !== e || Z !== t) && (tl = null, Tl(e, t));
		do
			try {
				Al();
				break;
			} catch (t) {
				El(e, t);
			}
		while (1);
		if (Ya(), J = n, Hc.current = i, X !== null) throw Error(r(261));
		return Y = null, Z = 0, Q;
	}
	function Al() {
		for (; X !== null;) Ml(X);
	}
	function jl() {
		for (; X !== null && !yt();) Ml(X);
	}
	function Ml(e) {
		var t = Hl(e.alternate, e, Gc);
		e.memoizedProps = e.pendingProps, t === null ? Nl(e) : X = t, Uc.current = null;
	}
	function Nl(e) {
		var t = e;
		do {
			var n = t.alternate;
			if (e = t.return, t.flags & 32768) {
				if (n = pc(n, t), n !== null) {
					n.flags &= 32767, X = n;
					return;
				}
				if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
				else {
					Q = 6, X = null;
					return;
				}
			} else if (n = fc(n, t, Gc), n !== null) {
				X = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				X = t;
				return;
			}
			X = t = e;
		} while (t !== null);
		Q === 0 && (Q = 5);
	}
	function Pl(e, t, n) {
		var r = I, i = Wc.transition;
		try {
			Wc.transition = null, I = 1, Fl(e, t, n, r);
		} finally {
			Wc.transition = i, I = r;
		}
		return null;
	}
	function Fl(e, t, n, i) {
		do
			Il();
		while (ol !== null);
		if (J & 6) throw Error(r(327));
		n = e.finishedWork;
		var a = e.finishedLanes;
		if (n === null) return null;
		if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(r(177));
		e.callbackNode = null, e.callbackPriority = 0;
		var o = n.lanes | n.childLanes;
		if (Wt(e, o), e === Y && (X = Y = null, Z = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || al || (al = !0, Ul(wt, function() {
			return Il(), null;
		})), o = !!(n.flags & 15990), n.subtreeFlags & 15990 || o) {
			o = Wc.transition, Wc.transition = null;
			var s = I;
			I = 1;
			var c = J;
			J |= 4, Uc.current = null, bc(e, n), Pc(n, e), Vr(Di), vn = !!Ei, Di = Ei = null, e.current = n, Ic(n, e, a), bt(), J = c, I = s, Wc.transition = o;
		} else e.current = n;
		if (al && (al = !1, ol = e, sl = a), o = e.pendingLanes, o === 0 && (il = null), kt(n.stateNode, i), hl(e, F()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], i(a.value, {
			componentStack: a.stack,
			digest: a.digest
		});
		if (nl) throw nl = !1, e = rl, rl = null, e;
		return sl & 1 && e.tag !== 0 && Il(), o = e.pendingLanes, o & 1 ? e === ll ? cl++ : (cl = 0, ll = e) : cl = 0, fa(), null;
	}
	function Il() {
		if (ol !== null) {
			var e = Kt(sl), t = Wc.transition, n = I;
			try {
				if (Wc.transition = null, I = 16 > e ? 16 : e, ol === null) var i = !1;
				else {
					if (e = ol, ol = null, sl = 0, J & 6) throw Error(r(331));
					var a = J;
					for (J |= 4, K = e.current; K !== null;) {
						var o = K, s = o.child;
						if (K.flags & 16) {
							var c = o.deletions;
							if (c !== null) {
								for (var l = 0; l < c.length; l++) {
									var u = c[l];
									for (K = u; K !== null;) {
										var d = K;
										switch (d.tag) {
											case 0:
											case 11:
											case 15: xc(8, d, o);
										}
										var f = d.child;
										if (f !== null) f.return = d, K = f;
										else for (; K !== null;) {
											d = K;
											var p = d.sibling, m = d.return;
											if (wc(d), d === u) {
												K = null;
												break;
											}
											if (p !== null) {
												p.return = m, K = p;
												break;
											}
											K = m;
										}
									}
								}
								var h = o.alternate;
								if (h !== null) {
									var g = h.child;
									if (g !== null) {
										h.child = null;
										do {
											var _ = g.sibling;
											g.sibling = null, g = _;
										} while (g !== null);
									}
								}
								K = o;
							}
						}
						if (o.subtreeFlags & 2064 && s !== null) s.return = o, K = s;
						else b: for (; K !== null;) {
							if (o = K, o.flags & 2048) switch (o.tag) {
								case 0:
								case 11:
								case 15: xc(9, o, o.return);
							}
							var v = o.sibling;
							if (v !== null) {
								v.return = o.return, K = v;
								break b;
							}
							K = o.return;
						}
					}
					var y = e.current;
					for (K = y; K !== null;) {
						s = K;
						var b = s.child;
						if (s.subtreeFlags & 2064 && b !== null) b.return = s, K = b;
						else b: for (s = y; K !== null;) {
							if (c = K, c.flags & 2048) try {
								switch (c.tag) {
									case 0:
									case 11:
									case 15: Sc(9, c);
								}
							} catch (e) {
								$(c, c.return, e);
							}
							if (c === s) {
								K = null;
								break b;
							}
							var x = c.sibling;
							if (x !== null) {
								x.return = c.return, K = x;
								break b;
							}
							K = c.return;
						}
					}
					if (J = a, fa(), Ot && typeof Ot.onPostCommitFiberRoot == "function") try {
						Ot.onPostCommitFiberRoot(Dt, e);
					} catch {}
					i = !0;
				}
				return i;
			} finally {
				I = n, Wc.transition = t;
			}
		}
		return !1;
	}
	function Ll(e, t, n) {
		t = Os(n, t), t = js(e, t, 1), e = co(e, t, 1), t = fl(), e !== null && (Ut(e, 1, t), hl(e, t));
	}
	function $(e, t, n) {
		if (e.tag === 3) Ll(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Ll(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (il === null || !il.has(r))) {
					e = Os(n, e), e = Ms(t, e, 1), t = co(t, e, 1), e = fl(), t !== null && (Ut(t, 1, e), hl(t, e));
					break;
				}
			}
			t = t.return;
		}
	}
	function Rl(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), t = fl(), e.pingedLanes |= e.suspendedLanes & n, Y === e && (Z & n) === n && (Q === 4 || Q === 3 && (Z & 130023424) === Z && 500 > F() - $c ? Tl(e, 0) : Xc |= n), hl(e, t);
	}
	function zl(e, t) {
		t === 0 && (e.mode & 1 ? (t = Ft, Ft <<= 1, !(Ft & 130023424) && (Ft = 4194304)) : t = 1);
		var n = fl();
		e = ro(e, t), e !== null && (Ut(e, t, n), hl(e, n));
	}
	function Bl(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), zl(e, n);
	}
	function Vl(e, t) {
		var n = 0;
		switch (e.tag) {
			case 13:
				var i = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				i = e.stateNode;
				break;
			default: throw Error(r(314));
		}
		i !== null && i.delete(t), zl(e, n);
	}
	var Hl = function(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps || Qi.current) Ls = !0;
			else {
				if ((e.lanes & n) === 0 && !(t.flags & 128)) return Ls = !1, oc(e, t, n);
				Ls = !!(e.flags & 131072);
			}
		} else Ls = !1, V && t.flags & 1048576 && Ca(t, ga, t.index);
		switch (t.lanes = 0, t.tag) {
			case 2:
				var i = t.type;
				ic(e, t), e = t.pendingProps;
				var a = ea(t, B.current);
				Qa(t, n), a = Fo(null, t, i, e, a, n);
				var o = Io();
				return t.flags |= 1, typeof a == "object" && a && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ta(i) ? (o = !0, aa(t)) : o = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, ao(t), a.updater = Cs, t.stateNode = a, a._reactInternals = t, Ds(t, i, e, n), t = Ks(null, t, i, !0, o, n)) : (t.tag = 0, V && o && wa(t), Rs(null, t, a, n), t = t.child), t;
			case 16:
				i = t.elementType;
				a: {
					switch (ic(e, t), e = t.pendingProps, a = i._init, i = a(i._payload), t.type = i, a = t.tag = ql(i), e = xs(i, e), a) {
						case 0:
							t = Ws(null, t, i, e, n);
							break a;
						case 1:
							t = Gs(null, t, i, e, n);
							break a;
						case 11:
							t = zs(null, t, i, e, n);
							break a;
						case 14:
							t = Bs(null, t, i, xs(i.type, e), n);
							break a;
					}
					throw Error(r(306, i, ""));
				}
				return t;
			case 0: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : xs(i, a), Ws(e, t, i, a, n);
			case 1: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : xs(i, a), Gs(e, t, i, a, n);
			case 3:
				a: {
					if (qs(t), e === null) throw Error(r(387));
					i = t.pendingProps, o = t.memoizedState, a = o.element, oo(e, t), fo(t, i, null, n);
					var s = t.memoizedState;
					if (i = s.element, o.isDehydrated) {
						if (o = {
							element: i,
							isDehydrated: !1,
							cache: s.cache,
							pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
							transitions: s.transitions
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							a = Os(Error(r(423)), t), t = Js(e, t, i, n, a);
							break a;
						}
						if (i !== a) {
							a = Os(Error(r(424)), t), t = Js(e, t, i, n, a);
							break a;
						}
						for (Da = Fi(t.stateNode.containerInfo.firstChild), Ea = t, V = !0, Oa = null, n = Wa(t, null, i, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Ia(), i === a) {
							t = ac(e, t, n);
							break a;
						}
						Rs(e, t, i, n);
					}
					t = t.child;
				}
				return t;
			case 5: return xo(t), e === null && Ma(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, s = a.children, Oi(i, a) ? s = null : o !== null && Oi(i, o) && (t.flags |= 32), Us(e, t), Rs(e, t, s, n), t.child;
			case 6: return e === null && Ma(t), null;
			case 13: return Zs(e, t, n);
			case 4: return yo(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Ua(t, null, i, n) : Rs(e, t, i, n), t.child;
			case 11: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : xs(i, a), zs(e, t, i, a, n);
			case 7: return Rs(e, t, t.pendingProps, n), t.child;
			case 8: return Rs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Rs(e, t, t.pendingProps.children, n), t.child;
			case 10:
				a: {
					if (i = t.type._context, a = t.pendingProps, o = t.memoizedProps, s = a.value, z(Ga, i._currentValue), i._currentValue = s, o !== null) {
						if (Pr(o.value, s)) {
							if (o.children === a.children && !Qi.current) {
								t = ac(e, t, n);
								break a;
							}
						} else for (o = t.child, o !== null && (o.return = t); o !== null;) {
							var c = o.dependencies;
							if (c !== null) {
								s = o.child;
								for (var l = c.firstContext; l !== null;) {
									if (l.context === i) {
										if (o.tag === 1) {
											l = so(-1, n & -n), l.tag = 2;
											var u = o.updateQueue;
											if (u !== null) {
												u = u.shared;
												var d = u.pending;
												d === null ? l.next = l : (l.next = d.next, d.next = l), u.pending = l;
											}
										}
										o.lanes |= n, l = o.alternate, l !== null && (l.lanes |= n), Za(o.return, n, t), c.lanes |= n;
										break;
									}
									l = l.next;
								}
							} else if (o.tag === 10) s = o.type === t.type ? null : o.child;
							else if (o.tag === 18) {
								if (s = o.return, s === null) throw Error(r(341));
								s.lanes |= n, c = s.alternate, c !== null && (c.lanes |= n), Za(s, n, t), s = o.sibling;
							} else s = o.child;
							if (s !== null) s.return = o;
							else for (s = o; s !== null;) {
								if (s === t) {
									s = null;
									break;
								}
								if (o = s.sibling, o !== null) {
									o.return = s.return, s = o;
									break;
								}
								s = s.return;
							}
							o = s;
						}
					}
					Rs(e, t, a.children, n), t = t.child;
				}
				return t;
			case 9: return a = t.type, i = t.pendingProps.children, Qa(t, n), a = $a(a), i = i(a), t.flags |= 1, Rs(e, t, i, n), t.child;
			case 14: return i = t.type, a = xs(i, t.pendingProps), a = xs(i.type, a), Bs(e, t, i, a, n);
			case 15: return Vs(e, t, t.type, t.pendingProps, n);
			case 17: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : xs(i, a), ic(e, t), t.tag = 1, ta(i) ? (e = !0, aa(t)) : e = !1, Qa(t, n), Ts(t, i, a), Ds(t, i, a, n), Ks(null, t, i, !0, e, n);
			case 19: return rc(e, t, n);
			case 22: return Hs(e, t, n);
		}
		throw Error(r(156, t.tag));
	};
	function Ul(e, t) {
		return _t(e, t);
	}
	function Wl(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Gl(e, t, n, r) {
		return new Wl(e, t, n, r);
	}
	function Kl(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ql(e) {
		if (typeof e == "function") return +!!Kl(e);
		if (e != null) {
			if (e = e.$$typeof, e === re) return 11;
			if (e === k) return 14;
		}
		return 2;
	}
	function Jl(e, t) {
		var n = e.alternate;
		return n === null ? (n = Gl(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
	}
	function Yl(e, t, n, i, a, o) {
		var s = 2;
		if (i = e, typeof e == "function") Kl(e) && (s = 1);
		else if (typeof e == "string") s = 5;
		else a: switch (e) {
			case te: return Xl(n.children, a, o, t);
			case ne:
				s = 8, a |= 8;
				break;
			case T: return e = Gl(12, n, t, a | 2), e.elementType = T, e.lanes = o, e;
			case O: return e = Gl(13, n, t, a), e.elementType = O, e.lanes = o, e;
			case ie: return e = Gl(19, n, t, a), e.elementType = ie, e.lanes = o, e;
			case ae: return Zl(n, a, o, t);
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case E:
						s = 10;
						break a;
					case D:
						s = 9;
						break a;
					case re:
						s = 11;
						break a;
					case k:
						s = 14;
						break a;
					case A:
						s = 16, i = null;
						break a;
				}
				throw Error(r(130, e == null ? e : typeof e, ""));
		}
		return t = Gl(s, n, t, a), t.elementType = e, t.type = i, t.lanes = o, t;
	}
	function Xl(e, t, n, r) {
		return e = Gl(7, e, r, t), e.lanes = n, e;
	}
	function Zl(e, t, n, r) {
		return e = Gl(22, e, r, t), e.elementType = ae, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
	}
	function Ql(e, t, n) {
		return e = Gl(6, e, null, t), e.lanes = n, e;
	}
	function $l(e, t, n) {
		return t = Gl(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	function eu(e, t, n, r, i) {
		this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ht(0), this.expirationTimes = Ht(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ht(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
	}
	function tu(e, t, n, r, i, a, o, s, c) {
		return e = new eu(e, t, n, s, c), t === 1 ? (t = 1, !0 === a && (t |= 8)) : t = 0, a = Gl(3, null, null, t), e.current = a, a.stateNode = e, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null
		}, ao(a), e;
	}
	function nu(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: ee,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	function ru(e) {
		if (!e) return Zi;
		e = e._reactInternals;
		a: {
			if (dt(e) !== e || e.tag !== 1) throw Error(r(170));
			var t = e;
			do {
				switch (t.tag) {
					case 3:
						t = t.stateNode.context;
						break a;
					case 1: if (ta(t.type)) {
						t = t.stateNode.__reactInternalMemoizedMergedChildContext;
						break a;
					}
				}
				t = t.return;
			} while (t !== null);
			throw Error(r(171));
		}
		if (e.tag === 1) {
			var n = e.type;
			if (ta(n)) return ia(e, n, t);
		}
		return t;
	}
	function iu(e, t, n, r, i, a, o, s, c) {
		return e = tu(n, r, !0, e, i, a, o, s, c), e.context = ru(null), n = e.current, r = fl(), i = pl(n), a = so(r, i), a.callback = t ?? null, co(n, a, i), e.current.lanes = i, Ut(e, i, r), hl(e, r), e;
	}
	function au(e, t, n, r) {
		var i = t.current, a = fl(), o = pl(i);
		return n = ru(n), t.context === null ? t.context = n : t.pendingContext = n, t = so(a, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = co(i, t, o), e !== null && (ml(e, i, o, a), lo(e, i, o)), o;
	}
	function ou(e) {
		if (e = e.current, !e.child) return null;
		switch (e.child.tag) {
			case 5: return e.child.stateNode;
			default: return e.child.stateNode;
		}
	}
	function su(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function cu(e, t) {
		su(e, t), (e = e.alternate) && su(e, t);
	}
	function lu() {
		return null;
	}
	var uu = typeof reportError == "function" ? reportError : function(e) {};
	function du(e) {
		this._internalRoot = e;
	}
	fu.prototype.render = du.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(r(409));
		au(e, t, null, null);
	}, fu.prototype.unmount = du.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			Cl(function() {
				au(null, e, null, null);
			}), t[Bi] = null;
		}
	};
	function fu(e) {
		this._internalRoot = e;
	}
	fu.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Xt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < on.length && t !== 0 && t < on[n].priority; n++);
			on.splice(n, 0, e), n === 0 && dn(e);
		}
	};
	function pu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function mu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
	}
	function hu() {}
	function gu(e, t, n, r, i) {
		if (i) {
			if (typeof r == "function") {
				var a = r;
				r = function() {
					var e = ou(o);
					a.call(e);
				};
			}
			var o = iu(t, r, e, 0, null, !1, !1, "", hu);
			return e._reactRootContainer = o, e[Bi] = o.current, mi(e.nodeType === 8 ? e.parentNode : e), Cl(), o;
		}
		for (; i = e.lastChild;) e.removeChild(i);
		if (typeof r == "function") {
			var s = r;
			r = function() {
				var e = ou(c);
				s.call(e);
			};
		}
		var c = tu(e, 0, !1, null, null, !1, !1, "", hu);
		return e._reactRootContainer = c, e[Bi] = c.current, mi(e.nodeType === 8 ? e.parentNode : e), Cl(function() {
			au(t, c, n, r);
		}), c;
	}
	function _u(e, t, n, r, i) {
		var a = n._reactRootContainer;
		if (a) {
			var o = a;
			if (typeof i == "function") {
				var s = i;
				i = function() {
					var e = ou(o);
					s.call(e);
				};
			}
			au(t, o, e, i);
		} else o = gu(n, t, e, i, r);
		return ou(o);
	}
	qt = function(e) {
		switch (e.tag) {
			case 3:
				var t = e.stateNode;
				if (t.current.memoizedState.isDehydrated) {
					var n = It(t.pendingLanes);
					n !== 0 && (Gt(t, n | 1), hl(t, F()), !(J & 6) && (el = F() + 500, fa()));
				}
				break;
			case 13: Cl(function() {
				var t = ro(e, 1);
				t !== null && ml(t, e, 1, fl());
			}), cu(e, 1);
		}
	}, Jt = function(e) {
		if (e.tag === 13) {
			var t = ro(e, 134217728);
			t !== null && ml(t, e, 134217728, fl()), cu(e, 134217728);
		}
	}, Yt = function(e) {
		if (e.tag === 13) {
			var t = pl(e), n = ro(e, t);
			n !== null && ml(n, e, t, fl()), cu(e, t);
		}
	}, Xt = function() {
		return I;
	}, Zt = function(e, t) {
		var n = I;
		try {
			return I = e, t();
		} finally {
			I = n;
		}
	}, We = function(e, t, n) {
		switch (t) {
			case "input":
				if (Ce(e, n), t = n.name, n.type === "radio" && t != null) {
					for (n = e; n.parentNode;) n = n.parentNode;
					for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + "][type=\"radio\"]"), t = 0; t < n.length; t++) {
						var i = n[t];
						if (i !== e && i.form === e.form) {
							var a = qi(i);
							if (!a) throw Error(r(90));
							ve(i), Ce(i, a);
						}
					}
				}
				break;
			case "textarea":
				ke(e, n);
				break;
			case "select": t = n.value, t != null && N(e, !!n.multiple, t, !1);
		}
	}, Xe = Sl, Ze = Cl;
	var vu = {
		usingClientEntryPoint: !1,
		Events: [
			Gi,
			Ki,
			qi,
			Je,
			Ye,
			Sl
		]
	}, yu = {
		findFiberByHostInstance: Wi,
		bundleType: 0,
		version: "18.3.1",
		rendererPackageName: "react-dom"
	}, bu = {
		bundleType: yu.bundleType,
		version: yu.version,
		rendererPackageName: yu.rendererPackageName,
		rendererConfig: yu.rendererConfig,
		overrideHookState: null,
		overrideHookStateDeletePath: null,
		overrideHookStateRenamePath: null,
		overrideProps: null,
		overridePropsDeletePath: null,
		overridePropsRenamePath: null,
		setErrorHandler: null,
		setSuspenseHandler: null,
		scheduleUpdate: null,
		currentDispatcherRef: C.ReactCurrentDispatcher,
		findHostInstanceByFiber: function(e) {
			return e = ht(e), e === null ? null : e.stateNode;
		},
		findFiberByHostInstance: yu.findFiberByHostInstance || lu,
		findHostInstancesForRefresh: null,
		scheduleRefresh: null,
		scheduleRoot: null,
		setRefreshHandler: null,
		getCurrentFiber: null,
		reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var xu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!xu.isDisabled && xu.supportsFiber) try {
			Dt = xu.inject(bu), Ot = xu;
		} catch {}
	}
	e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vu, e.createPortal = function(e, t) {
		var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!pu(t)) throw Error(r(200));
		return nu(e, t, null, n);
	}, e.createRoot = function(e, t) {
		if (!pu(e)) throw Error(r(299));
		var n = !1, i = "", a = uu;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = tu(e, 1, !1, null, null, n, !1, i, a), e[Bi] = t.current, mi(e.nodeType === 8 ? e.parentNode : e), new du(t);
	}, e.findDOMNode = function(e) {
		if (e == null) return null;
		if (e.nodeType === 1) return e;
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
		return e = ht(t), e = e === null ? null : e.stateNode, e;
	}, e.flushSync = function(e) {
		return Cl(e);
	}, e.hydrate = function(e, t, n) {
		if (!mu(t)) throw Error(r(200));
		return _u(null, e, t, !0, n);
	}, e.hydrateRoot = function(e, t, n) {
		if (!pu(e)) throw Error(r(405));
		var i = n != null && n.hydratedSources || null, a = !1, o = "", s = uu;
		if (n != null && (!0 === n.unstable_strictMode && (a = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = iu(t, null, e, 1, n ?? null, a, !1, o, s), e[Bi] = t.current, mi(e), i) for (e = 0; e < i.length; e++) n = i[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(n, a);
		return new fu(t);
	}, e.render = function(e, t, n) {
		if (!mu(t)) throw Error(r(200));
		return _u(null, e, t, !1, n);
	}, e.unmountComponentAtNode = function(e) {
		if (!mu(e)) throw Error(r(40));
		return e._reactRootContainer ? (Cl(function() {
			_u(null, null, e, !1, function() {
				e._reactRootContainer = null, e[Bi] = null;
			});
		}), !0) : !1;
	}, e.unstable_batchedUpdates = Sl, e.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
		if (!mu(n)) throw Error(r(200));
		if (e == null || e._reactInternals === void 0) throw Error(r(38));
		return _u(e, t, n, !1, i);
	}, e.version = "18.3.1-next-f1338f8080-20240426";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch {}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = m();
	e.createRoot = t.createRoot, e.hydrateRoot = t.hydrateRoot;
})), g = /* @__PURE__ */ c(u(), 1), _ = h();
//#endregion
//#region src/lib/utils.js
function v(...e) {
	return e.filter(Boolean).join(" ");
}
//#endregion
//#region node_modules/.pnpm/react@18.3.1/node_modules/react/cjs/react-jsx-runtime.production.min.js
var y = /* @__PURE__ */ o(((e) => {
	var t = u(), n = Symbol.for("react.element"), r = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function s(e, t, r) {
		var s, c = {}, l = null, u = null;
		for (s in r !== void 0 && (l = "" + r), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (u = t.ref), t) i.call(t, s) && !o.hasOwnProperty(s) && (c[s] = t[s]);
		if (e && e.defaultProps) for (s in t = e.defaultProps, t) c[s] === void 0 && (c[s] = t[s]);
		return {
			$$typeof: n,
			type: e,
			key: l,
			ref: u,
			props: c,
			_owner: a.current
		};
	}
	e.Fragment = r, e.jsx = s, e.jsxs = s;
})), b = (/* @__PURE__ */ o(((e, t) => {
	t.exports = y();
})))();
function x({ children: e, variant: t = "default", size: n = "md", className: r = "", ...i }) {
	return /* @__PURE__ */ (0, b.jsx)("button", {
		className: v("button", `button-${t}`, `button-${n}`, r),
		...i,
		children: e
	});
}
//#endregion
//#region src/components/ui/badge.jsx
function S({ children: e, tone: t = "neutral", dot: n = !1, className: r = "" }) {
	return /* @__PURE__ */ (0, b.jsxs)("span", {
		className: v("badge", `badge-${t}`, r),
		children: [n && /* @__PURE__ */ (0, b.jsx)("i", {}), e]
	});
}
//#endregion
//#region src/components/ui/card.jsx
function C({ children: e, className: t = "", ...n }) {
	return /* @__PURE__ */ (0, b.jsx)("section", {
		className: v("card", t),
		...n,
		children: e
	});
}
//#endregion
//#region node_modules/.pnpm/lucide-react@0.468.0_react@18.3.1/node_modules/lucide-react/dist/esm/shared/src/utils.js
var w = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ee = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), te = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, ne = (0, g.forwardRef)(({ color: e = "currentColor", size: t = 24, strokeWidth: n = 2, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => (0, g.createElement)("svg", {
	ref: c,
	...te,
	width: t,
	height: t,
	stroke: e,
	strokeWidth: r ? Number(n) * 24 / Number(t) : n,
	className: ee("lucide", i),
	...s
}, [...o.map(([e, t]) => (0, g.createElement)(e, t)), ...Array.isArray(a) ? a : [a]])), T = (e, t) => {
	let n = (0, g.forwardRef)(({ className: n, ...r }, i) => (0, g.createElement)(ne, {
		ref: i,
		iconNode: t,
		className: ee(`lucide-${w(e)}`, n),
		...r
	}));
	return n.displayName = `${e}`, n;
}, E = T("Activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]), D = T("ArrowRight", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), re = T("AudioLines", [
	["path", {
		d: "M2 10v3",
		key: "1fnikh"
	}],
	["path", {
		d: "M6 6v11",
		key: "11sgs0"
	}],
	["path", {
		d: "M10 3v18",
		key: "yhl04a"
	}],
	["path", {
		d: "M14 8v7",
		key: "3a1oy3"
	}],
	["path", {
		d: "M18 5v13",
		key: "123xd1"
	}],
	["path", {
		d: "M22 10v3",
		key: "154ddg"
	}]
]), O = T("Bus", [
	["path", {
		d: "M8 6v6",
		key: "18i7km"
	}],
	["path", {
		d: "M15 6v6",
		key: "1sg6z9"
	}],
	["path", {
		d: "M2 12h19.6",
		key: "de5uta"
	}],
	["path", {
		d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",
		key: "1wwztk"
	}],
	["circle", {
		cx: "7",
		cy: "18",
		r: "2",
		key: "19iecd"
	}],
	["path", {
		d: "M9 18h5",
		key: "lrx6i"
	}],
	["circle", {
		cx: "16",
		cy: "18",
		r: "2",
		key: "1v4tcr"
	}]
]), ie = T("CalendarDays", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}],
	["path", {
		d: "M8 14h.01",
		key: "6423bh"
	}],
	["path", {
		d: "M12 14h.01",
		key: "1etili"
	}],
	["path", {
		d: "M16 14h.01",
		key: "1gbofw"
	}],
	["path", {
		d: "M8 18h.01",
		key: "lrp35t"
	}],
	["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}],
	["path", {
		d: "M16 18h.01",
		key: "kzsmim"
	}]
]), k = T("CheckCheck", [["path", {
	d: "M18 6 7 17l-5-5",
	key: "116fxf"
}], ["path", {
	d: "m22 10-7.5 7.5L13 16",
	key: "ke71qq"
}]]), A = T("Check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), ae = T("ChevronDown", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), oe = T("CircleAlert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]), se = T("CircleCheck", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), j = T("Clock3", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["polyline", {
	points: "12 6 12 12 16.5 12",
	key: "1aq6pp"
}]]), ce = T("Copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]), le = T("Download", [
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["polyline", {
		points: "7 10 12 15 17 10",
		key: "2ggqvy"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "15",
		y2: "3",
		key: "1vk2je"
	}]
]), ue = T("Ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]), de = T("FileAudio", [
	["path", {
		d: "M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
		key: "rslqgf"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0",
		key: "9f7x3i"
	}]
]), fe = T("FileImage", [
	["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["circle", {
		cx: "10",
		cy: "12",
		r: "2",
		key: "737tya"
	}],
	["path", {
		d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",
		key: "wt3hpn"
	}]
]), pe = T("FileText", [
	["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]), me = T("Filter", [["polygon", {
	points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",
	key: "1yg77f"
}]]), M = T("Gauge", [["path", {
	d: "m12 14 4-4",
	key: "9kzdfg"
}], ["path", {
	d: "M3.34 19a10 10 0 1 1 17.32 0",
	key: "19p75a"
}]]), he = T("Languages", [
	["path", {
		d: "m5 8 6 6",
		key: "1wu5hv"
	}],
	["path", {
		d: "m4 14 6-6 2-3",
		key: "1k1g8d"
	}],
	["path", {
		d: "M2 5h12",
		key: "or177f"
	}],
	["path", {
		d: "M7 2h1",
		key: "1t2jsx"
	}],
	["path", {
		d: "m22 22-5-10-5 10",
		key: "don7ne"
	}],
	["path", {
		d: "M14 18h6",
		key: "1m8k6r"
	}]
]), ge = T("LayoutDashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]), _e = T("Link2", [
	["path", {
		d: "M9 17H7A5 5 0 0 1 7 7h2",
		key: "8i5ue5"
	}],
	["path", {
		d: "M15 7h2a5 5 0 1 1 0 10h-2",
		key: "1b9ql8"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "12",
		y2: "12",
		key: "1jonct"
	}]
]), ve = T("ListChecks", [
	["path", {
		d: "m3 17 2 2 4-4",
		key: "1jhpwq"
	}],
	["path", {
		d: "m3 7 2 2 4-4",
		key: "1obspn"
	}],
	["path", {
		d: "M13 6h8",
		key: "15sg57"
	}],
	["path", {
		d: "M13 12h8",
		key: "h98zly"
	}],
	["path", {
		d: "M13 18h8",
		key: "oe0vm4"
	}]
]), ye = T("LoaderCircle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), be = T("Menu", [
	["line", {
		x1: "4",
		x2: "20",
		y1: "12",
		y2: "12",
		key: "1e0a9i"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "6",
		y2: "6",
		key: "1owob3"
	}],
	["line", {
		x1: "4",
		x2: "20",
		y1: "18",
		y2: "18",
		key: "yk5zj1"
	}]
]), xe = T("Mic", [
	["path", {
		d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",
		key: "131961"
	}],
	["path", {
		d: "M19 10v2a7 7 0 0 1-14 0v-2",
		key: "1vc78b"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "19",
		y2: "22",
		key: "x3vr5v"
	}]
]), Se = T("Play", [["polygon", {
	points: "6 3 20 12 6 21 6 3",
	key: "1oa8hb"
}]]), Ce = T("Plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), we = T("RefreshCw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]), Te = T("Search", [["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}], ["path", {
	d: "m21 21-4.3-4.3",
	key: "1qie3q"
}]]), Ee = T("ShieldAlert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]), N = T("ShieldCheck", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), De = T("Sparkles", [
	["path", {
		d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
		key: "4pj2yx"
	}],
	["path", {
		d: "M20 3v4",
		key: "1olli1"
	}],
	["path", {
		d: "M22 5h-4",
		key: "1gvqau"
	}],
	["path", {
		d: "M4 17v2",
		key: "vumght"
	}],
	["path", {
		d: "M5 18H3",
		key: "zchphs"
	}]
]), Oe = T("Square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]), ke = T("TriangleAlert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), Ae = T("Upload", [
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["polyline", {
		points: "17 8 12 3 7 8",
		key: "t8dd8p"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "3",
		y2: "15",
		key: "widbto"
	}]
]), je = T("X", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), Me = T("Zap", [["path", {
	d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
	key: "1xq2db"
}]]), Ne = [
	{
		id: "report",
		label: "Report an issue",
		icon: Ce
	},
	{
		id: "overview",
		label: "Overview",
		icon: ge
	},
	{
		id: "exceptions",
		label: "Exceptions",
		icon: Ee
	},
	{
		id: "tracker",
		label: "Action tracker",
		icon: ve
	},
	{
		id: "insights",
		label: "Regional insights",
		icon: E
	},
	{
		id: "brief",
		label: "Daily brief",
		icon: pe
	}
], Pe = [
	"Mumbai",
	"Delhi NCR",
	"Bengaluru",
	"Pune",
	"Hyderabad",
	"Ahmedabad"
], Fe = [
	"Fleet Coordinator",
	"Regional Operations Manager",
	"Ground Operations",
	"Safety Team"
], Ie = () => {};
function Le(e, t = {}) {
	let n = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
	Ie({
		type: e,
		event_id: n,
		...t
	});
}
function Re(e = "Operations") {
	return e.split(/\s+/).map((e) => e[0]).slice(0, 2).join("").toUpperCase();
}
function ze(e) {
	return e ? new Date(String(e).length <= 10 ? `${e}T00:00:00` : e).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short"
	}) : "—";
}
function P(e) {
	if (!e) return 0;
	let t = new Date(String(e).length <= 10 ? `${e}T00:00:00` : e), n = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), r = /* @__PURE__ */ new Date();
	return r.setHours(0, 0, 0, 0), Math.round((r.getTime() - n) / 864e5);
}
function Be({ payload: e, setTriggerValue: t }) {
	Ie = (e) => t("event", e);
	let [n, r] = (0, g.useState)(e || {}), [i, a] = (0, g.useState)("report"), [o, s] = (0, g.useState)("All regions"), [c, l] = (0, g.useState)({
		q: "",
		region: "All regions",
		status: "All statuses",
		category: "All types"
	}), [u, d] = (0, g.useState)(!1), [f, p] = (0, g.useState)(null), [m, h] = (0, g.useState)(""), [_, y] = (0, g.useState)(""), [x, S] = (0, g.useState)({
		text: "",
		type: "Other",
		region: "Mumbai",
		language: "Auto-detect",
		reporter: "Field reporter"
	}), [w, ee] = (0, g.useState)("en"), [te, ne] = (0, g.useState)(0), [T, E] = (0, g.useState)(""), [re, O] = (0, g.useState)(!1), [ie, k] = (0, g.useState)(!1), [A, oe] = (0, g.useState)(!1), j = (0, g.useRef)(null), ce = (0, g.useRef)(null), le = (0, g.useRef)(null), de = (0, g.useRef)(null);
	(0, g.useEffect)(() => {
		let t = e || {};
		r(t), a(t.page || "report"), t.toast && E(t.toast);
	}, [e]), (0, g.useEffect)(() => {
		if (!u) return;
		let e = window.setInterval(() => ne((e) => e + 1), 1e3);
		return () => window.clearInterval(e);
	}, [u]), (0, g.useEffect)(() => {
		if (!T) return;
		let e = window.setTimeout(() => E(""), 4800);
		return () => window.clearTimeout(e);
	}, [T]);
	let fe = n.reports || [], pe = n.actions || [], me = n.metrics || {};
	n.integration;
	let M = i || n.page || "report", he = n.pending_report, ge = (0, g.useMemo)(() => pe.filter((e) => {
		let t = c.q.toLowerCase(), n = !t || [
			e.summary,
			e.bus_id,
			e.region,
			e.owner,
			e.action_id
		].some((e) => String(e || "").toLowerCase().includes(t)), r = c.region === "All regions" || e.region === c.region, i = c.status === "All statuses" || e.status === c.status, a = c.category === "All types" || e.category === c.category;
		return n && r && i && a;
	}), [pe, c]);
	function _e(e) {
		a(e), O(!1), Le("navigate", { page: e });
	}
	function ve() {
		ce.current?.getTracks().forEach((e) => e.stop()), ce.current = null;
	}
	async function ye() {
		try {
			let e = await navigator.mediaDevices.getUserMedia({ audio: !0 });
			ce.current = e;
			let t = new MediaRecorder(e), n = [];
			t.ondataavailable = (e) => {
				e.data.size && n.push(e.data);
			}, t.onstop = () => {
				let e = new Blob(n, { type: t.mimeType || "audio/webm" });
				p(e), h(URL.createObjectURL(e)), d(!1), ve();
			}, t.start(), j.current = t, ne(0), d(!0);
		} catch {
			E("Microphone access was unavailable. You can upload an audio file instead.");
		}
	}
	function xe() {
		j.current?.state !== "inactive" && j.current?.stop();
	}
	function Se(e) {
		return new Promise((t, n) => {
			let r = new FileReader();
			r.onload = () => t(String(r.result).split(",")[1] || ""), r.onerror = n, r.readAsDataURL(e);
		});
	}
	async function Ce() {
		if (!x.text.trim() && !f && !de.current?.files?.[0]) {
			E(w === "hi" ? "आगे बढ़ने के लिए आवाज़ रिकॉर्ड करें या छोटा विवरण लिखें।" : "Add a voice note or a short description to continue.");
			return;
		}
		k(!0);
		try {
			let e = le.current?.files?.[0], t = de.current?.files?.[0];
			Le("analyze_report", {
				text: x.text,
				selected_type: x.type,
				region: x.region,
				language: x.language,
				reporter: x.reporter,
				audio_base64: f ? await Se(f) : t ? await Se(t) : "",
				attachment_base64: e ? await Se(e) : "",
				attachment_name: e?.name || ""
			}), E(w === "hi" ? "रिपोर्ट मिली। दर्ज करने से पहले निकाली गई जानकारी जाँचें।" : "Report received. Review the detected details before it is logged.");
		} catch {
			E(w === "hi" ? "फ़ाइल पढ़ी नहीं जा सकी। दूसरी रिकॉर्डिंग या तस्वीर आज़माएँ।" : "We couldn't read that file. Try another recording or image.");
		}
		k(!1);
	}
	function we(e, t) {
		Le("update_action", { action: {
			...e,
			...t
		} });
	}
	function Te(e) {
		_e(e);
	}
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "shell",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("aside", {
				className: v("sidebar", re && "sidebar-open"),
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "brand",
						children: [/* @__PURE__ */ (0, b.jsx)("div", {
							className: "flixbus-logo-wrap",
							children: /* @__PURE__ */ (0, b.jsx)("img", {
								src: "https://cdn.brandfetch.io/flixbus.no/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed",
								alt: "FlixBus",
								onError: (e) => {
									e.currentTarget.style.display = "none", e.currentTarget.parentElement.classList.add("logo-fallback");
								}
							})
						}), /* @__PURE__ */ (0, b.jsx)("button", {
							className: "mobile-close icon-button",
							onClick: () => O(!1),
							children: /* @__PURE__ */ (0, b.jsx)(je, { size: 17 })
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "workspace-pill",
						children: [
							/* @__PURE__ */ (0, b.jsx)("div", { className: "workspace-pulse" }),
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: "India Operations" }), /* @__PURE__ */ (0, b.jsx)("span", { children: "Showcase workspace" })] }),
							/* @__PURE__ */ (0, b.jsx)(ae, { size: 14 })
						]
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "nav-label",
						children: "WORKSPACE"
					}),
					/* @__PURE__ */ (0, b.jsx)("nav", {
						className: "nav-list",
						children: Ne.map(({ id: e, label: t, icon: n }) => /* @__PURE__ */ (0, b.jsxs)("button", {
							onClick: () => Te(e),
							className: v("nav-link", M === e && "nav-active"),
							children: [
								/* @__PURE__ */ (0, b.jsx)(n, { size: 18 }),
								/* @__PURE__ */ (0, b.jsx)("span", { children: t }),
								e === "exceptions" && me.overdue_actions > 0 && /* @__PURE__ */ (0, b.jsx)("em", { children: Math.min(me.overdue_actions, 99) })
							]
						}, e))
					}),
					/* @__PURE__ */ (0, b.jsx)("div", { className: "sidebar-spacer" }),
					/* @__PURE__ */ (0, b.jsxs)(C, {
						className: "sidebar-help",
						children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "help-icon",
								children: /* @__PURE__ */ (0, b.jsx)(De, { size: 17 })
							}),
							/* @__PURE__ */ (0, b.jsx)("strong", { children: "Built for the field" }),
							/* @__PURE__ */ (0, b.jsx)("p", { children: "Turn unstructured reports into clear, owned actions." }),
							/* @__PURE__ */ (0, b.jsxs)("button", {
								onClick: () => Te("report"),
								children: ["Create a report ", /* @__PURE__ */ (0, b.jsx)(D, { size: 14 })]
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "sidebar-profile",
						children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "avatar",
								children: "OP"
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "profile-info",
								children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: "Operations team" }), /* @__PURE__ */ (0, b.jsx)("span", { children: "Demo workspace" })]
							}),
							/* @__PURE__ */ (0, b.jsx)(ue, { size: 18 })
						]
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "sidebar-brand-note",
						children: "Independent portfolio concept · Not an official Flix product"
					})
				]
			}),
			re && /* @__PURE__ */ (0, b.jsx)("button", {
				className: "mobile-overlay",
				"aria-label": "Close menu",
				onClick: () => O(!1)
			}),
			/* @__PURE__ */ (0, b.jsx)("main", {
				className: "main",
				children: /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "page-wrap",
					children: [
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "mobile-menu-trigger icon-button",
							onClick: () => O(!0),
							"aria-label": "Open navigation",
							children: /* @__PURE__ */ (0, b.jsx)(be, { size: 20 })
						}),
						M === "overview" && /* @__PURE__ */ (0, b.jsx)(Ve, {
							payload: n,
							actions: pe,
							reports: fe,
							navigate: _e,
							selectedRegion: o,
							setSelectedRegion: s
						}),
						M === "exceptions" && /* @__PURE__ */ (0, b.jsx)(Je, {
							actions: pe,
							reports: fe,
							navigate: _e
						}),
						M === "tracker" && /* @__PURE__ */ (0, b.jsx)(Ze, {
							rows: ge,
							filter: c,
							setFilter: l,
							onSave: we,
							navigate: _e
						}),
						M === "report" && /* @__PURE__ */ (0, b.jsx)(Qe, {
							draft: x,
							setDraft: S,
							uiLanguage: w,
							setUiLanguage: ee,
							recording: u,
							recordSeconds: te,
							startRecording: ye,
							stopRecording: xe,
							audioUrl: m,
							audioRef: de,
							photoRef: le,
							preview: _,
							setPreview: y,
							onSubmit: Ce,
							busy: ie
						}),
						M === "confirm" && /* @__PURE__ */ (0, b.jsx)(et, {
							pending: he,
							navigate: _e,
							uiLanguage: w,
							onConfirm: (e) => Le("confirm_report", { fields: e })
						}),
						M === "insights" && /* @__PURE__ */ (0, b.jsx)(tt, {
							payload: n,
							actions: pe,
							reports: fe
						}),
						M === "brief" && /* @__PURE__ */ (0, b.jsx)(rt, {
							payload: n,
							actions: pe,
							reports: fe,
							onRefresh: () => Le("generate_brief"),
							copied: A,
							onCopy: () => {
								navigator.clipboard?.writeText(nt(n, pe)), oe(!0), window.setTimeout(() => oe(!1), 1600);
							}
						}),
						/* @__PURE__ */ (0, b.jsxs)("footer", {
							className: "page-footer",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: w === "hi" && ["report", "confirm"].includes(M) ? "FleetDesk Lite · संचालन कार्यस्थल" : "FleetDesk Lite · Operations workspace" }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [
								/* @__PURE__ */ (0, b.jsx)(N, { size: 13 }),
								" ",
								w === "hi" && ["report", "confirm"].includes(M) ? "AI के सुझावों की जाँच व्यक्ति द्वारा की जाती है" : "AI suggestions are always reviewed by a person"
							] })]
						})
					]
				})
			}),
			T && /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "toast",
				children: [
					/* @__PURE__ */ (0, b.jsx)(se, { size: 17 }),
					/* @__PURE__ */ (0, b.jsx)("span", { children: T }),
					/* @__PURE__ */ (0, b.jsx)("button", {
						className: "icon-button",
						onClick: () => E(""),
						children: /* @__PURE__ */ (0, b.jsx)(je, { size: 15 })
					})
				]
			})
		]
	});
}
function Ve({ payload: e, actions: t, reports: n, navigate: r, selectedRegion: i, setSelectedRegion: a }) {
	let o = i === "All regions" ? t : t.filter((e) => e.region === i), s = i === "All regions" ? n : n.filter((e) => e.region === i), c = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }), l = o.filter((e) => e.status !== "Closed"), u = o.filter((e) => e.status === "Closed"), d = l.filter((e) => e.due_date && String(e.due_date).slice(0, 10) < c), f = l.filter((e) => e.severity === "Critical"), p = {
		reports_today: s.filter((e) => String(e.created_at || "").startsWith(c)).length,
		pending_review: s.filter((e) => String(e.review_status || "").toLowerCase().includes("pending")).length,
		open_actions: l.length,
		closed_actions: u.length,
		overdue_actions: d.length,
		critical_actions: f.length,
		closure_rate: o.length ? Math.round(u.length / o.length * 100) : 0
	}, m = ["All regions", ...new Set([...t, ...n].map((e) => e.region).filter(Boolean))], h = i === "All regions" ? e.regions || [] : (e.regions || []).filter((e) => e.region === i), g = d.slice(0, 4), _ = f.slice(0, 3);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "welcome-row",
			children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "eyebrow",
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { className: "eyebrow-dot" }),
						" ",
						(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
							weekday: "long",
							day: "2-digit",
							month: "long",
							year: "numeric"
						}).toUpperCase(),
						" ",
						/* @__PURE__ */ (0, b.jsx)("span", {
							className: "eyebrow-sep",
							children: "·"
						}),
						" SHIFT OVERVIEW"
					]
				}),
				/* @__PURE__ */ (0, b.jsxs)("h1", { children: ["Good morning, team ", /* @__PURE__ */ (0, b.jsx)("span", { children: "☀️" })] }),
				/* @__PURE__ */ (0, b.jsx)("p", { children: "Here’s what needs your attention across the network today." })
			] }), /* @__PURE__ */ (0, b.jsxs)(x, {
				variant: "outline",
				onClick: () => Le("refresh"),
				children: [/* @__PURE__ */ (0, b.jsx)(we, { size: 15 }), " Refresh data"]
			})]
		}),
		e.integration?.google_error ? /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "sync-banner",
			children: [/* @__PURE__ */ (0, b.jsx)(oe, { size: 16 }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: "Google sync needs attention" }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [e.integration.google_error, " New actions remain available in local storage."] })] })]
		}) : !e.integration?.google_connected && /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "demo-banner",
			children: [
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "demo-banner-icon",
					children: /* @__PURE__ */ (0, b.jsx)(De, { size: 17 })
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: "Showcase workspace" }), /* @__PURE__ */ (0, b.jsx)("span", { children: "You're viewing synthetic sample data. Connect Google Sheets to sync live submissions." })] }),
				/* @__PURE__ */ (0, b.jsx)(S, {
					tone: "blue",
					children: "DEMO DATA"
				})
			]
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "overview-region-filter",
			children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: "Network view" }), /* @__PURE__ */ (0, b.jsx)("span", { children: i === "All regions" ? "All regions and operating teams" : `Showing reports and actions for ${i}` })] }), /* @__PURE__ */ (0, b.jsxs)("label", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Region" }), /* @__PURE__ */ (0, b.jsx)("select", {
				value: i,
				onChange: (e) => a(e.target.value),
				children: m.map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e }, e))
			})] })]
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "metric-grid",
			children: [
				/* @__PURE__ */ (0, b.jsx)(He, {
					title: "Reports today",
					value: p.reports_today,
					icon: pe,
					note: `${p.pending_review} waiting for review`,
					accent: "green",
					trend: i === "All regions" ? "+12%" : i
				}),
				/* @__PURE__ */ (0, b.jsx)(He, {
					title: "Open actions",
					value: p.open_actions,
					icon: ve,
					note: `${p.closed_actions} closed this period`,
					accent: "blue",
					trend: `${p.closure_rate}% close rate`
				}),
				/* @__PURE__ */ (0, b.jsx)(He, {
					title: "Overdue",
					value: p.overdue_actions || 0,
					icon: j,
					note: "Needs owner follow-up",
					accent: "amber",
					trend: "Requires attention"
				}),
				/* @__PURE__ */ (0, b.jsx)(He, {
					title: "Critical",
					value: p.critical_actions || 0,
					icon: Ee,
					note: "High-priority open issues",
					accent: "red",
					trend: "Act promptly"
				})
			]
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "overview-grid",
			children: [/* @__PURE__ */ (0, b.jsxs)(C, {
				className: "needs-card",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "card-head",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "Needs attention" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "Exceptions that may need action today" })] }), /* @__PURE__ */ (0, b.jsxs)(x, {
							variant: "ghost",
							size: "sm",
							onClick: () => r("exceptions"),
							children: ["View all ", /* @__PURE__ */ (0, b.jsx)(D, { size: 14 })]
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "attention-list",
						children: [
							_.length ? _.map((e) => /* @__PURE__ */ (0, b.jsx)(Ue, {
								row: e,
								critical: !0
							}, e.action_id)) : /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "empty-line",
								children: [/* @__PURE__ */ (0, b.jsx)(se, { size: 17 }), " No open critical issues. Nice work."]
							}),
							g.map((e) => /* @__PURE__ */ (0, b.jsx)(Ue, {
								row: e,
								overdue: !0
							}, e.action_id)),
							!_.length && !g.length && /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "empty-line",
								children: [/* @__PURE__ */ (0, b.jsx)(k, { size: 17 }), " No overdue actions right now."]
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("button", {
						className: "card-bottom-link",
						onClick: () => r("exceptions"),
						children: ["Open exception centre ", /* @__PURE__ */ (0, b.jsx)(D, { size: 14 })]
					})
				]
			}), /* @__PURE__ */ (0, b.jsxs)(C, {
				className: "regional-card",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "card-head",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: i === "All regions" ? "Regional pulse" : `${i} pulse` }), /* @__PURE__ */ (0, b.jsx)("p", { children: i === "All regions" ? "Open work and overdue actions by region" : "Open work and overdue actions in this region" })] }), /* @__PURE__ */ (0, b.jsxs)(x, {
						variant: "ghost",
						size: "sm",
						onClick: () => r("insights"),
						children: ["Insights ", /* @__PURE__ */ (0, b.jsx)(D, { size: 14 })]
					})]
				}), h.length ? /* @__PURE__ */ (0, b.jsx)(We, { rows: h }) : /* @__PURE__ */ (0, b.jsx)("div", {
					className: "empty-line",
					children: "No regional actions yet."
				})]
			})]
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "bottom-grid",
			children: [/* @__PURE__ */ (0, b.jsxs)(C, {
				className: "activity-card",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "card-head",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "Latest field reports" }), /* @__PURE__ */ (0, b.jsx)("p", { children: i === "All regions" ? "New information coming in from the network" : `Recent reports from ${i}` })] }), /* @__PURE__ */ (0, b.jsxs)(x, {
						variant: "ghost",
						size: "sm",
						onClick: () => r("tracker"),
						children: ["View tracker ", /* @__PURE__ */ (0, b.jsx)(D, { size: 14 })]
					})]
				}), /* @__PURE__ */ (0, b.jsx)(Ge, {
					rows: s.slice(0, 5),
					compact: !0
				})]
			}), /* @__PURE__ */ (0, b.jsxs)(C, {
				className: "brief-teaser",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "brief-teaser-top",
						children: [/* @__PURE__ */ (0, b.jsx)("div", {
							className: "brief-icon",
							children: /* @__PURE__ */ (0, b.jsx)(re, { size: 18 })
						}), /* @__PURE__ */ (0, b.jsx)(S, {
							tone: "green",
							children: "READY"
						})]
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "eyebrow",
						children: i === "All regions" ? "OPERATIONS BRIEF" : `${i.toUpperCase()} BRIEF`
					}),
					/* @__PURE__ */ (0, b.jsx)("h3", { children: i === "All regions" ? "Your daily brief is ready" : `${i} operations brief` }),
					/* @__PURE__ */ (0, b.jsxs)("p", { children: [
						p.open_actions,
						" open · ",
						p.overdue_actions,
						" overdue · ",
						p.critical_actions,
						" critical actions in the selected view."
					] }),
					/* @__PURE__ */ (0, b.jsxs)(x, {
						variant: "dark",
						onClick: () => r("brief"),
						children: ["Open daily brief ", /* @__PURE__ */ (0, b.jsx)(D, { size: 15 })]
					})
				]
			})]
		})
	] });
}
function He({ title: e, value: t, icon: n, note: r, accent: i, trend: a }) {
	return /* @__PURE__ */ (0, b.jsxs)(C, {
		className: `metric-card metric-${i}`,
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "metric-top",
				children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e }), /* @__PURE__ */ (0, b.jsx)("div", {
					className: "metric-icon",
					children: /* @__PURE__ */ (0, b.jsx)(n, { size: 17 })
				})]
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "metric-value",
				children: t
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "metric-footer",
				children: [/* @__PURE__ */ (0, b.jsx)("span", { children: r }), /* @__PURE__ */ (0, b.jsx)("span", {
					className: "metric-trend",
					children: a
				})]
			})
		]
	});
}
function Ue({ row: e, critical: t, overdue: n }) {
	let r = P(e.due_date);
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "attention-row",
		children: [
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: v("attention-symbol", t ? "symbol-red" : "symbol-amber"),
				children: t ? /* @__PURE__ */ (0, b.jsx)(ke, { size: 17 }) : /* @__PURE__ */ (0, b.jsx)(j, { size: 17 })
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "attention-copy",
				children: [/* @__PURE__ */ (0, b.jsx)("div", {
					className: "attention-title",
					children: e.summary
				}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [
					e.region,
					" ",
					/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
					" ",
					e.bus_id || "Bus not identified",
					" ",
					/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
					" ",
					e.owner
				] })]
			}),
			/* @__PURE__ */ (0, b.jsx)(S, {
				tone: t ? "red" : "amber",
				children: t ? "Critical" : `${r}d overdue`
			})
		]
	});
}
function We({ rows: e }) {
	let t = Math.max(1, ...e.map((e) => e.open || 0));
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "region-bars",
		children: e.slice(0, 5).map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "region-line",
			children: [
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "region-name",
					children: e.region
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "region-track",
					children: /* @__PURE__ */ (0, b.jsx)("i", { style: { width: `${Math.max(4, e.open / t * 100)}%` } })
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "region-count",
					children: [e.open, /* @__PURE__ */ (0, b.jsx)("small", { children: " open" })]
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: v("region-overdue", e.overdue > 0 && "has-overdue"),
					children: e.overdue ? `${e.overdue} late` : "On track"
				})
			]
		}, e.region))
	});
}
function Ge({ rows: e, compact: t = !1 }) {
	return e.length ? /* @__PURE__ */ (0, b.jsx)("div", {
		className: v("report-list", t && "report-list-compact"),
		children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "report-row",
			children: [
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: `report-avatar ${e.severity === "Critical" ? "report-avatar-red" : e.severity === "High" ? "report-avatar-amber" : ""}`,
					children: /* @__PURE__ */ (0, b.jsx)(pe, { size: 16 })
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "report-summary",
					children: [/* @__PURE__ */ (0, b.jsx)("div", {
						className: "report-title",
						children: e.summary
					}), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "report-meta",
						children: [
							e.region,
							" ",
							/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
							" ",
							e.bus_id || "Bus pending",
							" ",
							/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
							" ",
							e.detected_language || "English"
						]
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "report-right",
					children: [/* @__PURE__ */ (0, b.jsx)(S, {
						tone: qe(e.severity),
						children: e.severity
					}), /* @__PURE__ */ (0, b.jsx)("span", { children: Ke(e.created_at) })]
				})
			]
		}, e.report_id))
	}) : /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "empty-state",
		children: [
			/* @__PURE__ */ (0, b.jsx)(pe, { size: 24 }),
			/* @__PURE__ */ (0, b.jsx)("strong", { children: "No reports to show" }),
			/* @__PURE__ */ (0, b.jsx)("span", { children: "New field reports will appear here." })
		]
	});
}
function Ke(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short"
	});
}
function qe(e) {
	return e === "Critical" ? "red" : e === "High" ? "amber" : e === "Medium" ? "blue" : "neutral";
}
function Je({ actions: e, reports: t, navigate: n }) {
	let r = e.filter((e) => e.status !== "Closed"), i = r.filter((e) => e.severity === "Critical"), a = r.filter((e) => P(e.due_date) > 0), o = t.filter((e) => String(e.review_status || "").toLowerCase().includes("pending")), s = r.filter((e) => P(e.due_date) >= -2 && P(e.due_date) <= 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(at, {
			eyebrow: "EXCEPTION CENTRE",
			title: "Focus on what needs attention",
			subtitle: "A prioritized queue of issues that need a human decision or follow-up.",
			action: /* @__PURE__ */ (0, b.jsxs)(x, {
				onClick: () => n("tracker"),
				children: [/* @__PURE__ */ (0, b.jsx)(ve, { size: 15 }), " Go to tracker"]
			})
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "exception-stats",
			children: [
				/* @__PURE__ */ (0, b.jsx)(Xe, {
					icon: Ee,
					title: "Critical issues",
					value: i.length,
					tone: "red",
					detail: "Immediate review"
				}),
				/* @__PURE__ */ (0, b.jsx)(Xe, {
					icon: j,
					title: "Overdue actions",
					value: a.length,
					tone: "amber",
					detail: "Past their due date"
				}),
				/* @__PURE__ */ (0, b.jsx)(Xe, {
					icon: fe,
					title: "Awaiting review",
					value: o.length,
					tone: "blue",
					detail: "Evidence or report review"
				}),
				/* @__PURE__ */ (0, b.jsx)(Xe, {
					icon: ie,
					title: "Due soon",
					value: s.length,
					tone: "green",
					detail: "Due in the next 48 hours"
				})
			]
		}),
		/* @__PURE__ */ (0, b.jsxs)(C, {
			className: "exception-list-card",
			children: [/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "card-head",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "Priority queue" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "Sorted by urgency and age" })] }), /* @__PURE__ */ (0, b.jsxs)(S, {
					tone: "red",
					dot: !0,
					children: [i.length + a.length, " need attention"]
				})]
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "exception-items",
				children: [
					[...i, ...a.filter((e) => !i.includes(e))].sort((e, t) => Ye(t.severity) - Ye(e.severity) || P(t.due_date) - P(e.due_date)).map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "exception-item",
						children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: `exception-severity exception-${qe(e.severity)}`,
								children: /* @__PURE__ */ (0, b.jsx)(Ee, { size: 18 })
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "exception-main",
								children: [
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "exception-title-line",
										children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e.summary }), /* @__PURE__ */ (0, b.jsx)(S, {
											tone: qe(e.severity),
											children: e.severity
										})]
									}),
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "exception-meta",
										children: [
											e.region,
											" ",
											/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
											" ",
											e.bus_id || "Unidentified bus",
											" ",
											/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
											" ",
											e.category
										]
									}),
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "exception-progress",
										children: [
											/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Owner ", /* @__PURE__ */ (0, b.jsx)("b", { children: e.owner })] }),
											/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Due ", /* @__PURE__ */ (0, b.jsx)("b", { children: ze(e.due_date) })] }),
											/* @__PURE__ */ (0, b.jsxs)("span", { children: [Math.max(0, P(e.due_date)), " days overdue"] })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, b.jsxs)("button", {
								className: "button button-outline button-sm",
								onClick: () => n("tracker"),
								children: ["Review ", /* @__PURE__ */ (0, b.jsx)(D, { size: 14 })]
							})
						]
					}, e.action_id)),
					o.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "exception-item",
						children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "exception-severity exception-blue",
								children: /* @__PURE__ */ (0, b.jsx)(fe, { size: 18 })
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "exception-main",
								children: [
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "exception-title-line",
										children: [/* @__PURE__ */ (0, b.jsxs)("strong", { children: ["Evidence review pending · ", e.category] }), /* @__PURE__ */ (0, b.jsx)(S, {
											tone: "blue",
											children: "Human review"
										})]
									}),
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "exception-meta",
										children: [
											e.region,
											" ",
											/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
											" ",
											e.bus_id || "Bus not identified",
											" ",
											/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
											" ",
											e.report_id
										]
									}),
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "exception-progress",
										children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: ["Received ", /* @__PURE__ */ (0, b.jsx)("b", { children: Ke(e.created_at) })] }), /* @__PURE__ */ (0, b.jsxs)("span", { children: ["Reporter ", /* @__PURE__ */ (0, b.jsx)("b", { children: e.reporter || "Field team" })] })]
									})
								]
							}),
							/* @__PURE__ */ (0, b.jsxs)("button", {
								className: "button button-outline button-sm",
								onClick: () => n("tracker"),
								children: ["Review ", /* @__PURE__ */ (0, b.jsx)(D, { size: 14 })]
							})
						]
					}, e.report_id)),
					!i.length && !a.length && !o.length && /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "empty-state",
						children: [
							/* @__PURE__ */ (0, b.jsx)(se, { size: 25 }),
							/* @__PURE__ */ (0, b.jsx)("strong", { children: "All clear for now" }),
							/* @__PURE__ */ (0, b.jsx)("span", { children: "Critical issues and overdue actions will appear here." })
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "safety-note",
			children: [/* @__PURE__ */ (0, b.jsx)(N, { size: 18 }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: "Evidence is for human review" }), /* @__PURE__ */ (0, b.jsx)("span", { children: "Photos or documents can be linked to a report, but FleetDesk does not automatically approve safety evidence." })] })]
		})
	] });
}
function Ye(e) {
	return {
		Critical: 4,
		High: 3,
		Medium: 2,
		Low: 1
	}[e] || 0;
}
function Xe({ icon: e, title: t, value: n, tone: r, detail: i }) {
	return /* @__PURE__ */ (0, b.jsxs)(C, {
		className: `exception-stat stat-${r}`,
		children: [
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "stat-icon",
				children: /* @__PURE__ */ (0, b.jsx)(e, { size: 17 })
			}),
			/* @__PURE__ */ (0, b.jsx)("span", { children: t }),
			/* @__PURE__ */ (0, b.jsx)("strong", { children: n }),
			/* @__PURE__ */ (0, b.jsx)("small", { children: i })
		]
	});
}
function Ze({ rows: e, filter: t, setFilter: n, onSave: r, navigate: i }) {
	let [a, o] = (0, g.useState)(""), [s, c] = (0, g.useState)({}), [l, u] = (0, g.useState)(""), [d, f] = (0, g.useState)("all"), p = e.filter((e) => d === "all" || d === "overdue" && e.status !== "Closed" && P(e.due_date) > 0 || d === "critical" && e.status !== "Closed" && e.severity === "Critical" || d === "unassigned" && (!e.owner || e.owner === "Unassigned")), m = (e) => {
		o(e.action_id), c({
			owner: e.owner,
			status: e.status,
			due_date: e.due_date,
			resolution_notes: e.resolution_notes || ""
		});
	}, h = () => {
		o(""), c({});
	};
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(at, {
			eyebrow: "ACTION MANAGEMENT",
			title: "Action tracker",
			subtitle: "Every report deserves a clear owner, due date, and closure.",
			action: /* @__PURE__ */ (0, b.jsxs)(x, {
				onClick: () => i("report"),
				children: [/* @__PURE__ */ (0, b.jsx)(Ce, { size: 16 }), " New report"]
			})
		}),
		/* @__PURE__ */ (0, b.jsxs)(C, {
			className: "tracker-card",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "tracker-toolbar",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "search-box",
						children: [/* @__PURE__ */ (0, b.jsx)(Te, { size: 16 }), /* @__PURE__ */ (0, b.jsx)("input", {
							value: t.q,
							onChange: (e) => n({
								...t,
								q: e.target.value
							}),
							placeholder: "Search issue, bus, owner…"
						})]
					}), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "filter-group",
						children: [
							/* @__PURE__ */ (0, b.jsxs)("label", { children: [/* @__PURE__ */ (0, b.jsx)(me, { size: 14 }), " Filters"] }),
							/* @__PURE__ */ (0, b.jsxs)("select", {
								value: t.region,
								onChange: (e) => n({
									...t,
									region: e.target.value
								}),
								children: [/* @__PURE__ */ (0, b.jsx)("option", { children: "All regions" }), Pe.map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e }, e))]
							}),
							/* @__PURE__ */ (0, b.jsxs)("select", {
								value: t.status,
								onChange: (e) => n({
									...t,
									status: e.target.value
								}),
								children: [/* @__PURE__ */ (0, b.jsx)("option", { children: "All statuses" }), [
									"Open",
									"In progress",
									"Closed"
								].map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e }, e))]
							}),
							/* @__PURE__ */ (0, b.jsxs)("select", {
								value: t.category,
								onChange: (e) => n({
									...t,
									category: e.target.value
								}),
								children: [/* @__PURE__ */ (0, b.jsx)("option", { children: "All types" }), [...new Set(e.map((e) => e.category))].filter(Boolean).map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e }, e))]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "tracker-quick-filters",
					"aria-label": "Quick action views",
					children: [
						[
							"all",
							"All actions",
							e.length
						],
						[
							"overdue",
							"Overdue",
							e.filter((e) => e.status !== "Closed" && P(e.due_date) > 0).length
						],
						[
							"critical",
							"Critical",
							e.filter((e) => e.status !== "Closed" && e.severity === "Critical").length
						],
						[
							"unassigned",
							"Unassigned",
							e.filter((e) => !e.owner || e.owner === "Unassigned").length
						]
					].map(([e, t, n]) => /* @__PURE__ */ (0, b.jsxs)("button", {
						type: "button",
						className: d === e ? "active" : "",
						onClick: () => f(e),
						children: [t, /* @__PURE__ */ (0, b.jsx)("span", { children: n })]
					}, e))
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "table-scroll",
					children: /* @__PURE__ */ (0, b.jsxs)("table", {
						className: "data-table",
						children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", { children: "ISSUE" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "REGION / BUS" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "OWNER" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "DUE DATE" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "STATUS" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "ESCALATION" }),
							/* @__PURE__ */ (0, b.jsx)("th", {})
						] }) }), /* @__PURE__ */ (0, b.jsxs)("tbody", { children: [p.map((e) => /* @__PURE__ */ (0, b.jsxs)(g.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("tr", {
							className: a === e.action_id ? "row-editing" : "",
							children: [
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "issue-cell",
									children: [/* @__PURE__ */ (0, b.jsx)("div", {
										className: `issue-icon issue-${qe(e.severity)}`,
										children: /* @__PURE__ */ (0, b.jsx)(pe, { size: 15 })
									}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [
										/* @__PURE__ */ (0, b.jsx)("strong", { children: e.summary }),
										/* @__PURE__ */ (0, b.jsxs)("span", { children: [
											e.category,
											" ",
											/* @__PURE__ */ (0, b.jsx)("i", { children: "·" }),
											" ",
											e.action_id
										] }),
										/* @__PURE__ */ (0, b.jsxs)("div", {
											className: "evidence-links",
											children: [e.attachment_url?.startsWith("http") && /* @__PURE__ */ (0, b.jsxs)("a", {
												href: e.attachment_url,
												target: "_blank",
												rel: "noreferrer",
												children: [/* @__PURE__ */ (0, b.jsx)(fe, { size: 11 }), " Photo / file"]
											}), e.audio_url?.startsWith("http") && /* @__PURE__ */ (0, b.jsxs)("a", {
												href: e.audio_url,
												target: "_blank",
												rel: "noreferrer",
												children: [/* @__PURE__ */ (0, b.jsx)(de, { size: 11 }), " Audio"]
											})]
										})
									] })]
								}) }),
								/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e.region }), /* @__PURE__ */ (0, b.jsx)("span", {
									className: "cell-secondary",
									children: e.bus_id || "—"
								})] }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsxs)("span", {
									className: "owner-chip",
									children: [/* @__PURE__ */ (0, b.jsx)("span", {
										className: "owner-avatar",
										children: Re(e.owner)
									}), e.owner]
								}) }),
								/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("span", {
									className: v("due-date", e.status !== "Closed" && P(e.due_date) > 0 && "due-over"),
									children: ze(e.due_date)
								}), e.status !== "Closed" && P(e.due_date) > 0 && /* @__PURE__ */ (0, b.jsxs)("span", {
									className: "due-sub",
									children: [P(e.due_date), "d overdue"]
								})] }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(S, {
									tone: e.status === "Closed" ? "green" : e.status === "In progress" ? "blue" : "neutral",
									dot: !0,
									children: e.status
								}) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: e.escalation && e.escalation !== "None" ? /* @__PURE__ */ (0, b.jsx)(S, {
									tone: e.escalation === "Immediate" ? "red" : "amber",
									children: e.escalation
								}) : /* @__PURE__ */ (0, b.jsx)("span", {
									className: "muted",
									children: "—"
								}) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
									className: "icon-button row-edit",
									title: "Update action",
									onClick: () => a === e.action_id ? h() : m(e),
									children: /* @__PURE__ */ (0, b.jsx)(ue, { size: 18 })
								}) })
							]
						}), a === e.action_id && /* @__PURE__ */ (0, b.jsx)("tr", {
							className: "edit-row",
							children: /* @__PURE__ */ (0, b.jsx)("td", {
								colSpan: "7",
								children: /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "edit-panel",
									children: [
										/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Owner", /* @__PURE__ */ (0, b.jsx)("select", {
											value: s.owner || "",
											onChange: (e) => c({
												...s,
												owner: e.target.value
											}),
											children: Fe.map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e }, e))
										})] }),
										/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Due date", /* @__PURE__ */ (0, b.jsx)("input", {
											type: "date",
											value: s.due_date || "",
											onChange: (e) => c({
												...s,
												due_date: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, b.jsxs)("label", { children: ["Status", /* @__PURE__ */ (0, b.jsx)("select", {
											value: s.status || "Open",
											onChange: (e) => c({
												...s,
												status: e.target.value
											}),
											children: [
												"Open",
												"In progress",
												"Closed"
											].map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e }, e))
										})] }),
										/* @__PURE__ */ (0, b.jsxs)("label", {
											className: "edit-notes",
											children: ["Closure notes", /* @__PURE__ */ (0, b.jsx)("input", {
												value: s.resolution_notes || "",
												onChange: (e) => c({
													...s,
													resolution_notes: e.target.value
												}),
												placeholder: "Add closure detail or evidence reference"
											})]
										}),
										/* @__PURE__ */ (0, b.jsx)(x, {
											size: "sm",
											onClick: () => {
												r(e, s), h();
											},
											children: "Save update"
										}),
										/* @__PURE__ */ (0, b.jsxs)(x, {
											size: "sm",
											variant: "outline",
											onClick: () => u(`Hi ${s.owner || e.owner},\n\nFollowing up on ${e.category.toLowerCase()} for ${e.bus_id || "the assigned bus"} in ${e.region}. ${e.summary}\n\nCurrent due date: ${ze(s.due_date || e.due_date)}. Please share an update and expected closure time.\n\nThanks!`),
											children: [/* @__PURE__ */ (0, b.jsx)(ce, { size: 13 }), " Draft follow-up"]
										}),
										/* @__PURE__ */ (0, b.jsx)(x, {
											size: "sm",
											variant: "ghost",
											onClick: h,
											children: "Cancel"
										})
									]
								})
							})
						})] }, e.action_id)), !p.length && /* @__PURE__ */ (0, b.jsx)("tr", { children: /* @__PURE__ */ (0, b.jsx)("td", {
							colSpan: "7",
							children: /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "empty-state",
								children: [
									/* @__PURE__ */ (0, b.jsx)(Te, { size: 23 }),
									/* @__PURE__ */ (0, b.jsx)("strong", { children: "No actions match these filters" }),
									/* @__PURE__ */ (0, b.jsx)("span", { children: "Try changing or clearing your filters." })
								]
							})
						}) })] })]
					})
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "table-footer",
					children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [
						"Showing ",
						/* @__PURE__ */ (0, b.jsx)("strong", { children: p.length }),
						" actions"
					] }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)(N, { size: 13 }), " Updates are recorded in the configured workspace"] })]
				})
			]
		}),
		l && /* @__PURE__ */ (0, b.jsx)("div", {
			className: "modal-backdrop",
			onClick: () => u(""),
			children: /* @__PURE__ */ (0, b.jsxs)(C, {
				className: "draft-modal",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "draft-modal-head",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("div", {
							className: "eyebrow",
							children: "FOLLOW-UP DRAFT"
						}), /* @__PURE__ */ (0, b.jsx)("h3", { children: "Ready to review and send" })] }), /* @__PURE__ */ (0, b.jsx)("button", {
							className: "icon-button",
							onClick: () => u(""),
							children: /* @__PURE__ */ (0, b.jsx)(je, { size: 17 })
						})]
					}),
					/* @__PURE__ */ (0, b.jsx)("p", { children: "This is a draft only. Review it and send using your approved channel." }),
					/* @__PURE__ */ (0, b.jsx)("textarea", {
						readOnly: !0,
						rows: "7",
						value: l
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "draft-modal-actions",
						children: [/* @__PURE__ */ (0, b.jsx)(x, {
							variant: "outline",
							onClick: () => u(""),
							children: "Close"
						}), /* @__PURE__ */ (0, b.jsxs)(x, {
							onClick: () => navigator.clipboard?.writeText(l),
							children: [/* @__PURE__ */ (0, b.jsx)(ce, { size: 14 }), " Copy message"]
						})]
					})
				]
			})
		})
	] });
}
function Qe({ draft: e, setDraft: t, uiLanguage: n, setUiLanguage: r, recording: i, recordSeconds: a, startRecording: o, stopRecording: s, audioUrl: c, audioRef: l, photoRef: u, preview: d, setPreview: f, onSubmit: p, busy: m }) {
	let [h, _] = (0, g.useState)(!1), y = n === "hi", S = y ? {
		eyebrow: "फील्ड रिपोर्ट",
		title: "समस्या दर्ज करें",
		subtitle: "अपनी भाषा में बोलें या छोटा नोट लिखें। किसी तय फ़ॉर्मेट की ज़रूरत नहीं।",
		step1: "क्या हुआ?",
		step1help: "आवाज़ रिकॉर्ड करें या अपने शब्दों में बताएँ।",
		listening: "सुन रहे हैं…",
		audioReady: "आवाज़ नोट तैयार है",
		speak: "अपनी भाषा में बोलें",
		finish: "रोकने के लिए टैप करें",
		audioAgain: "रिकॉर्ड जारी रखें या दूसरी फ़ाइल चुनें",
		languages: "हिंदी, हिंग्लिश, अंग्रेज़ी, मराठी, कन्नड़…",
		stop: "रोकें",
		record: "रिकॉर्ड करें",
		voice: "आवाज़ नोट",
		or: "या छोटा नोट लिखें",
		placeholder: "उदाहरण: बस 204 का ब्रेक जाँचें, ड्राइवर को ब्रेक धीमा लगा…",
		hint: "किसी भी भाषा में लिखें; हम जानकारी व्यवस्थित करने में मदद करेंगे।",
		step2: "जानकारी जोड़ें",
		step2help: "कुछ जानकारी सही टीम तक रिपोर्ट पहुँचाने में मदद करेगी।",
		type: "रिपोर्ट का प्रकार",
		region: "क्षेत्र",
		language: "रिपोर्ट की भाषा",
		reporter: "रिपोर्ट करने वाले",
		step3: "सबूत जोड़ें",
		optional: "वैकल्पिक",
		step3help: "जाँच के लिए तस्वीर या दस्तावेज़ जोड़ें।",
		attached: "सबूत जोड़ा गया",
		visible: "सिर्फ़ अधिकृत समीक्षकों को दिखेगा",
		remove: "हटाएँ",
		drop: "तस्वीर यहाँ छोड़ें या",
		browse: "फ़ाइल चुनें",
		size: "JPG, PNG, PDF · अधिकतम 25 MB",
		uploadPrompt: "क्या आपके पास पहले से आवाज़ नोट है?",
		upload: "आवाज़ अपलोड करें",
		review: "सेव करने से पहले AI की जानकारी जाँचें",
		continue: "जाँच के लिए आगे बढ़ें",
		busy: "रिपोर्ट व्यवस्थित हो रही है…",
		suggestionTitle: "जल्दी जोड़ें",
		suggestionHelp: "किसी सुझाव को टैप करें; फिर खाली जगहों में जानकारी भरें।",
		smart: "स्मार्ट रिपोर्ट",
		asideTitle: "आवाज़ से स्पष्ट कार्रवाई तक",
		aside: "FleetDesk आपकी रिपोर्ट को ऐसी जानकारी में बदलने में मदद करता है जिस पर संचालन टीम कार्रवाई कर सके।",
		transcribe: "लिखित रूप में बदलें",
		original: "मूल भाषा बनाए रखें",
		structure: "जानकारी व्यवस्थित करें",
		fields: "श्रेणी, बस, गंभीरता और सारांश",
		confirm: "आप पुष्टि करें",
		edit: "दर्ज करने से पहले बदलाव करें",
		human: "मानवीय जाँच ज़रूरी",
		safety: "सुरक्षा से जुड़े फ़ैसले और सबूत की जाँच व्यक्ति ही करेगा।",
		secure: "कनेक्ट होने पर फ़ाइलें प्रतिबंधित Drive फ़ोल्डर में रहेंगी।"
	} : {
		eyebrow: "FIELD REPORTING",
		title: "Report an issue",
		subtitle: "Speak naturally or write a quick note. No forms to memorize.",
		step1: "What happened?",
		step1help: "Record a voice note or tell us in your own words.",
		listening: "Listening…",
		audioReady: "Voice note ready",
		speak: "Speak in your language",
		finish: "Tap to finish",
		audioAgain: "You can keep recording or upload a different file",
		languages: "Hindi, Hinglish, English, Marathi, Kannada…",
		stop: "Stop",
		record: "Record",
		voice: "Voice note",
		or: "or type a quick note",
		placeholder: "e.g. Bus 204 ka brake check karna hai, driver ko response slow lag raha tha…",
		hint: "Write naturally in any language; we’ll help structure it.",
		step2: "Add context",
		step2help: "A few details help route this to the right team.",
		type: "Report type",
		region: "Region",
		language: "Report language",
		reporter: "Reported by",
		step3: "Attach evidence",
		optional: "OPTIONAL",
		step3help: "Add a photo or document for a person to review.",
		attached: "Evidence attached",
		visible: "Visible to authorized reviewers",
		remove: "Remove",
		drop: "Drop a photo here or",
		browse: "browse files",
		size: "JPG, PNG, PDF · up to 25 MB",
		uploadPrompt: "Have an existing voice note?",
		upload: "Upload audio",
		review: "You’ll review AI-detected details before saving",
		continue: "Continue to review",
		busy: "Structuring report…",
		suggestionTitle: "Quick add",
		suggestionHelp: "Tap a prompt to add it, then fill in the blanks.",
		smart: "SMART INTAKE",
		asideTitle: "From voice note to clear action",
		aside: "FleetDesk helps turn an unstructured report into information the operations team can act on.",
		transcribe: "We transcribe",
		original: "Keep the original language",
		structure: "We structure",
		fields: "Category, bus, severity and summary",
		confirm: "You confirm",
		edit: "Edit anything before it is logged",
		human: "People stay in the loop",
		safety: "Safety-critical decisions and evidence review always remain with a person.",
		secure: "Uploaded files are stored in a restricted Drive folder when connected."
	}, w = [
		["Pre-trip check", y ? "यात्रा-पूर्व जाँच" : "Pre-trip check"],
		["Safety incident", y ? "सुरक्षा घटना" : "Safety incident"],
		["Vehicle defect", y ? "वाहन में खराबी" : "Vehicle defect"],
		["Passenger complaint", y ? "यात्री की शिकायत" : "Passenger complaint"],
		["Documentation", y ? "दस्तावेज़" : "Documentation"],
		["Other", y ? "अन्य" : "Other"]
	], ee = [
		["Auto-detect", y ? "अपने आप पहचानें" : "Auto-detect"],
		["Hindi", y ? "हिंदी" : "Hindi"],
		["English", y ? "अंग्रेज़ी" : "English"],
		["Marathi", y ? "मराठी" : "Marathi"],
		["Kannada", y ? "कन्नड़" : "Kannada"],
		["Tamil", y ? "तमिल" : "Tamil"],
		["Telugu", y ? "तेलुगु" : "Telugu"],
		["Bengali", y ? "बंगाली" : "Bengali"],
		["Gujarati", y ? "गुजराती" : "Gujarati"],
		["Other", y ? "अन्य" : "Other"]
	], te = [
		["Field reporter", y ? "फील्ड रिपोर्टर" : "Field reporter"],
		["Driver", y ? "ड्राइवर" : "Driver"],
		["Fleet Coordinator", y ? "फ़्लीट समन्वयक" : "Fleet Coordinator"],
		["Ground Operations", y ? "ग्राउंड ऑपरेशंस" : "Ground Operations"],
		["Safety Team", y ? "सुरक्षा टीम" : "Safety Team"]
	], ne = y ? [
		["ब्रेक / वाहन", "वाहन में खराबी: बस नंबर ___ में ___ की समस्या है। स्थान ___, समय ___।"],
		["टायर", "बस नंबर ___ के ___ टायर में ___ समस्या दिखी। स्थान ___, समय ___।"],
		["एसी / सुविधा", "बस नंबर ___ में ___ काम नहीं कर रहा। यात्री/चालक पर असर: ___।"],
		["यात्री शिकायत", "यात्री की शिकायत: ___. बस नंबर ___, रूट ___, समय ___।"],
		["दस्तावेज़", "बस नंबर ___ का ___ दस्तावेज़ समाप्त/अस्पष्ट है। अगली समय-सीमा ___।"],
		["यात्रा-पूर्व जाँच", "बस नंबर ___ की यात्रा-पूर्व जाँच ___ कारण से पूरी नहीं हुई। प्रस्थान समय ___।"],
		["देरी", "रूट ___ पर बस नंबर ___ लगभग ___ मिनट देर से है। कारण/मदद: ___।"],
		["सुरक्षा घटना", "सुरक्षा घटना: ___. बस नंबर ___, स्थान ___, समय ___. चोट/तत्काल जोखिम: ___।"],
		["बैटरी / इलेक्ट्रिकल", "बस नंबर ___ में बैटरी/इलेक्ट्रिकल समस्या: ___। चेतावनी संकेत ___, स्थान ___, समय ___।"],
		["GPS / ट्रैकिंग", "बस नंबर ___ का GPS/ट्रैकिंग अपडेट नहीं हो रहा। रूट ___, समस्या शुरू हुई ___।"],
		["चालक दल की कमी", "रूट ___ / बस ___ के लिए ___ चालक दल सदस्य उपलब्ध नहीं है। प्रस्थान समय ___।"],
		["रूट बाधा", "रूट ___ पर ___ के पास रास्ता बंद/अवरुद्ध है। बस ___ लगभग ___ मिनट देर से है।"],
		["सफाई", "बस नंबर ___ में ___ जगह सफाई की ज़रूरत है। अगला प्रस्थान ___ बजे।"]
	] : [
		["Brake / vehicle", "Vehicle issue: Bus ___ has a ___ problem. Location ___, time ___."],
		["Tyre", "Tyre issue: Bus ___, ___ tyre has ___. Location ___, time ___."],
		["AC / amenity", "Bus ___: ___ is not working. Impact on passengers/driver: ___."],
		["Passenger complaint", "Passenger complaint: ___. Bus ___, route ___, time ___."],
		["Documents", "Bus ___: ___ document is expired/unclear. Required by ___."],
		["Pre-trip check", "Pre-trip check for bus ___ was not completed because ___. Departure time ___."],
		["Delay", "Bus ___ on route ___ is about ___ minutes late. Reason/help needed: ___."],
		["Safety incident", "Safety incident: ___. Bus ___, location ___, time ___. Injury/immediate risk: ___."],
		["Battery / electrical", "Battery/electrical issue on Bus ___: ___. Warning shown ___, location ___, time ___."],
		["GPS / tracking", "GPS/tracking is not updating for Bus ___ on route ___. Issue began ___."],
		["Crew availability", "Crew shortage for route ___ / Bus ___: ___ crew member unavailable. Departure ___."],
		["Road / route blocked", "Route ___ is blocked near ___. Bus ___ delayed about ___ minutes; help needed ___."],
		["Cleanliness", "Cleanliness issue on Bus ___: ___ area needs attention before departure at ___."]
	];
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "report-language-row",
			children: [/* @__PURE__ */ (0, b.jsx)("span", { children: y ? "रिपोर्ट फ़ॉर्म की भाषा" : "Report form language" }), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "report-language-toggle",
				role: "group",
				"aria-label": "Report form language",
				children: [/* @__PURE__ */ (0, b.jsx)("button", {
					type: "button",
					className: y ? "" : "selected",
					"aria-pressed": !y,
					onClick: () => r("en"),
					children: "English"
				}), /* @__PURE__ */ (0, b.jsx)("button", {
					type: "button",
					className: y ? "selected" : "",
					"aria-pressed": y,
					onClick: () => r("hi"),
					children: "हिंदी"
				})]
			})]
		}),
		/* @__PURE__ */ (0, b.jsx)(at, {
			eyebrow: S.eyebrow,
			title: S.title,
			subtitle: S.subtitle
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "report-form-layout",
			children: [/* @__PURE__ */ (0, b.jsxs)(C, {
				className: "report-form-card",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "form-section-title",
						children: [/* @__PURE__ */ (0, b.jsx)("div", {
							className: "step-number",
							children: "01"
						}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: S.step1 }), /* @__PURE__ */ (0, b.jsx)("p", { children: S.step1help })] })]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "voice-box",
						children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "voice-orb",
								children: /* @__PURE__ */ (0, b.jsx)(re, { size: 23 })
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "voice-copy",
								children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: i ? S.listening : c ? S.audioReady : S.speak }), /* @__PURE__ */ (0, b.jsx)("span", { children: i ? `${Math.floor(a / 60).toString().padStart(2, "0")}:${(a % 60).toString().padStart(2, "0")} · ${S.finish}` : c ? S.audioAgain : S.languages })]
							}),
							/* @__PURE__ */ (0, b.jsx)(x, {
								variant: i ? "recording" : "dark",
								onClick: i ? s : o,
								children: i ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
									/* @__PURE__ */ (0, b.jsx)(Oe, {
										size: 14,
										fill: "currentColor"
									}),
									" ",
									S.stop
								] }) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
									/* @__PURE__ */ (0, b.jsx)(xe, { size: 15 }),
									" ",
									S.record
								] })
							})
						]
					}),
					c && /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "audio-player",
						children: [
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "play-audio",
								onClick: () => document.getElementById("recorded-audio")?.play(),
								children: /* @__PURE__ */ (0, b.jsx)(Se, {
									size: 15,
									fill: "currentColor"
								})
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "audio-wave",
								children: Array.from({ length: 40 }, (e, t) => /* @__PURE__ */ (0, b.jsx)("i", { style: { height: `${8 + t * 13 % 18}px` } }, t))
							}),
							/* @__PURE__ */ (0, b.jsx)("span", { children: S.voice }),
							/* @__PURE__ */ (0, b.jsx)("audio", {
								id: "recorded-audio",
								src: c,
								controls: !0
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "or-divider",
						children: [
							/* @__PURE__ */ (0, b.jsx)("span", {}),
							S.or,
							/* @__PURE__ */ (0, b.jsx)("span", {})
						]
					}),
					/* @__PURE__ */ (0, b.jsx)("textarea", {
						className: "description-input",
						value: e.text,
						onChange: (n) => t({
							...e,
							text: n.target.value
						}),
						placeholder: S.placeholder,
						rows: "4"
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "field-hint",
						children: [
							/* @__PURE__ */ (0, b.jsx)(he, { size: 14 }),
							" ",
							S.hint
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "report-suggestions",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "suggestion-heading",
							children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: S.suggestionTitle }), /* @__PURE__ */ (0, b.jsx)("span", { children: S.suggestionHelp })]
						}), /* @__PURE__ */ (0, b.jsx)("div", {
							className: "suggestion-chips",
							children: ne.map(([n, r]) => /* @__PURE__ */ (0, b.jsxs)("button", {
								type: "button",
								onClick: () => t({
									...e,
									text: `${e.text.trim()}${e.text.trim() ? "\n" : ""}${r}`
								}),
								children: [/* @__PURE__ */ (0, b.jsx)(Ce, { size: 12 }), n]
							}, n))
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "form-section-title form-next",
						children: [/* @__PURE__ */ (0, b.jsx)("div", {
							className: "step-number",
							children: "02"
						}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: S.step2 }), /* @__PURE__ */ (0, b.jsx)("p", { children: S.step2help })] })]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "form-two-col",
						children: [
							/* @__PURE__ */ (0, b.jsxs)("label", { children: [S.type, /* @__PURE__ */ (0, b.jsx)("select", {
								value: e.type,
								onChange: (n) => t({
									...e,
									type: n.target.value
								}),
								children: w.map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("option", {
									value: e,
									children: t
								}, e))
							})] }),
							/* @__PURE__ */ (0, b.jsxs)("label", { children: [S.region, /* @__PURE__ */ (0, b.jsx)("select", {
								value: e.region,
								onChange: (n) => t({
									...e,
									region: n.target.value
								}),
								children: Pe.map((e) => /* @__PURE__ */ (0, b.jsx)("option", { children: e }, e))
							})] }),
							/* @__PURE__ */ (0, b.jsxs)("label", { children: [S.language, /* @__PURE__ */ (0, b.jsx)("select", {
								value: e.language,
								onChange: (n) => t({
									...e,
									language: n.target.value
								}),
								children: ee.map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("option", {
									value: e,
									children: t
								}, e))
							})] }),
							/* @__PURE__ */ (0, b.jsxs)("label", { children: [S.reporter, /* @__PURE__ */ (0, b.jsx)("select", {
								value: e.reporter,
								onChange: (n) => t({
									...e,
									reporter: n.target.value
								}),
								children: te.map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("option", {
									value: e,
									children: t
								}, e))
							})] })
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "form-section-title form-next",
						children: [/* @__PURE__ */ (0, b.jsx)("div", {
							className: "step-number",
							children: "03"
						}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("h3", { children: [
							S.step3,
							" ",
							/* @__PURE__ */ (0, b.jsx)("span", {
								className: "optional",
								children: S.optional
							})
						] }), /* @__PURE__ */ (0, b.jsx)("p", { children: S.step3help })] })]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: v("upload-zone", h && "upload-drag"),
						onDragOver: (e) => {
							e.preventDefault(), _(!0);
						},
						onDragLeave: () => _(!1),
						onDrop: (e) => {
							e.preventDefault(), _(!1);
							let t = e.dataTransfer.files?.[0];
							if (t) {
								let e = new DataTransfer();
								e.items.add(t), u.current.files = e.files, f(URL.createObjectURL(t));
							}
						},
						onClick: () => !d && u.current?.click(),
						children: [d ? /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "photo-preview",
							children: [/* @__PURE__ */ (0, b.jsx)("img", {
								src: d,
								alt: S.attached
							}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [
								/* @__PURE__ */ (0, b.jsx)("strong", { children: S.attached }),
								/* @__PURE__ */ (0, b.jsx)("span", { children: S.visible }),
								/* @__PURE__ */ (0, b.jsxs)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation(), f(""), u.current.value = "";
									},
									children: [
										/* @__PURE__ */ (0, b.jsx)(je, { size: 13 }),
										" ",
										S.remove
									]
								})
							] })]
						}) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("div", {
							className: "upload-icon",
							children: /* @__PURE__ */ (0, b.jsx)(Ae, { size: 18 })
						}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("strong", { children: [
							S.drop,
							" ",
							/* @__PURE__ */ (0, b.jsx)("button", {
								type: "button",
								onClick: (e) => {
									e.stopPropagation(), u.current?.click();
								},
								children: S.browse
							})
						] }), /* @__PURE__ */ (0, b.jsx)("span", { children: S.size })] })] }), /* @__PURE__ */ (0, b.jsx)("input", {
							ref: u,
							type: "file",
							accept: "image/*,.pdf",
							hidden: !0,
							onChange: (e) => {
								let t = e.target.files?.[0];
								t && f(URL.createObjectURL(t));
							}
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "audio-upload-link",
						children: [
							/* @__PURE__ */ (0, b.jsx)(de, { size: 15 }),
							/* @__PURE__ */ (0, b.jsx)("span", { children: S.uploadPrompt }),
							/* @__PURE__ */ (0, b.jsx)("button", {
								onClick: () => l.current?.click(),
								children: S.upload
							}),
							/* @__PURE__ */ (0, b.jsx)("input", {
								ref: l,
								type: "file",
								accept: "audio/*",
								hidden: !0
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "form-actions",
						children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [
							/* @__PURE__ */ (0, b.jsx)(N, { size: 15 }),
							" ",
							S.review
						] }), /* @__PURE__ */ (0, b.jsx)(x, {
							size: "lg",
							onClick: p,
							disabled: m,
							children: m ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
								/* @__PURE__ */ (0, b.jsx)(ye, {
									size: 16,
									className: "spin"
								}),
								" ",
								S.busy
							] }) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
								S.continue,
								" ",
								/* @__PURE__ */ (0, b.jsx)(D, { size: 16 })
							] })
						})]
					})
				]
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "report-aside",
				children: [
					/* @__PURE__ */ (0, b.jsxs)(C, {
						className: "how-card",
						children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "how-icon",
								children: /* @__PURE__ */ (0, b.jsx)(De, { size: 18 })
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "eyebrow",
								children: S.smart
							}),
							/* @__PURE__ */ (0, b.jsx)("h3", { children: S.asideTitle }),
							/* @__PURE__ */ (0, b.jsx)("p", { children: S.aside }),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "how-step",
								children: [/* @__PURE__ */ (0, b.jsx)("i", { children: "1" }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: S.transcribe }), /* @__PURE__ */ (0, b.jsx)("small", { children: S.original })] })]
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "how-step",
								children: [/* @__PURE__ */ (0, b.jsx)("i", { children: "2" }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: S.structure }), /* @__PURE__ */ (0, b.jsx)("small", { children: S.fields })] })]
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "how-step",
								children: [/* @__PURE__ */ (0, b.jsx)("i", { children: "3" }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: S.confirm }), /* @__PURE__ */ (0, b.jsx)("small", { children: S.edit })] })]
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)(C, {
						className: "drive-preview-card",
						children: [
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "drive-preview-head",
								children: [/* @__PURE__ */ (0, b.jsx)("div", {
									className: "drive-preview-icon",
									children: /* @__PURE__ */ (0, b.jsx)(fe, { size: 17 })
								}), /* @__PURE__ */ (0, b.jsx)("span", {
									className: "drive-preview-badge",
									children: "SHOWCASE PREVIEW"
								})]
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "eyebrow",
								children: "GOOGLE DRIVE EVIDENCE"
							}),
							/* @__PURE__ */ (0, b.jsx)("h3", { children: "Evidence linked to every issue" }),
							/* @__PURE__ */ (0, b.jsx)("p", { children: "Photos and audio can be organized in Drive by report, with a private evidence link saved alongside the issue in Google Sheets." }),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "drive-preview-points",
								children: [
									/* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)(fe, { size: 13 }), " Photos & voice notes"] }),
									/* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)(N, { size: 13 }), " Restricted access"] }),
									/* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)(_e, { size: 13 }), " Link stored with report"] })
								]
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "media-note",
								children: /* @__PURE__ */ (0, b.jsx)("span", { children: "Drive connection is not enabled in this showcase yet. Attachments currently stay in the app's local storage." })
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "privacy-callout",
						children: [/* @__PURE__ */ (0, b.jsx)(N, { size: 17 }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: S.human }), /* @__PURE__ */ (0, b.jsx)("span", { children: S.safety })] })]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "secure-note",
						children: [
							/* @__PURE__ */ (0, b.jsx)($e, {}),
							" ",
							S.secure
						]
					})
				]
			})]
		})
	] });
}
function $e() {
	return /* @__PURE__ */ (0, b.jsx)(N, { size: 13 });
}
function et({ pending: e, navigate: t, uiLanguage: n, onConfirm: r }) {
	let [i, a] = (0, g.useState)({});
	(0, g.useEffect)(() => {
		e?.result && a({ ...e.result });
	}, [e]);
	let o = n === "hi", s = o ? {
		eyebrow: "रिपोर्ट की जाँच",
		title: "रिपोर्ट की जानकारी की पुष्टि करें",
		subtitle: "AI के सुझाव बदले जा सकते हैं। सेव करने से पहले जानकारी जाँचें।",
		start: "रिपोर्ट दर्ज करें",
		back: "रिपोर्ट पर वापस जाएँ",
		draft: "रिपोर्ट का मसौदा तैयार",
		check: "क्या हमने आपकी बात सही समझी? दर्ज करने से पहले जानकारी जाँचें या बदलें।",
		human: "मानवीय जाँच",
		missing: "एक जानकारी अधूरी हो सकती है",
		busRoute: "बस नंबर या रूट की जानकारी जाँचें और भरें।",
		summary: "पूरी रिपोर्ट का सारांश",
		items: "अलग-अलग कार्रवाई योग्य समस्याएँ",
		multi: "एक आवाज़ नोट से कई समस्याएँ दर्ज हो सकती हैं।",
		issue: "समस्या",
		actionSummary: "कार्रवाई का सारांश",
		category: "श्रेणी",
		severity: "गंभीरता",
		bus: "बस नंबर",
		route: "रूट",
		busPlaceholder: "जैसे FLX-204",
		routePlaceholder: "यदि पता हो",
		english: "अंग्रेज़ी सारांश / अनुवाद",
		original: "मूल रिपोर्ट",
		willCreate: "कार्रवाई फ़्लीट समन्वयक को सौंपी जाएगी।",
		confirm: "पुष्टि करें और कार्रवाई दर्ज करें",
		next: "इसके बाद क्या होगा",
		captured: "रिपोर्ट मिली",
		review: "आप AI से निकाली गई जानकारी जाँच रहे हैं",
		created: "कार्रवाई बनाई गई",
		owner: "जिम्मेदार व्यक्ति और समय-सीमा तय होगी",
		detected: "पहचानी गई भाषा",
		confidence: "अनुमानित भरोसा",
		confidenceNote: "यह मॉडल का अनुमान है, सही होने की गारंटी नहीं।",
		step: "चरण"
	} : {
		eyebrow: "REPORT REVIEW",
		title: "Confirm the report details",
		subtitle: "AI suggestions are editable. Please verify these details before saving.",
		start: "Create a report",
		back: "Back to report",
		draft: "Draft structured",
		check: "Did we understand you correctly? Review or edit this before it is logged.",
		human: "HUMAN REVIEW",
		missing: "One detail may be missing",
		busRoute: "Please check and enter the bus or route details.",
		summary: "Overall report summary",
		items: "Separate action items",
		multi: "A voice note can create multiple trackable issues.",
		issue: "Issue",
		actionSummary: "Action summary",
		category: "Category",
		severity: "Severity",
		bus: "Bus ID",
		route: "Route",
		busPlaceholder: "e.g. FLX-204",
		routePlaceholder: "If known",
		english: "English summary / translation",
		original: "Original report",
		willCreate: "assigned to the Fleet Coordinator.",
		confirm: "Confirm and log action",
		next: "What happens next",
		captured: "Report captured",
		review: "You're checking AI-extracted details",
		created: "Action created",
		owner: "Owner and due date are assigned",
		detected: "DETECTED LANGUAGE",
		confidence: "Confidence estimate",
		confidenceNote: "Confidence is a model estimate, not a correctness guarantee.",
		step: "Step"
	};
	if (!e?.result) return /* @__PURE__ */ (0, b.jsx)(b.Fragment, { children: /* @__PURE__ */ (0, b.jsx)(at, {
		eyebrow: s.eyebrow,
		title: o ? "अभी जाँचने के लिए रिपोर्ट नहीं है" : "Nothing to review yet",
		subtitle: o ? "पहले फील्ड रिपोर्ट दर्ज करें।" : "Start by submitting a field report.",
		action: /* @__PURE__ */ (0, b.jsx)(x, {
			onClick: () => t("report"),
			children: s.start
		})
	}) });
	let c = e.result;
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(at, {
		eyebrow: `${s.eyebrow} · ${s.step} 2 ${o ? "में से" : "of"} 2`,
		title: s.title,
		subtitle: s.subtitle,
		action: /* @__PURE__ */ (0, b.jsxs)(x, {
			variant: "outline",
			onClick: () => t("report"),
			children: [
				/* @__PURE__ */ (0, b.jsx)(D, { size: 14 }),
				" ",
				s.back
			]
		})
	}), /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "confirm-layout",
		children: [/* @__PURE__ */ (0, b.jsxs)(C, {
			className: "confirm-card",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "review-banner",
					children: [
						/* @__PURE__ */ (0, b.jsx)("div", {
							className: "review-spark",
							children: /* @__PURE__ */ (0, b.jsx)(De, { size: 16 })
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsxs)("strong", { children: [
							s.draft,
							" · ",
							c.ai_mode || (o ? "डेमो निष्कर्ष" : "Demo extraction")
						] }), /* @__PURE__ */ (0, b.jsx)("span", { children: s.check })] }),
						/* @__PURE__ */ (0, b.jsx)(S, {
							tone: "blue",
							children: s.human
						})
					]
				}),
				c.needs_follow_up && /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "follow-up-banner",
					children: [/* @__PURE__ */ (0, b.jsx)(oe, { size: 17 }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: s.missing }), /* @__PURE__ */ (0, b.jsx)("span", { children: o ? s.busRoute : c.follow_up_question || s.busRoute })] })]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "confirm-fields",
					children: [
						/* @__PURE__ */ (0, b.jsxs)("label", { children: [s.summary, /* @__PURE__ */ (0, b.jsx)("textarea", {
							rows: "2",
							value: i.summary || "",
							onChange: (e) => a({
								...i,
								summary: e.target.value
							})
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "issues-review",
							children: [/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "issues-review-head",
								children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: s.items }), /* @__PURE__ */ (0, b.jsx)("span", { children: s.multi })] }), /* @__PURE__ */ (0, b.jsxs)(S, {
									tone: "blue",
									children: [
										(i.issues || []).length,
										" ",
										o ? "मदें" : "ITEMS"
									]
								})]
							}), (i.issues || []).map((e, t) => /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "issue-review-card",
								children: [
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "issue-review-title",
										children: [
											/* @__PURE__ */ (0, b.jsx)("span", { children: String(t + 1).padStart(2, "0") }),
											/* @__PURE__ */ (0, b.jsxs)("strong", { children: [
												s.issue,
												" ",
												t + 1
											] }),
											/* @__PURE__ */ (0, b.jsx)(S, {
												tone: qe(e.severity),
												children: o && {
													Low: "कम",
													Medium: "मध्यम",
													High: "ज़्यादा",
													Critical: "गंभीर"
												}[e.severity] || e.severity
											})
										]
									}),
									/* @__PURE__ */ (0, b.jsxs)("label", { children: [s.actionSummary, /* @__PURE__ */ (0, b.jsx)("textarea", {
										rows: "2",
										value: e.summary || "",
										onChange: (e) => a({
											...i,
											issues: i.issues.map((n, r) => r === t ? {
												...n,
												summary: e.target.value
											} : n)
										})
									})] }),
									/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "form-two-col",
										children: [
											/* @__PURE__ */ (0, b.jsxs)("label", { children: [s.category, /* @__PURE__ */ (0, b.jsx)("select", {
												value: e.category || "Other",
												onChange: (e) => a({
													...i,
													issues: i.issues.map((n, r) => r === t ? {
														...n,
														category: e.target.value
													} : n)
												}),
												children: [
													["Safety incident", "सुरक्षा घटना"],
													["Vehicle defect", "वाहन में खराबी"],
													["Pre-trip check", "यात्रा-पूर्व जाँच"],
													["Passenger complaint", "यात्री की शिकायत"],
													["Documentation", "दस्तावेज़"],
													["Operations", "संचालन"],
													["Other", "अन्य"]
												].map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("option", {
													value: e,
													children: o ? t : e
												}, e))
											})] }),
											/* @__PURE__ */ (0, b.jsxs)("label", { children: [s.severity, /* @__PURE__ */ (0, b.jsx)("select", {
												value: e.severity || "Medium",
												onChange: (e) => a({
													...i,
													issues: i.issues.map((n, r) => r === t ? {
														...n,
														severity: e.target.value
													} : n)
												}),
												children: [
													["Low", "कम"],
													["Medium", "मध्यम"],
													["High", "ज़्यादा"],
													["Critical", "गंभीर"]
												].map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("option", {
													value: e,
													children: o ? t : e
												}, e))
											})] }),
											/* @__PURE__ */ (0, b.jsxs)("label", { children: [s.bus, /* @__PURE__ */ (0, b.jsx)("input", {
												value: e.bus_id || "",
												onChange: (e) => a({
													...i,
													issues: i.issues.map((n, r) => r === t ? {
														...n,
														bus_id: e.target.value
													} : n)
												}),
												placeholder: s.busPlaceholder
											})] }),
											/* @__PURE__ */ (0, b.jsxs)("label", { children: [s.route, /* @__PURE__ */ (0, b.jsx)("input", {
												value: e.route || "",
												onChange: (e) => a({
													...i,
													issues: i.issues.map((n, r) => r === t ? {
														...n,
														route: e.target.value
													} : n)
												}),
												placeholder: s.routePlaceholder
											})] })
										]
									})
								]
							}, t))]
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", { children: [s.english, /* @__PURE__ */ (0, b.jsx)("textarea", {
							rows: "3",
							value: i.english_text || "",
							onChange: (e) => a({
								...i,
								english_text: e.target.value
							})
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("label", { children: [s.original, /* @__PURE__ */ (0, b.jsx)("textarea", {
							rows: "3",
							value: i.original_text || "",
							onChange: (e) => a({
								...i,
								original_text: e.target.value
							})
						})] })
					]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "confirm-bottom",
					children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [
						/* @__PURE__ */ (0, b.jsx)(N, { size: 14 }),
						" ",
						(i.issues || []).length || 1,
						" ",
						o ? "कार्रवाई" : `action${(i.issues || []).length === 1 ? "" : "s"}`,
						" ",
						s.willCreate
					] }), /* @__PURE__ */ (0, b.jsxs)(x, {
						size: "lg",
						onClick: () => r(i),
						children: [
							/* @__PURE__ */ (0, b.jsx)(A, { size: 16 }),
							" ",
							s.confirm
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, b.jsxs)(C, {
			className: "confirm-side",
			children: [
				/* @__PURE__ */ (0, b.jsx)("h3", { children: s.next }),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "next-step",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "next-dot done",
						children: /* @__PURE__ */ (0, b.jsx)(A, { size: 12 })
					}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: s.captured }), /* @__PURE__ */ (0, b.jsxs)("small", { children: [
						e.region,
						" · ",
						e.reporter
					] })] })]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "next-step",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "next-dot current",
						children: "2"
					}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: o ? "मानवीय जाँच" : "Human review" }), /* @__PURE__ */ (0, b.jsx)("small", { children: s.review })] })]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "next-step",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "next-dot",
						children: "3"
					}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: s.created }), /* @__PURE__ */ (0, b.jsx)("small", { children: s.owner })] })]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "confirm-original",
					children: [
						/* @__PURE__ */ (0, b.jsx)("div", {
							className: "eyebrow",
							children: s.detected
						}),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: c.detected_language || (o ? "अपने आप पहचानें" : "Auto-detect") }),
						/* @__PURE__ */ (0, b.jsxs)("p", { children: [
							s.confidence,
							" ",
							/* @__PURE__ */ (0, b.jsxs)("b", { children: [Math.round((c.confidence || .7) * 100), "%"] })
						] }),
						/* @__PURE__ */ (0, b.jsx)("small", { children: s.confidenceNote })
					]
				})
			]
		})]
	})] });
}
function tt({ payload: e, actions: t, reports: n }) {
	let r = e.categories || [], i = e.regions || [], a = [...i].sort((e, t) => t.overdue - e.overdue)[0], o = r[0], s = Object.entries(n.reduce((e, t) => {
		let n = `${t.bus_id || "Unidentified"} · ${t.category}`;
		return e[n] = (e[n] || 0) + 1, e;
	}, {})).sort((e, t) => t[1] - e[1]).slice(0, 6), c = Math.max(1, ...r.map((e) => e.count)), l = Math.max(1, ...i.map((e) => e.total));
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(at, {
			eyebrow: "OPERATIONS ANALYTICS",
			title: "See where patterns are forming",
			subtitle: "A lightweight read on issue mix, regional backlog, and recurring reports."
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "insight-callout",
			children: [
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "insight-callout-icon",
					children: /* @__PURE__ */ (0, b.jsx)(De, { size: 17 })
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", { children: [
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "eyebrow",
						children: "SIGNAL TO REVIEW"
					}),
					/* @__PURE__ */ (0, b.jsxs)("strong", { children: [
						a?.region || "Regional data",
						" has ",
						a?.overdue || 0,
						" overdue action",
						a?.overdue === 1 ? "" : "s",
						o ? `; ${o.category.toLowerCase()} is the most reported category` : "",
						"."
					] }),
					/* @__PURE__ */ (0, b.jsx)("p", { children: "This is a pattern to investigate, not a confirmed root cause. Check owner capacity, partner delays, and evidence quality with the regional team." })
				] }),
				/* @__PURE__ */ (0, b.jsx)(S, {
					tone: "amber",
					children: "OBSERVED DATA"
				})
			]
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "insights-grid",
			children: [
				/* @__PURE__ */ (0, b.jsxs)(C, {
					className: "analytics-card",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "card-head",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "Actions by category" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "All current and closed actions" })] }), /* @__PURE__ */ (0, b.jsx)(E, {
							size: 17,
							className: "card-head-icon"
						})]
					}), /* @__PURE__ */ (0, b.jsx)("div", {
						className: "category-chart",
						children: r.map((e, t) => /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "category-bar-row",
							children: [/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "category-label",
								children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e.category }), /* @__PURE__ */ (0, b.jsx)("strong", { children: e.count })]
							}), /* @__PURE__ */ (0, b.jsx)("div", {
								className: "category-track",
								children: /* @__PURE__ */ (0, b.jsx)("i", {
									className: `cat-color-${t % 5}`,
									style: { width: `${Math.max(3, e.count / c * 100)}%` }
								})
							})]
						}, e.category))
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)(C, {
					className: "analytics-card",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "card-head",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "Regional workload" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "Actions by region and late items" })] }), /* @__PURE__ */ (0, b.jsx)(M, {
							size: 17,
							className: "card-head-icon"
						})]
					}), /* @__PURE__ */ (0, b.jsx)("div", {
						className: "workload-list",
						children: i.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "workload-row",
							children: [
								/* @__PURE__ */ (0, b.jsx)("div", {
									className: "region-avatar",
									children: Re(e.region)
								}),
								/* @__PURE__ */ (0, b.jsxs)("div", {
									className: "workload-main",
									children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e.region }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [e.total, " total actions"] })] }), /* @__PURE__ */ (0, b.jsx)("div", {
										className: "workload-track",
										children: /* @__PURE__ */ (0, b.jsx)("i", { style: { width: `${Math.max(5, e.total / l * 100)}%` } })
									})]
								}),
								/* @__PURE__ */ (0, b.jsxs)("div", {
									className: "workload-late",
									children: [e.overdue, /* @__PURE__ */ (0, b.jsx)("small", { children: " late" })]
								})
							]
						}, e.region))
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)(C, {
					className: "analytics-card recurring-card",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "card-head",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "Recurring bus and issue combinations" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "Repeated reports worth a closer look" })] }), /* @__PURE__ */ (0, b.jsx)(O, {
							size: 17,
							className: "card-head-icon"
						})]
					}), /* @__PURE__ */ (0, b.jsx)("div", {
						className: "recurring-list",
						children: s.map(([e, t], n) => /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "recurring-row",
							children: [
								/* @__PURE__ */ (0, b.jsx)("span", {
									className: `recurring-rank ${n < 2 ? "rank-hot" : ""}`,
									children: String(n + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, b.jsx)("strong", { children: e }),
								/* @__PURE__ */ (0, b.jsxs)("span", { children: [t, " reports"] }),
								/* @__PURE__ */ (0, b.jsx)("button", {
									title: "Review tracker",
									children: /* @__PURE__ */ (0, b.jsx)(D, { size: 14 })
								})
							]
						}, e))
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)(C, {
					className: "analytics-card process-card",
					children: [
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "Process adherence" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "Pre-trip check reporting in sample data" })] }), /* @__PURE__ */ (0, b.jsx)(k, {
								size: 17,
								className: "card-head-icon"
							})]
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "adherence-number",
							children: [Math.max(0, Math.round(100 - n.filter((e) => e.category === "Pre-trip check" && e.review_status === "Pending review").length / Math.max(1, n.filter((e) => e.category === "Pre-trip check").length) * 100)), /* @__PURE__ */ (0, b.jsx)("small", { children: "%" })]
						}),
						/* @__PURE__ */ (0, b.jsx)("p", {
							className: "adherence-sub",
							children: "Reviewed pre-trip checks in the current sample."
						}),
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "adherence-note",
							children: [/* @__PURE__ */ (0, b.jsx)(oe, { size: 15 }), " Demo data does not include expected check-ins by trip, so this is not a true compliance rate."]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "method-note",
			children: [/* @__PURE__ */ (0, b.jsx)(N, { size: 15 }), /* @__PURE__ */ (0, b.jsx)("span", { children: "These are descriptive patterns from the available sample. Validate operational causes with regional teams before taking action." })]
		})
	] });
}
function nt(e, t) {
	let n = e.metrics || {}, r = t.filter((e) => e.status !== "Closed" && e.severity === "Critical").length, i = t.filter((e) => e.status !== "Closed" && P(e.due_date) > 0).length;
	return `FleetDesk Lite · Daily Operations Brief\n${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "long",
		year: "numeric"
	})}\n\nOpen actions: ${n.open_actions || 0}\nOverdue actions: ${i}\nCritical issues: ${r}\nReports today: ${n.reports_today || 0}\n\nReview critical safety issues first, then follow up on the oldest overdue actions.`;
}
function rt({ payload: e, actions: t, reports: n, onRefresh: r, copied: i, onCopy: a }) {
	let o = e.metrics || {}, s = t.filter((e) => e.status !== "Closed" && e.severity === "Critical"), c = t.filter((e) => e.status !== "Closed" && P(e.due_date) > 0), l = n.filter((e) => String(e.review_status || "").toLowerCase().includes("pending")), u = Math.max(0, 12 - n.filter((e) => e.category === "Pre-trip check").length), d = [...e.regions || []].sort((e, t) => t.overdue - e.overdue)[0];
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(at, {
		eyebrow: "OPERATIONS BRIEF",
		title: "The day, at a glance",
		subtitle: "A concise handover built from reports and open actions in this workspace.",
		action: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)(x, {
			variant: "outline",
			onClick: r,
			children: [/* @__PURE__ */ (0, b.jsx)(we, { size: 14 }), " Refresh brief"]
		}), /* @__PURE__ */ (0, b.jsxs)(x, {
			onClick: a,
			children: [i ? /* @__PURE__ */ (0, b.jsx)(A, { size: 15 }) : /* @__PURE__ */ (0, b.jsx)(le, { size: 15 }), i ? "Copied" : "Copy brief"]
		})] })
	}), /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "brief-layout",
		children: [/* @__PURE__ */ (0, b.jsxs)(C, {
			className: "daily-brief-card",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "brief-header",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [
						/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "brand-mini",
							children: [
								/* @__PURE__ */ (0, b.jsx)("div", {
									className: "brand-mark small",
									children: /* @__PURE__ */ (0, b.jsx)(O, { size: 14 })
								}),
								" FLEETDESK LITE ",
								/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
								" OPERATIONS"
							]
						}),
						/* @__PURE__ */ (0, b.jsx)("h2", { children: "Daily Operations Brief" }),
						/* @__PURE__ */ (0, b.jsxs)("p", { children: [
							(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
								weekday: "long",
								day: "numeric",
								month: "long",
								year: "numeric"
							}),
							" ",
							/* @__PURE__ */ (0, b.jsx)("span", { children: "·" }),
							" ",
							e.generated_at || "Updated moments ago"
						] })
					] }), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "brief-status",
						children: [/* @__PURE__ */ (0, b.jsx)("span", {
							className: "status-mark",
							children: /* @__PURE__ */ (0, b.jsx)(oe, { size: 19 })
						}), /* @__PURE__ */ (0, b.jsxs)("span", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: s.length || c.length ? "Attention required" : "On track" }), /* @__PURE__ */ (0, b.jsx)("small", { children: "Current workspace" })] })]
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "brief-metrics",
					children: [
						/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Open actions" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: o.open_actions || 0 })] }),
						/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Overdue" }), /* @__PURE__ */ (0, b.jsx)("strong", {
							className: c.length ? "text-amber" : "",
							children: c.length
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Critical" }), /* @__PURE__ */ (0, b.jsx)("strong", {
							className: s.length ? "text-red" : "",
							children: s.length
						})] }),
						/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Reports today" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: o.reports_today || 0 })] })
					]
				}),
				/* @__PURE__ */ (0, b.jsx)(it, {
					icon: Ee,
					tone: "red",
					title: "Critical and pending review",
					children: /* @__PURE__ */ (0, b.jsxs)("ul", { children: [
						s.slice(0, 4).map((e) => /* @__PURE__ */ (0, b.jsxs)("li", { children: [
							/* @__PURE__ */ (0, b.jsx)("b", { children: e.region }),
							" · ",
							e.summary,
							" ",
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"(",
								e.owner,
								")"
							] })
						] }, e.action_id)),
						l.slice(0, 3).map((e) => /* @__PURE__ */ (0, b.jsxs)("li", { children: [
							/* @__PURE__ */ (0, b.jsx)("b", { children: "Awaiting verification" }),
							" · ",
							e.category,
							" report from ",
							e.region
						] }, e.report_id)),
						!s.length && !l.length && /* @__PURE__ */ (0, b.jsx)("li", { children: "No critical reports or pending reviews in the current data." })
					] })
				}),
				/* @__PURE__ */ (0, b.jsx)(it, {
					icon: j,
					tone: "amber",
					title: "Overdue follow-ups",
					children: /* @__PURE__ */ (0, b.jsxs)("ul", { children: [c.slice(0, 5).map((e) => /* @__PURE__ */ (0, b.jsxs)("li", { children: [
						/* @__PURE__ */ (0, b.jsx)("b", { children: e.region }),
						" · ",
						e.summary,
						" ",
						/* @__PURE__ */ (0, b.jsxs)("small", { children: [
							"— ",
							Math.max(0, P(e.due_date)),
							" days late, ",
							e.owner
						] })
					] }, e.action_id)), !c.length && /* @__PURE__ */ (0, b.jsx)("li", { children: "No overdue actions in the current data." })] })
				}),
				/* @__PURE__ */ (0, b.jsxs)(it, {
					icon: ie,
					tone: "blue",
					title: "Check-in visibility",
					children: [/* @__PURE__ */ (0, b.jsx)("ul", { children: /* @__PURE__ */ (0, b.jsxs)("li", { children: [/* @__PURE__ */ (0, b.jsx)("b", { children: u }), " pre-trip check reports missing against a demo assumption of 12 expected checks."] }) }), /* @__PURE__ */ (0, b.jsx)("p", {
						className: "assumption-note",
						children: "This is a showcase assumption. A live process needs an expected trip/driver roster to calculate missing check-ins accurately."
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)(it, {
					icon: De,
					tone: "green",
					title: "AI-assisted summary",
					children: [/* @__PURE__ */ (0, b.jsx)("p", { children: e.daily_summary || (d ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
						/* @__PURE__ */ (0, b.jsx)("b", { children: d.region }),
						" currently has the largest overdue count (",
						d.overdue,
						"). Review the action types and owners with the regional team to understand the cause."
					] }) : "No regional action data available yet.") }), /* @__PURE__ */ (0, b.jsx)("p", {
						className: "assumption-note",
						children: "Summary is grounded in recorded counts; any possible cause must be verified with the regional team."
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "brief-priority",
					children: [/* @__PURE__ */ (0, b.jsx)("div", {
						className: "priority-icon",
						children: /* @__PURE__ */ (0, b.jsx)(Me, { size: 16 })
					}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "RECOMMENDED FOCUS" }), /* @__PURE__ */ (0, b.jsxs)("strong", { children: [
						"Review the ",
						s.length,
						" open critical issue",
						s.length === 1 ? "" : "s",
						", then contact owners of the ",
						c.length,
						" overdue action",
						c.length === 1 ? "" : "s",
						"."
					] })] })]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "brief-generated",
					children: [/* @__PURE__ */ (0, b.jsx)(De, { size: 13 }), " Built from current workspace data · Verify before distributing"]
				})
			]
		}), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "brief-side",
			children: [/* @__PURE__ */ (0, b.jsxs)(C, {
				className: "brief-side-card",
				children: [
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "brief-side-icon",
						children: /* @__PURE__ */ (0, b.jsx)(ie, { size: 18 })
					}),
					/* @__PURE__ */ (0, b.jsx)("h3", { children: "One brief, one shared picture" }),
					/* @__PURE__ */ (0, b.jsx)("p", { children: "Use this as a handover starting point. Confirm owner details and critical evidence before acting." }),
					/* @__PURE__ */ (0, b.jsx)("div", { className: "side-rule" }),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "side-row",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Source" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: e.integration?.mode || "Showcase data" })]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "side-row",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Refresh" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: "On demand" })]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "side-row",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Generated" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: e.generated_at || "Now" })]
					}),
					/* @__PURE__ */ (0, b.jsxs)(x, {
						variant: "outline",
						className: "full-button",
						onClick: r,
						children: [/* @__PURE__ */ (0, b.jsx)(we, { size: 14 }), " Update from current data"]
					})
				]
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "brief-caveat",
				children: [/* @__PURE__ */ (0, b.jsx)(N, { size: 16 }), /* @__PURE__ */ (0, b.jsx)("span", { children: "AI may help draft a summary, but human review is required before sharing or closing safety actions." })]
			})]
		})]
	})] });
}
function it({ icon: e, tone: t, title: n, children: r }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "brief-section",
		children: [/* @__PURE__ */ (0, b.jsx)("div", {
			className: `brief-section-icon section-${t}`,
			children: /* @__PURE__ */ (0, b.jsx)(e, { size: 17 })
		}), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "brief-section-content",
			children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: n }), r]
		})]
	});
}
function at({ eyebrow: e, title: t, subtitle: n, action: r }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "page-header",
		children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "eyebrow",
				children: e
			}),
			/* @__PURE__ */ (0, b.jsx)("h1", { children: t }),
			/* @__PURE__ */ (0, b.jsx)("p", { children: n })
		] }), r && /* @__PURE__ */ (0, b.jsx)("div", {
			className: "page-header-action",
			children: r
		})]
	});
}
//#endregion
//#region src/MyComponent.tsx
var ot = ({ payload: e, setTriggerValue: t }) => /* @__PURE__ */ (0, b.jsx)(Be, {
	payload: e,
	setTriggerValue: t
}), st = /* @__PURE__ */ new WeakMap(), ct = (e) => {
	let { data: t, parentElement: n, setTriggerValue: r } = e, i = n.querySelector(".react-root");
	if (!i) throw Error("Unexpected: React root element not found");
	let a = st.get(n);
	a || (a = (0, _.createRoot)(i), st.set(n, a));
	let { payload: o } = t;
	return a.render(/* @__PURE__ */ (0, b.jsx)(g.StrictMode, { children: /* @__PURE__ */ (0, b.jsx)(ot, {
		setTriggerValue: r,
		payload: o
	}) })), () => {
		let e = st.get(n);
		e && (e.unmount(), st.delete(n));
	};
};
//#endregion
export { ct as default };
