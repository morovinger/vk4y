import{G as ee,C as O,D as te,aK as T,X as Te,r as P,z as A,A as ue,B as m,j as fe,Y as xe,F as w,R as at,y as nt,aL as lt,aM as it,O as N,H as R,b as c,I as Y,J as Me,h as Q,Z as st,aN as rt,a0 as ut,a3 as Re,T as ce,U as oe,S as de,L as ae,P as ne,K as Ae,aO as ct,aP as ot,ag as dt,aQ as vt,aR as H,aS as gt}from"./Ca6JF1Ur.js";import{m as z,p as D,u as j,j as Z,M as $,A as ft,c as mt,l as me,o as ye,e as le,a as yt,I as St,g as ze,f as ie,k as Se,C as ht,t as he,w as je,n as be,D as bt,d as ve,z as Fe,q as Ne,r as De,s as Ct,R as kt,y as wt,v as Ge,x as pe,h as Ee}from"./BnU8Cqr7.js";const ge=Symbol.for("vuetify:list");function Ue(){const e=ee(ge,{hasPrepend:O(!1),updateHasPrepend:()=>null}),i={hasPrepend:O(!1),updateHasPrepend:t=>{t&&(i.hasPrepend.value=t)}};return te(ge,i),e}function We(){return ee(ge,null)}const Ce=e=>{const i={activate:t=>{let{id:a,value:l,activated:n}=t;return a=T(a),e&&!l&&n.size===1&&n.has(a)||(l?n.add(a):n.delete(a)),n},in:(t,a,l)=>{let n=new Set;if(t!=null)for(const s of Te(t))n=i.activate({id:s,value:!0,activated:new Set(n),children:a,parents:l});return n},out:t=>Array.from(t)};return i},He=e=>{const i=Ce(e);return{activate:a=>{let{activated:l,id:n,...s}=a;n=T(n);const u=l.has(n)?new Set([n]):new Set;return i.activate({...s,id:n,activated:u})},in:(a,l,n)=>{let s=new Set;if(a!=null){const u=Te(a);u.length&&(s=i.in(u.slice(0,1),l,n))}return s},out:(a,l,n)=>i.out(a,l,n)}},It=e=>{const i=Ce(e);return{activate:a=>{let{id:l,activated:n,children:s,...u}=a;return l=T(l),s.has(l)?n:i.activate({id:l,activated:n,children:s,...u})},in:i.in,out:i.out}},Vt=e=>{const i=He(e);return{activate:a=>{let{id:l,activated:n,children:s,...u}=a;return l=T(l),s.has(l)?n:i.activate({id:l,activated:n,children:s,...u})},in:i.in,out:i.out}},Pt={open:e=>{let{id:i,value:t,opened:a,parents:l}=e;if(t){const n=new Set;n.add(i);let s=l.get(i);for(;s!=null;)n.add(s),s=l.get(s);return n}else return a.delete(i),a},select:()=>null},$e={open:e=>{let{id:i,value:t,opened:a,parents:l}=e;if(t){let n=l.get(i);for(a.add(i);n!=null&&n!==i;)a.add(n),n=l.get(n);return a}else a.delete(i);return a},select:()=>null},At={open:$e.open,select:e=>{let{id:i,value:t,opened:a,parents:l}=e;if(!t)return a;const n=[];let s=l.get(i);for(;s!=null;)n.push(s),s=l.get(s);return new Set(n)}},ke=e=>{const i={select:t=>{let{id:a,value:l,selected:n}=t;if(a=T(a),e&&!l){const s=Array.from(n.entries()).reduce((u,S)=>{let[v,f]=S;return f==="on"&&u.push(v),u},[]);if(s.length===1&&s[0]===a)return n}return n.set(a,l?"on":"off"),n},in:(t,a,l)=>{let n=new Map;for(const s of t||[])n=i.select({id:s,value:!0,selected:new Map(n),children:a,parents:l});return n},out:t=>{const a=[];for(const[l,n]of t.entries())n==="on"&&a.push(l);return a}};return i},Ke=e=>{const i=ke(e);return{select:a=>{let{selected:l,id:n,...s}=a;n=T(n);const u=l.has(n)?new Map([[n,l.get(n)]]):new Map;return i.select({...s,id:n,selected:u})},in:(a,l,n)=>{let s=new Map;return a!=null&&a.length&&(s=i.in(a.slice(0,1),l,n)),s},out:(a,l,n)=>i.out(a,l,n)}},_t=e=>{const i=ke(e);return{select:a=>{let{id:l,selected:n,children:s,...u}=a;return l=T(l),s.has(l)?n:i.select({id:l,selected:n,children:s,...u})},in:i.in,out:i.out}},Bt=e=>{const i=Ke(e);return{select:a=>{let{id:l,selected:n,children:s,...u}=a;return l=T(l),s.has(l)?n:i.select({id:l,selected:n,children:s,...u})},in:i.in,out:i.out}},Lt=e=>{const i={select:t=>{let{id:a,value:l,selected:n,children:s,parents:u}=t;a=T(a);const S=new Map(n),v=[a];for(;v.length;){const h=v.shift();n.set(h,l?"on":"off"),s.has(h)&&v.push(...s.get(h))}let f=u.get(a);for(;f;){const h=s.get(f),b=h.every(o=>n.get(o)==="on"),r=h.every(o=>!n.has(o)||n.get(o)==="off");n.set(f,b?"on":r?"off":"indeterminate"),f=u.get(f)}return e&&!l&&Array.from(n.entries()).reduce((b,r)=>{let[o,d]=r;return d==="on"&&b.push(o),b},[]).length===0?S:n},in:(t,a,l)=>{let n=new Map;for(const s of t||[])n=i.select({id:s,value:!0,selected:new Map(n),children:a,parents:l});return n},out:(t,a)=>{const l=[];for(const[n,s]of t.entries())s==="on"&&!a.has(n)&&l.push(n);return l}};return i},K=Symbol.for("vuetify:nested"),qe={id:O(),root:{register:()=>null,unregister:()=>null,parents:P(new Map),children:P(new Map),open:()=>null,openOnSelect:()=>null,activate:()=>null,select:()=>null,activatable:P(!1),selectable:P(!1),opened:P(new Set),activated:P(new Set),selected:P(new Map),selectedValues:P([])}},Ot=A({activatable:Boolean,selectable:Boolean,activeStrategy:[String,Function,Object],selectStrategy:[String,Function,Object],openStrategy:[String,Object],opened:null,activated:null,selected:null,mandatory:Boolean},"nested"),Tt=e=>{let i=!1;const t=P(new Map),a=P(new Map),l=ue(e,"opened",e.opened,r=>new Set(r),r=>[...r.values()]),n=m(()=>{if(typeof e.activeStrategy=="object")return e.activeStrategy;if(typeof e.activeStrategy=="function")return e.activeStrategy(e.mandatory);switch(e.activeStrategy){case"leaf":return It(e.mandatory);case"single-leaf":return Vt(e.mandatory);case"independent":return Ce(e.mandatory);case"single-independent":default:return He(e.mandatory)}}),s=m(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;if(typeof e.selectStrategy=="function")return e.selectStrategy(e.mandatory);switch(e.selectStrategy){case"single-leaf":return Bt(e.mandatory);case"leaf":return _t(e.mandatory);case"independent":return ke(e.mandatory);case"single-independent":return Ke(e.mandatory);case"classic":default:return Lt(e.mandatory)}}),u=m(()=>{if(typeof e.openStrategy=="object")return e.openStrategy;switch(e.openStrategy){case"list":return At;case"single":return Pt;case"multiple":default:return $e}}),S=ue(e,"activated",e.activated,r=>n.value.in(r,t.value,a.value),r=>n.value.out(r,t.value,a.value)),v=ue(e,"selected",e.selected,r=>s.value.in(r,t.value,a.value),r=>s.value.out(r,t.value,a.value));fe(()=>{i=!0});function f(r){const o=[];let d=r;for(;d!=null;)o.unshift(d),d=a.value.get(d);return o}const h=xe("nested"),b={id:O(),root:{opened:l,activatable:w(e,"activatable"),selectable:w(e,"selectable"),activated:S,selected:v,selectedValues:m(()=>{const r=[];for(const[o,d]of v.value.entries())d==="on"&&r.push(o);return r}),register:(r,o,d)=>{o&&r!==o&&a.value.set(r,o),d&&t.value.set(r,[]),o!=null&&t.value.set(o,[...t.value.get(o)||[],r])},unregister:r=>{if(i)return;t.value.delete(r);const o=a.value.get(r);if(o){const d=t.value.get(o)??[];t.value.set(o,d.filter(y=>y!==r))}a.value.delete(r),l.value.delete(r)},open:(r,o,d)=>{h.emit("click:open",{id:r,value:o,path:f(r),event:d});const y=u.value.open({id:r,value:o,opened:new Set(l.value),children:t.value,parents:a.value,event:d});y&&(l.value=y)},openOnSelect:(r,o,d)=>{const y=u.value.select({id:r,value:o,selected:new Map(v.value),opened:new Set(l.value),children:t.value,parents:a.value,event:d});y&&(l.value=y)},select:(r,o,d)=>{h.emit("click:select",{id:r,value:o,path:f(r),event:d});const y=s.value.select({id:r,value:o,selected:new Map(v.value),children:t.value,parents:a.value,event:d});y&&(v.value=y),b.root.openOnSelect(r,o,d)},activate:(r,o,d)=>{if(!e.activatable)return b.root.select(r,!0,d);h.emit("click:activate",{id:r,value:o,path:f(r),event:d});const y=n.value.activate({id:r,value:o,activated:new Set(S.value),children:t.value,parents:a.value,event:d});y&&(S.value=y)},children:t,parents:a}};return te(K,b),b.root},Xe=(e,i)=>{const t=ee(K,qe),a=Symbol(at()),l=m(()=>e.value!==void 0?e.value:a),n={...t,id:l,open:(s,u)=>t.root.open(l.value,s,u),openOnSelect:(s,u)=>t.root.openOnSelect(l.value,s,u),isOpen:m(()=>t.root.opened.value.has(l.value)),parent:m(()=>t.root.parents.value.get(l.value)),activate:(s,u)=>t.root.activate(l.value,s,u),isActivated:m(()=>t.root.activated.value.has(T(l.value))),select:(s,u)=>t.root.select(l.value,s,u),isSelected:m(()=>t.root.selected.value.get(T(l.value))==="on"),isIndeterminate:m(()=>t.root.selected.value.get(l.value)==="indeterminate"),isLeaf:m(()=>!t.root.children.value.get(l.value)),isGroupActivator:t.isGroupActivator};return!t.isGroupActivator&&t.root.register(l.value,t.id.value,i),fe(()=>{!t.isGroupActivator&&t.root.unregister(l.value)}),i&&te(K,n),n},xt=()=>{const e=ee(K,qe);te(K,{...e,isGroupActivator:!0})};function Mt(){const e=O(!1);return nt(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:m(()=>e.value?void 0:{transition:"none !important"}),isBooted:lt(e)}}const Rt=it({name:"VListGroupActivator",setup(e,i){let{slots:t}=i;return xt(),()=>{var a;return(a=t.default)==null?void 0:a.call(t)}}}),zt=A({activeColor:String,baseColor:String,color:String,collapseIcon:{type:N,default:"$collapse"},expandIcon:{type:N,default:"$expand"},prependIcon:N,appendIcon:N,fluid:Boolean,subgroup:Boolean,title:String,value:null,...z(),...D()},"VListGroup"),_e=R()({name:"VListGroup",props:zt(),setup(e,i){let{slots:t}=i;const{isOpen:a,open:l,id:n}=Xe(w(e,"value"),!0),s=m(()=>`v-list-group--id-${String(n.value)}`),u=We(),{isBooted:S}=Mt();function v(r){l(!a.value,r)}const f=m(()=>({onClick:v,class:"v-list-group__header",id:s.value})),h=m(()=>a.value?e.collapseIcon:e.expandIcon),b=m(()=>({VListItem:{active:a.value,activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&h.value,appendIcon:e.appendIcon||!e.subgroup&&h.value,title:e.title,value:e.value}}));return j(()=>c(e.tag,{class:["v-list-group",{"v-list-group--prepend":u==null?void 0:u.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":a.value},e.class],style:e.style},{default:()=>[t.activator&&c(Z,{defaults:b.value},{default:()=>[c(Rt,null,{default:()=>[t.activator({props:f.value,isOpen:a.value})]})]}),c($,{transition:{component:ft},disabled:!S.value},{default:()=>{var r;return[Y(c("div",{class:"v-list-group__items",role:"group","aria-labelledby":s.value},[(r=t.default)==null?void 0:r.call(t)]),[[Me,a.value]])]}})]})),{isOpen:a}}}),jt=A({opacity:[Number,String],...z(),...D()},"VListItemSubtitle"),Ft=R()({name:"VListItemSubtitle",props:jt(),setup(e,i){let{slots:t}=i;return j(()=>c(e.tag,{class:["v-list-item-subtitle",e.class],style:[{"--v-list-item-subtitle-opacity":e.opacity},e.style]},t)),{}}}),Nt=mt("v-list-item-title");function Dt(e){return{aspectStyles:m(()=>{const i=Number(e.aspectRatio);return i?{paddingBottom:String(1/i*100)+"%"}:void 0})}}const Je=A({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...z(),...me()},"VResponsive"),Be=R()({name:"VResponsive",props:Je(),setup(e,i){let{slots:t}=i;const{aspectStyles:a}=Dt(e),{dimensionStyles:l}=ye(e);return j(()=>{var n;return c("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[l.value,e.style]},[c("div",{class:"v-responsive__sizer",style:a.value},null),(n=t.additional)==null?void 0:n.call(t),t.default&&c("div",{class:["v-responsive__content",e.contentClass]},[t.default()])])}),{}}}),Gt=A({alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...Je(),...z(),...le(),...yt()},"VImg"),pt=R()({name:"VImg",directives:{intersect:St},props:Gt(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,i){let{emit:t,slots:a}=i;const{backgroundColorClasses:l,backgroundColorStyles:n}=ze(w(e,"color")),{roundedClasses:s}=ie(e),u=xe("VImg"),S=O(""),v=P(),f=O(e.eager?"loading":"idle"),h=O(),b=O(),r=m(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),o=m(()=>r.value.aspect||h.value/b.value||0);Q(()=>e.src,()=>{d(f.value!=="idle")}),Q(o,(g,C)=>{!g&&C&&v.value&&V(v.value)}),st(()=>d());function d(g){if(!(e.eager&&g)&&!(rt&&!g&&!e.eager)){if(f.value="loading",r.value.lazySrc){const C=new Image;C.src=r.value.lazySrc,V(C,null)}r.value.src&&ut(()=>{var C;t("loadstart",((C=v.value)==null?void 0:C.currentSrc)||r.value.src),setTimeout(()=>{var M;if(!u.isUnmounted)if((M=v.value)!=null&&M.complete){if(v.value.naturalWidth||_(),f.value==="error")return;o.value||V(v.value,null),f.value==="loading"&&y()}else o.value||V(v.value),F()})})}}function y(){var g;u.isUnmounted||(F(),V(v.value),f.value="loaded",t("load",((g=v.value)==null?void 0:g.currentSrc)||r.value.src))}function _(){var g;u.isUnmounted||(f.value="error",t("error",((g=v.value)==null?void 0:g.currentSrc)||r.value.src))}function F(){const g=v.value;g&&(S.value=g.currentSrc||g.src)}let I=-1;fe(()=>{clearTimeout(I)});function V(g){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const M=()=>{if(clearTimeout(I),u.isUnmounted)return;const{naturalHeight:q,naturalWidth:X}=g;q||X?(h.value=X,b.value=q):!g.complete&&f.value==="loading"&&C!=null?I=window.setTimeout(M,C):(g.currentSrc.endsWith(".svg")||g.currentSrc.startsWith("data:image/svg+xml"))&&(h.value=1,b.value=1)};M()}const x=m(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),G=()=>{var M;if(!r.value.src||f.value==="idle")return null;const g=c("img",{class:["v-img__img",x.value],style:{objectPosition:e.position},src:r.value.src,srcset:r.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:v,onLoad:y,onError:_},null),C=(M=a.sources)==null?void 0:M.call(a);return c($,{transition:e.transition,appear:!0},{default:()=>[Y(C?c("picture",{class:"v-img__picture"},[C,g]):g,[[Me,f.value==="loaded"]])]})},p=()=>c($,{transition:e.transition},{default:()=>[r.value.lazySrc&&f.value!=="loaded"&&c("img",{class:["v-img__img","v-img__img--preload",x.value],style:{objectPosition:e.position},src:r.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),E=()=>a.placeholder?c($,{transition:e.transition,appear:!0},{default:()=>[(f.value==="loading"||f.value==="error"&&!a.error)&&c("div",{class:"v-img__placeholder"},[a.placeholder()])]}):null,U=()=>a.error?c($,{transition:e.transition,appear:!0},{default:()=>[f.value==="error"&&c("div",{class:"v-img__error"},[a.error()])]}):null,W=()=>e.gradient?c("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,B=O(!1);{const g=Q(o,C=>{C&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{B.value=!0})}),g())})}return j(()=>{const g=Be.filterProps(e);return Y(c(Be,oe({class:["v-img",{"v-img--booting":!B.value},l.value,s.value,e.class],style:[{width:de(e.width==="auto"?h.value:e.width)},n.value,e.style]},g,{aspectRatio:o.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>c(ce,null,[c(G,null,null),c(p,null,null),c(W,null,null),c(E,null,null),c(U,null,null)]),default:a.default}),[[Re("intersect"),{handler:d,options:e.options},null,{once:!0}]])}),{currentSrc:S,image:v,state:f,naturalWidth:h,naturalHeight:b}}}),Et=A({start:Boolean,end:Boolean,icon:N,image:String,text:String,...z(),...Se(),...le(),...ht(),...D(),...ae(),...he({variant:"flat"})},"VAvatar"),Le=R()({name:"VAvatar",props:Et(),setup(e,i){let{slots:t}=i;const{themeClasses:a}=ne(e),{colorClasses:l,colorStyles:n,variantClasses:s}=je(e),{densityClasses:u}=be(e),{roundedClasses:S}=ie(e),{sizeClasses:v,sizeStyles:f}=bt(e);return j(()=>c(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},a.value,l.value,u.value,S.value,v.value,s.value,e.class],style:[n.value,f.value,e.style]},{default:()=>[t.default?c(Z,{key:"content-defaults",defaults:{VImg:{cover:!0,image:e.image},VIcon:{icon:e.icon}}},{default:()=>[t.default()]}):e.image?c(pt,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?c(ve,{key:"icon",icon:e.icon},null):e.text,Fe(!1,"v-avatar")]})),{}}}),Ut=A({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:N,baseColor:String,disabled:Boolean,lines:[Boolean,String],link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:N,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,subtitle:[String,Number],title:[String,Number],value:null,onClick:Ae(),onClickOnce:Ae(),...Ne(),...z(),...Se(),...me(),...De(),...le(),...Ct(),...D(),...ae(),...he({variant:"text"})},"VListItem"),Oe=R()({name:"VListItem",directives:{Ripple:kt},props:Ut(),emits:{click:e=>!0},setup(e,i){let{attrs:t,slots:a,emit:l}=i;const n=wt(e,t),s=m(()=>e.value===void 0?n.href.value:e.value),{activate:u,isActivated:S,select:v,isSelected:f,isIndeterminate:h,isGroupActivator:b,root:r,parent:o,openOnSelect:d}=Xe(s,!1),y=We(),_=m(()=>{var k;return e.active!==!1&&(e.active||((k=n.isActive)==null?void 0:k.value)||(r.activatable.value?S.value:f.value))}),F=m(()=>e.link!==!1&&n.isLink.value),I=m(()=>!e.disabled&&e.link!==!1&&(e.link||n.isClickable.value||!!y&&(r.selectable.value||r.activatable.value||e.value!=null))),V=m(()=>e.rounded||e.nav),x=m(()=>e.color??e.activeColor),G=m(()=>({color:_.value?x.value??e.baseColor:e.baseColor,variant:e.variant}));Q(()=>{var k;return(k=n.isActive)==null?void 0:k.value},k=>{k&&o.value!=null&&r.open(o.value,!0),k&&d(k)},{immediate:!0});const{themeClasses:p}=ne(e),{borderClasses:E}=Ge(e),{colorClasses:U,colorStyles:W,variantClasses:B}=je(G),{densityClasses:g}=be(e),{dimensionStyles:C}=ye(e),{elevationClasses:M}=pe(e),{roundedClasses:q}=ie(V),X=m(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),se=m(()=>({isActive:_.value,select:v,isSelected:f.value,isIndeterminate:h.value}));function we(k){var J;l("click",k),I.value&&((J=n.navigate)==null||J.call(n,k),!b&&(r.activatable.value?u(!S.value,k):(r.selectable.value||e.value!=null)&&v(!f.value,k)))}function Ze(k){(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),we(k))}return j(()=>{const k=F.value?"a":e.tag,J=a.title||e.title!=null,et=a.subtitle||e.subtitle!=null,Ie=!!(e.appendAvatar||e.appendIcon),tt=!!(Ie||a.append),Ve=!!(e.prependAvatar||e.prependIcon),re=!!(Ve||a.prepend);return y==null||y.updateHasPrepend(re),e.activeColor&&ct("active-color",["color","base-color"]),Y(c(k,{class:["v-list-item",{"v-list-item--active":_.value,"v-list-item--disabled":e.disabled,"v-list-item--link":I.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!re&&(y==null?void 0:y.hasPrepend.value),"v-list-item--slim":e.slim,[`${e.activeClass}`]:e.activeClass&&_.value},p.value,E.value,U.value,g.value,M.value,X.value,q.value,B.value,e.class],style:[W.value,C.value,e.style],href:n.href.value,tabindex:I.value?y?-2:0:void 0,onClick:we,onKeydown:I.value&&!F.value&&Ze},{default:()=>{var Pe;return[Fe(I.value||_.value,"v-list-item"),re&&c("div",{key:"prepend",class:"v-list-item__prepend"},[a.prepend?c(Z,{key:"prepend-defaults",disabled:!Ve,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>{var L;return[(L=a.prepend)==null?void 0:L.call(a,se.value)]}}):c(ce,null,[e.prependAvatar&&c(Le,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&c(ve,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),c("div",{class:"v-list-item__spacer"},null)]),c("div",{class:"v-list-item__content","data-no-activator":""},[J&&c(Nt,{key:"title"},{default:()=>{var L;return[((L=a.title)==null?void 0:L.call(a,{title:e.title}))??e.title]}}),et&&c(Ft,{key:"subtitle"},{default:()=>{var L;return[((L=a.subtitle)==null?void 0:L.call(a,{subtitle:e.subtitle}))??e.subtitle]}}),(Pe=a.default)==null?void 0:Pe.call(a,se.value)]),tt&&c("div",{key:"append",class:"v-list-item__append"},[a.append?c(Z,{key:"append-defaults",disabled:!Ie,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>{var L;return[(L=a.append)==null?void 0:L.call(a,se.value)]}}):c(ce,null,[e.appendIcon&&c(ve,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&c(Le,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),c("div",{class:"v-list-item__spacer"},null)])]}}),[[Re("ripple"),I.value&&e.ripple]])}),{isGroupActivator:b,isSelected:f,list:y,select:v}}}),Wt=A({color:String,inset:Boolean,sticky:Boolean,title:String,...z(),...D()},"VListSubheader"),Ht=R()({name:"VListSubheader",props:Wt(),setup(e,i){let{slots:t}=i;const{textColorClasses:a,textColorStyles:l}=Ee(w(e,"color"));return j(()=>{const n=!!(t.default||e.title);return c(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},a.value,e.class],style:[{textColorStyles:l},e.style]},{default:()=>{var s;return[n&&c("div",{class:"v-list-subheader__text"},[((s=t.default)==null?void 0:s.call(t))??e.title])]}})}),{}}}),$t=A({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,...z(),...ae()},"VDivider"),Kt=R()({name:"VDivider",props:$t(),setup(e,i){let{attrs:t,slots:a}=i;const{themeClasses:l}=ne(e),{textColorClasses:n,textColorStyles:s}=Ee(w(e,"color")),u=m(()=>{const S={};return e.length&&(S[e.vertical?"maxHeight":"maxWidth"]=de(e.length)),e.thickness&&(S[e.vertical?"borderRightWidth":"borderTopWidth"]=de(e.thickness)),S});return j(()=>{const S=c("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},l.value,n.value,e.class],style:[u.value,s.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":!t.role||t.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${t.role||"separator"}`},null);return a.default?c("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[S,c("div",{class:"v-divider__content"},[a.default()]),S]):S}),{}}}),qt=A({items:Array,returnObject:Boolean},"VListChildren"),Qe=R()({name:"VListChildren",props:qt(),setup(e,i){let{slots:t}=i;return Ue(),()=>{var a,l;return((a=t.default)==null?void 0:a.call(t))??((l=e.items)==null?void 0:l.map(n=>{var b,r;let{children:s,props:u,type:S,raw:v}=n;if(S==="divider")return((b=t.divider)==null?void 0:b.call(t,{props:u}))??c(Kt,u,null);if(S==="subheader")return((r=t.subheader)==null?void 0:r.call(t,{props:u}))??c(Ht,u,null);const f={subtitle:t.subtitle?o=>{var d;return(d=t.subtitle)==null?void 0:d.call(t,{...o,item:v})}:void 0,prepend:t.prepend?o=>{var d;return(d=t.prepend)==null?void 0:d.call(t,{...o,item:v})}:void 0,append:t.append?o=>{var d;return(d=t.append)==null?void 0:d.call(t,{...o,item:v})}:void 0,title:t.title?o=>{var d;return(d=t.title)==null?void 0:d.call(t,{...o,item:v})}:void 0},h=_e.filterProps(u);return s?c(_e,oe({value:u==null?void 0:u.value},h),{activator:o=>{let{props:d}=o;const y={...u,...d,value:e.returnObject?v:u.value};return t.header?t.header({props:y}):c(Oe,y,f)},default:()=>c(Qe,{items:s,returnObject:e.returnObject},t)}):t.item?t.item({props:u}):c(Oe,oe(u,{value:e.returnObject?v:u.value}),f)}))}}}),Xt=A({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean,valueComparator:{type:Function,default:ot}},"list-items");function Jt(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"}function Qt(e,i){const t=H(i,e.itemType,"item"),a=Jt(i)?i:H(i,e.itemTitle),l=H(i,e.itemValue,void 0),n=H(i,e.itemChildren),s=e.itemProps===!0?gt(i,["children"]):H(i,e.itemProps),u={title:a,value:l,...s};return{type:t,title:u.title,value:u.value,props:u,children:t==="item"&&n?Ye(e,n):void 0,raw:i}}function Ye(e,i){const t=[];for(const a of i)t.push(Qt(e,a));return t}function Yt(e){return{items:m(()=>Ye(e,e.items))}}const Zt=A({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,expandIcon:String,collapseIcon:String,lines:{type:[Boolean,String],default:"one"},slim:Boolean,nav:Boolean,...Ot({selectStrategy:"single-leaf",openStrategy:"list"}),...Ne(),...z(),...Se(),...me(),...De(),itemType:{type:String,default:"type"},...Xt(),...le(),...D(),...ae(),...he({variant:"text"})},"VList"),aa=R()({name:"VList",props:Zt(),emits:{"update:selected":e=>!0,"update:activated":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:activate":e=>!0,"click:select":e=>!0},setup(e,i){let{slots:t}=i;const{items:a}=Yt(e),{themeClasses:l}=ne(e),{backgroundColorClasses:n,backgroundColorStyles:s}=ze(w(e,"bgColor")),{borderClasses:u}=Ge(e),{densityClasses:S}=be(e),{dimensionStyles:v}=ye(e),{elevationClasses:f}=pe(e),{roundedClasses:h}=ie(e),{children:b,open:r,parents:o,select:d}=Tt(e),y=m(()=>e.lines?`v-list--${e.lines}-line`:void 0),_=w(e,"activeColor"),F=w(e,"baseColor"),I=w(e,"color");Ue(),dt({VListGroup:{activeColor:_,baseColor:F,color:I,expandIcon:w(e,"expandIcon"),collapseIcon:w(e,"collapseIcon")},VListItem:{activeClass:w(e,"activeClass"),activeColor:_,baseColor:F,color:I,density:w(e,"density"),disabled:w(e,"disabled"),lines:w(e,"lines"),nav:w(e,"nav"),slim:w(e,"slim"),variant:w(e,"variant")}});const V=O(!1),x=P();function G(g){V.value=!0}function p(g){V.value=!1}function E(g){var C;!V.value&&!(g.relatedTarget&&((C=x.value)!=null&&C.contains(g.relatedTarget)))&&B()}function U(g){const C=g.target;if(!(!x.value||["INPUT","TEXTAREA"].includes(C.tagName))){if(g.key==="ArrowDown")B("next");else if(g.key==="ArrowUp")B("prev");else if(g.key==="Home")B("first");else if(g.key==="End")B("last");else return;g.preventDefault()}}function W(g){V.value=!0}function B(g){if(x.value)return vt(x.value,g)}return j(()=>c(e.tag,{ref:x,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav,"v-list--slim":e.slim},l.value,n.value,u.value,S.value,f.value,y.value,h.value,e.class],style:[s.value,v.value,e.style],tabindex:e.disabled||V.value?-1:0,role:"listbox","aria-activedescendant":void 0,onFocusin:G,onFocusout:p,onFocus:E,onKeydown:U,onMousedown:W},{default:()=>[c(Qe,{items:a.value,returnObject:e.returnObject},t)]})),{open:r,select:d,focus:B,children:b,parents:o}}});export{Oe as V,aa as a,Le as b,pt as c,Ht as d,Mt as u};