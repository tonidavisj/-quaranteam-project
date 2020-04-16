// Assign all necessary global variables
var movieQueryURL;
var mealQueryURL;
var userInput;
var userInput2;
var lastRandom = [];
var movieArray = [];
var randomMovie;
var newMovie;
var page = Math.floor(Math.random() * 12) + 1;
var drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";

// Stops modal from closing when clicked outside
$("#WelcomeModal").modal({
    backdrop: 'static',
    keyboard: false
});

// On load, hide question 2 and the "enter" button and generate a "next" button
$(document).ready(function () {

    // By default, hide the second question and modalSubmit button
    $(".jumbotron").hide();
    $("#moodForm").hide();
    $("hr").hide();
    $(".modal-footer").hide();

    // Create a "next" button to get to the next question
    var nextBtn = $("<div id='next'><button class='btn btn-light' type='button'><i class='fas fa-arrow-right'></i></button></div>");
    $(".form-group").append($(nextBtn));

    // When the "next" button is clicked, show the second question
    // If no company answers are selected, show error
    $("#next").on("click", function () {
        $("#error").remove();
        $("#crowdForm").hide();
        $("#moodForm").show();
        $("hr").hide();
        $("#next").hide();
        $(".modal-footer").show();
    });

    $("#reload").click(function(){
        location.reload(true);
    });
})

// Function registers a radio button click
$("input[type='radio']").click(function () {
    userInput = $("input[name='mood']:checked").val();
    userInput2 = $("input[name='company']:checked").val();
    checkUserInput();
})

// Function to prevent repeat movies
function checkMovie(randomMovie) {
    if (lastRandom.indexOf(randomMovie) == -1) {
        lastRandom.push(randomMovie);
        newMovie = randomMovie;
    } else {
        randomMovie = Math.floor((Math.random() * movieArray.length));
        checkMovie(randomMovie);
    }
    return newMovie;
}

// Function checks user input and determines movie, drink, and meal query URLs based on TMDB API
function checkUserInput() {
    switch (userInput) {
        case "excited":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=28,12&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            console.log("excited clicked");
            break;

        case "thoughtful":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=99,36,10752&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "sad":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "supernatural":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=14,878&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "happy":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "angry":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "inquisitive":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=9648,80,27,53&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "romantic":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=10749,35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;
    }

    switch (userInput2) {
        case "family":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=10751&certification.lte=G&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            mealQueryURL = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php"
            break;

        case "solo":
            mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert"
            break;

        case "friends":
            mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=side";
            break;

        case "spouse":
            mealQueryURL = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php";
            break;
    }
}

// After answering both questions, create movie cards and randomly generate 3 movies based on user input
$("#submitButton").on("click", function () {
    if (movieQueryURL == undefined) {
        movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=28,12&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
        drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
    }

    if (mealQueryURL == undefined) {
        mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert";
    }

    generateMovie();
    generateFood();
    generateDrink();
    $(".jumbotron").show();
})


