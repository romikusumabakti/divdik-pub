import{options as n}from"./preact.js";var t,u,r,o=0,i=[],c=n.__b,f=n.__r,e=n.diffed,a=n.__c,v=n.unmount;function m(_,t){n.__h&&n.__h(u,_,o||t),o=0;t=u.__H||(u.__H={__:[],__h:[]});return _>=t.__.length&&t.__.push({}),t.__[_]}function l(_){return o=1,p(w,_)}function p(_,n,e){var o=m(t++,2);return o.t=_,o.__c||(o.__=[e?e(n):w(void 0,n),function(_){_=o.t(o.__[0],_);o.__[0]!==_&&(o.__=[_,o.__[1]],o.__c.setState({}))}],o.__c=u),o.__}function y(_,e){var o=m(t++,3);!n.__s&&k(o.__H,e)&&(o.__=_,o.__H=e,u.__H.__h.push(o))}function h(_,e){var o=m(t++,4);!n.__s&&k(o.__H,e)&&(o.__=_,o.__H=e,u.__h.push(o))}function s(_){return o=5,d(function(){return{current:_}},[])}function _(_,n,t){o=6,h(function(){"function"==typeof _?_(n()):_&&(_.current=n())},null==t?t:t.concat(_))}function d(_,n){var u=m(t++,7);return k(u.__H,n)&&(u.__=_(),u.__H=n,u.__h=_),u.__}function A(_,n){return o=8,d(function(){return _},n)}function F(_){var n=u.context[_.__c],e=m(t++,9);return e.c=_,n?(null==e.__&&(e.__=!0,n.sub(u)),n.props.value):_.__}function T(_,t){n.useDebugValue&&n.useDebugValue(t?t(_):_)}function q(_){var n=m(t++,10),e=l();return n.__=_,u.componentDidCatch||(u.componentDidCatch=function(_){n.__&&n.__(_),e[1](_)}),[e[0],function(){e[1](void 0)}]}function x(){var t;for(i.sort(function(_,n){return _.__v.__b-n.__v.__b});t=i.pop();)if(t.__P)try{t.__H.__h.forEach(g),t.__H.__h.forEach(j),t.__H.__h=[]}catch(_){t.__H.__h=[],n.__e(_,t.__v)}}n.__b=function(_){u=null,c&&c(_)},n.__r=function(_){f&&f(_),t=0;_=(u=_.__c).__H;_&&(_.__h.forEach(g),_.__h.forEach(j),_.__h=[])},n.diffed=function(_){e&&e(_);_=_.__c;_&&_.__H&&_.__H.__h.length&&(1!==i.push(_)&&r===n.requestAnimationFrame||((r=n.requestAnimationFrame)||function(_){function n(){clearTimeout(u),b&&cancelAnimationFrame(t),setTimeout(_)}var t,u=setTimeout(n,100);b&&(t=requestAnimationFrame(n))})(x)),u=null},n.__c=function(_,u){u.some(function(t){try{t.__h.forEach(g),t.__h=t.__h.filter(function(_){return!_.__||j(_)})}catch(_){u.some(function(_){_.__h&&(_.__h=[])}),u=[],n.__e(_,t.__v)}}),a&&a(_,u)},n.unmount=function(_){v&&v(_);var t,_=_.__c;_&&_.__H&&(_.__H.__.forEach(function(_){try{g(_)}catch(_){t=_}}),t&&n.__e(t,_.__v))};var b="function"==typeof requestAnimationFrame;function g(_){var n=u,t=_.__c;"function"==typeof t&&(_.__c=void 0,t()),u=n}function j(_){var n=u;_.__c=_.__(),u=n}function k(t,_){return!t||t.length!==_.length||_.some(function(_,n){return _!==t[n]})}function w(_,n){return"function"==typeof n?n(_):n}export{l as useState,p as useReducer,y as useEffect,h as useLayoutEffect,s as useRef,_ as useImperativeHandle,d as useMemo,A as useCallback,F as useContext,T as useDebugValue,q as useErrorBoundary};