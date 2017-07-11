/*
  Please add all Javascript code to this file.
*/
var config = {
    urls: {
        mashable: 'https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json',
        digg: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
        reddit: 'https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/top.json'
    },
    newsSource: ''
}

$(function() {
    $('li.feed-type').on('click',function(){
        //set a function to capture the feedname and input it into the li span called "source-name"
        var content = $(this).text();
        var contentButton = $('#source-name').html(content);
        config.newsSource = content.toLowerCase();
    });

    $('#search').on('click',function(){
        //when the search button is clicked, perform the ajax call to populate with data
        $.ajax({
            method:"GET",
            url: config.urls[config.newsSource]
        }).done(function(data){
            if (config.newsSource == "mashable") {
            getFeedControllerMashable(data);
            //once data is collected, call the getFeedController function which will populate the data.
            }
            if (config.newsSource == "digg") {
            getFeedControllerDigg(data);
            //once data is collected, call the getFeedController function which will populate the data.
            }
            if (config.newsSource == "reddit") {
            getFeedControllerReddit(data);
            //once data is collected, call the getFeedController function which will populate the data.
            }
        })
    });

    //Mashable Template Function
    function getFeedControllerMashable(data){
        var theScriptHTML = $("#articleListTemplate")[0].innerHTML;
        var theTemplate = Handlebars.compile(theScriptHTML);
        var contextObj = theTemplate(data.new);
        $("#main").append(contextObj);
    }
    
    //Digg Template Function
    function getFeedControllerDigg(data){
        var theScriptHTML = $("#articleListTemplateDigg")[0].innerHTML;
        var theTemplate = Handlebars.compile(theScriptHTML);
        var contextObj = theTemplate(data.data.feed);
        $("#main").append(contextObj);
    }

    //Reddit Template Function
    function getFeedControllerReddit(data){
        var theScriptHTML = $("#articleListTemplateReddit")[0].innerHTML;
        var theTemplate = Handlebars.compile(theScriptHTML);
        var contextObj = theTemplate(data.data.children);
        $("#main").append(contextObj);
    }

});