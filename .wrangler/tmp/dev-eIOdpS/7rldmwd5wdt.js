var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn3, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn3 && (res = (0, fn3[__getOwnPropNames(fn3)[0]])(fn3 = 0)), res;
  } catch (e9) {
    throw err = [e9], e9;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// node_modules/.pnpm/wrangler@4.110.0/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/.pnpm/wrangler@4.110.0/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/_/shared.esm-bundler.mjs
function makeMap(e9) {
  const t5 = /* @__PURE__ */ Object.create(null);
  for (const a5 of e9.split(",")) t5[a5] = 1;
  return (e10) => e10 in t5;
}
function generateCodeFrame(e9, t5 = 0, a5 = e9.length) {
  if ((t5 = Math.max(0, Math.min(t5, e9.length))) > (a5 = Math.max(0, Math.min(a5, e9.length)))) return "";
  let n6 = e9.split(/(\r?\n)/);
  const r4 = n6.filter((e10, t6) => t6 % 2 == 1);
  n6 = n6.filter((e10, t6) => t6 % 2 == 0);
  let i6 = 0;
  const o5 = [];
  for (let e10 = 0; e10 < n6.length; e10++) if (i6 += n6[e10].length + (r4[e10] && r4[e10].length || 0), i6 >= t5) {
    for (let s6 = e10 - 2; s6 <= e10 + 2 || a5 > i6; s6++) {
      if (s6 < 0 || s6 >= n6.length) continue;
      const l4 = s6 + 1;
      o5.push(`${l4}${" ".repeat(Math.max(3 - String(l4).length, 0))}|  ${n6[s6]}`);
      const c4 = n6[s6].length, p6 = r4[s6] && r4[s6].length || 0;
      if (s6 === e10) {
        const e11 = t5 - (i6 - (c4 + p6)), n7 = Math.max(1, a5 > i6 ? c4 - e11 : a5 - t5);
        o5.push("   |  " + " ".repeat(e11) + "^".repeat(n7));
      } else if (s6 > e10) {
        if (a5 > i6) {
          const e11 = Math.max(Math.min(a5 - i6, c4), 1);
          o5.push("   |  " + "^".repeat(e11));
        }
        i6 += c4 + p6;
      }
    }
    break;
  }
  return o5.join("\n");
}
function normalizeStyle(e9) {
  if (i(e9)) {
    const t5 = {};
    for (let a5 = 0; a5 < e9.length; a5++) {
      const n6 = e9[a5], r4 = isString(n6) ? parseStringStyle(n6) : normalizeStyle(n6);
      if (r4) for (const e10 in r4) t5[e10] = r4[e10];
    }
    return t5;
  }
  if (isString(e9) || isObject(e9)) return e9;
}
function parseStringStyle(e9) {
  const t5 = {};
  return e9.replace(N, "").split(A).forEach((e10) => {
    if (e10) {
      const a5 = e10.split(T);
      a5.length > 1 && (t5[a5[0].trim()] = a5[1].trim());
    }
  }), t5;
}
function stringifyStyle(e9) {
  if (!e9) return "";
  if (isString(e9)) return e9;
  let t5 = "";
  for (const a5 in e9) {
    const n6 = e9[a5];
    if (isString(n6) || "number" == typeof n6) {
      t5 += `${a5.startsWith("--") ? a5 : d(a5)}:${n6};`;
    }
  }
  return t5;
}
function normalizeClass(e9) {
  let t5 = "";
  if (isString(e9)) t5 = e9;
  else if (i(e9)) for (let a5 = 0; a5 < e9.length; a5++) {
    const n6 = normalizeClass(e9[a5]);
    n6 && (t5 += n6 + " ");
  }
  else if (isObject(e9)) for (const a5 in e9) e9[a5] && (t5 += a5 + " ");
  return t5.trim();
}
function normalizeProps(e9) {
  if (!e9) return null;
  let { class: t5, style: a5 } = e9;
  return t5 && !isString(t5) && (e9.class = normalizeClass(t5)), a5 && (e9.style = normalizeStyle(a5)), e9;
}
function includeBooleanAttr(e9) {
  return !!e9 || "" === e9;
}
function isSSRSafeAttrName(e9) {
  if (L.hasOwnProperty(e9)) return L[e9];
  const t5 = _.test(e9);
  return t5 && console.error(`unsafe attribute name: ${e9}`), L[e9] = !t5;
}
function isRenderableAttrValue(e9) {
  if (null == e9) return false;
  const t5 = typeof e9;
  return "string" === t5 || "number" === t5 || "boolean" === t5;
}
function escapeHtml(e9) {
  const t5 = "" + e9, a5 = z.exec(t5);
  if (!a5) return t5;
  let n6, r4, i6 = "", o5 = 0;
  for (r4 = a5.index; r4 < t5.length; r4++) {
    switch (t5.charCodeAt(r4)) {
      case 34:
        n6 = "&quot;";
        break;
      case 38:
        n6 = "&amp;";
        break;
      case 39:
        n6 = "&#39;";
        break;
      case 60:
        n6 = "&lt;";
        break;
      case 62:
        n6 = "&gt;";
        break;
      default:
        continue;
    }
    o5 !== r4 && (i6 += t5.slice(o5, r4)), o5 = r4 + 1, i6 += n6;
  }
  return o5 !== r4 ? i6 + t5.slice(o5, r4) : i6;
}
function escapeHtmlComment(e9) {
  return e9.replace(I, "");
}
function looseEqual(e9, t5) {
  if (e9 === t5) return true;
  let a5 = isDate(e9), n6 = isDate(t5);
  if (a5 || n6) return !(!a5 || !n6) && e9.getTime() === t5.getTime();
  if (a5 = isSymbol(e9), n6 = isSymbol(t5), a5 || n6) return e9 === t5;
  if (a5 = i(e9), n6 = i(t5), a5 || n6) return !(!a5 || !n6) && (function(e10, t6) {
    if (e10.length !== t6.length) return false;
    let a6 = true;
    for (let n7 = 0; a6 && n7 < e10.length; n7++) a6 = looseEqual(e10[n7], t6[n7]);
    return a6;
  })(e9, t5);
  if (a5 = isObject(e9), n6 = isObject(t5), a5 || n6) {
    if (!a5 || !n6) return false;
    if (Object.keys(e9).length !== Object.keys(t5).length) return false;
    for (const a6 in e9) {
      const n7 = e9.hasOwnProperty(a6), r4 = t5.hasOwnProperty(a6);
      if (n7 && !r4 || !n7 && r4 || !looseEqual(e9[a6], t5[a6])) return false;
    }
  }
  return String(e9) === String(t5);
}
function looseIndexOf(e9, t5) {
  return e9.findIndex((e10) => looseEqual(e10, t5));
}
function normalizeCssVarValue(e9) {
  return null == e9 ? "initial" : "string" == typeof e9 ? "" === e9 ? " " : e9 : String(e9);
}
var t, a, NOOP, NO, isOn, isModelListener, n, remove, r, hasOwn, i, isMap, isSet, isDate, isRegExp, isFunction, isString, isSymbol, isObject, isPromise, o, toTypeString, toRawType, isPlainObject, isIntegerKey, s, l, cacheStringFunction, c, p, m, d, f, u, hasChanged, invokeArrayFns, def, looseToNumber, toNumber, g, getGlobalThis, h, y, b, E, S, A, T, N, k, O, M, C, x, v, R, _, L, P, w, D, F, z, I, U, isRef, toDisplayString, replacer, stringifySymbol, j;
var init_shared_esm_bundler = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/_/shared.esm-bundler.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    __name(makeMap, "makeMap");
    t = {};
    a = [];
    NOOP = /* @__PURE__ */ __name(() => {
    }, "NOOP");
    NO = /* @__PURE__ */ __name(() => false, "NO");
    isOn = /* @__PURE__ */ __name((e9) => 111 === e9.charCodeAt(0) && 110 === e9.charCodeAt(1) && (e9.charCodeAt(2) > 122 || e9.charCodeAt(2) < 97), "isOn");
    isModelListener = /* @__PURE__ */ __name((e9) => e9.startsWith("onUpdate:"), "isModelListener");
    n = Object.assign;
    remove = /* @__PURE__ */ __name((e9, t5) => {
      const a5 = e9.indexOf(t5);
      a5 > -1 && e9.splice(a5, 1);
    }, "remove");
    r = Object.prototype.hasOwnProperty;
    hasOwn = /* @__PURE__ */ __name((e9, t5) => r.call(e9, t5), "hasOwn");
    i = Array.isArray;
    isMap = /* @__PURE__ */ __name((e9) => "[object Map]" === toTypeString(e9), "isMap");
    isSet = /* @__PURE__ */ __name((e9) => "[object Set]" === toTypeString(e9), "isSet");
    isDate = /* @__PURE__ */ __name((e9) => "[object Date]" === toTypeString(e9), "isDate");
    isRegExp = /* @__PURE__ */ __name((e9) => "[object RegExp]" === toTypeString(e9), "isRegExp");
    isFunction = /* @__PURE__ */ __name((e9) => "function" == typeof e9, "isFunction");
    isString = /* @__PURE__ */ __name((e9) => "string" == typeof e9, "isString");
    isSymbol = /* @__PURE__ */ __name((e9) => "symbol" == typeof e9, "isSymbol");
    isObject = /* @__PURE__ */ __name((e9) => null !== e9 && "object" == typeof e9, "isObject");
    isPromise = /* @__PURE__ */ __name((e9) => (isObject(e9) || isFunction(e9)) && isFunction(e9.then) && isFunction(e9.catch), "isPromise");
    o = Object.prototype.toString;
    toTypeString = /* @__PURE__ */ __name((e9) => o.call(e9), "toTypeString");
    toRawType = /* @__PURE__ */ __name((e9) => toTypeString(e9).slice(8, -1), "toRawType");
    isPlainObject = /* @__PURE__ */ __name((e9) => "[object Object]" === toTypeString(e9), "isPlainObject");
    isIntegerKey = /* @__PURE__ */ __name((e9) => isString(e9) && "NaN" !== e9 && "-" !== e9[0] && "" + parseInt(e9, 10) === e9, "isIntegerKey");
    s = makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
    l = makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
    cacheStringFunction = /* @__PURE__ */ __name((e9) => {
      const t5 = /* @__PURE__ */ Object.create(null);
      return (a5) => t5[a5] || (t5[a5] = e9(a5));
    }, "cacheStringFunction");
    c = /-\w/g;
    p = cacheStringFunction((e9) => e9.replace(c, (e10) => e10.slice(1).toUpperCase()));
    m = /\B([A-Z])/g;
    d = cacheStringFunction((e9) => e9.replace(m, "-$1").toLowerCase());
    f = cacheStringFunction((e9) => e9.charAt(0).toUpperCase() + e9.slice(1));
    u = cacheStringFunction((e9) => e9 ? `on${f(e9)}` : "");
    hasChanged = /* @__PURE__ */ __name((e9, t5) => !Object.is(e9, t5), "hasChanged");
    invokeArrayFns = /* @__PURE__ */ __name((e9, ...t5) => {
      for (let a5 = 0; a5 < e9.length; a5++) e9[a5](...t5);
    }, "invokeArrayFns");
    def = /* @__PURE__ */ __name((e9, t5, a5, n6 = false) => {
      Object.defineProperty(e9, t5, { configurable: true, enumerable: false, writable: n6, value: a5 });
    }, "def");
    looseToNumber = /* @__PURE__ */ __name((e9) => {
      const t5 = parseFloat(e9);
      return isNaN(t5) ? e9 : t5;
    }, "looseToNumber");
    toNumber = /* @__PURE__ */ __name((e9) => {
      const t5 = isString(e9) ? Number(e9) : NaN;
      return isNaN(t5) ? e9 : t5;
    }, "toNumber");
    getGlobalThis = /* @__PURE__ */ __name(() => g || (g = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : void 0 !== Fr ? Fr : {}), "getGlobalThis");
    h = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
    y = { 1: "TEXT", 2: "CLASS", 4: "STYLE", 8: "PROPS", 16: "FULL_PROPS", 32: "NEED_HYDRATION", 64: "STABLE_FRAGMENT", 128: "KEYED_FRAGMENT", 256: "UNKEYED_FRAGMENT", 512: "NEED_PATCH", 1024: "DYNAMIC_SLOTS", 2048: "DEV_ROOT_FRAGMENT", [-1]: "CACHED", [-2]: "BAIL" };
    b = { 1: "STABLE", 2: "DYNAMIC", 3: "FORWARDED" };
    E = makeMap("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
    S = E;
    __name(generateCodeFrame, "generateCodeFrame");
    __name(normalizeStyle, "normalizeStyle");
    A = /;(?![^(]*\))/g;
    T = /:([^]+)/;
    N = /\/\*[^]*?\*\//g;
    __name(parseStringStyle, "parseStringStyle");
    __name(stringifyStyle, "stringifyStyle");
    __name(normalizeClass, "normalizeClass");
    __name(normalizeProps, "normalizeProps");
    k = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot");
    O = makeMap("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view");
    M = makeMap("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics");
    C = makeMap("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr");
    x = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
    v = makeMap(x);
    R = makeMap(x + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
    __name(includeBooleanAttr, "includeBooleanAttr");
    _ = /[>/="'\u0009\u000a\u000c\u0020]/;
    L = {};
    __name(isSSRSafeAttrName, "isSSRSafeAttrName");
    P = { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" };
    w = makeMap("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap");
    D = makeMap("xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan");
    F = makeMap("accent,accentunder,actiontype,align,alignmentscope,altimg,altimg-height,altimg-valign,altimg-width,alttext,bevelled,close,columnsalign,columnlines,columnspan,denomalign,depth,dir,display,displaystyle,encoding,equalcolumns,equalrows,fence,fontstyle,fontweight,form,frame,framespacing,groupalign,height,href,id,indentalign,indentalignfirst,indentalignlast,indentshift,indentshiftfirst,indentshiftlast,indextype,justify,largetop,largeop,lquote,lspace,mathbackground,mathcolor,mathsize,mathvariant,maxsize,minlabelspacing,mode,other,overflow,position,rowalign,rowlines,rowspan,rquote,rspace,scriptlevel,scriptminsize,scriptsizemultiplier,selection,separator,separators,shift,side,src,stackalign,stretchy,subscriptshift,superscriptshift,symmetric,voffset,width,widths,xlink:href,xlink:show,xlink:type,xmlns");
    __name(isRenderableAttrValue, "isRenderableAttrValue");
    z = /["'&<>]/;
    __name(escapeHtml, "escapeHtml");
    I = /^-?>|<!--|-->|--!>|<!-$/g;
    __name(escapeHtmlComment, "escapeHtmlComment");
    U = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
    __name(looseEqual, "looseEqual");
    __name(looseIndexOf, "looseIndexOf");
    isRef = /* @__PURE__ */ __name((e9) => !(!e9 || true !== e9.__v_isRef), "isRef");
    toDisplayString = /* @__PURE__ */ __name((e9) => isString(e9) ? e9 : null == e9 ? "" : i(e9) || isObject(e9) && (e9.toString === o || !isFunction(e9.toString)) ? isRef(e9) ? toDisplayString(e9.value) : JSON.stringify(e9, replacer, 2) : String(e9), "toDisplayString");
    replacer = /* @__PURE__ */ __name((e9, t5) => isRef(t5) ? replacer(e9, t5.value) : isMap(t5) ? { [`Map(${t5.size})`]: [...t5.entries()].reduce((e10, [t6, a5], n6) => (e10[stringifySymbol(t6, n6) + " =>"] = a5, e10), {}) } : isSet(t5) ? { [`Set(${t5.size})`]: [...t5.values()].map((e10) => stringifySymbol(e10)) } : isSymbol(t5) ? stringifySymbol(t5) : !isObject(t5) || i(t5) || isPlainObject(t5) ? t5 : String(t5), "replacer");
    stringifySymbol = /* @__PURE__ */ __name((e9, t5 = "") => {
      var a5;
      return isSymbol(e9) ? `Symbol(${null != (a5 = e9.description) ? a5 : t5})` : e9;
    }, "stringifySymbol");
    __name(normalizeCssVarValue, "normalizeCssVarValue");
    j = Object.freeze(Object.defineProperty({ __proto__: null, EMPTY_ARR: a, EMPTY_OBJ: t, NO, NOOP, PatchFlagNames: y, PatchFlags: { TEXT: 1, 1: "TEXT", CLASS: 2, 2: "CLASS", STYLE: 4, 4: "STYLE", PROPS: 8, 8: "PROPS", FULL_PROPS: 16, 16: "FULL_PROPS", NEED_HYDRATION: 32, 32: "NEED_HYDRATION", STABLE_FRAGMENT: 64, 64: "STABLE_FRAGMENT", KEYED_FRAGMENT: 128, 128: "KEYED_FRAGMENT", UNKEYED_FRAGMENT: 256, 256: "UNKEYED_FRAGMENT", NEED_PATCH: 512, 512: "NEED_PATCH", DYNAMIC_SLOTS: 1024, 1024: "DYNAMIC_SLOTS", DEV_ROOT_FRAGMENT: 2048, 2048: "DEV_ROOT_FRAGMENT", CACHED: -1, "-1": "CACHED", BAIL: -2, "-2": "BAIL" }, ShapeFlags: { ELEMENT: 1, 1: "ELEMENT", FUNCTIONAL_COMPONENT: 2, 2: "FUNCTIONAL_COMPONENT", STATEFUL_COMPONENT: 4, 4: "STATEFUL_COMPONENT", TEXT_CHILDREN: 8, 8: "TEXT_CHILDREN", ARRAY_CHILDREN: 16, 16: "ARRAY_CHILDREN", SLOTS_CHILDREN: 32, 32: "SLOTS_CHILDREN", TELEPORT: 64, 64: "TELEPORT", SUSPENSE: 128, 128: "SUSPENSE", COMPONENT_SHOULD_KEEP_ALIVE: 256, 256: "COMPONENT_SHOULD_KEEP_ALIVE", COMPONENT_KEPT_ALIVE: 512, 512: "COMPONENT_KEPT_ALIVE", COMPONENT: 6, 6: "COMPONENT" }, SlotFlags: { STABLE: 1, 1: "STABLE", DYNAMIC: 2, 2: "DYNAMIC", FORWARDED: 3, 3: "FORWARDED" }, camelize: p, capitalize: f, cssVarNameEscapeSymbolsRE: U, def, escapeHtml, escapeHtmlComment, extend: n, genCacheKey: /* @__PURE__ */ __name(function(e9, t5) {
      return e9 + JSON.stringify(t5, (e10, t6) => "function" == typeof t6 ? t6.toString() : t6);
    }, "genCacheKey"), genPropsAccessExp: /* @__PURE__ */ __name(function(e9) {
      return h.test(e9) ? `__props.${e9}` : `__props[${JSON.stringify(e9)}]`;
    }, "genPropsAccessExp"), generateCodeFrame, getEscapedCssVarName: /* @__PURE__ */ __name(function(e9, t5) {
      return e9.replace(U, (e10) => t5 ? '"' === e10 ? '\\\\\\"' : `\\\\${e10}` : `\\${e10}`);
    }, "getEscapedCssVarName"), getGlobalThis, hasChanged, hasOwn, hyphenate: d, includeBooleanAttr, invokeArrayFns, isArray: i, isBooleanAttr: R, isBuiltInDirective: l, isDate, isFunction, isGloballyAllowed: E, isGloballyWhitelisted: S, isHTMLTag: k, isIntegerKey, isKnownHtmlAttr: w, isKnownMathMLAttr: F, isKnownSvgAttr: D, isMap, isMathMLTag: M, isModelListener, isObject, isOn, isPlainObject, isPromise, isRegExp, isRenderableAttrValue, isReservedProp: s, isSSRSafeAttrName, isSVGTag: O, isSet, isSpecialBooleanAttr: v, isString, isSymbol, isVoidTag: C, looseEqual, looseIndexOf, looseToNumber, makeMap, normalizeClass, normalizeCssVarValue, normalizeProps, normalizeStyle, objectToString: o, parseStringStyle, propsToAttrMap: P, remove, slotFlagsText: b, stringifyStyle, toDisplayString, toHandlerKey: u, toNumber, toRawType, toTypeString }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/_/error-500.mjs
var error_500_exports = {};
__export(error_500_exports, {
  template: () => template
});
var t2, template;
var init_error_500 = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/_/error-500.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_shared_esm_bundler();
    init_nitro();
    t2 = { appName: "Nuxt", status: 500, statusText: "Internal server error", description: "This page is temporarily unavailable.", refresh: "Refresh this page" };
    template = /* @__PURE__ */ __name((n6) => (n6 = { ...t2, ...n6 }, '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(n6.status) + " - " + escapeHtml(n6.statusText) + " | " + escapeHtml(n6.appName) + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();</script><style>*,:after,:before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide"><div class="max-w-520px text-center"><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]">` + escapeHtml(n6.status) + '</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl">' + escapeHtml(n6.statusText) + '</h2><p class="mb-4 px-2 text-[#64748B] text-md">' + escapeHtml(n6.description) + "</p></div></body></html>"), "template");
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/client.precomputed.mjs
var client_precomputed_exports = {};
__export(client_precomputed_exports, {
  default: () => e
});
var e, s2, o2, p2, r2, l2, n2, d2;
var init_client_precomputed = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/client.precomputed.mjs"() {
    "use strict";
    init_modules_watch_stub();
    e = { dependencies: { "_DlAUqK2U.js": { scripts: {}, styles: {}, preload: { "_DlAUqK2U.js": s2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DlAUqK2U.js", name: "_plugin-vue_export-helper" } }, prefetch: {} }, "_C0sIP8vJ.js": { scripts: {}, styles: {}, preload: { "_C0sIP8vJ.js": o2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "C0sIP8vJ.js", name: "composables", imports: ["node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js"] } }, prefetch: {} }, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue": { scripts: {}, styles: {}, preload: { "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue": p2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Bnr0mSJi.js", name: "error-404", src: "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue", isDynamicEntry: true, imports: ["node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js", "_DlAUqK2U.js", "_C0sIP8vJ.js"], css: [] }, "_DlAUqK2U.js": s2, "_C0sIP8vJ.js": o2 }, prefetch: {} }, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue": { scripts: {}, styles: {}, preload: { "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue": r2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DlM8HypS.js", name: "error-500", src: "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue", isDynamicEntry: true, imports: ["_DlAUqK2U.js", "_C0sIP8vJ.js", "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js"], css: [] }, "_DlAUqK2U.js": s2, "_C0sIP8vJ.js": o2 }, prefetch: {} }, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js": { scripts: { "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js": l2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DMDkx4gX.js", name: "entry", src: "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js", isEntry: true, dynamicImports: ["node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue", "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue"], css: ["entry.ClnncQN-.css"] } }, styles: { "entry.ClnncQN-.css": n2 = { file: "entry.ClnncQN-.css", resourceType: "style", prefetch: true, preload: true } }, preload: { "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js": l2, "entry.ClnncQN-.css": n2 }, prefetch: { "entry.ClnncQN-.css": n2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue": p2, "_DlAUqK2U.js": s2, "_C0sIP8vJ.js": o2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue": r2 } }, "_BHlg4_SZ.js": { scripts: {}, styles: { "entry.ClnncQN-.css": n2 }, preload: { "_BHlg4_SZ.js": d2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BHlg4_SZ.js", name: "Footer", imports: ["node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js"] }, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js": l2, "entry.ClnncQN-.css": n2 }, prefetch: { "entry.ClnncQN-.css": n2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue": p2, "_DlAUqK2U.js": s2, "_C0sIP8vJ.js": o2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue": r2 } }, "error-404.oz9wUqPg.css": { scripts: {}, styles: {}, preload: { "error-404.oz9wUqPg.css": { file: "error-404.oz9wUqPg.css", resourceType: "style", prefetch: true, preload: true } }, prefetch: {} }, "error-500.BAq6mZr2.css": { scripts: {}, styles: {}, preload: { "error-500.BAq6mZr2.css": { file: "error-500.BAq6mZr2.css", resourceType: "style", prefetch: true, preload: true } }, prefetch: {} }, "entry.ClnncQN-.css": { scripts: {}, styles: {}, preload: { "entry.ClnncQN-.css": n2 }, prefetch: {} }, "pages/admin.vue": { scripts: {}, styles: { "entry.ClnncQN-.css": n2 }, preload: { "pages/admin.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "MV8VcNpN.js", name: "admin", src: "pages/admin.vue", isDynamicEntry: true, imports: ["node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js", "_DlAUqK2U.js"], css: [] }, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js": l2, "entry.ClnncQN-.css": n2, "_DlAUqK2U.js": s2 }, prefetch: { "entry.ClnncQN-.css": n2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue": p2, "_DlAUqK2U.js": s2, "_C0sIP8vJ.js": o2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue": r2 } }, "admin.DhgIbTkp.css": { scripts: {}, styles: {}, preload: { "admin.DhgIbTkp.css": { file: "admin.DhgIbTkp.css", resourceType: "style", prefetch: true, preload: true } }, prefetch: {} }, "pages/checkout.vue": { scripts: {}, styles: { "entry.ClnncQN-.css": n2 }, preload: { "pages/checkout.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "wVa8GXPB.js", name: "checkout", src: "pages/checkout.vue", isDynamicEntry: true, imports: ["_BHlg4_SZ.js", "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js"] }, "_BHlg4_SZ.js": d2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js": l2, "entry.ClnncQN-.css": n2 }, prefetch: { "entry.ClnncQN-.css": n2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue": p2, "_DlAUqK2U.js": s2, "_C0sIP8vJ.js": o2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue": r2 } }, "pages/index.vue": { scripts: {}, styles: { "entry.ClnncQN-.css": n2 }, preload: { "pages/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "C7UvdaDj.js", name: "index", src: "pages/index.vue", isDynamicEntry: true, imports: ["_BHlg4_SZ.js", "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js", "_DlAUqK2U.js"], css: [] }, "_BHlg4_SZ.js": d2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js": l2, "entry.ClnncQN-.css": n2, "_DlAUqK2U.js": s2 }, prefetch: { "entry.ClnncQN-.css": n2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue": p2, "_DlAUqK2U.js": s2, "_C0sIP8vJ.js": o2, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue": r2 } }, "index.8AoJSg6i.css": { scripts: {}, styles: {}, preload: { "index.8AoJSg6i.css": { file: "index.8AoJSg6i.css", resourceType: "style", prefetch: true, preload: true } }, prefetch: {} } }, entrypoints: ["node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js"], modules: { "_BHlg4_SZ.js": { file: "BHlg4_SZ.js", resourceType: "script", mimeType: void 0, module: true }, "_C0sIP8vJ.js": { file: "C0sIP8vJ.js", resourceType: "script", mimeType: void 0, module: true }, "_DlAUqK2U.js": { file: "DlAUqK2U.js", resourceType: "script", mimeType: void 0, module: true }, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue": { file: "Bnr0mSJi.js", resourceType: "script", mimeType: void 0, module: true }, "error-404.oz9wUqPg.css": { file: "error-404.oz9wUqPg.css", resourceType: "style", mimeType: void 0, module: void 0 }, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue": { file: "DlM8HypS.js", resourceType: "script", mimeType: void 0, module: true }, "error-500.BAq6mZr2.css": { file: "error-500.BAq6mZr2.css", resourceType: "style", mimeType: void 0, module: void 0 }, "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/entry.js": { file: "DMDkx4gX.js", resourceType: "script", mimeType: void 0, module: true }, "entry.ClnncQN-.css": { file: "entry.ClnncQN-.css", resourceType: "style", mimeType: void 0, module: void 0 }, "pages/admin.vue": { file: "MV8VcNpN.js", resourceType: "script", mimeType: void 0, module: true }, "admin.DhgIbTkp.css": { file: "admin.DhgIbTkp.css", resourceType: "style", mimeType: void 0, module: void 0 }, "pages/checkout.vue": { file: "wVa8GXPB.js", resourceType: "script", mimeType: void 0, module: true }, "pages/index.vue": { file: "C7UvdaDj.js", resourceType: "script", mimeType: void 0, module: true }, "index.8AoJSg6i.css": { file: "index.8AoJSg6i.css", resourceType: "style", mimeType: void 0, module: void 0 } } };
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/_plugin-vue_export-helper-1tPrXgE0.mjs
var _export_sfc;
var init_plugin_vue_export_helper_1tPrXgE0 = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/_plugin-vue_export-helper-1tPrXgE0.mjs"() {
    "use strict";
    init_modules_watch_stub();
    _export_sfc = /* @__PURE__ */ __name((o5, t5) => {
      const c4 = o5.__vccOpts || o5;
      for (const [o6, s6] of t5) c4[o6] = s6;
      return c4;
    }, "_export_sfc");
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/admin-XlfpIs7m.mjs
var admin_XlfpIs7m_exports = {};
__export(admin_XlfpIs7m_exports, {
  default: () => u2
});
var i2, v2, u2;
var init_admin_XlfpIs7m = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/admin-XlfpIs7m.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_plugin_vue_export_helper_1tPrXgE0();
    init_server();
    init_renderer();
    init_shared_esm_bundler();
    init_nitro();
    i2 = ln.defineComponent({ __name: "admin", __ssrInlineRender: true, setup(e9) {
      const i6 = ln.ref(""), v5 = ln.ref(""), u6 = ln.ref(""), c4 = ln.ref(false), f4 = ln.ref([]), x7 = ln.ref(false), p6 = ln.ref(""), m4 = ["buques", "cestas", "presentes", "destaques"], b4 = ln.ref({ id: "", name: "", description: "", price: 0, oldPrice: null, category: "buques", categories: ["buques"], image: "", images: [], featured: false, installments: "" }), g3 = ln.ref(null), h5 = ln.ref(false), w3 = ln.ref("products"), y4 = ln.ref(null), k4 = ln.ref(""), j3 = ln.ref([]), $2 = ln.ref(false), C3 = ln.ref({ id: "", name: "", image: "" }), P3 = ln.ref(false), M3 = ln.ref(false), B2 = ln.ref(""), q2 = ln.ref(null), z3 = ln.ref(""), L3 = ln.computed(() => f4.value.filter((e10) => e10.featured));
      function formatPrice(e10) {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(e10);
      }
      __name(formatPrice, "formatPrice");
      return (e10, A3, E3, H2) => {
        A3(`<div${ssrRenderAttrs(ln.mergeProps({ class: "min-h-screen bg-neutral-100 font-sans" }, H2))} data-v-e9ef0592>`), i6.value ? (A3('<div data-v-e9ef0592><header class="bg-burgundy text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-40" data-v-e9ef0592><div class="flex items-center space-x-3" data-v-e9ef0592><div class="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-v-e9ef0592></path></svg></div><div data-v-e9ef0592><h1 class="font-extrabold text-base leading-none" data-v-e9ef0592>Painel Admin</h1><p class="text-white/60 text-[11px]" data-v-e9ef0592>Rosas Presentes</p></div></div><div class="flex items-center space-x-3" data-v-e9ef0592><a href="/" target="_blank" class="text-xs text-white/70 hover:text-white flex items-center space-x-1 transition-colors" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-e9ef0592></path></svg><span data-v-e9ef0592>Ver loja</span></a><button class="text-xs text-white/70 hover:text-white flex items-center space-x-1 transition-colors" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-e9ef0592></path></svg><span data-v-e9ef0592>Sair</span></button></div></header>'), k4.value ? A3(`<div class="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-xl flex items-center space-x-2 animate-pulse" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" data-v-e9ef0592></path></svg><span data-v-e9ef0592>${ssrInterpolate(k4.value)}</span></div>`) : A3("<!---->"), A3(`<div class="max-w-6xl mx-auto px-4 pt-6" data-v-e9ef0592><div class="flex space-x-2 mb-6" data-v-e9ef0592><button class="${ssrRenderClass(["products" === w3.value ? "bg-burgundy text-white shadow-md" : "bg-white text-neutral-600 hover:bg-neutral-50", "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"])}" data-v-e9ef0592>Produtos</button><button class="${ssrRenderClass(["categories" === w3.value ? "bg-burgundy text-white shadow-md" : "bg-white text-neutral-600 hover:bg-neutral-50", "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"])}" data-v-e9ef0592>Categorias</button><button class="${ssrRenderClass(["guide" === w3.value ? "bg-burgundy text-white shadow-md" : "bg-white text-neutral-600 hover:bg-neutral-50", "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"])}" data-v-e9ef0592>Como usar</button></div>`), "products" === w3.value ? (A3(`<div data-v-e9ef0592><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-v-e9ef0592><div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm" data-v-e9ef0592><p class="text-xs text-neutral-500 font-medium" data-v-e9ef0592>Total produtos</p><p class="text-2xl font-extrabold text-burgundy mt-0.5" data-v-e9ef0592>${ssrInterpolate(f4.value.length)}</p></div><div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm" data-v-e9ef0592><p class="text-xs text-neutral-500 font-medium" data-v-e9ef0592>Destaques (banners)</p><p class="text-2xl font-extrabold text-burgundy mt-0.5" data-v-e9ef0592>${ssrInterpolate(L3.value.length)}</p></div><div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm" data-v-e9ef0592><p class="text-xs text-neutral-500 font-medium" data-v-e9ef0592>Buqu\xEAs</p><p class="text-2xl font-extrabold text-burgundy mt-0.5" data-v-e9ef0592>${ssrInterpolate(f4.value.filter((e11) => "buques" === e11.category).length)}</p></div><div class="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm" data-v-e9ef0592><p class="text-xs text-neutral-500 font-medium" data-v-e9ef0592>Cestas/Presentes</p><p class="text-2xl font-extrabold text-burgundy mt-0.5" data-v-e9ef0592>${ssrInterpolate(f4.value.filter((e11) => "cestas" === e11.category || "presentes" === e11.category).length)}</p></div></div><div class="flex items-center justify-between mb-4" data-v-e9ef0592><h2 class="font-extrabold text-lg text-neutral-800" data-v-e9ef0592>Cat\xE1logo de Produtos</h2><button class="bg-burgundy text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#920000] transition-colors flex items-center space-x-2 shadow-md" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" data-v-e9ef0592></path></svg><span data-v-e9ef0592>Novo Produto</span></button></div>`), x7.value ? A3('<div class="text-center py-16 text-neutral-400" data-v-e9ef0592>Carregando...</div>') : (A3('<div class="space-y-3" data-v-e9ef0592><!--[-->'), ssrRenderList(f4.value, (e11) => {
          A3(`<div class="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow" data-v-e9ef0592><img${ssrRenderAttr("src", e11.image)}${ssrRenderAttr("alt", e11.name)} class="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-neutral-100" data-v-e9ef0592><div class="flex-grow min-w-0" data-v-e9ef0592><div class="flex items-center space-x-2" data-v-e9ef0592><h3 class="font-bold text-neutral-800 text-sm truncate" data-v-e9ef0592>${ssrInterpolate(e11.name)}</h3>`), e11.featured ? A3('<span class="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full shrink-0" data-v-e9ef0592>Banner</span>') : A3("<!---->"), A3(`</div><p class="text-xs text-neutral-500 truncate mt-0.5" data-v-e9ef0592>${ssrInterpolate(e11.description)}</p><div class="flex items-center space-x-3 mt-1.5" data-v-e9ef0592><span class="text-sm font-extrabold text-burgundy" data-v-e9ef0592>${ssrInterpolate(formatPrice(e11.price))}</span>`), e11.oldPrice ? A3(`<span class="text-xs text-neutral-400 line-through" data-v-e9ef0592>${ssrInterpolate(formatPrice(e11.oldPrice))}</span>`) : A3("<!---->"), A3(`<span class="text-[10px] bg-neutral-100 text-neutral-600 font-medium px-2 py-0.5 rounded-full capitalize" data-v-e9ef0592>${ssrInterpolate(e11.category)}</span></div></div><div class="flex items-center space-x-2 flex-shrink-0" data-v-e9ef0592><button class="p-2 rounded-xl hover:bg-burgundy/5 text-neutral-500 hover:text-burgundy transition-colors" title="Editar" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-e9ef0592></path></svg></button><button class="p-2 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors" title="Remover" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-e9ef0592></path></svg></button></div></div>`);
        }), A3("<!--]--></div>")), A3("</div>")) : A3("<!---->"), "categories" === w3.value ? (A3('<div data-v-e9ef0592><div class="flex items-center justify-between mb-4" data-v-e9ef0592><h2 class="font-extrabold text-lg text-neutral-800" data-v-e9ef0592>Categorias da Loja</h2></div>'), $2.value ? A3('<div class="text-center py-16 text-neutral-400" data-v-e9ef0592>Carregando categorias...</div>') : (A3('<div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-e9ef0592><!--[-->'), ssrRenderList(j3.value, (e11) => {
          A3(`<div class="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow" data-v-e9ef0592><div class="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200" data-v-e9ef0592><img${ssrRenderAttr("src", e11.image)}${ssrRenderAttr("alt", e11.name)} class="w-full h-full object-cover" data-v-e9ef0592></div><div class="flex-grow min-w-0" data-v-e9ef0592><div class="flex items-center space-x-2" data-v-e9ef0592><h3 class="font-bold text-neutral-800 text-sm truncate" data-v-e9ef0592>${ssrInterpolate(e11.name)}</h3></div><p class="text-[11px] text-neutral-400 font-mono mt-0.5" data-v-e9ef0592>ID: ${ssrInterpolate(e11.id)}</p></div><div class="flex-shrink-0" data-v-e9ef0592><button class="bg-burgundy text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-[#920000] transition-colors flex items-center space-x-1 shadow-sm cursor-pointer" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-e9ef0592></path></svg><span data-v-e9ef0592>Editar</span></button></div></div>`);
        }), A3("<!--]--></div>")), A3("</div>")) : A3("<!---->"), "guide" === w3.value ? A3('<div class="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6 shadow-sm mb-8" data-v-e9ef0592><h2 class="font-extrabold text-lg text-burgundy border-b border-burgundy/10 pb-3" data-v-e9ef0592>Como usar o Painel Admin</h2><div class="space-y-4 text-sm text-neutral-700 leading-relaxed" data-v-e9ef0592><div data-v-e9ef0592><h3 class="font-bold text-neutral-800 mb-1" data-v-e9ef0592>\u{1F4E6} Adicionar Produto</h3><p data-v-e9ef0592>Clique em <strong data-v-e9ef0592>&quot;Novo Produto&quot;</strong>. Preencha todos os campos. O <strong data-v-e9ef0592>ID</strong> deve ser \xFAnico (ex: <code class="bg-neutral-100 px-1.5 py-0.5 rounded-md font-mono text-xs" data-v-e9ef0592>buque-03</code>). As imagens s\xE3o URLs do caminho da imagem no servidor (ex: <code class="bg-neutral-100 px-1.5 py-0.5 rounded-md font-mono text-xs" data-v-e9ef0592>/images/produtos/minha-foto.jpg</code>).</p></div><div data-v-e9ef0592><h3 class="font-bold text-neutral-800 mb-1" data-v-e9ef0592>\u270F\uFE0F Editar Produto</h3><p data-v-e9ef0592>Clique no \xEDcone de <strong data-v-e9ef0592>l\xE1pis</strong> ao lado do produto. Todos os dados s\xE3o preenchidos automaticamente para edi\xE7\xE3o. Salve quando finalizar.</p></div><div data-v-e9ef0592><h3 class="font-bold text-neutral-800 mb-1" data-v-e9ef0592>\u{1F5D1}\uFE0F Remover Produto</h3><p data-v-e9ef0592>Clique no \xEDcone de <strong data-v-e9ef0592>lixeira</strong> ao lado do produto. Uma confirma\xE7\xE3o ser\xE1 solicitada antes de excluir permanentemente.</p></div><div data-v-e9ef0592><h3 class="font-bold text-neutral-800 mb-1" data-v-e9ef0592>\u{1F5BC}\uFE0F Controlar Banners (Destaques)</h3><p data-v-e9ef0592>Os banners do carrossel da p\xE1gina inicial s\xE3o os produtos com <strong data-v-e9ef0592>&quot;Destaque (Banner)&quot;</strong> marcado. Para adicionar um produto ao banner, edite-o e ative essa op\xE7\xE3o. Para remover do banner, desative a op\xE7\xE3o.</p></div><div data-v-e9ef0592><h3 class="font-bold text-neutral-800 mb-1" data-v-e9ef0592>\u{1F5BC}\uFE0F Adicionar Imagens</h3><p data-v-e9ef0592>Coloque os arquivos de imagem na pasta <code class="bg-neutral-100 px-1.5 py-0.5 rounded-md font-mono text-xs" data-v-e9ef0592>public/images/produtos/</code> do projeto. Depois insira o caminho no campo de imagem (ex: <code class="bg-neutral-100 px-1.5 py-0.5 rounded-md font-mono text-xs" data-v-e9ef0592>/images/produtos/nome-do-arquivo.jpg</code>).</p></div><div class="bg-amber-50 border border-amber-200 rounded-xl p-4" data-v-e9ef0592><h3 class="font-bold text-amber-800 mb-1" data-v-e9ef0592>\u{1F510} Seguran\xE7a</h3><p class="text-amber-700 text-xs" data-v-e9ef0592>A senha de acesso est\xE1 definida no arquivo <code class="bg-amber-100 px-1 rounded font-mono" data-v-e9ef0592>.env</code> na vari\xE1vel <code class="bg-amber-100 px-1 rounded font-mono" data-v-e9ef0592>ADMIN_SECRET</code>. Troque para uma senha forte e nunca compartilhe. O painel s\xF3 funciona no servidor \u2014 n\xE3o \xE9 acess\xEDvel sem a senha correta.</p></div></div></div>') : A3("<!---->"), A3("</div></div>")) : (A3(`<div class="min-h-screen flex items-center justify-center p-4" data-v-e9ef0592><div class="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-neutral-200" data-v-e9ef0592><div class="text-center mb-8" data-v-e9ef0592><div class="w-16 h-16 bg-burgundy rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-e9ef0592></path></svg></div><h1 class="text-2xl font-extrabold text-burgundy" data-v-e9ef0592>Painel Admin</h1><p class="text-sm text-neutral-500 mt-1" data-v-e9ef0592>Rosas Presentes</p></div><form class="space-y-4" data-v-e9ef0592><div data-v-e9ef0592><label class="block text-xs font-semibold text-neutral-600 mb-1.5" data-v-e9ef0592>Senha de Acesso</label><input${ssrRenderAttr("value", v5.value)} type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 transition-all" autocomplete="current-password" data-v-e9ef0592></div>`), u6.value ? A3(`<p class="text-xs text-red-600 font-medium" data-v-e9ef0592>${ssrInterpolate(u6.value)}</p>`) : A3("<!---->"), A3(`<button type="submit"${includeBooleanAttr(c4.value || !v5.value) ? " disabled" : ""} class="w-full bg-burgundy text-white font-bold py-3 rounded-xl hover:bg-[#920000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-e9ef0592>${ssrInterpolate(c4.value ? "Entrando..." : "Entrar")}</button></form><p class="text-[11px] text-center text-neutral-400 mt-6" data-v-e9ef0592> Acesso restrito ao administrador da loja. </p></div></div>`)), y4.value ? A3('<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" data-v-e9ef0592><div class="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center space-y-4" data-v-e9ef0592><div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" data-v-e9ef0592></path></svg></div><h3 class="font-extrabold text-neutral-800 text-lg" data-v-e9ef0592>Confirmar exclus\xE3o?</h3><p class="text-sm text-neutral-500" data-v-e9ef0592>Esta a\xE7\xE3o \xE9 <strong data-v-e9ef0592>irrevers\xEDvel</strong>. O produto ser\xE1 removido permanentemente do cat\xE1logo e dos banners.</p><div class="flex space-x-3" data-v-e9ef0592><button class="flex-1 border border-neutral-200 text-neutral-600 font-semibold py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-sm" data-v-e9ef0592>Cancelar</button><button class="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-xl hover:bg-red-700 transition-colors text-sm" data-v-e9ef0592>Remover</button></div></div></div>') : A3("<!---->"), h5.value ? (A3(`<div class="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4" data-v-e9ef0592><div class="bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[92vh]" data-v-e9ef0592><div class="flex items-center justify-between px-6 py-4 border-b border-neutral-100" data-v-e9ef0592><h2 class="font-extrabold text-burgundy text-base" data-v-e9ef0592>${ssrInterpolate(g3.value ? "Editar Produto" : "Novo Produto")}</h2><button class="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-v-e9ef0592></path></svg></button></div><div class="overflow-y-auto p-6 space-y-5 flex-grow" data-v-e9ef0592><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-e9ef0592><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>ID \xFAnico <span class="text-red-500" data-v-e9ef0592>*</span></label><input${ssrRenderAttr("value", b4.value.id)}${includeBooleanAttr(!!g3.value) ? " disabled" : ""} type="text" placeholder="ex: buque-04" class="form-input" data-v-e9ef0592>`), g3.value ? A3('<p class="text-[11px] text-neutral-400 mt-1" data-v-e9ef0592>ID n\xE3o pode ser alterado na edi\xE7\xE3o</p>') : A3("<!---->"), A3(`</div><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>Nome do Produto <span class="text-red-500" data-v-e9ef0592>*</span></label><input${ssrRenderAttr("value", b4.value.name)} type="text" placeholder="Nome do produto" class="form-input" data-v-e9ef0592></div></div><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>Descri\xE7\xE3o</label><textarea rows="3" class="form-input resize-none" placeholder="Descreva o produto..." data-v-e9ef0592>${ssrInterpolate(b4.value.description)}</textarea></div><div class="grid grid-cols-2 gap-4" data-v-e9ef0592><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>Pre\xE7o (R$) <span class="text-red-500" data-v-e9ef0592>*</span></label><input${ssrRenderAttr("value", b4.value.price)} type="number" min="0" step="0.01" class="form-input" placeholder="0.00" data-v-e9ef0592></div><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>Pre\xE7o Antigo / De (opcional)</label><input${ssrRenderAttr("value", b4.value.oldPrice)} type="number" min="0" step="0.01" class="form-input" placeholder="Deixe vazio se sem promo\xE7\xE3o" data-v-e9ef0592></div></div><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>Texto de Parcelamento</label><input${ssrRenderAttr("value", b4.value.installments)} type="text" placeholder="ex: 3x de R$ 65,30 sem juros" class="form-input" data-v-e9ef0592></div><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>Categorias <span class="text-red-500" data-v-e9ef0592>*</span></label><div class="flex flex-wrap gap-2 mt-1.5" data-v-e9ef0592><!--[-->`), ssrRenderList(m4, (e11) => {
          A3(`<button type="button" class="${ssrRenderClass([b4.value.categories.includes(e11) ? "bg-burgundy text-white border-burgundy" : "bg-white text-neutral-600 border-neutral-300 hover:border-burgundy", "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all capitalize"])}" data-v-e9ef0592>${ssrInterpolate(e11)}</button>`);
        }), A3(`<!--]--></div><p class="text-[11px] text-neutral-400 mt-1.5" data-v-e9ef0592>A primeira categoria selecionada ser\xE1 a principal. &quot;destaques&quot; aparece no carrossel de banners.</p></div><div class="flex items-center space-x-3 bg-amber-50 border border-amber-200 rounded-xl p-4" data-v-e9ef0592><input id="featured-toggle"${includeBooleanAttr(Array.isArray(b4.value.featured) ? ssrLooseContain(b4.value.featured, null) : b4.value.featured) ? " checked" : ""} type="checkbox" class="h-5 w-5 accent-burgundy cursor-pointer" data-v-e9ef0592><label for="featured-toggle" class="cursor-pointer" data-v-e9ef0592><span class="text-sm font-bold text-amber-800 block" data-v-e9ef0592>Destaque (Banner)</span><span class="text-xs text-amber-600" data-v-e9ef0592>Aparece no carrossel principal da p\xE1gina inicial</span></label></div><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>Imagens do Produto</label><p class="text-[11px] text-neutral-400 mb-3" data-v-e9ef0592>A 1\xAA imagem \xE9 a capa. Fa\xE7a upload direto (PNG, JPG, JPEG \u2014 m\xE1x. 5MB) ou cole uma URL manualmente.</p><div class="space-y-3" data-v-e9ef0592><!--[-->`), ssrRenderList(b4.value.images, (e11, a5) => {
          A3('<div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-3 space-y-2" data-v-e9ef0592><div class="flex items-start space-x-3" data-v-e9ef0592><div class="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-200 flex-shrink-0 border border-neutral-300" data-v-e9ef0592>'), A3(e11 ? `<img${ssrRenderAttr("src", e11)} class="w-full h-full object-cover"${ssrRenderAttr("alt", `Imagem ${a5 + 1}`)} data-v-e9ef0592>` : '<div class="w-full h-full flex items-center justify-center text-neutral-400" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-e9ef0592></path></svg></div>'), q2.value === a5 ? A3('<div class="absolute inset-0 bg-white/80 flex items-center justify-center" data-v-e9ef0592><svg class="animate-spin h-6 w-6 text-burgundy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-e9ef0592><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-e9ef0592></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-e9ef0592></path></svg></div>') : A3("<!---->"), A3(`</div><div class="flex-grow space-y-2" data-v-e9ef0592><div class="flex items-center space-x-1.5" data-v-e9ef0592><span class="text-[10px] font-bold text-neutral-500 uppercase tracking-wider" data-v-e9ef0592>${ssrInterpolate(0 === a5 ? "Capa (principal)" : `Imagem ${a5 + 1}`)}</span></div><label class="${ssrRenderClass([q2.value === a5 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-burgundy hover:text-burgundy", "flex items-center space-x-2 border-2 border-dashed border-neutral-300 text-neutral-500 text-xs font-semibold px-3 py-2 rounded-xl transition-colors w-full"])}" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-e9ef0592></path></svg><span data-v-e9ef0592>${ssrInterpolate(q2.value === a5 ? "Enviando..." : "Clique para fazer upload (PNG, JPG, JPEG)")}</span><input type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" class="hidden"${includeBooleanAttr(q2.value === a5) ? " disabled" : ""} data-v-e9ef0592></label><input${ssrRenderAttr("value", e11)} type="text" placeholder="Ou cole a URL manualmente: /images/produtos/foto.jpg" class="form-input text-xs" data-v-e9ef0592></div><button type="button" class="p-1.5 text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0 mt-1" title="Remover imagem" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-e9ef0592></path></svg></button></div></div>`);
        }), A3("<!--]--></div>"), z3.value ? A3(`<p class="text-xs text-red-600 font-semibold mt-2 flex items-center space-x-1" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" data-v-e9ef0592></path></svg><span data-v-e9ef0592>${ssrInterpolate(z3.value)}</span></p>`) : A3("<!---->"), A3('<button type="button" class="mt-3 text-xs text-burgundy font-semibold flex items-center space-x-1.5 hover:underline" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" data-v-e9ef0592></path></svg><span data-v-e9ef0592>Adicionar outra imagem</span></button></div>'), p6.value ? A3(`<p class="text-sm text-red-600 font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3" data-v-e9ef0592>${ssrInterpolate(p6.value)}</p>`) : A3("<!---->"), A3(`</div><div class="px-6 py-4 border-t border-neutral-100 flex space-x-3" data-v-e9ef0592><button class="flex-1 border border-neutral-200 text-neutral-600 font-semibold py-3 rounded-xl hover:bg-neutral-50 transition-colors text-sm" data-v-e9ef0592>Cancelar</button><button class="flex-1 bg-burgundy text-white font-bold py-3 rounded-xl hover:bg-[#920000] transition-colors text-sm shadow-md" data-v-e9ef0592>${ssrInterpolate(g3.value ? "Salvar Altera\xE7\xF5es" : "Criar Produto")}</button></div></div></div>`)) : A3("<!---->"), P3.value ? (A3(`<div class="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4" data-v-e9ef0592><div class="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]" data-v-e9ef0592><div class="flex items-center justify-between px-6 py-4 border-b border-neutral-100" data-v-e9ef0592><h2 class="font-extrabold text-burgundy text-base" data-v-e9ef0592>Editar Categoria</h2><button class="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-v-e9ef0592></path></svg></button></div><div class="p-6 space-y-5 overflow-y-auto" data-v-e9ef0592><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>ID da Categoria</label><input${ssrRenderAttr("value", C3.value.id)} disabled type="text" class="form-input bg-neutral-100 cursor-not-allowed" data-v-e9ef0592></div><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>Nome da Categoria <span class="text-red-500" data-v-e9ef0592>*</span></label><input${ssrRenderAttr("value", C3.value.name)} type="text" placeholder="Ex: Buqu\xEAs Especiais" class="form-input" data-v-e9ef0592></div><div data-v-e9ef0592><label class="form-label" data-v-e9ef0592>Imagem da Categoria</label><div class="flex items-center space-x-3 bg-neutral-50 border border-neutral-200 rounded-2xl p-3" data-v-e9ef0592><div class="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-200 flex-shrink-0 border border-neutral-300" data-v-e9ef0592>`), C3.value.image ? A3(`<img${ssrRenderAttr("src", C3.value.image)} class="w-full h-full object-cover" data-v-e9ef0592>`) : A3('<div class="w-full h-full flex items-center justify-center text-neutral-400" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-e9ef0592></path></svg></div>'), M3.value ? A3('<div class="absolute inset-0 bg-white/80 flex items-center justify-center" data-v-e9ef0592><svg class="animate-spin h-5 w-5 text-burgundy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-e9ef0592><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-e9ef0592></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-e9ef0592></path></svg></div>') : A3("<!---->"), A3(`</div><div class="flex-grow space-y-2" data-v-e9ef0592><label class="cursor-pointer flex items-center justify-center space-x-1.5 border border-dashed border-neutral-300 text-neutral-600 text-xs font-semibold px-3 py-2 rounded-xl hover:border-burgundy hover:text-burgundy transition-colors" data-v-e9ef0592><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e9ef0592><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-e9ef0592></path></svg><span data-v-e9ef0592>Alterar Imagem</span><input type="file" accept=".png,.jpg,.jpeg" class="hidden" data-v-e9ef0592></label><input${ssrRenderAttr("value", C3.value.image)} type="text" placeholder="URL da Imagem" class="form-input text-xs" data-v-e9ef0592></div></div></div>`), B2.value ? A3(`<p class="text-xs text-red-600 font-semibold bg-red-50 border border-red-100 rounded-xl px-3 py-2" data-v-e9ef0592>${ssrInterpolate(B2.value)}</p>`) : A3("<!---->"), A3('</div><div class="px-6 py-4 border-t border-neutral-100 flex space-x-3" data-v-e9ef0592><button class="flex-1 border border-neutral-200 text-neutral-600 font-semibold py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-sm" data-v-e9ef0592>Cancelar</button><button class="flex-1 bg-burgundy text-white font-bold py-2.5 rounded-xl hover:bg-[#920000] transition-colors text-sm shadow-md" data-v-e9ef0592> Salvar Altera\xE7\xF5es </button></div></div></div>')) : A3("<!---->"), A3("</div>");
      };
    } });
    v2 = i2.setup;
    i2.setup = (e9, t5) => {
      const s6 = ln.useSSRContext();
      return (s6.modules || (s6.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue"), v2 ? v2(e9, t5) : void 0;
    };
    u2 = _export_sfc(i2, [["__scopeId", "data-v-e9ef0592"]]);
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/Footer-CUep3-vq.mjs
var p3, c2, h2, x2, m2, v3;
var init_Footer_CUep3_vq = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/Footer-CUep3-vq.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_server();
    init_renderer();
    p3 = ln.defineComponent({ __name: "Header", __ssrInlineRender: true, emits: ["toggle-cart"], async setup(d5, { emit: p6 }) {
      let c4, h5;
      useRouter();
      const x7 = useRoute(), m4 = wr(), { data: v5 } = ([c4, h5] = ln.withAsyncContext(() => Ir("/api/categories", "$0so8KvRc9s")), c4 = await c4, h5(), c4), w3 = ln.computed(() => v5.value || []), u6 = ln.computed(() => x7.query.category || "todos");
      return (t5, s6, a5, r4) => {
        s6(`<header${ssrRenderAttrs(ln.mergeProps({ class: "header-glass" }, r4))}><div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"><div class="flex items-center space-x-2 cursor-pointer"><span class="text-xl md:text-2xl font-bold tracking-tight">\u{1F339} Rosas Presentes</span></div><nav class="hidden md:flex items-center space-x-6 text-sm font-semibold"><!--[-->`), ssrRenderList(w3.value, (e9) => {
          s6(`<button class="${ssrRenderClass([u6.value === e9.id ? "text-white border-white" : "text-almond/75 border-transparent", "hover:text-white transition-colors cursor-pointer pb-1 border-b-2"])}">${ssrInterpolate(e9.name)}</button>`);
        }), s6('<!--]--></nav><button class="relative p-2.5 hover:bg-white/10 rounded-xl transition-all"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>'), ln.unref(m4).cartItemsCount > 0 ? s6(`<span class="absolute -top-1 -right-1 bg-white text-burgundy text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white/20 animate-pulse">${ssrInterpolate(ln.unref(m4).cartItemsCount)}</span>`) : s6("<!---->"), s6("</button></div></header>");
      };
    } });
    c2 = p3.setup;
    p3.setup = (t5, s6) => {
      const a5 = ln.useSSRContext();
      return (a5.modules || (a5.modules = /* @__PURE__ */ new Set())).add("components/Header.vue"), c2 ? c2(t5, s6) : void 0;
    };
    h2 = Object.assign(p3, { __name: "Header" });
    x2 = ln.defineComponent({ __name: "Footer", __ssrInlineRender: true, setup: /* @__PURE__ */ __name((t5) => (t6, s6, a5, r4) => {
      s6(`<footer${ssrRenderAttrs(ln.mergeProps({ class: "bg-gradient-to-b from-[#4a0000] to-[#2d0000] text-neutral-100 pt-16 pb-24 md:pb-8 px-4 border-t border-white/10 mt-16 relative overflow-hidden" }, r4))}><div class="absolute -top-24 -left-24 w-96 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none"></div><div class="absolute -bottom-24 -right-24 w-96 h-96 bg-burgundy/20 rounded-full blur-3xl pointer-events-none"></div><div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 relative z-10"><div class="flex-1 space-y-5"><div class="flex items-center space-x-2"><span class="text-2xl font-bold tracking-tight text-white drop-shadow-sm">\u{1F339} Rosas Presentes</span></div><p class="text-sm text-neutral-300/90 leading-relaxed"> Especializada em floricultura, cestas de caf\xE9 da manh\xE3, buqu\xEAs e presentes especiais para emocionar quem voc\xEA ama em Campo Grande - MS. </p><div class="space-y-3.5 pt-2"><a${ssrRenderAttr("href", "https://wa.me/5567999476896?text=Ol\xE1,%20gostaria%20de%20tirar%20uma%20d\xFAvida%20sobre%20as%20flores%20e%20cestas!")} target="_blank" class="flex items-center space-x-3 text-sm text-neutral-200 hover:text-[#25d366] transition-colors group w-max"><div class="p-2 bg-white/5 group-hover:bg-[#25d366]/10 rounded-xl transition-colors border border-white/5 group-hover:border-[#25d366]/20"><svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg></div><span class="font-semibold text-white group-hover:text-white transition-colors">(67) 99947-6896</span></a><a${ssrRenderAttr("href", "https://www.google.com/maps/search/?api=1&query=Rua+Benito+Melch%C3%ADades+de+Oliveira,+227+-+Nasser,+Campo+Grande+-+MS,+79117-320")} target="_blank" class="flex items-start space-x-3 text-sm text-neutral-300 hover:text-white transition-colors group"><div class="p-2 bg-white/5 group-hover:bg-white/10 rounded-xl transition-colors border border-white/5 mt-0.5 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><span class="leading-relaxed"> Rua Benito Melch\xEDades de Oliveira, 227 - Nasser / Coophasul, Campo Grande - MS, 79117-320 </span></a></div></div><div class="flex-1 space-y-5"><h4 class="text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2"> Avisos e Funcionamento </h4><div class="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-4 text-sm"><div class="space-y-2"><h5 class="font-semibold text-white flex items-center space-x-2 text-crimson-light"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-crimson shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Hor\xE1rios em Datas Comemorativas</span></h5><p class="text-neutral-300 leading-relaxed text-xs"> No <strong class="text-white">Dia das M\xE3es</strong> e <strong class="text-white">Dia dos Namorados</strong> (e v\xE9speras), nossas entregas iniciam a partir das <strong class="text-white">05:00h</strong> da manh\xE3, com atendimento presencial a partir das <strong class="text-white">06:00h</strong> e atendimento via WhatsApp a partir das <strong class="text-white">08:00h</strong>. </p></div><div class="border-t border-white/10 pt-3.5 space-y-2"><h5 class="font-semibold text-white flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>Pol\xEDtica de Entrega</span></h5><p class="text-neutral-300 leading-relaxed text-xs"> Caso seja realizada a tentativa de entrega e o destinat\xE1rio n\xE3o esteja no local, ser\xE1 cobrada uma taxa de reentrega para a nova tentativa, ou o comprador poder\xE1 retirar o presente diretamente em nossa loja f\xEDsica. </p></div></div></div></div><div class="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 relative z-10"><div class="flex flex-col md:flex-row justify-between items-center gap-6"><div class="space-y-2 text-center md:text-left"><h4 class="text-sm font-bold text-white tracking-wide">Formas de Pagamento Aceitas</h4><div class="flex flex-wrap justify-center md:justify-start gap-2.5 text-xs text-neutral-300"><span class="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl flex items-center space-x-2.5 hover:bg-white/10 transition-colors shadow-sm"><svg class="h-4.5 w-4.5 text-[#32bcad] fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.002 2.695L2.695 12l9.307 9.305L21.305 12l-9.303-9.305zm0 15.61L5.695 12l6.307-6.305L18.305 12l-6.303 6.305z"></path><path d="M12.002 6.695L6.695 12l5.307 5.305L17.305 12l-5.303-5.305zm0 7.61L9.695 12l2.307-2.305L14.305 12l-2.303 2.305z"></path></svg><span class="font-medium">Pix</span></span><span class="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl flex items-center space-x-2.5 hover:bg-white/10 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg><span class="font-medium">Cart\xE3o de Cr\xE9dito / D\xE9bito</span></span><span class="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl flex items-center space-x-2.5 hover:bg-white/10 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg><span class="font-medium">Link de Pagamento (Seguro)</span></span><span class="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl flex items-center space-x-2.5 hover:bg-white/10 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg><span class="font-medium">Dep\xF3sito / Transfer\xEAncia Banc\xE1ria</span></span></div><p class="text-[11px] text-neutral-400 mt-1 italic"> * Sempre ap\xF3s efetuar o pagamento, favor enviar o comprovante de pagamento via WhatsApp. </p></div></div></div><div class="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400 gap-4"><p>\xA9 2026 Rosas &amp; Presentes. Todos os direitos reservados.</p><div class="flex items-center space-x-1"><span>Desenvolvido com</span><span class="text-crimson text-sm">\u2665</span><span><a href="https://dsdesenvolvimento.vercel.app/"></a>por DS Desenvolvimento</span></div></div></footer>`);
    }, "setup") });
    m2 = x2.setup;
    x2.setup = (t5, s6) => {
      const a5 = ln.useSSRContext();
      return (a5.modules || (a5.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue"), m2 ? m2(t5, s6) : void 0;
    };
    v3 = Object.assign(x2, { __name: "Footer" });
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/checkout-Bs6e058w.mjs
var checkout_Bs6e058w_exports = {};
__export(checkout_Bs6e058w_exports, {
  default: () => x3
});
var x3, b2;
var init_checkout_Bs6e058w = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/checkout-Bs6e058w.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_Footer_CUep3_vq();
    init_server();
    init_renderer();
    init_shared_esm_bundler();
    init_nitro();
    x3 = ln.defineComponent({ __name: "checkout", __ssrInlineRender: true, setup(x7) {
      useRouter();
      const b4 = wr(), m4 = ln.ref(""), g3 = ln.ref(""), f4 = ln.ref(""), h5 = ln.ref(""), w3 = ln.ref(""), y4 = ln.ref(""), k4 = ln.ref(""), $2 = ln.ref("pix"), j3 = ln.ref(false), M3 = ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"], C3 = ln.ref(false), P3 = ln.ref(/* @__PURE__ */ new Date()), z3 = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"], B2 = ln.computed(() => `${["Janeiro", "Fevereiro", "Mar\xE7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][P3.value.getMonth()]} ${P3.value.getFullYear()}`), S4 = ln.computed(() => new Date(P3.value.getFullYear(), P3.value.getMonth(), 1).getDay()), D3 = ln.computed(() => new Date(P3.value.getFullYear(), P3.value.getMonth() + 1, 0).getDate());
      function isDaySelected(e9) {
        if (!w3.value) return false;
        const [t5, r4, a5] = w3.value.split("/");
        return Number(t5) === e9 && Number(r4) === P3.value.getMonth() + 1 && Number(a5) === P3.value.getFullYear();
      }
      __name(isDaySelected, "isDaySelected");
      const q2 = ln.ref(""), F3 = ln.ref(""), V2 = ln.ref(""), A3 = ln.ref(false), I3 = ln.ref(""), T3 = ln.computed(() => b4.items.length > 0);
      function formatPrice(e9) {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(e9);
      }
      __name(formatPrice, "formatPrice");
      function getFirstImage(e9) {
        return e9.images && e9.images.length > 0 ? e9.images[0] : e9.image;
      }
      __name(getFirstImage, "getFirstImage");
      return (a5, s6, x8, P4) => {
        const E3 = h2, L3 = v3;
        s6(`<div${ssrRenderAttrs(ln.mergeProps({ class: "min-h-screen flex flex-col" }, P4))}>`), s6(ssrRenderComponent(E3, { onToggleCart: /* @__PURE__ */ __name((e9) => j3.value = !j3.value, "onToggleCart") }, null, x8)), s6('<main class="max-w-4xl mx-auto px-4 pt-8 flex-grow">'), A3.value ? (s6(`<div class="form-card text-center py-12 space-y-6 max-w-xl mx-auto my-8"><div class="w-20 h-20 bg-burgundy/10 text-burgundy rounded-full flex items-center justify-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></div><div class="space-y-2"><h2 class="text-2xl font-extrabold text-burgundy">Pedido Recebido!</h2><p class="text-sm text-neutral-600"> Agradecemos sua prefer\xEAncia. Seu pedido foi processado com sucesso. </p><div class="flex flex-col items-center gap-2 mt-4"><div class="inline-block bg-white/60 border border-burgundy/10 px-4 py-2 rounded-xl font-mono text-sm font-bold text-burgundy"> N\xFAmero do Pedido: ${ssrInterpolate(I3.value)}</div><div class="text-xs text-neutral-600 mt-1 bg-neutral-50 border border-neutral-100 rounded-lg px-4 py-2"> Entrega programada para: <strong class="text-burgundy">${ssrInterpolate(w3.value)}</strong>`), y4.value ? s6(`<span> \xE0s <strong class="text-burgundy">${ssrInterpolate(y4.value)}</strong></span>`) : s6("<!---->"), s6('</div></div></div><p class="text-xs text-neutral-500 max-w-sm mx-auto"> Enviamos uma confirma\xE7\xE3o e atualiza\xE7\xF5es de entrega para o seu WhatsApp cadastrado. </p><button class="btn-primary px-8"> Continuar Comprando </button></div>')) : (s6('<div class="grid grid-cols-1 md:grid-cols-5 gap-6">'), T3.value ? (s6(`<!--[--><div class="col-span-1 md:col-span-3 space-y-6"><form class="space-y-6"><div class="form-card space-y-4 relative z-10"><h3 class="font-bold text-burgundy text-base border-b border-burgundy/10 pb-2"> Seus Dados </h3><div><label for="cust-name" class="form-label">Nome Completo</label><input id="cust-name"${ssrRenderAttr("value", m4.value)} type="text" required placeholder="Seu nome completo" class="form-input"></div><div><label for="cust-phone" class="form-label">WhatsApp / Telefone</label><input id="cust-phone"${ssrRenderAttr("value", g3.value)} type="tel" required placeholder="(00) 90000-0000" class="form-input"></div></div><div class="form-card space-y-4 !overflow-visible relative z-30"><h3 class="font-bold text-burgundy text-base border-b border-burgundy/10 pb-2"> Detalhes da Entrega (Presente) </h3><div><label for="rec-name" class="form-label">Nome de quem vai receber</label><input id="rec-name"${ssrRenderAttr("value", f4.value)} type="text" required placeholder="Nome do destinat\xE1rio" class="form-input"></div><div><label for="address" class="form-label">Endere\xE7o de Entrega</label><input id="address"${ssrRenderAttr("value", h5.value)} type="text" required placeholder="Rua, n\xFAmero, complemento, bairro e cidade" class="form-input"></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="deliv-date" class="form-label">Data de Entrega</label><div class="relative" id="calendar-container"><input id="deliv-date" type="text"${ssrRenderAttr("value", w3.value)} placeholder="Selecione a data" readonly class="form-input bg-white cursor-pointer pr-10 select-none" required><div class="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500 pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`), C3.value ? (s6(`<div class="absolute top-full mt-1 left-0 right-0 mx-auto z-50 bg-neutral-100 border border-neutral-200/80 rounded-2xl shadow-lg p-3 w-[240px] sm:left-0 sm:translate-x-0"><div class="flex justify-between items-center bg-neutral-200/50 border border-neutral-300/40 rounded-xl p-1.5 mb-2"><button type="button" class="p-1 hover:bg-neutral-300/60 rounded-lg text-burgundy transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg></button><span class="font-bold text-[10px] text-burgundy uppercase tracking-wider">${ssrInterpolate(B2.value)}</span><button type="button" class="p-1 hover:bg-neutral-300/60 rounded-lg text-burgundy transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg></button></div><div class="grid grid-cols-7 gap-0.5 text-center text-[9px] font-bold text-neutral-400 uppercase mb-1"><!--[-->`), ssrRenderList(z3, (e9) => {
          s6(`<span>${ssrInterpolate(e9)}</span>`);
        }), s6('<!--]--></div><div class="grid grid-cols-7 gap-0.5"><!--[-->'), ssrRenderList(S4.value, (e9) => {
          s6("<span></span>");
        }), s6("<!--]--><!--[-->"), ssrRenderList(D3.value, (e9) => {
          s6(`<button type="button" class="${ssrRenderClass([isDaySelected(e9) ? "bg-burgundy text-white font-bold" : "hover:bg-neutral-200/70 text-neutral-700", "h-7 w-7 text-[11px] font-semibold rounded-lg flex items-center justify-center transition-all"])}">${ssrInterpolate(e9)}</button>`);
        }), s6("<!--]--></div></div>")) : s6("<!---->"), s6('</div></div><div><label for="deliv-time" class="form-label">Hor\xE1rio de Entrega</label><div class="relative"><select id="deliv-time" required class="form-input bg-white appearance-none pr-10 cursor-pointer"><option value="" disabled selected>Selecione o hor\xE1rio</option><!--[-->'), ssrRenderList(M3, (e9) => {
          s6(`<option${ssrRenderAttr("value", e9)}${includeBooleanAttr(Array.isArray(y4.value) ? ssrLooseContain(y4.value, e9) : wr2(y4.value, e9)) ? " selected" : ""}>${ssrInterpolate(e9)}</option>`);
        }), s6(`<!--]--></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg></div></div></div></div><div><label for="message" class="form-label">Mensagem para o Cart\xE3o (Opcional)</label><textarea id="message" rows="3" placeholder="Escreva uma bela mensagem de carinho..." class="form-input resize-none">${ssrInterpolate(k4.value)}</textarea></div></div><div class="form-card space-y-4 relative z-10"><h3 class="font-bold text-burgundy text-base border-b border-burgundy/10 pb-2"> M\xE9todo de Pagamento </h3><div class="grid grid-cols-2 gap-3"><label class="${ssrRenderClass(["pix" === $2.value ? "border-burgundy bg-burgundy/5 text-burgundy font-bold" : "border-neutral-200 bg-white/40", "border rounded-xl p-3 flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all"])}"><input type="radio" value="pix"${includeBooleanAttr(wr2($2.value, "pix")) ? " checked" : ""} class="sr-only"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg><span class="text-xs">Pagar com PIX</span></label><label class="${ssrRenderClass(["card" === $2.value ? "border-burgundy bg-burgundy/5 text-burgundy font-bold" : "border-neutral-200 bg-white/40", "border rounded-xl p-3 flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all"])}"><input type="radio" value="card"${includeBooleanAttr(wr2($2.value, "card")) ? " checked" : ""} class="sr-only"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg><span class="text-xs">Cart\xE3o de Cr\xE9dito</span></label></div>`), "pix" === $2.value ? s6('<div class="p-4 bg-white/40 rounded-xl border border-dashed border-burgundy/20 text-center space-y-2"><p class="text-xs text-neutral-600"> O c\xF3digo copia e cola PIX ser\xE1 gerado ap\xF3s clicar em Finalizar. Desconto de 5% j\xE1 aplicado! </p></div>') : s6("<!---->"), "card" === $2.value ? s6(`<div class="space-y-3 pt-2"><div><label for="card-num" class="form-label">N\xFAmero do Cart\xE3o</label><input id="card-num"${ssrRenderAttr("value", q2.value)} type="text" required placeholder="0000 0000 0000 0000" class="form-input"></div><div class="grid grid-cols-2 gap-3"><div><label for="expiry" class="form-label">Validade</label><input id="expiry"${ssrRenderAttr("value", F3.value)} type="text" required placeholder="MM/AA" class="form-input"></div><div><label for="cvv" class="form-label">CVV</label><input id="cvv"${ssrRenderAttr("value", V2.value)} type="text" required placeholder="000" class="form-input"></div></div></div>`) : s6("<!---->"), s6(`</div><button type="submit" class="btn-primary w-full py-4 text-base"> Finalizar e Pagar ${ssrInterpolate(formatPrice("pix" === $2.value ? 0.95 * ln.unref(b4).cartTotal : ln.unref(b4).cartTotal))}</button></form></div><div class="col-span-1 md:col-span-2 space-y-4"><div class="form-card space-y-4 sticky top-24"><h3 class="font-bold text-burgundy text-base border-b border-burgundy/10 pb-2"> Resumo do Pedido </h3><div class="max-h-[300px] overflow-y-auto space-y-3 pr-1"><!--[-->`), ssrRenderList(ln.unref(b4).items, (e9) => {
          s6(`<div class="flex items-center space-x-3 text-xs"><img${ssrRenderAttr("src", getFirstImage(e9.product))} class="w-12 h-12 rounded-lg object-cover flex-shrink-0"><div class="flex-grow min-w-0"><p class="font-bold text-neutral-800 truncate">${ssrInterpolate(e9.product.name)}</p><p class="text-neutral-500">${ssrInterpolate(e9.quantity)}x de ${ssrInterpolate(formatPrice(e9.product.price))}</p></div><span class="font-bold text-neutral-800">${ssrInterpolate(formatPrice(e9.product.price * e9.quantity))}</span></div>`);
        }), s6(`<!--]--></div><div class="border-t border-burgundy/10 pt-3 space-y-2 text-sm"><div class="flex justify-between text-neutral-600 text-xs"><span>Subtotal:</span><span>${ssrInterpolate(formatPrice(ln.unref(b4).cartTotal))}</span></div><div class="flex justify-between text-neutral-600 text-xs"><span>Entrega:</span><span class="text-[#25d366] font-semibold">Gr\xE1tis</span></div>`), "pix" === $2.value ? s6(`<div class="flex justify-between text-[#c1121f] text-xs"><span>Desconto PIX (5%):</span><span>-${ssrInterpolate(formatPrice(0.05 * ln.unref(b4).cartTotal))}</span></div>`) : s6("<!---->"), s6(`<div class="flex justify-between font-extrabold text-base text-burgundy border-t border-burgundy/15 pt-2"><span>Total:</span><span>${ssrInterpolate(formatPrice("pix" === $2.value ? 0.95 * ln.unref(b4).cartTotal : ln.unref(b4).cartTotal))}</span></div></div></div></div><!--]-->`)) : s6('<div class="col-span-5 form-card text-center py-12 space-y-4"><p class="font-bold text-burgundy">Seu carrinho est\xE1 vazio</p><p class="text-sm text-neutral-500">Adicione itens ao carrinho antes de prosseguir para o pagamento.</p><button class="btn-primary"> Ver Produtos </button></div>'), s6("</div>")), s6("</main>"), s6(ssrRenderComponent(L3, null, null, x8)), s6('<div class="mobile-navigation-bar"><button class="mobile-nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg><span class="text-[10px] mt-0.5 font-semibold">In\xEDcio</span></button><button class="mobile-nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z"></path></svg><span class="text-[10px] mt-0.5 font-semibold">Destaques</span></button><button class="mobile-nav-item relative"><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>'), ln.unref(b4).cartItemsCount > 0 ? s6(`<span class="cart-badge bg-crimson w-4 h-4 text-[9px] top-1 right-3">${ssrInterpolate(ln.unref(b4).cartItemsCount)}</span>`) : s6("<!---->"), s6('<span class="text-[10px] mt-0.5 font-semibold">Carrinho</span></button><a href="https://wa.me/5567999476896?text=Ol\xE1,%20tenho%20uma%20d\xFAvida%20sobre%20o%20meu%20pedido!" target="_blank" class="mobile-nav-item"><svg viewBox="0 0 24 24" class="h-5.5 w-5.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg><span class="text-[10px] mt-0.5 font-semibold">Contato</span></a></div>'), j3.value ? s6('<div class="cart-drawer-overlay"></div>') : s6("<!---->"), j3.value ? (s6('<div class="cart-drawer"><div class="flex items-center justify-between px-6 py-5 border-b border-burgundy/15"><div class="flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg><h3 class="font-extrabold text-burgundy text-lg">Meu Carrinho</h3></div><button class="p-2 hover:bg-burgundy/5 text-burgundy rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="flex-grow overflow-y-auto p-6 space-y-4">'), 0 === ln.unref(b4).items.length ? s6('<div class="h-full flex flex-col items-center justify-center text-center space-y-4"><div class="p-4 bg-white/40 rounded-full text-burgundy/40"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></div><div><p class="font-bold text-burgundy">Seu carrinho est\xE1 vazio</p></div><button class="btn-primary-sm mt-2"> Voltar </button></div>') : (s6("<!--[-->"), ssrRenderList(ln.unref(b4).items, (e9) => {
          s6(`<div class="flex items-center space-x-4 bg-white/45 p-3 rounded-2xl border border-white/40 relative shadow-sm"><img${ssrRenderAttr("src", getFirstImage(e9.product))}${ssrRenderAttr("alt", e9.product.name)} class="w-16 h-16 rounded-xl object-cover"><div class="flex-grow min-w-0"><h4 class="font-bold text-xs text-neutral-800 truncate">${ssrInterpolate(e9.product.name)}</h4><span class="text-xs font-semibold text-burgundy block mt-0.5">${ssrInterpolate(formatPrice(e9.product.price))}</span><div class="flex items-center space-x-2 mt-2"><button class="w-6 h-6 rounded-lg bg-white/80 border border-burgundy/15 flex items-center justify-center text-burgundy font-bold text-sm active:scale-90"> - </button><span class="text-xs font-bold text-neutral-700 w-4 text-center">${ssrInterpolate(e9.quantity)}</span><button class="w-6 h-6 rounded-lg bg-white/80 border border-burgundy/15 flex items-center justify-center text-burgundy font-bold text-sm active:scale-90"> + </button></div></div><button class="p-1.5 text-neutral-400 hover:text-crimson transition-colors self-start"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div>`);
        }), s6("<!--]-->")), s6("</div>"), ln.unref(b4).items.length > 0 ? s6(`<div class="border-t border-burgundy/15 bg-white/20 p-6 space-y-4"><div class="flex justify-between items-center text-neutral-800"><span class="font-medium text-sm">Subtotal:</span><span class="font-extrabold text-lg text-burgundy">${ssrInterpolate(formatPrice(ln.unref(b4).cartTotal))}</span></div><button class="btn-primary w-full py-3.5 flex items-center justify-center space-x-2 text-sm"><span>Continuar Checkout</span></button></div>`) : s6("<!---->"), s6("</div>")) : s6("<!---->"), s6("</div>");
      };
    } });
    b2 = x3.setup;
    x3.setup = (e9, t5) => {
      const a5 = ln.useSSRContext();
      return (a5.modules || (a5.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue"), b2 ? b2(e9, t5) : void 0;
    };
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/index-B0TroN7R.mjs
var index_B0TroN7R_exports = {};
__export(index_B0TroN7R_exports, {
  default: () => p4
});
var f2, x4, p4;
var init_index_B0TroN7R = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/index-B0TroN7R.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_Footer_CUep3_vq();
    init_server();
    init_plugin_vue_export_helper_1tPrXgE0();
    init_renderer();
    init_nitro();
    init_shared_esm_bundler();
    f2 = ln.defineComponent({ __name: "index", __ssrInlineRender: true, async setup(r4) {
      let f4, x7;
      useRouter();
      const p6 = useRoute(), m4 = wr(), { data: g3 } = ([f4, x7] = ln.withAsyncContext(() => Ir("/api/products", "$Pt2MuF3FMO")), f4 = await f4, x7(), f4), h5 = ln.ref(g3.value || []), w3 = ln.ref("todos"), y4 = ln.ref(0), k4 = ln.ref(null), $2 = ln.ref(0), j3 = ln.ref(false), C3 = ln.computed(() => h5.value.filter((a5) => a5.featured)), M3 = ln.computed(() => "todos" === w3.value ? h5.value : h5.value.filter((a5) => (a5.categories || (a5.category ? [a5.category] : [])).includes(w3.value)));
      ln.watch(() => p6.query.category, (a5) => {
        w3.value = a5 ? String(a5) : "todos";
      }, { immediate: true });
      const { data: z3 } = ([f4, x7] = ln.withAsyncContext(() => Ir("/api/categories", "$yaU0OY5M2D")), f4 = await f4, x7(), f4), B2 = ln.ref(z3.value || []);
      function formatPrice(a5) {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(a5);
      }
      __name(formatPrice, "formatPrice");
      function getFirstImage(a5) {
        return a5.images && a5.images.length > 0 && a5.images[0] || a5.image;
      }
      __name(getFirstImage, "getFirstImage");
      function toggleCart() {
        j3.value = !j3.value;
      }
      __name(toggleCart, "toggleCart");
      return ln.ref(0), ln.ref(0), ln.ref(0), ln.ref(0), (s6, d5, l4, o5) => {
        const r5 = h2, f5 = v3;
        d5(`<div${ssrRenderAttrs(ln.mergeProps({ class: "min-h-screen bg-white flex flex-col" }, o5))} data-v-9fa48b3d>`), d5(ssrRenderComponent(r5, { onToggleCart: toggleCart }, null, l4)), C3.value.length > 0 ? (d5('<section id="destaques-section" class="relative w-full" data-v-9fa48b3d><div class="carousel-container-full" data-v-9fa48b3d><!--[-->'), ssrRenderList(C3.value, (a5, t5) => {
          d5(`<div class="${ssrRenderClass([t5 === y4.value ? "opacity-100 z-10" : "opacity-0 z-0", "carousel-slide"])}" data-v-9fa48b3d><div class="carousel-overlay" data-v-9fa48b3d></div><img${ssrRenderAttr("src", getFirstImage(a5))}${ssrRenderAttr("alt", a5.name)} class="absolute inset-0 w-full h-full object-cover" data-v-9fa48b3d><div class="absolute inset-0 z-20 flex items-end pb-9 pt-6 px-6 md:p-12 text-white" data-v-9fa48b3d><div class="max-w-6xl mx-auto w-full px-4 md:px-0" data-v-9fa48b3d><span class="text-xs font-bold uppercase tracking-wider text-crimson bg-white px-3 py-1 rounded-full w-max mb-2 shadow-sm" data-v-9fa48b3d> Destaque Sazonal </span><h2 class="text-2xl md:text-4xl font-extrabold line-clamp-2 leading-tight max-w-2xl text-white" data-v-9fa48b3d>${ssrInterpolate(a5.name)}</h2><p class="text-sm md:text-base text-white/90 line-clamp-2 mt-1.5 mb-4 max-w-xl leading-relaxed" data-v-9fa48b3d>${ssrInterpolate(a5.description)}</p><div class="flex items-center space-x-4" data-v-9fa48b3d><span class="text-xl font-bold" data-v-9fa48b3d>${ssrInterpolate(formatPrice(a5.price))}</span><button class="btn-primary" data-v-9fa48b3d>Adicionar</button></div></div></div></div>`);
        }), d5('<!--]--><button class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/45 text-white p-2.5 rounded-full hover:bg-black/70 transition-all active:scale-90" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" data-v-9fa48b3d></path></svg></button><button class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/45 text-white p-2.5 rounded-full hover:bg-black/70 transition-all active:scale-90" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-9fa48b3d></path></svg></button><div class="carousel-dots" data-v-9fa48b3d><!--[-->'), ssrRenderList(C3.value, (a5, t5) => {
          d5(`<span class="${ssrRenderClass([{ "carousel-dot-active": t5 === y4.value }, "carousel-dot"])}" data-v-9fa48b3d></span>`);
        }), d5("<!--]--></div></div></section>")) : d5("<!---->"), d5('<main class="max-w-6xl mx-auto px-4 pt-8 space-y-8 flex-grow min-w-0 w-full" data-v-9fa48b3d><section class="space-y-3 max-w-full overflow-hidden" data-v-9fa48b3d><h3 class="text-lg font-bold text-burgundy tracking-tight" data-v-9fa48b3d>Categorias</h3><div class="flex w-full gap-3 md:gap-4 pb-4 overflow-x-auto scrollbar-none" data-v-9fa48b3d><!--[-->'), ssrRenderList(B2.value, (a5) => {
          d5(`<div class="${ssrRenderClass([w3.value === a5.id ? "border-burgundy scale-105 shadow-md -translate-y-0.5" : "border-transparent opacity-85 hover:opacity-100 hover:scale-[1.02]", "relative rounded-2xl overflow-hidden w-[130px] shrink-0 h-20 md:flex-1 md:w-auto md:h-24 cursor-pointer select-none transition-all duration-300 ease-in-out border-2 shadow-sm"])}" data-v-9fa48b3d><img${ssrRenderAttr("src", a5.image)}${ssrRenderAttr("alt", a5.name)} class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105 pointer-events-none" data-v-9fa48b3d><div class="${ssrRenderClass([w3.value === a5.id ? "bg-[#780000]/55" : "bg-black/45", "absolute inset-0 flex flex-col items-center justify-center text-white z-10 transition-colors duration-300 p-2 text-center"])}" data-v-9fa48b3d><span class="font-bold text-xs md:text-sm tracking-wide uppercase text-white shadow-sm" data-v-9fa48b3d>${ssrInterpolate(a5.name)}</span></div></div>`);
        }), d5(`<!--]--></div></section><section class="space-y-4" data-v-9fa48b3d><div class="flex justify-between items-center" data-v-9fa48b3d><h3 class="text-lg font-bold text-burgundy tracking-tight" data-v-9fa48b3d>${ssrInterpolate(B2.value.find((a5) => a5.id === w3.value)?.name.split(" ").slice(1).join(" "))}</h3><span class="text-xs text-burgundy/60 font-medium" data-v-9fa48b3d>${ssrInterpolate(M3.value.length)} itens encontrados </span></div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-v-9fa48b3d><!--[-->`), ssrRenderList(M3.value, (a5) => {
          d5('<div class="product-card-glass group cursor-pointer" data-v-9fa48b3d>'), a5.oldPrice ? d5('<div class="absolute top-2 left-2 z-10" data-v-9fa48b3d><span class="badge-discount" data-v-9fa48b3d>Oferta</span></div>') : d5("<!---->"), d5(`<div class="aspect-[9/16] w-full rounded-xl overflow-hidden mb-3 bg-neutral-200/50 relative" data-v-9fa48b3d><img${ssrRenderAttr("src", getFirstImage(a5))}${ssrRenderAttr("alt", a5.name)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" data-v-9fa48b3d></div><div class="flex flex-col flex-grow justify-between" data-v-9fa48b3d><div data-v-9fa48b3d><h4 class="font-bold text-sm text-neutral-800 line-clamp-2 leading-snug group-hover:text-burgundy transition-colors" data-v-9fa48b3d>${ssrInterpolate(a5.name)}</h4><p class="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed" data-v-9fa48b3d>${ssrInterpolate(a5.description)}</p></div><div class="mt-3" data-v-9fa48b3d><div class="flex items-center space-x-1.5" data-v-9fa48b3d>`), a5.oldPrice ? d5(`<span class="text-xs text-neutral-400 line-through" data-v-9fa48b3d>${ssrInterpolate(formatPrice(a5.oldPrice))}</span>`) : d5("<!---->"), d5(`<span class="text-sm font-extrabold text-burgundy" data-v-9fa48b3d>${ssrInterpolate(formatPrice(a5.price))}</span></div><div class="text-[10px] text-neutral-500 font-medium mt-0.5" data-v-9fa48b3d>${ssrInterpolate(a5.installments)}</div><button class="btn-primary-sm w-full mt-3 flex items-center justify-center space-x-1" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" data-v-9fa48b3d></path></svg><span data-v-9fa48b3d>Adicionar</span></button></div></div></div>`);
        }), d5("<!--]--></div></section></main>"), d5(ssrRenderComponent(f5, null, null, l4)), k4.value ? (d5(`<div class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 md:p-4" data-v-9fa48b3d><div class="bg-white w-full md:max-w-xl rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" data-v-9fa48b3d><div class="w-12 h-1 bg-neutral-300 rounded-full mx-auto my-3 md:hidden" data-v-9fa48b3d></div><div class="flex justify-between items-center px-6 py-2 md:py-4 border-b border-neutral-100" data-v-9fa48b3d><h3 class="font-bold text-burgundy text-lg" data-v-9fa48b3d>Detalhes do Presente</h3><button class="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-v-9fa48b3d><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-9fa48b3d></path></svg></button></div><div class="overflow-y-auto p-6 space-y-5" data-v-9fa48b3d><div class="space-y-3" data-v-9fa48b3d><div class="aspect-square w-full rounded-2xl overflow-hidden bg-white/20 relative group" data-v-9fa48b3d><img${ssrRenderAttr("src", k4.value.images && k4.value.images.length > 0 ? k4.value.images[$2.value] : k4.value.image)}${ssrRenderAttr("alt", k4.value.name)} class="w-full h-full object-cover transition-all duration-300 select-none" draggable="false" data-v-9fa48b3d>`), k4.value.images && k4.value.images.length > 1 ? (d5('<!--[--><button class="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/55 text-white p-2 rounded-full transition-all active:scale-90" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" data-v-9fa48b3d></path></svg></button><button class="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/55 text-white p-2 rounded-full transition-all active:scale-90" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-9fa48b3d></path></svg></button><div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10" data-v-9fa48b3d><!--[-->'), ssrRenderList(k4.value.images, (a5, t5) => {
          d5(`<span class="${ssrRenderClass([t5 === $2.value ? "bg-white w-3" : "bg-white/40", "w-1.5 h-1.5 rounded-full transition-all duration-300"])}" data-v-9fa48b3d></span>`);
        }), d5("<!--]--></div><!--]-->")) : d5("<!---->"), d5("</div>"), k4.value.images && k4.value.images.length > 1 ? (d5('<div class="flex space-x-2 overflow-x-auto pb-1 scrollbar-none justify-center" data-v-9fa48b3d><!--[-->'), ssrRenderList(k4.value.images, (a5, t5) => {
          d5(`<img${ssrRenderAttr("src", a5)}${ssrRenderAttr("alt", `${k4.value.name} vista ${t5 + 1}`)} class="${ssrRenderClass([t5 === $2.value ? "gallery-thumbnail-active" : "gallery-thumbnail-inactive", "gallery-thumbnail"])}" data-v-9fa48b3d>`);
        }), d5("<!--]--></div>")) : d5("<!---->"), d5(`</div><div class="space-y-1.5" data-v-9fa48b3d><h2 class="text-xl font-bold text-neutral-800 leading-snug" data-v-9fa48b3d>${ssrInterpolate(k4.value.name)}</h2><div class="flex items-center space-x-2" data-v-9fa48b3d><span class="badge-discount text-[10px]" data-v-9fa48b3d>${ssrInterpolate(k4.value?.categories ? k4.value.categories.map((a5) => B2.value.find((t5) => t5.id === a5)?.name || a5).join(", ") : B2.value.find((a5) => a5.id === k4.value?.category)?.name)}</span><span class="text-xs text-neutral-500 font-medium" data-v-9fa48b3d>${ssrInterpolate(k4.value.installments)}</span></div></div><p class="text-sm text-neutral-600 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-100" data-v-9fa48b3d>${ssrInterpolate(k4.value.description)}</p><div class="flex items-center justify-between border-t border-neutral-100 pt-4" data-v-9fa48b3d><div class="flex flex-col" data-v-9fa48b3d><span class="text-xs text-neutral-400 font-medium" data-v-9fa48b3d>Pre\xE7o</span><div class="flex items-baseline space-x-2" data-v-9fa48b3d>`), k4.value.oldPrice ? d5(`<span class="text-sm text-neutral-400 line-through" data-v-9fa48b3d>${ssrInterpolate(formatPrice(k4.value.oldPrice))}</span>`) : d5("<!---->"), d5(`<span class="text-2xl font-black text-burgundy" data-v-9fa48b3d>${ssrInterpolate(formatPrice(k4.value.price))}</span></div></div><button class="btn-primary flex items-center space-x-2 px-8 py-3" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-9fa48b3d></path></svg><span data-v-9fa48b3d>Comprar</span></button></div></div></div></div>`)) : d5("<!---->"), j3.value ? d5('<div class="cart-drawer-overlay" data-v-9fa48b3d></div>') : d5("<!---->"), j3.value ? (d5('<div class="cart-drawer" data-v-9fa48b3d><div class="flex items-center justify-between px-6 py-5 border-b border-burgundy/15" data-v-9fa48b3d><div class="flex items-center space-x-2" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-9fa48b3d></path></svg><h3 class="font-extrabold text-burgundy text-lg" data-v-9fa48b3d>Meu Carrinho</h3></div><button class="p-2 hover:bg-burgundy/5 text-burgundy rounded-full transition-colors" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-v-9fa48b3d></path></svg></button></div><div class="flex-grow overflow-y-auto p-6 space-y-4" data-v-9fa48b3d>'), 0 === ln.unref(m4).items.length ? d5('<div class="h-full flex flex-col items-center justify-center text-center space-y-4" data-v-9fa48b3d><div class="p-4 bg-white/40 rounded-full text-burgundy/40" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-9fa48b3d></path></svg></div><div data-v-9fa48b3d><p class="font-bold text-burgundy" data-v-9fa48b3d>Seu carrinho est\xE1 vazio</p><p class="text-xs text-neutral-500 mt-1" data-v-9fa48b3d> Adicione presentes florais para demonstrar seu afeto! </p></div><button class="btn-primary-sm mt-2" data-v-9fa48b3d>Continuar Comprando</button></div>') : (d5("<!--[-->"), ssrRenderList(ln.unref(m4).items, (a5) => {
          d5(`<div class="flex items-center space-x-4 bg-white/45 p-3 rounded-2xl border border-white/40 relative shadow-sm" data-v-9fa48b3d><img${ssrRenderAttr("src", getFirstImage(a5.product))}${ssrRenderAttr("alt", a5.product.name)} class="w-16 h-16 rounded-xl object-cover" data-v-9fa48b3d><div class="flex-grow min-w-0" data-v-9fa48b3d><h4 class="font-bold text-xs text-neutral-800 truncate" data-v-9fa48b3d>${ssrInterpolate(a5.product.name)}</h4><span class="text-xs font-semibold text-burgundy block mt-0.5" data-v-9fa48b3d>${ssrInterpolate(formatPrice(a5.product.price))}</span><div class="flex items-center space-x-2 mt-2" data-v-9fa48b3d><button class="w-6 h-6 rounded-lg bg-white/80 border border-burgundy/15 flex items-center justify-center text-burgundy font-bold text-sm active:scale-90" data-v-9fa48b3d> - </button><span class="text-xs font-bold text-neutral-700 w-4 text-center" data-v-9fa48b3d>${ssrInterpolate(a5.quantity)}</span><button class="w-6 h-6 rounded-lg bg-white/80 border border-burgundy/15 flex items-center justify-center text-burgundy font-bold text-sm active:scale-90" data-v-9fa48b3d> + </button></div></div><button class="p-1.5 text-neutral-400 hover:text-crimson transition-colors self-start" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-9fa48b3d></path></svg></button></div>`);
        }), d5("<!--]-->")), d5("</div>"), ln.unref(m4).items.length > 0 ? d5(`<div class="border-t border-burgundy/15 bg-white/20 p-6 space-y-4" data-v-9fa48b3d><div class="flex justify-between items-center text-neutral-800" data-v-9fa48b3d><span class="font-medium text-sm" data-v-9fa48b3d>Subtotal:</span><span class="font-extrabold text-lg text-burgundy" data-v-9fa48b3d>${ssrInterpolate(formatPrice(ln.unref(m4).cartTotal))}</span></div><button class="btn-primary w-full py-3.5 flex items-center justify-center space-x-2 text-sm" data-v-9fa48b3d><span data-v-9fa48b3d>Finalizar Compra</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" data-v-9fa48b3d></path></svg></button></div>`) : d5("<!---->"), d5("</div>")) : d5("<!---->"), d5(`<div class="mobile-navigation-bar" data-v-9fa48b3d><button class="${ssrRenderClass([{ "mobile-nav-item-active": "todos" === w3.value }, "mobile-nav-item"])}" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-9fa48b3d></path></svg><span class="text-[10px] mt-0.5 font-semibold" data-v-9fa48b3d>In\xEDcio</span></button><button class="${ssrRenderClass([{ "mobile-nav-item-active": "destaques" === w3.value }, "mobile-nav-item"])}" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" data-v-9fa48b3d></path></svg><span class="text-[10px] mt-0.5 font-semibold" data-v-9fa48b3d>Destaques</span></button><button class="mobile-nav-item relative" data-v-9fa48b3d><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-9fa48b3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-9fa48b3d></path></svg>`), ln.unref(m4).cartItemsCount > 0 ? d5(`<span class="cart-badge bg-crimson w-4 h-4 text-[9px] top-1 right-3" data-v-9fa48b3d>${ssrInterpolate(ln.unref(m4).cartItemsCount)}</span>`) : d5("<!---->"), d5('<span class="text-[10px] mt-0.5 font-semibold" data-v-9fa48b3d>Carrinho</span></button><a href="https://wa.me/5567999476896?text=Ol\xE1,%20gostaria%20de%20tirar%20uma%20d\xFAvida%20sobre%20as%20flores%20e%20cestas!" target="_blank" class="mobile-nav-item" data-v-9fa48b3d><svg viewBox="0 0 24 24" class="h-5.5 w-5.5 fill-current" xmlns="http://www.w3.org/2000/svg" data-v-9fa48b3d><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-v-9fa48b3d></path></svg><span class="text-[10px] mt-0.5 font-semibold" data-v-9fa48b3d>Contato</span></a></div><a href="https://wa.me/5567999476896?text=Ol\xE1,%20gostaria%20de%20tirar%20uma%20d\xFAvida%20sobre%20as%20flores%20e%20cestas!" target="_blank" class="hidden md:flex fixed bottom-6 right-6 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-40 items-center justify-center" title="Fale conosco no WhatsApp" data-v-9fa48b3d><svg viewBox="0 0 24 24" class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" data-v-9fa48b3d><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-v-9fa48b3d></path></svg></a></div>');
      };
    } });
    x4 = f2.setup;
    f2.setup = (a5, t5) => {
      const s6 = ln.useSSRContext();
      return (s6.modules || (s6.modules = /* @__PURE__ */ new Set())).add("pages/index.vue"), x4 ? x4(a5, t5) : void 0;
    };
    p4 = _export_sfc(f2, [["__scopeId", "data-v-9fa48b3d"]]);
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/composables-JON4pN1W.mjs
function useHead2(s6, o5 = {}) {
  const a5 = o5.head || (function(t5) {
    const s7 = t5 || useNuxtApp();
    return s7.ssrContext?.head || s7.runWithContext(() => {
      if (ln.hasInjectionContext()) {
        const e9 = ln.inject(kr);
        if (!e9) throw new Error("[nuxt] [unhead] Missing Unhead instance.");
        return e9;
      }
    });
  })(o5.nuxt);
  return useHead(s6, { head: a5, ...o5 });
}
var init_composables_JON4pN1W = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/composables-JON4pN1W.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_server();
    init_renderer();
    __name(useHead2, "useHead");
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/error-404-ZvPooiPq.mjs
var error_404_ZvPooiPq_exports = {};
__export(error_404_ZvPooiPq_exports, {
  default: () => S2
});
function sanitizeExternalHref(e9) {
  let t5 = e9.replace(/[\u0000-\u001F\s]+/g, "");
  for (; t5.toLowerCase().startsWith("view-source:"); ) t5 = t5.slice(12);
  const r4 = t5.indexOf(":");
  return r4 > 0 && isScriptProtocol(t5.slice(0, r4 + 1)) ? null : e9;
}
function defineNuxtLink(a5) {
  const n6 = a5.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(e9) {
    return "string" == typeof e9 && e9.startsWith("#");
  }
  __name(isHashLinkWithoutHashMode, "isHashLinkWithoutHashMode");
  function useNuxtLink(e9) {
    const n7 = useRouter(), o5 = useRuntimeConfig(), u6 = ln.computed(() => !!ln.unref(e9.target) && "_self" !== ln.unref(e9.target)), c4 = ln.computed(() => {
      const r4 = ln.unref(e9.to) || ln.unref(e9.href) || "";
      return "string" == typeof r4 && hasProtocol(r4, { acceptRelative: true });
    }), f4 = ln.resolveComponent("RouterLink"), v5 = f4 && "string" != typeof f4 ? f4.useLink : void 0, h5 = ln.computed(() => {
      if (ln.unref(e9.external)) return true;
      const t5 = ln.unref(e9.to) || ln.unref(e9.href) || "";
      return "object" != typeof t5 && ("" === t5 || c4.value);
    }), m4 = ln.computed(() => {
      const t5 = ln.unref(e9.to) || ln.unref(e9.href) || "";
      return h5.value ? t5 : (function(e10, t6, r4) {
        const n8 = r4 ?? a5.trailingSlash;
        if (!e10 || "append" !== n8 && "remove" !== n8) return e10;
        if ("string" == typeof e10) return applyTrailingSlashBehavior(e10, n8);
        const o6 = "path" in e10 && void 0 !== e10.path ? e10.path : t6(e10).path;
        return { ...e10, name: void 0, path: applyTrailingSlashBehavior(o6, n8) };
      })(t5, n7.resolve, ln.unref(e9.trailingSlash));
    }), g3 = h5.value ? void 0 : v5?.({ ...e9, to: m4, viewTransition: ln.unref(e9.viewTransition) }), b4 = ln.computed(() => {
      const t5 = ln.unref(e9.trailingSlash) ?? a5.trailingSlash;
      if (!m4.value || c4.value || isHashLinkWithoutHashMode(m4.value)) {
        const e10 = m4.value;
        return "string" == typeof e10 ? sanitizeExternalHref(e10) : e10;
      }
      if (h5.value) {
        const e10 = "object" == typeof m4.value && "path" in m4.value ? resolveRouteObject(m4.value) : m4.value, r4 = "object" == typeof e10 ? n7.resolve(e10).href : e10, a6 = "string" == typeof r4 ? sanitizeExternalHref(r4) : r4;
        return null === a6 ? null : applyTrailingSlashBehavior(a6, t5);
      }
      return "object" == typeof m4.value ? n7.resolve(m4.value)?.href ?? null : applyTrailingSlashBehavior(joinURL(o5.app.baseURL, m4.value), t5);
    });
    return { to: m4, hasTarget: u6, isAbsoluteUrl: c4, isExternal: h5, href: b4, isActive: g3?.isActive ?? ln.computed(() => m4.value === n7.currentRoute.value.path), isExactActive: g3?.isExactActive ?? ln.computed(() => m4.value === n7.currentRoute.value.path), route: g3?.route ?? ln.computed(() => n7.resolve(m4.value)), async navigate(t5) {
      null !== b4.value && await navigateTo(b4.value, { replace: ln.unref(e9.replace), external: h5.value || u6.value });
    } };
  }
  __name(useNuxtLink, "useNuxtLink");
  return ln.defineComponent({ name: n6, props: { to: { type: [String, Object], default: void 0, required: false }, href: { type: [String, Object], default: void 0, required: false }, target: { type: String, default: void 0, required: false }, rel: { type: String, default: void 0, required: false }, noRel: { type: Boolean, default: void 0, required: false }, prefetch: { type: Boolean, default: void 0, required: false }, prefetchOn: { type: [String, Object], default: void 0, required: false }, noPrefetch: { type: Boolean, default: void 0, required: false }, activeClass: { type: String, default: void 0, required: false }, exactActiveClass: { type: String, default: void 0, required: false }, prefetchedClass: { type: String, default: void 0, required: false }, replace: { type: Boolean, default: void 0, required: false }, ariaCurrentValue: { type: String, default: void 0, required: false }, external: { type: Boolean, default: void 0, required: false }, custom: { type: Boolean, default: void 0, required: false }, trailingSlash: { type: String, default: void 0, required: false } }, useLink: useNuxtLink, setup(t5, { slots: r4 }) {
    const n7 = useRouter(), { to: o5, href: l4, navigate: d5, isExternal: p6, hasTarget: f4, isAbsoluteUrl: v5 } = useNuxtLink(t5);
    ln.shallowRef(false);
    async function prefetch(e9 = useNuxtApp()) {
    }
    __name(prefetch, "prefetch");
    return () => {
      if (!p6.value && !f4.value && !isHashLinkWithoutHashMode(o5.value)) {
        const e9 = { ref: void 0, to: o5.value, activeClass: t5.activeClass || a5.activeClass, exactActiveClass: t5.exactActiveClass || a5.exactActiveClass, replace: t5.replace, ariaCurrentValue: t5.ariaCurrentValue, custom: t5.custom };
        return t5.custom || (e9.rel = t5.rel || void 0), ln.h(ln.resolveComponent("RouterLink"), e9, r4.default);
      }
      const s6 = t5.target || null, c4 = ((...e9) => e9.find((e10) => void 0 !== e10))(t5.noRel ? "" : t5.rel, a5.externalRelAttribute, v5.value || f4.value ? "noopener noreferrer" : "") || null;
      return t5.custom ? r4.default ? r4.default({ href: l4.value, navigate: d5, prefetch, get route() {
        if (!l4.value) return;
        const t6 = new URL(l4.value, "http://localhost");
        return { path: t6.pathname, fullPath: t6.pathname, get query() {
          return parseQuery(t6.search);
        }, hash: t6.hash, params: {}, name: void 0, matched: [], redirectedFrom: void 0, meta: {}, href: l4.value };
      }, rel: c4, target: s6, isExternal: p6.value || f4.value, isActive: false, isExactActive: false }) : null : ln.h("a", { ref: void 0, href: l4.value || null, rel: c4, target: s6, onClick: /* @__PURE__ */ __name(async (e9) => {
        if (!p6.value && !f4.value) {
          e9.preventDefault();
          try {
            const e10 = encodeRoutePath(l4.value ?? "");
            return await (t5.replace ? n7.replace(e10) : n7.push(e10));
          } finally {
          }
        }
      }, "onClick") }, r4.default?.());
    };
  } });
}
function applyTrailingSlashBehavior(e9, r4) {
  const a5 = "append" === r4 ? withTrailingSlash : withoutTrailingSlash;
  return hasProtocol(e9) && !e9.startsWith("http") ? e9 : a5(e9, true);
}
var y2, x5, k2, S2;
var init_error_404_ZvPooiPq = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/error-404-ZvPooiPq.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_server();
    init_plugin_vue_export_helper_1tPrXgE0();
    init_composables_JON4pN1W();
    init_renderer();
    init_shared_esm_bundler();
    __name(sanitizeExternalHref, "sanitizeExternalHref");
    __name(defineNuxtLink, "defineNuxtLink");
    y2 = defineNuxtLink(er);
    __name(applyTrailingSlashBehavior, "applyTrailingSlashBehavior");
    x5 = { __name: "error-404", __ssrInlineRender: true, props: { appName: { type: String, default: "Nuxt" }, status: { type: Number, default: 404 }, statusText: { type: String, default: "Page not found" }, description: { type: String, default: "Sorry, the page you are looking for could not be found." }, backHome: { type: String, default: "Go back home" } }, setup(e9) {
      const t5 = e9;
      return useHead2({ title: `${t5.status} - ${t5.statusText} | ${t5.appName}`, script: [{ innerHTML: `!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();` }], style: [{ innerHTML: '*,:after,:before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }' }] }), (t6, r4, a5, n6) => {
        const o5 = y2;
        r4(`<div${ssrRenderAttrs(ln.mergeProps({ class: "antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide" }, n6))} data-v-fe12e1a3><div class="max-w-520px text-center" data-v-fe12e1a3><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]" data-v-fe12e1a3>${ssrInterpolate(e9.status)}</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl" data-v-fe12e1a3>${ssrInterpolate(e9.statusText)}</h2><p class="mb-4 px-2 text-[#64748B] text-md" data-v-fe12e1a3>${ssrInterpolate(e9.description)}</p><div class="flex items-center justify-center w-full" data-v-fe12e1a3>`), r4(ssrRenderComponent(o5, { to: "/", class: "font-medium hover:text-[#00DC82] text-sm underline underline-offset-3" }, { default: ln.withCtx((t7, r5, a6, n7) => {
          if (!r5) return [ln.createTextVNode(ln.toDisplayString(e9.backHome), 1)];
          r5(`${ssrInterpolate(e9.backHome)}`);
        }), _: 1 }, a5)), r4("</div></div></div>");
      };
    } };
    k2 = x5.setup;
    x5.setup = (e9, t5) => {
      const r4 = ln.useSSRContext();
      return (r4.modules || (r4.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue"), k2 ? k2(e9, t5) : void 0;
    };
    S2 = _export_sfc(x5, [["__scopeId", "data-v-fe12e1a3"]]);
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/error-500-DZSQ9eS4.mjs
var error_500_DZSQ9eS4_exports = {};
__export(error_500_DZSQ9eS4_exports, {
  default: () => i3
});
var s3, a2, i3;
var init_error_500_DZSQ9eS4 = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/error-500-DZSQ9eS4.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_plugin_vue_export_helper_1tPrXgE0();
    init_composables_JON4pN1W();
    init_server();
    init_renderer();
    init_nitro();
    init_shared_esm_bundler();
    s3 = { __name: "error-500", __ssrInlineRender: true, props: { appName: { type: String, default: "Nuxt" }, status: { type: Number, default: 500 }, statusText: { type: String, default: "Internal server error" }, description: { type: String, default: "This page is temporarily unavailable." }, refresh: { type: String, default: "Refresh this page" } }, setup(e9) {
      const s6 = e9;
      return useHead2({ title: `${s6.status} - ${s6.statusText} | ${s6.appName}`, script: [{ innerHTML: `!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();` }], style: [{ innerHTML: '*,:after,:before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }' }] }), (t5, s7, a5, i6) => {
        s7(`<div${ssrRenderAttrs(ln.mergeProps({ class: "antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide" }, i6))} data-v-60421475><div class="max-w-520px text-center" data-v-60421475><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]" data-v-60421475>${ssrInterpolate(e9.status)}</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl" data-v-60421475>${ssrInterpolate(e9.statusText)}</h2><p class="mb-4 px-2 text-[#64748B] text-md" data-v-60421475>${ssrInterpolate(e9.description)}</p></div></div>`);
      };
    } };
    a2 = s3.setup;
    s3.setup = (e9, t5) => {
      const n6 = ln.useSSRContext();
      return (n6.modules || (n6.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue"), a2 ? a2(e9, t5) : void 0;
    };
    i3 = _export_sfc(s3, [["__scopeId", "data-v-60421475"]]);
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/server.mjs
var server_exports = {};
__export(server_exports, {
  a: () => wr,
  b: () => useRoute,
  c: () => Ir,
  d: () => useNuxtApp,
  e: () => encodeRoutePath,
  f: () => useRuntimeConfig,
  g: () => er,
  n: () => navigateTo,
  r: () => resolveRouteObject,
  s: () => $r,
  u: () => useRouter,
  v: () => ln
});
function registerRuntimeHelpers(e9) {
  Object.getOwnPropertySymbols(e9).forEach((t5) => {
    Je[t5] = e9[t5];
  });
}
function createRoot(e9, t5 = "") {
  return { type: 0, source: t5, children: e9, helpers: /* @__PURE__ */ new Set(), components: [], directives: [], hoists: [], imports: [], cached: [], temps: 0, codegenNode: void 0, loc: Qe };
}
function createVNodeCall(e9, t5, n6, r4, o5, s6, i6, a5 = false, c4 = false, l4 = false, u6 = Qe) {
  return e9 && (a5 ? (e9.helper(ge), e9.helper(getVNodeBlockHelper(e9.inSSR, l4))) : e9.helper(getVNodeHelper(e9.inSSR, l4)), i6 && e9.helper(Re)), { type: 13, tag: t5, props: n6, children: r4, patchFlag: o5, dynamicProps: s6, directives: i6, isBlock: a5, disableTracking: c4, isComponent: l4, loc: u6 };
}
function createArrayExpression(e9, t5 = Qe) {
  return { type: 17, loc: t5, elements: e9 };
}
function createObjectExpression(e9, t5 = Qe) {
  return { type: 15, loc: t5, properties: e9 };
}
function createObjectProperty(e9, t5) {
  return { type: 16, loc: Qe, key: isString(e9) ? createSimpleExpression(e9, true) : e9, value: t5 };
}
function createSimpleExpression(e9, t5 = false, n6 = Qe, r4 = 0) {
  return { type: 4, loc: n6, content: e9, isStatic: t5, constType: t5 ? 3 : r4 };
}
function createCompoundExpression(e9, t5 = Qe) {
  return { type: 8, loc: t5, children: e9 };
}
function createCallExpression(e9, t5 = [], n6 = Qe) {
  return { type: 14, loc: n6, callee: e9, arguments: t5 };
}
function createFunctionExpression(e9, t5 = void 0, n6 = false, r4 = false, o5 = Qe) {
  return { type: 18, params: e9, returns: t5, newline: n6, isSlot: r4, loc: o5 };
}
function createConditionalExpression(e9, t5, n6, r4 = true) {
  return { type: 19, test: e9, consequent: t5, alternate: n6, newline: r4, loc: Qe };
}
function createCacheExpression(e9, t5, n6 = false, r4 = false) {
  return { type: 20, index: e9, value: t5, needPauseTracking: n6, inVOnce: r4, needArraySpread: false, loc: Qe };
}
function createBlockStatement(e9) {
  return { type: 21, body: e9, loc: Qe };
}
function getVNodeHelper(e9, t5) {
  return e9 || t5 ? ye : Se;
}
function getVNodeBlockHelper(e9, t5) {
  return e9 || t5 ? Ee : _e;
}
function convertToBlock(e9, { helper: t5, removeHelper: n6, inSSR: r4 }) {
  e9.isBlock || (e9.isBlock = true, n6(getVNodeHelper(r4, e9.isComponent)), t5(ge), t5(getVNodeBlockHelper(r4, e9.isComponent)));
}
function isTagStartChar(e9) {
  return e9 >= 97 && e9 <= 122 || e9 >= 65 && e9 <= 90;
}
function isWhitespace(e9) {
  return 32 === e9 || 10 === e9 || 9 === e9 || 12 === e9 || 13 === e9;
}
function isEndOfTagSection(e9) {
  return 47 === e9 || 62 === e9 || isWhitespace(e9);
}
function toCharCodes(e9) {
  const t5 = new Uint8Array(e9.length);
  for (let n6 = 0; n6 < e9.length; n6++) t5[n6] = e9.charCodeAt(n6);
  return t5;
}
function getCompatValue(e9, { compatConfig: t5 }) {
  const n6 = t5 && t5[e9];
  return "MODE" === e9 ? n6 || 3 : n6;
}
function isCompatEnabled(e9, t5) {
  const n6 = getCompatValue("MODE", t5), r4 = getCompatValue(e9, t5);
  return 3 === n6 ? true === r4 : false !== r4;
}
function checkCompatEnabled(e9, t5, n6, ...r4) {
  return isCompatEnabled(e9, t5);
}
function defaultOnError(e9) {
  throw e9;
}
function defaultOnWarn(e9) {
}
function createCompilerError(e9, t5, n6, r4) {
  const o5 = new SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e9}`));
  return o5.code = e9, o5.loc = t5, o5;
}
function walkBlockDeclarations(e9, t5) {
  const n6 = "SwitchCase" === e9.type ? e9.consequent : e9.body;
  for (const e10 of n6) if ("VariableDeclaration" === e10.type) {
    if (e10.declare) continue;
    for (const n7 of e10.declarations) for (const e11 of extractIdentifiers(n7.id)) t5(e11);
  } else if ("FunctionDeclaration" === e10.type || "ClassDeclaration" === e10.type) {
    if (e10.declare || !e10.id) continue;
    t5(e10.id);
  } else isForStatement(e10) ? walkForStatement(e10, true, t5) : "SwitchStatement" === e10.type && walkSwitchStatement(e10, true, t5);
}
function isForStatement(e9) {
  return "ForOfStatement" === e9.type || "ForInStatement" === e9.type || "ForStatement" === e9.type;
}
function walkForStatement(e9, t5, n6) {
  const r4 = "ForStatement" === e9.type ? e9.init : e9.left;
  if (r4 && "VariableDeclaration" === r4.type && ("var" === r4.kind ? t5 : !t5)) for (const e10 of r4.declarations) for (const t6 of extractIdentifiers(e10.id)) n6(t6);
}
function walkSwitchStatement(e9, t5, n6) {
  for (const r4 of e9.cases) {
    for (const e10 of r4.consequent) if ("VariableDeclaration" === e10.type && ("var" === e10.kind ? t5 : !t5)) for (const t6 of e10.declarations) for (const e11 of extractIdentifiers(t6.id)) n6(e11);
    walkBlockDeclarations(r4, n6);
  }
}
function extractIdentifiers(e9, t5 = []) {
  switch (e9.type) {
    case "Identifier":
      t5.push(e9);
      break;
    case "MemberExpression":
      let n6 = e9;
      for (; "MemberExpression" === n6.type; ) n6 = n6.object;
      t5.push(n6);
      break;
    case "ObjectPattern":
      for (const n7 of e9.properties) "RestElement" === n7.type ? extractIdentifiers(n7.argument, t5) : extractIdentifiers(n7.value, t5);
      break;
    case "ArrayPattern":
      e9.elements.forEach((e10) => {
        e10 && extractIdentifiers(e10, t5);
      });
      break;
    case "RestElement":
      extractIdentifiers(e9.argument, t5);
      break;
    case "AssignmentPattern":
      extractIdentifiers(e9.left, t5);
  }
  return t5;
}
function isCoreComponent(e9) {
  switch (e9) {
    case "Teleport":
    case "teleport":
      return de;
    case "Suspense":
    case "suspense":
      return he;
    case "KeepAlive":
    case "keep-alive":
      return fe;
    case "BaseTransition":
    case "base-transition":
      return me;
  }
}
function advancePositionWithMutation(e9, t5, n6 = t5.length) {
  let r4 = 0, o5 = -1;
  for (let e10 = 0; e10 < n6; e10++) 10 === t5.charCodeAt(e10) && (r4++, o5 = e10);
  return e9.offset += n6, e9.line += r4, e9.column = -1 === o5 ? e9.column + n6 : n6 - o5, e9;
}
function findDir(e9, t5, n6 = false) {
  for (let r4 = 0; r4 < e9.props.length; r4++) {
    const o5 = e9.props[r4];
    if (7 === o5.type && (n6 || o5.exp) && (isString(t5) ? o5.name === t5 : t5.test(o5.name))) return o5;
  }
}
function findProp(e9, t5, n6 = false, r4 = false) {
  for (let o5 = 0; o5 < e9.props.length; o5++) {
    const s6 = e9.props[o5];
    if (6 === s6.type) {
      if (n6) continue;
      if (s6.name === t5 && (s6.value || r4)) return s6;
    } else if ("bind" === s6.name && (s6.exp || r4) && isStaticArgOf(s6.arg, t5)) return s6;
  }
}
function isStaticArgOf(e9, t5) {
  return !(!e9 || !isStaticExp(e9) || e9.content !== t5);
}
function hasDynamicKeyVBind(e9) {
  return e9.props.some((e10) => !(7 !== e10.type || "bind" !== e10.name || e10.arg && 4 === e10.arg.type && e10.arg.isStatic));
}
function isText$1(e9) {
  return 5 === e9.type || 2 === e9.type;
}
function isVPre(e9) {
  return 7 === e9.type && "pre" === e9.name;
}
function isVSlot(e9) {
  return 7 === e9.type && "slot" === e9.name;
}
function isTemplateNode(e9) {
  return 1 === e9.type && 3 === e9.tagType;
}
function isSlotOutlet(e9) {
  return 1 === e9.type && 2 === e9.tagType;
}
function getUnnormalizedProps(e9, t5 = []) {
  if (e9 && !isString(e9) && 14 === e9.type) {
    const n6 = e9.callee;
    if (!isString(n6) && ht.has(n6)) return getUnnormalizedProps(e9.arguments[0], t5.concat(e9));
  }
  return [e9, t5];
}
function injectProp(e9, t5, n6) {
  let r4, o5, s6 = 13 === e9.type ? e9.props : e9.arguments[2], i6 = [];
  if (s6 && !isString(s6) && 14 === s6.type) {
    const e10 = getUnnormalizedProps(s6);
    s6 = e10[0], i6 = e10[1], o5 = i6[i6.length - 1];
  }
  if (null == s6 || isString(s6)) r4 = createObjectExpression([t5]);
  else if (14 === s6.type) {
    const e10 = s6.arguments[0];
    isString(e10) || 15 !== e10.type ? s6.callee === Fe ? r4 = createCallExpression(n6.helper(we), [createObjectExpression([t5]), s6]) : s6.arguments.unshift(createObjectExpression([t5])) : hasProp(t5, e10) || e10.properties.unshift(t5), !r4 && (r4 = s6);
  } else 15 === s6.type ? (hasProp(t5, s6) || s6.properties.unshift(t5), r4 = s6) : (r4 = createCallExpression(n6.helper(we), [createObjectExpression([t5]), s6]), o5 && o5.callee === Ve && (o5 = i6[i6.length - 2]));
  13 === e9.type ? o5 ? o5.arguments[0] = r4 : e9.props = r4 : o5 ? o5.arguments[0] = r4 : e9.arguments[2] = r4;
}
function hasProp(e9, t5) {
  let n6 = false;
  if (4 === e9.key.type) {
    const r4 = e9.key.content;
    n6 = t5.properties.some((e10) => 4 === e10.key.type && e10.key.content === r4);
  }
  return n6;
}
function toValidAssetId(e9, t5) {
  return `_${t5}_${e9.replace(/[^\w]/g, (t6, n6) => "-" === t6 ? "_" : e9.charCodeAt(n6).toString())}`;
}
function getMemoedVNodeCall(e9) {
  return 14 === e9.type && e9.callee === Ke ? e9.arguments[1].returns : e9;
}
function isAllWhitespace(e9) {
  for (let t5 = 0; t5 < e9.length; t5++) if (!isWhitespace(e9.charCodeAt(t5))) return false;
  return true;
}
function isWhitespaceText(e9) {
  return 2 === e9.type && isAllWhitespace(e9.content) || 12 === e9.type && isWhitespaceText(e9.content);
}
function isCommentOrWhitespace(e9) {
  return 3 === e9.type || isWhitespaceText(e9);
}
function getSlice(e9, t5) {
  return _t.slice(e9, t5);
}
function endOpenTag(e9) {
  Rt.inSFCRoot && (yt.innerLoc = getLoc(e9 + 1, e9 + 1)), addNode(yt);
  const { tag: t5, ns: n6 } = yt;
  0 === n6 && gt.isPreTag(t5) && Nt++, gt.isVoidTag(t5) ? onCloseTag(yt, e9) : (Ot.unshift(yt), 1 !== n6 && 2 !== n6 || (Rt.inXML = true)), yt = null;
}
function onText(e9, t5, n6) {
  {
    const t6 = Ot[0] && Ot[0].tag;
    "script" !== t6 && "style" !== t6 && e9.includes("&") && (e9 = gt.decodeEntities(e9, false));
  }
  const r4 = Ot[0] || Et, o5 = r4.children[r4.children.length - 1];
  o5 && 2 === o5.type ? (o5.content += e9, setLocEnd(o5.loc, n6)) : r4.children.push({ type: 2, content: e9, loc: getLoc(t5, n6) });
}
function onCloseTag(e9, t5, n6 = false) {
  setLocEnd(e9.loc, n6 ? backTrack(t5, 60) : (function(e10, t6) {
    let n7 = e10;
    for (; _t.charCodeAt(n7) !== t6 && n7 < _t.length - 1; ) n7++;
    return n7;
  })(t5, 62) + 1), Rt.inSFCRoot && (e9.children.length ? e9.innerLoc.end = n({}, e9.children[e9.children.length - 1].loc.end) : e9.innerLoc.end = n({}, e9.innerLoc.start), e9.innerLoc.source = getSlice(e9.innerLoc.start.offset, e9.innerLoc.end.offset));
  const { tag: r4, ns: o5, children: s6 } = e9;
  if (bt || ("slot" === r4 ? e9.tagType = 2 : isFragmentTemplate(e9) ? e9.tagType = 3 : (function({ tag: e10, props: t6 }) {
    if (gt.isCustomElement(e10)) return false;
    if ("component" === e10 || (n7 = e10.charCodeAt(0), n7 > 64 && n7 < 91) || isCoreComponent(e10) || gt.isBuiltInComponent && gt.isBuiltInComponent(e10) || gt.isNativeTag && !gt.isNativeTag(e10)) return true;
    var n7;
    for (let e11 = 0; e11 < t6.length; e11++) {
      const n8 = t6[e11];
      if (6 === n8.type) {
        if ("is" === n8.name && n8.value) {
          if (n8.value.content.startsWith("vue:")) return true;
          if (checkCompatEnabled("COMPILER_IS_ON_ELEMENT", gt, n8.loc)) return true;
        }
      } else if ("bind" === n8.name && isStaticArgOf(n8.arg, "is") && checkCompatEnabled("COMPILER_IS_ON_ELEMENT", gt, n8.loc)) return true;
    }
    return false;
  })(e9) && (e9.tagType = 1)), Rt.inRCDATA || (e9.children = condenseWhitespace(s6)), 0 === o5 && gt.isIgnoreNewlineTag(r4)) {
    const e10 = s6[0];
    e10 && 2 === e10.type && (e10.content = e10.content.replace(/^\r?\n/, ""));
  }
  0 === o5 && gt.isPreTag(r4) && Nt--, xt === e9 && (bt = Rt.inVPre = false, xt = null), Rt.inXML && 0 === (Ot[0] ? Ot[0].ns : gt.ns) && (Rt.inXML = false);
  {
    const t6 = e9.props;
    if (!Rt.inSFCRoot && isCompatEnabled("COMPILER_NATIVE_TEMPLATE", gt) && "template" === e9.tag && !isFragmentTemplate(e9)) {
      const t7 = Ot[0] || Et, n8 = t7.children.indexOf(e9);
      t7.children.splice(n8, 1, ...e9.children);
    }
    const n7 = t6.find((e10) => 6 === e10.type && "inline-template" === e10.name);
    n7 && checkCompatEnabled("COMPILER_INLINE_TEMPLATE", gt, n7.loc) && e9.children.length && (n7.value = { type: 2, content: getSlice(e9.children[0].loc.start.offset, e9.children[e9.children.length - 1].loc.end.offset), loc: n7.loc });
  }
}
function backTrack(e9, t5) {
  let n6 = e9;
  for (; _t.charCodeAt(n6) !== t5 && n6 >= 0; ) n6--;
  return n6;
}
function isFragmentTemplate({ tag: e9, props: t5 }) {
  if ("template" === e9) {
    for (let e10 = 0; e10 < t5.length; e10++) if (7 === t5[e10].type && Pt.has(t5[e10].name)) return true;
  }
  return false;
}
function condenseWhitespace(e9) {
  const t5 = "preserve" !== gt.whitespace;
  let n6 = false;
  for (let r4 = 0; r4 < e9.length; r4++) {
    const o5 = e9[r4];
    if (2 === o5.type) if (Nt) o5.content = o5.content.replace(Lt, "\n");
    else if (isAllWhitespace(o5.content)) {
      const s6 = e9[r4 - 1] && e9[r4 - 1].type, i6 = e9[r4 + 1] && e9[r4 + 1].type;
      !s6 || !i6 || t5 && (3 === s6 && (3 === i6 || 1 === i6) || 1 === s6 && (3 === i6 || 1 === i6 && hasNewlineChar(o5.content))) ? (n6 = true, e9[r4] = null) : o5.content = " ";
    } else t5 && (o5.content = condense(o5.content));
  }
  return n6 ? e9.filter(Boolean) : e9;
}
function hasNewlineChar(e9) {
  for (let t5 = 0; t5 < e9.length; t5++) {
    const n6 = e9.charCodeAt(t5);
    if (10 === n6 || 13 === n6) return true;
  }
  return false;
}
function condense(e9) {
  let t5 = "", n6 = false;
  for (let r4 = 0; r4 < e9.length; r4++) isWhitespace(e9.charCodeAt(r4)) ? n6 || (t5 += " ", n6 = true) : (t5 += e9[r4], n6 = false);
  return t5;
}
function addNode(e9) {
  (Ot[0] || Et).children.push(e9);
}
function getLoc(e9, t5) {
  return { start: Rt.getPos(e9), end: null == t5 ? t5 : Rt.getPos(t5), source: null == t5 ? t5 : getSlice(e9, t5) };
}
function setLocEnd(e9, t5) {
  e9.end = Rt.getPos(t5), e9.source = getSlice(e9.start.offset, t5);
}
function dirToAttr(e9) {
  const t5 = { type: 6, name: e9.rawName, nameLoc: getLoc(e9.loc.start.offset, e9.loc.start.offset + e9.rawName.length), value: void 0, loc: e9.loc };
  if (e9.exp) {
    const n6 = e9.exp.loc;
    n6.end.offset < e9.loc.end.offset && (n6.start.offset--, n6.start.column--, n6.end.offset++, n6.end.column++), t5.value = { type: 2, content: e9.exp.content, loc: n6 };
  }
  return t5;
}
function createExp(e9, t5 = false, n6, r4 = 0, o5 = 0) {
  return createSimpleExpression(e9, t5, n6, r4);
}
function emitError(e9, t5, n6) {
  gt.onError(createCompilerError(e9, getLoc(t5, t5)));
}
function baseParse(e9, t5) {
  if (Rt.reset(), yt = null, St = null, vt = "", Tt = -1, Ct = -1, Ot.length = 0, _t = e9, gt = n({}, mt), t5) {
    let e10;
    for (e10 in t5) null != t5[e10] && (gt[e10] = t5[e10]);
  }
  Rt.mode = "html" === gt.parseMode ? 1 : "sfc" === gt.parseMode ? 2 : 0, Rt.inXML = 1 === gt.ns || 2 === gt.ns;
  const n6 = t5 && t5.delimiters;
  n6 && (Rt.delimiterOpen = toCharCodes(n6[0]), Rt.delimiterClose = toCharCodes(n6[1]));
  const r4 = Et = createRoot([], e9);
  return Rt.parse(_t), r4.loc = getLoc(0, e9.length), r4.children = condenseWhitespace(r4.children), Et = null, r4;
}
function cacheStatic(e9, t5) {
  walk(e9, void 0, t5, !!getSingleElementRoot(e9));
}
function getSingleElementRoot(e9) {
  const t5 = e9.children.filter((e10) => 3 !== e10.type);
  return 1 !== t5.length || 1 !== t5[0].type || isSlotOutlet(t5[0]) ? null : t5[0];
}
function walk(e9, t5, n6, r4 = false, o5 = false) {
  const { children: s6 } = e9, i6 = [];
  for (let t6 = 0; t6 < s6.length; t6++) {
    const a6 = s6[t6];
    if (1 === a6.type && 0 === a6.tagType) {
      const e10 = r4 ? 0 : getConstantType(a6, n6);
      if (e10 > 0) {
        if (e10 >= 2) {
          a6.codegenNode.patchFlag = -1, i6.push(a6);
          continue;
        }
      } else {
        const e11 = a6.codegenNode;
        if (13 === e11.type) {
          const t7 = e11.patchFlag;
          if ((void 0 === t7 || 512 === t7 || 1 === t7) && getGeneratedPropsConstantType(a6, n6) >= 2) {
            const t8 = getNodeProps(a6);
            t8 && (e11.props = n6.hoist(t8));
          }
          e11.dynamicProps && (e11.dynamicProps = n6.hoist(e11.dynamicProps));
        }
      }
    } else if (12 === a6.type) {
      if ((r4 ? 0 : getConstantType(a6, n6)) >= 2) {
        14 === a6.codegenNode.type && a6.codegenNode.arguments.length > 0 && a6.codegenNode.arguments.push("-1"), i6.push(a6);
        continue;
      }
    }
    if (1 === a6.type) {
      const t7 = 1 === a6.tagType;
      t7 && n6.scopes.vSlot++, walk(a6, e9, n6, false, o5), t7 && n6.scopes.vSlot--;
    } else if (11 === a6.type) walk(a6, e9, n6, 1 === a6.children.length, true);
    else if (9 === a6.type) for (let t7 = 0; t7 < a6.branches.length; t7++) walk(a6.branches[t7], e9, n6, 1 === a6.branches[t7].children.length, o5);
  }
  let a5 = false;
  if (i6.length === s6.length && 1 === e9.type) {
    if (0 === e9.tagType && e9.codegenNode && 13 === e9.codegenNode.type && i(e9.codegenNode.children)) e9.codegenNode.children = getCacheExpression(createArrayExpression(e9.codegenNode.children)), a5 = true;
    else if (1 === e9.tagType && e9.codegenNode && 13 === e9.codegenNode.type && e9.codegenNode.children && !i(e9.codegenNode.children) && 15 === e9.codegenNode.children.type) {
      const t6 = getSlotNode(e9.codegenNode, "default");
      t6 && (t6.returns = getCacheExpression(createArrayExpression(t6.returns)), a5 = true);
    } else if (3 === e9.tagType && t5 && 1 === t5.type && 1 === t5.tagType && t5.codegenNode && 13 === t5.codegenNode.type && t5.codegenNode.children && !i(t5.codegenNode.children) && 15 === t5.codegenNode.children.type) {
      const n7 = findDir(e9, "slot", true), r5 = n7 && n7.arg && getSlotNode(t5.codegenNode, n7.arg);
      r5 && (r5.returns = getCacheExpression(createArrayExpression(r5.returns)), a5 = true);
    }
  }
  if (!a5) for (const e10 of i6) e10.codegenNode = n6.cache(e10.codegenNode);
  function getCacheExpression(e10) {
    const t6 = n6.cache(e10);
    return t6.needArraySpread = true, t6;
  }
  __name(getCacheExpression, "getCacheExpression");
  function getSlotNode(e10, t6) {
    if (e10.children && !i(e10.children) && 15 === e10.children.type) {
      const n7 = e10.children.properties.find((e11) => e11.key === t6 || e11.key.content === t6);
      return n7 && n7.value;
    }
  }
  __name(getSlotNode, "getSlotNode");
  i6.length && n6.transformHoist && n6.transformHoist(s6, n6, e9);
}
function getConstantType(e9, t5) {
  const { constantCache: n6 } = t5;
  switch (e9.type) {
    case 1:
      if (0 !== e9.tagType) return 0;
      const r4 = n6.get(e9);
      if (void 0 !== r4) return r4;
      const o5 = e9.codegenNode;
      if (13 !== o5.type) return 0;
      if (o5.isBlock && "svg" !== e9.tag && "foreignObject" !== e9.tag && "math" !== e9.tag) return 0;
      if (void 0 === o5.patchFlag) {
        let r5 = 3;
        const s7 = getGeneratedPropsConstantType(e9, t5);
        if (0 === s7) return n6.set(e9, 0), 0;
        s7 < r5 && (r5 = s7);
        for (let o6 = 0; o6 < e9.children.length; o6++) {
          const s8 = getConstantType(e9.children[o6], t5);
          if (0 === s8) return n6.set(e9, 0), 0;
          s8 < r5 && (r5 = s8);
        }
        if (r5 > 1) for (let o6 = 0; o6 < e9.props.length; o6++) {
          const s8 = e9.props[o6];
          if (7 === s8.type && "bind" === s8.name && s8.exp) {
            const o7 = getConstantType(s8.exp, t5);
            if (0 === o7) return n6.set(e9, 0), 0;
            o7 < r5 && (r5 = o7);
          }
        }
        if (o5.isBlock) {
          for (let t6 = 0; t6 < e9.props.length; t6++) {
            if (7 === e9.props[t6].type) return n6.set(e9, 0), 0;
          }
          t5.removeHelper(ge), t5.removeHelper(getVNodeBlockHelper(t5.inSSR, o5.isComponent)), o5.isBlock = false, t5.helper(getVNodeHelper(t5.inSSR, o5.isComponent));
        }
        return n6.set(e9, r5), r5;
      }
      return n6.set(e9, 0), 0;
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
    default:
      return 0;
    case 5:
    case 12:
      return getConstantType(e9.content, t5);
    case 4:
      return e9.constType;
    case 8:
      let s6 = 3;
      for (let n7 = 0; n7 < e9.children.length; n7++) {
        const r5 = e9.children[n7];
        if (isString(r5) || isSymbol(r5)) continue;
        const o6 = getConstantType(r5, t5);
        if (0 === o6) return 0;
        o6 < s6 && (s6 = o6);
      }
      return s6;
    case 20:
      return 2;
  }
}
function getConstantTypeOfHelperCall(e9, t5) {
  if (14 === e9.type && !isString(e9.callee) && wt.has(e9.callee)) {
    const n6 = e9.arguments[0];
    if (4 === n6.type) return getConstantType(n6, t5);
    if (14 === n6.type) return getConstantTypeOfHelperCall(n6, t5);
  }
  return 0;
}
function getGeneratedPropsConstantType(e9, t5) {
  let n6 = 3;
  const r4 = getNodeProps(e9);
  if (r4 && 15 === r4.type) {
    const { properties: e10 } = r4;
    for (let r5 = 0; r5 < e10.length; r5++) {
      const { key: o5, value: s6 } = e10[r5], i6 = getConstantType(o5, t5);
      if (0 === i6) return i6;
      let a5;
      if (i6 < n6 && (n6 = i6), a5 = 4 === s6.type ? getConstantType(s6, t5) : 14 === s6.type ? getConstantTypeOfHelperCall(s6, t5) : 0, 0 === a5) return a5;
      a5 < n6 && (n6 = a5);
    }
  }
  return n6;
}
function getNodeProps(e9) {
  const t5 = e9.codegenNode;
  if (13 === t5.type) return t5.props;
}
function createTransformContext(e9, { filename: t5 = "", prefixIdentifiers: n6 = false, hoistStatic: r4 = false, hmr: o5 = false, cacheHandlers: s6 = false, nodeTransforms: i6 = [], directiveTransforms: a5 = {}, transformHoist: c4 = null, isBuiltInComponent: l4 = NOOP, isCustomElement: u6 = NOOP, expressionPlugins: p6 = [], scopeId: d5 = null, slotted: h5 = true, ssr: f4 = false, inSSR: m4 = false, ssrCssVars: g3 = "", bindingMetadata: E3 = t, inline: _3 = false, isTS: y4 = false, onError: S4 = defaultOnError, onWarn: v5 = defaultOnWarn, compatConfig: T3 }) {
  const C3 = t5.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), N3 = { filename: t5, selfName: C3 && f(p(C3[1])), prefixIdentifiers: n6, hoistStatic: r4, hmr: o5, cacheHandlers: s6, nodeTransforms: i6, directiveTransforms: a5, transformHoist: c4, isBuiltInComponent: l4, isCustomElement: u6, expressionPlugins: p6, scopeId: d5, slotted: h5, ssr: f4, inSSR: m4, ssrCssVars: g3, bindingMetadata: E3, inline: _3, isTS: y4, onError: S4, onWarn: v5, compatConfig: T3, root: e9, helpers: /* @__PURE__ */ new Map(), components: /* @__PURE__ */ new Set(), directives: /* @__PURE__ */ new Set(), hoists: [], imports: [], cached: [], constantCache: /* @__PURE__ */ new WeakMap(), vForMemoKeyedNodes: /* @__PURE__ */ new WeakSet(), temps: 0, identifiers: /* @__PURE__ */ Object.create(null), scopes: { vFor: 0, vSlot: 0, vPre: 0, vOnce: 0 }, parent: null, grandParent: null, currentNode: e9, childIndex: 0, inVOnce: false, helper(e10) {
    const t6 = N3.helpers.get(e10) || 0;
    return N3.helpers.set(e10, t6 + 1), e10;
  }, removeHelper(e10) {
    const t6 = N3.helpers.get(e10);
    if (t6) {
      const n7 = t6 - 1;
      n7 ? N3.helpers.set(e10, n7) : N3.helpers.delete(e10);
    }
  }, helperString: /* @__PURE__ */ __name((e10) => `_${Je[N3.helper(e10)]}`, "helperString"), replaceNode(e10) {
    N3.parent.children[N3.childIndex] = N3.currentNode = e10;
  }, removeNode(e10) {
    const t6 = N3.parent.children, n7 = e10 ? t6.indexOf(e10) : N3.currentNode ? N3.childIndex : -1;
    e10 && e10 !== N3.currentNode ? N3.childIndex > n7 && (N3.childIndex--, N3.onNodeRemoved()) : (N3.currentNode = null, N3.onNodeRemoved()), N3.parent.children.splice(n7, 1);
  }, onNodeRemoved: NOOP, addIdentifiers(e10) {
  }, removeIdentifiers(e10) {
  }, hoist(e10) {
    isString(e10) && (e10 = createSimpleExpression(e10)), N3.hoists.push(e10);
    const t6 = createSimpleExpression(`_hoisted_${N3.hoists.length}`, false, e10.loc, 2);
    return t6.hoisted = e10, t6;
  }, cache(e10, t6 = false, n7 = false) {
    const r5 = createCacheExpression(N3.cached.length, e10, t6, n7);
    return N3.cached.push(r5), r5;
  } };
  return N3.filters = /* @__PURE__ */ new Set(), N3;
}
function transform(e9, t5) {
  const n6 = createTransformContext(e9, t5);
  traverseNode(e9, n6), t5.hoistStatic && cacheStatic(e9, n6), t5.ssr || (function(e10, t6) {
    const { helper: n7 } = t6, { children: r4 } = e10;
    if (1 === r4.length) {
      const n8 = getSingleElementRoot(e10);
      if (n8 && n8.codegenNode) {
        const r5 = n8.codegenNode;
        13 === r5.type && convertToBlock(r5, t6), e10.codegenNode = r5;
      } else e10.codegenNode = r4[0];
    } else if (r4.length > 1) {
      let r5 = 64;
      e10.codegenNode = createVNodeCall(t6, n7(pe), void 0, e10.children, r5, void 0, void 0, true, void 0, false);
    }
  })(e9, n6), e9.helpers = /* @__PURE__ */ new Set(n6.helpers.keys()), e9.components = [...n6.components], e9.directives = [...n6.directives], e9.imports = n6.imports, e9.hoists = n6.hoists, e9.temps = n6.temps, e9.cached = n6.cached, e9.transformed = true, e9.filters = [...n6.filters];
}
function traverseNode(e9, t5) {
  t5.currentNode = e9;
  const { nodeTransforms: n6 } = t5, r4 = [];
  for (let o6 = 0; o6 < n6.length; o6++) {
    const s6 = n6[o6](e9, t5);
    if (s6 && (i(s6) ? r4.push(...s6) : r4.push(s6)), !t5.currentNode) return;
    e9 = t5.currentNode;
  }
  switch (e9.type) {
    case 3:
      t5.ssr || t5.helper(ve);
      break;
    case 5:
      t5.ssr || t5.helper(Le);
      break;
    case 9:
      for (let n7 = 0; n7 < e9.branches.length; n7++) traverseNode(e9.branches[n7], t5);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      !(function(e10, t6) {
        let n7 = 0;
        const nodeRemoved = /* @__PURE__ */ __name(() => {
          n7--;
        }, "nodeRemoved");
        for (; n7 < e10.children.length; n7++) {
          const r5 = e10.children[n7];
          isString(r5) || (t6.grandParent = t6.parent, t6.parent = e10, t6.childIndex = n7, t6.onNodeRemoved = nodeRemoved, traverseNode(r5, t6));
        }
      })(e9, t5);
  }
  t5.currentNode = e9;
  let o5 = r4.length;
  for (; o5--; ) r4[o5]();
}
function createStructuralDirectiveTransform(e9, t5) {
  const n6 = isString(e9) ? (t6) => t6 === e9 : (t6) => e9.test(t6);
  return (e10, r4) => {
    if (1 === e10.type) {
      const { props: o5 } = e10;
      if (3 === e10.tagType && o5.some(isVSlot)) return;
      const s6 = [];
      for (let i6 = 0; i6 < o5.length; i6++) {
        const a5 = o5[i6];
        if (7 === a5.type && n6(a5.name)) {
          o5.splice(i6, 1), i6--;
          const n7 = t5(e10, a5, r4);
          n7 && s6.push(n7);
        }
      }
      return s6;
    }
  };
}
function generate(e9, t5 = {}) {
  const n6 = (function(e10, { mode: t6 = "function", prefixIdentifiers: n7 = "module" === t6, sourceMap: r5 = false, filename: o6 = "template.vue.html", scopeId: s7 = null, optimizeImports: i7 = false, runtimeGlobalName: a6 = "Vue", runtimeModuleName: c5 = "vue", ssrRuntimeModuleName: l5 = "vue/server-renderer", ssr: u7 = false, isTS: p7 = false, inSSR: d6 = false }) {
    const h6 = { mode: t6, prefixIdentifiers: n7, sourceMap: r5, filename: o6, scopeId: s7, optimizeImports: i7, runtimeGlobalName: a6, runtimeModuleName: c5, ssrRuntimeModuleName: l5, ssr: u7, isTS: p7, inSSR: d6, source: e10.source, code: "", column: 1, line: 1, offset: 0, indentLevel: 0, pure: false, map: void 0, helper: /* @__PURE__ */ __name((e11) => `_${Je[e11]}`, "helper"), push(e11, t7 = -2, n8) {
      h6.code += e11;
    }, indent() {
      newline(++h6.indentLevel);
    }, deindent(e11 = false) {
      e11 ? --h6.indentLevel : newline(--h6.indentLevel);
    }, newline() {
      newline(h6.indentLevel);
    } };
    function newline(e11) {
      h6.push("\n" + "  ".repeat(e11), 0);
    }
    __name(newline, "newline");
    return h6;
  })(e9, t5);
  t5.onContextCreated && t5.onContextCreated(n6);
  const { mode: r4, push: o5, prefixIdentifiers: s6, indent: i6, deindent: a5, newline: c4, scopeId: l4, ssr: u6 } = n6, p6 = Array.from(e9.helpers), d5 = p6.length > 0, h5 = !s6 && "module" !== r4;
  !(function(e10, t6) {
    const { ssr: n7, prefixIdentifiers: r5, push: o6, newline: s7, runtimeModuleName: i7, runtimeGlobalName: a6, ssrRuntimeModuleName: c5 } = t6, l5 = a6, u7 = Array.from(e10.helpers);
    if (u7.length > 0 && (o6(`const _Vue = ${l5}
`, -1), e10.hoists.length)) {
      o6(`const { ${[ye, Se, ve, Te, Ce].filter((e11) => u7.includes(e11)).map(aliasHelper).join(", ")} } = _Vue
`, -1);
    }
    (function(e11, t7) {
      if (!e11.length) return;
      t7.pure = true;
      const { push: n8, newline: r6 } = t7;
      r6();
      for (let o7 = 0; o7 < e11.length; o7++) {
        const s8 = e11[o7];
        s8 && (n8(`const _hoisted_${o7 + 1} = `), genNode(s8, t7), r6());
      }
      t7.pure = false;
    })(e10.hoists, t6), s7(), o6("return ");
  })(e9, n6);
  if (o5(`function ${u6 ? "ssrRender" : "render"}(${(u6 ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ")}) {`), i6(), h5 && (o5("with (_ctx) {"), i6(), d5 && (o5(`const { ${p6.map(aliasHelper).join(", ")} } = _Vue
`, -1), c4())), e9.components.length && (genAssets(e9.components, "component", n6), (e9.directives.length || e9.temps > 0) && c4()), e9.directives.length && (genAssets(e9.directives, "directive", n6), e9.temps > 0 && c4()), e9.filters && e9.filters.length && (c4(), genAssets(e9.filters, "filter", n6), c4()), e9.temps > 0) {
    o5("let ");
    for (let t6 = 0; t6 < e9.temps; t6++) o5(`${t6 > 0 ? ", " : ""}_temp${t6}`);
  }
  return (e9.components.length || e9.directives.length || e9.temps) && (o5("\n", 0), c4()), u6 || o5("return "), e9.codegenNode ? genNode(e9.codegenNode, n6) : o5("null"), h5 && (a5(), o5("}")), a5(), o5("}"), { ast: e9, code: n6.code, preamble: "", map: n6.map ? n6.map.toJSON() : void 0 };
}
function genAssets(e9, t5, { helper: n6, push: r4, newline: o5, isTS: s6 }) {
  const i6 = n6("filter" === t5 ? Oe : "component" === t5 ? Ne : xe);
  for (let n7 = 0; n7 < e9.length; n7++) {
    let a5 = e9[n7];
    const c4 = a5.endsWith("__self");
    c4 && (a5 = a5.slice(0, -6)), r4(`const ${toValidAssetId(a5, t5)} = ${i6}(${JSON.stringify(a5)}${c4 ? ", true" : ""})${s6 ? "!" : ""}`), n7 < e9.length - 1 && o5();
  }
}
function genNodeListAsArray(e9, t5) {
  const n6 = e9.length > 3 || false;
  t5.push("["), n6 && t5.indent(), genNodeList(e9, t5, n6), n6 && t5.deindent(), t5.push("]");
}
function genNodeList(e9, t5, n6 = false, r4 = true) {
  const { push: o5, newline: s6 } = t5;
  for (let i6 = 0; i6 < e9.length; i6++) {
    const a5 = e9[i6];
    isString(a5) ? o5(a5, -3) : i(a5) ? genNodeListAsArray(a5, t5) : genNode(a5, t5), i6 < e9.length - 1 && (n6 ? (r4 && o5(","), s6()) : r4 && o5(", "));
  }
}
function genNode(e9, t5) {
  if (isString(e9)) t5.push(e9, -3);
  else if (isSymbol(e9)) t5.push(t5.helper(e9));
  else switch (e9.type) {
    case 1:
    case 9:
    case 11:
    case 12:
      genNode(e9.codegenNode, t5);
      break;
    case 2:
      !(function(e10, t6) {
        t6.push(JSON.stringify(e10.content), -3, e10);
      })(e9, t5);
      break;
    case 4:
      genExpression(e9, t5);
      break;
    case 5:
      !(function(e10, t6) {
        const { push: n6, helper: r4, pure: o5 } = t6;
        o5 && n6(Dt);
        n6(`${r4(Le)}(`), genNode(e10.content, t6), n6(")");
      })(e9, t5);
      break;
    case 8:
      genCompoundExpression(e9, t5);
      break;
    case 3:
      !(function(e10, t6) {
        const { push: n6, helper: r4, pure: o5 } = t6;
        o5 && n6(Dt);
        n6(`${r4(ve)}(${JSON.stringify(e10.content)})`, -3, e10);
      })(e9, t5);
      break;
    case 13:
      !(function(e10, t6) {
        const { push: n6, helper: r4, pure: o5 } = t6, { tag: s6, props: i6, children: a5, patchFlag: c4, dynamicProps: l4, directives: u6, isBlock: p6, disableTracking: d5, isComponent: h5 } = e10;
        let f4;
        c4 && (f4 = String(c4));
        u6 && n6(r4(Re) + "(");
        p6 && n6(`(${r4(ge)}(${d5 ? "true" : ""}), `);
        o5 && n6(Dt);
        const m4 = p6 ? getVNodeBlockHelper(t6.inSSR, h5) : getVNodeHelper(t6.inSSR, h5);
        n6(r4(m4) + "(", -2, e10), genNodeList((function(e11) {
          let t7 = e11.length;
          for (; t7-- && null == e11[t7]; ) ;
          return e11.slice(0, t7 + 1).map((e12) => e12 || "null");
        })([s6, i6, a5, f4, l4]), t6), n6(")"), p6 && n6(")");
        u6 && (n6(", "), genNode(u6, t6), n6(")"));
      })(e9, t5);
      break;
    case 14:
      !(function(e10, t6) {
        const { push: n6, helper: r4, pure: o5 } = t6, s6 = isString(e10.callee) ? e10.callee : r4(e10.callee);
        o5 && n6(Dt);
        n6(s6 + "(", -2, e10), genNodeList(e10.arguments, t6), n6(")");
      })(e9, t5);
      break;
    case 15:
      !(function(e10, t6) {
        const { push: n6, indent: r4, deindent: o5, newline: s6 } = t6, { properties: i6 } = e10;
        if (!i6.length) return void n6("{}", -2, e10);
        const a5 = i6.length > 1 || false;
        n6(a5 ? "{" : "{ "), a5 && r4();
        for (let e11 = 0; e11 < i6.length; e11++) {
          const { key: r5, value: o6 } = i6[e11];
          genExpressionAsPropertyKey(r5, t6), n6(": "), genNode(o6, t6), e11 < i6.length - 1 && (n6(","), s6());
        }
        a5 && o5(), n6(a5 ? "}" : " }");
      })(e9, t5);
      break;
    case 17:
      !(function(e10, t6) {
        genNodeListAsArray(e10.elements, t6);
      })(e9, t5);
      break;
    case 18:
      !(function(e10, t6) {
        const { push: n6, indent: r4, deindent: o5 } = t6, { params: s6, returns: i6, body: a5, newline: c4, isSlot: l4 } = e10;
        l4 && n6(`_${Je[We]}(`);
        n6("(", -2, e10), i(s6) ? genNodeList(s6, t6) : s6 && genNode(s6, t6);
        n6(") => "), (c4 || a5) && (n6("{"), r4());
        i6 ? (c4 && n6("return "), i(i6) ? genNodeListAsArray(i6, t6) : genNode(i6, t6)) : a5 && genNode(a5, t6);
        (c4 || a5) && (o5(), n6("}"));
        l4 && (e10.isNonScopedSlot && n6(", undefined, true"), n6(")"));
      })(e9, t5);
      break;
    case 19:
      !(function(e10, t6) {
        const { test: n6, consequent: r4, alternate: o5, newline: s6 } = e10, { push: i6, indent: a5, deindent: c4, newline: l4 } = t6;
        if (4 === n6.type) {
          const e11 = !isSimpleIdentifier(n6.content);
          e11 && i6("("), genExpression(n6, t6), e11 && i6(")");
        } else i6("("), genNode(n6, t6), i6(")");
        s6 && a5(), t6.indentLevel++, s6 || i6(" "), i6("? "), genNode(r4, t6), t6.indentLevel--, s6 && l4(), s6 || i6(" "), i6(": ");
        const u6 = 19 === o5.type;
        u6 || t6.indentLevel++;
        genNode(o5, t6), u6 || t6.indentLevel--;
        s6 && c4(true);
      })(e9, t5);
      break;
    case 20:
      !(function(e10, t6) {
        const { push: n6, helper: r4, indent: o5, deindent: s6, newline: i6 } = t6, { needPauseTracking: a5, needArraySpread: c4 } = e10;
        c4 && n6("[...(");
        n6(`_cache[${e10.index}] || (`), a5 && (o5(), n6(`${r4(Xe)}(-1`), e10.inVOnce && n6(", true"), n6("),"), i6(), n6("("));
        n6(`_cache[${e10.index}] = `), genNode(e10.value, t6), a5 && (n6(`).cacheIndex = ${e10.index},`), i6(), n6(`${r4(Xe)}(1),`), i6(), n6(`_cache[${e10.index}]`), s6());
        n6(")"), c4 && n6(")]");
      })(e9, t5);
      break;
    case 21:
      genNodeList(e9.body, t5, true, false);
  }
}
function genExpression(e9, t5) {
  const { content: n6, isStatic: r4 } = e9;
  t5.push(r4 ? JSON.stringify(n6) : n6, -3, e9);
}
function genCompoundExpression(e9, t5) {
  for (let n6 = 0; n6 < e9.children.length; n6++) {
    const r4 = e9.children[n6];
    isString(r4) ? t5.push(r4, -3) : genNode(r4, t5);
  }
}
function genExpressionAsPropertyKey(e9, t5) {
  const { push: n6 } = t5;
  if (8 === e9.type) n6("["), genCompoundExpression(e9, t5), n6("]");
  else if (e9.isStatic) {
    n6(isSimpleIdentifier(e9.content) ? e9.content : JSON.stringify(e9.content), -2, e9);
  } else n6(`[${e9.content}]`, -3, e9);
}
function processExpression(e9, t5, n6 = false, r4 = false, o5 = Object.create(t5.identifiers)) {
  return e9;
}
function processIf(e9, t5, n6, r4) {
  if (!("else" === t5.name || t5.exp && t5.exp.content.trim())) {
    const r5 = t5.exp ? t5.exp.loc : e9.loc;
    n6.onError(createCompilerError(28, t5.loc)), t5.exp = createSimpleExpression("true", false, r5);
  }
  if ("if" === t5.name) {
    const s6 = createIfBranch(e9, t5), i6 = { type: 9, loc: (o5 = e9.loc, getLoc(o5.start.offset, o5.end.offset)), branches: [s6] };
    if (n6.replaceNode(i6), r4) return r4(i6, s6, true);
  } else {
    const o6 = n6.parent.children;
    let s6 = o6.indexOf(e9);
    for (; s6-- >= -1; ) {
      const i6 = o6[s6];
      if (!i6 || !isCommentOrWhitespace(i6)) {
        if (i6 && 9 === i6.type) {
          "else-if" !== t5.name && "else" !== t5.name || void 0 !== i6.branches[i6.branches.length - 1].condition || n6.onError(createCompilerError(30, e9.loc)), n6.removeNode();
          const o7 = createIfBranch(e9, t5);
          i6.branches.push(o7);
          const s7 = r4 && r4(i6, o7, false);
          traverseNode(o7, n6), s7 && s7(), n6.currentNode = null;
        } else n6.onError(createCompilerError(30, e9.loc));
        break;
      }
      n6.removeNode(i6);
    }
  }
  var o5;
}
function createIfBranch(e9, t5) {
  const n6 = 3 === e9.tagType;
  return { type: 10, loc: e9.loc, condition: "else" === t5.name ? void 0 : t5.exp, children: n6 && !findDir(e9, "for") ? e9.children : [e9], userKey: findProp(e9, "key"), isTemplateIf: n6 };
}
function createCodegenNodeForBranch(e9, t5, n6) {
  return e9.condition ? createConditionalExpression(e9.condition, createChildrenCodegenNode(e9, t5, n6), createCallExpression(n6.helper(ve), ['""', "true"])) : createChildrenCodegenNode(e9, t5, n6);
}
function createChildrenCodegenNode(e9, t5, n6) {
  const { helper: r4 } = n6, o5 = createObjectProperty("key", createSimpleExpression(`${t5}`, false, Qe, 2)), { children: s6 } = e9, i6 = s6[0];
  if (1 !== s6.length || 1 !== i6.type) {
    if (1 === s6.length && 11 === i6.type) {
      const e10 = i6.codegenNode;
      return injectProp(e10, o5, n6), e10;
    }
    {
      let t6 = 64;
      return createVNodeCall(n6, r4(pe), createObjectExpression([o5]), s6, t6, void 0, void 0, true, false, false, e9.loc);
    }
  }
  {
    const e10 = i6.codegenNode, t6 = getMemoedVNodeCall(e10);
    return 13 === t6.type && convertToBlock(t6, n6), injectProp(t6, o5, n6), e10;
  }
}
function processFor(e9, t5, n6, r4) {
  if (!t5.exp) return void n6.onError(createCompilerError(31, t5.loc));
  const o5 = t5.forParseResult;
  if (!o5) return void n6.onError(createCompilerError(32, t5.loc));
  finalizeForParseResult(o5);
  const { addIdentifiers: s6, removeIdentifiers: i6, scopes: a5 } = n6, { source: c4, value: l4, key: u6, index: p6 } = o5, d5 = { type: 11, loc: t5.loc, source: c4, valueAlias: l4, keyAlias: u6, objectIndexAlias: p6, parseResult: o5, children: isTemplateNode(e9) ? e9.children : [e9] };
  n6.replaceNode(d5), a5.vFor++;
  const h5 = r4 && r4(d5);
  return () => {
    a5.vFor--, h5 && h5();
  };
}
function finalizeForParseResult(e9, t5) {
  e9.finalized || (e9.finalized = true);
}
function createForLoopParams({ value: e9, key: t5, index: n6 }, r4 = []) {
  return (function(e10) {
    let t6 = e10.length;
    for (; t6-- && !e10[t6]; ) ;
    return e10.slice(0, t6 + 1).map((e11, t7) => e11 || createSimpleExpression("_".repeat(t7 + 1), false));
  })([e9, t5, n6, ...r4]);
}
function buildSlots(e9, t5, n6 = buildClientSlotFn) {
  t5.helper(We);
  const { children: r4, loc: o5 } = e9, s6 = [], i6 = [];
  let a5 = t5.scopes.vSlot > 0 || t5.scopes.vFor > 0;
  const c4 = findDir(e9, "slot", true);
  if (c4) {
    const { arg: e10, exp: t6 } = c4;
    e10 && !isStaticExp(e10) && (a5 = true), s6.push(createObjectProperty(e10 || createSimpleExpression("default", true), n6(t6, void 0, r4, o5)));
  }
  let l4 = false, u6 = false;
  const p6 = [], d5 = /* @__PURE__ */ new Set();
  let h5 = 0;
  for (let e10 = 0; e10 < r4.length; e10++) {
    const o6 = r4[e10];
    let f5;
    if (!isTemplateNode(o6) || !(f5 = findDir(o6, "slot", true))) {
      3 !== o6.type && p6.push(o6);
      continue;
    }
    if (c4) {
      t5.onError(createCompilerError(37, f5.loc));
      break;
    }
    l4 = true;
    const { children: m5, loc: g3 } = o6, { arg: E3 = createSimpleExpression("default", true), exp: _3, loc: y4 } = f5;
    let S4;
    isStaticExp(E3) ? S4 = E3 ? E3.content : "default" : a5 = true;
    const v5 = findDir(o6, "for"), T3 = n6(_3, v5, m5, g3);
    let C3, N3;
    if (C3 = findDir(o6, "if")) a5 = true, i6.push(createConditionalExpression(C3.exp, buildDynamicSlot(E3, T3, h5++), Vt));
    else if (N3 = findDir(o6, /^else(?:-if)?$/, true)) {
      let n7, o7 = e10;
      for (; o7-- && (n7 = r4[o7], isCommentOrWhitespace(n7)); ) ;
      if (n7 && isTemplateNode(n7) && findDir(n7, /^(?:else-)?if$/)) {
        let e11 = i6[i6.length - 1];
        for (; 19 === e11.alternate.type; ) e11 = e11.alternate;
        e11.alternate = N3.exp ? createConditionalExpression(N3.exp, buildDynamicSlot(E3, T3, h5++), Vt) : buildDynamicSlot(E3, T3, h5++);
      } else t5.onError(createCompilerError(30, N3.loc));
    } else if (v5) {
      a5 = true;
      const e11 = v5.forParseResult;
      e11 ? (finalizeForParseResult(e11), i6.push(createCallExpression(t5.helper(Ie), [e11.source, createFunctionExpression(createForLoopParams(e11), buildDynamicSlot(E3, T3), true)]))) : t5.onError(createCompilerError(32, v5.loc));
    } else {
      if (S4) {
        if (d5.has(S4)) {
          t5.onError(createCompilerError(38, y4));
          continue;
        }
        d5.add(S4), "default" === S4 && (u6 = true);
      }
      s6.push(createObjectProperty(E3, T3));
    }
  }
  if (!c4) {
    const buildDefaultSlotProperty = /* @__PURE__ */ __name((e10, r5) => {
      const s7 = n6(e10, void 0, r5, o5);
      return t5.compatConfig && (s7.isNonScopedSlot = true), createObjectProperty("default", s7);
    }, "buildDefaultSlotProperty");
    l4 ? p6.length && !p6.every(isWhitespaceText) && (u6 ? t5.onError(createCompilerError(39, p6[0].loc)) : s6.push(buildDefaultSlotProperty(void 0, p6))) : s6.push(buildDefaultSlotProperty(void 0, r4));
  }
  const f4 = a5 ? 2 : hasForwardedSlots(e9.children) ? 3 : 1;
  let m4 = createObjectExpression(s6.concat(createObjectProperty("_", createSimpleExpression(f4 + "", false))), o5);
  return i6.length && (m4 = createCallExpression(t5.helper(Pe), [m4, createArrayExpression(i6)])), { slots: m4, hasDynamicSlots: a5 };
}
function buildDynamicSlot(e9, t5, n6) {
  const r4 = [createObjectProperty("name", e9), createObjectProperty("fn", t5)];
  return null != n6 && r4.push(createObjectProperty("key", createSimpleExpression(String(n6), true))), createObjectExpression(r4);
}
function hasForwardedSlots(e9) {
  for (let t5 = 0; t5 < e9.length; t5++) {
    const n6 = e9[t5];
    switch (n6.type) {
      case 1:
        if (2 === n6.tagType || hasForwardedSlots(n6.children)) return true;
        break;
      case 9:
        if (hasForwardedSlots(n6.branches)) return true;
        break;
      case 10:
      case 11:
        if (hasForwardedSlots(n6.children)) return true;
    }
  }
  return false;
}
function resolveComponentType(e9, t5, n6 = false) {
  let { tag: r4 } = e9;
  const o5 = isComponentTag(r4), s6 = findProp(e9, "is", false, true);
  if (s6) if (o5 || isCompatEnabled("COMPILER_IS_ON_ELEMENT", t5)) {
    let e10;
    if (6 === s6.type ? e10 = s6.value && createSimpleExpression(s6.value.content, true) : (e10 = s6.exp, e10 || (e10 = createSimpleExpression("is", false, s6.arg.loc))), e10) return createCallExpression(t5.helper(be), [e10]);
  } else 6 === s6.type && s6.value.content.startsWith("vue:") && (r4 = s6.value.content.slice(4));
  const i6 = isCoreComponent(r4) || t5.isBuiltInComponent(r4);
  return i6 ? (n6 || t5.helper(i6), i6) : (t5.helper(Ne), t5.components.add(r4), toValidAssetId(r4, "component"));
}
function buildProps(e9, t5, n6 = e9.props, r4, o5, s6 = false) {
  const { tag: i6, loc: a5, children: c4 } = e9;
  let l4 = [];
  const u6 = [], p6 = [], d5 = c4.length > 0;
  let h5 = false, f4 = 0, m4 = false, g3 = false, E3 = false, _3 = false, y4 = false, S4 = false;
  const v5 = [], pushMergeArg = /* @__PURE__ */ __name((e10) => {
    l4.length && (u6.push(createObjectExpression(dedupeProperties(l4), a5)), l4 = []), e10 && u6.push(e10);
  }, "pushMergeArg"), pushRefVForMarker = /* @__PURE__ */ __name(() => {
    t5.scopes.vFor > 0 && l4.push(createObjectProperty(createSimpleExpression("ref_for", true), createSimpleExpression("true")));
  }, "pushRefVForMarker"), analyzePatchFlag = /* @__PURE__ */ __name(({ key: e10, value: n7 }) => {
    if (isStaticExp(e10)) {
      const s7 = e10.content, i7 = isOn(s7);
      if (!i7 || r4 && !o5 || "onclick" === s7.toLowerCase() || "onUpdate:modelValue" === s7 || s(s7) || (_3 = true), i7 && s(s7) && (S4 = true), i7 && 14 === n7.type && (n7 = n7.arguments[0]), 20 === n7.type || (4 === n7.type || 8 === n7.type) && getConstantType(n7, t5) > 0) return;
      "ref" === s7 ? m4 = true : "class" === s7 ? g3 = true : "style" === s7 ? E3 = true : "key" === s7 || v5.includes(s7) || v5.push(s7), !r4 || "class" !== s7 && "style" !== s7 || v5.includes(s7) || v5.push(s7);
    } else y4 = true;
  }, "analyzePatchFlag");
  for (let o6 = 0; o6 < n6.length; o6++) {
    const c5 = n6[o6];
    if (6 === c5.type) {
      const { loc: e10, name: n7, nameLoc: r5, value: o7 } = c5;
      let s7 = true;
      if ("ref" === n7 && (m4 = true, pushRefVForMarker()), "is" === n7 && (isComponentTag(i6) || o7 && o7.content.startsWith("vue:") || isCompatEnabled("COMPILER_IS_ON_ELEMENT", t5))) continue;
      l4.push(createObjectProperty(createSimpleExpression(n7, true, r5), createSimpleExpression(o7 ? o7.content : "", s7, o7 ? o7.loc : e10)));
    } else {
      const { name: n7, arg: o7, exp: m5, loc: g4, modifiers: E4 } = c5, _4 = "bind" === n7, S5 = "on" === n7;
      if ("slot" === n7) {
        r4 || t5.onError(createCompilerError(40, g4));
        continue;
      }
      if ("once" === n7 || "memo" === n7) continue;
      if ("is" === n7 || _4 && isStaticArgOf(o7, "is") && (isComponentTag(i6) || isCompatEnabled("COMPILER_IS_ON_ELEMENT", t5))) continue;
      if (S5 && s6) continue;
      if ((_4 && isStaticArgOf(o7, "key") || S5 && d5 && isStaticArgOf(o7, "vue:before-update")) && (h5 = true), _4 && isStaticArgOf(o7, "ref") && pushRefVForMarker(), !o7 && (_4 || S5)) {
        if (y4 = true, m5) if (_4) {
          if (pushMergeArg(), isCompatEnabled("COMPILER_V_BIND_OBJECT_ORDER", t5)) {
            u6.unshift(m5);
            continue;
          }
          pushRefVForMarker(), pushMergeArg(), u6.push(m5);
        } else pushMergeArg({ type: 14, loc: g4, callee: t5.helper(Fe), arguments: r4 ? [m5] : [m5, "true"] });
        else t5.onError(createCompilerError(_4 ? 34 : 35, g4));
        continue;
      }
      _4 && E4.some((e10) => "prop" === e10.content) && (f4 |= 32);
      const v6 = t5.directiveTransforms[n7];
      if (v6) {
        const { props: n8, needRuntime: r5 } = v6(c5, e9, t5);
        !s6 && n8.forEach(analyzePatchFlag), S5 && o7 && !isStaticExp(o7) ? pushMergeArg(createObjectExpression(n8, a5)) : l4.push(...n8), r5 && (p6.push(c5), isSymbol(r5) && Ft.set(c5, r5));
      } else l(n7) || (p6.push(c5), d5 && (h5 = true));
    }
  }
  let T3;
  if (u6.length ? (pushMergeArg(), T3 = u6.length > 1 ? createCallExpression(t5.helper(we), u6, a5) : u6[0]) : l4.length && (T3 = createObjectExpression(dedupeProperties(l4), a5)), y4 ? f4 |= 16 : (g3 && !r4 && (f4 |= 2), E3 && !r4 && (f4 |= 4), v5.length && (f4 |= 8), _3 && (f4 |= 32)), h5 || 0 !== f4 && 32 !== f4 || !(m4 || S4 || p6.length > 0) || (f4 |= 512), !t5.inSSR && T3) switch (T3.type) {
    case 15:
      let e10 = -1, n7 = -1, r5 = false;
      for (let t6 = 0; t6 < T3.properties.length; t6++) {
        const o7 = T3.properties[t6].key;
        isStaticExp(o7) ? "class" === o7.content ? e10 = t6 : "style" === o7.content && (n7 = t6) : o7.isHandlerKey || (r5 = true);
      }
      const o6 = T3.properties[e10], s7 = T3.properties[n7];
      r5 ? T3 = createCallExpression(t5.helper(ke), [T3]) : (o6 && !isStaticExp(o6.value) && (o6.value = createCallExpression(t5.helper(De), [o6.value])), s7 && (E3 || 4 === s7.value.type && "[" === s7.value.content.trim()[0] || 17 === s7.value.type) && (s7.value = createCallExpression(t5.helper(Me), [s7.value])));
      break;
    case 14:
      break;
    default:
      T3 = createCallExpression(t5.helper(ke), [createCallExpression(t5.helper(Ve), [T3])]);
  }
  return { props: T3, directives: p6, patchFlag: f4, dynamicPropNames: v5, shouldUseBlock: h5 };
}
function dedupeProperties(e9) {
  const t5 = /* @__PURE__ */ new Map(), n6 = [];
  for (let r4 = 0; r4 < e9.length; r4++) {
    const o5 = e9[r4];
    if (8 === o5.key.type || !o5.key.isStatic) {
      n6.push(o5);
      continue;
    }
    const s6 = o5.key.content, i6 = t5.get(s6);
    i6 ? ("style" === s6 || "class" === s6 || isOn(s6)) && mergeAsArray(i6, o5) : (t5.set(s6, o5), n6.push(o5));
  }
  return n6;
}
function mergeAsArray(e9, t5) {
  17 === e9.value.type ? e9.value.elements.push(t5.value) : e9.value = createArrayExpression([e9.value, t5.value], e9.loc);
}
function buildDirectiveArgs(e9, t5) {
  const n6 = [], r4 = Ft.get(e9);
  r4 ? n6.push(t5.helperString(r4)) : (t5.helper(xe), t5.directives.add(e9.name), n6.push(toValidAssetId(e9.name, "directive")));
  const { loc: o5 } = e9;
  if (e9.exp && n6.push(e9.exp), e9.arg && (e9.exp || n6.push("void 0"), n6.push(e9.arg)), Object.keys(e9.modifiers).length) {
    e9.arg || (e9.exp || n6.push("void 0"), n6.push("void 0"));
    const t6 = createSimpleExpression("true", false, o5);
    n6.push(createObjectExpression(e9.modifiers.map((e10) => createObjectProperty(e10, t6)), o5));
  }
  return createArrayExpression(n6, e9.loc);
}
function isComponentTag(e9) {
  return "component" === e9 || "Component" === e9;
}
function processSlotOutlet(e9, t5) {
  let n6, r4 = '"default"';
  const o5 = [];
  for (let t6 = 0; t6 < e9.props.length; t6++) {
    const n7 = e9.props[t6];
    if (6 === n7.type) n7.value && ("name" === n7.name ? r4 = JSON.stringify(n7.value.content) : (n7.name = p(n7.name), o5.push(n7)));
    else if ("bind" === n7.name && isStaticArgOf(n7.arg, "name")) {
      if (n7.exp) r4 = n7.exp;
      else if (n7.arg && 4 === n7.arg.type) {
        const e10 = p(n7.arg.content);
        r4 = n7.exp = createSimpleExpression(e10, false, n7.arg.loc);
      }
    } else "bind" === n7.name && n7.arg && isStaticExp(n7.arg) && (n7.arg.content = p(n7.arg.content)), o5.push(n7);
  }
  if (o5.length > 0) {
    const { props: r5, directives: s6 } = buildProps(e9, t5, o5, false, false);
    n6 = r5, s6.length && t5.onError(createCompilerError(36, s6[0].loc));
  }
  return { slotName: r4, slotProps: n6 };
}
function createTransformProps(e9 = []) {
  return { props: e9 };
}
function rewriteFilter(e9, t5) {
  if (4 === e9.type) parseFilter(e9, t5);
  else for (let n6 = 0; n6 < e9.children.length; n6++) {
    const r4 = e9.children[n6];
    "object" == typeof r4 && (4 === r4.type ? parseFilter(r4, t5) : 8 === r4.type ? rewriteFilter(r4, t5) : 5 === r4.type && rewriteFilter(r4.content, t5));
  }
}
function parseFilter(e9, t5) {
  const n6 = e9.content;
  let r4, o5, s6, i6, a5 = false, c4 = false, l4 = false, u6 = false, p6 = 0, d5 = 0, h5 = 0, f4 = 0, m4 = [];
  for (s6 = 0; s6 < n6.length; s6++) if (o5 = r4, r4 = n6.charCodeAt(s6), a5) 39 === r4 && 92 !== o5 && (a5 = false);
  else if (c4) 34 === r4 && 92 !== o5 && (c4 = false);
  else if (l4) 96 === r4 && 92 !== o5 && (l4 = false);
  else if (u6) 47 === r4 && 92 !== o5 && (u6 = false);
  else if (124 !== r4 || 124 === n6.charCodeAt(s6 + 1) || 124 === n6.charCodeAt(s6 - 1) || p6 || d5 || h5) {
    switch (r4) {
      case 34:
        c4 = true;
        break;
      case 39:
        a5 = true;
        break;
      case 96:
        l4 = true;
        break;
      case 40:
        h5++;
        break;
      case 41:
        h5--;
        break;
      case 91:
        d5++;
        break;
      case 93:
        d5--;
        break;
      case 123:
        p6++;
        break;
      case 125:
        p6--;
    }
    if (47 === r4) {
      let e10, t6 = s6 - 1;
      for (; t6 >= 0 && (e10 = n6.charAt(t6), " " === e10); t6--) ;
      e10 && Bt.test(e10) || (u6 = true);
    }
  } else void 0 === i6 ? (f4 = s6 + 1, i6 = n6.slice(0, s6).trim()) : pushFilter();
  function pushFilter() {
    m4.push(n6.slice(f4, s6).trim()), f4 = s6 + 1;
  }
  __name(pushFilter, "pushFilter");
  if (void 0 === i6 ? i6 = n6.slice(0, s6).trim() : 0 !== f4 && pushFilter(), m4.length) {
    for (s6 = 0; s6 < m4.length; s6++) i6 = wrapFilter(i6, m4[s6], t5);
    e9.content = i6, e9.ast = void 0;
  }
}
function wrapFilter(e9, t5, n6) {
  n6.helper(Oe);
  const r4 = t5.indexOf("(");
  if (r4 < 0) return n6.filters.add(t5), `${toValidAssetId(t5, "filter")}(${e9})`;
  {
    const o5 = t5.slice(0, r4), s6 = t5.slice(r4 + 1);
    return n6.filters.add(o5), `${toValidAssetId(o5, "filter")}(${e9}${")" !== s6 ? "," + s6 : s6}`;
  }
}
function getBaseTransformPreset(e9) {
  return [[transformVBindShorthand, transformOnce, Mt, transformMemo, kt, transformFilter, transformSlotOutlet, transformElement, trackSlotScopes, transformText], { on: transformOn$1, bind: transformBind, model: transformModel$1 }];
}
function baseCompile(e9, t5 = {}) {
  const n6 = t5.onError || defaultOnError, r4 = "module" === t5.mode;
  true === t5.prefixIdentifiers ? n6(createCompilerError(48)) : r4 && n6(createCompilerError(49));
  t5.cacheHandlers && n6(createCompilerError(50)), t5.scopeId && !r4 && n6(createCompilerError(51));
  const o5 = n({}, t5, { prefixIdentifiers: false }), s6 = isString(e9) ? baseParse(e9, o5) : e9, [i6, a5] = getBaseTransformPreset();
  return transform(s6, n({}, o5, { nodeTransforms: [...i6, ...t5.nodeTransforms || []], directiveTransforms: n({}, a5, t5.directiveTransforms || {}) })), generate(s6, o5);
}
function createDOMCompilerError(e9, t5) {
  return createCompilerError(e9, t5);
}
function isPlainObject$1(e9) {
  return e9 && "object" == typeof e9 && "[object Object]" === Object.prototype.toString.call(e9) && "function" != typeof e9.toJSON;
}
function addSubscription(e9, t5, n6, r4 = noop$1) {
  e9.add(t5);
  const removeSubscription = /* @__PURE__ */ __name(() => {
    e9.delete(t5) && r4();
  }, "removeSubscription");
  return !n6 && getCurrentScope() && onScopeDispose(removeSubscription), removeSubscription;
}
function triggerSubscriptions(e9, ...t5) {
  e9.forEach((e10) => {
    e10(...t5);
  });
}
function mergeReactiveObjects(e9, t5) {
  e9 instanceof Map && t5 instanceof Map ? t5.forEach((t6, n6) => e9.set(n6, t6)) : e9 instanceof Set && t5 instanceof Set && t5.forEach(e9.add, e9);
  for (const n6 in t5) {
    if (!t5.hasOwnProperty(n6)) continue;
    const r4 = t5[n6], o5 = e9[n6];
    isPlainObject$1(o5) && isPlainObject$1(r4) && e9.hasOwnProperty(n6) && !isRef2(r4) && !isReactive(r4) ? e9[n6] = mergeReactiveObjects(o5, r4) : e9[n6] = r4;
  }
  return e9;
}
function shouldHydrate(e9) {
  return !isPlainObject$1(e9) || !Object.prototype.hasOwnProperty.call(e9, gn);
}
function isComputed(e9) {
  return !(!isRef2(e9) || !e9.effect);
}
function createSetupStore(e9, t5, n6 = {}, r4, o5, s6) {
  let i6;
  const a5 = En({ actions: {} }, n6), c4 = { deep: true };
  let l4, u6, p6, d5 = /* @__PURE__ */ new Set(), h5 = /* @__PURE__ */ new Set();
  const f4 = r4.state.value[e9];
  let v5;
  function $patch(t6) {
    let n7;
    l4 = u6 = false, "function" == typeof t6 ? (t6(r4.state.value[e9]), n7 = { type: dn.patchFunction, storeId: e9, events: p6 }) : (mergeReactiveObjects(r4.state.value[e9], t6), n7 = { type: dn.patchObject, payload: t6, storeId: e9, events: p6 });
    const o6 = v5 = /* @__PURE__ */ Symbol();
    nextTick().then(() => {
      v5 === o6 && (l4 = true);
    }), u6 = true, triggerSubscriptions(d5, n7, r4.state.value[e9]);
  }
  __name($patch, "$patch");
  s6 || f4 || (r4.state.value[e9] = {});
  const T3 = s6 ? function() {
    const { state: e10 } = n6, t6 = e10 ? e10() : {};
    this.$patch((e11) => {
      En(e11, t6);
    });
  } : noop$1;
  const action = /* @__PURE__ */ __name((t6, n7 = "") => {
    if (hn in t6) return t6[mn] = n7, t6;
    const wrappedAction = /* @__PURE__ */ __name(function() {
      setActivePinia(r4);
      const n8 = Array.from(arguments), o6 = /* @__PURE__ */ new Set(), s7 = /* @__PURE__ */ new Set();
      let i7;
      triggerSubscriptions(h5, { args: n8, name: wrappedAction[mn], store: N3, after: /* @__PURE__ */ __name(function(e10) {
        o6.add(e10);
      }, "after"), onError: /* @__PURE__ */ __name(function(e10) {
        s7.add(e10);
      }, "onError") });
      try {
        i7 = t6.apply(this && this.$id === e9 ? this : N3, n8);
      } catch (e10) {
        throw triggerSubscriptions(s7, e10), e10;
      }
      return i7 instanceof Promise ? i7.then((e10) => (triggerSubscriptions(o6, e10), e10)).catch((e10) => (triggerSubscriptions(s7, e10), Promise.reject(e10))) : (triggerSubscriptions(o6, i7), i7);
    }, "wrappedAction");
    return wrappedAction[hn] = true, wrappedAction[mn] = n7, wrappedAction;
  }, "action"), C3 = { _p: r4, $id: e9, $onAction: addSubscription.bind(null, h5), $patch, $reset: T3, $subscribe(t6, n7 = {}) {
    const o6 = addSubscription(d5, t6, n7.detached, () => s7()), s7 = i6.run(() => watch(() => r4.state.value[e9], (r5) => {
      ("sync" === n7.flush ? u6 : l4) && t6({ storeId: e9, type: dn.direct, events: p6 }, r5);
    }, En({}, c4, n7)));
    return o6;
  }, $dispose: /* @__PURE__ */ __name(function() {
    i6.stop(), d5.clear(), h5.clear(), r4._s.delete(e9);
  }, "$dispose") }, N3 = reactive(C3);
  r4._s.set(e9, N3);
  const b4 = (r4._a && r4._a.runWithContext || fallbackRunWithContext)(() => r4._e.run(() => (i6 = effectScope()).run(() => t5({ action }))));
  for (const t6 in b4) {
    const n7 = b4[t6];
    if (isRef2(n7) && !isComputed(n7) || isReactive(n7)) s6 || (f4 && shouldHydrate(n7) && (isRef2(n7) ? n7.value = f4[t6] : mergeReactiveObjects(n7, f4[t6])), r4.state.value[e9][t6] = n7);
    else if ("function" == typeof n7) {
      const e10 = action(n7, t6);
      b4[t6] = e10, a5.actions[t6] = n7;
    }
  }
  return En(N3, b4), En(toRaw(N3), b4), Object.defineProperty(N3, "$state", { get: /* @__PURE__ */ __name(() => r4.state.value[e9], "get"), set: /* @__PURE__ */ __name((e10) => {
    $patch((t6) => {
      En(t6, e10);
    });
  }, "set") }), r4._p.forEach((e10) => {
    En(N3, i6.run(() => e10({ store: N3, app: r4._a, pinia: r4, options: a5 })));
  }), f4 && s6 && n6.hydrate && n6.hydrate(N3.$state, f4), l4 = true, u6 = true, N3;
}
function isRouteComponent(e9) {
  return "object" == typeof e9 || "displayName" in e9 || "props" in e9 || "__vccOpts" in e9;
}
function applyToParams(e9, t5) {
  const n6 = {};
  for (const r4 in t5) {
    const o5 = t5[r4];
    n6[r4] = Sn(o5) ? o5.map(e9) : e9(o5);
  }
  return n6;
}
function mergeOptions(e9, t5) {
  const n6 = {};
  for (const r4 in e9) n6[r4] = r4 in t5 ? t5[r4] : e9[r4];
  return n6;
}
function createRouterError(e9, t5) {
  return yn(new Error(), { type: e9, [vn]: true }, t5);
}
function isNavigationFailure(e9, t5) {
  return e9 instanceof Error && vn in e9 && (null == t5 || !!(e9.type & t5));
}
function commonEncode(e9) {
  return null == e9 ? "" : encodeURI("" + e9).replace(Fn, "|").replace(wn, "[").replace(Dn, "]");
}
function encodeQueryValue(e9) {
  return commonEncode(e9).replace(Ln, "%2B").replace(Bn, "+").replace(On, "%23").replace(Rn, "%26").replace(kn, "`").replace(Vn, "{").replace(jn, "}").replace(Mn, "^");
}
function encodeQueryKey(e9) {
  return encodeQueryValue(e9).replace(An, "%3D");
}
function encodeParam(e9) {
  return (function(e10) {
    return commonEncode(e10).replace(On, "%23").replace(Pn, "%3F");
  })(e9).replace(In, "%2F");
}
function decode(e9) {
  if (null == e9) return null;
  try {
    return decodeURIComponent("" + e9);
  } catch {
  }
  return "" + e9;
}
function parseURL2(e9, t5, n6 = "/") {
  let r4, o5 = {}, s6 = "", i6 = "";
  const a5 = t5.indexOf("#");
  let c4 = t5.indexOf("?");
  return c4 = a5 >= 0 && c4 > a5 ? -1 : c4, c4 >= 0 && (r4 = t5.slice(0, c4), s6 = t5.slice(c4, a5 > 0 ? a5 : t5.length), o5 = e9(s6.slice(1))), a5 >= 0 && (r4 = r4 || t5.slice(0, a5), i6 = t5.slice(a5, t5.length)), r4 = (function(e10, t6) {
    if (e10.startsWith("/")) return e10;
    if (!e10) return t6;
    const n7 = t6.split("/"), r5 = e10.split("/"), o6 = r5[r5.length - 1];
    ".." !== o6 && "." !== o6 || r5.push("");
    let s7, i7, a6 = n7.length - 1;
    for (s7 = 0; s7 < r5.length; s7++) if (i7 = r5[s7], "." !== i7) {
      if (".." !== i7) break;
      a6 > 1 && a6--;
    }
    return n7.slice(0, a6).join("/") + "/" + r5.slice(s7).join("/");
  })(null != r4 ? r4 : t5, n6), { fullPath: r4 + s6 + i6, path: r4, query: o5, hash: decode(i6) };
}
function isSameRouteRecord(e9, t5) {
  return (e9.aliasOf || e9) === (t5.aliasOf || t5);
}
function isSameRouteLocationParams(e9, t5) {
  if (Object.keys(e9).length !== Object.keys(t5).length) return false;
  for (var n6 in e9) if (!isSameRouteLocationParamsValue(e9[n6], t5[n6])) return false;
  return true;
}
function isSameRouteLocationParamsValue(e9, t5) {
  return Sn(e9) ? isEquivalentArray(e9, t5) : Sn(t5) ? isEquivalentArray(t5, e9) : (e9 && e9.valueOf()) === (t5 && t5.valueOf());
}
function isEquivalentArray(e9, t5) {
  return Sn(t5) ? e9.length === t5.length && e9.every((e10, n6) => e10 === t5[n6]) : 1 === e9.length && e9[0] === t5;
}
function normalizeBase(e9) {
  if (!e9) if (_n) {
    const t5 = document.querySelector("base");
    e9 = (e9 = t5 && t5.getAttribute("href") || "/").replace(/^\w+:\/\/[^/]+/, "");
  } else e9 = "/";
  return "/" !== e9[0] && "#" !== e9[0] && (e9 = "/" + e9), e9.replace($n, "");
}
function createHref(e9, t5) {
  return e9.replace(Un, "#") + t5;
}
function scrollToPosition(e9) {
  let t5;
  if ("el" in e9) {
    const n6 = e9.el, r4 = "string" == typeof n6 && n6.startsWith("#"), o5 = "string" == typeof n6 ? r4 ? document.getElementById(n6.slice(1)) : document.querySelector(n6) : n6;
    if (!o5) return;
    t5 = (function(e10, t6) {
      const n7 = document.documentElement.getBoundingClientRect(), r5 = e10.getBoundingClientRect();
      return { behavior: t6.behavior, left: r5.left - n7.left - (t6.left || 0), top: r5.top - n7.top - (t6.top || 0) };
    })(o5, e9);
  } else t5 = e9;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t5) : window.scrollTo(null != t5.left ? t5.left : window.scrollX, null != t5.top ? t5.top : window.scrollY);
}
function getScrollKey(e9, t5) {
  return (history.state ? history.state.position - t5 : -1) + e9;
}
function isRouteName(e9) {
  return "string" == typeof e9 || "symbol" == typeof e9;
}
function parseQuery2(e9) {
  const t5 = {};
  if ("" === e9 || "?" === e9) return t5;
  const n6 = ("?" === e9[0] ? e9.slice(1) : e9).split("&");
  for (let e10 = 0; e10 < n6.length; ++e10) {
    const r4 = n6[e10].replace(Ln, " "), o5 = r4.indexOf("="), s6 = decode(o5 < 0 ? r4 : r4.slice(0, o5)), i6 = o5 < 0 ? null : decode(r4.slice(o5 + 1));
    if (s6 in t5) {
      let e11 = t5[s6];
      Sn(e11) || (e11 = t5[s6] = [e11]), e11.push(i6);
    } else t5[s6] = i6;
  }
  return t5;
}
function stringifyQuery(e9) {
  let t5 = "";
  for (let n6 in e9) {
    const r4 = e9[n6];
    n6 = encodeQueryKey(n6), null != r4 ? (Sn(r4) ? r4.map((e10) => e10 && encodeQueryValue(e10)) : [r4 && encodeQueryValue(r4)]).forEach((e10) => {
      void 0 !== e10 && (t5 += (t5.length ? "&" : "") + n6, null != e10 && (t5 += "=" + e10));
    }) : void 0 !== r4 && (t5 += (t5.length ? "&" : "") + n6);
  }
  return t5;
}
function normalizeQuery(e9) {
  const t5 = {};
  for (const n6 in e9) {
    const r4 = e9[n6];
    void 0 !== r4 && (t5[n6] = Sn(r4) ? r4.map((e10) => null == e10 ? null : "" + e10) : null == r4 ? r4 : "" + r4);
  }
  return t5;
}
function useCallbacks() {
  let e9 = [];
  return { add: /* @__PURE__ */ __name(function(t5) {
    return e9.push(t5), () => {
      const n6 = e9.indexOf(t5);
      n6 > -1 && e9.splice(n6, 1);
    };
  }, "add"), list: /* @__PURE__ */ __name(() => e9.slice(), "list"), reset: /* @__PURE__ */ __name(function() {
    e9 = [];
  }, "reset") };
}
function guardToPromiseFn(e9, t5, n6, r4, o5, s6 = (e10) => e10()) {
  const i6 = r4 && (r4.enterCallbacks[o5] = r4.enterCallbacks[o5] || []);
  return () => new Promise((a5, c4) => {
    const next = /* @__PURE__ */ __name((e10) => {
      var s7;
      false === e10 ? c4(createRouterError(4, { from: n6, to: t5 })) : e10 instanceof Error ? c4(e10) : "string" == typeof (s7 = e10) || s7 && "object" == typeof s7 ? c4(createRouterError(2, { from: t5, to: e10 })) : (i6 && r4.enterCallbacks[o5] === i6 && "function" == typeof e10 && i6.push(e10), a5());
    }, "next"), l4 = s6(() => e9.call(r4 && r4.instances[o5], t5, n6, next));
    let u6 = Promise.resolve(l4);
    e9.length < 3 && (u6 = u6.then(next)), u6.catch((e10) => c4(e10));
  });
}
function extractComponentsGuards(e9, t5, n6, r4, o5 = (e10) => e10()) {
  const s6 = [];
  for (const i6 of e9) for (const e10 in i6.components) {
    let a5 = i6.components[e10];
    if ("beforeRouteEnter" === t5 || i6.instances[e10]) if (isRouteComponent(a5)) {
      const c4 = (a5.__vccOpts || a5)[t5];
      c4 && s6.push(guardToPromiseFn(c4, n6, r4, i6, e10, o5));
    } else {
      let c4 = a5();
      s6.push(() => c4.then((s7) => {
        if (!s7) throw new Error(`Couldn't resolve component "${e10}" at "${i6.path}"`);
        const a6 = (c5 = s7).__esModule || "Module" === c5[Symbol.toStringTag] || c5.default && isRouteComponent(c5.default) ? s7.default : s7;
        var c5;
        i6.mods[e10] = s7, i6.components[e10] = a6;
        const l4 = (a6.__vccOpts || a6)[t5];
        return l4 && guardToPromiseFn(l4, n6, r4, i6, e10, o5)();
      }));
    }
  }
  return s6;
}
function createMemoryHistory(e9 = "") {
  let t5 = [], n6 = [["", {}]], r4 = 0;
  function setLocation(e10, t6 = {}) {
    r4++, r4 !== n6.length && n6.splice(r4), n6.push([e10, t6]);
  }
  __name(setLocation, "setLocation");
  const o5 = { location: "", state: {}, base: e9 = normalizeBase(e9), createHref: createHref.bind(null, e9), replace(e10, t6) {
    n6.splice(r4--, 1), setLocation(e10, t6);
  }, push(e10, t6) {
    setLocation(e10, t6);
  }, listen: /* @__PURE__ */ __name((e10) => (t5.push(e10), () => {
    const n7 = t5.indexOf(e10);
    n7 > -1 && t5.splice(n7, 1);
  }), "listen"), destroy() {
    t5 = [], n6 = [["", {}]], r4 = 0;
  }, go(e10, o6 = true) {
    const s6 = this.location, i6 = e10 < 0 ? "back" : "forward";
    r4 = Math.max(0, Math.min(r4 + e10, n6.length - 1)), o6 && (function(e11, n7, { direction: r5, delta: o7 }) {
      const s7 = { direction: r5, delta: o7, type: "pop" };
      for (const r6 of t5) r6(e11, n7, s7);
    })(this.location, s6, { direction: i6, delta: e10 });
  } };
  return Object.defineProperty(o5, "location", { enumerable: true, get: /* @__PURE__ */ __name(() => n6[r4][0], "get") }), Object.defineProperty(o5, "state", { enumerable: true, get: /* @__PURE__ */ __name(() => n6[r4][1], "get") }), o5;
}
function compareScoreArray(e9, t5) {
  let n6 = 0;
  for (; n6 < e9.length && n6 < t5.length; ) {
    const r4 = t5[n6] - e9[n6];
    if (r4) return r4;
    n6++;
  }
  return e9.length < t5.length ? 1 === e9.length && 80 === e9[0] ? -1 : 1 : e9.length > t5.length ? 1 === t5.length && 80 === t5[0] ? 1 : -1 : 0;
}
function comparePathParserScore(e9, t5) {
  let n6 = 0;
  const r4 = e9.score, o5 = t5.score;
  for (; n6 < r4.length && n6 < o5.length; ) {
    const e10 = compareScoreArray(r4[n6], o5[n6]);
    if (e10) return e10;
    n6++;
  }
  if (1 === Math.abs(o5.length - r4.length)) {
    if (isLastScoreNegative(r4)) return 1;
    if (isLastScoreNegative(o5)) return -1;
  }
  return o5.length - r4.length;
}
function isLastScoreNegative(e9) {
  const t5 = e9[e9.length - 1];
  return e9.length > 0 && t5[t5.length - 1] < 0;
}
function createRouteRecordMatcher(e9, t5, n6) {
  const r4 = (function(e10, t6) {
    const n7 = yn({}, Kn, t6), r5 = [];
    let o6 = n7.start ? "^" : "";
    const s6 = [];
    for (const t7 of e10) {
      const e11 = t7.length ? [] : [90];
      n7.strict && !t7.length && (o6 += "/");
      for (let r6 = 0; r6 < t7.length; r6++) {
        const i7 = t7[r6];
        let a5 = 40 + (n7.sensitive ? 0.25 : 0);
        if (0 === i7.type) r6 || (o6 += "/"), o6 += i7.value.replace(zn, "\\$&"), a5 += 40;
        else if (1 === i7.type) {
          const { value: e12, repeatable: n8, optional: c4, regexp: l4 } = i7;
          s6.push({ name: e12, repeatable: n8, optional: c4 });
          const u6 = l4 || qn;
          if (u6 !== qn) {
            a5 += 10;
            try {
              new RegExp(`(${u6})`);
            } catch (t8) {
              throw new Error(`Invalid custom RegExp for param "${e12}" (${u6}): ` + t8.message);
            }
          }
          let p6 = n8 ? `((?:${u6})(?:/(?:${u6}))*)` : `(${u6})`;
          r6 || (p6 = c4 && t7.length < 2 ? `(?:/${p6})` : "/" + p6), c4 && (p6 += "?"), o6 += p6, a5 += 20, c4 && (a5 += -8), n8 && (a5 += -20), ".*" === u6 && (a5 += -50);
        }
        e11.push(a5);
      }
      r5.push(e11);
    }
    if (n7.strict && n7.end) {
      const e11 = r5.length - 1;
      r5[e11][r5[e11].length - 1] += 0.7000000000000001;
    }
    n7.strict || (o6 += "/?"), n7.end ? o6 += "$" : n7.strict && !o6.endsWith("/") && (o6 += "(?:/|$)");
    const i6 = new RegExp(o6, n7.sensitive ? "" : "i");
    return { re: i6, score: r5, keys: s6, parse: /* @__PURE__ */ __name(function(e11) {
      const t7 = e11.match(i6), n8 = {};
      if (!t7) return null;
      for (let e12 = 1; e12 < t7.length; e12++) {
        const r6 = t7[e12] || "", o7 = s6[e12 - 1];
        n8[o7.name] = r6 && o7.repeatable ? r6.split("/") : r6;
      }
      return n8;
    }, "parse"), stringify: /* @__PURE__ */ __name(function(t7) {
      let n8 = "", r6 = false;
      for (const o7 of e10) {
        r6 && n8.endsWith("/") || (n8 += "/"), r6 = false;
        for (const e11 of o7) if (0 === e11.type) n8 += e11.value;
        else if (1 === e11.type) {
          const { value: s7, repeatable: i7, optional: a5 } = e11, c4 = s7 in t7 ? t7[s7] : "";
          if (Sn(c4) && !i7) throw new Error(`Provided param "${s7}" is an array but it is not repeatable (* or + modifiers)`);
          const l4 = Sn(c4) ? c4.join("/") : c4;
          if (!l4) {
            if (!a5) throw new Error(`Missing required param "${s7}"`);
            o7.length < 2 && (n8.endsWith("/") ? n8 = n8.slice(0, -1) : r6 = true);
          }
          n8 += l4;
        }
      }
      return n8 || "/";
    }, "stringify") };
  })((function(e10) {
    if (!e10) return [[]];
    if ("/" === e10) return [[Wn]];
    if (!e10.startsWith("/")) throw new Error(`Invalid path "${e10}"`);
    function crash(e11) {
      throw new Error(`ERR (${t6})/"${a5}": ${e11}`);
    }
    __name(crash, "crash");
    let t6 = 0, n7 = t6;
    const r5 = [];
    let o6;
    function finalizeSegment() {
      o6 && r5.push(o6), o6 = [];
    }
    __name(finalizeSegment, "finalizeSegment");
    let s6, i6 = 0, a5 = "", c4 = "";
    function consumeBuffer() {
      a5 && (0 === t6 ? o6.push({ type: 0, value: a5 }) : 1 === t6 || 2 === t6 || 3 === t6 ? (o6.length > 1 && ("*" === s6 || "+" === s6) && crash(`A repeatable param (${a5}) must be alone in its segment. eg: '/:ids+.`), o6.push({ type: 1, value: a5, regexp: c4, repeatable: "*" === s6 || "+" === s6, optional: "*" === s6 || "?" === s6 })) : crash("Invalid state to consume buffer"), a5 = "");
    }
    __name(consumeBuffer, "consumeBuffer");
    function addCharToBuffer() {
      a5 += s6;
    }
    __name(addCharToBuffer, "addCharToBuffer");
    for (; i6 < e10.length; ) switch (s6 = e10[i6++], t6) {
      case 0:
        "\\" === s6 ? (n7 = t6, t6 = 4) : "/" === s6 ? (a5 && consumeBuffer(), finalizeSegment()) : ":" === s6 ? (consumeBuffer(), t6 = 1) : addCharToBuffer();
        break;
      case 4:
        addCharToBuffer(), t6 = n7;
        break;
      case 1:
        "(" === s6 ? t6 = 2 : Gn.test(s6) ? addCharToBuffer() : (consumeBuffer(), t6 = 0, "*" !== s6 && "?" !== s6 && "+" !== s6 && i6--);
        break;
      case 2:
        ")" === s6 ? "\\" == c4[c4.length - 1] ? c4 = c4.slice(0, -1) + s6 : t6 = 3 : c4 += s6;
        break;
      case 3:
        consumeBuffer(), t6 = 0, "*" !== s6 && "?" !== s6 && "+" !== s6 && i6--, c4 = "";
        break;
      default:
        crash("Unknown state");
    }
    return 2 === t6 && crash(`Unfinished custom RegExp for param "${a5}"`), consumeBuffer(), finalizeSegment(), r5;
  })(e9.path), n6), o5 = yn(r4, { record: e9, parent: t5, children: [], alias: [] });
  return t5 && !o5.record.aliasOf == !t5.record.aliasOf && t5.children.push(o5), o5;
}
function createRouterMatcher(e9, t5) {
  const n6 = [], r4 = /* @__PURE__ */ new Map();
  function addRoute(e10, n7, r5) {
    const o5 = !r5, s6 = normalizeRouteRecord(e10);
    s6.aliasOf = r5 && r5.record;
    const i6 = mergeOptions(t5, e10), a5 = [s6];
    if ("alias" in e10) {
      const t6 = "string" == typeof e10.alias ? [e10.alias] : e10.alias;
      for (const e11 of t6) a5.push(normalizeRouteRecord(yn({}, s6, { components: r5 ? r5.record.components : s6.components, path: e11, aliasOf: r5 ? r5.record : s6 })));
    }
    let c4, l4;
    for (const t6 of a5) {
      const { path: a6 } = t6;
      if (n7 && "/" !== a6[0]) {
        const e11 = n7.record.path, r6 = "/" === e11[e11.length - 1] ? "" : "/";
        t6.path = n7.record.path + (a6 && r6 + a6);
      }
      if (c4 = createRouteRecordMatcher(t6, n7, i6), r5 ? r5.alias.push(c4) : (l4 = l4 || c4, l4 !== c4 && l4.alias.push(c4), o5 && e10.name && !isAliasRecord(c4) && removeRoute(e10.name)), isMatchable(c4) && insertMatcher(c4), s6.children) {
        const e11 = s6.children;
        for (let t7 = 0; t7 < e11.length; t7++) addRoute(e11[t7], c4, r5 && r5.children[t7]);
      }
      r5 = r5 || c4;
    }
    return l4 ? () => {
      removeRoute(l4);
    } : noop;
  }
  __name(addRoute, "addRoute");
  function removeRoute(e10) {
    if (isRouteName(e10)) {
      const t6 = r4.get(e10);
      t6 && (r4.delete(e10), n6.splice(n6.indexOf(t6), 1), t6.children.forEach(removeRoute), t6.alias.forEach(removeRoute));
    } else {
      const t6 = n6.indexOf(e10);
      t6 > -1 && (n6.splice(t6, 1), e10.record.name && r4.delete(e10.record.name), e10.children.forEach(removeRoute), e10.alias.forEach(removeRoute));
    }
  }
  __name(removeRoute, "removeRoute");
  function insertMatcher(e10) {
    const t6 = (function(e11, t7) {
      let n7 = 0, r5 = t7.length;
      for (; n7 !== r5; ) {
        const o6 = n7 + r5 >> 1;
        comparePathParserScore(e11, t7[o6]) < 0 ? r5 = o6 : n7 = o6 + 1;
      }
      const o5 = (function(e12) {
        let t8 = e12;
        for (; t8 = t8.parent; ) if (isMatchable(t8) && 0 === comparePathParserScore(e12, t8)) return t8;
      })(e11);
      o5 && (r5 = t7.lastIndexOf(o5, r5 - 1));
      return r5;
    })(e10, n6);
    n6.splice(t6, 0, e10), e10.record.name && !isAliasRecord(e10) && r4.set(e10.record.name, e10);
  }
  __name(insertMatcher, "insertMatcher");
  return t5 = mergeOptions(Jn, t5), e9.forEach((e10) => addRoute(e10)), { addRoute, resolve: /* @__PURE__ */ __name(function(e10, t6) {
    let o5, s6, i6, a5 = {};
    if ("name" in e10 && e10.name) {
      if (o5 = r4.get(e10.name), !o5) throw createRouterError(1, { location: e10 });
      i6 = o5.record.name, a5 = yn(pickParams(t6.params, o5.keys.filter((e11) => !e11.optional).concat(o5.parent ? o5.parent.keys.filter((e11) => e11.optional) : []).map((e11) => e11.name)), e10.params && pickParams(e10.params, o5.keys.map((e11) => e11.name))), s6 = o5.stringify(a5);
    } else if (null != e10.path) s6 = e10.path, o5 = n6.find((e11) => e11.re.test(s6)), o5 && (a5 = o5.parse(s6), i6 = o5.record.name, o5.keys.forEach((e11) => {
      e11.optional && !a5[e11.name] && delete a5[e11.name];
    }));
    else {
      if (o5 = t6.name ? r4.get(t6.name) : n6.find((e11) => e11.re.test(t6.path)), !o5) throw createRouterError(1, { location: e10, currentLocation: t6 });
      i6 = o5.record.name, a5 = yn({}, t6.params, e10.params), s6 = o5.stringify(a5);
    }
    const c4 = [];
    let l4 = o5;
    for (; l4; ) c4.unshift(l4.record), l4 = l4.parent;
    return { name: i6, path: s6, params: a5, matched: c4, meta: mergeMetaFields(c4) };
  }, "resolve"), removeRoute, clearRoutes: /* @__PURE__ */ __name(function() {
    n6.length = 0, r4.clear();
  }, "clearRoutes"), getRoutes: /* @__PURE__ */ __name(function() {
    return n6;
  }, "getRoutes"), getRecordMatcher: /* @__PURE__ */ __name(function(e10) {
    return r4.get(e10);
  }, "getRecordMatcher") };
}
function pickParams(e9, t5) {
  const n6 = {};
  for (const r4 of t5) r4 in e9 && (n6[r4] = e9[r4]);
  return n6;
}
function normalizeRouteRecord(e9) {
  const t5 = { path: e9.path, redirect: e9.redirect, name: e9.name, meta: e9.meta || {}, aliasOf: e9.aliasOf, beforeEnter: e9.beforeEnter, props: normalizeRecordProps(e9), children: e9.children || [], instances: {}, leaveGuards: /* @__PURE__ */ new Set(), updateGuards: /* @__PURE__ */ new Set(), enterCallbacks: {}, components: "components" in e9 ? e9.components || null : e9.component && { default: e9.component } };
  return Object.defineProperty(t5, "mods", { value: {} }), t5;
}
function normalizeRecordProps(e9) {
  const t5 = {}, n6 = e9.props || false;
  if ("component" in e9) t5.default = n6;
  else for (const r4 in e9.components) t5[r4] = "object" == typeof n6 ? n6[r4] : n6;
  return t5;
}
function isAliasRecord(e9) {
  for (; e9; ) {
    if (e9.record.aliasOf) return true;
    e9 = e9.parent;
  }
  return false;
}
function mergeMetaFields(e9) {
  return e9.reduce((e10, t5) => yn(e10, t5.meta), {});
}
function isMatchable({ record: e9 }) {
  return !!(e9.name || e9.components && Object.keys(e9.components).length || e9.redirect);
}
function useLink(e9) {
  const t5 = inject(Nn), n6 = inject(bn), r4 = computed(() => {
    const n7 = unref(e9.to);
    return t5.resolve(n7);
  }), o5 = computed(() => {
    const { matched: e10 } = r4.value, { length: t6 } = e10, o6 = e10[t6 - 1], s7 = n6.matched;
    if (!o6 || !s7.length) return -1;
    const i7 = s7.findIndex(isSameRouteRecord.bind(null, o6));
    if (i7 > -1) return i7;
    const a5 = getOriginalPath(e10[t6 - 2]);
    return t6 > 1 && getOriginalPath(o6) === a5 && s7[s7.length - 1].path !== a5 ? s7.findIndex(isSameRouteRecord.bind(null, e10[t6 - 2])) : i7;
  }), s6 = computed(() => o5.value > -1 && (function(e10, t6) {
    for (const n7 in t6) {
      const r5 = t6[n7], o6 = e10[n7];
      if ("string" == typeof r5) {
        if (r5 !== o6) return false;
      } else if (!Sn(o6) || o6.length !== r5.length || r5.some((e11, t7) => e11.valueOf() !== o6[t7].valueOf())) return false;
    }
    return true;
  })(n6.params, r4.value.params)), i6 = computed(() => o5.value > -1 && o5.value === n6.matched.length - 1 && isSameRouteLocationParams(n6.params, r4.value.params));
  return { route: r4, href: computed(() => r4.value.href), isActive: s6, isExactActive: i6, navigate: /* @__PURE__ */ __name(function(n7 = {}) {
    if ((function(e10) {
      if (e10.metaKey || e10.altKey || e10.ctrlKey || e10.shiftKey) return;
      if (e10.defaultPrevented) return;
      if (void 0 !== e10.button && 0 !== e10.button) return;
      if (e10.currentTarget && e10.currentTarget.getAttribute) {
        const t6 = e10.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t6)) return;
      }
      e10.preventDefault && e10.preventDefault();
      return true;
    })(n7)) {
      const n8 = t5[unref(e9.replace) ? "replace" : "push"](unref(e9.to)).catch(noop);
      return e9.viewTransition && "undefined" != typeof document && "startViewTransition" in document && document.startViewTransition(() => n8), n8;
    }
    return Promise.resolve();
  }, "navigate") };
}
function getOriginalPath(e9) {
  return e9 ? e9.aliasOf ? e9.aliasOf.path : e9.path : "";
}
function normalizeSlot$1(e9, t5) {
  if (!e9) return null;
  const n6 = e9(t5);
  return 1 === n6.length ? n6[0] : n6;
}
function createRouter(e9) {
  const t5 = createRouterMatcher(e9.routes, e9), n6 = e9.parseQuery || parseQuery2, r4 = e9.stringifyQuery || stringifyQuery, o5 = e9.history, s6 = useCallbacks(), i6 = useCallbacks(), a5 = useCallbacks(), c4 = shallowRef(Xn);
  let l4 = Xn;
  _n && e9.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u6 = applyToParams.bind(null, (e10) => "" + e10), p6 = applyToParams.bind(null, encodeParam), d5 = applyToParams.bind(null, decode);
  function resolve2(e10, s7) {
    if (s7 = yn({}, s7 || c4.value), "string" == typeof e10) {
      const r5 = parseURL2(n6, e10, s7.path), i8 = t5.resolve({ path: r5.path }, s7), a7 = o5.createHref(r5.fullPath);
      return yn(r5, i8, { params: d5(i8.params), redirectedFrom: void 0, href: a7 });
    }
    let i7;
    if (null != e10.path) i7 = yn({}, e10, { path: parseURL2(n6, e10.path, s7.path).path });
    else {
      const t6 = yn({}, e10.params);
      for (const e11 in t6) null == t6[e11] && delete t6[e11];
      i7 = yn({}, e10, { params: p6(t6) }), s7.params = p6(s7.params);
    }
    const a6 = t5.resolve(i7, s7), l5 = e10.hash || "";
    a6.params = u6(d5(a6.params));
    const h6 = (function(e11, t6) {
      const n7 = t6.query ? e11(t6.query) : "";
      return t6.path + (n7 && "?") + n7 + (t6.hash || "");
    })(r4, yn({}, e10, { hash: (f5 = l5, commonEncode(f5).replace(Vn, "{").replace(jn, "}").replace(Mn, "^")), path: a6.path }));
    var f5;
    const m5 = o5.createHref(h6);
    return yn({ fullPath: h6, hash: l5, query: r4 === stringifyQuery ? normalizeQuery(e10.query) : e10.query || {} }, a6, { redirectedFrom: void 0, href: m5 });
  }
  __name(resolve2, "resolve");
  function locationAsObject(e10) {
    return "string" == typeof e10 ? parseURL2(n6, e10, c4.value.path) : yn({}, e10);
  }
  __name(locationAsObject, "locationAsObject");
  function checkCanceledNavigation(e10, t6) {
    if (l4 !== e10) return createRouterError(8, { from: t6, to: e10 });
  }
  __name(checkCanceledNavigation, "checkCanceledNavigation");
  function push(e10) {
    return pushWithRedirect(e10);
  }
  __name(push, "push");
  function handleRedirectRecord(e10, t6) {
    const n7 = e10.matched[e10.matched.length - 1];
    if (n7 && n7.redirect) {
      const { redirect: r5 } = n7;
      let o6 = "function" == typeof r5 ? r5(e10, t6) : r5;
      return "string" == typeof o6 && (o6 = o6.includes("?") || o6.includes("#") ? o6 = locationAsObject(o6) : { path: o6 }, o6.params = {}), yn({ query: e10.query, hash: e10.hash, params: null != o6.path ? {} : e10.params }, o6);
    }
  }
  __name(handleRedirectRecord, "handleRedirectRecord");
  function pushWithRedirect(e10, t6) {
    const n7 = l4 = resolve2(e10), o6 = c4.value, s7 = e10.state, i7 = e10.force, a6 = true === e10.replace, u7 = handleRedirectRecord(n7, o6);
    if (u7) return pushWithRedirect(yn(locationAsObject(u7), { state: "object" == typeof u7 ? yn({}, s7, u7.state) : s7, force: i7, replace: a6 }), t6 || n7);
    const p7 = n7;
    let d6;
    return p7.redirectedFrom = t6, !i7 && (function(e11, t7, n8) {
      const r5 = t7.matched.length - 1, o7 = n8.matched.length - 1;
      return r5 > -1 && r5 === o7 && isSameRouteRecord(t7.matched[r5], n8.matched[o7]) && isSameRouteLocationParams(t7.params, n8.params) && e11(t7.query) === e11(n8.query) && t7.hash === n8.hash;
    })(r4, o6, n7) && (d6 = createRouterError(16, { to: p7, from: o6 }), handleScroll(o6, o6, true, false)), (d6 ? Promise.resolve(d6) : navigate(p7, o6)).catch((e11) => isNavigationFailure(e11) ? isNavigationFailure(e11, 2) ? e11 : markAsReady(e11) : triggerError(e11, p7, o6)).then((e11) => {
      if (e11) {
        if (isNavigationFailure(e11, 2)) return pushWithRedirect(yn({ replace: a6 }, locationAsObject(e11.to), { state: "object" == typeof e11.to ? yn({}, s7, e11.to.state) : s7, force: i7 }), t6 || p7);
      } else e11 = finalizeNavigation(p7, o6, true, a6, s7);
      return triggerAfterEach(p7, o6, e11), e11;
    });
  }
  __name(pushWithRedirect, "pushWithRedirect");
  function checkCanceledNavigationAndReject(e10, t6) {
    const n7 = checkCanceledNavigation(e10, t6);
    return n7 ? Promise.reject(n7) : Promise.resolve();
  }
  __name(checkCanceledNavigationAndReject, "checkCanceledNavigationAndReject");
  function runWithContext(e10) {
    const t6 = _3.values().next().value;
    return t6 && "function" == typeof t6.runWithContext ? t6.runWithContext(e10) : e10();
  }
  __name(runWithContext, "runWithContext");
  function navigate(e10, t6) {
    let n7;
    const [r5, o6, a6] = (function(e11, t7) {
      const n8 = [], r6 = [], o7 = [], s7 = Math.max(t7.matched.length, e11.matched.length);
      for (let i7 = 0; i7 < s7; i7++) {
        const s8 = t7.matched[i7];
        s8 && (e11.matched.find((e12) => isSameRouteRecord(e12, s8)) ? r6.push(s8) : n8.push(s8));
        const a7 = e11.matched[i7];
        a7 && (t7.matched.find((e12) => isSameRouteRecord(e12, a7)) || o7.push(a7));
      }
      return [n8, r6, o7];
    })(e10, t6);
    n7 = extractComponentsGuards(r5.reverse(), "beforeRouteLeave", e10, t6);
    for (const o7 of r5) o7.leaveGuards.forEach((r6) => {
      n7.push(guardToPromiseFn(r6, e10, t6));
    });
    const c5 = checkCanceledNavigationAndReject.bind(null, e10, t6);
    return n7.push(c5), runGuardQueue(n7).then(() => {
      n7 = [];
      for (const r6 of s6.list()) n7.push(guardToPromiseFn(r6, e10, t6));
      return n7.push(c5), runGuardQueue(n7);
    }).then(() => {
      n7 = extractComponentsGuards(o6, "beforeRouteUpdate", e10, t6);
      for (const r6 of o6) r6.updateGuards.forEach((r7) => {
        n7.push(guardToPromiseFn(r7, e10, t6));
      });
      return n7.push(c5), runGuardQueue(n7);
    }).then(() => {
      n7 = [];
      for (const r6 of a6) if (r6.beforeEnter) if (Sn(r6.beforeEnter)) for (const o7 of r6.beforeEnter) n7.push(guardToPromiseFn(o7, e10, t6));
      else n7.push(guardToPromiseFn(r6.beforeEnter, e10, t6));
      return n7.push(c5), runGuardQueue(n7);
    }).then(() => (e10.matched.forEach((e11) => e11.enterCallbacks = {}), n7 = extractComponentsGuards(a6, "beforeRouteEnter", e10, t6, runWithContext), n7.push(c5), runGuardQueue(n7))).then(() => {
      n7 = [];
      for (const r6 of i6.list()) n7.push(guardToPromiseFn(r6, e10, t6));
      return n7.push(c5), runGuardQueue(n7);
    }).catch((e11) => isNavigationFailure(e11, 8) ? e11 : Promise.reject(e11));
  }
  __name(navigate, "navigate");
  function triggerAfterEach(e10, t6, n7) {
    a5.list().forEach((r5) => runWithContext(() => r5(e10, t6, n7)));
  }
  __name(triggerAfterEach, "triggerAfterEach");
  function finalizeNavigation(e10, t6, n7, r5, s7) {
    const i7 = checkCanceledNavigation(e10, t6);
    if (i7) return i7;
    const a6 = t6 === Xn, l5 = _n ? history.state : {};
    n7 && (r5 || a6 ? o5.replace(e10.fullPath, yn({ scroll: a6 && l5 && l5.scroll }, s7)) : o5.push(e10.fullPath, s7)), c4.value = e10, handleScroll(e10, t6, n7, a6), markAsReady();
  }
  __name(finalizeNavigation, "finalizeNavigation");
  let h5;
  function setupListeners() {
    h5 || (h5 = o5.listen((e10, t6, n7) => {
      if (!y4.listening) return;
      const r5 = resolve2(e10), s7 = handleRedirectRecord(r5, y4.currentRoute.value);
      if (s7) return void pushWithRedirect(yn(s7, { replace: true, force: true }), r5).catch(noop);
      l4 = r5;
      const i7 = c4.value;
      var a6, u7;
      _n && (a6 = getScrollKey(i7.fullPath, n7.delta), u7 = { left: window.scrollX, top: window.scrollY }, Hn.set(a6, u7)), navigate(r5, i7).catch((e11) => isNavigationFailure(e11, 12) ? e11 : isNavigationFailure(e11, 2) ? (pushWithRedirect(yn(locationAsObject(e11.to), { force: true }), r5).then((e12) => {
        isNavigationFailure(e12, 20) && !n7.delta && "pop" === n7.type && o5.go(-1, false);
      }).catch(noop), Promise.reject()) : (n7.delta && o5.go(-n7.delta, false), triggerError(e11, r5, i7))).then((e11) => {
        (e11 = e11 || finalizeNavigation(r5, i7, false)) && (n7.delta && !isNavigationFailure(e11, 8) ? o5.go(-n7.delta, false) : "pop" === n7.type && isNavigationFailure(e11, 20) && o5.go(-1, false)), triggerAfterEach(r5, i7, e11);
      }).catch(noop);
    }));
  }
  __name(setupListeners, "setupListeners");
  let f4, m4 = useCallbacks(), g3 = useCallbacks();
  function triggerError(e10, t6, n7) {
    markAsReady(e10);
    const r5 = g3.list();
    return r5.length ? r5.forEach((r6) => r6(e10, t6, n7)) : console.error(e10), Promise.reject(e10);
  }
  __name(triggerError, "triggerError");
  function markAsReady(e10) {
    return f4 || (f4 = !e10, setupListeners(), m4.list().forEach(([t6, n7]) => e10 ? n7(e10) : t6()), m4.reset()), e10;
  }
  __name(markAsReady, "markAsReady");
  function handleScroll(t6, n7, r5, o6) {
    const { scrollBehavior: s7 } = e9;
    if (!_n || !s7) return Promise.resolve();
    const i7 = !r5 && (function(e10) {
      const t7 = Hn.get(e10);
      return Hn.delete(e10), t7;
    })(getScrollKey(t6.fullPath, 0)) || (o6 || !r5) && history.state && history.state.scroll || null;
    return nextTick().then(() => s7(t6, n7, i7)).then((e10) => e10 && scrollToPosition(e10)).catch((e10) => triggerError(e10, t6, n7));
  }
  __name(handleScroll, "handleScroll");
  const go = /* @__PURE__ */ __name((e10) => o5.go(e10), "go");
  let E3;
  const _3 = /* @__PURE__ */ new Set(), y4 = { currentRoute: c4, listening: true, addRoute: /* @__PURE__ */ __name(function(e10, n7) {
    let r5, o6;
    return isRouteName(e10) ? (r5 = t5.getRecordMatcher(e10), o6 = n7) : o6 = e10, t5.addRoute(o6, r5);
  }, "addRoute"), removeRoute: /* @__PURE__ */ __name(function(e10) {
    const n7 = t5.getRecordMatcher(e10);
    n7 && t5.removeRoute(n7);
  }, "removeRoute"), clearRoutes: t5.clearRoutes, hasRoute: /* @__PURE__ */ __name(function(e10) {
    return !!t5.getRecordMatcher(e10);
  }, "hasRoute"), getRoutes: /* @__PURE__ */ __name(function() {
    return t5.getRoutes().map((e10) => e10.record);
  }, "getRoutes"), resolve: resolve2, options: e9, push, replace: /* @__PURE__ */ __name(function(e10) {
    return push(yn(locationAsObject(e10), { replace: true }));
  }, "replace"), go, back: /* @__PURE__ */ __name(() => go(-1), "back"), forward: /* @__PURE__ */ __name(() => go(1), "forward"), beforeEach: s6.add, beforeResolve: i6.add, afterEach: a5.add, onError: g3.add, isReady: /* @__PURE__ */ __name(function() {
    return f4 && c4.value !== Xn ? Promise.resolve() : new Promise((e10, t6) => {
      m4.add([e10, t6]);
    });
  }, "isReady"), install(e10) {
    e10.component("RouterLink", Qn), e10.component("RouterView", Yn), e10.config.globalProperties.$router = y4, Object.defineProperty(e10.config.globalProperties, "$route", { enumerable: true, get: /* @__PURE__ */ __name(() => unref(c4), "get") }), _n && !E3 && c4.value === Xn && (E3 = true, push(o5.location).catch((e11) => {
    }));
    const t6 = {};
    for (const e11 in Xn) Object.defineProperty(t6, e11, { get: /* @__PURE__ */ __name(() => c4.value[e11], "get"), enumerable: true });
    e10.provide(Nn, y4), e10.provide(bn, shallowReactive(t6)), e10.provide(xn, c4);
    const n7 = e10.unmount;
    _3.add(e10), e10.unmount = function() {
      _3.delete(e10), _3.size < 1 && (l4 = Xn, h5 && h5(), h5 = null, c4.value = Xn, E3 = false, f4 = false), n7();
    };
  } };
  function runGuardQueue(e10) {
    return e10.reduce((e11, t6) => e11.then(() => runWithContext(t6)), Promise.resolve());
  }
  __name(runGuardQueue, "runGuardQueue");
  return y4;
}
function debounce(e9, t5 = 25, n6 = {}) {
  if (n6 = { ...Zn, ...n6 }, !Number.isFinite(t5)) throw new TypeError("Expected `wait` to be a finite number");
  let r4, o5, s6, i6, a5 = [];
  const applyFn = /* @__PURE__ */ __name((t6, r5) => (s6 = (async function(e10, t7, n7) {
    return await e10.apply(t7, n7);
  })(e9, t6, r5), s6.finally(() => {
    if (s6 = null, n6.trailing && i6 && !o5) {
      const e10 = applyFn(t6, i6);
      return i6 = null, e10;
    }
  }), s6), "applyFn"), debounced = /* @__PURE__ */ __name(function(...e10) {
    return n6.trailing && (i6 = e10), s6 || new Promise((s7) => {
      const c4 = !o5 && n6.leading;
      clearTimeout(o5), o5 = setTimeout(() => {
        o5 = null;
        const t6 = n6.leading ? r4 : applyFn(this, e10);
        i6 = null;
        for (const e11 of a5) e11(t6);
        a5 = [];
      }, t5), c4 ? (r4 = applyFn(this, e10), s7(r4)) : a5.push(s7);
    });
  }, "debounced"), _clearTimeout = /* @__PURE__ */ __name((e10) => {
    e10 && (clearTimeout(e10), o5 = null);
  }, "_clearTimeout");
  return debounced.isPending = () => !!o5, debounced.cancel = () => {
    _clearTimeout(o5), a5 = [], i6 = null;
  }, debounced.flush = () => {
    if (_clearTimeout(o5), !i6 || s6) return;
    const e10 = i6;
    return i6 = null, applyFn(this, e10);
  }, debounced;
}
function getNuxtAppCtx(e9 = rr) {
  return getContext(e9, { asyncContext: false });
}
function registerPluginHooks(e9, t5) {
  t5.hooks && e9.hooks.addHooks(t5.hooks);
}
function defineNuxtPlugin(e9) {
  if ("function" == typeof e9) return e9;
  const t5 = e9._name || e9.name;
  return delete e9.name, Object.assign(e9.setup || (() => {
  }), e9, { [or]: true, _name: t5 });
}
function callWithNuxt(e9, t5, n6) {
  const fn3 = /* @__PURE__ */ __name(() => t5(), "fn"), r4 = getNuxtAppCtx(e9._id);
  return e9.vueApp.runWithContext(() => r4.callAsync(e9, fn3));
}
function useNuxtApp(e9) {
  const t5 = (function(e10) {
    let t6;
    return ln.hasInjectionContext() && (t6 = ln.getCurrentInstance()?.appContext.app.$nuxt), t6 ||= getNuxtAppCtx(e10).tryUse(), t6 || null;
  })(e9);
  if (!t5) throw new Error("[nuxt] instance unavailable");
  return t5;
}
function useRuntimeConfig(e9) {
  return useNuxtApp().$config;
}
function defineGetter(e9, t5, n6) {
  Object.defineProperty(e9, t5, { get: /* @__PURE__ */ __name(() => n6, "get") });
}
function defineNuxtRouteMiddleware(e9) {
  return e9;
}
function resolveRouteObject(e9) {
  return withQuery(e9.path || "", e9.query || {}) + (e9.hash || "");
}
function encodeRoutePath(r4) {
  const o5 = parseURL(r4);
  return encodePath(decodePath(o5.pathname)) + o5.search + o5.hash;
}
function definePayloadReducer(e9, t5) {
  useNuxtApp().ssrContext["~payloadReducers"][e9] = t5;
}
function toArray(e9) {
  return Array.isArray(e9) ? e9 : [e9];
}
function generateRouteKey(e9) {
  const t5 = e9?.meta.key ?? e9.path.replace(mr, "$1").replace(gr, "$1").replace(Er, (t6) => e9.params[t6.slice(1)]?.toString() || "");
  return "function" == typeof t5 ? t5(e9) : t5;
}
function isChangingPage(e9, t5) {
  if (e9 === t5 || t5 === Xn) return false;
  if (generateRouteKey(e9) !== generateRouteKey(t5)) return true;
  return !e9.matched.every((e10, n6) => e10.components && e10.components.default === t5.matched[n6]?.components?.default);
}
function _getHashElementScrollMarginTop(e9) {
  try {
    const t5 = (void 0).querySelector(e9);
    if (t5) return (Number.parseFloat(getComputedStyle(t5).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
  } catch {
  }
  return 0;
}
function _calculatePosition(e9, t5, n6, r4) {
  return n6 || (e9.hash ? { el: e9.hash, top: _getHashElementScrollMarginTop(e9.hash), behavior: isChangingPage(e9, t5) ? r4 : "instant" } : { left: 0, top: 0 });
}
function defineKeyedFunctionFactory(e9) {
  return Object.defineProperty(function() {
    throw new Error(`[nuxt] \`${e9.name}\` is a compiler macro and cannot be called at runtime.`);
  }, "__nuxt_factory", { enumerable: false, get: /* @__PURE__ */ __name(() => e9.factory, "get") });
}
function writableComputedRef(e9) {
  return ln.computed({ get: /* @__PURE__ */ __name(() => e9()?.value, "get"), set(t5) {
    const n6 = e9();
    n6 && (n6.value = t5);
  } });
}
function clearNuxtDataByKey(e9, t5) {
  t5 in e9.payload.data && (e9.payload.data[t5] = void 0), t5 in e9.payload._errors && (e9.payload._errors[t5] = void 0), e9._asyncData[t5] && (e9._asyncData[t5].data.value = ln.unref(e9._asyncData[t5]._default()), e9._asyncData[t5].error.value = void 0, e9._asyncData[t5].status.value = "idle", e9._asyncData[t5]._initialCachedData = void 0), t5 in e9._asyncDataPromises && (e9._asyncDataPromises[t5] = void 0);
}
function useRequestFetch() {
  return (e9 ||= useNuxtApp(), e9.ssrContext?.event)?.$fetch || globalThis.$fetch;
  var e9;
}
function generateOptionSegments(e9) {
  const t5 = [ln.toValue(e9.method)?.toUpperCase() || "GET", ln.toValue(e9.baseURL)];
  for (const n6 of [e9.query || e9.params]) {
    const e10 = ln.toValue(n6);
    if (!e10) continue;
    const r4 = {};
    for (const [t6, n7] of Object.entries(e10)) r4[ln.toValue(t6)] = ln.toValue(n7);
    t5.push(r4);
  }
  if (e9.body) {
    const n6 = ln.toValue(e9.body);
    if (n6) if (n6 instanceof ArrayBuffer) t5.push(hash$1(Object.fromEntries([...new Uint8Array(n6).entries()].map(([e10, t6]) => [e10, t6.toString()]))));
    else if (n6 instanceof FormData) {
      const e10 = [];
      for (const t6 of n6.entries()) {
        const [n7, r4] = t6;
        e10.push([n7, r4 instanceof File ? `${r4.name}:${r4.size}:${r4.lastModified}` : r4]);
      }
      t5.push(hash$1(e10));
    } else if (isPlainObject2(n6)) t5.push(hash$1(ln.reactive(n6)));
    else try {
      t5.push(hash$1(n6));
    } catch {
      console.warn("[useFetch] Failed to hash body", n6);
    }
    else t5.push(hash$1(n6));
  }
  return t5;
}
function normalizeSlot(e9, t5) {
  const n6 = e9(t5);
  return 1 === n6.length ? ln.h(n6[0]) : ln.h(ln.Fragment, void 0, n6);
}
var le, ue, pe, de, he, fe, me, ge, Ee, _e, ye, Se, ve, Te, Ce, Ne, be, xe, Oe, Re, Ie, Ae, Pe, Le, we, De, Me, ke, Ve, Fe, je, Be, $e, Xe, Ue, He, We, Ge, qe, Ke, ze, Je, Qe, Ye, Ze, et, tt, nt, isStaticProperty, rt, isStaticExp, ot, isSimpleIdentifier, st, it, at, getExpSource, isMemberExpressionBrowser, ct, lt, ut, isFnExpressionBrowser, pt, dt, ht, ft, mt, gt, Et, _t, yt, St, vt, Tt, Ct, Nt, bt, xt, Ot, Rt, It, At, Pt, Lt, wt, Dt, aliasHelper, Mt, kt, Vt, trackSlotScopes, buildClientSlotFn, Ft, transformElement, transformSlotOutlet, transformOn$1, transformBind, injectPrefix, transformText, jt, transformOnce, transformModel$1, Bt, transformFilter, $t, transformMemo, transformVBindShorthand, noopDirectiveTransform, Xt, Ut, Ht, Wt, Gt, qt, Kt, zt, Jt, Qt, Yt, Zt, transformStyle, parseInlineCSS, en, tn2, nn, rn, on, transformClick, ignoreSideEffectTags, sn, an, cn, ln, un, setActivePinia, pn, dn, noop$1, fallbackRunWithContext, hn, mn, gn, En, _n, yn, noop, Sn, vn, Tn, Cn, Nn, bn, xn, On, Rn, In, An, Pn, Ln, wn, Dn, Mn, kn, Vn, Fn, jn, Bn, $n, Xn, Un, Hn, Wn, Gn, qn, Kn, zn, Jn, Qn, getLinkClass, Yn, Zn, er, tr, nr, rr, or, sr, ir, ar, useRouter, useRoute, cr, lr, navigateTo, ur, useError, showError, isNuxtError, createError2, routeRulesMatcher, pr, dr, hr, fr, isPlainObject2, mr, gr, Er, _r, yr, Sr, vr, Tr, Cr, Nr, br2, xr, Or, getDefault, getDefaultCachedData, Rr, Ir, Ar, Pr, Lr, wr, Dr, Mr, kr2, Vr, Fr2, jr, Br2, $r;
var init_server = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/server.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_renderer();
    init_shared_esm_bundler();
    globalThis._importMeta_ = globalThis._importMeta_ || { url: "file:///_entry.js", env: {} };
    le = { exports: {} };
    ue = {};
    pe = /* @__PURE__ */ Symbol("");
    de = /* @__PURE__ */ Symbol("");
    he = /* @__PURE__ */ Symbol("");
    fe = /* @__PURE__ */ Symbol("");
    me = /* @__PURE__ */ Symbol("");
    ge = /* @__PURE__ */ Symbol("");
    Ee = /* @__PURE__ */ Symbol("");
    _e = /* @__PURE__ */ Symbol("");
    ye = /* @__PURE__ */ Symbol("");
    Se = /* @__PURE__ */ Symbol("");
    ve = /* @__PURE__ */ Symbol("");
    Te = /* @__PURE__ */ Symbol("");
    Ce = /* @__PURE__ */ Symbol("");
    Ne = /* @__PURE__ */ Symbol("");
    be = /* @__PURE__ */ Symbol("");
    xe = /* @__PURE__ */ Symbol("");
    Oe = /* @__PURE__ */ Symbol("");
    Re = /* @__PURE__ */ Symbol("");
    Ie = /* @__PURE__ */ Symbol("");
    Ae = /* @__PURE__ */ Symbol("");
    Pe = /* @__PURE__ */ Symbol("");
    Le = /* @__PURE__ */ Symbol("");
    we = /* @__PURE__ */ Symbol("");
    De = /* @__PURE__ */ Symbol("");
    Me = /* @__PURE__ */ Symbol("");
    ke = /* @__PURE__ */ Symbol("");
    Ve = /* @__PURE__ */ Symbol("");
    Fe = /* @__PURE__ */ Symbol("");
    je = /* @__PURE__ */ Symbol("");
    Be = /* @__PURE__ */ Symbol("");
    $e = /* @__PURE__ */ Symbol("");
    Xe = /* @__PURE__ */ Symbol("");
    Ue = /* @__PURE__ */ Symbol("");
    He = /* @__PURE__ */ Symbol("");
    We = /* @__PURE__ */ Symbol("");
    Ge = /* @__PURE__ */ Symbol("");
    qe = /* @__PURE__ */ Symbol("");
    Ke = /* @__PURE__ */ Symbol("");
    ze = /* @__PURE__ */ Symbol("");
    Je = { [pe]: "Fragment", [de]: "Teleport", [he]: "Suspense", [fe]: "KeepAlive", [me]: "BaseTransition", [ge]: "openBlock", [Ee]: "createBlock", [_e]: "createElementBlock", [ye]: "createVNode", [Se]: "createElementVNode", [ve]: "createCommentVNode", [Te]: "createTextVNode", [Ce]: "createStaticVNode", [Ne]: "resolveComponent", [be]: "resolveDynamicComponent", [xe]: "resolveDirective", [Oe]: "resolveFilter", [Re]: "withDirectives", [Ie]: "renderList", [Ae]: "renderSlot", [Pe]: "createSlots", [Le]: "toDisplayString", [we]: "mergeProps", [De]: "normalizeClass", [Me]: "normalizeStyle", [ke]: "normalizeProps", [Ve]: "guardReactiveProps", [Fe]: "toHandlers", [je]: "camelize", [Be]: "capitalize", [$e]: "toHandlerKey", [Xe]: "setBlockTracking", [Ue]: "pushScopeId", [He]: "popScopeId", [We]: "withCtx", [Ge]: "unref", [qe]: "isRef", [Ke]: "withMemo", [ze]: "isMemoSame" };
    __name(registerRuntimeHelpers, "registerRuntimeHelpers");
    Qe = { start: { line: 1, column: 1, offset: 0 }, end: { line: 1, column: 1, offset: 0 }, source: "" };
    __name(createRoot, "createRoot");
    __name(createVNodeCall, "createVNodeCall");
    __name(createArrayExpression, "createArrayExpression");
    __name(createObjectExpression, "createObjectExpression");
    __name(createObjectProperty, "createObjectProperty");
    __name(createSimpleExpression, "createSimpleExpression");
    __name(createCompoundExpression, "createCompoundExpression");
    __name(createCallExpression, "createCallExpression");
    __name(createFunctionExpression, "createFunctionExpression");
    __name(createConditionalExpression, "createConditionalExpression");
    __name(createCacheExpression, "createCacheExpression");
    __name(createBlockStatement, "createBlockStatement");
    __name(getVNodeHelper, "getVNodeHelper");
    __name(getVNodeBlockHelper, "getVNodeBlockHelper");
    __name(convertToBlock, "convertToBlock");
    Ye = new Uint8Array([123, 123]);
    Ze = new Uint8Array([125, 125]);
    __name(isTagStartChar, "isTagStartChar");
    __name(isWhitespace, "isWhitespace");
    __name(isEndOfTagSection, "isEndOfTagSection");
    __name(toCharCodes, "toCharCodes");
    et = { Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]), CdataEnd: new Uint8Array([93, 93, 62]), CommentEnd: new Uint8Array([45, 45, 62]), ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]), StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]), TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]), TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]) };
    tt = { COMPILER_IS_ON_ELEMENT: { message: 'Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".', link: "https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html" }, COMPILER_V_BIND_SYNC: { message: /* @__PURE__ */ __name((e9) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${e9}.sync\` should be changed to \`v-model:${e9}\`.`, "message"), link: "https://v3-migration.vuejs.org/breaking-changes/v-model.html" }, COMPILER_V_BIND_OBJECT_ORDER: { message: 'v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.', link: "https://v3-migration.vuejs.org/breaking-changes/v-bind.html" }, COMPILER_V_ON_NATIVE: { message: ".native modifier for v-on has been removed as is no longer necessary.", link: "https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html" }, COMPILER_V_IF_V_FOR_PRECEDENCE: { message: "v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.", link: "https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html" }, COMPILER_NATIVE_TEMPLATE: { message: "<template> with no special directives will render as a native template element instead of its inner content in Vue 3." }, COMPILER_INLINE_TEMPLATE: { message: '"inline-template" has been removed in Vue 3.', link: "https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html" }, COMPILER_FILTERS: { message: 'filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.', link: "https://v3-migration.vuejs.org/breaking-changes/filters.html" } };
    __name(getCompatValue, "getCompatValue");
    __name(isCompatEnabled, "isCompatEnabled");
    __name(checkCompatEnabled, "checkCompatEnabled");
    __name(defaultOnError, "defaultOnError");
    __name(defaultOnWarn, "defaultOnWarn");
    __name(createCompilerError, "createCompilerError");
    nt = { 0: "Illegal comment.", 1: "CDATA section is allowed only in XML context.", 2: "Duplicate attribute.", 3: "End tag cannot have attributes.", 4: "Illegal '/' in tags.", 5: "Unexpected EOF in tag.", 6: "Unexpected EOF in CDATA section.", 7: "Unexpected EOF in comment.", 8: "Unexpected EOF in script.", 9: "Unexpected EOF in tag.", 10: "Incorrectly closed comment.", 11: "Incorrectly opened comment.", 12: "Illegal tag name. Use '&lt;' to print '<'.", 13: "Attribute value was expected.", 14: "End tag name was expected.", 15: "Whitespace was expected.", 16: "Unexpected '<!--' in comment.", 17: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`, 18: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).", 19: "Attribute name cannot start with '='.", 21: "'<?' is allowed only in XML context.", 20: "Unexpected null character.", 22: "Illegal '/' in tags.", 23: "Invalid end tag.", 24: "Element is missing end tag.", 25: "Interpolation end sign was not found.", 27: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.", 26: "Legal directive name was expected.", 28: "v-if/v-else-if is missing expression.", 29: "v-if/else branches must use unique keys.", 30: "v-else/v-else-if has no adjacent v-if or v-else-if.", 31: "v-for is missing expression.", 32: "v-for has invalid expression.", 33: "<template v-for> key should be placed on the <template> tag.", 34: "v-bind is missing expression.", 53: "v-bind with same-name shorthand only allows static argument.", 35: "v-on is missing expression.", 36: "Unexpected custom directive on <slot> outlet.", 37: "Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.", 38: "Duplicate slot names found. ", 39: "Extraneous children found when component already has explicitly named default slot. These children will be ignored.", 40: "v-slot can only be used on components or <template> tags.", 41: "v-model is missing expression.", 42: "v-model value must be a valid JavaScript member expression.", 43: "v-model cannot be used on v-for or v-slot scope variables because they are not writable.", 44: "v-model cannot be used on a prop, because local prop bindings are not writable.\nUse a v-bind binding combined with a v-on listener that emits update:x event instead.", 45: "v-model cannot be used on a const binding because it is not writable.", 46: "Error parsing JavaScript expression: ", 47: "<KeepAlive> expects exactly one child component.", 52: "@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.", 48: '"prefixIdentifiers" option is not supported in this build of compiler.', 49: "ES module mode is not supported in this build of compiler.", 50: '"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.', 51: '"scopeId" option is only supported in module mode.', 54: "" };
    __name(walkBlockDeclarations, "walkBlockDeclarations");
    __name(isForStatement, "isForStatement");
    __name(walkForStatement, "walkForStatement");
    __name(walkSwitchStatement, "walkSwitchStatement");
    __name(extractIdentifiers, "extractIdentifiers");
    isStaticProperty = /* @__PURE__ */ __name((e9) => e9 && ("ObjectProperty" === e9.type || "ObjectMethod" === e9.type) && !e9.computed, "isStaticProperty");
    rt = ["TSAsExpression", "TSTypeAssertion", "TSNonNullExpression", "TSInstantiationExpression", "TSSatisfiesExpression"];
    isStaticExp = /* @__PURE__ */ __name((e9) => 4 === e9.type && e9.isStatic, "isStaticExp");
    __name(isCoreComponent, "isCoreComponent");
    ot = /^$|^\d|[^$\w\xA0-\uFFFF]/;
    isSimpleIdentifier = /* @__PURE__ */ __name((e9) => !ot.test(e9), "isSimpleIdentifier");
    st = /[A-Za-z_$\xA0-\uFFFF]/;
    it = /[.\?\w$\xA0-\uFFFF]/;
    at = /\s+[.[]\s*|\s*[.[]\s+/g;
    getExpSource = /* @__PURE__ */ __name((e9) => 4 === e9.type ? e9.content : e9.loc.source, "getExpSource");
    isMemberExpressionBrowser = /* @__PURE__ */ __name((e9) => {
      const t5 = getExpSource(e9).trim().replace(at, (e10) => e10.trim());
      let n6 = 0, r4 = [], o5 = 0, s6 = 0, i6 = null;
      for (let e10 = 0; e10 < t5.length; e10++) {
        const a5 = t5.charAt(e10);
        switch (n6) {
          case 0:
            if ("[" === a5) r4.push(n6), n6 = 1, o5++;
            else if ("(" === a5) r4.push(n6), n6 = 2, s6++;
            else if (!(0 === e10 ? st : it).test(a5)) return false;
            break;
          case 1:
            "'" === a5 || '"' === a5 || "`" === a5 ? (r4.push(n6), n6 = 3, i6 = a5) : "[" === a5 ? o5++ : "]" === a5 && (--o5 || (n6 = r4.pop()));
            break;
          case 2:
            if ("'" === a5 || '"' === a5 || "`" === a5) r4.push(n6), n6 = 3, i6 = a5;
            else if ("(" === a5) s6++;
            else if (")" === a5) {
              if (e10 === t5.length - 1) return false;
              --s6 || (n6 = r4.pop());
            }
            break;
          case 3:
            a5 === i6 && (n6 = r4.pop(), i6 = null);
        }
      }
      return !o5 && !s6;
    }, "isMemberExpressionBrowser");
    ct = NOOP;
    lt = isMemberExpressionBrowser;
    ut = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/;
    isFnExpressionBrowser = /* @__PURE__ */ __name((e9) => ut.test(getExpSource(e9)), "isFnExpressionBrowser");
    pt = NOOP;
    dt = isFnExpressionBrowser;
    __name(advancePositionWithMutation, "advancePositionWithMutation");
    __name(findDir, "findDir");
    __name(findProp, "findProp");
    __name(isStaticArgOf, "isStaticArgOf");
    __name(hasDynamicKeyVBind, "hasDynamicKeyVBind");
    __name(isText$1, "isText$1");
    __name(isVPre, "isVPre");
    __name(isVSlot, "isVSlot");
    __name(isTemplateNode, "isTemplateNode");
    __name(isSlotOutlet, "isSlotOutlet");
    ht = /* @__PURE__ */ new Set([ke, Ve]);
    __name(getUnnormalizedProps, "getUnnormalizedProps");
    __name(injectProp, "injectProp");
    __name(hasProp, "hasProp");
    __name(toValidAssetId, "toValidAssetId");
    __name(getMemoedVNodeCall, "getMemoedVNodeCall");
    ft = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
    __name(isAllWhitespace, "isAllWhitespace");
    __name(isWhitespaceText, "isWhitespaceText");
    __name(isCommentOrWhitespace, "isCommentOrWhitespace");
    mt = { parseMode: "base", ns: 0, delimiters: ["{{", "}}"], getNamespace: /* @__PURE__ */ __name(() => 0, "getNamespace"), isVoidTag: NO, isPreTag: NO, isIgnoreNewlineTag: NO, isCustomElement: NO, onError: defaultOnError, onWarn: defaultOnWarn, comments: false, prefixIdentifiers: false };
    gt = mt;
    Et = null;
    _t = "";
    yt = null;
    St = null;
    vt = "";
    Tt = -1;
    Ct = -1;
    Nt = 0;
    bt = false;
    xt = null;
    Ot = [];
    Rt = new class {
      constructor(e9, t5) {
        this.stack = e9, this.cbs = t5, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = false, this.inXML = false, this.inVPre = false, this.newlines = [], this.mode = 0, this.delimiterOpen = Ye, this.delimiterClose = Ze, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
      }
      get inSFCRoot() {
        return 2 === this.mode && 0 === this.stack.length;
      }
      reset() {
        this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = false, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = Ye, this.delimiterClose = Ze;
      }
      getPos(e9) {
        let t5 = 1, n6 = e9 + 1;
        const r4 = this.newlines.length;
        let o5 = -1;
        if (r4 > 100) {
          let t6 = -1, n7 = r4;
          for (; t6 + 1 < n7; ) {
            const r5 = t6 + n7 >>> 1;
            this.newlines[r5] < e9 ? t6 = r5 : n7 = r5;
          }
          o5 = t6;
        } else for (let t6 = r4 - 1; t6 >= 0; t6--) if (e9 > this.newlines[t6]) {
          o5 = t6;
          break;
        }
        return o5 >= 0 && (t5 = o5 + 2, n6 = e9 - this.newlines[o5]), { column: n6, line: t5, offset: e9 };
      }
      peek() {
        return this.buffer.charCodeAt(this.index + 1);
      }
      stateText(e9) {
        60 === e9 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : this.inVPre || e9 !== this.delimiterOpen[0] || (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(e9));
      }
      stateInterpolationOpen(e9) {
        if (e9 === this.delimiterOpen[this.delimiterIndex]) if (this.delimiterIndex === this.delimiterOpen.length - 1) {
          const e10 = this.index + 1 - this.delimiterOpen.length;
          e10 > this.sectionStart && this.cbs.ontext(this.sectionStart, e10), this.state = 3, this.sectionStart = e10;
        } else this.delimiterIndex++;
        else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(e9)) : (this.state = 1, this.stateText(e9));
      }
      stateInterpolation(e9) {
        e9 === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(e9));
      }
      stateInterpolationClose(e9) {
        e9 === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(e9));
      }
      stateSpecialStartSequence(e9) {
        const t5 = this.sequenceIndex === this.currentSequence.length;
        if (t5 ? isEndOfTagSection(e9) : (32 | e9) === this.currentSequence[this.sequenceIndex]) {
          if (!t5) return void this.sequenceIndex++;
        } else this.inRCDATA = false;
        this.sequenceIndex = 0, this.state = 6, this.stateInTagName(e9);
      }
      stateInRCDATA(e9) {
        if (this.sequenceIndex === this.currentSequence.length) {
          if (62 === e9 || isWhitespace(e9)) {
            const t5 = this.index - this.currentSequence.length;
            if (this.sectionStart < t5) {
              const e10 = this.index;
              this.index = t5, this.cbs.ontext(this.sectionStart, t5), this.index = e10;
            }
            return this.sectionStart = t5 + 2, this.stateInClosingTagName(e9), void (this.inRCDATA = false);
          }
          this.sequenceIndex = 0;
        }
        (32 | e9) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : 0 === this.sequenceIndex ? this.currentSequence === et.TitleEnd || this.currentSequence === et.TextareaEnd && !this.inSFCRoot ? this.inVPre || e9 !== this.delimiterOpen[0] || (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(e9)) : this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.sequenceIndex = Number(60 === e9);
      }
      stateCDATASequence(e9) {
        e9 === et.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === et.Cdata.length && (this.state = 28, this.currentSequence = et.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(e9));
      }
      fastForwardTo(e9) {
        for (; ++this.index < this.buffer.length; ) {
          const t5 = this.buffer.charCodeAt(this.index);
          if (10 === t5 && this.newlines.push(this.index), t5 === e9) return true;
        }
        return this.index = this.buffer.length - 1, false;
      }
      stateInCommentLike(e9) {
        e9 === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === et.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : 0 === this.sequenceIndex ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : e9 !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
      }
      startSpecial(e9, t5) {
        this.enterRCDATA(e9, t5), this.state = 31;
      }
      enterRCDATA(e9, t5) {
        this.inRCDATA = true, this.currentSequence = e9, this.sequenceIndex = t5;
      }
      stateBeforeTagName(e9) {
        33 === e9 ? (this.state = 22, this.sectionStart = this.index + 1) : 63 === e9 ? (this.state = 24, this.sectionStart = this.index + 1) : isTagStartChar(e9) ? (this.sectionStart = this.index, 0 === this.mode ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : this.state = 116 === e9 ? 30 : 115 === e9 ? 29 : 6) : 47 === e9 ? this.state = 8 : (this.state = 1, this.stateText(e9));
      }
      stateInTagName(e9) {
        isEndOfTagSection(e9) && this.handleTagName(e9);
      }
      stateInSFCRootTagName(e9) {
        if (isEndOfTagSection(e9)) {
          const t5 = this.buffer.slice(this.sectionStart, this.index);
          "template" !== t5 && this.enterRCDATA(toCharCodes("</" + t5), 0), this.handleTagName(e9);
        }
      }
      handleTagName(e9) {
        this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(e9);
      }
      stateBeforeClosingTagName(e9) {
        isWhitespace(e9) || (62 === e9 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = isTagStartChar(e9) ? 9 : 27, this.sectionStart = this.index));
      }
      stateInClosingTagName(e9) {
        (62 === e9 || isWhitespace(e9)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(e9));
      }
      stateAfterClosingTagName(e9) {
        62 === e9 && (this.state = 1, this.sectionStart = this.index + 1);
      }
      stateBeforeAttrName(e9) {
        62 === e9 ? (this.cbs.onopentagend(this.index), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : 47 === e9 ? this.state = 7 : 60 === e9 && 47 === this.peek() ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : isWhitespace(e9) || this.handleAttrStart(e9);
      }
      handleAttrStart(e9) {
        118 === e9 && 45 === this.peek() ? (this.state = 13, this.sectionStart = this.index) : 46 === e9 || 58 === e9 || 64 === e9 || 35 === e9 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
      }
      stateInSelfClosingTag(e9) {
        62 === e9 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = false) : isWhitespace(e9) || (this.state = 11, this.stateBeforeAttrName(e9));
      }
      stateInAttrName(e9) {
        (61 === e9 || isEndOfTagSection(e9)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(e9));
      }
      stateInDirName(e9) {
        61 === e9 || isEndOfTagSection(e9) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(e9)) : 58 === e9 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : 46 === e9 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
      }
      stateInDirArg(e9) {
        61 === e9 || isEndOfTagSection(e9) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(e9)) : 91 === e9 ? this.state = 15 : 46 === e9 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
      }
      stateInDynamicDirArg(e9) {
        93 === e9 ? this.state = 14 : (61 === e9 || isEndOfTagSection(e9)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(e9));
      }
      stateInDirModifier(e9) {
        61 === e9 || isEndOfTagSection(e9) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(e9)) : 46 === e9 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
      }
      handleAttrNameEnd(e9) {
        this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(e9);
      }
      stateAfterAttrName(e9) {
        61 === e9 ? this.state = 18 : 47 === e9 || 62 === e9 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(e9)) : isWhitespace(e9) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(e9));
      }
      stateBeforeAttrValue(e9) {
        34 === e9 ? (this.state = 19, this.sectionStart = this.index + 1) : 39 === e9 ? (this.state = 20, this.sectionStart = this.index + 1) : isWhitespace(e9) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(e9));
      }
      handleInAttrValue(e9, t5) {
        (e9 === t5 || this.fastForwardTo(t5)) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(34 === t5 ? 3 : 2, this.index + 1), this.state = 11);
      }
      stateInAttrValueDoubleQuotes(e9) {
        this.handleInAttrValue(e9, 34);
      }
      stateInAttrValueSingleQuotes(e9) {
        this.handleInAttrValue(e9, 39);
      }
      stateInAttrValueNoQuotes(e9) {
        isWhitespace(e9) || 62 === e9 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(e9)) : 39 !== e9 && 60 !== e9 && 61 !== e9 && 96 !== e9 || this.cbs.onerr(18, this.index);
      }
      stateBeforeDeclaration(e9) {
        91 === e9 ? (this.state = 26, this.sequenceIndex = 0) : this.state = 45 === e9 ? 25 : 23;
      }
      stateInDeclaration(e9) {
        (62 === e9 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
      }
      stateInProcessingInstruction(e9) {
        (62 === e9 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
      }
      stateBeforeComment(e9) {
        45 === e9 ? (this.state = 28, this.currentSequence = et.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
      }
      stateInSpecialComment(e9) {
        (62 === e9 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
      }
      stateBeforeSpecialS(e9) {
        e9 === et.ScriptEnd[3] ? this.startSpecial(et.ScriptEnd, 4) : e9 === et.StyleEnd[3] ? this.startSpecial(et.StyleEnd, 4) : (this.state = 6, this.stateInTagName(e9));
      }
      stateBeforeSpecialT(e9) {
        e9 === et.TitleEnd[3] ? this.startSpecial(et.TitleEnd, 4) : e9 === et.TextareaEnd[3] ? this.startSpecial(et.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(e9));
      }
      startEntity() {
      }
      stateInEntity() {
      }
      parse(e9) {
        for (this.buffer = e9; this.index < this.buffer.length; ) {
          const e10 = this.buffer.charCodeAt(this.index);
          switch (10 === e10 && 33 !== this.state && this.newlines.push(this.index), this.state) {
            case 1:
              this.stateText(e10);
              break;
            case 2:
              this.stateInterpolationOpen(e10);
              break;
            case 3:
              this.stateInterpolation(e10);
              break;
            case 4:
              this.stateInterpolationClose(e10);
              break;
            case 31:
              this.stateSpecialStartSequence(e10);
              break;
            case 32:
              this.stateInRCDATA(e10);
              break;
            case 26:
              this.stateCDATASequence(e10);
              break;
            case 19:
              this.stateInAttrValueDoubleQuotes(e10);
              break;
            case 12:
              this.stateInAttrName(e10);
              break;
            case 13:
              this.stateInDirName(e10);
              break;
            case 14:
              this.stateInDirArg(e10);
              break;
            case 15:
              this.stateInDynamicDirArg(e10);
              break;
            case 16:
              this.stateInDirModifier(e10);
              break;
            case 28:
              this.stateInCommentLike(e10);
              break;
            case 27:
              this.stateInSpecialComment(e10);
              break;
            case 11:
              this.stateBeforeAttrName(e10);
              break;
            case 6:
              this.stateInTagName(e10);
              break;
            case 34:
              this.stateInSFCRootTagName(e10);
              break;
            case 9:
              this.stateInClosingTagName(e10);
              break;
            case 5:
              this.stateBeforeTagName(e10);
              break;
            case 17:
              this.stateAfterAttrName(e10);
              break;
            case 20:
              this.stateInAttrValueSingleQuotes(e10);
              break;
            case 18:
              this.stateBeforeAttrValue(e10);
              break;
            case 8:
              this.stateBeforeClosingTagName(e10);
              break;
            case 10:
              this.stateAfterClosingTagName(e10);
              break;
            case 29:
              this.stateBeforeSpecialS(e10);
              break;
            case 30:
              this.stateBeforeSpecialT(e10);
              break;
            case 21:
              this.stateInAttrValueNoQuotes(e10);
              break;
            case 7:
              this.stateInSelfClosingTag(e10);
              break;
            case 23:
              this.stateInDeclaration(e10);
              break;
            case 22:
              this.stateBeforeDeclaration(e10);
              break;
            case 25:
              this.stateBeforeComment(e10);
              break;
            case 24:
              this.stateInProcessingInstruction(e10);
              break;
            case 33:
              this.stateInEntity();
          }
          this.index++;
        }
        this.cleanup(), this.finish();
      }
      cleanup() {
        this.sectionStart !== this.index && (1 === this.state || 32 === this.state && 0 === this.sequenceIndex ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : 19 !== this.state && 20 !== this.state && 21 !== this.state || (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
      }
      finish() {
        this.handleTrailingData(), this.cbs.onend();
      }
      handleTrailingData() {
        const e9 = this.buffer.length;
        this.sectionStart >= e9 || (28 === this.state ? this.currentSequence === et.CdataEnd ? this.cbs.oncdata(this.sectionStart, e9) : this.cbs.oncomment(this.sectionStart, e9) : 6 === this.state || 11 === this.state || 18 === this.state || 17 === this.state || 12 === this.state || 13 === this.state || 14 === this.state || 15 === this.state || 16 === this.state || 20 === this.state || 19 === this.state || 21 === this.state || 9 === this.state || this.cbs.ontext(this.sectionStart, e9));
      }
      emitCodePoint(e9, t5) {
      }
    }(Ot, { onerr: emitError, ontext(e9, t5) {
      onText(getSlice(e9, t5), e9, t5);
    }, ontextentity(e9, t5, n6) {
      onText(e9, t5, n6);
    }, oninterpolation(e9, t5) {
      if (bt) return onText(getSlice(e9, t5), e9, t5);
      let n6 = e9 + Rt.delimiterOpen.length, r4 = t5 - Rt.delimiterClose.length;
      for (; isWhitespace(_t.charCodeAt(n6)); ) n6++;
      for (; isWhitespace(_t.charCodeAt(r4 - 1)); ) r4--;
      let o5 = getSlice(n6, r4);
      o5.includes("&") && (o5 = gt.decodeEntities(o5, false)), addNode({ type: 5, content: createExp(o5, false, getLoc(n6, r4)), loc: getLoc(e9, t5) });
    }, onopentagname(e9, t5) {
      const n6 = getSlice(e9, t5);
      yt = { type: 1, tag: n6, ns: gt.getNamespace(n6, Ot[0], gt.ns), tagType: 0, props: [], children: [], loc: getLoc(e9 - 1, t5), codegenNode: void 0 };
    }, onopentagend(e9) {
      endOpenTag(e9);
    }, onclosetag(e9, t5) {
      const n6 = getSlice(e9, t5);
      if (!gt.isVoidTag(n6)) {
        let r4 = false;
        for (let e10 = 0; e10 < Ot.length; e10++) {
          if (Ot[e10].tag.toLowerCase() === n6.toLowerCase()) {
            r4 = true, e10 > 0 && emitError(24, Ot[0].loc.start.offset);
            for (let n7 = 0; n7 <= e10; n7++) {
              onCloseTag(Ot.shift(), t5, n7 < e10);
            }
            break;
          }
        }
        r4 || emitError(23, backTrack(e9, 60));
      }
    }, onselfclosingtag(e9) {
      const t5 = yt.tag;
      yt.isSelfClosing = true, endOpenTag(e9), Ot[0] && Ot[0].tag === t5 && onCloseTag(Ot.shift(), e9);
    }, onattribname(e9, t5) {
      St = { type: 6, name: getSlice(e9, t5), nameLoc: getLoc(e9, t5), value: void 0, loc: getLoc(e9) };
    }, ondirname(e9, t5) {
      const n6 = getSlice(e9, t5), r4 = "." === n6 || ":" === n6 ? "bind" : "@" === n6 ? "on" : "#" === n6 ? "slot" : n6.slice(2);
      if (bt || "" !== r4 || emitError(26, e9), bt || "" === r4) St = { type: 6, name: n6, nameLoc: getLoc(e9, t5), value: void 0, loc: getLoc(e9) };
      else if (St = { type: 7, name: r4, rawName: n6, exp: void 0, arg: void 0, modifiers: "." === n6 ? [createSimpleExpression("prop")] : [], loc: getLoc(e9) }, "pre" === r4) {
        bt = Rt.inVPre = true, xt = yt;
        const e10 = yt.props;
        for (let t6 = 0; t6 < e10.length; t6++) 7 === e10[t6].type && (e10[t6] = dirToAttr(e10[t6]));
      }
    }, ondirarg(e9, t5) {
      if (e9 === t5) return;
      const n6 = getSlice(e9, t5);
      if (bt && !isVPre(St)) St.name += n6, setLocEnd(St.nameLoc, t5);
      else {
        const r4 = "[" !== n6[0];
        St.arg = createExp(r4 ? n6 : n6.slice(1, -1), r4, getLoc(e9, t5), r4 ? 3 : 0);
      }
    }, ondirmodifier(e9, t5) {
      const n6 = getSlice(e9, t5);
      if (bt && !isVPre(St)) St.name += "." + n6, setLocEnd(St.nameLoc, t5);
      else if ("slot" === St.name) {
        const e10 = St.arg;
        e10 && (e10.content += "." + n6, setLocEnd(e10.loc, t5));
      } else {
        const r4 = createSimpleExpression(n6, true, getLoc(e9, t5));
        St.modifiers.push(r4);
      }
    }, onattribdata(e9, t5) {
      vt += getSlice(e9, t5), Tt < 0 && (Tt = e9), Ct = t5;
    }, onattribentity(e9, t5, n6) {
      vt += e9, Tt < 0 && (Tt = t5), Ct = n6;
    }, onattribnameend(e9) {
      const t5 = St.loc.start.offset, n6 = getSlice(t5, e9);
      7 === St.type && (St.rawName = n6), yt.props.some((e10) => (7 === e10.type ? e10.rawName : e10.name) === n6) && emitError(2, t5);
    }, onattribend(e9, t5) {
      if (yt && St) {
        if (setLocEnd(St.loc, t5), 0 !== e9) if (vt.includes("&") && (vt = gt.decodeEntities(vt, true)), 6 === St.type) "class" === St.name && (vt = condense(vt).trim()), 1 !== e9 || vt || emitError(13, t5), St.value = { type: 2, content: vt, loc: 1 === e9 ? getLoc(Tt, Ct) : getLoc(Tt - 1, Ct + 1) }, Rt.inSFCRoot && "template" === yt.tag && "lang" === St.name && vt && "html" !== vt && Rt.enterRCDATA(toCharCodes("</template"), 0);
        else {
          let e10 = 0;
          St.exp = createExp(vt, false, getLoc(Tt, Ct), 0, e10), "for" === St.name && (St.forParseResult = (function(e11) {
            const t7 = e11.loc, n6 = e11.content, r4 = n6.match(ft);
            if (!r4) return;
            const [, o5, s6] = r4, createAliasExpression = /* @__PURE__ */ __name((e12, n7, r5 = false) => {
              const o6 = t7.start.offset + n7;
              return createExp(e12, false, getLoc(o6, o6 + e12.length), 0, r5 ? 1 : 0);
            }, "createAliasExpression"), i6 = { source: createAliasExpression(s6.trim(), n6.indexOf(s6, o5.length)), value: void 0, key: void 0, index: void 0, finalized: false };
            let a5 = o5.trim().replace(At, "").trim();
            const c4 = o5.indexOf(a5), l4 = a5.match(It);
            if (l4) {
              a5 = a5.replace(It, "").trim();
              const e12 = l4[1].trim();
              let t8;
              if (e12 && (t8 = n6.indexOf(e12, c4 + a5.length), i6.key = createAliasExpression(e12, t8, true)), l4[2]) {
                const r5 = l4[2].trim();
                r5 && (i6.index = createAliasExpression(r5, n6.indexOf(r5, i6.key ? t8 + e12.length : c4 + a5.length), true));
              }
            }
            a5 && (i6.value = createAliasExpression(a5, c4, true));
            return i6;
          })(St.exp));
          let t6 = -1;
          "bind" === St.name && (t6 = St.modifiers.findIndex((e11) => "sync" === e11.content)) > -1 && checkCompatEnabled("COMPILER_V_BIND_SYNC", gt, St.loc, St.arg.loc.source) && (St.name = "model", St.modifiers.splice(t6, 1));
        }
        7 === St.type && "pre" === St.name || yt.props.push(St);
      }
      vt = "", Tt = Ct = -1;
    }, oncomment(e9, t5) {
      gt.comments && addNode({ type: 3, content: getSlice(e9, t5), loc: getLoc(e9 - 4, t5 + 3) });
    }, onend() {
      const e9 = _t.length;
      for (let t5 = 0; t5 < Ot.length; t5++) onCloseTag(Ot[t5], e9 - 1), emitError(24, Ot[t5].loc.start.offset);
    }, oncdata(e9, t5) {
      0 !== (Ot[0] ? Ot[0].ns : gt.ns) ? onText(getSlice(e9, t5), e9, t5) : emitError(1, e9 - 9);
    }, onprocessinginstruction(e9) {
      0 === (Ot[0] ? Ot[0].ns : gt.ns) && emitError(21, e9 - 1);
    } });
    It = /,([^,}\]]*)(?:,([^,}\]]*))?$/;
    At = /^\(|\)$/g;
    __name(getSlice, "getSlice");
    __name(endOpenTag, "endOpenTag");
    __name(onText, "onText");
    __name(onCloseTag, "onCloseTag");
    __name(backTrack, "backTrack");
    Pt = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
    __name(isFragmentTemplate, "isFragmentTemplate");
    Lt = /\r\n/g;
    __name(condenseWhitespace, "condenseWhitespace");
    __name(hasNewlineChar, "hasNewlineChar");
    __name(condense, "condense");
    __name(addNode, "addNode");
    __name(getLoc, "getLoc");
    __name(setLocEnd, "setLocEnd");
    __name(dirToAttr, "dirToAttr");
    __name(createExp, "createExp");
    __name(emitError, "emitError");
    __name(baseParse, "baseParse");
    __name(cacheStatic, "cacheStatic");
    __name(getSingleElementRoot, "getSingleElementRoot");
    __name(walk, "walk");
    __name(getConstantType, "getConstantType");
    wt = /* @__PURE__ */ new Set([De, Me, ke, Ve]);
    __name(getConstantTypeOfHelperCall, "getConstantTypeOfHelperCall");
    __name(getGeneratedPropsConstantType, "getGeneratedPropsConstantType");
    __name(getNodeProps, "getNodeProps");
    __name(createTransformContext, "createTransformContext");
    __name(transform, "transform");
    __name(traverseNode, "traverseNode");
    __name(createStructuralDirectiveTransform, "createStructuralDirectiveTransform");
    Dt = "/*@__PURE__*/";
    aliasHelper = /* @__PURE__ */ __name((e9) => `${Je[e9]}: _${Je[e9]}`, "aliasHelper");
    __name(generate, "generate");
    __name(genAssets, "genAssets");
    __name(genNodeListAsArray, "genNodeListAsArray");
    __name(genNodeList, "genNodeList");
    __name(genNode, "genNode");
    __name(genExpression, "genExpression");
    __name(genCompoundExpression, "genCompoundExpression");
    __name(genExpressionAsPropertyKey, "genExpressionAsPropertyKey");
    new RegExp("\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b");
    __name(processExpression, "processExpression");
    Mt = createStructuralDirectiveTransform(/^(?:if|else|else-if)$/, (e9, t5, n6) => processIf(e9, t5, n6, (e10, t6, r4) => {
      const o5 = n6.parent.children;
      let s6 = o5.indexOf(e10), i6 = 0;
      for (; s6-- >= 0; ) {
        const e11 = o5[s6];
        e11 && 9 === e11.type && (i6 += e11.branches.length);
      }
      return () => {
        if (r4) e10.codegenNode = createCodegenNodeForBranch(t6, i6, n6);
        else {
          const r5 = (function(e11) {
            for (; ; ) if (19 === e11.type) {
              if (19 !== e11.alternate.type) return e11;
              e11 = e11.alternate;
            } else 20 === e11.type && (e11 = e11.value);
          })(e10.codegenNode);
          r5.alternate = createCodegenNodeForBranch(t6, i6 + e10.branches.length - 1, n6);
        }
      };
    }));
    __name(processIf, "processIf");
    __name(createIfBranch, "createIfBranch");
    __name(createCodegenNodeForBranch, "createCodegenNodeForBranch");
    __name(createChildrenCodegenNode, "createChildrenCodegenNode");
    kt = createStructuralDirectiveTransform("for", (e9, t5, n6) => {
      const { helper: r4, removeHelper: o5 } = n6;
      return processFor(e9, t5, n6, (t6) => {
        const s6 = createCallExpression(r4(Ie), [t6.source]), i6 = isTemplateNode(e9), a5 = findDir(e9, "memo"), c4 = findProp(e9, "key", false, true);
        c4 && c4.type;
        let l4 = c4 && (6 === c4.type ? c4.value ? createSimpleExpression(c4.value.content, true) : void 0 : c4.exp);
        const u6 = l4 ? createObjectProperty("key", l4) : null, p6 = 4 === t6.source.type && t6.source.constType > 0, d5 = p6 ? 64 : c4 ? 128 : 256;
        return t6.codegenNode = createVNodeCall(n6, r4(pe), void 0, s6, d5, void 0, void 0, true, !p6, false, e9.loc), () => {
          let c5;
          const { children: d6 } = t6, h5 = 1 !== d6.length || 1 !== d6[0].type, f4 = isSlotOutlet(e9) ? e9 : i6 && 1 === e9.children.length && isSlotOutlet(e9.children[0]) ? e9.children[0] : null;
          if (f4 ? (c5 = f4.codegenNode, i6 && u6 && injectProp(c5, u6, n6)) : h5 ? c5 = createVNodeCall(n6, r4(pe), u6 ? createObjectExpression([u6]) : void 0, e9.children, 64, void 0, void 0, true, void 0, false) : (c5 = d6[0].codegenNode, i6 && u6 && injectProp(c5, u6, n6), c5.isBlock !== !p6 && (c5.isBlock ? (o5(ge), o5(getVNodeBlockHelper(n6.inSSR, c5.isComponent))) : o5(getVNodeHelper(n6.inSSR, c5.isComponent))), c5.isBlock = !p6, c5.isBlock ? (r4(ge), r4(getVNodeBlockHelper(n6.inSSR, c5.isComponent))) : r4(getVNodeHelper(n6.inSSR, c5.isComponent))), a5) {
            const e10 = createFunctionExpression(createForLoopParams(t6.parseResult, [createSimpleExpression("_cached")]));
            e10.body = createBlockStatement([createCompoundExpression(["const _memo = (", a5.exp, ")"]), createCompoundExpression(["if (_cached && _cached.el", ...l4 ? [" && _cached.key === ", l4] : [], ` && ${n6.helperString(ze)}(_cached, _memo)) return _cached`]), createCompoundExpression(["const _item = ", c5]), createSimpleExpression("_item.memo = _memo"), createSimpleExpression("return _item")]), s6.arguments.push(e10, createSimpleExpression("_cache"), createSimpleExpression(String(n6.cached.length))), n6.cached.push(null);
          } else s6.arguments.push(createFunctionExpression(createForLoopParams(t6.parseResult), c5, true));
        };
      });
    });
    __name(processFor, "processFor");
    __name(finalizeForParseResult, "finalizeForParseResult");
    __name(createForLoopParams, "createForLoopParams");
    Vt = createSimpleExpression("undefined", false);
    trackSlotScopes = /* @__PURE__ */ __name((e9, t5) => {
      if (1 === e9.type && (1 === e9.tagType || 3 === e9.tagType)) {
        const n6 = findDir(e9, "slot");
        if (n6) return n6.exp, t5.scopes.vSlot++, () => {
          t5.scopes.vSlot--;
        };
      }
    }, "trackSlotScopes");
    buildClientSlotFn = /* @__PURE__ */ __name((e9, t5, n6, r4) => createFunctionExpression(e9, n6, false, true, n6.length ? n6[0].loc : r4), "buildClientSlotFn");
    __name(buildSlots, "buildSlots");
    __name(buildDynamicSlot, "buildDynamicSlot");
    __name(hasForwardedSlots, "hasForwardedSlots");
    Ft = /* @__PURE__ */ new WeakMap();
    transformElement = /* @__PURE__ */ __name((e9, t5) => function() {
      if (1 !== (e9 = t5.currentNode).type || 0 !== e9.tagType && 1 !== e9.tagType) return;
      const { tag: n6, props: r4 } = e9, o5 = 1 === e9.tagType;
      let s6 = o5 ? resolveComponentType(e9, t5) : `"${n6}"`;
      const i6 = isObject(s6) && s6.callee === be;
      let a5, c4, l4, u6, p6, d5 = 0, h5 = i6 || s6 === de || s6 === he || !o5 && ("svg" === n6 || "foreignObject" === n6 || "math" === n6);
      if (r4.length > 0) {
        const n7 = buildProps(e9, t5, void 0, o5, i6);
        a5 = n7.props, d5 = n7.patchFlag, u6 = n7.dynamicPropNames;
        const r5 = n7.directives;
        p6 = r5 && r5.length ? createArrayExpression(r5.map((e10) => buildDirectiveArgs(e10, t5))) : void 0, n7.shouldUseBlock && (h5 = true);
      }
      if (e9.children.length > 0) {
        s6 === fe && (h5 = true, d5 |= 1024);
        if (o5 && s6 !== de && s6 !== fe) {
          const { slots: n7, hasDynamicSlots: r5 } = buildSlots(e9, t5);
          c4 = n7, r5 && (d5 |= 1024);
        } else if (1 === e9.children.length && s6 !== de) {
          const n7 = e9.children[0], r5 = n7.type, o6 = 5 === r5 || 8 === r5;
          o6 && 0 === getConstantType(n7, t5) && (d5 |= 1), c4 = o6 || 2 === r5 ? n7 : e9.children;
        } else c4 = e9.children;
      }
      u6 && u6.length && (l4 = (function(e10) {
        let t6 = "[";
        for (let n7 = 0, r5 = e10.length; n7 < r5; n7++) t6 += JSON.stringify(e10[n7]), n7 < r5 - 1 && (t6 += ", ");
        return t6 + "]";
      })(u6)), e9.codegenNode = createVNodeCall(t5, s6, a5, c4, 0 === d5 ? void 0 : d5, l4, p6, !!h5, false, o5, e9.loc);
    }, "transformElement");
    __name(resolveComponentType, "resolveComponentType");
    __name(buildProps, "buildProps");
    __name(dedupeProperties, "dedupeProperties");
    __name(mergeAsArray, "mergeAsArray");
    __name(buildDirectiveArgs, "buildDirectiveArgs");
    __name(isComponentTag, "isComponentTag");
    transformSlotOutlet = /* @__PURE__ */ __name((e9, t5) => {
      if (isSlotOutlet(e9)) {
        const { children: n6, loc: r4 } = e9, { slotName: o5, slotProps: s6 } = processSlotOutlet(e9, t5), i6 = [t5.prefixIdentifiers ? "_ctx.$slots" : "$slots", o5, "{}", "undefined", "true"];
        let a5 = 2;
        s6 && (i6[2] = s6, a5 = 3), n6.length && (i6[3] = createFunctionExpression([], n6, false, false, r4), a5 = 4), t5.scopeId && !t5.slotted && (a5 = 5), i6.splice(a5), e9.codegenNode = createCallExpression(t5.helper(Ae), i6, r4);
      }
    }, "transformSlotOutlet");
    __name(processSlotOutlet, "processSlotOutlet");
    transformOn$1 = /* @__PURE__ */ __name((e9, t5, n6, r4) => {
      const { loc: o5, modifiers: s6, arg: i6 } = e9;
      let a5;
      if (e9.exp || s6.length || n6.onError(createCompilerError(35, o5)), 4 === i6.type) if (i6.isStatic) {
        let e10 = i6.content;
        e10.startsWith("vue:") && (e10 = `vnode-${e10.slice(4)}`);
        a5 = createSimpleExpression(0 !== t5.tagType || e10.startsWith("vnode") || !/[A-Z]/.test(e10) ? u(p(e10)) : `on:${e10}`, true, i6.loc);
      } else a5 = createCompoundExpression([`${n6.helperString($e)}(`, i6, ")"]);
      else a5 = i6, a5.children.unshift(`${n6.helperString($e)}(`), a5.children.push(")");
      let c4 = e9.exp;
      c4 && !c4.content.trim() && (c4 = void 0);
      let l4 = n6.cacheHandlers && !c4 && !n6.inVOnce;
      if (c4) {
        const e10 = lt(c4), t6 = !(e10 || dt(c4)), n7 = c4.content.includes(";");
        (t6 || l4 && e10) && (c4 = createCompoundExpression([`${t6 ? "$event" : "(...args)"} => ${n7 ? "{" : "("}`, c4, n7 ? "}" : ")"]));
      }
      let u6 = { props: [createObjectProperty(a5, c4 || createSimpleExpression("() => {}", false, o5))] };
      return r4 && (u6 = r4(u6)), l4 && (u6.props[0].value = n6.cache(u6.props[0].value)), u6.props.forEach((e10) => e10.key.isHandlerKey = true), u6;
    }, "transformOn$1");
    transformBind = /* @__PURE__ */ __name((e9, t5, n6) => {
      const { modifiers: r4, loc: o5 } = e9, s6 = e9.arg;
      let { exp: i6 } = e9;
      return i6 && 4 === i6.type && !i6.content.trim() && (i6 = void 0), 4 !== s6.type ? (s6.children.unshift("("), s6.children.push(') || ""')) : s6.isStatic || (s6.content = s6.content ? `${s6.content} || ""` : '""'), r4.some((e10) => "camel" === e10.content) && (4 === s6.type ? s6.isStatic ? s6.content = p(s6.content) : s6.content = `${n6.helperString(je)}(${s6.content})` : (s6.children.unshift(`${n6.helperString(je)}(`), s6.children.push(")"))), n6.inSSR || (r4.some((e10) => "prop" === e10.content) && injectPrefix(s6, "."), r4.some((e10) => "attr" === e10.content) && injectPrefix(s6, "^")), { props: [createObjectProperty(s6, i6)] };
    }, "transformBind");
    injectPrefix = /* @__PURE__ */ __name((e9, t5) => {
      4 === e9.type ? e9.isStatic ? e9.content = t5 + e9.content : e9.content = `\`${t5}\${${e9.content}}\`` : (e9.children.unshift(`'${t5}' + (`), e9.children.push(")"));
    }, "injectPrefix");
    transformText = /* @__PURE__ */ __name((e9, t5) => {
      if (0 === e9.type || 1 === e9.type || 11 === e9.type || 10 === e9.type) return () => {
        const n6 = e9.children;
        let r4, o5 = false;
        for (let e10 = 0; e10 < n6.length; e10++) {
          const t6 = n6[e10];
          if (isText$1(t6)) {
            o5 = true;
            for (let o6 = e10 + 1; o6 < n6.length; o6++) {
              const s6 = n6[o6];
              if (!isText$1(s6)) {
                r4 = void 0;
                break;
              }
              r4 || (r4 = n6[e10] = createCompoundExpression([t6], t6.loc)), r4.children.push(" + ", s6), n6.splice(o6, 1), o6--;
            }
          }
        }
        if (o5 && (1 !== n6.length || 0 !== e9.type && (1 !== e9.type || 0 !== e9.tagType || e9.props.find((e10) => 7 === e10.type && !t5.directiveTransforms[e10.name]) || "template" === e9.tag))) for (let e10 = 0; e10 < n6.length; e10++) {
          const r5 = n6[e10];
          if (isText$1(r5) || 8 === r5.type) {
            const o6 = [];
            2 === r5.type && " " === r5.content || o6.push(r5), t5.ssr || 0 !== getConstantType(r5, t5) || o6.push("1"), n6[e10] = { type: 12, content: r5, loc: r5.loc, codegenNode: createCallExpression(t5.helper(Te), o6) };
          }
        }
      };
    }, "transformText");
    jt = /* @__PURE__ */ new WeakSet();
    transformOnce = /* @__PURE__ */ __name((e9, t5) => {
      if (1 === e9.type && findDir(e9, "once", true)) {
        if (jt.has(e9) || t5.inVOnce || t5.inSSR) return;
        return jt.add(e9), t5.inVOnce = true, t5.helper(Xe), () => {
          t5.inVOnce = false;
          const e10 = t5.currentNode;
          e10.codegenNode && (e10.codegenNode = t5.cache(e10.codegenNode, true, true));
        };
      }
    }, "transformOnce");
    transformModel$1 = /* @__PURE__ */ __name((e9, t5, n6) => {
      const { exp: r4, arg: o5 } = e9;
      if (!r4) return n6.onError(createCompilerError(41, e9.loc)), createTransformProps();
      const s6 = r4.loc.source.trim(), i6 = 4 === r4.type ? r4.content : s6, a5 = n6.bindingMetadata[s6];
      if ("props" === a5 || "props-aliased" === a5) return n6.onError(createCompilerError(44, r4.loc)), createTransformProps();
      if ("literal-const" === a5 || "setup-const" === a5) return n6.onError(createCompilerError(45, r4.loc)), createTransformProps();
      if (!i6.trim() || !lt(r4)) return n6.onError(createCompilerError(42, r4.loc)), createTransformProps();
      const c4 = o5 || createSimpleExpression("modelValue", true), l4 = o5 ? isStaticExp(o5) ? `onUpdate:${p(o5.content)}` : createCompoundExpression(['"onUpdate:" + ', o5]) : "onUpdate:modelValue";
      let u6;
      u6 = createCompoundExpression([`${n6.isTS ? "($event: any)" : "$event"} => ((`, r4, ") = $event)"]);
      const p6 = [createObjectProperty(c4, e9.exp), createObjectProperty(l4, u6)];
      if (e9.modifiers.length && 1 === t5.tagType) {
        const t6 = e9.modifiers.map((e10) => e10.content).map((e10) => (isSimpleIdentifier(e10) ? e10 : JSON.stringify(e10)) + ": true").join(", "), n7 = o5 ? isStaticExp(o5) ? `${o5.content}Modifiers` : createCompoundExpression([o5, ' + "Modifiers"']) : "modelModifiers";
        p6.push(createObjectProperty(n7, createSimpleExpression(`{ ${t6} }`, false, e9.loc, 2)));
      }
      return createTransformProps(p6);
    }, "transformModel$1");
    __name(createTransformProps, "createTransformProps");
    Bt = /[\w).+\-_$\]]/;
    transformFilter = /* @__PURE__ */ __name((e9, t5) => {
      isCompatEnabled("COMPILER_FILTERS", t5) && (5 === e9.type ? rewriteFilter(e9.content, t5) : 1 === e9.type && e9.props.forEach((e10) => {
        7 === e10.type && "for" !== e10.name && e10.exp && rewriteFilter(e10.exp, t5);
      }));
    }, "transformFilter");
    __name(rewriteFilter, "rewriteFilter");
    __name(parseFilter, "parseFilter");
    __name(wrapFilter, "wrapFilter");
    $t = /* @__PURE__ */ new WeakSet();
    transformMemo = /* @__PURE__ */ __name((e9, t5) => {
      if (1 === e9.type) {
        const n6 = findDir(e9, "memo");
        if (!n6 || $t.has(e9) || t5.inSSR) return;
        return $t.add(e9), () => {
          const r4 = e9.codegenNode || t5.currentNode.codegenNode;
          r4 && 13 === r4.type && (1 !== e9.tagType && convertToBlock(r4, t5), e9.codegenNode = createCallExpression(t5.helper(Ke), [n6.exp, createFunctionExpression(void 0, r4), "_cache", String(t5.cached.length)]), t5.cached.push(null));
        };
      }
    }, "transformMemo");
    transformVBindShorthand = /* @__PURE__ */ __name((e9, t5) => {
      if (1 === e9.type) {
        for (const n6 of e9.props) if (7 === n6.type && "bind" === n6.name && (!n6.exp || 4 === n6.exp.type && !n6.exp.content.trim()) && n6.arg) {
          const e10 = n6.arg;
          if (4 === e10.type && e10.isStatic) {
            const t6 = p(e10.content);
            (st.test(t6[0]) || "-" === t6[0]) && (n6.exp = createSimpleExpression(t6, false, e10.loc));
          } else t5.onError(createCompilerError(53, e10.loc)), n6.exp = createSimpleExpression("", true, e10.loc);
        }
      }
    }, "transformVBindShorthand");
    __name(getBaseTransformPreset, "getBaseTransformPreset");
    __name(baseCompile, "baseCompile");
    noopDirectiveTransform = /* @__PURE__ */ __name(() => ({ props: [] }), "noopDirectiveTransform");
    Xt = /* @__PURE__ */ Symbol("");
    Ut = /* @__PURE__ */ Symbol("");
    Ht = /* @__PURE__ */ Symbol("");
    Wt = /* @__PURE__ */ Symbol("");
    Gt = /* @__PURE__ */ Symbol("");
    qt = /* @__PURE__ */ Symbol("");
    Kt = /* @__PURE__ */ Symbol("");
    zt = /* @__PURE__ */ Symbol("");
    Jt = /* @__PURE__ */ Symbol("");
    Qt = /* @__PURE__ */ Symbol("");
    registerRuntimeHelpers({ [Xt]: "vModelRadio", [Ut]: "vModelCheckbox", [Ht]: "vModelText", [Wt]: "vModelSelect", [Gt]: "vModelDynamic", [qt]: "withModifiers", [Kt]: "withKeys", [zt]: "vShow", [Jt]: "Transition", [Qt]: "TransitionGroup" });
    Zt = { parseMode: "html", isVoidTag: C, isNativeTag: /* @__PURE__ */ __name((e9) => k(e9) || O(e9) || M(e9), "isNativeTag"), isPreTag: /* @__PURE__ */ __name((e9) => "pre" === e9, "isPreTag"), isIgnoreNewlineTag: /* @__PURE__ */ __name((e9) => "pre" === e9 || "textarea" === e9, "isIgnoreNewlineTag"), decodeEntities: /* @__PURE__ */ __name(function(e9, t5 = false) {
      return Yt || (Yt = document.createElement("div")), t5 ? (Yt.innerHTML = `<div foo="${e9.replace(/"/g, "&quot;")}">`, Yt.children[0].getAttribute("foo")) : (Yt.innerHTML = e9, Yt.textContent);
    }, "decodeEntities"), isBuiltInComponent: /* @__PURE__ */ __name((e9) => "Transition" === e9 || "transition" === e9 ? Jt : "TransitionGroup" === e9 || "transition-group" === e9 ? Qt : void 0, "isBuiltInComponent"), getNamespace(e9, t5, n6) {
      let r4 = t5 ? t5.ns : n6;
      if (t5 && 2 === r4) if ("annotation-xml" === t5.tag) {
        if ("svg" === e9) return 1;
        t5.props.some((e10) => 6 === e10.type && "encoding" === e10.name && null != e10.value && ("text/html" === e10.value.content || "application/xhtml+xml" === e10.value.content)) && (r4 = 0);
      } else /^m(?:[ions]|text)$/.test(t5.tag) && "mglyph" !== e9 && "malignmark" !== e9 && (r4 = 0);
      else t5 && 1 === r4 && ("foreignObject" !== t5.tag && "desc" !== t5.tag && "title" !== t5.tag || (r4 = 0));
      if (0 === r4) {
        if ("svg" === e9) return 1;
        if ("math" === e9) return 2;
      }
      return r4;
    } };
    transformStyle = /* @__PURE__ */ __name((e9) => {
      1 === e9.type && e9.props.forEach((t5, n6) => {
        6 === t5.type && "style" === t5.name && t5.value && (e9.props[n6] = { type: 7, name: "bind", arg: createSimpleExpression("style", true, t5.loc), exp: parseInlineCSS(t5.value.content, t5.loc), modifiers: [], loc: t5.loc });
      });
    }, "transformStyle");
    parseInlineCSS = /* @__PURE__ */ __name((e9, t5) => {
      const n6 = parseStringStyle(e9);
      return createSimpleExpression(JSON.stringify(n6), false, t5, 3);
    }, "parseInlineCSS");
    __name(createDOMCompilerError, "createDOMCompilerError");
    en = { 54: "v-html is missing expression.", 55: "v-html will override element children.", 56: "v-text is missing expression.", 57: "v-text will override element children.", 58: "v-model can only be used on <input>, <textarea> and <select> elements.", 59: "v-model argument is not supported on plain elements.", 60: "v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.", 61: "Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.", 62: "v-show is missing expression.", 63: "<Transition> expects exactly one child element or component.", 64: "Tags with side effect (<script> and <style>) are ignored in client component templates." };
    tn2 = makeMap("passive,once,capture");
    nn = makeMap("stop,prevent,self,ctrl,shift,alt,meta,exact,middle");
    rn = makeMap("left,right");
    on = makeMap("onkeyup,onkeydown,onkeypress");
    transformClick = /* @__PURE__ */ __name((e9, t5) => isStaticExp(e9) && "onclick" === e9.content.toLowerCase() ? createSimpleExpression(t5, true) : 4 !== e9.type ? createCompoundExpression(["(", e9, `) === "onClick" ? "${t5}" : (`, e9, ")"]) : e9, "transformClick");
    ignoreSideEffectTags = /* @__PURE__ */ __name((e9, t5) => {
      1 !== e9.type || 0 !== e9.tagType || "script" !== e9.tag && "style" !== e9.tag || t5.removeNode();
    }, "ignoreSideEffectTags");
    sn = [transformStyle];
    an = { cloak: noopDirectiveTransform, html: /* @__PURE__ */ __name((e9, t5, n6) => {
      const { exp: r4, loc: o5 } = e9;
      return r4 || n6.onError(createDOMCompilerError(54, o5)), t5.children.length && (n6.onError(createDOMCompilerError(55, o5)), t5.children.length = 0), { props: [createObjectProperty(createSimpleExpression("innerHTML", true, o5), r4 || createSimpleExpression("", true))] };
    }, "html"), text: /* @__PURE__ */ __name((e9, t5, n6) => {
      const { exp: r4, loc: o5 } = e9;
      return r4 || n6.onError(createDOMCompilerError(56, o5)), t5.children.length && (n6.onError(createDOMCompilerError(57, o5)), t5.children.length = 0), { props: [createObjectProperty(createSimpleExpression("textContent", true), r4 ? getConstantType(r4, n6) > 0 ? r4 : createCallExpression(n6.helperString(Le), [r4], o5) : createSimpleExpression("", true))] };
    }, "text"), model: /* @__PURE__ */ __name((e9, t5, n6) => {
      const r4 = transformModel$1(e9, t5, n6);
      if (!r4.props.length || 1 === t5.tagType) return r4;
      e9.arg && n6.onError(createDOMCompilerError(59, e9.arg.loc));
      const { tag: o5 } = t5, s6 = n6.isCustomElement(o5);
      if ("input" === o5 || "textarea" === o5 || "select" === o5 || s6) {
        let i6 = Ht, a5 = false;
        if ("input" === o5 || s6) {
          const r5 = findProp(t5, "type");
          if (r5) {
            if (7 === r5.type) i6 = Gt;
            else if (r5.value) switch (r5.value.content) {
              case "radio":
                i6 = Xt;
                break;
              case "checkbox":
                i6 = Ut;
                break;
              case "file":
                a5 = true, n6.onError(createDOMCompilerError(60, e9.loc));
            }
          } else hasDynamicKeyVBind(t5) && (i6 = Gt);
        } else "select" === o5 && (i6 = Wt);
        a5 || (r4.needRuntime = n6.helper(i6));
      } else n6.onError(createDOMCompilerError(58, e9.loc));
      return r4.props = r4.props.filter((e10) => !(4 === e10.key.type && "modelValue" === e10.key.content)), r4;
    }, "model"), on: /* @__PURE__ */ __name((e9, t5, n6) => transformOn$1(e9, t5, n6, (t6) => {
      const { modifiers: r4 } = e9;
      if (!r4.length) return t6;
      let { key: o5, value: s6 } = t6.props[0];
      const { keyModifiers: i6, nonKeyModifiers: a5, eventOptionModifiers: c4 } = ((e10, t7, n7) => {
        const r5 = [], o6 = [], s7 = [];
        for (let i7 = 0; i7 < t7.length; i7++) {
          const a6 = t7[i7].content;
          "native" === a6 && checkCompatEnabled("COMPILER_V_ON_NATIVE", n7) || tn2(a6) ? s7.push(a6) : rn(a6) ? isStaticExp(e10) ? on(e10.content.toLowerCase()) ? r5.push(a6) : o6.push(a6) : (r5.push(a6), o6.push(a6)) : nn(a6) ? o6.push(a6) : r5.push(a6);
        }
        return { keyModifiers: r5, nonKeyModifiers: o6, eventOptionModifiers: s7 };
      })(o5, r4, n6, e9.loc);
      if (a5.includes("right") && (o5 = transformClick(o5, "onContextmenu")), a5.includes("middle") && (o5 = transformClick(o5, "onMouseup")), a5.length && (s6 = createCallExpression(n6.helper(qt), [s6, JSON.stringify(a5)])), !i6.length || isStaticExp(o5) && !on(o5.content.toLowerCase()) || (s6 = createCallExpression(n6.helper(Kt), [s6, JSON.stringify(i6)])), c4.length) {
        const e10 = c4.map(f).join("");
        o5 = isStaticExp(o5) ? createSimpleExpression(`${o5.content}${e10}`, true) : createCompoundExpression(["(", o5, `) + "${e10}"`]);
      }
      return { props: [createObjectProperty(o5, s6)] };
    }), "on"), show: /* @__PURE__ */ __name((e9, t5, n6) => {
      const { exp: r4, loc: o5 } = e9;
      return r4 || n6.onError(createDOMCompilerError(62, o5)), { props: [], needRuntime: n6.helper(zt) };
    }, "show") };
    cn = Object.freeze(Object.defineProperty({ __proto__: null, BASE_TRANSITION: me, BindingTypes: { DATA: "data", PROPS: "props", PROPS_ALIASED: "props-aliased", SETUP_LET: "setup-let", SETUP_CONST: "setup-const", SETUP_REACTIVE_CONST: "setup-reactive-const", SETUP_MAYBE_REF: "setup-maybe-ref", SETUP_REF: "setup-ref", OPTIONS: "options", LITERAL_CONST: "literal-const" }, CAMELIZE: je, CAPITALIZE: Be, CREATE_BLOCK: Ee, CREATE_COMMENT: ve, CREATE_ELEMENT_BLOCK: _e, CREATE_ELEMENT_VNODE: Se, CREATE_SLOTS: Pe, CREATE_STATIC: Ce, CREATE_TEXT: Te, CREATE_VNODE: ye, CompilerDeprecationTypes: { COMPILER_IS_ON_ELEMENT: "COMPILER_IS_ON_ELEMENT", COMPILER_V_BIND_SYNC: "COMPILER_V_BIND_SYNC", COMPILER_V_BIND_OBJECT_ORDER: "COMPILER_V_BIND_OBJECT_ORDER", COMPILER_V_ON_NATIVE: "COMPILER_V_ON_NATIVE", COMPILER_V_IF_V_FOR_PRECEDENCE: "COMPILER_V_IF_V_FOR_PRECEDENCE", COMPILER_NATIVE_TEMPLATE: "COMPILER_NATIVE_TEMPLATE", COMPILER_INLINE_TEMPLATE: "COMPILER_INLINE_TEMPLATE", COMPILER_FILTERS: "COMPILER_FILTERS" }, ConstantTypes: { NOT_CONSTANT: 0, 0: "NOT_CONSTANT", CAN_SKIP_PATCH: 1, 1: "CAN_SKIP_PATCH", CAN_CACHE: 2, 2: "CAN_CACHE", CAN_STRINGIFY: 3, 3: "CAN_STRINGIFY" }, DOMDirectiveTransforms: an, DOMErrorCodes: { X_V_HTML_NO_EXPRESSION: 54, 54: "X_V_HTML_NO_EXPRESSION", X_V_HTML_WITH_CHILDREN: 55, 55: "X_V_HTML_WITH_CHILDREN", X_V_TEXT_NO_EXPRESSION: 56, 56: "X_V_TEXT_NO_EXPRESSION", X_V_TEXT_WITH_CHILDREN: 57, 57: "X_V_TEXT_WITH_CHILDREN", X_V_MODEL_ON_INVALID_ELEMENT: 58, 58: "X_V_MODEL_ON_INVALID_ELEMENT", X_V_MODEL_ARG_ON_ELEMENT: 59, 59: "X_V_MODEL_ARG_ON_ELEMENT", X_V_MODEL_ON_FILE_INPUT_ELEMENT: 60, 60: "X_V_MODEL_ON_FILE_INPUT_ELEMENT", X_V_MODEL_UNNECESSARY_VALUE: 61, 61: "X_V_MODEL_UNNECESSARY_VALUE", X_V_SHOW_NO_EXPRESSION: 62, 62: "X_V_SHOW_NO_EXPRESSION", X_TRANSITION_INVALID_CHILDREN: 63, 63: "X_TRANSITION_INVALID_CHILDREN", X_IGNORED_SIDE_EFFECT_TAG: 64, 64: "X_IGNORED_SIDE_EFFECT_TAG", __EXTEND_POINT__: 65, 65: "__EXTEND_POINT__" }, DOMErrorMessages: en, DOMNodeTransforms: sn, ElementTypes: { ELEMENT: 0, 0: "ELEMENT", COMPONENT: 1, 1: "COMPONENT", SLOT: 2, 2: "SLOT", TEMPLATE: 3, 3: "TEMPLATE" }, ErrorCodes: { ABRUPT_CLOSING_OF_EMPTY_COMMENT: 0, 0: "ABRUPT_CLOSING_OF_EMPTY_COMMENT", CDATA_IN_HTML_CONTENT: 1, 1: "CDATA_IN_HTML_CONTENT", DUPLICATE_ATTRIBUTE: 2, 2: "DUPLICATE_ATTRIBUTE", END_TAG_WITH_ATTRIBUTES: 3, 3: "END_TAG_WITH_ATTRIBUTES", END_TAG_WITH_TRAILING_SOLIDUS: 4, 4: "END_TAG_WITH_TRAILING_SOLIDUS", EOF_BEFORE_TAG_NAME: 5, 5: "EOF_BEFORE_TAG_NAME", EOF_IN_CDATA: 6, 6: "EOF_IN_CDATA", EOF_IN_COMMENT: 7, 7: "EOF_IN_COMMENT", EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT: 8, 8: "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT", EOF_IN_TAG: 9, 9: "EOF_IN_TAG", INCORRECTLY_CLOSED_COMMENT: 10, 10: "INCORRECTLY_CLOSED_COMMENT", INCORRECTLY_OPENED_COMMENT: 11, 11: "INCORRECTLY_OPENED_COMMENT", INVALID_FIRST_CHARACTER_OF_TAG_NAME: 12, 12: "INVALID_FIRST_CHARACTER_OF_TAG_NAME", MISSING_ATTRIBUTE_VALUE: 13, 13: "MISSING_ATTRIBUTE_VALUE", MISSING_END_TAG_NAME: 14, 14: "MISSING_END_TAG_NAME", MISSING_WHITESPACE_BETWEEN_ATTRIBUTES: 15, 15: "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES", NESTED_COMMENT: 16, 16: "NESTED_COMMENT", UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME: 17, 17: "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME", UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE: 18, 18: "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE", UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME: 19, 19: "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME", UNEXPECTED_NULL_CHARACTER: 20, 20: "UNEXPECTED_NULL_CHARACTER", UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME: 21, 21: "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME", UNEXPECTED_SOLIDUS_IN_TAG: 22, 22: "UNEXPECTED_SOLIDUS_IN_TAG", X_INVALID_END_TAG: 23, 23: "X_INVALID_END_TAG", X_MISSING_END_TAG: 24, 24: "X_MISSING_END_TAG", X_MISSING_INTERPOLATION_END: 25, 25: "X_MISSING_INTERPOLATION_END", X_MISSING_DIRECTIVE_NAME: 26, 26: "X_MISSING_DIRECTIVE_NAME", X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END: 27, 27: "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END", X_V_IF_NO_EXPRESSION: 28, 28: "X_V_IF_NO_EXPRESSION", X_V_IF_SAME_KEY: 29, 29: "X_V_IF_SAME_KEY", X_V_ELSE_NO_ADJACENT_IF: 30, 30: "X_V_ELSE_NO_ADJACENT_IF", X_V_FOR_NO_EXPRESSION: 31, 31: "X_V_FOR_NO_EXPRESSION", X_V_FOR_MALFORMED_EXPRESSION: 32, 32: "X_V_FOR_MALFORMED_EXPRESSION", X_V_FOR_TEMPLATE_KEY_PLACEMENT: 33, 33: "X_V_FOR_TEMPLATE_KEY_PLACEMENT", X_V_BIND_NO_EXPRESSION: 34, 34: "X_V_BIND_NO_EXPRESSION", X_V_ON_NO_EXPRESSION: 35, 35: "X_V_ON_NO_EXPRESSION", X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET: 36, 36: "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET", X_V_SLOT_MIXED_SLOT_USAGE: 37, 37: "X_V_SLOT_MIXED_SLOT_USAGE", X_V_SLOT_DUPLICATE_SLOT_NAMES: 38, 38: "X_V_SLOT_DUPLICATE_SLOT_NAMES", X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN: 39, 39: "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN", X_V_SLOT_MISPLACED: 40, 40: "X_V_SLOT_MISPLACED", X_V_MODEL_NO_EXPRESSION: 41, 41: "X_V_MODEL_NO_EXPRESSION", X_V_MODEL_MALFORMED_EXPRESSION: 42, 42: "X_V_MODEL_MALFORMED_EXPRESSION", X_V_MODEL_ON_SCOPE_VARIABLE: 43, 43: "X_V_MODEL_ON_SCOPE_VARIABLE", X_V_MODEL_ON_PROPS: 44, 44: "X_V_MODEL_ON_PROPS", X_V_MODEL_ON_CONST: 45, 45: "X_V_MODEL_ON_CONST", X_INVALID_EXPRESSION: 46, 46: "X_INVALID_EXPRESSION", X_KEEP_ALIVE_INVALID_CHILDREN: 47, 47: "X_KEEP_ALIVE_INVALID_CHILDREN", X_PREFIX_ID_NOT_SUPPORTED: 48, 48: "X_PREFIX_ID_NOT_SUPPORTED", X_MODULE_MODE_NOT_SUPPORTED: 49, 49: "X_MODULE_MODE_NOT_SUPPORTED", X_CACHE_HANDLER_NOT_SUPPORTED: 50, 50: "X_CACHE_HANDLER_NOT_SUPPORTED", X_SCOPE_ID_NOT_SUPPORTED: 51, 51: "X_SCOPE_ID_NOT_SUPPORTED", X_VNODE_HOOKS: 52, 52: "X_VNODE_HOOKS", X_V_BIND_INVALID_SAME_NAME_ARGUMENT: 53, 53: "X_V_BIND_INVALID_SAME_NAME_ARGUMENT", __EXTEND_POINT__: 54, 54: "__EXTEND_POINT__" }, FRAGMENT: pe, GUARD_REACTIVE_PROPS: Ve, IS_MEMO_SAME: ze, IS_REF: qe, KEEP_ALIVE: fe, MERGE_PROPS: we, NORMALIZE_CLASS: De, NORMALIZE_PROPS: ke, NORMALIZE_STYLE: Me, Namespaces: { HTML: 0, 0: "HTML", SVG: 1, 1: "SVG", MATH_ML: 2, 2: "MATH_ML" }, NodeTypes: { ROOT: 0, 0: "ROOT", ELEMENT: 1, 1: "ELEMENT", TEXT: 2, 2: "TEXT", COMMENT: 3, 3: "COMMENT", SIMPLE_EXPRESSION: 4, 4: "SIMPLE_EXPRESSION", INTERPOLATION: 5, 5: "INTERPOLATION", ATTRIBUTE: 6, 6: "ATTRIBUTE", DIRECTIVE: 7, 7: "DIRECTIVE", COMPOUND_EXPRESSION: 8, 8: "COMPOUND_EXPRESSION", IF: 9, 9: "IF", IF_BRANCH: 10, 10: "IF_BRANCH", FOR: 11, 11: "FOR", TEXT_CALL: 12, 12: "TEXT_CALL", VNODE_CALL: 13, 13: "VNODE_CALL", JS_CALL_EXPRESSION: 14, 14: "JS_CALL_EXPRESSION", JS_OBJECT_EXPRESSION: 15, 15: "JS_OBJECT_EXPRESSION", JS_PROPERTY: 16, 16: "JS_PROPERTY", JS_ARRAY_EXPRESSION: 17, 17: "JS_ARRAY_EXPRESSION", JS_FUNCTION_EXPRESSION: 18, 18: "JS_FUNCTION_EXPRESSION", JS_CONDITIONAL_EXPRESSION: 19, 19: "JS_CONDITIONAL_EXPRESSION", JS_CACHE_EXPRESSION: 20, 20: "JS_CACHE_EXPRESSION", JS_BLOCK_STATEMENT: 21, 21: "JS_BLOCK_STATEMENT", JS_TEMPLATE_LITERAL: 22, 22: "JS_TEMPLATE_LITERAL", JS_IF_STATEMENT: 23, 23: "JS_IF_STATEMENT", JS_ASSIGNMENT_EXPRESSION: 24, 24: "JS_ASSIGNMENT_EXPRESSION", JS_SEQUENCE_EXPRESSION: 25, 25: "JS_SEQUENCE_EXPRESSION", JS_RETURN_STATEMENT: 26, 26: "JS_RETURN_STATEMENT" }, OPEN_BLOCK: ge, POP_SCOPE_ID: He, PUSH_SCOPE_ID: Ue, RENDER_LIST: Ie, RENDER_SLOT: Ae, RESOLVE_COMPONENT: Ne, RESOLVE_DIRECTIVE: xe, RESOLVE_DYNAMIC_COMPONENT: be, RESOLVE_FILTER: Oe, SET_BLOCK_TRACKING: Xe, SUSPENSE: he, TELEPORT: de, TO_DISPLAY_STRING: Le, TO_HANDLERS: Fe, TO_HANDLER_KEY: $e, TRANSITION: Jt, TRANSITION_GROUP: Qt, TS_NODE_TYPES: rt, UNREF: Ge, V_MODEL_CHECKBOX: Ut, V_MODEL_DYNAMIC: Gt, V_MODEL_RADIO: Xt, V_MODEL_SELECT: Wt, V_MODEL_TEXT: Ht, V_ON_WITH_KEYS: Kt, V_ON_WITH_MODIFIERS: qt, V_SHOW: zt, WITH_CTX: We, WITH_DIRECTIVES: Re, WITH_MEMO: Ke, advancePositionWithClone: /* @__PURE__ */ __name(function(e9, t5, n6 = t5.length) {
      return advancePositionWithMutation({ offset: e9.offset, line: e9.line, column: e9.column }, t5, n6);
    }, "advancePositionWithClone"), advancePositionWithMutation, assert: /* @__PURE__ */ __name(function(e9, t5) {
      if (!e9) throw new Error(t5 || "unexpected compiler condition");
    }, "assert"), baseCompile, baseParse, buildDirectiveArgs, buildProps, buildSlots, checkCompatEnabled, compile: /* @__PURE__ */ __name(function(e9, t5 = {}) {
      return baseCompile(e9, n({}, Zt, t5, { nodeTransforms: [ignoreSideEffectTags, ...sn, ...t5.nodeTransforms || []], directiveTransforms: n({}, an, t5.directiveTransforms || {}), transformHoist: null }));
    }, "compile"), convertToBlock, createArrayExpression, createAssignmentExpression: /* @__PURE__ */ __name(function(e9, t5) {
      return { type: 24, left: e9, right: t5, loc: Qe };
    }, "createAssignmentExpression"), createBlockStatement, createCacheExpression, createCallExpression, createCompilerError, createCompoundExpression, createConditionalExpression, createDOMCompilerError, createForLoopParams, createFunctionExpression, createIfStatement: /* @__PURE__ */ __name(function(e9, t5, n6) {
      return { type: 23, test: e9, consequent: t5, alternate: n6, loc: Qe };
    }, "createIfStatement"), createInterpolation: /* @__PURE__ */ __name(function(e9, t5) {
      return { type: 5, loc: t5, content: isString(e9) ? createSimpleExpression(e9, false, t5) : e9 };
    }, "createInterpolation"), createObjectExpression, createObjectProperty, createReturnStatement: /* @__PURE__ */ __name(function(e9) {
      return { type: 26, returns: e9, loc: Qe };
    }, "createReturnStatement"), createRoot, createSequenceExpression: /* @__PURE__ */ __name(function(e9) {
      return { type: 25, expressions: e9, loc: Qe };
    }, "createSequenceExpression"), createSimpleExpression, createStructuralDirectiveTransform, createTemplateLiteral: /* @__PURE__ */ __name(function(e9) {
      return { type: 22, elements: e9, loc: Qe };
    }, "createTemplateLiteral"), createTransformContext, createVNodeCall, errorMessages: nt, extractIdentifiers, findDir, findProp, forAliasRE: ft, generate, generateCodeFrame, getBaseTransformPreset, getConstantType, getMemoedVNodeCall, getVNodeBlockHelper, getVNodeHelper, hasDynamicKeyVBind, hasScopeRef: /* @__PURE__ */ __name(function hasScopeRef(e9, t5) {
      if (!e9 || 0 === Object.keys(t5).length) return false;
      switch (e9.type) {
        case 1:
          for (let n6 = 0; n6 < e9.props.length; n6++) {
            const r4 = e9.props[n6];
            if (7 === r4.type && (hasScopeRef(r4.arg, t5) || hasScopeRef(r4.exp, t5))) return true;
          }
          return e9.children.some((e10) => hasScopeRef(e10, t5));
        case 11:
          return !!hasScopeRef(e9.source, t5) || e9.children.some((e10) => hasScopeRef(e10, t5));
        case 9:
          return e9.branches.some((e10) => hasScopeRef(e10, t5));
        case 10:
          return !!hasScopeRef(e9.condition, t5) || e9.children.some((e10) => hasScopeRef(e10, t5));
        case 4:
          return !e9.isStatic && isSimpleIdentifier(e9.content) && !!t5[e9.content];
        case 8:
          return e9.children.some((e10) => isObject(e10) && hasScopeRef(e10, t5));
        case 5:
        case 12:
          return hasScopeRef(e9.content, t5);
        default:
          return false;
      }
    }, "hasScopeRef"), helperNameMap: Je, injectProp, isAllWhitespace, isCommentOrWhitespace, isCoreComponent, isFnExpression: dt, isFnExpressionBrowser, isFnExpressionNode: pt, isFunctionType: /* @__PURE__ */ __name((e9) => /Function(?:Expression|Declaration)$|Method$/.test(e9.type), "isFunctionType"), isInDestructureAssignment: /* @__PURE__ */ __name(function(e9, t5) {
      if (e9 && ("ObjectProperty" === e9.type || "ArrayPattern" === e9.type)) {
        let e10 = t5.length;
        for (; e10--; ) {
          const n6 = t5[e10];
          if ("AssignmentExpression" === n6.type) return true;
          if ("ObjectProperty" !== n6.type && !n6.type.endsWith("Pattern")) break;
        }
      }
      return false;
    }, "isInDestructureAssignment"), isInNewExpression: /* @__PURE__ */ __name(function(e9) {
      let t5 = e9.length;
      for (; t5--; ) {
        const n6 = e9[t5];
        if ("NewExpression" === n6.type) return true;
        if ("MemberExpression" !== n6.type) break;
      }
      return false;
    }, "isInNewExpression"), isMemberExpression: lt, isMemberExpressionBrowser, isMemberExpressionNode: ct, isReferencedIdentifier: /* @__PURE__ */ __name(function(e9, t5, n6) {
      return false;
    }, "isReferencedIdentifier"), isSimpleIdentifier, isSlotOutlet, isStaticArgOf, isStaticExp, isStaticProperty, isStaticPropertyKey: /* @__PURE__ */ __name((e9, t5) => isStaticProperty(t5) && t5.key === e9, "isStaticPropertyKey"), isTemplateNode, isText: isText$1, isVPre, isVSlot, isWhitespaceText, locStub: Qe, noopDirectiveTransform, parse: /* @__PURE__ */ __name(function(e9, t5 = {}) {
      return baseParse(e9, n({}, Zt, t5));
    }, "parse"), parserOptions: Zt, processExpression, processFor, processIf, processSlotOutlet, registerRuntimeHelpers, resolveComponentType, stringifyExpression: /* @__PURE__ */ __name(function stringifyExpression(e9) {
      return isString(e9) ? e9 : 4 === e9.type ? e9.content : e9.children.map(stringifyExpression).join("");
    }, "stringifyExpression"), toValidAssetId, trackSlotScopes, trackVForSlotScopes: /* @__PURE__ */ __name((e9, t5) => {
      let n6;
      if (isTemplateNode(e9) && e9.props.some(isVSlot) && (n6 = findDir(e9, "for"))) {
        const e10 = n6.forParseResult;
        if (e10) {
          finalizeForParseResult(e10);
          const { value: n7, key: r4, index: o5 } = e10, { addIdentifiers: s6, removeIdentifiers: i6 } = t5;
          return n7 && s6(n7), r4 && s6(r4), o5 && s6(o5), () => {
            n7 && i6(n7), r4 && i6(r4), o5 && i6(o5);
          };
        }
      }
    }, "trackVForSlotScopes"), transform, transformBind, transformElement, transformExpression: /* @__PURE__ */ __name((e9, t5) => {
      if (5 === e9.type) e9.content = processExpression(e9.content, t5);
      else if (1 === e9.type) {
        const n6 = findDir(e9, "memo");
        for (let r4 = 0; r4 < e9.props.length; r4++) {
          const o5 = e9.props[r4];
          if (7 === o5.type && "for" !== o5.name) {
            const r5 = o5.exp, s6 = o5.arg;
            !r5 || 4 !== r5.type || "on" === o5.name && s6 || n6 && t5.vForMemoKeyedNodes.has(e9) && s6 && 4 === s6.type && "key" === s6.content || (o5.exp = processExpression(r5, t5, "slot" === o5.name)), s6 && 4 === s6.type && !s6.isStatic && (o5.arg = processExpression(s6, t5));
          }
        }
      }
    }, "transformExpression"), transformModel: transformModel$1, transformOn: transformOn$1, transformStyle, transformVBindShorthand, traverseNode, unwrapTSNode: /* @__PURE__ */ __name(function unwrapTSNode(e9) {
      return rt.includes(e9.type) ? unwrapTSNode(e9.expression) : e9;
    }, "unwrapTSNode"), validFirstIdentCharRE: st, walkBlockDeclarations, walkFunctionParams: /* @__PURE__ */ __name(function(e9, t5) {
      for (const n6 of e9.params) for (const e10 of extractIdentifiers(n6)) t5(e10);
    }, "walkFunctionParams"), walkIdentifiers: /* @__PURE__ */ __name(function(e9, t5, n6 = false, r4 = [], o5 = /* @__PURE__ */ Object.create(null)) {
    }, "walkIdentifiers"), warnDeprecation: /* @__PURE__ */ __name(function(e9, t5, n6, ...r4) {
      if ("suppress-warning" === getCompatValue(e9, t5)) return;
      const { message: o5, link: s6 } = tt[e9], i6 = `(deprecation ${e9}) ${"function" == typeof o5 ? o5(...r4) : o5}${s6 ? `
  Details: ${s6}` : ""}`, a5 = new SyntaxError(i6);
      a5.code = e9, n6 && (a5.loc = n6), t5.onWarn(a5);
    }, "warnDeprecation") }, Symbol.toStringTag, { value: "Module" }));
    !(function(e9) {
      Object.defineProperty(e9, "__esModule", { value: true });
      var t5 = cn, n6 = br, r4 = j;
      function _interopNamespaceDefault(e10) {
        var t6 = /* @__PURE__ */ Object.create(null);
        if (e10) for (var n7 in e10) t6[n7] = e10[n7];
        return t6.default = e10, Object.freeze(t6);
      }
      __name(_interopNamespaceDefault, "_interopNamespaceDefault");
      var o5 = _interopNamespaceDefault(n6);
      const s6 = /* @__PURE__ */ Object.create(null);
      function compileToFunction(e10, n7) {
        if (!r4.isString(e10)) {
          if (!e10.nodeType) return r4.NOOP;
          e10 = e10.innerHTML;
        }
        const i6 = r4.genCacheKey(e10, n7), a5 = s6[i6];
        if (a5) return a5;
        if ("#" === e10[0]) {
          const t6 = document.querySelector(e10);
          e10 = t6 ? t6.innerHTML : "";
        }
        const c4 = r4.extend({ hoistStatic: true, onError: void 0, onWarn: r4.NOOP }, n7);
        c4.isCustomElement || "undefined" == typeof customElements || (c4.isCustomElement = (e11) => !!customElements.get(e11));
        const { code: l4 } = t5.compile(e10, c4), u6 = new Function("Vue", l4)(o5);
        return u6._rc = true, s6[i6] = u6;
      }
      __name(compileToFunction, "compileToFunction");
      n6.registerRuntimeCompiler(compileToFunction), e9.compile = compileToFunction, Object.keys(n6).forEach(function(t6) {
        "default" === t6 || Object.prototype.hasOwnProperty.call(e9, t6) || (e9[t6] = n6[t6]);
      });
    })(ue), le.exports = ue;
    ln = le.exports;
    setActivePinia = /* @__PURE__ */ __name((e9) => un = e9, "setActivePinia");
    pn = /* @__PURE__ */ Symbol();
    __name(isPlainObject$1, "isPlainObject$1");
    !(function(e9) {
      e9.direct = "direct", e9.patchObject = "patch object", e9.patchFunction = "patch function";
    })(dn || (dn = {}));
    noop$1 = /* @__PURE__ */ __name(() => {
    }, "noop$1");
    __name(addSubscription, "addSubscription");
    __name(triggerSubscriptions, "triggerSubscriptions");
    fallbackRunWithContext = /* @__PURE__ */ __name((e9) => e9(), "fallbackRunWithContext");
    hn = /* @__PURE__ */ Symbol();
    mn = /* @__PURE__ */ Symbol();
    __name(mergeReactiveObjects, "mergeReactiveObjects");
    gn = /* @__PURE__ */ Symbol();
    __name(shouldHydrate, "shouldHydrate");
    ({ assign: En } = Object);
    __name(isComputed, "isComputed");
    __name(createSetupStore, "createSetupStore");
    _n = "undefined" != typeof document;
    __name(isRouteComponent, "isRouteComponent");
    yn = Object.assign;
    __name(applyToParams, "applyToParams");
    noop = /* @__PURE__ */ __name(() => {
    }, "noop");
    Sn = Array.isArray;
    __name(mergeOptions, "mergeOptions");
    vn = /* @__PURE__ */ Symbol("");
    __name(createRouterError, "createRouterError");
    __name(isNavigationFailure, "isNavigationFailure");
    Tn = /* @__PURE__ */ Symbol("");
    Cn = /* @__PURE__ */ Symbol("");
    Nn = /* @__PURE__ */ Symbol("");
    bn = /* @__PURE__ */ Symbol("");
    xn = /* @__PURE__ */ Symbol("");
    On = /#/g;
    Rn = /&/g;
    In = /\//g;
    An = /=/g;
    Pn = /\?/g;
    Ln = /\+/g;
    wn = /%5B/g;
    Dn = /%5D/g;
    Mn = /%5E/g;
    kn = /%60/g;
    Vn = /%7B/g;
    Fn = /%7C/g;
    jn = /%7D/g;
    Bn = /%20/g;
    __name(commonEncode, "commonEncode");
    __name(encodeQueryValue, "encodeQueryValue");
    __name(encodeQueryKey, "encodeQueryKey");
    __name(encodeParam, "encodeParam");
    __name(decode, "decode");
    $n = /\/$/;
    __name(parseURL2, "parseURL");
    __name(isSameRouteRecord, "isSameRouteRecord");
    __name(isSameRouteLocationParams, "isSameRouteLocationParams");
    __name(isSameRouteLocationParamsValue, "isSameRouteLocationParamsValue");
    __name(isEquivalentArray, "isEquivalentArray");
    Xn = { path: "/", name: void 0, params: {}, query: {}, hash: "", fullPath: "/", matched: [], meta: {}, redirectedFrom: void 0 };
    __name(normalizeBase, "normalizeBase");
    Un = /^[^#]+#/;
    __name(createHref, "createHref");
    __name(scrollToPosition, "scrollToPosition");
    __name(getScrollKey, "getScrollKey");
    Hn = /* @__PURE__ */ new Map();
    __name(isRouteName, "isRouteName");
    __name(parseQuery2, "parseQuery");
    __name(stringifyQuery, "stringifyQuery");
    __name(normalizeQuery, "normalizeQuery");
    __name(useCallbacks, "useCallbacks");
    __name(guardToPromiseFn, "guardToPromiseFn");
    __name(extractComponentsGuards, "extractComponentsGuards");
    __name(createMemoryHistory, "createMemoryHistory");
    Wn = { type: 0, value: "" };
    Gn = /[a-zA-Z0-9_]/;
    qn = "[^/]+?";
    Kn = { sensitive: false, strict: false, start: true, end: true };
    zn = /[.+*?^${}()[\]/\\]/g;
    __name(compareScoreArray, "compareScoreArray");
    __name(comparePathParserScore, "comparePathParserScore");
    __name(isLastScoreNegative, "isLastScoreNegative");
    Jn = { strict: false, end: true, sensitive: false };
    __name(createRouteRecordMatcher, "createRouteRecordMatcher");
    __name(createRouterMatcher, "createRouterMatcher");
    __name(pickParams, "pickParams");
    __name(normalizeRouteRecord, "normalizeRouteRecord");
    __name(normalizeRecordProps, "normalizeRecordProps");
    __name(isAliasRecord, "isAliasRecord");
    __name(mergeMetaFields, "mergeMetaFields");
    __name(isMatchable, "isMatchable");
    __name(useLink, "useLink");
    Qn = defineComponent({ name: "RouterLink", compatConfig: { MODE: 3 }, props: { to: { type: [String, Object], required: true }, replace: Boolean, activeClass: String, exactActiveClass: String, custom: Boolean, ariaCurrentValue: { type: String, default: "page" }, viewTransition: Boolean }, useLink, setup(e9, { slots: t5 }) {
      const n6 = reactive(useLink(e9)), { options: r4 } = inject(Nn), o5 = computed(() => ({ [getLinkClass(e9.activeClass, r4.linkActiveClass, "router-link-active")]: n6.isActive, [getLinkClass(e9.exactActiveClass, r4.linkExactActiveClass, "router-link-exact-active")]: n6.isExactActive }));
      return () => {
        const r5 = t5.default && (1 === (s6 = t5.default(n6)).length ? s6[0] : s6);
        var s6;
        return e9.custom ? r5 : h3("a", { "aria-current": n6.isExactActive ? e9.ariaCurrentValue : null, href: n6.href, onClick: n6.navigate, class: o5.value }, r5);
      };
    } });
    __name(getOriginalPath, "getOriginalPath");
    getLinkClass = /* @__PURE__ */ __name((e9, t5, n6) => null != e9 ? e9 : null != t5 ? t5 : n6, "getLinkClass");
    __name(normalizeSlot$1, "normalizeSlot$1");
    Yn = defineComponent({ name: "RouterView", inheritAttrs: false, props: { name: { type: String, default: "default" }, route: Object }, compatConfig: { MODE: 3 }, setup(e9, { attrs: t5, slots: n6 }) {
      const r4 = inject(xn), o5 = computed(() => e9.route || r4.value), s6 = inject(Cn, 0), i6 = computed(() => {
        let e10 = unref(s6);
        const { matched: t6 } = o5.value;
        let n7;
        for (; (n7 = t6[e10]) && !n7.components; ) e10++;
        return e10;
      }), a5 = computed(() => o5.value.matched[i6.value]);
      provide(Cn, computed(() => i6.value + 1)), provide(Tn, a5), provide(xn, o5);
      const c4 = ref();
      return watch(() => [c4.value, a5.value, e9.name], ([e10, t6, n7], [r5, o6, s7]) => {
        t6 && (t6.instances[n7] = e10, o6 && o6 !== t6 && e10 && e10 === r5 && (t6.leaveGuards.size || (t6.leaveGuards = o6.leaveGuards), t6.updateGuards.size || (t6.updateGuards = o6.updateGuards))), !e10 || !t6 || o6 && isSameRouteRecord(t6, o6) && r5 || (t6.enterCallbacks[n7] || []).forEach((t7) => t7(e10));
      }, { flush: "post" }), () => {
        const r5 = o5.value, s7 = e9.name, i7 = a5.value, l4 = i7 && i7.components[s7];
        if (!l4) return normalizeSlot$1(n6.default, { Component: l4, route: r5 });
        const u6 = i7.props[s7], p6 = u6 ? true === u6 ? r5.params : "function" == typeof u6 ? u6(r5) : u6 : null, d5 = h3(l4, yn({}, p6, t5, { onVnodeUnmounted: /* @__PURE__ */ __name((e10) => {
          e10.component.isUnmounted && (i7.instances[s7] = null);
        }, "onVnodeUnmounted"), ref: c4 }));
        return normalizeSlot$1(n6.default, { Component: d5, route: r5 }) || d5;
      };
    } });
    __name(createRouter, "createRouter");
    Zn = { trailing: true };
    __name(debounce, "debounce");
    globalThis.$fetch || (globalThis.$fetch = tn.create({ baseURL: baseURL() })), "global" in globalThis || (globalThis.global = globalThis);
    er = { componentName: "NuxtLink" };
    tr = false;
    nr = {};
    rr = "nuxt-app";
    __name(getNuxtAppCtx, "getNuxtAppCtx");
    or = "__nuxt_plugin";
    __name(registerPluginHooks, "registerPluginHooks");
    __name(defineNuxtPlugin, "defineNuxtPlugin");
    sr = defineNuxtPlugin;
    __name(callWithNuxt, "callWithNuxt");
    __name(useNuxtApp, "useNuxtApp");
    __name(useRuntimeConfig, "useRuntimeConfig");
    __name(defineGetter, "defineGetter");
    ir = /* @__PURE__ */ Symbol("layout-meta");
    ar = /* @__PURE__ */ Symbol("route");
    globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
    useRouter = /* @__PURE__ */ __name(() => useNuxtApp()?.$router, "useRouter");
    useRoute = /* @__PURE__ */ __name(() => ln.hasInjectionContext() ? ln.inject(ar, useNuxtApp()._route) : useNuxtApp()._route, "useRoute");
    __name(defineNuxtRouteMiddleware, "defineNuxtRouteMiddleware");
    cr = /[&"'<>]/g;
    lr = { "&": "%26", '"': "%22", "'": "%27", "<": "%3C", ">": "%3E" };
    navigateTo = /* @__PURE__ */ __name((e9, t5) => {
      e9 ||= "/";
      const n6 = "string" == typeof e9 ? e9 : "path" in e9 ? resolveRouteObject(e9) : useRouter().resolve(e9).href, i6 = hasProtocol(n6, { acceptRelative: true }), c4 = t5?.external || i6;
      if (c4) {
        if (!t5?.external) throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
        const { protocol: e10 } = new URL(n6, "http://localhost");
        if (e10 && isScriptProtocol(e10)) throw new Error(`Cannot navigate to a URL with '${e10}' protocol.`);
      }
      const l4 = (() => {
        try {
          if (useNuxtApp()._processingMiddleware) return true;
        } catch {
          return false;
        }
        return false;
      })(), u6 = useRouter(), p6 = useNuxtApp();
      if (p6.ssrContext) {
        const r4 = "string" == typeof e9 || c4 ? n6 : u6.resolve(e9).fullPath || "/", o5 = c4 ? n6 : joinURL(useRuntimeConfig().app.baseURL, r4), redirect = /* @__PURE__ */ __name(async function(e10) {
          await p6.callHook("app:redirected");
          const n7 = (function(e11, t6 = false) {
            const n8 = new URL(e11, "http://localhost");
            if (!t6) {
              return n8.pathname.replace(/^\/{2,}/, "/") + n8.search + n8.hash;
            }
            if (e11.startsWith("//")) return n8.toString().replace(n8.protocol, "");
            return n8.toString();
          })(o5, i6), r5 = n7.replace(cr, (e11) => lr[e11]);
          return p6.ssrContext["~renderResponse"] = { statusCode: sanitizeStatusCode(t5?.redirectCode || 302, 302), body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${r5}"></head></html>`, headers: { location: n7 } }, e10;
        }, "redirect");
        return !c4 && l4 ? (u6.afterEach((e10) => e10.fullPath === r4 ? redirect(false) : void 0), e9) : redirect(!l4 && void 0);
      }
      if (c4) return p6._scope.stop(), t5?.replace ? (void 0).replace(n6) : (void 0).href = n6, l4 ? !!p6.isHydrating && new Promise(() => {
      }) : Promise.resolve();
      const d5 = "string" == typeof e9 ? encodeRoutePath(e9) : e9;
      return t5?.replace ? u6.replace(d5) : u6.push(d5);
    }, "navigateTo");
    __name(resolveRouteObject, "resolveRouteObject");
    __name(encodeRoutePath, "encodeRoutePath");
    ur = "__nuxt_error";
    useError = /* @__PURE__ */ __name(() => ln.toRef(useNuxtApp().payload, "error"), "useError");
    showError = /* @__PURE__ */ __name((e9) => {
      const t5 = createError2(e9);
      try {
        const e10 = useError();
        0, e10.value ||= t5;
      } catch {
        throw t5;
      }
      return t5;
    }, "showError");
    isNuxtError = /* @__PURE__ */ __name((e9) => !!e9 && "object" == typeof e9 && ur in e9, "isNuxtError");
    createError2 = /* @__PURE__ */ __name((e9) => {
      "string" != typeof e9 && e9.statusText && (e9.message ??= e9.statusText);
      const t5 = createError(e9);
      return Object.defineProperty(t5, ur, { value: true, configurable: false, writable: false }), Object.defineProperty(t5, "status", { get: /* @__PURE__ */ __name(() => t5.statusCode, "get"), configurable: true }), Object.defineProperty(t5, "statusText", { get: /* @__PURE__ */ __name(() => t5.statusMessage, "get"), configurable: true }), t5;
    }, "createError");
    routeRulesMatcher = /* @__PURE__ */ __name((e9) => Br({}, ...("string" == typeof e9 && e9.toLowerCase(), []).map((e10) => e10.data).reverse()), "routeRulesMatcher");
    __name(definePayloadReducer, "definePayloadReducer");
    pr = sr(() => {
      definePayloadReducer("skipHydrate", (e9) => !shouldHydrate(e9) && 1);
    });
    dr = defineNuxtPlugin({ name: "nuxt:head", enforce: "pre", setup(e9) {
      const t5 = e9.ssrContext.head;
      if (e9.ssrContext.islandContext) {
        const n6 = (function(e10) {
          const t6 = e10.push;
          return e10.push = () => ({ dispose: /* @__PURE__ */ __name(() => {
          }, "dispose"), patch: /* @__PURE__ */ __name(() => {
          }, "patch"), _poll: /* @__PURE__ */ __name(() => {
          }, "_poll") }), () => {
            e10.push = t6;
          };
        })(t5);
        e9.hooks.hookOnce("app:created", n6);
      }
      e9.vueApp.use(t5);
    } });
    __name(toArray, "toArray");
    hr = [{ name: "admin", path: "/admin", component: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_admin_XlfpIs7m(), admin_XlfpIs7m_exports)), "component") }, { name: "checkout", path: "/checkout", component: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_checkout_Bs6e058w(), checkout_Bs6e058w_exports)), "component") }, { name: "index", path: "/", component: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_index_B0TroN7R(), index_B0TroN7R_exports)), "component") }];
    fr = Object.prototype.toString;
    isPlainObject2 = /* @__PURE__ */ __name((e9) => {
      return "[object Object]" === (t5 = e9, fr.call(t5));
      var t5;
    }, "isPlainObject");
    mr = /(:\w+)\([^)]+\)/g;
    gr = /(:\w+)[?+*]/g;
    Er = /:\w+/g;
    __name(generateRouteKey, "generateRouteKey");
    __name(isChangingPage, "isChangingPage");
    __name(_getHashElementScrollMarginTop, "_getHashElementScrollMarginTop");
    __name(_calculatePosition, "_calculatePosition");
    _r = ({
	hashMode: false,
	scrollBehaviorType: 'auto',
	scrollBehavior(e9, t5, n6) {
		const r4 = useNuxtApp(), o5 = useRouter().options?.scrollBehaviorType ?? 'auto';
		if (e9.path.replace(/\/$/, '') === t5.path.replace(/\/$/, '')) return t5.hash && !e9.hash ? {
			left: 0,
			top: 0
		} : !!e9.hash && {
			el: e9.hash,
			top: _getHashElementScrollMarginTop(e9.hash),
			behavior: o5
		};
		return false !== ('function' == typeof e9.meta.scrollToTop ? e9.meta.scrollToTop(e9, t5) : e9.meta.scrollToTop) && (t5 === Xn ? _calculatePosition(e9, t5, n6, o5) : new Promise((s6) => {
			const doScroll = /* @__PURE__ */ __name(() => {
				requestAnimationFrame(() => s6(_calculatePosition(e9, t5, n6, o5)));
			}, 'doScroll');
			r4.hooks.hookOnce('page:loading:end', () => {
				const e10 = r4['~transitionPromise'];
				e10 ? e10.then(doScroll) : doScroll();
			});
		}));
	}
});
    yr = [defineNuxtRouteMiddleware(async (e9, t5) => {
      let n6, r4;
      if (!e9.meta?.validate) return;
      const o5 = ([n6, r4] = executeAsync(() => Promise.resolve(e9.meta.validate(e9))), n6 = await n6, r4(), n6);
      if (true === o5) return;
      return createError2({ fatal: false, status: o5 && (o5.status || o5.statusCode) || 404, statusText: o5 && (o5.statusText || o5.statusMessage) || `Page Not Found: ${e9.fullPath}`, data: { path: e9.fullPath } });
    }), defineNuxtRouteMiddleware((e9) => {
    })];
    Sr = {};
    Object.assign(/* @__PURE__ */ Object.create(null), {});
    vr = Object.assign(/* @__PURE__ */ Object.create(null), {});
    Tr = defineNuxtPlugin({ name: "nuxt:router", enforce: "pre", async setup(e9) {
      let t5, n6, r4 = useRuntimeConfig().app.baseURL;
      const o5 = _r.history?.(r4) ?? createMemoryHistory(r4), s6 = _r.routes ? ([t5, n6] = executeAsync(() => _r.routes(hr)), t5 = await t5, n6(), t5 ?? hr) : hr;
      let i6;
      const a5 = createRouter({ ..._r, scrollBehavior: /* @__PURE__ */ __name((e10, t6, n7) => {
        if (t6 !== Xn) {
          if (_r.scrollBehavior) {
            if (a5.options.scrollBehavior = _r.scrollBehavior, "scrollRestoration" in (void 0).history) {
              const e11 = a5.beforeEach(() => {
                e11(), (void 0).history.scrollRestoration = "manual";
              });
            }
            return _r.scrollBehavior(e10, Xn, i6 || n7);
          }
        } else i6 = n7;
      }, "scrollBehavior"), history: o5, routes: s6 });
      e9.vueApp.use(a5);
      const c4 = ln.shallowRef(a5.currentRoute.value);
      a5.afterEach((e10, t6) => {
        c4.value = t6;
      }), Object.defineProperty(e9.vueApp.config.globalProperties, "previousRoute", { get: /* @__PURE__ */ __name(() => c4.value, "get") });
      const l4 = e9.ssrContext.url, u6 = ln.shallowRef(a5.currentRoute.value), syncCurrentRoute = /* @__PURE__ */ __name(() => {
        u6.value = a5.currentRoute.value;
      }, "syncCurrentRoute");
      a5.afterEach((e10, t6) => {
        const n7 = e10.matched.at(-1)?.components?.default, r5 = t6.matched.at(-1)?.components?.default;
        n7 !== r5 ? e10.matched.length < t6.matched.length && e10.matched.every((e11, n8) => e11.components?.default === t6.matched[n8]?.components?.default) && syncCurrentRoute() : syncCurrentRoute();
      });
      const p6 = { sync: syncCurrentRoute };
      for (const e10 in u6.value) Object.defineProperty(p6, e10, { get: /* @__PURE__ */ __name(() => u6.value[e10], "get"), enumerable: true });
      e9._route = ln.shallowReactive(p6), e9._middleware ||= { global: [], named: {} };
      const h5 = useError(), f4 = e9.ssrContext?.islandContext?.name?.startsWith("page_");
      e9.ssrContext?.islandContext && !f4 || a5.afterEach(async (t6, n7, r5) => {
        delete e9._processingMiddleware, r5 && await e9.callHook("page:loading:end"), 4 !== r5?.type && t6.redirectedFrom && t6.fullPath !== l4 && await e9.runWithContext(() => navigateTo(t6.fullPath || "/"));
      });
      try {
        [t5, n6] = executeAsync(() => a5.push(l4)), await t5, n6(), [t5, n6] = executeAsync(() => a5.isReady()), await t5, n6();
      } catch (r5) {
        [t5, n6] = executeAsync(() => e9.runWithContext(() => showError(r5))), await t5, n6();
      }
      const m4 = a5.currentRoute.value;
      if (syncCurrentRoute(), e9.ssrContext?.islandContext && !f4) return { provide: { router: a5 } };
      const g3 = e9.payload.state._layout;
      return a5.beforeEach(async (t6, n7) => {
        if (await e9.callHook("page:loading:start"), t6.meta = ln.reactive(t6.meta), e9.isHydrating && g3 && !ln.isReadonly(t6.meta.layout) && (t6.meta.layout = g3), e9._processingMiddleware = true, !e9.ssrContext?.islandContext || f4) {
          const r5 = /* @__PURE__ */ new Set([...yr, ...e9._middleware.global]);
          for (const e10 of t6.matched) {
            const t7 = e10.meta.middleware;
            if (t7) for (const e11 of toArray(t7)) r5.add(e11);
          }
          const o6 = (function(e10) {
            const t7 = "string" == typeof e10 ? e10 : e10.path;
            try {
              return routeRulesMatcher(t7.toLowerCase());
            } catch (e11) {
              return console.error("[nuxt] Error matching route rules.", e11), {};
            }
          })({ path: t6.path });
          if (o6.appMiddleware) for (const e10 in o6.appMiddleware) o6.appMiddleware[e10] ? r5.add(e10) : r5.delete(e10);
          for (const o7 of r5) {
            const r6 = "string" == typeof o7 ? e9._middleware.named[o7] || await Sr[o7]?.().then((e10) => e10.default || e10) : o7;
            if (!r6) throw new Error(`Unknown route middleware: '${o7}'.`);
            try {
              0;
              const o8 = await e9.runWithContext(() => r6(t6, n7));
              if (false === o8 || o8 instanceof Error) {
                const t7 = o8 || createError2({ status: 404, statusText: `Page Not Found: ${l4}` });
                return await e9.runWithContext(() => showError(t7)), false;
              }
              if (true === o8) continue;
              if (false === o8) return o8;
              if (o8) return isNuxtError(o8) && o8.fatal && await e9.runWithContext(() => showError(o8)), o8;
            } catch (t7) {
              const n8 = createError2(t7);
              return n8.fatal && await e9.runWithContext(() => showError(n8)), n8;
            }
          }
        }
      }), f4 && a5.beforeResolve((t6) => {
        const n7 = vr[e9.ssrContext.islandContext.name], r5 = t6.matched.find((e10) => e10.components?.default?.__nuxt_island)?.components?.default;
        if (!n7 || n7 !== r5?.__nuxt_island) return e9.ssrContext["~renderResponse"] = { statusCode: 400, statusMessage: "Invalid island request path" }, false;
      }), a5.onError(async () => {
        delete e9._processingMiddleware, await e9.callHook("page:loading:end");
      }), a5.afterEach((t6) => {
        if (0 === t6.matched.length && !h5.value) return e9.runWithContext(() => showError(createError2({ status: 404, fatal: false, statusText: `Page not found: ${t6.fullPath}`, data: { path: t6.fullPath } })));
      }), e9.hooks.hookOnce("app:created", async () => {
        try {
          "name" in m4 && (m4.name = void 0), await a5.replace({ ...m4, force: true }), a5.options.scrollBehavior = _r.scrollBehavior;
        } catch (t6) {
          await e9.runWithContext(() => showError(t6));
        }
      }), { provide: { router: a5 } };
    } });
    Cr = [["NuxtError", (e9) => isNuxtError(e9) && e9.toJSON()], ["EmptyShallowRef", (e9) => ln.isRef(e9) && ln.isShallow(e9) && !e9.value && ("bigint" == typeof e9.value ? "0n" : JSON.stringify(e9.value) || "_")], ["EmptyRef", (e9) => ln.isRef(e9) && !e9.value && ("bigint" == typeof e9.value ? "0n" : JSON.stringify(e9.value) || "_")], ["ShallowRef", (e9) => ln.isRef(e9) && ln.isShallow(e9) && e9.value], ["ShallowReactive", (e9) => ln.isReactive(e9) && ln.isShallow(e9) && ln.toRaw(e9)], ["Ref", (e9) => ln.isRef(e9) && e9.value], ["Reactive", (e9) => ln.isReactive(e9) && ln.toRaw(e9)]];
    Nr = defineNuxtPlugin({ name: "nuxt:revive-payload:server", setup() {
      for (const [e9, t5] of Cr) definePayloadReducer(e9, t5);
    } });
    ln.defineComponent({ name: "ServerPlaceholder", render: /* @__PURE__ */ __name(() => ln.createElementBlock("div"), "render") });
    br2 = /* @__PURE__ */ Symbol.for("nuxt:client-only");
    __name(defineKeyedFunctionFactory, "defineKeyedFunctionFactory");
    ln.defineComponent({ name: "ClientOnly", inheritAttrs: false, props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"], setup(e9, { slots: t5, attrs: n6 }) {
      const r4 = ln.shallowRef(false), o5 = ln.getCurrentInstance();
      return o5 && (o5._nuxtClientOnly = true), ln.provide(br2, true), () => {
        if (r4.value) {
          const e10 = t5.default?.();
          return e10 && 1 === e10.length ? [ln.cloneVNode(e10[0], n6)] : e10;
        }
        const o6 = t5.fallback || t5.placeholder;
        if (o6) return ln.h(o6);
        const s6 = e9.fallback || e9.placeholder || "", i6 = e9.fallbackTag || e9.placeholderTag || "span";
        return ln.createElementBlock(i6, n6, s6);
      };
    } });
    xr = defineKeyedFunctionFactory({ name: "createUseAsyncData", factory: /* @__PURE__ */ __name((e9 = {}) => function(...t5) {
      const n6 = "string" == typeof t5[t5.length - 1] ? t5.pop() : void 0;
      (function(e10, t6) {
        if ("string" == typeof e10) return false;
        if ("object" == typeof e10 && null !== e10) return false;
        if ("function" == typeof e10 && "function" == typeof t6) return false;
        return true;
      })(t5[0], t5[1]) && t5.unshift(n6);
      let [r4, o5, s6 = {}] = t5;
      const i6 = ln.isRef(r4) || "function" == typeof r4 ? ln.computed(() => ln.toValue(r4)) : { value: r4 };
      if (!i6.value || "string" != typeof i6.value) throw new TypeError("[nuxt] [useAsyncData] key must be a non-empty string.");
      if ("function" != typeof o5) throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
      const a5 = "function" == typeof e9, c4 = useNuxtApp(), l4 = a5 ? e9(s6) : e9;
      if (!a5) for (const e10 in l4) void 0 !== l4[e10] && void 0 === s6[e10] && (s6[e10] = l4[e10]);
      if (s6.server ??= true, s6.default ??= getDefault, s6.getCachedData ??= getDefaultCachedData, s6.lazy ??= false, s6.immediate ??= true, s6.deep ??= tr, s6.dedupe ??= "cancel", a5) for (const e10 in l4) void 0 !== l4[e10] && (s6[e10] = l4[e10]);
      function createInitialFetch() {
        const e10 = { cause: "initial", dedupe: s6.dedupe }, t6 = c4._asyncData[i6.value];
        return t6?._init ? c4._asyncDataPromises[i6.value] && (e10.cachedData = t6._initialCachedData) : (e10.cachedData = s6.getCachedData(i6.value, c4, { cause: "initial" }), c4._asyncData[i6.value] = (function(e11, t7, n7, r5, o6) {
          e11.payload._errors[t7] ??= void 0;
          const s7 = r5.getCachedData !== getDefaultCachedData, i7 = n7, a6 = r5.deep ? ln.ref : ln.shallowRef, c5 = void 0 !== o6, l5 = e11.hook("app:data:refresh", async (e12) => {
            e12 && !e12.includes(t7) || await u7.execute({ cause: "refresh:hook" });
          }), u7 = { data: a6(c5 ? o6 : r5.default()), pending: ln.computed(() => "pending" === u7.status.value), error: ln.toRef(e11.payload._errors, t7), status: ln.shallowRef("idle"), execute: /* @__PURE__ */ __name((...n8) => {
            const [o7, s8] = n8, a7 = o7 && void 0 === s8 && "object" == typeof o7 ? o7 : {};
            if (e11._asyncDataPromises[t7] && "defer" === (a7.dedupe ?? r5.dedupe)) return e11._asyncDataPromises[t7];
            {
              const n9 = "cachedData" in a7 ? a7.cachedData : r5.getCachedData(t7, e11, { cause: a7.cause ?? "refresh:manual" });
              if (void 0 !== n9) return e11.payload.data[t7] = u7.data.value = n9, u7.error.value = void 0, u7.status.value = "success", Promise.resolve(n9);
            }
            u7._abortController && u7._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError")), u7._abortController = new AbortController(), u7.status.value = "pending";
            const c6 = new AbortController(), l6 = new Promise((t8, n9) => {
              try {
                const o8 = a7.timeout ?? r5.timeout, s9 = (function(e12, t9, n10) {
                  const r6 = e12.filter((e13) => !!e13);
                  if ("number" == typeof n10 && n10 >= 0) {
                    const e13 = AbortSignal.timeout?.(n10);
                    e13 && r6.push(e13);
                  }
                  if (AbortSignal.any) return AbortSignal.any(r6);
                  const o9 = new AbortController();
                  for (const e13 of r6) if (e13.aborted) {
                    const t10 = e13.reason ?? new DOMException("Aborted", "AbortError");
                    try {
                      o9.abort(t10);
                    } catch {
                      o9.abort();
                    }
                    return o9.signal;
                  }
                  const onAbort = /* @__PURE__ */ __name(() => {
                    const e13 = r6.find((e14) => e14.aborted), t10 = e13?.reason ?? new DOMException("Aborted", "AbortError");
                    try {
                      o9.abort(t10);
                    } catch {
                      o9.abort();
                    }
                  }, "onAbort");
                  for (const e13 of r6) e13.addEventListener?.("abort", onAbort, { once: true, signal: t9 });
                  return o9.signal;
                })([u7._abortController?.signal, a7?.signal], c6.signal, o8);
                if (s9.aborted) {
                  const e12 = s9.reason;
                  return void n9(e12 instanceof Error ? e12 : new DOMException(String(e12 ?? "Aborted"), "AbortError"));
                }
                return s9.addEventListener("abort", () => {
                  const e12 = s9.reason;
                  n9(e12 instanceof Error ? e12 : new DOMException(String(e12 ?? "Aborted"), "AbortError"));
                }, { once: true, signal: c6.signal }), Promise.resolve(i7(e11, { signal: s9 })).then(t8, n9);
              } catch (e12) {
                n9(e12);
              }
            }).then(async (n9) => {
              if (e11._asyncDataPromises[t7] !== l6) return;
              let o8 = n9;
              r5.transform && (o8 = await r5.transform(n9)), r5.pick && (o8 = (function(e12, t8) {
                const n10 = {};
                for (const r6 of t8) n10[r6] = e12[r6];
                return n10;
              })(o8, r5.pick)), e11.payload.data[t7] = o8, u7.data.value = o8, u7.error.value = void 0, u7.status.value = "success";
            }).catch((n9) => e11._asyncDataPromises[t7] !== l6 || u7._abortController?.signal.aborted ? e11._asyncDataPromises[t7] : "undefined" != typeof DOMException && n9 instanceof DOMException && "AbortError" === n9.name ? (u7.status.value = "idle", e11._asyncDataPromises[t7]) : (u7.error.value = createError2(n9), u7.data.value = ln.unref(r5.default()), void (u7.status.value = "error"))).finally(() => {
              c6.abort(), e11._asyncDataPromises[t7] === l6 && delete e11._asyncDataPromises[t7];
            });
            return e11._asyncDataPromises[t7] = l6, e11._asyncDataPromises[t7];
          }, "execute"), _execute: debounce((...e12) => u7.execute(...e12), 0, { leading: true }), _default: r5.default, _deps: 0, _init: true, _hash: void 0, _off: /* @__PURE__ */ __name(() => {
            l5(), e11._asyncData[t7]?._init && (e11._asyncData[t7]._init = false), s7 || ln.nextTick(() => {
              e11._asyncData[t7]?._init || (clearNuxtDataByKey(e11, t7), u7.execute = () => Promise.resolve());
            });
          }, "_off") };
          return u7;
        })(c4, i6.value, o5, s6, e10.cachedData), c4._asyncData[i6.value]._initialCachedData = e10.cachedData), () => c4._asyncData[i6.value].execute(e10);
      }
      __name(createInitialFetch, "createInitialFetch");
      c4._asyncData[i6.value];
      const u6 = createInitialFetch();
      if (c4._asyncData[i6.value]._deps++, false !== s6.server && c4.payload.serverRendered && s6.immediate) {
        const e10 = u6();
        ln.getCurrentInstance() ? ln.onServerPrefetch(() => e10) : c4.hook("app:created", async () => {
          await e10;
        });
      }
      const p6 = { data: writableComputedRef(() => c4._asyncData[i6.value]?.data), pending: writableComputedRef(() => c4._asyncData[i6.value]?.pending), status: writableComputedRef(() => c4._asyncData[i6.value]?.status), error: writableComputedRef(() => c4._asyncData[i6.value]?.error), refresh: /* @__PURE__ */ __name((...e10) => {
        if (!c4._asyncData[i6.value]?._init) {
          return createInitialFetch()();
        }
        return c4._asyncData[i6.value].execute(...e10);
      }, "refresh"), execute: /* @__PURE__ */ __name((...e10) => p6.refresh(...e10), "execute"), clear: /* @__PURE__ */ __name(() => {
        const e10 = c4._asyncData[i6.value];
        if (e10?._abortController) try {
          e10._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          e10._abortController = void 0;
        }
        clearNuxtDataByKey(c4, i6.value);
      }, "clear") }, d5 = Promise.resolve(c4._asyncDataPromises[i6.value]).then(() => p6);
      return Object.assign(d5, p6), Object.defineProperties(d5, { then: { enumerable: true, value: d5.then.bind(d5) }, catch: { enumerable: true, value: d5.catch.bind(d5) }, finally: { enumerable: true, value: d5.finally.bind(d5) } }), d5;
    }, "factory") });
    Or = xr.__nuxt_factory();
    __name(writableComputedRef, "writableComputedRef");
    __name(clearNuxtDataByKey, "clearNuxtDataByKey");
    xr.__nuxt_factory({ lazy: true, _functionName: "useLazyAsyncData" });
    getDefault = /* @__PURE__ */ __name(() => {
    }, "getDefault");
    getDefaultCachedData = /* @__PURE__ */ __name((e9, t5, n6) => t5.isHydrating ? t5.payload.data[e9] : "refresh:manual" !== n6.cause && "refresh:hook" !== n6.cause ? t5.static.data[e9] : void 0, "getDefaultCachedData");
    __name(useRequestFetch, "useRequestFetch");
    __name(generateOptionSegments, "generateOptionSegments");
    Rr = defineKeyedFunctionFactory({ name: "createUseFetch", factory: /* @__PURE__ */ __name((e9 = {}) => function(t5, n6, r4) {
      const [o5 = {}, s6] = "string" == typeof n6 ? [{}, n6] : [n6, r4], i6 = "function" == typeof e9 ? e9(o5) : e9, { server: a5, lazy: c4, default: l4, transform: p6, pick: d5, watch: h5, immediate: f4, getCachedData: m4, deep: g3, dedupe: E3, timeout: _3, ...y4 } = { ..."function" == typeof e9 ? {} : i6, ...o5, ..."function" == typeof e9 ? i6 : {} }, S4 = ln.computed(() => ln.toValue(t5)), v5 = ln.computed(() => ln.toValue(y4.key) || "$f" + hash$1([s6, "string" == typeof S4.value ? S4.value : "", ...generateOptionSegments(y4)]));
      if (!y4.baseURL && "string" == typeof S4.value && "/" === S4.value[0] && "/" === S4.value[1]) throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
      const T3 = ln.reactive({ ...nr, ...y4, cache: "boolean" == typeof y4.cache ? void 0 : y4.cache }), C3 = { server: a5, lazy: c4, default: l4, transform: p6, pick: d5, immediate: f4, getCachedData: m4, deep: g3, dedupe: E3, timeout: _3, watch: false === h5 ? [] : [...h5 || [], T3] };
      return false === h5 && (C3._keyTriggersExecute = false), Or(v5, (e10, { signal: t6 }) => {
        let n7 = y4.$fetch || globalThis.$fetch;
        if (!y4.$fetch) {
          "string" == typeof S4.value && "/" === S4.value[0] && (!ln.toValue(y4.baseURL) || "/" === ln.toValue(y4.baseURL)[0]) && (n7 = useRequestFetch());
        }
        return n7(S4.value, { signal: t6, ...T3 });
      }, C3);
    }, "factory") });
    Ir = Rr.__nuxt_factory();
    Rr.__nuxt_factory({ lazy: true, _functionName: "useLazyFetch" });
    Ar = [pr, dr, Tr, Nr, defineNuxtPlugin({ name: "pinia", setup(e9) {
      const t5 = (function() {
        const e10 = effectScope(true), t6 = e10.run(() => ref({}));
        let n6 = [], r4 = [];
        const o5 = markRaw({ install(e11) {
          setActivePinia(o5), o5._a = e11, e11.provide(pn, o5), e11.config.globalProperties.$pinia = o5, r4.forEach((e12) => n6.push(e12)), r4 = [];
        }, use(e11) {
          return this._a ? n6.push(e11) : r4.push(e11), this;
        }, _p: n6, _a: null, _e: e10, _s: /* @__PURE__ */ new Map(), state: t6 });
        return o5;
      })();
      return e9.vueApp.use(t5), setActivePinia(t5), e9.payload && e9.payload.pinia && (t5.state.value = e9.payload.pinia), { provide: { pinia: t5 } };
    }, hooks: { "app:rendered"() {
      const e9 = useNuxtApp();
      e9.payload.pinia = ln.toRaw(e9.$pinia).state.value, setActivePinia(void 0);
    } } }), defineNuxtPlugin({ name: "nuxt:global-components" })];
    Pr = ((e9 = "RouteProvider") => ln.defineComponent({ name: e9, props: { route: { type: Object, required: true }, vnode: Object, vnodeRef: Object, renderKey: String, trackRootNodes: Boolean }, setup(e10) {
      const t5 = e10.renderKey, n6 = e10.route, r4 = {};
      for (const o5 in e10.route) Object.defineProperty(r4, o5, { get: /* @__PURE__ */ __name(() => t5 === e10.renderKey ? e10.route[o5] : n6[o5], "get"), enumerable: true });
      return ln.provide(ar, ln.shallowReactive(r4)), () => e10.vnode ? ln.h(e10.vnode, { ref: e10.vnodeRef }) : e10.vnode;
    } }))();
    Lr = ln.defineComponent({ name: "NuxtPage", inheritAttrs: false, props: { name: { type: String }, transition: { type: [Boolean, Object], default: void 0 }, keepalive: { type: [Boolean, Object], default: void 0 }, route: { type: Object }, pageKey: { type: [Function, String], default: null } }, setup(e9, { attrs: t5, slots: n6, expose: r4 }) {
      const o5 = useNuxtApp(), s6 = ln.ref();
      return ln.inject(ar, null), r4({ pageRef: s6 }), ln.inject(ir, null), o5.deferHydration(), () => ln.h(Yn, { name: e9.name, route: e9.route, ...t5 }, { default: /* @__PURE__ */ __name((e10) => ln.h(ln.Suspense, { suspensible: true }, { default: /* @__PURE__ */ __name(() => ln.h(Pr, { vnode: n6.default ? normalizeSlot(n6.default, e10) : e10.Component, route: e10.route, vnodeRef: s6 }), "default") }), "default") });
    } });
    __name(normalizeSlot, "normalizeSlot");
    wr = (function(e9, t5, n6) {
      let r4;
      const o5 = "function" == typeof t5;
      function useStore(n7, s6) {
        const i6 = hasInjectionContext();
        (n7 = n7 || (i6 ? inject(pn, null) : null)) && setActivePinia(n7), (n7 = un)._s.has(e9) || (o5 ? createSetupStore(e9, t5, r4, n7) : (function(e10, t6, n8) {
          const { state: r5, actions: o6, getters: s7 } = t6, i7 = n8.state.value[e10];
          let a5;
          a5 = createSetupStore(e10, function() {
            i7 || (n8.state.value[e10] = r5 ? r5() : {});
            const t7 = toRefs(n8.state.value[e10]);
            return En(t7, o6, Object.keys(s7 || {}).reduce((t8, r6) => (t8[r6] = markRaw(computed(() => {
              setActivePinia(n8);
              const t9 = n8._s.get(e10);
              return s7[r6].call(t9, t9);
            })), t8), {}));
          }, t6, n8, 0, true);
        })(e9, r4, n7));
        return n7._s.get(e9);
      }
      __name(useStore, "useStore");
      return r4 = o5 ? n6 : t5, useStore.$id = e9, useStore;
    })("cart", () => {
      const e9 = ln.ref([]);
      ln.watch(e9, (e10) => {
      }, { deep: true });
      const t5 = ln.computed(() => e9.value.reduce((e10, t6) => e10 + t6.quantity, 0)), n6 = ln.computed(() => e9.value.reduce((e10, t6) => e10 + t6.product.price * t6.quantity, 0));
      function removeFromCart(t6) {
        e9.value = e9.value.filter((e10) => e10.product.id !== t6);
      }
      __name(removeFromCart, "removeFromCart");
      return { items: e9, cartItemsCount: t5, cartTotal: n6, addToCart: /* @__PURE__ */ __name(function(t6) {
        const n7 = e9.value.find((e10) => e10.product.id === t6.id);
        n7 ? n7.quantity += 1 : e9.value.push({ product: t6, quantity: 1 });
      }, "addToCart"), removeFromCart, updateQuantity: /* @__PURE__ */ __name(function(t6, n7) {
        if (n7 <= 0) return void removeFromCart(t6);
        const r4 = e9.value.find((e10) => e10.product.id === t6);
        r4 && (r4.quantity = n7);
      }, "updateQuantity"), clearCart: /* @__PURE__ */ __name(function() {
        e9.value = [];
      }, "clearCart"), loadCart: /* @__PURE__ */ __name(function() {
        const t6 = [];
        t6.length > 0 && (e9.value = t6);
      }, "loadCart") };
    });
    Dr = ln.defineComponent({ __name: "app", __ssrInlineRender: true, setup: /* @__PURE__ */ __name((e9) => (wr(), (e10, t5, n6, r4) => {
      t5(ssrRenderComponent(Lr, r4, null, n6));
    }), "setup") });
    Mr = Dr.setup;
    Dr.setup = (e9, t5) => {
      const n6 = ln.useSSRContext();
      return (n6.modules || (n6.modules = /* @__PURE__ */ new Set())).add("app.vue"), Mr ? Mr(e9, t5) : void 0;
    };
    kr2 = { __name: "nuxt-error-page", __ssrInlineRender: true, props: { error: Object }, setup(e9) {
      const t5 = e9.error, n6 = Number(t5.statusCode || 500), r4 = 404 === n6, o5 = t5.statusMessage ?? (r4 ? "Page Not Found" : "Internal Server Error"), s6 = t5.message || t5.toString(), i6 = ln.defineAsyncComponent(() => Promise.resolve().then(() => (init_error_404_ZvPooiPq(), error_404_ZvPooiPq_exports))), a5 = ln.defineAsyncComponent(() => Promise.resolve().then(() => (init_error_500_DZSQ9eS4(), error_500_DZSQ9eS4_exports))), c4 = r4 ? i6 : a5;
      return (e10, t6, r5, i7) => {
        t6(ssrRenderComponent(ln.unref(c4), ln.mergeProps({ status: ln.unref(n6), statusText: ln.unref(o5), statusCode: ln.unref(n6), statusMessage: ln.unref(o5), description: ln.unref(s6), stack: ln.unref(void 0) }, i7), null, r5));
      };
    } };
    Vr = kr2.setup;
    kr2.setup = (e9, t5) => {
      const n6 = ln.useSSRContext();
      return (n6.modules || (n6.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/nuxt-error-page.vue"), Vr ? Vr(e9, t5) : void 0;
    };
    Fr2 = { __name: "nuxt-root", __ssrInlineRender: true, setup(e9) {
      const IslandRenderer = /* @__PURE__ */ __name(() => null, "IslandRenderer"), t5 = useNuxtApp();
      t5.deferHydration(), t5.ssrContext.url;
      const n6 = false;
      ln.provide(ar, useRoute()), t5.hooks.callHookWith((e10) => e10.map((e11) => e11()), "vue:setup", []);
      const r4 = useError(), o5 = r4.value && !t5.ssrContext.error;
      ln.onErrorCaptured((e10, n7, r5) => {
        t5.hooks.callHook("vue:error", e10, n7, r5)?.catch((e11) => console.error("[nuxt] Error in `vue:error` hook", e11));
        {
          const o6 = t5.runWithContext(() => showError(e10));
          return ln.onServerPrefetch(() => o6), (function(e11, n8, r6) {
            const o7 = t5.vueApp.config.errorHandler;
            if (o7 && !o7.__nuxt_default) try {
              o7(e11, n8, r6);
            } catch (e12) {
              console.error("[nuxt] Error in `app.config.errorHandler`", e12);
            }
          })(e10, n7, r5), false;
        }
      });
      const s6 = t5.ssrContext.islandContext;
      return (e10, t6, i6, a5) => {
        ssrRenderSuspense(t6, { default: /* @__PURE__ */ __name(() => {
          ln.unref(o5) ? t6("<div></div>") : ln.unref(r4) ? t6(ssrRenderComponent(ln.unref(kr2), { error: ln.unref(r4) }, null, i6)) : ln.unref(s6) ? t6(ssrRenderComponent(ln.unref(IslandRenderer), { context: ln.unref(s6) }, null, i6)) : ln.unref(n6) ? renderVNode(t6, ln.createVNode(ln.resolveDynamicComponent(ln.unref(n6)), null, null), i6) : t6(ssrRenderComponent(ln.unref(Dr), null, null, i6));
        }, "default") });
      };
    } };
    jr = Fr2.setup;
    Fr2.setup = (e9, t5) => {
      const n6 = ln.useSSRContext();
      return (n6.modules || (n6.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/nuxt-root.vue"), jr ? jr(e9, t5) : void 0;
    }, Br2 = /* @__PURE__ */ __name(async function(e9) {
      const t5 = ln.createApp(Fr2), n6 = (function(e10) {
        let t6 = 0;
        const n7 = { _id: e10.id || rr || "nuxt-app", _scope: ln.effectScope(), provide: void 0, versions: { get nuxt() {
          return "4.4.8";
        }, get vue() {
          return n7.vueApp.version;
        } }, payload: ln.shallowReactive({ ...e10.ssrContext?.payload, data: ln.shallowReactive({}), state: ln.reactive({}), once: /* @__PURE__ */ new Set(), _errors: ln.shallowReactive({}) }), static: { data: {} }, runWithContext: /* @__PURE__ */ __name((e11) => n7._scope.active && !ln.getCurrentScope() ? n7._scope.run(() => callWithNuxt(n7, e11)) : callWithNuxt(n7, e11), "runWithContext"), isHydrating: false, deferHydration() {
          if (!n7.isHydrating) return () => {
          };
          t6++;
          let e11 = false;
          return () => {
            if (!e11) return e11 = true, t6--, 0 === t6 ? (n7.isHydrating = false, n7.callHook("app:suspense:resolve")) : void 0;
          };
        }, _asyncDataPromises: {}, _asyncData: ln.shallowReactive({}), _state: ln.shallowReactive({}), _payloadRevivers: {}, ...e10 };
        n7.payload.serverRendered = true, n7.ssrContext && (n7.payload.path = n7.ssrContext.url, n7.ssrContext.nuxt = n7, n7.ssrContext.payload = n7.payload, n7.ssrContext.config = { public: n7.ssrContext.runtimeConfig.public, app: n7.ssrContext.runtimeConfig.app }), n7.hooks = createHooks(), n7.hook = n7.hooks.hook;
        {
          const contextCaller = /* @__PURE__ */ __name(async function(e11, t7) {
            for (const r5 of e11) await n7.runWithContext(() => r5(...t7));
          }, "contextCaller");
          n7.hooks.callHook = (e11, ...t7) => n7.hooks.callHookWith(contextCaller, e11, t7);
        }
        n7.callHook = n7.hooks.callHook, n7.provide = (e11, t7) => {
          const r5 = "$" + e11;
          defineGetter(n7, r5, t7), defineGetter(n7.vueApp.config.globalProperties, r5, t7);
        }, defineGetter(n7.vueApp, "$nuxt", n7), defineGetter(n7.vueApp.config.globalProperties, "$nuxt", n7);
        const r4 = e10.ssrContext.runtimeConfig;
        return n7.provide("config", r4), n7;
      })({ vueApp: t5, ssrContext: e9 });
      try {
        await (async function(e10, t6) {
          const n7 = /* @__PURE__ */ new Set(), r4 = [], o5 = [];
          let s6, i6 = 0;
          async function executePlugin(a5) {
            const c4 = a5.dependsOn?.filter((e11) => t6.some((t7) => t7._name === e11) && !n7.has(e11)) ?? [];
            if (c4.length > 0) r4.push([new Set(c4), a5]);
            else {
              const t7 = (async function(e11, t8) {
                if ("function" == typeof t8) {
                  const { provide: n8 } = await e11.runWithContext(() => t8(e11)) || {};
                  if (n8 && "object" == typeof n8) for (const t9 in n8) e11.provide(t9, n8[t9]);
                }
              })(e10, a5).then(async () => {
                a5._name && (n7.add(a5._name), await Promise.all(r4.map(async ([e11, t8]) => {
                  e11.has(a5._name) && (e11.delete(a5._name), 0 === e11.size && (i6++, await executePlugin(t8)));
                })));
              }).catch((t8) => {
                if (!a5.parallel && !e10.payload.error) throw t8;
                s6 ||= t8;
              });
              a5.parallel ? o5.push(t7) : await t7;
            }
          }
          __name(executePlugin, "executePlugin");
          for (const n8 of t6) e10.ssrContext?.islandContext && false === n8.env?.islands || registerPluginHooks(e10, n8);
          for (const n8 of t6) e10.ssrContext?.islandContext && false === n8.env?.islands || await executePlugin(n8);
          if (await Promise.all(o5), i6) for (let e11 = 0; e11 < i6; e11++) await Promise.all(o5);
          if (s6) throw e10.payload.error || s6;
        })(n6, Ar), await n6.hooks.callHook("app:created", t5);
      } catch (e10) {
        await n6.hooks.callHook("app:error", e10), n6.payload.error ||= createError2(e10);
      }
      if (e9 && (e9["~renderResponse"] || e9._renderResponse)) throw new Error("skipping render");
      return t5;
    }, "Br");
    $r = Object.freeze(Object.defineProperty({ __proto__: null, a: useNuxtApp, b: useRuntimeConfig, c: er, d: wr, default: /* @__PURE__ */ __name((e9) => Br2(e9), "default"), e: encodeRoutePath, f: useRoute, g: Ir, n: navigateTo, r: resolveRouteObject, u: useRouter }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/virtual/_virtual_spa-template.mjs
var virtual_spa_template_exports = {};
__export(virtual_spa_template_exports, {
  template: () => o3
});
var o3;
var init_virtual_spa_template = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/virtual/_virtual_spa-template.mjs"() {
    "use strict";
    init_modules_watch_stub();
    o3 = "";
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/admin-styles.CLZyIeTD.mjs
var admin_styles_CLZyIeTD_exports = {};
__export(admin_styles_CLZyIeTD_exports, {
  default: () => e2
});
var e2;
var init_admin_styles_CLZyIeTD = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/admin-styles.CLZyIeTD.mjs"() {
    "use strict";
    init_modules_watch_stub();
    e2 = [".fade-enter-active[data-v-e9ef0592],.fade-leave-active[data-v-e9ef0592]{transition:opacity .2s}.fade-enter-from[data-v-e9ef0592],.fade-leave-to[data-v-e9ef0592]{opacity:0}"];
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/index-styles.D6AZ5FxE.mjs
var index_styles_D6AZ5FxE_exports = {};
__export(index_styles_D6AZ5FxE_exports, {
  default: () => a3
});
var a3;
var init_index_styles_D6AZ5FxE = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/index-styles.D6AZ5FxE.mjs"() {
    "use strict";
    init_modules_watch_stub();
    a3 = [".scrollbar-none[data-v-9fa48b3d]::-webkit-scrollbar{display:none}.scrollbar-none[data-v-9fa48b3d]{-ms-overflow-style:none;scrollbar-width:none}"];
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/error-500-styles.BpD0Oqiq.mjs
var error_500_styles_BpD0Oqiq_exports = {};
__export(error_500_styles_BpD0Oqiq_exports, {
  default: () => t3
});
var t3;
var init_error_500_styles_BpD0Oqiq = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/error-500-styles.BpD0Oqiq.mjs"() {
    "use strict";
    init_modules_watch_stub();
    t3 = [".grid[data-v-60421475]{display:grid}.mb-2[data-v-60421475]{margin-bottom:.5rem}.mb-4[data-v-60421475]{margin-bottom:1rem}.max-w-520px[data-v-60421475]{max-width:520px}.min-h-screen[data-v-60421475]{min-height:100vh}.place-content-center[data-v-60421475]{place-content:center}.overflow-hidden[data-v-60421475]{overflow:hidden}.bg-white[data-v-60421475]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2[data-v-60421475]{padding-left:.5rem;padding-right:.5rem}.text-center[data-v-60421475]{text-align:center}.text-\\[80px\\][data-v-60421475]{font-size:80px}.text-2xl[data-v-60421475]{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\][data-v-60421475]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\][data-v-60421475]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold[data-v-60421475]{font-weight:600}.leading-none[data-v-60421475]{line-height:1}.tracking-wide[data-v-60421475]{letter-spacing:.025em}.font-sans[data-v-60421475]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums[data-v-60421475]{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased[data-v-60421475]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\][data-v-60421475]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white[data-v-60421475]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\][data-v-60421475]{font-size:110px}.sm\\:text-3xl[data-v-60421475]{font-size:1.875rem;line-height:2.25rem}}"];
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/error-404-styles.Dcqjloko.mjs
var error_404_styles_Dcqjloko_exports = {};
__export(error_404_styles_Dcqjloko_exports, {
  default: () => e3
});
var e3;
var init_error_404_styles_Dcqjloko = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/error-404-styles.Dcqjloko.mjs"() {
    "use strict";
    init_modules_watch_stub();
    e3 = [".grid[data-v-fe12e1a3]{display:grid}.mb-2[data-v-fe12e1a3]{margin-bottom:.5rem}.mb-4[data-v-fe12e1a3]{margin-bottom:1rem}.max-w-520px[data-v-fe12e1a3]{max-width:520px}.min-h-screen[data-v-fe12e1a3]{min-height:100vh}.w-full[data-v-fe12e1a3]{width:100%}.flex[data-v-fe12e1a3]{display:flex}.place-content-center[data-v-fe12e1a3]{place-content:center}.items-center[data-v-fe12e1a3]{align-items:center}.justify-center[data-v-fe12e1a3]{justify-content:center}.overflow-hidden[data-v-fe12e1a3]{overflow:hidden}.bg-white[data-v-fe12e1a3]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2[data-v-fe12e1a3]{padding-left:.5rem;padding-right:.5rem}.text-center[data-v-fe12e1a3]{text-align:center}.text-\\[80px\\][data-v-fe12e1a3]{font-size:80px}.text-2xl[data-v-fe12e1a3]{font-size:1.5rem;line-height:2rem}.text-sm[data-v-fe12e1a3]{font-size:.875rem;line-height:1.25rem}.text-\\[\\#020420\\][data-v-fe12e1a3]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\][data-v-fe12e1a3]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.hover\\:text-\\[\\#00DC82\\][data-v-fe12e1a3]:hover{--un-text-opacity:1;color:rgb(0 220 130/var(--un-text-opacity))}.font-medium[data-v-fe12e1a3]{font-weight:500}.font-semibold[data-v-fe12e1a3]{font-weight:600}.leading-none[data-v-fe12e1a3]{line-height:1}.tracking-wide[data-v-fe12e1a3]{letter-spacing:.025em}.font-sans[data-v-fe12e1a3]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums[data-v-fe12e1a3]{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.underline[data-v-fe12e1a3]{text-decoration-line:underline}.underline-offset-3[data-v-fe12e1a3]{text-underline-offset:3px}.antialiased[data-v-fe12e1a3]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\][data-v-fe12e1a3]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white[data-v-fe12e1a3]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\][data-v-fe12e1a3]{font-size:110px}.sm\\:text-3xl[data-v-fe12e1a3]{font-size:1.875rem;line-height:2.25rem}}"];
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/build/styles.mjs
var styles_exports = {};
__export(styles_exports, {
  default: () => e4
});
var interopDefault, e4;
var init_styles = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/build/styles.mjs"() {
    "use strict";
    init_modules_watch_stub();
    interopDefault = /* @__PURE__ */ __name((e9) => e9.default || e9 || [], "interopDefault");
    e4 = { "pages/admin.vue": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_admin_styles_CLZyIeTD(), admin_styles_CLZyIeTD_exports)).then(interopDefault), "pages/admin.vue"), "pages/index.vue": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_index_styles_D6AZ5FxE(), index_styles_D6AZ5FxE_exports)).then(interopDefault), "pages/index.vue"), "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_500_styles_BpD0Oqiq(), error_500_styles_BpD0Oqiq_exports)).then(interopDefault), "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-500.vue"), "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_404_styles_Dcqjloko(), error_404_styles_Dcqjloko_exports)).then(interopDefault), "node_modules/.pnpm/nuxt@4.4.8_@babel+plugin-proposal-decorators@7.29.7_@babel+core@7.29.7__@babel+plugin-s_f94ab86709d6e3928d3b183175bb516e/node_modules/nuxt/dist/app/components/error-404.vue") };
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/routes/renderer.mjs
var renderer_exports = {};
__export(renderer_exports, {
  A: () => renderVNode,
  B: () => ssrRenderAttrs,
  C: () => ssrRenderAttr,
  D: () => ssrInterpolate,
  E: () => ssrRenderClass,
  F: () => ssrRenderList,
  G: () => ssrLooseContain,
  H: () => wr2,
  I: () => useHead,
  J: () => kr,
  K: () => ss,
  a: () => isReactive,
  b: () => reactive,
  c: () => toRefs,
  d: () => computed,
  e: () => effectScope,
  f: () => inject,
  g: () => getCurrentScope,
  h: () => hasInjectionContext,
  i: () => isRef2,
  j: () => ref,
  k: () => defineComponent,
  l: () => h3,
  m: () => markRaw,
  n: () => nextTick,
  o: () => onScopeDispose,
  p: () => shallowRef,
  q: () => provide,
  r: () => br,
  s: () => shallowReactive,
  t: () => toRaw,
  u: () => unref,
  v: () => baseURL,
  w: () => watch,
  x: () => ssrRenderComponent,
  y: () => ssrRenderSuspense,
  z: () => createHooks
});
function getModuleDependencies(e9, t5) {
  if (t5._dependencies[e9]) return t5._dependencies[e9];
  const n6 = t5._dependencies[e9] = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
  if (!t5.manifest) return n6;
  const r4 = t5.manifest[e9];
  if (!r4) return n6;
  r4.file && (n6.preload[e9] = r4, (r4.isEntry || r4.sideEffects) && (n6.scripts[e9] = r4));
  for (const e10 of r4.css || []) n6.styles[e10] = n6.preload[e10] = n6.prefetch[e10] = t5.manifest[e10];
  for (const e10 of r4.assets || []) n6.preload[e10] = n6.prefetch[e10] = t5.manifest[e10];
  for (const e10 of r4.imports || []) {
    const r5 = getModuleDependencies(e10, t5);
    for (const e11 in r5.styles) n6.styles[e11] = r5.styles[e11];
    for (const e11 in r5.preload) n6.preload[e11] = r5.preload[e11];
    for (const e11 in r5.prefetch) n6.prefetch[e11] = r5.prefetch[e11];
  }
  const s6 = {};
  for (const e10 in n6.preload) {
    const t6 = n6.preload[e10];
    t6.preload && (s6[e10] = t6);
  }
  return n6.preload = s6, n6;
}
function getRequestDependencies(e9, t5, n6) {
  const r4 = n6?.exclude ? new Set(n6.exclude) : void 0, s6 = r4 && r4.size > 0;
  if (!s6 && e9._requestDependencies) return e9._requestDependencies;
  let o5;
  const i6 = e9.modules || e9._registeredComponents;
  if (s6) {
    o5 = /* @__PURE__ */ new Set();
    for (const e10 of t5._entrypoints) r4.has(e10) || o5.add(e10);
    if (i6) for (const e10 of i6) r4.has(e10) || o5.add(e10);
  } else if (o5 = new Set(t5._entrypoints), i6) for (const e10 of i6) o5.add(e10);
  const a5 = (function(e10, t6) {
    const n7 = t6._dependencySetsCacheSize, r5 = n7 > 0;
    let s7 = "";
    if (r5) {
      if (e10.size <= 1) for (const t7 of e10) s7 = t7;
      else s7 = [...e10].sort().join(",");
      const r6 = t6._dependencySets.get(s7);
      if (void 0 !== r6) return t6._dependencySets.size >= n7 && (t6._dependencySets.delete(s7), t6._dependencySets.set(s7, r6)), r6;
    }
    const o6 = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
    for (const n8 of e10) {
      const e11 = getModuleDependencies(n8, t6);
      for (const t7 in e11.scripts) o6.scripts[t7] = e11.scripts[t7];
      for (const t7 in e11.styles) o6.styles[t7] = e11.styles[t7];
      for (const t7 in e11.preload) o6.preload[t7] = e11.preload[t7];
      for (const t7 in e11.prefetch) o6.prefetch[t7] = e11.prefetch[t7];
      for (const e12 of t6.manifest?.[n8]?.dynamicImports || []) {
        const n9 = getModuleDependencies(e12, t6);
        for (const e13 in n9.scripts) o6.prefetch[e13] = n9.scripts[e13];
        for (const e13 in n9.styles) o6.prefetch[e13] = n9.styles[e13];
        for (const e13 in n9.preload) o6.prefetch[e13] = n9.preload[e13];
      }
    }
    const i7 = {};
    for (const e11 in o6.prefetch) {
      const t7 = o6.prefetch[e11];
      t7.prefetch && (i7[e11] = t7);
    }
    o6.prefetch = i7;
    for (const e11 in o6.preload) delete o6.prefetch[e11];
    for (const e11 in o6.styles) delete o6.preload[e11], delete o6.prefetch[e11];
    if (r5 && (t6._dependencySets.set(s7, o6), t6._dependencySets.size > n7)) {
      const e11 = t6._dependencySets.keys().next().value;
      void 0 !== e11 && t6._dependencySets.delete(e11);
    }
    return o6;
  })(o5, t5);
  return s6 || (e9._requestDependencies = a5), a5;
}
function renderStyles(e9, t5) {
  const { styles: n6 } = getRequestDependencies(e9, t5);
  let r4 = "";
  for (const e10 in n6) {
    const s6 = n6[e10];
    r4 += `<link rel="stylesheet" href="${t5.buildAssetsURL(s6.file)}" crossorigin>`;
  }
  return r4;
}
function renderResourceHints(e9, t5, n6) {
  const { preload: r4, prefetch: s6 } = getRequestDependencies(e9, t5, n6);
  let o5 = "";
  for (const e10 in r4) {
    const n7 = r4[e10], s7 = t5.buildAssetsURL(n7.file), i6 = n7.module ? "modulepreload" : "preload", a5 = "style" === n7.resourceType || "font" === n7.resourceType || "script" === n7.resourceType || n7.module ? " crossorigin" : "";
    n7.resourceType && n7.mimeType ? o5 += `<link rel="${i6}" as="${n7.resourceType}" type="${n7.mimeType}"${a5} href="${s7}">` : n7.resourceType ? o5 += `<link rel="${i6}" as="${n7.resourceType}"${a5} href="${s7}">` : o5 += `<link rel="${i6}"${a5} href="${s7}">`;
  }
  for (const e10 in s6) {
    const n7 = s6[e10], r5 = t5.buildAssetsURL(n7.file), i6 = "style" === n7.resourceType || "font" === n7.resourceType || "script" === n7.resourceType || n7.module ? " crossorigin" : "";
    n7.resourceType && n7.mimeType ? o5 += `<link rel="prefetch" as="${n7.resourceType}" type="${n7.mimeType}"${i6} href="${r5}">` : n7.resourceType ? o5 += `<link rel="prefetch" as="${n7.resourceType}"${i6} href="${r5}">` : o5 += `<link rel="prefetch"${i6} href="${r5}">`;
  }
  return o5;
}
function renderResourceHeaders(e9, t5, n6) {
  const { preload: r4, prefetch: s6 } = getRequestDependencies(e9, t5, n6), o5 = [];
  for (const e10 in r4) {
    const n7 = r4[e10];
    let s7 = `<${t5.buildAssetsURL(n7.file)}>; rel="${n7.module ? "modulepreload" : "preload"}"`;
    n7.resourceType && (s7 += `; as="${n7.resourceType}"`), n7.mimeType && (s7 += `; type="${n7.mimeType}"`), ("style" === n7.resourceType || "font" === n7.resourceType || "script" === n7.resourceType || n7.module) && (s7 += "; crossorigin"), o5.push(s7);
  }
  for (const e10 in s6) {
    const n7 = s6[e10];
    let r5 = `<${t5.buildAssetsURL(n7.file)}>; rel="prefetch"`;
    n7.resourceType && (r5 += `; as="${n7.resourceType}"`), n7.mimeType && (r5 += `; type="${n7.mimeType}"`), ("style" === n7.resourceType || "font" === n7.resourceType || "script" === n7.resourceType || n7.module) && (r5 += "; crossorigin"), o5.push(r5);
  }
  return { link: o5.join(", ") };
}
function getPreloadLinks(e9, t5, n6) {
  const { preload: r4 } = getRequestDependencies(e9, t5, n6), s6 = [];
  for (const e10 in r4) {
    const n7 = r4[e10];
    s6.push({ rel: n7.module ? "modulepreload" : "preload", as: n7.resourceType, type: n7.mimeType ?? null, crossorigin: "style" === n7.resourceType || "font" === n7.resourceType || "script" === n7.resourceType || n7.module ? "" : null, href: t5.buildAssetsURL(n7.file) });
  }
  return s6;
}
function getPrefetchLinks(e9, t5, n6) {
  const { prefetch: r4 } = getRequestDependencies(e9, t5, n6), s6 = [];
  for (const e10 in r4) {
    const n7 = r4[e10];
    s6.push({ rel: "prefetch", as: n7.resourceType, type: n7.mimeType ?? null, crossorigin: "style" === n7.resourceType || "font" === n7.resourceType || "script" === n7.resourceType || n7.module ? "" : null, href: t5.buildAssetsURL(n7.file) });
  }
  return s6;
}
function renderScripts(e9, t5) {
  const { scripts: n6 } = getRequestDependencies(e9, t5);
  let r4 = "";
  for (const e10 in n6) {
    const s6 = n6[e10];
    s6.module ? r4 += `<script type="module" src="${t5.buildAssetsURL(s6.file)}" crossorigin></script>` : r4 += `<script src="${t5.buildAssetsURL(s6.file)}" defer crossorigin></script>`;
  }
  return r4;
}
function createRenderer$1(t5, n6) {
  const r4 = (function({ manifest: t6, precomputed: n7, buildAssetsURL: r5, dependencySetsCacheSize: s6 }) {
    if (!t6 && !n7) throw new Error("Either manifest or precomputed data must be provided");
    const o5 = { buildAssetsURL: r5 || withLeadingSlash, manifest: t6, precomputed: n7, updateManifest, _dependencies: {}, _dependencySets: /* @__PURE__ */ new Map(), _dependencySetsCacheSize: "number" == typeof s6 && Number.isFinite(s6) && s6 > 0 ? Math.floor(s6) : void 0 === s6 ? 1e3 : 0, _entrypoints: [] };
    function updateManifest(e9) {
      const t7 = Object.entries(e9);
      o5.manifest = e9, o5._dependencies = {}, o5._dependencySets.clear(), o5._entrypoints = t7.filter((e10) => e10[1].isEntry).map(([e10]) => e10);
    }
    __name(updateManifest, "updateManifest");
    return n7 ? (o5._dependencies = n7.dependencies, o5._entrypoints = n7.entrypoints) : t6 && updateManifest(t6), o5;
  })(n6);
  return { rendererContext: r4, async renderToString(e9) {
    e9._registeredComponents = e9._registeredComponents || /* @__PURE__ */ new Set();
    const s6 = await (await Promise.resolve(t5).then((e10) => "default" in e10 ? e10.default : e10))(e9), wrap = /* @__PURE__ */ __name((t6) => () => t6(e9, r4), "wrap");
    return { html: await n6.renderToString(s6, e9), renderResourceHeaders: wrap(renderResourceHeaders), renderResourceHints: wrap(renderResourceHints), renderStyles: wrap(renderStyles), renderScripts: wrap(renderScripts) };
  } };
}
function flatHooks(e9, t5 = {}, n6) {
  for (const r4 in e9) {
    const s6 = e9[r4], o5 = n6 ? `${n6}:${r4}` : r4;
    "object" == typeof s6 && null !== s6 ? flatHooks(s6, t5, o5) : "function" == typeof s6 && (t5[o5] = s6);
  }
  return t5;
}
function callHooks(e9, t5, n6, r4) {
  for (let s6 = n6; s6 < e9.length; s6 += 1) try {
    const n7 = r4 ? r4.run(() => e9[s6](...t5)) : e9[s6](...t5);
    if (n7 && "function" == typeof n7.then) return Promise.resolve(n7).then(() => callHooks(e9, t5, s6 + 1, r4));
  } catch (e10) {
    return Promise.reject(e10);
  }
}
function serialTaskCaller(e9, t5, n6) {
  if (e9.length > 0) return callHooks(e9, t5, 0, fe2(n6));
}
function parallelTaskCaller(e9, t5, n6) {
  if (e9.length > 0) {
    const r4 = fe2(n6);
    return Promise.all(e9.map((e10) => r4.run(() => e10(...t5))));
  }
}
function callEachWith(e9, t5) {
  for (const n6 of [...e9]) n6(t5);
}
function createHooks() {
  return new he2();
}
function dedupeKey(e9) {
  const { props: t5, tag: n6 } = e9;
  if (be2.has(n6)) return n6;
  if ("link" === n6 && "canonical" === t5.rel) return "canonical";
  if ("link" === n6 && "alternate" === t5.rel) {
    if (t5.hreflang) return `alternate:${t5.hreflang}`;
    if (t5.type) return `alternate:${t5.type}:${t5.href || ""}`;
  }
  if (t5.charset) return "charset";
  if ("meta" === e9.tag) {
    for (const r4 of we2) if (void 0 !== t5[r4]) {
      const s6 = t5[r4], o5 = s6 && "string" == typeof s6 && s6.includes(":"), i6 = s6 && Re2.has(s6);
      return `${n6}:${s6}${!(o5 || i6) && e9.key ? `:key:${e9.key}` : ""}`;
    }
  }
  if (e9.key) return `${n6}:key:${e9.key}`;
  if (t5.id) return `${n6}:id:${t5.id}`;
  if ("link" === n6 && "alternate" === t5.rel) return `alternate:${t5.href || ""}`;
  if (ye2.has(n6)) {
    const t6 = e9.textContent || e9.innerHTML;
    if (t6) return `${n6}:content:${t6}`;
  }
}
function hashTag(e9) {
  const t5 = e9._h || e9._d;
  if (t5) return t5;
  const n6 = e9.textContent || e9.innerHTML;
  return n6 || `${e9.tag}:${Object.entries(e9.props).map(([e10, t6]) => `${e10}:${String(t6)}`).join(",")}`;
}
function walkResolver(e9, t5, n6) {
  "function" === typeof e9 && (n6 && ("titleTemplate" === n6 || "o" === n6[0] && "n" === n6[1]) || (e9 = e9()));
  const r4 = t5 ? t5(n6, e9) : e9;
  if (Array.isArray(r4)) return r4.map((e10) => walkResolver(e10, t5));
  if (r4?.constructor === Object) {
    const e10 = {};
    for (const n7 of Object.keys(r4)) e10[n7] = walkResolver(r4[n7], t5, n7);
    return e10;
  }
  return r4;
}
function normalizeProps2(e9, t5) {
  if (e9.props = e9.props || {}, !t5) return e9;
  if ("templateParams" === e9.tag) return e9.props = t5, e9;
  const n6 = ve2.has(e9.tag) || "htmlAttrs" === e9.tag || "bodyAttrs" === e9.tag;
  return Object.entries(t5).forEach(([r4, s6]) => {
    if ("__proto__" === r4 || "constructor" === r4 || "prototype" === r4) return;
    if (null === s6) return void (e9.props[r4] = null);
    if ("class" === r4 || "style" === r4) return void (e9.props[r4] = (function(e10, t6) {
      const n7 = "style" === e10 ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set();
      function processValue(t7) {
        if (null == t7 || void 0 === t7) return;
        const r5 = String(t7).trim();
        if (r5) if ("style" === e10) {
          const [e11, ...t8] = r5.split(":").map((e12) => e12 ? e12.trim() : "");
          e11 && t8.length && n7.set(e11, t8.join(":"));
        } else r5.split(" ").filter(Boolean).forEach((e11) => n7.add(e11));
      }
      __name(processValue, "processValue");
      return "string" == typeof t6 ? "style" === e10 ? t6.split(";").forEach(processValue) : processValue(t6) : Array.isArray(t6) ? t6.forEach((e11) => processValue(e11)) : t6 && "object" == typeof t6 && Object.entries(t6).forEach(([t7, r5]) => {
        r5 && "false" !== r5 && ("style" === e10 ? n7.set(String(t7).trim(), String(r5)) : processValue(t7));
      }), n7;
    })(r4, s6));
    if (ke2.has(r4)) {
      if ("textContent" !== r4 && "innerHTML" !== r4 || "object" != typeof s6) e9[r4] = s6;
      else {
        let n7 = t5.type;
        if (t5.type || (n7 = "application/json"), !n7?.endsWith("json") && "speculationrules" !== n7) return;
        t5.type = n7, e9.props.type = n7, e9[r4] = JSON.stringify(s6);
      }
      return;
    }
    const o5 = r4.startsWith("data-"), i6 = n6 && !o5 ? r4.toLowerCase() : r4, a5 = String(s6), l4 = "meta" === e9.tag && "content" === i6;
    "true" === a5 || "" === a5 ? e9.props[i6] = !o5 && !l4 || a5 : !s6 && o5 && "false" === a5 ? e9.props[i6] = "false" : void 0 !== s6 && (e9.props[i6] = s6);
  }), e9;
}
function normalizeTag(e9, t5) {
  const n6 = normalizeProps2({ tag: e9, props: {} }, "object" == typeof t5 && "function" != typeof t5 ? t5 : { ["script" === e9 || "noscript" === e9 || "style" === e9 ? "innerHTML" : "textContent"]: t5 });
  return n6.key && me2.has(n6.tag) && (n6.props["data-hid"] = n6._h = n6.key), "script" === n6.tag && "object" == typeof n6.innerHTML && (n6.innerHTML = JSON.stringify(n6.innerHTML), n6.props.type = n6.props.type || "application/json"), Array.isArray(n6.props.content) ? n6.props.content.map((e10) => ({ ...n6, props: { ...n6.props, content: e10 } })) : n6;
}
function normalizeEntryToTags(e9, t5) {
  if (!e9) return [];
  "function" == typeof e9 && (e9 = e9());
  const resolvers = /* @__PURE__ */ __name((e10, n7) => {
    for (let r4 = 0; r4 < t5.length; r4++) n7 = t5[r4](e10, n7);
    return n7;
  }, "resolvers");
  e9 = resolvers(void 0, e9);
  const n6 = [];
  return e9 = walkResolver(e9, resolvers), Object.entries(e9 || {}).forEach(([e10, t6]) => {
    if (void 0 !== t6) for (const r4 of Array.isArray(t6) ? t6 : [t6]) n6.push(normalizeTag(e10, r4));
  }), n6.flat();
}
function tagWeight(e9, t5) {
  if ("number" == typeof t5.tagPriority) return t5.tagPriority;
  let n6 = 100;
  const r4 = Ae2[t5.tagPriority] || 0, s6 = e9.resolvedOptions.disableCapoSorting ? { link: {}, script: {}, style: {} } : xe2;
  if (t5.tag in Te2) n6 = Te2[t5.tag];
  else if ("meta" === t5.tag) {
    const e10 = "content-security-policy" === t5.props["http-equiv"] ? "content-security-policy" : t5.props.charset ? "charset" : "viewport" === t5.props.name ? "viewport" : null;
    e10 && (n6 = xe2.meta[e10]);
  } else if ("link" === t5.tag && t5.props.rel) n6 = s6.link[t5.props.rel];
  else if ("script" === t5.tag) {
    const e10 = String(t5.props.type);
    isTruthy(t5.props.async) ? n6 = s6.script.async : t5.props.src && !isTruthy(t5.props.defer) && !isTruthy(t5.props.async) && "module" !== e10 && !e10.endsWith("json") || t5.innerHTML && !e10.endsWith("json") ? n6 = s6.script.sync : (isTruthy(t5.props.defer) && t5.props.src && !isTruthy(t5.props.async) || "module" === e10) && (n6 = s6.script.defer);
  } else "style" === t5.tag && (n6 = t5.innerHTML && Ee2.test(t5.innerHTML) ? s6.style.imported : s6.style.sync);
  return (n6 || 100) + r4;
}
function registerPlugin(e9, t5) {
  const n6 = "function" == typeof t5 ? t5(e9) : t5, r4 = n6.key || String(e9.plugins.size + 1);
  e9.plugins.get(r4) || (e9.plugins.set(r4, n6), e9.hooks.addHooks(n6.hooks || {}));
}
function createUnhead(e9 = {}) {
  const t5 = createHooks();
  t5.addHooks(e9.hooks || {});
  const n6 = !e9.document, r4 = /* @__PURE__ */ new Map(), s6 = /* @__PURE__ */ new Map(), o5 = /* @__PURE__ */ new Set(), i6 = { _entryCount: 1, plugins: s6, dirty: false, resolvedOptions: e9, hooks: t5, ssr: n6, entries: r4, headEntries: /* @__PURE__ */ __name(() => [...r4.values()], "headEntries"), use: /* @__PURE__ */ __name((e10) => registerPlugin(i6, e10), "use"), push(e10, s7) {
    const a5 = { ...s7 };
    delete a5.head;
    const l4 = a5._index ?? i6._entryCount++, c4 = { _i: l4, input: e10, options: a5 }, u6 = { _poll(e11 = false) {
      i6.dirty = true, !e11 && o5.add(l4), t5.callHook("entries:updated", i6);
    }, dispose() {
      r4.delete(l4) && i6.invalidate();
    }, patch(e11) {
      (!a5.mode || "server" === a5.mode && n6 || "client" === a5.mode && !n6) && (c4.input = e11, r4.set(l4, c4), u6._poll());
    } };
    return u6.patch(e10), u6;
  }, async resolveTags() {
    const n7 = { tagMap: /* @__PURE__ */ new Map(), tags: [], entries: [...i6.entries.values()] };
    for (await t5.callHook("entries:resolve", n7); o5.size; ) {
      const n8 = o5.values().next().value;
      o5.delete(n8);
      const s8 = r4.get(n8);
      if (s8) {
        const n9 = { tags: normalizeEntryToTags(s8.input, e9.propResolvers || []).map((e10) => Object.assign(e10, s8.options)), entry: s8 };
        await t5.callHook("entries:normalize", n9), s8._tags = n9.tags.map((e10, t6) => (e10._w = tagWeight(i6, e10), e10._p = (s8._i << 10) + t6, e10._d = dedupeKey(e10), e10._d || (e10._h = hashTag(e10)), e10));
      }
    }
    let s7 = false;
    n7.entries.flatMap((e10) => (e10._tags || []).map((e11) => ({ ...e11, props: { ...e11.props } }))).sort(sortTags).reduce((e10, t6) => {
      const n8 = t6._d || t6._h;
      if (!e10.has(n8)) return e10.set(n8, t6);
      const r5 = e10.get(n8);
      if ("merge" === (t6?.tagDuplicateStrategy || (Ce2.has(t6.tag) ? "merge" : null) || (t6.key && t6.key === r5.key ? "merge" : null))) {
        const s8 = { ...r5.props };
        Object.entries(t6.props).forEach(([e11, t7]) => s8[e11] = "style" === e11 ? new Map([...r5.props.style || /* @__PURE__ */ new Map(), ...t7]) : "class" === e11 ? /* @__PURE__ */ new Set([...r5.props.class || /* @__PURE__ */ new Set(), ...t7]) : t7), e10.set(n8, { ...t6, props: s8 });
      } else t6._p >> 10 == r5._p >> 10 && "meta" === t6.tag && (function(e11) {
        const t7 = e11.split(":");
        return !!t7.length && Se2.has(t7[1]);
      })(n8) ? (e10.set(n8, Object.assign([...Array.isArray(r5) ? r5 : [r5], t6], t6)), s7 = true) : (t6._w === r5._w ? t6._p > r5._p : t6?._w < r5?._w) && e10.set(n8, t6);
      return e10;
    }, n7.tagMap);
    const a5 = n7.tagMap.get("title"), l4 = n7.tagMap.get("titleTemplate");
    if (i6._title = a5?.textContent, l4) {
      const e10 = l4?.textContent;
      if (i6._titleTemplate = e10, e10) {
        let t6 = "function" == typeof e10 ? e10(a5?.textContent) : e10;
        "string" != typeof t6 || i6.plugins.has("template-params") || (t6 = t6.replace("%s", a5?.textContent || "")), a5 ? null === t6 ? n7.tagMap.delete("title") : n7.tagMap.set("title", { ...a5, textContent: t6 }) : (l4.tag = "title", l4.textContent = t6);
      }
    }
    n7.tags = Array.from(n7.tagMap.values()), s7 && (n7.tags = n7.tags.flat().sort(sortTags)), await t5.callHook("tags:beforeResolve", n7), await t5.callHook("tags:resolve", n7), await t5.callHook("tags:afterResolve", n7);
    const c4 = [];
    for (const e10 of n7.tags) {
      const { innerHTML: t6, tag: n8, props: r5 } = e10;
      if (_e2.has(n8) && ((0 !== Object.keys(r5).length || e10.innerHTML || e10.textContent) && ("meta" !== n8 || r5.content || r5["http-equiv"] || r5.charset))) {
        if ("script" === n8 && t6) {
          if (String(r5.type).endsWith("json")) {
            const n9 = "string" == typeof t6 ? t6 : JSON.stringify(t6);
            e10.innerHTML = n9.replace(/</g, "\\u003C");
          } else "string" == typeof t6 && (e10.innerHTML = t6.replace(new RegExp(`</${n8}`, "g"), `<\\/${n8}`));
          e10._d = dedupeKey(e10);
        }
        c4.push(e10);
      }
    }
    return c4;
  }, invalidate() {
    for (const e10 of r4.values()) o5.add(e10._i);
    i6.dirty = true, t5.callHook("entries:updated", i6);
  } };
  return (e9?.plugins || []).forEach((e10) => registerPlugin(i6, e10)), i6.hooks.callHook("init", i6), e9.init?.forEach((e10) => e10 && i6.push(e10)), i6;
}
function encodeAttribute(e9) {
  return String(e9).replace(/"/g, "&quot;");
}
function propsToString(e9) {
  let t5 = "";
  for (const n6 in e9) {
    if (!Object.hasOwn(e9, n6)) continue;
    let r4 = e9[n6];
    "class" !== n6 && "style" !== n6 || "string" == typeof r4 || (r4 = "class" === n6 ? Array.from(r4).join(" ") : Array.from(r4).map(([e10, t6]) => `${e10}:${t6}`).join(";")), false !== r4 && null !== r4 && (t5 += true === r4 ? ` ${n6}` : ` ${n6}="${encodeAttribute(r4)}"`);
  }
  return t5;
}
function tagToString(e9) {
  const t5 = propsToString(e9.props), n6 = `<${e9.tag}${t5}>`;
  if (!ye2.has(e9.tag)) return ge2.has(e9.tag) ? n6 : `${n6}</${e9.tag}>`;
  let r4 = String(e9.textContent || e9.innerHTML || "");
  return r4 = "title" === e9.tag ? r4.replace(/[&<>"'/]/g, (e10) => {
    switch (e10) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#x27;";
      case "/":
        return "&#x2F;";
      default:
        return e10;
    }
  }) : r4.replace(new RegExp(`</${e9.tag}`, "gi"), `<\\/${e9.tag}`), ge2.has(e9.tag) ? n6 : `${n6}${r4}</${e9.tag}>`;
}
async function renderSSRHead(e9, t5) {
  const n6 = { shouldRender: true };
  if (await e9.hooks.callHook("ssr:beforeRender", n6), !n6.shouldRender) return { headTags: "", bodyTags: "", bodyTagsOpen: "", htmlAttrs: "", bodyAttrs: "" };
  const r4 = { tags: t5?.resolvedTags || await e9.resolveTags() };
  await e9.hooks.callHook("ssr:render", r4);
  const s6 = (function(e10) {
    const t6 = { htmlAttrs: {}, bodyAttrs: {}, tags: { head: "", bodyClose: "", bodyOpen: "" } };
    for (const n7 of e10) {
      if ("htmlAttrs" === n7.tag || "bodyAttrs" === n7.tag) {
        Object.assign(t6[n7.tag], n7.props);
        continue;
      }
      const e11 = tagToString(n7), r5 = n7.tagPosition || "head";
      t6.tags[r5] += t6.tags[r5] ? `${e11}` : e11;
    }
    return { headTags: t6.tags.head, bodyTags: t6.tags.bodyClose, bodyTagsOpen: t6.tags.bodyOpen, htmlAttrs: propsToString(t6.htmlAttrs), bodyAttrs: propsToString(t6.bodyAttrs) };
  })(r4.tags), o5 = { tags: r4.tags, html: s6 };
  return await e9.hooks.callHook("ssr:rendered", o5), o5.html;
}
function effectScope(e9) {
  return new EffectScope(e9);
}
function getCurrentScope() {
  return $e2;
}
function onScopeDispose(e9, t5 = false) {
  $e2 && $e2.cleanups.push(e9);
}
function batch(e9, t5 = false) {
  if (e9.flags |= 8, t5) return e9.next = He2, void (He2 = e9);
  e9.next = Ne2, Ne2 = e9;
}
function startBatch() {
  Me2++;
}
function endBatch() {
  if (--Me2 > 0) return;
  if (He2) {
    let e10 = He2;
    for (He2 = void 0; e10; ) {
      const t5 = e10.next;
      e10.next = void 0, e10.flags &= -9, e10 = t5;
    }
  }
  let e9;
  for (; Ne2; ) {
    let t5 = Ne2;
    for (Ne2 = void 0; t5; ) {
      const n6 = t5.next;
      if (t5.next = void 0, t5.flags &= -9, 1 & t5.flags) try {
        t5.trigger();
      } catch (t6) {
        e9 || (e9 = t6);
      }
      t5 = n6;
    }
  }
  if (e9) throw e9;
}
function prepareDeps(e9) {
  for (let t5 = e9.deps; t5; t5 = t5.nextDep) t5.version = -1, t5.prevActiveLink = t5.dep.activeLink, t5.dep.activeLink = t5;
}
function cleanupDeps(e9) {
  let t5, n6 = e9.depsTail, r4 = n6;
  for (; r4; ) {
    const e10 = r4.prevDep;
    -1 === r4.version ? (r4 === n6 && (n6 = e10), removeSub(r4), removeDep(r4)) : t5 = r4, r4.dep.activeLink = r4.prevActiveLink, r4.prevActiveLink = void 0, r4 = e10;
  }
  e9.deps = t5, e9.depsTail = n6;
}
function isDirty(e9) {
  for (let t5 = e9.deps; t5; t5 = t5.nextDep) if (t5.dep.version !== t5.version || t5.dep.computed && (refreshComputed(t5.dep.computed) || t5.dep.version !== t5.version)) return true;
  return !!e9._dirty;
}
function refreshComputed(e9) {
  if (4 & e9.flags && !(16 & e9.flags)) return;
  if (e9.flags &= -17, e9.globalVersion === De2) return;
  if (e9.globalVersion = De2, !e9.isSSR && 128 & e9.flags && (!e9.deps && !e9._dirty || !isDirty(e9))) return;
  e9.flags |= 2;
  const t5 = e9.dep, n6 = Pe2, r4 = Ve2;
  Pe2 = e9, Ve2 = true;
  try {
    prepareDeps(e9);
    const n7 = e9.fn(e9._value);
    (0 === t5.version || hasChanged(n7, e9._value)) && (e9.flags |= 128, e9._value = n7, t5.version++);
  } catch (e10) {
    throw t5.version++, e10;
  } finally {
    Pe2 = n6, Ve2 = r4, cleanupDeps(e9), e9.flags &= -3;
  }
}
function removeSub(e9, t5 = false) {
  const { dep: n6, prevSub: r4, nextSub: s6 } = e9;
  if (r4 && (r4.nextSub = s6, e9.prevSub = void 0), s6 && (s6.prevSub = r4, e9.nextSub = void 0), n6.subs === e9 && (n6.subs = r4, !r4 && n6.computed)) {
    n6.computed.flags &= -5;
    for (let e10 = n6.computed.deps; e10; e10 = e10.nextDep) removeSub(e10, true);
  }
  t5 || --n6.sc || !n6.map || n6.map.delete(n6.key);
}
function removeDep(e9) {
  const { prevDep: t5, nextDep: n6 } = e9;
  t5 && (t5.nextDep = n6, e9.prevDep = void 0), n6 && (n6.prevDep = t5, e9.nextDep = void 0);
}
function pauseTracking() {
  Le2.push(Ve2), Ve2 = false;
}
function resetTracking() {
  const e9 = Le2.pop();
  Ve2 = void 0 === e9 || e9;
}
function cleanupEffect(e9) {
  const { cleanup: t5 } = e9;
  if (e9.cleanup = void 0, t5) {
    const e10 = Pe2;
    Pe2 = void 0;
    try {
      t5();
    } finally {
      Pe2 = e10;
    }
  }
}
function addSub(e9) {
  if (e9.dep.sc++, 4 & e9.sub.flags) {
    const t5 = e9.dep.computed;
    if (t5 && !e9.dep.subs) {
      t5.flags |= 20;
      for (let e10 = t5.deps; e10; e10 = e10.nextDep) addSub(e10);
    }
    const n6 = e9.dep.subs;
    n6 !== e9 && (e9.prevSub = n6, n6 && (n6.nextSub = e9)), e9.dep.subs = e9;
  }
}
function track(e9, t5, n6) {
  if (Ve2 && Pe2) {
    let t6 = Ie2.get(e9);
    t6 || Ie2.set(e9, t6 = /* @__PURE__ */ new Map());
    let r4 = t6.get(n6);
    r4 || (t6.set(n6, r4 = new Dep()), r4.map = t6, r4.key = n6), r4.track();
  }
}
function trigger(e9, t5, n6, r4, s6, o5) {
  const i6 = Ie2.get(e9);
  if (!i6) return void De2++;
  const run = /* @__PURE__ */ __name((e10) => {
    e10 && e10.trigger();
  }, "run");
  if (startBatch(), "clear" === t5) i6.forEach(run);
  else {
    const s7 = i(e9), o6 = s7 && isIntegerKey(n6);
    if (s7 && "length" === n6) {
      const e10 = Number(r4);
      i6.forEach((t6, n7) => {
        ("length" === n7 || n7 === Be2 || !isSymbol(n7) && n7 >= e10) && run(t6);
      });
    } else switch ((void 0 !== n6 || i6.has(void 0)) && run(i6.get(n6)), o6 && run(i6.get(Be2)), t5) {
      case "add":
        s7 ? o6 && run(i6.get("length")) : (run(i6.get(je2)), isMap(e9) && run(i6.get(Fe2)));
        break;
      case "delete":
        s7 || (run(i6.get(je2)), isMap(e9) && run(i6.get(Fe2)));
        break;
      case "set":
        isMap(e9) && run(i6.get(je2));
    }
  }
  endBatch();
}
function reactiveReadArray(e9) {
  const t5 = toRaw(e9);
  return t5 === e9 ? t5 : (track(t5, 0, Be2), isShallow(e9) ? t5 : t5.map(toReactive));
}
function shallowReadArray(e9) {
  return track(e9 = toRaw(e9), 0, Be2), e9;
}
function toWrapped(e9, t5) {
  return isReadonly(e9) ? isReactive(e9) ? toReadonly(toReactive(t5)) : toReadonly(t5) : toReactive(t5);
}
function iterator(e9, t5, n6) {
  const r4 = shallowReadArray(e9), s6 = r4[t5]();
  return r4 === e9 || isShallow(e9) || (s6._next = s6.next, s6.next = () => {
    const e10 = s6._next();
    return e10.done || (e10.value = n6(e10.value)), e10;
  }), s6;
}
function apply(e9, t5, n6, r4, s6, o5) {
  const i6 = shallowReadArray(e9), a5 = i6 !== e9 && !isShallow(e9), l4 = i6[t5];
  if (l4 !== We2[t5]) {
    const t6 = l4.apply(e9, o5);
    return a5 ? toReactive(t6) : t6;
  }
  let c4 = n6;
  i6 !== e9 && (a5 ? c4 = /* @__PURE__ */ __name(function(t6, r5) {
    return n6.call(this, toWrapped(e9, t6), r5, e9);
  }, "c") : n6.length > 2 && (c4 = /* @__PURE__ */ __name(function(t6, r5) {
    return n6.call(this, t6, r5, e9);
  }, "c")));
  const u6 = l4.call(i6, c4, r4);
  return a5 && s6 ? s6(u6) : u6;
}
function reduce(e9, t5, n6, r4) {
  const s6 = shallowReadArray(e9), o5 = s6 !== e9 && !isShallow(e9);
  let i6 = n6, a5 = false;
  s6 !== e9 && (o5 ? (a5 = 0 === r4.length, i6 = /* @__PURE__ */ __name(function(t6, r5, s7) {
    return a5 && (a5 = false, t6 = toWrapped(e9, t6)), n6.call(this, t6, toWrapped(e9, r5), s7, e9);
  }, "i")) : n6.length > 3 && (i6 = /* @__PURE__ */ __name(function(t6, r5, s7) {
    return n6.call(this, t6, r5, s7, e9);
  }, "i")));
  const l4 = s6[t5](i6, ...r4);
  return a5 ? toWrapped(e9, l4) : l4;
}
function searchProxy(e9, t5, n6) {
  const r4 = toRaw(e9);
  track(r4, 0, Be2);
  const s6 = r4[t5](...n6);
  return -1 !== s6 && false !== s6 || !isProxy(n6[0]) ? s6 : (n6[0] = toRaw(n6[0]), r4[t5](...n6));
}
function noTracking(e9, t5, n6 = []) {
  pauseTracking(), startBatch();
  const r4 = toRaw(e9)[t5].apply(e9, n6);
  return endBatch(), resetTracking(), r4;
}
function hasOwnProperty(e9) {
  isSymbol(e9) || (e9 = String(e9));
  const t5 = toRaw(this);
  return track(t5, 0, e9), t5.hasOwnProperty(e9);
}
function createReadonlyMethod(e9) {
  return function(...t5) {
    return "delete" !== e9 && ("clear" === e9 ? void 0 : this);
  };
}
function createInstrumentations(e9, t5) {
  const n6 = { get(n7) {
    const r4 = this.__v_raw, s6 = toRaw(r4), o5 = toRaw(n7);
    e9 || (hasChanged(n7, o5) && track(s6, 0, n7), track(s6, 0, o5));
    const { has: i6 } = getProto(s6), a5 = t5 ? toShallow : e9 ? toReadonly : toReactive;
    return i6.call(s6, n7) ? a5(r4.get(n7)) : i6.call(s6, o5) ? a5(r4.get(o5)) : void (r4 !== s6 && r4.get(n7));
  }, get size() {
    const t6 = this.__v_raw;
    return !e9 && track(toRaw(t6), 0, je2), t6.size;
  }, has(t6) {
    const n7 = this.__v_raw, r4 = toRaw(n7), s6 = toRaw(t6);
    return e9 || (hasChanged(t6, s6) && track(r4, 0, t6), track(r4, 0, s6)), t6 === s6 ? n7.has(t6) : n7.has(t6) || n7.has(s6);
  }, forEach(n7, r4) {
    const s6 = this, o5 = s6.__v_raw, i6 = toRaw(o5), a5 = t5 ? toShallow : e9 ? toReadonly : toReactive;
    return !e9 && track(i6, 0, je2), o5.forEach((e10, t6) => n7.call(r4, a5(e10), a5(t6), s6));
  } };
  n(n6, e9 ? { add: createReadonlyMethod("add"), set: createReadonlyMethod("set"), delete: createReadonlyMethod("delete"), clear: createReadonlyMethod("clear") } : { add(e10) {
    const n7 = toRaw(this), r4 = getProto(n7), s6 = toRaw(e10), o5 = t5 || isShallow(e10) || isReadonly(e10) ? e10 : s6;
    return r4.has.call(n7, o5) || hasChanged(e10, o5) && r4.has.call(n7, e10) || hasChanged(s6, o5) && r4.has.call(n7, s6) || (n7.add(o5), trigger(n7, "add", o5, o5)), this;
  }, set(e10, n7) {
    t5 || isShallow(n7) || isReadonly(n7) || (n7 = toRaw(n7));
    const r4 = toRaw(this), { has: s6, get: o5 } = getProto(r4);
    let i6 = s6.call(r4, e10);
    i6 || (e10 = toRaw(e10), i6 = s6.call(r4, e10));
    const a5 = o5.call(r4, e10);
    return r4.set(e10, n7), i6 ? hasChanged(n7, a5) && trigger(r4, "set", e10, n7) : trigger(r4, "add", e10, n7), this;
  }, delete(e10) {
    const t6 = toRaw(this), { has: n7, get: r4 } = getProto(t6);
    let s6 = n7.call(t6, e10);
    s6 || (e10 = toRaw(e10), s6 = n7.call(t6, e10)), r4 && r4.call(t6, e10);
    const o5 = t6.delete(e10);
    return s6 && trigger(t6, "delete", e10, void 0), o5;
  }, clear() {
    const e10 = toRaw(this), t6 = 0 !== e10.size, n7 = e10.clear();
    return t6 && trigger(e10, "clear", void 0, void 0), n7;
  } });
  return ["keys", "values", "entries", Symbol.iterator].forEach((r4) => {
    n6[r4] = /* @__PURE__ */ (function(e10, t6, n7) {
      return function(...r5) {
        const s6 = this.__v_raw, o5 = toRaw(s6), i6 = isMap(o5), a5 = "entries" === e10 || e10 === Symbol.iterator && i6, l4 = "keys" === e10 && i6, c4 = s6[e10](...r5), u6 = n7 ? toShallow : t6 ? toReadonly : toReactive;
        return !t6 && track(o5, 0, l4 ? Fe2 : je2), n(Object.create(c4), { next() {
          const { value: e11, done: t7 } = c4.next();
          return t7 ? { value: e11, done: t7 } : { value: a5 ? [u6(e11[0]), u6(e11[1])] : u6(e11), done: t7 };
        } });
      };
    })(r4, e9, t5);
  }), n6;
}
function createInstrumentationGetter(e9, t5) {
  const n6 = createInstrumentations(e9, t5);
  return (t6, r4, s6) => "__v_isReactive" === r4 ? !e9 : "__v_isReadonly" === r4 ? e9 : "__v_raw" === r4 ? t6 : Reflect.get(hasOwn(n6, r4) && r4 in t6 ? n6 : t6, r4, s6);
}
function reactive(e9) {
  return isReadonly(e9) ? e9 : createReactiveObject(e9, false, Ke2, Ye2, tt2);
}
function shallowReactive(e9) {
  return createReactiveObject(e9, false, Ge2, Xe2, nt2);
}
function readonly(e9) {
  return createReactiveObject(e9, true, Je2, Qe2, rt2);
}
function shallowReadonly(e9) {
  return createReactiveObject(e9, true, Ze2, et2, st2);
}
function createReactiveObject(e9, t5, n6, r4, s6) {
  if (!isObject(e9)) return e9;
  if (e9.__v_raw && (!t5 || !e9.__v_isReactive)) return e9;
  if (e9.__v_skip || !Object.isExtensible(e9)) return e9;
  const o5 = s6.get(e9);
  if (o5) return o5;
  const i6 = (function(e10) {
    switch (e10) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  })(toRawType(e9));
  if (0 === i6) return e9;
  const a5 = new Proxy(e9, 2 === i6 ? r4 : n6);
  return s6.set(e9, a5), a5;
}
function isReactive(e9) {
  return isReadonly(e9) ? isReactive(e9.__v_raw) : !(!e9 || !e9.__v_isReactive);
}
function isReadonly(e9) {
  return !(!e9 || !e9.__v_isReadonly);
}
function isShallow(e9) {
  return !(!e9 || !e9.__v_isShallow);
}
function isProxy(e9) {
  return !!e9 && !!e9.__v_raw;
}
function toRaw(e9) {
  const t5 = e9 && e9.__v_raw;
  return t5 ? toRaw(t5) : e9;
}
function markRaw(e9) {
  return !hasOwn(e9, "__v_skip") && Object.isExtensible(e9) && def(e9, "__v_skip", true), e9;
}
function isRef2(e9) {
  return !!e9 && true === e9.__v_isRef;
}
function ref(e9) {
  return createRef(e9, false);
}
function shallowRef(e9) {
  return createRef(e9, true);
}
function createRef(e9, t5) {
  return isRef2(e9) ? e9 : new RefImpl(e9, t5);
}
function unref(e9) {
  return isRef2(e9) ? e9.value : e9;
}
function toValue(e9) {
  return isFunction(e9) ? e9() : unref(e9);
}
function proxyRefs(e9) {
  return isReactive(e9) ? e9 : new Proxy(e9, ot2);
}
function customRef(e9) {
  return new CustomRefImpl(e9);
}
function toRefs(e9) {
  const t5 = i(e9) ? new Array(e9.length) : {};
  for (const n6 in e9) t5[n6] = propertyToRef(e9, n6);
  return t5;
}
function propertyToRef(e9, t5, n6) {
  return new ObjectRefImpl(e9, t5, n6);
}
function onWatcherCleanup(e9, t5 = false, n6 = lt2) {
  if (n6) {
    let t6 = at2.get(n6);
    t6 || at2.set(n6, t6 = []), t6.push(e9);
  }
}
function traverse(e9, t5 = 1 / 0, n6) {
  if (t5 <= 0 || !isObject(e9) || e9.__v_skip) return e9;
  if (((n6 = n6 || /* @__PURE__ */ new Map()).get(e9) || 0) >= t5) return e9;
  if (n6.set(e9, t5), t5--, isRef2(e9)) traverse(e9.value, t5, n6);
  else if (i(e9)) for (let r4 = 0; r4 < e9.length; r4++) traverse(e9[r4], t5, n6);
  else if (isSet(e9) || isMap(e9)) e9.forEach((e10) => {
    traverse(e10, t5, n6);
  });
  else if (isPlainObject(e9)) {
    for (const r4 in e9) traverse(e9[r4], t5, n6);
    for (const r4 of Object.getOwnPropertySymbols(e9)) Object.prototype.propertyIsEnumerable.call(e9, r4) && traverse(e9[r4], t5, n6);
  }
  return e9;
}
function callWithErrorHandling(e9, t5, n6, r4) {
  try {
    return r4 ? e9(...r4) : e9();
  } catch (e10) {
    handleError(e10, t5, n6);
  }
}
function callWithAsyncErrorHandling(e9, t5, n6, r4) {
  if (isFunction(e9)) {
    const s6 = callWithErrorHandling(e9, t5, n6, r4);
    return s6 && isPromise(s6) && s6.catch((e10) => {
      handleError(e10, t5, n6);
    }), s6;
  }
  if (i(e9)) {
    const s6 = [];
    for (let o5 = 0; o5 < e9.length; o5++) s6.push(callWithAsyncErrorHandling(e9[o5], t5, n6, r4));
    return s6;
  }
}
function handleError(e9, t5, n6, r4 = true) {
  t5 && t5.vnode;
  const { errorHandler: s6, throwUnhandledErrorInProduction: o5 } = t5 && t5.appContext.config || t;
  if (t5) {
    let r5 = t5.parent;
    const o6 = t5.proxy, i6 = `https://vuejs.org/error-reference/#runtime-${n6}`;
    for (; r5; ) {
      const t6 = r5.ec;
      if (t6) {
        for (let n7 = 0; n7 < t6.length; n7++) if (false === t6[n7](e9, o6, i6)) return;
      }
      r5 = r5.parent;
    }
    if (s6) return pauseTracking(), callWithErrorHandling(s6, null, 10, [e9, o6, i6]), void resetTracking();
  }
  !(function(e10, t6, n7, r5 = true, s7 = false) {
    if (s7) throw e10;
    console.error(e10);
  })(e9, 0, 0, r4, o5);
}
function nextTick(e9) {
  const t5 = yt2 || mt2;
  return e9 ? t5.then(this ? e9.bind(this) : e9) : t5;
}
function queueJob(e9) {
  if (!(1 & e9.flags)) {
    const t5 = getId(e9), n6 = pt2[pt2.length - 1];
    !n6 || !(2 & e9.flags) && t5 >= getId(n6) ? pt2.push(e9) : pt2.splice((function(e10) {
      let t6 = dt2 + 1, n7 = pt2.length;
      for (; t6 < n7; ) {
        const r4 = t6 + n7 >>> 1, s6 = pt2[r4], o5 = getId(s6);
        o5 < e10 || o5 === e10 && 2 & s6.flags ? t6 = r4 + 1 : n7 = r4;
      }
      return t6;
    })(t5), 0, e9), e9.flags |= 1, queueFlush();
  }
}
function queueFlush() {
  yt2 || (yt2 = mt2.then(flushJobs));
}
function queuePostFlushCb(e9) {
  i(e9) ? ft2.push(...e9) : ht2 && -1 === e9.id ? ht2.splice(gt2 + 1, 0, e9) : 1 & e9.flags || (ft2.push(e9), e9.flags |= 1), queueFlush();
}
function flushPreFlushCbs(e9, t5, n6 = dt2 + 1) {
  for (; n6 < pt2.length; n6++) {
    const t6 = pt2[n6];
    if (t6 && 2 & t6.flags) {
      if (e9 && t6.id !== e9.uid) continue;
      pt2.splice(n6, 1), n6--, 4 & t6.flags && (t6.flags &= -2), t6(), 4 & t6.flags || (t6.flags &= -2);
    }
  }
}
function flushPostFlushCbs(e9) {
  if (ft2.length) {
    const e10 = [...new Set(ft2)].sort((e11, t5) => getId(e11) - getId(t5));
    if (ft2.length = 0, ht2) return void ht2.push(...e10);
    for (ht2 = e10, gt2 = 0; gt2 < ht2.length; gt2++) {
      const e11 = ht2[gt2];
      4 & e11.flags && (e11.flags &= -2), 8 & e11.flags || e11(), e11.flags &= -2;
    }
    ht2 = null, gt2 = 0;
  }
}
function flushJobs(e9) {
  try {
    for (dt2 = 0; dt2 < pt2.length; dt2++) {
      const e10 = pt2[dt2];
      !e10 || 8 & e10.flags || (4 & e10.flags && (e10.flags &= -2), callWithErrorHandling(e10, e10.i, e10.i ? 15 : 14), 4 & e10.flags || (e10.flags &= -2));
    }
  } finally {
    for (; dt2 < pt2.length; dt2++) {
      const e10 = pt2[dt2];
      e10 && (e10.flags &= -2);
    }
    dt2 = -1, pt2.length = 0, flushPostFlushCbs(), yt2 = null, (pt2.length || ft2.length) && flushJobs();
  }
}
function setCurrentRenderingInstance$1(e9) {
  const t5 = bt2;
  return bt2 = e9, kt2 = e9 && e9.type.__scopeId || null, t5;
}
function withCtx(e9, t5 = bt2, n6) {
  if (!t5) return e9;
  if (e9._n) return e9;
  const renderFnWithContext = /* @__PURE__ */ __name((...n7) => {
    renderFnWithContext._d && setBlockTracking(-1);
    const r4 = setCurrentRenderingInstance$1(t5);
    let s6;
    try {
      s6 = e9(...n7);
    } finally {
      setCurrentRenderingInstance$1(r4), renderFnWithContext._d && setBlockTracking(1);
    }
    return s6;
  }, "renderFnWithContext");
  return renderFnWithContext._n = true, renderFnWithContext._c = true, renderFnWithContext._d = true, renderFnWithContext;
}
function invokeDirectiveHook(e9, t5, n6, r4) {
  const s6 = e9.dirs, o5 = t5 && t5.dirs;
  for (let i6 = 0; i6 < s6.length; i6++) {
    const a5 = s6[i6];
    o5 && (a5.oldValue = o5[i6].value);
    let l4 = a5.dir[r4];
    l4 && (pauseTracking(), callWithAsyncErrorHandling(l4, n6, 8, [e9.el, a5, e9, t5]), resetTracking());
  }
}
function provide(e9, t5) {
  if (vn2) {
    let n6 = vn2.provides;
    const r4 = vn2.parent && vn2.parent.provides;
    r4 === n6 && (n6 = vn2.provides = Object.create(r4)), n6[e9] = t5;
  }
}
function inject(e9, t5, n6 = false) {
  const r4 = getCurrentInstance();
  if (r4 || tn3) {
    let s6 = tn3 ? tn3._context.provides : r4 ? null == r4.parent || r4.ce ? r4.vnode.appContext && r4.vnode.appContext.provides : r4.parent.provides : void 0;
    if (s6 && e9 in s6) return s6[e9];
    if (arguments.length > 1) return n6 && isFunction(t5) ? t5.call(r4 && r4.proxy) : t5;
  }
}
function hasInjectionContext() {
  return !(!getCurrentInstance() && !tn3);
}
function watchEffect(e9, t5) {
  return doWatch(e9, null, t5);
}
function watchSyncEffect(e9, t5) {
  return doWatch(e9, null, { flush: "sync" });
}
function watch(e9, t5, n6) {
  return doWatch(e9, t5, n6);
}
function doWatch(e9, t5, n6 = t) {
  const { immediate: r4, deep: s6, flush: o5, once: i6 } = n6, a5 = n({}, n6), l4 = t5 && r4 || !t5 && "post" !== o5;
  let c4;
  if (Sn2) {
    if ("sync" === o5) {
      const e10 = useSSRContext();
      c4 = e10.__watcherHandles || (e10.__watcherHandles = []);
    } else if (!l4) {
      const watchStopHandle = /* @__PURE__ */ __name(() => {
      }, "watchStopHandle");
      return watchStopHandle.stop = NOOP, watchStopHandle.resume = NOOP, watchStopHandle.pause = NOOP, watchStopHandle;
    }
  }
  const u6 = vn2;
  a5.call = (e10, t6, n7) => callWithAsyncErrorHandling(e10, u6, t6, n7);
  let p6 = false;
  "post" === o5 ? a5.scheduler = (e10) => {
    on2(e10, u6 && u6.suspense);
  } : "sync" !== o5 && (p6 = true, a5.scheduler = (e10, t6) => {
    t6 ? e10() : queueJob(e10);
  }), a5.augmentJob = (e10) => {
    t5 && (e10.flags |= 4), p6 && (e10.flags |= 2, u6 && (e10.id = u6.uid, e10.i = u6));
  };
  const d5 = (function(e10, t6, n7 = t) {
    const { immediate: r5, deep: s7, once: o6, scheduler: i7, augmentJob: a6, call: l5 } = n7, reactiveGetter = /* @__PURE__ */ __name((e11) => s7 ? e11 : isShallow(e11) || false === s7 || 0 === s7 ? traverse(e11, 1) : traverse(e11), "reactiveGetter");
    let c5, u7, p7, d6, f4 = false, m4 = false;
    if (isRef2(e10) ? (u7 = /* @__PURE__ */ __name(() => e10.value, "u"), f4 = isShallow(e10)) : isReactive(e10) ? (u7 = /* @__PURE__ */ __name(() => reactiveGetter(e10), "u"), f4 = true) : i(e10) ? (m4 = true, f4 = e10.some((e11) => isReactive(e11) || isShallow(e11)), u7 = /* @__PURE__ */ __name(() => e10.map((e11) => isRef2(e11) ? e11.value : isReactive(e11) ? reactiveGetter(e11) : isFunction(e11) ? l5 ? l5(e11, 2) : e11() : void 0), "u")) : u7 = isFunction(e10) ? t6 ? l5 ? () => l5(e10, 2) : e10 : () => {
      if (p7) {
        pauseTracking();
        try {
          p7();
        } finally {
          resetTracking();
        }
      }
      const t7 = lt2;
      lt2 = c5;
      try {
        return l5 ? l5(e10, 3, [d6]) : e10(d6);
      } finally {
        lt2 = t7;
      }
    } : NOOP, t6 && s7) {
      const e11 = u7, t7 = true === s7 ? 1 / 0 : s7;
      u7 = /* @__PURE__ */ __name(() => traverse(e11(), t7), "u");
    }
    const v5 = getCurrentScope(), watchHandle = /* @__PURE__ */ __name(() => {
      c5.stop(), v5 && v5.active && remove(v5.effects, c5);
    }, "watchHandle");
    if (o6 && t6) {
      const e11 = t6;
      t6 = /* @__PURE__ */ __name((...t7) => {
        const n8 = e11(...t7);
        return watchHandle(), n8;
      }, "t");
    }
    let _3 = m4 ? new Array(e10.length).fill(it2) : it2;
    const job = /* @__PURE__ */ __name((e11) => {
      if (1 & c5.flags && (c5.dirty || e11)) if (t6) {
        const n8 = c5.run();
        if (e11 || s7 || f4 || (m4 ? n8.some((e12, t7) => hasChanged(e12, _3[t7])) : hasChanged(n8, _3))) {
          p7 && p7();
          const e12 = lt2;
          lt2 = c5;
          try {
            const e13 = [n8, _3 === it2 ? void 0 : m4 && _3[0] === it2 ? [] : _3, d6];
            _3 = n8, l5 ? l5(t6, 3, e13) : t6(...e13);
          } finally {
            lt2 = e12;
          }
        }
      } else c5.run();
    }, "job");
    return a6 && a6(job), c5 = new ReactiveEffect(u7), c5.scheduler = i7 ? () => i7(job, false) : job, d6 = /* @__PURE__ */ __name((e11) => onWatcherCleanup(e11, false, c5), "d"), p7 = c5.onStop = () => {
      const e11 = at2.get(c5);
      if (e11) {
        if (l5) l5(e11, 4);
        else for (const t7 of e11) t7();
        at2.delete(c5);
      }
    }, t6 ? r5 ? job(true) : _3 = c5.run() : i7 ? i7(job.bind(null, true), true) : c5.run(), watchHandle.pause = c5.pause.bind(c5), watchHandle.resume = c5.resume.bind(c5), watchHandle.stop = watchHandle, watchHandle;
  })(e9, t5, a5);
  return Sn2 && (c4 ? c4.push(d5) : l4 && d5()), d5;
}
function instanceWatch(e9, t5, n6) {
  const r4 = this.proxy, s6 = isString(e9) ? e9.includes(".") ? createPathGetter(r4, e9) : () => r4[e9] : e9.bind(r4, r4);
  let o5;
  isFunction(t5) ? o5 = t5 : (o5 = t5.handler, n6 = t5);
  const i6 = setCurrentInstance(this), a5 = doWatch(s6, o5.bind(r4), n6);
  return i6(), a5;
}
function createPathGetter(e9, t5) {
  const n6 = t5.split(".");
  return () => {
    let t6 = e9;
    for (let e10 = 0; e10 < n6.length && t6; e10++) t6 = t6[n6[e10]];
    return t6;
  };
}
function moveTeleport(e9, t5, n6, { o: { insert: r4 }, m: s6 }, o5 = 2) {
  0 === o5 && r4(e9.targetAnchor, t5, n6);
  const { el: i6, anchor: a5, shapeFlag: l4, children: c4, props: u6 } = e9, p6 = 2 === o5;
  if (p6 && r4(i6, t5, n6), !St2.has(e9) && (!p6 || isTeleportDisabled(u6)) && 16 & l4) for (let e10 = 0; e10 < c4.length; e10++) s6(c4[e10], t5, n6, 2);
  p6 && r4(a5, t5, n6);
}
function updateCssVars(e9, t5) {
  const n6 = e9.ctx;
  if (n6 && n6.ut) {
    let r4, s6;
    for (t5 ? (r4 = e9.el, s6 = e9.anchor) : (r4 = e9.targetStart, s6 = e9.targetAnchor); r4 && r4 !== s6; ) 1 === r4.nodeType && r4.setAttribute("data-v-owner", n6.uid), r4 = r4.nextSibling;
    n6.ut();
  }
}
function prepareAnchor(e9, t5, n6, r4, s6 = null) {
  const o5 = t5.targetStart = n6(""), i6 = t5.targetAnchor = n6("");
  return o5[wt2] = i6, e9 && (r4(o5, e9, s6), r4(i6, e9, s6)), i6;
}
function useTransitionState() {
  const e9 = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
  return It2(() => {
    e9.isMounted = true;
  }), Bt2(() => {
    e9.isUnmounting = true;
  }), e9;
}
function findNonCommentChild(e9) {
  let t5 = e9[0];
  if (e9.length > 1) {
    for (const n6 of e9) if (n6.type !== pn2) {
      t5 = n6;
      break;
    }
  }
  return t5;
}
function getLeavingNodesForType(e9, t5) {
  const { leavingVNodes: n6 } = e9;
  let r4 = n6.get(t5.type);
  return r4 || (r4 = /* @__PURE__ */ Object.create(null), n6.set(t5.type, r4)), r4;
}
function resolveTransitionHooks(e9, t5, n6, r4, s6) {
  const { appear: o5, mode: i6, persisted: a5 = false, onBeforeEnter: l4, onEnter: c4, onAfterEnter: u6, onEnterCancelled: p6, onBeforeLeave: d5, onLeave: f4, onAfterLeave: g3, onLeaveCancelled: m4, onBeforeAppear: v5, onAppear: _3, onAfterAppear: b4, onAppearCancelled: k4 } = t5, C3 = String(e9.key), S4 = getLeavingNodesForType(n6, e9), callHook2 = /* @__PURE__ */ __name((e10, t6) => {
    e10 && callWithAsyncErrorHandling(e10, r4, 9, t6);
  }, "callHook"), callAsyncHook = /* @__PURE__ */ __name((e10, t6) => {
    const n7 = t6[1];
    callHook2(e10, t6), i(e10) ? e10.every((e11) => e11.length <= 1) && n7() : e10.length <= 1 && n7();
  }, "callAsyncHook"), w3 = { mode: i6, persisted: a5, beforeEnter(t6) {
    let r5 = l4;
    if (!n6.isMounted) {
      if (!o5) return;
      r5 = v5 || l4;
    }
    t6[Tt2] && t6[Tt2](true);
    const s7 = S4[C3];
    s7 && isSameVNodeType(e9, s7) && s7.el[Tt2] && s7.el[Tt2](), callHook2(r5, [t6]);
  }, enter(t6) {
    if (S4[C3] === e9) return;
    let r5 = c4, s7 = u6, i7 = p6;
    if (!n6.isMounted) {
      if (!o5) return;
      r5 = _3 || c4, s7 = b4 || u6, i7 = k4 || p6;
    }
    let a6 = false;
    t6[At2] = (e10) => {
      a6 || (a6 = true, callHook2(e10 ? i7 : s7, [t6]), w3.delayedLeave && w3.delayedLeave(), t6[At2] = void 0);
    };
    const l5 = t6[At2].bind(null, false);
    r5 ? callAsyncHook(r5, [t6, l5]) : l5();
  }, leave(t6, r5) {
    const s7 = String(e9.key);
    if (t6[At2] && t6[At2](true), n6.isUnmounting) return r5();
    callHook2(d5, [t6]);
    let o6 = false;
    t6[Tt2] = (n7) => {
      o6 || (o6 = true, r5(), callHook2(n7 ? m4 : g3, [t6]), t6[Tt2] = void 0, S4[s7] === e9 && delete S4[s7]);
    };
    const i7 = t6[Tt2].bind(null, false);
    S4[s7] = e9, f4 ? callAsyncHook(f4, [t6, i7]) : i7();
  }, clone(e10) {
    const o6 = resolveTransitionHooks(e10, t5, n6, r4, s6);
    return s6 && s6(o6), o6;
  } };
  return w3;
}
function emptyPlaceholder(e9) {
  if (isKeepAlive(e9)) return (e9 = cloneVNode(e9)).children = null, e9;
}
function getInnerChild$1(e9) {
  if (!isKeepAlive(e9)) return isTeleport(e9.type) && e9.children ? findNonCommentChild(e9.children) : e9;
  if (e9.component) return e9.component.subTree;
  const { shapeFlag: t5, children: n6 } = e9;
  if (n6) {
    if (16 & t5) return n6[0];
    if (32 & t5 && isFunction(n6.default)) return n6.default();
  }
}
function setTransitionHooks(e9, t5) {
  6 & e9.shapeFlag && e9.component ? (e9.transition = t5, setTransitionHooks(e9.component.subTree, t5)) : 128 & e9.shapeFlag ? (e9.ssContent.transition = t5.clone(e9.ssContent), e9.ssFallback.transition = t5.clone(e9.ssFallback)) : e9.transition = t5;
}
function getTransitionRawChildren(e9, t5 = false, n6) {
  let r4 = [], s6 = 0;
  for (let o5 = 0; o5 < e9.length; o5++) {
    let i6 = e9[o5];
    const a5 = null == n6 ? i6.key : String(n6) + String(null != i6.key ? i6.key : o5);
    i6.type === cn2 ? (128 & i6.patchFlag && s6++, r4 = r4.concat(getTransitionRawChildren(i6.children, t5, a5))) : (t5 || i6.type !== pn2) && r4.push(null != a5 ? cloneVNode(i6, { key: a5 }) : i6);
  }
  if (s6 > 1) for (let e10 = 0; e10 < r4.length; e10++) r4[e10].patchFlag = -2;
  return r4;
}
function defineComponent(e9, t5) {
  return isFunction(e9) ? (() => n({ name: e9.name }, t5, { setup: e9 }))() : e9;
}
function markAsyncBoundary(e9) {
  e9.ids = [e9.ids[0] + e9.ids[2]++ + "-", 0, 0];
}
function isTemplateRefKey(e9, t5) {
  let n6;
  return !(!(n6 = Object.getOwnPropertyDescriptor(e9, t5)) || n6.configurable);
}
function setRef(e9, t5, n6, r4, s6 = false) {
  if (i(e9)) return void e9.forEach((e10, o6) => setRef(e10, t5 && (i(t5) ? t5[o6] : t5), n6, r4, s6));
  if (isAsyncWrapper(r4) && !s6) return void (512 & r4.shapeFlag && r4.type.__asyncResolved && r4.component.subTree.component && setRef(e9, t5, n6, r4.component.subTree));
  const o5 = 4 & r4.shapeFlag ? getComponentPublicInstance(r4.component) : r4.el, i6 = s6 ? null : o5, { i: a5, r: l4 } = e9, c4 = t5 && t5.r, u6 = a5.refs === t ? a5.refs = {} : a5.refs, p6 = a5.setupState, d5 = toRaw(p6), f4 = p6 === t ? NO : (e10) => !isTemplateRefKey(u6, e10) && hasOwn(d5, e10), canSetRef = /* @__PURE__ */ __name((e10, t6) => !t6 || !isTemplateRefKey(u6, t6), "canSetRef");
  if (null != c4 && c4 !== l4) {
    if (invalidatePendingSetRef(t5), isString(c4)) u6[c4] = null, f4(c4) && (p6[c4] = null);
    else if (isRef2(c4)) {
      const e10 = t5;
      canSetRef(0, e10.k) && (c4.value = null), e10.k && (u6[e10.k] = null);
    }
  }
  if (isFunction(l4)) {
    pauseTracking();
    try {
      callWithErrorHandling(l4, a5, 12, [i6, u6]);
    } finally {
      resetTracking();
    }
  } else {
    const t6 = isString(l4), r5 = isRef2(l4);
    if (t6 || r5) {
      const doSet = /* @__PURE__ */ __name(() => {
        if (e9.f) {
          const n7 = t6 ? f4(l4) ? p6[l4] : u6[l4] : canSetRef() || !e9.k ? l4.value : u6[e9.k];
          if (s6) i(n7) && remove(n7, o5);
          else if (i(n7)) n7.includes(o5) || n7.push(o5);
          else if (t6) u6[l4] = [o5], f4(l4) && (p6[l4] = u6[l4]);
          else {
            const t7 = [o5];
            canSetRef(0, e9.k) && (l4.value = t7), e9.k && (u6[e9.k] = t7);
          }
        } else t6 ? (u6[l4] = i6, f4(l4) && (p6[l4] = i6)) : r5 && (canSetRef(0, e9.k) && (l4.value = i6), e9.k && (u6[e9.k] = i6));
      }, "doSet");
      if (i6) {
        const job = /* @__PURE__ */ __name(() => {
          doSet(), Pt2.delete(e9);
        }, "job");
        job.id = -1, Pt2.set(e9, job), on2(job, n6);
      } else invalidatePendingSetRef(e9), doSet();
    }
  }
}
function invalidatePendingSetRef(e9) {
  const t5 = Pt2.get(e9);
  t5 && (t5.flags |= 8, Pt2.delete(e9));
}
function createHydrationFunctions(e9) {
  const { mt: t5, p: n6, o: { patchProp: r4, createText: s6, nextSibling: o5, parentNode: i6, remove: a5, insert: l4, createComment: c4 } } = e9, hydrateNode = /* @__PURE__ */ __name((n7, r5, a6, c5, u6, p6 = false) => {
    p6 = p6 || !!r5.dynamicChildren;
    const d5 = isComment(n7) && "[" === n7.data, onMismatch = /* @__PURE__ */ __name(() => handleMismatch(n7, r5, a6, c5, u6, d5), "onMismatch"), { type: f4, ref: g3, shapeFlag: m4, patchFlag: y4 } = r5;
    let v5 = n7.nodeType;
    r5.el = n7, -2 === y4 && (p6 = false, r5.dynamicChildren = null);
    let _3 = null;
    switch (f4) {
      case un2:
        3 !== v5 ? "" === r5.children ? (l4(r5.el = s6(""), i6(n7), n7), _3 = n7) : _3 = onMismatch() : (n7.data !== r5.children && (logMismatchError(), n7.data = r5.children), _3 = o5(n7));
        break;
      case pn2:
        isTemplateNode2(n7) ? (_3 = o5(n7), replaceNode(r5.el = n7.content.firstChild, n7, a6)) : _3 = 8 !== v5 || d5 ? onMismatch() : o5(n7);
        break;
      case dn2:
        if (d5 && (v5 = (n7 = o5(n7)).nodeType), 1 === v5 || 3 === v5) {
          _3 = n7;
          const e10 = !r5.children.length;
          for (let t6 = 0; t6 < r5.staticCount; t6++) e10 && (r5.children += 1 === _3.nodeType ? _3.outerHTML : _3.data), t6 === r5.staticCount - 1 && (r5.anchor = _3), _3 = o5(_3);
          return d5 ? o5(_3) : _3;
        }
        onMismatch();
        break;
      case cn2:
        _3 = d5 ? hydrateFragment(n7, r5, a6, c5, u6, p6) : onMismatch();
        break;
      default:
        if (1 & m4) _3 = 1 === v5 && r5.type.toLowerCase() === n7.tagName.toLowerCase() || isTemplateNode2(n7) ? hydrateElement(n7, r5, a6, c5, u6, p6) : onMismatch();
        else if (6 & m4) {
          r5.slotScopeIds = u6;
          const e10 = i6(n7);
          if (_3 = d5 ? locateClosingAnchor(n7) : isComment(n7) && "teleport start" === n7.data ? locateClosingAnchor(n7, n7.data, "teleport end") : o5(n7), t5(r5, e10, null, a6, c5, getContainerType(e10), p6), isAsyncWrapper(r5) && !r5.type.__asyncResolved) {
            let t6;
            d5 ? (t6 = createVNode(cn2), t6.anchor = _3 ? _3.previousSibling : e10.lastChild) : t6 = 3 === n7.nodeType ? createTextVNode("") : createVNode("div"), t6.el = n7, r5.component.subTree = t6;
          }
        } else 64 & m4 ? _3 = 8 !== v5 ? onMismatch() : r5.type.hydrate(n7, r5, a6, c5, u6, p6, e9, hydrateChildren) : 128 & m4 && (_3 = r5.type.hydrate(n7, r5, a6, c5, getContainerType(i6(n7)), u6, p6, e9, hydrateNode));
    }
    return null != g3 && setRef(g3, null, c5, r5), _3;
  }, "hydrateNode"), hydrateElement = /* @__PURE__ */ __name((e10, t6, n7, s7, o6, i7) => {
    i7 = i7 || !!t6.dynamicChildren;
    const { type: l5, dynamicProps: c5, props: u6, patchFlag: p6, shapeFlag: d5, dirs: f4, transition: g3 } = t6, m4 = "input" === l5 || "option" === l5, y4 = !!c5;
    if (m4 || y4 || -1 !== p6) {
      f4 && invokeDirectiveHook(t6, null, n7, "created");
      let l6, v5 = false;
      if (isTemplateNode2(e10)) {
        v5 = needTransition(null, g3) && n7 && n7.vnode.props && n7.vnode.props.appear;
        const r5 = e10.content.firstChild;
        if (v5) {
          const e11 = r5.getAttribute("class");
          e11 && (r5.$cls = e11), g3.beforeEnter(r5);
        }
        replaceNode(r5, e10, n7), t6.el = e10 = r5;
      }
      if (16 & d5 && (!u6 || !u6.innerHTML && !u6.textContent)) {
        let r5 = hydrateChildren(e10.firstChild, t6, e10, n7, s7, o6, i7);
        for (r5 && !isMismatchAllowed(e10, 1) && logMismatchError(); r5; ) {
          const e11 = r5;
          r5 = r5.nextSibling, a5(e11);
        }
      } else if (8 & d5) {
        let n8 = t6.children;
        "\n" !== n8[0] || "PRE" !== e10.tagName && "TEXTAREA" !== e10.tagName || (n8 = n8.slice(1));
        const { textContent: r5 } = e10;
        r5 !== n8 && r5 !== n8.replace(/\r\n|\r/g, "\n") && (isMismatchAllowed(e10, 0) || logMismatchError(), e10.textContent = t6.children);
      }
      if (u6) {
        if (m4 || y4 || !i7 || 48 & p6) {
          const t7 = e10.tagName.includes("-");
          for (const s8 in u6) (m4 && (s8.endsWith("value") || "indeterminate" === s8) || isOn(s8) && !s(s8) || "." === s8[0] || t7 && !s(s8) || c5 && c5.includes(s8)) && r4(e10, s8, null, u6[s8], void 0, n7);
        } else if (u6.onClick) r4(e10, "onClick", null, u6.onClick, void 0, n7);
        else if (4 & p6 && isReactive(u6.style)) for (const e11 in u6.style) u6.style[e11];
      }
      (l6 = u6 && u6.onVnodeBeforeMount) && invokeVNodeHook(l6, n7, t6), f4 && invokeDirectiveHook(t6, null, n7, "beforeMount"), ((l6 = u6 && u6.onVnodeMounted) || f4 || v5) && queueEffectWithSuspense(() => {
        l6 && invokeVNodeHook(l6, n7, t6), v5 && g3.enter(e10), f4 && invokeDirectiveHook(t6, null, n7, "mounted");
      }, s7);
    }
    return e10.nextSibling;
  }, "hydrateElement"), hydrateChildren = /* @__PURE__ */ __name((e10, t6, r5, i7, a6, c5, u6) => {
    u6 = u6 || !!t6.dynamicChildren;
    const p6 = t6.children, d5 = p6.length;
    let f4 = false;
    for (let t7 = 0; t7 < d5; t7++) {
      const g3 = u6 ? p6[t7] : p6[t7] = normalizeVNode$1(p6[t7]), m4 = g3.type === un2;
      e10 ? (m4 && !u6 && t7 + 1 < d5 && normalizeVNode$1(p6[t7 + 1]).type === un2 && (l4(s6(e10.data.slice(g3.children.length)), r5, o5(e10)), e10.data = g3.children), e10 = hydrateNode(e10, g3, i7, a6, c5, u6)) : m4 && !g3.children ? l4(g3.el = s6(""), r5) : (f4 || (f4 = true, isMismatchAllowed(r5, 1) || logMismatchError()), n6(null, g3, r5, null, i7, a6, getContainerType(r5), c5));
    }
    return e10;
  }, "hydrateChildren"), hydrateFragment = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, a6) => {
    const { slotScopeIds: u6 } = t6;
    u6 && (s7 = s7 ? s7.concat(u6) : u6);
    const p6 = i6(e10), d5 = hydrateChildren(o5(e10), t6, p6, n7, r5, s7, a6);
    return d5 && isComment(d5) && "]" === d5.data ? o5(t6.anchor = d5) : (logMismatchError(), l4(t6.anchor = c4("]"), p6, d5), d5);
  }, "hydrateFragment"), handleMismatch = /* @__PURE__ */ __name((e10, t6, r5, s7, l5, c5) => {
    if ((function(e11, t7) {
      return isMismatchAllowed(e11.parentElement, 1) || (function(e12) {
        return 1 === e12.nodeType && isMismatchAllowedByAttr(e12.getAttribute(Nt2), 1);
      })(e11) || (function({ props: e12 }) {
        const t8 = e12 && e12[Nt2];
        return "string" == typeof t8 && isMismatchAllowedByAttr(t8, 1);
      })(t7);
    })(e10, t6) || logMismatchError(), t6.el = null, c5) {
      const t7 = locateClosingAnchor(e10);
      for (; ; ) {
        const n7 = o5(e10);
        if (!n7 || n7 === t7) break;
        a5(n7);
      }
    }
    const u6 = o5(e10), p6 = i6(e10);
    return a5(e10), n6(null, t6, p6, u6, r5, s7, getContainerType(p6), l5), r5 && (r5.vnode.el = t6.el, updateHOCHostEl(r5, t6.el)), u6;
  }, "handleMismatch"), locateClosingAnchor = /* @__PURE__ */ __name((e10, t6 = "[", n7 = "]") => {
    let r5 = 0;
    for (; e10; ) if ((e10 = o5(e10)) && isComment(e10) && (e10.data === t6 && r5++, e10.data === n7)) {
      if (0 === r5) return o5(e10);
      r5--;
    }
    return e10;
  }, "locateClosingAnchor"), replaceNode = /* @__PURE__ */ __name((e10, t6, n7) => {
    const r5 = t6.parentNode;
    r5 && r5.replaceChild(e10, t6);
    let s7 = n7;
    for (; s7; ) s7.vnode.el === t6 && (s7.vnode.el = s7.subTree.el = e10), s7 = s7.parent;
  }, "replaceNode"), isTemplateNode2 = /* @__PURE__ */ __name((e10) => 1 === e10.nodeType && "TEMPLATE" === e10.tagName, "isTemplateNode");
  return [(e10, t6) => {
    if (!t6.hasChildNodes()) return n6(null, e10, t6), flushPostFlushCbs(), void (t6._vnode = e10);
    hydrateNode(t6.firstChild, e10, null, null, null), flushPostFlushCbs(), t6._vnode = e10;
  }, hydrateNode];
}
function isMismatchAllowed(e9, t5) {
  if (0 === t5 || 1 === t5) for (; e9 && !e9.hasAttribute(Nt2); ) e9 = e9.parentElement;
  return isMismatchAllowedByAttr(e9 && e9.getAttribute(Nt2), t5);
}
function isMismatchAllowedByAttr(e9, t5) {
  if (null == e9) return false;
  if ("" === e9) return true;
  {
    const n6 = e9.split(",");
    return !(0 !== t5 || !n6.includes("children")) || n6.includes(Ht2[t5]);
  }
}
function createInnerComp(e9, t5) {
  const { ref: n6, props: r4, children: s6, ce: o5 } = t5.vnode, i6 = createVNode(e9, r4, s6);
  return i6.ref = n6, i6.ce = o5, delete t5.vnode.ce, i6;
}
function matches(e9, t5) {
  return i(e9) ? e9.some((e10) => matches(e10, t5)) : isString(e9) ? e9.split(",").includes(t5) : !!isRegExp(e9) && (e9.lastIndex = 0, e9.test(t5));
}
function onActivated(e9, t5) {
  registerKeepAliveHook(e9, "a", t5);
}
function onDeactivated(e9, t5) {
  registerKeepAliveHook(e9, "da", t5);
}
function registerKeepAliveHook(e9, t5, n6 = vn2) {
  const r4 = e9.__wdc || (e9.__wdc = () => {
    let t6 = n6;
    for (; t6; ) {
      if (t6.isDeactivated) return;
      t6 = t6.parent;
    }
    return e9();
  });
  if (injectHook(t5, r4, n6), n6) {
    let e10 = n6.parent;
    for (; e10 && e10.parent; ) isKeepAlive(e10.parent.vnode) && injectToKeepAliveRoot(r4, t5, n6, e10), e10 = e10.parent;
  }
}
function injectToKeepAliveRoot(e9, t5, n6, r4) {
  const s6 = injectHook(t5, e9, r4, true);
  Ut2(() => {
    remove(r4[t5], s6);
  }, n6);
}
function resetShapeFlag(e9) {
  e9.shapeFlag &= -257, e9.shapeFlag &= -513;
}
function getInnerChild(e9) {
  return 128 & e9.shapeFlag ? e9.ssContent : e9;
}
function injectHook(e9, t5, n6 = vn2, r4 = false) {
  if (n6) {
    const s6 = n6[e9] || (n6[e9] = []), o5 = t5.__weh || (t5.__weh = (...r5) => {
      pauseTracking();
      const s7 = setCurrentInstance(n6), o6 = callWithAsyncErrorHandling(t5, n6, e9, r5);
      return s7(), resetTracking(), o6;
    });
    return r4 ? s6.unshift(o5) : s6.push(o5), o5;
  }
}
function onErrorCaptured(e9, t5 = vn2) {
  injectHook("ec", e9, t5);
}
function resolveAsset(e9, t5, n6 = true, r4 = false) {
  const s6 = bt2 || vn2;
  if (s6) {
    const n7 = s6.type;
    if (e9 === Kt2) {
      const e10 = getComponentName(n7, false);
      if (e10 && (e10 === t5 || e10 === p(t5) || e10 === f(p(t5)))) return n7;
    }
    const o5 = resolve(s6[e9] || n7[e9], t5) || resolve(s6.appContext[e9], t5);
    return !o5 && r4 ? n7 : o5;
  }
}
function resolve(e9, t5) {
  return e9 && (e9[t5] || e9[p(t5)] || e9[f(p(t5))]);
}
function ensureValidVNode$1(e9) {
  return e9.some((e10) => !isVNode$2(e10) || e10.type !== pn2 && !(e10.type === cn2 && !ensureValidVNode$1(e10.children))) ? e9 : null;
}
function getContext2(e9) {
  const t5 = getCurrentInstance();
  return t5.setupContext || (t5.setupContext = createSetupContext(t5));
}
function normalizePropsOrEmits(e9) {
  return i(e9) ? e9.reduce((e10, t5) => (e10[t5] = null, e10), {}) : e9;
}
function applyOptions(e9) {
  const t5 = resolveMergedOptions(e9), n6 = e9.proxy, r4 = e9.ctx;
  Xt2 = false, t5.beforeCreate && callHook$1(t5.beforeCreate, e9, "bc");
  const { data: s6, computed: o5, methods: i6, watch: a5, provide: l4, inject: c4, created: u6, beforeMount: p6, mounted: d5, beforeUpdate: f4, updated: m4, activated: v5, deactivated: _3, beforeDestroy: k4, beforeUnmount: C3, destroyed: S4, unmounted: w3, render: R3, renderTracked: T3, renderTriggered: A3, errorCaptured: x7, serverPrefetch: $2, expose: P3, inheritAttrs: O3, components: N3, directives: H2, filters: M3 } = t5;
  if (c4 && (function(e10, t6) {
    i(e10) && (e10 = normalizeInject(e10));
    for (const n7 in e10) {
      const r5 = e10[n7];
      let s7;
      s7 = isObject(r5) ? "default" in r5 ? inject(r5.from || n7, r5.default, true) : inject(r5.from || n7) : inject(r5), isRef2(s7) ? Object.defineProperty(t6, n7, { enumerable: true, configurable: true, get: /* @__PURE__ */ __name(() => s7.value, "get"), set: /* @__PURE__ */ __name((e11) => s7.value = e11, "set") }) : t6[n7] = s7;
    }
  })(c4, r4, null), i6) for (const e10 in i6) {
    const t6 = i6[e10];
    isFunction(t6) && (r4[e10] = t6.bind(n6));
  }
  if (s6) {
    const t6 = s6.call(n6, n6);
    isObject(t6) && (e9.data = reactive(t6));
  }
  if (Xt2 = true, o5) for (const e10 in o5) {
    const t6 = o5[e10], s7 = isFunction(t6) ? t6.bind(n6, n6) : isFunction(t6.get) ? t6.get.bind(n6, n6) : NOOP, i7 = !isFunction(t6) && isFunction(t6.set) ? t6.set.bind(n6) : NOOP, a6 = computed({ get: s7, set: i7 });
    Object.defineProperty(r4, e10, { enumerable: true, configurable: true, get: /* @__PURE__ */ __name(() => a6.value, "get"), set: /* @__PURE__ */ __name((e11) => a6.value = e11, "set") });
  }
  if (a5) for (const e10 in a5) createWatcher(a5[e10], r4, n6, e10);
  if (l4) {
    const e10 = isFunction(l4) ? l4.call(n6) : l4;
    Reflect.ownKeys(e10).forEach((t6) => {
      provide(t6, e10[t6]);
    });
  }
  function registerLifecycleHook(e10, t6) {
    i(t6) ? t6.forEach((t7) => e10(t7.bind(n6))) : t6 && e10(t6.bind(n6));
  }
  __name(registerLifecycleHook, "registerLifecycleHook");
  if (u6 && callHook$1(u6, e9, "c"), registerLifecycleHook(Dt2, p6), registerLifecycleHook(It2, d5), registerLifecycleHook(jt2, f4), registerLifecycleHook(Ft2, m4), registerLifecycleHook(onActivated, v5), registerLifecycleHook(onDeactivated, _3), registerLifecycleHook(onErrorCaptured, x7), registerLifecycleHook(qt2, T3), registerLifecycleHook(zt2, A3), registerLifecycleHook(Bt2, C3), registerLifecycleHook(Ut2, w3), registerLifecycleHook(Wt2, $2), i(P3)) if (P3.length) {
    const t6 = e9.exposed || (e9.exposed = {});
    P3.forEach((e10) => {
      Object.defineProperty(t6, e10, { get: /* @__PURE__ */ __name(() => n6[e10], "get"), set: /* @__PURE__ */ __name((t7) => n6[e10] = t7, "set"), enumerable: true });
    });
  } else e9.exposed || (e9.exposed = {});
  R3 && e9.render === NOOP && (e9.render = R3), null != O3 && (e9.inheritAttrs = O3), N3 && (e9.components = N3), H2 && (e9.directives = H2), $2 && markAsyncBoundary(e9);
}
function callHook$1(e9, t5, n6) {
  callWithAsyncErrorHandling(i(e9) ? e9.map((e10) => e10.bind(t5.proxy)) : e9.bind(t5.proxy), t5, n6);
}
function createWatcher(e9, t5, n6, r4) {
  let s6 = r4.includes(".") ? createPathGetter(n6, r4) : () => n6[r4];
  if (isString(e9)) {
    const n7 = t5[e9];
    isFunction(n7) && watch(s6, n7);
  } else if (isFunction(e9)) watch(s6, e9.bind(n6));
  else if (isObject(e9)) if (i(e9)) e9.forEach((e10) => createWatcher(e10, t5, n6, r4));
  else {
    const r5 = isFunction(e9.handler) ? e9.handler.bind(n6) : t5[e9.handler];
    isFunction(r5) && watch(s6, r5, e9);
  }
}
function resolveMergedOptions(e9) {
  const t5 = e9.type, { mixins: n6, extends: r4 } = t5, { mixins: s6, optionsCache: o5, config: { optionMergeStrategies: i6 } } = e9.appContext, a5 = o5.get(t5);
  let l4;
  return a5 ? l4 = a5 : s6.length || n6 || r4 ? (l4 = {}, s6.length && s6.forEach((e10) => mergeOptions2(l4, e10, i6, true)), mergeOptions2(l4, t5, i6)) : l4 = t5, isObject(t5) && o5.set(t5, l4), l4;
}
function mergeOptions2(e9, t5, n6, r4 = false) {
  const { mixins: s6, extends: o5 } = t5;
  o5 && mergeOptions2(e9, o5, n6, true), s6 && s6.forEach((t6) => mergeOptions2(e9, t6, n6, true));
  for (const s7 in t5) if (r4 && "expose" === s7) ;
  else {
    const r5 = Qt2[s7] || n6 && n6[s7];
    e9[s7] = r5 ? r5(e9[s7], t5[s7]) : t5[s7];
  }
  return e9;
}
function mergeDataFn(e9, t5) {
  return t5 ? e9 ? function() {
    return n(isFunction(e9) ? e9.call(this, this) : e9, isFunction(t5) ? t5.call(this, this) : t5);
  } : t5 : e9;
}
function normalizeInject(e9) {
  if (i(e9)) {
    const t5 = {};
    for (let n6 = 0; n6 < e9.length; n6++) t5[e9[n6]] = e9[n6];
    return t5;
  }
  return e9;
}
function mergeAsArray2(e9, t5) {
  return e9 ? [...new Set([].concat(e9, t5))] : t5;
}
function mergeObjectOptions(e9, t5) {
  return e9 ? n(/* @__PURE__ */ Object.create(null), e9, t5) : t5;
}
function mergeEmitsOrPropsOptions(e9, t5) {
  return e9 ? i(e9) && i(t5) ? [.../* @__PURE__ */ new Set([...e9, ...t5])] : n(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(e9), normalizePropsOrEmits(null != t5 ? t5 : {})) : t5;
}
function createAppContext() {
  return { app: null, config: { isNativeTag: NO, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
function createAppAPI(e9, t5) {
  return function(n6, r4 = null) {
    isFunction(n6) || (n6 = n({}, n6)), null == r4 || isObject(r4) || (r4 = null);
    const s6 = createAppContext(), o5 = /* @__PURE__ */ new WeakSet(), i6 = [];
    let a5 = false;
    const l4 = s6.app = { _uid: en2++, _component: n6, _props: r4, _container: null, _context: s6, _instance: null, version: Rn2, get config() {
      return s6.config;
    }, set config(e10) {
    }, use: /* @__PURE__ */ __name((e10, ...t6) => (o5.has(e10) || (e10 && isFunction(e10.install) ? (o5.add(e10), e10.install(l4, ...t6)) : isFunction(e10) && (o5.add(e10), e10(l4, ...t6))), l4), "use"), mixin: /* @__PURE__ */ __name((e10) => (s6.mixins.includes(e10) || s6.mixins.push(e10), l4), "mixin"), component: /* @__PURE__ */ __name((e10, t6) => t6 ? (s6.components[e10] = t6, l4) : s6.components[e10], "component"), directive: /* @__PURE__ */ __name((e10, t6) => t6 ? (s6.directives[e10] = t6, l4) : s6.directives[e10], "directive"), mount(o6, i7, c4) {
      if (!a5) {
        const u6 = l4._ceVNode || createVNode(n6, r4);
        return u6.appContext = s6, true === c4 ? c4 = "svg" : false === c4 && (c4 = void 0), i7 && t5 ? t5(u6, o6) : e9(u6, o6, c4), a5 = true, l4._container = o6, o6.__vue_app__ = l4, getComponentPublicInstance(u6.component);
      }
    }, onUnmount(e10) {
      i6.push(e10);
    }, unmount() {
      a5 && (callWithAsyncErrorHandling(i6, l4._instance, 16), e9(null, l4._container), delete l4._container.__vue_app__);
    }, provide: /* @__PURE__ */ __name((e10, t6) => (s6.provides[e10] = t6, l4), "provide"), runWithContext(e10) {
      const t6 = tn3;
      tn3 = l4;
      try {
        return e10();
      } finally {
        tn3 = t6;
      }
    } };
    return l4;
  };
}
function emit(e9, t5, ...n6) {
  if (e9.isUnmounted) return;
  const r4 = e9.vnode.props || t;
  let s6 = n6;
  const o5 = t5.startsWith("update:"), i6 = o5 && getModelModifiers(r4, t5.slice(7));
  let a5;
  i6 && (i6.trim && (s6 = n6.map((e10) => isString(e10) ? e10.trim() : e10)), i6.number && (s6 = n6.map(looseToNumber)));
  let l4 = r4[a5 = u(t5)] || r4[a5 = u(p(t5))];
  !l4 && o5 && (l4 = r4[a5 = u(d(t5))]), l4 && callWithAsyncErrorHandling(l4, e9, 6, s6);
  const c4 = r4[a5 + "Once"];
  if (c4) {
    if (e9.emitted) {
      if (e9.emitted[a5]) return;
    } else e9.emitted = {};
    e9.emitted[a5] = true, callWithAsyncErrorHandling(c4, e9, 6, s6);
  }
}
function normalizeEmitsOptions(e9, t5, n6 = false) {
  const r4 = n6 ? nn2 : t5.emitsCache, s6 = r4.get(e9);
  if (void 0 !== s6) return s6;
  const o5 = e9.emits;
  let i6 = {}, a5 = false;
  if (!isFunction(e9)) {
    const extendEmits = /* @__PURE__ */ __name((e10) => {
      const n7 = normalizeEmitsOptions(e10, t5, true);
      n7 && (a5 = true, n(i6, n7));
    }, "extendEmits");
    !n6 && t5.mixins.length && t5.mixins.forEach(extendEmits), e9.extends && extendEmits(e9.extends), e9.mixins && e9.mixins.forEach(extendEmits);
  }
  return o5 || a5 ? (i(o5) ? o5.forEach((e10) => i6[e10] = null) : n(i6, o5), isObject(e9) && r4.set(e9, i6), i6) : (isObject(e9) && r4.set(e9, null), null);
}
function isEmitListener(e9, t5) {
  return !(!e9 || !isOn(t5)) && (t5 = "Once" === (t5 = t5.slice(2)) ? t5 : t5.replace(/Once$/, ""), hasOwn(e9, t5[0].toLowerCase() + t5.slice(1)) || hasOwn(e9, d(t5)) || hasOwn(e9, t5));
}
function renderComponentRoot$1(e9) {
  const { type: t5, vnode: n6, proxy: r4, withProxy: s6, propsOptions: [o5], slots: i6, attrs: a5, emit: l4, render: c4, renderCache: u6, props: p6, data: d5, setupState: f4, ctx: g3, inheritAttrs: m4 } = e9, y4 = setCurrentRenderingInstance$1(e9);
  let v5, _3;
  try {
    if (4 & n6.shapeFlag) {
      const e10 = s6 || r4, t6 = e10;
      v5 = normalizeVNode$1(c4.call(t6, e10, u6, p6, f4, d5, g3)), _3 = a5;
    } else {
      const e10 = t5;
      0, v5 = normalizeVNode$1(e10.length > 1 ? e10(p6, { attrs: a5, slots: i6, emit: l4 }) : e10(p6, null)), _3 = t5.props ? a5 : getFunctionalFallthrough(a5);
    }
  } catch (t6) {
    fn.length = 0, handleError(t6, e9, 1), v5 = createVNode(pn2);
  }
  let b4 = v5;
  if (_3 && false !== m4) {
    const e10 = Object.keys(_3), { shapeFlag: t6 } = b4;
    e10.length && 7 & t6 && (o5 && e10.some(isModelListener) && (_3 = filterModelListeners(_3, o5)), b4 = cloneVNode(b4, _3, false, true));
  }
  return n6.dirs && (b4 = cloneVNode(b4, null, false, true), b4.dirs = b4.dirs ? b4.dirs.concat(n6.dirs) : n6.dirs), n6.transition && setTransitionHooks(b4, n6.transition), v5 = b4, setCurrentRenderingInstance$1(y4), v5;
}
function hasPropsChanged(e9, t5, n6) {
  const r4 = Object.keys(t5);
  if (r4.length !== Object.keys(e9).length) return true;
  for (let s6 = 0; s6 < r4.length; s6++) {
    const o5 = r4[s6];
    if (hasPropValueChanged(t5, e9, o5) && !isEmitListener(n6, o5)) return true;
  }
  return false;
}
function hasPropValueChanged(e9, t5, n6) {
  const r4 = e9[n6], s6 = t5[n6];
  return "style" === n6 && isObject(r4) && isObject(s6) ? !looseEqual(r4, s6) : r4 !== s6;
}
function updateHOCHostEl({ vnode: e9, parent: t5, suspense: n6 }, r4) {
  for (; t5; ) {
    const n7 = t5.subTree;
    if (n7.suspense && n7.suspense.activeBranch === e9 && (n7.suspense.vnode.el = n7.el = r4, e9 = n7), n7 !== e9) break;
    (e9 = t5.vnode).el = r4, t5 = t5.parent;
  }
  n6 && n6.activeBranch === e9 && (n6.vnode.el = r4);
}
function setFullProps(e9, t5, n6, r4) {
  const [s6, o5] = e9.propsOptions;
  let i6, a5 = false;
  if (t5) for (let l4 in t5) {
    if (s(l4)) continue;
    const c4 = t5[l4];
    let u6;
    s6 && hasOwn(s6, u6 = p(l4)) ? o5 && o5.includes(u6) ? (i6 || (i6 = {}))[u6] = c4 : n6[u6] = c4 : isEmitListener(e9.emitsOptions, l4) || l4 in r4 && c4 === r4[l4] || (r4[l4] = c4, a5 = true);
  }
  if (o5) {
    const t6 = toRaw(n6), r5 = i6 || t;
    for (let i7 = 0; i7 < o5.length; i7++) {
      const a6 = o5[i7];
      n6[a6] = resolvePropValue(s6, t6, a6, r5[a6], e9, !hasOwn(r5, a6));
    }
  }
  return a5;
}
function resolvePropValue(e9, t5, n6, r4, s6, o5) {
  const i6 = e9[n6];
  if (null != i6) {
    const e10 = hasOwn(i6, "default");
    if (e10 && void 0 === r4) {
      const e11 = i6.default;
      if (i6.type !== Function && !i6.skipFactory && isFunction(e11)) {
        const { propsDefaults: o6 } = s6;
        if (n6 in o6) r4 = o6[n6];
        else {
          const i7 = setCurrentInstance(s6);
          r4 = o6[n6] = e11.call(null, t5), i7();
        }
      } else r4 = e11;
      s6.ce && s6.ce._setProp(n6, r4);
    }
    i6[0] && (o5 && !e10 ? r4 = false : !i6[1] || "" !== r4 && r4 !== d(n6) || (r4 = true));
  }
  return r4;
}
function normalizePropsOptions(e9, t5, n6 = false) {
  const r4 = n6 ? sn2 : t5.propsCache, s6 = r4.get(e9);
  if (s6) return s6;
  const o5 = e9.props, i6 = {}, a5 = [];
  let l4 = false;
  if (!isFunction(e9)) {
    const extendProps = /* @__PURE__ */ __name((e10) => {
      l4 = true;
      const [n7, r5] = normalizePropsOptions(e10, t5, true);
      n(i6, n7), r5 && a5.push(...r5);
    }, "extendProps");
    !n6 && t5.mixins.length && t5.mixins.forEach(extendProps), e9.extends && extendProps(e9.extends), e9.mixins && e9.mixins.forEach(extendProps);
  }
  if (!o5 && !l4) return isObject(e9) && r4.set(e9, a), a;
  if (i(o5)) for (let e10 = 0; e10 < o5.length; e10++) {
    const t6 = p(o5[e10]);
    validatePropName(t6) && (i6[t6] = t);
  }
  else if (o5) for (const e10 in o5) {
    const t6 = p(e10);
    if (validatePropName(t6)) {
      const n7 = o5[e10], r5 = i6[t6] = i(n7) || isFunction(n7) ? { type: n7 } : n({}, n7), s7 = r5.type;
      let l5 = false, c5 = true;
      if (i(s7)) for (let e11 = 0; e11 < s7.length; ++e11) {
        const t7 = s7[e11], n8 = isFunction(t7) && t7.name;
        if ("Boolean" === n8) {
          l5 = true;
          break;
        }
        "String" === n8 && (c5 = false);
      }
      else l5 = isFunction(s7) && "Boolean" === s7.name;
      r5[0] = l5, r5[1] = c5, (l5 || hasOwn(r5, "default")) && a5.push(t6);
    }
  }
  const c4 = [i6, a5];
  return isObject(e9) && r4.set(e9, c4), c4;
}
function validatePropName(e9) {
  return "$" !== e9[0] && !s(e9);
}
function createRenderer(e9) {
  return baseCreateRenderer(e9);
}
function createHydrationRenderer(e9) {
  return baseCreateRenderer(e9, createHydrationFunctions);
}
function baseCreateRenderer(e9, t5) {
  getGlobalThis().__VUE__ = true;
  const { insert: n6, remove: r4, patchProp: s6, createElement: o5, createText: i6, createComment: a5, setText: l4, setElementText: c4, parentNode: u6, nextSibling: p6, setScopeId: d5 = NOOP, insertStaticContent: f4 } = e9, patch = /* @__PURE__ */ __name((e10, t6, n7, r5 = null, s7 = null, o6 = null, i7 = void 0, a6 = null, l5 = !!t6.dynamicChildren) => {
    if (e10 === t6) return;
    e10 && !isSameVNodeType(e10, t6) && (r5 = getNextHostNode(e10), unmount(e10, s7, o6, true), e10 = null), -2 === t6.patchFlag && (l5 = false, t6.dynamicChildren = null);
    const { type: c5, ref: u7, shapeFlag: p7 } = t6;
    switch (c5) {
      case un2:
        processText(e10, t6, n7, r5);
        break;
      case pn2:
        processCommentNode(e10, t6, n7, r5);
        break;
      case dn2:
        null == e10 && mountStaticNode(t6, n7, r5, i7);
        break;
      case cn2:
        processFragment(e10, t6, n7, r5, s7, o6, i7, a6, l5);
        break;
      default:
        1 & p7 ? processElement(e10, t6, n7, r5, s7, o6, i7, a6, l5) : 6 & p7 ? processComponent(e10, t6, n7, r5, s7, o6, i7, a6, l5) : (64 & p7 || 128 & p7) && c5.process(e10, t6, n7, r5, s7, o6, i7, a6, l5, m4);
    }
    null != u7 && s7 ? setRef(u7, e10 && e10.ref, o6, t6 || e10, !t6) : null == u7 && e10 && null != e10.ref && setRef(e10.ref, null, o6, e10, true);
  }, "patch"), processText = /* @__PURE__ */ __name((e10, t6, r5, s7) => {
    if (null == e10) n6(t6.el = i6(t6.children), r5, s7);
    else {
      const n7 = t6.el = e10.el;
      t6.children !== e10.children && l4(n7, t6.children);
    }
  }, "processText"), processCommentNode = /* @__PURE__ */ __name((e10, t6, r5, s7) => {
    null == e10 ? n6(t6.el = a5(t6.children || ""), r5, s7) : t6.el = e10.el;
  }, "processCommentNode"), mountStaticNode = /* @__PURE__ */ __name((e10, t6, n7, r5) => {
    [e10.el, e10.anchor] = f4(e10.children, t6, n7, r5, e10.el, e10.anchor);
  }, "mountStaticNode"), processElement = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, o6, i7, a6, l5) => {
    if ("svg" === t6.type ? i7 = "svg" : "math" === t6.type && (i7 = "mathml"), null == e10) mountElement(t6, n7, r5, s7, o6, i7, a6, l5);
    else {
      const n8 = e10.el && e10.el._isVueCE ? e10.el : null;
      try {
        n8 && n8._beginPatch(), patchElement(e10, t6, s7, o6, i7, a6, l5);
      } finally {
        n8 && n8._endPatch();
      }
    }
  }, "processElement"), mountElement = /* @__PURE__ */ __name((e10, t6, r5, i7, a6, l5, u7, p7) => {
    let d6, f5;
    const { props: g4, shapeFlag: m5, transition: y5, dirs: v5 } = e10;
    if (d6 = e10.el = o5(e10.type, l5, g4 && g4.is, g4), 8 & m5 ? c4(d6, e10.children) : 16 & m5 && mountChildren(e10.children, d6, null, i7, a6, resolveChildrenNamespace(e10, l5), u7, p7), v5 && invokeDirectiveHook(e10, null, i7, "created"), setScopeId(d6, e10, e10.scopeId, u7, i7), g4) {
      for (const e11 in g4) "value" === e11 || s(e11) || s6(d6, e11, null, g4[e11], l5, i7);
      "value" in g4 && s6(d6, "value", null, g4.value, l5), (f5 = g4.onVnodeBeforeMount) && invokeVNodeHook(f5, i7, e10);
    }
    v5 && invokeDirectiveHook(e10, null, i7, "beforeMount");
    const _4 = needTransition(a6, y5);
    _4 && y5.beforeEnter(d6), n6(d6, t6, r5), ((f5 = g4 && g4.onVnodeMounted) || _4 || v5) && on2(() => {
      try {
        f5 && invokeVNodeHook(f5, i7, e10), _4 && y5.enter(d6), v5 && invokeDirectiveHook(e10, null, i7, "mounted");
      } finally {
      }
    }, a6);
  }, "mountElement"), setScopeId = /* @__PURE__ */ __name((e10, t6, n7, r5, s7) => {
    if (n7 && d5(e10, n7), r5) for (let t7 = 0; t7 < r5.length; t7++) d5(e10, r5[t7]);
    if (s7) {
      let n8 = s7.subTree;
      if (t6 === n8 || isSuspense(n8.type) && (n8.ssContent === t6 || n8.ssFallback === t6)) {
        const t7 = s7.vnode;
        setScopeId(e10, t7, t7.scopeId, t7.slotScopeIds, s7.parent);
      }
    }
  }, "setScopeId"), mountChildren = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, o6, i7, a6, l5 = 0) => {
    for (let c5 = l5; c5 < e10.length; c5++) {
      const l6 = e10[c5] = a6 ? cloneIfMounted(e10[c5]) : normalizeVNode$1(e10[c5]);
      patch(null, l6, t6, n7, r5, s7, o6, i7, a6);
    }
  }, "mountChildren"), patchElement = /* @__PURE__ */ __name((e10, t6, n7, r5, o6, i7, a6) => {
    const l5 = t6.el = e10.el;
    let { patchFlag: u7, dynamicChildren: p7, dirs: d6 } = t6;
    u7 |= 16 & e10.patchFlag;
    const f5 = e10.props || t, g4 = t6.props || t;
    let m5;
    if (n7 && toggleRecurse(n7, false), (m5 = g4.onVnodeBeforeUpdate) && invokeVNodeHook(m5, n7, t6, e10), d6 && invokeDirectiveHook(t6, e10, n7, "beforeUpdate"), n7 && toggleRecurse(n7, true), !p7 || e10.dynamicChildren && e10.dynamicChildren.length === p7.length || (u7 = 0, a6 = false, p7 = null), (f5.innerHTML && null == g4.innerHTML || f5.textContent && null == g4.textContent) && c4(l5, ""), p7 ? patchBlockChildren(e10.dynamicChildren, p7, l5, n7, r5, resolveChildrenNamespace(t6, o6), i7) : a6 || patchChildren(e10, t6, l5, null, n7, r5, resolveChildrenNamespace(t6, o6), i7, false), u7 > 0) {
      if (16 & u7) patchProps(l5, f5, g4, n7, o6);
      else if (2 & u7 && f5.class !== g4.class && s6(l5, "class", null, g4.class, o6), 4 & u7 && s6(l5, "style", f5.style, g4.style, o6), 8 & u7) {
        const e11 = t6.dynamicProps;
        for (let t7 = 0; t7 < e11.length; t7++) {
          const r6 = e11[t7], i8 = f5[r6], a7 = g4[r6];
          a7 === i8 && "value" !== r6 || s6(l5, r6, i8, a7, o6, n7);
        }
      }
      1 & u7 && e10.children !== t6.children && c4(l5, t6.children);
    } else a6 || null != p7 || patchProps(l5, f5, g4, n7, o6);
    ((m5 = g4.onVnodeUpdated) || d6) && on2(() => {
      m5 && invokeVNodeHook(m5, n7, t6, e10), d6 && invokeDirectiveHook(t6, e10, n7, "updated");
    }, r5);
  }, "patchElement"), patchBlockChildren = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, o6, i7) => {
    for (let a6 = 0; a6 < t6.length; a6++) {
      const l5 = e10[a6], c5 = t6[a6], p7 = l5.el && (l5.type === cn2 || !isSameVNodeType(l5, c5) || 198 & l5.shapeFlag) ? u6(l5.el) : n7;
      patch(l5, c5, p7, null, r5, s7, o6, i7, true);
    }
  }, "patchBlockChildren"), patchProps = /* @__PURE__ */ __name((e10, t6, n7, r5, o6) => {
    if (t6 !== n7) {
      if (t6 !== t) for (const i7 in t6) s(i7) || i7 in n7 || s6(e10, i7, t6[i7], null, o6, r5);
      for (const i7 in n7) {
        if (s(i7)) continue;
        const a6 = n7[i7], l5 = t6[i7];
        a6 !== l5 && "value" !== i7 && s6(e10, i7, l5, a6, o6, r5);
      }
      "value" in n7 && s6(e10, "value", t6.value, n7.value, o6);
    }
  }, "patchProps"), processFragment = /* @__PURE__ */ __name((e10, t6, r5, s7, o6, a6, l5, c5, u7) => {
    const p7 = t6.el = e10 ? e10.el : i6(""), d6 = t6.anchor = e10 ? e10.anchor : i6("");
    let { patchFlag: f5, dynamicChildren: g4, slotScopeIds: m5 } = t6;
    m5 && (c5 = c5 ? c5.concat(m5) : m5), null == e10 ? (n6(p7, r5, s7), n6(d6, r5, s7), mountChildren(t6.children || [], r5, d6, o6, a6, l5, c5, u7)) : f5 > 0 && 64 & f5 && g4 && e10.dynamicChildren && e10.dynamicChildren.length === g4.length ? (patchBlockChildren(e10.dynamicChildren, g4, r5, o6, a6, l5, c5), (null != t6.key || o6 && t6 === o6.subTree) && traverseStaticChildren(e10, t6, true)) : patchChildren(e10, t6, r5, d6, o6, a6, l5, c5, u7);
  }, "processFragment"), processComponent = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, o6, i7, a6, l5) => {
    t6.slotScopeIds = a6, null == e10 ? 512 & t6.shapeFlag ? s7.ctx.activate(t6, n7, r5, i7, l5) : mountComponent(t6, n7, r5, s7, o6, i7, l5) : updateComponent(e10, t6, l5);
  }, "processComponent"), mountComponent = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, o6, i7) => {
    const a6 = e10.component = createComponentInstance$1(e10, r5, s7);
    if (isKeepAlive(e10) && (a6.ctx.renderer = m4), setupComponent$1(a6, false, i7), a6.asyncDep) {
      if (s7 && s7.registerDep(a6, setupRenderEffect, i7), !e10.el) {
        const r6 = a6.subTree = createVNode(pn2);
        processCommentNode(null, r6, t6, n7), e10.placeholder = r6.el;
      }
    } else setupRenderEffect(a6, e10, t6, n7, s7, o6, i7);
  }, "mountComponent"), updateComponent = /* @__PURE__ */ __name((e10, t6, n7) => {
    const r5 = t6.component = e10.component;
    if ((function(e11, t7, n8) {
      const { props: r6, children: s7, component: o6 } = e11, { props: i7, children: a6, patchFlag: l5 } = t7, c5 = o6.emitsOptions;
      if (t7.dirs || t7.transition) return true;
      if (!(n8 && l5 >= 0)) return !(!s7 && !a6 || a6 && a6.$stable) || r6 !== i7 && (r6 ? !i7 || hasPropsChanged(r6, i7, c5) : !!i7);
      if (1024 & l5) return true;
      if (16 & l5) return r6 ? hasPropsChanged(r6, i7, c5) : !!i7;
      if (8 & l5) {
        const e12 = t7.dynamicProps;
        for (let t8 = 0; t8 < e12.length; t8++) {
          const n9 = e12[t8];
          if (hasPropValueChanged(i7, r6, n9) && !isEmitListener(c5, n9)) return true;
        }
      }
      return false;
    })(e10, t6, n7)) {
      if (r5.asyncDep && !r5.asyncResolved) return void updateComponentPreRender(r5, t6, n7);
      r5.next = t6, r5.update();
    } else t6.el = e10.el, r5.vnode = t6;
  }, "updateComponent"), setupRenderEffect = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, o6, i7) => {
    e10.scope.on();
    const a6 = e10.effect = new ReactiveEffect(() => {
      if (e10.isMounted) {
        let { next: t7, bu: n8, u: r6, parent: a7, vnode: c6 } = e10;
        {
          const n9 = locateNonHydratedAsyncRoot(e10);
          if (n9) return t7 && (t7.el = c6.el, updateComponentPreRender(e10, t7, i7)), void n9.asyncDep.then(() => {
            on2(() => {
              e10.isUnmounted || l5();
            }, s7);
          });
        }
        let p7, d6 = t7;
        toggleRecurse(e10, false), t7 ? (t7.el = c6.el, updateComponentPreRender(e10, t7, i7)) : t7 = c6, n8 && invokeArrayFns(n8), (p7 = t7.props && t7.props.onVnodeBeforeUpdate) && invokeVNodeHook(p7, a7, t7, c6), toggleRecurse(e10, true);
        const f5 = renderComponentRoot$1(e10), g4 = e10.subTree;
        e10.subTree = f5, patch(g4, f5, u6(g4.el), getNextHostNode(g4), e10, s7, o6), t7.el = f5.el, null === d6 && updateHOCHostEl(e10, f5.el), r6 && on2(r6, s7), (p7 = t7.props && t7.props.onVnodeUpdated) && on2(() => invokeVNodeHook(p7, a7, t7, c6), s7);
      } else {
        let i8;
        const { el: a7, props: l6 } = t6, { bm: c6, m: u7, parent: p7, root: d6, type: f5 } = e10, g4 = isAsyncWrapper(t6);
        if (toggleRecurse(e10, false), c6 && invokeArrayFns(c6), !g4 && (i8 = l6 && l6.onVnodeBeforeMount) && invokeVNodeHook(i8, p7, t6), toggleRecurse(e10, true), a7 && _3) {
          const hydrateSubTree = /* @__PURE__ */ __name(() => {
            e10.subTree = renderComponentRoot$1(e10), _3(a7, e10.subTree, e10, s7, null);
          }, "hydrateSubTree");
          g4 && f5.__asyncHydrate ? f5.__asyncHydrate(a7, e10, hydrateSubTree) : hydrateSubTree();
        } else {
          d6.ce && d6.ce._hasShadowRoot() && d6.ce._injectChildStyle(f5, e10.parent ? e10.parent.type : void 0);
          const i9 = e10.subTree = renderComponentRoot$1(e10);
          patch(null, i9, n7, r5, e10, s7, o6), t6.el = i9.el;
        }
        if (u7 && on2(u7, s7), !g4 && (i8 = l6 && l6.onVnodeMounted)) {
          const e11 = t6;
          on2(() => invokeVNodeHook(i8, p7, e11), s7);
        }
        (256 & t6.shapeFlag || p7 && isAsyncWrapper(p7.vnode) && 256 & p7.vnode.shapeFlag) && e10.a && on2(e10.a, s7), e10.isMounted = true, t6 = n7 = r5 = null;
      }
    });
    e10.scope.off();
    const l5 = e10.update = a6.run.bind(a6), c5 = e10.job = a6.runIfDirty.bind(a6);
    c5.i = e10, c5.id = e10.uid, a6.scheduler = () => queueJob(c5), toggleRecurse(e10, true), l5();
  }, "setupRenderEffect"), updateComponentPreRender = /* @__PURE__ */ __name((e10, t6, n7) => {
    t6.component = e10;
    const r5 = e10.vnode.props;
    e10.vnode = t6, e10.next = null, (function(e11, t7, n8, r6) {
      const { props: s7, attrs: o6, vnode: { patchFlag: i7 } } = e11, a6 = toRaw(s7), [l5] = e11.propsOptions;
      let c5 = false;
      if (!(r6 || i7 > 0) || 16 & i7) {
        let r7;
        setFullProps(e11, t7, s7, o6) && (c5 = true);
        for (const o7 in a6) t7 && (hasOwn(t7, o7) || (r7 = d(o7)) !== o7 && hasOwn(t7, r7)) || (l5 ? !n8 || void 0 === n8[o7] && void 0 === n8[r7] || (s7[o7] = resolvePropValue(l5, a6, o7, void 0, e11, true)) : delete s7[o7]);
        if (o6 !== a6) for (const e12 in o6) t7 && hasOwn(t7, e12) || (delete o6[e12], c5 = true);
      } else if (8 & i7) {
        const n9 = e11.vnode.dynamicProps;
        for (let r7 = 0; r7 < n9.length; r7++) {
          let i8 = n9[r7];
          if (isEmitListener(e11.emitsOptions, i8)) continue;
          const u7 = t7[i8];
          if (l5) if (hasOwn(o6, i8)) u7 !== o6[i8] && (o6[i8] = u7, c5 = true);
          else {
            const t8 = p(i8);
            s7[t8] = resolvePropValue(l5, a6, t8, u7, e11, false);
          }
          else u7 !== o6[i8] && (o6[i8] = u7, c5 = true);
        }
      }
      c5 && trigger(e11.attrs, "set", "");
    })(e10, t6.props, r5, n7), ((e11, t7, n8) => {
      const { vnode: r6, slots: s7 } = e11;
      let o6 = true, i7 = t;
      if (32 & r6.shapeFlag) {
        const e12 = t7._;
        e12 ? n8 && 1 === e12 ? o6 = false : assignSlots(s7, t7, n8) : (o6 = !t7.$stable, normalizeObjectSlots(t7, s7)), i7 = t7;
      } else t7 && (normalizeVNodeSlots(e11, t7), i7 = { default: 1 });
      if (o6) for (const e12 in s7) isInternalKey(e12) || null != i7[e12] || delete s7[e12];
    })(e10, t6.children, n7), pauseTracking(), flushPreFlushCbs(e10), resetTracking();
  }, "updateComponentPreRender"), patchChildren = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, o6, i7, a6, l5 = false) => {
    const u7 = e10 && e10.children, p7 = e10 ? e10.shapeFlag : 0, d6 = t6.children, { patchFlag: f5, shapeFlag: g4 } = t6;
    if (f5 > 0) {
      if (128 & f5) return void patchKeyedChildren(u7, d6, n7, r5, s7, o6, i7, a6, l5);
      if (256 & f5) return void patchUnkeyedChildren(u7, d6, n7, r5, s7, o6, i7, a6, l5);
    }
    8 & g4 ? (16 & p7 && unmountChildren(u7, s7, o6), d6 !== u7 && c4(n7, d6)) : 16 & p7 ? 16 & g4 ? patchKeyedChildren(u7, d6, n7, r5, s7, o6, i7, a6, l5) : unmountChildren(u7, s7, o6, true) : (8 & p7 && c4(n7, ""), 16 & g4 && mountChildren(d6, n7, r5, s7, o6, i7, a6, l5));
  }, "patchChildren"), patchUnkeyedChildren = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, o6, i7, a6, l5) => {
    t6 = t6 || a;
    const c5 = (e10 = e10 || a).length, u7 = t6.length, p7 = Math.min(c5, u7);
    let d6;
    for (d6 = 0; d6 < p7; d6++) {
      const r6 = t6[d6] = l5 ? cloneIfMounted(t6[d6]) : normalizeVNode$1(t6[d6]);
      patch(e10[d6], r6, n7, null, s7, o6, i7, a6, l5);
    }
    c5 > u7 ? unmountChildren(e10, s7, o6, true, false, p7) : mountChildren(t6, n7, r5, s7, o6, i7, a6, l5, p7);
  }, "patchUnkeyedChildren"), patchKeyedChildren = /* @__PURE__ */ __name((e10, t6, n7, r5, s7, o6, i7, a6, l5) => {
    let c5 = 0;
    const u7 = t6.length;
    let p7 = e10.length - 1, d6 = u7 - 1;
    for (; c5 <= p7 && c5 <= d6; ) {
      const r6 = e10[c5], u8 = t6[c5] = l5 ? cloneIfMounted(t6[c5]) : normalizeVNode$1(t6[c5]);
      if (!isSameVNodeType(r6, u8)) break;
      patch(r6, u8, n7, null, s7, o6, i7, a6, l5), c5++;
    }
    for (; c5 <= p7 && c5 <= d6; ) {
      const r6 = e10[p7], c6 = t6[d6] = l5 ? cloneIfMounted(t6[d6]) : normalizeVNode$1(t6[d6]);
      if (!isSameVNodeType(r6, c6)) break;
      patch(r6, c6, n7, null, s7, o6, i7, a6, l5), p7--, d6--;
    }
    if (c5 > p7) {
      if (c5 <= d6) {
        const e11 = d6 + 1, p8 = e11 < u7 ? t6[e11].el : r5;
        for (; c5 <= d6; ) patch(null, t6[c5] = l5 ? cloneIfMounted(t6[c5]) : normalizeVNode$1(t6[c5]), n7, p8, s7, o6, i7, a6, l5), c5++;
      }
    } else if (c5 > d6) for (; c5 <= p7; ) unmount(e10[c5], s7, o6, true), c5++;
    else {
      const f5 = c5, g4 = c5, m5 = /* @__PURE__ */ new Map();
      for (c5 = g4; c5 <= d6; c5++) {
        const e11 = t6[c5] = l5 ? cloneIfMounted(t6[c5]) : normalizeVNode$1(t6[c5]);
        null != e11.key && m5.set(e11.key, c5);
      }
      let y5, v5 = 0;
      const _4 = d6 - g4 + 1;
      let b4 = false, k4 = 0;
      const C3 = new Array(_4);
      for (c5 = 0; c5 < _4; c5++) C3[c5] = 0;
      for (c5 = f5; c5 <= p7; c5++) {
        const r6 = e10[c5];
        if (v5 >= _4) {
          unmount(r6, s7, o6, true);
          continue;
        }
        let u8;
        if (null != r6.key) u8 = m5.get(r6.key);
        else for (y5 = g4; y5 <= d6; y5++) if (0 === C3[y5 - g4] && isSameVNodeType(r6, t6[y5])) {
          u8 = y5;
          break;
        }
        void 0 === u8 ? unmount(r6, s7, o6, true) : (C3[u8 - g4] = c5 + 1, u8 >= k4 ? k4 = u8 : b4 = true, patch(r6, t6[u8], n7, null, s7, o6, i7, a6, l5), v5++);
      }
      const S4 = b4 ? (function(e11) {
        const t7 = e11.slice(), n8 = [0];
        let r6, s8, o7, i8, a7;
        const l6 = e11.length;
        for (r6 = 0; r6 < l6; r6++) {
          const l7 = e11[r6];
          if (0 !== l7) {
            if (s8 = n8[n8.length - 1], e11[s8] < l7) {
              t7[r6] = s8, n8.push(r6);
              continue;
            }
            for (o7 = 0, i8 = n8.length - 1; o7 < i8; ) a7 = o7 + i8 >> 1, e11[n8[a7]] < l7 ? o7 = a7 + 1 : i8 = a7;
            l7 < e11[n8[o7]] && (o7 > 0 && (t7[r6] = n8[o7 - 1]), n8[o7] = r6);
          }
        }
        o7 = n8.length, i8 = n8[o7 - 1];
        for (; o7-- > 0; ) n8[o7] = i8, i8 = t7[i8];
        return n8;
      })(C3) : a;
      for (y5 = S4.length - 1, c5 = _4 - 1; c5 >= 0; c5--) {
        const e11 = g4 + c5, p8 = t6[e11], d7 = t6[e11 + 1], f6 = e11 + 1 < u7 ? d7.el || resolveAsyncComponentPlaceholder(d7) : r5;
        0 === C3[c5] ? patch(null, p8, n7, f6, s7, o6, i7, a6, l5) : b4 && (y5 < 0 || c5 !== S4[y5] ? move(p8, n7, f6, 2) : y5--);
      }
    }
  }, "patchKeyedChildren"), move = /* @__PURE__ */ __name((e10, t6, s7, o6, i7 = null) => {
    const { el: a6, type: l5, transition: c5, children: u7, shapeFlag: d6 } = e10;
    if (6 & d6) return void move(e10.component.subTree, t6, s7, o6);
    if (128 & d6) return void e10.suspense.move(t6, s7, o6);
    if (64 & d6) return void l5.move(e10, t6, s7, m4);
    if (l5 === cn2) {
      n6(a6, t6, s7);
      for (let e11 = 0; e11 < u7.length; e11++) move(u7[e11], t6, s7, o6);
      return void n6(e10.anchor, t6, s7);
    }
    if (l5 === dn2) return void (({ el: e11, anchor: t7 }, r5, s8) => {
      let o7;
      for (; e11 && e11 !== t7; ) o7 = p6(e11), n6(e11, r5, s8), e11 = o7;
      n6(t7, r5, s8);
    })(e10, t6, s7);
    if (2 !== o6 && 1 & d6 && c5) if (0 === o6) c5.persisted && !a6[Tt2] ? n6(a6, t6, s7) : (c5.beforeEnter(a6), n6(a6, t6, s7), on2(() => c5.enter(a6), i7));
    else {
      const { leave: o7, delayLeave: i8, afterLeave: l6 } = c5, remove22 = /* @__PURE__ */ __name(() => {
        e10.ctx.isUnmounted ? r4(a6) : n6(a6, t6, s7);
      }, "remove2"), performLeave = /* @__PURE__ */ __name(() => {
        const e11 = a6._isLeaving || !!a6[Tt2];
        a6._isLeaving && a6[Tt2](true), c5.persisted && !e11 ? remove22() : o7(a6, () => {
          remove22(), l6 && l6();
        });
      }, "performLeave");
      i8 ? i8(a6, remove22, performLeave) : performLeave();
    }
    else n6(a6, t6, s7);
  }, "move"), unmount = /* @__PURE__ */ __name((e10, t6, n7, r5 = false, s7 = false) => {
    const { type: o6, props: i7, ref: a6, children: l5, dynamicChildren: c5, shapeFlag: u7, patchFlag: p7, dirs: d6, cacheIndex: f5, memo: g4 } = e10;
    if (-2 === p7 && (s7 = false), null != a6 && (pauseTracking(), setRef(a6, null, n7, e10, true), resetTracking()), null != f5 && (t6.renderCache[f5] = void 0), 256 & u7) return void t6.ctx.deactivate(e10);
    const y5 = 1 & u7 && d6, v5 = !isAsyncWrapper(e10);
    let _4;
    if (v5 && (_4 = i7 && i7.onVnodeBeforeUnmount) && invokeVNodeHook(_4, t6, e10), 6 & u7) unmountComponent(e10.component, n7, r5);
    else {
      if (128 & u7) return void e10.suspense.unmount(n7, r5);
      y5 && invokeDirectiveHook(e10, null, t6, "beforeUnmount"), 64 & u7 ? e10.type.remove(e10, t6, n7, m4, r5) : c5 && !c5.hasOnce && (o6 !== cn2 || p7 > 0 && 64 & p7) ? unmountChildren(c5, t6, n7, false, true) : (o6 === cn2 && 384 & p7 || !s7 && 16 & u7) && unmountChildren(l5, t6, n7), r5 && remove2(e10);
    }
    const b4 = null != g4 && null == f5;
    (v5 && (_4 = i7 && i7.onVnodeUnmounted) || y5 || b4) && on2(() => {
      _4 && invokeVNodeHook(_4, t6, e10), y5 && invokeDirectiveHook(e10, null, t6, "unmounted"), b4 && (e10.el = null);
    }, n7);
  }, "unmount"), remove2 = /* @__PURE__ */ __name((e10) => {
    const { type: t6, el: n7, anchor: s7, transition: o6 } = e10;
    if (t6 === cn2) return void removeFragment(n7, s7);
    if (t6 === dn2) return void (({ el: e11, anchor: t7 }) => {
      let n8;
      for (; e11 && e11 !== t7; ) n8 = p6(e11), r4(e11), e11 = n8;
      r4(t7);
    })(e10);
    const performRemove = /* @__PURE__ */ __name(() => {
      r4(n7), o6 && !o6.persisted && o6.afterLeave && o6.afterLeave();
    }, "performRemove");
    if (1 & e10.shapeFlag && o6 && !o6.persisted) {
      const { leave: t7, delayLeave: r5 } = o6, performLeave = /* @__PURE__ */ __name(() => t7(n7, performRemove), "performLeave");
      r5 ? r5(e10.el, performRemove, performLeave) : performLeave();
    } else performRemove();
  }, "remove"), removeFragment = /* @__PURE__ */ __name((e10, t6) => {
    let n7;
    for (; e10 !== t6; ) n7 = p6(e10), r4(e10), e10 = n7;
    r4(t6);
  }, "removeFragment"), unmountComponent = /* @__PURE__ */ __name((e10, t6, n7) => {
    const { bum: r5, scope: s7, job: o6, subTree: i7, um: a6, m: l5, a: c5 } = e10;
    invalidateMount(l5), invalidateMount(c5), r5 && invokeArrayFns(r5), s7.stop(), o6 && (o6.flags |= 8, unmount(i7, e10, t6, n7)), a6 && on2(a6, t6), on2(() => {
      e10.isUnmounted = true;
    }, t6);
  }, "unmountComponent"), unmountChildren = /* @__PURE__ */ __name((e10, t6, n7, r5 = false, s7 = false, o6 = 0) => {
    for (let i7 = o6; i7 < e10.length; i7++) unmount(e10[i7], t6, n7, r5, s7);
  }, "unmountChildren"), getNextHostNode = /* @__PURE__ */ __name((e10) => {
    if (6 & e10.shapeFlag) return getNextHostNode(e10.component.subTree);
    if (128 & e10.shapeFlag) return e10.suspense.next();
    const t6 = p6(e10.anchor || e10.el), n7 = t6 && t6[wt2];
    return n7 ? p6(n7) : t6;
  }, "getNextHostNode");
  let g3 = false;
  const render2 = /* @__PURE__ */ __name((e10, t6, n7) => {
    let r5;
    null == e10 ? t6._vnode && (unmount(t6._vnode, null, null, true), r5 = t6._vnode.component) : patch(t6._vnode || null, e10, t6, null, null, null, n7), t6._vnode = e10, g3 || (g3 = true, flushPreFlushCbs(r5), flushPostFlushCbs(), g3 = false);
  }, "render"), m4 = { p: patch, um: unmount, m: move, r: remove2, mt: mountComponent, mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, n: getNextHostNode, o: e9 };
  let y4, _3;
  return t5 && ([y4, _3] = t5(m4)), { render: render2, hydrate: y4, createApp: createAppAPI(render2, y4) };
}
function resolveChildrenNamespace({ type: e9, props: t5 }, n6) {
  return "svg" === n6 && "foreignObject" === e9 || "mathml" === n6 && "annotation-xml" === e9 && t5 && t5.encoding && t5.encoding.includes("html") ? void 0 : n6;
}
function toggleRecurse({ effect: e9, job: t5 }, n6) {
  n6 ? (e9.flags |= 32, t5.flags |= 4) : (e9.flags &= -33, t5.flags &= -5);
}
function needTransition(e9, t5) {
  return (!e9 || e9 && !e9.pendingBranch) && t5 && !t5.persisted;
}
function traverseStaticChildren(e9, t5, n6 = false) {
  const r4 = e9.children, s6 = t5.children;
  if (i(r4) && i(s6)) for (let e10 = 0; e10 < r4.length; e10++) {
    const t6 = r4[e10];
    let o5 = s6[e10];
    1 & o5.shapeFlag && !o5.dynamicChildren && ((o5.patchFlag <= 0 || 32 === o5.patchFlag) && (o5 = s6[e10] = cloneIfMounted(s6[e10]), o5.el = t6.el), n6 || -2 === o5.patchFlag || traverseStaticChildren(t6, o5)), o5.type === un2 && (-1 === o5.patchFlag && (o5 = s6[e10] = cloneIfMounted(o5)), o5.el = t6.el), o5.type !== pn2 || o5.el || (o5.el = t6.el);
  }
}
function locateNonHydratedAsyncRoot(e9) {
  const t5 = e9.subTree.component;
  if (t5) return t5.asyncDep && !t5.asyncResolved ? t5 : locateNonHydratedAsyncRoot(t5);
}
function invalidateMount(e9) {
  if (e9) for (let t5 = 0; t5 < e9.length; t5++) e9[t5].flags |= 8;
}
function resolveAsyncComponentPlaceholder(e9) {
  if (e9.placeholder) return e9.placeholder;
  const t5 = e9.component;
  return t5 ? resolveAsyncComponentPlaceholder(t5.subTree) : null;
}
function triggerEvent(e9, t5) {
  const n6 = e9.props && e9.props[t5];
  isFunction(n6) && n6();
}
function createSuspenseBoundary(e9, t5, n6, r4, s6, o5, i6, a5, l4, c4, u6 = false) {
  const { p: p6, m: d5, um: f4, n: g3, o: { parentNode: m4, remove: y4 } } = c4;
  let v5;
  const _3 = (function(e10) {
    const t6 = e10.props && e10.props.suspensible;
    return null != t6 && false !== t6;
  })(e9);
  _3 && t5 && t5.pendingBranch && (v5 = t5.pendingId, t5.deps++);
  const b4 = e9.props ? toNumber(e9.props.timeout) : void 0, k4 = o5, C3 = { vnode: e9, parent: t5, parentComponent: n6, namespace: i6, container: r4, hiddenContainer: s6, deps: 0, pendingId: an2++, timeout: "number" == typeof b4 ? b4 : -1, activeBranch: null, isFallbackMountPending: false, pendingBranch: null, isInFallback: !u6, isHydrating: u6, isUnmounted: false, effects: [], resolve(e10 = false, n7 = false) {
    const { vnode: r5, activeBranch: s7, pendingBranch: i7, pendingId: a6, effects: l5, parentComponent: c5, container: u7, isInFallback: p7 } = C3;
    let y5 = false;
    if (C3.isHydrating) C3.isHydrating = false;
    else if (!e10) {
      y5 = s7 && i7.transition && "out-in" === i7.transition.mode;
      let e11 = false;
      y5 && (s7.transition.afterLeave = () => {
        a6 === C3.pendingId && (d5(i7, u7, o5 !== k4 || e11 ? o5 : g3(s7), 0), queuePostFlushCb(l5), p7 && r5.ssFallback && (r5.ssFallback.el = null));
      }), s7 && !C3.isFallbackMountPending && (m4(s7.el) === u7 && (o5 = g3(s7), e11 = true), f4(s7, c5, C3, true), !y5 && p7 && r5.ssFallback && on2(() => r5.ssFallback.el = null, C3)), y5 || d5(i7, u7, o5, 0);
    }
    C3.isFallbackMountPending = false, setActiveBranch(C3, i7), C3.pendingBranch = null, C3.isInFallback = false;
    let b5 = C3.parent, S4 = false;
    for (; b5; ) {
      if (b5.pendingBranch) {
        b5.effects.push(...l5), S4 = true;
        break;
      }
      b5 = b5.parent;
    }
    S4 || y5 || queuePostFlushCb(l5), C3.effects = [], _3 && t5 && t5.pendingBranch && v5 === t5.pendingId && (t5.deps--, 0 !== t5.deps || n7 || t5.resolve()), triggerEvent(r5, "onResolve");
  }, fallback(e10) {
    if (!C3.pendingBranch) return;
    const { vnode: t6, activeBranch: n7, parentComponent: r5, container: s7, namespace: o6 } = C3;
    triggerEvent(t6, "onFallback");
    const i7 = g3(n7), mountFallback = /* @__PURE__ */ __name(() => {
      C3.isFallbackMountPending = false, C3.isInFallback && (p6(null, e10, s7, i7, r5, null, o6, a5, l4), setActiveBranch(C3, e10));
    }, "mountFallback"), c5 = e10.transition && "out-in" === e10.transition.mode;
    c5 && (C3.isFallbackMountPending = true, n7.transition.afterLeave = mountFallback), C3.isInFallback = true, f4(n7, r5, null, true), c5 || mountFallback();
  }, move(e10, t6, n7) {
    C3.activeBranch && d5(C3.activeBranch, e10, t6, n7), C3.container = e10;
  }, next: /* @__PURE__ */ __name(() => C3.activeBranch && g3(C3.activeBranch), "next"), registerDep(e10, t6, n7) {
    const r5 = !!C3.pendingBranch;
    r5 && C3.deps++;
    const s7 = e10.vnode.el;
    e10.asyncDep.catch((t7) => {
      handleError(t7, e10, 0);
    }).then((o6) => {
      if (e10.isUnmounted || C3.isUnmounted || C3.pendingId !== e10.suspenseId) return;
      unsetCurrentInstance(), e10.asyncResolved = true;
      const { vnode: a6 } = e10;
      handleSetupResult(e10, o6, false), s7 && (a6.el = s7);
      const l5 = !s7 && e10.subTree.el;
      t6(e10, a6, m4(s7 || e10.subTree.el), s7 ? null : g3(e10.subTree), C3, i6, n7), l5 && (a6.placeholder = null, y4(l5)), updateHOCHostEl(e10, a6.el), r5 && 0 === --C3.deps && C3.resolve();
    });
  }, unmount(e10, t6) {
    C3.isUnmounted = true, C3.activeBranch && f4(C3.activeBranch, n6, e10, t6), C3.pendingBranch && f4(C3.pendingBranch, n6, e10, t6);
  } };
  return C3;
}
function normalizeSuspenseSlot(e9) {
  let t5;
  if (isFunction(e9)) {
    const n6 = gn2 && e9._c;
    n6 && (e9._d = false, openBlock()), e9 = e9(), n6 && (e9._d = true, t5 = hn2, closeBlock());
  }
  if (i(e9)) {
    const t6 = (function(e10) {
      let t7;
      for (let n6 = 0; n6 < e10.length; n6++) {
        const r4 = e10[n6];
        if (!isVNode$2(r4)) return;
        if (r4.type !== pn2 || "v-if" === r4.children) {
          if (t7) return;
          t7 = r4;
        }
      }
      return t7;
    })(e9);
    e9 = t6;
  }
  return e9 = normalizeVNode$1(e9), t5 && !e9.dynamicChildren && (e9.dynamicChildren = t5.filter((t6) => t6 !== e9)), e9;
}
function queueEffectWithSuspense(e9, t5) {
  t5 && t5.pendingBranch ? i(e9) ? t5.effects.push(...e9) : t5.effects.push(e9) : queuePostFlushCb(e9);
}
function setActiveBranch(e9, t5) {
  e9.activeBranch = t5;
  const { vnode: n6, parentComponent: r4 } = e9;
  let s6 = t5.el;
  for (; !s6 && t5.component; ) s6 = (t5 = t5.component.subTree).el;
  n6.el = s6, r4 && r4.subTree === n6 && (r4.vnode.el = s6, updateHOCHostEl(r4, s6));
}
function openBlock(e9 = false) {
  fn.push(hn2 = e9 ? null : []);
}
function closeBlock() {
  fn.pop(), hn2 = fn[fn.length - 1] || null;
}
function setBlockTracking(e9, t5 = false) {
  gn2 += e9, e9 < 0 && hn2 && t5 && (hn2.hasOnce = true);
}
function setupBlock(e9) {
  return e9.dynamicChildren = gn2 > 0 ? hn2 || a : null, closeBlock(), gn2 > 0 && hn2 && hn2.push(e9), e9;
}
function createBlock(e9, t5, n6, r4, s6) {
  return setupBlock(createVNode(e9, t5, n6, r4, s6, true));
}
function isVNode$2(e9) {
  return !!e9 && true === e9.__v_isVNode;
}
function isSameVNodeType(e9, t5) {
  return e9.type === t5.type && e9.key === t5.key;
}
function createBaseVNode(e9, t5 = null, n6 = null, r4 = 0, s6 = null, o5 = e9 === cn2 ? 0 : 1, i6 = false, a5 = false) {
  const l4 = { __v_isVNode: true, __v_skip: true, type: e9, props: t5, key: t5 && normalizeKey(t5), ref: t5 && normalizeRef(t5), scopeId: kt2, slotScopeIds: null, children: n6, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o5, patchFlag: r4, dynamicProps: s6, dynamicChildren: null, appContext: null, ctx: bt2 };
  return a5 ? (normalizeChildren(l4, n6), 128 & o5 && e9.normalize(l4)) : n6 && (l4.shapeFlag |= isString(n6) ? 8 : 16), gn2 > 0 && !i6 && hn2 && (l4.patchFlag > 0 || 6 & o5) && 32 !== l4.patchFlag && hn2.push(l4), l4;
}
function guardReactiveProps(e9) {
  return e9 ? isProxy(e9) || isInternalObject(e9) ? n({}, e9) : e9 : null;
}
function cloneVNode(e9, t5, n6 = false, r4 = false) {
  const { props: s6, ref: o5, patchFlag: i6, children: a5, transition: l4 } = e9, c4 = t5 ? mergeProps(s6 || {}, t5) : s6, u6 = { __v_isVNode: true, __v_skip: true, type: e9.type, props: c4, key: c4 && normalizeKey(c4), ref: t5 && t5.ref ? n6 && o5 ? i(o5) ? o5.concat(normalizeRef(t5)) : [o5, normalizeRef(t5)] : normalizeRef(t5) : o5, scopeId: e9.scopeId, slotScopeIds: e9.slotScopeIds, children: a5, target: e9.target, targetStart: e9.targetStart, targetAnchor: e9.targetAnchor, staticCount: e9.staticCount, shapeFlag: e9.shapeFlag, patchFlag: t5 && e9.type !== cn2 ? -1 === i6 ? 16 : 16 | i6 : i6, dynamicProps: e9.dynamicProps, dynamicChildren: e9.dynamicChildren, appContext: e9.appContext, dirs: e9.dirs, transition: l4, component: e9.component, suspense: e9.suspense, ssContent: e9.ssContent && cloneVNode(e9.ssContent), ssFallback: e9.ssFallback && cloneVNode(e9.ssFallback), placeholder: e9.placeholder, el: e9.el, anchor: e9.anchor, ctx: e9.ctx, ce: e9.ce };
  return l4 && r4 && setTransitionHooks(u6, l4.clone(u6)), u6;
}
function createTextVNode(e9 = " ", t5 = 0) {
  return createVNode(un2, null, e9, t5);
}
function createCommentVNode(e9 = "", t5 = false) {
  return t5 ? (openBlock(), createBlock(pn2, null, e9)) : createVNode(pn2, null, e9);
}
function normalizeVNode$1(e9) {
  return null == e9 || "boolean" == typeof e9 ? createVNode(pn2) : i(e9) ? createVNode(cn2, null, e9.slice()) : isVNode$2(e9) ? cloneIfMounted(e9) : createVNode(un2, null, String(e9));
}
function cloneIfMounted(e9) {
  return null === e9.el && -1 !== e9.patchFlag || e9.memo ? e9 : cloneVNode(e9);
}
function normalizeChildren(e9, t5) {
  let n6 = 0;
  const { shapeFlag: r4 } = e9;
  if (null == t5) t5 = null;
  else if (i(t5)) n6 = 16;
  else if ("object" == typeof t5) {
    if (65 & r4) {
      const n7 = t5.default;
      return void (n7 && (n7._c && (n7._d = false), normalizeChildren(e9, n7()), n7._c && (n7._d = true)));
    }
    {
      n6 = 32;
      const r5 = t5._;
      r5 || isInternalObject(t5) ? 3 === r5 && bt2 && (1 === bt2.slots._ ? t5._ = 1 : (t5._ = 2, e9.patchFlag |= 1024)) : t5._ctx = bt2;
    }
  } else if (isFunction(t5)) {
    if (65 & r4) return void normalizeChildren(e9, { default: t5 });
    t5 = { default: t5, _ctx: bt2 }, n6 = 32;
  } else t5 = String(t5), 64 & r4 ? (n6 = 16, t5 = [createTextVNode(t5)]) : n6 = 8;
  e9.children = t5, e9.shapeFlag |= n6;
}
function mergeProps(...e9) {
  const t5 = {};
  for (let n6 = 0; n6 < e9.length; n6++) {
    const r4 = e9[n6];
    for (const e10 in r4) if ("class" === e10) t5.class !== r4.class && (t5.class = normalizeClass([t5.class, r4.class]));
    else if ("style" === e10) t5.style = normalizeStyle([t5.style, r4.style]);
    else if (isOn(e10)) {
      const n7 = t5[e10], s6 = r4[e10];
      !s6 || n7 === s6 || i(n7) && n7.includes(s6) ? null != s6 || null != n7 || isModelListener(e10) || (t5[e10] = s6) : t5[e10] = n7 ? [].concat(n7, s6) : s6;
    } else "" !== e10 && (t5[e10] = r4[e10]);
  }
  return t5;
}
function invokeVNodeHook(e9, t5, n6, r4 = null) {
  callWithAsyncErrorHandling(e9, t5, 7, [n6, r4]);
}
function createComponentInstance$1(e9, t5, n6) {
  const r4 = e9.type, s6 = (t5 ? t5.appContext : e9.appContext) || mn2, o5 = { uid: yn2++, vnode: e9, type: r4, parent: t5, appContext: s6, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new EffectScope(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t5 ? t5.provides : Object.create(s6.provides), ids: t5 ? t5.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: normalizePropsOptions(r4, s6), emitsOptions: normalizeEmitsOptions(r4, s6), emit: null, emitted: null, propsDefaults: t, inheritAttrs: r4.inheritAttrs, ctx: t, data: t, props: t, attrs: t, slots: t, refs: t, setupState: t, setupContext: null, suspense: n6, suspenseId: n6 ? n6.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return o5.ctx = { _: o5 }, o5.root = t5 ? t5.root : o5, o5.emit = emit.bind(null, o5), e9.ce && e9.ce(o5), o5;
}
function isStatefulComponent(e9) {
  return 4 & e9.vnode.shapeFlag;
}
function setupComponent$1(e9, t5 = false, n6 = false) {
  t5 && bn2(t5);
  const { props: r4, children: s6 } = e9.vnode, o5 = isStatefulComponent(e9);
  !(function(e10, t6, n7, r5 = false) {
    const s7 = {}, o6 = createInternalObject();
    e10.propsDefaults = /* @__PURE__ */ Object.create(null), setFullProps(e10, t6, s7, o6);
    for (const t7 in e10.propsOptions[0]) t7 in s7 || (s7[t7] = void 0);
    n7 ? e10.props = r5 ? s7 : shallowReactive(s7) : e10.type.props ? e10.props = s7 : e10.props = o6, e10.attrs = o6;
  })(e9, r4, o5, t5), ((e10, t6, n7) => {
    const r5 = e10.slots = createInternalObject();
    if (32 & e10.vnode.shapeFlag) {
      const e11 = t6._;
      e11 ? (assignSlots(r5, t6, n7), n7 && def(r5, "_", e11, true)) : normalizeObjectSlots(t6, r5);
    } else t6 && normalizeVNodeSlots(e10, t6);
  })(e9, s6, n6 || t5);
  const i6 = o5 ? (function(e10, t6) {
    const n7 = e10.type;
    e10.accessCache = /* @__PURE__ */ Object.create(null), e10.proxy = new Proxy(e10.ctx, Zt2);
    const { setup: r5 } = n7;
    if (r5) {
      pauseTracking();
      const n8 = e10.setupContext = r5.length > 1 ? createSetupContext(e10) : null, s7 = setCurrentInstance(e10), o6 = callWithErrorHandling(r5, e10, 0, [e10.props, n8]), i7 = isPromise(o6);
      if (resetTracking(), s7(), !i7 && !e10.sp || isAsyncWrapper(e10) || markAsyncBoundary(e10), i7) {
        if (o6.then(unsetCurrentInstance, unsetCurrentInstance), t6) return o6.then((n9) => {
          handleSetupResult(e10, n9, t6);
        }).catch((t7) => {
          handleError(t7, e10, 0);
        });
        e10.asyncDep = o6;
      } else handleSetupResult(e10, o6, t6);
    } else finishComponentSetup(e10, t6);
  })(e9, t5) : void 0;
  return t5 && bn2(false), i6;
}
function handleSetupResult(e9, t5, n6) {
  isFunction(t5) ? e9.type.__ssrInlineRender ? e9.ssrRender = t5 : e9.render = t5 : isObject(t5) && (e9.setupState = proxyRefs(t5)), finishComponentSetup(e9, n6);
}
function finishComponentSetup(e9, t5, n6) {
  const r4 = e9.type;
  if (!e9.render) {
    if (!t5 && kn2 && !r4.render) {
      const t6 = r4.template || resolveMergedOptions(e9).template;
      if (t6) {
        const { isCustomElement: n7, compilerOptions: s6 } = e9.appContext.config, { delimiters: o5, compilerOptions: i6 } = r4, a5 = n(n({ isCustomElement: n7, delimiters: o5 }, s6), i6);
        r4.render = kn2(t6, a5);
      }
    }
    e9.render = r4.render || NOOP, Cn2 && Cn2(e9);
  }
  {
    const t6 = setCurrentInstance(e9);
    pauseTracking();
    try {
      applyOptions(e9);
    } finally {
      resetTracking(), t6();
    }
  }
}
function createSetupContext(e9) {
  const expose = /* @__PURE__ */ __name((t5) => {
    e9.exposed = t5 || {};
  }, "expose");
  return { attrs: new Proxy(e9.attrs, wn2), slots: e9.slots, emit: e9.emit, expose };
}
function getComponentPublicInstance(e9) {
  return e9.exposed ? e9.exposeProxy || (e9.exposeProxy = new Proxy(proxyRefs(markRaw(e9.exposed)), { get: /* @__PURE__ */ __name((t5, n6) => n6 in t5 ? t5[n6] : n6 in Gt2 ? Gt2[n6](e9) : void 0, "get"), has: /* @__PURE__ */ __name((e10, t5) => t5 in e10 || t5 in Gt2, "has") })) : e9.proxy;
}
function getComponentName(e9, t5 = true) {
  return isFunction(e9) ? e9.displayName || e9.name : e9.name || t5 && e9.__name;
}
function h3(e9, t5, n6) {
  try {
    setBlockTracking(-1);
    const r4 = arguments.length;
    return 2 === r4 ? isObject(t5) && !i(t5) ? isVNode$2(t5) ? createVNode(e9, null, [t5]) : createVNode(e9, t5) : createVNode(e9, null, t5) : (r4 > 3 ? n6 = Array.prototype.slice.call(arguments, 2) : 3 === r4 && isVNode$2(n6) && (n6 = [n6]), createVNode(e9, t5, n6));
  } finally {
    setBlockTracking(1);
  }
}
function isMemoSame(e9, t5) {
  const n6 = e9.memo;
  if (n6.length != t5.length) return false;
  for (let e10 = 0; e10 < n6.length; e10++) if (hasChanged(n6[e10], t5[e10])) return false;
  return gn2 > 0 && hn2 && hn2.push(e9), true;
}
function resolveTransitionProps(e9) {
  const t5 = {};
  for (const n7 in e9) n7 in Vn2 || (t5[n7] = e9[n7]);
  if (false === e9.css) return t5;
  const { name: n6 = "v", type: r4, duration: s6, enterFromClass: o5 = `${n6}-enter-from`, enterActiveClass: i6 = `${n6}-enter-active`, enterToClass: a5 = `${n6}-enter-to`, appearFromClass: l4 = o5, appearActiveClass: c4 = i6, appearToClass: u6 = a5, leaveFromClass: p6 = `${n6}-leave-from`, leaveActiveClass: d5 = `${n6}-leave-active`, leaveToClass: f4 = `${n6}-leave-to` } = e9, g3 = (function(e10) {
    if (null == e10) return null;
    if (isObject(e10)) return [NumberOf(e10.enter), NumberOf(e10.leave)];
    {
      const t6 = NumberOf(e10);
      return [t6, t6];
    }
  })(s6), m4 = g3 && g3[0], y4 = g3 && g3[1], { onBeforeEnter: v5, onEnter: _3, onEnterCancelled: k4, onLeave: C3, onLeaveCancelled: S4, onBeforeAppear: w3 = v5, onAppear: R3 = _3, onAppearCancelled: T3 = k4 } = t5, finishEnter = /* @__PURE__ */ __name((e10, t6, n7, r5) => {
    e10._enterCancelled = r5, removeTransitionClass(e10, t6 ? u6 : a5), removeTransitionClass(e10, t6 ? c4 : i6), n7 && n7();
  }, "finishEnter"), finishLeave = /* @__PURE__ */ __name((e10, t6) => {
    e10._isLeaving = false, removeTransitionClass(e10, p6), removeTransitionClass(e10, f4), removeTransitionClass(e10, d5), t6 && t6();
  }, "finishLeave"), makeEnterHook = /* @__PURE__ */ __name((e10) => (t6, n7) => {
    const s7 = e10 ? R3 : _3, resolve2 = /* @__PURE__ */ __name(() => finishEnter(t6, e10, n7), "resolve");
    callHook(s7, [t6, resolve2]), nextFrame(() => {
      removeTransitionClass(t6, e10 ? l4 : o5), addTransitionClass(t6, e10 ? u6 : a5), hasExplicitCallback(s7) || whenTransitionEnds(t6, r4, m4, resolve2);
    });
  }, "makeEnterHook");
  return n(t5, { onBeforeEnter(e10) {
    callHook(v5, [e10]), addTransitionClass(e10, o5), addTransitionClass(e10, i6);
  }, onBeforeAppear(e10) {
    callHook(w3, [e10]), addTransitionClass(e10, l4), addTransitionClass(e10, c4);
  }, onEnter: makeEnterHook(false), onAppear: makeEnterHook(true), onLeave(e10, t6) {
    e10._isLeaving = true;
    const resolve2 = /* @__PURE__ */ __name(() => finishLeave(e10, t6), "resolve");
    addTransitionClass(e10, p6), e10._enterCancelled ? (addTransitionClass(e10, d5), forceReflow(e10)) : (forceReflow(e10), addTransitionClass(e10, d5)), nextFrame(() => {
      e10._isLeaving && (removeTransitionClass(e10, p6), addTransitionClass(e10, f4), hasExplicitCallback(C3) || whenTransitionEnds(e10, r4, y4, resolve2));
    }), callHook(C3, [e10, resolve2]);
  }, onEnterCancelled(e10) {
    finishEnter(e10, false, void 0, true), callHook(k4, [e10]);
  }, onAppearCancelled(e10) {
    finishEnter(e10, true, void 0, true), callHook(T3, [e10]);
  }, onLeaveCancelled(e10) {
    finishLeave(e10), callHook(S4, [e10]);
  } });
}
function NumberOf(e9) {
  return toNumber(e9);
}
function addTransitionClass(e9, t5) {
  t5.split(/\s+/).forEach((t6) => t6 && e9.classList.add(t6)), (e9[Mn2] || (e9[Mn2] = /* @__PURE__ */ new Set())).add(t5);
}
function removeTransitionClass(e9, t5) {
  t5.split(/\s+/).forEach((t6) => t6 && e9.classList.remove(t6));
  const n6 = e9[Mn2];
  n6 && (n6.delete(t5), n6.size || (e9[Mn2] = void 0));
}
function nextFrame(e9) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e9);
  });
}
function whenTransitionEnds(e9, t5, n6, r4) {
  const s6 = e9._endId = ++In2, resolveIfNotStale = /* @__PURE__ */ __name(() => {
    s6 === e9._endId && r4();
  }, "resolveIfNotStale");
  if (null != n6) return setTimeout(resolveIfNotStale, n6);
  const { type: o5, timeout: i6, propCount: a5 } = getTransitionInfo(e9, t5);
  if (!o5) return r4();
  const l4 = o5 + "end";
  let c4 = 0;
  const end = /* @__PURE__ */ __name(() => {
    e9.removeEventListener(l4, onEnd), resolveIfNotStale();
  }, "end"), onEnd = /* @__PURE__ */ __name((t6) => {
    t6.target === e9 && ++c4 >= a5 && end();
  }, "onEnd");
  setTimeout(() => {
    c4 < a5 && end();
  }, i6 + 1), e9.addEventListener(l4, onEnd);
}
function getTransitionInfo(e9, t5) {
  const n6 = window.getComputedStyle(e9), getStyleProperties = /* @__PURE__ */ __name((e10) => (n6[e10] || "").split(", "), "getStyleProperties"), r4 = getStyleProperties(`${Nn2}Delay`), s6 = getStyleProperties(`${Nn2}Duration`), o5 = getTimeout(r4, s6), i6 = getStyleProperties(`${Hn2}Delay`), a5 = getStyleProperties(`${Hn2}Duration`), l4 = getTimeout(i6, a5);
  let c4 = null, u6 = 0, p6 = 0;
  t5 === Nn2 ? o5 > 0 && (c4 = Nn2, u6 = o5, p6 = s6.length) : t5 === Hn2 ? l4 > 0 && (c4 = Hn2, u6 = l4, p6 = a5.length) : (u6 = Math.max(o5, l4), c4 = u6 > 0 ? o5 > l4 ? Nn2 : Hn2 : null, p6 = c4 ? c4 === Nn2 ? s6.length : a5.length : 0);
  return { type: c4, timeout: u6, propCount: p6, hasTransform: c4 === Nn2 && /\b(?:transform|all)(?:,|$)/.test(getStyleProperties(`${Nn2}Property`).toString()) };
}
function getTimeout(e9, t5) {
  for (; e9.length < t5.length; ) e9 = e9.concat(e9);
  return Math.max(...t5.map((t6, n6) => toMs(t6) + toMs(e9[n6])));
}
function toMs(e9) {
  return "auto" === e9 ? 0 : 1e3 * Number(e9.slice(0, -1).replace(",", "."));
}
function forceReflow(e9) {
  return (e9 ? e9.ownerDocument : document).body.offsetHeight;
}
function setDisplay(e9, t5) {
  e9.style.display = t5 ? e9[jn2] : "none", e9[Fn2] = !t5;
}
function setVarsOnVNode(e9, t5) {
  if (128 & e9.shapeFlag) {
    const n6 = e9.suspense;
    e9 = n6.activeBranch, n6.pendingBranch && !n6.isHydrating && n6.effects.push(() => {
      setVarsOnVNode(n6.activeBranch, t5);
    });
  }
  for (; e9.component; ) e9 = e9.component.subTree;
  if (1 & e9.shapeFlag && e9.el) setVarsOnNode(e9.el, t5);
  else if (e9.type === cn2) e9.children.forEach((e10) => setVarsOnVNode(e10, t5));
  else if (e9.type === dn2) {
    let { el: n6, anchor: r4 } = e9;
    for (; n6 && (setVarsOnNode(n6, t5), n6 !== r4); ) n6 = n6.nextSibling;
  }
}
function setVarsOnNode(e9, t5) {
  if (1 === e9.nodeType) {
    const n6 = e9.style;
    let r4 = "";
    for (const e10 in t5) {
      const s6 = normalizeCssVarValue(t5[e10]);
      n6.setProperty(`--${e10}`, s6), r4 += `--${e10}: ${s6};`;
    }
    n6[Un2] = r4;
  }
}
function setStyle(e9, t5, n6) {
  if (i(n6)) n6.forEach((n7) => setStyle(e9, t5, n7));
  else if (null == n6 && (n6 = ""), t5.startsWith("--")) e9.setProperty(t5, n6);
  else {
    const r4 = (function(e10, t6) {
      const n7 = Kn2[t6];
      if (n7) return n7;
      let r5 = p(t6);
      if ("filter" !== r5 && r5 in e10) return Kn2[t6] = r5;
      r5 = f(r5);
      for (let n8 = 0; n8 < qn2.length; n8++) {
        const s6 = qn2[n8] + r5;
        if (s6 in e10) return Kn2[t6] = s6;
      }
      return t6;
    })(e9, t5);
    zn2.test(n6) ? e9.setProperty(d(r4), n6.replace(zn2, ""), "important") : e9[r4] = n6;
  }
}
function shouldPreserveTextareaResizeStyle(e9, t5, n6, r4) {
  return "TEXTAREA" === e9.tagName && ("width" === t5 || "height" === t5) && isString(r4) && n6 === r4;
}
function patchAttr(e9, t5, n6, r4, s6, o5 = v(t5)) {
  r4 && t5.startsWith("xlink:") ? null == n6 ? e9.removeAttributeNS(Jn2, t5.slice(6, t5.length)) : e9.setAttributeNS(Jn2, t5, n6) : null == n6 || o5 && !includeBooleanAttr(n6) ? e9.removeAttribute(t5) : e9.setAttribute(t5, o5 ? "" : isSymbol(n6) ? String(n6) : n6);
}
function patchDOMProp(e9, t5, n6, r4, s6) {
  if ("innerHTML" === t5 || "textContent" === t5) return void (null != n6 && (e9[t5] = n6));
  const o5 = e9.tagName;
  if ("value" === t5 && "PROGRESS" !== o5 && !o5.includes("-")) {
    const r5 = "OPTION" === o5 ? e9.getAttribute("value") || "" : e9.value, s7 = null == n6 ? "checkbox" === e9.type ? "on" : "" : String(n6);
    return r5 === s7 && "_value" in e9 || (e9.value = s7), null == n6 && e9.removeAttribute(t5), void (e9._value = n6);
  }
  let i6 = false;
  if ("" === n6 || null == n6) {
    const r5 = typeof e9[t5];
    "boolean" === r5 ? n6 = includeBooleanAttr(n6) : null == n6 && "string" === r5 ? (n6 = "", i6 = true) : "number" === r5 && (n6 = 0, i6 = true);
  }
  try {
    e9[t5] = n6;
  } catch (e10) {
  }
  i6 && e9.removeAttribute(s6 || t5);
}
function addEventListener(e9, t5, n6, r4) {
  e9.addEventListener(t5, n6, r4);
}
function patchEvent(e9, t5, n6, r4, s6 = null) {
  const o5 = e9[Gn2] || (e9[Gn2] = {}), i6 = o5[t5];
  if (r4 && i6) i6.value = r4;
  else {
    const [n7, a5] = (function(e10) {
      let t6, n8;
      for (; (n8 = e10.match(Zn2)) && !Yn2.test(e10); ) t6 || (t6 = {}), e10 = e10.slice(0, e10.length - n8[1].length), t6[n8[1].toLowerCase()] = true;
      const r5 = ":" === e10[2] ? e10.slice(3) : d(e10.slice(2));
      return [r5, t6];
    })(t5);
    if (r4) {
      const i7 = o5[t5] = (function(e10, t6) {
        const invoker = /* @__PURE__ */ __name((e11) => {
          if (e11._vts) {
            if (e11._vts <= invoker.attached) return;
          } else e11._vts = Date.now();
          const n8 = invoker.value;
          if (i(n8)) {
            const r5 = e11.stopImmediatePropagation;
            e11.stopImmediatePropagation = () => {
              r5.call(e11), e11._stopped = true;
            };
            const s7 = n8.slice(), o6 = [e11];
            for (let n9 = 0; n9 < s7.length && !e11._stopped; n9++) {
              const e12 = s7[n9];
              e12 && callWithAsyncErrorHandling(e12, t6, 5, o6);
            }
          } else callWithAsyncErrorHandling(n8, t6, 5, [e11]);
        }, "invoker");
        return invoker.value = e10, invoker.attached = getNow(), invoker;
      })(r4, s6);
      addEventListener(e9, n7, i7, a5);
    } else i6 && (!(function(e10, t6, n8, r5) {
      e10.removeEventListener(t6, n8, r5);
    })(e9, n7, i6, a5), o5[t5] = void 0);
  }
}
function defineCustomElement(e9, t5, n6) {
  let r4 = defineComponent(e9, t5);
  isPlainObject(r4) && (r4 = n({}, r4, t5));
  class VueCustomElement extends VueElement {
    static {
      __name(this, "VueCustomElement");
    }
    constructor(e10) {
      super(r4, e10, n6);
    }
  }
  return VueCustomElement.def = r4, VueCustomElement;
}
function useHost(e9) {
  const t5 = getCurrentInstance(), n6 = t5 && t5.ce;
  return n6 || null;
}
function callPendingCbs(e9) {
  const t5 = e9.el;
  t5[sr2] && t5[sr2](), t5[or2] && t5[or2]();
}
function recordPosition(e9) {
  rr2.set(e9, getPosition(e9.el));
}
function applyTranslation(e9) {
  const t5 = nr2.get(e9), n6 = rr2.get(e9), r4 = t5.left - n6.left, s6 = t5.top - n6.top;
  if (r4 || s6) {
    const t6 = e9.el, n7 = t6.style, o5 = t6.getBoundingClientRect();
    let i6 = 1, a5 = 1;
    return t6.offsetWidth && (i6 = o5.width / t6.offsetWidth), t6.offsetHeight && (a5 = o5.height / t6.offsetHeight), Number.isFinite(i6) && 0 !== i6 || (i6 = 1), Number.isFinite(a5) && 0 !== a5 || (a5 = 1), Math.abs(i6 - 1) < 0.01 && (i6 = 1), Math.abs(a5 - 1) < 0.01 && (a5 = 1), n7.transform = n7.webkitTransform = `translate(${r4 / i6}px,${s6 / a5}px)`, n7.transitionDuration = "0s", e9;
  }
}
function getPosition(e9) {
  const t5 = e9.getBoundingClientRect();
  return { left: t5.left, top: t5.top };
}
function onCompositionStart(e9) {
  e9.target.composing = true;
}
function onCompositionEnd(e9) {
  const t5 = e9.target;
  t5.composing && (t5.composing = false, t5.dispatchEvent(new Event("input")));
}
function castValue(e9, t5, n6) {
  return t5 && (e9 = e9.trim()), n6 && (e9 = looseToNumber(e9)), e9;
}
function setChecked(e9, { value: t5, oldValue: n6 }, r4) {
  let s6;
  if (e9._modelValue = t5, i(t5)) s6 = looseIndexOf(t5, r4.props.value) > -1;
  else if (isSet(t5)) s6 = t5.has(r4.props.value);
  else {
    if (t5 === n6) return;
    s6 = looseEqual(t5, getCheckboxValue(e9, true));
  }
  e9.checked !== s6 && (e9.checked = s6);
}
function setSelected(e9, t5) {
  const n6 = e9.multiple, r4 = i(t5);
  if (!n6 || r4 || isSet(t5)) {
    for (let s6 = 0, o5 = e9.options.length; s6 < o5; s6++) {
      const o6 = e9.options[s6], i6 = getValue(o6);
      if (n6) if (r4) {
        const e10 = typeof i6;
        o6.selected = "string" === e10 || "number" === e10 ? t5.some((e11) => String(e11) === String(i6)) : looseIndexOf(t5, i6) > -1;
      } else o6.selected = t5.has(i6);
      else if (looseEqual(getValue(o6), t5)) return void (e9.selectedIndex !== s6 && (e9.selectedIndex = s6));
    }
    n6 || -1 === e9.selectedIndex || (e9.selectedIndex = -1);
  }
}
function getValue(e9) {
  return "_value" in e9 ? e9._value : e9.value;
}
function getCheckboxValue(e9, t5) {
  const n6 = t5 ? "_trueValue" : "_falseValue";
  return n6 in e9 ? e9[n6] : t5;
}
function resolveDynamicModel(e9, t5) {
  switch (e9) {
    case "SELECT":
      return pr2;
    case "TEXTAREA":
      return lr2;
    default:
      switch (t5) {
        case "checkbox":
          return cr2;
        case "radio":
          return ur2;
        default:
          return lr2;
      }
  }
}
function callModelHook(e9, t5, n6, r4, s6) {
  const o5 = resolveDynamicModel(e9.tagName, n6.props && n6.props.type)[s6];
  o5 && o5(e9, t5, n6, r4);
}
function ensureRenderer() {
  return yr2 || (yr2 = createRenderer(mr2));
}
function ensureHydrationRenderer() {
  return yr2 = vr2 ? yr2 : createHydrationRenderer(mr2), vr2 = true, yr2;
}
function resolveRootNamespace(e9) {
  return e9 instanceof SVGElement ? "svg" : "function" == typeof MathMLElement && e9 instanceof MathMLElement ? "mathml" : void 0;
}
function normalizeContainer(e9) {
  if (isString(e9)) {
    return document.querySelector(e9);
  }
  return e9;
}
function injectHead() {
  if (hasInjectionContext()) {
    const e9 = inject(kr);
    if (e9) return e9;
  }
  throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
function useHead(e9, t5 = {}) {
  const n6 = t5.head || injectHead();
  return n6.ssr ? n6.push(e9 || {}, t5) : (function(e10, t6, n7 = {}) {
    const r4 = ref(false);
    let s6;
    watchEffect(() => {
      const o5 = r4.value ? {} : walkResolver(t6, VueResolver);
      s6 ? s6.patch(o5) : s6 = e10.push(o5, n7);
    });
    getCurrentInstance() && (Bt2(() => {
      s6.dispose();
    }), onDeactivated(() => {
      r4.value = true;
    }), onActivated(() => {
      r4.value = false;
    }));
    return s6;
  })(n6, e9, t5);
}
function createHead(e9 = {}) {
  const t5 = (function(e10 = {}) {
    const t6 = createUnhead({ ...e10, document: false, propResolvers: [...e10.propResolvers || [], (e11, t7) => e11 && e11.startsWith("on") && "function" == typeof t7 ? `this.dataset.${e11}fired = true` : t7], init: [e10.disableDefaults ? void 0 : { htmlAttrs: { lang: "en" }, meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }] }, ...e10.init || []] });
    return t6._ssrPayload = {}, t6.use({ key: "server", hooks: { "tags:resolve": /* @__PURE__ */ __name(function(e11) {
      const n6 = e11.tagMap.get("title"), r4 = e11.tagMap.get("titleTemplate");
      let s6 = { title: "server" === n6?.mode ? t6._title : void 0, titleTemplate: "server" === r4?.mode ? t6._titleTemplate : void 0 };
      Object.keys(t6._ssrPayload || {}).length > 0 && (s6 = { ...t6._ssrPayload, ...s6 }), Object.values(s6).some(Boolean) && e11.tags.push({ tag: "script", innerHTML: JSON.stringify(s6), props: { id: "unhead:payload", type: "application/json" } });
    }, "tags:resolve") } }), t6;
  })({ ...e9, propResolvers: [VueResolver] });
  return t5.install = (function(e10) {
    return { install(t6) {
      t6.config.globalProperties.$unhead = e10, t6.config.globalProperties.$head = e10, t6.provide(kr, e10);
    } }.install;
  })(t5), t5;
}
function ssrRenderAttrs(e9, t5) {
  let n6 = "";
  for (let r4 in e9) {
    if (Cr2(r4) || isOn(r4) || "textarea" === t5 && "value" === r4 || r4.startsWith(".")) continue;
    const s6 = e9[r4];
    r4.startsWith("^") && (r4 = r4.slice(1)), "class" === r4 ? n6 += ` class="${ssrRenderClass(s6)}"` : "style" === r4 ? n6 += ` style="${ssrRenderStyle(s6)}"` : "className" === r4 ? null != s6 && (n6 += ` class="${escapeHtml(String(s6))}"`) : n6 += ssrRenderDynamicAttr(r4, s6, t5);
  }
  return n6;
}
function ssrRenderDynamicAttr(e9, t5, n6) {
  if (!isRenderableAttrValue(t5)) return "";
  const r4 = n6 && (n6.indexOf("-") > 0 || O(n6)) ? e9 : P[e9] || e9.toLowerCase();
  return R(r4) ? includeBooleanAttr(t5) ? ` ${r4}` : "" : isSSRSafeAttrName(r4) ? "" === t5 ? ` ${r4}` : ` ${r4}="${escapeHtml(t5)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${r4}`), "");
}
function ssrRenderAttr(e9, t5) {
  return isRenderableAttrValue(t5) ? ` ${e9}="${escapeHtml(t5)}"` : "";
}
function ssrRenderClass(e9) {
  return escapeHtml(normalizeClass(e9));
}
function ssrRenderStyle(e9) {
  if (!e9) return "";
  if (isString(e9)) return escapeHtml(e9);
  const t5 = normalizeStyle((function(e10) {
    if (!i(e10) && isObject(e10)) {
      const t6 = {};
      for (const n6 in e10) n6.startsWith(":--") ? t6[n6.slice(1)] = normalizeCssVarValue(e10[n6]) : t6[n6] = e10[n6];
      return t6;
    }
    return e10;
  })(e9));
  return escapeHtml(stringifyStyle(t5));
}
function ssrRenderComponent(e9, t5 = null, n6 = null, r4 = null, s6) {
  return renderComponentVNode(createVNode(e9, t5, n6), r4, s6);
}
function ssrInterpolate(e9) {
  return escapeHtml(toDisplayString(e9));
}
function ssrRenderList(e9, t5) {
  if (i(e9) || isString(e9)) for (let n6 = 0, r4 = e9.length; n6 < r4; n6++) t5(e9[n6], n6);
  else if ("number" == typeof e9) for (let n6 = 0; n6 < e9; n6++) t5(n6 + 1, n6);
  else if (isObject(e9)) if (e9[Symbol.iterator]) {
    let n6 = 0;
    for (const r4 of e9) t5(r4, n6++);
  } else {
    const n6 = Object.keys(e9);
    for (let r4 = 0, s6 = n6.length; r4 < s6; r4++) {
      const s7 = n6[r4];
      t5(e9[s7], s7, r4);
    }
  }
}
function ssrRenderSuspense(e9, { default: t5 }) {
  t5 ? t5() : e9("<!---->");
}
function ssrLooseContain(e9, t5) {
  return looseIndexOf(e9, t5) > -1;
}
function createBuffer() {
  let e9 = false;
  const t5 = [];
  return { getBuffer: /* @__PURE__ */ __name(() => t5, "getBuffer"), push(n6) {
    const r4 = isString(n6);
    e9 && r4 ? t5[t5.length - 1] += n6 : (t5.push(n6), e9 = r4, (isPromise(n6) || i(n6) && n6.hasAsync) && (t5.hasAsync = true));
  } };
}
function renderComponentVNode(e9, t5 = null, n6) {
  const r4 = e9.component = Rr2(e9, t5, null), s6 = Ar2(r4, true), o5 = isPromise(s6);
  let i6 = r4.sp;
  if (o5 || i6) {
    return Promise.resolve(s6).then(() => {
      if (o5 && (i6 = r4.sp), i6) return Promise.all(i6.map((e10) => e10.call(r4.proxy)));
    }).catch(NOOP).then(() => renderComponentSubTree(r4, n6));
  }
  return renderComponentSubTree(r4, n6);
}
function renderComponentSubTree(e9, t5) {
  const n6 = e9.type, { getBuffer: r4, push: s6 } = createBuffer();
  if (isFunction(n6)) {
    let r5 = xr2(e9);
    if (!n6.props) for (const t6 in e9.attrs) t6.startsWith("data-v-") && ((r5.props || (r5.props = {}))[t6] = "");
    renderVNode(s6, e9.subTree = r5, e9, t5);
  } else {
    e9.render && e9.render !== NOOP || e9.ssrRender || n6.ssrRender || !isString(n6.template) || (n6.ssrRender = (function() {
      throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
    })(n6.template));
    const r5 = e9.ssrRender || n6.ssrRender;
    if (r5) {
      let n7 = false !== e9.inheritAttrs ? e9.attrs : void 0, o5 = false, i6 = e9;
      for (; ; ) {
        const e10 = i6.vnode.scopeId;
        e10 && (o5 || (n7 = { ...n7 }, o5 = true), n7[e10] = "");
        const t6 = i6.parent;
        if (!t6 || !t6.subTree || t6.subTree !== i6.vnode) break;
        i6 = t6;
      }
      if (t5) {
        o5 || (n7 = { ...n7 });
        const e10 = t5.trim().split(" ");
        for (let t6 = 0; t6 < e10.length; t6++) n7[e10[t6]] = "";
      }
      const a5 = Tr2(e9);
      try {
        r5(e9.proxy, s6, e9, n7, e9.props, e9.setupState, e9.data, e9.ctx);
      } finally {
        Tr2(a5);
      }
    } else e9.render && e9.render !== NOOP ? renderVNode(s6, e9.subTree = xr2(e9), e9, t5) : (n6.name || n6.__file, s6("<!---->"));
  }
  return r4();
}
function renderVNode(e9, t5, n6, r4) {
  const { type: s6, shapeFlag: o5, children: i6, dirs: a5, props: l4 } = t5;
  switch (a5 && (t5.props = (function(e10, t6, n7) {
    const r5 = [];
    for (let t7 = 0; t7 < n7.length; t7++) {
      const s7 = n7[t7], { dir: { getSSRProps: o6 } } = s7;
      if (o6) {
        const t8 = o6(s7, e10);
        t8 && r5.push(t8);
      }
    }
    return mergeProps(t6 || {}, ...r5);
  })(t5, l4, a5)), s6) {
    case un2:
      e9(escapeHtml(i6));
      break;
    case pn2:
      e9(i6 ? `<!--${escapeHtmlComment(i6)}-->` : "<!---->");
      break;
    case dn2:
      e9(i6);
      break;
    case cn2:
      t5.slotScopeIds && (r4 = (r4 ? r4 + " " : "") + t5.slotScopeIds.join(" ")), e9("<!--[-->"), renderVNodeChildren(e9, i6, n6, r4), e9("<!--]-->");
      break;
    default:
      1 & o5 ? (function(e10, t6, n7, r5) {
        const s7 = t6.type;
        let { props: o6, children: i7, shapeFlag: a6, scopeId: l5 } = t6, c4 = `<${s7}`;
        o6 && (c4 += ssrRenderAttrs(o6, s7));
        const u6 = [], appendScopeId = /* @__PURE__ */ __name((e11) => {
          !e11 || o6 && hasOwn(o6, e11) || u6.includes(e11) || (c4 += ` ${e11}`, u6.push(e11));
        }, "appendScopeId");
        l5 && appendScopeId(l5);
        let p6 = n7, d5 = t6;
        for (; p6 && d5 === p6.subTree; ) d5 = p6.vnode, d5.scopeId && appendScopeId(d5.scopeId), p6 = p6.parent;
        if (r5) {
          const e11 = r5.trim().split(" ");
          for (let t7 = 0; t7 < e11.length; t7++) appendScopeId(e11[t7]);
        }
        if (e10(c4 + ">"), !C(s7)) {
          let t7 = false;
          o6 && (o6.innerHTML ? (t7 = true, e10(o6.innerHTML)) : o6.textContent ? (t7 = true, e10(escapeHtml(o6.textContent))) : "textarea" === s7 && o6.value && (t7 = true, e10(escapeHtml(o6.value)))), t7 || (8 & a6 ? e10(escapeHtml(i7)) : 16 & a6 && renderVNodeChildren(e10, i7, n7, r5)), e10(`</${s7}>`);
        }
      })(e9, t5, n6, r4) : 6 & o5 ? e9(renderComponentVNode(t5, n6, r4)) : 64 & o5 ? (function(e10, t6, n7, r5) {
        const s7 = t6.props && t6.props.to, o6 = t6.props && t6.props.disabled;
        if (!s7) return [];
        if (!isString(s7)) return [];
        !(function(e11, t7, n8, r6, s8) {
          e11("<!--teleport start-->");
          const o7 = s8.appContext.provides[Ct2], i7 = o7.__teleportBuffers || (o7.__teleportBuffers = {}), a6 = i7[n8] || (i7[n8] = []), l5 = a6.length;
          let c4;
          if (r6) t7(e11), c4 = "<!--teleport start anchor--><!--teleport anchor-->";
          else {
            const { getBuffer: e12, push: n9 } = createBuffer();
            n9("<!--teleport start anchor-->"), t7(n9), n9("<!--teleport anchor-->"), c4 = e12();
          }
          a6.splice(l5, 0, c4), (isPromise(c4) || i(c4) && c4.hasAsync) && (a6.hasAsync = true), e11("<!--teleport end-->");
        })(e10, (e11) => {
          renderVNodeChildren(e11, t6.children, n7, r5);
        }, s7, o6 || "" === o6, n7);
      })(e9, t5, n6, r4) : 128 & o5 && renderVNode(e9, t5.ssContent, n6, r4);
  }
}
function renderVNodeChildren(e9, t5, n6, r4) {
  for (let s6 = 0; s6 < t5.length; s6++) renderVNode(e9, Er2(t5[s6]), n6, r4);
}
function nestedUnrollBuffer(e9, t5, n6) {
  if (!e9.hasAsync) return t5 + unrollBufferSync$1(e9);
  let r4 = t5;
  for (let t6 = n6; t6 < e9.length; t6 += 1) {
    const n7 = e9[t6];
    if (isString(n7)) {
      r4 += n7;
      continue;
    }
    if (isPromise(n7)) return n7.then((n8) => (e9[t6] = n8, nestedUnrollBuffer(e9, r4, t6)));
    const s6 = nestedUnrollBuffer(n7, r4, 0);
    if (isPromise(s6)) return s6.then((n8) => (e9[t6] = n8, nestedUnrollBuffer(e9, "", t6)));
    r4 = s6;
  }
  return r4;
}
function unrollBuffer$1(e9) {
  return nestedUnrollBuffer(e9, "", 0);
}
function unrollBufferSync$1(e9) {
  let t5 = "";
  for (let n6 = 0; n6 < e9.length; n6++) {
    let r4 = e9[n6];
    isString(r4) ? t5 += r4 : t5 += unrollBufferSync$1(r4);
  }
  return t5;
}
async function renderToString(e9, t5 = {}) {
  if (Or2(e9)) return renderToString(createApp({ render: /* @__PURE__ */ __name(() => e9, "render") }), t5);
  const n6 = createVNode(e9._component, e9._props);
  n6.appContext = e9._context, e9.provide(Ct2, t5);
  const r4 = await renderComponentVNode(n6), s6 = await unrollBuffer$1(r4);
  if (await (async function(e10) {
    if (e10.__teleportBuffers) {
      e10.teleports = e10.teleports || {};
      for (const t6 in e10.__teleportBuffers) e10.teleports[t6] = await unrollBuffer$1(e10.__teleportBuffers[t6]);
    }
  })(t5), t5.__watcherHandles) for (const e10 of t5.__watcherHandles) e10();
  return s6;
}
function baseURL() {
  return useRuntimeConfig2().app.baseURL;
}
function buildAssetsURL(...e9) {
  return joinRelativeURL(publicAssetsURL(), useRuntimeConfig2().app.buildAssetsDir, ...e9);
}
function publicAssetsURL(...e9) {
  const r4 = useRuntimeConfig2().app, s6 = r4.cdnURL || r4.baseURL;
  return e9.length ? joinRelativeURL(s6, ...e9) : s6;
}
function lazyCachedFunction(e9) {
  let t5 = null;
  return () => (null === t5 && (t5 = e9().catch((e10) => {
    throw t5 = null, e10;
  })), t5);
}
function is_primitive(e9) {
  return null === e9 || "object" != typeof e9 && "function" != typeof e9;
}
function is_plain_object(e9) {
  const t5 = Object.getPrototypeOf(e9);
  return t5 === Object.prototype || null === t5 || null === Object.getPrototypeOf(t5) || Object.getOwnPropertyNames(t5).sort().join("\0") === Ur;
}
function get_type(e9) {
  return Object.prototype.toString.call(e9).slice(8, -1);
}
function get_escaped_char(e9) {
  switch (e9) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return e9 < " " ? `\\u${e9.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(e9) {
  let t5 = "", n6 = 0;
  const r4 = e9.length;
  for (let s6 = 0; s6 < r4; s6 += 1) {
    const r5 = get_escaped_char(e9[s6]);
    r5 && (t5 += e9.slice(n6, s6) + r5, n6 = s6 + 1);
  }
  return `"${0 === n6 ? e9 : t5 + e9.slice(n6)}"`;
}
function enumerable_symbols(e9) {
  return Object.getOwnPropertySymbols(e9).filter((t5) => Object.getOwnPropertyDescriptor(e9, t5).enumerable);
}
function stringify_key(e9) {
  return Wr.test(e9) ? "." + e9 : "[" + JSON.stringify(e9) + "]";
}
function is_valid_array_index_string(e9) {
  if (0 === e9.length) return false;
  if (e9.length > 1 && 48 === e9.charCodeAt(0)) return false;
  for (let t6 = 0; t6 < e9.length; t6++) {
    const n6 = e9.charCodeAt(t6);
    if (n6 < 48 || n6 > 57) return false;
  }
  return t5 = +e9, !(!Number.isInteger(t5) || t5 < 0 || t5 > 4294967294);
  var t5;
}
function valid_array_indices(e9) {
  const t5 = Object.keys(e9);
  for (var n6 = t5.length - 1; n6 >= 0 && !is_valid_array_index_string(t5[n6]); n6--) ;
  return t5.length = n6 + 1, t5;
}
function uneval(e9, t5) {
  const n6 = /* @__PURE__ */ new Map(), r4 = [], s6 = /* @__PURE__ */ new Map();
  !(/* @__PURE__ */ __name(function walk2(t6) {
    if (is_primitive(t6)) {
      if ("symbol" == typeof t6) throw new DevalueError("Cannot stringify a Symbol primitive", r4, t6, e9);
    } else {
      if (n6.has(t6)) return void n6.set(t6, n6.get(t6) + 1);
      if (n6.set(t6, 1), "function" == typeof t6) throw new DevalueError("Cannot stringify a function", r4, t6, e9);
      switch (get_type(t6)) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
        case "URL":
        case "URLSearchParams":
        case "ArrayBuffer":
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          return;
        case "Array":
          t6.forEach((e10, t7) => {
            r4.push(`[${t7}]`), walk2(e10), r4.pop();
          });
          break;
        case "Set":
          Array.from(t6).forEach(walk2);
          break;
        case "Map":
          for (const [e10, n7] of t6) r4.push(`.get(${is_primitive(e10) ? stringify_primitive$1(e10) : "..."})`), walk2(n7), r4.pop();
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
        case "DataView":
          return void walk2(t6.buffer);
        default:
          if (!is_plain_object(t6)) throw new DevalueError("Cannot stringify arbitrary non-POJOs", r4, t6, e9);
          if (enumerable_symbols(t6).length > 0) throw new DevalueError("Cannot stringify POJOs with symbolic keys", r4, t6, e9);
          for (const n7 of Object.keys(t6)) {
            if ("__proto__" === n7) throw new DevalueError("Cannot stringify objects with __proto__ keys", r4, t6, e9);
            r4.push(stringify_key(n7)), walk2(t6[n7]), r4.pop();
          }
      }
    }
  }, "walk"))(e9);
  const o5 = /* @__PURE__ */ new Map();
  function stringify3(e10) {
    if (o5.has(e10)) return o5.get(e10);
    if (is_primitive(e10)) return stringify_primitive$1(e10);
    if (s6.has(e10)) return s6.get(e10);
    const t6 = get_type(e10);
    switch (t6) {
      case "Number":
      case "String":
      case "Boolean":
      case "BigInt":
        return `Object(${stringify3(e10.valueOf())})`;
      case "RegExp":
        const { source: n7, flags: r5 } = e10;
        return r5 ? `new RegExp(${stringify_string(n7)},"${r5}")` : `new RegExp(${stringify_string(n7)})`;
      case "Date":
        return `new Date(${e10.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(e10.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(e10.toString())})`;
      case "Array": {
        let t7 = false, n8 = "[";
        for (let r6 = 0; r6 < e10.length; r6 += 1) if (r6 > 0 && (n8 += ","), Object.hasOwn(e10, r6)) n8 += stringify3(e10[r6]);
        else if (!t7) {
          const n9 = valid_array_indices(e10), s8 = n9.length, o6 = String(e10.length).length;
          if (e10.length + 2 > 25 + o6 + s8 * (o6 + 2)) {
            const t8 = n9.map((t9) => `${t9}:${stringify3(e10[t9])}`).join(",");
            return `Object.assign(Array(${e10.length}),{${t8}})`;
          }
          t7 = true, r6 -= 1;
        }
        return n8 + (0 === e10.length || e10.length - 1 in e10 ? "" : ",") + "]";
      }
      case "Set":
      case "Map":
        return `new ${t6}([${Array.from(e10).map(stringify3).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Float16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        let n8 = `new ${t6}`;
        if (o5.has(e10.buffer)) n8 += `(${stringify3(e10.buffer)})`;
        else {
          n8 += `([${new e10.constructor(e10.buffer)}])`;
        }
        if (e10.byteLength !== e10.buffer.byteLength) {
          const t7 = e10.byteOffset / e10.BYTES_PER_ELEMENT;
          n8 += `.subarray(${t7},${t7 + e10.length})`;
        }
        return n8;
      }
      case "DataView": {
        let t7 = "new DataView";
        return o5.has(e10.buffer) ? t7 += `(${stringify3(e10.buffer)}` : t7 += `(new Uint8Array([${new Uint8Array(e10.buffer)}]).buffer`, e10.byteLength !== e10.buffer.byteLength && (t7 += `,${e10.startOffset},${e10.byteLength}`), t7 + ")";
      }
      case "ArrayBuffer":
        return `new Uint8Array([${new Uint8Array(e10).toString()}]).buffer`;
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${t6}.from(${stringify_string(e10.toString())})`;
      default:
        const s7 = Object.keys(e10), i7 = s7.map((t7) => `${(function(e11) {
          return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e11) ? e11 : escape_unsafe_chars(JSON.stringify(e11));
        })(t7)}:${stringify3(e10[t7])}`).join(",");
        return null === Object.getPrototypeOf(e10) ? s7.length > 0 ? `{${i7},__proto__:null}` : "{__proto__:null}" : `{${i7}}`;
    }
  }
  __name(stringify3, "stringify");
  Array.from(n6).filter((e10) => e10[1] > 1).sort((e10, t6) => t6[1] - e10[1]).forEach((e10, t6) => {
    o5.set(e10[0], (function(e11) {
      let t7 = "";
      do {
        t7 = zr[e11 % 54] + t7, e11 = ~~(e11 / 54) - 1;
      } while (e11 >= 0);
      return Kr.test(t7) ? `${t7}0` : t7;
    })(t6));
  });
  const i6 = stringify3(e9);
  if (o5.size) {
    const e10 = [], t6 = [], n7 = [];
    return o5.forEach((r5, i7) => {
      if (e10.push(r5), s6.has(i7)) return void n7.push(s6.get(i7));
      if (is_primitive(i7)) return void n7.push(stringify_primitive$1(i7));
      const a5 = get_type(i7);
      switch (a5) {
        case "Number":
        case "String":
        case "Boolean":
        case "BigInt":
          n7.push(`Object(${stringify3(i7.valueOf())})`);
          break;
        case "RegExp":
          const { source: e11, flags: s7 } = i7, l4 = s7 ? `new RegExp(${stringify_string(e11)},"${s7}")` : `new RegExp(${stringify_string(e11)})`;
          n7.push(l4);
          break;
        case "Date":
          n7.push(`new Date(${i7.getTime()})`);
          break;
        case "URL":
          n7.push(`new URL(${stringify_string(i7.toString())})`);
          break;
        case "URLSearchParams":
          n7.push(`new URLSearchParams(${stringify_string(i7.toString())})`);
          break;
        case "Array":
          n7.push(`Array(${i7.length})`), i7.forEach((e12, n8) => {
            t6.push(`${r5}[${n8}]=${stringify3(e12)}`);
          });
          break;
        case "Set":
          n7.push("new Set"), t6.push(`${r5}.${Array.from(i7).map((e12) => `add(${stringify3(e12)})`).join(".")}`);
          break;
        case "Map":
          n7.push("new Map"), t6.push(`${r5}.${Array.from(i7).map(([e12, t7]) => `set(${stringify3(e12)}, ${stringify3(t7)})`).join(".")}`);
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          let e12 = `new ${a5}`;
          if (o5.has(i7.buffer)) e12 += `(${stringify3(i7.buffer)})`;
          else {
            e12 += `([${new i7.constructor(i7.buffer)}])`;
          }
          if (i7.byteLength !== i7.buffer.byteLength) {
            const t7 = i7.byteOffset / i7.BYTES_PER_ELEMENT;
            e12 += `.subarray(${t7},${t7 + i7.length})`;
          }
          n7.push("{}"), t6.push(`${r5}=${e12}`);
          break;
        }
        case "DataView": {
          let e12 = "new DataView";
          o5.has(i7.buffer) ? e12 += `(${stringify3(i7.buffer)}` : e12 += `(new Uint8Array([${new Uint8Array(i7.buffer)}]).buffer`, i7.byteLength !== i7.buffer.byteLength && (e12 += `,${i7.byteOffset},${i7.byteLength}`), e12 += ")", n7.push("{}"), t6.push(`${r5}=${e12}`);
          break;
        }
        case "ArrayBuffer":
          n7.push(`new Uint8Array([${new Uint8Array(i7)}]).buffer`);
          break;
        default:
          n7.push(null === Object.getPrototypeOf(i7) ? "Object.create(null)" : "{}"), Object.keys(i7).forEach((e12) => {
            t6.push(`${r5}${(function(e13) {
              return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e13) ? `.${e13}` : `[${escape_unsafe_chars(JSON.stringify(e13))}]`;
            })(e12)}=${stringify3(i7[e12])}`);
          });
      }
    }), t6.push(`return ${i6}`), `(function(${e10.join(",")}){${t6.join(";")}}(${n7.join(",")}))`;
  }
  return i6;
}
function escape_unsafe_char(e9) {
  return Br3[e9] || e9;
}
function escape_unsafe_chars(e9) {
  return e9.replace(qr, escape_unsafe_char);
}
function stringify_primitive$1(e9) {
  const t5 = typeof e9;
  if ("string" === t5) return stringify_string(e9);
  if (void 0 === e9) return "void 0";
  if (0 === e9 && 1 / e9 < 0) return "-0";
  const n6 = String(e9);
  return "number" === t5 ? n6.replace(/^(-)?0\./, "$1.") : "bigint" === t5 ? e9 + "n" : n6;
}
function stringify(e9, t5) {
  const n6 = (function(e10, t6, n7) {
    const r4 = [], s6 = /* @__PURE__ */ new Map(), o5 = [];
    if (n7) for (const e11 of Object.getOwnPropertyNames(n7)) o5.push({ key: e11, fn: n7[e11] });
    const i6 = [];
    let a5 = 0;
    function flatten(e11, n8) {
      if (void 0 === e11) return -1;
      if (Number.isNaN(e11)) return -3;
      if (e11 === 1 / 0) return -4;
      if (e11 === -1 / 0) return -5;
      if (0 === e11 && 1 / e11 < 0) return -6;
      if (s6.has(e11)) return s6.get(e11);
      n8 ??= a5++, s6.set(e11, n8);
      for (const { key: t7, fn: s7 } of o5) {
        const o6 = s7(e11);
        if (o6) return r4[n8] = `["${t7}",${flatten(o6)}]`, n8;
      }
      if ("function" == typeof e11) throw new DevalueError("Cannot stringify a function", i6, e11, t6);
      if ("symbol" == typeof e11) throw new DevalueError("Cannot stringify a Symbol primitive", i6, e11, t6);
      let l5 = "";
      if (is_primitive(e11)) l5 = stringify_primitive(e11);
      else {
        if ("function" == typeof e11.then) throw new DevalueError("Cannot stringify a Promise or thenable \u2014 use stringifyAsync instead", i6, e11, t6);
        {
          const n9 = get_type(e11);
          switch (n9) {
            case "Number":
            case "String":
            case "Boolean":
            case "BigInt":
              l5 = `["Object",${flatten(e11.valueOf())}]`;
              break;
            case "Date":
              l5 = `["Date","${!isNaN(e11.getDate()) ? e11.toISOString() : ""}"]`;
              break;
            case "URL":
              l5 = `["URL",${stringify_string(e11.toString())}]`;
              break;
            case "URLSearchParams":
              l5 = `["URLSearchParams",${stringify_string(e11.toString())}]`;
              break;
            case "RegExp":
              const { source: r5, flags: s7 } = e11;
              l5 = s7 ? `["RegExp",${stringify_string(r5)},"${s7}"]` : `["RegExp",${stringify_string(r5)}]`;
              break;
            case "Array": {
              let t7 = false;
              l5 = "[";
              for (let n10 = 0; n10 < e11.length; n10 += 1) if (n10 > 0 && (l5 += ","), Object.hasOwn(e11, n10)) i6.push(`[${n10}]`), l5 += flatten(e11[n10]), i6.pop();
              else if (t7) l5 += -2;
              else {
                const n11 = valid_array_indices(e11), r6 = n11.length, s8 = String(e11.length).length;
                if (3 * (e11.length - r6) > 4 + s8 + r6 * (s8 + 1)) {
                  l5 = "[-7," + e11.length;
                  for (let t8 = 0; t8 < n11.length; t8++) {
                    const r7 = n11[t8];
                    i6.push(`[${r7}]`), l5 += "," + r7 + "," + flatten(e11[r7]), i6.pop();
                  }
                  break;
                }
                t7 = true, l5 += -2;
              }
              l5 += "]";
              break;
            }
            case "Set":
              l5 = '["Set"';
              for (const t7 of e11) l5 += `,${flatten(t7)}`;
              l5 += "]";
              break;
            case "Map":
              l5 = '["Map"';
              for (const [t7, n10] of e11) i6.push(`.get(${is_primitive(t7) ? stringify_primitive(t7) : "..."})`), l5 += `,${flatten(t7)},${flatten(n10)}`, i6.pop();
              l5 += "]";
              break;
            case "Int8Array":
            case "Uint8Array":
            case "Uint8ClampedArray":
            case "Int16Array":
            case "Uint16Array":
            case "Float16Array":
            case "Int32Array":
            case "Uint32Array":
            case "Float32Array":
            case "Float64Array":
            case "BigInt64Array":
            case "BigUint64Array":
            case "DataView": {
              const t7 = e11;
              l5 = '["' + n9 + '",' + flatten(t7.buffer), t7.byteLength !== t7.buffer.byteLength && (l5 += `,${t7.byteOffset},${t7.length}`), l5 += "]";
              break;
            }
            case "ArrayBuffer":
              l5 = `["ArrayBuffer","${Zr(e11)}"]`;
              break;
            case "Temporal.Duration":
            case "Temporal.Instant":
            case "Temporal.PlainDate":
            case "Temporal.PlainTime":
            case "Temporal.PlainDateTime":
            case "Temporal.PlainMonthDay":
            case "Temporal.PlainYearMonth":
            case "Temporal.ZonedDateTime":
              l5 = `["${n9}",${stringify_string(e11.toString())}]`;
              break;
            default:
              if (!is_plain_object(e11)) throw new DevalueError("Cannot stringify arbitrary non-POJOs", i6, e11, t6);
              if (enumerable_symbols(e11).length > 0) throw new DevalueError("Cannot stringify POJOs with symbolic keys", i6, e11, t6);
              if (null === Object.getPrototypeOf(e11)) {
                l5 = '["null"';
                for (const n10 of Object.keys(e11)) {
                  if ("__proto__" === n10) throw new DevalueError("Cannot stringify objects with __proto__ keys", i6, e11, t6);
                  i6.push(stringify_key(n10)), l5 += `,${stringify_string(n10)},${flatten(e11[n10])}`, i6.pop();
                }
                l5 += "]";
              } else {
                l5 = "{";
                let n10 = false;
                for (const r6 of Object.keys(e11)) {
                  if ("__proto__" === r6) throw new DevalueError("Cannot stringify objects with __proto__ keys", i6, e11, t6);
                  n10 && (l5 += ","), n10 = true, i6.push(stringify_key(r6)), l5 += `${stringify_string(r6)}:${flatten(e11[r6])}`, i6.pop();
                }
                l5 += "}";
              }
          }
        }
      }
      return r4[n8] = l5, n8;
    }
    __name(flatten, "flatten");
    const l4 = flatten(t6);
    return l4 < 0 ? `${l4}` : r4;
  })(0, e9, t5);
  return "string" == typeof n6 ? n6 : `[${n6.join(",")}]`;
}
function stringify_primitive(e9) {
  const t5 = typeof e9;
  return "string" === t5 ? stringify_string(e9) : void 0 === e9 ? (-1).toString() : 0 === e9 && 1 / e9 < 0 ? (-6).toString() : "bigint" === t5 ? `["BigInt","${e9}"]` : String(e9);
}
function renderPayloadJsonScript(e9) {
  const t5 = { type: "application/json", innerHTML: e9.data ? stringify(e9.data, e9.ssrContext["~payloadReducers"]).replaceAll("/", "\\u002F") : "", "data-nuxt-data": "nuxt-app", "data-ssr": !e9.ssrContext.noSSR, id: "__NUXT_DATA__" };
  e9.src && (t5["data-src"] = e9.src);
  return [t5, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${uneval(e9.ssrContext.config)}` }];
}
function createSSRContext(e9) {
  return { url: (function(e10) {
    const t5 = e10.indexOf("?");
    return -1 === t5 ? encodePath(e10) : encodePath(e10.slice(0, t5)) + e10.slice(t5);
  })(e9.path), event: e9, runtimeConfig: useRuntimeConfig2(e9), noSSR: e9.context.nuxt?.noSSR || false, head: createHead(Yr), error: false, nuxt: void 0, payload: {}, "~payloadReducers": /* @__PURE__ */ Object.create(null), modules: /* @__PURE__ */ new Set() };
}
function normalizeChunks(e9) {
  const t5 = [];
  for (const n6 of e9) {
    const e10 = n6?.trim();
    e10 && t5.push(e10);
  }
  return t5;
}
function joinTags(e9) {
  return e9.join("");
}
function joinAttrs(e9) {
  return 0 === e9.length ? "" : " " + e9.join(" ");
}
function renderHTMLDocument(e9) {
  return `<!DOCTYPE html><html${joinAttrs(e9.htmlAttrs)}><head>${joinTags(e9.head)}</head><body${joinAttrs(e9.bodyAttrs)}>${joinTags(e9.bodyPrepend)}${joinTags(e9.body)}${joinTags(e9.bodyAppend)}</body></html>`;
}
var fe2, he2, ge2, me2, ye2, ve2, _e2, be2, ke2, Ce2, Se2, we2, Re2, sortTags, Te2, Ae2, xe2, Ee2, isTruthy, $e2, Pe2, EffectScope, Oe2, ReactiveEffect, Ne2, He2, Me2, Ve2, Le2, De2, Link, Dep, Ie2, je2, Fe2, Be2, Ue2, We2, ze2, qe2, BaseReactiveHandler, MutableReactiveHandler, ReadonlyReactiveHandler, Ke2, Je2, Ge2, Ze2, toShallow, getProto, Ye2, Xe2, Qe2, et2, tt2, nt2, rt2, st2, toReactive, toReadonly, RefImpl, ot2, CustomRefImpl, ObjectRefImpl, GetterRefImpl, ComputedRefImpl, it2, at2, lt2, ct2, ut2, pt2, dt2, ft2, ht2, gt2, mt2, yt2, getId, vt2, _t2, bt2, kt2, Ct2, useSSRContext, St2, wt2, isTeleport, isTeleportDisabled, isTargetSVG, isTargetMathML, resolveTarget, Rt2, Tt2, At2, xt2, Et2, recursiveGetSubtree, $t2, Pt2, Ot2, logMismatchError, getContainerType, isComment, Nt2, Ht2, Mt2, Vt2, isAsyncWrapper, isKeepAlive, Lt2, createHook, Dt2, It2, jt2, Ft2, Bt2, Ut2, Wt2, zt2, qt2, Kt2, Jt2, getPublicInstance, Gt2, hasSetupBinding, Zt2, Yt2, Xt2, Qt2, en2, tn3, getModelModifiers, nn2, getFunctionalFallthrough, filterModelListeners, rn2, createInternalObject, isInternalObject, sn2, isInternalKey, normalizeSlotValue, normalizeSlot2, normalizeObjectSlots, normalizeVNodeSlots, assignSlots, on2, isSuspense, an2, ln2, cn2, un2, pn2, dn2, fn, hn2, gn2, normalizeKey, normalizeRef, createVNode, mn2, yn2, vn2, getCurrentInstance, _n2, bn2, setCurrentInstance, unsetCurrentInstance, kn2, Cn2, Sn2, wn2, computed, Rn2, Tn2, An2, xn2, setDevtoolsHook, En2, $n2, Pn2, On2, Nn2, Hn2, Mn2, Vn2, Ln2, Dn2, callHook, hasExplicitCallback, In2, jn2, Fn2, Bn2, Un2, Wn2, zn2, qn2, Kn2, Jn2, Gn2, Zn2, Yn2, Xn2, Qn2, getNow, isNativeOn, patchProp, er2, tr2, VueElement, nr2, rr2, sr2, or2, ir2, getModelAssigner, ar2, lr2, cr2, ur2, pr2, dr2, fr2, hr2, gr2, mr2, yr2, vr2, render, createApp, createSSRApp, _r2, initDirectivesForSSR, br, VueResolver, kr, Cr2, Sr2, wr2, Rr2, Tr2, Ar2, xr2, Er2, $r2, Pr2, Or2, Nr2, Hr, Mr2, Vr2, Lr2, Dr2, getPrecomputedDependencies, Ir2, jr2, Fr3, Br3, DevalueError, Ur, Wr, zr, qr, Kr, Jr, Gr, Zr, Yr, Xr, Qr, es, ts, ns, rs, ss;
var init_renderer = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/routes/renderer.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_shared_esm_bundler();
    __name(getModuleDependencies, "getModuleDependencies");
    __name(getRequestDependencies, "getRequestDependencies");
    __name(renderStyles, "renderStyles");
    __name(renderResourceHints, "renderResourceHints");
    __name(renderResourceHeaders, "renderResourceHeaders");
    __name(getPreloadLinks, "getPreloadLinks");
    __name(getPrefetchLinks, "getPrefetchLinks");
    __name(renderScripts, "renderScripts");
    __name(createRenderer$1, "createRenderer$1");
    __name(flatHooks, "flatHooks");
    fe2 = (() => {
      if (console.createTask) return console.createTask;
      const e9 = { run: /* @__PURE__ */ __name((e10) => e10(), "run") };
      return () => e9;
    })();
    __name(callHooks, "callHooks");
    __name(serialTaskCaller, "serialTaskCaller");
    __name(parallelTaskCaller, "parallelTaskCaller");
    __name(callEachWith, "callEachWith");
    he2 = class {
      static {
        __name(this, "he");
      }
      _hooks;
      _before;
      _after;
      _deprecatedHooks;
      _deprecatedMessages;
      constructor() {
        this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
      }
      hook(e9, t5, n6 = {}) {
        if (!e9 || "function" != typeof t5) return () => {
        };
        const r4 = e9;
        let s6;
        for (; this._deprecatedHooks[e9]; ) s6 = this._deprecatedHooks[e9], e9 = s6.to;
        if (s6 && !n6.allowDeprecated) {
          let e10 = s6.message;
          e10 || (e10 = `${r4} hook has been deprecated` + (s6.to ? `, please use ${s6.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(e10) || (console.warn(e10), this._deprecatedMessages.add(e10));
        }
        if (!t5.name) try {
          Object.defineProperty(t5, "name", { get: /* @__PURE__ */ __name(() => "_" + e9.replace(/\W+/g, "_") + "_hook_cb", "get"), configurable: true });
        } catch {
        }
        return this._hooks[e9] = this._hooks[e9] || [], this._hooks[e9].push(t5), () => {
          t5 && (this.removeHook(e9, t5), t5 = void 0);
        };
      }
      hookOnce(e9, t5) {
        let n6, _function = /* @__PURE__ */ __name((...e10) => ("function" == typeof n6 && n6(), n6 = void 0, _function = void 0, t5(...e10)), "_function");
        return n6 = this.hook(e9, _function), n6;
      }
      removeHook(e9, t5) {
        const n6 = this._hooks[e9];
        if (n6) {
          const r4 = n6.indexOf(t5);
          -1 !== r4 && n6.splice(r4, 1), 0 === n6.length && (this._hooks[e9] = void 0);
        }
      }
      clearHook(e9) {
        this._hooks[e9] = void 0;
      }
      deprecateHook(e9, t5) {
        this._deprecatedHooks[e9] = "string" == typeof t5 ? { to: t5 } : t5;
        const n6 = this._hooks[e9] || [];
        this._hooks[e9] = void 0;
        for (const t6 of n6) this.hook(e9, t6);
      }
      deprecateHooks(e9) {
        for (const t5 in e9) this.deprecateHook(t5, e9[t5]);
      }
      addHooks(e9) {
        const t5 = flatHooks(e9), n6 = Object.keys(t5).map((e10) => this.hook(e10, t5[e10]));
        return () => {
          for (const e10 of n6) e10();
          n6.length = 0;
        };
      }
      removeHooks(e9) {
        const t5 = flatHooks(e9);
        for (const e10 in t5) this.removeHook(e10, t5[e10]);
      }
      removeAllHooks() {
        this._hooks = {};
      }
      callHook(e9, ...t5) {
        return this.callHookWith(serialTaskCaller, e9, t5);
      }
      callHookParallel(e9, ...t5) {
        return this.callHookWith(parallelTaskCaller, e9, t5);
      }
      callHookWith(e9, t5, n6) {
        const r4 = this._before || this._after ? { name: t5, args: n6, context: {} } : void 0;
        this._before && callEachWith(this._before, r4);
        const s6 = e9(this._hooks[t5] ? [...this._hooks[t5]] : [], n6, t5);
        return s6 instanceof Promise ? s6.finally(() => {
          this._after && r4 && callEachWith(this._after, r4);
        }) : (this._after && r4 && callEachWith(this._after, r4), s6);
      }
      beforeEach(e9) {
        return this._before = this._before || [], this._before.push(e9), () => {
          if (void 0 !== this._before) {
            const t5 = this._before.indexOf(e9);
            -1 !== t5 && this._before.splice(t5, 1);
          }
        };
      }
      afterEach(e9) {
        return this._after = this._after || [], this._after.push(e9), () => {
          if (void 0 !== this._after) {
            const t5 = this._after.indexOf(e9);
            -1 !== t5 && this._after.splice(t5, 1);
          }
        };
      }
    };
    __name(createHooks, "createHooks");
    ge2 = /* @__PURE__ */ new Set(["meta", "link", "base"]);
    me2 = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
    ye2 = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
    ve2 = /* @__PURE__ */ new Set(["base", "meta", "link", "style", "script", "noscript"]);
    _e2 = /* @__PURE__ */ new Set(["title", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"]);
    be2 = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
    ke2 = /* @__PURE__ */ new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]);
    Ce2 = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
    Se2 = /* @__PURE__ */ new Set(["theme-color", "google-site-verification", "og", "article", "book", "profile", "twitter", "author"]);
    we2 = ["name", "property", "http-equiv"];
    Re2 = /* @__PURE__ */ new Set(["viewport", "description", "keywords", "robots"]);
    __name(dedupeKey, "dedupeKey");
    __name(hashTag, "hashTag");
    __name(walkResolver, "walkResolver");
    __name(normalizeProps2, "normalizeProps");
    __name(normalizeTag, "normalizeTag");
    __name(normalizeEntryToTags, "normalizeEntryToTags");
    sortTags = /* @__PURE__ */ __name((e9, t5) => e9._w === t5._w ? e9._p - t5._p : e9._w - t5._w, "sortTags");
    Te2 = { base: -10, title: 10 };
    Ae2 = { critical: -8, high: -1, low: 2 };
    xe2 = { meta: { "content-security-policy": -30, charset: -20, viewport: -15 }, link: { preconnect: 20, stylesheet: 60, preload: 70, modulepreload: 70, prefetch: 90, "dns-prefetch": 90, prerender: 90 }, script: { async: 30, defer: 80, sync: 50 }, style: { imported: 40, sync: 60 } };
    Ee2 = /@import/;
    isTruthy = /* @__PURE__ */ __name((e9) => "" === e9 || true === e9, "isTruthy");
    __name(tagWeight, "tagWeight");
    __name(registerPlugin, "registerPlugin");
    __name(createUnhead, "createUnhead");
    __name(encodeAttribute, "encodeAttribute");
    __name(propsToString, "propsToString");
    __name(tagToString, "tagToString");
    __name(renderSSRHead, "renderSSRHead");
    EffectScope = class {
      static {
        __name(this, "EffectScope");
      }
      constructor(e9 = false) {
        this.detached = e9, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this._warnOnRun = true, this.__v_skip = true, !e9 && $e2 && ($e2.active ? (this.parent = $e2, this.index = ($e2.scopes || ($e2.scopes = [])).push(this) - 1) : (this._active = false, this._warnOnRun = false));
      }
      get active() {
        return this._active;
      }
      pause() {
        if (this._active) {
          let e9, t5;
          if (this._isPaused = true, this.scopes) for (e9 = 0, t5 = this.scopes.length; e9 < t5; e9++) this.scopes[e9].pause();
          for (e9 = 0, t5 = this.effects.length; e9 < t5; e9++) this.effects[e9].pause();
        }
      }
      resume() {
        if (this._active && this._isPaused) {
          let e9, t5;
          if (this._isPaused = false, this.scopes) for (e9 = 0, t5 = this.scopes.length; e9 < t5; e9++) this.scopes[e9].resume();
          for (e9 = 0, t5 = this.effects.length; e9 < t5; e9++) this.effects[e9].resume();
        }
      }
      run(e9) {
        if (this._active) {
          const t5 = $e2;
          try {
            return $e2 = this, e9();
          } finally {
            $e2 = t5;
          }
        }
      }
      on() {
        1 === ++this._on && (this.prevScope = $e2, $e2 = this);
      }
      off() {
        if (this._on > 0 && 0 === --this._on) {
          if ($e2 === this) $e2 = this.prevScope;
          else {
            let e9 = $e2;
            for (; e9; ) {
              if (e9.prevScope === this) {
                e9.prevScope = this.prevScope;
                break;
              }
              e9 = e9.prevScope;
            }
          }
          this.prevScope = void 0;
        }
      }
      stop(e9) {
        if (this._active) {
          let t5, n6;
          for (this._active = false, t5 = 0, n6 = this.effects.length; t5 < n6; t5++) this.effects[t5].stop();
          for (this.effects.length = 0, t5 = 0, n6 = this.cleanups.length; t5 < n6; t5++) this.cleanups[t5]();
          if (this.cleanups.length = 0, this.scopes) {
            for (t5 = 0, n6 = this.scopes.length; t5 < n6; t5++) this.scopes[t5].stop(true);
            this.scopes.length = 0;
          }
          if (!this.detached && this.parent && !e9) {
            const e10 = this.parent.scopes.pop();
            e10 && e10 !== this && (this.parent.scopes[this.index] = e10, e10.index = this.index);
          }
          this.parent = void 0;
        }
      }
    };
    __name(effectScope, "effectScope");
    __name(getCurrentScope, "getCurrentScope");
    __name(onScopeDispose, "onScopeDispose");
    Oe2 = /* @__PURE__ */ new WeakSet();
    ReactiveEffect = class {
      static {
        __name(this, "ReactiveEffect");
      }
      constructor(e9) {
        this.fn = e9, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, $e2 && ($e2.active ? $e2.effects.push(this) : this.flags &= -2);
      }
      pause() {
        this.flags |= 64;
      }
      resume() {
        64 & this.flags && (this.flags &= -65, Oe2.has(this) && (Oe2.delete(this), this.trigger()));
      }
      notify() {
        2 & this.flags && !(32 & this.flags) || 8 & this.flags || batch(this);
      }
      run() {
        if (!(1 & this.flags)) return this.fn();
        this.flags |= 2, cleanupEffect(this), prepareDeps(this);
        const e9 = Pe2, t5 = Ve2;
        Pe2 = this, Ve2 = true;
        try {
          return this.fn();
        } finally {
          cleanupDeps(this), Pe2 = e9, Ve2 = t5, this.flags &= -3;
        }
      }
      stop() {
        if (1 & this.flags) {
          for (let e9 = this.deps; e9; e9 = e9.nextDep) removeSub(e9);
          this.deps = this.depsTail = void 0, cleanupEffect(this), this.onStop && this.onStop(), this.flags &= -2;
        }
      }
      trigger() {
        64 & this.flags ? Oe2.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
      }
      runIfDirty() {
        isDirty(this) && this.run();
      }
      get dirty() {
        return isDirty(this);
      }
    };
    Me2 = 0;
    __name(batch, "batch");
    __name(startBatch, "startBatch");
    __name(endBatch, "endBatch");
    __name(prepareDeps, "prepareDeps");
    __name(cleanupDeps, "cleanupDeps");
    __name(isDirty, "isDirty");
    __name(refreshComputed, "refreshComputed");
    __name(removeSub, "removeSub");
    __name(removeDep, "removeDep");
    Ve2 = true;
    Le2 = [];
    __name(pauseTracking, "pauseTracking");
    __name(resetTracking, "resetTracking");
    __name(cleanupEffect, "cleanupEffect");
    De2 = 0;
    Link = class {
      static {
        __name(this, "Link");
      }
      constructor(e9, t5) {
        this.sub = e9, this.dep = t5, this.version = t5.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
      }
    };
    Dep = class {
      static {
        __name(this, "Dep");
      }
      constructor(e9) {
        this.computed = e9, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
      }
      track(e9) {
        if (!Pe2 || !Ve2 || Pe2 === this.computed) return;
        let t5 = this.activeLink;
        if (void 0 === t5 || t5.sub !== Pe2) t5 = this.activeLink = new Link(Pe2, this), Pe2.deps ? (t5.prevDep = Pe2.depsTail, Pe2.depsTail.nextDep = t5, Pe2.depsTail = t5) : Pe2.deps = Pe2.depsTail = t5, addSub(t5);
        else if (-1 === t5.version && (t5.version = this.version, t5.nextDep)) {
          const e10 = t5.nextDep;
          e10.prevDep = t5.prevDep, t5.prevDep && (t5.prevDep.nextDep = e10), t5.prevDep = Pe2.depsTail, t5.nextDep = void 0, Pe2.depsTail.nextDep = t5, Pe2.depsTail = t5, Pe2.deps === t5 && (Pe2.deps = e10);
        }
        return t5;
      }
      trigger(e9) {
        this.version++, De2++, this.notify(e9);
      }
      notify(e9) {
        startBatch();
        try {
          0;
          for (let e10 = this.subs; e10; e10 = e10.prevSub) e10.sub.notify() && e10.sub.dep.notify();
        } finally {
          endBatch();
        }
      }
    };
    __name(addSub, "addSub");
    Ie2 = /* @__PURE__ */ new WeakMap();
    je2 = /* @__PURE__ */ Symbol("");
    Fe2 = /* @__PURE__ */ Symbol("");
    Be2 = /* @__PURE__ */ Symbol("");
    __name(track, "track");
    __name(trigger, "trigger");
    __name(reactiveReadArray, "reactiveReadArray");
    __name(shallowReadArray, "shallowReadArray");
    __name(toWrapped, "toWrapped");
    Ue2 = { __proto__: null, [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, (e9) => toWrapped(this, e9));
    }, concat(...e9) {
      return reactiveReadArray(this).concat(...e9.map((e10) => i(e10) ? reactiveReadArray(e10) : e10));
    }, entries() {
      return iterator(this, "entries", (e9) => (e9[1] = toWrapped(this, e9[1]), e9));
    }, every(e9, t5) {
      return apply(this, "every", e9, t5, void 0, arguments);
    }, filter(e9, t5) {
      return apply(this, "filter", e9, t5, (e10) => e10.map((e11) => toWrapped(this, e11)), arguments);
    }, find(e9, t5) {
      return apply(this, "find", e9, t5, (e10) => toWrapped(this, e10), arguments);
    }, findIndex(e9, t5) {
      return apply(this, "findIndex", e9, t5, void 0, arguments);
    }, findLast(e9, t5) {
      return apply(this, "findLast", e9, t5, (e10) => toWrapped(this, e10), arguments);
    }, findLastIndex(e9, t5) {
      return apply(this, "findLastIndex", e9, t5, void 0, arguments);
    }, forEach(e9, t5) {
      return apply(this, "forEach", e9, t5, void 0, arguments);
    }, includes(...e9) {
      return searchProxy(this, "includes", e9);
    }, indexOf(...e9) {
      return searchProxy(this, "indexOf", e9);
    }, join(e9) {
      return reactiveReadArray(this).join(e9);
    }, lastIndexOf(...e9) {
      return searchProxy(this, "lastIndexOf", e9);
    }, map(e9, t5) {
      return apply(this, "map", e9, t5, void 0, arguments);
    }, pop() {
      return noTracking(this, "pop");
    }, push(...e9) {
      return noTracking(this, "push", e9);
    }, reduce(e9, ...t5) {
      return reduce(this, "reduce", e9, t5);
    }, reduceRight(e9, ...t5) {
      return reduce(this, "reduceRight", e9, t5);
    }, shift() {
      return noTracking(this, "shift");
    }, some(e9, t5) {
      return apply(this, "some", e9, t5, void 0, arguments);
    }, splice(...e9) {
      return noTracking(this, "splice", e9);
    }, toReversed() {
      return reactiveReadArray(this).toReversed();
    }, toSorted(e9) {
      return reactiveReadArray(this).toSorted(e9);
    }, toSpliced(...e9) {
      return reactiveReadArray(this).toSpliced(...e9);
    }, unshift(...e9) {
      return noTracking(this, "unshift", e9);
    }, values() {
      return iterator(this, "values", (e9) => toWrapped(this, e9));
    } };
    __name(iterator, "iterator");
    We2 = Array.prototype;
    __name(apply, "apply");
    __name(reduce, "reduce");
    __name(searchProxy, "searchProxy");
    __name(noTracking, "noTracking");
    ze2 = makeMap("__proto__,__v_isRef,__isVue");
    qe2 = new Set(Object.getOwnPropertyNames(Symbol).filter((e9) => "arguments" !== e9 && "caller" !== e9).map((e9) => Symbol[e9]).filter(isSymbol));
    __name(hasOwnProperty, "hasOwnProperty");
    BaseReactiveHandler = class {
      static {
        __name(this, "BaseReactiveHandler");
      }
      constructor(e9 = false, t5 = false) {
        this._isReadonly = e9, this._isShallow = t5;
      }
      get(e9, t5, n6) {
        if ("__v_skip" === t5) return e9.__v_skip;
        const r4 = this._isReadonly, s6 = this._isShallow;
        if ("__v_isReactive" === t5) return !r4;
        if ("__v_isReadonly" === t5) return r4;
        if ("__v_isShallow" === t5) return s6;
        if ("__v_raw" === t5) return n6 === (r4 ? s6 ? st2 : rt2 : s6 ? nt2 : tt2).get(e9) || Object.getPrototypeOf(e9) === Object.getPrototypeOf(n6) ? e9 : void 0;
        const o5 = i(e9);
        if (!r4) {
          let e10;
          if (o5 && (e10 = Ue2[t5])) return e10;
          if ("hasOwnProperty" === t5) return hasOwnProperty;
        }
        const i6 = Reflect.get(e9, t5, isRef2(e9) ? e9 : n6);
        if (isSymbol(t5) ? qe2.has(t5) : ze2(t5)) return i6;
        if (r4 || track(e9, 0, t5), s6) return i6;
        if (isRef2(i6)) {
          const e10 = o5 && isIntegerKey(t5) ? i6 : i6.value;
          return r4 && isObject(e10) ? readonly(e10) : e10;
        }
        return isObject(i6) ? r4 ? readonly(i6) : reactive(i6) : i6;
      }
    };
    MutableReactiveHandler = class extends BaseReactiveHandler {
      static {
        __name(this, "MutableReactiveHandler");
      }
      constructor(e9 = false) {
        super(false, e9);
      }
      set(e9, t5, n6, r4) {
        let s6 = e9[t5];
        const o5 = i(e9) && isIntegerKey(t5);
        if (!this._isShallow) {
          const e10 = isReadonly(s6);
          if (isShallow(n6) || isReadonly(n6) || (s6 = toRaw(s6), n6 = toRaw(n6)), !o5 && isRef2(s6) && !isRef2(n6)) return e10 || (s6.value = n6), true;
        }
        const i6 = o5 ? Number(t5) < e9.length : hasOwn(e9, t5), a5 = Reflect.set(e9, t5, n6, isRef2(e9) ? e9 : r4);
        return e9 === toRaw(r4) && a5 && (i6 ? hasChanged(n6, s6) && trigger(e9, "set", t5, n6) : trigger(e9, "add", t5, n6)), a5;
      }
      deleteProperty(e9, t5) {
        const n6 = hasOwn(e9, t5);
        e9[t5];
        const r4 = Reflect.deleteProperty(e9, t5);
        return r4 && n6 && trigger(e9, "delete", t5, void 0), r4;
      }
      has(e9, t5) {
        const n6 = Reflect.has(e9, t5);
        return isSymbol(t5) && qe2.has(t5) || track(e9, 0, t5), n6;
      }
      ownKeys(e9) {
        return track(e9, 0, i(e9) ? "length" : je2), Reflect.ownKeys(e9);
      }
    };
    ReadonlyReactiveHandler = class extends BaseReactiveHandler {
      static {
        __name(this, "ReadonlyReactiveHandler");
      }
      constructor(e9 = false) {
        super(true, e9);
      }
      set(e9, t5) {
        return true;
      }
      deleteProperty(e9, t5) {
        return true;
      }
    };
    Ke2 = new MutableReactiveHandler();
    Je2 = new ReadonlyReactiveHandler();
    Ge2 = new MutableReactiveHandler(true);
    Ze2 = new ReadonlyReactiveHandler(true);
    toShallow = /* @__PURE__ */ __name((e9) => e9, "toShallow");
    getProto = /* @__PURE__ */ __name((e9) => Reflect.getPrototypeOf(e9), "getProto");
    __name(createReadonlyMethod, "createReadonlyMethod");
    __name(createInstrumentations, "createInstrumentations");
    __name(createInstrumentationGetter, "createInstrumentationGetter");
    Ye2 = { get: createInstrumentationGetter(false, false) };
    Xe2 = { get: createInstrumentationGetter(false, true) };
    Qe2 = { get: createInstrumentationGetter(true, false) };
    et2 = { get: createInstrumentationGetter(true, true) };
    tt2 = /* @__PURE__ */ new WeakMap();
    nt2 = /* @__PURE__ */ new WeakMap();
    rt2 = /* @__PURE__ */ new WeakMap();
    st2 = /* @__PURE__ */ new WeakMap();
    __name(reactive, "reactive");
    __name(shallowReactive, "shallowReactive");
    __name(readonly, "readonly");
    __name(shallowReadonly, "shallowReadonly");
    __name(createReactiveObject, "createReactiveObject");
    __name(isReactive, "isReactive");
    __name(isReadonly, "isReadonly");
    __name(isShallow, "isShallow");
    __name(isProxy, "isProxy");
    __name(toRaw, "toRaw");
    __name(markRaw, "markRaw");
    toReactive = /* @__PURE__ */ __name((e9) => isObject(e9) ? reactive(e9) : e9, "toReactive");
    toReadonly = /* @__PURE__ */ __name((e9) => isObject(e9) ? readonly(e9) : e9, "toReadonly");
    __name(isRef2, "isRef");
    __name(ref, "ref");
    __name(shallowRef, "shallowRef");
    __name(createRef, "createRef");
    RefImpl = class {
      static {
        __name(this, "RefImpl");
      }
      constructor(e9, t5) {
        this.dep = new Dep(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = t5 ? e9 : toRaw(e9), this._value = t5 ? e9 : toReactive(e9), this.__v_isShallow = t5;
      }
      get value() {
        return this.dep.track(), this._value;
      }
      set value(e9) {
        const t5 = this._rawValue, n6 = this.__v_isShallow || isShallow(e9) || isReadonly(e9);
        e9 = n6 ? e9 : toRaw(e9), hasChanged(e9, t5) && (this._rawValue = e9, this._value = n6 ? e9 : toReactive(e9), this.dep.trigger());
      }
    };
    __name(unref, "unref");
    __name(toValue, "toValue");
    ot2 = { get: /* @__PURE__ */ __name((e9, t5, n6) => "__v_raw" === t5 ? e9 : unref(Reflect.get(e9, t5, n6)), "get"), set: /* @__PURE__ */ __name((e9, t5, n6, r4) => {
      const s6 = e9[t5];
      return isRef2(s6) && !isRef2(n6) ? (s6.value = n6, true) : Reflect.set(e9, t5, n6, r4);
    }, "set") };
    __name(proxyRefs, "proxyRefs");
    CustomRefImpl = class {
      static {
        __name(this, "CustomRefImpl");
      }
      constructor(e9) {
        this.__v_isRef = true, this._value = void 0;
        const t5 = this.dep = new Dep(), { get: n6, set: r4 } = e9(t5.track.bind(t5), t5.trigger.bind(t5));
        this._get = n6, this._set = r4;
      }
      get value() {
        return this._value = this._get();
      }
      set value(e9) {
        this._set(e9);
      }
    };
    __name(customRef, "customRef");
    __name(toRefs, "toRefs");
    ObjectRefImpl = class {
      static {
        __name(this, "ObjectRefImpl");
      }
      constructor(e9, t5, n6) {
        this._object = e9, this._defaultValue = n6, this.__v_isRef = true, this._value = void 0, this._key = isSymbol(t5) ? t5 : String(t5), this._raw = toRaw(e9);
        let r4 = true, s6 = e9;
        if (!i(e9) || isSymbol(this._key) || !isIntegerKey(this._key)) do {
          r4 = !isProxy(s6) || isShallow(s6);
        } while (r4 && (s6 = s6.__v_raw));
        this._shallow = r4;
      }
      get value() {
        let e9 = this._object[this._key];
        return this._shallow && (e9 = unref(e9)), this._value = void 0 === e9 ? this._defaultValue : e9;
      }
      set value(e9) {
        if (this._shallow && isRef2(this._raw[this._key])) {
          const t5 = this._object[this._key];
          if (isRef2(t5)) return void (t5.value = e9);
        }
        this._object[this._key] = e9;
      }
      get dep() {
        return (function(e9, t5) {
          const n6 = Ie2.get(e9);
          return n6 && n6.get(t5);
        })(this._raw, this._key);
      }
    };
    GetterRefImpl = class {
      static {
        __name(this, "GetterRefImpl");
      }
      constructor(e9) {
        this._getter = e9, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
      }
      get value() {
        return this._value = this._getter();
      }
    };
    __name(propertyToRef, "propertyToRef");
    ComputedRefImpl = class {
      static {
        __name(this, "ComputedRefImpl");
      }
      constructor(e9, t5, n6) {
        this.fn = e9, this.setter = t5, this._value = void 0, this.dep = new Dep(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = De2 - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t5, this.isSSR = n6;
      }
      notify() {
        if (this.flags |= 16, !(8 & this.flags) && Pe2 !== this) return batch(this, true), true;
      }
      get value() {
        const e9 = this.dep.track();
        return refreshComputed(this), e9 && (e9.version = this.dep.version), this._value;
      }
      set value(e9) {
        this.setter && this.setter(e9);
      }
    };
    it2 = {};
    at2 = /* @__PURE__ */ new WeakMap();
    __name(onWatcherCleanup, "onWatcherCleanup");
    __name(traverse, "traverse");
    ct2 = [];
    ut2 = { sp: "serverPrefetch hook", bc: "beforeCreate hook", c: "created hook", bm: "beforeMount hook", m: "mounted hook", bu: "beforeUpdate hook", u: "updated", bum: "beforeUnmount hook", um: "unmounted hook", a: "activated hook", da: "deactivated hook", ec: "errorCaptured hook", rtc: "renderTracked hook", rtg: "renderTriggered hook", 0: "setup function", 1: "render function", 2: "watcher getter", 3: "watcher callback", 4: "watcher cleanup function", 5: "native event handler", 6: "component event handler", 7: "vnode hook", 8: "directive hook", 9: "transition hook", 10: "app errorHandler", 11: "app warnHandler", 12: "ref function", 13: "async component loader", 14: "scheduler flush", 15: "component update", 16: "app unmount cleanup function" };
    __name(callWithErrorHandling, "callWithErrorHandling");
    __name(callWithAsyncErrorHandling, "callWithAsyncErrorHandling");
    __name(handleError, "handleError");
    pt2 = [];
    dt2 = -1;
    ft2 = [];
    ht2 = null;
    gt2 = 0;
    mt2 = Promise.resolve();
    yt2 = null;
    __name(nextTick, "nextTick");
    __name(queueJob, "queueJob");
    __name(queueFlush, "queueFlush");
    __name(queuePostFlushCb, "queuePostFlushCb");
    __name(flushPreFlushCbs, "flushPreFlushCbs");
    __name(flushPostFlushCbs, "flushPostFlushCbs");
    getId = /* @__PURE__ */ __name((e9) => null == e9.id ? 2 & e9.flags ? -1 : 1 / 0 : e9.id, "getId");
    __name(flushJobs, "flushJobs");
    _t2 = [];
    bt2 = null;
    kt2 = null;
    __name(setCurrentRenderingInstance$1, "setCurrentRenderingInstance$1");
    __name(withCtx, "withCtx");
    __name(invokeDirectiveHook, "invokeDirectiveHook");
    __name(provide, "provide");
    __name(inject, "inject");
    __name(hasInjectionContext, "hasInjectionContext");
    Ct2 = /* @__PURE__ */ Symbol.for("v-scx");
    useSSRContext = /* @__PURE__ */ __name(() => inject(Ct2), "useSSRContext");
    __name(watchEffect, "watchEffect");
    __name(watchSyncEffect, "watchSyncEffect");
    __name(watch, "watch");
    __name(doWatch, "doWatch");
    __name(instanceWatch, "instanceWatch");
    __name(createPathGetter, "createPathGetter");
    St2 = /* @__PURE__ */ new WeakMap();
    wt2 = /* @__PURE__ */ Symbol("_vte");
    isTeleport = /* @__PURE__ */ __name((e9) => e9.__isTeleport, "isTeleport");
    isTeleportDisabled = /* @__PURE__ */ __name((e9) => e9 && (e9.disabled || "" === e9.disabled), "isTeleportDisabled");
    isTargetSVG = /* @__PURE__ */ __name((e9) => "undefined" != typeof SVGElement && e9 instanceof SVGElement, "isTargetSVG");
    isTargetMathML = /* @__PURE__ */ __name((e9) => "function" == typeof MathMLElement && e9 instanceof MathMLElement, "isTargetMathML");
    resolveTarget = /* @__PURE__ */ __name((e9, t5) => {
      const n6 = e9 && e9.to;
      if (isString(n6)) {
        if (t5) {
          return t5(n6);
        }
        return null;
      }
      return n6;
    }, "resolveTarget");
    __name(moveTeleport, "moveTeleport");
    Rt2 = { name: "Teleport", __isTeleport: true, process(e9, t5, n6, r4, s6, o5, i6, a5, l4, c4) {
      const { mc: u6, pc: p6, pbc: d5, o: { insert: f4, querySelector: g3, createText: m4, createComment: y4, parentNode: v5 } } = c4, _3 = isTeleportDisabled(t5.props);
      let { dynamicChildren: b4 } = t5;
      const mount = /* @__PURE__ */ __name((e10, t6, n7) => {
        16 & e10.shapeFlag && u6(e10.children, t6, n7, s6, o5, i6, a5, l4);
      }, "mount"), mountToTarget = /* @__PURE__ */ __name((e10 = t5) => {
        const n7 = isTeleportDisabled(e10.props), r5 = e10.target = resolveTarget(e10.props, g3), o6 = prepareAnchor(r5, e10, m4, f4);
        r5 && ("svg" !== i6 && isTargetSVG(r5) ? i6 = "svg" : "mathml" !== i6 && isTargetMathML(r5) && (i6 = "mathml"), s6 && s6.isCE && (s6.ce._teleportTargets || (s6.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r5), n7 || (mount(e10, r5, o6), updateCssVars(e10, false)));
      }, "mountToTarget"), queuePendingMount = /* @__PURE__ */ __name((e10) => {
        const mountJob = /* @__PURE__ */ __name(() => {
          if (St2.get(e10) === mountJob) {
            if (St2.delete(e10), isTeleportDisabled(e10.props)) {
              const t6 = v5(e10.el) || n6;
              mount(e10, t6, e10.anchor), updateCssVars(e10, true);
            }
            mountToTarget(e10);
          }
        }, "mountJob");
        St2.set(e10, mountJob), on2(mountJob, o5);
      }, "queuePendingMount");
      if (null == e9) {
        const e10 = t5.el = m4(""), s7 = t5.anchor = m4("");
        if (f4(e10, n6, r4), f4(s7, n6, r4), (k4 = t5.props) && (k4.defer || "" === k4.defer) || o5 && o5.pendingBranch) return void queuePendingMount(t5);
        _3 && (mount(t5, n6, s7), updateCssVars(t5, true)), mountToTarget();
      } else {
        t5.el = e9.el;
        const r5 = t5.anchor = e9.anchor, u7 = St2.get(e9);
        if (u7) return u7.flags |= 8, St2.delete(e9), void queuePendingMount(t5);
        t5.targetStart = e9.targetStart;
        const f5 = t5.target = e9.target, m5 = t5.targetAnchor = e9.targetAnchor, y5 = isTeleportDisabled(e9.props), v6 = y5 ? n6 : f5, k5 = y5 ? r5 : m5;
        if ("svg" === i6 || isTargetSVG(f5) ? i6 = "svg" : ("mathml" === i6 || isTargetMathML(f5)) && (i6 = "mathml"), b4 ? (d5(e9.dynamicChildren, b4, v6, s6, o5, i6, a5), traverseStaticChildren(e9, t5, true)) : l4 || p6(e9, t5, v6, k5, s6, o5, i6, a5, false), _3) y5 ? t5.props && e9.props && t5.props.to !== e9.props.to && (t5.props.to = e9.props.to) : moveTeleport(t5, n6, r5, c4, 1);
        else if ((t5.props && t5.props.to) !== (e9.props && e9.props.to)) {
          const e10 = resolveTarget(t5.props, g3);
          e10 && (t5.target = e10, moveTeleport(t5, e10, null, c4, 0));
        } else y5 && moveTeleport(t5, f5, m5, c4, 1);
        updateCssVars(t5, _3);
      }
      var k4;
    }, remove(e9, t5, n6, { um: r4, o: { remove: s6 } }, o5) {
      const { shapeFlag: i6, children: a5, anchor: l4, targetStart: c4, targetAnchor: u6, target: p6, props: d5 } = e9, f4 = isTeleportDisabled(d5), g3 = o5 || !f4, m4 = St2.get(e9);
      if (m4 && (m4.flags |= 8, St2.delete(e9)), p6 && (s6(c4), s6(u6)), o5 && s6(l4), !m4 && (f4 || p6) && 16 & i6) for (let e10 = 0; e10 < a5.length; e10++) {
        const s7 = a5[e10];
        r4(s7, t5, n6, g3, !!s7.dynamicChildren);
      }
    }, move: moveTeleport, hydrate: /* @__PURE__ */ __name(function(e9, t5, n6, r4, s6, o5, { o: { nextSibling: i6, parentNode: a5, querySelector: l4, insert: c4, createText: u6 } }, p6) {
      function hydrateAnchor(e10, n7) {
        let r5 = n7;
        for (; r5; ) {
          if (r5 && 8 === r5.nodeType) {
            if ("teleport start anchor" === r5.data) t5.targetStart = r5;
            else if ("teleport anchor" === r5.data) {
              t5.targetAnchor = r5, e10._lpa = t5.targetAnchor && i6(t5.targetAnchor);
              break;
            }
          }
          r5 = i6(r5);
        }
      }
      __name(hydrateAnchor, "hydrateAnchor");
      function hydrateDisabledTeleport(e10, t6) {
        t6.anchor = p6(i6(e10), t6, a5(e10), n6, r4, s6, o5);
      }
      __name(hydrateDisabledTeleport, "hydrateDisabledTeleport");
      const d5 = t5.target = resolveTarget(t5.props, l4), f4 = isTeleportDisabled(t5.props);
      if (d5) {
        const l5 = d5._lpa || d5.firstChild;
        16 & t5.shapeFlag && (f4 ? (hydrateDisabledTeleport(e9, t5), hydrateAnchor(d5, l5), t5.targetAnchor || prepareAnchor(d5, t5, u6, c4, a5(e9) === d5 ? e9 : null)) : (t5.anchor = i6(e9), hydrateAnchor(d5, l5), t5.targetAnchor || prepareAnchor(d5, t5, u6, c4), p6(l5 && i6(l5), t5, d5, n6, r4, s6, o5))), updateCssVars(t5, f4);
      } else f4 && 16 & t5.shapeFlag && (hydrateDisabledTeleport(e9, t5), t5.targetStart = e9, t5.targetAnchor = i6(e9));
      return t5.anchor && i6(t5.anchor);
    }, "hydrate") };
    __name(updateCssVars, "updateCssVars");
    __name(prepareAnchor, "prepareAnchor");
    Tt2 = /* @__PURE__ */ Symbol("_leaveCb");
    At2 = /* @__PURE__ */ Symbol("_enterCb");
    __name(useTransitionState, "useTransitionState");
    xt2 = [Function, Array];
    Et2 = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: xt2, onEnter: xt2, onAfterEnter: xt2, onEnterCancelled: xt2, onBeforeLeave: xt2, onLeave: xt2, onAfterLeave: xt2, onLeaveCancelled: xt2, onBeforeAppear: xt2, onAppear: xt2, onAfterAppear: xt2, onAppearCancelled: xt2 };
    recursiveGetSubtree = /* @__PURE__ */ __name((e9) => {
      const t5 = e9.subTree;
      return t5.component ? recursiveGetSubtree(t5.component) : t5;
    }, "recursiveGetSubtree");
    __name(findNonCommentChild, "findNonCommentChild");
    $t2 = { name: "BaseTransition", props: Et2, setup(e9, { slots: t5 }) {
      const n6 = getCurrentInstance(), r4 = useTransitionState();
      return () => {
        const s6 = t5.default && getTransitionRawChildren(t5.default(), true), o5 = s6 && s6.length ? findNonCommentChild(s6) : n6.subTree ? createCommentVNode() : void 0;
        if (!o5) return;
        const i6 = toRaw(e9), { mode: a5 } = i6;
        if (r4.isLeaving) return emptyPlaceholder(o5);
        const l4 = getInnerChild$1(o5);
        if (!l4) return emptyPlaceholder(o5);
        let c4 = resolveTransitionHooks(l4, i6, r4, n6, (e10) => c4 = e10);
        l4.type !== pn2 && setTransitionHooks(l4, c4);
        let u6 = n6.subTree && getInnerChild$1(n6.subTree);
        if (u6 && u6.type !== pn2 && !isSameVNodeType(u6, l4) && recursiveGetSubtree(n6).type !== pn2) {
          let e10 = resolveTransitionHooks(u6, i6, r4, n6);
          if (setTransitionHooks(u6, e10), "out-in" === a5 && l4.type !== pn2) return r4.isLeaving = true, e10.afterLeave = () => {
            r4.isLeaving = false, 8 & n6.job.flags || n6.update(), delete e10.afterLeave, u6 = void 0;
          }, emptyPlaceholder(o5);
          "in-out" === a5 && l4.type !== pn2 ? e10.delayLeave = (e11, t6, n7) => {
            getLeavingNodesForType(r4, u6)[String(u6.key)] = u6, e11[Tt2] = () => {
              t6(), e11[Tt2] = void 0, delete c4.delayedLeave, u6 = void 0;
            }, c4.delayedLeave = () => {
              n7(), delete c4.delayedLeave, u6 = void 0;
            };
          } : u6 = void 0;
        } else u6 && (u6 = void 0);
        return o5;
      };
    } };
    __name(getLeavingNodesForType, "getLeavingNodesForType");
    __name(resolveTransitionHooks, "resolveTransitionHooks");
    __name(emptyPlaceholder, "emptyPlaceholder");
    __name(getInnerChild$1, "getInnerChild$1");
    __name(setTransitionHooks, "setTransitionHooks");
    __name(getTransitionRawChildren, "getTransitionRawChildren");
    __name(defineComponent, "defineComponent");
    __name(markAsyncBoundary, "markAsyncBoundary");
    __name(isTemplateRefKey, "isTemplateRefKey");
    Pt2 = /* @__PURE__ */ new WeakMap();
    __name(setRef, "setRef");
    __name(invalidatePendingSetRef, "invalidatePendingSetRef");
    Ot2 = false;
    logMismatchError = /* @__PURE__ */ __name(() => {
      Ot2 || (console.error("Hydration completed but contains mismatches."), Ot2 = true);
    }, "logMismatchError");
    getContainerType = /* @__PURE__ */ __name((e9) => {
      if (1 === e9.nodeType) return ((e10) => e10.namespaceURI.includes("svg") && "foreignObject" !== e10.tagName)(e9) ? "svg" : ((e10) => e10.namespaceURI.includes("MathML"))(e9) ? "mathml" : void 0;
    }, "getContainerType");
    isComment = /* @__PURE__ */ __name((e9) => 8 === e9.nodeType, "isComment");
    __name(createHydrationFunctions, "createHydrationFunctions");
    Nt2 = "data-allow-mismatch";
    Ht2 = { 0: "text", 1: "children", 2: "class", 3: "style", 4: "attribute" };
    __name(isMismatchAllowed, "isMismatchAllowed");
    __name(isMismatchAllowedByAttr, "isMismatchAllowedByAttr");
    Mt2 = getGlobalThis().requestIdleCallback || ((e9) => setTimeout(e9, 1));
    Vt2 = getGlobalThis().cancelIdleCallback || ((e9) => clearTimeout(e9));
    isAsyncWrapper = /* @__PURE__ */ __name((e9) => !!e9.type.__asyncLoader, "isAsyncWrapper");
    __name(createInnerComp, "createInnerComp");
    isKeepAlive = /* @__PURE__ */ __name((e9) => e9.type.__isKeepAlive, "isKeepAlive");
    Lt2 = { name: "KeepAlive", __isKeepAlive: true, props: { include: [String, RegExp, Array], exclude: [String, RegExp, Array], max: [String, Number] }, setup(e9, { slots: t5 }) {
      const n6 = getCurrentInstance(), r4 = n6.ctx;
      if (!r4.renderer) return () => {
        const e10 = t5.default && t5.default();
        return e10 && 1 === e10.length ? e10[0] : e10;
      };
      const s6 = /* @__PURE__ */ new Map(), o5 = /* @__PURE__ */ new Set();
      let i6 = null;
      const a5 = n6.suspense, { renderer: { p: l4, m: c4, um: u6, o: { createElement: p6 } } } = r4, d5 = p6("div");
      function unmount(e10) {
        resetShapeFlag(e10), u6(e10, n6, a5, true);
      }
      __name(unmount, "unmount");
      function pruneCache(e10) {
        s6.forEach((t6, n7) => {
          const r5 = getComponentName(isAsyncWrapper(t6) ? t6.type.__asyncResolved || {} : t6.type);
          r5 && !e10(r5) && pruneCacheEntry(n7);
        });
      }
      __name(pruneCache, "pruneCache");
      function pruneCacheEntry(e10) {
        const t6 = s6.get(e10);
        !t6 || i6 && isSameVNodeType(t6, i6) ? i6 && resetShapeFlag(i6) : unmount(t6), s6.delete(e10), o5.delete(e10);
      }
      __name(pruneCacheEntry, "pruneCacheEntry");
      r4.activate = (e10, t6, n7, r5, s7) => {
        const o6 = e10.component;
        c4(e10, t6, n7, 0, a5), l4(o6.vnode, e10, t6, n7, o6, a5, r5, e10.slotScopeIds, s7), on2(() => {
          o6.isDeactivated = false, o6.a && invokeArrayFns(o6.a);
          const t7 = e10.props && e10.props.onVnodeMounted;
          t7 && invokeVNodeHook(t7, o6.parent, e10);
        }, a5);
      }, r4.deactivate = (e10) => {
        const t6 = e10.component;
        invalidateMount(t6.m), invalidateMount(t6.a), c4(e10, d5, null, 1, a5), on2(() => {
          t6.da && invokeArrayFns(t6.da);
          const n7 = e10.props && e10.props.onVnodeUnmounted;
          n7 && invokeVNodeHook(n7, t6.parent, e10), t6.isDeactivated = true;
        }, a5);
      }, watch(() => [e9.include, e9.exclude], ([e10, t6]) => {
        e10 && pruneCache((t7) => matches(e10, t7)), t6 && pruneCache((e11) => !matches(t6, e11));
      }, { flush: "post", deep: true });
      let f4 = null;
      const cacheSubtree = /* @__PURE__ */ __name(() => {
        null != f4 && (isSuspense(n6.subTree.type) ? on2(() => {
          s6.set(f4, getInnerChild(n6.subTree));
        }, n6.subTree.suspense) : s6.set(f4, getInnerChild(n6.subTree)));
      }, "cacheSubtree");
      return It2(cacheSubtree), Ft2(cacheSubtree), Bt2(() => {
        s6.forEach((e10) => {
          const { subTree: t6, suspense: r5 } = n6, s7 = getInnerChild(t6);
          if (e10.type === s7.type && e10.key === s7.key) {
            resetShapeFlag(s7);
            const e11 = s7.component.da;
            return void (e11 && on2(e11, r5));
          }
          unmount(e10);
        });
      }), () => {
        if (f4 = null, !t5.default) return i6 = null;
        const n7 = t5.default(), r5 = n7[0];
        if (n7.length > 1) return i6 = null, n7;
        if (!(isVNode$2(r5) && (4 & r5.shapeFlag || 128 & r5.shapeFlag))) return i6 = null, r5;
        let a6 = getInnerChild(r5);
        if (a6.type === pn2) return i6 = null, a6;
        const l5 = a6.type, c5 = getComponentName(isAsyncWrapper(a6) ? a6.type.__asyncResolved || {} : l5), { include: u7, exclude: p7, max: d6 } = e9;
        if (u7 && (!c5 || !matches(u7, c5)) || p7 && c5 && matches(p7, c5)) return a6.shapeFlag &= -257, i6 = a6, r5;
        const g3 = null == a6.key ? l5 : a6.key, m4 = s6.get(g3);
        return a6.el && (a6 = cloneVNode(a6), 128 & r5.shapeFlag && (r5.ssContent = a6)), f4 = g3, m4 ? (a6.el = m4.el, a6.component = m4.component, a6.transition && setTransitionHooks(a6, a6.transition), a6.shapeFlag |= 512, o5.delete(g3), o5.add(g3)) : (o5.add(g3), d6 && o5.size > parseInt(d6, 10) && pruneCacheEntry(o5.values().next().value)), a6.shapeFlag |= 256, i6 = a6, isSuspense(r5.type) ? r5 : a6;
      };
    } };
    __name(matches, "matches");
    __name(onActivated, "onActivated");
    __name(onDeactivated, "onDeactivated");
    __name(registerKeepAliveHook, "registerKeepAliveHook");
    __name(injectToKeepAliveRoot, "injectToKeepAliveRoot");
    __name(resetShapeFlag, "resetShapeFlag");
    __name(getInnerChild, "getInnerChild");
    __name(injectHook, "injectHook");
    createHook = /* @__PURE__ */ __name((e9) => (t5, n6 = vn2) => {
      Sn2 && "sp" !== e9 || injectHook(e9, (...e10) => t5(...e10), n6);
    }, "createHook");
    Dt2 = createHook("bm");
    It2 = createHook("m");
    jt2 = createHook("bu");
    Ft2 = createHook("u");
    Bt2 = createHook("bum");
    Ut2 = createHook("um");
    Wt2 = createHook("sp");
    zt2 = createHook("rtg");
    qt2 = createHook("rtc");
    __name(onErrorCaptured, "onErrorCaptured");
    Kt2 = "components";
    Jt2 = /* @__PURE__ */ Symbol.for("v-ndc");
    __name(resolveAsset, "resolveAsset");
    __name(resolve, "resolve");
    __name(ensureValidVNode$1, "ensureValidVNode$1");
    getPublicInstance = /* @__PURE__ */ __name((e9) => e9 ? isStatefulComponent(e9) ? getComponentPublicInstance(e9) : getPublicInstance(e9.parent) : null, "getPublicInstance");
    Gt2 = n(/* @__PURE__ */ Object.create(null), { $: /* @__PURE__ */ __name((e9) => e9, "$"), $el: /* @__PURE__ */ __name((e9) => e9.vnode.el, "$el"), $data: /* @__PURE__ */ __name((e9) => e9.data, "$data"), $props: /* @__PURE__ */ __name((e9) => e9.props, "$props"), $attrs: /* @__PURE__ */ __name((e9) => e9.attrs, "$attrs"), $slots: /* @__PURE__ */ __name((e9) => e9.slots, "$slots"), $refs: /* @__PURE__ */ __name((e9) => e9.refs, "$refs"), $parent: /* @__PURE__ */ __name((e9) => getPublicInstance(e9.parent), "$parent"), $root: /* @__PURE__ */ __name((e9) => getPublicInstance(e9.root), "$root"), $host: /* @__PURE__ */ __name((e9) => e9.ce, "$host"), $emit: /* @__PURE__ */ __name((e9) => e9.emit, "$emit"), $options: /* @__PURE__ */ __name((e9) => resolveMergedOptions(e9), "$options"), $forceUpdate: /* @__PURE__ */ __name((e9) => e9.f || (e9.f = () => {
      queueJob(e9.update);
    }), "$forceUpdate"), $nextTick: /* @__PURE__ */ __name((e9) => e9.n || (e9.n = nextTick.bind(e9.proxy)), "$nextTick"), $watch: /* @__PURE__ */ __name((e9) => instanceWatch.bind(e9), "$watch") });
    hasSetupBinding = /* @__PURE__ */ __name((e9, t5) => e9 !== t && !e9.__isScriptSetup && hasOwn(e9, t5), "hasSetupBinding");
    Zt2 = { get({ _: e9 }, t5) {
      if ("__v_skip" === t5) return true;
      const { ctx: n6, setupState: r4, data: s6, props: o5, accessCache: i6, type: a5, appContext: l4 } = e9;
      if ("$" !== t5[0]) {
        const e10 = i6[t5];
        if (void 0 !== e10) switch (e10) {
          case 1:
            return r4[t5];
          case 2:
            return s6[t5];
          case 4:
            return n6[t5];
          case 3:
            return o5[t5];
        }
        else {
          if (hasSetupBinding(r4, t5)) return i6[t5] = 1, r4[t5];
          if (s6 !== t && hasOwn(s6, t5)) return i6[t5] = 2, s6[t5];
          if (hasOwn(o5, t5)) return i6[t5] = 3, o5[t5];
          if (n6 !== t && hasOwn(n6, t5)) return i6[t5] = 4, n6[t5];
          Xt2 && (i6[t5] = 0);
        }
      }
      const c4 = Gt2[t5];
      let u6, p6;
      return c4 ? ("$attrs" === t5 && track(e9.attrs, 0, ""), c4(e9)) : (u6 = a5.__cssModules) && (u6 = u6[t5]) ? u6 : n6 !== t && hasOwn(n6, t5) ? (i6[t5] = 4, n6[t5]) : (p6 = l4.config.globalProperties, hasOwn(p6, t5) ? p6[t5] : void 0);
    }, set({ _: e9 }, t5, n6) {
      const { data: r4, setupState: s6, ctx: o5 } = e9;
      return hasSetupBinding(s6, t5) ? (s6[t5] = n6, true) : r4 !== t && hasOwn(r4, t5) ? (r4[t5] = n6, true) : !hasOwn(e9.props, t5) && (("$" !== t5[0] || !(t5.slice(1) in e9)) && (o5[t5] = n6, true));
    }, has({ _: { data: e9, setupState: t5, accessCache: n6, ctx: r4, appContext: s6, props: o5, type: i6 } }, a5) {
      let l4;
      return !!(n6[a5] || e9 !== t && "$" !== a5[0] && hasOwn(e9, a5) || hasSetupBinding(t5, a5) || hasOwn(o5, a5) || hasOwn(r4, a5) || hasOwn(Gt2, a5) || hasOwn(s6.config.globalProperties, a5) || (l4 = i6.__cssModules) && l4[a5]);
    }, defineProperty(e9, t5, n6) {
      return null != n6.get ? e9._.accessCache[t5] = 0 : hasOwn(n6, "value") && this.set(e9, t5, n6.value, null), Reflect.defineProperty(e9, t5, n6);
    } };
    Yt2 = n({}, Zt2, { get(e9, t5) {
      if (t5 !== Symbol.unscopables) return Zt2.get(e9, t5, e9);
    }, has: /* @__PURE__ */ __name((e9, t5) => "_" !== t5[0] && !E(t5), "has") });
    __name(getContext2, "getContext");
    __name(normalizePropsOrEmits, "normalizePropsOrEmits");
    Xt2 = true;
    __name(applyOptions, "applyOptions");
    __name(callHook$1, "callHook$1");
    __name(createWatcher, "createWatcher");
    __name(resolveMergedOptions, "resolveMergedOptions");
    __name(mergeOptions2, "mergeOptions");
    Qt2 = { data: mergeDataFn, props: mergeEmitsOrPropsOptions, emits: mergeEmitsOrPropsOptions, methods: mergeObjectOptions, computed: mergeObjectOptions, beforeCreate: mergeAsArray2, created: mergeAsArray2, beforeMount: mergeAsArray2, mounted: mergeAsArray2, beforeUpdate: mergeAsArray2, updated: mergeAsArray2, beforeDestroy: mergeAsArray2, beforeUnmount: mergeAsArray2, destroyed: mergeAsArray2, unmounted: mergeAsArray2, activated: mergeAsArray2, deactivated: mergeAsArray2, errorCaptured: mergeAsArray2, serverPrefetch: mergeAsArray2, components: mergeObjectOptions, directives: mergeObjectOptions, watch: /* @__PURE__ */ __name(function(e9, t5) {
      if (!e9) return t5;
      if (!t5) return e9;
      const n6 = n(/* @__PURE__ */ Object.create(null), e9);
      for (const r4 in t5) n6[r4] = mergeAsArray2(e9[r4], t5[r4]);
      return n6;
    }, "watch"), provide: mergeDataFn, inject: /* @__PURE__ */ __name(function(e9, t5) {
      return mergeObjectOptions(normalizeInject(e9), normalizeInject(t5));
    }, "inject") };
    __name(mergeDataFn, "mergeDataFn");
    __name(normalizeInject, "normalizeInject");
    __name(mergeAsArray2, "mergeAsArray");
    __name(mergeObjectOptions, "mergeObjectOptions");
    __name(mergeEmitsOrPropsOptions, "mergeEmitsOrPropsOptions");
    __name(createAppContext, "createAppContext");
    en2 = 0;
    __name(createAppAPI, "createAppAPI");
    tn3 = null;
    getModelModifiers = /* @__PURE__ */ __name((e9, t5) => "modelValue" === t5 || "model-value" === t5 ? e9.modelModifiers : e9[`${t5}Modifiers`] || e9[`${p(t5)}Modifiers`] || e9[`${d(t5)}Modifiers`], "getModelModifiers");
    __name(emit, "emit");
    nn2 = /* @__PURE__ */ new WeakMap();
    __name(normalizeEmitsOptions, "normalizeEmitsOptions");
    __name(isEmitListener, "isEmitListener");
    __name(renderComponentRoot$1, "renderComponentRoot$1");
    getFunctionalFallthrough = /* @__PURE__ */ __name((e9) => {
      let t5;
      for (const n6 in e9) ("class" === n6 || "style" === n6 || isOn(n6)) && ((t5 || (t5 = {}))[n6] = e9[n6]);
      return t5;
    }, "getFunctionalFallthrough");
    filterModelListeners = /* @__PURE__ */ __name((e9, t5) => {
      const n6 = {};
      for (const r4 in e9) isModelListener(r4) && r4.slice(9) in t5 || (n6[r4] = e9[r4]);
      return n6;
    }, "filterModelListeners");
    __name(hasPropsChanged, "hasPropsChanged");
    __name(hasPropValueChanged, "hasPropValueChanged");
    __name(updateHOCHostEl, "updateHOCHostEl");
    rn2 = {};
    createInternalObject = /* @__PURE__ */ __name(() => Object.create(rn2), "createInternalObject");
    isInternalObject = /* @__PURE__ */ __name((e9) => Object.getPrototypeOf(e9) === rn2, "isInternalObject");
    __name(setFullProps, "setFullProps");
    __name(resolvePropValue, "resolvePropValue");
    sn2 = /* @__PURE__ */ new WeakMap();
    __name(normalizePropsOptions, "normalizePropsOptions");
    __name(validatePropName, "validatePropName");
    isInternalKey = /* @__PURE__ */ __name((e9) => "_" === e9 || "_ctx" === e9 || "$stable" === e9, "isInternalKey");
    normalizeSlotValue = /* @__PURE__ */ __name((e9) => i(e9) ? e9.map(normalizeVNode$1) : [normalizeVNode$1(e9)], "normalizeSlotValue");
    normalizeSlot2 = /* @__PURE__ */ __name((e9, t5, n6) => {
      if (t5._n) return t5;
      const r4 = withCtx((...e10) => normalizeSlotValue(t5(...e10)), n6);
      return r4._c = false, r4;
    }, "normalizeSlot");
    normalizeObjectSlots = /* @__PURE__ */ __name((e9, t5, n6) => {
      const r4 = e9._ctx;
      for (const n7 in e9) {
        if (isInternalKey(n7)) continue;
        const s6 = e9[n7];
        if (isFunction(s6)) t5[n7] = normalizeSlot2(0, s6, r4);
        else if (null != s6) {
          const e10 = normalizeSlotValue(s6);
          t5[n7] = () => e10;
        }
      }
    }, "normalizeObjectSlots");
    normalizeVNodeSlots = /* @__PURE__ */ __name((e9, t5) => {
      const n6 = normalizeSlotValue(t5);
      e9.slots.default = () => n6;
    }, "normalizeVNodeSlots");
    assignSlots = /* @__PURE__ */ __name((e9, t5, n6) => {
      for (const r4 in t5) !n6 && isInternalKey(r4) || (e9[r4] = t5[r4]);
    }, "assignSlots");
    on2 = queueEffectWithSuspense;
    __name(createRenderer, "createRenderer");
    __name(createHydrationRenderer, "createHydrationRenderer");
    __name(baseCreateRenderer, "baseCreateRenderer");
    __name(resolveChildrenNamespace, "resolveChildrenNamespace");
    __name(toggleRecurse, "toggleRecurse");
    __name(needTransition, "needTransition");
    __name(traverseStaticChildren, "traverseStaticChildren");
    __name(locateNonHydratedAsyncRoot, "locateNonHydratedAsyncRoot");
    __name(invalidateMount, "invalidateMount");
    __name(resolveAsyncComponentPlaceholder, "resolveAsyncComponentPlaceholder");
    isSuspense = /* @__PURE__ */ __name((e9) => e9.__isSuspense, "isSuspense");
    an2 = 0;
    ln2 = { name: "Suspense", __isSuspense: true, process(e9, t5, n6, r4, s6, o5, i6, a5, l4, c4) {
      if (null == e9) !(function(e10, t6, n7, r5, s7, o6, i7, a6, l5) {
        const { p: c5, o: { createElement: u6 } } = l5, p6 = u6("div"), d5 = e10.suspense = createSuspenseBoundary(e10, s7, r5, t6, p6, n7, o6, i7, a6, l5);
        c5(null, d5.pendingBranch = e10.ssContent, p6, null, r5, d5, o6, i7), d5.deps > 0 ? (triggerEvent(e10, "onPending"), triggerEvent(e10, "onFallback"), c5(null, e10.ssFallback, t6, n7, r5, null, o6, i7), setActiveBranch(d5, e10.ssFallback)) : d5.resolve(false, true);
      })(t5, n6, r4, s6, o5, i6, a5, l4, c4);
      else {
        if (o5 && o5.deps > 0 && !e9.suspense.isInFallback) return t5.suspense = e9.suspense, t5.suspense.vnode = t5, void (t5.el = e9.el);
        !(function(e10, t6, n7, r5, s7, o6, i7, a6, { p: l5, um: c5, o: { createElement: u6 } }) {
          const p6 = t6.suspense = e10.suspense;
          p6.vnode = t6, t6.el = e10.el;
          const d5 = t6.ssContent, f4 = t6.ssFallback, { activeBranch: g3, pendingBranch: m4, isInFallback: y4, isHydrating: v5 } = p6;
          if (m4) p6.pendingBranch = d5, isSameVNodeType(m4, d5) ? (l5(m4, d5, p6.hiddenContainer, null, s7, p6, o6, i7, a6), p6.deps <= 0 ? p6.resolve() : y4 && (v5 || (l5(g3, f4, n7, r5, s7, null, o6, i7, a6), setActiveBranch(p6, f4)))) : (p6.pendingId = an2++, v5 ? (p6.isHydrating = false, p6.activeBranch = m4) : c5(m4, s7, p6), p6.deps = 0, p6.effects.length = 0, p6.hiddenContainer = u6("div"), y4 ? (l5(null, d5, p6.hiddenContainer, null, s7, p6, o6, i7, a6), p6.deps <= 0 ? p6.resolve() : (l5(g3, f4, n7, r5, s7, null, o6, i7, a6), setActiveBranch(p6, f4))) : g3 && isSameVNodeType(g3, d5) ? (l5(g3, d5, n7, r5, s7, p6, o6, i7, a6), p6.resolve(true)) : (l5(null, d5, p6.hiddenContainer, null, s7, p6, o6, i7, a6), p6.deps <= 0 && p6.resolve()));
          else if (g3 && isSameVNodeType(g3, d5)) l5(g3, d5, n7, r5, s7, p6, o6, i7, a6), setActiveBranch(p6, d5);
          else if (triggerEvent(t6, "onPending"), p6.pendingBranch = d5, 512 & d5.shapeFlag ? p6.pendingId = d5.component.suspenseId : p6.pendingId = an2++, l5(null, d5, p6.hiddenContainer, null, s7, p6, o6, i7, a6), p6.deps <= 0) p6.resolve();
          else {
            const { timeout: e11, pendingId: t7 } = p6;
            e11 > 0 ? setTimeout(() => {
              p6.pendingId === t7 && p6.fallback(f4);
            }, e11) : 0 === e11 && p6.fallback(f4);
          }
        })(e9, t5, n6, r4, s6, i6, a5, l4, c4);
      }
    }, hydrate: /* @__PURE__ */ __name(function(e9, t5, n6, r4, s6, o5, i6, a5, l4) {
      const c4 = t5.suspense = createSuspenseBoundary(t5, r4, n6, e9.parentNode, document.createElement("div"), null, s6, o5, i6, a5, true), u6 = l4(e9, c4.pendingBranch = t5.ssContent, n6, c4, o5, i6);
      0 === c4.deps && c4.resolve(false, true);
      return u6;
    }, "hydrate"), normalize: /* @__PURE__ */ __name(function(e9) {
      const { shapeFlag: t5, children: n6 } = e9, r4 = 32 & t5;
      e9.ssContent = normalizeSuspenseSlot(r4 ? n6.default : n6), e9.ssFallback = r4 ? normalizeSuspenseSlot(n6.fallback) : createVNode(pn2);
    }, "normalize") };
    __name(triggerEvent, "triggerEvent");
    __name(createSuspenseBoundary, "createSuspenseBoundary");
    __name(normalizeSuspenseSlot, "normalizeSuspenseSlot");
    __name(queueEffectWithSuspense, "queueEffectWithSuspense");
    __name(setActiveBranch, "setActiveBranch");
    cn2 = /* @__PURE__ */ Symbol.for("v-fgt");
    un2 = /* @__PURE__ */ Symbol.for("v-txt");
    pn2 = /* @__PURE__ */ Symbol.for("v-cmt");
    dn2 = /* @__PURE__ */ Symbol.for("v-stc");
    fn = [];
    hn2 = null;
    __name(openBlock, "openBlock");
    __name(closeBlock, "closeBlock");
    gn2 = 1;
    __name(setBlockTracking, "setBlockTracking");
    __name(setupBlock, "setupBlock");
    __name(createBlock, "createBlock");
    __name(isVNode$2, "isVNode$2");
    __name(isSameVNodeType, "isSameVNodeType");
    normalizeKey = /* @__PURE__ */ __name(({ key: e9 }) => null != e9 ? e9 : null, "normalizeKey");
    normalizeRef = /* @__PURE__ */ __name(({ ref: e9, ref_key: t5, ref_for: n6 }) => ("number" == typeof e9 && (e9 = "" + e9), null != e9 ? isString(e9) || isRef2(e9) || isFunction(e9) ? { i: bt2, r: e9, k: t5, f: !!n6 } : e9 : null), "normalizeRef");
    __name(createBaseVNode, "createBaseVNode");
    createVNode = /* @__PURE__ */ __name(function(e9, t5 = null, n6 = null, r4 = 0, s6 = null, o5 = false) {
      e9 && e9 !== Jt2 || (e9 = pn2);
      if (isVNode$2(e9)) {
        const r5 = cloneVNode(e9, t5, true);
        return n6 && normalizeChildren(r5, n6), gn2 > 0 && !o5 && hn2 && (6 & r5.shapeFlag ? hn2[hn2.indexOf(e9)] = r5 : hn2.push(r5)), r5.patchFlag = -2, r5;
      }
      i6 = e9, isFunction(i6) && "__vccOpts" in i6 && (e9 = e9.__vccOpts);
      var i6;
      if (t5) {
        t5 = guardReactiveProps(t5);
        let { class: e10, style: n7 } = t5;
        e10 && !isString(e10) && (t5.class = normalizeClass(e10)), isObject(n7) && (isProxy(n7) && !i(n7) && (n7 = n({}, n7)), t5.style = normalizeStyle(n7));
      }
      const a5 = isString(e9) ? 1 : isSuspense(e9) ? 128 : isTeleport(e9) ? 64 : isObject(e9) ? 4 : isFunction(e9) ? 2 : 0;
      return createBaseVNode(e9, t5, n6, r4, s6, a5, o5, true);
    }, "createVNode");
    __name(guardReactiveProps, "guardReactiveProps");
    __name(cloneVNode, "cloneVNode");
    __name(createTextVNode, "createTextVNode");
    __name(createCommentVNode, "createCommentVNode");
    __name(normalizeVNode$1, "normalizeVNode$1");
    __name(cloneIfMounted, "cloneIfMounted");
    __name(normalizeChildren, "normalizeChildren");
    __name(mergeProps, "mergeProps");
    __name(invokeVNodeHook, "invokeVNodeHook");
    mn2 = createAppContext();
    yn2 = 0;
    __name(createComponentInstance$1, "createComponentInstance$1");
    vn2 = null;
    getCurrentInstance = /* @__PURE__ */ __name(() => vn2 || bt2, "getCurrentInstance");
    {
      const e9 = getGlobalThis(), registerGlobalSetter = /* @__PURE__ */ __name((t5, n6) => {
        let r4;
        return (r4 = e9[t5]) || (r4 = e9[t5] = []), r4.push(n6), (e10) => {
          r4.length > 1 ? r4.forEach((t6) => t6(e10)) : r4[0](e10);
        };
      }, "registerGlobalSetter");
      _n2 = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (e10) => vn2 = e10), bn2 = registerGlobalSetter("__VUE_SSR_SETTERS__", (e10) => Sn2 = e10);
    }
    setCurrentInstance = /* @__PURE__ */ __name((e9) => {
      const t5 = vn2;
      return _n2(e9), e9.scope.on(), () => {
        e9.scope.off(), _n2(t5);
      };
    }, "setCurrentInstance");
    unsetCurrentInstance = /* @__PURE__ */ __name(() => {
      vn2 && vn2.scope.off(), _n2(null);
    }, "unsetCurrentInstance");
    __name(isStatefulComponent, "isStatefulComponent");
    Sn2 = false;
    __name(setupComponent$1, "setupComponent$1");
    __name(handleSetupResult, "handleSetupResult");
    __name(finishComponentSetup, "finishComponentSetup");
    wn2 = { get: /* @__PURE__ */ __name((e9, t5) => (track(e9, 0, ""), e9[t5]), "get") };
    __name(createSetupContext, "createSetupContext");
    __name(getComponentPublicInstance, "getComponentPublicInstance");
    __name(getComponentName, "getComponentName");
    computed = /* @__PURE__ */ __name((e9, t5) => {
      const n6 = (function(e10, t6, n7 = false) {
        let r4, s6;
        return isFunction(e10) ? r4 = e10 : (r4 = e10.get, s6 = e10.set), new ComputedRefImpl(r4, s6, n7);
      })(e9, 0, Sn2);
      return n6;
    }, "computed");
    __name(h3, "h");
    __name(isMemoSame, "isMemoSame");
    Rn2 = "3.5.39";
    Tn2 = NOOP;
    An2 = ut2;
    xn2 = vt2;
    setDevtoolsHook = /* @__PURE__ */ __name(function(e9, t5) {
      vt2 = e9, vt2 ? (vt2.enabled = true, _t2.forEach(({ event: e10, args: t6 }) => vt2.emit(e10, ...t6)), _t2 = []) : _t2 = [];
    }, "setDevtoolsHook");
    En2 = { createComponentInstance: createComponentInstance$1, setupComponent: setupComponent$1, renderComponentRoot: renderComponentRoot$1, setCurrentRenderingInstance: setCurrentRenderingInstance$1, isVNode: isVNode$2, normalizeVNode: normalizeVNode$1, getComponentPublicInstance, ensureValidVNode: ensureValidVNode$1, pushWarningContext: /* @__PURE__ */ __name(function(e9) {
      ct2.push(e9);
    }, "pushWarningContext"), popWarningContext: /* @__PURE__ */ __name(function() {
      ct2.pop();
    }, "popWarningContext") };
    $n2 = "undefined" != typeof document ? document : null;
    Pn2 = $n2 && $n2.createElement("template");
    On2 = { insert: /* @__PURE__ */ __name((e9, t5, n6) => {
      t5.insertBefore(e9, n6 || null);
    }, "insert"), remove: /* @__PURE__ */ __name((e9) => {
      const t5 = e9.parentNode;
      t5 && t5.removeChild(e9);
    }, "remove"), createElement: /* @__PURE__ */ __name((e9, t5, n6, r4) => {
      const s6 = "svg" === t5 ? $n2.createElementNS("http://www.w3.org/2000/svg", e9) : "mathml" === t5 ? $n2.createElementNS("http://www.w3.org/1998/Math/MathML", e9) : n6 ? $n2.createElement(e9, { is: n6 }) : $n2.createElement(e9);
      return "select" === e9 && r4 && null != r4.multiple && s6.setAttribute("multiple", r4.multiple), s6;
    }, "createElement"), createText: /* @__PURE__ */ __name((e9) => $n2.createTextNode(e9), "createText"), createComment: /* @__PURE__ */ __name((e9) => $n2.createComment(e9), "createComment"), setText: /* @__PURE__ */ __name((e9, t5) => {
      e9.nodeValue = t5;
    }, "setText"), setElementText: /* @__PURE__ */ __name((e9, t5) => {
      e9.textContent = t5;
    }, "setElementText"), parentNode: /* @__PURE__ */ __name((e9) => e9.parentNode, "parentNode"), nextSibling: /* @__PURE__ */ __name((e9) => e9.nextSibling, "nextSibling"), querySelector: /* @__PURE__ */ __name((e9) => $n2.querySelector(e9), "querySelector"), setScopeId(e9, t5) {
      e9.setAttribute(t5, "");
    }, insertStaticContent(e9, t5, n6, r4, s6, o5) {
      const i6 = n6 ? n6.previousSibling : t5.lastChild;
      if (s6 && (s6 === o5 || s6.nextSibling)) for (; t5.insertBefore(s6.cloneNode(true), n6), s6 !== o5 && (s6 = s6.nextSibling); ) ;
      else {
        Pn2.innerHTML = "svg" === r4 ? `<svg>${e9}</svg>` : "mathml" === r4 ? `<math>${e9}</math>` : e9;
        const s7 = Pn2.content;
        if ("svg" === r4 || "mathml" === r4) {
          const e10 = s7.firstChild;
          for (; e10.firstChild; ) s7.appendChild(e10.firstChild);
          s7.removeChild(e10);
        }
        t5.insertBefore(s7, n6);
      }
      return [i6 ? i6.nextSibling : t5.firstChild, n6 ? n6.previousSibling : t5.lastChild];
    } };
    Nn2 = "transition";
    Hn2 = "animation";
    Mn2 = /* @__PURE__ */ Symbol("_vtc");
    Vn2 = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String };
    Ln2 = n({}, Et2, Vn2);
    Dn2 = ((e9) => (e9.displayName = "Transition", e9.props = Ln2, e9))((e9, { slots: t5 }) => h3($t2, resolveTransitionProps(e9), t5));
    callHook = /* @__PURE__ */ __name((e9, t5 = []) => {
      i(e9) ? e9.forEach((e10) => e10(...t5)) : e9 && e9(...t5);
    }, "callHook");
    hasExplicitCallback = /* @__PURE__ */ __name((e9) => !!e9 && (i(e9) ? e9.some((e10) => e10.length > 1) : e9.length > 1), "hasExplicitCallback");
    __name(resolveTransitionProps, "resolveTransitionProps");
    __name(NumberOf, "NumberOf");
    __name(addTransitionClass, "addTransitionClass");
    __name(removeTransitionClass, "removeTransitionClass");
    __name(nextFrame, "nextFrame");
    In2 = 0;
    __name(whenTransitionEnds, "whenTransitionEnds");
    __name(getTransitionInfo, "getTransitionInfo");
    __name(getTimeout, "getTimeout");
    __name(toMs, "toMs");
    __name(forceReflow, "forceReflow");
    jn2 = /* @__PURE__ */ Symbol("_vod");
    Fn2 = /* @__PURE__ */ Symbol("_vsh");
    Bn2 = { name: "show", beforeMount(e9, { value: t5 }, { transition: n6 }) {
      e9[jn2] = "none" === e9.style.display ? "" : e9.style.display, n6 && t5 ? n6.beforeEnter(e9) : setDisplay(e9, t5);
    }, mounted(e9, { value: t5 }, { transition: n6 }) {
      n6 && t5 && n6.enter(e9);
    }, updated(e9, { value: t5, oldValue: n6 }, { transition: r4 }) {
      !t5 != !n6 && (r4 ? t5 ? (r4.beforeEnter(e9), setDisplay(e9, true), r4.enter(e9)) : r4.leave(e9, () => {
        setDisplay(e9, false);
      }) : setDisplay(e9, t5));
    }, beforeUnmount(e9, { value: t5 }) {
      setDisplay(e9, t5);
    } };
    __name(setDisplay, "setDisplay");
    Un2 = /* @__PURE__ */ Symbol("");
    __name(setVarsOnVNode, "setVarsOnVNode");
    __name(setVarsOnNode, "setVarsOnNode");
    Wn2 = /(?:^|;)\s*display\s*:/;
    zn2 = /\s*!important$/;
    __name(setStyle, "setStyle");
    qn2 = ["Webkit", "Moz", "ms"];
    Kn2 = {};
    __name(shouldPreserveTextareaResizeStyle, "shouldPreserveTextareaResizeStyle");
    Jn2 = "http://www.w3.org/1999/xlink";
    __name(patchAttr, "patchAttr");
    __name(patchDOMProp, "patchDOMProp");
    __name(addEventListener, "addEventListener");
    Gn2 = /* @__PURE__ */ Symbol("_vei");
    __name(patchEvent, "patchEvent");
    Zn2 = /(Once|Passive|Capture)$/;
    Yn2 = /^on:?(?:Once|Passive|Capture)$/;
    Xn2 = 0;
    Qn2 = Promise.resolve();
    getNow = /* @__PURE__ */ __name(() => Xn2 || (Qn2.then(() => Xn2 = 0), Xn2 = Date.now()), "getNow");
    isNativeOn = /* @__PURE__ */ __name((e9) => 111 === e9.charCodeAt(0) && 110 === e9.charCodeAt(1) && e9.charCodeAt(2) > 96 && e9.charCodeAt(2) < 123, "isNativeOn");
    patchProp = /* @__PURE__ */ __name((e9, t5, n6, r4, s6, o5) => {
      const i6 = "svg" === s6;
      "class" === t5 ? (function(e10, t6, n7) {
        const r5 = e10[Mn2];
        r5 && (t6 = (t6 ? [t6, ...r5] : [...r5]).join(" ")), null == t6 ? e10.removeAttribute("class") : n7 ? e10.setAttribute("class", t6) : e10.className = t6;
      })(e9, r4, i6) : "style" === t5 ? (function(e10, t6, n7) {
        const r5 = e10.style, s7 = isString(n7);
        let o6 = false;
        if (n7 && !s7) {
          if (t6) if (isString(t6)) for (const e11 of t6.split(";")) {
            const t7 = e11.slice(0, e11.indexOf(":")).trim();
            null == n7[t7] && setStyle(r5, t7, "");
          }
          else for (const e11 in t6) null == n7[e11] && setStyle(r5, e11, "");
          for (const s8 in n7) {
            "display" === s8 && (o6 = true);
            const i7 = n7[s8];
            null != i7 ? shouldPreserveTextareaResizeStyle(e10, s8, !isString(t6) && t6 ? t6[s8] : void 0, i7) || setStyle(r5, s8, i7) : setStyle(r5, s8, "");
          }
        } else if (s7) {
          if (t6 !== n7) {
            const e11 = r5[Un2];
            e11 && (n7 += ";" + e11), r5.cssText = n7, o6 = Wn2.test(n7);
          }
        } else t6 && e10.removeAttribute("style");
        jn2 in e10 && (e10[jn2] = o6 ? r5.display : "", e10[Fn2] && (r5.display = "none"));
      })(e9, n6, r4) : isOn(t5) ? isModelListener(t5) || patchEvent(e9, t5, 0, r4, o5) : ("." === t5[0] ? (t5 = t5.slice(1), 1) : "^" === t5[0] ? (t5 = t5.slice(1), 0) : (function(e10, t6, n7, r5) {
        if (r5) return "innerHTML" === t6 || "textContent" === t6 || !!(t6 in e10 && isNativeOn(t6) && isFunction(n7));
        if ("spellcheck" === t6 || "draggable" === t6 || "translate" === t6 || "autocorrect" === t6) return false;
        if ("sandbox" === t6 && "IFRAME" === e10.tagName) return false;
        if ("form" === t6) return false;
        if ("list" === t6 && "INPUT" === e10.tagName) return false;
        if ("type" === t6 && "TEXTAREA" === e10.tagName) return false;
        if ("width" === t6 || "height" === t6) {
          const t7 = e10.tagName;
          if ("IMG" === t7 || "VIDEO" === t7 || "CANVAS" === t7 || "SOURCE" === t7) return false;
        }
        if (isNativeOn(t6) && isString(n7)) return false;
        return t6 in e10;
      })(e9, t5, r4, i6)) ? (patchDOMProp(e9, t5, r4), e9.tagName.includes("-") || "value" !== t5 && "checked" !== t5 && "selected" !== t5 || patchAttr(e9, t5, r4, i6, 0, "value" !== t5)) : e9._isVueCE && ((function(e10, t6) {
        const n7 = e10._def.props;
        if (!n7) return false;
        const r5 = p(t6);
        return Array.isArray(n7) ? n7.some((e11) => p(e11) === r5) : Object.keys(n7).some((e11) => p(e11) === r5);
      })(e9, t5) || e9._def.__asyncLoader && (/[A-Z]/.test(t5) || !isString(r4))) ? patchDOMProp(e9, p(t5), r4, 0, t5) : ("true-value" === t5 ? e9._trueValue = r4 : "false-value" === t5 && (e9._falseValue = r4), patchAttr(e9, t5, r4, i6));
    }, "patchProp");
    er2 = {};
    __name(defineCustomElement, "defineCustomElement");
    tr2 = "undefined" != typeof HTMLElement ? HTMLElement : class {
    };
    VueElement = class _VueElement extends tr2 {
      static {
        __name(this, "VueElement");
      }
      constructor(e9, t5 = {}, n6 = createApp) {
        super(), this._def = e9, this._props = t5, this._createApp = n6, this._isVueCE = true, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = false, this._resolved = false, this._patching = false, this._dirty = false, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n6 !== createApp ? this._root = this.shadowRoot : false !== e9.shadowRoot ? (this.attachShadow(n({}, e9.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot) : this._root = this;
      }
      connectedCallback() {
        if (!this.isConnected) return;
        this.shadowRoot || this._resolved || this._parseSlots(), this._connected = true;
        let e9 = this;
        for (; e9 = e9 && (e9.assignedSlot || e9.parentNode || e9.host); ) if (e9 instanceof _VueElement) {
          this._parent = e9;
          break;
        }
        this._instance || (this._resolved ? this._mount(this._def) : e9 && e9._pendingResolve ? this._pendingResolve = e9._pendingResolve.then(() => {
          this._pendingResolve = void 0, this._resolveDef();
        }) : this._resolveDef());
      }
      _setParent(e9 = this._parent) {
        e9 && (this._instance.parent = e9._instance, this._inheritParentContext(e9));
      }
      _inheritParentContext(e9 = this._parent) {
        e9 && this._app && Object.setPrototypeOf(this._app._context.provides, e9._instance.provides);
      }
      disconnectedCallback() {
        this._connected = false, nextTick(() => {
          this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
        });
      }
      _processMutations(e9) {
        for (const t5 of e9) this._setAttr(t5.attributeName);
      }
      _resolveDef() {
        if (this._pendingResolve) return;
        for (let e10 = 0; e10 < this.attributes.length; e10++) this._setAttr(this.attributes[e10].name);
        this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: true });
        const resolve2 = /* @__PURE__ */ __name((e10, t5 = false) => {
          this._resolved = true, this._pendingResolve = void 0;
          const { props: n6, styles: r4 } = e10;
          let s6;
          if (n6 && !i(n6)) for (const e11 in n6) {
            const t6 = n6[e11];
            (t6 === Number || t6 && t6.type === Number) && (e11 in this._props && (this._props[e11] = toNumber(this._props[e11])), (s6 || (s6 = /* @__PURE__ */ Object.create(null)))[p(e11)] = true);
          }
          this._numberProps = s6, this._resolveProps(e10), this.shadowRoot && this._applyStyles(r4), this._mount(e10);
        }, "resolve"), e9 = this._def.__asyncLoader;
        e9 ? this._pendingResolve = e9().then((e10) => {
          e10.configureApp = this._def.configureApp, resolve2(this._def = e10, true);
        }) : resolve2(this._def);
      }
      _mount(e9) {
        this._app = this._createApp(e9), this._inheritParentContext(), e9.configureApp && e9.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
        const t5 = this._instance && this._instance.exposed;
        if (t5) for (const e10 in t5) hasOwn(this, e10) || Object.defineProperty(this, e10, { get: /* @__PURE__ */ __name(() => unref(t5[e10]), "get") });
      }
      _resolveProps(e9) {
        const { props: t5 } = e9, n6 = i(t5) ? t5 : Object.keys(t5 || {});
        for (const e10 of Object.keys(this)) "_" !== e10[0] && n6.includes(e10) && this._setProp(e10, this[e10]);
        for (const e10 of n6.map(p)) Object.defineProperty(this, e10, { get() {
          return this._getProp(e10);
        }, set(t6) {
          this._setProp(e10, t6, true, !this._patching);
        } });
      }
      _setAttr(e9) {
        if (e9.startsWith("data-v-")) return;
        const t5 = this.hasAttribute(e9);
        let n6 = t5 ? this.getAttribute(e9) : er2;
        const r4 = p(e9);
        t5 && this._numberProps && this._numberProps[r4] && (n6 = toNumber(n6)), this._setProp(r4, n6, false, true);
      }
      _getProp(e9) {
        return this._props[e9];
      }
      _setProp(e9, t5, n6 = true, r4 = false) {
        if (t5 !== this._props[e9] && (this._dirty = true, t5 === er2 ? delete this._props[e9] : (this._props[e9] = t5, "key" === e9 && this._app && (this._app._ceVNode.key = t5)), r4 && this._instance && this._update(), n6)) {
          const n7 = this._ob;
          n7 && (this._processMutations(n7.takeRecords()), n7.disconnect()), true === t5 ? this.setAttribute(d(e9), "") : "string" == typeof t5 || "number" == typeof t5 ? this.setAttribute(d(e9), t5 + "") : t5 || this.removeAttribute(d(e9)), n7 && n7.observe(this, { attributes: true });
        }
      }
      _update() {
        const e9 = this._createVNode();
        this._app && (e9.appContext = this._app._context), render(e9, this._root);
      }
      _createVNode() {
        const e9 = {};
        this.shadowRoot || (e9.onVnodeMounted = e9.onVnodeUpdated = this._renderSlots.bind(this));
        const t5 = createVNode(this._def, n(e9, this._props));
        return this._instance || (t5.ce = (e10) => {
          this._instance = e10, e10.ce = this, e10.isCE = true;
          const dispatch = /* @__PURE__ */ __name((e11, t6) => {
            this.dispatchEvent(new CustomEvent(e11, isPlainObject(t6[0]) ? n({ detail: t6 }, t6[0]) : { detail: t6 }));
          }, "dispatch");
          e10.emit = (e11, ...t6) => {
            dispatch(e11, t6), d(e11) !== e11 && dispatch(d(e11), t6);
          }, this._setParent();
        }), t5;
      }
      _applyStyles(e9, t5, n6) {
        if (!e9) return;
        if (t5) {
          if (t5 === this._def || this._styleChildren.has(t5)) return;
          this._styleChildren.add(t5);
        }
        const r4 = this._nonce, s6 = this.shadowRoot, o5 = n6 ? this._getStyleAnchor(n6) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(s6);
        let i6 = null;
        for (let a5 = e9.length - 1; a5 >= 0; a5--) {
          const l4 = document.createElement("style");
          r4 && l4.setAttribute("nonce", r4), l4.textContent = e9[a5], s6.insertBefore(l4, i6 || o5), i6 = l4, 0 === a5 && (n6 || this._styleAnchors.set(this._def, l4), t5 && this._styleAnchors.set(t5, l4));
        }
      }
      _getStyleAnchor(e9) {
        if (!e9) return null;
        const t5 = this._styleAnchors.get(e9);
        return t5 && t5.parentNode === this.shadowRoot ? t5 : (t5 && this._styleAnchors.delete(e9), null);
      }
      _getRootStyleInsertionAnchor(e9) {
        for (let t5 = 0; t5 < e9.childNodes.length; t5++) {
          const n6 = e9.childNodes[t5];
          if (!(n6 instanceof HTMLStyleElement)) return n6;
        }
        return null;
      }
      _parseSlots() {
        const e9 = this._slots = {};
        let t5;
        for (; t5 = this.firstChild; ) {
          const n6 = 1 === t5.nodeType && t5.getAttribute("slot") || "default";
          (e9[n6] || (e9[n6] = [])).push(t5), this.removeChild(t5);
        }
      }
      _renderSlots() {
        const e9 = this._getSlots(), t5 = this._instance.type.__scopeId;
        for (let n6 = 0; n6 < e9.length; n6++) {
          const r4 = e9[n6], s6 = r4.getAttribute("name") || "default", o5 = this._slots[s6], i6 = r4.parentNode;
          if (o5) for (const e10 of o5) {
            if (t5 && 1 === e10.nodeType) {
              const n7 = t5 + "-s", r5 = document.createTreeWalker(e10, 1);
              let s7;
              for (e10.setAttribute(n7, ""); s7 = r5.nextNode(); ) s7.setAttribute(n7, "");
            }
            i6.insertBefore(e10, r4);
          }
          else for (; r4.firstChild; ) i6.insertBefore(r4.firstChild, r4);
          i6.removeChild(r4);
        }
      }
      _getSlots() {
        const e9 = [this];
        this._teleportTargets && e9.push(...this._teleportTargets);
        const t5 = /* @__PURE__ */ new Set();
        for (const n6 of e9) {
          const e10 = n6.querySelectorAll("slot");
          for (let n7 = 0; n7 < e10.length; n7++) t5.add(e10[n7]);
        }
        return Array.from(t5);
      }
      _injectChildStyle(e9, t5) {
        this._applyStyles(e9.styles, e9, t5);
      }
      _beginPatch() {
        this._patching = true, this._dirty = false;
      }
      _endPatch() {
        this._patching = false, this._dirty && this._instance && this._update();
      }
      _hasShadowRoot() {
        return false !== this._def.shadowRoot;
      }
      _removeChildStyle(e9) {
      }
    };
    __name(useHost, "useHost");
    nr2 = /* @__PURE__ */ new WeakMap();
    rr2 = /* @__PURE__ */ new WeakMap();
    sr2 = /* @__PURE__ */ Symbol("_moveCb");
    or2 = /* @__PURE__ */ Symbol("_enterCb");
    ir2 = ((e9) => (delete e9.props.mode, e9))({ name: "TransitionGroup", props: n({}, Ln2, { tag: String, moveClass: String }), setup(e9, { slots: t5 }) {
      const n6 = getCurrentInstance(), r4 = useTransitionState();
      let s6, o5;
      return Ft2(() => {
        if (!s6.length) return;
        const t6 = e9.moveClass || `${e9.name || "v"}-move`;
        if (!(function(e10, t7, n7) {
          const r6 = e10.cloneNode(), s7 = e10[Mn2];
          s7 && s7.forEach((e11) => {
            e11.split(/\s+/).forEach((e12) => e12 && r6.classList.remove(e12));
          });
          n7.split(/\s+/).forEach((e11) => e11 && r6.classList.add(e11)), r6.style.display = "none";
          const o6 = 1 === t7.nodeType ? t7 : t7.parentNode;
          o6.appendChild(r6);
          const { hasTransform: i6 } = getTransitionInfo(r6);
          return o6.removeChild(r6), i6;
        })(s6[0].el, n6.vnode.el, t6)) return void (s6 = []);
        s6.forEach(callPendingCbs), s6.forEach(recordPosition);
        const r5 = s6.filter(applyTranslation);
        forceReflow(n6.vnode.el), r5.forEach((e10) => {
          const n7 = e10.el, r6 = n7.style;
          addTransitionClass(n7, t6), r6.transform = r6.webkitTransform = r6.transitionDuration = "";
          const s7 = n7[sr2] = (e11) => {
            e11 && e11.target !== n7 || e11 && !e11.propertyName.endsWith("transform") || (n7.removeEventListener("transitionend", s7), n7[sr2] = null, removeTransitionClass(n7, t6));
          };
          n7.addEventListener("transitionend", s7);
        }), s6 = [];
      }), () => {
        const i6 = toRaw(e9), a5 = resolveTransitionProps(i6);
        let l4 = i6.tag || cn2;
        if (s6 = [], o5) for (let e10 = 0; e10 < o5.length; e10++) {
          const t6 = o5[e10];
          t6.el && t6.el instanceof Element && !t6.el[Fn2] && (s6.push(t6), setTransitionHooks(t6, resolveTransitionHooks(t6, a5, r4, n6)), nr2.set(t6, getPosition(t6.el)));
        }
        o5 = t5.default ? getTransitionRawChildren(t5.default()) : [];
        for (let e10 = 0; e10 < o5.length; e10++) {
          const t6 = o5[e10];
          null != t6.key && setTransitionHooks(t6, resolveTransitionHooks(t6, a5, r4, n6));
        }
        return createVNode(l4, null, o5);
      };
    } });
    __name(callPendingCbs, "callPendingCbs");
    __name(recordPosition, "recordPosition");
    __name(applyTranslation, "applyTranslation");
    __name(getPosition, "getPosition");
    getModelAssigner = /* @__PURE__ */ __name((e9) => {
      const t5 = e9.props["onUpdate:modelValue"] || false;
      return i(t5) ? (e10) => invokeArrayFns(t5, e10) : t5;
    }, "getModelAssigner");
    __name(onCompositionStart, "onCompositionStart");
    __name(onCompositionEnd, "onCompositionEnd");
    ar2 = /* @__PURE__ */ Symbol("_assign");
    __name(castValue, "castValue");
    lr2 = { created(e9, { modifiers: { lazy: t5, trim: n6, number: r4 } }, s6) {
      e9[ar2] = getModelAssigner(s6);
      const o5 = r4 || s6.props && "number" === s6.props.type;
      addEventListener(e9, t5 ? "change" : "input", (t6) => {
        t6.target.composing || e9[ar2](castValue(e9.value, n6, o5));
      }), (n6 || o5) && addEventListener(e9, "change", () => {
        e9.value = castValue(e9.value, n6, o5);
      }), t5 || (addEventListener(e9, "compositionstart", onCompositionStart), addEventListener(e9, "compositionend", onCompositionEnd), addEventListener(e9, "change", onCompositionEnd));
    }, mounted(e9, { value: t5 }) {
      e9.value = null == t5 ? "" : t5;
    }, beforeUpdate(e9, { value: t5, oldValue: n6, modifiers: { lazy: r4, trim: s6, number: o5 } }, i6) {
      if (e9[ar2] = getModelAssigner(i6), e9.composing) return;
      const a5 = null == t5 ? "" : t5;
      if ((!o5 && "number" !== e9.type || /^0\d/.test(e9.value) ? e9.value : looseToNumber(e9.value)) === a5) return;
      const l4 = e9.getRootNode();
      if ((l4 instanceof Document || l4 instanceof ShadowRoot) && l4.activeElement === e9 && "range" !== e9.type) {
        if (r4 && t5 === n6) return;
        if (s6 && e9.value.trim() === a5) return;
      }
      e9.value = a5;
    } };
    cr2 = { deep: true, created(e9, t5, n6) {
      e9[ar2] = getModelAssigner(n6), addEventListener(e9, "change", () => {
        const t6 = e9._modelValue, n7 = getValue(e9), r4 = e9.checked, s6 = e9[ar2];
        if (i(t6)) {
          const e10 = looseIndexOf(t6, n7), o5 = -1 !== e10;
          if (r4 && !o5) s6(t6.concat(n7));
          else if (!r4 && o5) {
            const n8 = [...t6];
            n8.splice(e10, 1), s6(n8);
          }
        } else if (isSet(t6)) {
          const e10 = new Set(t6);
          r4 ? e10.add(n7) : e10.delete(n7), s6(e10);
        } else s6(getCheckboxValue(e9, r4));
      });
    }, mounted: setChecked, beforeUpdate(e9, t5, n6) {
      e9[ar2] = getModelAssigner(n6), setChecked(e9, t5, n6);
    } };
    __name(setChecked, "setChecked");
    ur2 = { created(e9, { value: t5 }, n6) {
      e9.checked = looseEqual(t5, n6.props.value), e9[ar2] = getModelAssigner(n6), addEventListener(e9, "change", () => {
        e9[ar2](getValue(e9));
      });
    }, beforeUpdate(e9, { value: t5, oldValue: n6 }, r4) {
      e9[ar2] = getModelAssigner(r4), t5 !== n6 && (e9.checked = looseEqual(t5, r4.props.value));
    } };
    pr2 = { deep: true, created(e9, { value: t5, modifiers: { number: n6 } }, r4) {
      const s6 = isSet(t5);
      addEventListener(e9, "change", () => {
        const t6 = Array.prototype.filter.call(e9.options, (e10) => e10.selected).map((e10) => n6 ? looseToNumber(getValue(e10)) : getValue(e10));
        e9[ar2](e9.multiple ? s6 ? new Set(t6) : t6 : t6[0]), e9._assigning = true, nextTick(() => {
          e9._assigning = false;
        });
      }), e9[ar2] = getModelAssigner(r4);
    }, mounted(e9, { value: t5 }) {
      setSelected(e9, t5);
    }, beforeUpdate(e9, t5, n6) {
      e9[ar2] = getModelAssigner(n6);
    }, updated(e9, { value: t5 }) {
      e9._assigning || setSelected(e9, t5);
    } };
    __name(setSelected, "setSelected");
    __name(getValue, "getValue");
    __name(getCheckboxValue, "getCheckboxValue");
    dr2 = { created(e9, t5, n6) {
      callModelHook(e9, t5, n6, null, "created");
    }, mounted(e9, t5, n6) {
      callModelHook(e9, t5, n6, null, "mounted");
    }, beforeUpdate(e9, t5, n6, r4) {
      callModelHook(e9, t5, n6, r4, "beforeUpdate");
    }, updated(e9, t5, n6, r4) {
      callModelHook(e9, t5, n6, r4, "updated");
    } };
    __name(resolveDynamicModel, "resolveDynamicModel");
    __name(callModelHook, "callModelHook");
    fr2 = ["ctrl", "shift", "alt", "meta"];
    hr2 = { stop: /* @__PURE__ */ __name((e9) => e9.stopPropagation(), "stop"), prevent: /* @__PURE__ */ __name((e9) => e9.preventDefault(), "prevent"), self: /* @__PURE__ */ __name((e9) => e9.target !== e9.currentTarget, "self"), ctrl: /* @__PURE__ */ __name((e9) => !e9.ctrlKey, "ctrl"), shift: /* @__PURE__ */ __name((e9) => !e9.shiftKey, "shift"), alt: /* @__PURE__ */ __name((e9) => !e9.altKey, "alt"), meta: /* @__PURE__ */ __name((e9) => !e9.metaKey, "meta"), left: /* @__PURE__ */ __name((e9) => "button" in e9 && 0 !== e9.button, "left"), middle: /* @__PURE__ */ __name((e9) => "button" in e9 && 1 !== e9.button, "middle"), right: /* @__PURE__ */ __name((e9) => "button" in e9 && 2 !== e9.button, "right"), exact: /* @__PURE__ */ __name((e9, t5) => fr2.some((n6) => e9[`${n6}Key`] && !t5.includes(n6)), "exact") };
    gr2 = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" };
    mr2 = n({ patchProp }, On2);
    vr2 = false;
    __name(ensureRenderer, "ensureRenderer");
    __name(ensureHydrationRenderer, "ensureHydrationRenderer");
    render = /* @__PURE__ */ __name((...e9) => {
      ensureRenderer().render(...e9);
    }, "render");
    createApp = /* @__PURE__ */ __name((...e9) => {
      const t5 = ensureRenderer().createApp(...e9), { mount: n6 } = t5;
      return t5.mount = (e10) => {
        const r4 = normalizeContainer(e10);
        if (!r4) return;
        const s6 = t5._component;
        isFunction(s6) || s6.render || s6.template || (s6.template = r4.innerHTML), 1 === r4.nodeType && (r4.textContent = "");
        const o5 = n6(r4, false, resolveRootNamespace(r4));
        return r4 instanceof Element && (r4.removeAttribute("v-cloak"), r4.setAttribute("data-v-app", "")), o5;
      }, t5;
    }, "createApp");
    createSSRApp = /* @__PURE__ */ __name((...e9) => {
      const t5 = ensureHydrationRenderer().createApp(...e9), { mount: n6 } = t5;
      return t5.mount = (e10) => {
        const t6 = normalizeContainer(e10);
        if (t6) return n6(t6, true, resolveRootNamespace(t6));
      }, t5;
    }, "createSSRApp");
    __name(resolveRootNamespace, "resolveRootNamespace");
    __name(normalizeContainer, "normalizeContainer");
    _r2 = false;
    initDirectivesForSSR = /* @__PURE__ */ __name(() => {
      _r2 || (_r2 = true, lr2.getSSRProps = ({ value: e9 }) => ({ value: e9 }), ur2.getSSRProps = ({ value: e9 }, t5) => {
        if (t5.props && looseEqual(t5.props.value, e9)) return { checked: true };
      }, cr2.getSSRProps = ({ value: e9 }, t5) => {
        if (i(e9)) {
          if (t5.props && looseIndexOf(e9, t5.props.value) > -1) return { checked: true };
        } else if (isSet(e9)) {
          if (t5.props && e9.has(t5.props.value)) return { checked: true };
        } else if (e9) return { checked: true };
      }, dr2.getSSRProps = (e9, t5) => {
        if ("string" != typeof t5.type) return;
        const n6 = resolveDynamicModel(t5.type.toUpperCase(), t5.props && t5.props.type);
        return n6.getSSRProps ? n6.getSSRProps(e9, t5) : void 0;
      }, Bn2.getSSRProps = ({ value: e9 }) => {
        if (!e9) return { style: { display: "none" } };
      });
    }, "initDirectivesForSSR");
    br = Object.freeze(Object.defineProperty({ __proto__: null, BaseTransition: $t2, BaseTransitionPropsValidators: Et2, Comment: pn2, DeprecationTypes: null, EffectScope, ErrorCodes: { SETUP_FUNCTION: 0, 0: "SETUP_FUNCTION", RENDER_FUNCTION: 1, 1: "RENDER_FUNCTION", NATIVE_EVENT_HANDLER: 5, 5: "NATIVE_EVENT_HANDLER", COMPONENT_EVENT_HANDLER: 6, 6: "COMPONENT_EVENT_HANDLER", VNODE_HOOK: 7, 7: "VNODE_HOOK", DIRECTIVE_HOOK: 8, 8: "DIRECTIVE_HOOK", TRANSITION_HOOK: 9, 9: "TRANSITION_HOOK", APP_ERROR_HANDLER: 10, 10: "APP_ERROR_HANDLER", APP_WARN_HANDLER: 11, 11: "APP_WARN_HANDLER", FUNCTION_REF: 12, 12: "FUNCTION_REF", ASYNC_COMPONENT_LOADER: 13, 13: "ASYNC_COMPONENT_LOADER", SCHEDULER: 14, 14: "SCHEDULER", COMPONENT_UPDATE: 15, 15: "COMPONENT_UPDATE", APP_UNMOUNT_CLEANUP: 16, 16: "APP_UNMOUNT_CLEANUP" }, ErrorTypeStrings: An2, Fragment: cn2, KeepAlive: Lt2, ReactiveEffect, Static: dn2, Suspense: ln2, Teleport: Rt2, Text: un2, TrackOpTypes: { GET: "get", HAS: "has", ITERATE: "iterate" }, Transition: Dn2, TransitionGroup: ir2, TriggerOpTypes: { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" }, VueElement, assertNumber: /* @__PURE__ */ __name(function(e9, t5) {
    }, "assertNumber"), callWithAsyncErrorHandling, callWithErrorHandling, camelize: p, capitalize: f, cloneVNode, compatUtils: null, computed, createApp, createBlock, createCommentVNode, createElementBlock: /* @__PURE__ */ __name(function(e9, t5, n6, r4, s6, o5) {
      return setupBlock(createBaseVNode(e9, t5, n6, r4, s6, o5, true));
    }, "createElementBlock"), createElementVNode: createBaseVNode, createHydrationRenderer, createPropsRestProxy: /* @__PURE__ */ __name(function(e9, t5) {
      const n6 = {};
      for (const r4 in e9) t5.includes(r4) || Object.defineProperty(n6, r4, { enumerable: true, get: /* @__PURE__ */ __name(() => e9[r4], "get") });
      return n6;
    }, "createPropsRestProxy"), createRenderer, createSSRApp, createSlots: /* @__PURE__ */ __name(function(e9, t5) {
      for (let n6 = 0; n6 < t5.length; n6++) {
        const r4 = t5[n6];
        if (i(r4)) for (let t6 = 0; t6 < r4.length; t6++) e9[r4[t6].name] = r4[t6].fn;
        else r4 && (e9[r4.name] = r4.key ? (...e10) => {
          const t6 = r4.fn(...e10);
          return t6 && (t6.key = r4.key), t6;
        } : r4.fn);
      }
      return e9;
    }, "createSlots"), createStaticVNode: /* @__PURE__ */ __name(function(e9, t5) {
      const n6 = createVNode(dn2, null, e9);
      return n6.staticCount = t5, n6;
    }, "createStaticVNode"), createTextVNode, createVNode, customRef, defineAsyncComponent: /* @__PURE__ */ __name(function(e9) {
      isFunction(e9) && (e9 = { loader: e9 });
      const { loader: t5, loadingComponent: n6, errorComponent: r4, delay: s6 = 200, hydrate: o5, timeout: i6, suspensible: a5 = true, onError: l4 } = e9;
      let c4, u6 = null, p6 = 0;
      const load = /* @__PURE__ */ __name(() => {
        let e10;
        return u6 || (e10 = u6 = t5().catch((e11) => {
          if (e11 = e11 instanceof Error ? e11 : new Error(String(e11)), l4) return new Promise((t6, n7) => {
            l4(e11, () => t6((p6++, u6 = null, load())), () => n7(e11), p6 + 1);
          });
          throw e11;
        }).then((t6) => e10 !== u6 && u6 ? u6 : (t6 && (t6.__esModule || "Module" === t6[Symbol.toStringTag]) && (t6 = t6.default), c4 = t6, t6)));
      }, "load");
      return defineComponent({ name: "AsyncComponentWrapper", __asyncLoader: load, __asyncHydrate(e10, t6, n7) {
        let r5 = false;
        (t6.bu || (t6.bu = [])).push(() => r5 = true);
        const performHydrate = /* @__PURE__ */ __name(() => {
          r5 || n7();
        }, "performHydrate"), s7 = o5 ? () => {
          const n8 = o5(performHydrate, (t7) => (function(e11, t8) {
            if (isComment(e11) && "[" === e11.data) {
              let n9 = 1, r6 = e11.nextSibling;
              for (; r6; ) {
                if (1 === r6.nodeType) {
                  if (false === t8(r6)) break;
                } else if (isComment(r6)) if ("]" === r6.data) {
                  if (0 === --n9) break;
                } else "[" === r6.data && n9++;
                r6 = r6.nextSibling;
              }
            } else t8(e11);
          })(e10, t7));
          n8 && (t6.bum || (t6.bum = [])).push(n8);
        } : performHydrate;
        c4 ? s7() : load().then(() => !t6.isUnmounted && s7());
      }, get __asyncResolved() {
        return c4;
      }, setup() {
        const e10 = vn2;
        if (markAsyncBoundary(e10), c4) return () => createInnerComp(c4, e10);
        const onError = /* @__PURE__ */ __name((t7) => {
          u6 = null, handleError(t7, e10, 13, !r4);
        }, "onError");
        if (a5 && e10.suspense || Sn2) return load().then((t7) => () => createInnerComp(t7, e10)).catch((e11) => (onError(e11), () => r4 ? createVNode(r4, { error: e11 }) : null));
        const t6 = ref(false), o6 = ref(), l5 = ref(!!s6);
        let p7, d5;
        return Ut2(() => {
          null != p7 && clearTimeout(p7), null != d5 && clearTimeout(d5);
        }), s6 && (d5 = setTimeout(() => {
          e10.isUnmounted || (l5.value = false);
        }, s6)), null != i6 && (p7 = setTimeout(() => {
          if (!e10.isUnmounted && !t6.value && !o6.value) {
            const e11 = new Error(`Async component timed out after ${i6}ms.`);
            onError(e11), o6.value = e11;
          }
        }, i6)), load().then(() => {
          e10.isUnmounted || (t6.value = true, e10.parent && isKeepAlive(e10.parent.vnode) && e10.parent.update());
        }).catch((t7) => {
          e10.isUnmounted ? u6 = null : (onError(t7), o6.value = t7);
        }), () => t6.value && c4 ? createInnerComp(c4, e10) : o6.value && r4 ? createVNode(r4, { error: o6.value }) : n6 && !l5.value ? createInnerComp(n6, e10) : void 0;
      } });
    }, "defineAsyncComponent"), defineComponent, defineCustomElement, defineEmits: /* @__PURE__ */ __name(function() {
      return null;
    }, "defineEmits"), defineExpose: /* @__PURE__ */ __name(function(e9) {
    }, "defineExpose"), defineModel: /* @__PURE__ */ __name(function() {
    }, "defineModel"), defineOptions: /* @__PURE__ */ __name(function(e9) {
    }, "defineOptions"), defineProps: /* @__PURE__ */ __name(function() {
      return null;
    }, "defineProps"), defineSSRCustomElement: /* @__PURE__ */ __name((e9, t5) => defineCustomElement(e9, t5, createSSRApp), "defineSSRCustomElement"), defineSlots: /* @__PURE__ */ __name(function() {
      return null;
    }, "defineSlots"), devtools: xn2, effect: /* @__PURE__ */ __name(function(e9, t5) {
      e9.effect instanceof ReactiveEffect && (e9 = e9.effect.fn);
      const n6 = new ReactiveEffect(e9);
      t5 && n(n6, t5);
      try {
        n6.run();
      } catch (e10) {
        throw n6.stop(), e10;
      }
      const r4 = n6.run.bind(n6);
      return r4.effect = n6, r4;
    }, "effect"), effectScope, getCurrentInstance, getCurrentScope, getCurrentWatcher: /* @__PURE__ */ __name(function() {
      return lt2;
    }, "getCurrentWatcher"), getTransitionRawChildren, guardReactiveProps, h: h3, handleError, hasInjectionContext, hydrate: /* @__PURE__ */ __name((...e9) => {
      ensureHydrationRenderer().hydrate(...e9);
    }, "hydrate"), hydrateOnIdle: /* @__PURE__ */ __name((e9 = 1e4) => (t5) => {
      const n6 = Mt2(t5, { timeout: e9 });
      return () => Vt2(n6);
    }, "hydrateOnIdle"), hydrateOnInteraction: /* @__PURE__ */ __name((e9 = []) => (t5, n6) => {
      isString(e9) && (e9 = [e9]);
      let r4 = false;
      const doHydrate = /* @__PURE__ */ __name((e10) => {
        r4 || (r4 = true, teardown(), t5(), e10.target.dispatchEvent(new e10.constructor(e10.type, e10)));
      }, "doHydrate"), teardown = /* @__PURE__ */ __name(() => {
        n6((t6) => {
          for (const n7 of e9) t6.removeEventListener(n7, doHydrate);
        });
      }, "teardown");
      return n6((t6) => {
        for (const n7 of e9) t6.addEventListener(n7, doHydrate, { once: true });
      }), teardown;
    }, "hydrateOnInteraction"), hydrateOnMediaQuery: /* @__PURE__ */ __name((e9) => (t5) => {
      if (e9) {
        const n6 = matchMedia(e9);
        if (!n6.matches) return n6.addEventListener("change", t5, { once: true }), () => n6.removeEventListener("change", t5);
        t5();
      }
    }, "hydrateOnMediaQuery"), hydrateOnVisible: /* @__PURE__ */ __name((e9) => (t5, n6) => {
      const r4 = new IntersectionObserver((e10) => {
        for (const n7 of e10) if (n7.isIntersecting) {
          r4.disconnect(), t5();
          break;
        }
      }, e9);
      return n6((e10) => {
        if (e10 instanceof Element) return (function(e11) {
          const { top: t6, left: n7, bottom: r5, right: s6 } = e11.getBoundingClientRect(), { innerHeight: o5, innerWidth: i6 } = window;
          return (t6 > 0 && t6 < o5 || r5 > 0 && r5 < o5) && (n7 > 0 && n7 < i6 || s6 > 0 && s6 < i6);
        })(e10) ? (t5(), r4.disconnect(), false) : void r4.observe(e10);
      }), () => r4.disconnect();
    }, "hydrateOnVisible"), initCustomFormatter: /* @__PURE__ */ __name(function() {
    }, "initCustomFormatter"), initDirectivesForSSR, inject, isMemoSame, isProxy, isReactive, isReadonly, isRef: isRef2, isRuntimeOnly: /* @__PURE__ */ __name(() => !kn2, "isRuntimeOnly"), isShallow, isVNode: isVNode$2, markRaw, mergeDefaults: /* @__PURE__ */ __name(function(e9, t5) {
      const n6 = normalizePropsOrEmits(e9);
      for (const e10 in t5) {
        if (e10.startsWith("__skip")) continue;
        let r4 = n6[e10];
        r4 ? i(r4) || isFunction(r4) ? r4 = n6[e10] = { type: r4, default: t5[e10] } : r4.default = t5[e10] : null === r4 && (r4 = n6[e10] = { default: t5[e10] }), r4 && t5[`__skip_${e10}`] && (r4.skipFactory = true);
      }
      return n6;
    }, "mergeDefaults"), mergeModels: /* @__PURE__ */ __name(function(e9, t5) {
      return e9 && t5 ? i(e9) && i(t5) ? e9.concat(t5) : n({}, normalizePropsOrEmits(e9), normalizePropsOrEmits(t5)) : e9 || t5;
    }, "mergeModels"), mergeProps, nextTick, nodeOps: On2, normalizeClass, normalizeProps, normalizeStyle, onActivated, onBeforeMount: Dt2, onBeforeUnmount: Bt2, onBeforeUpdate: jt2, onDeactivated, onErrorCaptured, onMounted: It2, onRenderTracked: qt2, onRenderTriggered: zt2, onScopeDispose, onServerPrefetch: Wt2, onUnmounted: Ut2, onUpdated: Ft2, onWatcherCleanup, openBlock, patchProp, popScopeId: /* @__PURE__ */ __name(function() {
      kt2 = null;
    }, "popScopeId"), provide, proxyRefs, pushScopeId: /* @__PURE__ */ __name(function(e9) {
      kt2 = e9;
    }, "pushScopeId"), queuePostFlushCb, reactive, readonly, ref, registerRuntimeCompiler: /* @__PURE__ */ __name(function(e9) {
      kn2 = e9, Cn2 = /* @__PURE__ */ __name((e10) => {
        e10.render._rc && (e10.withProxy = new Proxy(e10.ctx, Yt2));
      }, "Cn");
    }, "registerRuntimeCompiler"), render, renderList: /* @__PURE__ */ __name(function(e9, t5, n6, r4) {
      let s6;
      const o5 = n6 && n6[r4], i6 = i(e9);
      if (i6 || isString(e9)) {
        let n7 = false, r5 = false;
        i6 && isReactive(e9) && (n7 = !isShallow(e9), r5 = isReadonly(e9), e9 = shallowReadArray(e9)), s6 = new Array(e9.length);
        for (let i7 = 0, a5 = e9.length; i7 < a5; i7++) s6[i7] = t5(n7 ? r5 ? toReadonly(toReactive(e9[i7])) : toReactive(e9[i7]) : e9[i7], i7, void 0, o5 && o5[i7]);
      } else if ("number" == typeof e9) {
        s6 = new Array(e9);
        for (let n7 = 0; n7 < e9; n7++) s6[n7] = t5(n7 + 1, n7, void 0, o5 && o5[n7]);
      } else if (isObject(e9)) if (e9[Symbol.iterator]) s6 = Array.from(e9, (e10, n7) => t5(e10, n7, void 0, o5 && o5[n7]));
      else {
        const n7 = Object.keys(e9);
        s6 = new Array(n7.length);
        for (let r5 = 0, i7 = n7.length; r5 < i7; r5++) {
          const i8 = n7[r5];
          s6[r5] = t5(e9[i8], i8, r5, o5 && o5[r5]);
        }
      }
      else s6 = [];
      return n6 && (n6[r4] = s6), s6;
    }, "renderList"), renderSlot: /* @__PURE__ */ __name(function(e9, t5, n6 = {}, r4, s6) {
      if (bt2.ce || bt2.parent && isAsyncWrapper(bt2.parent) && bt2.parent.ce) {
        const e10 = Object.keys(n6).length > 0;
        return "default" !== t5 && (n6.name = t5), openBlock(), createBlock(cn2, null, [createVNode("slot", n6, r4 && r4())], e10 ? -2 : 64);
      }
      let o5 = e9[t5];
      o5 && o5._c && (o5._d = false), openBlock();
      const i6 = o5 && ensureValidVNode$1(o5(n6)), a5 = n6.key || i6 && i6.key, l4 = createBlock(cn2, { key: (a5 && !isSymbol(a5) ? a5 : `_${t5}`) + (!i6 && r4 ? "_fb" : "") }, i6 || (r4 ? r4() : []), i6 && 1 === e9._ ? 64 : -2);
      return !s6 && l4.scopeId && (l4.slotScopeIds = [l4.scopeId + "-s"]), o5 && o5._c && (o5._d = true), l4;
    }, "renderSlot"), resolveComponent: /* @__PURE__ */ __name(function(e9, t5) {
      return resolveAsset(Kt2, e9, true, t5) || e9;
    }, "resolveComponent"), resolveDirective: /* @__PURE__ */ __name(function(e9) {
      return resolveAsset("directives", e9);
    }, "resolveDirective"), resolveDynamicComponent: /* @__PURE__ */ __name(function(e9) {
      return isString(e9) ? resolveAsset(Kt2, e9, false) || e9 : e9 || Jt2;
    }, "resolveDynamicComponent"), resolveFilter: null, resolveTransitionHooks, setBlockTracking, setDevtoolsHook, setTransitionHooks, shallowReactive, shallowReadonly, shallowRef, ssrContextKey: Ct2, ssrUtils: En2, stop: /* @__PURE__ */ __name(function(e9) {
      e9.effect.stop();
    }, "stop"), toDisplayString, toHandlerKey: u, toHandlers: /* @__PURE__ */ __name(function(e9, t5) {
      const n6 = {};
      for (const r4 in e9) n6[t5 && /[A-Z]/.test(r4) ? `on:${r4}` : u(r4)] = e9[r4];
      return n6;
    }, "toHandlers"), toRaw, toRef: /* @__PURE__ */ __name(function(e9, t5, n6) {
      return isRef2(e9) ? e9 : isFunction(e9) ? new GetterRefImpl(e9) : isObject(e9) && arguments.length > 1 ? propertyToRef(e9, t5, n6) : ref(e9);
    }, "toRef"), toRefs, toValue, transformVNodeArgs: /* @__PURE__ */ __name(function(e9) {
    }, "transformVNodeArgs"), triggerRef: /* @__PURE__ */ __name(function(e9) {
      e9.dep && e9.dep.trigger();
    }, "triggerRef"), unref, useAttrs: /* @__PURE__ */ __name(function() {
      return getContext2().attrs;
    }, "useAttrs"), useCssModule: /* @__PURE__ */ __name(function(e9 = "$style") {
      {
        const t5 = getCurrentInstance();
        if (!t5) return t;
        const n6 = t5.type.__cssModules;
        if (!n6) return t;
        const r4 = n6[e9];
        return r4 || t;
      }
    }, "useCssModule"), useCssVars: /* @__PURE__ */ __name(function(e9) {
      const t5 = getCurrentInstance();
      if (!t5) return;
      const n6 = t5.ut = (n7 = e9(t5.proxy)) => {
        Array.from(document.querySelectorAll(`[data-v-owner="${t5.uid}"]`)).forEach((e10) => setVarsOnNode(e10, n7));
      }, setVars = /* @__PURE__ */ __name(() => {
        const r4 = e9(t5.proxy);
        t5.ce ? setVarsOnNode(t5.ce, r4) : setVarsOnVNode(t5.subTree, r4), n6(r4);
      }, "setVars");
      jt2(() => {
        queuePostFlushCb(setVars);
      }), It2(() => {
        watch(setVars, NOOP, { flush: "post" });
        const e10 = new MutationObserver(setVars);
        e10.observe(t5.subTree.el.parentNode, { childList: true }), Ut2(() => e10.disconnect());
      });
    }, "useCssVars"), useHost, useId: /* @__PURE__ */ __name(function() {
      const e9 = getCurrentInstance();
      return e9 ? (e9.appContext.config.idPrefix || "v") + "-" + e9.ids[0] + e9.ids[1]++ : "";
    }, "useId"), useModel: /* @__PURE__ */ __name(function(e9, t5, n6 = t) {
      const r4 = getCurrentInstance(), s6 = p(t5), o5 = d(t5), i6 = getModelModifiers(e9, s6), a5 = customRef((i7, a6) => {
        let l4, c4, u6 = t;
        return watchSyncEffect(() => {
          const t6 = e9[s6];
          hasChanged(l4, t6) && (l4 = t6, a6());
        }), { get: /* @__PURE__ */ __name(() => (i7(), n6.get ? n6.get(l4) : l4), "get"), set(e10) {
          const i8 = n6.set ? n6.set(e10) : e10;
          if (!(hasChanged(i8, l4) || u6 !== t && hasChanged(e10, u6))) return;
          const p6 = r4.vnode.props, d5 = !!(p6 && (t5 in p6 || s6 in p6 || o5 in p6) && (`onUpdate:${t5}` in p6 || `onUpdate:${s6}` in p6 || `onUpdate:${o5}` in p6));
          d5 || (l4 = e10, a6()), r4.emit(`update:${t5}`, i8), hasChanged(e10, u6) && (hasChanged(e10, i8) && !hasChanged(i8, c4) || d5 && u6 !== t && !hasChanged(i8, l4)) && a6(), u6 = e10, c4 = i8;
        } };
      });
      return a5[Symbol.iterator] = () => {
        let e10 = 0;
        return { next: /* @__PURE__ */ __name(() => e10 < 2 ? { value: e10++ ? i6 || t : a5, done: false } : { done: true }, "next") };
      }, a5;
    }, "useModel"), useSSRContext, useShadowRoot: /* @__PURE__ */ __name(function() {
      const e9 = useHost();
      return e9 && e9.shadowRoot;
    }, "useShadowRoot"), useSlots: /* @__PURE__ */ __name(function() {
      return getContext2().slots;
    }, "useSlots"), useTemplateRef: /* @__PURE__ */ __name(function(e9) {
      const t5 = getCurrentInstance(), n6 = shallowRef(null);
      if (t5) {
        const r4 = t5.refs === t ? t5.refs = {} : t5.refs;
        Object.defineProperty(r4, e9, { enumerable: true, get: /* @__PURE__ */ __name(() => n6.value, "get"), set: /* @__PURE__ */ __name((e10) => n6.value = e10, "set") });
      }
      return n6;
    }, "useTemplateRef"), useTransitionState, vModelCheckbox: cr2, vModelDynamic: dr2, vModelRadio: ur2, vModelSelect: pr2, vModelText: lr2, vShow: Bn2, version: Rn2, warn: Tn2, watch, watchEffect, watchPostEffect: /* @__PURE__ */ __name(function(e9, t5) {
      return doWatch(e9, null, { flush: "post" });
    }, "watchPostEffect"), watchSyncEffect, withAsyncContext: /* @__PURE__ */ __name(function(e9) {
      const t5 = getCurrentInstance(), n6 = Sn2;
      let r4 = e9();
      unsetCurrentInstance(), n6 && bn2(false);
      const restore = /* @__PURE__ */ __name(() => {
        setCurrentInstance(t5), n6 && bn2(true);
      }, "restore"), cleanup = /* @__PURE__ */ __name(() => {
        getCurrentInstance() !== t5 && t5.scope.off(), unsetCurrentInstance(), n6 && bn2(false);
      }, "cleanup");
      return isPromise(r4) && (r4 = r4.catch((e10) => {
        throw restore(), Promise.resolve().then(() => Promise.resolve().then(cleanup)), e10;
      })), [r4, () => {
        restore(), Promise.resolve().then(cleanup);
      }];
    }, "withAsyncContext"), withCtx, withDefaults: /* @__PURE__ */ __name(function(e9, t5) {
      return null;
    }, "withDefaults"), withDirectives: /* @__PURE__ */ __name(function(e9, t5) {
      if (null === bt2) return e9;
      const n6 = getComponentPublicInstance(bt2), r4 = e9.dirs || (e9.dirs = []);
      for (let e10 = 0; e10 < t5.length; e10++) {
        let [s6, o5, i6, a5 = t] = t5[e10];
        s6 && (isFunction(s6) && (s6 = { mounted: s6, updated: s6 }), s6.deep && traverse(o5), r4.push({ dir: s6, instance: n6, value: o5, oldValue: void 0, arg: i6, modifiers: a5 }));
      }
      return e9;
    }, "withDirectives"), withKeys: /* @__PURE__ */ __name((e9, t5) => {
      const n6 = e9._withKeys || (e9._withKeys = {}), r4 = t5.join(".");
      return n6[r4] || (n6[r4] = (n7) => {
        if (!("key" in n7)) return;
        const r5 = d(n7.key);
        return t5.some((e10) => e10 === r5 || gr2[e10] === r5) ? e9(n7) : void 0;
      });
    }, "withKeys"), withMemo: /* @__PURE__ */ __name(function(e9, t5, n6, r4) {
      const s6 = n6[r4];
      if (s6 && isMemoSame(s6, e9)) return s6;
      const o5 = t5();
      return o5.memo = e9.slice(), o5.cacheIndex = r4, n6[r4] = o5;
    }, "withMemo"), withModifiers: /* @__PURE__ */ __name((e9, t5) => {
      if (!e9) return e9;
      const n6 = e9._withMods || (e9._withMods = {}), r4 = t5.join(".");
      return n6[r4] || (n6[r4] = (n7, ...r5) => {
        for (let e10 = 0; e10 < t5.length; e10++) {
          const r6 = hr2[t5[e10]];
          if (r6 && r6(n7, t5)) return;
        }
        return e9(n7, ...r5);
      });
    }, "withModifiers"), withScopeId: /* @__PURE__ */ __name((e9) => withCtx, "withScopeId") }, Symbol.toStringTag, { value: "Module" }));
    VueResolver = /* @__PURE__ */ __name((e9, t5) => isRef2(t5) ? toValue(t5) : t5, "VueResolver");
    kr = "usehead";
    __name(injectHead, "injectHead");
    __name(useHead, "useHead");
    __name(createHead, "createHead");
    Cr2 = makeMap(",key,ref,innerHTML,textContent,ref_key,ref_for");
    __name(ssrRenderAttrs, "ssrRenderAttrs");
    __name(ssrRenderDynamicAttr, "ssrRenderDynamicAttr");
    __name(ssrRenderAttr, "ssrRenderAttr");
    __name(ssrRenderClass, "ssrRenderClass");
    __name(ssrRenderStyle, "ssrRenderStyle");
    __name(ssrRenderComponent, "ssrRenderComponent");
    ({ ensureValidVNode: Sr2 } = En2);
    __name(ssrInterpolate, "ssrInterpolate");
    {
      const e9 = getGlobalThis(), registerGlobalSetter = /* @__PURE__ */ __name((t5, n6) => {
        let r4;
        return (r4 = e9[t5]) || (r4 = e9[t5] = []), r4.push(n6), (e10) => {
          r4.length > 1 ? r4.forEach((t6) => t6(e10)) : r4[0](e10);
        };
      }, "registerGlobalSetter");
      registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (e10) => e10), registerGlobalSetter("__VUE_SSR_SETTERS__", (e10) => e10);
    }
    __name(ssrRenderList, "ssrRenderList");
    __name(ssrRenderSuspense, "ssrRenderSuspense");
    wr2 = looseEqual;
    __name(ssrLooseContain, "ssrLooseContain");
    ({ createComponentInstance: Rr2, setCurrentRenderingInstance: Tr2, setupComponent: Ar2, renderComponentRoot: xr2, normalizeVNode: Er2, pushWarningContext: $r2, popWarningContext: Pr2 } = En2);
    __name(createBuffer, "createBuffer");
    __name(renderComponentVNode, "renderComponentVNode");
    __name(renderComponentSubTree, "renderComponentSubTree");
    __name(renderVNode, "renderVNode");
    __name(renderVNodeChildren, "renderVNodeChildren");
    ({ isVNode: Or2 } = En2);
    __name(nestedUnrollBuffer, "nestedUnrollBuffer");
    __name(unrollBuffer$1, "unrollBuffer$1");
    __name(unrollBufferSync$1, "unrollBufferSync$1");
    __name(renderToString, "renderToString");
    ({ isVNode: Nr2 } = En2);
    initDirectivesForSSR();
    Hr = { meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }, { charset: "utf-8" }], link: [], style: [], script: [], noscript: [] };
    Mr2 = { id: "teleports" };
    Vr2 = { id: "__nuxt-loader" };
    __name(baseURL, "baseURL");
    __name(buildAssetsURL, "buildAssetsURL");
    __name(publicAssetsURL, "publicAssetsURL");
    globalThis.__buildAssetsURL = buildAssetsURL, globalThis.__publicAssetsURL = publicAssetsURL;
    Lr2 = `<div${propsToString({ id: "__nuxt" })}>`;
    Dr2 = "</div>";
    getPrecomputedDependencies = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_client_precomputed(), client_precomputed_exports)).then((e9) => e9.default || e9).then((e9) => "function" == typeof e9 ? e9() : e9), "getPrecomputedDependencies");
    Ir2 = lazyCachedFunction(async () => {
      const e9 = await Promise.resolve().then(() => (init_server(), server_exports)).then(function(e10) {
        return e10.s;
      }).then((e10) => e10.default || e10);
      if (!e9) throw new Error("Server bundle is not available");
      return createRenderer$1(e9, { precomputed: await getPrecomputedDependencies(), manifest: void 0, renderToString: /* @__PURE__ */ __name(async function(e10, t5) {
        const n6 = await renderToString(e10, t5);
        return Lr2 + n6 + Dr2;
      }, "renderToString"), buildAssetsURL });
    });
    jr2 = lazyCachedFunction(async () => {
      const e9 = await getPrecomputedDependencies(), t5 = await Promise.resolve().then(() => (init_virtual_spa_template(), virtual_spa_template_exports)).then((e10) => e10.template).catch(() => "").then((e10) => {
        {
          const t6 = `<div${propsToString(Vr2)}>`;
          return Lr2 + Dr2 + (e10 ? t6 + e10 + "</div>" : "");
        }
      }), r4 = createRenderer$1(() => () => {
      }, { precomputed: e9, manifest: void 0, renderToString: /* @__PURE__ */ __name(() => t5, "renderToString"), buildAssetsURL }), s6 = await r4.renderToString({});
      return { rendererContext: r4.rendererContext, renderToString: /* @__PURE__ */ __name((e10) => {
        const t6 = useRuntimeConfig2(e10.event);
        return e10.modules ||= /* @__PURE__ */ new Set(), e10.payload.serverRendered = false, e10.config = { public: t6.public, app: t6.app }, Promise.resolve(s6);
      }, "renderToString") };
    });
    __name(lazyCachedFunction, "lazyCachedFunction");
    Fr3 = lazyCachedFunction(() => Promise.resolve().then(() => (init_styles(), styles_exports)).then((e9) => e9.default || e9));
    Br3 = { "<": "\\u003C", "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t", "\u2028": "\\u2028", "\u2029": "\\u2029" };
    DevalueError = class extends Error {
      static {
        __name(this, "DevalueError");
      }
      constructor(e9, t5, n6, r4) {
        super(e9), this.name = "DevalueError", this.path = t5.join(""), this.value = n6, this.root = r4;
      }
    };
    __name(is_primitive, "is_primitive");
    Ur = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    __name(is_plain_object, "is_plain_object");
    __name(get_type, "get_type");
    __name(get_escaped_char, "get_escaped_char");
    __name(stringify_string, "stringify_string");
    __name(enumerable_symbols, "enumerable_symbols");
    Wr = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    __name(stringify_key, "stringify_key");
    __name(is_valid_array_index_string, "is_valid_array_index_string");
    __name(valid_array_indices, "valid_array_indices");
    zr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    qr = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    Kr = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
    __name(uneval, "uneval");
    __name(escape_unsafe_char, "escape_unsafe_char");
    __name(escape_unsafe_chars, "escape_unsafe_chars");
    __name(stringify_primitive$1, "stringify_primitive$1");
    Jr = "function" == typeof Uint8Array.fromBase64;
    Gr = "object" == typeof J && void 0 !== J.versions?.node;
    Zr = Jr ? function(e9) {
      return new Uint8Array(e9).toBase64();
    } : Gr ? function(e9) {
      return g2.from(e9).toString("base64");
    } : function(e9) {
      const t5 = new Uint8Array(e9);
      let n6 = "";
      for (let e10 = 0; e10 < t5.length; e10 += 32768) {
        const r4 = t5.subarray(e10, e10 + 32768);
        n6 += String.fromCharCode.apply(null, r4);
      }
      return btoa(n6);
    };
    __name(stringify, "stringify");
    __name(stringify_primitive, "stringify_primitive");
    __name(renderPayloadJsonScript, "renderPayloadJsonScript");
    Yr = { disableDefaults: true };
    __name(createSSRContext, "createSSRContext");
    Xr = {};
    Qr = [];
    globalThis.__buildAssetsURL = buildAssetsURL, globalThis.__publicAssetsURL = publicAssetsURL;
    es = !!Mr2.id;
    ts = es ? `<div${propsToString(Mr2)}>` : "";
    ns = es ? "</div>" : "";
    rs = defineRenderHandler((e9) => {
      const t5 = e9.path.startsWith("/__nuxt_error") ? getQuery(e9) : null;
      if (t5 && !("__unenv__" in e9.node.req)) throw createError({ status: 404, statusText: "Page Not Found: /__nuxt_error", message: "Page Not Found: /__nuxt_error" });
      return (async function(e10, t6) {
        const n6 = useNitroApp(), r4 = createSSRContext(e10), s6 = { mode: "server" };
        if (r4.head.push(Hr, s6), t6) {
          const e11 = t6.status || t6.statusCode;
          if (e11 && (t6.status = t6.statusCode = Number.parseInt(e11)), "string" == typeof t6.data) try {
            t6.data = destr(t6.data);
          } catch {
          }
          !(function(e12, t7) {
            e12.error = true, e12.payload = { error: t7 }, e12.url = t7.url;
          })(r4, t6);
        }
        const o5 = getRouteRules(e10);
        false === o5.ssr && (r4.noSSR = true);
        r4.noSSR;
        const i6 = await (function(e11) {
          return e11.noSSR ? jr2() : Ir2();
        })(r4);
        for (const e11 of Qr) r4.modules.add(e11);
        const a5 = await i6.renderToString(r4).catch(async (e11) => {
          if ((r4["~renderResponse"] || r4._renderResponse) && "skipping render" === e11.message) return {};
          const n7 = !t6 && r4.payload?.error || e11;
          throw await r4.nuxt?.hooks.callHook("app:error", n7), n7;
        }), l4 = r4["~renderResponse"] || r4._renderResponse ? [] : await (async function(e11) {
          const t7 = await Fr3(), n7 = /* @__PURE__ */ new Set();
          for (const r5 of e11) if (r5 in t7 && t7[r5]) for (const e12 of await t7[r5]()) n7.add(e12);
          return Array.from(n7).map((e12) => ({ innerHTML: e12 }));
        })(r4.modules ?? []);
        if (await r4.nuxt?.hooks.callHook("app:rendered", { ssrContext: r4, renderResult: a5 }), r4["~renderResponse"] || r4._renderResponse) return r4["~renderResponse"] || r4._renderResponse;
        if (r4.payload?.error && !t6) throw r4.payload.error;
        const g3 = o5.noScripts, { styles: m4, scripts: y4 } = getRequestDependencies(r4, i6.rendererContext);
        l4.length && r4.head.push({ style: l4 });
        const v5 = [];
        for (const e11 of Object.values(m4)) v5.push({ rel: "stylesheet", href: i6.rendererContext.buildAssetsURL(e11.file), crossorigin: "" });
        v5.length && r4.head.push({ link: v5 }, s6);
        if (!g3) {
          if (r4["~lazyHydratedModules"]) for (const e11 of r4["~lazyHydratedModules"]) r4.modules?.delete(e11);
          r4.head.push({ link: getPreloadLinks(r4, i6.rendererContext) }, s6), r4.head.push({ link: getPrefetchLinks(r4, i6.rendererContext) }, s6), r4.head.push({ script: renderPayloadJsonScript({ ssrContext: r4, data: r4.payload }) }, { ...s6, tagPosition: "bodyClose", tagPriority: "high" });
        }
        if (!o5.noScripts) {
          const e11 = "head";
          r4.head.push({ script: Object.values(y4).map((t7) => ({ type: t7.module ? "module" : null, src: i6.rendererContext.buildAssetsURL(t7.file), defer: !t7.module || null, tagPosition: e11, crossorigin: "" })) }, s6);
        }
        const { headTags: _3, bodyTags: b4, bodyTagsOpen: k4, htmlAttrs: C3, bodyAttrs: S4 } = await renderSSRHead(r4.head, Xr), w3 = { htmlAttrs: C3 ? [C3] : [], head: normalizeChunks([_3]), bodyAttrs: S4 ? [S4] : [], bodyPrepend: normalizeChunks([k4, r4.teleports?.body]), body: [a5.html, ts + (es ? joinTags([r4.teleports?.[`#${Mr2.id}`]]) : "") + ns], bodyAppend: [b4] };
        return await n6.hooks.callHook("render:html", w3, { event: e10 }), { body: renderHTMLDocument(w3), statusCode: getResponseStatus(e10), statusMessage: getResponseStatusText(e10), headers: { "content-type": "text/html;charset=utf-8", "x-powered-by": "Nuxt" } };
      })(e9, t5);
    });
    __name(normalizeChunks, "normalizeChunks");
    __name(joinTags, "joinTags");
    __name(joinAttrs, "joinAttrs");
    __name(renderHTMLDocument, "renderHTMLDocument");
    ss = Object.freeze(Object.defineProperty({ __proto__: null, default: rs }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/_/cloudflare.mjs
var useDB, useBucket;
var init_cloudflare = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/_/cloudflare.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    useDB = /* @__PURE__ */ __name((a5) => {
      var o5, n6;
      const t5 = null == (n6 = null == (o5 = a5.context.cloudflare) ? void 0 : o5.env) ? void 0 : n6.DB;
      if (!t5) throw createError({ statusCode: 500, statusMessage: 'Cloudflare D1 Database binding "DB" n\xE3o encontrada. Verifique se a vari\xE1vel/binding est\xE1 ativa no painel da Cloudflare ou executando via Wrangler.' });
      return t5;
    }, "useDB");
    useBucket = /* @__PURE__ */ __name((a5) => {
      var o5, n6;
      const t5 = null == (n6 = null == (o5 = a5.context.cloudflare) ? void 0 : o5.env) ? void 0 : n6.BUCKET;
      if (!t5) throw createError({ statusCode: 500, statusMessage: 'Cloudflare R2 Bucket binding "BUCKET" n\xE3o encontrada. Verifique se o bucket est\xE1 configurado no wrangler.toml.' });
      return t5;
    }, "useBucket");
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/categories.mjs
var categories_exports = {};
__export(categories_exports, {
  default: () => i4
});
var i4;
var init_categories = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/categories.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_cloudflare();
    i4 = defineEventHandler(async (a5) => {
      if ((function(a6) {
        var s6;
        const r4 = J.env.ADMIN_SECRET, i7 = (null != (s6 = Cr3(a6, "authorization")) ? s6 : "").replace("Bearer ", "").trim();
        if (!r4 || i7 !== r4) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
      })(a5), "PUT" !== a5.method) throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
      const i6 = await readBody(a5);
      if (!i6.id || !i6.name || !i6.image) throw createError({ statusCode: 400, statusMessage: "id, name e image s\xE3o obrigat\xF3rios" });
      const n6 = useDB(a5);
      try {
        return await n6.prepare("UPDATE categories SET name = ?, image = ? WHERE id = ?").bind(i6.name, i6.image, i6.id).run(), { ok: true };
      } catch (a6) {
        throw createError({ statusCode: 500, statusMessage: `Erro ao atualizar categoria no Cloudflare D1: ${a6.message}` });
      }
    });
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/_/pathe.M-eThtNZ.mjs
var e5, n3, extname;
var init_pathe_M_eThtNZ = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/_/pathe.M-eThtNZ.mjs"() {
    "use strict";
    init_modules_watch_stub();
    e5 = /^[A-Za-z]:\//;
    n3 = /.(\.[^./]+|\.)$/;
    extname = /* @__PURE__ */ __name(function(r4) {
      if (".." === r4) return "";
      const t5 = n3.exec((function(n6 = "") {
        return n6 ? n6.replace(/\\/g, "/").replace(e5, (e9) => e9.toUpperCase()) : n6;
      })(r4));
      return t5 && t5[1] || "";
    }, "extname");
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/categories/upload.mjs
var upload_exports = {};
__export(upload_exports, {
  default: () => u3
});
var n4, u3;
var init_upload = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/categories/upload.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_cloudflare();
    init_pathe_M_eThtNZ();
    n4 = ["image/png", "image/jpeg", "image/jpg"];
    u3 = defineEventHandler(async (t5) => {
      var u6;
      if ((function(t6) {
        var e9;
        const r4 = J.env.ADMIN_SECRET, i6 = (null != (e9 = Cr3(t6, "authorization")) ? e9 : "").replace("Bearer ", "").trim();
        if (!r4 || i6 !== r4) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
      })(t5), "POST" !== t5.method) throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
      const d5 = await readMultipartFormData(t5);
      if (!d5 || 0 === d5.length) throw createError({ statusCode: 400, statusMessage: "Nenhum arquivo enviado" });
      const m4 = d5.find((t6) => "file" === t6.name), g3 = d5.find((t6) => "categoryName" === t6.name), l4 = d5.find((t6) => "oldImageUrl" === t6.name);
      if (!m4 || !m4.data || !m4.filename) throw createError({ statusCode: 400, statusMessage: 'Campo "file" ausente' });
      if (!g3 || !g3.data) throw createError({ statusCode: 400, statusMessage: 'Campo "categoryName" ausente' });
      const c4 = g3.data.toString("utf-8"), f4 = l4 ? l4.data.toString("utf-8") : "", p6 = null != (u6 = m4.type) ? u6 : "";
      if (!n4.includes(p6)) throw createError({ statusCode: 400, statusMessage: "Apenas PNG, JPG e JPEG s\xE3o permitidos" });
      if (m4.data.byteLength > 5242880) throw createError({ statusCode: 400, statusMessage: "Arquivo muito grande (m\xE1x. 5MB)" });
      const h5 = useBucket(t5), w3 = J.env.R2_PUBLIC_URL || "https://sua-url-r2-publica.dev";
      try {
        if (f4 && f4.includes(w3)) {
          const t7 = f4.split(`${w3}/`)[1];
          t7 && await h5.delete(t7);
        }
        const t6 = extname(m4.filename).toLowerCase(), a5 = c4.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-"), e9 = `categorias/${`categoria-${a5}-${Date.now()}${t6}`}`;
        await h5.put(e9, m4.data, { httpMetadata: { contentType: p6 } });
        return { ok: true, url: `${w3}/${e9}` };
      } catch (t6) {
        throw createError({ statusCode: 500, statusMessage: `Erro ao fazer upload da imagem no R2: ${t6.message}` });
      }
    });
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/login.mjs
var login_exports = {};
__export(login_exports, {
  default: () => e6
});
var e6;
var init_login = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/login.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    e6 = defineEventHandler(async (t5) => {
      if ("POST" !== t5.method) throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
      const e9 = await readBody(t5), r4 = J.env.ADMIN_SECRET;
      if (!r4 || e9.password !== r4) throw createError({ statusCode: 401, statusMessage: "Senha incorreta" });
      return { ok: true, token: r4 };
    });
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/products.mjs
var products_exports = {};
__export(products_exports, {
  default: () => u4
});
var u4;
var init_products = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/products.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_cloudflare();
    u4 = defineEventHandler(async (e9) => {
      !(function(e10) {
        var s6;
        const a5 = J.env.ADMIN_SECRET, i6 = (null != (s6 = Cr3(e10, "authorization")) ? s6 : "").replace("Bearer ", "").trim();
        if (!a5 || i6 !== a5) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
      })(e9);
      const u6 = e9.method, d5 = useDB(e9);
      if ("GET" === u6) try {
        const { results: e10 } = await d5.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
        return (e10 || []).map((e11) => ({ ...e11, featured: 1 === e11.featured, categories: JSON.parse(e11.categories || "[]"), images: JSON.parse(e11.images || "[]") }));
      } catch (e10) {
        throw createError({ statusCode: 500, statusMessage: `Erro ao buscar produtos: ${e10.message}` });
      }
      if ("POST" === u6) {
        const a5 = await readBody(e9);
        if (!a5.id || !a5.name || !a5.price) throw createError({ statusCode: 400, statusMessage: "id, name e price s\xE3o obrigat\xF3rios" });
        try {
          if (await d5.prepare("SELECT id FROM products WHERE id = ?").bind(a5.id).first()) throw createError({ statusCode: 409, statusMessage: "ID j\xE1 existe" });
          const e10 = JSON.stringify(a5.categories || []), s6 = JSON.stringify(a5.images || []), r4 = a5.featured ? 1 : 0;
          return await d5.prepare("INSERT INTO products (id, name, description, price, oldPrice, category, categories, image, images, featured, installments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(a5.id, a5.name, a5.description || null, Number(a5.price), a5.oldPrice ? Number(a5.oldPrice) : null, a5.category, e10, a5.image || null, s6, r4, a5.installments || null).run(), { ok: true, product: a5 };
        } catch (e10) {
          throw createError({ statusCode: e10.statusCode || 500, statusMessage: e10.statusMessage || `Erro ao criar produto no D1: ${e10.message}` });
        }
      }
      if ("PUT" === u6) {
        const a5 = await readBody(e9);
        if (!a5.id) throw createError({ statusCode: 400, statusMessage: "id \xE9 obrigat\xF3rio" });
        try {
          const e10 = JSON.stringify(a5.categories || []), t5 = JSON.stringify(a5.images || []), s6 = a5.featured ? 1 : 0;
          return await d5.prepare("UPDATE products SET name = ?, description = ?, price = ?, oldPrice = ?, category = ?, categories = ?, image = ?, images = ?, featured = ?, installments = ? WHERE id = ?").bind(a5.name, a5.description || null, Number(a5.price), a5.oldPrice ? Number(a5.oldPrice) : null, a5.category, e10, a5.image || null, t5, s6, a5.installments || null, a5.id).run(), { ok: true, product: a5 };
        } catch (e10) {
          throw createError({ statusCode: 500, statusMessage: `Erro ao atualizar produto no D1: ${e10.message}` });
        }
      }
      if ("DELETE" === u6) {
        const s6 = getQuery(e9).id;
        if (!s6) throw createError({ statusCode: 400, statusMessage: "query param id \xE9 obrigat\xF3rio" });
        try {
          return await d5.prepare("DELETE FROM products WHERE id = ?").bind(s6).run(), { ok: true, removed: s6 };
        } catch (e10) {
          throw createError({ statusCode: 500, statusMessage: `Erro ao remover produto no D1: ${e10.message}` });
        }
      }
      throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
    });
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/upload.mjs
var upload_exports2 = {};
__export(upload_exports2, {
  default: () => d3
});
var n5, d3;
var init_upload2 = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/routes/api/admin/upload.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_cloudflare();
    init_pathe_M_eThtNZ();
    n5 = ["image/png", "image/jpeg", "image/jpg"];
    d3 = defineEventHandler(async (t5) => {
      var d5;
      if ((function(t6) {
        var e9;
        const s6 = J.env.ADMIN_SECRET, u6 = (null != (e9 = Cr3(t6, "authorization")) ? e9 : "").replace("Bearer ", "").trim();
        if (!s6 || u6 !== s6) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
      })(t5), "POST" !== t5.method) throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
      const l4 = getQuery(t5).folder || "produtos";
      if ("produtos" !== l4 && "categorias" !== l4) throw createError({ statusCode: 400, statusMessage: 'Pasta inv\xE1lida. Use "produtos" ou "categorias"' });
      const m4 = await readMultipartFormData(t5);
      if (!m4 || 0 === m4.length) throw createError({ statusCode: 400, statusMessage: "Nenhum arquivo enviado" });
      const p6 = m4.find((t6) => "file" === t6.name);
      if (!p6 || !p6.data || !p6.filename) throw createError({ statusCode: 400, statusMessage: 'Campo "file" ausente' });
      const c4 = null != (d5 = p6.type) ? d5 : "";
      if (!n5.includes(c4)) throw createError({ statusCode: 400, statusMessage: "Apenas PNG, JPG e JPEG s\xE3o permitidos" });
      if (p6.data.byteLength > 5242880) throw createError({ statusCode: 400, statusMessage: "Arquivo muito grande (m\xE1x. 5MB)" });
      const g3 = extname(p6.filename).toLowerCase(), f4 = `${p6.filename.replace(g3, "").toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-").substring(0, 60)}-${Date.now()}${g3}`, h5 = `${l4}/${f4}`, w3 = useBucket(t5);
      try {
        await w3.put(h5, p6.data, { httpMetadata: { contentType: c4 } });
        const t6 = J.env.R2_PUBLIC_URL || "https://sua-url-r2-publica.dev";
        return { ok: true, url: `${t6}/${h5}`, filename: f4 };
      } catch (t6) {
        throw createError({ statusCode: 500, statusMessage: `Erro ao fazer upload no Cloudflare R2: ${t6.message}` });
      }
    });
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/routes/api/categories.mjs
var categories_exports2 = {};
__export(categories_exports2, {
  default: () => s4
});
var s4;
var init_categories2 = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/routes/api/categories.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_cloudflare();
    s4 = defineEventHandler(async (e9) => {
      try {
        const s6 = useDB(e9), { results: t5 } = await s6.prepare("SELECT * FROM categories ORDER BY id ASC").all();
        return t5 || [];
      } catch (e10) {
        return [{ id: "todos", name: "Todos", image: "/images/categorias/categoria-todos.jpg" }, { id: "destaques", name: "Destaques", image: "/images/categorias/categoria-todos.jpg" }, { id: "buques", name: "Buqu\xEAs", image: "/images/categorias/categoria-buques.jpg" }, { id: "cestas", name: "Cestas", image: "/images/categorias/categoria-cestas.jpg" }, { id: "presentes", name: "Presentes", image: "/images/categorias/categoria-presentes.jpg" }];
      }
    });
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/routes/api/products.mjs
var products_exports2 = {};
__export(products_exports2, {
  default: () => e7
});
var e7;
var init_products2 = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/routes/api/products.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_cloudflare();
    e7 = defineEventHandler(async (a5) => {
      const e9 = useDB(a5);
      try {
        const { results: a6 } = await e9.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
        return (a6 || []).map((a7) => ({ ...a7, featured: 1 === a7.featured, categories: JSON.parse(a7.categories || "[]"), images: JSON.parse(a7.images || "[]") }));
      } catch (a6) {
        throw createError({ statusCode: 500, statusMessage: `Erro ao buscar produtos no Cloudflare D1: ${a6.message}` });
      }
    });
  }
});

// .wrangler/tmp/pages-zpBuWO/chunks/nitro/nitro.mjs
function createNotImplementedError(e9) {
  return new Error(`[unenv] ${e9} is not implemented yet!`);
}
function notImplemented(e9) {
  return Object.assign(() => {
    throw createNotImplementedError(e9);
  }, { __unenv__: true });
}
function toByteArray(e9) {
  let s6;
  const a5 = (function(e10) {
    const t5 = e10.length;
    if (t5 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    let r4 = e10.indexOf("=");
    return -1 === r4 && (r4 = t5), [r4, r4 === t5 ? 0 : 4 - r4 % 4];
  })(e9), c4 = a5[0], u6 = a5[1], f4 = new r3((function(e10, t5, r4) {
    return 3 * (t5 + r4) / 4 - r4;
  })(0, c4, u6));
  let h5 = 0;
  const d5 = u6 > 0 ? c4 - 4 : c4;
  let g3;
  for (g3 = 0; g3 < d5; g3 += 4) s6 = t4[e9.charCodeAt(g3)] << 18 | t4[e9.charCodeAt(g3 + 1)] << 12 | t4[e9.charCodeAt(g3 + 2)] << 6 | t4[e9.charCodeAt(g3 + 3)], f4[h5++] = s6 >> 16 & 255, f4[h5++] = s6 >> 8 & 255, f4[h5++] = 255 & s6;
  return 2 === u6 && (s6 = t4[e9.charCodeAt(g3)] << 2 | t4[e9.charCodeAt(g3 + 1)] >> 4, f4[h5++] = 255 & s6), 1 === u6 && (s6 = t4[e9.charCodeAt(g3)] << 10 | t4[e9.charCodeAt(g3 + 1)] << 4 | t4[e9.charCodeAt(g3 + 2)] >> 2, f4[h5++] = s6 >> 8 & 255, f4[h5++] = 255 & s6), f4;
}
function tripletToBase64(t5) {
  return e8[t5 >> 18 & 63] + e8[t5 >> 12 & 63] + e8[t5 >> 6 & 63] + e8[63 & t5];
}
function encodeChunk(e9, t5, r4) {
  let s6;
  const a5 = [];
  for (let c4 = t5; c4 < r4; c4 += 3) s6 = (e9[c4] << 16 & 16711680) + (e9[c4 + 1] << 8 & 65280) + (255 & e9[c4 + 2]), a5.push(tripletToBase64(s6));
  return a5.join("");
}
function fromByteArray(t5) {
  let r4;
  const s6 = t5.length, a5 = s6 % 3, c4 = [], u6 = 16383;
  for (let e9 = 0, r5 = s6 - a5; e9 < r5; e9 += u6) c4.push(encodeChunk(t5, e9, e9 + u6 > r5 ? r5 : e9 + u6));
  return 1 === a5 ? (r4 = t5[s6 - 1], c4.push(e8[r4 >> 2] + e8[r4 << 4 & 63] + "==")) : 2 === a5 && (r4 = (t5[s6 - 2] << 8) + t5[s6 - 1], c4.push(e8[r4 >> 10] + e8[r4 >> 4 & 63] + e8[r4 << 2 & 63] + "=")), c4.join("");
}
function read(e9, t5, r4, s6, a5) {
  let c4, u6;
  const f4 = 8 * a5 - s6 - 1, h5 = (1 << f4) - 1, d5 = h5 >> 1;
  let g3 = -7, m4 = r4 ? a5 - 1 : 0;
  const _3 = r4 ? -1 : 1;
  let E3 = e9[t5 + m4];
  for (m4 += _3, c4 = E3 & (1 << -g3) - 1, E3 >>= -g3, g3 += f4; g3 > 0; ) c4 = 256 * c4 + e9[t5 + m4], m4 += _3, g3 -= 8;
  for (u6 = c4 & (1 << -g3) - 1, c4 >>= -g3, g3 += s6; g3 > 0; ) u6 = 256 * u6 + e9[t5 + m4], m4 += _3, g3 -= 8;
  if (0 === c4) c4 = 1 - d5;
  else {
    if (c4 === h5) return u6 ? Number.NaN : (E3 ? -1 : 1) * Number.POSITIVE_INFINITY;
    u6 += Math.pow(2, s6), c4 -= d5;
  }
  return (E3 ? -1 : 1) * u6 * Math.pow(2, c4 - s6);
}
function write(e9, t5, r4, s6, a5, c4) {
  let u6, f4, h5, d5 = 8 * c4 - a5 - 1;
  const g3 = (1 << d5) - 1, m4 = g3 >> 1, _3 = 23 === a5 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  let E3 = s6 ? 0 : c4 - 1;
  const R3 = s6 ? 1 : -1, B2 = t5 < 0 || 0 === t5 && 1 / t5 < 0 ? 1 : 0;
  for (t5 = Math.abs(t5), Number.isNaN(t5) || t5 === Number.POSITIVE_INFINITY ? (f4 = Number.isNaN(t5) ? 1 : 0, u6 = g3) : (u6 = Math.floor(Math.log2(t5)), t5 * (h5 = Math.pow(2, -u6)) < 1 && (u6--, h5 *= 2), (t5 += u6 + m4 >= 1 ? _3 / h5 : _3 * Math.pow(2, 1 - m4)) * h5 >= 2 && (u6++, h5 /= 2), u6 + m4 >= g3 ? (f4 = 0, u6 = g3) : u6 + m4 >= 1 ? (f4 = (t5 * h5 - 1) * Math.pow(2, a5), u6 += m4) : (f4 = t5 * Math.pow(2, m4 - 1) * Math.pow(2, a5), u6 = 0)); a5 >= 8; ) e9[r4 + E3] = 255 & f4, E3 += R3, f4 /= 256, a5 -= 8;
  for (u6 = u6 << a5 | f4, d5 += a5; d5 > 0; ) e9[r4 + E3] = 255 & u6, E3 += R3, u6 /= 256, d5 -= 8;
  e9[r4 + E3 - R3] |= 128 * B2;
}
function createBuffer2(e9) {
  if (e9 > c3) throw new RangeError('The value "' + e9 + '" is invalid for option "size"');
  const t5 = new Uint8Array(e9);
  return Object.setPrototypeOf(t5, Buffer$1.prototype), t5;
}
function Buffer$1(e9, t5, r4) {
  if ("number" == typeof e9) {
    if ("string" == typeof t5) throw new TypeError('The "string" argument must be of type string. Received type number');
    return allocUnsafe(e9);
  }
  return from(e9, t5, r4);
}
function from(e9, t5, r4) {
  if ("string" == typeof e9) return (function(e10, t6) {
    "string" == typeof t6 && "" !== t6 || (t6 = "utf8");
    if (!Buffer$1.isEncoding(t6)) throw new TypeError("Unknown encoding: " + t6);
    const r5 = 0 | byteLength(e10, t6);
    let s7 = createBuffer2(r5);
    const a6 = s7.write(e10, t6);
    a6 !== r5 && (s7 = s7.slice(0, a6));
    return s7;
  })(e9, t5);
  if (ArrayBuffer.isView(e9)) return (function(e10) {
    if (isInstance(e10, Uint8Array)) {
      const t6 = new Uint8Array(e10);
      return fromArrayBuffer(t6.buffer, t6.byteOffset, t6.byteLength);
    }
    return fromArrayLike(e10);
  })(e9);
  if (null == e9) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e9);
  if (isInstance(e9, ArrayBuffer) || e9 && isInstance(e9.buffer, ArrayBuffer)) return fromArrayBuffer(e9, t5, r4);
  if ("undefined" != typeof SharedArrayBuffer && (isInstance(e9, SharedArrayBuffer) || e9 && isInstance(e9.buffer, SharedArrayBuffer))) return fromArrayBuffer(e9, t5, r4);
  if ("number" == typeof e9) throw new TypeError('The "value" argument must not be of type number. Received type number');
  const s6 = e9.valueOf && e9.valueOf();
  if (null != s6 && s6 !== e9) return Buffer$1.from(s6, t5, r4);
  const a5 = (function(e10) {
    if (Buffer$1.isBuffer(e10)) {
      const t6 = 0 | checked(e10.length), r5 = createBuffer2(t6);
      return 0 === r5.length || e10.copy(r5, 0, 0, t6), r5;
    }
    if (void 0 !== e10.length) return "number" != typeof e10.length || numberIsNaN(e10.length) ? createBuffer2(0) : fromArrayLike(e10);
    if ("Buffer" === e10.type && Array.isArray(e10.data)) return fromArrayLike(e10.data);
  })(e9);
  if (a5) return a5;
  if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e9[Symbol.toPrimitive]) return Buffer$1.from(e9[Symbol.toPrimitive]("string"), t5, r4);
  throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e9);
}
function assertSize(e9) {
  if ("number" != typeof e9) throw new TypeError('"size" argument must be of type number');
  if (e9 < 0) throw new RangeError('The value "' + e9 + '" is invalid for option "size"');
}
function allocUnsafe(e9) {
  return assertSize(e9), createBuffer2(e9 < 0 ? 0 : 0 | checked(e9));
}
function fromArrayLike(e9) {
  const t5 = e9.length < 0 ? 0 : 0 | checked(e9.length), r4 = createBuffer2(t5);
  for (let s6 = 0; s6 < t5; s6 += 1) r4[s6] = 255 & e9[s6];
  return r4;
}
function fromArrayBuffer(e9, t5, r4) {
  if (t5 < 0 || e9.byteLength < t5) throw new RangeError('"offset" is outside of buffer bounds');
  if (e9.byteLength < t5 + (r4 || 0)) throw new RangeError('"length" is outside of buffer bounds');
  let s6;
  return s6 = void 0 === t5 && void 0 === r4 ? new Uint8Array(e9) : void 0 === r4 ? new Uint8Array(e9, t5) : new Uint8Array(e9, t5, r4), Object.setPrototypeOf(s6, Buffer$1.prototype), s6;
}
function checked(e9) {
  if (e9 >= c3) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + c3.toString(16) + " bytes");
  return 0 | e9;
}
function byteLength(e9, t5) {
  if (Buffer$1.isBuffer(e9)) return e9.length;
  if (ArrayBuffer.isView(e9) || isInstance(e9, ArrayBuffer)) return e9.byteLength;
  if ("string" != typeof e9) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e9);
  const r4 = e9.length, s6 = arguments.length > 2 && true === arguments[2];
  if (!s6 && 0 === r4) return 0;
  let a5 = false;
  for (; ; ) switch (t5) {
    case "ascii":
    case "latin1":
    case "binary":
      return r4;
    case "utf8":
    case "utf-8":
      return utf8ToBytes(e9).length;
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return 2 * r4;
    case "hex":
      return r4 >>> 1;
    case "base64":
      return base64ToBytes(e9).length;
    default:
      if (a5) return s6 ? -1 : utf8ToBytes(e9).length;
      t5 = ("" + t5).toLowerCase(), a5 = true;
  }
}
function slowToString(e9, t5, r4) {
  let s6 = false;
  if ((void 0 === t5 || t5 < 0) && (t5 = 0), t5 > this.length) return "";
  if ((void 0 === r4 || r4 > this.length) && (r4 = this.length), r4 <= 0) return "";
  if ((r4 >>>= 0) <= (t5 >>>= 0)) return "";
  for (e9 || (e9 = "utf8"); ; ) switch (e9) {
    case "hex":
      return hexSlice(this, t5, r4);
    case "utf8":
    case "utf-8":
      return utf8Slice(this, t5, r4);
    case "ascii":
      return asciiSlice(this, t5, r4);
    case "latin1":
    case "binary":
      return latin1Slice(this, t5, r4);
    case "base64":
      return base64Slice(this, t5, r4);
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return utf16leSlice(this, t5, r4);
    default:
      if (s6) throw new TypeError("Unknown encoding: " + e9);
      e9 = (e9 + "").toLowerCase(), s6 = true;
  }
}
function swap(e9, t5, r4) {
  const s6 = e9[t5];
  e9[t5] = e9[r4], e9[r4] = s6;
}
function bidirectionalIndexOf(e9, t5, r4, s6, a5) {
  if (0 === e9.length) return -1;
  if ("string" == typeof r4 ? (s6 = r4, r4 = 0) : r4 > 2147483647 ? r4 = 2147483647 : r4 < -2147483648 && (r4 = -2147483648), numberIsNaN(r4 = +r4) && (r4 = a5 ? 0 : e9.length - 1), r4 < 0 && (r4 = e9.length + r4), r4 >= e9.length) {
    if (a5) return -1;
    r4 = e9.length - 1;
  } else if (r4 < 0) {
    if (!a5) return -1;
    r4 = 0;
  }
  if ("string" == typeof t5 && (t5 = Buffer$1.from(t5, s6)), Buffer$1.isBuffer(t5)) return 0 === t5.length ? -1 : arrayIndexOf(e9, t5, r4, s6, a5);
  if ("number" == typeof t5) return t5 &= 255, "function" == typeof Uint8Array.prototype.indexOf ? a5 ? Uint8Array.prototype.indexOf.call(e9, t5, r4) : Uint8Array.prototype.lastIndexOf.call(e9, t5, r4) : arrayIndexOf(e9, [t5], r4, s6, a5);
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(e9, t5, r4, s6, a5) {
  let c4, u6 = 1, f4 = e9.length, h5 = t5.length;
  if (void 0 !== s6 && ("ucs2" === (s6 = String(s6).toLowerCase()) || "ucs-2" === s6 || "utf16le" === s6 || "utf-16le" === s6)) {
    if (e9.length < 2 || t5.length < 2) return -1;
    u6 = 2, f4 /= 2, h5 /= 2, r4 /= 2;
  }
  function read2(e10, t6) {
    return 1 === u6 ? e10[t6] : e10.readUInt16BE(t6 * u6);
  }
  __name(read2, "read");
  if (a5) {
    let s7 = -1;
    for (c4 = r4; c4 < f4; c4++) if (read2(e9, c4) === read2(t5, -1 === s7 ? 0 : c4 - s7)) {
      if (-1 === s7 && (s7 = c4), c4 - s7 + 1 === h5) return s7 * u6;
    } else -1 !== s7 && (c4 -= c4 - s7), s7 = -1;
  } else for (r4 + h5 > f4 && (r4 = f4 - h5), c4 = r4; c4 >= 0; c4--) {
    let r5 = true;
    for (let s7 = 0; s7 < h5; s7++) if (read2(e9, c4 + s7) !== read2(t5, s7)) {
      r5 = false;
      break;
    }
    if (r5) return c4;
  }
  return -1;
}
function hexWrite(e9, t5, r4, s6) {
  r4 = Number(r4) || 0;
  const a5 = e9.length - r4;
  s6 ? (s6 = Number(s6)) > a5 && (s6 = a5) : s6 = a5;
  const c4 = t5.length;
  let u6;
  for (s6 > c4 / 2 && (s6 = c4 / 2), u6 = 0; u6 < s6; ++u6) {
    const s7 = Number.parseInt(t5.slice(2 * u6, 2 * u6 + 2), 16);
    if (numberIsNaN(s7)) return u6;
    e9[r4 + u6] = s7;
  }
  return u6;
}
function utf8Write(e9, t5, r4, s6) {
  return blitBuffer(utf8ToBytes(t5, e9.length - r4), e9, r4, s6);
}
function asciiWrite(e9, t5, r4, s6) {
  return blitBuffer((function(e10) {
    const t6 = [];
    for (let r5 = 0; r5 < e10.length; ++r5) t6.push(255 & e10.charCodeAt(r5));
    return t6;
  })(t5), e9, r4, s6);
}
function base64Write(e9, t5, r4, s6) {
  return blitBuffer(base64ToBytes(t5), e9, r4, s6);
}
function ucs2Write(e9, t5, r4, s6) {
  return blitBuffer((function(e10, t6) {
    let r5, s7, a5;
    const c4 = [];
    for (let u6 = 0; u6 < e10.length && !((t6 -= 2) < 0); ++u6) r5 = e10.charCodeAt(u6), s7 = r5 >> 8, a5 = r5 % 256, c4.push(a5, s7);
    return c4;
  })(t5, e9.length - r4), e9, r4, s6);
}
function base64Slice(e9, t5, r4) {
  return 0 === t5 && r4 === e9.length ? fromByteArray(e9) : fromByteArray(e9.slice(t5, r4));
}
function utf8Slice(e9, t5, r4) {
  r4 = Math.min(e9.length, r4);
  const s6 = [];
  let a5 = t5;
  for (; a5 < r4; ) {
    const t6 = e9[a5];
    let c4 = null, u6 = t6 > 239 ? 4 : t6 > 223 ? 3 : t6 > 191 ? 2 : 1;
    if (a5 + u6 <= r4) {
      let r5, s7, f4, h5;
      switch (u6) {
        case 1:
          t6 < 128 && (c4 = t6);
          break;
        case 2:
          r5 = e9[a5 + 1], 128 == (192 & r5) && (h5 = (31 & t6) << 6 | 63 & r5, h5 > 127 && (c4 = h5));
          break;
        case 3:
          r5 = e9[a5 + 1], s7 = e9[a5 + 2], 128 == (192 & r5) && 128 == (192 & s7) && (h5 = (15 & t6) << 12 | (63 & r5) << 6 | 63 & s7, h5 > 2047 && (h5 < 55296 || h5 > 57343) && (c4 = h5));
          break;
        case 4:
          r5 = e9[a5 + 1], s7 = e9[a5 + 2], f4 = e9[a5 + 3], 128 == (192 & r5) && 128 == (192 & s7) && 128 == (192 & f4) && (h5 = (15 & t6) << 18 | (63 & r5) << 12 | (63 & s7) << 6 | 63 & f4, h5 > 65535 && h5 < 1114112 && (c4 = h5));
      }
    }
    null === c4 ? (c4 = 65533, u6 = 1) : c4 > 65535 && (c4 -= 65536, s6.push(c4 >>> 10 & 1023 | 55296), c4 = 56320 | 1023 & c4), s6.push(c4), a5 += u6;
  }
  return (function(e10) {
    const t6 = e10.length;
    if (t6 <= u5) return String.fromCharCode.apply(String, e10);
    let r5 = "", s7 = 0;
    for (; s7 < t6; ) r5 += String.fromCharCode.apply(String, e10.slice(s7, s7 += u5));
    return r5;
  })(s6);
}
function asciiSlice(e9, t5, r4) {
  let s6 = "";
  r4 = Math.min(e9.length, r4);
  for (let a5 = t5; a5 < r4; ++a5) s6 += String.fromCharCode(127 & e9[a5]);
  return s6;
}
function latin1Slice(e9, t5, r4) {
  let s6 = "";
  r4 = Math.min(e9.length, r4);
  for (let a5 = t5; a5 < r4; ++a5) s6 += String.fromCharCode(e9[a5]);
  return s6;
}
function hexSlice(e9, t5, r4) {
  const s6 = e9.length;
  (!t5 || t5 < 0) && (t5 = 0), (!r4 || r4 < 0 || r4 > s6) && (r4 = s6);
  let a5 = "";
  for (let s7 = t5; s7 < r4; ++s7) a5 += d4[e9[s7]];
  return a5;
}
function utf16leSlice(e9, t5, r4) {
  const s6 = e9.slice(t5, r4);
  let a5 = "";
  for (let e10 = 0; e10 < s6.length - 1; e10 += 2) a5 += String.fromCharCode(s6[e10] + 256 * s6[e10 + 1]);
  return a5;
}
function checkOffset(e9, t5, r4) {
  if (e9 % 1 != 0 || e9 < 0) throw new RangeError("offset is not uint");
  if (e9 + t5 > r4) throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(e9, t5, r4, s6, a5, c4) {
  if (!Buffer$1.isBuffer(e9)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (t5 > a5 || t5 < c4) throw new RangeError('"value" argument is out of bounds');
  if (r4 + s6 > e9.length) throw new RangeError("Index out of range");
}
function wrtBigUInt64LE(e9, t5, r4, s6, a5) {
  checkIntBI(t5, s6, a5, e9, r4, 7);
  let c4 = Number(t5 & BigInt(4294967295));
  e9[r4++] = c4, c4 >>= 8, e9[r4++] = c4, c4 >>= 8, e9[r4++] = c4, c4 >>= 8, e9[r4++] = c4;
  let u6 = Number(t5 >> BigInt(32) & BigInt(4294967295));
  return e9[r4++] = u6, u6 >>= 8, e9[r4++] = u6, u6 >>= 8, e9[r4++] = u6, u6 >>= 8, e9[r4++] = u6, r4;
}
function wrtBigUInt64BE(e9, t5, r4, s6, a5) {
  checkIntBI(t5, s6, a5, e9, r4, 7);
  let c4 = Number(t5 & BigInt(4294967295));
  e9[r4 + 7] = c4, c4 >>= 8, e9[r4 + 6] = c4, c4 >>= 8, e9[r4 + 5] = c4, c4 >>= 8, e9[r4 + 4] = c4;
  let u6 = Number(t5 >> BigInt(32) & BigInt(4294967295));
  return e9[r4 + 3] = u6, u6 >>= 8, e9[r4 + 2] = u6, u6 >>= 8, e9[r4 + 1] = u6, u6 >>= 8, e9[r4] = u6, r4 + 8;
}
function checkIEEE754(e9, t5, r4, s6, a5, c4) {
  if (r4 + s6 > e9.length) throw new RangeError("Index out of range");
  if (r4 < 0) throw new RangeError("Index out of range");
}
function writeFloat(e9, t5, r4, s6, a5) {
  return t5 = +t5, r4 >>>= 0, a5 || checkIEEE754(e9, 0, r4, 4), write(e9, t5, r4, s6, 23, 4), r4 + 4;
}
function writeDouble(e9, t5, r4, s6, a5) {
  return t5 = +t5, r4 >>>= 0, a5 || checkIEEE754(e9, 0, r4, 8), write(e9, t5, r4, s6, 52, 8), r4 + 8;
}
function E$1(e9, t5, r4) {
  f3[e9] = class extends r4 {
    constructor() {
      super(), Object.defineProperty(this, "message", { value: Reflect.apply(t5, this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e9}]`, this.stack, delete this.name;
    }
    get code() {
      return e9;
    }
    set code(e10) {
      Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: e10, writable: true });
    }
    toString() {
      return `${this.name} [${e9}]: ${this.message}`;
    }
  };
}
function addNumericalSeparator(e9) {
  let t5 = "", r4 = e9.length;
  const s6 = "-" === e9[0] ? 1 : 0;
  for (; r4 >= s6 + 4; r4 -= 3) t5 = `_${e9.slice(r4 - 3, r4)}${t5}`;
  return `${e9.slice(0, r4)}${t5}`;
}
function checkIntBI(e9, t5, r4, s6, a5, c4) {
  if (e9 > r4 || e9 < t5) {
    const r5 = "bigint" == typeof t5 ? "n" : "";
    let s7;
    throw s7 = 0 === t5 || t5 === BigInt(0) ? `>= 0${r5} and < 2${r5} ** ${8 * (c4 + 1)}${r5}` : `>= -(2${r5} ** ${8 * (c4 + 1) - 1}${r5}) and < 2 ** ${8 * (c4 + 1) - 1}${r5}`, new f3.ERR_OUT_OF_RANGE("value", s7, e9);
  }
  !(function(e10, t6, r5) {
    validateNumber(t6, "offset"), void 0 !== e10[t6] && void 0 !== e10[t6 + r5] || boundsError(t6, e10.length - (r5 + 1));
  })(s6, a5, c4);
}
function validateNumber(e9, t5) {
  if ("number" != typeof e9) throw new f3.ERR_INVALID_ARG_TYPE(t5, "number", e9);
}
function boundsError(e9, t5, r4) {
  if (Math.floor(e9) !== e9) throw validateNumber(e9, r4), new f3.ERR_OUT_OF_RANGE("offset", "an integer", e9);
  if (t5 < 0) throw new f3.ERR_BUFFER_OUT_OF_BOUNDS();
  throw new f3.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${t5}`, e9);
}
function utf8ToBytes(e9, t5) {
  let r4;
  t5 = t5 || Number.POSITIVE_INFINITY;
  const s6 = e9.length;
  let a5 = null;
  const c4 = [];
  for (let u6 = 0; u6 < s6; ++u6) {
    if (r4 = e9.charCodeAt(u6), r4 > 55295 && r4 < 57344) {
      if (!a5) {
        if (r4 > 56319) {
          (t5 -= 3) > -1 && c4.push(239, 191, 189);
          continue;
        }
        if (u6 + 1 === s6) {
          (t5 -= 3) > -1 && c4.push(239, 191, 189);
          continue;
        }
        a5 = r4;
        continue;
      }
      if (r4 < 56320) {
        (t5 -= 3) > -1 && c4.push(239, 191, 189), a5 = r4;
        continue;
      }
      r4 = 65536 + (a5 - 55296 << 10 | r4 - 56320);
    } else a5 && (t5 -= 3) > -1 && c4.push(239, 191, 189);
    if (a5 = null, r4 < 128) {
      if ((t5 -= 1) < 0) break;
      c4.push(r4);
    } else if (r4 < 2048) {
      if ((t5 -= 2) < 0) break;
      c4.push(r4 >> 6 | 192, 63 & r4 | 128);
    } else if (r4 < 65536) {
      if ((t5 -= 3) < 0) break;
      c4.push(r4 >> 12 | 224, r4 >> 6 & 63 | 128, 63 & r4 | 128);
    } else {
      if (!(r4 < 1114112)) throw new Error("Invalid code point");
      if ((t5 -= 4) < 0) break;
      c4.push(r4 >> 18 | 240, r4 >> 12 & 63 | 128, r4 >> 6 & 63 | 128, 63 & r4 | 128);
    }
  }
  return c4;
}
function base64ToBytes(e9) {
  return toByteArray((function(e10) {
    if ((e10 = (e10 = e10.split("=")[0]).trim().replace(h4, "")).length < 2) return "";
    for (; e10.length % 4 != 0; ) e10 += "=";
    return e10;
  })(e9));
}
function blitBuffer(e9, t5, r4, s6) {
  let a5;
  for (a5 = 0; a5 < s6 && !(a5 + r4 >= t5.length || a5 >= e9.length); ++a5) t5[a5 + r4] = e9[a5];
  return a5;
}
function isInstance(e9, t5) {
  return e9 instanceof t5 || null != e9 && null != e9.constructor && null != e9.constructor.name && e9.constructor.name === t5.name;
}
function numberIsNaN(e9) {
  return e9 != e9;
}
function defineBigIntMethod(e9) {
  return "undefined" == typeof BigInt ? BufferBigIntNotDefined : e9;
}
function BufferBigIntNotDefined() {
  throw new Error("BigInt not supported");
}
function isEventTarget(e9) {
  return "function" == typeof e9?.addEventListener;
}
function addCatch(e9, t5, r4, s6) {
  if (e9[$]) try {
    const a5 = t5.then;
    "function" == typeof a5 && a5.call(t5, void 0, function(t6) {
      setTimeout(emitUnhandledRejectionOrErr, 0, e9, t6, r4, s6);
    });
  } catch (t6) {
    e9.emit("error", t6);
  }
}
function emitUnhandledRejectionOrErr(e9, t5, r4, s6) {
  if ("function" == typeof e9[C2]) e9[C2](t5, r4, ...s6);
  else {
    const r5 = e9[$];
    try {
      e9[$] = false, e9.emit("error", t5);
    } finally {
      e9[$] = r5;
    }
  }
}
function _getMaxListeners(e9) {
  return void 0 === e9._maxListeners ? E2 : e9._maxListeners;
}
function enhanceStackTrace(e9, t5) {
  let r4 = "";
  try {
    const { name: e10 } = this.constructor;
    "EventEmitter" !== e10 && (r4 = ` on ${e10} instance`);
  } catch {
  }
  const s6 = `
Emitted 'error' event${r4} at:
`, a5 = (t5.stack || "").split("\n").slice(1);
  return e9.stack + s6 + a5.join("\n");
}
function _addListener(e9, t5, r4, s6) {
  let a5, c4, u6;
  if (c4 = e9._events, void 0 === c4 ? (c4 = e9._events = { __proto__: null }, e9._eventsCount = 0) : (void 0 !== c4.newListener && (e9.emit("newListener", t5, r4.listener ?? r4), c4 = e9._events), u6 = c4[t5]), void 0 === u6) c4[t5] = r4, ++e9._eventsCount;
  else if ("function" == typeof u6 ? u6 = c4[t5] = s6 ? [r4, u6] : [u6, r4] : s6 ? u6.unshift(r4) : u6.push(r4), a5 = _getMaxListeners(e9), a5 > 0 && u6.length > a5 && !u6.warned) {
    u6.warned = true;
    const r5 = new S3(`Possible EventEmitter memory leak detected. ${u6.length} ${String(t5)} listeners added to ${inspect(e9)}. MaxListeners is ${a5}. Use emitter.setMaxListeners() to increase limit`, { name: "MaxListenersExceededWarning", emitter: e9, type: t5, count: u6.length });
    console.warn(r5);
  }
  return e9;
}
function onceWrapper() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function _onceWrap(e9, t5, r4) {
  const s6 = { fired: false, wrapFn: void 0, target: e9, type: t5, listener: r4 }, a5 = onceWrapper.bind(s6);
  return a5.listener = r4, s6.wrapFn = a5, a5;
}
function _listeners(e9, t5, r4) {
  const s6 = e9._events;
  if (void 0 === s6) return [];
  const a5 = s6[t5];
  return void 0 === a5 ? [] : "function" == typeof a5 ? r4 ? [a5.listener || a5] : [a5] : r4 ? (function(e10) {
    const t6 = arrayClone(e10);
    for (let e11 = 0; e11 < t6.length; ++e11) {
      const r5 = t6[e11].listener;
      "function" == typeof r5 && (t6[e11] = r5);
    }
    return t6;
  })(a5) : arrayClone(a5);
}
function arrayClone(e9) {
  switch (e9.length) {
    case 2:
      return [e9[0], e9[1]];
    case 3:
      return [e9[0], e9[1], e9[2]];
    case 4:
      return [e9[0], e9[1], e9[2], e9[3]];
    case 5:
      return [e9[0], e9[1], e9[2], e9[3], e9[4]];
    case 6:
      return [e9[0], e9[1], e9[2], e9[3], e9[4], e9[5]];
  }
  return Array.prototype.slice.call(e9);
}
function createIterResult(e9, t5) {
  return { value: e9, done: t5 };
}
function eventTargetAgnosticRemoveListener(e9, t5, r4, s6) {
  if ("function" == typeof e9.removeListener) e9.removeListener(t5, r4);
  else {
    if ("function" != typeof e9.removeEventListener) throw new I2("emitter", "EventEmitter", e9);
    e9.removeEventListener(t5, r4, s6);
  }
}
function eventTargetAgnosticAddListener(e9, t5, r4, s6) {
  if ("function" == typeof e9.on) s6?.once ? e9.once(t5, r4) : e9.on(t5, r4);
  else {
    if ("function" != typeof e9.addEventListener) throw new I2("emitter", "EventEmitter", e9);
    e9.addEventListener(t5, r4, s6);
  }
}
function createNextTickWithTimeout() {
  let e9, t5 = [], r4 = false, s6 = -1;
  function cleanUpNextTick() {
    r4 && e9 && (r4 = false, e9.length > 0 ? t5 = [...e9, ...t5] : s6 = -1, t5.length > 0 && drainQueue());
  }
  __name(cleanUpNextTick, "cleanUpNextTick");
  function drainQueue() {
    if (r4) return;
    const a5 = setTimeout(cleanUpNextTick);
    r4 = true;
    let c4 = t5.length;
    for (; c4; ) {
      for (e9 = t5, t5 = []; ++s6 < c4; ) e9 && e9[s6]();
      s6 = -1, c4 = t5.length;
    }
    e9 = void 0, r4 = false, clearTimeout(a5);
  }
  __name(drainQueue, "drainQueue");
  return (e10, ...s7) => {
    t5.push(e10.bind(void 0, ...s7)), 1 !== t5.length || r4 || setTimeout(drainQueue);
  };
}
function setTimeoutFallback(e9, t5, ...r4) {
  return new Timeout(e9, r4);
}
function setImmediateFallback(e9, ...t5) {
  return new Immediate(e9, t5);
}
function setIntervalFallback(e9, t5, ...r4) {
  return new Timeout(e9, r4);
}
function jsonParseTransform(e9, t5) {
  if (!("__proto__" === e9 || "constructor" === e9 && t5 && "object" == typeof t5 && "prototype" in t5)) return t5;
  !(function(e10) {
    console.warn(`[destr] Dropping "${e10}" key to prevent prototype pollution.`);
  })(e9);
}
function destr(e9, t5 = {}) {
  if ("string" != typeof e9) return e9;
  if ('"' === e9[0] && '"' === e9[e9.length - 1] && -1 === e9.indexOf("\\")) return e9.slice(1, -1);
  const r4 = e9.trim();
  if (r4.length <= 9) switch (r4.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    case "undefined":
      return;
    case "null":
      return null;
    case "nan":
      return Number.NaN;
    case "infinity":
      return Number.POSITIVE_INFINITY;
    case "-infinity":
      return Number.NEGATIVE_INFINITY;
  }
  if (!tr3.test(e9)) {
    if (t5.strict) throw new SyntaxError("[destr] Invalid JSON");
    return e9;
  }
  try {
    if (Xt3.test(e9) || er3.test(e9)) {
      if (t5.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e9, jsonParseTransform);
    }
    return JSON.parse(e9);
  } catch (r5) {
    if (t5.strict) throw r5;
    return e9;
  }
}
function encode(e9) {
  return encodeURI("" + e9).replace(fr3, "|");
}
function encodeQueryValue2(e9) {
  return encode("string" == typeof e9 ? e9 : JSON.stringify(e9)).replace(ar3, "%2B").replace(lr3, "+").replace(rr3, "%23").replace(nr3, "%26").replace(ur3, "`").replace(cr3, "^").replace(or3, "%2F");
}
function encodeQueryKey2(e9) {
  return encodeQueryValue2(e9).replace(sr3, "%3D");
}
function encodePath(e9) {
  return encode(e9).replace(rr3, "%23").replace(ir3, "%3F").replace(dr3, "%2F").replace(nr3, "%26").replace(ar3, "%2B");
}
function decode2(e9 = "") {
  try {
    return decodeURIComponent("" + e9);
  } catch {
    return "" + e9;
  }
}
function decodePath(e9) {
  return decode2(e9.replace(hr3, "%252F"));
}
function decodeQueryKey(e9) {
  return decode2(e9.replace(ar3, " "));
}
function decodeQueryValue(e9) {
  return decode2(e9.replace(ar3, " "));
}
function parseQuery(e9 = "") {
  const t5 = /* @__PURE__ */ Object.create(null);
  "?" === e9[0] && (e9 = e9.slice(1));
  for (const r4 of e9.split("&")) {
    const e10 = r4.match(/([^=]+)=?(.*)/) || [];
    if (e10.length < 2) continue;
    const s6 = decodeQueryKey(e10[1]);
    if ("__proto__" === s6 || "constructor" === s6) continue;
    const a5 = decodeQueryValue(e10[2] || "");
    void 0 === t5[s6] ? t5[s6] = a5 : Array.isArray(t5[s6]) ? t5[s6].push(a5) : t5[s6] = [t5[s6], a5];
  }
  return t5;
}
function stringifyQuery2(e9) {
  return Object.keys(e9).filter((t5) => void 0 !== e9[t5]).map((t5) => {
    return r4 = t5, "number" != typeof (s6 = e9[t5]) && "boolean" != typeof s6 || (s6 = String(s6)), s6 ? Array.isArray(s6) ? s6.map((e10) => `${encodeQueryKey2(r4)}=${encodeQueryValue2(e10)}`).join("&") : `${encodeQueryKey2(r4)}=${encodeQueryValue2(s6)}` : encodeQueryKey2(r4);
    var r4, s6;
  }).filter(Boolean).join("&");
}
function hasProtocol(e9, t5 = {}) {
  return "boolean" == typeof t5 && (t5 = { acceptRelative: t5 }), t5.strict ? pr3.test(e9) : gr3.test(e9) || !!t5.acceptRelative && mr3.test(e9);
}
function isScriptProtocol(e9) {
  return !!e9 && yr3.test(e9);
}
function hasTrailingSlash(e9 = "", t5) {
  return t5 ? wr3.test(e9) : e9.endsWith("/");
}
function withoutTrailingSlash(e9 = "", t5) {
  if (!t5) return (hasTrailingSlash(e9) ? e9.slice(0, -1) : e9) || "/";
  if (!hasTrailingSlash(e9, true)) return e9 || "/";
  let r4 = e9, s6 = "";
  const a5 = e9.indexOf("#");
  -1 !== a5 && (r4 = e9.slice(0, a5), s6 = e9.slice(a5));
  const [c4, ...u6] = r4.split("?");
  return ((c4.endsWith("/") ? c4.slice(0, -1) : c4) || "/") + (u6.length > 0 ? `?${u6.join("?")}` : "") + s6;
}
function withTrailingSlash(e9 = "", t5) {
  if (!t5) return e9.endsWith("/") ? e9 : e9 + "/";
  if (hasTrailingSlash(e9, true)) return e9 || "/";
  let r4 = e9, s6 = "";
  const a5 = e9.indexOf("#");
  if (-1 !== a5 && (r4 = e9.slice(0, a5), s6 = e9.slice(a5), !r4)) return s6;
  const [c4, ...u6] = r4.split("?");
  return c4 + "/" + (u6.length > 0 ? `?${u6.join("?")}` : "") + s6;
}
function withLeadingSlash(e9 = "") {
  return (function(e10 = "") {
    return e10.startsWith("/");
  })(e9) ? e9 : "/" + e9;
}
function withoutBase(e9, t5) {
  if (isEmptyURL(t5)) return e9;
  const r4 = withoutTrailingSlash(t5);
  if (!e9.startsWith(r4)) return e9;
  const s6 = e9[r4.length];
  if (s6 && "/" !== s6 && "?" !== s6) return e9;
  return "/" + e9.slice(r4.length).replace(/^\/+/, "");
}
function withQuery(e9, t5) {
  const r4 = parseURL(e9), s6 = { ...parseQuery(r4.search), ...t5 };
  return r4.search = stringifyQuery2(s6), (function(e10) {
    const t6 = e10.pathname || "", r5 = e10.search ? (e10.search.startsWith("?") ? "" : "?") + e10.search : "", s7 = e10.hash || "", a5 = e10.auth ? e10.auth + "@" : "", c4 = e10.host || "", u6 = e10.protocol || e10[vr3] ? (e10.protocol || "") + "//" : "";
    return u6 + a5 + c4 + t6 + r5 + s7;
  })(r4);
}
function getQuery$1(e9) {
  return parseQuery(parseURL(e9).search);
}
function isEmptyURL(e9) {
  return !e9 || "/" === e9;
}
function joinURL(e9, ...t5) {
  let r4 = e9 || "";
  for (const e10 of t5.filter((e11) => /* @__PURE__ */ (function(e12) {
    return e12 && "/" !== e12;
  })(e11))) if (r4) {
    const t6 = e10.replace(br3, "");
    r4 = withTrailingSlash(r4) + t6;
  } else r4 = e10;
  return r4;
}
function joinRelativeURL(...e9) {
  const t5 = /\/(?!\/)/, r4 = e9.filter(Boolean), s6 = [];
  let a5 = 0;
  for (const e10 of r4) if (e10 && "/" !== e10) {
    for (const [r5, c5] of e10.split(t5).entries()) if (c5 && "." !== c5) if (".." !== c5) 1 === r5 && s6[s6.length - 1]?.endsWith(":/") ? s6[s6.length - 1] += "/" + c5 : (s6.push(c5), a5++);
    else {
      if (1 === s6.length && hasProtocol(s6[0])) continue;
      s6.pop(), a5--;
    }
  }
  let c4 = s6.join("/");
  return a5 >= 0 ? r4[0]?.startsWith("/") && !c4.startsWith("/") ? c4 = "/" + c4 : r4[0]?.startsWith("./") && !c4.startsWith("./") && (c4 = "./" + c4) : c4 = "../".repeat(-1 * a5) + c4, r4[r4.length - 1]?.endsWith("/") && !c4.endsWith("/") && (c4 += "/"), c4;
}
function parseURL(e9 = "", t5) {
  const r4 = e9.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (r4) {
    const [, e10, t6 = ""] = r4;
    return { protocol: e10.toLowerCase(), pathname: t6, href: e10 + t6, auth: "", host: "", search: "", hash: "" };
  }
  if (!hasProtocol(e9, { acceptRelative: true })) return parsePath(e9);
  const [, s6 = "", a5, c4 = ""] = e9.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, u6 = "", f4 = ""] = c4.match(/([^#/?]*)(.*)?/) || [];
  "file:" === s6 && (f4 = f4.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: h5, search: d5, hash: g3 } = parsePath(f4);
  return { protocol: s6.toLowerCase(), auth: a5 ? a5.slice(0, Math.max(0, a5.length - 1)) : "", host: u6, pathname: h5, search: d5, hash: g3, [vr3]: !s6 };
}
function parsePath(e9 = "") {
  const [t5 = "", r4 = "", s6 = ""] = (e9.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return { pathname: t5, search: r4, hash: s6 };
}
function createRouter$1(e9 = {}) {
  const t5 = { options: e9, rootNode: createRadixNode(), staticRoutesMap: {} }, normalizeTrailingSlash = /* @__PURE__ */ __name((t6) => e9.strictTrailingSlash ? t6 : t6.replace(/\/$/, "") || "/", "normalizeTrailingSlash");
  if (e9.routes) for (const r4 in e9.routes) insert(t5, normalizeTrailingSlash(r4), e9.routes[r4]);
  return { ctx: t5, lookup: /* @__PURE__ */ __name((e10) => (function(e11, t6) {
    const r4 = e11.staticRoutesMap[t6];
    if (r4) return r4.data;
    const s6 = t6.split("/"), a5 = {};
    let c4 = false, u6 = null, f4 = e11.rootNode, h5 = null;
    for (let e12 = 0; e12 < s6.length; e12++) {
      const t7 = s6[e12];
      null !== f4.wildcardChildNode && (u6 = f4.wildcardChildNode, h5 = s6.slice(e12).join("/"));
      const r5 = f4.children.get(t7);
      if (void 0 === r5) {
        if (f4 && f4.placeholderChildren.length > 1) {
          const t8 = s6.length - e12;
          f4 = f4.placeholderChildren.find((e13) => e13.maxDepth === t8) || null;
        } else f4 = f4.placeholderChildren[0] || null;
        if (!f4) break;
        f4.paramName && (a5[f4.paramName] = t7), c4 = true;
      } else f4 = r5;
    }
    null !== f4 && null !== f4.data || null === u6 || (f4 = u6, a5[f4.paramName || "_"] = h5, c4 = true);
    if (!f4) return null;
    if (c4) return { ...f4.data, params: c4 ? a5 : void 0 };
    return f4.data;
  })(t5, normalizeTrailingSlash(e10)), "lookup"), insert: /* @__PURE__ */ __name((e10, r4) => insert(t5, normalizeTrailingSlash(e10), r4), "insert"), remove: /* @__PURE__ */ __name((e10) => (function(e11, t6) {
    let r4 = false;
    const s6 = t6.split("/");
    let a5 = e11.rootNode;
    for (const e12 of s6) if (a5 = a5.children.get(e12), !a5) return r4;
    if (a5.data) {
      const e12 = s6.at(-1) || "";
      a5.data = null, 0 === Object.keys(a5.children).length && a5.parent && (a5.parent.children.delete(e12), a5.parent.wildcardChildNode = null, a5.parent.placeholderChildren = []), r4 = true;
    }
    return r4;
  })(t5, normalizeTrailingSlash(e10)), "remove") };
}
function insert(e9, t5, r4) {
  let s6 = true;
  const a5 = t5.split("/");
  let c4 = e9.rootNode, u6 = 0;
  const f4 = [c4];
  for (const e10 of a5) {
    let t6;
    if (t6 = c4.children.get(e10)) c4 = t6;
    else {
      const r5 = getNodeType(e10);
      t6 = createRadixNode({ type: r5, parent: c4 }), c4.children.set(e10, t6), r5 === Rr3 ? (t6.paramName = "*" === e10 ? "_" + u6++ : e10.slice(1), c4.placeholderChildren.push(t6), s6 = false) : r5 === Er3 && (c4.wildcardChildNode = t6, t6.paramName = e10.slice(3) || "_", s6 = false), f4.push(t6), c4 = t6;
    }
  }
  for (const [e10, t6] of f4.entries()) t6.maxDepth = Math.max(f4.length - e10, t6.maxDepth || 0);
  return c4.data = r4, true === s6 && (e9.staticRoutesMap[t5] = c4), c4;
}
function createRadixNode(e9 = {}) {
  return { type: e9.type || _r3, maxDepth: 0, parent: e9.parent || null, children: /* @__PURE__ */ new Map(), data: e9.data || null, paramName: e9.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function getNodeType(e9) {
  return e9.startsWith("**") ? Er3 : ":" === e9[0] || "*" === e9 ? Rr3 : _r3;
}
function toRouteMatcher(e9) {
  return /* @__PURE__ */ (function(e10, t5) {
    return { ctx: { table: e10 }, matchAll: /* @__PURE__ */ __name((r4) => _matchRoutes(r4, e10, t5), "matchAll") };
  })(_routerNodeToTable("", e9.ctx.rootNode), e9.ctx.options.strictTrailingSlash);
}
function _matchRoutes(e9, t5, r4) {
  true !== r4 && e9.endsWith("/") && (e9 = e9.slice(0, -1) || "/");
  const s6 = [];
  for (const [r5, a6] of _sortRoutesMap(t5.wildcard)) (e9 === r5 || e9.startsWith(r5 + "/")) && s6.push(a6);
  for (const [r5, a6] of _sortRoutesMap(t5.dynamic)) if (e9.startsWith(r5 + "/")) {
    const t6 = "/" + e9.slice(r5.length).split("/").splice(2).join("/");
    s6.push(..._matchRoutes(t6, a6));
  }
  const a5 = t5.static.get(e9);
  return a5 && s6.push(a5), s6.filter(Boolean);
}
function _sortRoutesMap(e9) {
  return [...e9.entries()].sort((e10, t5) => e10[0].length - t5[0].length);
}
function _routerNodeToTable(e9, t5) {
  const r4 = { static: /* @__PURE__ */ new Map(), wildcard: /* @__PURE__ */ new Map(), dynamic: /* @__PURE__ */ new Map() };
  return (/* @__PURE__ */ __name(function _addNode(e10, t6) {
    if (e10) if (t6.type !== _r3 || e10.includes("*") || e10.includes(":")) {
      if (t6.type === Er3) r4.wildcard.set(e10.replace("/**", ""), t6.data);
      else if (t6.type === Rr3) {
        const s6 = _routerNodeToTable("", t6);
        return t6.data && s6.static.set("/", t6.data), void r4.dynamic.set(e10.replace(/\/\*|\/:\w+/, ""), s6);
      }
    } else t6.data && r4.static.set(e10, t6.data);
    for (const [r5, s6] of t6.children.entries()) _addNode(`${e10}/${r5}`.replace("//", "/"), s6);
  }, "_addNode"))(e9, t5), r4;
}
function isPlainObject3(e9) {
  if (null === e9 || "object" != typeof e9) return false;
  const t5 = Object.getPrototypeOf(e9);
  return (null === t5 || t5 === Object.prototype || null === Object.getPrototypeOf(t5)) && (!(Symbol.iterator in e9) && (!(Symbol.toStringTag in e9) || "[object Module]" === Object.prototype.toString.call(e9)));
}
function _defu(e9, t5, r4 = ".", s6) {
  if (!isPlainObject3(t5)) return _defu(e9, {}, r4, s6);
  const a5 = { ...t5 };
  for (const t6 of Object.keys(e9)) {
    if ("__proto__" === t6 || "constructor" === t6) continue;
    const c4 = e9[t6];
    null != c4 && (s6 && s6(a5, t6, c4, r4) || (Array.isArray(c4) && Array.isArray(a5[t6]) ? a5[t6] = [...c4, ...a5[t6]] : isPlainObject3(c4) && isPlainObject3(a5[t6]) ? a5[t6] = _defu(c4, a5[t6], (r4 ? `${r4}.` : "") + t6.toString(), s6) : a5[t6] = c4));
  }
  return a5;
}
function createDefu(e9) {
  return (...t5) => t5.reduce((t6, r4) => _defu(t6, r4, "", e9), {});
}
function o4(e9) {
  throw new Error(`${e9} is not implemented yet!`);
}
function p5(e9) {
  const t5 = {};
  for (const [r4, s6] of Object.entries(e9)) r4 && (t5[r4] = (Array.isArray(s6) ? s6 : [s6]).filter(Boolean));
  return t5;
}
function v4(e9 = {}) {
  if (e9 instanceof Headers) return e9;
  const t5 = new Headers();
  for (const [r4, s6] of Object.entries(e9)) if (void 0 !== s6) {
    if (Array.isArray(s6)) {
      for (const e10 of s6) t5.append(r4, String(e10));
      continue;
    }
    t5.set(r4, String(s6));
  }
  return t5;
}
async function b3(e9, t5) {
  const r4 = new y3(), s6 = new w2(r4);
  let a5;
  if (r4.url = t5.url?.toString() || "/", !r4.url.startsWith("/")) {
    const e10 = new URL(r4.url);
    a5 = e10.host, r4.url = e10.pathname + e10.search + e10.hash;
  }
  r4.method = t5.method || "GET", r4.headers = (function(e10 = {}) {
    const t6 = new Sr3(), r5 = Array.isArray(e10) || (function(e11) {
      return "function" == typeof e11?.entries;
    })(e10) ? e10 : Object.entries(e10);
    for (const [e11, s7] of r5) if (s7) {
      if (void 0 === t6[e11]) {
        t6[e11] = s7;
        continue;
      }
      t6[e11] = [...Array.isArray(t6[e11]) ? t6[e11] : [t6[e11]], ...Array.isArray(s7) ? s7 : [s7]];
    }
    return t6;
  })(t5.headers || {}), r4.headers.host || (r4.headers.host = t5.host || a5 || "localhost"), r4.connection.encrypted = r4.connection.encrypted || "https" === t5.protocol, r4.body = t5.body || null, r4.__unenv__ = t5.context, await e9(r4, s6);
  let c4 = s6._data;
  (kr3.has(s6.statusCode) || "HEAD" === r4.method.toUpperCase()) && (c4 = null, delete s6._headers["content-length"]);
  const u6 = { status: s6.statusCode, statusText: s6.statusMessage, headers: s6._headers, body: c4 };
  return r4.destroy(), s6.destroy(), u6;
}
function hasProp2(e9, t5) {
  try {
    return t5 in e9;
  } catch {
    return false;
  }
}
function createError(e9) {
  if ("string" == typeof e9) return new H3Error(e9);
  if (isError(e9)) return e9;
  const t5 = new H3Error(e9.message ?? e9.statusMessage ?? "", { cause: e9.cause || e9 });
  if (hasProp2(e9, "stack")) try {
    Object.defineProperty(t5, "stack", { get: /* @__PURE__ */ __name(() => e9.stack, "get") });
  } catch {
    try {
      t5.stack = e9.stack;
    } catch {
    }
  }
  if (e9.data && (t5.data = e9.data), e9.statusCode ? t5.statusCode = sanitizeStatusCode(e9.statusCode, t5.statusCode) : e9.status && (t5.statusCode = sanitizeStatusCode(e9.status, t5.statusCode)), e9.statusMessage ? t5.statusMessage = e9.statusMessage : e9.statusText && (t5.statusMessage = e9.statusText), t5.statusMessage) {
    const e10 = t5.statusMessage;
    sanitizeStatusMessage(t5.statusMessage) !== e10 && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
  }
  return void 0 !== e9.fatal && (t5.fatal = e9.fatal), void 0 !== e9.unhandled && (t5.unhandled = e9.unhandled), t5;
}
function isError(e9) {
  return true === e9?.constructor?.__h3_error__;
}
function process(e9, t5) {
  const r4 = {}, s6 = t5.find((e10) => "content-disposition" === e10[0])?.[1] || "";
  for (const e10 of s6.split(";")) {
    const t6 = e10.split("=");
    if (2 !== t6.length) continue;
    const s7 = (t6[0] || "").trim();
    if ("name" === s7 || "filename" === s7) {
      const e11 = (t6[1] || "").trim().replace(/"/g, "");
      r4[s7] = g2.from(e11, "latin1").toString("utf8");
    }
  }
  const a5 = t5.find((e10) => "content-type" === e10[0])?.[1] || "";
  return a5 && (r4.type = a5), r4.data = g2.from(e9), r4;
}
function getQuery(e9) {
  return getQuery$1(e9.path || "");
}
function getRequestHeaders(e9) {
  const t5 = {};
  for (const r4 in e9.node.req.headers) {
    const s6 = e9.node.req.headers[r4];
    t5[r4] = Array.isArray(s6) ? s6.filter(Boolean).join(", ") : s6;
  }
  return t5;
}
function getRequestHeader(e9, t5) {
  return getRequestHeaders(e9)[t5.toLowerCase()];
}
function readRawBody(e9, t5 = "utf8") {
  !(function(e10, t6) {
    if (!(function(e11, t7) {
      if ("string" == typeof t7) {
        if (e11.method === t7) return true;
      } else if (t7.includes(e11.method)) return true;
      return false;
    })(e10, t6)) throw createError({ statusCode: 405, statusMessage: "HTTP method is not allowed." });
  })(e9, Or3);
  const r4 = e9._requestBody || e9.web?.request?.body || e9.node.req[$r3] || e9.node.req.rawBody || e9.node.req.body;
  if (r4) {
    const e10 = Promise.resolve(r4).then((e11) => g2.isBuffer(e11) ? e11 : "function" == typeof e11.pipeTo ? new Promise((t6, r5) => {
      const s7 = [];
      e11.pipeTo(new WritableStream({ write(e12) {
        s7.push(e12);
      }, close() {
        t6(g2.concat(s7));
      }, abort(e12) {
        r5(e12);
      } })).catch(r5);
    }) : "function" == typeof e11.pipe ? new Promise((t6, r5) => {
      const s7 = [];
      e11.on("data", (e12) => {
        s7.push(e12);
      }).on("end", () => {
        t6(g2.concat(s7));
      }).on("error", r5);
    }) : e11.constructor === Object ? g2.from(JSON.stringify(e11)) : e11 instanceof URLSearchParams ? g2.from(e11.toString()) : e11 instanceof FormData ? new Response(e11).bytes().then((e12) => g2.from(e12)) : g2.from(e11));
    return t5 ? e10.then((e11) => e11.toString(t5)) : e10;
  }
  if (!Number.parseInt(e9.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(String(e9.node.req.headers["transfer-encoding"] ?? ""))) return Promise.resolve(void 0);
  const s6 = e9.node.req[$r3] = new Promise((t6, r5) => {
    const s7 = [];
    e9.node.req.on("error", (e10) => {
      r5(e10);
    }).on("data", (e10) => {
      s7.push(e10);
    }).on("end", () => {
      t6(g2.concat(s7));
    });
  });
  return t5 ? s6.then((e10) => e10.toString(t5)) : s6;
}
async function readBody(e9, t5 = {}) {
  const r4 = e9.node.req;
  if (hasProp2(r4, jr3)) return r4[jr3];
  const s6 = r4.headers["content-type"] || "", a5 = await readRawBody(e9);
  let c4;
  return c4 = "application/json" === s6 ? _parseJSON(a5, t5.strict ?? true) : s6.startsWith("application/x-www-form-urlencoded") ? (function(e10) {
    const t6 = new URLSearchParams(e10), r5 = /* @__PURE__ */ Object.create(null);
    for (const [e11, s7] of t6.entries()) hasProp2(r5, e11) ? (Array.isArray(r5[e11]) || (r5[e11] = [r5[e11]]), r5[e11].push(s7)) : r5[e11] = s7;
    return r5;
  })(a5) : s6.startsWith("text/") ? a5 : _parseJSON(a5, t5.strict ?? false), r4[jr3] = c4, c4;
}
async function readMultipartFormData(e9) {
  const t5 = getRequestHeader(e9, "content-type");
  if (!t5 || !t5.startsWith("multipart/form-data")) return;
  const r4 = t5.match(/boundary=([^;]*)(;|$)/i)?.[1];
  if (!r4) return;
  const s6 = await readRawBody(e9, false);
  return s6 ? (function(e10, t6) {
    let r5 = "", s7 = 0, a5 = [];
    const c4 = [];
    let u6 = [];
    for (let f4 = 0; f4 < e10.length; f4++) {
      const h5 = f4 > 0 ? e10[f4 - 1] : null, d5 = e10[f4];
      10 === d5 || 13 === d5 || (r5 += String.fromCodePoint(d5));
      const g3 = 10 === d5 && 13 === h5;
      if (0 === s7 && g3) "--" + t6 === r5 && (s7 = 1), r5 = "";
      else if (1 === s7 && g3) {
        if (r5.length > 0) {
          const e11 = r5.indexOf(":");
          if (e11 > 0) {
            const t7 = r5.slice(0, e11).toLowerCase(), s8 = r5.slice(e11 + 1).trim();
            u6.push([t7, s8]);
          }
        } else s7 = 2, a5 = [];
        r5 = "";
      } else if (2 === s7) {
        if (r5.length > t6.length + 4 && (r5 = ""), "--" + t6 === r5) {
          const e11 = a5.length - r5.length, t7 = a5.slice(0, e11 - 1);
          c4.push(process(t7, u6)), a5 = [], u6 = [], r5 = "", s7 = 3;
        } else a5.push(d5);
        g3 && (r5 = "");
      } else 3 === s7 && g3 && (s7 = 1);
    }
    return c4;
  })(s6, r4) : void 0;
}
function _parseJSON(e9 = "", t5) {
  if (e9) try {
    return destr(e9, { strict: t5 });
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Invalid JSON body" });
  }
}
function handleCacheHeaders(e9, t5) {
  const r4 = ["public", ...t5.cacheControls || []];
  let s6 = false;
  if (void 0 !== t5.maxAge && r4.push("max-age=" + +t5.maxAge, "s-maxage=" + +t5.maxAge), t5.modifiedTime) {
    const r5 = new Date(t5.modifiedTime), a5 = e9.node.req.headers["if-modified-since"];
    e9.node.res.setHeader("last-modified", r5.toUTCString()), a5 && new Date(a5) >= r5 && (s6 = true);
  }
  if (t5.etag) {
    e9.node.res.setHeader("etag", t5.etag);
    e9.node.req.headers["if-none-match"] === t5.etag && (s6 = true);
  }
  return e9.node.res.setHeader("cache-control", r4.join(", ")), !!s6 && (e9.node.res.statusCode = 304, e9.handled || e9.node.res.end(), true);
}
function sanitizeStatusMessage(e9 = "") {
  return e9.replace(Lr3, "");
}
function sanitizeStatusCode(e9, t5 = 200) {
  return e9 ? ("string" == typeof e9 && (e9 = Number.parseInt(e9, 10)), e9 < 100 || e9 > 999 ? t5 : e9) : t5;
}
function splitCookiesString(e9) {
  if (Array.isArray(e9)) return e9.flatMap((e10) => splitCookiesString(e10));
  if ("string" != typeof e9) return [];
  const t5 = [];
  let r4, s6, a5, c4, u6, f4 = 0;
  const skipWhitespace = /* @__PURE__ */ __name(() => {
    for (; f4 < e9.length && /\s/.test(e9.charAt(f4)); ) f4 += 1;
    return f4 < e9.length;
  }, "skipWhitespace"), notSpecialChar = /* @__PURE__ */ __name(() => (s6 = e9.charAt(f4), "=" !== s6 && ";" !== s6 && "," !== s6), "notSpecialChar");
  for (; f4 < e9.length; ) {
    for (r4 = f4, u6 = false; skipWhitespace(); ) if (s6 = e9.charAt(f4), "," === s6) {
      for (a5 = f4, f4 += 1, skipWhitespace(), c4 = f4; f4 < e9.length && notSpecialChar(); ) f4 += 1;
      f4 < e9.length && "=" === e9.charAt(f4) ? (u6 = true, f4 = c4, t5.push(e9.slice(r4, a5)), r4 = f4) : f4 = a5 + 1;
    } else f4 += 1;
    (!u6 || f4 >= e9.length) && t5.push(e9.slice(r4));
  }
  return t5;
}
function send(e9, t5, r4) {
  return r4 && (function(e10, t6) {
    t6 && 304 !== e10.node.res.statusCode && !e10.node.res.getHeader("content-type") && e10.node.res.setHeader("content-type", t6);
  })(e9, r4), new Promise((r5) => {
    Nr3(() => {
      e9.handled || e9.node.res.end(t5), r5();
    });
  });
}
function setResponseStatus(e9, t5, r4) {
  t5 && (e9.node.res.statusCode = sanitizeStatusCode(t5, e9.node.res.statusCode)), r4 && (e9.node.res.statusMessage = sanitizeStatusMessage(r4));
}
function getResponseStatus(e9) {
  return e9.node.res.statusCode;
}
function getResponseStatusText(e9) {
  return e9.node.res.statusMessage;
}
function setResponseHeaders(e9, t5) {
  for (const [r4, s6] of Object.entries(t5)) e9.node.res.setHeader(r4, s6);
}
function setResponseHeader(e9, t5, r4) {
  e9.node.res.setHeader(t5, r4);
}
function appendResponseHeader(e9, t5, r4) {
  let s6 = e9.node.res.getHeader(t5);
  s6 ? (Array.isArray(s6) || (s6 = [s6.toString()]), e9.node.res.setHeader(t5, [...s6, r4])) : e9.node.res.setHeader(t5, r4);
}
function sendStream(e9, t5) {
  if (!t5 || "object" != typeof t5) throw new Error("[h3] Invalid stream provided.");
  if (e9.node.res._data = t5, !e9.node.res.socket) return e9._handled = true, Promise.resolve();
  if (hasProp2(t5, "pipeTo") && "function" == typeof t5.pipeTo) return t5.pipeTo(new WritableStream({ write(t6) {
    e9.node.res.write(t6);
  } })).then(() => {
    e9.node.res.end();
  });
  if (hasProp2(t5, "pipe") && "function" == typeof t5.pipe) return new Promise((r4, s6) => {
    t5.pipe(e9.node.res), t5.on && (t5.on("end", () => {
      e9.node.res.end(), r4();
    }), t5.on("error", (e10) => {
      s6(e10);
    })), e9.node.res.on("close", () => {
      t5.abort && t5.abort();
    });
  });
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(e9, t5) {
  for (const [r4, s6] of t5.headers) "set-cookie" === r4 ? e9.node.res.appendHeader(r4, splitCookiesString(s6)) : e9.node.res.setHeader(r4, s6);
  if (t5.status && (e9.node.res.statusCode = sanitizeStatusCode(t5.status, e9.node.res.statusCode)), t5.statusText && (e9.node.res.statusMessage = sanitizeStatusMessage(t5.statusText)), t5.redirected && e9.node.res.setHeader("location", t5.url), t5.body) return sendStream(e9, t5.body);
  e9.node.res.end();
}
async function proxyRequest(e9, t5, r4 = {}) {
  let s6, a5;
  Mr3.has(e9.method) && (r4.streamRequest ? (s6 = (function(e10) {
    if (!Or3.includes(e10.method)) return;
    const t6 = e10.web?.request?.body || e10._requestBody;
    return t6 || ($r3 in e10.node.req || "rawBody" in e10.node.req || "body" in e10.node.req || "__unenv__" in e10.node.req ? new ReadableStream({ async start(t7) {
      const r5 = await readRawBody(e10, false);
      r5 && t7.enqueue(r5), t7.close();
    } }) : new ReadableStream({ start: /* @__PURE__ */ __name((t7) => {
      e10.node.req.on("data", (e11) => {
        t7.enqueue(e11);
      }), e10.node.req.on("end", () => {
        t7.close();
      }), e10.node.req.on("error", (e11) => {
        t7.error(e11);
      });
    }, "start") }));
  })(e9), a5 = "half") : s6 = await readRawBody(e9, false).catch(() => {
  }));
  const c4 = r4.fetchOptions?.method || e9.method, u6 = (function(e10, ...t6) {
    const r5 = t6.filter(Boolean);
    if (0 === r5.length) return e10;
    const s7 = new Headers(e10);
    for (const e11 of r5) {
      const t7 = Array.isArray(e11) ? e11 : "function" == typeof e11.entries ? e11.entries() : Object.entries(e11);
      for (const [e12, r6] of t7) void 0 !== r6 && s7.set(e12, r6);
    }
    return s7;
  })(getProxyRequestHeaders(e9, { host: t5.startsWith("/") }), r4.fetchOptions?.headers, r4.headers);
  return (async function(e10, t6, r5 = {}) {
    let s7;
    try {
      s7 = await _getFetch(r5.fetch)(t6, { headers: r5.headers, ignoreResponseError: true, ...r5.fetchOptions });
    } catch (e11) {
      throw createError({ status: 502, statusMessage: "Bad Gateway", cause: e11 });
    }
    e10.node.res.statusCode = sanitizeStatusCode(s7.status, e10.node.res.statusCode), e10.node.res.statusMessage = sanitizeStatusMessage(s7.statusText);
    const a6 = [];
    for (const [t7, r6] of s7.headers.entries()) "content-encoding" !== t7 && "content-length" !== t7 && ("set-cookie" !== t7 ? e10.node.res.setHeader(t7, r6) : a6.push(...splitCookiesString(r6)));
    a6.length > 0 && e10.node.res.setHeader("set-cookie", a6.map((e11) => (r5.cookieDomainRewrite && (e11 = rewriteCookieProperty(e11, r5.cookieDomainRewrite, "domain")), r5.cookiePathRewrite && (e11 = rewriteCookieProperty(e11, r5.cookiePathRewrite, "path")), e11)));
    r5.onResponse && await r5.onResponse(e10, s7);
    if (void 0 !== s7._data) return s7._data;
    if (e10.handled) return;
    if (false === r5.sendStream) {
      const t7 = new Uint8Array(await s7.arrayBuffer());
      return e10.node.res.end(t7);
    }
    if (s7.body) for await (const t7 of s7.body) e10.node.res.write(t7);
    return e10.node.res.end();
  })(e9, t5, { ...r4, fetchOptions: { method: c4, body: s6, duplex: a5, ...r4.fetchOptions, headers: u6 } });
}
function getProxyRequestHeaders(e9, t5) {
  const r4 = /* @__PURE__ */ Object.create(null), s6 = getRequestHeaders(e9);
  for (const e10 in s6) (!Hr2.has(e10) || "host" === e10 && t5?.host) && (r4[e10] = s6[e10]);
  return r4;
}
function fetchWithEvent(e9, t5, r4, s6) {
  return _getFetch(s6?.fetch)(t5, { ...r4, context: r4?.context || e9.context, headers: { ...getProxyRequestHeaders(e9, { host: "string" == typeof t5 && t5.startsWith("/") }), ...r4?.headers } });
}
function _getFetch(e9) {
  if (e9) return e9;
  if (globalThis.fetch) return globalThis.fetch;
  throw new Error("fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js.");
}
function rewriteCookieProperty(e9, t5, r4) {
  const s6 = "string" == typeof t5 ? { "*": t5 } : t5;
  return e9.replace(new RegExp(`(;\\s*${r4}=)([^;]+)`, "gi"), (e10, t6, r5) => {
    let a5;
    if (r5 in s6) a5 = s6[r5];
    else {
      if (!("*" in s6)) return e10;
      a5 = s6["*"];
    }
    return a5 ? t6 + a5 : "";
  });
}
function isEvent(e9) {
  return hasProp2(e9, "__is_event__");
}
function createEvent(e9, t5) {
  return new H3Event(e9, t5);
}
function defineEventHandler(e9) {
  if ("function" == typeof e9) return e9.__is_handler__ = true, e9;
  const t5 = { onRequest: _normalizeArray(e9.onRequest), onBeforeResponse: _normalizeArray(e9.onBeforeResponse) }, _handler = /* @__PURE__ */ __name((r4) => (async function(e10, t6, r5) {
    if (r5.onRequest) {
      for (const t7 of r5.onRequest) if (await t7(e10), e10.handled) return;
    }
    const s6 = await t6(e10), a5 = { body: s6 };
    if (r5.onBeforeResponse) for (const t7 of r5.onBeforeResponse) await t7(e10, a5);
    return a5.body;
  })(r4, e9.handler, t5), "_handler");
  return _handler.__is_handler__ = true, _handler.__resolve__ = e9.handler.__resolve__, _handler.__websocket__ = e9.websocket, _handler;
}
function _normalizeArray(e9) {
  return e9 ? Array.isArray(e9) ? e9 : [e9] : void 0;
}
function toEventHandler(e9, t5, r4) {
  return e9;
}
function createApp2(e9 = {}) {
  const t5 = [], r4 = (function(e10, t6) {
    const r5 = t6.debug ? 2 : void 0;
    return zr2(async (s7) => {
      s7.node.req.originalUrl = s7.node.req.originalUrl || s7.node.req.url || "/";
      const a6 = s7.node.req.url || "/", c5 = (function(e11) {
        const t7 = e11.indexOf("?"), r6 = -1 === t7 ? e11 : e11.slice(0, t7), s8 = -1 === t7 ? "" : e11.slice(t7);
        return (r6.includes("%25") ? decodePath(r6.replace(/%25/g, "%2525")) : decodePath(r6)) + s8;
      })(s7._path || a6);
      s7._path = c5;
      const u6 = c5 !== a6;
      let f4;
      t6.onRequest && await t6.onRequest(s7);
      for (const h5 of e10) {
        if (h5.route.length > 1) {
          if (!c5.startsWith(h5.route)) continue;
          f4 = c5.slice(h5.route.length) || "/";
        } else f4 = c5;
        if (h5.match && !h5.match(f4, s7)) continue;
        s7._path = f4, s7.node.req.url = u6 ? h5.route.length > 1 ? a6.slice(h5.route.length) || "/" : a6 : f4;
        const e11 = await h5.handler(s7), d5 = void 0 === e11 ? void 0 : await e11;
        if (void 0 !== d5) {
          const e12 = { body: d5 };
          return t6.onBeforeResponse && (s7._onBeforeResponseCalled = true, await t6.onBeforeResponse(s7, e12)), await handleHandlerResponse(s7, e12.body, r5), void (t6.onAfterResponse && (s7._onAfterResponseCalled = true, await t6.onAfterResponse(s7, e12)));
        }
        if (s7.handled) return void (t6.onAfterResponse && (s7._onAfterResponseCalled = true, await t6.onAfterResponse(s7, void 0)));
      }
      if (!s7.handled) throw createError({ statusCode: 404, statusMessage: `Cannot find any path matching ${s7.path || "/"}.` });
      t6.onAfterResponse && (s7._onAfterResponseCalled = true, await t6.onAfterResponse(s7, void 0));
    });
  })(t5, e9), s6 = /* @__PURE__ */ (function(e10) {
    return async (t6) => {
      let r5;
      for (const s7 of e10) {
        if ("/" === s7.route && !s7.handler.__resolve__) continue;
        if (!t6.startsWith(s7.route)) continue;
        if (r5 = t6.slice(s7.route.length) || "/", s7.match && !s7.match(r5, void 0)) continue;
        let e11 = { route: s7.route, handler: s7.handler };
        if (e11.handler.__resolve__) {
          const t7 = await e11.handler.__resolve__(r5);
          if (!t7) continue;
          e11 = { ...e11, ...t7, route: joinURL(e11.route || "/", t7.route || "/") };
        }
        return e11;
      }
    };
  })(t5);
  r4.__resolve__ = s6;
  const a5 = /* @__PURE__ */ (function(e10) {
    let t6;
    return () => (t6 || (t6 = e10()), t6);
  })(() => {
    return t6 = s6, { ...e9.websocket, async resolve(e10) {
      const r5 = e10.request?.url || e10.url || "/", { pathname: s7 } = "string" == typeof r5 ? parseURL(r5) : r5, a6 = await t6(s7);
      return a6?.handler?.__websocket__ || {};
    } };
    var t6;
  }), c4 = { use: /* @__PURE__ */ __name((e10, t6, r5) => use(c4, e10, t6, r5), "use"), resolve: s6, handler: r4, stack: t5, options: e9, get websocket() {
    return a5();
  } };
  return c4;
}
function use(e9, t5, r4, s6) {
  if (Array.isArray(t5)) for (const a5 of t5) use(e9, a5, r4, s6);
  else if (Array.isArray(r4)) for (const a5 of r4) use(e9, t5, a5, s6);
  else "string" == typeof t5 ? e9.stack.push(normalizeLayer({ ...s6, route: t5, handler: r4 })) : "function" == typeof t5 ? e9.stack.push(normalizeLayer({ ...r4, handler: t5 })) : e9.stack.push(normalizeLayer({ ...t5 }));
  return e9;
}
function normalizeLayer(e9) {
  let t5 = e9.handler;
  return t5.handler && (t5 = t5.handler), e9.lazy ? t5 = lazyEventHandler(t5) : (function(e10) {
    return hasProp2(e10, "__is_handler__");
  })(t5) || (t5 = toEventHandler(t5, 0, e9.route)), { route: withoutTrailingSlash(e9.route), match: e9.match, handler: t5 };
}
function handleHandlerResponse(e9, t5, r4) {
  if (null === t5) return (function(e10, t6) {
    if (e10.handled) return;
    t6 || 200 === e10.node.res.statusCode || (t6 = e10.node.res.statusCode);
    const r5 = sanitizeStatusCode(t6, 204);
    204 === r5 && e10.node.res.removeHeader("content-length"), e10.node.res.writeHead(r5), e10.node.res.end();
  })(e9);
  if (t5) {
    if (s6 = t5, "undefined" != typeof Response && s6 instanceof Response) return sendWebResponse(e9, t5);
    if ((function(e10) {
      if (!e10 || "object" != typeof e10) return false;
      if ("function" == typeof e10.pipe) {
        if ("function" == typeof e10._read) return true;
        if ("function" == typeof e10.abort) return true;
      }
      return "function" == typeof e10.pipeTo;
    })(t5)) return sendStream(e9, t5);
    if (t5.buffer) return send(e9, t5);
    if (t5.arrayBuffer && "function" == typeof t5.arrayBuffer) return t5.arrayBuffer().then((r5) => send(e9, g2.from(r5), t5.type));
    if (t5 instanceof Error) throw createError(t5);
    if ("function" == typeof t5.end) return true;
  }
  var s6;
  const a5 = typeof t5;
  if ("string" === a5) return send(e9, t5, Pr3.html);
  if ("object" === a5 || "boolean" === a5 || "number" === a5) return send(e9, JSON.stringify(t5, void 0, r4), Pr3.json);
  if ("bigint" === a5) return send(e9, t5.toString(), Pr3.json);
  throw createError({ statusCode: 500, statusMessage: `[h3] Cannot send ${a5} as response.` });
}
function toNodeListener(e9) {
  return async function(t5, r4) {
    const s6 = createEvent(t5, r4);
    try {
      await e9.handler(s6);
    } catch (t6) {
      const r5 = createError(t6);
      if (isError(t6) || (r5.unhandled = true), setResponseStatus(s6, r5.statusCode, r5.statusMessage), e9.options.onError && await e9.options.onError(r5, s6), s6.handled) return;
      (r5.unhandled || r5.fatal) && console.error("[h3]", r5.fatal ? "[fatal]" : "[unhandled]", r5), e9.options.onBeforeResponse && !s6._onBeforeResponseCalled && await e9.options.onBeforeResponse(s6, { body: r5 }), await (function(e10, t7, r6) {
        if (e10.handled) return;
        const s7 = isError(t7) ? t7 : createError(t7), a5 = { statusCode: s7.statusCode, statusMessage: s7.statusMessage, stack: [], data: s7.data };
        if (r6 && (a5.stack = (s7.stack || "").split("\n").map((e11) => e11.trim())), e10.handled) return;
        setResponseStatus(e10, Number.parseInt(s7.statusCode), s7.statusMessage), e10.node.res.setHeader("content-type", Pr3.json), e10.node.res.end(JSON.stringify(a5, void 0, 2));
      })(s6, r5, !!e9.options.debug), e9.options.onAfterResponse && !s6._onAfterResponseCalled && await e9.options.onAfterResponse(s6, { body: r5 });
    }
  };
}
function flatHooks2(e9, t5 = {}, r4) {
  for (const s6 in e9) {
    const a5 = e9[s6], c4 = r4 ? `${r4}:${s6}` : s6;
    "object" == typeof a5 && null !== a5 ? flatHooks2(a5, t5, c4) : "function" == typeof a5 && (t5[c4] = a5);
  }
  return t5;
}
function serialTaskCaller2(e9, t5) {
  const r4 = t5.shift(), s6 = Dr3(r4);
  return e9.reduce((e10, r5) => e10.then(() => s6.run(() => r5(...t5))), Promise.resolve());
}
function parallelTaskCaller2(e9, t5) {
  const r4 = t5.shift(), s6 = Dr3(r4);
  return Promise.all(e9.map((e10) => s6.run(() => e10(...t5))));
}
function callEachWith2(e9, t5) {
  for (const r4 of [...e9]) r4(t5);
}
function isPayloadMethod(e9 = "GET") {
  return Kr2.has(e9.toUpperCase());
}
function resolveFetchOptions(e9, t5, r4, s6) {
  const a5 = (function(e10, t6, r5) {
    if (!t6) return new r5(e10);
    const s7 = new r5(t6);
    if (e10) for (const [t7, a6] of Symbol.iterator in e10 || Array.isArray(e10) ? e10 : new r5(e10)) s7.set(t7, a6);
    return s7;
  })(t5?.headers ?? e9?.headers, r4?.headers, s6);
  let c4;
  return (r4?.query || r4?.params || t5?.params || t5?.query) && (c4 = { ...r4?.params, ...r4?.query, ...t5?.params, ...t5?.query }), { ...r4, ...t5, query: c4, params: c4, headers: a5 };
}
async function callHooks2(e9, t5) {
  if (t5) if (Array.isArray(t5)) for (const r4 of t5) await r4(e9);
  else await t5(e9);
}
function createFetch(e9 = {}) {
  const { fetch: t5 = globalThis.fetch, Headers: r4 = globalThis.Headers, AbortController: s6 = globalThis.AbortController } = e9;
  async function onError(e10) {
    const t6 = e10.error && "AbortError" === e10.error.name && !e10.options.timeout || false;
    if (false !== e10.options.retry && !t6) {
      let t7;
      t7 = "number" == typeof e10.options.retry ? e10.options.retry : isPayloadMethod(e10.options.method) ? 0 : 1;
      const r6 = e10.response && e10.response.status || 500;
      if (t7 > 0 && (Array.isArray(e10.options.retryStatusCodes) ? e10.options.retryStatusCodes.includes(r6) : Zr2.has(r6))) {
        const r7 = "function" == typeof e10.options.retryDelay ? e10.options.retryDelay(e10) : e10.options.retryDelay || 0;
        return r7 > 0 && await new Promise((e11) => setTimeout(e11, r7)), $fetchRaw(e10.request, { ...e10.options, retry: t7 - 1 });
      }
    }
    const r5 = (function(e11) {
      const t7 = e11.error?.message || e11.error?.toString() || "", r6 = e11.request?.method || e11.options?.method || "GET", s7 = e11.request?.url || String(e11.request) || "/", a5 = `[${r6}] ${JSON.stringify(s7)}`, c4 = e11.response ? `${e11.response.status} ${e11.response.statusText}` : "<no response>", u6 = new FetchError(`${a5}: ${c4}${t7 ? ` ${t7}` : ""}`, e11.error ? { cause: e11.error } : void 0);
      for (const t8 of ["request", "options", "response"]) Object.defineProperty(u6, t8, { get: /* @__PURE__ */ __name(() => e11[t8], "get") });
      for (const [t8, r7] of [["data", "_data"], ["status", "status"], ["statusCode", "status"], ["statusText", "statusText"], ["statusMessage", "statusText"]]) Object.defineProperty(u6, t8, { get: /* @__PURE__ */ __name(() => e11.response && e11.response[r7], "get") });
      return u6;
    })(e10);
    throw Error.captureStackTrace && Error.captureStackTrace(r5, $fetchRaw), r5;
  }
  __name(onError, "onError");
  const $fetchRaw = /* @__PURE__ */ __name(async function(a5, c4 = {}) {
    const u6 = { request: a5, options: resolveFetchOptions(a5, c4, e9.defaults, r4), response: void 0, error: void 0 };
    if (u6.options.method && (u6.options.method = u6.options.method.toUpperCase()), u6.options.onRequest && (await callHooks2(u6, u6.options.onRequest), u6.options.headers instanceof r4 || (u6.options.headers = new r4(u6.options.headers || {}))), "string" == typeof u6.request && (u6.options.baseURL && (u6.request = (function(e10, t6) {
      if (isEmptyURL(t6) || hasProtocol(e10)) return e10;
      const r5 = withoutTrailingSlash(t6);
      if (e10.startsWith(r5)) {
        const t7 = e10[r5.length];
        if (!t7 || "/" === t7 || "?" === t7) return e10;
      }
      return joinURL(r5, e10);
    })(u6.request, u6.options.baseURL)), u6.options.query && (u6.request = withQuery(u6.request, u6.options.query), delete u6.options.query), "query" in u6.options && delete u6.options.query, "params" in u6.options && delete u6.options.params), u6.options.body && isPayloadMethod(u6.options.method)) if ((function(e10) {
      if (void 0 === e10) return false;
      const t6 = typeof e10;
      return "string" === t6 || "number" === t6 || "boolean" === t6 || null === t6 || "object" === t6 && (!!Array.isArray(e10) || !e10.buffer && !(e10 instanceof FormData || e10 instanceof URLSearchParams) && (e10.constructor && "Object" === e10.constructor.name || "function" == typeof e10.toJSON));
    })(u6.options.body)) {
      const e10 = u6.options.headers.get("content-type");
      "string" != typeof u6.options.body && (u6.options.body = "application/x-www-form-urlencoded" === e10 ? new URLSearchParams(u6.options.body).toString() : JSON.stringify(u6.options.body)), e10 || u6.options.headers.set("content-type", "application/json"), u6.options.headers.has("accept") || u6.options.headers.set("accept", "application/json");
    } else ("pipeTo" in u6.options.body && "function" == typeof u6.options.body.pipeTo || "function" == typeof u6.options.body.pipe) && ("duplex" in u6.options || (u6.options.duplex = "half"));
    let f4;
    if (!u6.options.signal && u6.options.timeout) {
      const e10 = new s6();
      f4 = setTimeout(() => {
        const t6 = new Error("[TimeoutError]: The operation was aborted due to timeout");
        t6.name = "TimeoutError", t6.code = 23, e10.abort(t6);
      }, u6.options.timeout), u6.options.signal = e10.signal;
    }
    try {
      u6.response = await t5(u6.request, u6.options);
    } catch (e10) {
      return u6.error = e10, u6.options.onRequestError && await callHooks2(u6, u6.options.onRequestError), await onError(u6);
    } finally {
      f4 && clearTimeout(f4);
    }
    if ((u6.response.body || u6.response._bodyInit) && !Jr2.has(u6.response.status) && "HEAD" !== u6.options.method) {
      const e10 = (u6.options.parseResponse ? "json" : u6.options.responseType) || (function(e11 = "") {
        if (!e11) return "json";
        const t6 = e11.split(";").shift() || "";
        return Gr2.test(t6) ? "json" : "text/event-stream" === t6 ? "stream" : Qr2.has(t6) || t6.startsWith("text/") ? "text" : "blob";
      })(u6.response.headers.get("content-type") || "");
      switch (e10) {
        case "json": {
          const e11 = await u6.response.text(), t6 = u6.options.parseResponse || destr;
          u6.response._data = t6(e11);
          break;
        }
        case "stream":
          u6.response._data = u6.response.body || u6.response._bodyInit;
          break;
        default:
          u6.response._data = await u6.response[e10]();
      }
    }
    return u6.options.onResponse && await callHooks2(u6, u6.options.onResponse), !u6.options.ignoreResponseError && u6.response.status >= 400 && u6.response.status < 600 ? (u6.options.onResponseError && await callHooks2(u6, u6.options.onResponseError), await onError(u6)) : u6.response;
  }, "$fetchRaw"), $fetch = /* @__PURE__ */ __name(async function(e10, t6) {
    return (await $fetchRaw(e10, t6))._data;
  }, "$fetch");
  return $fetch.raw = $fetchRaw, $fetch.native = (...e10) => t5(...e10), $fetch.create = (t6 = {}, r5 = {}) => createFetch({ ...e9, ...r5, defaults: { ...e9.defaults, ...r5.defaults, ...t6 } }), $fetch;
}
function asyncCall(e9, ...t5) {
  try {
    return (r4 = e9(...t5)) && "function" == typeof r4.then ? r4 : Promise.resolve(r4);
  } catch (e10) {
    return Promise.reject(e10);
  }
  var r4;
}
function stringify2(e9) {
  if (/* @__PURE__ */ (function(e10) {
    const t5 = typeof e10;
    return null === e10 || "object" !== t5 && "function" !== t5;
  })(e9)) return String(e9);
  if ((function(e10) {
    const t5 = Object.getPrototypeOf(e10);
    return !t5 || t5.isPrototypeOf(Object);
  })(e9) || Array.isArray(e9)) return JSON.stringify(e9);
  if ("function" == typeof e9.toJSON) return stringify2(e9.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
function serializeRaw(e9) {
  return "string" == typeof e9 ? e9 : rn3 + (function(e10) {
    if (globalThis.Buffer) return g2.from(e10).toString("base64");
    return globalThis.btoa(String.fromCodePoint(...e10));
  })(e9);
}
function deserializeRaw(e9) {
  return "string" != typeof e9 ? e9 : e9.startsWith(rn3) ? (function(e10) {
    if (globalThis.Buffer) return g2.from(e10, "base64");
    return Uint8Array.from(globalThis.atob(e10), (e11) => e11.codePointAt(0));
  })(e9.slice(7)) : e9;
}
function normalizeKey$1(e9) {
  return e9 && e9.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...e9) {
  return normalizeKey$1(e9.join(":"));
}
function normalizeBaseKey(e9) {
  return (e9 = normalizeKey$1(e9)) ? e9 + ":" : "";
}
function watch2(e9, t5, r4) {
  return e9.watch ? e9.watch((e10, s6) => t5(e10, r4 + s6)) : () => {
  };
}
async function dispose(e9) {
  "function" == typeof e9.dispose && await asyncCall(e9.dispose);
}
function useStorage(e9 = "") {
  return e9 ? (function(e10, t5) {
    if (!(t5 = normalizeBaseKey(t5))) return e10;
    const r4 = { ...e10 };
    for (const s6 of nn3) r4[s6] = (r5 = "", ...a5) => e10[s6](t5 + r5, ...a5);
    return r4.getKeys = (r5 = "", ...s6) => e10.getKeys(t5 + r5, ...s6).then((e11) => e11.map((e12) => e12.slice(t5.length))), r4.keys = r4.getKeys, r4.getItems = async (r5, s6) => {
      const a5 = r5.map((e11) => "string" == typeof e11 ? t5 + e11 : { ...e11, key: t5 + e11.key });
      return (await e10.getItems(a5, s6)).map((e11) => ({ key: e11.key.slice(t5.length), value: e11.value }));
    }, r4.setItems = async (r5, s6) => {
      const a5 = r5.map((e11) => ({ key: t5 + e11.key, value: e11.value, options: e11.options }));
      return e10.setItems(a5, s6);
    }, r4;
  })(an3, e9) : an3;
}
function digest(e9) {
  return new k3().finalize(e9).toBase64();
}
function hash$1(e9) {
  return digest((function(e10) {
    return "string" == typeof e10 ? `'${e10}'` : new cn3().serialize(e10);
  })(e9));
}
function hash(e9) {
  return digest("string" == typeof e9 ? e9 : (function(e10) {
    const t5 = new hn3();
    return t5.dispatch(e10), t5.buff;
  })(e9)).replace(/[-_]/g, "").slice(0, 10);
}
function defineCachedFunction(e9, t5 = {}) {
  t5 = { name: "_", base: "/cache", swr: true, maxAge: 1, ...t5 };
  const r4 = {}, s6 = t5.group || "nitro/functions", a5 = t5.name || e9.name || "_", c4 = t5.integrity || hash([e9, t5]), u6 = t5.validate || ((e10) => void 0 !== e10.value);
  return async (...f4) => {
    if (await t5.shouldBypassCache?.(...f4)) return e9(...f4);
    const h5 = await (t5.getKey || getKey)(...f4), d5 = await t5.shouldInvalidateCache?.(...f4), g3 = await (async function(e10, f5, h6, d6) {
      const g4 = [t5.base, s6, a5, e10 + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
      let m5 = await useStorage().getItem(g4).catch((e11) => {
        console.error("[cache] Cache read error.", e11), useNitroApp().captureError(e11, { event: d6, tags: ["cache"] });
      }) || {};
      if ("object" != typeof m5) {
        m5 = {};
        const e11 = new Error("Malformed data read from cache.");
        console.error("[cache]", e11), useNitroApp().captureError(e11, { event: d6, tags: ["cache"] });
      }
      const _3 = 1e3 * (t5.maxAge ?? 0);
      _3 && (m5.expires = Date.now() + _3);
      const E3 = h6 || m5.integrity !== c4 || _3 && Date.now() - (m5.mtime || 0) > _3 || false === u6(m5), R3 = E3 ? (async () => {
        const s7 = r4[e10];
        s7 || (void 0 !== m5.value && (t5.staleMaxAge || 0) >= 0 && false === t5.swr && (m5.value = void 0, m5.integrity = void 0, m5.mtime = void 0, m5.expires = void 0), r4[e10] = Promise.resolve(f5()));
        try {
          m5.value = await r4[e10];
        } catch (t6) {
          throw s7 || delete r4[e10], t6;
        }
        if (!s7 && (m5.mtime = Date.now(), m5.integrity = c4, delete r4[e10], false !== u6(m5))) {
          let e11;
          t5.maxAge && !t5.swr && (e11 = { ttl: t5.maxAge });
          const r5 = useStorage().setItem(g4, m5, e11).catch((e12) => {
            console.error("[cache] Cache write error.", e12), useNitroApp().captureError(e12, { event: d6, tags: ["cache"] });
          });
          d6?.waitUntil && d6.waitUntil(r5);
        }
      })() : Promise.resolve();
      return void 0 === m5.value ? await R3 : E3 && d6 && d6.waitUntil && d6.waitUntil(R3), t5.swr && false !== u6(m5) ? (R3.catch((e11) => {
        console.error("[cache] SWR handler error.", e11), useNitroApp().captureError(e11, { event: d6, tags: ["cache"] });
      }), m5) : R3.then(() => m5);
    })(h5, () => e9(...f4), d5, f4[0] && isEvent(f4[0]) ? f4[0] : void 0);
    let m4 = g3.value;
    return t5.transform && (m4 = await t5.transform(g3, ...f4) || m4), m4;
  };
}
function getKey(...e9) {
  return e9.length > 0 ? hash(e9) : "";
}
function escapeKey(e9) {
  return String(e9).replace(/\W/g, "");
}
function cloneWithProxy(e9, t5) {
  return new Proxy(e9, { get: /* @__PURE__ */ __name((e10, r4, s6) => r4 in t5 ? t5[r4] : Reflect.get(e10, r4, s6), "get"), set: /* @__PURE__ */ __name((e10, r4, s6, a5) => r4 in t5 ? (t5[r4] = s6, true) : Reflect.set(e10, r4, s6, a5), "set") });
}
function klona(e9) {
  if ("object" != typeof e9) return e9;
  var t5, r4, s6 = Object.prototype.toString.call(e9);
  if ("[object Object]" === s6) {
    if (e9.constructor !== Object && "function" == typeof e9.constructor) for (t5 in r4 = new e9.constructor(), e9) e9.hasOwnProperty(t5) && r4[t5] !== e9[t5] && (r4[t5] = klona(e9[t5]));
    else for (t5 in r4 = {}, e9) "__proto__" === t5 ? Object.defineProperty(r4, t5, { value: klona(e9[t5]), configurable: true, enumerable: true, writable: true }) : r4[t5] = klona(e9[t5]);
    return r4;
  }
  if ("[object Array]" === s6) {
    for (t5 = e9.length, r4 = Array(t5); t5--; ) r4[t5] = klona(e9[t5]);
    return r4;
  }
  return "[object Set]" === s6 ? (r4 = /* @__PURE__ */ new Set(), e9.forEach(function(e10) {
    r4.add(klona(e10));
  }), r4) : "[object Map]" === s6 ? (r4 = /* @__PURE__ */ new Map(), e9.forEach(function(e10, t6) {
    r4.set(klona(t6), klona(e10));
  }), r4) : "[object Date]" === s6 ? /* @__PURE__ */ new Date(+e9) : "[object RegExp]" === s6 ? ((r4 = new RegExp(e9.source, e9.flags)).lastIndex = e9.lastIndex, r4) : "[object DataView]" === s6 ? new e9.constructor(klona(e9.buffer)) : "[object ArrayBuffer]" === s6 ? e9.slice(0) : "Array]" === s6.slice(-6) ? new e9.constructor(e9) : e9;
}
function isUppercase(e9 = "") {
  if (!pn3.test(e9)) return e9 !== e9.toLowerCase();
}
function kebabCase(e9, t5) {
  return e9 ? (Array.isArray(e9) ? e9 : (function(e10) {
    const t6 = gn3, r4 = [];
    if (!e10 || "string" != typeof e10) return r4;
    let s6, a5, c4 = "";
    for (const u6 of e10) {
      const e11 = t6.includes(u6);
      if (true === e11) {
        r4.push(c4), c4 = "", s6 = void 0;
        continue;
      }
      const f4 = isUppercase(u6);
      if (false === a5) {
        if (false === s6 && true === f4) {
          r4.push(c4), c4 = u6, s6 = f4;
          continue;
        }
        if (true === s6 && false === f4 && c4.length > 1) {
          const e12 = c4.at(-1);
          r4.push(c4.slice(0, Math.max(0, c4.length - 1))), c4 = e12 + u6, s6 = f4;
          continue;
        }
      }
      c4 += u6, s6 = f4, a5 = e11;
    }
    return r4.push(c4), r4;
  })(e9)).map((e10) => e10.toLowerCase()).join(t5) : "";
}
function getEnv(e9, t5) {
  const r4 = (s6 = e9, kebabCase(s6 || "", "_")).toUpperCase();
  var s6;
  return destr(J.env[t5.prefix + r4] ?? J.env[t5.altPrefix + r4]);
}
function _isObject(e9) {
  return "object" == typeof e9 && !Array.isArray(e9);
}
function applyEnv(e9, t5, r4 = "") {
  for (const s6 in e9) {
    const a5 = r4 ? `${r4}_${s6}` : s6, c4 = getEnv(a5, t5);
    _isObject(e9[s6]) ? _isObject(c4) ? (e9[s6] = { ...e9[s6], ...c4 }, applyEnv(e9[s6], t5, a5)) : void 0 === c4 ? applyEnv(e9[s6], t5, a5) : e9[s6] = c4 ?? e9[s6] : e9[s6] = c4 ?? e9[s6], t5.envExpansion && "string" == typeof e9[s6] && (e9[s6] = _expandFromEnv(e9[s6]));
  }
  return e9;
}
function _expandFromEnv(e9) {
  return e9.replace(mn3, (e10, t5) => J.env[t5] || e10);
}
function useRuntimeConfig2(e9) {
  if (!e9) return bn3;
  if (e9.context.nitro.runtimeConfig) return e9.context.nitro.runtimeConfig;
  const t5 = klona(yn3);
  return applyEnv(t5, wn3), e9.context.nitro.runtimeConfig = t5, t5;
}
function _deepFreeze(e9) {
  const t5 = Object.getOwnPropertyNames(e9);
  for (const r4 of t5) {
    const t6 = e9[r4];
    t6 && "object" == typeof t6 && _deepFreeze(t6);
  }
  return Object.freeze(e9);
}
function executeAsync(e9) {
  const t5 = [];
  for (const e10 of Bn3) {
    const r5 = e10();
    r5 && t5.push(r5);
  }
  const restore = /* @__PURE__ */ __name(() => {
    for (const e10 of t5) e10();
  }, "restore");
  let r4 = e9();
  return r4 && "object" == typeof r4 && "catch" in r4 && (r4 = r4.catch((e10) => {
    throw restore(), e10;
  })), [r4, restore];
}
function isPathInScope(e9, t5) {
  let r4;
  try {
    const t6 = e9.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    r4 = new URL(t6, "http://_").pathname;
  } catch {
    return false;
  }
  return !t5 || r4 === t5 || r4.startsWith(t5 + "/");
}
function createRouteRulesHandler(e9) {
  return zr2((t5) => {
    const r4 = getRouteRules(t5);
    if (r4.headers && Ur2(t5, r4.headers), r4.redirect) {
      let e10 = r4.redirect.to;
      if (e10.endsWith("/**")) {
        let s6 = t5.path;
        const a5 = r4.redirect._redirectStripBase;
        if (a5) {
          if (!isPathInScope(t5.path.split("?")[0], a5)) throw createError({ statusCode: 400 });
          s6 = withoutBase(s6, a5);
        } else s6.startsWith("//") && (s6 = s6.replace(/^\/+/, "/"));
        e10 = joinURL(e10.slice(0, -3), s6);
      } else if (t5.path.includes("?")) {
        e10 = withQuery(e10, getQuery$1(t5.path));
      }
      return (function(e11, t6, r5 = 302) {
        return e11.node.res.statusCode = sanitizeStatusCode(r5, e11.node.res.statusCode), e11.node.res.setHeader("location", t6), send(e11, `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${t6.replace(/"/g, "%22")}"></head></html>`, Pr3.html);
      })(t5, e10, r4.redirect.statusCode);
    }
    if (r4.proxy) {
      let s6 = r4.proxy.to;
      if (s6.endsWith("/**")) {
        let e10 = t5.path;
        const a5 = r4.proxy._proxyStripBase;
        if (a5) {
          if (!isPathInScope(t5.path.split("?")[0], a5)) throw createError({ statusCode: 400 });
          e10 = withoutBase(e10, a5);
        } else e10.startsWith("//") && (e10 = e10.replace(/^\/+/, "/"));
        s6 = joinURL(s6.slice(0, -3), e10);
      } else if (t5.path.includes("?")) {
        s6 = withQuery(s6, getQuery$1(t5.path));
      }
      return proxyRequest(t5, s6, { fetch: e9.localFetch, ...r4.proxy });
    }
  });
}
function getRouteRules(e9) {
  return e9.context._nitro = e9.context._nitro || {}, e9.context._nitro.routeRules || (e9.context._nitro.routeRules = getRouteRulesForPath(withoutBase(e9.path.split("?")[0], useRuntimeConfig2().app.baseURL))), e9.context._nitro.routeRules;
}
function getRouteRulesForPath(e9) {
  return Br({}, ...An3.matchAll(e9).reverse());
}
function joinHeaders(e9) {
  return Array.isArray(e9) ? e9.join(", ") : String(e9);
}
function normalizeCookieHeader(e9 = "") {
  return splitCookiesString(joinHeaders(e9));
}
function normalizeCookieHeaders(e9) {
  const t5 = new Headers();
  for (const [r4, s6] of e9) if ("set-cookie" === r4) for (const e10 of normalizeCookieHeader(s6)) t5.append("set-cookie", e10);
  else t5.set(r4, joinHeaders(s6));
  return t5;
}
function hasReqHeader(e9, t5, r4) {
  const s6 = getRequestHeader(e9, t5);
  return !(!s6 || "string" != typeof s6 || !s6.toLowerCase().includes(r4));
}
function defaultHandler(e9, t5, r4) {
  const s6 = e9.unhandled || e9.fatal, a5 = e9.statusCode || 500, c4 = e9.statusMessage || "Server Error", u6 = (function(e10, t6 = {}) {
    const r5 = (function(e11, t7 = {}) {
      if (t7.xForwardedHost) {
        const t8 = e11.node.req.headers["x-forwarded-host"], r6 = (t8 || "").split(",").shift()?.trim();
        if (r6) return r6;
      }
      return e11.node.req.headers.host || "localhost";
    })(e10, t6), s7 = (function(e11, t7 = {}) {
      return false !== t7.xForwardedProto && "https" === e11.node.req.headers["x-forwarded-proto"] || e11.node.req.connection?.encrypted ? "https" : "http";
    })(e10, t6), a6 = (e10.node.req.originalUrl || e10.path).replace(/^[/\\]+/g, "/");
    return new URL(a6, `${s7}://${r5}`);
  })(t5, { xForwardedHost: true, xForwardedProto: true });
  if (404 === a5) {
    const e10 = "/";
    if (/^\/[^/]/.test(e10) && !u6.pathname.startsWith(e10)) {
      return { status: 302, statusText: "Found", headers: { location: `${e10}${u6.pathname.slice(1)}${u6.search}` }, body: "Redirecting..." };
    }
  }
  if (s6 && !r4?.silent) {
    const r5 = [e9.unhandled && "[unhandled]", e9.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${r5} [${t5.method}] ${u6}
`, e9);
  }
  const f4 = { "content-type": "application/json", "x-content-type-options": "nosniff", "x-frame-options": "DENY", "referrer-policy": "no-referrer", "content-security-policy": "script-src 'none'; frame-ancestors 'none';" };
  setResponseStatus(t5, a5, c4), 404 !== a5 && (function(e10, t6) {
    return e10.node.res.getHeader(t6);
  })(t5, "cache-control") || (f4["cache-control"] = "no-cache");
  return { status: a5, statusText: c4, headers: f4, body: { error: true, url: u6.href, statusCode: a5, statusMessage: c4, message: s6 ? "Server Error" : e9.message, data: s6 ? void 0 : e9.data } };
}
function useNitroApp() {
  return kn3;
}
function defineRenderHandler(e9) {
  const t5 = useRuntimeConfig2();
  return zr2(async (r4) => {
    const s6 = useNitroApp(), a5 = { event: r4, render: e9, response: void 0 };
    if (await s6.hooks.callHook("render:before", a5), !a5.response) {
      if (r4.path === `${t5.app.baseURL}favicon.ico`) return setResponseHeader(r4, "Content-Type", "image/x-icon"), send(r4, "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      if (a5.response = await a5.render(r4), !a5.response) {
        const e10 = getResponseStatus(r4);
        return setResponseStatus(r4, 200 === e10 ? 500 : e10), send(r4, "No response returned from render handler: " + r4.path);
      }
    }
    return await s6.hooks.callHook("render:response", a5.response, a5), a5.response.headers && setResponseHeaders(r4, a5.response.headers), (a5.response.statusCode || a5.response.statusMessage) && setResponseStatus(r4, a5.response.statusCode, a5.response.statusMessage), a5.response.body;
  });
}
var e8, t4, r3, s5, a4, c3, u5, f3, h4, d4, g2, m3, _2, E2, R2, inspect, B, x6, I2, T2, S3, C2, $, j2, O2, P2, L2, N2, U2, M2, H, z2, W, _EventEmitter, EventEmitterAsyncResource, EventEmitterReferencingAsyncResource, on$1, once$1, addAbortListener, getEventListeners, getMaxListeners$1, q, FixedCircularBuffer, FixedQueue, ReadStream, WriteStream, D2, Process, F2, K, _getEnv, Q, G, Z, J, V, Y, X, ee, te, re, ne, oe, se, ie, ae, ce, ue2, fe3, le2, he3, de2, pe2, ge3, me3, ye3, we3, be3, ve3, _e3, Ee3, Re3, Be3, Ae3, xe3, Ie3, Te3, Se3, ke3, Ce3, $e3, je3, Oe3, Pe3, Le3, Ne3, Ue3, Me3, He3, ze3, We3, qe3, De3, Fe3, Ke3, Qe3, Ge3, Ze3, Je3, Ve3, Ye3, Xe3, et3, tt3, rt3, nt3, ot3, st3, it3, at3, ct3, ut3, ft3, lt3, ht3, dt3, pt3, gt3, mt3, yt3, wt3, bt3, vt3, _t3, Et3, Rt3, Bt3, At3, xt3, It3, Tt3, St3, kt3, Ct3, $t3, jt3, Ot3, Pt3, Lt3, Nt3, Ut3, Mt3, Ht3, zt3, Wt3, qt3, Dt3, Ft3, Kt3, Qt3, Gt3, Zt3, Jt3, Timeout, Immediate, Vt3, Yt3, Xt3, er3, tr3, rr3, nr3, or3, sr3, ir3, ar3, cr3, ur3, fr3, lr3, hr3, dr3, pr3, gr3, mr3, yr3, wr3, br3, vr3, _r3, Er3, Rr3, Br, Ar3, i5, xr3, Ir3, Tr3, A2, y3, w2, Sr3, kr3, H3Error, Cr3, $r3, jr3, Or3, Pr3, Lr3, Nr3, Ur2, Mr3, Hr2, H3Event, zr2, lazyEventHandler, Wr2, qr2, Dr3, Hookable, Fr, FetchError, Kr2, Qr2, Gr2, Zr2, Jr2, Vr3, Yr2, Xr2, en3, tn, rn3, nn3, memory, on3, normalizeKey2, sn3, an3, cn3, un3, fn2, ln3, k3, l3, hn3, cachedEventHandler, dn3, pn3, gn3, mn3, yn3, wn3, bn3, vn3, _n3, En3, getContext, Rn3, Bn3, An3, xn3, In3, Tn3, _lazy_XZrLxo, Sn3, kn3, Cn3, $n3, jn3, On3;
var init_nitro = __esm({
  ".wrangler/tmp/pages-zpBuWO/chunks/nitro/nitro.mjs"() {
    "use strict";
    init_modules_watch_stub();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    e8 = [];
    t4 = [];
    r3 = "undefined" == typeof Uint8Array ? Array : Uint8Array;
    s5 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (let r4 = 0, a5 = 64; r4 < a5; ++r4) e8[r4] = s5[r4], t4[s5.charCodeAt(r4)] = r4;
    __name(toByteArray, "toByteArray");
    __name(tripletToBase64, "tripletToBase64");
    __name(encodeChunk, "encodeChunk");
    __name(fromByteArray, "fromByteArray");
    __name(read, "read");
    __name(write, "write");
    t4["-".charCodeAt(0)] = 62, t4["_".charCodeAt(0)] = 63;
    a4 = "function" == typeof Symbol && "function" == typeof Symbol.for ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
    c3 = 2147483647;
    __name(createBuffer2, "createBuffer");
    __name(Buffer$1, "Buffer$1");
    __name(from, "from");
    __name(assertSize, "assertSize");
    __name(allocUnsafe, "allocUnsafe");
    __name(fromArrayLike, "fromArrayLike");
    __name(fromArrayBuffer, "fromArrayBuffer");
    __name(checked, "checked");
    __name(byteLength, "byteLength");
    __name(slowToString, "slowToString");
    __name(swap, "swap");
    __name(bidirectionalIndexOf, "bidirectionalIndexOf");
    __name(arrayIndexOf, "arrayIndexOf");
    __name(hexWrite, "hexWrite");
    __name(utf8Write, "utf8Write");
    __name(asciiWrite, "asciiWrite");
    __name(base64Write, "base64Write");
    __name(ucs2Write, "ucs2Write");
    __name(base64Slice, "base64Slice");
    __name(utf8Slice, "utf8Slice");
    Buffer$1.TYPED_ARRAY_SUPPORT = (function() {
      try {
        const e9 = new Uint8Array(1), t5 = { foo: /* @__PURE__ */ __name(function() {
          return 42;
        }, "foo") };
        return Object.setPrototypeOf(t5, Uint8Array.prototype), Object.setPrototypeOf(e9, t5), 42 === e9.foo();
      } catch {
        return false;
      }
    })(), Buffer$1.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This environment lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(Buffer$1.prototype, "parent", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      if (Buffer$1.isBuffer(this)) return this.buffer;
    }, "get") }), Object.defineProperty(Buffer$1.prototype, "offset", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      if (Buffer$1.isBuffer(this)) return this.byteOffset;
    }, "get") }), Buffer$1.poolSize = 8192, Buffer$1.from = function(e9, t5, r4) {
      return from(e9, t5, r4);
    }, Object.setPrototypeOf(Buffer$1.prototype, Uint8Array.prototype), Object.setPrototypeOf(Buffer$1, Uint8Array), Buffer$1.alloc = function(e9, t5, r4) {
      return (function(e10, t6, r5) {
        return assertSize(e10), e10 <= 0 ? createBuffer2(e10) : void 0 !== t6 ? "string" == typeof r5 ? createBuffer2(e10).fill(t6, r5) : createBuffer2(e10).fill(t6) : createBuffer2(e10);
      })(e9, t5, r4);
    }, Buffer$1.allocUnsafe = function(e9) {
      return allocUnsafe(e9);
    }, Buffer$1.allocUnsafeSlow = function(e9) {
      return allocUnsafe(e9);
    }, Buffer$1.isBuffer = function(e9) {
      return null != e9 && true === e9._isBuffer && e9 !== Buffer$1.prototype;
    }, Buffer$1.compare = function(e9, t5) {
      if (isInstance(e9, Uint8Array) && (e9 = Buffer$1.from(e9, e9.offset, e9.byteLength)), isInstance(t5, Uint8Array) && (t5 = Buffer$1.from(t5, t5.offset, t5.byteLength)), !Buffer$1.isBuffer(e9) || !Buffer$1.isBuffer(t5)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      if (e9 === t5) return 0;
      let r4 = e9.length, s6 = t5.length;
      for (let a5 = 0, c4 = Math.min(r4, s6); a5 < c4; ++a5) if (e9[a5] !== t5[a5]) {
        r4 = e9[a5], s6 = t5[a5];
        break;
      }
      return r4 < s6 ? -1 : s6 < r4 ? 1 : 0;
    }, Buffer$1.isEncoding = function(e9) {
      switch (String(e9).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, Buffer$1.concat = function(e9, t5) {
      if (!Array.isArray(e9)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e9.length) return Buffer$1.alloc(0);
      let r4;
      if (void 0 === t5) for (t5 = 0, r4 = 0; r4 < e9.length; ++r4) t5 += e9[r4].length;
      const s6 = Buffer$1.allocUnsafe(t5);
      let a5 = 0;
      for (r4 = 0; r4 < e9.length; ++r4) {
        let t6 = e9[r4];
        if (isInstance(t6, Uint8Array)) a5 + t6.length > s6.length ? (Buffer$1.isBuffer(t6) || (t6 = Buffer$1.from(t6.buffer, t6.byteOffset, t6.byteLength)), t6.copy(s6, a5)) : Uint8Array.prototype.set.call(s6, t6, a5);
        else {
          if (!Buffer$1.isBuffer(t6)) throw new TypeError('"list" argument must be an Array of Buffers');
          t6.copy(s6, a5);
        }
        a5 += t6.length;
      }
      return s6;
    }, Buffer$1.byteLength = byteLength, Buffer$1.prototype._isBuffer = true, Buffer$1.prototype.swap16 = function() {
      const e9 = this.length;
      if (e9 % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let t5 = 0; t5 < e9; t5 += 2) swap(this, t5, t5 + 1);
      return this;
    }, Buffer$1.prototype.swap32 = function() {
      const e9 = this.length;
      if (e9 % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let t5 = 0; t5 < e9; t5 += 4) swap(this, t5, t5 + 3), swap(this, t5 + 1, t5 + 2);
      return this;
    }, Buffer$1.prototype.swap64 = function() {
      const e9 = this.length;
      if (e9 % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let t5 = 0; t5 < e9; t5 += 8) swap(this, t5, t5 + 7), swap(this, t5 + 1, t5 + 6), swap(this, t5 + 2, t5 + 5), swap(this, t5 + 3, t5 + 4);
      return this;
    }, Buffer$1.prototype.toString = function() {
      const e9 = this.length;
      return 0 === e9 ? "" : 0 === arguments.length ? utf8Slice(this, 0, e9) : Reflect.apply(slowToString, this, arguments);
    }, Buffer$1.prototype.toLocaleString = Buffer$1.prototype.toString, Buffer$1.prototype.equals = function(e9) {
      if (!Buffer$1.isBuffer(e9)) throw new TypeError("Argument must be a Buffer");
      return this === e9 || 0 === Buffer$1.compare(this, e9);
    }, Buffer$1.prototype.inspect = function() {
      let e9 = "";
      return e9 = this.toString("hex", 0, 50).replace(/(.{2})/g, "$1 ").trim(), this.length > 50 && (e9 += " ... "), "<Buffer " + e9 + ">";
    }, a4 && (Buffer$1.prototype[a4] = Buffer$1.prototype.inspect), Buffer$1.prototype.compare = function(e9, t5, r4, s6, a5) {
      if (isInstance(e9, Uint8Array) && (e9 = Buffer$1.from(e9, e9.offset, e9.byteLength)), !Buffer$1.isBuffer(e9)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e9);
      if (void 0 === t5 && (t5 = 0), void 0 === r4 && (r4 = e9 ? e9.length : 0), void 0 === s6 && (s6 = 0), void 0 === a5 && (a5 = this.length), t5 < 0 || r4 > e9.length || s6 < 0 || a5 > this.length) throw new RangeError("out of range index");
      if (s6 >= a5 && t5 >= r4) return 0;
      if (s6 >= a5) return -1;
      if (t5 >= r4) return 1;
      if (this === e9) return 0;
      let c4 = (a5 >>>= 0) - (s6 >>>= 0), u6 = (r4 >>>= 0) - (t5 >>>= 0);
      const f4 = Math.min(c4, u6), h5 = this.slice(s6, a5), d5 = e9.slice(t5, r4);
      for (let e10 = 0; e10 < f4; ++e10) if (h5[e10] !== d5[e10]) {
        c4 = h5[e10], u6 = d5[e10];
        break;
      }
      return c4 < u6 ? -1 : u6 < c4 ? 1 : 0;
    }, Buffer$1.prototype.includes = function(e9, t5, r4) {
      return -1 !== this.indexOf(e9, t5, r4);
    }, Buffer$1.prototype.indexOf = function(e9, t5, r4) {
      return bidirectionalIndexOf(this, e9, t5, r4, true);
    }, Buffer$1.prototype.lastIndexOf = function(e9, t5, r4) {
      return bidirectionalIndexOf(this, e9, t5, r4, false);
    }, Buffer$1.prototype.write = function(e9, t5, r4, s6) {
      if (void 0 === t5) s6 = "utf8", r4 = this.length, t5 = 0;
      else if (void 0 === r4 && "string" == typeof t5) s6 = t5, r4 = this.length, t5 = 0;
      else {
        if (!Number.isFinite(t5)) throw new TypeError("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        t5 >>>= 0, Number.isFinite(r4) ? (r4 >>>= 0, void 0 === s6 && (s6 = "utf8")) : (s6 = r4, r4 = void 0);
      }
      const a5 = this.length - t5;
      if ((void 0 === r4 || r4 > a5) && (r4 = a5), e9.length > 0 && (r4 < 0 || t5 < 0) || t5 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      s6 || (s6 = "utf8");
      let c4 = false;
      for (; ; ) switch (s6) {
        case "hex":
          return hexWrite(this, e9, t5, r4);
        case "utf8":
        case "utf-8":
          return utf8Write(this, e9, t5, r4);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, e9, t5, r4);
        case "base64":
          return base64Write(this, e9, t5, r4);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, e9, t5, r4);
        default:
          if (c4) throw new TypeError("Unknown encoding: " + s6);
          s6 = ("" + s6).toLowerCase(), c4 = true;
      }
    }, Buffer$1.prototype.toJSON = function() {
      return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
    };
    u5 = 4096;
    __name(asciiSlice, "asciiSlice");
    __name(latin1Slice, "latin1Slice");
    __name(hexSlice, "hexSlice");
    __name(utf16leSlice, "utf16leSlice");
    __name(checkOffset, "checkOffset");
    __name(checkInt, "checkInt");
    __name(wrtBigUInt64LE, "wrtBigUInt64LE");
    __name(wrtBigUInt64BE, "wrtBigUInt64BE");
    __name(checkIEEE754, "checkIEEE754");
    __name(writeFloat, "writeFloat");
    __name(writeDouble, "writeDouble");
    Buffer$1.prototype.slice = function(e9, t5) {
      const r4 = this.length;
      (e9 = Math.trunc(e9)) < 0 ? (e9 += r4) < 0 && (e9 = 0) : e9 > r4 && (e9 = r4), (t5 = void 0 === t5 ? r4 : Math.trunc(t5)) < 0 ? (t5 += r4) < 0 && (t5 = 0) : t5 > r4 && (t5 = r4), t5 < e9 && (t5 = e9);
      const s6 = this.subarray(e9, t5);
      return Object.setPrototypeOf(s6, Buffer$1.prototype), s6;
    }, Buffer$1.prototype.readUintLE = Buffer$1.prototype.readUIntLE = function(e9, t5, r4) {
      e9 >>>= 0, t5 >>>= 0, r4 || checkOffset(e9, t5, this.length);
      let s6 = this[e9], a5 = 1, c4 = 0;
      for (; ++c4 < t5 && (a5 *= 256); ) s6 += this[e9 + c4] * a5;
      return s6;
    }, Buffer$1.prototype.readUintBE = Buffer$1.prototype.readUIntBE = function(e9, t5, r4) {
      e9 >>>= 0, t5 >>>= 0, r4 || checkOffset(e9, t5, this.length);
      let s6 = this[e9 + --t5], a5 = 1;
      for (; t5 > 0 && (a5 *= 256); ) s6 += this[e9 + --t5] * a5;
      return s6;
    }, Buffer$1.prototype.readUint8 = Buffer$1.prototype.readUInt8 = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 1, this.length), this[e9];
    }, Buffer$1.prototype.readUint16LE = Buffer$1.prototype.readUInt16LE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 2, this.length), this[e9] | this[e9 + 1] << 8;
    }, Buffer$1.prototype.readUint16BE = Buffer$1.prototype.readUInt16BE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 2, this.length), this[e9] << 8 | this[e9 + 1];
    }, Buffer$1.prototype.readUint32LE = Buffer$1.prototype.readUInt32LE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 4, this.length), (this[e9] | this[e9 + 1] << 8 | this[e9 + 2] << 16) + 16777216 * this[e9 + 3];
    }, Buffer$1.prototype.readUint32BE = Buffer$1.prototype.readUInt32BE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 4, this.length), 16777216 * this[e9] + (this[e9 + 1] << 16 | this[e9 + 2] << 8 | this[e9 + 3]);
    }, Buffer$1.prototype.readBigUInt64LE = defineBigIntMethod(function(e9) {
      validateNumber(e9 >>>= 0, "offset");
      const t5 = this[e9], r4 = this[e9 + 7];
      void 0 !== t5 && void 0 !== r4 || boundsError(e9, this.length - 8);
      const s6 = t5 + 256 * this[++e9] + 65536 * this[++e9] + this[++e9] * 2 ** 24, a5 = this[++e9] + 256 * this[++e9] + 65536 * this[++e9] + r4 * 2 ** 24;
      return BigInt(s6) + (BigInt(a5) << BigInt(32));
    }), Buffer$1.prototype.readBigUInt64BE = defineBigIntMethod(function(e9) {
      validateNumber(e9 >>>= 0, "offset");
      const t5 = this[e9], r4 = this[e9 + 7];
      void 0 !== t5 && void 0 !== r4 || boundsError(e9, this.length - 8);
      const s6 = t5 * 2 ** 24 + 65536 * this[++e9] + 256 * this[++e9] + this[++e9], a5 = this[++e9] * 2 ** 24 + 65536 * this[++e9] + 256 * this[++e9] + r4;
      return (BigInt(s6) << BigInt(32)) + BigInt(a5);
    }), Buffer$1.prototype.readIntLE = function(e9, t5, r4) {
      e9 >>>= 0, t5 >>>= 0, r4 || checkOffset(e9, t5, this.length);
      let s6 = this[e9], a5 = 1, c4 = 0;
      for (; ++c4 < t5 && (a5 *= 256); ) s6 += this[e9 + c4] * a5;
      return a5 *= 128, s6 >= a5 && (s6 -= Math.pow(2, 8 * t5)), s6;
    }, Buffer$1.prototype.readIntBE = function(e9, t5, r4) {
      e9 >>>= 0, t5 >>>= 0, r4 || checkOffset(e9, t5, this.length);
      let s6 = t5, a5 = 1, c4 = this[e9 + --s6];
      for (; s6 > 0 && (a5 *= 256); ) c4 += this[e9 + --s6] * a5;
      return a5 *= 128, c4 >= a5 && (c4 -= Math.pow(2, 8 * t5)), c4;
    }, Buffer$1.prototype.readInt8 = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 1, this.length), 128 & this[e9] ? -1 * (255 - this[e9] + 1) : this[e9];
    }, Buffer$1.prototype.readInt16LE = function(e9, t5) {
      e9 >>>= 0, t5 || checkOffset(e9, 2, this.length);
      const r4 = this[e9] | this[e9 + 1] << 8;
      return 32768 & r4 ? 4294901760 | r4 : r4;
    }, Buffer$1.prototype.readInt16BE = function(e9, t5) {
      e9 >>>= 0, t5 || checkOffset(e9, 2, this.length);
      const r4 = this[e9 + 1] | this[e9] << 8;
      return 32768 & r4 ? 4294901760 | r4 : r4;
    }, Buffer$1.prototype.readInt32LE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 4, this.length), this[e9] | this[e9 + 1] << 8 | this[e9 + 2] << 16 | this[e9 + 3] << 24;
    }, Buffer$1.prototype.readInt32BE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 4, this.length), this[e9] << 24 | this[e9 + 1] << 16 | this[e9 + 2] << 8 | this[e9 + 3];
    }, Buffer$1.prototype.readBigInt64LE = defineBigIntMethod(function(e9) {
      validateNumber(e9 >>>= 0, "offset");
      const t5 = this[e9], r4 = this[e9 + 7];
      void 0 !== t5 && void 0 !== r4 || boundsError(e9, this.length - 8);
      const s6 = this[e9 + 4] + 256 * this[e9 + 5] + 65536 * this[e9 + 6] + (r4 << 24);
      return (BigInt(s6) << BigInt(32)) + BigInt(t5 + 256 * this[++e9] + 65536 * this[++e9] + this[++e9] * 2 ** 24);
    }), Buffer$1.prototype.readBigInt64BE = defineBigIntMethod(function(e9) {
      validateNumber(e9 >>>= 0, "offset");
      const t5 = this[e9], r4 = this[e9 + 7];
      void 0 !== t5 && void 0 !== r4 || boundsError(e9, this.length - 8);
      const s6 = (t5 << 24) + 65536 * this[++e9] + 256 * this[++e9] + this[++e9];
      return (BigInt(s6) << BigInt(32)) + BigInt(this[++e9] * 2 ** 24 + 65536 * this[++e9] + 256 * this[++e9] + r4);
    }), Buffer$1.prototype.readFloatLE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 4, this.length), read(this, e9, true, 23, 4);
    }, Buffer$1.prototype.readFloatBE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 4, this.length), read(this, e9, false, 23, 4);
    }, Buffer$1.prototype.readDoubleLE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 8, this.length), read(this, e9, true, 52, 8);
    }, Buffer$1.prototype.readDoubleBE = function(e9, t5) {
      return e9 >>>= 0, t5 || checkOffset(e9, 8, this.length), read(this, e9, false, 52, 8);
    }, Buffer$1.prototype.writeUintLE = Buffer$1.prototype.writeUIntLE = function(e9, t5, r4, s6) {
      if (e9 = +e9, t5 >>>= 0, r4 >>>= 0, !s6) {
        checkInt(this, e9, t5, r4, Math.pow(2, 8 * r4) - 1, 0);
      }
      let a5 = 1, c4 = 0;
      for (this[t5] = 255 & e9; ++c4 < r4 && (a5 *= 256); ) this[t5 + c4] = e9 / a5 & 255;
      return t5 + r4;
    }, Buffer$1.prototype.writeUintBE = Buffer$1.prototype.writeUIntBE = function(e9, t5, r4, s6) {
      if (e9 = +e9, t5 >>>= 0, r4 >>>= 0, !s6) {
        checkInt(this, e9, t5, r4, Math.pow(2, 8 * r4) - 1, 0);
      }
      let a5 = r4 - 1, c4 = 1;
      for (this[t5 + a5] = 255 & e9; --a5 >= 0 && (c4 *= 256); ) this[t5 + a5] = e9 / c4 & 255;
      return t5 + r4;
    }, Buffer$1.prototype.writeUint8 = Buffer$1.prototype.writeUInt8 = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 1, 255, 0), this[t5] = 255 & e9, t5 + 1;
    }, Buffer$1.prototype.writeUint16LE = Buffer$1.prototype.writeUInt16LE = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 2, 65535, 0), this[t5] = 255 & e9, this[t5 + 1] = e9 >>> 8, t5 + 2;
    }, Buffer$1.prototype.writeUint16BE = Buffer$1.prototype.writeUInt16BE = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 2, 65535, 0), this[t5] = e9 >>> 8, this[t5 + 1] = 255 & e9, t5 + 2;
    }, Buffer$1.prototype.writeUint32LE = Buffer$1.prototype.writeUInt32LE = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 4, 4294967295, 0), this[t5 + 3] = e9 >>> 24, this[t5 + 2] = e9 >>> 16, this[t5 + 1] = e9 >>> 8, this[t5] = 255 & e9, t5 + 4;
    }, Buffer$1.prototype.writeUint32BE = Buffer$1.prototype.writeUInt32BE = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 4, 4294967295, 0), this[t5] = e9 >>> 24, this[t5 + 1] = e9 >>> 16, this[t5 + 2] = e9 >>> 8, this[t5 + 3] = 255 & e9, t5 + 4;
    }, Buffer$1.prototype.writeBigUInt64LE = defineBigIntMethod(function(e9, t5 = 0) {
      return wrtBigUInt64LE(this, e9, t5, BigInt(0), BigInt("0xffffffffffffffff"));
    }), Buffer$1.prototype.writeBigUInt64BE = defineBigIntMethod(function(e9, t5 = 0) {
      return wrtBigUInt64BE(this, e9, t5, BigInt(0), BigInt("0xffffffffffffffff"));
    }), Buffer$1.prototype.writeIntLE = function(e9, t5, r4, s6) {
      if (e9 = +e9, t5 >>>= 0, !s6) {
        const s7 = Math.pow(2, 8 * r4 - 1);
        checkInt(this, e9, t5, r4, s7 - 1, -s7);
      }
      let a5 = 0, c4 = 1, u6 = 0;
      for (this[t5] = 255 & e9; ++a5 < r4 && (c4 *= 256); ) e9 < 0 && 0 === u6 && 0 !== this[t5 + a5 - 1] && (u6 = 1), this[t5 + a5] = Math.trunc(e9 / c4) - u6 & 255;
      return t5 + r4;
    }, Buffer$1.prototype.writeIntBE = function(e9, t5, r4, s6) {
      if (e9 = +e9, t5 >>>= 0, !s6) {
        const s7 = Math.pow(2, 8 * r4 - 1);
        checkInt(this, e9, t5, r4, s7 - 1, -s7);
      }
      let a5 = r4 - 1, c4 = 1, u6 = 0;
      for (this[t5 + a5] = 255 & e9; --a5 >= 0 && (c4 *= 256); ) e9 < 0 && 0 === u6 && 0 !== this[t5 + a5 + 1] && (u6 = 1), this[t5 + a5] = Math.trunc(e9 / c4) - u6 & 255;
      return t5 + r4;
    }, Buffer$1.prototype.writeInt8 = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 1, 127, -128), e9 < 0 && (e9 = 255 + e9 + 1), this[t5] = 255 & e9, t5 + 1;
    }, Buffer$1.prototype.writeInt16LE = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 2, 32767, -32768), this[t5] = 255 & e9, this[t5 + 1] = e9 >>> 8, t5 + 2;
    }, Buffer$1.prototype.writeInt16BE = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 2, 32767, -32768), this[t5] = e9 >>> 8, this[t5 + 1] = 255 & e9, t5 + 2;
    }, Buffer$1.prototype.writeInt32LE = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 4, 2147483647, -2147483648), this[t5] = 255 & e9, this[t5 + 1] = e9 >>> 8, this[t5 + 2] = e9 >>> 16, this[t5 + 3] = e9 >>> 24, t5 + 4;
    }, Buffer$1.prototype.writeInt32BE = function(e9, t5, r4) {
      return e9 = +e9, t5 >>>= 0, r4 || checkInt(this, e9, t5, 4, 2147483647, -2147483648), e9 < 0 && (e9 = 4294967295 + e9 + 1), this[t5] = e9 >>> 24, this[t5 + 1] = e9 >>> 16, this[t5 + 2] = e9 >>> 8, this[t5 + 3] = 255 & e9, t5 + 4;
    }, Buffer$1.prototype.writeBigInt64LE = defineBigIntMethod(function(e9, t5 = 0) {
      return wrtBigUInt64LE(this, e9, t5, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), Buffer$1.prototype.writeBigInt64BE = defineBigIntMethod(function(e9, t5 = 0) {
      return wrtBigUInt64BE(this, e9, t5, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), Buffer$1.prototype.writeFloatLE = function(e9, t5, r4) {
      return writeFloat(this, e9, t5, true, r4);
    }, Buffer$1.prototype.writeFloatBE = function(e9, t5, r4) {
      return writeFloat(this, e9, t5, false, r4);
    }, Buffer$1.prototype.writeDoubleLE = function(e9, t5, r4) {
      return writeDouble(this, e9, t5, true, r4);
    }, Buffer$1.prototype.writeDoubleBE = function(e9, t5, r4) {
      return writeDouble(this, e9, t5, false, r4);
    }, Buffer$1.prototype.copy = function(e9, t5, r4, s6) {
      if (!Buffer$1.isBuffer(e9)) throw new TypeError("argument should be a Buffer");
      if (r4 || (r4 = 0), s6 || 0 === s6 || (s6 = this.length), t5 >= e9.length && (t5 = e9.length), t5 || (t5 = 0), s6 > 0 && s6 < r4 && (s6 = r4), s6 === r4) return 0;
      if (0 === e9.length || 0 === this.length) return 0;
      if (t5 < 0) throw new RangeError("targetStart out of bounds");
      if (r4 < 0 || r4 >= this.length) throw new RangeError("Index out of range");
      if (s6 < 0) throw new RangeError("sourceEnd out of bounds");
      s6 > this.length && (s6 = this.length), e9.length - t5 < s6 - r4 && (s6 = e9.length - t5 + r4);
      const a5 = s6 - r4;
      return this === e9 && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t5, r4, s6) : Uint8Array.prototype.set.call(e9, this.subarray(r4, s6), t5), a5;
    }, Buffer$1.prototype.fill = function(e9, t5, r4, s6) {
      if ("string" == typeof e9) {
        if ("string" == typeof t5 ? (s6 = t5, t5 = 0, r4 = this.length) : "string" == typeof r4 && (s6 = r4, r4 = this.length), void 0 !== s6 && "string" != typeof s6) throw new TypeError("encoding must be a string");
        if ("string" == typeof s6 && !Buffer$1.isEncoding(s6)) throw new TypeError("Unknown encoding: " + s6);
        if (1 === e9.length) {
          const t6 = e9.charCodeAt(0);
          ("utf8" === s6 && t6 < 128 || "latin1" === s6) && (e9 = t6);
        }
      } else "number" == typeof e9 ? e9 &= 255 : "boolean" == typeof e9 && (e9 = Number(e9));
      if (t5 < 0 || this.length < t5 || this.length < r4) throw new RangeError("Out of range index");
      if (r4 <= t5) return this;
      let a5;
      if (t5 >>>= 0, r4 = void 0 === r4 ? this.length : r4 >>> 0, e9 || (e9 = 0), "number" == typeof e9) for (a5 = t5; a5 < r4; ++a5) this[a5] = e9;
      else {
        const c4 = Buffer$1.isBuffer(e9) ? e9 : Buffer$1.from(e9, s6), u6 = c4.length;
        if (0 === u6) throw new TypeError('The value "' + e9 + '" is invalid for argument "value"');
        for (a5 = 0; a5 < r4 - t5; ++a5) this[a5 + t5] = c4[a5 % u6];
      }
      return this;
    };
    f3 = {};
    __name(E$1, "E$1");
    __name(addNumericalSeparator, "addNumericalSeparator");
    __name(checkIntBI, "checkIntBI");
    __name(validateNumber, "validateNumber");
    __name(boundsError, "boundsError");
    E$1("ERR_BUFFER_OUT_OF_BOUNDS", function(e9) {
      return e9 ? `${e9} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    }, RangeError), E$1("ERR_INVALID_ARG_TYPE", function(e9, t5) {
      return `The "${e9}" argument must be of type number. Received type ${typeof t5}`;
    }, TypeError), E$1("ERR_OUT_OF_RANGE", function(e9, t5, r4) {
      let s6 = `The value of "${e9}" is out of range.`, a5 = r4;
      return Number.isInteger(r4) && Math.abs(r4) > 2 ** 32 ? a5 = addNumericalSeparator(String(r4)) : "bigint" == typeof r4 && (a5 = String(r4), (r4 > BigInt(2) ** BigInt(32) || r4 < -(BigInt(2) ** BigInt(32))) && (a5 = addNumericalSeparator(a5)), a5 += "n"), s6 += ` It must be ${t5}. Received ${a5}`, s6;
    }, RangeError);
    h4 = /[^\w+/-]/g;
    __name(utf8ToBytes, "utf8ToBytes");
    __name(base64ToBytes, "base64ToBytes");
    __name(blitBuffer, "blitBuffer");
    __name(isInstance, "isInstance");
    __name(numberIsNaN, "numberIsNaN");
    d4 = (function() {
      const e9 = "0123456789abcdef", t5 = Array.from({ length: 256 });
      for (let r4 = 0; r4 < 16; ++r4) {
        const s6 = 16 * r4;
        for (let a5 = 0; a5 < 16; ++a5) t5[s6 + a5] = e9[r4] + e9[a5];
      }
      return t5;
    })();
    __name(defineBigIntMethod, "defineBigIntMethod");
    __name(BufferBigIntNotDefined, "BufferBigIntNotDefined");
    g2 = globalThis.Buffer || Buffer$1;
    globalThis.btoa.bind(globalThis), globalThis.atob.bind(globalThis), "global" in globalThis || (globalThis.global = globalThis);
    Object.assign(/* @__PURE__ */ Object.create(null), { NONE: 0, DIRHANDLE: 1, DNSCHANNEL: 2, ELDHISTOGRAM: 3, FILEHANDLE: 4, FILEHANDLECLOSEREQ: 5, BLOBREADER: 6, FSEVENTWRAP: 7, FSREQCALLBACK: 8, FSREQPROMISE: 9, GETADDRINFOREQWRAP: 10, GETNAMEINFOREQWRAP: 11, HEAPSNAPSHOT: 12, HTTP2SESSION: 13, HTTP2STREAM: 14, HTTP2PING: 15, HTTP2SETTINGS: 16, HTTPINCOMINGMESSAGE: 17, HTTPCLIENTREQUEST: 18, JSSTREAM: 19, JSUDPWRAP: 20, MESSAGEPORT: 21, PIPECONNECTWRAP: 22, PIPESERVERWRAP: 23, PIPEWRAP: 24, PROCESSWRAP: 25, PROMISE: 26, QUERYWRAP: 27, QUIC_ENDPOINT: 28, QUIC_LOGSTREAM: 29, QUIC_PACKET: 30, QUIC_SESSION: 31, QUIC_STREAM: 32, QUIC_UDP: 33, SHUTDOWNWRAP: 34, SIGNALWRAP: 35, STATWATCHER: 36, STREAMPIPE: 37, TCPCONNECTWRAP: 38, TCPSERVERWRAP: 39, TCPWRAP: 40, TTYWRAP: 41, UDPSENDWRAP: 42, UDPWRAP: 43, SIGINTWATCHDOG: 44, WORKER: 45, WORKERHEAPSNAPSHOT: 46, WRITEWRAP: 47, ZLIB: 48, CHECKPRIMEREQUEST: 49, PBKDF2REQUEST: 50, KEYPAIRGENREQUEST: 51, KEYGENREQUEST: 52, KEYEXPORTREQUEST: 53, CIPHERREQUEST: 54, DERIVEBITSREQUEST: 55, HASHREQUEST: 56, RANDOMBYTESREQUEST: 57, RANDOMPRIMEREQUEST: 58, SCRYPTREQUEST: 59, SIGNREQUEST: 60, TLSWRAP: 61, VERIFYREQUEST: 62 });
    m3 = 100;
    _2 = globalThis.AsyncResource || class {
      __unenv__ = true;
      type;
      _asyncId;
      _triggerAsyncId;
      constructor(e9, t5 = 0) {
        this.type = e9, this._asyncId = -1 * m3++, this._triggerAsyncId = "number" == typeof t5 ? t5 : t5?.triggerAsyncId;
      }
      static bind(e9, t5, r4) {
        return new _2(t5 ?? "anonymous").bind(e9);
      }
      bind(e9, t5) {
        const binded = /* @__PURE__ */ __name((...r4) => this.runInAsyncScope(e9, t5, ...r4), "binded");
        return binded.asyncResource = this, binded;
      }
      runInAsyncScope(e9, t5, ...r4) {
        return e9.apply(t5, r4);
      }
      emitDestroy() {
        return this;
      }
      asyncId() {
        return this._asyncId;
      }
      triggerAsyncId() {
        return this._triggerAsyncId;
      }
    };
    E2 = 10;
    R2 = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    inspect = /* @__PURE__ */ __name((e9, t5) => e9, "inspect");
    B = Error;
    x6 = Error;
    I2 = Error;
    T2 = Error;
    S3 = Error;
    C2 = /* @__PURE__ */ Symbol.for("nodejs.rejection");
    $ = /* @__PURE__ */ Symbol.for("kCapture");
    j2 = /* @__PURE__ */ Symbol.for("events.errorMonitor");
    O2 = /* @__PURE__ */ Symbol.for("shapeMode");
    P2 = /* @__PURE__ */ Symbol.for("events.maxEventTargetListeners");
    L2 = /* @__PURE__ */ Symbol.for("kEnhanceStackBeforeInspector");
    N2 = /* @__PURE__ */ Symbol.for("nodejs.watermarkData");
    U2 = /* @__PURE__ */ Symbol.for("kEventEmitter");
    M2 = /* @__PURE__ */ Symbol.for("kAsyncResource");
    H = /* @__PURE__ */ Symbol.for("kFirstEventParam");
    z2 = /* @__PURE__ */ Symbol.for("kResistStopPropagation");
    W = /* @__PURE__ */ Symbol.for("events.maxEventTargetListenersWarned");
    _EventEmitter = class __EventEmitter {
      static {
        __name(this, "_EventEmitter");
      }
      _events = void 0;
      _eventsCount = 0;
      _maxListeners = E2;
      [$] = false;
      [O2] = false;
      static captureRejectionSymbol = C2;
      static errorMonitor = j2;
      static kMaxEventTargetListeners = P2;
      static kMaxEventTargetListenersWarned = W;
      static usingDomains = false;
      static get on() {
        return on$1;
      }
      static get once() {
        return once$1;
      }
      static get getEventListeners() {
        return getEventListeners;
      }
      static get getMaxListeners() {
        return getMaxListeners$1;
      }
      static get addAbortListener() {
        return addAbortListener;
      }
      static get EventEmitterAsyncResource() {
        return EventEmitterAsyncResource;
      }
      static get EventEmitter() {
        return __EventEmitter;
      }
      static setMaxListeners(e9 = E2, ...t5) {
        if (0 === t5.length) E2 = e9;
        else for (const r4 of t5) if (isEventTarget(r4)) r4[P2] = e9, r4[W] = false;
        else {
          if ("function" != typeof r4.setMaxListeners) throw new I2("eventTargets", ["EventEmitter", "EventTarget"], r4);
          r4.setMaxListeners(e9);
        }
      }
      static listenerCount(e9, t5) {
        if ("function" == typeof e9.listenerCount) return e9.listenerCount(t5);
        __EventEmitter.prototype.listenerCount.call(e9, t5);
      }
      static init() {
        throw new Error("EventEmitter.init() is not implemented.");
      }
      static get captureRejections() {
        return this[$];
      }
      static set captureRejections(e9) {
        this[$] = e9;
      }
      static get defaultMaxListeners() {
        return E2;
      }
      static set defaultMaxListeners(e9) {
        E2 = e9;
      }
      constructor(e9) {
        void 0 === this._events || this._events === Object.getPrototypeOf(this)._events ? (this._events = { __proto__: null }, this._eventsCount = 0, this[O2] = false) : this[O2] = true, this._maxListeners = this._maxListeners || void 0, this[$] = e9?.captureRejections ? Boolean(e9.captureRejections) : __EventEmitter.prototype[$];
      }
      setMaxListeners(e9) {
        return this._maxListeners = e9, this;
      }
      getMaxListeners() {
        return _getMaxListeners(this);
      }
      emit(e9, ...t5) {
        let r4 = "error" === e9;
        const s6 = this._events;
        if (void 0 !== s6) r4 && void 0 !== s6[j2] && this.emit(j2, ...t5), r4 = r4 && void 0 === s6.error;
        else if (!r4) return false;
        if (r4) {
          let e10, r5;
          if (t5.length > 0 && (e10 = t5[0]), e10 instanceof Error) {
            try {
              const t6 = {};
              Error.captureStackTrace?.(t6, __EventEmitter.prototype.emit), Object.defineProperty(e10, L2, { __proto__: null, value: Function.prototype.bind(enhanceStackTrace, this, e10, t6), configurable: true });
            } catch {
            }
            throw e10;
          }
          try {
            r5 = inspect(e10);
          } catch {
            r5 = e10;
          }
          const s7 = new x6(r5);
          throw s7.context = e10, s7;
        }
        const a5 = s6[e9];
        if (void 0 === a5) return false;
        if ("function" == typeof a5) {
          const r5 = a5.apply(this, t5);
          null != r5 && addCatch(this, r5, e9, t5);
        } else {
          const r5 = a5.length, s7 = arrayClone(a5);
          for (let a6 = 0; a6 < r5; ++a6) {
            const r6 = s7[a6].apply(this, t5);
            null != r6 && addCatch(this, r6, e9, t5);
          }
        }
        return true;
      }
      addListener(e9, t5) {
        return _addListener(this, e9, t5, false), this;
      }
      on(e9, t5) {
        return this.addListener(e9, t5);
      }
      prependListener(e9, t5) {
        return _addListener(this, e9, t5, true), this;
      }
      once(e9, t5) {
        return this.on(e9, _onceWrap(this, e9, t5)), this;
      }
      prependOnceListener(e9, t5) {
        return this.prependListener(e9, _onceWrap(this, e9, t5)), this;
      }
      removeListener(e9, t5) {
        const r4 = this._events;
        if (void 0 === r4) return this;
        const s6 = r4[e9];
        if (void 0 === s6) return this;
        if (s6 === t5 || s6.listener === t5) this._eventsCount -= 1, this[O2] ? r4[e9] = void 0 : 0 === this._eventsCount ? this._events = { __proto__: null } : (delete r4[e9], r4.removeListener && this.emit("removeListener", e9, s6.listener || t5));
        else if ("function" != typeof s6) {
          let a5 = -1;
          for (let e10 = s6.length - 1; e10 >= 0; e10--) if (s6[e10] === t5 || s6[e10].listener === t5) {
            a5 = e10;
            break;
          }
          if (a5 < 0) return this;
          0 === a5 ? s6.shift() : (function(e10, t6) {
            for (; t6 + 1 < e10.length; t6++) e10[t6] = e10[t6 + 1];
            e10.pop();
          })(s6, a5), 1 === s6.length && (r4[e9] = s6[0]), void 0 !== r4.removeListener && this.emit("removeListener", e9, t5);
        }
        return this;
      }
      off(e9, t5) {
        return this.removeListener(e9, t5);
      }
      removeAllListeners(e9) {
        const t5 = this._events;
        if (void 0 === t5) return this;
        if (void 0 === t5.removeListener) return 0 === arguments.length ? (this._events = { __proto__: null }, this._eventsCount = 0) : void 0 !== t5[e9] && (0 === --this._eventsCount ? this._events = { __proto__: null } : delete t5[e9]), this[O2] = false, this;
        if (0 === arguments.length) {
          for (const e10 of Reflect.ownKeys(t5)) "removeListener" !== e10 && this.removeAllListeners(e10);
          return this.removeAllListeners("removeListener"), this._events = { __proto__: null }, this._eventsCount = 0, this[O2] = false, this;
        }
        const r4 = t5[e9];
        if ("function" == typeof r4) this.removeListener(e9, r4);
        else if (void 0 !== r4) for (let t6 = r4.length - 1; t6 >= 0; t6--) this.removeListener(e9, r4[t6]);
        return this;
      }
      listeners(e9) {
        return _listeners(this, e9, true);
      }
      rawListeners(e9) {
        return _listeners(this, e9, false);
      }
      eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      }
      listenerCount(e9, t5) {
        const r4 = this._events;
        if (void 0 !== r4) {
          const s6 = r4[e9];
          if ("function" == typeof s6) return null != t5 ? t5 === s6 || t5 === s6.listener ? 1 : 0 : 1;
          if (void 0 !== s6) {
            if (null != t5) {
              let e10 = 0;
              for (let r5 = 0, a5 = s6.length; r5 < a5; r5++) s6[r5] !== t5 && s6[r5].listener !== t5 || e10++;
              return e10;
            }
            return s6.length;
          }
        }
        return 0;
      }
    };
    EventEmitterAsyncResource = class extends _EventEmitter {
      static {
        __name(this, "EventEmitterAsyncResource");
      }
      constructor(e9) {
        let t5;
        "string" == typeof e9 ? (t5 = e9, e9 = void 0) : t5 = e9?.name || new.target.name, super(e9), this[M2] = new EventEmitterReferencingAsyncResource(this, t5, e9);
      }
      emit(e9, ...t5) {
        if (void 0 === this[M2]) throw new B("EventEmitterAsyncResource");
        const { asyncResource: r4 } = this;
        return Array.prototype.unshift(t5, super.emit, this, e9), Reflect.apply(r4.runInAsyncScope, r4, t5);
      }
      emitDestroy() {
        if (void 0 === this[M2]) throw new B("EventEmitterAsyncResource");
        this.asyncResource.emitDestroy();
      }
      get asyncId() {
        if (void 0 === this[M2]) throw new B("EventEmitterAsyncResource");
        return this.asyncResource.asyncId();
      }
      get triggerAsyncId() {
        if (void 0 === this[M2]) throw new B("EventEmitterAsyncResource");
        return this.asyncResource.triggerAsyncId();
      }
      get asyncResource() {
        if (void 0 === this[M2]) throw new B("EventEmitterAsyncResource");
        return this[M2];
      }
    };
    EventEmitterReferencingAsyncResource = class extends _2 {
      static {
        __name(this, "EventEmitterReferencingAsyncResource");
      }
      constructor(e9, t5, r4) {
        super(t5, r4), this[U2] = e9;
      }
      get eventEmitter() {
        if (void 0 === this[U2]) throw new B("EventEmitterReferencingAsyncResource");
        return this[U2];
      }
    };
    on$1 = /* @__PURE__ */ __name(function(e9, t5, r4 = {}) {
      const s6 = r4.signal;
      if (s6?.aborted) throw new T2(void 0, { cause: s6?.reason });
      const a5 = r4.highWaterMark ?? r4.highWatermark ?? Number.MAX_SAFE_INTEGER, c4 = r4.lowWaterMark ?? r4.lowWatermark ?? 1, u6 = new FixedQueue(), f4 = new FixedQueue();
      let h5 = false, d5 = null, g3 = false, m4 = 0;
      const _3 = Object.setPrototypeOf({ next() {
        if (m4) {
          const t6 = u6.shift();
          return m4--, h5 && m4 < c4 && (e9.resume?.(), h5 = false), Promise.resolve(createIterResult(t6, false));
        }
        if (d5) {
          const e10 = Promise.reject(d5);
          return d5 = null, e10;
        }
        return g3 ? closeHandler() : new Promise(function(e10, t6) {
          f4.push({ resolve: e10, reject: t6 });
        });
      }, return: /* @__PURE__ */ __name(() => closeHandler(), "return"), throw(e10) {
        if (!(e10 && e10 instanceof Error)) throw new I2("EventEmitter.AsyncIterator", "Error", e10);
        errorHandler(e10);
      }, [Symbol.asyncIterator]() {
        return this;
      }, [N2]: { get size() {
        return m4;
      }, get low() {
        return c4;
      }, get high() {
        return a5;
      }, get isPaused() {
        return h5;
      } } }, R2), { addEventListener: E3, removeAll: B2 } = /* @__PURE__ */ (function() {
        const e10 = [];
        return { addEventListener(t6, r5, s7, a6) {
          eventTargetAgnosticAddListener(t6, r5, s7, a6), Array.prototype.push(e10, [t6, r5, s7, a6]);
        }, removeAll() {
          for (; e10.length > 0; ) Reflect.apply(eventTargetAgnosticRemoveListener, void 0, e10.pop());
        } };
      })();
      E3(e9, t5, r4[H] ? eventHandler : function(...e10) {
        return eventHandler(e10);
      }), "error" !== t5 && "function" == typeof e9.on && E3(e9, "error", errorHandler);
      const x7 = r4?.close;
      if (x7?.length) for (const t6 of x7) E3(e9, t6, closeHandler);
      const S4 = s6 ? addAbortListener(s6, function() {
        errorHandler(new T2(void 0, { cause: s6?.reason }));
      }) : null;
      return _3;
      function eventHandler(t6) {
        f4.isEmpty() ? (m4++, !h5 && m4 > a5 && (h5 = true, e9.pause?.()), u6.push(t6)) : f4.shift().resolve(createIterResult(t6, false));
      }
      __name(eventHandler, "eventHandler");
      function errorHandler(e10) {
        f4.isEmpty() ? d5 = e10 : f4.shift().reject(e10), closeHandler();
      }
      __name(errorHandler, "errorHandler");
      function closeHandler() {
        S4?.[Symbol.dispose](), B2(), g3 = true;
        const e10 = createIterResult(void 0, true);
        for (; !f4.isEmpty(); ) f4.shift().resolve(e10);
        return Promise.resolve(e10);
      }
      __name(closeHandler, "closeHandler");
    }, "on$1");
    once$1 = /* @__PURE__ */ __name(async function(e9, t5, r4 = {}) {
      const s6 = r4?.signal;
      if (s6?.aborted) throw new T2(void 0, { cause: s6?.reason });
      return new Promise((r5, a5) => {
        const errorListener = /* @__PURE__ */ __name((r6) => {
          "function" == typeof e9.removeListener && e9.removeListener(t5, resolver), null != s6 && eventTargetAgnosticRemoveListener(s6, "abort", abortListener), a5(r6);
        }, "errorListener"), resolver = /* @__PURE__ */ __name((...t6) => {
          "function" == typeof e9.removeListener && e9.removeListener("error", errorListener), null != s6 && eventTargetAgnosticRemoveListener(s6, "abort", abortListener), r5(t6);
        }, "resolver");
        function abortListener() {
          eventTargetAgnosticRemoveListener(e9, t5, resolver), eventTargetAgnosticRemoveListener(e9, "error", errorListener), a5(new T2(void 0, { cause: s6?.reason }));
        }
        __name(abortListener, "abortListener");
        eventTargetAgnosticAddListener(e9, t5, resolver, { __proto__: null, once: true, [z2]: true }), "error" !== t5 && "function" == typeof e9.once && e9.once("error", errorListener), null != s6 && eventTargetAgnosticAddListener(s6, "abort", abortListener, { __proto__: null, once: true, [z2]: true });
      });
    }, "once$1");
    addAbortListener = /* @__PURE__ */ __name(function(e9, t5) {
      if (void 0 === e9) throw new I2("signal", "AbortSignal", e9);
      let r4;
      return e9.aborted ? queueMicrotask(() => t5()) : (e9.addEventListener("abort", t5, { __proto__: null, once: true, [z2]: true }), r4 = /* @__PURE__ */ __name(() => {
        e9.removeEventListener("abort", t5);
      }, "r")), { __proto__: null, [Symbol.dispose]() {
        r4?.();
      } };
    }, "addAbortListener");
    getEventListeners = /* @__PURE__ */ __name(function(e9, t5) {
      if ("function" == typeof e9.listeners) return e9.listeners(t5);
      if (isEventTarget(e9)) {
        const r4 = e9[kEvents].get(t5), s6 = [];
        let a5 = r4?.next;
        for (; void 0 !== a5?.listener; ) {
          const e10 = a5.listener?.deref ? a5.listener.deref() : a5.listener;
          s6.push(e10), a5 = a5.next;
        }
        return s6;
      }
      throw new I2("emitter", ["EventEmitter", "EventTarget"], e9);
    }, "getEventListeners");
    getMaxListeners$1 = /* @__PURE__ */ __name(function(e9) {
      if ("function" == typeof e9?.getMaxListeners) return _getMaxListeners(e9);
      if (e9?.[P2]) return e9[P2];
      throw new I2("emitter", ["EventEmitter", "EventTarget"], e9);
    }, "getMaxListeners$1");
    q = 2047;
    FixedCircularBuffer = class {
      static {
        __name(this, "FixedCircularBuffer");
      }
      bottom;
      top;
      list;
      next;
      constructor() {
        this.bottom = 0, this.top = 0, this.list = new Array(2048), this.next = null;
      }
      isEmpty() {
        return this.top === this.bottom;
      }
      isFull() {
        return (this.top + 1 & q) === this.bottom;
      }
      push(e9) {
        this.list[this.top] = e9, this.top = this.top + 1 & q;
      }
      shift() {
        const e9 = this.list[this.bottom];
        return void 0 === e9 ? null : (this.list[this.bottom] = void 0, this.bottom = this.bottom + 1 & q, e9);
      }
    };
    FixedQueue = class {
      static {
        __name(this, "FixedQueue");
      }
      head;
      tail;
      constructor() {
        this.head = this.tail = new FixedCircularBuffer();
      }
      isEmpty() {
        return this.head.isEmpty();
      }
      push(e9) {
        this.head.isFull() && (this.head = this.head.next = new FixedCircularBuffer()), this.head.push(e9);
      }
      shift() {
        const e9 = this.tail, t5 = e9.shift();
        return e9.isEmpty() && null !== e9.next && (this.tail = e9.next, e9.next = null), t5;
      }
    };
    __name(isEventTarget, "isEventTarget");
    __name(addCatch, "addCatch");
    __name(emitUnhandledRejectionOrErr, "emitUnhandledRejectionOrErr");
    __name(_getMaxListeners, "_getMaxListeners");
    __name(enhanceStackTrace, "enhanceStackTrace");
    __name(_addListener, "_addListener");
    __name(onceWrapper, "onceWrapper");
    __name(_onceWrap, "_onceWrap");
    __name(_listeners, "_listeners");
    __name(arrayClone, "arrayClone");
    __name(createIterResult, "createIterResult");
    __name(eventTargetAgnosticRemoveListener, "eventTargetAgnosticRemoveListener");
    __name(eventTargetAgnosticAddListener, "eventTargetAgnosticAddListener");
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(e9) {
        this.fd = e9;
      }
      setRawMode(e9) {
        return this.isRaw = e9, this;
      }
    };
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(e9) {
        this.fd = e9;
      }
      clearLine(e9, t5) {
        return t5 && t5(), false;
      }
      clearScreenDown(e9) {
        return e9 && e9(), false;
      }
      cursorTo(e9, t5, r4) {
        return r4 && "function" == typeof r4 && r4(), false;
      }
      moveCursor(e9, t5, r4) {
        return r4 && r4(), false;
      }
      getColorDepth(e9) {
        return 1;
      }
      hasColors(e9, t5) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(e9, t5, r4) {
        e9 instanceof Uint8Array && (e9 = new TextDecoder().decode(e9));
        try {
          console.log(e9);
        } catch {
        }
        return r4 && "function" == typeof r4 && r4(), false;
      }
    };
    D2 = "22.14.0";
    Process = class _Process extends _EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(e9) {
        super(), this.env = e9.env, this.hrtime = e9.hrtime, this.nextTick = e9.nextTick;
        for (const e10 of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(_EventEmitter.prototype)]) {
          const t5 = this[e10];
          "function" == typeof t5 && (this[e10] = t5.bind(this));
        }
      }
      emitWarning(e9, t5, r4) {
        console.warn(`${r4 ? `[${r4}] ` : ""}${t5 ? `${t5}: ` : ""}${e9}`);
      }
      emit(...e9) {
        return super.emit(...e9);
      }
      listeners(e9) {
        return super.listeners(e9);
      }
      #e;
      #t;
      #r;
      get stdin() {
        return this.#e ??= new ReadStream(0);
      }
      get stdout() {
        return this.#t ??= new WriteStream(1);
      }
      get stderr() {
        return this.#r ??= new WriteStream(2);
      }
      #n = "/";
      chdir(e9) {
        this.#n = e9;
      }
      cwd() {
        return this.#n;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${D2}`;
      }
      get versions() {
        return { node: D2 };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: notImplemented("process.permission.has") };
      report = { directory: "", filename: "", signal: "SIGUSR2", compact: false, reportOnFatalError: false, reportOnSignal: false, reportOnUncaughtException: false, getReport: notImplemented("process.report.getReport"), writeReport: notImplemented("process.report.writeReport") };
      finalization = { register: notImplemented("process.finalization.register"), unregister: notImplemented("process.finalization.unregister"), registerBeforeExit: notImplemented("process.finalization.registerBeforeExit") };
      memoryUsage = Object.assign(() => ({ arrayBuffers: 0, rss: 0, external: 0, heapTotal: 0, heapUsed: 0 }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
    F2 = /* @__PURE__ */ Object.create(null);
    K = globalThis.process;
    _getEnv = /* @__PURE__ */ __name((e9) => globalThis.__env__ || K?.env || (e9 ? F2 : globalThis), "_getEnv");
    Q = new Proxy(F2, { get: /* @__PURE__ */ __name((e9, t5) => _getEnv()[t5] ?? F2[t5], "get"), has: /* @__PURE__ */ __name((e9, t5) => t5 in _getEnv() || t5 in F2, "has"), set: /* @__PURE__ */ __name((e9, t5, r4) => (_getEnv(true)[t5] = r4, true), "set"), deleteProperty: /* @__PURE__ */ __name((e9, t5) => (delete _getEnv(true)[t5], true), "deleteProperty"), ownKeys() {
      const e9 = _getEnv();
      return Object.keys(e9);
    }, getOwnPropertyDescriptor(e9, t5) {
      const r4 = _getEnv();
      if (t5 in r4) return { value: r4[t5], writable: true, enumerable: true, configurable: true };
    } });
    G = Object.assign(function(e9) {
      const t5 = Date.now(), r4 = Math.trunc(t5 / 1e3), s6 = t5 % 1e3 * 1e6;
      if (e9) {
        let t6 = r4 - e9[0], a5 = s6 - e9[0];
        return a5 < 0 && (t6 -= 1, a5 = 1e9 + a5), [t6, a5];
      }
      return [r4, s6];
    }, { bigint: /* @__PURE__ */ __name(function() {
      return BigInt(1e6 * Date.now());
    }, "bigint") });
    Z = globalThis.queueMicrotask ? (e9, ...t5) => {
      globalThis.queueMicrotask(e9.bind(void 0, ...t5));
    } : createNextTickWithTimeout();
    __name(createNextTickWithTimeout, "createNextTickWithTimeout");
    J = new Process({ env: Q, hrtime: G, nextTick: Z });
    ({ abort: V, addListener: Y, allowedNodeEnvironmentFlags: X, hasUncaughtExceptionCaptureCallback: ee, setUncaughtExceptionCaptureCallback: te, loadEnvFile: re, sourceMapsEnabled: ne, arch: oe, argv: se, argv0: ie, chdir: ae, config: ce, connected: ue2, constrainedMemory: fe3, availableMemory: le2, cpuUsage: he3, cwd: de2, debugPort: pe2, dlopen: ge3, disconnect: me3, emit: ye3, emitWarning: we3, env: be3, eventNames: ve3, execArgv: _e3, execPath: Ee3, exit: Re3, finalization: Be3, features: Ae3, getBuiltinModule: xe3, getActiveResourcesInfo: Ie3, getMaxListeners: Te3, hrtime: Se3, kill: ke3, listeners: Ce3, listenerCount: $e3, memoryUsage: je3, nextTick: Oe3, on: Pe3, off: Le3, once: Ne3, pid: Ue3, platform: Me3, ppid: He3, prependListener: ze3, prependOnceListener: We3, rawListeners: qe3, release: De3, removeAllListeners: Fe3, removeListener: Ke3, report: Qe3, resourceUsage: Ge3, setMaxListeners: Ze3, setSourceMapsEnabled: Je3, stderr: Ve3, stdin: Ye3, stdout: Xe3, title: et3, umask: tt3, uptime: rt3, version: nt3, versions: ot3, domain: st3, initgroups: it3, moduleLoadList: at3, reallyExit: ct3, openStdin: ut3, assert: ft3, binding: lt3, send: ht3, exitCode: dt3, channel: pt3, getegid: gt3, geteuid: mt3, getgid: yt3, getgroups: wt3, getuid: bt3, setegid: vt3, seteuid: _t3, setgid: Et3, setgroups: Rt3, setuid: Bt3, permission: At3, mainModule: xt3, ref: It3, unref: Tt3, _events: St3, _eventsCount: kt3, _exiting: Ct3, _maxListeners: $t3, _debugEnd: jt3, _debugProcess: Ot3, _fatalException: Pt3, _getActiveHandles: Lt3, _getActiveRequests: Nt3, _kill: Ut3, _preload_modules: Mt3, _rawDebug: Ht3, _startProfilerIdleNotifier: zt3, _stopProfilerIdleNotifier: Wt3, _tickCallback: qt3, _disconnect: Dt3, _handleQueue: Ft3, _pendingMessage: Kt3, _channel: Qt3, _send: Gt3, _linkedBinding: Zt3 } = J);
    Jt3 = globalThis.process;
    globalThis.process = Jt3 ? new Proxy(Jt3, { get: /* @__PURE__ */ __name((e9, t5, r4) => Reflect.has(e9, t5) ? Reflect.get(e9, t5, r4) : Reflect.get(J, t5, r4), "get") }) : J, globalThis.Buffer || (globalThis.Buffer = g2);
    Object.assign(() => {
    }, { __unenv__: true });
    Timeout = class {
      static {
        __name(this, "Timeout");
      }
      constructor(e9, t5) {
        "function" == typeof e9 && e9(...t5);
      }
      close() {
        throw createNotImplementedError("node.timers.timeout.close");
      }
      _onTimeout(...e9) {
        throw createNotImplementedError("node.timers.timeout._onTimeout");
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
      hasRef() {
        return false;
      }
      refresh() {
        return this;
      }
      [Symbol.dispose]() {
      }
      [Symbol.toPrimitive]() {
        return 0;
      }
    };
    __name(setTimeoutFallback, "setTimeoutFallback");
    setTimeoutFallback.__promisify__ = function(e9, t5, r4) {
      return new Promise((e10) => {
        e10(t5);
      });
    };
    Immediate = class {
      static {
        __name(this, "Immediate");
      }
      _onImmediate;
      _timeout;
      constructor(e9, t5) {
        this._onImmediate = e9, "setTimeout" in globalThis ? this._timeout = setTimeout(e9, 0, ...t5) : e9(...t5);
      }
      ref() {
        return this._timeout?.ref(), this;
      }
      unref() {
        return this._timeout?.unref(), this;
      }
      hasRef() {
        return this._timeout?.hasRef() ?? false;
      }
      [Symbol.dispose]() {
        "clearTimeout" in globalThis && clearTimeout(this._timeout);
      }
    };
    __name(setImmediateFallback, "setImmediateFallback");
    __name(setIntervalFallback, "setIntervalFallback");
    setImmediateFallback.__promisify__ = function(e9) {
      return new Promise((t5) => {
        t5(e9);
      });
    }, setIntervalFallback.__promisify__ = async function* (e9, t5) {
      yield t5;
    };
    Vt3 = globalThis.clearImmediate?.bind(globalThis) || function(e9) {
      e9?.[Symbol.dispose]();
    };
    globalThis.clearInterval?.bind(globalThis), globalThis.clearTimeout?.bind(globalThis);
    Yt3 = globalThis.setImmediate?.bind(globalThis) || setImmediateFallback;
    globalThis.setTimeout?.bind(globalThis), globalThis.setInterval?.bind(globalThis), globalThis.setImmediate || (globalThis.setImmediate = Yt3), globalThis.clearImmediate || (globalThis.clearImmediate = Vt3);
    Xt3 = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
    er3 = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    tr3 = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
    __name(jsonParseTransform, "jsonParseTransform");
    __name(destr, "destr");
    rr3 = /#/g;
    nr3 = /&/g;
    or3 = /\//g;
    sr3 = /=/g;
    ir3 = /\?/g;
    ar3 = /\+/g;
    cr3 = /%5e/gi;
    ur3 = /%60/gi;
    fr3 = /%7c/gi;
    lr3 = /%20/gi;
    hr3 = /%2f/gi;
    dr3 = /%252f/gi;
    __name(encode, "encode");
    __name(encodeQueryValue2, "encodeQueryValue");
    __name(encodeQueryKey2, "encodeQueryKey");
    __name(encodePath, "encodePath");
    __name(decode2, "decode");
    __name(decodePath, "decodePath");
    __name(decodeQueryKey, "decodeQueryKey");
    __name(decodeQueryValue, "decodeQueryValue");
    __name(parseQuery, "parseQuery");
    __name(stringifyQuery2, "stringifyQuery");
    pr3 = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
    gr3 = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
    mr3 = /^([/\\]\s*){2,}[^/\\]/;
    yr3 = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
    wr3 = /\/$|\/\?|\/#/;
    br3 = /^\.?\//;
    __name(hasProtocol, "hasProtocol");
    __name(isScriptProtocol, "isScriptProtocol");
    __name(hasTrailingSlash, "hasTrailingSlash");
    __name(withoutTrailingSlash, "withoutTrailingSlash");
    __name(withTrailingSlash, "withTrailingSlash");
    __name(withLeadingSlash, "withLeadingSlash");
    __name(withoutBase, "withoutBase");
    __name(withQuery, "withQuery");
    __name(getQuery$1, "getQuery$1");
    __name(isEmptyURL, "isEmptyURL");
    __name(joinURL, "joinURL");
    __name(joinRelativeURL, "joinRelativeURL");
    vr3 = /* @__PURE__ */ Symbol.for("ufo:protocolRelative");
    __name(parseURL, "parseURL");
    __name(parsePath, "parsePath");
    _r3 = 0;
    Er3 = 1;
    Rr3 = 2;
    __name(createRouter$1, "createRouter$1");
    __name(insert, "insert");
    __name(createRadixNode, "createRadixNode");
    __name(getNodeType, "getNodeType");
    __name(toRouteMatcher, "toRouteMatcher");
    __name(_matchRoutes, "_matchRoutes");
    __name(_sortRoutesMap, "_sortRoutesMap");
    __name(_routerNodeToTable, "_routerNodeToTable");
    __name(isPlainObject3, "isPlainObject");
    __name(_defu, "_defu");
    __name(createDefu, "createDefu");
    Br = createDefu();
    Ar3 = createDefu((e9, t5, r4) => {
      if (void 0 !== e9[t5] && "function" == typeof r4) return e9[t5] = r4(e9[t5]), true;
    });
    __name(o4, "o");
    i5 = class _i extends _EventEmitter {
      static {
        __name(this, "i");
      }
      __unenv__ = {};
      readableEncoding = null;
      readableEnded = true;
      readableFlowing = false;
      readableHighWaterMark = 0;
      readableLength = 0;
      readableObjectMode = false;
      readableAborted = false;
      readableDidRead = false;
      closed = false;
      errored = null;
      readable = false;
      destroyed = false;
      static from(e9, t5) {
        return new _i(t5);
      }
      constructor(e9) {
        super();
      }
      _read(e9) {
      }
      read(e9) {
      }
      setEncoding(e9) {
        return this;
      }
      pause() {
        return this;
      }
      resume() {
        return this;
      }
      isPaused() {
        return true;
      }
      unpipe(e9) {
        return this;
      }
      unshift(e9, t5) {
      }
      wrap(e9) {
        return this;
      }
      push(e9, t5) {
        return false;
      }
      _destroy(e9, t5) {
        this.removeAllListeners();
      }
      destroy(e9) {
        return this.destroyed = true, this._destroy(e9), this;
      }
      pipe(e9, t5) {
        return {};
      }
      compose(e9, t5) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return this.destroy(), Promise.resolve();
      }
      async *[Symbol.asyncIterator]() {
        throw o4("Readable.asyncIterator");
      }
      iterator(e9) {
        throw o4("Readable.iterator");
      }
      map(e9, t5) {
        throw o4("Readable.map");
      }
      filter(e9, t5) {
        throw o4("Readable.filter");
      }
      forEach(e9, t5) {
        throw o4("Readable.forEach");
      }
      reduce(e9, t5, r4) {
        throw o4("Readable.reduce");
      }
      find(e9, t5) {
        throw o4("Readable.find");
      }
      findIndex(e9, t5) {
        throw o4("Readable.findIndex");
      }
      some(e9, t5) {
        throw o4("Readable.some");
      }
      toArray(e9) {
        throw o4("Readable.toArray");
      }
      every(e9, t5) {
        throw o4("Readable.every");
      }
      flatMap(e9, t5) {
        throw o4("Readable.flatMap");
      }
      drop(e9, t5) {
        throw o4("Readable.drop");
      }
      take(e9, t5) {
        throw o4("Readable.take");
      }
      asIndexedPairs(e9) {
        throw o4("Readable.asIndexedPairs");
      }
    };
    xr3 = class extends _EventEmitter {
      static {
        __name(this, "xr");
      }
      __unenv__ = {};
      writable = true;
      writableEnded = false;
      writableFinished = false;
      writableHighWaterMark = 0;
      writableLength = 0;
      writableObjectMode = false;
      writableCorked = 0;
      closed = false;
      errored = null;
      writableNeedDrain = false;
      writableAborted = false;
      destroyed = false;
      _data;
      _encoding = "utf8";
      constructor(e9) {
        super();
      }
      pipe(e9, t5) {
        return {};
      }
      _write(e9, t5, r4) {
        if (this.writableEnded) r4 && r4();
        else {
          if (void 0 === this._data) this._data = e9;
          else {
            const r5 = "string" == typeof this._data ? g2.from(this._data, this._encoding || t5 || "utf8") : this._data, s6 = "string" == typeof e9 ? g2.from(e9, t5 || this._encoding || "utf8") : e9;
            this._data = g2.concat([r5, s6]);
          }
          this._encoding = t5, r4 && r4();
        }
      }
      _writev(e9, t5) {
      }
      _destroy(e9, t5) {
      }
      _final(e9) {
      }
      write(e9, t5, r4) {
        const s6 = "string" == typeof t5 ? this._encoding : "utf8", a5 = "function" == typeof t5 ? t5 : "function" == typeof r4 ? r4 : void 0;
        return this._write(e9, s6, a5), true;
      }
      setDefaultEncoding(e9) {
        return this;
      }
      end(e9, t5, r4) {
        const s6 = "function" == typeof e9 ? e9 : "function" == typeof t5 ? t5 : "function" == typeof r4 ? r4 : void 0;
        if (this.writableEnded) return s6 && s6(), this;
        const a5 = e9 === s6 ? void 0 : e9;
        if (a5) {
          const e10 = t5 === s6 ? void 0 : t5;
          this.write(a5, e10, s6);
        }
        return this.writableEnded = true, this.writableFinished = true, this.emit("close"), this.emit("finish"), this;
      }
      cork() {
      }
      uncork() {
      }
      destroy(e9) {
        return this.destroyed = true, delete this._data, this.removeAllListeners(), this;
      }
      compose(e9, t5) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return Promise.resolve();
      }
    };
    Ir3 = class {
      static {
        __name(this, "Ir");
      }
      allowHalfOpen = true;
      _destroy;
      constructor(e9 = new i5(), t5 = new xr3()) {
        Object.assign(this, e9), Object.assign(this, t5), this._destroy = /* @__PURE__ */ (function(...e10) {
          return function(...t6) {
            for (const r4 of e10) r4(...t6);
          };
        })(e9._destroy, t5._destroy);
      }
    };
    Tr3 = (Object.assign(Ir3.prototype, i5.prototype), Object.assign(Ir3.prototype, xr3.prototype), Ir3);
    A2 = class extends Tr3 {
      static {
        __name(this, "A");
      }
      __unenv__ = {};
      bufferSize = 0;
      bytesRead = 0;
      bytesWritten = 0;
      connecting = false;
      destroyed = false;
      pending = false;
      localAddress = "";
      localPort = 0;
      remoteAddress = "";
      remoteFamily = "";
      remotePort = 0;
      autoSelectFamilyAttemptedAddresses = [];
      readyState = "readOnly";
      constructor(e9) {
        super();
      }
      write(e9, t5, r4) {
        return false;
      }
      connect(e9, t5, r4) {
        return this;
      }
      end(e9, t5, r4) {
        return this;
      }
      setEncoding(e9) {
        return this;
      }
      pause() {
        return this;
      }
      resume() {
        return this;
      }
      setTimeout(e9, t5) {
        return this;
      }
      setNoDelay(e9) {
        return this;
      }
      setKeepAlive(e9, t5) {
        return this;
      }
      address() {
        return {};
      }
      unref() {
        return this;
      }
      ref() {
        return this;
      }
      destroySoon() {
        this.destroy();
      }
      resetAndDestroy() {
        const e9 = new Error("ERR_SOCKET_CLOSED");
        return e9.code = "ERR_SOCKET_CLOSED", this.destroy(e9), this;
      }
    };
    y3 = class extends i5 {
      static {
        __name(this, "y");
      }
      aborted = false;
      httpVersion = "1.1";
      httpVersionMajor = 1;
      httpVersionMinor = 1;
      complete = true;
      connection;
      socket;
      headers = {};
      trailers = {};
      method = "GET";
      url = "/";
      statusCode = 200;
      statusMessage = "";
      closed = false;
      errored = null;
      readable = false;
      constructor(e9) {
        super(), this.socket = this.connection = e9 || new A2();
      }
      get rawHeaders() {
        const e9 = this.headers, t5 = [];
        for (const r4 in e9) if (Array.isArray(e9[r4])) for (const s6 of e9[r4]) t5.push(r4, s6);
        else t5.push(r4, e9[r4]);
        return t5;
      }
      get rawTrailers() {
        return [];
      }
      setTimeout(e9, t5) {
        return this;
      }
      get headersDistinct() {
        return p5(this.headers);
      }
      get trailersDistinct() {
        return p5(this.trailers);
      }
    };
    __name(p5, "p");
    w2 = class extends xr3 {
      static {
        __name(this, "w");
      }
      statusCode = 200;
      statusMessage = "";
      upgrading = false;
      chunkedEncoding = false;
      shouldKeepAlive = false;
      useChunkedEncodingByDefault = false;
      sendDate = false;
      finished = false;
      headersSent = false;
      strictContentLength = false;
      connection = null;
      socket = null;
      req;
      _headers = {};
      constructor(e9) {
        super(), this.req = e9;
      }
      assignSocket(e9) {
        e9._httpMessage = this, this.socket = e9, this.connection = e9, this.emit("socket", e9), this._flush();
      }
      _flush() {
        this.flushHeaders();
      }
      detachSocket(e9) {
      }
      writeContinue(e9) {
      }
      writeHead(e9, t5, r4) {
        e9 && (this.statusCode = e9), "string" == typeof t5 && (this.statusMessage = t5, t5 = void 0);
        const s6 = r4 || t5;
        if (s6 && !Array.isArray(s6)) for (const e10 in s6) this.setHeader(e10, s6[e10]);
        return this.headersSent = true, this;
      }
      writeProcessing() {
      }
      setTimeout(e9, t5) {
        return this;
      }
      appendHeader(e9, t5) {
        e9 = e9.toLowerCase();
        const r4 = this._headers[e9], s6 = [...Array.isArray(r4) ? r4 : [r4], ...Array.isArray(t5) ? t5 : [t5]].filter(Boolean);
        return this._headers[e9] = s6.length > 1 ? s6 : s6[0], this;
      }
      setHeader(e9, t5) {
        return this._headers[e9.toLowerCase()] = t5, this;
      }
      setHeaders(e9) {
        for (const [t5, r4] of Object.entries(e9)) this.setHeader(t5, r4);
        return this;
      }
      getHeader(e9) {
        return this._headers[e9.toLowerCase()];
      }
      getHeaders() {
        return this._headers;
      }
      getHeaderNames() {
        return Object.keys(this._headers);
      }
      hasHeader(e9) {
        return e9.toLowerCase() in this._headers;
      }
      removeHeader(e9) {
        delete this._headers[e9.toLowerCase()];
      }
      addTrailers(e9) {
      }
      flushHeaders() {
      }
      writeEarlyHints(e9, t5) {
        "function" == typeof t5 && t5();
      }
    };
    Sr3 = (() => {
      const n6 = /* @__PURE__ */ __name(function() {
      }, "n");
      return n6.prototype = /* @__PURE__ */ Object.create(null), n6;
    })();
    __name(v4, "v");
    kr3 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(b3, "b");
    __name(hasProp2, "hasProp");
    H3Error = class extends Error {
      static {
        __name(this, "H3Error");
      }
      static __h3_error__ = true;
      statusCode = 500;
      fatal = false;
      unhandled = false;
      statusMessage;
      data;
      cause;
      constructor(e9, t5 = {}) {
        super(e9, t5), t5.cause && !this.cause && (this.cause = t5.cause);
      }
      toJSON() {
        const e9 = { message: this.message, statusCode: sanitizeStatusCode(this.statusCode, 500) };
        return this.statusMessage && (e9.statusMessage = sanitizeStatusMessage(this.statusMessage)), void 0 !== this.data && (e9.data = this.data), e9;
      }
    };
    __name(createError, "createError");
    __name(isError, "isError");
    __name(process, "process");
    __name(getQuery, "getQuery");
    __name(getRequestHeaders, "getRequestHeaders");
    __name(getRequestHeader, "getRequestHeader");
    Cr3 = getRequestHeader;
    $r3 = /* @__PURE__ */ Symbol.for("h3RawBody");
    jr3 = /* @__PURE__ */ Symbol.for("h3ParsedBody");
    Or3 = ["PATCH", "POST", "PUT", "DELETE"];
    __name(readRawBody, "readRawBody");
    __name(readBody, "readBody");
    __name(readMultipartFormData, "readMultipartFormData");
    __name(_parseJSON, "_parseJSON");
    __name(handleCacheHeaders, "handleCacheHeaders");
    Pr3 = { html: "text/html", json: "application/json" };
    Lr3 = /[^\u0009\u0020-\u007E]/g;
    __name(sanitizeStatusMessage, "sanitizeStatusMessage");
    __name(sanitizeStatusCode, "sanitizeStatusCode");
    __name(splitCookiesString, "splitCookiesString");
    Nr3 = void 0 === Yt3 ? (e9) => e9() : Yt3;
    __name(send, "send");
    __name(setResponseStatus, "setResponseStatus");
    __name(getResponseStatus, "getResponseStatus");
    __name(getResponseStatusText, "getResponseStatusText");
    __name(setResponseHeaders, "setResponseHeaders");
    Ur2 = setResponseHeaders;
    __name(setResponseHeader, "setResponseHeader");
    __name(appendResponseHeader, "appendResponseHeader");
    __name(sendStream, "sendStream");
    __name(sendWebResponse, "sendWebResponse");
    Mr3 = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
    Hr2 = /* @__PURE__ */ new Set(["transfer-encoding", "accept-encoding", "connection", "keep-alive", "upgrade", "expect", "host", "accept"]);
    __name(proxyRequest, "proxyRequest");
    __name(getProxyRequestHeaders, "getProxyRequestHeaders");
    __name(fetchWithEvent, "fetchWithEvent");
    __name(_getFetch, "_getFetch");
    __name(rewriteCookieProperty, "rewriteCookieProperty");
    H3Event = class {
      static {
        __name(this, "H3Event");
      }
      __is_event__ = true;
      node;
      web;
      context = {};
      _method;
      _path;
      _headers;
      _requestBody;
      _handled = false;
      _onBeforeResponseCalled;
      _onAfterResponseCalled;
      constructor(e9, t5) {
        this.node = { req: e9, res: t5 };
      }
      get method() {
        return this._method || (this._method = (this.node.req.method || "GET").toUpperCase()), this._method;
      }
      get path() {
        return this._path || this.node.req.url || "/";
      }
      get headers() {
        return this._headers || (this._headers = (function(e9) {
          const t5 = new Headers();
          for (const [r4, s6] of Object.entries(e9)) if (Array.isArray(s6)) for (const e10 of s6) t5.append(r4, e10);
          else s6 && t5.set(r4, s6);
          return t5;
        })(this.node.req.headers)), this._headers;
      }
      get handled() {
        return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
      }
      respondWith(e9) {
        return Promise.resolve(e9).then((e10) => sendWebResponse(this, e10));
      }
      toString() {
        return `[${this.method}] ${this.path}`;
      }
      toJSON() {
        return this.toString();
      }
      get req() {
        return this.node.req;
      }
      get res() {
        return this.node.res;
      }
    };
    __name(isEvent, "isEvent");
    __name(createEvent, "createEvent");
    __name(defineEventHandler, "defineEventHandler");
    __name(_normalizeArray, "_normalizeArray");
    zr2 = defineEventHandler;
    __name(toEventHandler, "toEventHandler");
    lazyEventHandler = /* @__PURE__ */ __name(function(e9) {
      let t5, r4;
      const resolveHandler = /* @__PURE__ */ __name(() => r4 ? Promise.resolve(r4) : (t5 || (t5 = Promise.resolve(e9()).then((e10) => {
        const t6 = e10.default || e10;
        if ("function" != typeof t6) throw new TypeError("Invalid lazy handler result. It should be a function:", t6);
        return r4 = { handler: toEventHandler(e10.default || e10) }, r4;
      })), t5), "resolveHandler"), s6 = zr2((e10) => r4 ? r4.handler(e10) : resolveHandler().then((t6) => t6.handler(e10)));
      return s6.__resolve__ = resolveHandler, s6;
    }, "lazyEventHandler");
    __name(createApp2, "createApp");
    __name(use, "use");
    __name(normalizeLayer, "normalizeLayer");
    __name(handleHandlerResponse, "handleHandlerResponse");
    Wr2 = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
    __name(toNodeListener, "toNodeListener");
    __name(flatHooks2, "flatHooks");
    qr2 = { run: /* @__PURE__ */ __name((e9) => e9(), "run") };
    Dr3 = void 0 !== console.createTask ? console.createTask : () => qr2;
    __name(serialTaskCaller2, "serialTaskCaller");
    __name(parallelTaskCaller2, "parallelTaskCaller");
    __name(callEachWith2, "callEachWith");
    Hookable = class {
      static {
        __name(this, "Hookable");
      }
      constructor() {
        this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
      }
      hook(e9, t5, r4 = {}) {
        if (!e9 || "function" != typeof t5) return () => {
        };
        const s6 = e9;
        let a5;
        for (; this._deprecatedHooks[e9]; ) a5 = this._deprecatedHooks[e9], e9 = a5.to;
        if (a5 && !r4.allowDeprecated) {
          let e10 = a5.message;
          e10 || (e10 = `${s6} hook has been deprecated` + (a5.to ? `, please use ${a5.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(e10) || (console.warn(e10), this._deprecatedMessages.add(e10));
        }
        if (!t5.name) try {
          Object.defineProperty(t5, "name", { get: /* @__PURE__ */ __name(() => "_" + e9.replace(/\W+/g, "_") + "_hook_cb", "get"), configurable: true });
        } catch {
        }
        return this._hooks[e9] = this._hooks[e9] || [], this._hooks[e9].push(t5), () => {
          t5 && (this.removeHook(e9, t5), t5 = void 0);
        };
      }
      hookOnce(e9, t5) {
        let r4, _function = /* @__PURE__ */ __name((...e10) => ("function" == typeof r4 && r4(), r4 = void 0, _function = void 0, t5(...e10)), "_function");
        return r4 = this.hook(e9, _function), r4;
      }
      removeHook(e9, t5) {
        if (this._hooks[e9]) {
          const r4 = this._hooks[e9].indexOf(t5);
          -1 !== r4 && this._hooks[e9].splice(r4, 1), 0 === this._hooks[e9].length && delete this._hooks[e9];
        }
      }
      deprecateHook(e9, t5) {
        this._deprecatedHooks[e9] = "string" == typeof t5 ? { to: t5 } : t5;
        const r4 = this._hooks[e9] || [];
        delete this._hooks[e9];
        for (const t6 of r4) this.hook(e9, t6);
      }
      deprecateHooks(e9) {
        Object.assign(this._deprecatedHooks, e9);
        for (const t5 in e9) this.deprecateHook(t5, e9[t5]);
      }
      addHooks(e9) {
        const t5 = flatHooks2(e9), r4 = Object.keys(t5).map((e10) => this.hook(e10, t5[e10]));
        return () => {
          for (const e10 of r4.splice(0, r4.length)) e10();
        };
      }
      removeHooks(e9) {
        const t5 = flatHooks2(e9);
        for (const e10 in t5) this.removeHook(e10, t5[e10]);
      }
      removeAllHooks() {
        for (const e9 in this._hooks) delete this._hooks[e9];
      }
      callHook(e9, ...t5) {
        return t5.unshift(e9), this.callHookWith(serialTaskCaller2, e9, ...t5);
      }
      callHookParallel(e9, ...t5) {
        return t5.unshift(e9), this.callHookWith(parallelTaskCaller2, e9, ...t5);
      }
      callHookWith(e9, t5, ...r4) {
        const s6 = this._before || this._after ? { name: t5, args: r4, context: {} } : void 0;
        this._before && callEachWith2(this._before, s6);
        const a5 = e9(t5 in this._hooks ? [...this._hooks[t5]] : [], r4);
        return a5 instanceof Promise ? a5.finally(() => {
          this._after && s6 && callEachWith2(this._after, s6);
        }) : (this._after && s6 && callEachWith2(this._after, s6), a5);
      }
      beforeEach(e9) {
        return this._before = this._before || [], this._before.push(e9), () => {
          if (void 0 !== this._before) {
            const t5 = this._before.indexOf(e9);
            -1 !== t5 && this._before.splice(t5, 1);
          }
        };
      }
      afterEach(e9) {
        return this._after = this._after || [], this._after.push(e9), () => {
          if (void 0 !== this._after) {
            const t5 = this._after.indexOf(e9);
            -1 !== t5 && this._after.splice(t5, 1);
          }
        };
      }
    };
    Fr = globalThis;
    FetchError = class extends Error {
      static {
        __name(this, "FetchError");
      }
      constructor(e9, t5) {
        super(e9, t5), this.name = "FetchError", t5?.cause && !this.cause && (this.cause = t5.cause);
      }
    };
    Kr2 = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
    __name(isPayloadMethod, "isPayloadMethod");
    Qr2 = /* @__PURE__ */ new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]);
    Gr2 = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
    __name(resolveFetchOptions, "resolveFetchOptions");
    __name(callHooks2, "callHooks");
    Zr2 = /* @__PURE__ */ new Set([408, 409, 425, 429, 500, 502, 503, 504]);
    Jr2 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(createFetch, "createFetch");
    Vr3 = (function() {
      if ("undefined" != typeof globalThis) return globalThis;
      if ("undefined" != typeof self) return self;
      if (void 0 !== Fr) return Fr;
      throw new Error("unable to locate global object");
    })();
    Yr2 = Vr3.fetch ? (...e9) => Vr3.fetch(...e9) : () => Promise.reject(new Error("[ofetch] global.fetch is not supported!"));
    Xr2 = Vr3.Headers;
    en3 = Vr3.AbortController;
    tn = createFetch({ fetch: Yr2, Headers: Xr2, AbortController: en3 });
    __name(asyncCall, "asyncCall");
    __name(stringify2, "stringify");
    rn3 = "base64:";
    __name(serializeRaw, "serializeRaw");
    __name(deserializeRaw, "deserializeRaw");
    nn3 = ["has", "hasItem", "get", "getItem", "getItemRaw", "set", "setItem", "setItemRaw", "del", "remove", "removeItem", "getMeta", "setMeta", "removeMeta", "getKeys", "clear", "mount", "unmount"];
    __name(normalizeKey$1, "normalizeKey$1");
    __name(joinKeys, "joinKeys");
    __name(normalizeBaseKey, "normalizeBaseKey");
    memory = /* @__PURE__ */ __name(() => {
      const e9 = /* @__PURE__ */ new Map();
      return { name: "memory", getInstance: /* @__PURE__ */ __name(() => e9, "getInstance"), hasItem: /* @__PURE__ */ __name((t5) => e9.has(t5), "hasItem"), getItem: /* @__PURE__ */ __name((t5) => e9.get(t5) ?? null, "getItem"), getItemRaw: /* @__PURE__ */ __name((t5) => e9.get(t5) ?? null, "getItemRaw"), setItem(t5, r4) {
        e9.set(t5, r4);
      }, setItemRaw(t5, r4) {
        e9.set(t5, r4);
      }, removeItem(t5) {
        e9.delete(t5);
      }, getKeys: /* @__PURE__ */ __name(() => [...e9.keys()], "getKeys"), clear() {
        e9.clear();
      }, dispose() {
        e9.clear();
      } };
    }, "memory");
    __name(watch2, "watch");
    __name(dispose, "dispose");
    on3 = {};
    normalizeKey2 = /* @__PURE__ */ __name(function(e9) {
      return e9 && e9.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
    }, "normalizeKey");
    sn3 = { getKeys: /* @__PURE__ */ __name(() => Promise.resolve(Object.keys(on3)), "getKeys"), hasItem: /* @__PURE__ */ __name((e9) => (e9 = normalizeKey2(e9), Promise.resolve(e9 in on3)), "hasItem"), getItem: /* @__PURE__ */ __name((e9) => (e9 = normalizeKey2(e9), Promise.resolve(on3[e9] ? on3[e9].import() : null)), "getItem"), getMeta: /* @__PURE__ */ __name((e9) => (e9 = normalizeKey2(e9), Promise.resolve(on3[e9] ? on3[e9].meta : {})), "getMeta") };
    an3 = (function(e9 = {}) {
      const t5 = { mounts: { "": e9.driver || memory() }, mountpoints: [""], watching: false, watchListeners: [], unwatch: {} }, getMount = /* @__PURE__ */ __name((e10) => {
        for (const r5 of t5.mountpoints) if (e10.startsWith(r5)) return { base: r5, relativeKey: e10.slice(r5.length), driver: t5.mounts[r5] };
        return { base: "", relativeKey: e10, driver: t5.mounts[""] };
      }, "getMount"), getMounts = /* @__PURE__ */ __name((e10, r5) => t5.mountpoints.filter((t6) => t6.startsWith(e10) || r5 && e10.startsWith(t6)).map((r6) => ({ relativeBase: e10.length > r6.length ? e10.slice(r6.length) : void 0, mountpoint: r6, driver: t5.mounts[r6] })), "getMounts"), onChange = /* @__PURE__ */ __name((e10, r5) => {
        if (t5.watching) {
          r5 = normalizeKey$1(r5);
          for (const s6 of t5.watchListeners) s6(e10, r5);
        }
      }, "onChange"), stopWatch = /* @__PURE__ */ __name(async () => {
        if (t5.watching) {
          for (const e10 in t5.unwatch) await t5.unwatch[e10]();
          t5.unwatch = {}, t5.watching = false;
        }
      }, "stopWatch"), runBatch = /* @__PURE__ */ __name((e10, t6, r5) => {
        const s6 = /* @__PURE__ */ new Map(), getBatch = /* @__PURE__ */ __name((e11) => {
          let t7 = s6.get(e11.base);
          return t7 || (t7 = { driver: e11.driver, base: e11.base, items: [] }, s6.set(e11.base, t7)), t7;
        }, "getBatch");
        for (const r6 of e10) {
          const e11 = "string" == typeof r6, s7 = normalizeKey$1(e11 ? r6 : r6.key), a5 = e11 ? void 0 : r6.value, c4 = e11 || !r6.options ? t6 : { ...t6, ...r6.options }, u6 = getMount(s7);
          getBatch(u6).items.push({ key: s7, value: a5, relativeKey: u6.relativeKey, options: c4 });
        }
        return Promise.all([...s6.values()].map((e11) => r5(e11))).then((e11) => e11.flat());
      }, "runBatch"), r4 = { hasItem(e10, t6 = {}) {
        e10 = normalizeKey$1(e10);
        const { relativeKey: r5, driver: s6 } = getMount(e10);
        return asyncCall(s6.hasItem, r5, t6);
      }, getItem(e10, t6 = {}) {
        e10 = normalizeKey$1(e10);
        const { relativeKey: r5, driver: s6 } = getMount(e10);
        return asyncCall(s6.getItem, r5, t6).then((e11) => destr(e11));
      }, getItems: /* @__PURE__ */ __name((e10, t6 = {}) => runBatch(e10, t6, (e11) => e11.driver.getItems ? asyncCall(e11.driver.getItems, e11.items.map((e12) => ({ key: e12.relativeKey, options: e12.options })), t6).then((t7) => t7.map((t8) => ({ key: joinKeys(e11.base, t8.key), value: destr(t8.value) }))) : Promise.all(e11.items.map((t7) => asyncCall(e11.driver.getItem, t7.relativeKey, t7.options).then((e12) => ({ key: t7.key, value: destr(e12) }))))), "getItems"), getItemRaw(e10, t6 = {}) {
        e10 = normalizeKey$1(e10);
        const { relativeKey: r5, driver: s6 } = getMount(e10);
        return s6.getItemRaw ? asyncCall(s6.getItemRaw, r5, t6) : asyncCall(s6.getItem, r5, t6).then((e11) => deserializeRaw(e11));
      }, async setItem(e10, t6, s6 = {}) {
        if (void 0 === t6) return r4.removeItem(e10);
        e10 = normalizeKey$1(e10);
        const { relativeKey: a5, driver: c4 } = getMount(e10);
        c4.setItem && (await asyncCall(c4.setItem, a5, stringify2(t6), s6), c4.watch || onChange("update", e10));
      }, async setItems(e10, t6) {
        await runBatch(e10, t6, async (e11) => {
          if (e11.driver.setItems) return asyncCall(e11.driver.setItems, e11.items.map((e12) => ({ key: e12.relativeKey, value: stringify2(e12.value), options: e12.options })), t6);
          e11.driver.setItem && await Promise.all(e11.items.map((t7) => asyncCall(e11.driver.setItem, t7.relativeKey, stringify2(t7.value), t7.options)));
        });
      }, async setItemRaw(e10, t6, s6 = {}) {
        if (void 0 === t6) return r4.removeItem(e10, s6);
        e10 = normalizeKey$1(e10);
        const { relativeKey: a5, driver: c4 } = getMount(e10);
        if (c4.setItemRaw) await asyncCall(c4.setItemRaw, a5, t6, s6);
        else {
          if (!c4.setItem) return;
          await asyncCall(c4.setItem, a5, serializeRaw(t6), s6);
        }
        c4.watch || onChange("update", e10);
      }, async removeItem(e10, t6 = {}) {
        "boolean" == typeof t6 && (t6 = { removeMeta: t6 }), e10 = normalizeKey$1(e10);
        const { relativeKey: r5, driver: s6 } = getMount(e10);
        s6.removeItem && (await asyncCall(s6.removeItem, r5, t6), (t6.removeMeta || t6.removeMata) && await asyncCall(s6.removeItem, r5 + "$", t6), s6.watch || onChange("remove", e10));
      }, async getMeta(e10, t6 = {}) {
        "boolean" == typeof t6 && (t6 = { nativeOnly: t6 }), e10 = normalizeKey$1(e10);
        const { relativeKey: r5, driver: s6 } = getMount(e10), a5 = /* @__PURE__ */ Object.create(null);
        if (s6.getMeta && Object.assign(a5, await asyncCall(s6.getMeta, r5, t6)), !t6.nativeOnly) {
          const e11 = await asyncCall(s6.getItem, r5 + "$", t6).then((e12) => destr(e12));
          e11 && "object" == typeof e11 && ("string" == typeof e11.atime && (e11.atime = new Date(e11.atime)), "string" == typeof e11.mtime && (e11.mtime = new Date(e11.mtime)), Object.assign(a5, e11));
        }
        return a5;
      }, setMeta(e10, t6, r5 = {}) {
        return this.setItem(e10 + "$", t6, r5);
      }, removeMeta(e10, t6 = {}) {
        return this.removeItem(e10 + "$", t6);
      }, async getKeys(e10, t6 = {}) {
        e10 = normalizeBaseKey(e10);
        const r5 = getMounts(e10, true);
        let s6 = [];
        const a5 = [];
        let c4 = true;
        for (const e11 of r5) {
          e11.driver.flags?.maxDepth || (c4 = false);
          const r6 = await asyncCall(e11.driver.getKeys, e11.relativeBase, t6);
          for (const t7 of r6) {
            const r7 = e11.mountpoint + normalizeKey$1(t7);
            s6.some((e12) => r7.startsWith(e12)) || a5.push(r7);
          }
          s6 = [e11.mountpoint, ...s6.filter((t7) => !t7.startsWith(e11.mountpoint))];
        }
        const u6 = void 0 !== t6.maxDepth && !c4;
        return a5.filter((r6) => (!u6 || (function(e11, t7) {
          if (void 0 === t7) return true;
          let r7 = 0, s7 = e11.indexOf(":");
          for (; s7 > -1; ) r7++, s7 = e11.indexOf(":", s7 + 1);
          return r7 <= t7;
        })(r6, t6.maxDepth)) && (function(e11, t7) {
          return t7 ? e11.startsWith(t7) && "$" !== e11[e11.length - 1] : "$" !== e11[e11.length - 1];
        })(r6, e10));
      }, async clear(e10, t6 = {}) {
        e10 = normalizeBaseKey(e10), await Promise.all(getMounts(e10, false).map(async (e11) => {
          if (e11.driver.clear) return asyncCall(e11.driver.clear, e11.relativeBase, t6);
          if (e11.driver.removeItem) {
            const r5 = await e11.driver.getKeys(e11.relativeBase || "", t6);
            return Promise.all(r5.map((r6) => e11.driver.removeItem(r6, t6)));
          }
        }));
      }, async dispose() {
        await Promise.all(Object.values(t5.mounts).map((e10) => dispose(e10)));
      }, watch: /* @__PURE__ */ __name(async (e10) => (await (async () => {
        if (!t5.watching) {
          t5.watching = true;
          for (const e11 in t5.mounts) t5.unwatch[e11] = await watch2(t5.mounts[e11], onChange, e11);
        }
      })(), t5.watchListeners.push(e10), async () => {
        t5.watchListeners = t5.watchListeners.filter((t6) => t6 !== e10), 0 === t5.watchListeners.length && await stopWatch();
      }), "watch"), async unwatch() {
        t5.watchListeners = [], await stopWatch();
      }, mount(e10, s6) {
        if ((e10 = normalizeBaseKey(e10)) && t5.mounts[e10]) throw new Error(`already mounted at ${e10}`);
        return e10 && (t5.mountpoints.push(e10), t5.mountpoints.sort((e11, t6) => t6.length - e11.length)), t5.mounts[e10] = s6, t5.watching && Promise.resolve(watch2(s6, onChange, e10)).then((r5) => {
          t5.unwatch[e10] = r5;
        }).catch(console.error), r4;
      }, async unmount(e10, r5 = true) {
        (e10 = normalizeBaseKey(e10)) && t5.mounts[e10] && (t5.watching && e10 in t5.unwatch && (t5.unwatch[e10]?.(), delete t5.unwatch[e10]), r5 && await dispose(t5.mounts[e10]), t5.mountpoints = t5.mountpoints.filter((t6) => t6 !== e10), delete t5.mounts[e10]);
      }, getMount(e10 = "") {
        e10 = normalizeKey$1(e10) + ":";
        const t6 = getMount(e10);
        return { driver: t6.driver, base: t6.base };
      }, getMounts(e10 = "", t6 = {}) {
        e10 = normalizeKey$1(e10);
        return getMounts(e10, t6.parents).map((e11) => ({ driver: e11.driver, base: e11.mountpoint }));
      }, keys: /* @__PURE__ */ __name((e10, t6 = {}) => r4.getKeys(e10, t6), "keys"), get: /* @__PURE__ */ __name((e10, t6 = {}) => r4.getItem(e10, t6), "get"), set: /* @__PURE__ */ __name((e10, t6, s6 = {}) => r4.setItem(e10, t6, s6), "set"), has: /* @__PURE__ */ __name((e10, t6 = {}) => r4.hasItem(e10, t6), "has"), del: /* @__PURE__ */ __name((e10, t6 = {}) => r4.removeItem(e10, t6), "del"), remove: /* @__PURE__ */ __name((e10, t6 = {}) => r4.removeItem(e10, t6), "remove") };
      return r4;
    })({});
    __name(useStorage, "useStorage");
    an3.mount("/assets", sn3);
    cn3 = (function() {
      class o5 {
        static {
          __name(this, "o");
        }
        #o = /* @__PURE__ */ new Map();
        compare(e9, t5) {
          const r4 = typeof e9, s6 = typeof t5;
          return "string" === r4 && "string" === s6 ? e9.localeCompare(t5) : "number" === r4 && "number" === s6 ? e9 - t5 : String.prototype.localeCompare.call(this.serialize(e9, true), this.serialize(t5, true));
        }
        serialize(e9, t5) {
          if (null === e9) return "null";
          switch (typeof e9) {
            case "string":
              return t5 ? e9 : `'${e9}'`;
            case "bigint":
              return `${e9}n`;
            case "object":
              return this.$object(e9);
            case "function":
              return this.$function(e9);
          }
          return String(e9);
        }
        serializeObject(e9) {
          const t5 = Object.prototype.toString.call(e9);
          if ("[object Object]" !== t5) return this.serializeBuiltInType(t5.length < 10 ? `unknown:${t5}` : t5.slice(8, -1), e9);
          const r4 = e9.constructor, s6 = r4 === Object || void 0 === r4 ? "" : r4.name;
          if ("" !== s6 && globalThis[s6] === r4) return this.serializeBuiltInType(s6, e9);
          if ("function" == typeof e9.toJSON) {
            const t6 = e9.toJSON();
            return s6 + (null !== t6 && "object" == typeof t6 ? this.$object(t6) : `(${this.serialize(t6)})`);
          }
          return this.serializeObjectEntries(s6, Object.entries(e9));
        }
        serializeBuiltInType(e9, t5) {
          const r4 = this["$" + e9];
          if (r4) return r4.call(this, t5);
          if ("function" == typeof t5?.entries) return this.serializeObjectEntries(e9, t5.entries());
          throw new Error(`Cannot serialize ${e9}`);
        }
        serializeObjectEntries(e9, t5) {
          const r4 = Array.from(t5).sort((e10, t6) => this.compare(e10[0], t6[0]));
          let s6 = `${e9}{`;
          for (let e10 = 0; e10 < r4.length; e10++) {
            const [t6, a5] = r4[e10];
            s6 += `${this.serialize(t6, true)}:${this.serialize(a5)}`, e10 < r4.length - 1 && (s6 += ",");
          }
          return s6 + "}";
        }
        $object(e9) {
          let t5 = this.#o.get(e9);
          return void 0 === t5 && (this.#o.set(e9, `#${this.#o.size}`), t5 = this.serializeObject(e9), this.#o.set(e9, t5)), t5;
        }
        $function(e9) {
          const t5 = Function.prototype.toString.call(e9);
          return "[native code] }" === t5.slice(-15) ? `${e9.name || ""}()[native]` : `${e9.name}(${e9.length})${t5.replace(/\s*\n\s*/g, "")}`;
        }
        $Array(e9) {
          let t5 = "[";
          for (let r4 = 0; r4 < e9.length; r4++) t5 += this.serialize(e9[r4]), r4 < e9.length - 1 && (t5 += ",");
          return t5 + "]";
        }
        $Date(e9) {
          try {
            return `Date(${e9.toISOString()})`;
          } catch {
            return "Date(null)";
          }
        }
        $ArrayBuffer(e9) {
          return `ArrayBuffer[${new Uint8Array(e9).join(",")}]`;
        }
        $Set(e9) {
          return `Set${this.$Array(Array.from(e9).sort((e10, t5) => this.compare(e10, t5)))}`;
        }
        $Map(e9) {
          return this.serializeObjectEntries("Map", e9.entries());
        }
      }
      for (const e9 of ["Error", "RegExp", "URL"]) o5.prototype["$" + e9] = function(t5) {
        return `${e9}(${t5})`;
      };
      for (const e9 of ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]) o5.prototype["$" + e9] = function(t5) {
        return `${e9}[${t5.join(",")}]`;
      };
      for (const e9 of ["BigInt64Array", "BigUint64Array"]) o5.prototype["$" + e9] = function(t5) {
        return `${e9}[${t5.join("n,")}${t5.length > 0 ? "n" : ""}]`;
      };
      return o5;
    })();
    un3 = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
    fn2 = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998];
    ln3 = [];
    k3 = class {
      static {
        __name(this, "k");
      }
      _data = new l3();
      _hash = new l3([...un3]);
      _nDataBytes = 0;
      _minBufferSize = 0;
      finalize(e9) {
        e9 && this._append(e9);
        const t5 = 8 * this._nDataBytes, r4 = 8 * this._data.sigBytes;
        return this._data.words[r4 >>> 5] |= 128 << 24 - r4 % 32, this._data.words[14 + (r4 + 64 >>> 9 << 4)] = Math.floor(t5 / 4294967296), this._data.words[15 + (r4 + 64 >>> 9 << 4)] = t5, this._data.sigBytes = 4 * this._data.words.length, this._process(), this._hash;
      }
      _doProcessBlock(e9, t5) {
        const r4 = this._hash.words;
        let s6 = r4[0], a5 = r4[1], c4 = r4[2], u6 = r4[3], f4 = r4[4], h5 = r4[5], d5 = r4[6], g3 = r4[7];
        for (let r5 = 0; r5 < 64; r5++) {
          if (r5 < 16) ln3[r5] = 0 | e9[t5 + r5];
          else {
            const e10 = ln3[r5 - 15], t6 = (e10 << 25 | e10 >>> 7) ^ (e10 << 14 | e10 >>> 18) ^ e10 >>> 3, s7 = ln3[r5 - 2], a6 = (s7 << 15 | s7 >>> 17) ^ (s7 << 13 | s7 >>> 19) ^ s7 >>> 10;
            ln3[r5] = t6 + ln3[r5 - 7] + a6 + ln3[r5 - 16];
          }
          const m4 = s6 & a5 ^ s6 & c4 ^ a5 & c4, _3 = (s6 << 30 | s6 >>> 2) ^ (s6 << 19 | s6 >>> 13) ^ (s6 << 10 | s6 >>> 22), E3 = g3 + ((f4 << 26 | f4 >>> 6) ^ (f4 << 21 | f4 >>> 11) ^ (f4 << 7 | f4 >>> 25)) + (f4 & h5 ^ ~f4 & d5) + fn2[r5] + ln3[r5];
          g3 = d5, d5 = h5, h5 = f4, f4 = u6 + E3 | 0, u6 = c4, c4 = a5, a5 = s6, s6 = E3 + (_3 + m4) | 0;
        }
        r4[0] = r4[0] + s6 | 0, r4[1] = r4[1] + a5 | 0, r4[2] = r4[2] + c4 | 0, r4[3] = r4[3] + u6 | 0, r4[4] = r4[4] + f4 | 0, r4[5] = r4[5] + h5 | 0, r4[6] = r4[6] + d5 | 0, r4[7] = r4[7] + g3 | 0;
      }
      _append(e9) {
        "string" == typeof e9 && (e9 = l3.fromUtf8(e9)), this._data.concat(e9), this._nDataBytes += e9.sigBytes;
      }
      _process(e9) {
        let t5, r4 = this._data.sigBytes / 64;
        r4 = e9 ? Math.ceil(r4) : Math.max((0 | r4) - this._minBufferSize, 0);
        const s6 = 16 * r4, a5 = Math.min(4 * s6, this._data.sigBytes);
        if (s6) {
          for (let e10 = 0; e10 < s6; e10 += 16) this._doProcessBlock(this._data.words, e10);
          t5 = this._data.words.splice(0, s6), this._data.sigBytes -= a5;
        }
        return new l3(t5, a5);
      }
    };
    l3 = class _l {
      static {
        __name(this, "l");
      }
      words;
      sigBytes;
      constructor(e9, t5) {
        e9 = this.words = e9 || [], this.sigBytes = void 0 === t5 ? 4 * e9.length : t5;
      }
      static fromUtf8(e9) {
        const t5 = unescape(encodeURIComponent(e9)), r4 = t5.length, s6 = [];
        for (let e10 = 0; e10 < r4; e10++) s6[e10 >>> 2] |= (255 & t5.charCodeAt(e10)) << 24 - e10 % 4 * 8;
        return new _l(s6, r4);
      }
      toBase64() {
        const e9 = [];
        for (let t5 = 0; t5 < this.sigBytes; t5 += 3) {
          const r4 = (this.words[t5 >>> 2] >>> 24 - t5 % 4 * 8 & 255) << 16 | (this.words[t5 + 1 >>> 2] >>> 24 - (t5 + 1) % 4 * 8 & 255) << 8 | this.words[t5 + 2 >>> 2] >>> 24 - (t5 + 2) % 4 * 8 & 255;
          for (let s6 = 0; s6 < 4 && 8 * t5 + 6 * s6 < 8 * this.sigBytes; s6++) e9.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(r4 >>> 6 * (3 - s6) & 63));
        }
        return e9.join("");
      }
      concat(e9) {
        if (this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8, this.words.length = Math.ceil(this.sigBytes / 4), this.sigBytes % 4) for (let t5 = 0; t5 < e9.sigBytes; t5++) {
          const r4 = e9.words[t5 >>> 2] >>> 24 - t5 % 4 * 8 & 255;
          this.words[this.sigBytes + t5 >>> 2] |= r4 << 24 - (this.sigBytes + t5) % 4 * 8;
        }
        else for (let t5 = 0; t5 < e9.sigBytes; t5 += 4) this.words[this.sigBytes + t5 >>> 2] = e9.words[t5 >>> 2];
        this.sigBytes += e9.sigBytes;
      }
    };
    __name(digest, "digest");
    __name(hash$1, "hash$1");
    hn3 = (() => {
      class Hasher2 {
        static {
          __name(this, "Hasher2");
        }
        buff = "";
        #s = /* @__PURE__ */ new Map();
        write(e9) {
          this.buff += e9;
        }
        dispatch(e9) {
          return this[null === e9 ? "null" : typeof e9](e9);
        }
        object(e9) {
          if (e9 && "function" == typeof e9.toJSON) return this.object(e9.toJSON());
          const t5 = Object.prototype.toString.call(e9);
          let r4 = "";
          const s6 = t5.length;
          r4 = s6 < 10 ? "unknown:[" + t5 + "]" : t5.slice(8, s6 - 1), r4 = r4.toLowerCase();
          let a5 = null;
          if (void 0 !== (a5 = this.#s.get(e9))) return this.dispatch("[CIRCULAR:" + a5 + "]");
          if (this.#s.set(e9, this.#s.size), void 0 !== g2 && g2.isBuffer && g2.isBuffer(e9)) return this.write("buffer:"), this.write(e9.toString("utf8"));
          if ("object" !== r4 && "function" !== r4 && "asyncfunction" !== r4) this[r4] ? this[r4](e9) : this.unknown(e9, r4);
          else {
            const t6 = Object.keys(e9).sort(), r5 = [];
            this.write("object:" + (t6.length + r5.length) + ":");
            const dispatchForKey = /* @__PURE__ */ __name((t7) => {
              this.dispatch(t7), this.write(":"), this.dispatch(e9[t7]), this.write(",");
            }, "dispatchForKey");
            for (const e10 of t6) dispatchForKey(e10);
            for (const e10 of r5) dispatchForKey(e10);
          }
        }
        array(e9, t5) {
          if (t5 = void 0 !== t5 && t5, this.write("array:" + e9.length + ":"), !t5 || e9.length <= 1) {
            for (const t6 of e9) this.dispatch(t6);
            return;
          }
          const r4 = /* @__PURE__ */ new Map(), s6 = e9.map((e10) => {
            const t6 = new Hasher2();
            t6.dispatch(e10);
            for (const [e11, s7] of t6.#s) r4.set(e11, s7);
            return t6.toString();
          });
          return this.#s = r4, s6.sort(), this.array(s6, false);
        }
        date(e9) {
          return this.write("date:" + e9.toJSON());
        }
        symbol(e9) {
          return this.write("symbol:" + e9.toString());
        }
        unknown(e9, t5) {
          if (this.write(t5), e9) return this.write(":"), e9 && "function" == typeof e9.entries ? this.array([...e9.entries()], true) : void 0;
        }
        error(e9) {
          return this.write("error:" + e9.toString());
        }
        boolean(e9) {
          return this.write("bool:" + e9);
        }
        string(e9) {
          this.write("string:" + e9.length + ":"), this.write(e9);
        }
        function(e9) {
          this.write("fn:"), !(function(e10) {
            if ("function" != typeof e10) return false;
            return "[native code] }" === Function.prototype.toString.call(e10).slice(-15);
          })(e9) ? this.dispatch(e9.toString()) : this.dispatch("[native]");
        }
        number(e9) {
          return this.write("number:" + e9);
        }
        null() {
          return this.write("Null");
        }
        undefined() {
          return this.write("Undefined");
        }
        regexp(e9) {
          return this.write("regex:" + e9.toString());
        }
        arraybuffer(e9) {
          return this.write("arraybuffer:"), this.dispatch(new Uint8Array(e9));
        }
        url(e9) {
          return this.write("url:" + e9.toString());
        }
        map(e9) {
          this.write("map:");
          const t5 = [...e9];
          return this.array(t5, false);
        }
        set(e9) {
          this.write("set:");
          const t5 = [...e9];
          return this.array(t5, false);
        }
        bigint(e9) {
          return this.write("bigint:" + e9.toString());
        }
      }
      for (const e9 of ["uint8array", "uint8clampedarray", "unt8array", "uint16array", "unt16array", "uint32array", "unt32array", "float32array", "float64array"]) Hasher2.prototype[e9] = function(t5) {
        return this.write(e9 + ":"), this.array([...t5], false);
      };
      return Hasher2;
    })();
    __name(hash, "hash");
    __name(defineCachedFunction, "defineCachedFunction");
    __name(getKey, "getKey");
    __name(escapeKey, "escapeKey");
    __name(cloneWithProxy, "cloneWithProxy");
    cachedEventHandler = /* @__PURE__ */ __name(function(e9, t5 = { name: "_", base: "/cache", swr: true, maxAge: 1 }) {
      const r4 = (t5.varies || []).filter(Boolean).map((e10) => e10.toLowerCase()).sort(), s6 = { ...t5, getKey: /* @__PURE__ */ __name(async (e10) => {
        const s7 = await t5.getKey?.(e10);
        if (s7) return escapeKey(s7);
        const a6 = e10.node.req.originalUrl || e10.node.req.url || e10.path;
        let c4;
        try {
          c4 = escapeKey(decodeURI(parseURL(a6).pathname)).slice(0, 16) || "index";
        } catch {
          c4 = "-";
        }
        return [`${c4}.${hash(a6)}`, ...r4.map((t6) => [t6, e10.node.req.headers[t6]]).map(([e11, t6]) => `${escapeKey(e11)}.${hash(t6)}`)].join(":");
      }, "getKey"), validate: /* @__PURE__ */ __name((e10) => !!e10.value && (!(e10.value.code >= 400) && (void 0 !== e10.value.body && ("undefined" !== e10.value.headers.etag && "undefined" !== e10.value.headers["last-modified"]))), "validate"), group: t5.group || "nitro/handlers", integrity: t5.integrity || hash([e9, t5]) }, a5 = (function(e10, t6 = {}) {
        return defineCachedFunction(e10, t6);
      })(async (a6) => {
        const c4 = {};
        for (const e10 of r4) {
          const t6 = a6.node.req.headers[e10];
          void 0 !== t6 && (c4[e10] = t6);
        }
        const u6 = cloneWithProxy(a6.node.req, { headers: c4 }), f4 = {};
        let h5;
        const d5 = createEvent(u6, cloneWithProxy(a6.node.res, { statusCode: 200, writableEnded: false, writableFinished: false, headersSent: false, closed: false, getHeader: /* @__PURE__ */ __name((e10) => f4[e10], "getHeader"), setHeader(e10, t6) {
          return f4[e10] = t6, this;
        }, getHeaderNames: /* @__PURE__ */ __name(() => Object.keys(f4), "getHeaderNames"), hasHeader: /* @__PURE__ */ __name((e10) => e10 in f4, "hasHeader"), removeHeader(e10) {
          delete f4[e10];
        }, getHeaders: /* @__PURE__ */ __name(() => f4, "getHeaders"), end(e10, t6, r5) {
          return "string" == typeof e10 && (h5 = e10), "function" == typeof t6 && t6(), "function" == typeof r5 && r5(), this;
        }, write: /* @__PURE__ */ __name((e10, t6, r5) => ("string" == typeof e10 && (h5 = e10), "function" == typeof t6 && t6(void 0), "function" == typeof r5 && r5(), true), "write"), writeHead(e10, t6) {
          if (this.statusCode = e10, t6) {
            if (Array.isArray(t6) || "string" == typeof t6) throw new TypeError("Raw headers  is not supported.");
            for (const e11 in t6) {
              const r5 = t6[e11];
              void 0 !== r5 && this.setHeader(e11, r5);
            }
          }
          return this;
        } }));
        d5.fetch = (e10, t6) => fetchWithEvent(d5, e10, t6, { fetch: useNitroApp().localFetch }), d5.$fetch = (e10, t6) => fetchWithEvent(d5, e10, t6, { fetch: globalThis.$fetch }), d5.waitUntil = a6.waitUntil, d5.context = a6.context, d5.context.cache = { options: s6 };
        const g3 = await e9(d5) || h5, m4 = d5.node.res.getHeaders();
        m4.etag = String(m4.Etag || m4.etag || `W/"${hash(g3)}"`), m4["last-modified"] = String(m4["Last-Modified"] || m4["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString());
        const _3 = [];
        t5.swr ? (t5.maxAge && _3.push(`s-maxage=${t5.maxAge}`), t5.staleMaxAge ? _3.push(`stale-while-revalidate=${t5.staleMaxAge}`) : _3.push("stale-while-revalidate")) : t5.maxAge && _3.push(`max-age=${t5.maxAge}`), _3.length > 0 && (m4["cache-control"] = _3.join(", "));
        return { code: d5.node.res.statusCode, headers: m4, body: g3 };
      }, s6);
      return defineEventHandler(async (r5) => {
        if (t5.headersOnly) {
          if (handleCacheHeaders(r5, { maxAge: t5.maxAge })) return;
          return e9(r5);
        }
        const s7 = await a5(r5);
        if (r5.node.res.headersSent || r5.node.res.writableEnded) return s7.body;
        if (!handleCacheHeaders(r5, { modifiedTime: new Date(s7.headers["last-modified"]), etag: s7.headers.etag, maxAge: t5.maxAge })) {
          r5.node.res.statusCode = s7.code;
          for (const e10 in s7.headers) {
            const t6 = s7.headers[e10];
            "set-cookie" === e10 ? r5.node.res.appendHeader(e10, splitCookiesString(t6)) : void 0 !== t6 && r5.node.res.setHeader(e10, t6);
          }
          return s7.body;
        }
      });
    }, "cachedEventHandler");
    __name(klona, "klona");
    dn3 = Ar3({ nuxt: {} });
    pn3 = /\d/;
    gn3 = ["-", "_", "/", "."];
    __name(isUppercase, "isUppercase");
    __name(kebabCase, "kebabCase");
    __name(getEnv, "getEnv");
    __name(_isObject, "_isObject");
    __name(applyEnv, "applyEnv");
    mn3 = /\{\{([^{}]*)\}\}/g;
    __name(_expandFromEnv, "_expandFromEnv");
    yn3 = { app: { baseURL: "/", buildId: "a1012302-23dc-42e7-9e86-4735ee61fbd1", buildAssetsDir: "/_nuxt/", cdnURL: "" }, nitro: { envPrefix: "NUXT_", routeRules: { "/__nuxt_error": { cache: false }, "/_nuxt/builds/meta/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } }, "/_nuxt/builds/**": { headers: { "cache-control": "public, max-age=1, immutable" } }, "/_nuxt/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } } } }, public: {} };
    wn3 = { prefix: "NITRO_", altPrefix: yn3.nitro.envPrefix ?? J.env.NITRO_ENV_PREFIX ?? "_", envExpansion: yn3.nitro.envExpansion ?? J.env.NITRO_ENV_EXPANSION ?? false };
    bn3 = _deepFreeze(applyEnv(klona(yn3), wn3));
    __name(useRuntimeConfig2, "useRuntimeConfig");
    __name(_deepFreeze, "_deepFreeze");
    _deepFreeze(klona(dn3)), new Proxy(/* @__PURE__ */ Object.create(null), { get: /* @__PURE__ */ __name((e9, t5) => {
      console.warn("Please use `useRuntimeConfig()` instead of accessing config directly.");
      const r4 = useRuntimeConfig2();
      if (t5 in r4) return r4[t5];
    }, "get") });
    vn3 = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : void 0 !== Fr ? Fr : {};
    _n3 = "__unctx__";
    En3 = vn3[_n3] || (vn3[_n3] = /* @__PURE__ */ (function(e9 = {}) {
      const t5 = {};
      return { get: /* @__PURE__ */ __name((r4, s6 = {}) => (t5[r4] || (t5[r4] = (function(e10 = {}) {
        let t6, r5 = false;
        const checkConflict = /* @__PURE__ */ __name((e11) => {
          if (t6 && t6 !== e11) throw new Error("Context conflict");
        }, "checkConflict");
        let s7;
        if (e10.asyncContext) {
          const t7 = e10.AsyncLocalStorage || globalThis.AsyncLocalStorage;
          t7 ? s7 = new t7() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
        }
        const _getCurrentInstance = /* @__PURE__ */ __name(() => {
          if (s7) {
            const e11 = s7.getStore();
            if (void 0 !== e11) return e11;
          }
          return t6;
        }, "_getCurrentInstance");
        return { use: /* @__PURE__ */ __name(() => {
          const e11 = _getCurrentInstance();
          if (void 0 === e11) throw new Error("Context is not available");
          return e11;
        }, "use"), tryUse: /* @__PURE__ */ __name(() => _getCurrentInstance(), "tryUse"), set: /* @__PURE__ */ __name((e11, s8) => {
          s8 || checkConflict(e11), t6 = e11, r5 = true;
        }, "set"), unset: /* @__PURE__ */ __name(() => {
          t6 = void 0, r5 = false;
        }, "unset"), call: /* @__PURE__ */ __name((e11, a5) => {
          checkConflict(e11), t6 = e11;
          try {
            return s7 ? s7.run(e11, a5) : a5();
          } finally {
            r5 || (t6 = void 0);
          }
        }, "call"), async callAsync(e11, a5) {
          t6 = e11;
          const onRestore = /* @__PURE__ */ __name(() => {
            t6 = e11;
          }, "onRestore"), onLeave = /* @__PURE__ */ __name(() => t6 === e11 ? onRestore : void 0, "onLeave");
          Bn3.add(onLeave);
          try {
            const c4 = s7 ? s7.run(e11, a5) : a5();
            return r5 || (t6 = void 0), await c4;
          } finally {
            Bn3.delete(onLeave);
          }
        } };
      })({ ...e9, ...s6 })), t5[r4]), "get") };
    })());
    getContext = /* @__PURE__ */ __name((e9, t5 = {}) => En3.get(e9, t5), "getContext");
    Rn3 = "__unctx_async_handlers__";
    Bn3 = vn3[Rn3] || (vn3[Rn3] = /* @__PURE__ */ new Set());
    __name(executeAsync, "executeAsync");
    __name(isPathInScope, "isPathInScope");
    getContext("nitro-app", { asyncContext: false, AsyncLocalStorage: void 0 });
    An3 = toRouteMatcher(createRouter$1({ routes: useRuntimeConfig2().nitro.routeRules }));
    __name(createRouteRulesHandler, "createRouteRulesHandler");
    __name(getRouteRules, "getRouteRules");
    __name(getRouteRulesForPath, "getRouteRulesForPath");
    xn3 = /post|put|patch/i;
    __name(joinHeaders, "joinHeaders");
    __name(normalizeCookieHeader, "normalizeCookieHeader");
    __name(normalizeCookieHeaders, "normalizeCookieHeaders");
    __name(hasReqHeader, "hasReqHeader");
    __name(defaultHandler, "defaultHandler");
    In3 = [async function(e9, t5, { defaultHandler: r4 }) {
      if (t5.handled || (function(e10) {
        return !hasReqHeader(e10, "accept", "text/html") && (hasReqHeader(e10, "accept", "application/json") || hasReqHeader(e10, "user-agent", "curl/") || hasReqHeader(e10, "user-agent", "httpie/") || hasReqHeader(e10, "sec-fetch-mode", "cors") || e10.path.startsWith("/api/") || e10.path.endsWith(".json"));
      })(t5)) return;
      const s6 = await r4(e9, t5, { json: true });
      if (404 === (e9.status || e9.statusCode || 500) && 302 === s6.status) return setResponseHeaders(t5, s6.headers), setResponseStatus(t5, s6.status, s6.statusText), send(t5, JSON.stringify(s6.body, null, 2));
      const a5 = s6.body, c4 = new URL(a5.url);
      a5.url = withoutBase(c4.pathname, useRuntimeConfig2(t5).app.baseURL) + c4.search + c4.hash, a5.message = e9.unhandled ? a5.message || "Server Error" : e9.message || a5.message || "Server Error", a5.data ||= e9.data, a5.statusText ||= e9.statusText || e9.statusMessage, delete s6.headers["content-type"], delete s6.headers["content-security-policy"], setResponseHeaders(t5, s6.headers);
      const u6 = getRequestHeaders(t5), f4 = t5.path.startsWith("/__nuxt_error") || !!u6["x-nuxt-error"] ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig2(t5).app.baseURL, "/__nuxt_error"), a5), { headers: { ...u6, "x-nuxt-error": "true" }, redirect: "manual" }).catch(() => null);
      if (t5.handled) return;
      if (!f4) {
        const { template: e10 } = await Promise.resolve().then(() => (init_error_500(), error_500_exports));
        return setResponseHeader(t5, "Content-Type", "text/html;charset=UTF-8"), send(t5, e10(a5));
      }
      const h5 = await f4.text();
      for (const [e10, r5] of f4.headers.entries()) "set-cookie" !== e10 ? setResponseHeader(t5, e10, r5) : appendResponseHeader(t5, e10, r5);
      return setResponseStatus(t5, f4.status && 200 !== f4.status ? f4.status : s6.status, f4.statusText || s6.statusText), send(t5, h5);
    }, function(e9, t5) {
      const r4 = defaultHandler(e9, t5);
      return setResponseHeaders(t5, r4.headers), setResponseStatus(t5, r4.status, r4.statusText), send(t5, JSON.stringify(r4.body, null, 2));
    }];
    Tn3 = [];
    _lazy_XZrLxo = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_renderer(), renderer_exports)).then(function(e9) {
      return e9.K;
    }), "_lazy_XZrLxo");
    Sn3 = [{ route: "/api/admin/categories", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_categories(), categories_exports)), "handler"), lazy: true, middleware: false, method: void 0 }, { route: "/api/admin/categories/upload", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_upload(), upload_exports)), "handler"), lazy: true, middleware: false, method: void 0 }, { route: "/api/admin/login", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_login(), login_exports)), "handler"), lazy: true, middleware: false, method: void 0 }, { route: "/api/admin/products", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_products(), products_exports)), "handler"), lazy: true, middleware: false, method: void 0 }, { route: "/api/admin/upload", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_upload2(), upload_exports2)), "handler"), lazy: true, middleware: false, method: void 0 }, { route: "/api/categories", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_categories2(), categories_exports2)), "handler"), lazy: true, middleware: false, method: void 0 }, { route: "/api/products", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_products2(), products_exports2)), "handler"), lazy: true, middleware: false, method: void 0 }, { route: "/__nuxt_error", handler: _lazy_XZrLxo, lazy: true, middleware: false, method: void 0 }, { route: "/__nuxt_island/**", handler: defineEventHandler(() => {
    }), lazy: false, middleware: false, method: void 0 }, { route: "/**", handler: _lazy_XZrLxo, lazy: true, middleware: false, method: void 0 }];
    kn3 = (function() {
      const e9 = useRuntimeConfig2(), t5 = new Hookable(), captureError = /* @__PURE__ */ __name((e10, r5 = {}) => {
        const s7 = t5.callHookParallel("error", e10, r5).catch((e11) => {
          console.error("Error while capturing another error", e11);
        });
        if (r5.event && isEvent(r5.event)) {
          const t6 = r5.event.context.nitro?.errors;
          t6 && t6.push({ error: e10, context: r5 }), r5.event.waitUntil && r5.event.waitUntil(s7);
        }
      }, "captureError"), r4 = createApp2({ debug: destr(false), onError: /* @__PURE__ */ __name((e10, t6) => (captureError(e10, { event: t6, tags: ["request"] }), (async function(e11, t7) {
        for (const r5 of In3) try {
          if (await r5(e11, t7, { defaultHandler }), t7.handled) return;
        } catch (e12) {
          console.error(e12);
        }
      })(e10, t6)), "onError"), onRequest: /* @__PURE__ */ __name(async (e10) => {
        e10.context.nitro = e10.context.nitro || { errors: [] };
        const t6 = e10.node.req?.__unenv__;
        t6?._platform && (e10.context = { _platform: t6?._platform, ...t6._platform, ...e10.context }), !e10.context.waitUntil && t6?.waitUntil && (e10.context.waitUntil = t6.waitUntil), e10.fetch = (t7, r5) => fetchWithEvent(e10, t7, r5, { fetch: localFetch }), e10.$fetch = (t7, r5) => fetchWithEvent(e10, t7, r5, { fetch: c4 }), e10.waitUntil = (t7) => {
          e10.context.nitro._waitUntilPromises || (e10.context.nitro._waitUntilPromises = []), e10.context.nitro._waitUntilPromises.push(t7), e10.context.waitUntil && e10.context.waitUntil(t7);
        }, e10.captureError = (t7, r5) => {
          captureError(t7, { event: e10, ...r5 });
        }, await kn3.hooks.callHook("request", e10).catch((t7) => {
          captureError(t7, { event: e10, tags: ["request"] });
        });
      }, "onRequest"), onBeforeResponse: /* @__PURE__ */ __name(async (e10, t6) => {
        await kn3.hooks.callHook("beforeResponse", e10, t6).catch((t7) => {
          captureError(t7, { event: e10, tags: ["request", "response"] });
        });
      }, "onBeforeResponse"), onAfterResponse: /* @__PURE__ */ __name(async (e10, t6) => {
        await kn3.hooks.callHook("afterResponse", e10, t6).catch((t7) => {
          captureError(t7, { event: e10, tags: ["request", "response"] });
        });
      }, "onAfterResponse") }), s6 = (function(e10 = {}) {
        const t6 = createRouter$1({}), r5 = {};
        let s7;
        const a6 = {}, addRoute = /* @__PURE__ */ __name((e11, s8, c6) => {
          let u6 = r5[e11];
          if (u6 || (r5[e11] = u6 = { path: e11, handlers: {} }, t6.insert(e11, u6)), Array.isArray(c6)) for (const t7 of c6) addRoute(e11, s8, t7);
          else u6.handlers[c6] = toEventHandler(s8);
          return a6;
        }, "addRoute");
        a6.use = a6.add = (e11, t7, r6) => addRoute(e11, t7, r6 || "all");
        for (const e11 of Wr2) a6[e11] = (t7, r6) => a6.add(t7, r6, e11);
        const matchHandler = /* @__PURE__ */ __name((e11 = "/", r6 = "get") => {
          const a7 = e11.indexOf("?");
          -1 !== a7 && (e11 = e11.slice(0, Math.max(0, a7)));
          const c6 = t6.lookup(e11);
          if (!c6 || !c6.handlers) return { error: createError({ statusCode: 404, name: "Not Found", statusMessage: `Cannot find any route matching ${e11 || "/"}.` }) };
          let u6 = c6.handlers[r6] || c6.handlers.all;
          if (!u6) {
            s7 || (s7 = toRouteMatcher(t6));
            const a8 = s7.matchAll(e11).reverse();
            for (const e12 of a8) {
              if (e12.handlers[r6]) {
                u6 = e12.handlers[r6], c6.handlers[r6] = c6.handlers[r6] || u6;
                break;
              }
              if (e12.handlers.all) {
                u6 = e12.handlers.all, c6.handlers.all = c6.handlers.all || u6;
                break;
              }
            }
          }
          return u6 ? { matched: c6, handler: u6 } : { error: createError({ statusCode: 405, name: "Method Not Allowed", statusMessage: `Method ${r6} is not allowed on this route.` }) };
        }, "matchHandler"), c5 = e10.preemptive || e10.preemtive;
        return a6.handler = zr2((e11) => {
          const t7 = matchHandler(e11.path, e11.method.toLowerCase());
          if ("error" in t7) {
            if (c5) throw t7.error;
            return;
          }
          e11.context.matchedRoute = t7.matched;
          const r6 = t7.matched.params || {};
          return e11.context.params = r6, Promise.resolve(t7.handler(e11)).then((e12) => void 0 === e12 && c5 ? null : e12);
        }), a6.handler.__resolve__ = async (e11) => {
          e11 = withLeadingSlash(e11);
          const t7 = matchHandler(e11);
          if ("error" in t7) return;
          let r6 = { route: t7.matched.path, handler: t7.handler };
          if (t7.handler.__resolve__) {
            const s8 = await t7.handler.__resolve__(e11);
            if (!s8) return;
            r6 = { ...r6, ...s8 };
          }
          return r6;
        }, a6;
      })({ preemptive: true }), a5 = toNodeListener(r4), localFetch = /* @__PURE__ */ __name((e10, t6) => e10.toString().startsWith("/") ? (async function(e11, t7, r5 = {}) {
        try {
          const s7 = await b3(e11, { url: t7, ...r5 });
          return new Response(s7.body, { status: s7.status, statusText: s7.statusText, headers: v4(s7.headers) });
        } catch (e12) {
          return new Response(e12.toString(), { status: Number.parseInt(e12.statusCode || e12.code) || 500, statusText: e12.statusText });
        }
      })(a5, e10, t6).then((e11) => (function(e12) {
        return e12.headers.has("set-cookie") ? new Response(e12.body, { status: e12.status, statusText: e12.statusText, headers: normalizeCookieHeaders(e12.headers) }) : e12;
      })(e11)) : globalThis.fetch(e10, t6), "localFetch"), c4 = createFetch({ fetch: localFetch, Headers: Xr2, defaults: { baseURL: e9.app.baseURL } });
      globalThis.$fetch = c4, r4.use(createRouteRulesHandler({ localFetch }));
      for (const t6 of Sn3) {
        let a6 = t6.lazy ? lazyEventHandler(t6.handler) : t6.handler;
        if (t6.middleware || !t6.route) {
          const s7 = (e9.app.baseURL + (t6.route || "/")).replace(/\/+/g, "/");
          r4.use(s7, a6);
        } else {
          const e10 = getRouteRulesForPath(t6.route.replace(/:\w+|\*\*/g, "_"));
          e10.cache && (a6 = cachedEventHandler(a6, { group: "nitro/routes", ...e10.cache })), s6.use(t6.route, a6, t6.method);
        }
      }
      return r4.use(e9.app.baseURL, s6.handler), { hooks: t5, h3App: r4, router: s6, localCall: /* @__PURE__ */ __name((e10) => b3(a5, e10), "localCall"), localFetch, captureError };
    })();
    __name(useNitroApp, "useNitroApp");
    __name(defineRenderHandler, "defineRenderHandler");
    !(function(e9) {
      for (const t5 of Tn3) try {
        t5(e9);
      } catch (t6) {
        throw e9.captureError(t6, { tags: ["plugin"] }), t6;
      }
    })(kn3);
    Cn3 = { "/_nuxt/C0sIP8vJ.js": { type: "text/javascript; charset=utf-8", etag: '"146-gs5D8LRtwLr66BpYqQFhxer1gJU"', mtime: "2026-07-13T04:35:58.131Z", size: 326, path: "../_nuxt/C0sIP8vJ.js" }, "/_nuxt/Bnr0mSJi.js": { type: "text/javascript; charset=utf-8", etag: '"24d7-gZojeTNAJjIrqUdiM/F48g/hDS0"', mtime: "2026-07-13T04:35:58.132Z", size: 9431, path: "../_nuxt/Bnr0mSJi.js" }, "/_nuxt/BHlg4_SZ.js": { type: "text/javascript; charset=utf-8", etag: '"2aa8-P8ZwHLipAho7L22F0RpMSBmhLlA"', mtime: "2026-07-13T04:35:58.132Z", size: 10920, path: "../_nuxt/BHlg4_SZ.js" }, "/_nuxt/DlAUqK2U.js": { type: "text/javascript; charset=utf-8", etag: '"5b-eFCz/UrraTh721pgAl0VxBNR1es"', mtime: "2026-07-13T04:35:58.132Z", size: 91, path: "../_nuxt/DlAUqK2U.js" }, "/_nuxt/DlM8HypS.js": { type: "text/javascript; charset=utf-8", etag: '"db1-JOV6wMqlHi9xDkFB82KU8GLrsBI"', mtime: "2026-07-13T04:35:58.132Z", size: 3505, path: "../_nuxt/DlM8HypS.js" }, "/_nuxt/C7UvdaDj.js": { type: "text/javascript; charset=utf-8", etag: '"59b8-6bLSkfpLO7I0meeHAV8S5Z1fZh4"', mtime: "2026-07-13T04:35:58.132Z", size: 22968, path: "../_nuxt/C7UvdaDj.js" }, "/_nuxt/admin.DhgIbTkp.css": { type: "text/css; charset=utf-8", etag: '"ac-PULQrczX3gYxGmN0sDTaC3c/5wc"', mtime: "2026-07-13T04:35:58.132Z", size: 172, path: "../_nuxt/admin.DhgIbTkp.css" }, "/favicon.ico": { type: "image/vnd.microsoft.icon", etag: '"10be-wGBe/tk27iYAKE5kgFIdBvpk+HI"', mtime: "2026-07-13T04:35:58.138Z", size: 4286, path: "../favicon.ico" }, "/_nuxt/error-404.oz9wUqPg.css": { type: "text/css; charset=utf-8", etag: '"97e-3s/gV3hQiYCG4Oanld8Kkk8eGm8"', mtime: "2026-07-13T04:35:58.132Z", size: 2430, path: "../_nuxt/error-404.oz9wUqPg.css" }, "/_nuxt/error-500.BAq6mZr2.css": { type: "text/css; charset=utf-8", etag: '"773-8tGFrGsiSArJyC9hbS28kR3iLA0"', mtime: "2026-07-13T04:35:58.132Z", size: 1907, path: "../_nuxt/error-500.BAq6mZr2.css" }, "/_nuxt/index.8AoJSg6i.css": { type: "text/css; charset=utf-8", etag: '"90-oNN4lBuHaiXFucN4XKoHZ/NG3mY"', mtime: "2026-07-13T04:35:58.132Z", size: 144, path: "../_nuxt/index.8AoJSg6i.css" }, "/_nuxt/MV8VcNpN.js": { type: "text/javascript; charset=utf-8", etag: '"8766-P+LYBHtecpQPf13c2GvsAH8rFlM"', mtime: "2026-07-13T04:35:58.132Z", size: 34662, path: "../_nuxt/MV8VcNpN.js" }, "/_nuxt/builds/latest.json": { type: "application/json", etag: '"47-Sm1P9W5d7JCY413BWITt9b4f254"', mtime: "2026-07-13T04:35:58.127Z", size: 71, path: "../_nuxt/builds/latest.json" }, "/_nuxt/wVa8GXPB.js": { type: "text/javascript; charset=utf-8", etag: '"5a2f-of6bNPkXuhSOee3YA6Qf9FMwYAg"', mtime: "2026-07-13T04:35:58.132Z", size: 23087, path: "../_nuxt/wVa8GXPB.js" }, "/_nuxt/entry.ClnncQN-.css": { type: "text/css; charset=utf-8", etag: '"f3e6-ke3r+RCG1i/2bjEPH0HAk+95JpE"', mtime: "2026-07-13T04:35:58.132Z", size: 62438, path: "../_nuxt/entry.ClnncQN-.css" }, "/_nuxt/DMDkx4gX.js": { type: "text/javascript; charset=utf-8", etag: '"2eaa5-3n9NFE/OA8NQQQOBCutkyIwEbNw"', mtime: "2026-07-13T04:35:58.132Z", size: 191141, path: "../_nuxt/DMDkx4gX.js" }, "/images/categorias/categoria-cestas.jpg": { type: "image/jpeg", etag: '"f44cc-d456flSbgWboBiPqVGYQhno8ICE"', mtime: "2026-07-13T04:35:58.138Z", size: 1000652, path: "../images/categorias/categoria-cestas.jpg" }, "/images/categorias/categoria-presentes.jpg": { type: "image/jpeg", etag: '"ca4e1-BXAiD2NopVarp2wG9gAMp8NVx6s"', mtime: "2026-07-13T04:35:58.138Z", size: 828641, path: "../images/categorias/categoria-presentes.jpg" }, "/images/categorias/categoria-buques.jpg": { type: "image/jpeg", etag: '"ea326-6anhUBpKWi33uxLJTg7aGfZg2t0"', mtime: "2026-07-13T04:35:58.138Z", size: 959270, path: "../images/categorias/categoria-buques.jpg" }, "/images/produtos/arranjo-girassois.jpg": { type: "image/jpeg", etag: '"bd02d-dJai8EmKSuE4k0thuxw+WOQfRdA"', mtime: "2026-07-13T04:35:58.138Z", size: 774189, path: "../images/produtos/arranjo-girassois.jpg" }, "/images/produtos/box-vinho-rosas.jpg": { type: "image/jpeg", etag: '"c3408-bcSu5P5f2LPvvMFKRXtNuxCYD4c"', mtime: "2026-07-13T04:35:58.138Z", size: 799752, path: "../images/produtos/box-vinho-rosas.jpg" }, "/images/categorias/categoria-todos.jpg": { type: "image/jpeg", etag: '"10ebe0-VPIWnV+w9UpOIDZnh2/PXeMHjb8"', mtime: "2026-07-13T04:35:58.138Z", size: 1108960, path: "../images/categorias/categoria-todos.jpg" }, "/images/produtos/buque-rosas-vermelhas.jpg": { type: "image/jpeg", etag: '"85a95-67MYahY+lT7ldny2HlarAwR4ikw"', mtime: "2026-07-13T04:35:58.138Z", size: 547477, path: "../images/produtos/buque-rosas-vermelhas.jpg" }, "/images/produtos/buque-rosas-vermelhas-detail.jpg": { type: "image/jpeg", etag: '"c36d1-J//EJGuv6TIul7rTVlLAP9r3O08"', mtime: "2026-07-13T04:35:58.138Z", size: 800465, path: "../images/produtos/buque-rosas-vermelhas-detail.jpg" }, "/images/produtos/cesta-cafe-premium-detail.jpg": { type: "image/jpeg", etag: '"c4921-elpZEN68PyDpUrjANy3eRMRGtIM"', mtime: "2026-07-13T04:35:58.138Z", size: 805153, path: "../images/produtos/cesta-cafe-premium-detail.jpg" }, "/_nuxt/builds/meta/a1012302-23dc-42e7-9e86-4735ee61fbd1.json": { type: "application/json", etag: '"58-yvScxC1AGzMESHByIGznuPFzz58"', mtime: "2026-07-13T04:35:58.123Z", size: 88, path: "../_nuxt/builds/meta/a1012302-23dc-42e7-9e86-4735ee61fbd1.json" }, "/images/produtos/screenshot-from-2026-07-12-16-18-56.png": { type: "image/png", etag: '"3ec1c-s+oXz1Ww/B9+Vr4ylxwNW7vF/28"', mtime: "2026-07-13T04:35:58.138Z", size: 257052, path: "../images/produtos/screenshot-from-2026-07-12-16-18-56.png" }, "/images/produtos/cesta-chocolates.jpg": { type: "image/jpeg", etag: '"e415b-SSOQyFNujryTlwX7gicOjNkAg6o"', mtime: "2026-07-13T04:35:58.138Z", size: 934235, path: "../images/produtos/cesta-chocolates.jpg" }, "/images/produtos/cesta-cafe-premium.jpg": { type: "image/jpeg", etag: '"d75c5-ZumiubqGrBRDut2c6M6cfwSlIJY"', mtime: "2026-07-13T04:35:58.138Z", size: 882117, path: "../images/produtos/cesta-cafe-premium.jpg" }, "/images/produtos/rosa-encantada-detail.jpg": { type: "image/jpeg", etag: '"a2ac3-ZE8JR2CxiMny+ZhZ6X4xAIajHaw"', mtime: "2026-07-13T04:35:58.138Z", size: 666307, path: "../images/produtos/rosa-encantada-detail.jpg" }, "/images/produtos/rosa-encantada.jpg": { type: "image/jpeg", etag: '"af3dc-uKP0h2DmveezZEnPb97YODUXgQs"', mtime: "2026-07-13T04:35:58.138Z", size: 717788, path: "../images/produtos/rosa-encantada.jpg" } };
    $n3 = { "/_nuxt/builds/meta/": { maxAge: 31536e3 }, "/_nuxt/builds/": { maxAge: 1 }, "/_nuxt/": { maxAge: 31536e3 } };
    jn3 = useNitroApp();
    On3 = { async fetch(e9, t5, r4) {
      const s6 = new URL(e9.url);
      if (t5.ASSETS && (function(e10 = "") {
        if (Cn3[e10]) return true;
        for (const t6 in $n3) if (e10.startsWith(t6)) return true;
        return false;
      })(s6.pathname)) return t5.ASSETS.fetch(e9);
      let a5;
      return (function(e10) {
        return xn3.test(e10.method);
      })(e9) && (a5 = g2.from(await e9.arrayBuffer())), globalThis.__env__ = t5, jn3.localFetch(s6.pathname + s6.search, { context: { waitUntil: /* @__PURE__ */ __name((e10) => r4.waitUntil(e10), "waitUntil"), _platform: { cf: e9.cf, cloudflare: { request: e9, env: t5, context: r4 } } }, host: s6.hostname, protocol: s6.protocol, method: e9.method, headers: e9.headers, body: a5 });
    }, scheduled(e9, t5, r4) {
    } };
  }
});

// .wrangler/tmp/bundle-y1VB2X/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-y1VB2X/middleware-insertion-facade.js
init_modules_watch_stub();

// .wrangler/tmp/pages-zpBuWO/7rldmwd5wdt.js
init_modules_watch_stub();

// .wrangler/tmp/pages-zpBuWO/bundledWorker-0.10468599185183936.mjs
init_modules_watch_stub();
init_nitro();
globalThis._importMeta_ = { url: "file:///_entry.js", env: {} };

// node_modules/.pnpm/wrangler@4.110.0/node_modules/wrangler/templates/pages-dev-util.ts
init_modules_watch_stub();
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-zpBuWO/7rldmwd5wdt.js
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_nuxt/*",
    "/favicon.ico",
    "/images/categorias/categoria-buques.jpg",
    "/images/categorias/categoria-cestas.jpg",
    "/images/categorias/categoria-presentes.jpg",
    "/images/categorias/categoria-todos.jpg",
    "/images/produtos/arranjo-girassois.jpg",
    "/images/produtos/box-vinho-rosas.jpg",
    "/images/produtos/buque-rosas-vermelhas-detail.jpg",
    "/images/produtos/buque-rosas-vermelhas.jpg",
    "/images/produtos/cesta-cafe-premium-detail.jpg",
    "/images/produtos/cesta-cafe-premium.jpg",
    "/images/produtos/cesta-chocolates.jpg",
    "/images/produtos/rosa-encantada-detail.jpg",
    "/images/produtos/rosa-encantada.jpg",
    "/images/produtos/screenshot-from-2026-07-12-16-18-56.png"
  ]
};
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = On3;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};

// node_modules/.pnpm/wrangler@4.110.0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e9) {
      console.error("Failed to drain the unused request body.", e9);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/.pnpm/wrangler@4.110.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e9) {
  return {
    name: e9?.name,
    message: e9?.message ?? String(e9),
    stack: e9?.stack,
    cause: e9?.cause === void 0 ? void 0 : reduceError(e9.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e9) {
    const error = reduceError(e9);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-y1VB2X/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_dev_pipeline_default;

// node_modules/.pnpm/wrangler@4.110.0/node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-y1VB2X/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=7rldmwd5wdt.js.map
