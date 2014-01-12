$(document).ready(function(){
				var random = Math.floor(Math.random()* ((700) + 1)); /*500 base, 200base in second version*/
				var expanded = 0;
				var canProceed = true;
				var bangDay = "";

				$("#METB").click(function(){ //this negates expansion!!!
					expanded = 0;
				})

				$("#moduleExpand").click(function(){
					//alert("clicked");
					if (expanded == 0){
						$("#module").animate({
							height: "335px"
						})
						$("#moduleSubmit").animate({
							marginTop: "85px"
						});
						expanded = 1;
					}
					else if (expanded == 1){
						$("#module").animate({
							height: "250px"
						})
						$("#moduleSubmit").animate({
							marginTop: "0px"
						});
						expanded = 0;
					}
				})
					    $('body').delegate('#fbLogin','click',function() {
        					FB.login(function(response) {}, {scope: 'user_birthday'});
       						return false;
    					});
    					$('body').delegate('#fbLogout','click',function() {
        					FB.logout();
       						return false;
    				s	});
				    $('body').delegate('#fbShare','click',function() {
        				FB.ui({
  									method: 'feed',
  									name: 'When Did Your Parents Bang?',
  									picture: 'http://www.whendidmyparentsbang.com/Logo250.jpg',
  									link: 'http://www.wdmpb.com',
  									caption: 'Calculate the date of your conception',
  									description: 'My parents had sex on ' + bangDay
								}, function(response){});
       				 return false;
    				});
    				$('body').delegate('#twitterShare','click',function() {
							var width  = 575,
                            height = 400,
                            left   = ($(window).width()  - width)  / 2,
                            top    = ($(window).height() - height) / 2,
                            url    = this.href,
                            opts   = 'status=1' +
                             ',width='  + width  +
                             ',height=' + height +
                             ',top='    + top    +
                             ',left='   + left;
                             //https%3A%2F%2FWDMPB.com%20%23WDMPB
                        var bdArray = bangDay.split(" "); //tres objectes
                        var bdText = bdArray[0] + "%20" + bdArray[1] + "%20" + bdArray[2] + ".%20%23WDMPB%20Find%20Your%20Bangday%20At%20";                        

                        var urlText = "http://twitter.com/share?text=My%20Parents%20Had%20Sex%20On%20" + bdText;
                        window.open(urlText, 'twitter',opts);
 
                    return false;
    				});
    				$('body').delegate('#redo','click',function() {
        				window.location.href=window.location.href;
       				 return false;
    				});

				$("#submit").click(function() {
					canProceed = true;
					bangDay = getBangday();
					var bangDayIntro = "Your Parents Had Sex On: ";
					if (canProceed){ //if method doesn't encounter an error
					$("#module").empty(); //empties out module

					$("#content").animate({ //begins animation
						"padding-top": "135px",
						"padding-bottom": "35px"
					}, 500).delay(random + 300).animate({
						"padding-top": "135px", //was 35
						"padding-bottom": "35px"
					}, 500);
					//var marginVal = $(this).marginTop;
					$("#module").animate({
						marginTop: "100px", //was 100
						height: "65px",
						borderRadius: "25px"
					}, 800).queue(function (next){
						$(this).append("<div class=\"meter\"><span style=\"width: 100%\"></span></div>"), //loading bar
						$(".meter > span").each(function() {
							$(this)
								.data("origWidth", $(this).width())
								.width(0)
								.animate({
									width: $(this).data("origWidth")
								}, 3000+random);
						});
						next();
					}).delay(random+4000).queue(function (next){
						$("#module").empty(); //again empties module
						next();
					}).animate({ //rebuilds module
						marginTop: "0px",
						borderRadius: "3px",
						width: "560px",
						height: "230px",
					}, 500).queue(function (next){

						$(this).append(
						"<div id =\"moduleHeader2\">" + bangDayIntro + "<br>" + bangDay + "</div>" +
						"<div id =\"moduleSubmit\">" + 
							"<button type=\"button\" id=\"fbShare\">Share on Facebook</button>" +
							"<button type=\"button\" id=\"twitterShare\">Share on Twitter</button>" +
							"<button type=\"button\" id=\"redo\">Redo</button>" +
						 "</div>"
						 ); 
						next();
					})
				}
				})
				$("#reset").click(function() { //works perfectly!
					$("#month").val("");
					//$('#month').css("line-height", "76px");
					$("#day").val("");
					$("#year").val("");
    				if (expanded == 1){ //resets accordian
						$("#module").animate({
							height: "250px"
						});
						$("#moduleSubmit").animate({
							marginTop: "0px",
						});
					expanded = 0;
						$( "#moduleExpandTitle" ).accordion({
      						active: false
    					});
					}
					$("#premature").attr('checked',false);
					$("#daysPremature").val("");
					$("#radio1").attr('checked',false); //unchecks radio buttons
					$("#radio2").attr('checked',false);
					$("#radio3").attr('checked',false);
					$("#radio4").attr('checked',false);
					$("#radio5").attr('checked',false);
					$("#childNumber").val("");
					$("#mothersAge").val("");
				})

				function getBangday(){ //dirt
					//var month = $('#month').val();
					//if (isNaN(parseInt(month))){
					//	alert("what's good my dude?");
					//}
					//alert(parseInt(month)); //must parse to int
					//alert($("#premature").val());
					var month = parseMonth(); //int!
					var day = parseDay(); //checks if it is a number, that is all
					var year = parseYear(); //checks if it is a number that can be parsed
					var date1 = new myDate(month,day,year);
					var returnString = "how are ya";
					date1.checkMods();
					if (!date1.checkNums()){
						canProceed = false; //stop here.
					}
					else{ 
						//alert("Entered: Month: " + month + " Day: " + day + " Year: " + year);
						date1.subtractDays(265);
						//alert("days subtracted . . .");
						returnString = date1.getFullDate();
						//now actually calculate the bangday
						//alert(date1.subNum);
						//alert($('#premature').val());
					}
					return returnString;
				}

				function myDate(m,d,y){
					this.checkNums = function(){
						if (m < 1 || m > 12){
							alert("Try a different month"); redundant
							return false;
						}
						if (d < 1 || !this.checkDayMonth()){
							alert("Try a different day");
							return false;
						}
						if (y < 1898 || y > 2014){
							alert("Try a different year");
							return false;
						}
						return true;
					}
					this.checkDayMonth = function(){
        					if ((m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m ==12) && d > 31){
        						return false;
        					}
        					else if (m == 2 && ((d > 28 && (y % 4 != 0 || y % 400 == 0)) || (d > 29 && y % 4 === 0))){
        						return false;
        					}
        					else if ((m == 4 || m == 6 || m == 9 || m == 11 ) && d >30){
        						return false;
        					}
        					else{
        						return true;
        					}
   
					}
					this.checkMods = function(){
						//if premature is checked,
						if ($('#premature').is(':checked')){

							if ($('#daysPremature').val() === ""){
								alert("The days field is empty but premature was checked");
								return false;
							}
							else if (parseInt($('#daysPremature').val()) < 0 || parseInt($('#daysPremature').val()) > 125){
								alert("Enter a different value for days preamture");
								return false;
							}
							else if (isNaN(parseInt($('#daysPremature').val()))){
								alert("Estimated days entered is not a number");
								return false;
							}
							else{
								this.subNum -= parseInt($('#daysPremature').val());
									if ($('#radio1').is(':checked')){
									//nothing happens here
									}
									else if ($('#radio2').is(':checked')){
									this.subNum -= 5;
									}
									else if ($('#radio3').is(':checked')){
									this.subNum -= 9;
									}
									else if ($('#radio4').is(':checked')){
									this.subNum -= 11;
									}
									else if ($('#radio5').is(':checked')){
									this.subNum -= 13;
									}
							}
						}
						else{
							if ($('#daysPremature').val() != ""){
								alert("premature not checked!");
								return false;
							}
							//if premature is not checked but there were multiple births
							if ($('#radio1').is(':checked')){
								//nothing happens here, assumed single birth by default
							}
							else if ($('#radio2').is(':checked')){ //these numbers are supposed to be averages, right now estimates
								this.subNum -= 25;
							}
							else if ($('#radio3').is(':checked')){
								this.subNum -= 36;
							}
							else if ($('#radio4').is(':checked')){
								this.subNum -= 41;
							}
							else if ($('#radio5').is(':checked')){
								this.subNum -= 45;
							}
						}
						if ($('#childNumber').val() != ""){ //if you are a certain numbered child
							if(isNaN($('#childNumber').val())){
								alert("Child number is not a number");
								return false;
							}
							else if ($('#childNumber').val() < 1 || $('#childNumber').val() > 15){
								alert("Enter a child number between 1 and 15");
								return false;
							}
							else if ($('#childNumber').val() != 1){
								this.subNum -= Math.floor($('#childNumber').val() * 1.235);
							}
						}
						if ($('#mothersAge').val() != ""){
							if(isNaN($('#mothersAge').val())){
								alert("Mother's Age is not a number");
								return false;
							}
							else if ($('#mothersAge').val() < 15 || $('#mothersAge').val() > 60  ){
								alert("Enter a Mother's age at time of birth between 15 and 60");
								return false;
							}
							else{
								if ($('#mothersAge').val() > 35){
									this.subNum -= Math.floor($('#mothersAge').val() * .2);
								}
								else{
									this.subNum -= Math.floor($('#mothersAge').val() * .1);
								}
								
							}
						}
						return true;
					}
					buildCalendar = function(){
						var tempYears = 2; //construct a calendar of two years
						var tempMonths = 12;
						var calMonthDate = build2dArray(tempYears, tempMonths);
						//calMonthDate[0][0] = 5;
						//alert(calMonthDate[0][0]);
						for (var i = 0; i < tempYears; i++){
							for (var j = 0; j < tempMonths; j++){
								if (i === 1 && j+1 === m){
									calMonthDate[i][j] = d;
									break;
								}
								else if (j+1 === 1 || j+1 === 3 || j+1 === 5 || j+1 === 7 || j+1 === 8 || j+1 === 10 || j+1 === 12){
									calMonthDate[i][j] = 31;
								}
								else if (j+1 === 4 || j+1 === 6 || j+1 === 9 || j+1 === 11){
									calMonthDate[i][j] = 30;
								}
								else if (j+1 === 2 && (y-1+i) % 4 === 0 && (y-1-i) & 400 != 0){
									calMonthDate[i][j] = 29;
								}
								else{
									calMonthDate[i][j] = 28;
								}
							}
						}
						return calMonthDate;
					}
					build2dArray = function(x,y){ //
						var arr = new Array(x);
						for (var i = 0; i < x; i++){
							arr[i] = new Array(y);
						}
						return arr;
					}
					this.subtractDays = function(x){
						var subTemp = this.subNum;
						//alert("subTemp: " + subTemp);
						var j;
						var setDown = 0;
						for (var i = 1; i >= 0; i--){
							if (subTemp == 0){
									this.month = j + 1;
									this.day = this.calendarMonthDate[i][j];
									break;
							}
							if (i === 1){
								j = m - 1;
							}
							else if ( i == 0 && setDown == 0) {
								j = 11;
								setDown = 1;
								//alert("subtemp: " + subTemp);
							}
							for ( ;j >= 0; j--){
								if (i == 0){
									//alert("subtemp: " + subTemp);
									///alert("J: " + j);
								    //alert("calmontdate: " + this.calendarMonthDate[i][j]); 
								}
								while (this.calendarMonthDate[i][j] > 1 && subTemp > 0){
									this.calendarMonthDate[i][j]--;
									subTemp--;
								}
								if (subTemp === 0){
									if (i === 0){
										this.year--;
									}
									this.month = j + 1;
									this.day = this.calendarMonthDate[i][j];
									break;
								}
							}
						}
					}
					this.getMonthName = function(){
						switch(this.month){
							case 1: return "January";
							case 2: return "February";
							case 3: return "March";
							case 4: return "April";
							case 5: return "May";
							case 6: return "June";
							case 7: return "July";
							case 8: return "August";
							case 9: return "September";
							case 10: return "October";
							case 11: return "November";
							case 12: return "December";
						}
					}
					this.getDaySuffix = function(){ //1st, 2nd, 3rd, etc...
						var endDigit = this.day % 10;
						//alert("end digit: " + endDigit); works
						if (this.day > 3 && this.day < 21){
							return "th";
						}
						switch (endDigit){
							case 0: return "th";
							case 1: return "st";
							case 2: return "nd";
							case 3: return "rd";
							default: return "th";
						}
					}
					this.getStatement = function(){
						return "Your Parents Had Sex On " + this.getFullDate();
					}
					this.getFullDate = function(){
						return this.getMonthName() + " " + this.day + this.getDaySuffix() + ", " + this.year;
					}
					this.modSub = 0;
					this.subNum = 260; //this is the weighted average of all time spent in the womb
					this.month = m;
					this.day = d;
					this.year = y;
					this.calendarMonthDate = buildCalendar();

				}

				function parseMonth(){ 
					var month = $('#month').val();
					if (!isNaN(parseInt(month))){
						return parseInt(month);
					}
					else{
						if (month.toLowerCase() === "january" || month.toLowerCase() === "jan"){
							return 1;
						}
						else if (month.toLowerCase() === "february" || month.toLowerCase() === "feb"){
							return 2;
						}
						else if (month.toLowerCase() === "march" || month.toLowerCase() === "mar"){
							return 3;
						}
						else if (month.toLowerCase() === "april" || month.toLowerCase() === "apr"){
							return 4;
						}
						else if (month.toLowerCase() === "may" || month.toLowerCase() === "may"){
							return 5;
						}
						else if (month.toLowerCase() === "june" || month.toLowerCase() === "jun"){
							return 6;
						}
						else if (month.toLowerCase() === "july" || month.toLowerCase() === "jul"){
							return 7;
						}
						else if (month.toLowerCase() === "august" || month.toLowerCase() === "aug"){
							return 8;
						}
						else if (month.toLowerCase() === "september" || month.toLowerCase() === "sept"){
							return 9;
						}
						else if (month.toLowerCase() === "october" || month.toLowerCase() === "oct"){
							return 10;
						}
						else if (month.toLowerCase() === "november" || month.toLowerCase() === "nov"){
							return 11;
						}
						else if (month.toLowerCase() === "december" || month.toLowerCase() === "dec"){
							return 12;
						}
						else{
							alert("Invalid Month - use number or full month name")
							return 0;
						}
						
					}
				}
				function parseDay(){
					var day = $('#day').val();
					if (!isNaN(parseInt(day))){
						return parseInt(day);
					}
					else{
						alert("Invalid day - use a number");
						return 0;
					}
				}
				function parseYear(){
					var year = $('#year').val();
					if (!isNaN(parseInt(year))){
						return parseInt(year);
					}
					else{
						alert("Invalid year - use a four digit number");
						return 0;
					}
				}
			});
		  $(function() {
    		$( "#moduleExpandTitle" ).accordion({
    			collapsible: true,
      			active: false
    		});
 		 });
		$(function() {
			$(".meter > span").each(function() {
				$(this)
					.data("origWidth", $(this).width())
					.width(0)
					.animate({
						width: $(this).data("origWidth")
					}, 1200);
			});
		});
