export function getStrLen(str){
	var len = 0;
  for (var i=0; i<str.length; i++) {
    if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {
       len += 2;
     } else {
       len ++;
     }
   }
  return len;
}
export function JSubString(str,n){ 
var r=/[^\x00-\xff]/g;
if(str.replace(r,"mm").length<=n){return str;}
var m=Math.floor(n/2);
for(var i=m;i<str.length;i++){
if(str.substr(0,i).replace(r,"mm").length>=n){
return str.substr(0,i)+"...";
}
}
return str;
}


//toastr参数
export const toastConfig = {
	timeOut: 3000,
	extendedTimeOut: 1000,
	closeButton:true,
	showAnimation: 'animated fadeIn', //or other animations from animate.css
	hideAnimation: 'animated fadeOut',
}

//生成时间戳
export function createTimeStamp(){
  return parseInt(new Date().getTime() / 1000) + '';
}


//格式化时间
export function dateFormat(val){
  const now = new Date(val * 1000).toLocaleString();
  return now;
}

export function dateFormat2(val,fmt = 'yyyy/MM/dd hh:mm:ss'){
	const now = new Date(val * 1000);
	const o = {
        'M+': now.getMonth() + 1, //月份
        'd+': now.getDate(), //日
        'h+': now.getHours(), //小时
        'm+': now.getMinutes(), //分
        's+': now.getSeconds(), //秒
        'q+': Math.floor((now.getMonth() + 3) / 3), //季度
        'S': now.getMilliseconds() //毫秒
    };
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o)
  if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
}

export function validPhone(val){
	const reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	return reg.test(val);
}

export function getEleLeft(e){
	let left = 0;
	do{
		left += e.offsetLeft;
	}while((e = e.offsetParent).nodeName != 'BODY');
	return left;
}

export function getEleTop(e){
	let top = 0;
	do{
		top += e.offsetTop;
	}while((e = e.offsetParent).nodeName != 'BODY')
	return top;
}
