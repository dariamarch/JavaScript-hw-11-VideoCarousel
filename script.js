
//Карусель с видео
//Необходимо написать страницу поиска и отображения видео-клипов.
//Страница должна содержать заголовок страницы, инпут для поиска, карусель на сладе которой будет находится один клип.
//Требования к карусели:
//1.	Карусель должна иметь возможность переключения слайдов по кликам на стрелочки вправо/влево.
// При переключении слайда видео, которое проигрывалось, должно быть остановлено, чтобы не допустить воспроизведения сразу двух видео.
//2.	При переключении слайда должно появиться следующее видео.
//URL для получения видео: https://itunes.apple.com/search
//Параметры которые необходимо передать в get запросе: “limit=10&entity=musicVideo&term=” 
//В term= должно содержатся то что ввел пользователь в инпуте

"use strict" 

const $searchForm = $("#search-form");
const $carouselInner = $(".carousel-inner");
const $prev = $(".carousel-control-prev");
const $next = $(".carousel-control-next");
let allVideos = [];


$searchForm.on("submit", (event) => {
    event.preventDefault();
    const query = $("[name='video-name']").val().replace(/\s/g, "+");
    getVideo(query);
    console.log(query);
});

function getVideo(query) {
    
    $.ajax({
        url: "https://itunes.apple.com/search",
        method:"GET",
        data: "limit=10&entity=musicVideo&term=" + query,
        dataType: "json" 
    }).done((response) => {
        console.log("response", response); 
        allVideos=response.results;  

        $carouselInner.empty();
                 
        allVideos.forEach((item) => { 
            $("<div>")
                .addClass("carousel-item")
                .appendTo($carouselInner);
        });

        let $carouselItem = $(".carousel-item");
        $(".carousel-item:first").addClass("active");
                 
        allVideos.forEach((item, i, allVideos) => {     
            $("<video>")
                .attr("src", allVideos[i].previewUrl)
                .attr("controls", "controls")
                .attr("loop", "loop")
                .attr("width", "100%")
                .attr("height", "500px")
                .appendTo($carouselItem[i]);

            $next.on("click", function () {
                $('video')[i].pause();
            });    

            $prev.on("click", function (){
                $('video')[i].pause();
            });    
        });
    })
    
    .fail ((error) => {
        console.log ("error", error);
    })
}

