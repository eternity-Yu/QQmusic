document.addEventListener('readystatechange',function(){
	if(document.readyState==='complete'){
//音乐库 存储
		var yinyueku=[
			{name:'光辉岁月',src:'./music/1.mp3',geshou:'Beyond',duration:'4:59'},
			{name:'喜欢你',src:'./music/2.mp3',geshou:'Beyond',duration:'4:36'},
			{name:'海阔天空',src:'./music/3.mp3',geshou:'Beyond',duration:'5:24'},
			{name:'K歌之王',src:'./music/4.mp3',geshou:'陈奕迅',duration:'3:46'},
			{name:'浮夸',src:'./music/5.mp3',geshou:'陈奕迅',duration:'4:45'},
			{name:'好久不见',src:'./music/6.mp3',geshou:'陈奕迅',duration:'4:10'}
		];

//声明常量
			//audio=document.querySelector('#audio');
			//console.log(audio)

		var currentsongindex;//当前播放的第几首歌曲
		var LIEBIAO=3;
		var SHUNXU=2;
		var DANQU=1;
		var SUIJI=4;
		var currentbofangmoshi=LIEBIAO;//记录当前播放模式

//从音乐库中读取 列表
		var createList=function(){
			var el='';
			for(var i=0;i<yinyueku.length;i++){
				var ac=(i==currentsongindex)?'play_current':'';
				el+='<li class="'+ac+'" data-src="'+yinyueku[i].src+'"><strong class="music_name" title="'+yinyueku[i].name+'">'+yinyueku[i].name+'</strong><strong class="singer_name" title="'+yinyueku[i].geshou+'">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_0038RM350w8m1V" mid="0038RM350w8m1V"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
			}
			divsonglist.firstElementChild.innerHTML=el;
			spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>';
		

			var lis=divsonglist.firstElementChild.children;
			for(var i=0;i<lis.length;i++){
				lis[i].index=i;
				lis[i].onclick=function(){
					audio.src=yinyueku[this.index].src;
					currentsongindex=this.index;
					audio.play();
					onsongchange();
				}
//显示收藏 删除等按钮
				lis[i].onmouseover=function(){
					this.classList.add('play_hover');
				}
				lis[i].onmouseout=function(){
					this.classList.remove('play_hover');
				}
			}
		
//删除歌曲
			var des=document.querySelectorAll('.btn_del');
			for (var i = 0; i < des.length; i++) {
				des[i].index=i;
				des[i].onclick=function(e){
					e.stopPropagation();
					/*var that=this;
					yinyueku=yinyueku.filter(function(){
						return yinyueku[that.index];
					})*/
					var newarr=[];
					for (var i = 0; i < yinyueku.length; i++) {
						if(yinyueku[this.index]!=yinyueku[i]){
							newarr.push(yinyueku[i]);
						}
					};
					yinyueku=newarr;
					//console.table(newarr);
					
					if(this.index==currentsongindex){//删除当前播放的歌曲
						if(currentsongindex==yinyueku.length){
							audio.src='';
							uireset();
						}

						else /*if(this.index != currentsongindex)*/{
							audio.src=yinyueku[currentsongindex].src;
							audio.play();
							onsongchange();
						}
					}

					if(this.index<currentsongindex){//删除当前播放上面的歌曲
						currentsongindex-=1;
					}
					createList();
				}
			};
		}
		createList();


	


		var lis=divsonglist.firstElementChild.children;
//播放详情提取
		var onsongchange=function(){
			for(var i=0;i<lis.length;i++){
				lis[i].classList.remove('play_current');
			}
			lis[currentsongindex].classList.add('play_current');
			var cu=yinyueku[currentsongindex];
			document.querySelector('#divsongframe .music_name').firstElementChild.innerHTML=cu.name;

			document.querySelector('#divsongframe .music_name').title=cu.name;
			document.querySelector('#divsongframe .singer_name').innerHTML=cu.geshou;

			document.querySelector('#divsongframe .singer_name').title=cu.geshou;
			document.querySelector('.music_op').style.display='block';
			document.querySelector('#ptime').innerHTML=cu.duration;
		}


//下一首
		var nextSong=function(){
			if(currentsongindex==undefined){
				return;
			}

			if(currentbofangmoshi==SUIJI){
				randomSong();
				return;
			}


			currentsongindex+=1;
			currentsongindex=(currentsongindex==yinyueku.length)?0:currentsongindex;
			audio.src=yinyueku[currentsongindex].src;
			audio.play();
			onsongchange();
		}
		document.querySelector('.next_bt').onclick=nextSong;
//上一首
		var prevSong=function(){
			if(currentsongindex==undefined){ 
				return;
			}
			currentsongindex-=1;
			currentsongindex=(currentsongindex==-1)?yinyueku.length-1:currentsongindex;
			audio.src=yinyueku[currentsongindex].src;
			audio.play();
			onsongchange();
		}
		document.querySelector('.prev_bt').onclick=prevSong;


//随机取歌
		var randomSong=function(){
			currentsongindex=Math.floor(Math.random()*yinyueku.length);
			audio.src=yinyueku[currentsongindex].src;
			audio.play();
			onsongchange();
		}


//播放模式
		btnPlayway.onclick=function(){
			divselect.style.display='block';
		}
		setbofangmoshi=function(num){
			currentbofangmoshi=num;
			divselect.style.display='none';
			var data={
				1:'cycle_single_bt',//单曲循环
				2:'ordered_bt',//顺序播放
				3:'cycle_bt',//列表循环
				4:'unordered_bt'//随机播放
			};
			btnPlayway.className=data[num];
		}
	

//播放 暂停
		btnplay.onclick=function(){
			if(audio.paused){
				if(currentsongindex==undefined){
					divsonglist.firstElementChild.firstChild.classList.add('play_current');
					currentsongindex=0;
					audio.src=yinyueku[0].src;
					onsongchange();
				}
				audio.play();
			}
			else{
				audio.pause();
			}
		}
		audio.onpause=function(){
			btnplay.className='play_bt';
		}
		audio.onplay=function(){
			btnplay.className='pause_bt';
		}

//音量控制
		spanvolume.onclick=function(ev){
			var v= ev.offsetX/this.offsetWidth;
			audio.volume=v;
		}
		audio.onvolumechange=function(){
			if(audio.volume===0){
				spanmute.className='volume_mute';
			}else{
				spanmute.className='volume_icon';
			}
			spanvolumeop.style.left=audio.volume*100+"%";
			spanvolumebar.style.width=audio.volume*100+"%";
		}
		spanvolumeop.onclick=function(ev){
			ev.stopPropagation();//阻止事件冒泡
		}
		//拖动控制音量
		spanvolumeop.onmousedown=function(e){
			e.preventDefault();
			document.onmousemove=function(e){
				var v = (e.clientX - spanvolume.getBoundingClientRect().left)/spanvolume.offsetWidth;
      			if( v >= 0 && v<=1 ){audio.volume = v;}
			}
      		document.onmouseup = function(){
			  	document.onmousemove = null;
			  	document.onmouseup = null;
			};
		}
//静音控制
		spanmute.onclick=(function(){
			var oldvolumn;
			return function(){
				if(audio.volume != 0){
					oldvolumn=audio.volume;
					audio.volume=0;
				}
				else{
					audio.volume=oldvolumn;
				}
			}
		})();

		
//进度条控制
		downloadbar.onclick=function(ev){
			audio.currentTime=ev.offsetX/this.offsetWidth*audio.duration;
		}
		spanplaybar.onclick=function(ev){
			audio.currentTime=ev.layerX/downloadbar.offsetWidth*audio.duration;
		}
		/*spanplayer_bgbar.parentElement.onclick=function(ev){
			audio.currentTime = audio.duration*ev.offsetX/this.offsetWidth;
		}*/
		audio.ontimeupdate=function(){
			var l=this.currentTime/this.duration;
			spanprogress_op.style.left=l*100+'%';
			spanplaybar.style.width=l*100+'%';
			if(audio.ended){//播放结束后根据播放模式选择下一首
				if(currentbofangmoshi==DANQU){
					audio.play();
				}
				else if(currentbofangmoshi==LIEBIAO){
					nextSong();
				}
				else if(currentbofangmoshi==SUIJI){
					randomSong();
				}
				else if(currentbofangmoshi==SHUNXU){
					if(currentsongindex!=yinyueku.length-1){
						nextSong();
					}
					if(currentsongindex==yinyueku.length-1){
						if(audio.ended){
							uireset();
							lis[currentsongindex].classList.remove('play_current');
						}
					}
				}
			}
		}
//阻止
		/*spanprogress_op.onmouseover=function(ev){
			ev.stopPropagation();
		}*/

//进度条显示时间 鼠标划上时
		var times=document.querySelector('.time_show');
		times.style.display='none';
		var zhuanhuan=function(time){
			if(isNaN(time)) return '--:--';
			var m=parseInt(time/60);
			var s=parseInt(time%60);
			m=(m<10)?('0'+m):m;
			s=(s<10)?('0'+s):s;
			return m+':'+s;
		}
		spanplayer_bgbar.parentElement.onmouseover=function(ev){
			times.style.display='block';
			var timesleft=ev.clientX-times.offsetWidth/2+spanprogress_op.offsetWidth/2;
			times.style.left=timesleft+'px';
			var time=ev.clientX/this.offsetWidth*audio.duration;
			time_show.innerHTML=zhuanhuan(time);
		}
		spanplayer_bgbar.parentElement.onmouseout=function(){
			times.style.display='none';
		}

		spanplayer_bgbar.parentElement.onmousemove=function(ev){
			var timesleft=ev.clientX-times.offsetWidth/2+spanprogress_op.offsetWidth/2;
			times.style.left=timesleft+'px';
			var time=ev.clientX/this.offsetWidth*audio.duration;
			time_show.innerHTML=zhuanhuan(time);
		}
		



	//拖动鼠标控制进度条
		spanprogress_op.onmousedown=function(e){
			e.preventDefault();
			audio.pause();
			document.onmousemove=function(e){
				var t = e.clientX /spanplayer_bgbar.offsetWidth;
				if(t>=0 &&t<=1){
					audio.currentTime = audio.duration*t;
				}
			}
			document.onmouseup=function(){
				audio.play();
				document.onmousedown=null;
				document.onmousemove=null;
			}
		}

//清空列表
		clear_list.onclick=function(){
			yinyueku=[];
			createList();
			uireset();
		}
//返回列表初始状态
		var uireset=function(){
			spanprogress_op.style.left='0%';
			spanplaybar.style.width='0%';
			document.querySelector('.music_name').firstElementChild.innerHTML='听我想听的歌！';
			document.querySelector('.singer_name').innerHTML='QQ音乐';
			document.querySelector('.music_op').style.display='none';
			document.querySelector('#ptime').innerHTML='';
			audio.src='';
			btnplay.className='play_bt';
		}

//收起 展开 列表
		divplayframe.style.cssText="opacity:1;";
		var flaglist=true;
		document.querySelector('.close_list').onclick=function(){
			divplayframe.style.cssText="transition:opacity 0.3s ease 0s;opacity:0";
			flaglist=true;
		}
		document.querySelector('.open_list').onclick=function(){
			if(flaglist==true){
				divplayframe.style.cssText="transition:opacity 0.3s ease 0s;opacity:1";
				flaglist=false;
			}
			else if(flaglist==false){
				divplayframe.style.cssText="transition:opacity 0.3s ease 0s;opacity:0";
				flaglist=true;
			}
		}
//展开 收起 播放界面
		var flagfold=true;
		divplayer.style.cssText="left:0px";
		btnfold.onclick=function(){

			if(flagfold==true){
				divplayer.style.cssText="transition:left 0.6s ease 0s;left:0px";
				flagfold=false;

				divplayer.classList.remove('m_player_playing');
				divplayer.classList.add('m_player_folded');


				var i=0;
				function bian(){
					i++;
					if(i>6){
						divplayer.classList.remove('m_player_folded');
						clearInterval(t1);
					}
				}
				var t1=setInterval(bian,100);

			}
			else if(flagfold==false){
				divplayframe.style.cssText="transition:opacity 0.3s ease 0s;opacity:0";
				flaglist=true;

				divplayer.style.cssText="transition:left 0.6s ease 0.3s;left:-540px";
				flagfold=true;

				//divplayer.classList.remove('m_player_folded');

				var i=0;
				function bians(){
					i++;
					if(i>9){
						divplayer.classList.add('m_player_playing');
						clearInterval(t2);
					}
				}
				var t2=setInterval(bians,100);
			}
		}

//滚动条
/*		var heightscroll=function(){
			var h=divlistmain.offsetHeight/(24*yinyueku.length)
			//alert(h)
			if(h>1){
				spanbar.parentElement.style.display='none';
			}
			else{
				spanbar.parentElement.style.display='block';
				spanbar.style.height=spanbar.parentElement.offsetHeight*h + 'px';
			}
		}
		heightscroll();

*/








	}
},false)