function generateMovie(){
    $.ajax({
        url: movieQueryURL,
        method: "GET"
    }).then(function (response) {
        for(var i = 0; i < 4; i++){
            movieArray = response.results;
            console.log(response);

            randomMovie = Math.floor((Math.random() * movieArray.length));
            checkMovie(randomMovie);

            // var movieContainer = $("#movies");
                
            var movieCard =`
                            <div class="card" id="movie${i}">
                                <img class="card-img-top" id='poster' src="https://image.tmdb.org/t/p/w185${movieArray[i].poster_path}" alt="${movieArray[i].title}">
                                <div class="card-body" id="movie-content${i}">
                                    <h5 class="card-title" id="movie-title">${movieArray[i].title}</h5>
                                    <div class="meta">
                                        <span class="date type" alt="${movieArray[i].title}">Release Date: ${movieArray[i].release_date}</span>
                                    </div>
                                    <p class="card-text" id="movie-description${i}">${movieArray[i].overview}<br><br>
                                    <span id='selectBtn${i}' class="selectbtn" style='color: green'><i class='fas fa-check'></i> Selected!</span></p>
                                </div>
                                <div class="card-footer movie-content" id="rating${i}">
                                    <small class="text-muted">Rating: ${movieArray[i].vote_average}</small><br>
                                </div>
                                <button type="button" class="select btn btn-primary btn-sm" id="select${i}">Select Movie</button>

                            </div>
                        `
            $("#movieCard" + i).append($(movieCard));
            $("#selectBtn" + i).css("display", "none");
        }

        $(".select").on("click", function() {
            switch ($(this).attr('id')) {
                case "select0":
                    if ($("#selectBtn0").css('display') == 'block'){
                        $("#selectBtn0").css("display", "none");
                        $("#userMovieChoice").empty();

                    } else {
                        $("#selectBtn0").css("display", "block");
                        $("#userMovieChoice").empty();
                        $("#movie0").clone().appendTo($("#userMovieChoice"));
                    } 
                    break;

                case "select1":
                    if ($("#selectBtn1").css('display') == 'block'){
                        $("#selectBtn1").css("display", "none");
                        $("#userMovieChoice").empty();

                    } else {
                        $("#selectBtn1").css("display", "block");
                        $("#userMovieChoice").empty();
                        $("#movie1").clone().appendTo($("#userMovieChoice"));
                    }              
                    break;

                case "select2":
                    if ($("#selectBtn2").css('display') == 'block'){
                        $("#selectBtn2").css("display", "none");
                        $("#userMovieChoice").empty();

                    } else {
                        $("#selectBtn2").css("display", "block");
                        $("#userMovieChoice").empty();
                        $("#movie2").clone().appendTo($("#userMovieChoice"));
                    }         
                    break;

                case "select3":
                    if ($("#selectBtn3").css('display') == 'block'){
                        $("#selectBtn3").css("display", "none");
                        $("#userMovieChoice").empty();

                    } else {
                        $("#selectBtn3").css("display", "block");
                        $("#userMovieChoice").empty();
                        $("#movie3").clone().appendTo($("#userMovieChoice"));
                    }                 
                    break;
            }
        })
    })
    $("#WelcomeModal").modal("hide");
}


function generateFood(){

    $.ajax({
        url: mealQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var foodContainer = $('#carouselMeals .carousel-inner');

        for(var i = 0; i < 4; i++){
            
            var foodCardFirst =` <div class="carousel-item foodCard active">
                                <div class="card col-md text-center">
                                    <img class="card-img-top" src="${response.meals[i].strMealThumb}" alt="${response.meals[i].strMeal}">
                                    <div class="card-body" id="food-content">
                                        <h5 class="card-title" id="food-name">${response.meals[i].strMeal}</h5>
                                        
                                    </div>
                                    <a class="selectFood btn btn-primary btn-lg" href="#" role="button">Select Item</a>
                                </div>
                            </div>
                        `
            var foodCard =` <div class="carousel-item foodCard">
                                <div class="card col-md text-center">
                            <img class="card-img-top" src="${response.meals[i].strMealThumb}" alt="${response.meals[i].strMeal}">
                            <div class="card-body" id="food-content">
                                <h5 class="card-title" id="food-name">${response.meals[i].strMeal}</h5>
                                
                            </div>
                            <a class="selectFood btn btn-primary btn-lg" href="#" role="button">Select Item</a>
                        </div>
                    </div>
                `

            //foodContainer.append(foodCard);

            //$("#carouselMeals .carousel-inner").append(foodCard);

            if(i == 0){
                foodContainer.append(foodCardFirst);
            }else{
                foodContainer.append(foodCard);
            }

        }
    }); 

}

$("body").delegate('.selectFood',"click",function(){
    console.log($(this)[0].offsetParent);
    console.log($('#userFoodChoice')[0].innerHTML);

    var selectedFood = $(this)[0].offsetParent;

   if($('#userFoodChoice')[0].innerHTML == ""){
    $(selectedFood).clone().appendTo('#userFoodChoice')
   }else{
    $('#userFoodChoice').empty();
    $(selectedFood).clone().appendTo('#userFoodChoice')
   }


});

