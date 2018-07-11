window.onload = function() {
	var region;
	var product;
	var flag;
	function F_check_all() {
		if($(this).parent().children("[value != 'check-all']:checked").length < $(this).parent().children("[value != 'check-all'] ").length) {
			$(this).parent().children("[value = 'check-all']")[0].checked = false;
		}
		//未全选时 全选为未选择状态
		if($(this).parent().children("[value != 'check-all']:checked").length == $(this).parent().children("[value != 'check-all'] ").length) {
			$(this).parent().children("[value = 'check-all']")[0].checked = true;
		}
		//全选时 全选为已选择状态
	}
	$(".checkbox :not([value='check-all'])").change(F_check_all);

	function F_check_all_click() {
		if($(this)[0].checked == true) {
			$.each($(this).parent().children("[value != 'check-all']"), function(i, n) {
				n.checked = true;
			})
		} else {
			$.each($(this).parent().children("[value != 'check-all']"), function(i, n) {
				n.checked = false;
			})
		}
	}
	$(".checkbox >input[value='check-all']").click(F_check_all_click);
	var flag=false;
	function F_btn_click() {
		var str1 = "";
		var str0 = "";
		var str2 = "";
		$("#table-wrapper>table").children().find("tr").remove("[id!='firsttr']");
		//初始化表格
		var a = $("#product >input[value != 'check-all']:checked ");
		var b = $("#region >input[value != 'check-all']:checked ");

		function F_sourceData_get() {
			var aa = $.grep(sourceData, function(n, i) {
				return n.product == product && n.region == region;
			}, false)

			for(m = 0; m < aa[0].sale.length; m++) {
				str0 += "<th><input value='" + aa[0].sale[m] + "'>" + "</th>";

			}
		}

		function F_product_input() {

			$.each(a, function(i, n) {
				str0 = "";
				switch(n.value) {
					case "phone":
						product = n.name = "手机";
						break;
					case "netebook-computer":
						product = n.name = "笔记本";
						break;
					case "zhinengyinxiang":
						product = n.name = "智能音箱";
						break;
				}
				F_sourceData_get();
				str1 += "<tr>" + "<td id='abc" + i + "' rowspan='" + a.length + "'>" + region + "</td>" + "<th>" + n.name + "</th>" + str0 + "</tr>";

			})

		}

		function F_region_input() {

			$.each(b, function(i, n) {
				str0 = "";
				switch(n.value) {
					case "huanan":
						region = n.name = "华南";
						break;
					case "huadong":
						region = n.name = "华东";
						break;
					case "huabei":
						region = n.name = "华北";
						break;
				}
				F_sourceData_get();
				str2 += "<tr>" + "<td id='abc" + i + "' rowspan='" + b.length + "'>" + product + "</td>" + "<th>" + n.name + "</th>" + str0 + "</tr>";
			})

		}
		if(a.length >= b.length) {
			flag=true;
			$.each(b, function(i, n) {
				switch(n.value) {
					case "huanan":
						region = n.name = "华南";
						F_product_input();
						break;
					case "huadong":
						region = n.name = "华东";
						F_product_input();
						break;
					case "huabei":
						region = n.name = "华北";
						F_product_input();
						break;
				}
			})
			$("table").append(str1);
		} else {
			flag=false;
			$.each(a, function(i, n) {
				switch(n.value) {
					case "phone":
						product = n.name = "手机";
						F_region_input();
						break;
					case "netebook-computer":
						product = n.name = "笔记本";
						F_region_input();
						break;
					case "zhinengyinxiang":
						product = n.name = "智能音箱";
						F_region_input();
						break;
				}
			})

			$("table").append(str2);
		}
		$("#table-wrapper>table").children().find("td[id!='abc0']").hide(0);
		//			清除将要合并的表格
		
		var reg = /^[0-9]+.?[0-9]*$/;
		$("th>input").on("blur",function(){
			
			if(reg.test(this.value)){
			}else{
				alert("输入的不是数字")
			}
		})
		//限制输入条件
		
	}
	$("#btn").click(F_btn_click)
	function F_btn_save_click(){
		if (flag) {
			var a = $("#table-wrapper>table>tbody>tr");
			for(i=0;i<a.length-1;i++){
				var Save_region = $("#table-wrapper>table>tbody>tr:nth-child("+(i+2)+")>td");
				var Save_product = $("#table-wrapper>table>tbody>tr:nth-child("+(i+2)+")>th")
				var Save_sale = $("#table-wrapper>table>tbody>tr:nth-child("+(i+2)+")>th>input")
				$.each(sourceData,function(m,n){
					if( n.product ==  Save_product[0].innerText && n.region == Save_region.text()){
						for(j=0;j<12;j++){
							n.sale[j] = Save_sale[j].value;
						}
					}
				})
				
			}
//			var Save_region = $("#table-wrapper>table>tbody>tr:nth-child(2)>td").text();
//			var Save_product=$("#table-wrapper>table>tbody>tr:nth-child(2)>th")[0].innerText;
			
		} else{
			
			var a = $("#table-wrapper>table>tbody>tr");
			for(i=0;i<a.length-1;i++){
				var Save_product = $("#table-wrapper>table>tbody>tr:nth-child("+(i+2)+")>td");
				var Save_region = $("#table-wrapper>table>tbody>tr:nth-child("+(i+2)+")>th")
				var Save_sale = $("#table-wrapper>table>tbody>tr:nth-child("+(i+2)+")>th>input")
				$.each(sourceData,function(m,n){
					if( n.product == Save_product.text()  && n.region == Save_region[0].innerText){
						for(j=0;j<12;j++){
							n.sale[j] = Save_sale[j].value;
						
						}
					}
				})	
			}
		}
		var str = JSON.stringify(sourceData);
		localStorage.setItem('save',str);
	}
	
	$("#btn-save").click(F_btn_save_click);
}