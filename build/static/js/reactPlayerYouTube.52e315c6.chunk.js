(self.webpackChunkskyline=self.webpackChunkskyline||[]).push([[446],{2634:(e,t,a)=>{var s,l=a(2897).default,o=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,y=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,c=(e,t,a,s)=>{if(t&&"object"===typeof t||"function"===typeof t)for(let l of i(t))p.call(e,l)||l===a||n(e,l,{get:()=>t[l],enumerable:!(s=r(t,l))||s.enumerable});return e},u=(e,t,a)=>(((e,t,a)=>{t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a})(e,"symbol"!==typeof t?t+"":t,a),a),h={};((e,t)=>{for(var a in t)n(e,a,{get:t[a],enumerable:!0})})(h,{default:()=>w}),e.exports=(s=h,c(n({},"__esModule",{value:!0}),s));var d=((e,t,a)=>(a=null!=e?o(y(e)):{},c(!t&&e&&e.__esModule?a:n(a,"default",{value:e,enumerable:!0}),e)))(a(5043)),P=a(7799),f=a(763);const g=/[?&](?:list|channel)=([a-zA-Z0-9_-]+)/,m=/user\/([a-zA-Z0-9_-]+)\/?/,b=/youtube-nocookie\.com/;class w extends d.Component{constructor(){super(...arguments),u(this,"callPlayer",P.callPlayer),u(this,"parsePlaylist",(e=>{if(e instanceof Array)return{listType:"playlist",playlist:e.map(this.getID).join(",")};if(g.test(e)){const[,t]=e.match(g);return{listType:"playlist",list:t.replace(/^UC/,"UU")}}if(m.test(e)){const[,t]=e.match(m);return{listType:"user_uploads",list:t}}return{}})),u(this,"onStateChange",(e=>{const{data:t}=e,{onPlay:a,onPause:s,onBuffer:l,onBufferEnd:o,onEnded:n,onReady:r,loop:i,config:{playerVars:y,onUnstarted:p}}=this.props,{UNSTARTED:c,PLAYING:u,PAUSED:h,BUFFERING:d,ENDED:P,CUED:f}=window.YT.PlayerState;if(t===c&&p(),t===u&&(a(),o()),t===h&&s(),t===d&&l(),t===P){const e=!!this.callPlayer("getPlaylist");i&&!e&&(y.start?this.seekTo(y.start):this.play()),n()}t===f&&r()})),u(this,"mute",(()=>{this.callPlayer("mute")})),u(this,"unmute",(()=>{this.callPlayer("unMute")})),u(this,"ref",(e=>{this.container=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}getID(e){return!e||e instanceof Array||g.test(e)?null:e.match(f.MATCH_URL_YOUTUBE)[1]}load(e,t){const{playing:a,muted:s,playsinline:o,controls:n,loop:r,config:i,onError:y}=this.props,{playerVars:p,embedOptions:c}=i,u=this.getID(e);if(t)return g.test(e)||m.test(e)||e instanceof Array?void this.player.loadPlaylist(this.parsePlaylist(e)):void this.player.cueVideoById({videoId:u,startSeconds:(0,P.parseStartTime)(e)||p.start,endSeconds:(0,P.parseEndTime)(e)||p.end});(0,P.getSDK)("https://www.youtube.com/iframe_api","YT","onYouTubeIframeAPIReady",(e=>e.loaded)).then((t=>{this.container&&(this.player=new t.Player(this.container,l({width:"100%",height:"100%",videoId:u,playerVars:l(l({autoplay:a?1:0,mute:s?1:0,controls:n?1:0,start:(0,P.parseStartTime)(e),end:(0,P.parseEndTime)(e),origin:window.location.origin,playsinline:o?1:0},this.parsePlaylist(e)),p),events:{onReady:()=>{r&&this.player.setLoop(!0),this.props.onReady()},onPlaybackRateChange:e=>this.props.onPlaybackRateChange(e.data),onPlaybackQualityChange:e=>this.props.onPlaybackQualityChange(e),onStateChange:this.onStateChange,onError:e=>y(e.data)},host:b.test(e)?"https://www.youtube-nocookie.com":void 0},c)))}),y),c.events&&console.warn("Using `embedOptions.events` will likely break things. Use ReactPlayer\u2019s callback props instead, eg onReady, onPlay, onPause")}play(){this.callPlayer("playVideo")}pause(){this.callPlayer("pauseVideo")}stop(){document.body.contains(this.callPlayer("getIframe"))&&this.callPlayer("stopVideo")}seekTo(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.callPlayer("seekTo",e),t||this.props.playing||this.pause()}setVolume(e){this.callPlayer("setVolume",100*e)}setPlaybackRate(e){this.callPlayer("setPlaybackRate",e)}setLoop(e){this.callPlayer("setLoop",e)}getDuration(){return this.callPlayer("getDuration")}getCurrentTime(){return this.callPlayer("getCurrentTime")}getSecondsLoaded(){return this.callPlayer("getVideoLoadedFraction")*this.getDuration()}render(){const{display:e}=this.props,t={width:"100%",height:"100%",display:e};return d.default.createElement("div",{style:t},d.default.createElement("div",{ref:this.ref}))}}u(w,"displayName","YouTube"),u(w,"canPlay",f.canPlay.youtube)}}]);
//# sourceMappingURL=reactPlayerYouTube.52e315c6.chunk.js.map