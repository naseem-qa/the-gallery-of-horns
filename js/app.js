// 'use strict';

// function Horns(data) {
//   this.image_url = data.image_url;
//   this.title = data.title;
//   this.description = data.description;
//   this.keyword = data.keyword;
//   this.horns = data.horns;
//   Horns.all.push(this);
// }
// Horns.all = [];

// Horns.prototype.render = function () {

//   // Create a new empty div tag
//   let hornOutput = $('<div></div>');
//   hornOutput.addClass(this.keyword);

//   // clone (copy) the html from inside the photo-template
//   let template = $('#photo-template').html();

//   // Add the template to the output div
//   hornOutput.html(template);

//   // Put the data in
//   hornOutput.find('h2').text(this.title);
//   hornOutput.find('img').attr('src', this.image_url);
//   hornOutput.find('p').text(this.description);

//   $('main').append(hornOutput);

// };

// function populateSelectBox() {
//   let seen = {};
//   let select = $('select');
//   Horns.all.forEach((horn) => {
//     if (!seen[horn.keyword]) {
//       let option = `<option value="${horn.keyword}">${horn.keyword}</option>`;
//       select.append(option);
//       seen[horn.keyword] = true;
//     }
//   });

//   console.log(seen);
// }

// $('select').on('change', function () {
//   let selected = $(this).val();
//   $('div').hide();
//   $(`.${selected}`).fadeIn(800);
// });

// $.get('../data/page-1.json')
//   .then(data => {
//     data.forEach((thing) => {
//       let horn = new Horns(thing);
//       horn.render();
//     });
//   })
//   .then(() => populateSelectBox());

'use strict'

//Global
let allHorns = [];
let keywordList = [];
let knowCurrentPage;
function Horns(data) {
  this.image_url = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  allHorns.push(this);
}
//Rendering Objects
Horns.prototype.render = function() {
  $('main').append('<section class = "clone"></section>');
  let $clone = $('section[class = "clone"]');
  let hornyTemplate = Handlebars.compile($('#horny-image-template').html());
  
  $clone.html(hornyTemplate(this));
  $clone.removeClass('clone');
  $clone.attr('class', this.title);
  $clone.attr('keyword', this.keyword);
}
//Adding Keyword Filter
Horns.prototype.options = function () {
  if (keywordList.indexOf(this.keyword) === -1) {
    $('select').append('<option class="keyword"></option>');
    let $option = $('option[class="keyword"]');
    $option.find('option').text('value', this.keyword);
    $option.removeClass('keyword');
    $option.attr('value', this.keyword);
    $option.text(this.keyword);
    keywordList.push(this.keyword);
  }
}
//Read Json File
function readJson(filepath) {
  knowCurrentPage = filepath;
  $.get(filepath, 'json').then(data => {
    allHorns = []; //clears out the array
    data.forEach(hornsObj => {
      new Horns(hornsObj)
      
    })
  }).then(() => {
    keywordList = []; //clears out list of keywords
    
    allHorns.forEach(horn => {
      horn.render();
      horn.options();
      console.log('work!');
    })
  })
}
//Code modified from Skyler/Nicole
//Option view handler
$('#filter-options').on('change', function(){
  let val = $(this).val();
  if(val) {
    $('section').hide();
    $(`section[keyword="${val}"]`).show();
  }
});
//Pagination Button Click Handler - Dry
$('.pagination-button').on('click', function(event){
  $('main').empty();
  $('#filter-options').empty();
  $('select').append('<option value="default">Filter by Keyword</option>');
  $(() => readJson(`./data/${event.target.id}.json`));
});
//Sort Button Click Handler - Title
$('#alphabetize').on('click', function(event){
  $('main').empty();
  $('#filter-options').empty();
  $('select').append('<option value="default">Filter by Keyword</option>');
  $(() => readJsonSortTitle(knowCurrentPage));
  console.log(`${event.target.id}`);
});
//Read Json File for Title Sort
function readJsonSortTitle(filepath) {
  $.get(filepath, 'json').then(data => {
    allHorns= []; //clears out the array
    data.forEach(hornsObj => {
      new Horns(hornsObj)
    })
    allHorns.sort(function(a,b){
      if(a.title<b.title) return -1;
      if(a.title>b.title) return 1;
      return 0;
    })
  }).then(() => {
    keywordList = []; //clears out list of keywords
    allHorns.forEach(horn => {
      horn.render();
      horn.options();
    })
  })
}
//Sort Button Click Handler - Horns
$('#horn-sort').on('click', function(event){
  $('main').empty();
  $('#filter-options').empty();
  $('select').append('<option value="default">Filter by Keyword</option>');
  $(() => readJsonSortHorns(knowCurrentPage));
  console.log(`${event.target.id}`);
});
//Read Json File for Horns Sort
function readJsonSortHorns(filepath) {
  $.get(filepath, 'json').then(data => {
    allHorns= []; //clears out the array
    data.forEach(hornsObj => {
      new Horns(hornsObj)
    })
    allHorns.sort(function(a,b){
      if(a.horns<b.horns) return -1;
      if(a.horns>b.horns) return 1;
      return 0;
    })
  }).then(() => {
    keywordList = []; //clears out list of keywords
    allHorns.forEach(horn => {
      horn.render();
      horn.options();
    })
  })
}
//Sort Button Click Handler - Horns
$('#horn-sort').on('click', function(event){
  $('main').empty();
  $('#filter-options').empty();
  $('select').append('<option value="default">Filter by Keyword</option>');
  $(() => readJsonSortHorns(knowCurrentPage));
  console.log(`${event.target.id}`);
});
$(() => readJson('./data/page-1.json'))