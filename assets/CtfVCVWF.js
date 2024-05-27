import{z as v,H as _,aX as N,aZ as Y,az as w,Y as B,aW as z,B as f,a_ as R,ao as V,a$ as le,ag as ue,U as ce,a8 as b,b0 as M,b1 as H,b2 as de,b3 as fe,b4 as me,N as k,aT as ve,S as y,O as ge,L as pe,r as he,P as ye,b5 as be,F as T,b6 as _e,b7 as Ce,b as x,aN as Se,T as we,s as A,b8 as ke,b9 as j,aP as xe,ba as Ee,bb as D}from"./bJS4H_VS.js";const I=v({class:[String,Array,Object],style:{type:[String,Array,Object],default:null}},"component");function Ke(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",n=arguments.length>2?arguments[2]:void 0;return _()({name:n??N(Y(e.replace(/__/g,"-"))),props:{tag:{type:String,default:t},...I()},setup(s,i){let{slots:a}=i;return()=>{var r;return w(s.tag,{class:[e,s.class],style:s.style},(r=a.default)==null?void 0:r.call(a))}}})}function Le(e){const t=B("useRender");t.render=e}const X=v({tag:{type:String,default:"div"}},"tag"),K=z.reduce((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e),{}),U=z.reduce((e,t)=>{const n="offset"+N(t);return e[n]={type:[String,Number],default:null},e},{}),G=z.reduce((e,t)=>{const n="order"+N(t);return e[n]={type:[String,Number],default:null},e},{}),W={col:Object.keys(K),offset:Object.keys(U),order:Object.keys(G)};function Te(e,t,n){let s=e;if(!(n==null||n===!1)){if(t){const i=t.replace(e,"");s+=`-${i}`}return e==="col"&&(s="v-"+s),e==="col"&&(n===""||n===!0)||(s+=`-${n}`),s.toLowerCase()}}const $e=["auto","start","end","center","baseline","stretch"],Pe=v({cols:{type:[Boolean,String,Number],default:!1},...K,offset:{type:[String,Number],default:null},...U,order:{type:[String,Number],default:null},...G,alignSelf:{type:String,default:null,validator:e=>$e.includes(e)},...I(),...X()},"VCol"),Ue=_()({name:"VCol",props:Pe(),setup(e,t){let{slots:n}=t;const s=f(()=>{const i=[];let a;for(a in W)W[a].forEach(o=>{const l=e[o],c=Te(a,o,l);c&&i.push(c)});const r=i.some(o=>o.startsWith("v-col-"));return i.push({"v-col":!r||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),i});return()=>{var i;return w(e.tag,{class:[s.value,e.class],style:e.style},(i=n.default)==null?void 0:i.call(n))}}}),Ne=v({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function p(e,t,n){return _()({name:e,props:Ne({mode:n,origin:t}),setup(s,i){let{slots:a}=i;const r={onBeforeEnter(o){s.origin&&(o.style.transformOrigin=s.origin)},onLeave(o){if(s.leaveAbsolute){const{offsetTop:l,offsetLeft:c,offsetWidth:d,offsetHeight:u}=o;o._transitionInitialStyles={position:o.style.position,top:o.style.top,left:o.style.left,width:o.style.width,height:o.style.height},o.style.position="absolute",o.style.top=`${l}px`,o.style.left=`${c}px`,o.style.width=`${d}px`,o.style.height=`${u}px`}s.hideOnLeave&&o.style.setProperty("display","none","important")},onAfterLeave(o){if(s.leaveAbsolute&&(o!=null&&o._transitionInitialStyles)){const{position:l,top:c,left:d,width:u,height:m}=o._transitionInitialStyles;delete o._transitionInitialStyles,o.style.position=l||"",o.style.top=c||"",o.style.left=d||"",o.style.width=u||"",o.style.height=m||""}}};return()=>{const o=s.group?R:V;return w(o,{name:s.disabled?"":e,css:!s.disabled,...s.group?void 0:{mode:s.mode},...s.disabled?{}:r},a.default)}}})}function J(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return _()({name:e,props:{mode:{type:String,default:n},disabled:Boolean,group:Boolean},setup(s,i){let{slots:a}=i;const r=s.group?R:V;return()=>w(r,{name:s.disabled?"":e,css:!s.disabled,...s.disabled?{}:t},a.default)}})}function Z(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const n=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",s=Y(`offset-${n}`);return{onBeforeEnter(r){r._parent=r.parentNode,r._initialStyle={transition:r.style.transition,overflow:r.style.overflow,[n]:r.style[n]}},onEnter(r){const o=r._initialStyle;r.style.setProperty("transition","none","important"),r.style.overflow="hidden";const l=`${r[s]}px`;r.style[n]="0",r.offsetHeight,r.style.transition=o.transition,e&&r._parent&&r._parent.classList.add(e),requestAnimationFrame(()=>{r.style[n]=l})},onAfterEnter:a,onEnterCancelled:a,onLeave(r){r._initialStyle={transition:"",overflow:r.style.overflow,[n]:r.style[n]},r.style.overflow="hidden",r.style[n]=`${r[s]}px`,r.offsetHeight,requestAnimationFrame(()=>r.style[n]="0")},onAfterLeave:i,onLeaveCancelled:i};function i(r){e&&r._parent&&r._parent.classList.remove(e),a(r)}function a(r){const o=r._initialStyle[n];r.style.overflow=r._initialStyle.overflow,o!=null&&(r.style[n]=o),delete r._initialStyle}}p("fab-transition","center center","out-in");p("dialog-bottom-transition");p("dialog-top-transition");p("fade-transition");p("scale-transition");p("scroll-x-transition");p("scroll-x-reverse-transition");p("scroll-y-transition");p("scroll-y-reverse-transition");p("slide-x-transition");p("slide-x-reverse-transition");const Ge=p("slide-y-transition");p("slide-y-reverse-transition");const Je=J("expand-transition",Z()),Ze=J("expand-x-transition",Z("",!0)),Be=v({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),Qe=_(!1)({name:"VDefaultsProvider",props:Be(),setup(e,t){let{slots:n}=t;const{defaults:s,disabled:i,reset:a,root:r,scoped:o}=le(e);return ue(s,{reset:a,root:r,scoped:o,disabled:i}),()=>{var l;return(l=n.default)==null?void 0:l.call(n)}}}),et=v({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),tt=(e,t)=>{let{slots:n}=t;const{transition:s,disabled:i,group:a,...r}=e,{component:o=a?R:V,...l}=typeof s=="object"?s:{};return w(o,ce(typeof s=="string"?{name:i?"":s}:l,typeof s=="string"?{}:Object.fromEntries(Object.entries({disabled:i,group:a}).filter(c=>{let[d,u]=c;return u!==void 0})),r),n)};function O(e){return M(()=>{const t=[],n={};if(e.value.background)if(H(e.value.background)){if(n.backgroundColor=e.value.background,!e.value.text&&de(e.value.background)){const s=fe(e.value.background);if(s.a==null||s.a===1){const i=me(s);n.color=i,n.caretColor=i}}}else t.push(`bg-${e.value.background}`);return e.value.text&&(H(e.value.text)?(n.color=e.value.text,n.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:n}})}function ze(e,t){const n=f(()=>({text:b(e)?e.value:t?e[t]:null})),{colorClasses:s,colorStyles:i}=O(n);return{textColorClasses:s,textColorStyles:i}}function nt(e,t){const n=f(()=>({background:b(e)?e.value:t?e[t]:null})),{colorClasses:s,colorStyles:i}=O(n);return{backgroundColorClasses:s,backgroundColorStyles:i}}const Re=["x-small","small","default","large","x-large"],Ve=v({size:{type:[String,Number],default:"default"}},"size");function Ie(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:k();return M(()=>{let n,s;return ve(Re,e.size)?n=`${t}--size-${e.size}`:e.size&&(s={width:y(e.size),height:y(e.size)}),{sizeClasses:n,sizeStyles:s}})}const Oe=v({color:String,disabled:Boolean,start:Boolean,end:Boolean,icon:ge,...I(),...Ve(),...X({tag:"i"}),...pe()},"VIcon"),st=_()({name:"VIcon",props:Oe(),setup(e,t){let{attrs:n,slots:s}=t;const i=he(),{themeClasses:a}=ye(e),{iconData:r}=be(f(()=>i.value||e.icon)),{sizeClasses:o}=Ie(e),{textColorClasses:l,textColorStyles:c}=ze(T(e,"color"));return Le(()=>{var m,h;const d=(m=s.default)==null?void 0:m.call(s);d&&(i.value=(h=_e(d).filter(L=>L.type===Ce&&L.children&&typeof L.children=="string")[0])==null?void 0:h.children);const u=!!(n.onClick||n.onClickOnce);return x(r.value.component,{tag:e.tag,icon:r.value.icon,class:["v-icon","notranslate",a.value,o.value,l.value,{"v-icon--clickable":u,"v-icon--disabled":e.disabled,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[o.value?void 0:{fontSize:y(e.size),height:y(e.size),width:y(e.size)},c.value,e.style],role:u?"button":void 0,"aria-hidden":!u,tabindex:u?e.disabled?-1:0:void 0},{default:()=>[d]})}),{}}}),it=v({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function rt(e){return{dimensionStyles:f(()=>{const n={},s=y(e.height),i=y(e.maxHeight),a=y(e.maxWidth),r=y(e.minHeight),o=y(e.minWidth),l=y(e.width);return s!=null&&(n.height=s),i!=null&&(n.maxHeight=i),a!=null&&(n.maxWidth=a),r!=null&&(n.minHeight=r),o!=null&&(n.minWidth=o),l!=null&&(n.width=l),n})}}const ot=v({rounded:{type:[Boolean,Number,String],default:void 0},tile:Boolean},"rounded");function at(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:k();return{roundedClasses:f(()=>{const s=b(e)?e.value:e.rounded,i=b(e)?e.value:e.tile,a=[];if(s===!0||s==="")a.push(`${t}--rounded`);else if(typeof s=="string"||s===0)for(const r of String(s).split(" "))a.push(`rounded-${r}`);else(i||s===!1)&&a.push("rounded-0");return a})}}function He(e,t){if(!Se)return;const n=t.modifiers||{},s=t.value,{handler:i,options:a}=typeof s=="object"?s:{handler:s,options:{}},r=new IntersectionObserver(function(){var u;let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],l=arguments.length>1?arguments[1]:void 0;const c=(u=e._observe)==null?void 0:u[t.instance.$.uid];if(!c)return;const d=o.some(m=>m.isIntersecting);i&&(!n.quiet||c.init)&&(!n.once||d||c.init)&&i(d,o,l),d&&n.once?Q(e,t):c.init=!0},a);e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:r},r.observe(e)}function Q(e,t){var s;const n=(s=e._observe)==null?void 0:s[t.instance.$.uid];n&&(n.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const lt={mounted:He,unmounted:Q},Ae=[null,"default","comfortable","compact"],ut=v({density:{type:String,default:"default",validator:e=>Ae.includes(e)}},"density");function ct(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:k();return{densityClasses:f(()=>`${t}--density-${e.density}`)}}const je=["elevated","flat","tonal","outlined","text","plain"];function dt(e,t){return x(we,null,[e&&x("span",{key:"overlay",class:`${t}__overlay`},null),x("span",{key:"underlay",class:`${t}__underlay`},null)])}const ft=v({color:String,variant:{type:String,default:"elevated",validator:e=>je.includes(e)}},"variant");function mt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:k();const n=f(()=>{const{variant:a}=A(e);return`${t}--variant-${a}`}),{colorClasses:s,colorStyles:i}=O(f(()=>{const{variant:a,color:r}=A(e);return{[["elevated","flat"].includes(a)?"background":"text"]:r}}));return{colorClasses:s,colorStyles:i,variantClasses:n}}const vt=v({border:[Boolean,Number,String]},"border");function gt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:k();return{borderClasses:f(()=>{const s=b(e)?e.value:e.border,i=[];if(s===!0||s==="")i.push(`${t}--border`);else if(typeof s=="string"||s===0)for(const a of String(s).split(" "))i.push(`border-${a}`);return i})}}const pt=v({elevation:{type:[Number,String],validator(e){const t=parseInt(e);return!isNaN(t)&&t>=0&&t<=24}}},"elevation");function ht(e){return{elevationClasses:f(()=>{const n=b(e)?e.value:e.elevation,s=[];return n==null||s.push(`elevation-${n}`),s})}}function De(){const e=B("useRoute");return f(()=>{var t;return(t=e==null?void 0:e.proxy)==null?void 0:t.$route})}function yt(){var e,t;return(t=(e=B("useRouter"))==null?void 0:e.proxy)==null?void 0:t.$router}function bt(e,t){var c,d;const n=ke("RouterLink"),s=f(()=>!!(e.href||e.to)),i=f(()=>(s==null?void 0:s.value)||j(t,"click")||j(e,"click"));if(typeof n=="string"||!("useLink"in n))return{isLink:s,isClickable:i,href:T(e,"href")};const a=f(()=>({...e,to:T(()=>e.to||"")})),r=n.useLink(a.value),o=f(()=>e.to?r:void 0),l=De();return{isLink:s,isClickable:i,route:(c=o.value)==null?void 0:c.route,navigate:(d=o.value)==null?void 0:d.navigate,isActive:f(()=>{var u,m,h;return o.value?e.exact?l.value?((h=o.value.isExactActive)==null?void 0:h.value)&&xe(o.value.route.value.query,l.value.query):((m=o.value.isExactActive)==null?void 0:m.value)??!1:((u=o.value.isActive)==null?void 0:u.value)??!1:!1}),href:f(()=>{var u;return e.to?(u=o.value)==null?void 0:u.route.value.href:e.href})}}const _t=v({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router"),$=Symbol("rippleStop"),We=80;function q(e,t){e.style.transform=t,e.style.webkitTransform=t}function P(e){return e.constructor.name==="TouchEvent"}function ee(e){return e.constructor.name==="KeyboardEvent"}const qe=function(e,t){var u;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=0,i=0;if(!ee(e)){const m=t.getBoundingClientRect(),h=P(e)?e.touches[e.touches.length-1]:e;s=h.clientX-m.left,i=h.clientY-m.top}let a=0,r=.3;(u=t._ripple)!=null&&u.circle?(r=.15,a=t.clientWidth/2,a=n.center?a:a+Math.sqrt((s-a)**2+(i-a)**2)/4):a=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const o=`${(t.clientWidth-a*2)/2}px`,l=`${(t.clientHeight-a*2)/2}px`,c=n.center?o:`${s-a}px`,d=n.center?l:`${i-a}px`;return{radius:a,scale:r,x:c,y:d,centerX:o,centerY:l}},E={show(e,t){var h;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!((h=t==null?void 0:t._ripple)!=null&&h.enabled))return;const s=document.createElement("span"),i=document.createElement("span");s.appendChild(i),s.className="v-ripple__container",n.class&&(s.className+=` ${n.class}`);const{radius:a,scale:r,x:o,y:l,centerX:c,centerY:d}=qe(e,t,n),u=`${a*2}px`;i.className="v-ripple__animation",i.style.width=u,i.style.height=u,t.appendChild(s);const m=window.getComputedStyle(t);m&&m.position==="static"&&(t.style.position="relative",t.dataset.previousPosition="static"),i.classList.add("v-ripple__animation--enter"),i.classList.add("v-ripple__animation--visible"),q(i,`translate(${o}, ${l}) scale3d(${r},${r},${r})`),i.dataset.activated=String(performance.now()),setTimeout(()=>{i.classList.remove("v-ripple__animation--enter"),i.classList.add("v-ripple__animation--in"),q(i,`translate(${c}, ${d}) scale3d(1,1,1)`)},0)},hide(e){var a;if(!((a=e==null?void 0:e._ripple)!=null&&a.enabled))return;const t=e.getElementsByClassName("v-ripple__animation");if(t.length===0)return;const n=t[t.length-1];if(n.dataset.isHiding)return;n.dataset.isHiding="true";const s=performance.now()-Number(n.dataset.activated),i=Math.max(250-s,0);setTimeout(()=>{n.classList.remove("v-ripple__animation--in"),n.classList.add("v-ripple__animation--out"),setTimeout(()=>{var o;e.getElementsByClassName("v-ripple__animation").length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),((o=n.parentNode)==null?void 0:o.parentNode)===e&&e.removeChild(n.parentNode)},300)},i)}};function te(e){return typeof e>"u"||!!e}function C(e){const t={},n=e.currentTarget;if(!(!(n!=null&&n._ripple)||n._ripple.touched||e[$])){if(e[$]=!0,P(e))n._ripple.touched=!0,n._ripple.isTouch=!0;else if(n._ripple.isTouch)return;if(t.center=n._ripple.centered||ee(e),n._ripple.class&&(t.class=n._ripple.class),P(e)){if(n._ripple.showTimerCommit)return;n._ripple.showTimerCommit=()=>{E.show(e,n,t)},n._ripple.showTimer=window.setTimeout(()=>{var s;(s=n==null?void 0:n._ripple)!=null&&s.showTimerCommit&&(n._ripple.showTimerCommit(),n._ripple.showTimerCommit=null)},We)}else E.show(e,n,t)}}function F(e){e[$]=!0}function g(e){const t=e.currentTarget;if(t!=null&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),e.type==="touchend"&&t._ripple.showTimerCommit){t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,t._ripple.showTimer=window.setTimeout(()=>{g(e)});return}window.setTimeout(()=>{t._ripple&&(t._ripple.touched=!1)}),E.hide(t)}}function ne(e){const t=e.currentTarget;t!=null&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let S=!1;function se(e){!S&&(e.keyCode===D.enter||e.keyCode===D.space)&&(S=!0,C(e))}function ie(e){S=!1,g(e)}function re(e){S&&(S=!1,g(e))}function oe(e,t,n){const{value:s,modifiers:i}=t,a=te(s);if(a||E.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=a,e._ripple.centered=i.center,e._ripple.circle=i.circle,Ee(s)&&s.class&&(e._ripple.class=s.class),a&&!n){if(i.stop){e.addEventListener("touchstart",F,{passive:!0}),e.addEventListener("mousedown",F);return}e.addEventListener("touchstart",C,{passive:!0}),e.addEventListener("touchend",g,{passive:!0}),e.addEventListener("touchmove",ne,{passive:!0}),e.addEventListener("touchcancel",g),e.addEventListener("mousedown",C),e.addEventListener("mouseup",g),e.addEventListener("mouseleave",g),e.addEventListener("keydown",se),e.addEventListener("keyup",ie),e.addEventListener("blur",re),e.addEventListener("dragstart",g,{passive:!0})}else!a&&n&&ae(e)}function ae(e){e.removeEventListener("mousedown",C),e.removeEventListener("touchstart",C),e.removeEventListener("touchend",g),e.removeEventListener("touchmove",ne),e.removeEventListener("touchcancel",g),e.removeEventListener("mouseup",g),e.removeEventListener("mouseleave",g),e.removeEventListener("keydown",se),e.removeEventListener("keyup",ie),e.removeEventListener("dragstart",g),e.removeEventListener("blur",re)}function Fe(e,t){oe(e,t,!1)}function Ye(e){delete e._ripple,ae(e)}function Me(e,t){if(t.value===t.oldValue)return;const n=te(t.oldValue);oe(e,t,n)}const Ct={mounted:Fe,unmounted:Ye,updated:Me};export{Je as A,yt as B,Ve as C,Ie as D,lt as I,tt as M,Ct as R,Ue as V,et as a,Ge as b,Ke as c,st as d,ot as e,at as f,nt as g,ze as h,Ze as i,Qe as j,ut as k,it as l,I as m,ct as n,rt as o,X as p,vt as q,pt as r,_t as s,ft as t,Le as u,gt as v,mt as w,ht as x,bt as y,dt as z};