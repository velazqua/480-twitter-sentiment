console.log("HELLO?");
function SRM (round_name, date, old_rating, new_rating, volatility, rank, percentile) {
  this.round_name = round_name;
  this.date = date;
  this.year = date.substring(0,4);
  this.month = date.substring(5,7);
  this.day = date.substring(8);
  this.old_rating = old_rating;
  this.new_rating = new_rating;
  this.volatility = volatility;
  this.rank = rank;
  this.percentile = percentile;
}

$(document).ready(function(){
  console.log("We are here");
  $.get('alexmula.xml', function(d){
    var table = $(document.createElement('table'));
    var thead = $(document.createElement('tr'));
    thead.append($(document.createElement('th')).html("Round name"));
    thead.append($(document.createElement('th')).html("Date"));
    thead.append($(document.createElement('th')).html("Rating change"));
    thead.append($(document.createElement('th')).html("New Rating"));
    thead.append($(document.createElement('th')).html("Volatility"));
    thead.append($(document.createElement('th')).html("Overall Rank"));
    thead.append($(document.createElement('th')).html("Percentile"));
    table.append(thead);
    table.attr('class', 'table table-striped');
    var srms = [];	

       $(d).find('row').each(function(){
      var $row = $(this);
			var round_name = $row.find('short_name').text();
			var date = $row.find('date').text();
			var old_rating = $row.find('old_rating').text();
			var new_rating = $row.find('new_rating').text();
			var volatility = $row.find('volatility').text();
			var rank = $row.find('rank').text();
			var percentile = $row.find('percentile').text();
      srms.push(new SRM(round_name, date, old_rating, new_rating, volatility, rank, percentile));
    });
    srms.sort(function(a,b){
      if (a.year < b.year) 
        return 1;
      else if (a.year > b.year)
        return -1;
      else if (a.month < b.month)
        return 1;
      else if (a.month > b.month)
        return -1;
      else if (a.day < b.day)
        return 1;
      else if (a.day > b.day)
        return -1;
      else
        return 0;
    });
    for( i = 0; i < srms.length; i++ ) {
      var tr = $(document.createElement('tr'));
      tr.append($(document.createElement('td')).html(srms[i].round_name));
      tr.append($(document.createElement('td')).html(srms[i].date));
      var color;
      var new_rat = srms[i].new_rating;
      var old_rat = srms[i].old_rating;
      var sign = "";
      if (new_rat > old_rat) {
        color = "green";
        sign = "+";
      }
      else if (new_rat < old_rat)
        color = "red";
      else
        color = "black";
      tr.append($(document.createElement('td')).html(sign + (new_rat-old_rat).toString()).css({"color":color, "font-weight":"bold"}));
      tr.append($(document.createElement('td')).html(srms[i].new_rating));
      tr.append($(document.createElement('td')).html(srms[i].volatility));
      tr.append($(document.createElement('td')).html(srms[i].rank));
      tr.append($(document.createElement('td')).html(srms[i].percentile));
      table.append(tr);
    }
	  $("#output").append(table);
  });
});