window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : 697377893640118,                        // App ID from the app dashboard
      status     : true,                                 // Check Facebook Login status
      xfbml      : true                                  // Look for social plugins on the page
    });
    var appended = false;
    // Additional initialization code such as adding Event Listeners goes here

    function parseFbDate(dateString){
    		var dateArray = dateString.split("/");
    		$("#month").val(parseMonthInt(parseInt(dateArray[0])));
			$("#day").val(parseInt(dateArray[1]));
			$("#year").val(dateArray[2]);
    	return 0;
    }
    function parseMonthInt(monthNum){
    	switch(monthNum){
		case 1: return "January";
		case 2: return "February";
		case 3: return "March";
		case 4: return "April";
		case 5: return "May";
		case 6: return "June";
		case 7: return "July";
		case 8: return "August";
		case 9: return "September";
		case 10: return "October";
		case 11: return "November";
		case 12: return "December";
						}
    }

    	FB.Event.subscribe('auth.authResponseChange', function(response) {
  			//alert('The status of the session is: ' + response.status);
  			if (response.status === 'connected'){
  				FB.api('/me', function(response) {

                	parseFbDate(response.birthday);

                	$("#fbLogin").toggle();
                	if (!appended){
                		var pictureURL = "https://graph.facebook.com/" + response.id + "/picture?width=30&height=30";
                		$("#moduleSubmit").append("<span style=\"margin-left: 65px;\"> Logged in as " + response.name + "<img style=\"margin-bottom: -10px; padding-left: 5px;\" src=" + pictureURL + "></span>");
                		appended = true;
                	}
                	$("#fbLogout").toggle();
                });
  			}
  			else{
  				$("#moduleSubmit").children("span").remove();
  				appended = false;
  				$("#fbLogin").toggle();
  				$("#fbLogout").toggle();

  			}
  			//alert(response.authResponse.userID);
		});
  };

  // Load the SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());

  function maxLength(el) {    
    if (!('maxLength' in el)) {
        var max = el.attributes.maxLength.value;
        el.onkeypress = function () {
            if (this.value.length >= max) return false;
        };
    }
}

maxLength(document.getElementById("month"));
maxLength(document.getElementById("day"));
maxLength(document.getElementById("year"));