window.Windy=function(){function t(){return/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i.test(navigator.userAgent)}function n(t){return null!==t&&void 0!==t}function r(t,n){return t-n*Math.floor(t/n)}function e(t,n,r,e,a,o,i){return i[0]*=o,i[1]*=o,i}function a(t,n,r,e,a,o){var i=1-t,u=1-n,f=i*u,l=t*u,c=i*n,d=t*n,h=r[0]*f+e[0]*l+a[0]*c+o[0]*d,s=r[1]*f+e[1]*l+a[1]*c+o[1]*d;return[h,s,Math.sqrt(h*h+s*s)]}function o(t,n){var r=t.data,e=n.data;return{header:t.header,data:function(t){return[r[t],e[t]]},interpolate:a}}function i(){var t=null,n=null,r=null;return x.forEach(function(e){switch(e.header.parameterCategory+","+e.header.parameterNumber){case"2,2":t=e;break;case"2,3":n=e;break;default:r=e}}),o(t,n)}function u(){function t(t,a){var i,c=r(t-o,360)/f,d=(u-a)/l,h=Math.floor(c),v=h+1,m=Math.floor(d),p=m+1;if(i=s[m]){var g=i[h],y=i[v];if(n(g)&&n(y)&&(i=s[p])){var M=i[h],w=i[v];if(n(M)&&n(w))return e.interpolate(c-h,d-m,g,y,M,w)}}return null}var e=i(x),a=e.header,o=a.lo1,u=a.la1,f=a.dx,l=a.dy,c=a.nx,d=a.ny,h=new Date(a.refTime);h.setHours(h.getHours()+a.forecastTime);for(var s=[],v=0,m=Math.floor(c*f)>=360,p=0;p<d;p++){for(var g=[],y=0;y<c;y++,v++)g[y]=e.data(v);m&&g.push(g[0]),s[p]=g}T={date:h,interpolate:t}}function f(t,n){var r=k[Math.round(t)];return r&&r[Math.round(n)]||E}function l(t){function n(t){for(var n=[],i=0;i<=b;i+=2){var u=g([t,i]);if(u){var f=u[0],l=u[1];if(isFinite(f)){var c=T.interpolate(f,l);c&&(c=e(r,f,l,t,i,a,c),n[i+1]=n[i]=c)}}}o[t+1]=o[t]=n}var r={},a=D,o=[],i=0;!function r(){for(var e=Date.now();i<w;)if(n(i),i+=2,Date.now()-e>1e3)return void setTimeout(r,25);k=o,t()}()}function c(){function n(){e.forEach(function(t){t.length=0}),o.forEach(function(t){t.age>R&&(f.randomize(t).age=0);var n=t.x,r=t.y,a=f(n,r);if(null===a[2])t.age=R;else{var o=n+a[0],i=r+a[1];null!==f(o,i)[2]?(t.xt=o,t.yt=i,e[0].push(t)):(t.x=o,t.y=i)}t.age+=1})}function r(){var t=p.globalCompositeOperation;p.globalCompositeOperation="destination-in",p.fillRect(0,0,w,b),p.globalCompositeOperation=t,e.forEach(function(t,n){t.length>0&&(p.beginPath(),t.forEach(function(t){p.moveTo(t.x,t.y),p.lineTo(t.xt,t.yt),t.x=t.xt,t.y=t.yt}),p.stroke())})}var e=[[]],a=Math.round(w*b*N);t()&&(a*=z);for(var o=[],i=0;i<a;i++)o.push(f.randomize({age:Math.floor(Math.random()*R)+0}));!function t(){try{M=setTimeout(function(){requestAnimationFrame(t),n(),r()},1e3/O)}catch(t){console.error(t)}}()}function d(t){var n=t.particle;if(n){var r=n.canvas;r&&(w=r.width,b=r.height,p=r.getContext("2d"),p.lineWidth=n.lineWidth||C,p.strokeStyle=n.lineColor||q,p.fillStyle=W),x=t.data}y=t.project,g=t.invert}function h(t){if(s(),t&&(x=t),!x)throw new Error("please set data");p.clearRect(0,0,w,b);var n=new Date;u(),l(function(){console.log("deal data takes",new Date-n,"ms"),c()})}function s(){clearTimeout(M),f.release()}function v(t){x=t}function m(){return!!x}var p,g,y,M,w,b,x,T,k,C=1,D=.11,E=[NaN,NaN,null],N=1/80,z=.8,O=20,R=100,W="rgba(0, 0, 0, 0.97)",q="#ffffff",A={};return f.release=function(){k=[]},f.randomize=function(t){var n,r,e=0;do{n=Math.round(Math.floor(Math.random()*w)),r=Math.round(Math.floor(Math.random()*b))}while(null===f(n,r)[2]&&e++<30);return t.x=n,t.y=r,t},A.start=h,A.stop=s,A.config=d,A.setData=v,A.isReady=m,A}();