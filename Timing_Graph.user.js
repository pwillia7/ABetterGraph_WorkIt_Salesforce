// ==UserScript==
// @name        Timing Graph
// @namespace   http://example.com/1234
// @include     https://na3.salesforce.com/*
// @version     1
// @require     RGraph.common.core.js
// @require     RGraph.common.dynamic.js
// @require     RGraph.common.tooltips.js
// @require     RGraph.common.context.js
// @require     RGraph.hprogress.js
// @require     RGraph.common.annotate.js
// @require     RGraph.common.key.js
// @require     RGraph.drawing.rect.js
// @require     graph.css
// ==/UserScript==

function createButton() {
  var graphButton = document.createElement("input");
  graphButton.id = "graphButton";
  graphButton.className = "btn";
  graphButton.type = "submit";
  graphButton.value = "Draw Graph";
  graphButton.onclick = drawGraph();
  document.getElementsByClassName("reportActions")[0].insertBefore(graphButton, null);
}

var times = [];
function drawGraph() {
  var u;
  var m;
  var b;
  var a;
  var x;
  var r;
  var y;
  var i;
  var c;
  var z;
  var mainTable = document.getElementsByClassName("reportTable tabularReportTable");
  var rows = mainTable[0].getElementsByClassName("breakRowClass1 breakRowClassBottom");
  var companyRows = mainTable[0].getElementsByClassName("breakRowClass1 breakRowClass1Top");
  var companies = [];
  var chartKey = [];
  var graphData = [];
  for (z = 0; z < companyRows.length; z++) {
    u = companyRows[z].children[1].children[1].innerHTML;
    companies.push(u);
  }
  for (x = 0; x < rows.length; x++) {
    a = rows[x].children;
    for (y = 0; y < a.length; y++) {
      if (a[y].innerHTML !== "&nbsp;") {
        b = a[y].innerHTML.split("<");
        c  = parseFloat(b[0]);
        times.push(c);
      }
    }

  }
  for (m = 0; m < times.length; m++) {
    graphData.push(companies[m]);
    graphData[m] =  graphData[m].concat(" " + times[m]);
  }
  console.log(graphData);
  var chartColors = [];
  for (i = 0; i < companies.length; i++) {
    chartColors.push('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
  }
  var canvas = document.createElement("Canvas");
  canvas.setAttribute("id", "workitGraph");
  canvas.setAttribute("width", "1200");
  canvas.setAttribute("height", "400");

  mainTable[0].parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(canvas, mainTable[0].parentNode.parentNode.parentNode.parentNode);

  for (r = 0; r < companies.length; r++) {
    chartKey.push(r + 1);
  }
  console.log(chartKey);
  console.log(companies);
  var graph = new RGraph.HProgress('workitGraph', times, 55);
  graph.Set('colors', chartColors);
  graph.Set('key.interactive', true);
  graph.Set('tooltips', graphData);
  graph.Set('tooltips.font_face', 'Verdana, Geneva, sans-serif');
  graph.Draw();
  document.getElementsByClassName("chartDiv")[0].style.display = 'none';
}
setTimeout(createButton(), 50);