function generateDrink(){

    var drinkContainer = $('#carouselDrinks .carousel-inner');

    $.ajax({
        url: drinkQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        
        for(var i = 0; i < 4; i++){
            var drinkIn = '';
            // debugger;
            // for(var k = 0; k < 15; k++){
            //     var n = 1;
            //     if(response.drinks[i].strIngredient[n] != null){
            //         drinkIn = drinkIn + ', ' + response.drinks[i].strIngredient[n];
            //     }
            //     n++;
            // }

            if(response.drinks[i].strIngredient1 != null){
                drinksIn = response.drinks[i].strIngredient1;
            }
            
            if(response.drinks[i].strIngredient2 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient2;
            }
            
            if(response.drinks[i].strIngredient3 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient3 + ", ";
            }
            
            if(response.drinks[i].strIngredient4 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient4  + ", ";
            }
            
            if(response.drinks[i].strIngredient5 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient5  + ", ";
            }
            
            if(response.drinks[i].strIngredient6 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient6  + ", ";
            }
            
            if(response.drinks[i].strIngredient7 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient7  + ", ";
            }
            
            if(response.drinks[i].strIngredient8 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient8  + ", ";
            }
            
            if(response.drinks[i].strIngredient9 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient9  + ", ";
            }
            
            if(response.drinks[i].strIngredient10 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient10  + ", ";
            }
            
            if(response.drinks[i].strIngredient11 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient11  + ", ";
            }
            
            if(response.drinks[i].strIngredient12 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient12  + ", ";
            }
            
            if(response.drinks[i].strIngredient13 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient13 + ", ";
            }
            
            if(response.drinks[i].strIngredient14 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient14  + ", ";
            }
            
            if(response.drinks[i].strIngredient15 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient15;
            }

            var drinkCard = ` <div class="carousel-item drinkCard">
                                <div class="card col-md text-center">
                                <img class="card-img-top" src="${response.drinks[i].strDrinkThumb}" alt="${response.drinks[i].strDrink}">
                                <div class="card-body" id="drink-content">
                                    <h5 class="card-title" id="drink-name">${response.drinks[i].strDrink}</h5>
                                    <div class="meta">
                                        <span class="type">${response.drinks[i].strAlcoholic}</span>
                                    </div>
                                    <p class="card-text" id="drink-ingredients"> Ingredients: ${drinksIn}</p>
                                </div>
                                <a class="btn btn-primary btn-lg selectDrink" href="#" role="button">Select Item</a>
                                
                            </div>
                            </div>`

            var drinkCardFirst = `<div class="carousel-item active drinkCard">
                                    <div class="card col-md text-center active">
                                    <img class="card-img-top" src="${response.drinks[i].strDrinkThumb}" alt="${response.drinks[i].strDrink}">
                                    <div class="card-body" id="drink-content">
                                        <h5 class="card-title" id="drink-name">${response.drinks[i].strDrink}</h5>
                                        <div class="meta">
                                            <span class="type">${response.drinks[i].strAlcoholic}</span>
                                        </div>
                                        <p class="card-text" id="drink-ingredients"> Ingredients: ${drinksIn}</p>
                                    </div>
                                    <a class="btn btn-primary btn-lg selectDrink" href="#" role="button">Select Item</a>
                                    </div>
                                </div>`

            // drinkContainer.append(drinkCard);

            if(i == 0){
                drinkContainer.append(drinkCardFirst);
            }else{
                drinkContainer.append(drinkCard);
            }
        }
    }); 

}

$("body").delegate('.selectDrink',"click",function(){
    console.log($(this)[0].offsetParent);
    console.log($('#userDrinkChoice')[0].innerHTML);

    var selectedDrink = $(this)[0].offsetParent;

    if($('#userDrinkChoice')[0].innerHTML == ""){
        $(selectedDrink).clone().appendTo('#userDrinkChoice')
       // $('#userDrinkChoice').append(selectedDrink);
    }else{
        $('#userDrinkChoice').empty();
        $(selectedDrink).clone().appendTo('#userDrinkChoice')
    }


});
