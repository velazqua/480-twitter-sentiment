console.log("HELLO?");
var id = 37027;
function UVa_problem(id, name, verdict, lang, rank, totalsubs, time) {
  this.id = id;
  this.name = name;
  this.verdict = verdict;
  this.lang = lang;
  this.rank = rank;
  this.totalsubs = totalsubs;
  this.time = time;
}

function getProblemName (id) {
  var result = 0;
  $.get('http://uhunt.felix-halim.net/api/p/id/' + id, function(d) {
    result = d.pid;
    console.log("inside get: " + result);
    return d.pid;
  });
  console.log("outside get: " + result);
}

function getTotalSubmissions (id) {
  return $.get('http://uhunt.felix-halim.net/api/p/id/' + id, function(d) {
    return d.ac;
  });
}

  $(document).ready(function(){
  console.log("We are here");
  $.get('http://uhunt.felix-halim.net/api/subs-user/' + id, function(d){
    var tbl = d.subs;
    console.log(d);
    console.log(tbl[0][0]);
    //(id, name, verdict, lang, rank, totalsubs, time)
    var table = $(document.createElement('table'));
    var thead = $(document.createElement('tr'));
    thead.append($(document.createElement('th')).html("Problem ID"));
    thead.append($(document.createElement('th')).html("Problem Name"));
    thead.append($(document.createElement('th')).html("Verdict"));
    thead.append($(document.createElement('th')).html("Language"));
    thead.append($(document.createElement('th')).html("Rank"));
    thead.append($(document.createElement('th')).html("Total number of accepted submissions"));
    thead.append($(document.createElement('th')).html("Submit Time"));
    table.append(thead);
    table.attr('class', 'table table-striped');
    
    var problems = [];	
    for (var i = 0; i < tbl.length; i++) {
      //(id, name, verdict, lang, rank, totalsubs, time)
      var id = tbl[i][1];
      var name = getProblemName(id);
      var verdict = tbl[i][2];
      var lang = tbl[i][5];
      var rank = tbl[i][6];
      var totalsubs = getTotalSubmissions(id);
      var time = tbl[i][4];
      problems.push(new UVa_problem(id, name, verdict, lang, rank, totalsubs, time));
    }
    
    for( i = 0; i < problems.length; i++ ) {
      var tr = $(document.createElement('tr'));
      tr.append($(document.createElement('td')).html(problems[i].id));
      tr.append($(document.createElement('td')).html(problems[i].name));
      tr.append($(document.createElement('td')).html(problems[i].verdict));
      tr.append($(document.createElement('td')).html(problems[i].lang));
      tr.append($(document.createElement('td')).html(problems[i].rank));
      tr.append($(document.createElement('td')).html(problems[i].totalsubs));
      tr.append($(document.createElement('td')).html(problems[i].time));
      table.append(tr);
    }
	  $("#output").append(table);
  });
});

