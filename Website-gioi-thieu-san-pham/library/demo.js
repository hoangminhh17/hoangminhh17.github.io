$(function () {
	// body...




	//Xử lý danhmucsanpham 
	//Code copy từ file learnFontEnd\LearnJQuery\chuyen-slide\library\demo.js
	$("body").append("<div class='nen-den'></div>"); // tạo trước cái nền đen
	//tạo trước 1 ảnh để hiển thị
	$(".images").append("<img class=\"image-view\">"); //tao the img
	
	//xử lí chuyển slide cho từng khối ảnh
	$("div.product").each(function (e) {
		// body...
		var i = 0;
		var product = $(this);
		var list_link = $(this).find("li");
		var img = $(this).find(".images img");
		$(img).attr({src:$(list_link[0]).attr("link")});
		// xử lí right click	
		product.find(".nut i.right").click(function () {
			i++;
			if(i == list_link.length) i = 0;
			$(img).attr({src:$(list_link[i]).attr("link")});
			console.log(i);
		});

		//xử lí left click	
		product.find(".nut i.left").click(function () {
			i--;
			if(i < 0) i = list_link.length - 1;
			$(img).attr({src:$(list_link[i]).attr("link")});
			console.log(i);
		})

		//xử lí quick-view
		product.find(".quick-view").click(function(){
			$(".nen-den").addClass("open");
			$(".open-quick-view").addClass("open");
			$(".open-quick-view .view").remove();
			$(".open-quick-view").append("<div class=\"view\"</div>")
			var info = product.find(".info-quick-view").children();
			info.clone().appendTo(".open-quick-view .view");
		})
	})


	$(".open-quick-view i.close, .nen-den").click(function() {
		$(".nen-den").removeClass("open");
		// $(".nen-den").remove();
		$(".open-quick-view").removeClass("open");
	})

	$("body").keyup(function (argument) {
		// body...
		if(argument.keyCode === 27) 
			$(".nen-den").click();
	})

	//Xử lý danhmucsanpham 
	//Code copy từ file learnFontEnd\LearnJQuery\masonry-layout\library\demo.js
	var masonry = $('.noidung').isotope({
	  // options
	  itemSelector: '.khoianh',
	  layoutMode: 'masonry'
	});

	masonry.imagesLoaded().progress( function() {
  		masonry.isotope('layout');
	});

	//xử lí không load lại trang
	$(".danhmuc a").click(function () {
		$(".danhmuc a").removeClass("active");
		$(this).addClass("active");

		//xử lí lọc danh mục
		danhmuc = $(this).attr("data-danhmuc");
		//console.log(danhmuc);
		if(danhmuc=="*")
			masonry.isotope({ filter: danhmuc });
		else
			masonry.isotope({ filter: "[data-danhmuc="+danhmuc+"]" });
			//có thế thay "[data-danhmuc="+danhmuc+"]" bằng cách sử dụng class cho nhanh nếu mỗi mục có các class khác nhau
		return false;
	})

})