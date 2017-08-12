$(document).ready(function() {
  //Variables
  //Listen
  $(".state").click(function() {
    getStateInfo(this.id);
  });
  
  //Functions

  function getStateInfo(st) {
    let name = $("#" + st).attr("name");
    $(".mapTitle").text( $("#" + st).attr("name"));
    $(".state").removeClass("selected");
    $("#" + st).addClass("selected");
    $(".header").text(name);
    $("#stateFlag").attr("src", "https://usa.fmcdn.net/data/flags/w580/" + st.toLowerCase() + ".png");
    $("#stateSeal").attr("src", "http://www.theus50.com/images/state-seals/" + name.toLowerCase().replace(/\s+/g, "") + "-seal.jpg");
    getWiki(name);
  }

  function getWiki(name) {
    if (name == "New York" || name == "Washington") {name += "_(state)";}
    if (name == "Georgia") {name += "_(U.S._state)";}
    $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: {
        format: "json",
        action: "parse",
        page: name,
        prop:"text",
        section:0,
    },
    dataType: 'jsonp',
    success: function (data) {
    var markup = data.parse.text["*"];
		var i = $('<div></div>').html(markup);
		// Clean up results...
		i.find('a').each(function() { $(this).replaceWith($(this).html()); });
		i.find('sup').remove();
		i.find('.mw-ext-cite-error').remove();
		$('.textBox').html($(i).find('p'));
    }
    });
  }

});
