	/*时间*/
	function formatDateTime(inputTime) {    
        var date = new Date(inputTime);  
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    
        m = m < 10 ? ('0' + m) : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d;    
        var h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        var second = date.getSeconds();  
        minute = minute < 10 ? ('0' + minute) : minute;    
        second = second < 10 ? ('0' + second) : second;   
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
    }; 

    /*分页*/
    function pageList(pUrl, pContainer, pNum,appendId,func){
        $.ajax({
            type: "GET",
            url: pUrl,
            dataType: "json",
            success:function(str){
                $.jqPaginator(pContainer, {             //pContainer 分页容器
                    totalPages: parseInt(str.length/pNum)+1,     //数据总页数
                    visiblePages: 10,                   //设置最多显示的页码数
                    currentPage: 1,                     //设置当前页码
                    pageSize: pNum,                     //pNum 设置每页的条目数
                    first:'<li><a href="javaScript:;">|<<</a></li>',
                    prev:'<li><a href="javaScript:;"><</a></li>',
                    next:'<li><a href="javaScript:;">></a></li>',
                    last:'<li><a href="javaScript:;">>>|</a></li>',
                    page: '<li><a href="javascript:;">{{page}}</a></li>',
                    onPageChange: function(num, type){  //num当前页
                        if(str.length > 0){
                            if(num == parseInt(str.length/pNum)+1){//最后一页显示列表
                                var tags1 = "";
                                for(var j = (num-1)*pNum; j<=str.length-1; j++){
                                    //pageTags(str, j);
                                	
                                    tags1 += func(str, j);
                                }
                                $(appendId).empty().append(tags1);
                            }else{//除最后一页显示列表
                                tags1 = "";
                                for(var q = (num-1)*pNum; q<=num*pNum-1; q++){
                                    tags1 += func(str, q);
                                }
                                $(appendId).empty().append(tags1);
                            }
                        }else{
                            alert("很抱歉，没有数据")
                        }
                    }
                });
            }
        });
    }

    /*drawing数据列表*/
    function drawingFunc(str, n){
        var item = str[n];
        var tag = "";
        tag = "<tr><td>"+item.fileName+"</td><td>"+item.version+"</td><td>"+item.date+"</td><td><a href='' download='"+item.location+"'>下载</a></td></tr>";
        return tag;
    }
    
    /*historyTask数据列表*/
    function historyTaskPageList(str , j){
    	var item = str[j];
        var billName = item.businessKey.split(".")[0];
        var billDescription = null;
        if(billName == 'AllocateBill'){
        	billDescription = '房屋调配';
        }
        return "<tr><td>"+billDescription+
        "</td><td>"+currentUser+
        "</td><td>"+formatDateTime(item.startTime)+
    	"</td><td><a style='margin-right:5px' class='dx-btn-link'"+
    	"onclick=\"viewForminfo(\'"+item.businessKey+"\')\""+
		"data-toggle='modal'"+
		"data-target='#viewForminfo'>查看表单信息</a>"+
	    "<a class='dx-btn-link'"+
		"onclick=\"viewExamineRecord(\'"+item.businessKey+"\')\""+
		"data-toggle='modal'"+
		"data-target='#viewExamineRecord'>查看审批记录</a>"+
        "</td></tr>";
    }
    
    
    