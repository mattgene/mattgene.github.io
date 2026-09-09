//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"95017c711e6afc1085133d440e42b4bd78155701",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "BVRWeb.SiteWork",
  "resources": {
    "hash": "sha256-+ztXR+5RDbEde6+H5Hcz/mklfGhWZg0MN/nLT2BH+Wg=",
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
        "hash": "sha256-+v+9FkwOtG4Rj7EFvL0IE4tJAgp4GLUuK8itmcTM7g0="
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
        "hash": "sha256-gzDngaKE1fzrenrnFvi+7MHiHJEUQn0brQD1g3Q+hFI="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.wasm",
        "hash": "sha256-uQsOh1GEq2ZX0sXBxXnyoYzNMf4yeXUeLKUgb1q0fKo="
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
        "hash": "sha256-p0mSEOXp+A69/ObXX+4tK6ZoeHFKUHPuHB4hs5dekQ4="
      },
      {
        "virtualPath": "BVRWeb.SiteWork.wasm",
        "name": "BVRWeb.SiteWork.wasm",
        "hash": "sha256-t2eMyOnVsyIMON1gf6Uszoi6bWyGvtrj+1R7TTXwU8I="
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
        "hash": "sha256-X6T/B2hLfscTRV8R+udP1isYQ3QedoqGTYRoezLWLNQ="
      },
      {
        "virtualPath": "MessagePack.wasm",
        "name": "MessagePack.wasm",
        "hash": "sha256-k45a7exscPJaoUW1Fx1mGY9Bc6RbRGTIrAfNE1gpQSA="
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
        "hash": "sha256-jG9J70J7TtOrMBWM7jjeQAS39juTl4bJpRXGN6fhQlg="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Components.Authorization.wasm",
        "hash": "sha256-Omdw4NwV1hjADd5HTLnYGTjwVLA/MywMze/2UBwedrc="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.wasm",
        "hash": "sha256-JvMWXAOhDPo+zB8yHSWOEHEeT9/fcwZCQDwAxCPHXlg="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.wasm",
        "hash": "sha256-HmTn6qpK4NWMdGwHU6HJ/nunn6y5o3uCm5V7+7M0480="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.Authentication.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.Authentication.wasm",
        "hash": "sha256-JV1J/vXK3/EFp85sCSdY1OgLYuH9svLezS5C0AMDeFc="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "hash": "sha256-CH3a6skUDM+VD0EXPna4MFUS+MAICki7cC71hQWVQhQ="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.wasm",
        "hash": "sha256-LM04i1jy+LgVHqU5bGAbOGfq3sokEYpY33rzzuaadlw="
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
        "hash": "sha256-dJZQlLCWV8HxVn+VLwiM3zh+2v2/BoHWNtaWvNqMdS8="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.WebUtilities.wasm",
        "name": "Microsoft.AspNetCore.WebUtilities.wasm",
        "hash": "sha256-VQM0rTyQ42zNsi2Mfz/XlOZsi4F4HQ5RrZnGIJaRhjI="
      },
      {
        "virtualPath": "Microsoft.Bcl.Cryptography.wasm",
        "name": "Microsoft.Bcl.Cryptography.wasm",
        "hash": "sha256-p2hOZdP04ox2bhy6/B/+fGJDWwWmx+S0Zgr8fTCeZgc="
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.wasm",
        "hash": "sha256-psMoxmxraX+UqMuR6yuCJ2c/xLT3w20OO1JzVzNJ8qQ="
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
        "hash": "sha256-Wtkv6KZJ6c4+tzKrdRIJ2f3EhIakYPDfAn2Rj04zHR0="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.wasm",
        "hash": "sha256-bwcA9NPW/7dv3k+Mr4N+gcZdNUYUtuUj3+O8YHwkbMc="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "hash": "sha256-+UDJGDD1aV0uVsFf4YjM9MH7I+tb9CFJD1YfH0g3Wrc="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.wasm",
        "hash": "sha256-/pcKpSD6mBNjNREATQAkUv3Zf4H3LyuzGTLN4s679vs="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.wasm",
        "hash": "sha256-+o/D7fr2KXPZyZmjiCQLWPHVEh/oiumh8cIcUUlXN4U="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "hash": "sha256-27EFRDR3xbRa0nWlwVoIj7DmFf0h6tMjjYcNWEjPkNM="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.wasm",
        "hash": "sha256-RPtn6pkmjQgSJvC2r9Gf9YPVYplQr2s1x/1CuqngAo0="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyModel.wasm",
        "name": "Microsoft.Extensions.DependencyModel.wasm",
        "hash": "sha256-AXhoj5J5gu6L1Ho8kPVeOST1DbzvkjqDfmuBrQVhZVM="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "hash": "sha256-UGy6L0YpW2Jk6nCcbqyaTZ10KREZolKUCPnZP73JBSc="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.wasm",
        "hash": "sha256-UhSR/+KrqvW8cRihNiuuZKZub5H7Bi6Uu5hn74ct0ok="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "hash": "sha256-K+bL2FtukXzpFJCa3zncXjGqgfdxO9pnlf2wde9g3UQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "hash": "sha256-NN9DfS/PNCg9pw+/XvOTZ7d3DxETLJ3DiLjZ2kOmL+0="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "hash": "sha256-Qz96yGM90nRLDI1XCXF6mre4CdDEiJLgnGOrszdMH2s="
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "hash": "sha256-aNb/fEY3laCkq3MVPJn/8u4nEDmL0cilWcVA+t9NGSE="
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.wasm",
        "name": "Microsoft.Extensions.Http.wasm",
        "hash": "sha256-L2vsebXa777bq3nKACOTRcm9kL5TJ4wupmVHinB4RkU="
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
        "hash": "sha256-8grIRMMlBKEKAmoTlVDM1GNP0SIWIFWIJHeqfc6fel4="
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.wasm",
        "hash": "sha256-L2P/tLhZ6FSR1KG27vIE/jer8JBjOAPRMf7D9eFEUNs="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "hash": "sha256-ij5nuTCdqyB4gAlMGyLXxnmohZYnn3SC233Zqd40tYU="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.wasm",
        "hash": "sha256-1FHSWAgdUAeGtFFXIYqElWp8gy2mikQNMtTN8+/oo30="
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.wasm",
        "name": "Microsoft.Extensions.ObjectPool.wasm",
        "hash": "sha256-EYv4WgG4xV6cTOipWqdLbUzWXGqStEcSUobakoWU0f8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "hash": "sha256-+No81T5HXezhQaZ4c1145qD3lvRa4r9Q3FWXw6ZfgAg="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.wasm",
        "hash": "sha256-6ULG5niYM+MHArol/TOSkMbfxTc7D5jKcorcHt/RPo0="
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.wasm",
        "hash": "sha256-ixdbQi4Qj2Bd8xbpEM/764LZNO1roqKfS/hVzZiePNc="
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.wasm",
        "hash": "sha256-TPHp2vON5qjVdsb6ZuDh0rxu/FCFbB3r2IMcQHThpfo="
      },
      {
        "virtualPath": "Microsoft.Extensions.WebEncoders.wasm",
        "name": "Microsoft.Extensions.WebEncoders.wasm",
        "hash": "sha256-a5cONIoRz1DZ7wOayrQN13v0jyRJtn2tHDBBFwPmMdo="
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Abstractions.wasm",
        "name": "Microsoft.IdentityModel.Abstractions.wasm",
        "hash": "sha256-3OHg1TquEjX0uM5J39aPp9I98xNPVr1IcKE7S/1p6hk="
      },
      {
        "virtualPath": "Microsoft.IdentityModel.JsonWebTokens.wasm",
        "name": "Microsoft.IdentityModel.JsonWebTokens.wasm",
        "hash": "sha256-jqaLmmalKKsniR4+YwqX4ceoTFCFRihFXf/4F/I6l8U="
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Logging.wasm",
        "name": "Microsoft.IdentityModel.Logging.wasm",
        "hash": "sha256-qsHi0NAd7QMxXl3gChFEbb1VJtmeYl0o5L2NNr9Vrjk="
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Tokens.wasm",
        "name": "Microsoft.IdentityModel.Tokens.wasm",
        "hash": "sha256-Kgi3YaiXPzk8R1mP3AFm/5razoRnfwsOCYfl4uhetFA="
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.wasm",
        "hash": "sha256-tLy3qNrIC+jAb4i4SjHRuKzQlxxUQCDHYV6b4oUjEV4="
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.wasm",
        "hash": "sha256-SZIr25HLqaeri9f5UuJpYtWWdLH4iSpFr5RmCLj3CAI="
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
        "hash": "sha256-veBhGyorrzdMHfiRDt/VovNG125rLLrL7enX5fvvfnE="
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.wasm",
        "hash": "sha256-+AZA2Jpi7YedyPg/Z7OAvV4jcPpueAU4ylSeRvJDt80="
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.wasm",
        "hash": "sha256-UxlTjVzD23T3TLHwBAoQkPNd2pcDDBI/aV05iU6Dxwo="
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.wasm",
        "hash": "sha256-Y+jj+a+2gTHHiYlyKc94wEH41wg3Vjrdd9KSP0crV6g="
      },
      {
        "virtualPath": "MudBlazor.wasm",
        "name": "MudBlazor.wasm",
        "hash": "sha256-RqqeCWPHz63i7I+grWbvepTrT1lkq2o2HjYoKCgtDEw="
      },
      {
        "virtualPath": "SQLitePCLRaw.batteries_v2.wasm",
        "name": "SQLitePCLRaw.batteries_v2.wasm",
        "hash": "sha256-zqb0XfIcpLE7wD/V0sk85BlK+8q2Y5uh2yZ0KQHf8IU="
      },
      {
        "virtualPath": "SQLitePCLRaw.core.wasm",
        "name": "SQLitePCLRaw.core.wasm",
        "hash": "sha256-nhftByjSLKSn2xGY8gIGZ7uyHG8WAEHjwQ5nzOEmm9k="
      },
      {
        "virtualPath": "SQLitePCLRaw.provider.e_sqlite3.wasm",
        "name": "SQLitePCLRaw.provider.e_sqlite3.wasm",
        "hash": "sha256-k7tF/kArx+XbIhnXj3jZJkKWejTShHUjd991yxukeFw="
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
        "hash": "sha256-M1WENJWA+3wr2NvHhLXh44JWWE4VVZag928GiVWbXG0="
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.wasm",
        "hash": "sha256-QtI7D2XiD7NyCRDNW7Q5jPY5RrljqkJWOofJWLBpLOo="
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.wasm",
        "hash": "sha256-60VYOK8iVcWICnieMcztr96fSxmXaDwHYglhHVkfcWI="
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.wasm",
        "hash": "sha256-lWe3YUN/Fc5uruvGWP/m8qaunD50OIQZlIigCznydZc="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.wasm",
        "hash": "sha256-PH4kaa45WLnMxiRfMTzKCQ9u42dAwwdy99kptJLonnA="
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.wasm",
        "hash": "sha256-g9RG+K+iaKmrK6vAd+/MRgz68IbHHpSlRyOFIY27sUI="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.wasm",
        "hash": "sha256-nQNshHg3oKyRQXw5zLw1fEm4B4SQKVyeH2F66wBEe3o="
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.wasm",
        "hash": "sha256-WuI5nXRLzegBvcDXd12p9roPYpi8jofCeEJ6v8s63+E="
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.wasm",
        "hash": "sha256-40rhAIB8j+yJ1YvnDmQ2rPIVWKNJO6UHLv/U4oSxlBI="
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.wasm",
        "hash": "sha256-Oy0URE8zV5ayhb45ITWZbEnl6sGM9LatkYgbeAURRKM="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.wasm",
        "hash": "sha256-W9/zGt2iJxheWHJRApI7G7Z0ckE5RfuWUz4Nnwxgbq4="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.wasm",
        "hash": "sha256-QfHpIsM6pT5gYELaVBtPojDrl0GNwck46q4Mu933WCo="
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.wasm",
        "hash": "sha256-aYhTsxu5l5DdQMIprD4ShbtwjTiJBH78I6wMQzBRnys="
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.wasm",
        "hash": "sha256-l2Yo9KFaXkgXpXguTZdnuTCytOYuPLjF8cZT0HHWwlg="
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.wasm",
        "hash": "sha256-XKTYAvVqGguN3HteeYxjDwZqlFcFmIfpLOjNVjwXSNE="
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.wasm",
        "hash": "sha256-0C1e8tZ9+pmcU1MPfcf8D7NNcmR2pH8LdxsDMYrVHG0="
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.wasm",
        "hash": "sha256-bO/LPpxha6hSooSI6P+lazCSxTKXav6d+SSGI5xKoF8="
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.wasm",
        "hash": "sha256-QXrN9ZMMpWZeFTBu6yZlaw5lYx1+tUxEjhfaNEdHG4o="
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.wasm",
        "hash": "sha256-ITg6VN5fCPuyFKC9ug/0vqXRoagnjGYhWj10y5heiTU="
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.wasm",
        "hash": "sha256-6+8hQYc91I+/Kqc5U6zCuNw2ConQevD1fmEvhSZFfoc="
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.wasm",
        "hash": "sha256-kpDQTiMcfbO9nP5Mja6gzL4XTOp/9ixE1CD739WQlMo="
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.wasm",
        "hash": "sha256-HlxtCU+2k1YAqiabFqu5jOoUbMyV2ZEjNNlUEs/57NM="
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.wasm",
        "hash": "sha256-vZsGhIqd6ATctrY/LP4iZy0cDa+gN+Vzk8mA9ecl4as="
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.wasm",
        "hash": "sha256-QE2oJ8DjLG05OdC+fLmt+YhFiUEOSwyowwQ25oZCvTw="
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.wasm",
        "hash": "sha256-+Wsf/lB7CDI+7OUXetsTyE+lo4TYc/SAS1aMv1yniNM="
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.wasm",
        "hash": "sha256-emPIv5g8xFmDr7oIZhZM/DTWGrb2Lggg7c+fjA99i5c="
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.wasm",
        "hash": "sha256-2yLIVwYrPkQWk0Vxh+qS+KxNElAj+Z4UTmjJNv8uYNk="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.wasm",
        "hash": "sha256-AiYhBtmkwpOLWooLU6+KmJ0ySg6RY/ihjlCDgwQAT8E="
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.wasm",
        "hash": "sha256-S7GiSac0VcsB7GLrukNOyOx3UkyChvLMWC5lQW1nj0Q="
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.wasm",
        "hash": "sha256-CiSvrtqNxb5mKdwQ7obhnTRpcvSS1e31SMHq2s6nrUc="
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.wasm",
        "hash": "sha256-OG93onlStdjfWzcLq3GSd7p2posHrpoBAptujpzu/ks="
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.wasm",
        "hash": "sha256-yL5qlZRpb8jHMNsapIzA7qNxs9DZvvAJx3/hCobHnpM="
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.wasm",
        "hash": "sha256-EYyyGznhWECmsc5FFdH6k26PlZIvsOFYMbRyQHlFCas="
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.wasm",
        "hash": "sha256-rcCcYOlxhVRG07eBm/7U2xhPK/cimbMV9phmtLI+B3o="
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.wasm",
        "hash": "sha256-gb8ndHQ5edkgeIuuwJAZmpSvDSqmmSPYJbBgTzel/ps="
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.wasm",
        "hash": "sha256-vZkkaKr0ImZEgmnHPzo/msMMeEJQCqxSo2mTbfOzRzw="
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.wasm",
        "hash": "sha256-xiEtuDrnECbsdmpAPAp2VzmtL1v4IfFyExR96Fud89Y="
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.wasm",
        "hash": "sha256-643QZL7ILdpDBnNsv23Zi0Cyzz5SoTjI9wGguHqusmM="
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.wasm",
        "hash": "sha256-aOwoN3Ibisa2gVhxzBpktC2L4SEDgvRphJChLSaTA+Q="
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.wasm",
        "hash": "sha256-k7XPfNshrfMVIgaiuvKd377GtI7UYYnjDqJZyUkj+jc="
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.wasm",
        "hash": "sha256-Hpsq0zZpxCksmebhGlgCLpBfZlw6fRJn/pZ/QIvF8YQ="
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.wasm",
        "hash": "sha256-GjwWqllU9odjGWVpAjmupGx8/yiy5lsN2Not1a1soGg="
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.wasm",
        "hash": "sha256-/ojn2l2CNWusI2atVrRd8dbi7k4BARzLTJjRH6YgotM="
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.wasm",
        "hash": "sha256-H8W0uho5WxWoH8hgJZEmNbdPpPYUgD8xkWHRSKx7MMc="
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.wasm",
        "hash": "sha256-ucYunghHF7vLfVmQGmCY6aJsB2Kx9YKcaLYiWtXTNlY="
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.wasm",
        "hash": "sha256-YA3yQ7lL5H0WBYDoElU5ZeVKxPgfltC+tweV2Ybbn/A="
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.wasm",
        "hash": "sha256-pxoMRl5qWZqgJSQnJ8mOHEcxOyZYWmM2Mr5oYUy+Glo="
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.wasm",
        "hash": "sha256-WZLsRujfD/qa85HQq+jH/mNvqaSC8EfcorhN7V+E+I8="
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.wasm",
        "hash": "sha256-TDz5qGlXb4ZW8yA27qUZMYc8j1MMcr9och2a7PScXg4="
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.wasm",
        "hash": "sha256-KsyFANWIAfdArrjBnJnX3LWpJAMzXAJi29tm3Kb5mgw="
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.wasm",
        "hash": "sha256-OVQT1MG8JbyAXuZTrGXlrR+u0SL2S/0PT6accLkQu54="
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.wasm",
        "hash": "sha256-yHbYTenL8GXOuqqmxkdwREWeOUezLPi2eCSzn979C+k="
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.wasm",
        "hash": "sha256-8KAD71Rcb1edG/x+Cx4wUA8/0cmGUGSciPma6jeXLXo="
      },
      {
        "virtualPath": "System.IdentityModel.Tokens.Jwt.wasm",
        "name": "System.IdentityModel.Tokens.Jwt.wasm",
        "hash": "sha256-Klrs4wB6DFVET+0ctwf1+6J+tlc/yNfCdpxc+609u/I="
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.wasm",
        "hash": "sha256-mSgezbBarV5SBEY+t7LObP5nQ3XgEVF6R5qAhQY90so="
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.wasm",
        "hash": "sha256-yUg/PQ8henAChE7w0Fuf2GVEpweY2df9f20ChCg2GME="
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.wasm",
        "hash": "sha256-Eggt4fURp1Dc3UevhKbp4Lj9fjdjlc8/jGqM2ifdzIs="
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.wasm",
        "hash": "sha256-+OubGWG+/zfH+Fs0lXunuGpq8wzuc4YXIfJU2fHdzDA="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.wasm",
        "hash": "sha256-4ROqweguD0hFn3XZ2XC+JKzncsxZNBiX2yeKPuQs9bM="
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.wasm",
        "hash": "sha256-cV8BYmP+pMPC5iDRi3x21fsgc2dUObz+vFs7usZY2js="
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.wasm",
        "hash": "sha256-SFmib3glSdfRTQZAtBg0AFgrNS9J3dUgpsDmt9X9vJE="
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.wasm",
        "hash": "sha256-5EKrlM9SabAClzp0n57qTFE2eaLB+jP0/z1nRz/iwQk="
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.wasm",
        "hash": "sha256-MOeibcHl0sx5SEqNQHQhRZOR598ACQUcNnX/FVecteo="
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.wasm",
        "hash": "sha256-zNeqttiCsELKrGrpy/T5NQKxD09jocn8hXJv3BcfKo4="
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.wasm",
        "hash": "sha256-ul/5prZbC0vGrIt6UESE+4lpJo/wXYgWcu+1+gAgc5k="
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.wasm",
        "hash": "sha256-+WqoHrz7stgVcQGbtpi7jQqel4rJ2hx2SF0HJokwHa8="
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.wasm",
        "hash": "sha256-5nvH8j0VIm/1nMN1+lVTI54Ri8D5ntm30A2fhB0hc/Q="
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.wasm",
        "hash": "sha256-zhN/oiyikQbwjunDNbYt4XbUn3w/DgR7jOA8zD1phRA="
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.wasm",
        "hash": "sha256-NQhcYyf0Hr4tfihcptLj6kjDKjbD3nIU6f7VUfP+jXk="
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.wasm",
        "hash": "sha256-UdJOWmu1xm90dNiv+WiZLNoDnNaUDC8SByJPZAY/fSM="
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.wasm",
        "hash": "sha256-YMvWX7YyMp6BsYKuNwDVWeeq0qr6S82HoFuZJ08E3DY="
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.wasm",
        "hash": "sha256-qGmAP22IUTQuqxOQHHoMv2/ULrRmNDq/8/wmKKhaui0="
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.wasm",
        "hash": "sha256-/STSB/pmoEd7eBP1ewThAYMeJGveTDOrKftoV06TyiI="
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.wasm",
        "hash": "sha256-vZEy2LgIvPJwM0p6XiZJMoT5fvBlV6yhrIf0ZiUU2Ok="
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.wasm",
        "hash": "sha256-SAuUMWKRzK2wStVZ46JGxoZNUEPdH9QiUK2Psd4LYcc="
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.wasm",
        "hash": "sha256-ay8HWX3V52s3fo/zr8I3p76ZOdAuY0ecre1U2TCwOVI="
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.wasm",
        "hash": "sha256-kKO3TH8HsBXfC92Sy938oIV1HdKMS0uVpztIaUDDeU4="
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.wasm",
        "hash": "sha256-M2xvJviBA3wTLi4RJU+payoXVPiEryPgwyydiLJ04WA="
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.wasm",
        "hash": "sha256-/qUjzqNF74n5FiEQpOww2wGmAOT57HohJWFc6N/CtJc="
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.wasm",
        "hash": "sha256-bE5JhulvXs+VFtgIW1IMKhELHc5gUDe0EPzNiDtoZpE="
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.wasm",
        "hash": "sha256-cK8cVJbRJLyKnySzrxM3O/YJXg8JlRarWMJAYxG2QcU="
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.wasm",
        "hash": "sha256-g5p6oqfQl2OUj/Or3JJiTCnkMEiv5Yl6r3Aki08Xdvc="
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.wasm",
        "hash": "sha256-aP1cHdnCvYP1drrICHt/oMYUqSOQVVVlW5fxAzhNYuE="
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.wasm",
        "hash": "sha256-6jmrkfhbtGkAs8F0pAMzP0ymubYGNI7n7a1J2xY4y98="
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.wasm",
        "hash": "sha256-atgB1gY60K6/ntpQXNN8jsGpnw185Y8zBq6WNNt5LKg="
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.wasm",
        "hash": "sha256-beNcumb5VoNQYWiR9bxGCuUPTD15NSD6EqARdh9HU/Y="
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.wasm",
        "hash": "sha256-i9KhUrIpGVyhMpgL4GV/JczYp4NdDf+o18PilPlm48E="
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.wasm",
        "hash": "sha256-W9+0UBxtz0EvZ9xgkmng+tHOhXWW2GBKdjcZAVbc6YE="
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.wasm",
        "hash": "sha256-yfOooDyPto0Lng17CwgJ55NXqhWz+t9SfhiGJeT79HY="
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.wasm",
        "hash": "sha256-MwR9j/suPuezXSGdbNPU23VHe5GIBf6R9Bs1p9BtP3k="
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.wasm",
        "hash": "sha256-JZK/huZ9doWYIPv0yzev1wYuhUXAIQrxo2NCyu7A1OA="
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.wasm",
        "hash": "sha256-/xKkpAsqwNQ8soTda97aUed6al1D9dGTdTA2lRvrLxM="
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.wasm",
        "hash": "sha256-tc7STzUxi0O+S8ivukRXeP7SVKVDwsqSYPtr8b0nhqQ="
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.wasm",
        "hash": "sha256-niYygMlK1HnbEugbNiTeBc7EkQIXXPnnZkgZUqq3qLs="
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.wasm",
        "hash": "sha256-pt8RKbO93gvHhs2DfKf4ctYNpnH6Ec2j6l+M0SgdAS4="
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.wasm",
        "hash": "sha256-1k6WUVW1mJwUKSKAwvKj5wtG/WTYf3scCmFyc4uRtWs="
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.wasm",
        "hash": "sha256-+DE3yDPtRF5JM8T52ycQt1qSAJ0vbjX5nu4Zoj+SuZ4="
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.wasm",
        "hash": "sha256-CIM4gUMmot/+RliOJhpf94ZlIsAr4YiEfWvOAXbovMU="
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.wasm",
        "hash": "sha256-Kx23sKGyz/kEgJVd1ZRRDUI93A95CFpkYIzCejkCxtQ="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.wasm",
        "hash": "sha256-P6tIzozdCJqHiy0zGjuPtLVfOYb5yb0QPwFMwMUn4AY="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.wasm",
        "hash": "sha256-/4HwDzaQ5a7S2V+Qzr94Nz3zi91/aZ30tRhta0XKqYE="
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.wasm",
        "hash": "sha256-Mnk3n1eK4eqTEZkm/ZfT7LQmGdwGAoF2anLqrZbDPbM="
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.wasm",
        "hash": "sha256-QIVT4ckpz17JUAEsvaaKYYH35Ou8V9ErIKuwNI05CZU="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "hash": "sha256-zhC5CCW9nCkqGXdOfIfwawjFHi5JjlQNnD8pGkdfWoE="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.wasm",
        "hash": "sha256-Vzg1KlSYjHMKB8KW97OKaZsRei8Q593KoPgnQe1n5Uo="
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.wasm",
        "hash": "sha256-Xo6xM56FQTZ30/6Vggp3fYR+4FxV/KmMooNBNpt+w6I="
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.wasm",
        "hash": "sha256-X+RMnAfTVC4+TDBQoS/h7LhyPBwJjorpoELFBfV7248="
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.wasm",
        "hash": "sha256-qDYDPlthKrlj2dnaBsNoMK5X/nxKhTIdUiQ9ugVTuW0="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.wasm",
        "hash": "sha256-h/dAFonk9eigobeeUZLSOdbPf0Gz2On4fYCbW4hGwmk="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.wasm",
        "hash": "sha256-MCbIAsHQBugo8qpJp51Z0UHPviJI013X8cqoUXXfa7M="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.wasm",
        "hash": "sha256-DzErfw7r3LKDKFr89PBxgF+SxxMEJcb6lGnpmdvn3A8="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.wasm",
        "hash": "sha256-P4CWph0hEmcsfiwKYkRp4me/5o8puJqWxBfj0AcLfWk="
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.wasm",
        "hash": "sha256-pr4aZh6q8+LiDRjtVtJkkLeCZuVgRF9iOhru3cXTfUY="
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.wasm",
        "hash": "sha256-dJxxG1+xZ1brKjnFZcEsO69maKgVzhnw94U5gUor6Gs="
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.wasm",
        "hash": "sha256-gCsoRrVikUlzNxsrNbZ+6QVGT2+XUPKJWx95hBKEl/w="
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.wasm",
        "hash": "sha256-GPcSbHwWVLH1fca0stI2MqZE+xsVLrA/kskuiQycJ4Q="
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.wasm",
        "hash": "sha256-LDzYiGnR0brxYcFNo0ocBo59dYZZb9MBe3ild2znJSc="
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.wasm",
        "hash": "sha256-ZpyrNDtC+3ti6m3d6mhH1as/m+ZFqLtc2bZBFNtuVH8="
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.wasm",
        "hash": "sha256-Mp7WemXwikMFbyEZOblQA8l8wqAZ5jhmh6QboTii32o="
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.wasm",
        "hash": "sha256-duIpVcBN7g31lDD77yYuAG3xM3U5GZtePHznUiVz0m4="
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.wasm",
        "hash": "sha256-4H6EYIOcQKX7spTR+G74jmTVJg6+MgAtY9g8b22KcFg="
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.wasm",
        "hash": "sha256-+zwMb/5gF/oM+U0k/lHsnzsIcU5y53QRPRDvfVjCPg4="
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.wasm",
        "hash": "sha256-DX5w2C46UrZY0ubTaEn3lxmlfYnJFHE1TN8wI4qsMgc="
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.wasm",
        "hash": "sha256-wnRBilXju2GhWZsScBp6pBZ8dNSD81FuW+DXXZxUu1I="
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.wasm",
        "hash": "sha256-29Qb7SWns23XygmGclOTQl4RO+5jCdJEFI5s2Pu3V2o="
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.wasm",
        "hash": "sha256-LZkStq41MX59Tptph5/JGQRSG8B5+a1ldrb0QpNVB6I="
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.wasm",
        "hash": "sha256-TNOfYwVGiv+d/Xk6LXgrOyiDkxGzv9NyH2IGyuVIMR4="
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.wasm",
        "hash": "sha256-Wow4n7EbYXc1HfQqHQu1Jhl7f8vCrcVNkFAXLZvyvTg="
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.wasm",
        "hash": "sha256-d7gVbpst3NnK88ZEcpaJoH5w3zfmsRXDJQvvqbL+RVY="
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.wasm",
        "hash": "sha256-HuX7LBO46UViQb2u/0vvs+XLxgVQE+KVlOs6UH+Gw0g="
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.wasm",
        "hash": "sha256-R4tw5kXVUZ+Qsq6/4Xkq7Qedv5pzouTdXVacoeG0V/0="
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.wasm",
        "hash": "sha256-Usmz3M5o5WSM1Sc2dU3njqXU1MeSMvgc8oaxTK8gBGo="
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.wasm",
        "hash": "sha256-giy48Parl41Ox46pfccHLTXlypNv3dXKu+yRKiWcJC0="
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.wasm",
        "hash": "sha256-kL2CE+V74498vfb1kuYNsti2ylJDViK5eEnTmKJv+54="
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.wasm",
        "hash": "sha256-AM6c0tx+lLrDZ6OZN3oLhe6nC21LZ6j1sEKHYC0gX9Q="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.wasm",
        "hash": "sha256-H0VkIeM0rlJX/Veq/zPhEyH7piskV3JOKngzP/djJE8="
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.wasm",
        "hash": "sha256-qsdCabiszf3qHMsvYiRuxa71WNCjNekpqBRHs8469vQ="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.wasm",
        "hash": "sha256-7msxYtUuVfZjmYO75wrZGO6rapEVdjT7RCgt6Y9EyGc="
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.wasm",
        "hash": "sha256-z0hatN5fwMJgHdz4QHMG8+e9nDMcL+jWvoEY/4+50K8="
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.wasm",
        "hash": "sha256-ZFVZEgZJ4fAvrAa84Zoj5j1OLX+7VhF5jq0XJoGdPX0="
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.wasm",
        "hash": "sha256-goELF2wzUusbMI1lATDF4myHde5GT8E3X4qmtHFNOeg="
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.wasm",
        "hash": "sha256-dkzneK8QtxQQ6flGCimi/ofDvV+VowH1LcxXReD935E="
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.wasm",
        "hash": "sha256-NEYDYaYBpgF3So553VgamGq3KZUL32UDvps2Y/dLdis="
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.wasm",
        "hash": "sha256-97xFkzLi4/C0otWqBmpjcxGrMAFBRhu4b29HpMXaTZw="
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.wasm",
        "hash": "sha256-+TOeSAsKIGT1UJBmjHRX61gRkGIQ+0vEtBQr8k+7HlI="
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.wasm",
        "hash": "sha256-KFOGstVXEAMQHwhfWTIZj3A5HwiPl+KlgZetTOfe0cY="
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.wasm",
        "hash": "sha256-atxs3p14Jj6AnnJM+AEdbVR3Le/oST9CtB8bz0mcM5U="
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.wasm",
        "hash": "sha256-2rbLSkDUh/CdKMUXN12xK590P5PdtQ6+D/HUF1Y2zNY="
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.wasm",
        "hash": "sha256-ulcimTPEQYo+vzvzjcj97+VdF4TYl1acGxv2F4064sc="
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.wasm",
        "hash": "sha256-lTkTSlfTqj7jJYcWurf1fHboUKCwCLKHNyJpgQFQy1E="
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.wasm",
        "hash": "sha256-6kE7mivQoxfhMTVAkmYi5VlsQhqXLYcImAuc9D7Skjo="
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.wasm",
        "hash": "sha256-yctvPmRbtoHiPpM5pKnajABrjRQR9a3b+HPWHyga2kY="
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.wasm",
        "hash": "sha256-Nhc8L23J1+APB7ju97KZlDcnoEa6XvC6p4LluoAjVkY="
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.wasm",
        "hash": "sha256-m5aBz++zzF8tNzlN4+R5pPqGhS882Pxw4KwoakadVrI="
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.wasm",
        "hash": "sha256-r62brvRKMGvdcIg3SIbWWi7k8/NqCfpn+LPqnwitvKE="
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.wasm",
        "hash": "sha256-rQ0vSy0Z16GnVFmS/wCs02+prtLem1HSrbHdfWIzNK4="
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.wasm",
        "hash": "sha256-bmkzRCDnwMgFnyZvQKnjJh5rdfZJtZ4nirjaJufIrqk="
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.wasm",
        "hash": "sha256-HPQyo7cnsrAul9FfHP0JLVYXonc/DYwM87t6IXA4jPc="
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.wasm",
        "hash": "sha256-YLwIjMK8F1xq/FIgzG6+jiJStkbL+5sLQLdzD2sgpa8="
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.wasm",
        "hash": "sha256-rUb1sC2EPqYnLys9V/C0H/313aLByFrqm0qT6zJpUcE="
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.wasm",
        "hash": "sha256-+5VqXw8HmAjDvyi2+y7K95eMarW7XY4wPW0bh7x8L/I="
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.wasm",
        "hash": "sha256-uPwda+H2hEsj0Jbt2bXGnSVbjkdbRsFU3TjifwMLQi4="
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.wasm",
        "hash": "sha256-IrnG91lN1tfKsabToUYpusckhRr9wXb3Jxm6CqsOTJE="
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.wasm",
        "hash": "sha256-KPyqHJl+ZMo3c6PCl2vPaQGBdD8P4KUBxsUkvR90/hk="
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.wasm",
        "hash": "sha256-7DGslki9AfExPpvTTP5Lou+UeVMPtxC7TMoTwvo5sKY="
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.wasm",
        "hash": "sha256-tI94+TOjFqR3Z880lf+2Ye9R7uo6OxX3t73SZC3Wodc="
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.wasm",
        "hash": "sha256-3H2G5ngT7eIaYsTDs+CoGgdvfTchxty175b/4H9+qxI="
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.wasm",
        "hash": "sha256-dtyh2m2c4Ak4ASCotVspn+EmOiuXkI5zqS2q90qHb+s="
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
