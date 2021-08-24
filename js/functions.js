(function ($) {

	"use strict";

	// Preload
	$(window).on('load', function () { // makes sure the whole site is loaded
		$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350).css({
			'overflow': 'visible'
		});
	})

	// Menu
	var overlayNav = $('.cd-overlay-nav'),
		overlayContent = $('.cd-overlay-content'),
		navigation = $('.cd-primary-nav'),
		toggleNav = $('.cd-nav-trigger');

	//inizialize navigation and content layers
	layerInit();
	$(window).on('resize', function(){
		window.requestAnimationFrame(layerInit);
	});

	function layerInit(){
		var diameterValue = (Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
	}

	$(document).ready(function() {
			//date-time
			date_time();
			setInterval(date_time, 1000);
			//start call for create and update blocks
			$.ajax({
					url: "data/data.json",
					type: "GET",
					dataType: "json",
					success: function (e) {

							let append = '';
							var r = e.bloc_right.panel_left;
							var d = e.bloc_right.panel_right;
							var b = e.bloc_left.panel_left;
							var c = e.bloc_left.panel_right;
							var f = e.bloc_cached.panel_left;
							var g = e.bloc_cached.panel_right;
							//store global conf
							localStorage.setItem('Jeedom_url', e.global.jeedom_ip);
							localStorage.setItem('Jeedom_API', e.global.jeedom_apikey);
							//data meteo condition_id, temperature_id, wind_speed_id, pressure_id
							if (e.dmeteo.active === '1') {
								dmeteo(e.dmeteo.condition_id, e.dmeteo.temperature_id, e.dmeteo.wind_speed_id, e.dmeteo.pressure_id);
							}

							//naming blocks
							$(".bloc_left_name").text(e.bloc_left.name);
							$(".bloc_right_name").text(e.bloc_right.name);
							$(".bloc_cached_name").text(e.bloc_cached.name);

							//picture blocks
							$("#bloc_left_picture").append('<img src="'+e.bloc_left.picture+'" alt="" class="img-fluid">');
							$("#bloc_right_picture").append('<img src="'+e.bloc_right.picture+'" alt="" class="img-fluid">');
							$("#bloc_cached_picture").append('<img src="'+e.bloc_cached.picture+'" alt="" class="img-fluid">');

							//right block
							$.each(r, function(key,value) {

									append = '<a href="#" id="'+value.id+'" cmd-id-tog="'+value.cmd_id_tog+'" cmd-id-on="'+value.cmd_id_on+'" cmd-id-off="'+value.cmd_id_off+'" cmd-id="'+value.cmd_id+'" refresh-id="'+value.refresh_id+'" >\n' +
											'                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">\n' +
											'                                <div class="card-body">\n' +
											'                                    <h5 class="card-title">'+value.name+'</h5>\n' +
											'                                    <p class="card-text text-white">N/A</p>\n' +
											'                                </div>\n' +
											'                            </div>\n' +
											'                        </a>';
									$(".add_modules_r_left").append(append);

									let n = value.id.startsWith("swt");
									let nn = value.id.startsWith("temp");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (nn === true){
											temp_state(value.refresh_id, value.id);
									}

							});
							$.each(d, function(key,value) {
									append = '<a href="#" id="'+value.id+'" cmd-id-tog="'+value.cmd_id_tog+'" cmd-id-on="'+value.cmd_id_on+'" cmd-id-off="'+value.cmd_id_off+'" cmd-id="'+value.cmd_id+'" refresh-id="'+value.refresh_id+'" >\n' +
											'                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">\n' +
											'                                <div class="card-body">\n' +
											'                                    <h5 class="card-title">'+value.name+'</h5>\n' +
											'                                    <p class="card-text text-white">N/A</p>\n' +
											'                                </div>\n' +
											'                            </div>\n' +
											'                        </a>';
									$(".add_modules_r_right").append(append);
									let n = value.id.startsWith("swt");
									let nn = value.id.startsWith("temp");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (nn === true){
											temp_state(value.refresh_id, value.id);
									}
							});

							//left block
							$.each(b, function(key,value) {
									var append_temp = '';
									if (value.temp === "1"){
											append_temp = '<small><span aria-hidden="true" temp-cmd-id="'+value.temp_refresh_id+'" id="'+value.temp_id+'"></span>°c / <span aria-hidden="true" hum-cmd-id="'+value.hum_refresh_id+'" id="'+value.hum_id+'"></span>%</small>';
									}
									append = '<a href="#" id="'+value.id+'" cmd-id-tog="'+value.cmd_id_tog+'" cmd-id-on="'+value.cmd_id_on+'" cmd-id-off="'+value.cmd_id_off+'" cmd-id="'+value.cmd_id+'" refresh-id="'+value.refresh_id+'" >\n' +
											'                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">\n' +
											'                                <div class="card-body">\n' +
											'                                    <h5 class="card-title">'+value.name+'</h5>\n' +
											'                                    <p class="card-text text-white">N/A</p>\n' + append_temp +
											'                                </div>\n' +
											'                            </div>\n' +
											'                        </a>';
									$(".add_modules_l_left").append(append);
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});
							$.each(c, function(key,value) {
									var append_temp = '';
									if (value.temp === "1"){
											append_temp = '<small><span aria-hidden="true" temp-cmd-id="'+value.temp_refresh_id+'" id="'+value.temp_id+'"></span>°c / <span aria-hidden="true" hum-cmd-id="'+value.hum_refresh_id+'" id="'+value.hum_id+'"></span>%</small>';
									}
									append = '<a href="#" id="'+value.id+'" cmd-id-tog="'+value.cmd_id_tog+'" cmd-id-on="'+value.cmd_id_on+'" cmd-id-off="'+value.cmd_id_off+'" cmd-id="'+value.cmd_id+'" refresh-id="'+value.refresh_id+'" >\n' +
											'                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">\n' +
											'                                <div class="card-body">\n' +
											'                                    <h5 class="card-title">'+value.name+'</h5>\n' +
											'                                    <p class="card-text text-white">N/A</p>\n' + append_temp +
											'                                </div>\n' +
											'                            </div>\n' +
											'                        </a>';
									$(".add_modules_l_right").append(append);
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});

							//cached block
							$.each(f, function(key,value) {
									var append_temp = '';
									if (value.temp === "1"){
											append_temp = '<small><span aria-hidden="true" temp-cmd-id="'+value.temp_refresh_id+'" id="'+value.temp_id+'"></span>°c / <span aria-hidden="true" hum-cmd-id="'+value.hum_refresh_id+'" id="'+value.hum_id+'"></span>%</small>';
									}
									append = '<a href="#" id="'+value.id+'" cmd-id-tog="'+value.cmd_id_tog+'" cmd-id-on="'+value.cmd_id_on+'" cmd-id-off="'+value.cmd_id_off+'" cmd-id="'+value.cmd_id+'" refresh-id="'+value.refresh_id+'" >\n' +
											'                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">\n' +
											'                                <div class="card-body">\n' +
											'                                    <h5 class="card-title">'+value.name+'</h5>\n' +
											'                                    <p class="card-text text-white"></p>\n' + append_temp +
											'                                </div>\n' +
											'                            </div>\n' +
											'                        </a>';
									$(".add_modules_c_left").append(append);
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});
							$.each(g, function(key,value) {
									var append_temp = '';
									if (value.temp === "1"){
											append_temp = '<small><span aria-hidden="true" temp-cmd-id="'+value.temp_refresh_id+'" id="'+value.temp_id+'"></span>°c / <span aria-hidden="true" hum-cmd-id="'+value.hum_refresh_id+'" id="'+value.hum_id+'"></span>%</small>';
									}
									append = '<a href="#" id="'+value.id+'" cmd-id-tog="'+value.cmd_id_tog+'" cmd-id-on="'+value.cmd_id_on+'" cmd-id-off="'+value.cmd_id_off+'" cmd-id="'+value.cmd_id+'" refresh-id="'+value.refresh_id+'" >\n' +
											'                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">\n' +
											'                                <div class="card-body">\n' +
											'                                    <h5 class="card-title">'+value.name+'</h5>\n' +
											'                                    <p class="card-text text-white"></p>\n' + append_temp +
											'                                </div>\n' +
											'                            </div>\n' +
											'                        </a>';
									$(".add_modules_c_right").append(append);
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});
					},
					complete: function (e) {

					}
			});
			// update modules
			setInterval(update_page, 60000);
			// cached block
			$("#panel_bnb").hide();
			$("#open_bnb").on('click', function () {
					//$(this).toggleAttribute("text", "-", "+");
					var x = document.getElementById("open_bnb");
					if (x.innerHTML === "+") {
							x.innerHTML = "-";
							$(this).attr("style", "background-color: #d80075!important");

					} else {
							x.innerHTML = "+";
							$(this).attr("style", "background-color: #007bff!important");
					}
					$("#panel_ext").toggle(800);
					$("#panel_bnb").toggle(800);
			});
			//refresh page
			$("#logo").on('click', function(){
				document.location.reload();
			})

			// click modules on/off
			$(document).on('click','a[id^="swt_"]', function (e) {
					e.preventDefault();
					let cmd_id = $(this).attr("cmd-id");
					let refresh_id = $(this).attr("refresh-id");
					let swt_id = $(this).attr("id");
					let cmd_id_tog = $(this).attr("cmd-id-tog");
					let cmd_id_on = $(this).attr("cmd-id-on");
					let cmd_id_off = $(this).attr("cmd-id-off");
					
					$(this).children().append('<div data-loader="circle-side"></div>');
					$.ajax({
							url: "http://"+localStorage.getItem('Jeedom_url')+"/core/api/jeeApi.php?apikey="+localStorage.getItem('Jeedom_API')+"&type=cmd&id="+cmd_id,
							type: "GET",
							dataType: "json",
							success: function (r) {
									if (r == 0){
											setTimeout(function(){
												switch_state (refresh_id, cmd_id_tog, cmd_id_on, cmd_id_off, swt_id);
											},700);
									}
									else{
											$("#switch").text("error")
									}
							}
					})
			})
	});
	//functions
	//Date and time
	function date_time() {
			$(".dtime").text(moment().locale('fr').format('LLLL'));
	}
	//meteo
	function dmeteo(condition_id, temperature_id, wind_speed_id, pressure_id){
			$.getJSON("http://"+localStorage.getItem('Jeedom_url')+"/core/api/jeeApi.php","apikey="+localStorage.getItem('Jeedom_API')+"&type=cmd&id="+"%5B"+condition_id+","+temperature_id+","+wind_speed_id+","+pressure_id+"%5D")
				.done(function (e) {
					//console.log(e);
					$(".dmeteo").html(e[condition_id]+' <i class="fas fa-thermometer-three-quarters fa-sm"></i> '+e[temperature_id]+'°c <i class="fas fa-wind fa-sm"></i> '+e[wind_speed_id]+' km/h <i class="fas fa-tachometer-alt fa-sm"></i> '+e[pressure_id]+' mb');
				});

	}
	//update page modules
	function update_page() {
			$.ajax({
					url: "data/data.json?v=0.2.1",
					type: "GET",
					dataType: "json",
					success: function (e) {
							var r = e.bloc_right.panel_left;
							var d = e.bloc_right.panel_right;
							var b = e.bloc_left.panel_left;
							var c = e.bloc_left.panel_right;
							var f = e.bloc_cached.panel_left;
							var g = e.bloc_cached.panel_right;

							//data meteo condition_id, temperature_id, wind_speed_id, pressure_id
							if (e.dmeteo.active === '1') {
								dmeteo(e.dmeteo.condition_id, e.dmeteo.temperature_id, e.dmeteo.wind_speed_id, e.dmeteo.pressure_id);
							}

							$.each(r, function(key,value) {
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});
							$.each(d, function(key,value) {
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});
							$.each(b, function(key,value) {
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});
							$.each(c, function(key,value) {
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});
							$.each(f, function(key,value) {
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});
							$.each(g, function(key,value) {
									let n = value.id.startsWith("swt");
									if (n === true){
											switch_state(value.refresh_id, value.cmd_id_tog, value.cmd_id_on, value.cmd_id_off, value.id);
									}
									if (value.temp === "1"){
											temp_state(value.temp_refresh_id, value.temp_id);
											temp_state(value.hum_refresh_id, value.hum_id);
									}
							});
					}
			});
	}
	//update modules function
	//temperature or humidity
	function temp_state(cmd_id, switch_id) {
			$.ajax({
					url: "http://"+localStorage.getItem('Jeedom_url')+"/core/api/jeeApi.php?apikey="+localStorage.getItem('Jeedom_API')+"&type=cmd&id="+cmd_id,
					type: "GET",
					dataType: "json",
					success: function (r) {
							//console.log(r);
							$("#"+switch_id).text(r);
					}
			})
	}
	//switch on/off or state
	function switch_state(refresh_id, cmd_id_tog, cmd_id_on, cmd_id_off, switch_id){
			$.ajax({
					url: "http://"+localStorage.getItem('Jeedom_url')+"/core/api/jeeApi.php?apikey="+localStorage.getItem('Jeedom_API')+"&type=cmd&id="+refresh_id,
					type: "GET",
					dataType: "json",
					success: function (r) {
							if (r == 0){
									$("#"+switch_id+" .card").attr("style", "background-color: #434bdf!important");
									$("#"+switch_id+" .card-text").text("Éteind");
									if (cmd_id_tog === "0"){
											$("#"+switch_id).attr("cmd-id", cmd_id_on)
									}
							}
							if (r == 1){
									$("#"+switch_id+" .card").attr("style", "background-color: #d80075!important");
									$("#"+switch_id+" .card-text").text("Allumé");
									if (cmd_id_tog === "0"){
											$("#"+switch_id).attr("cmd-id", cmd_id_off);
									}
							}
							$('[data-loader="circle-side"]').fadeOut();
					}
			})
	}

})(window.jQuery);
