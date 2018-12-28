function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

		var colors = [
			'#490A3D',
			'#BD1550',
			'#E97F02',
			'#F8CA00',
			'#8A9B0F',
			'#69D2E7',
			'#FA6900',
			'#16a085',
			'#27ae60',
			'#2c3e50',
			'#f39c12',
			'#e74c3c',
			'#9b59b6',
			'#FB6964',
			'#342224',
			'#472E32',
			'#77B1A9',
			'#73A857'
		];

var quotes=[
	// ["推薦的一部電影","alpha team"],
	// ["最近最期待的一件事","alpha team"]
];
      var sliderPeople = document.getElementById("sliderPeople");
      var outPeople = document.getElementById("outPeople");
      var sliderTime = document.getElementById("sliderTime");
      var outTime = document.getElementById("outTime");
      
      outPeople.innerHTML = sliderPeople.value;
      outTime.innerHTML = sliderTime.value;

      sliderPeople.oninput = function() {
        outPeople.innerHTML = this.value;
      }
      sliderTime.oninput = function() {
        outTime.innerHTML = this.value;
      }
     var topic = ["這是 Check In 資料庫"];
     var group = ["這是問題分類"];

     $.getJSON('https://spreadsheets.google.com/feeds/list/1_dTloIAxD4loWNOn3JeHcokU2uo5anzvjDKE3uCYmXs/od6/public/values?alt=json', function (data){
       // console.log(data.feed.entry[0]['gsx$topic']['$t']);
       // console.log(data.feed.entry.length);
       for (var i = 0; i < data.feed.entry.length; i++){
            topic[i] = data.feed.entry[i].gsx$topic['$t'];
            group[i] = data.feed.entry[i].gsx$group['$t'];
      }
      // console.log(topic);
      // console.log(group);

      });

var currentQuote = "";
var currentAuthor = "";
var randomquote = "";
var randomcolor = "";

function getQuote() {
    // randomquote = Math.floor(Math.random() * quotes.length);
  	randomcolor = Math.floor(Math.random() * colors.length);
    // currentQuote = quotes[randomquote][0];
    // currentAuthor = quotes[randomquote][1];
    randomquote = Math.floor(Math.random() * topic.length);
    currentQuote = topic[randomquote];
    currentAuthor = group[randomquote];
	if (inIframe()) {
		$('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=aLamm&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
	}

	$(document).ready(function () {
	    $('html body').animate({
	        backgroundColor: colors[randomcolor],
	        color: colors[randomcolor]
	    }, 500);
	    $('#newquote, .social-icons .fa-twitter').animate({ backgroundColor: colors[randomcolor] }, 500);
			$('blockquote footer').animate({ color: colors[randomcolor] }, 500);
	    $('blockquote').animate({ borderLeftColor: colors[randomcolor] }, 500);
	    $('#quotetext').animate({ opacity: 0 }, 500, function () {
	        $(this).animate({ opacity: 1 }, 500);
	        $(this).text(currentQuote);
	    });
	    $('#quotesource').animate({ opacity: 0 }, 300, function () {
	        $(this).animate({ opacity: 1 }, 500);
	        $(this).text(currentAuthor);
	    });
    });
}

function openURL(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

getQuote();

$(document).ready(function () {
    $('#newquote').on('click', getQuote);
    $('#tweetquote').on('click', function () {
        if (!inIframe()) {
            openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });
});
