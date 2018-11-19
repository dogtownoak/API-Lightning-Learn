$(document).ready(function(){
    console.log('JS is up');

});

var key = 'api_key=zZ3ZP0jg7UN7ZWYwxABMmOSP00sIOIjWZK7MwtAR';
var url = 'https://api.nasa.gov/planetary/apod?';
var urlEpic ='https://api.nasa.gov/EPIC/api/enhanced?';
var urlImg = 'https://epic.gsfc.nasa.gov/archive/enhanced/2018/11/18/png/';

var date = $('input[type="date"]').val();
var dateKey = `date=${date}&`;
var startDate = `start_date=${date}&`;
var endDate = "end_date=2018-11-19&";

$('.landingP').on('click', function(){
    $('.landingP').addClass('hidden');
    $('.imageOne').removeClass('hidden');
});

$('.home').on('click', function(){
    $('.landingP').addClass('hidden');
    $('.imageOne').addClass('hidden');
    $('.epic').removeClass('hidden');
});

$.ajax({
    method: 'GET',
    // url: `${url}${startDate}${endDate}${key}`,
    url: `${url}${dateKey}${key}`,
    data: {
},
success: function( response ) {
    console.log(response);
    console.log(response.url);
    var imageURL = response.url;
    $('.imageOne').prepend('<h2></h2><p></p>');
    $('h2').html(`${response.title}`);
    $('p').html(`${response.explanation}`)
    $('.imageOne').prepend('<img src=>');
    $('.imageOne img').attr('src', `${imageURL}`);
    $('img').on('click', function(){
        $(this).toggleClass('imgToggle');
    });
},

error: function() {
    alert('There was an error getting NASA data.');
}

});

$('img').on('click', function(){
    $(this).toggleClass('imgToggle');
});

$('button').click(function(e){
    e.preventDefault();
    var date = $('input[type="date"]').val();
    var dateKey = `date=${date}&`;


    $.ajax({
        method: 'GET',
        url: `${url}${dateKey}${key}`,
        data: {
    },
    success: function( response ) {
        console.log(response);
        console.log(response.url);
        var imageURL = response.url;

        $('.imageOne img').attr('src', `${imageURL}`);
        $('h2').html(`${response.title}`);
        $('p').html(`${response.explanation}`);
        $('img').on('click', function(){
            $(this).toggleClass('imgToggle');
        });
    },

    error: function() {
        alert('There was an error getting NASA data.');
    }

    }),

    $.ajax({
        method: 'GET',
        url: `${urlEpic}${key}`,
        data: {
    },
    success: function( response ) {
        console.log(response);
        console.log(response.url);
        var imageName = response[0].image;
        var imageURL  = `${urlImg}${imageName}.png`;
        console.log(imageURL);

            $('.epic').append('<img src=>');
            $('.epic img').attr('src', `${imageURL}`);
            $('img').on('click', function(){
                $(this).toggleClass('imgToggle');
            });
    
    },

    error: function() {
        alert('There was an error getting NASA data.');
    }

    });



})