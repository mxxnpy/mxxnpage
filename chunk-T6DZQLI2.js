import{a as F}from"./chunk-ULIIORT5.js";import{a as L}from"./chunk-RTN6BW2H.js";import{Ja as w,La as a,Ob as T,Pa as k,Pb as D,R as O,Ta as x,Vb as M,W as S,Wa as m,ab as s,bb as E,da as C,eb as i,fb as n,gb as g,mb as d,ub as c,vb as b,wb as v}from"./chunk-MR52UAL5.js";function A(e,l){e&1&&(C(),i(0,"svg",3),g(1,"path",4),n())}function B(e,l){e&1&&(C(),i(0,"svg",3),g(1,"path",5),n())}function $(e,l){if(e&1&&(i(0,"span",6),c(1),n()),e&2){let t=d();a(),v("\u2014 ",t.holidayMessage,"")}}var X=(()=>{class e{constructor(){this.currentDate=new Date,this.formattedDate="",this.holidayMessage="",this.holidays={christmas:{day:25,month:12,message:"Merry Christmas!"},newYear:{day:1,month:1,message:"Happy New Year!"},camilaBirthday:{day:25,month:8,message:"Happy Birthday, Camila!"},mottuYear:{day:1,month:4,message:"One more year working with #MOTTU!"},leandroBirthday:{day:23,month:4,message:"Happy Birthday to me! :)"},victorBirthday:{day:27,month:11,message:"Happy Birthday, Victor!"},brazilIndependence:{day:7,month:9,message:"Happy Independence Day, Brazil!"},laborDay:{day:1,month:5,message:"Happy Labor Day!"},carnival:{day:13,month:2,message:"Happy Carnival!"},blackConsciousness:{day:20,month:11,message:"Black Consciousness Day!"},tiradentes:{day:21,month:4,message:"Tiradentes Day!"},corpusChristi:{day:3,month:6,message:"Corpus Christi Day!"},goodFriday:{day:15,month:4,message:"Good Friday!"},easter:{day:17,month:4,message:"Happy Easter!"},childrensDay:{day:12,month:10,message:"Happy Children's Day!"},mothersDay:{day:9,month:5,message:"Happy Mother's Day!"},fathersDay:{day:8,month:8,message:"Happy Father's Day!"},valentinesDay:{day:12,month:6,message:"Happy Valentine's Day!"},womensDay:{day:8,month:3,message:"Happy Women's Day!"},internationalDayOfPeace:{day:21,month:9,message:"International Day of Peace!"},internationalDayOfHappiness:{day:20,month:3,message:"International Day of Happiness!"},internationalDayOfFamilies:{day:15,month:5,message:"International Day of Families!"},internationalDayOfFriendship:{day:30,month:7,message:"International Day of Friendship!"},internationalDayOfDemocracy:{day:15,month:9,message:"International Day of Democracy!"},internationalDayOfNonViolence:{day:2,month:10,message:"International Day of Non-Violence!"},internationalDayOfTolerance:{day:16,month:11,message:"International Day of Tolerance!"},internationalDayOfHumanRights:{day:10,month:12,message:"International Day of Human Rights!"}}}getHolidayMessage(t){let o=t.getDate(),r=t.getMonth()+1;for(let[h,y]of Object.entries(this.holidays))if(o===y.day&&r===y.month)return y.message;let u=["Have a wonderful day!","Make today amazing!","Enjoy your day to the fullest!","Smile and make the most of today!","Every day is a new opportunity!"];return u[Math.floor(Math.random()*u.length)]}ngOnInit(){this.updateTime(),setInterval(()=>this.updateTime(),1e3)}updateTime(){this.currentDate=new Date,this.formattedDate=this.formatDate(this.currentDate),this.holidayMessage=this.getHolidayMessage(this.currentDate)}formatDate(t){let o={day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!0,timeZone:"America/Sao_Paulo"};return t.toLocaleDateString("en-US",o)}isNightTime(){let t={hour:"numeric",hour12:!1,timeZone:"America/Sao_Paulo"},o=this.currentDate.toLocaleString("en-US",t),r=parseInt(o.split(":")[0],10);return r<6||r>=20}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=x({type:e,selectors:[["app-clock"]],decls:5,vars:4,consts:[[1,"status-item"],["viewBox","0 0 24 24","width","24","height","24","class","icon",4,"ngIf"],["class","holiday-message",4,"ngIf"],["viewBox","0 0 24 24","width","24","height","24",1,"icon"],["fill","currentColor","d","M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"],["fill","currentColor","d","M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"],[1,"holiday-message"]],template:function(o,r){o&1&&(i(0,"p",0),m(1,A,2,0,"svg",1)(2,B,2,0,"svg",1),c(3),m(4,$,2,1,"span",2),n()),o&2&&(a(),s("ngIf",r.isNightTime()),a(),s("ngIf",!r.isNightTime()),a(),v(" ",r.formattedDate," "),a(),s("ngIf",r.holidayMessage))},dependencies:[M,D],styles:[".holiday-message[_ngcontent-%COMP%]{font-weight:600;margin-left:.5rem;color:var(--accent-color)}"]})}}return e})();var P=(()=>{class e{constructor(t){this.http=t,this.apiUrl=F.apiUrl+"/github"}getUserProfile(t){return this.http.get(`${this.apiUrl}/user/${t}`)}getUserActivity(t,o=10){return this.http.get(`${this.apiUrl}/activity/${t}`,{params:{limit:o.toString()}})}getUserContributions(t){return this.http.get(`${this.apiUrl}/contributions/${t}`)}static{this.\u0275fac=function(o){return new(o||e)(S(L))}}static{this.\u0275prov=O({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function R(e,l){if(e&1&&(i(0,"span"),c(1),n()),e&2){let t=d();a(),v(" ",t.totalContributions," contributions in the last year ")}}function V(e,l){e&1&&(i(0,"span"),c(1,"Loading GitHub contributions..."),n())}function j(e,l){if(e&1&&(i(0,"span",7),c(1),n()),e&2){let t=d();a(),b(t.error)}}function z(e,l){if(e&1&&(i(0,"span",24),c(1),n()),e&2){let t=l.$implicit;a(),b(t)}}function Z(e,l){if(e&1&&g(0,"div",27),e&2){let t=l.$implicit,o=d(3);E("background-color",o.getContributionColor(t.count)),s("title",t.date+": "+t.count+" contributions")}}function J(e,l){if(e&1&&(i(0,"div",25),m(1,Z,1,3,"div",26),n()),e&2){let t=l.$implicit;a(),s("ngForOf",t)}}function W(e,l){if(e&1&&(i(0,"div",8)(1,"div",9),m(2,z,2,1,"span",10),n(),i(3,"div",11)(4,"div",12)(5,"span",13),c(6,"Mon"),n(),i(7,"span",13),c(8,"Wed"),n(),i(9,"span",13),c(10,"Fri"),n()(),i(11,"div",14),m(12,J,2,1,"div",15),n()(),i(13,"div",16)(14,"span",17),c(15,"Less"),n(),i(16,"div",18),g(17,"div",19)(18,"div",20)(19,"div",21)(20,"div",22)(21,"div",23),n(),i(22,"span",17),c(23,"More"),n()()()),e&2){let t=d();a(2),s("ngForOf",t.months),a(10),s("ngForOf",t.contributionsGrid)}}function Y(e,l){if(e&1&&(i(0,"span",32),c(1),n()),e&2){let t=d().$implicit;a(),b(t.language)}}function q(e,l){if(e&1&&(i(0,"li")(1,"a",30),c(2),n(),m(3,Y,2,1,"span",31),n()),e&2){let t=l.$implicit;a(),s("href",t.url,w),a(),b(t.name),a(),s("ngIf",t.language)}}function K(e,l){if(e&1&&(i(0,"div",28)(1,"p",0),c(2,"Recent Repositories"),n(),i(3,"ul"),m(4,q,4,3,"li",29),n()()),e&2){let t=d();a(4),s("ngForOf",t.recentRepositories)}}var ot=(()=>{class e{constructor(t){this.githubService=t,this.username="mxxnpy",this.loading=!0,this.error=null,this.totalContributions=0,this.contributionsGrid=[],this.recentRepositories=[],this.months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}ngOnInit(){this.loadContributions()}loadContributions(){this.loading=!0,this.error=null,this.githubService.getUserContributions(this.username).subscribe({next:t=>{this.totalContributions=t.totalContributions||0,this.recentRepositories=t.recentRepositories||[],this.processContributionsData(t.contributions||[]),this.loading=!1},error:t=>{console.error("Error loading GitHub contributions:",t),this.error="Failed to fetch GitHub contributions",this.loading=!1}})}processContributionsData(t){t.sort((p,_)=>new Date(p.date).getTime()-new Date(_.date).getTime());let o=new Map;t.forEach(p=>{o.set(p.date,p.count)});let r=[],u=new Date,h=new Date(u);h.setDate(u.getDate()-52*7);let y=h.getDay();h.setDate(h.getDate()-y);let f=new Date(h);for(;f<=u;){let p=[];for(let _=0;_<7;_++){let I=f.toISOString().split("T")[0],G=o.get(I)||0;p.push({date:I,count:G,day:f.getDay()}),f.setDate(f.getDate()+1)}r.push(p)}this.contributionsGrid=r}getContributionColor(t){return t===0?"var(--border-color)":t<3?"#0e4429":t<6?"#006d32":t<9?"#26a641":"#39d353"}static{this.\u0275fac=function(o){return new(o||e)(k(P))}}static{this.\u0275cmp=x({type:e,selectors:[["app-github-contributions"]],inputs:{username:"username"},decls:9,vars:5,consts:[[1,"status-item"],["viewBox","0 0 24 24","width","24","height","24",1,"icon"],["fill","currentColor","d","M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"],[4,"ngIf"],["class","error",4,"ngIf"],["class","contributions-grid",4,"ngIf"],["class","recent-repos",4,"ngIf"],[1,"error"],[1,"contributions-grid"],[1,"contributions-months"],["class","month-label",4,"ngFor","ngForOf"],[1,"contributions-days-container"],[1,"contributions-days-labels"],[1,"day-label"],[1,"contributions-weeks-container"],["class","contributions-week",4,"ngFor","ngForOf"],[1,"contributions-legend"],[1,"legend-label"],[1,"legend-colors"],[1,"legend-color",2,"background-color","var(--border-color)"],[1,"legend-color",2,"background-color","#0e4429"],[1,"legend-color",2,"background-color","#006d32"],[1,"legend-color",2,"background-color","#26a641"],[1,"legend-color",2,"background-color","#39d353"],[1,"month-label"],[1,"contributions-week"],["class","contributions-day",3,"background-color","title",4,"ngFor","ngForOf"],[1,"contributions-day",3,"title"],[1,"recent-repos"],[4,"ngFor","ngForOf"],["target","_blank",3,"href"],["class","repo-language",4,"ngIf"],[1,"repo-language"]],template:function(o,r){o&1&&(i(0,"div")(1,"p",0),C(),i(2,"svg",1),g(3,"path",2),n(),m(4,R,2,1,"span",3)(5,V,2,0,"span",3)(6,j,2,1,"span",4),n(),m(7,W,24,2,"div",5)(8,K,5,1,"div",6),n()),o&2&&(a(4),s("ngIf",!r.loading&&!r.error),a(),s("ngIf",r.loading),a(),s("ngIf",r.error),a(),s("ngIf",!r.loading&&!r.error),a(),s("ngIf",!r.loading&&!r.error&&r.recentRepositories.length>0))},dependencies:[M,T,D],styles:[".contributions-grid[_ngcontent-%COMP%]{margin:1rem 0}.contributions-months[_ngcontent-%COMP%]{display:flex;margin-left:30px;margin-bottom:5px}.month-label[_ngcontent-%COMP%]{flex:1;text-align:center;font-size:.7rem;color:var(--secondary-text)}.contributions-days-container[_ngcontent-%COMP%]{display:flex}.contributions-days-labels[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;padding-right:5px;font-size:.7rem;color:var(--secondary-text)}.day-label[_ngcontent-%COMP%]{height:15px;line-height:15px}.contributions-weeks-container[_ngcontent-%COMP%]{display:flex;gap:2px;overflow-x:auto}.contributions-week[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px}.contributions-day[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:2px;background-color:var(--border-color)}.contributions-legend[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-end;margin-top:5px;font-size:.7rem;color:var(--secondary-text)}.legend-colors[_ngcontent-%COMP%]{display:flex;gap:2px;margin:0 5px}.legend-color[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:2px}.recent-repos[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:.5rem 0 0}.recent-repos[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:.5rem}.repo-language[_ngcontent-%COMP%]{font-size:.8rem;color:var(--secondary-text);margin-left:.5rem}.error[_ngcontent-%COMP%]{color:#ff4d4f}"]})}}return e})();export{X as a,P as b,ot as c};
