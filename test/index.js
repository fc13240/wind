function newAgent(){return µ.newAgent().on({reject:function(){console.log("reject",arguments)},fail:function(){console.log("fail",arguments)}})}function buildGrids(a){console.time("build grids");var n=when.map(products.productsFor(a),function(a){return a.load({})});return when.all(n).then(function(a){return console.time("build grids"),{primaryGrid:a[0],overlayGrid:a[1]||a[0]}}).ensure(function(){})}var SECOND=1e3,MINUTE=60*SECOND,HOUR=60*MINUTE,MAX_TASK_TIME=100,MIN_SLEEP_TIME=25,MIN_MOVE=4,MOVE_END_WAIT=1e3,OVERLAY_ALPHA=Math.floor(102),INTENSITY_SCALE_STEP=10,MAX_PARTICLE_AGE=100,PARTICLE_LINE_WIDTH=1,PARTICLE_MULTIPLIER=7,PARTICLE_REDUCTION=.75,FRAME_RATE=40,NULL_WIND_VECTOR=[NaN,NaN,null],HOLE_VECTOR=[NaN,NaN,null],TRANSPARENT_BLACK=[0,0,0,0],REMAINING="▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫▫",COMPLETED="▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪",mymap=L.map("mapid").setView([36.165,104.585],3);L.tileLayer("http://wprd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",{maxZoom:18,minZoom:3,subdomains:["01","02","03","04"]}).addTo(mymap);var maskLayer=L.canvasLayer().addTo(mymap),animateLayer=L.canvasLayer().delegate({onDrawLayer:function(a){animatorAgent.cancel(),µ.clearCanvas(animateCanvas),µ.clearCanvas(maskCanvas),fieldAgent.submit(interpolateField,globObj,grids)}}).addTo(mymap);mymap.on("click",function(a){var n=a.latlng,e=projection([n.lat,n.lng]);console.log(n,e,mymap.latLngToLayerPoint(n),projection.invert(e))});var animateCanvas=animateLayer._canvas,maskCanvas=maskLayer._canvas,projection=function(a){var n=mymap.project(new L.latLng(a[1],a[0])),e=n._subtract(mymap.getPixelOrigin()),t=mymap.layerPointToContainerPoint(e);return[t.x,t.y]};projection.invert=function(a){var n=mymap.containerPointToLatLng({x:a[0],y:a[1]});return[n.lng,n.lat]};var globObj={projection:projection,bounds:function(a){return{x:0,y:0,xMax:a.width,yMax:a.height,width:a.width,height:a.height}}},grids=buildGrids({date:"current",hour:"",param:"wind",surface:"surface",level:"level",orientation:"",overlayType:"default",param:"wind",projection:"orthographic",showGridPoints:!1,surface:"surface",topology:"/data/earth-topo.json?v2"}),view=µ.view(),fieldAgent=newAgent(),animatorAgent=newAgent();animatorAgent.listenTo(fieldAgent,"update",function(a){animatorAgent.submit(animate,globObj,a,grids)}),fieldAgent.submit(interpolateField,globObj,grids);