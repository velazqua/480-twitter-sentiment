console.log("HELLO?");
function CF (num, contest, rank, solved, rchange, rating) {
  this.num = num;
  this.contest = contest;
  this.rank = rank;
  this.solved = solved;
  this.rchange = rchange;
  this.rating = rating;
}
  $(document).ready(function(){
  console.log("We are here");
  $.get('cf_data.html', function(d){
    var tbl = $(d).find('tbody').last();
    console.log(tbl);
    var table = $(document.createElement('table'));
    var thead = $(document.createElement('tr'));
    thead.append($(document.createElement('th')).html("#"));
    thead.append($(document.createElement('th')).html("Contest"));
    thead.append($(document.createElement('th')).html("Rank"));
    thead.append($(document.createElement('th')).html("Solved"));
    thead.append($(document.createElement('th')).html("Rating Change"));
    thead.append($(document.createElement('th')).html("New Rating"));
    table.append(thead);
    table.attr('class', 'table table-striped');
    var cfs = [];	

    $(tbl).find('tr').each(function(){
      var $row = $(this);
      var num = $row.find('td:nth-child(1)').text();
      var contest = $row.find('td:nth-child(2)').text();
      var rank = $row.find('td:nth-child(3)').text();
      var solved = $row.find('td:nth-child(4)').text();
      var rchange = $row.find('td:nth-child(5)').text();
      var rating = $row.find('td:nth-child(6)').text();
      cfs.push(new CF(num, contest, rank, solved, rchange, rating));
    });
    
    for( i = 0; i < cfs.length; i++ ) {
      var tr = $(document.createElement('tr'));
      tr.append($(document.createElement('td')).html(cfs[i].num));
      tr.append($(document.createElement('td')).html(cfs[i].contest));
      
      var color;
      if (cfs[i].rchange > 0) {
        color = "green";
      }
      else if (cfs[i].rchange < 0)
        color = "red";
      else
        color = "black";
      
      tr.append($(document.createElement('td')).html(cfs[i].rank));
      tr.append($(document.createElement('td')).html(cfs[i].solved));
      tr.append($(document.createElement('td')).html(cfs[i].rchange.toString()).css({"color":color, "font-weight":"bold"}));
      tr.append($(document.createElement('td')).html(cfs[i].rating));
      table.append(tr);
    }
	  $("#output").append(table);
  });
});

