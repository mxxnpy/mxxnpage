import{c as W,d as T,f as x,g as G}from"./chunk-CS2UOYS6.js";import{b as H}from"./chunk-MJNAK4YN.js";import"./chunk-BSY3UMCF.js";import{$a as b,Ca as y,Ga as p,Ja as u,Pa as c,Ra as v,Sa as e,Ta as t,Ua as r,Xa as h,Za as k,_a as M,ab as n,ba as _,bb as l,ca as P,cb as O,d as C,qb as E,rb as w,sb as f,ya as s}from"./chunk-ADBPSF2C.js";function D(o,d){o&1&&(e(0,"div",7)(1,"p"),n(2,"Loading work hours analysis..."),t()())}function N(o,d){if(o&1&&(e(0,"div",8)(1,"p"),n(2),t()()),o&2){let i=h();s(2),l(i.error)}}function z(o,d){if(o&1&&(e(0,"li"),n(1),t()),o&2){let i=d.$implicit;s(),l(i)}}function j(o,d){if(o&1&&(e(0,"li"),n(1),t()),o&2){let i=d.$implicit;s(),l(i)}}function F(o,d){if(o&1&&(e(0,"div",9)(1,"div",10),r(2,"span",11),e(3,"span",12),n(4),t()(),e(5,"div",13)(6,"div",14)(7,"div",15),n(8,"Work Hours Listening"),t(),e(9,"div",16),n(10),t(),e(11,"div",17),n(12,"of total listening time"),t()(),e(13,"div",14)(14,"div",15),n(15,"Peak Listening Time"),t(),e(16,"div",16),n(17),t(),e(18,"div",17),n(19,"most active during this period"),t()(),e(20,"div",14)(21,"div",15),n(22,"Listening Trend"),t(),e(23,"div",16),n(24),t(),e(25,"div",17),n(26,"compared to previous period"),t()()(),e(27,"div",18)(28,"div",19)(29,"h4"),n(30,"Work Hours Genres"),t(),e(31,"ul",20),u(32,z,2,1,"li",21),t()(),e(33,"div",19)(34,"h4"),n(35,"Non-Work Hours Genres"),t(),e(36,"ul",20),u(37,j,2,1,"li",21),t()()(),e(38,"div",22)(39,"h4"),n(40,"Most Productive Genre"),t(),e(41,"div",23),n(42),t()()()),o&2){let i=h();s(),v("active",i.isWorkHours),s(),v("active",i.isWorkHours),s(2),l(i.isWorkHours?"Currently in work hours":"Currently outside work hours"),s(6),O("",i.workHoursPercentage,"%"),s(7),l(i.peakListeningTime),s(6),v("positive",i.listeningTrend.startsWith("+")),s(),l(i.listeningTrend),s(8),c("ngForOf",i.workGenres),s(5),c("ngForOf",i.nonWorkGenres),s(5),l(i.mostProductiveGenre)}}var A=(()=>{class o{constructor(i){this.spotifyService=i,this.loading=!0,this.error=null,this.isWorkHours=!1,this.workHoursPercentage=0,this.peakListeningTime="",this.listeningTrend="",this.workGenres=[],this.nonWorkGenres=[],this.mostProductiveGenre=""}ngOnInit(){this.loadWorkHoursAnalysis()}loadWorkHoursAnalysis(){this.loading=!0,this.error=null,this.spotifyService.getWorkHoursAnalysis().subscribe({next:i=>{this.isWorkHours=i.isCurrentlyInWorkHours||!1,this.workHoursPercentage=i.workHoursPercentage||0,this.peakListeningTime=i.peakListeningTime||"",this.listeningTrend=i.listeningTrend||"",this.workGenres=i.workGenres||[],this.nonWorkGenres=i.nonWorkGenres||[],this.mostProductiveGenre=i.mostProductiveGenre||"",this.loading=!1},error:i=>{console.error("Error loading work hours analysis:",i),this.error="Failed to load work hours analysis",this.loading=!1}})}checkIfWorkHours(){let i=new Date,a=i.getDay(),m=i.getHours(),g=i.getMinutes(),S=m+g/60,L=a>=1&&a<=5,I=S>=8.5&&S<=18.5;return L&&I}static{this.\u0275fac=function(a){return new(a||o)(y(H))}}static{this.\u0275cmp=p({type:o,selectors:[["app-spotify-work-hours"]],decls:9,vars:3,consts:[[1,"card"],[1,"card-header"],["viewBox","0 0 24 24","width","24","height","24",1,"icon"],["fill","currentColor","d","M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"],["class","loading",4,"ngIf"],["class","error",4,"ngIf"],["class","work-hours-content",4,"ngIf"],[1,"loading"],[1,"error"],[1,"work-hours-content"],[1,"status-indicator"],[1,"status-dot"],[1,"status-text"],[1,"stats-grid"],[1,"stat-item"],[1,"stat-label"],[1,"stat-value"],[1,"stat-desc"],[1,"genres-section"],[1,"genres-column"],[1,"genres-list"],[4,"ngFor","ngForOf"],[1,"productivity-section"],[1,"productive-genre"]],template:function(a,m){a&1&&(e(0,"div",0)(1,"div",1),_(),e(2,"svg",2),r(3,"path",3),t(),P(),e(4,"h3"),n(5,"Work Hours Analysis"),t()(),u(6,D,3,0,"div",4)(7,N,3,1,"div",5)(8,F,43,13,"div",6),t()),a&2&&(s(6),c("ngIf",m.loading),s(),c("ngIf",m.error),s(),c("ngIf",!m.loading&&!m.error))},dependencies:[f,E,w],styles:[".card[_ngcontent-%COMP%]{background-color:var(--card-background);border-radius:5px;padding:1.5rem;margin-bottom:1.5rem;border:1px solid var(--border-color)}.card-header[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:1rem}.icon[_ngcontent-%COMP%]{margin-right:.75rem}h3[_ngcontent-%COMP%]{margin:0;font-size:1.25rem;font-weight:600}h4[_ngcontent-%COMP%]{font-size:1rem;font-weight:600;margin:0 0 .75rem}.loading[_ngcontent-%COMP%], .error[_ngcontent-%COMP%]{padding:1rem 0;text-align:center}.error[_ngcontent-%COMP%]{color:#ff4d4f}.status-indicator[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:1.5rem;padding:.75rem;border-radius:4px;background-color:#ffffff0d}.status-indicator.active[_ngcontent-%COMP%]{background-color:#3291ff1a}.status-dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:50%;background-color:var(--secondary-text);margin-right:.75rem}.status-dot.active[_ngcontent-%COMP%]{background-color:var(--accent-color)}.stats-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem}.stat-item[_ngcontent-%COMP%]{padding:.75rem;border-radius:4px;background-color:#ffffff0d;text-align:center}.stat-label[_ngcontent-%COMP%]{font-size:.8rem;color:var(--secondary-text);margin-bottom:.5rem}.stat-value[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;margin-bottom:.25rem}.stat-value.positive[_ngcontent-%COMP%]{color:#52c41a}.stat-desc[_ngcontent-%COMP%]{font-size:.75rem;color:var(--secondary-text)}.genres-section[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem}.genres-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.genres-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:.5rem 0;border-bottom:1px solid var(--border-color);font-size:.9rem}.genres-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child{border-bottom:none}.productivity-section[_ngcontent-%COMP%]{padding:.75rem;border-radius:4px;background-color:#ffffff0d}.productive-genre[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;text-align:center}@media (max-width: 650px){.stats-grid[_ngcontent-%COMP%], .genres-section[_ngcontent-%COMP%]{grid-template-columns:1fr}}"]})}}return o})();var V=["description"],K=(()=>{class o{constructor(){}ngOnInit(){this.animateDescription()}animateDescription(){return C(this,null,function*(){let i="Ol\xE1! Sou um desenvolvedor apaixonado por tecnologia, com foco em desenvolvimento web e solu\xE7\xF5es inovadoras.",a=this.descriptionElement.nativeElement;a.textContent="";for(let m=0;m<i.length;m++)a.textContent+=i[m],yield new Promise(g=>setTimeout(g,50))})}static{this.\u0275fac=function(a){return new(a||o)}}static{this.\u0275cmp=p({type:o,selectors:[["app-about-me"]],viewQuery:function(a,m){if(a&1&&k(V,5),a&2){let g;M(g=b())&&(m.descriptionElement=g.first)}},decls:88,vars:1,consts:[["description",""],[1,"about-me"],[1,"section-title"],[1,"about-content"],[1,"personal-info"],[1,"description"],[1,"tech-grid"],[1,"tech-item"],["src","assets/icons/Python.svg","alt","Python",1,"tech-icon"],["src","assets/icons/JavaScript.svg","alt","JavaScript",1,"tech-icon"],["src","assets/icons/TypeScript.svg","alt","TypeScript",1,"tech-icon"],["src","assets/icons/C# (CSharp).svg","alt","C#",1,"tech-icon"],[1,"frameworks-grid"],[1,"framework-item"],["src","assets/icons/Nest.js.svg","alt","NestJS",1,"tech-icon"],["src","assets/icons/Node.js.svg","alt","Node.js",1,"tech-icon"],["src","assets/icons/Angular.svg","alt","Angular",1,"tech-icon"],["src","assets/icons/Django.svg","alt","Django",1,"tech-icon"],["src","assets/icons/NET core.svg","alt","ASP.NET",1,"tech-icon"],[1,"data-grid"],[1,"data-item"],["src","assets/icons/SQLite.svg","alt","SQLite",1,"tech-icon"],["src","assets/icons/PostgresSQL.svg","alt","PostgreSQL",1,"tech-icon"],["src","assets/icons/Google Cloud.svg","alt","BigQuery",1,"tech-icon"],["src","assets/icons/GraphQL.svg","alt","GraphQL",1,"tech-icon"],[1,"tools-grid"],[1,"tool-item"],["src","assets/icons/Docker.svg","alt","Docker",1,"tech-icon"],["src","assets/icons/Git.svg","alt","Git",1,"tech-icon"],["src","assets/icons/github.svg","alt","GitHub",1,"tech-icon"],["src","assets/icons/Visual Studio Code (VS Code).svg","alt","VS Code",1,"tech-icon"],["src","assets/icons/Postman.svg","alt","Postman",1,"tech-icon"],[1,"spotify-stats"],[1,"subsection-title"]],template:function(a,m){a&1&&(e(0,"section",1)(1,"h2",2),n(2,"Sobre Mim"),t(),e(3,"div",3)(4,"div",4)(5,"p",5,0),n(7," Ol\xE1! Sou um desenvolvedor apaixonado por tecnologia, com foco em desenvolvimento web e solu\xE7\xF5es inovadoras. "),t()(),e(8,"div",6)(9,"div",7),r(10,"img",8),e(11,"span"),n(12,"Python"),t()(),e(13,"div",7),r(14,"img",9),e(15,"span"),n(16,"JavaScript"),t()(),e(17,"div",7),r(18,"img",10),e(19,"span"),n(20,"TypeScript"),t()(),e(21,"div",7),r(22,"img",11),e(23,"span"),n(24,"C#"),t()()(),e(25,"div",12)(26,"div",13),r(27,"img",14),e(28,"span"),n(29,"NestJS"),t()(),e(30,"div",13),r(31,"img",15),e(32,"span"),n(33,"Node.js"),t()(),e(34,"div",13),r(35,"img",16),e(36,"span"),n(37,"Angular"),t()(),e(38,"div",13),r(39,"img",17),e(40,"span"),n(41,"Django"),t()(),e(42,"div",13),r(43,"img",18),e(44,"span"),n(45,"ASP.NET"),t()()(),e(46,"div",19)(47,"div",20),r(48,"img",21),e(49,"span"),n(50,"SQLite"),t()(),e(51,"div",20),r(52,"img",22),e(53,"span"),n(54,"PostgreSQL"),t()(),e(55,"div",20),r(56,"img",23),e(57,"span"),n(58,"BigQuery"),t()(),e(59,"div",20),r(60,"img",24),e(61,"span"),n(62,"GraphQL"),t()()(),e(63,"div",25)(64,"div",26),r(65,"img",27),e(66,"span"),n(67,"Docker"),t()(),e(68,"div",26),r(69,"img",28),e(70,"span"),n(71,"Git"),t()(),e(72,"div",26),r(73,"img",29),e(74,"span"),n(75,"GitHub"),t()(),e(76,"div",26),r(77,"img",30),e(78,"span"),n(79,"VS Code"),t()(),e(80,"div",26),r(81,"img",31),e(82,"span"),n(83,"Postman"),t()()()(),e(84,"div",32)(85,"h3",33),n(86,"Spotify Work Hours"),t(),r(87,"app-spotify-work-hours"),t()()),a&2&&(s(5),c("@typingAnimation",void 0))},dependencies:[f,A],styles:[".about-me[_ngcontent-%COMP%]{margin-top:2rem;max-width:800px;margin-left:auto;margin-right:auto}.about-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2rem;margin-top:1rem}.personal-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1.5rem}.description[_ngcontent-%COMP%]{font-size:1.1rem;line-height:1.6}.tech-section[_ngcontent-%COMP%], .frameworks-section[_ngcontent-%COMP%], .data-section[_ngcontent-%COMP%], .tools-section[_ngcontent-%COMP%], .spotify-stats[_ngcontent-%COMP%]{background-color:var(--card-background);padding:1.5rem;border-radius:8px}.subsection-title[_ngcontent-%COMP%]{font-size:1.25rem;margin-bottom:1rem;border-bottom:1px solid var(--border-color);padding-bottom:.5rem}.tech-grid[_ngcontent-%COMP%], .frameworks-grid[_ngcontent-%COMP%], .data-grid[_ngcontent-%COMP%], .tools-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;padding:1rem 0}.tech-item[_ngcontent-%COMP%], .framework-item[_ngcontent-%COMP%], .data-item[_ngcontent-%COMP%], .tool-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:.5rem;padding:1rem;border-radius:8px;transition:transform .2s}.tech-item[_ngcontent-%COMP%]:hover, .framework-item[_ngcontent-%COMP%]:hover, .data-item[_ngcontent-%COMP%]:hover, .tool-item[_ngcontent-%COMP%]:hover{transform:translateY(-2px)}.tool-icon[_ngcontent-%COMP%]{width:48px;height:48px;object-fit:contain}.spotify-stats[_ngcontent-%COMP%]{margin-top:2rem;padding:1.5rem;background-color:var(--card-background);border-radius:8px}.spotify-stats[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.25rem;margin-bottom:1rem;border-bottom:1px solid var(--border-color);padding-bottom:.5rem}"],data:{animation:[W("typingAnimation",[G(":enter",[x({opacity:0,transform:"translateY(20px)"}),T("0.5s ease-out",x({opacity:1,transform:"translateY(0)"}))])])]}})}}return o})();export{K as AboutMeComponent};
