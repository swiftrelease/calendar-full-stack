(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports={TimeSlice:"TimeSlice_TimeSlice__RMlbL",TimeArea:"TimeSlice_TimeArea__X9z0w",EventArea:"TimeSlice_EventArea__1J2ft"}},12:function(e,t,n){e.exports={CalEvent:"CalendarEvent_CalEvent__1qIuX",Selected:"CalendarEvent_Selected__3B_nL"}},13:function(e,t,n){e.exports={Auth:"AuthForm_Auth__aDBu3",warning:"AuthForm_warning__3Pxnt"}},14:function(e,t,n){e.exports={Button:"Button_Button__3lFHW",Red:"Button_Red__UJqY3",Green:"Button_Green__TYQET",White:"Button_White__2Ukga",DeleteButton:"Button_DeleteButton__1BORa",Controls:"Button_Controls__hOqtp",AddButton:"Button_AddButton__pvLdm",SignOut:"Button_SignOut__33MQ7",Export:"Button_Export__DnoC-"}},22:function(e,t,n){e.exports={App:"App_App__2_CuX"}},24:function(e,t,n){e.exports={Calendar:"Calendar_Calendar__1HlCv"}},25:function(e,t,n){e.exports={Modal:"Modal_Modal__Ha-T5"}},26:function(e,t,n){e.exports={Backdrop:"Backdrop_Backdrop__nyqul"}},27:function(e,t,n){e.exports=n(54)},32:function(e,t,n){},51:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(21),s=n.n(o),l=(n(32),n(1)),c=n.n(l),i=n(2),u=n(6),d=n(7),p=n(9),h=n(8),v=n(10),m=n(22),f=n.n(m),E=n(23),y=n.n(E),k=n(16),b=n(15),w=n(24),g=n.n(w),S=n(11),x=n.n(S),_=n(12),T=n.n(_),O=n(14),C=n.n(O),A=function(e){var t=[C.a.Button];if(e.classes){var n=!0,r=!1,o=void 0;try{for(var s,l=e.classes[Symbol.iterator]();!(n=(s=l.next()).done);n=!0){var c=s.value;t.push(C.a[c])}}catch(i){r=!0,o=i}finally{try{n||null==l.return||l.return()}finally{if(r)throw o}}}return a.a.createElement("button",{type:"button",className:t.join(" "),onClick:e.click},e.children)},j=function(e){var t=e.selected?[T.a.CalEvent,T.a.Selected].join(" "):T.a.CalEvent;return a.a.createElement("div",{className:t,onClick:e.click,style:{width:e.style.width,height:e.style.height,top:e.style.offsetTop,left:e.style.left}},e.children,e.selected?a.a.createElement(A,{classes:["DeleteButton"],click:e.delete},"x"):null)},B=function(e){var t=null;if(e.events){var n=[];t=e.events.map(function(t,r){for(var o=10*(t.start-e.sliceStart)/3+"%",s=10*t.duration/3+"%",l="calc(".concat(o),c=0;c<n.length;c++){var i=n[c];l+=" - ".concat(i)}l+=")",n.push(s);var u=t.width,d=t.left;return a.a.createElement(j,{click:function(n){return e.selectEvent(n,t._id)},duration:t.duration,key:r,style:{offsetTop:l,height:s,width:u,left:d},selected:t.selected?t.selected:null,delete:t.selected?function(e){return t.deleteHandler(e,t._id)}:null},t.title)})}return a.a.createElement("div",{className:x.a.TimeSlice,style:e.small?null:{borderTop:"1px solid #ccc"}},a.a.createElement("div",{className:x.a.TimeArea,style:e.small?{fontSize:"12px"}:null},e.time),a.a.createElement("div",{className:x.a.EventArea},t))},H=n(25),N=n.n(H),D=function(e){return e.children},q=n(26),P=n.n(q),z=function(e){return e.show?a.a.createElement("div",{className:P.a.Backdrop,onClick:e.clicked}):null},J=function(e){return a.a.createElement(D,null,a.a.createElement(z,{show:e.show,clicked:e.modalClosed}),a.a.createElement("div",{className:N.a.Modal,style:{transform:e.show?"translateY(0)":"translateY(-100vh)",opacity:e.show?"1":0}},e.children))},U=(n(51),function(e){function t(e){return e.map(function(e){return a.a.createElement("option",{value:e,key:e},e)})}function n(t){"Enter"===t.key&&e.confirm()}return a.a.createElement(D,null,a.a.createElement("h3",null,"Add event"),a.a.createElement("div",{className:"add-event-controls"},a.a.createElement("select",{id:"hours"},t([8,9,10,11,12,1,2,3,4])),a.a.createElement("select",{id:"minutes"},t(["00","05","10","15","20","25","30","35","40","45","50","55"])),a.a.createElement("label",null,"Duration: "),a.a.createElement("input",{type:"text",id:"duration",onKeyDown:n,placeholder:"Duration in minutes"}),e.error&&"duration"===e.error.type?a.a.createElement("label",{className:"warning"},e.error.message):null,a.a.createElement("label",null,"Title: "),a.a.createElement("input",{type:"text",id:"title",onKeyDown:n,placeholder:"Event title"}),e.error&&"title"===e.error.type?a.a.createElement("label",{className:"warning"},e.error.message):null,a.a.createElement(A,{click:e.confirm,classes:["Green","Controls"]}," Add "),a.a.createElement(A,{click:e.cancel,classes:["White","Controls"]}," Cancel ")))}),M="".concat("https://rem-calendar.herokuapp.com","/api/calendar"),W=function(e){function t(){var e,n;Object(u.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).state={events:[],addingEvent:!1,selectedEventId:null,addEventError:null,networkError:null},n.styledEvents=[],n.getEventData=Object(i.a)(c.a.mark(function e(){var t,r;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(M,{method:"GET",headers:{"X-ApiToken":n.props.apiToken}});case 2:if(200!==(t=e.sent).status){e.next=10;break}return e.next=6,t.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:n.setState({networkError:"Failed to connect to the server: ".concat(t.status,".")});case 11:case"end":return e.stop()}},e,this)})),n.componentDidMount=Object(i.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.getEventData();case 2:(t=e.sent)&&n.setState({events:t});case 4:case"end":return e.stop()}},e,this)})),n.containsOffsetEvent=function(e){var t=!0,r=!1,a=void 0;try{for(var o,s=n.offsetEvents[Symbol.iterator]();!(t=(o=s.next()).done);t=!0){var l=o.value;if(e._id===l._id)return!0}}catch(c){r=!0,a=c}finally{try{t||null==s.return||s.return()}finally{if(r)throw a}}return!1},n.setStyledEvents=function(){for(var e=Object(b.a)(n.state.events),t=0;t<e.length-1;t++)for(var r=t+1;r<e.length;r++)if(e[t].start>e[r].start){var a=e[t];e[t]=e[r],e[r]=a}var o=!0,s=!1,l=void 0;try{for(var c,i=e[Symbol.iterator]();!(o=(c=i.next()).done);o=!0){var u=c.value,d=1,p=[],h=!0,v=!1,m=void 0;try{for(var f,E=e[Symbol.iterator]();!(h=(f=E.next()).done);h=!0){var y=f.value;n.eventsOverlap(u,y)&&u._id!==y._id&&(p.push(y),d++)}}catch(j){v=!0,m=j}finally{try{h||null==E.return||E.return()}finally{if(v)throw m}}for(var k=0;k<p.length-1;k++)for(var w=k+1;w<p.length;w++)n.eventsOverlap(p[k],p[w])||d--;u.widthPercent=100/d}}catch(j){s=!0,l=j}finally{try{o||null==i.return||i.return()}finally{if(s)throw l}}e[0]&&(e[0].column=0);for(var g=1;g<e.length;g++){e[g].column=0;for(var S=0;S<g;S++)n.eventsOverlap(e[g],e[S])&&e[g].column===e[S].column&&e[g].column++}var x=!0,_=!1,T=void 0;try{for(var O,C=e[Symbol.iterator]();!(x=(O=C.next()).done);x=!0){var A=O.value;A.left="".concat(A.column*A.widthPercent,"%"),A.width="calc(".concat(A.widthPercent,"% - 12px)")}}catch(j){_=!0,T=j}finally{try{x||null==C.return||C.return()}finally{if(_)throw T}}n.styledEvents=e},n.selectEventHandler=function(e,t){e.stopPropagation(),n.state.selectedEventId!==t&&n.setState({selectedEventId:t})},n.deselectEventHandler=function(){n.state.selectedEventId&&n.setState({selectedEventId:null})},n.addEventButtonClickHandler=function(){n.setState({addingEvent:!0})},n.addEventCancelHandler=function(){n.setState({addingEvent:!1})},n.closeErrorModalHandler=function(){n.setState({networkError:null})},n.deleteEventHandler=function(){var e=Object(i.a)(c.a.mark(function e(t,r){var a,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.stopPropagation(),e.next=3,fetch(M,{method:"DELETE",headers:{"Content-Type":"application/json","X-ApiToken":n.props.apiToken},body:JSON.stringify({id:r})});case 3:if(200!==e.sent.status){e.next=17;break}a=Object(b.a)(n.state.events),o=0;case 7:if(!(o<a.length)){e.next=15;break}if(a[o]._id!==r){e.next=12;break}return a.splice(o,1),n.setState({events:a}),e.abrupt("break",15);case 12:o++,e.next=7;break;case 15:e.next=18;break;case 17:console.log("HTTP request error");case 18:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),n.addEventHandler=Object(i.a)(c.a.mark(function e(){var t,r,a,o,s,l,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=+document.querySelector("select#hours").value,r=+document.querySelector("select#minutes").value,a=+document.querySelector("input#duration").value,o=document.querySelector("input#title").value,!isNaN(a)){e.next=7;break}return n.setState({addEventError:{type:"duration",message:"Duration has to be a number"}}),e.abrupt("return");case 7:if(!(a<5||a>300)){e.next=10;break}return n.setState({addEventError:{type:"duration",message:"Duration has to be more than 5 and less than 300"}}),e.abrupt("return");case 10:if(o){e.next=13;break}return n.setState({addEventError:{type:"title",message:"Title cannot be empty"}}),e.abrupt("return");case 13:return t<5&&(t+=12),s=60*(t-8)+r,l=JSON.stringify({start:s,duration:a,title:o}),e.next=18,fetch(M,{method:"POST",headers:{"Content-Type":"application/json","X-ApiToken":n.props.apiToken},body:l});case 18:if(200!==e.sent.status){e.next=26;break}return e.next=22,n.getEventData();case 22:i=e.sent,n.setState({events:i,addingEvent:!1,addEventError:null}),e.next=27;break;case 26:console.log("HTTP request error");case 27:case"end":return e.stop()}},e,this)})),n.exportJsonHandler=Object(i.a)(c.a.mark(function e(){var t,r,a,o,s,l,i,u,d,p,h,v,m,f,E;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(E=function(e){for(var t=[],n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return new Uint8Array(t)},t=[],r=!0,a=!1,o=void 0,e.prev=5,s=n.state.events[Symbol.iterator]();!(r=(l=s.next()).done);r=!0)i=l.value,t.push({start:i.start,duration:i.duration,title:i.title});e.next=13;break;case 9:e.prev=9,e.t0=e.catch(5),a=!0,o=e.t0;case 13:e.prev=13,e.prev=14,r||null==s.return||s.return();case 16:if(e.prev=16,!a){e.next=19;break}throw o;case 19:return e.finish(16);case 20:return e.finish(13);case 21:for(u=0;u<t.length-1;u++)for(d=u+1;d<t.length;d++)t[d].start<t[u].start&&(p=t[u],t[u]=t[d],t[d]=p);h=E(JSON.stringify(t,null,2)),v=new Blob([h],{type:"application/octet-stream"}),m=URL.createObjectURL(v),(f=document.createElement("a")).href=m,f.download="events.json",f.click();case 29:case"end":return e.stop()}},e,this,[[5,9,13,21],[14,,16,20]])})),n}return Object(v.a)(t,e),Object(d.a)(t,[{key:"eventsOverlap",value:function(e,t){return e.start<=t.start&&e.start+e.duration>t.start||t.start<=e.start&&t.start+t.duration>e.start}},{key:"getSliceStart",value:function(e,t){var n=e>5?60*(e-8):60*(e+4);return t&&(n+=30),n}},{key:"getEventsForSlice",value:function(e){var t=this,n=[],r=!0,a=!1,o=void 0;try{for(var s,l=this.styledEvents[Symbol.iterator]();!(r=(s=l.next()).done);r=!0){var c=s.value;c.start>=e&&c.start<e+30&&n.push(c)}}catch(i){a=!0,o=i}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n=n.map(function(e){var n=Object(k.a)({},e);return n._id===t.state.selectedEventId&&(n=Object(k.a)({},n,{selected:!0,deleteHandler:t.deleteEventHandler})),n})}},{key:"setupTimeSlices",value:function(){for(var e=this.props.timeStart,t=this.props.timeSlicesAmount,n=!1,r=[],o=0,s=e;o<t;o++){var l=this.getSliceStart(s,n);r.push(a.a.createElement(B,{events:this.getEventsForSlice(l),selectEvent:this.selectEventHandler,small:n,time:"".concat(s,":").concat(n?"30":"00"),sliceStart:l,key:"".concat(s,":").concat(n?"30":"00")})),12===s&&n&&(s=0),n&&s++,n=!n}return r}},{key:"render",value:function(){this.setStyledEvents();var e=this.setupTimeSlices();return a.a.createElement("div",{className:g.a.Calendar,onClick:this.deselectEventHandler},a.a.createElement(J,{show:this.state.addingEvent||this.state.networkError,modalClosed:this.state.networkError?this.closeErrorModalHandler:this.addEventCancelHandler},this.state.addingEvent?a.a.createElement(U,{cancel:this.addEventCancelHandler,confirm:this.addEventHandler,error:this.state.addEventError}):null,this.state.networkError?a.a.createElement("h3",null,this.state.networkError):null),e,a.a.createElement(A,{click:this.props.signOut,classes:["White","SignOut"]}," Sign Out "),a.a.createElement(A,{click:this.exportJsonHandler,classes:["White","Export"]}," \u21e9 "),a.a.createElement(A,{click:this.addEventButtonClickHandler,classes:["AddButton"]}," + "))}}]),t}(r.Component),I=n(13),L=n.n(I),F=function(e){function t(t){"Enter"===t.key&&e.authorize(t)}return a.a.createElement("div",{className:L.a.Auth},a.a.createElement("h2",null,"Log in or create a new account"),a.a.createElement("label",null,"Username:"),a.a.createElement("input",{type:"text",id:"uname",onKeyDown:t}),e.error&&"uname"===e.error.type?a.a.createElement("label",{className:L.a.warning},e.error.message):null,a.a.createElement("label",null,"Password:"),a.a.createElement("input",{type:"password",id:"pass",onKeyDown:t}),e.error&&"pass"===e.error.type?a.a.createElement("label",{className:L.a.warning},e.error.message):null,a.a.createElement(A,{classes:["White"],click:e.authorize},"Submit"))},R="".concat("https://rem-calendar.herokuapp.com","/auth"),X=function(e){function t(){var e,n;Object(u.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).state={authorized:!1,authError:null,apiToken:null,ready:!1},n.componentDidMount=Object(i.a)(c.a.mark(function e(){var t,r,a,o,s,l,i,u,d,p;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=document.cookie.split("; "),r=null,a=!0,o=!1,s=void 0,e.prev=5,l=t[Symbol.iterator]();case 7:if(a=(i=l.next()).done){e.next=15;break}if("authToken"!==(u=i.value).split("=")[0]){e.next=12;break}return r=u.split("=")[1],e.abrupt("break",15);case 12:a=!0,e.next=7;break;case 15:e.next=21;break;case 17:e.prev=17,e.t0=e.catch(5),o=!0,s=e.t0;case 21:e.prev=21,e.prev=22,a||null==l.return||l.return();case 24:if(e.prev=24,!o){e.next=27;break}throw s;case 27:return e.finish(24);case 28:return e.finish(21);case 29:if(r){e.next=32;break}return n.setState({ready:!0}),e.abrupt("return");case 32:return e.next=34,fetch(R,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({authToken:r})});case 34:if(200!==(d=e.sent).status){e.next=42;break}return e.next=38,d.json();case 38:(p=e.sent).uname&&p.apiToken&&n.setState({authorized:!0,apiToken:p.apiToken,ready:!0}),e.next=43;break;case 42:n.setState({ready:!0});case 43:case"end":return e.stop()}},e,this,[[5,17,21,29],[22,,24,28]])})),n.setAuthError=function(e,t){return!!e&&(n.setState({authError:t}),!0)},n.authorizationHandler=Object(i.a)(c.a.mark(function e(){var t,r,a,o,s,l;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=document.querySelector("input#uname").value,r=document.querySelector("input#pass").value,!(n.setAuthError(!t,{type:"uname",message:"Username required"})||n.setAuthError(!r,{type:"pass",message:"Password required"})||n.setAuthError(t.length<4,{type:"uname",message:"Username has to be at least 4 characters"})||n.setAuthError(r.length<6,{type:"pass",message:"Password has to be at least 6 characters"}))){e.next=4;break}return e.abrupt("return");case 4:return a=y()("sha256").update(r).digest("hex"),e.next=7,fetch(R,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uname:t,pass:a})});case 7:if(200!==(o=e.sent).status){e.next=15;break}return e.next=11,o.json();case 11:(s=e.sent).action&&s.authToken&&s.apiToken?("register"===s.action&&(document.cookie="authToken=".concat(s.authToken),n.setState({authorized:!0,apiToken:s.apiToken,uname:t})),"login"===s.action&&(document.cookie="authToken=".concat(s.authToken),n.setState({authorized:!0,apiToken:s.apiToken,uname:t}))):s.error?n.setState({authError:{type:"pass",message:s.error}}):n.setState({authError:{type:"pass",message:"Unknown auth error"}}),e.next=20;break;case 15:return e.next=17,o.json();case 17:return(l=e.sent).error?n.setState({authError:{type:"pass",message:l.error}}):n.setState({authError:{type:"pass",message:"Unknown auth error"}}),e.abrupt("return");case 20:case"end":return e.stop()}},e,this)})),n.signOutHandler=function(){document.cookie="authToken=;expires=".concat(new Date(0).toUTCString()),n.setState({authorized:!1,apiToken:null,authError:null})},n}return Object(v.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return this.state.ready?a.a.createElement("div",{className:f.a.App},this.state.authorized?a.a.createElement(W,{timeStart:8,timeSlicesAmount:19,apiToken:this.state.apiToken,signOut:this.signOutHandler}):a.a.createElement(F,{error:this.state.authError,authorize:this.authorizationHandler})):null}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[27,2,1]]]);
//# sourceMappingURL=main.9b1c9e54.chunk.js.map