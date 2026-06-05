//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"94ea82652cdd4e0f8046b5bd5becbd11461482ca",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "BVRWeb.SiteWork",
  "resources": {
    "hash": "sha256-fRm90TaoGybbHq6EJhTTqeuJIn6CVsMSURM8Qgpx7eM=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.wasm",
        "hash": "sha256-zMm3gGqDZlw+hVq7QdYXswnEMrDYdJs9Mxz/fMwdTGI="
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.dat",
        "hash": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk="
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.dat",
        "hash": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc="
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.dat",
        "hash": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.wasm",
        "hash": "sha256-NqJOEEPGc1ryQiRONyZ5eX+uGHNRrvYkzRwUU18qe54="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.wasm",
        "hash": "sha256-j+w+UKu0Gc9+OxdEZzcvU5335iO6FGXzOGZ8YBoLLSw="
      }
    ],
    "assembly": [
      {
        "virtualPath": "BCrypt-Net-Next.wasm",
        "name": "BCrypt-Net-Next.wasm",
        "hash": "sha256-K0Ldnw7bS9cyXYOKZHSkQtIiNrl63wF1xqSKX2vFyP0="
      },
      {
        "virtualPath": "BVRWeb.DataAccess.wasm",
        "name": "BVRWeb.DataAccess.wasm",
        "hash": "sha256-O25Rx41GeVyczhDRrzimGMBLcEFwJqvToLU0gP8U+gc="
      },
      {
        "virtualPath": "BVRWeb.SiteWork.wasm",
        "name": "BVRWeb.SiteWork.wasm",
        "hash": "sha256-wmStDVAHyiEjivSxhCKsvTBMiYqTfyzsptpnM956gTQ="
      },
      {
        "virtualPath": "Blazored.LocalStorage.wasm",
        "name": "Blazored.LocalStorage.wasm",
        "hash": "sha256-OaMAAd5n7ORfyur5e3QIyEVKJ76MKIvwbg7/icnnYcU="
      },
      {
        "virtualPath": "CryptoNet.ExtShared.wasm",
        "name": "CryptoNet.ExtShared.wasm",
        "hash": "sha256-940hEYXuPqtA6ttu0PSApeSJsLo8EthPdMoUwsxeRIE="
      },
      {
        "virtualPath": "CryptoNet.Models.wasm",
        "name": "CryptoNet.Models.wasm",
        "hash": "sha256-y7L7Zji3i2ywtIgUVxzeW8FbtSHz6UitmuudKsciqhc="
      },
      {
        "virtualPath": "CryptoNet.wasm",
        "name": "CryptoNet.wasm",
        "hash": "sha256-jq/r4el6HAYseNRFx0YCP33lgsHkibPX8dBt8qMOivU="
      },
      {
        "virtualPath": "FluentFTP.wasm",
        "name": "FluentFTP.wasm",
        "hash": "sha256-SgaoWzIAmM4u3qGQo/lBpv+u5b60Lkq/49goCMIpdEA="
      },
      {
        "virtualPath": "FuzzySharp.wasm",
        "name": "FuzzySharp.wasm",
        "hash": "sha256-TIen2oHWnNk1fnQ+lYSzxw/vFAaDRanR8IySMtoZYpk="
      },
      {
        "virtualPath": "ICSharpCode.SharpZipLib.wasm",
        "name": "ICSharpCode.SharpZipLib.wasm",
        "hash": "sha256-sQnvcAtUeRrp/EWc52rziUXltWQhUBCAv/V77K+PsIg="
      },
      {
        "virtualPath": "MessagePack.Annotations.wasm",
        "name": "MessagePack.Annotations.wasm",
        "hash": "sha256-RrNQNbVnCNdsklKGi/BF4Chz1x0rfDKKUFQys+Q+DaQ="
      },
      {
        "virtualPath": "MessagePack.wasm",
        "name": "MessagePack.wasm",
        "hash": "sha256-bocUQb1muRhukge3onc7s34MnV7uDbNOKzWDVO/n1K8="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authentication.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Authentication.Abstractions.wasm",
        "hash": "sha256-u9iMOIltdEH1f+auTSi7mcb4SBt2memdjfBRiDl2cNE="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authentication.Cookies.wasm",
        "name": "Microsoft.AspNetCore.Authentication.Cookies.wasm",
        "hash": "sha256-HCGWgPnIMB+YpkR639LJeljdMsHO/0WLfDBWSrBeU7E="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authentication.Core.wasm",
        "name": "Microsoft.AspNetCore.Authentication.Core.wasm",
        "hash": "sha256-RvrgkuvCzUhIR14zDxsUqVpYzujZOdJHMJ36UJgBMIg="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authentication.wasm",
        "name": "Microsoft.AspNetCore.Authentication.wasm",
        "hash": "sha256-TTMbfIRYCWh/6ZtcC/6m23rRKoIiOx5Vw948CeeE9cA="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.wasm",
        "hash": "sha256-oAXYiyPrSgfttBicKQonLFeM8q3b2Wj4nZmsxvvOgys="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Components.Authorization.wasm",
        "hash": "sha256-FAnxYJvCnFhfdW8+TjcjowoGSjz9EL+OqHRIysb6/5A="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.wasm",
        "hash": "sha256-JOM7PBK4lHw5O32EqajZNcqBSDgfiSaiT8Zffern8DY="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.wasm",
        "hash": "sha256-jhrm6essQxVOd2mAdQ3Jgydnz6vhAkQM7uroUol+eXw="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.Authentication.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.Authentication.wasm",
        "hash": "sha256-Npi/PKRlrI6nL3dD9HTeZfJ74qUxa8nFYZAJuo5BLww="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "hash": "sha256-8rkCw31CmNFDpq3rMzzMe//5eEvmfN0KIB4GSgROMTA="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.wasm",
        "hash": "sha256-i+R/s55lBCaOVZ4S4vG2UdYy9On6TIXl1o+bq49G6LI="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Cryptography.Internal.wasm",
        "name": "Microsoft.AspNetCore.Cryptography.Internal.wasm",
        "hash": "sha256-0v2Rnnan5da5iinwMZEPsUIS9B/lF1+JEAQa3G2yHIM="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Cryptography.KeyDerivation.wasm",
        "name": "Microsoft.AspNetCore.Cryptography.KeyDerivation.wasm",
        "hash": "sha256-KYqzZAUyQfnH6L4O7Z5Uj4SXNRq4ycCcH3h6dDU4KvY="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.DataProtection.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.DataProtection.Abstractions.wasm",
        "hash": "sha256-LlR1Jkynaw8NHvrFDkb/TJlslaeyQ0smb/SvorJXgCM="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.DataProtection.wasm",
        "name": "Microsoft.AspNetCore.DataProtection.wasm",
        "hash": "sha256-xEV/oEttD6lDH8uTc63YXb0hm7DbEhJM3TuHMuUdGJE="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Hosting.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Hosting.Abstractions.wasm",
        "hash": "sha256-HDGf8ho7XMSN7CFuqImwY6aAo2TKXoev3pe5VaAlTB4="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Hosting.Server.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Hosting.Server.Abstractions.wasm",
        "hash": "sha256-KOdV8nnepJvdzz9YZQF2IiESUrXNx6nNMN2Uvhssmi4="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Http.Abstractions.wasm",
        "hash": "sha256-7wgz1ZHwXmXV8y00xn+jT4BGeuCQQbVYGQl+PNvBfnQ="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Extensions.wasm",
        "name": "Microsoft.AspNetCore.Http.Extensions.wasm",
        "hash": "sha256-sbIJEHnGL6std1HkIJ83mfNTk5yznrGRZbaacPDI5w4="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Features.wasm",
        "name": "Microsoft.AspNetCore.Http.Features.wasm",
        "hash": "sha256-bzIPAVp+XhD63CRn9cVTB4tJRU+oDEAuwFYoHytMhUk="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.wasm",
        "name": "Microsoft.AspNetCore.Http.wasm",
        "hash": "sha256-P7u++4zIBAR6s/X8yOsyscat1H9SsWsnAnBNrm4OxlA="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Identity.EntityFrameworkCore.wasm",
        "name": "Microsoft.AspNetCore.Identity.EntityFrameworkCore.wasm",
        "hash": "sha256-qD1gPKACjUQTEo9MgC5w0agJlvANebxP7lVSv4kxx/U="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Identity.wasm",
        "name": "Microsoft.AspNetCore.Identity.wasm",
        "hash": "sha256-BvP86HE1F4FEEweG/H5EOYdp32TMO2cYr8bcK/4R0cY="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.wasm",
        "hash": "sha256-x9LfEKgCaZAfUztR1INUKOu66PDjm7eIQzEXDzgqToQ="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.WebUtilities.wasm",
        "name": "Microsoft.AspNetCore.WebUtilities.wasm",
        "hash": "sha256-VQM0rTyQ42zNsi2Mfz/XlOZsi4F4HQ5RrZnGIJaRhjI="
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.wasm",
        "hash": "sha256-efSJhSlgBbB+4MSberm4qW6QhDCp9A6veL+Oq9tOQ0s="
      },
      {
        "virtualPath": "Microsoft.Data.Sqlite.wasm",
        "name": "Microsoft.Data.Sqlite.wasm",
        "hash": "sha256-W9B8j7C9KNaaUuSwlSk1RrPanA1pa+CPhIbXEZIozSU="
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.Abstractions.wasm",
        "name": "Microsoft.EntityFrameworkCore.Abstractions.wasm",
        "hash": "sha256-q4zA1/RTaWqHRKKrqV0ttFp41RVnhQxzDOMAO/k2D10="
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.Relational.wasm",
        "name": "Microsoft.EntityFrameworkCore.Relational.wasm",
        "hash": "sha256-hgVe+Wskn0/RBgvSXBEkL7UHUyZX6c5Ap82nx8HNUFs="
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.Sqlite.wasm",
        "name": "Microsoft.EntityFrameworkCore.Sqlite.wasm",
        "hash": "sha256-U5/qH45CHSdBMdGuV2O0mxF/k6z8BGL1dnLKYRA3E0E="
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.wasm",
        "name": "Microsoft.EntityFrameworkCore.wasm",
        "hash": "sha256-DPqJ1DzXzrBqnQPsrgR9OnIxPPzoflY9qheOifzx9QQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Abstractions.wasm",
        "name": "Microsoft.Extensions.Caching.Abstractions.wasm",
        "hash": "sha256-tSgl59bRmnTPPQth2CIhnneNwCQELWZttk6S2c6Syb0="
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Memory.wasm",
        "name": "Microsoft.Extensions.Caching.Memory.wasm",
        "hash": "sha256-Xn7sOZZjP5fk879A/w1ejyt8tzsXqeBhqefdPMsnzpM="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "hash": "sha256-0ma2IV4JttJPlU2OSPF0h2Beoz643Sd/hJTanGPOKX0="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.wasm",
        "hash": "sha256-Os7SXHM4wZCztfpXowvhyMYu+s0KJOcmgpucYO5W+0k="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "hash": "sha256-ISKWK3gZHMOUTv2DQ2rSbIqun9FlNFP1nk6r+1dRiDw="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.wasm",
        "hash": "sha256-EomzK0mw6cW/tgLgphBG590CrvlNWWpJSPrmW1V6hoQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.wasm",
        "hash": "sha256-sek4j/E5eHSWZaJfFfy35xFc/w5NpvdIchxbYeehbBM="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "hash": "sha256-vk0Dne1XaeyS4+m7vK5GJy38IuHM2z1DCYuUjMownC0="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.wasm",
        "hash": "sha256-RMYxBjEpCnCmiR28GmCpZKRU0UB3UYQjBtwYZfUwCw4="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyModel.wasm",
        "name": "Microsoft.Extensions.DependencyModel.wasm",
        "hash": "sha256-AXhoj5J5gu6L1Ho8kPVeOST1DbzvkjqDfmuBrQVhZVM="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "hash": "sha256-gxYN7ZOUHUW/JTP8jiRfPGvYbG40cfyl47pStSM5Uto="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.wasm",
        "hash": "sha256-BUJ1hBmLgNY7tK18BpPnt79gKS+NOjZ66W/TmGR4PKg="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "hash": "sha256-r92wsGddO7dVrjgbrgdvIWkn4+2NWofvl5Ii28yqPq4="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "hash": "sha256-OG9o3UslI2rYrFrE5TQvrpagau3fIdhVnKBGPgid3UE="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "hash": "sha256-nZtltkDQQO17hwnW+/BADdOU6xF/QqAAGzeond41BZU="
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "hash": "sha256-aNb/fEY3laCkq3MVPJn/8u4nEDmL0cilWcVA+t9NGSE="
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.wasm",
        "name": "Microsoft.Extensions.Http.wasm",
        "hash": "sha256-QYO2XULBYCKbIQkp1AE5tjJ48mQPtq7kGon3fGwJhPo="
      },
      {
        "virtualPath": "Microsoft.Extensions.Identity.Core.wasm",
        "name": "Microsoft.Extensions.Identity.Core.wasm",
        "hash": "sha256-7JJjQ1/DmhVaNwmrQDtjn0yY/rhma1oj2JVr9EXa5s4="
      },
      {
        "virtualPath": "Microsoft.Extensions.Identity.Stores.wasm",
        "name": "Microsoft.Extensions.Identity.Stores.wasm",
        "hash": "sha256-mWMqreH0te5lnN8a96gvR5o0EBuyN39NwDe0tO+LHCQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "hash": "sha256-GJNjpp2mlMIYboBhzukWw5r2Z24PsB0E9Gj9VoTGKEI="
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.wasm",
        "hash": "sha256-6UgMJoVZBfDdfzYR0aKVK6BWArxpXC1qiQDDjiXw/L4="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "hash": "sha256-wq9797hXAfPnkPZbzAO4I6aWtBs9W2//xnIY17f3UkY="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.wasm",
        "hash": "sha256-aCMWzHwLF+TdnVvwR1kKNeP3KrqJ5JeyztkvzK9xgDU="
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.wasm",
        "name": "Microsoft.Extensions.ObjectPool.wasm",
        "hash": "sha256-EYv4WgG4xV6cTOipWqdLbUzWXGqStEcSUobakoWU0f8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "hash": "sha256-Xx46JEt9VN7XLtcSs8XX3nU4iD7RkBBwMLirvr3ejxk="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.wasm",
        "hash": "sha256-cfEV9X4E5Slc/lwbWSudtGI+KAdgdoSaY/xpUGhPwFY="
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.wasm",
        "hash": "sha256-3LFbBwp+XMlFsdKgZIsP5GMRxRYTaMXdNf7lVjT5DHQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.wasm",
        "hash": "sha256-r7ohGPoJwVd0u5DpDbkhXDnPGlCHreOAOMlFDLCa7GY="
      },
      {
        "virtualPath": "Microsoft.Extensions.WebEncoders.wasm",
        "name": "Microsoft.Extensions.WebEncoders.wasm",
        "hash": "sha256-a5cONIoRz1DZ7wOayrQN13v0jyRJtn2tHDBBFwPmMdo="
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Abstractions.wasm",
        "name": "Microsoft.IdentityModel.Abstractions.wasm",
        "hash": "sha256-Y1T3OGNupfoYqX5AahIYXRsH5L1A4Mqbij8iJL98eOY="
      },
      {
        "virtualPath": "Microsoft.IdentityModel.JsonWebTokens.wasm",
        "name": "Microsoft.IdentityModel.JsonWebTokens.wasm",
        "hash": "sha256-1dcAeq3AaDzST6ACUweq5wVp2n/hPxPp2uToTq1KJcU="
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Logging.wasm",
        "name": "Microsoft.IdentityModel.Logging.wasm",
        "hash": "sha256-FmzPTj7kf+FFe/0X+bmejnJ2jVNTOVhb1+xfWboWsgQ="
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Tokens.wasm",
        "name": "Microsoft.IdentityModel.Tokens.wasm",
        "hash": "sha256-2JLWeYWJvIGxX+y5xwEpqisWFUhTMBWW1ZcJLxI0f3U="
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.wasm",
        "hash": "sha256-qJyHs38XXSqiIA7p4JDCipGIU1KWvUVdgaRtVQAjY0M="
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.wasm",
        "hash": "sha256-g3ElTUeDlU9dcja4AtXumcvz4UQ2DAzJnbn/q/5/8HU="
      },
      {
        "virtualPath": "Microsoft.NET.StringTools.wasm",
        "name": "Microsoft.NET.StringTools.wasm",
        "hash": "sha256-1RVVzhRL2Hx7k7A5ZItnCkz9CRPPvSmTRUPLCFSRG2o="
      },
      {
        "virtualPath": "Microsoft.Net.Http.Headers.wasm",
        "name": "Microsoft.Net.Http.Headers.wasm",
        "hash": "sha256-jfXK+cfJd/PteHB+5Bay/NDY9b9VLvVw6G/Bm262Lpo="
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.wasm",
        "hash": "sha256-VJr17rD/xtXPxO3023r+5bjX4j8at1hS29docyilIAQ="
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.wasm",
        "hash": "sha256-hqGg6WrVnAshSdahy+lhr6PDoA5dZ01GreRNL89vNJI="
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.wasm",
        "hash": "sha256-5UCTTjIczf3zokmq+OYIf9m0EPP5kh+8o0Z8Ae9MuQg="
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.wasm",
        "hash": "sha256-in9vy9BpwMVcZOY+GAqjnIghXNrMqqToeJX82sIDNX8="
      },
      {
        "virtualPath": "MudBlazor.wasm",
        "name": "MudBlazor.wasm",
        "hash": "sha256-NqqmRDAnNGFOUST8TWt07KcU6YW3hGxP62PdgDMCah4="
      },
      {
        "virtualPath": "SQLitePCLRaw.batteries_v2.wasm",
        "name": "SQLitePCLRaw.batteries_v2.wasm",
        "hash": "sha256-bUL22xPcTDXGgCAJmi59APb3Vn5OsBBoX0rPDSfHcTI="
      },
      {
        "virtualPath": "SQLitePCLRaw.core.wasm",
        "name": "SQLitePCLRaw.core.wasm",
        "hash": "sha256-34SMrsayL0bhoZ4JGGWjN0gYAqZotemwzF8evivgz8Q="
      },
      {
        "virtualPath": "SQLitePCLRaw.provider.e_sqlite3.wasm",
        "name": "SQLitePCLRaw.provider.e_sqlite3.wasm",
        "hash": "sha256-3EuT9kGxKjK50Qkss/AuRYuEc5IbUEhy3mC1Zid492w="
      },
      {
        "virtualPath": "SixLabors.ImageSharp.wasm",
        "name": "SixLabors.ImageSharp.wasm",
        "hash": "sha256-jGnzEROgobFzmOnykWxp1jipkegPJvlaQRXQXCioqUg="
      },
      {
        "virtualPath": "SqliteWasmBlazor.wasm",
        "name": "SqliteWasmBlazor.wasm",
        "hash": "sha256-Bw/760CbTSLT2bvpZNiTRHF6ayLzcd57MfXu+jvMDtU="
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.wasm",
        "hash": "sha256-9PLIWHk1UT2n5bCtKqQD2Kr4wi+MMk1IRov7++9W0yY="
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.wasm",
        "hash": "sha256-dxRQGPENvHYhqD9I9Oc8vI7mIdpz4yAHBZad8b+zsz0="
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.wasm",
        "hash": "sha256-2yjk6zyiUDyBeEsYTCzWj+KzCvfjf9nDjLmWzFb2bzE="
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.wasm",
        "hash": "sha256-7cvVoYQgMQImrYmSIY6RGBxQcq3pR/ve+FaCVoqgydE="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.wasm",
        "hash": "sha256-qGnK7bSHmHnsM5v73KAWsias0WXlVTgRkbh6Blfzz6k="
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.wasm",
        "hash": "sha256-LtBto3yGuqrp+Njt5yMiYoYto+nQtCo2y2YJVHqRzYY="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.wasm",
        "hash": "sha256-cMnpjKzbg15om+Y8X+6Pq6sgiA0pCIBlIybYjjF8Tlc="
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.wasm",
        "hash": "sha256-acHAVccifVgjkzz/UXYMgcSSsLkC6rdIK18AboJX5Gk="
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.wasm",
        "hash": "sha256-WEPC4lqNOekCmORY7bolwYmMA2nW8F10MOIZPETe3xM="
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.wasm",
        "hash": "sha256-BzqG/giD2mV5bjkwcMgs/aM73qamyq6PlKhWAg3TapY="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.wasm",
        "hash": "sha256-t1SDKR/FXuHVkrW0rD/1sMQC9tOM+StJoZdyCQ4Pwpw="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.wasm",
        "hash": "sha256-20WJOsSAZZ6hm5RQNS2YidWYx8jV8eovZeDFRHUBBlc="
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.wasm",
        "hash": "sha256-bukh+rqDxJMLEAsACjqQ3LmQOjvikpU4DstHs9hkbjw="
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.wasm",
        "hash": "sha256-pNPb29OTmssYBaX9LDo+clFlgH7oiiIhJrJd13P5RHk="
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.wasm",
        "hash": "sha256-ubBgLSuRFUBaWm5cAwrVwDr7vRw5tnzrWSVnp/d7Of8="
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.wasm",
        "hash": "sha256-PvA+EtzoiCVOFMjMSMzC4AnU/VwcbKkZg4+09CbdO/A="
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.wasm",
        "hash": "sha256-suvMaQr81TwtLvzWdAlSuROfdA2d6GPDmMa8jGEzzc0="
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.wasm",
        "hash": "sha256-2JeSS7vySk7/Ni9E7FiTV5FXpAtal+uRjFkRSgcF2Mk="
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.wasm",
        "hash": "sha256-V6Y//2wcYi2zf+pQj2K0jGSG7YT9M7CoQUAbRO7C810="
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.wasm",
        "hash": "sha256-KJ3PIQ1USf2DlQtxLup8HLtOgVTFe9pZQ1Z5PXBpQWc="
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.wasm",
        "hash": "sha256-R7/CjdGgjC3nP7HEVkFGrDoomZI5ldCItORV5rSUxzQ="
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.wasm",
        "hash": "sha256-uNl987ZRqQ2dWPXEkPdUHGHOuMrSGGwmlgrYqPrkHv4="
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.wasm",
        "hash": "sha256-6BsW72orL4S7hfjoVEV0t03jo2X3QKj8pqW6x/EAyow="
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.wasm",
        "hash": "sha256-ThbDXYFwKmht16cMWPBrdH9qrPH1+QS7OU6MAOL8Slc="
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.wasm",
        "hash": "sha256-suIfDtId2wyHzpffNeUam3d5WnAiYckKI9mnQi4eqhE="
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.wasm",
        "hash": "sha256-T1dpe+4s/SjDJ/w4gB17LJZXTJ15l2XOcdtmWUV+XkQ="
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.wasm",
        "hash": "sha256-bSxTk24Le+PHZ4XvIpIJsLsDpLOkIwtO/v+YfgaMX5I="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.wasm",
        "hash": "sha256-jHDKsp4uTgv/QFdgMTJKYAod9SMkpdRf196V4AFDRQI="
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.wasm",
        "hash": "sha256-I23cLcuhiEVt3ymNZwhTSPwSv076X22E01DY2qwIyVo="
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.wasm",
        "hash": "sha256-K9ffth8eud/WyY0cSq6Em1MUxTU/+pLit+AjrAFP4Ng="
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.wasm",
        "hash": "sha256-CjtQI8/oyRM3JCLfF6JKR6ql2fMR/2SZlIRgxVDeZ+0="
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.wasm",
        "hash": "sha256-vKTBhE57D656SwUFeRy2ryAOYG//KOITnGPC3/d/pqY="
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.wasm",
        "hash": "sha256-ojpwUpuXTqHpY7HtX9c4569+f3axTA3c7Xa9Ggn3ml4="
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.wasm",
        "hash": "sha256-dJD9gqIAE3bEWH5+Z5p5YKfI8ftXd8ik/akPl9qRje0="
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.wasm",
        "hash": "sha256-6Mwurt7Z/qM2RAm1+NkjIUj5mn5BR45i4UJcCya63/Q="
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.wasm",
        "hash": "sha256-Elz5NVivQTkKqHIJNreeVbtXs/2KKCUtNFIQuq//uLk="
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.wasm",
        "hash": "sha256-mJEIPBuuXNX7EMVYlNFf/bkgXZ4YyNKcDScsIwY9goU="
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.wasm",
        "hash": "sha256-1YqB96PKOgkYkalUR3wQlu3uogdQeWH5xXEGCQNO4JY="
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.wasm",
        "hash": "sha256-pIIx6sGpg7lIMoD6XsSXh5e98RD4UR6PeGUU72JTulw="
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.wasm",
        "hash": "sha256-txldHQvXq5/AojGKBcj/np3Rd4hnjTP76a8Kk+HEdz4="
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.wasm",
        "hash": "sha256-v7ExXK3+fRhJriLrbgJ2Q/cNQtr/mXv13NM5Kjr6T1k="
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.wasm",
        "hash": "sha256-jCSXPSlhZWCMEYHmLF1W7N456nSgDlUnEsT9fE5EE9Q="
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.wasm",
        "hash": "sha256-ecW2cFor/WKYdKGEZvCFGfDCusU9NtLSYW7mJwiMcO8="
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.wasm",
        "hash": "sha256-lGT0V7htPr7m6SfkPw9iwweJxFdQcwv8xltr+sPCzL0="
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.wasm",
        "hash": "sha256-F17LlxWY1e1NnAHYhcVL9f5AE5Yh82YzUW8sYwuFs2w="
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.wasm",
        "hash": "sha256-TqQkSx+sVMYnvMmbKq69N1yKO5pwXIIe/bkMhUgtHVk="
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.wasm",
        "hash": "sha256-JLLsEKKgpcxE3qUIMRKSYr5jf6lYcBJ/yoTCecMl6Ps="
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.wasm",
        "hash": "sha256-htN378GjoT41MeTWs3nktLVLl5Dh021QOEzIDcnf4qE="
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.wasm",
        "hash": "sha256-mx0lZ6Lnd90bygi94MEHzoTQGPr7b1cInTdaAOneHiQ="
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.wasm",
        "hash": "sha256-/negGD8sNePBg0Kh+AHmzGqJBZcW5nAVi4y9rKaYLI4="
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.wasm",
        "hash": "sha256-iOD1MaLyysmn78ly0F04kwJdd2Pnwc9oz4CaUX63Hn8="
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.wasm",
        "hash": "sha256-tQYcNV5Kya71rWM2tbP+UCYvmwwbj5J10lSBXMChNmw="
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.wasm",
        "hash": "sha256-2J0+n3XQkmWVcjhUnygaQUkAWGsFrCGc4q8NwvBbqXI="
      },
      {
        "virtualPath": "System.IdentityModel.Tokens.Jwt.wasm",
        "name": "System.IdentityModel.Tokens.Jwt.wasm",
        "hash": "sha256-/C1Xfj/oYNZ53/q4/wod85g+hW3UR5nUrPocjyti+F8="
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.wasm",
        "hash": "sha256-460+wCtndATCs2lJFV80KBzZLZkyZbVPpQUZ8SXTW3U="
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.wasm",
        "hash": "sha256-ihpJxLRbuKEL7k+f5QqPULDqw1yT2PS8n1Bj7kz6iPM="
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.wasm",
        "hash": "sha256-GoizwKC+IoT0d/eDcQJqFYrA1h6AGU5t+YNaj6W50Cc="
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.wasm",
        "hash": "sha256-GKuL165Je6MAMPm82Xj2tGnUdoDWeqPpEQllj2IeM04="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.wasm",
        "hash": "sha256-IwCw5ws0vXDTYk/VhCGNLytATpyNtOw07Gowc6MWQqs="
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.wasm",
        "hash": "sha256-5VnLBsQ2uFhmAyGuKGIltXN/VNAG8iQuzS2hPYpnX2Y="
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.wasm",
        "hash": "sha256-syZ9OpqQElS3kprFS7ez+sweXRTTyMDwMxJR3w1YSFo="
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.wasm",
        "hash": "sha256-z01TQ7bJ7v70en+RgIE0OYdjKFomCXQTy9ArvMj2/wo="
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.wasm",
        "hash": "sha256-SpEOjh/Ac0APXxcoBHAMA41Iy7J+y9urLlYz34kRLpk="
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.wasm",
        "hash": "sha256-hGu5RH44Zx+KTFb2P7BhnD+korzXXOEa2xAYn1ruqR8="
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.wasm",
        "hash": "sha256-vnV7ogVECYzqn6DNevp7umiR3GGpqtTuhCfozuSFn0I="
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.wasm",
        "hash": "sha256-FR4qRWgc9Pne0NZW+GI+IIQKRQkiJOkShLqu/KvOnf0="
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.wasm",
        "hash": "sha256-UW2rIqrtKRzousZW2F5nBCaBBwvDX3PW6QyR+ovnBGg="
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.wasm",
        "hash": "sha256-T6A4jMSZ9r3DZ6mSyYFovM2dSQMkCeHXZK/M20FYf1o="
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.wasm",
        "hash": "sha256-gyc07ScBj9jCRpw2XXk6F0hxZ/9i5Ey1ZdiuWV1Gaw0="
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.wasm",
        "hash": "sha256-cgiRx3WwyCsvJcTLyXUVhxpSRtBUaghD2v7UqCZzB1A="
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.wasm",
        "hash": "sha256-BgjBIUJ6DDb/99Dx9CXebxnh9n+7qI3FpBXyqssGZgE="
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.wasm",
        "hash": "sha256-jUUcOnECTcVnuN1q8RlBgsk74CATFIjYm9/jVb5Pmes="
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.wasm",
        "hash": "sha256-vOFqT0Wd42jdsUKqT50aGm6vf1Bb+MOkmMRRXXWSb3o="
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.wasm",
        "hash": "sha256-wOAhxrXlPK+18C4vWHxJD16y6Wm/XE8wK/fEv85Tz3o="
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.wasm",
        "hash": "sha256-Hs5shsIqWQgN888mvNfOAVSeEwXFmcS2MidGSfnIKYU="
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.wasm",
        "hash": "sha256-GnbZuP+fILW8x81c+z5BuPA7vXj+sZ2K6N/OHyriWd8="
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.wasm",
        "hash": "sha256-pr48EhQZyKsR4Yww7EyLAux5YatHR3TOaZqcjo4bRvE="
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.wasm",
        "hash": "sha256-ZTVAReHozcyokPiMDZm3JTcLet4FEjLSFaHXAXlcJxA="
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.wasm",
        "hash": "sha256-EatXDAg7M1/oNrXVRxADRX1umYaD0Ihv2d9oOfR1jHs="
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.wasm",
        "hash": "sha256-7wxmC7eXxO4EieYuLrSQYZziHcxo/xKIJQOmiceIxfs="
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.wasm",
        "hash": "sha256-tpcjjFLFgRY7xo1kiy8ejkhw0qxi77w3APs6mlWtLqk="
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.wasm",
        "hash": "sha256-NFt8YebdKg/ke5VXqbgfQIdJh1zLaPQUbVowAI623Xs="
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.wasm",
        "hash": "sha256-fy2zswxHhWkN5JIq65ws6Qt96lZ1RdlFkSzYNDou3Bo="
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.wasm",
        "hash": "sha256-HEWG/2E5ebhHNJ5Ad+jEBU256AfSHsS4z/XyXcAYroM="
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.wasm",
        "hash": "sha256-2YW3+Ct/XDlJA/KLt1IfaSX2UekWGcLeUi4JyL/gYGA="
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.wasm",
        "hash": "sha256-PaoT/f5PzENctAnsr8UG1Y0rDc0kAtp4n+xu4DuZwEI="
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.wasm",
        "hash": "sha256-freYMpeef6fU1YwB5Jglh1z2VW39fnR4ASw0GGeZN6M="
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.wasm",
        "hash": "sha256-fAE93ivkuWSanEyhGTCzaRKbRHjJDHJAn/b9febuou4="
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.wasm",
        "hash": "sha256-fBwEivu+tREeIOJJmshSOZnHp/dOB4WsHMIEwMimVow="
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.wasm",
        "hash": "sha256-sV6u/TxyELC+pefCtqUuOiMjWavK9Wv7zFj7SvXFtMc="
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.wasm",
        "hash": "sha256-hkAJZB6/FqE4iC1hL8PsW29/Z7wM+UdzCzXwAIoITKU="
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.wasm",
        "hash": "sha256-ZzFoFBSDyBMMAcgUNkA0SvrpGTWQayc5f2vOmiEEhpc="
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.wasm",
        "hash": "sha256-0ZjzHTuQl4xNIQAlXxWWCvxRzlolPb7u+GFwzQ37G9I="
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.wasm",
        "hash": "sha256-V6fZEVLpoWvKFFb9k7n1fSoWeMKRy1my85j6HUx51vE="
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.wasm",
        "hash": "sha256-/ct9T1oknQ3TDYfyiiDL+9M6nTOyN8KPXJ8VpjFi7Hs="
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.wasm",
        "hash": "sha256-GFbjPmfUkKwpDwoSo9ocRkSh+/Lze35e0T+yPmWEyx8="
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.wasm",
        "hash": "sha256-xlo4EopKiJbCMIr7Ey8K24ejIsDD059Ics/6+LnkdE0="
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.wasm",
        "hash": "sha256-tkn4hXlvusBhdfgSoIMY9M/2anUDJfzvpR7WD6+6PJg="
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.wasm",
        "hash": "sha256-NsDhbh1gHJDilgdQ9KpCsPb0zdCcyFKOhYEIe92VmWU="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.wasm",
        "hash": "sha256-8DiTWZHty5ftLwVrAvKk0+GaUaLeO/8OP0y0FEdbz9I="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.wasm",
        "hash": "sha256-ffeGQ9X3EiKFBY9545TUOrXv2lRNMavkaV6tjRibnWk="
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.wasm",
        "hash": "sha256-nEqy3SDjwxJIx1/rXq9mergvJSepcbYmzebg0MkQ8tI="
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.wasm",
        "hash": "sha256-WhhJZvBneqWPPYoKMR8ha72pZoAcs5+yOtQIuGSiID8="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "hash": "sha256-+tM4fUk6FgdYImRDUDvdxjS/CUY/KCGp3XDgydp7Jrg="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.wasm",
        "hash": "sha256-E7bKIok3I980HYP5oLgMfjp0yBUe1L0TZoijyIyU7sU="
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.wasm",
        "hash": "sha256-Z5srRWKzoQes8PQtTy59YmPNEicp3WvO31NsaQ1FJM0="
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.wasm",
        "hash": "sha256-6s0efDI0D7X/cNiXHK/IYmhMXseRR5Fpv2sPg2RtGZE="
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.wasm",
        "hash": "sha256-A9B/M7AgOfeb0ct087rT54CcYNmsbVX1ovJAndAUFeQ="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.wasm",
        "hash": "sha256-jsp4j3r2X/XMf+mMljsoiOjIQWuTdj02nXXCeZMtGFQ="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.wasm",
        "hash": "sha256-9v8mFscX6z6vnrieUVCJ31ksJkifdR1q22q7aRbr1hQ="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.wasm",
        "hash": "sha256-2QBvhM0jyjlzooTbY7xLNUlJgnLl6U453pK42aXw4sY="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.wasm",
        "hash": "sha256-KikViZm9CG9Vk2kIgv7TCzq0GXJZqJTDktf2vzS6NpY="
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.wasm",
        "hash": "sha256-FTH8XiASRvFRvRKOFcoGFbrQ42aHN4k1zaiHsukWCeg="
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.wasm",
        "hash": "sha256-601Jnf7DZ40RKeHmKkvIGdzLOUsFL4Sq8e+gfq7EJNA="
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.wasm",
        "hash": "sha256-JKEARLSCJVwW2HJn16iNVeHoDUcJQKzqYasnkdjsj4I="
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.wasm",
        "hash": "sha256-D/n8VHRRAlwIODqBph+Pf63IjbR8xzlDfYLawlNjFNk="
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.wasm",
        "hash": "sha256-PuRVO47I3VP6idl03BBl2UGUNVi3QoXkRZI/3+AXezM="
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.wasm",
        "hash": "sha256-RZke8z4EQL8SimK31P7x56viyOy8pc/tN3A4soyFaXE="
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.wasm",
        "hash": "sha256-TkPFLo0OiEDjC7H9E2H8wlPHxZnEKSIl8XGCvovrp+w="
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.wasm",
        "hash": "sha256-JKweSKt1M01rh4E2jHLBWuBm2p+iFp8sGFDiarq13OE="
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.wasm",
        "hash": "sha256-ER1jBJE4hLtydKSDnep5OKeUIpY/VWiViGZPRHO7zPo="
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.wasm",
        "hash": "sha256-+zwMb/5gF/oM+U0k/lHsnzsIcU5y53QRPRDvfVjCPg4="
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.wasm",
        "hash": "sha256-TzLEcHu0G8ee8WaRVPDzF9idjwX/VjK57tTmD7vCWK4="
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.wasm",
        "hash": "sha256-uDO0TrlPdRJH1Rige/hapBrPyjPP3VJAfEGkKM83c4c="
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.wasm",
        "hash": "sha256-xstQWLdtjFcT+vb847HZ4eVu1TfjZwmMVcivqsBIN50="
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.wasm",
        "hash": "sha256-2na9RztTgjHAh6E1RpP7PHlgqyH5qhQjdYSlDHe0/v8="
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.wasm",
        "hash": "sha256-ZON5ZhKMPOqX9XA5c9enHhkH5wns3NBrp31X2GOiB8g="
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.wasm",
        "hash": "sha256-k/Bopmf7AxV/rJPB6zJ1U2bq4p4QbX2v1TYZ7ebbPYQ="
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.wasm",
        "hash": "sha256-QEqW6+0GDJAeAm1J/tL8f+jhjQDA0Go01q7DaBxeuxU="
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.wasm",
        "hash": "sha256-DLmaXOUnj8gmVPzOl8yHlQVaBrlrDkb5L+rqN/e9GFs="
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.wasm",
        "hash": "sha256-SA6QjxDYIhhxl5e8YR8bbaGOxfEhtdTzFvPjgV83KnU="
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.wasm",
        "hash": "sha256-k9yqPh57nhwvq8fNxhOxfX5pbdyQwQOoTJLiby1aATQ="
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.wasm",
        "hash": "sha256-bKfFdtAfGy6c3aMrNCbobEz7dEuFMoLkf6k0QM4Bf1o="
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.wasm",
        "hash": "sha256-9rMn6NPjMiBzmGh8/h/Bz45K4koS97O1vZ7Z0QUtZZE="
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.wasm",
        "hash": "sha256-MfOpQrXkc2OrR+whoH8eAuDmtGoB69B0llh5AOlh2Pg="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.wasm",
        "hash": "sha256-owL5cUGn1SH0f+nWMT2v3uW8EsLqrgXlLGLDAWa5MLI="
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.wasm",
        "hash": "sha256-2aD/r5N2hpi6wcFOdC1UiwrgyMKeqkB63qhWe+yBFPc="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.wasm",
        "hash": "sha256-mZPmiN9jNosXwdGgQ1Rl/tdXuAISwUyoGZi/hZZb8IU="
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.wasm",
        "hash": "sha256-FgfhxREFUtvdC/60lhXZgM/E1+O6BWIwaP9cOlop6wE="
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.wasm",
        "hash": "sha256-VWvw17EgRCgCqxr/5GP/7gMaGz6BiD7plcJzEhRi9HM="
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.wasm",
        "hash": "sha256-K4mb+zcfBo1RdZw9hVnMlmn+V25Z9wCRuZ9t0E6gzPI="
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.wasm",
        "hash": "sha256-WUpWT0kUUaiAtahsdlMpiv3C3tFVncRE+KdEfHWl5Xk="
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.wasm",
        "hash": "sha256-aXIoETHOA/noVMD/XhGHAl3JDeyWBL9HBeC1P6Oie3I="
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.wasm",
        "hash": "sha256-grDZAlJNpdditU+aDQzAtjYyHtNj2BId+pSAzESSEl4="
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.wasm",
        "hash": "sha256-/+bVv9uy1YnJqmEs7/k/MHW+MdvugaOvuSZiXrZcLFU="
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.wasm",
        "hash": "sha256-atwtrp76mgREzQqxukT2JdtvAlJtK+CH3ufJ+YzAd5U="
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.wasm",
        "hash": "sha256-z41Xjc4bHfEDpJAhieRobcm1Xno3XylUl7E2F1RzJ00="
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.wasm",
        "hash": "sha256-NOGaCVdktjeU4GNBRctFphvR2eaIvcFOusevjMbEzC4="
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.wasm",
        "hash": "sha256-z/omVAVC0GL2bp0b01MADAClMOFzwJJ5H3eiRi8d1nM="
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.wasm",
        "hash": "sha256-7hMdJQvHwUoKSb/sWRyZXydXUfq88NRbpuiuBT/5K64="
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.wasm",
        "hash": "sha256-ZVDuJFhcLs2jfcIA/w8nv9EhZkBJit3oVr+BR4BHbNA="
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.wasm",
        "hash": "sha256-c75CdCuK+BJBsdOPgohc65I6jIm3deFlS43lIotMimk="
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.wasm",
        "hash": "sha256-jMxEWiikPGKAPdYUrf0Grj+8YCC8xG/WAMtbOP4i7DI="
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.wasm",
        "hash": "sha256-5Z30bO02sZNciGoFtCslbZ1Vi96Oe7dlaESKKsqcRVE="
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.wasm",
        "hash": "sha256-MK4uPQz5EVSwxiUXIdP91BnfN5ojacqiI5GA86yRqdI="
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.wasm",
        "hash": "sha256-u4HyIU3do27l2nuCH4BsMjPAieGdPZB4MuubpjiI8i4="
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.wasm",
        "hash": "sha256-n74w3KwVjDzCs/RdWqgWNFY1/3SuN+6D8tnxr2iJQcI="
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.wasm",
        "hash": "sha256-59IVg9VsmB6FlTaqROrZNGLamzmFW8NPpACsnkBLh9A="
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.wasm",
        "hash": "sha256-HcNqaSyulOmhCG7YnOxxRTQuR0fW6uDkhmhEMw2r7o8="
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.wasm",
        "hash": "sha256-dVaYRI14iA8Dxkphyl7xskC8c7e37Il91eANt8NE83A="
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.wasm",
        "hash": "sha256-bkIp85FjNUVd7Wb4w8TNkm8vQZoT+dsl4GCwLC6hjVE="
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.wasm",
        "hash": "sha256-jV9J/Iu4smJpxqdL9JO2DeMV89EokbdfhXEBpDikuHE="
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.wasm",
        "hash": "sha256-SNWvbN9fZZMmIEcPCb0mvPSQdT88ZaeRi9BEDoMQPN4="
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.wasm",
        "hash": "sha256-DoroG7ocOSqjp5a0dFSQ2CBexP5UL6dYLbgEblFYMRw="
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.wasm",
        "hash": "sha256-DKbQ1XCUoVlDqDBwtLDzebj3HHSaXnZrJeofFxJ/uyE="
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.wasm",
        "hash": "sha256-g4P8jeQxySC/JceIpYQYuU6Hv+Vlw6QG8VspPBa8fU4="
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.wasm",
        "hash": "sha256-QZ5/Y+ezLvH8iwfmMJj2N3vLM7s/xDh5yEqepvTPRPE="
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.wasm",
        "hash": "sha256-SvqyxvD4F1LMOk45HiQ1ZMYR07zYGfKMaw2p6taAiHs="
      }
    ]
  },
  "debugLevel": 0,
  "appsettings": [
    "../appsettings.Development.json",
    "../appsettings.Production.json",
    "../appsettings.json"
  ],
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Reflection.NullabilityInfoContext.IsSupported": true,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
