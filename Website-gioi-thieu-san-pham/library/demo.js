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
		var num_product = 1;
		var product = $(this);
		var list_link = $(this).find("li");
		var img = $(this).find(".images img");
		$(img).attr({src:$(list_link[0]).attr("link")});
		// xử lí right click	
		product.find(".nut i.right").click(function () {
			i++;
			if(i == list_link.length) i = 0;
			$(img).attr({src:$(list_link[i]).attr("link")});
			// console.log(i);
		});

		//xử lí left click	
		product.find(".nut i.left").click(function () {
			i--;
			if(i < 0) i = list_link.length - 1;
			$(img).attr({src:$(list_link[i]).attr("link")});
			// console.log(i);			
		})

		//xử lí quick-view
		product.find(".quick-view").click(function(){
			product.find('.info-quick-view #number').text(0);
			Cout_amount(0);
			Total(0, 0);
			$(".nen-den").addClass("open");
			$(".open-quick-view").addClass("open");
			$(".open-quick-view .view .small-img").children().remove(); //xóa element trước khi thêm vào
			$(".open-quick-view .view #color").children().remove(); //xóa element trước khi thêm vào

			//xử lí lấy data từ từng sp gán vào .open-quick-view
			//xử lí lấy img gán vào #main-img (hình to)
			$(".open-quick-view .view #main-img").attr({src:$(list_link[0]).attr("link")});

			//xử lí lấy img gán vào .small-img
			for (var i = 0; i < list_link.length; i++) {
				var img = ("<img src=\""+ $(list_link[i]).attr("link")+"\">");
				$(".open-quick-view .view .small-img").append(img);
			}

			//xử lí khi click vào small-img sẽ thay đổi #main-img (hình to)
			$(".open-quick-view .view .small-img img").click(function() {
				new_img = $(this).attr('src');
				$(".open-quick-view .view #main-img").attr({src:new_img});
			});

			//xử lí get name
			name = (product.find(".info-quick-view #name").text());
			$('.open-quick-view .view #name').text(name);
			
			//xử lí get cost
			cost = (product.find(".info-quick-view #cost").text());
			$('.open-quick-view .view #cost span').text(cost);

			//xử lí get status
			status = (product.find(".info-quick-view #status").text());
			$('.open-quick-view .view #status span').text(status);
			//xử lí màu status
			if(status=="In stock") $('.open-quick-view .view #status span').attr({style:"color: green"});
			else $('.open-quick-view .view #status span').attr({style:"color: red"});


			//xử lí get describe
			describe = (product.find(".info-quick-view #describe").text());
			$('.open-quick-view .view #describe span').text(describe);

			//xử lí get color
			color = (product.find(".info-quick-view #color").text());
			color = color.split(',');
			for (var i = 0; i < color.length; i++) {
				box_color = "<i class=\"fa fa-square\" style=\"color:"+color[i]+"\"></i>";
				$('.open-quick-view .view #color').append(box_color);
			}

			//xử lí chọn color
			$('.open-quick-view .view #color i.fa.fa-square').click(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
			});

			//xử lí i.fa.fa-plus-square
			$('.open-quick-view .view').find("h6#number i.fa.fa-plus-square").click(function() {
				var num = product.find('.info-quick-view #number').text();
				num++;
				product.find('.info-quick-view #number').text(num);
				Cout_amount(num);
				Total(cost, num);
			});

			//xử lí i.fa.fa-minus-square
			$('.open-quick-view .view').find("h6#number i.fa.fa-minus-square").click(function() {
				var num = product.find('.info-quick-view #number').text();
				if(num > 0) num--;
				Cout_amount(num);
				product.find('.info-quick-view #number').text(num);
				Total(cost, num);
			});
			

		})
	})
	

	//func xử lí #total
	function Total(price, num) {
		$('.open-quick-view .view #total span').text(price*num);
	}

	//func xử lí đếm sl sản phẩm
	function Cout_amount(argument) {
		$('.open-quick-view .view #number #amount').text(argument);
	}

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