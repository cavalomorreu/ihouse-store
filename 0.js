webpackJsonp([0],{"8rbI":function(t,e,o){var i,n,r;(function(){var o;o=function(){function t(t,e){var o,i;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(o in t)i=t[o],this.options[o]=i;this.context=null!=e?e:this,this.unique=this._genKey()}return t.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&this.context.nextUrl.length>0},t.prototype.next=function(){return!!this.hasNext()&&this.run(this.context.nextUrl)},t.prototype.run=function(e){var o,i,n;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&(n=document.createElement("script"),n.id="instafeed-fetcher",n.src=e||this._buildUrl(),o=document.getElementsByTagName("head"),o[0].appendChild(n),i="instafeedCache"+this.unique,window[i]=new t(this.options,this),window[i].unique=this.unique),!0},t.prototype.parse=function(t){var e,o,i,n,r,s,a,p,c,l,h,u,f,d,m,g,y,w,k,b,_,E,I,v,x,N,B,T,j,C,O;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(j="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"),T="least"===j[0],j[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",T);break;case"liked":t.data=this._sortBy(t.data,"likes.count",T);break;case"commented":t.data=this._sortBy(t.data,"comments.count",T);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&!1===this.options.mock){if(m=t.data,B=parseInt(this.options.limit,10),null!=this.options.limit&&m.length>B&&(m=m.slice(0,B)),s=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(m=this._filter(m,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(p="",f="","",O=document.createElement("div"),l=0,I=m.length;l<I;l++){if(h=m[l],"object"!=typeof(u=h.images[this.options.resolution]))throw r="No image found for resolution: "+this.options.resolution+".",new Error(r);k=u.width,y=u.height,w="square",k>y&&(w="landscape"),k<y&&(w="portrait"),d=u.url,c=window.location.protocol.indexOf("http")>=0,c&&!this.options.useHttp&&(d=d.replace(/https?:\/\//,"//")),f=this._makeTemplate(this.options.template,{model:h,id:h.id,link:h.link,type:h.type,image:d,width:k,height:y,orientation:w,caption:this._getObjectProperty(h,"caption.text"),likes:h.likes.count,comments:h.comments.count,location:this._getObjectProperty(h,"location.name")}),p+=f}for(O.innerHTML=p,n=[],i=0,o=O.childNodes.length;i<o;)n.push(O.childNodes[i]),i+=1;for(_=0,v=n.length;_<v;_++)N=n[_],s.appendChild(N)}else for(E=0,x=m.length;E<x;E++){if(h=m[E],g=document.createElement("img"),"object"!=typeof(u=h.images[this.options.resolution]))throw r="No image found for resolution: "+this.options.resolution+".",new Error(r);d=u.url,c=window.location.protocol.indexOf("http")>=0,c&&!this.options.useHttp&&(d=d.replace(/https?:\/\//,"//")),g.src=d,!0===this.options.links?(e=document.createElement("a"),e.href=h.link,e.appendChild(g),s.appendChild(e)):s.appendChild(g)}if(C=this.options.target,"string"==typeof C&&(C=document.getElementById(C)),null==C)throw r='No element with id="'+this.options.target+'" on page.',new Error(r);C.appendChild(s),a=document.getElementsByTagName("head")[0],a.removeChild(document.getElementById("instafeed-fetcher")),b="instafeedCache"+this.unique,window[b]=void 0;try{delete window[b]}catch(t){t}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},t.prototype._buildUrl=function(){var t,e,o;switch(t="https://api.instagram.com/v1",this.options.get){case"popular":e="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");e="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");e="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");e="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return o=t+"/"+e,null!=this.options.accessToken?o+="?access_token="+this.options.accessToken:o+="?client_id="+this.options.clientId,null!=this.options.limit&&(o+="&count="+this.options.limit),o+="&callback=instafeedCache"+this.unique+".parse"},t.prototype._genKey=function(){var t;return""+(t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+t()+t()+t()},t.prototype._makeTemplate=function(t,e){var o,i,n,r,s;for(i=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,o=t;i.test(o);)r=o.match(i)[1],s=null!=(n=this._getObjectProperty(e,r))?n:"",o=o.replace(i,function(){return""+s});return o},t.prototype._getObjectProperty=function(t,e){var o,i;for(e=e.replace(/\[(\w+)\]/g,".$1"),i=e.split(".");i.length;){if(o=i.shift(),!(null!=t&&o in t))return null;t=t[o]}return t},t.prototype._sortBy=function(t,e,o){var i;return i=function(t,i){var n,r;return n=this._getObjectProperty(t,e),r=this._getObjectProperty(i,e),o?n>r?1:-1:n<r?1:-1},t.sort(i.bind(this)),t},t.prototype._filter=function(t,e){var o,i,n,r,s;for(o=[],i=function(t){if(e(t))return o.push(t)},n=0,s=t.length;n<s;n++)r=t[n],i(r);return o},t}(),function(o,s){n=[],i=s,void 0!==(r="function"==typeof i?i.apply(e,n):i)&&(t.exports=r)}(0,function(){return o})}).call(this)}});
//# sourceMappingURL=0.js.map