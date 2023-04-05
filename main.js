// // NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
// //       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
    var items = shirts.length;

    // count the items & show the block
    for (var i = 0; i < shirts.length; i++) { //var i=0; i<items; i++

        if (shirts[i] != undefined) {
            //switch display to true
            var tmp = document.getElementsByClassName('shirt')[i];
            tmp.style.display = "";

            var tmp2 = tmp.querySelector('img');
            tmp2.src = shirts[i]["colors"]["white"]["front"]

            // fetch("products.html")
            // .then( response => console.log(response) )
            // .then( response => console.log(response) )
            // .catch( error => console.log(error) )

            //set name
            var tmp3 = tmp.querySelector('h2');
            tmp3.textContent += shirts[i]['name'];

            //how many colors?
            var tmp4 = tmp.querySelector('p');
            var n_color = String(Object.keys(shirts[i]['colors']).length)
            tmp4.textContent += "Available in " + n_color + " color";

            //set return value
            var tmp5 = tmp.querySelectorAll('button')[1];
            tmp5.value = i;
            // console.log(tmp5.value);
        }
    }


    function showDetails(num) {
        // localStorage.clear();
        localStorage['value'] = num;
        location.href='details.html';
        console.log(localStorage['value']);
    };



    for (var i = 0; i < shirts.length; i++){
        // console.log(this.value);
        document.querySelectorAll('button.see')[i].onclick = function(){
            showDetails(this.value);
        }
    }

    // console.log(document.querySelectorAll('button.see')[0]);

    


    // console.log(document.querySelectorAll('button.see'))

};

let initDetails = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
    console.log(localStorage);
    var num = localStorage.value;
    console.log(num);
    // var show_page = "Beep Boop";

    //default color
    var tmp = document.getElementsByClassName('details_shirt')[0];
    tmp.src = shirts[num]["colors"]["white"]["front"];

    //name
    var tmp2 = document.getElementsByClassName('details_left')[0];
    var tmp3 = tmp2.querySelector('h1');
    tmp3.textContent += shirts[num]["name"];

    //price
    var tmp2 = document.getElementsByClassName('details_right')[0];
    var tmp3 = tmp2.querySelector('h2');
    tmp3.textContent += shirts[num]["price"];

    tmp3 = tmp2.querySelector('p');
    tmp3.textContent += shirts[num]["description"];

    var n_color = String(Object.keys(shirts[num]['colors']).length);
    var tmp3 = document.getElementsByClassName('color')[0];
    for (i = 0; i < n_color; i++) {
        var select = "btn_" + String(i + 1);
        var tmp4 = tmp3.getElementsByClassName(select)[0];
        tmp4.style.display = "";
        tmp4.value = Object.keys(shirts[num]["colors"])[i];
        tmp4.style.backgroundColor = Object.keys(shirts[num]["colors"])[i];
        tmp4.style.color = "black";
    }

    function color_change(color) {
        var now_src = document.getElementsByClassName('details_shirt')[0].src
        var now_side = now_src.split('hw1');
        now_side = now_side[1].split('/')[2].split('-')[2].split('.')[0];
        // console.log(now_side);
        var tmp = document.getElementsByClassName('details_shirt')[0];
        tmp.src = shirts[num]["colors"][color][now_side];
    };

    var tmp5 = document.getElementsByClassName('color');
    var tmp6 = tmp5[0].querySelectorAll('input');
    for (i = 0; i < n_color; i++){
        tmp6[i].onclick = function () {color_change(this.value)};
    }



    function side_change(side) {
        var now_src = document.getElementsByClassName('details_shirt')[0].src
        // now_src.split('hw1');
        var now_color = now_src.split('hw1');
        now_color = now_color[1].split('/')[2].split('-')[1].split('.')[0];
        var tmp = document.getElementsByClassName('details_shirt')[0];
        if (shirts[num]["colors"][now_color][side] != undefined){
            tmp.src = shirts[num]["colors"][now_color][side];
        }
        else {
            tmp.src = "site_images\\not-found.png";
        }
        // tmp.src = shirts[num]["colors"][now_color][side];
    };

    var tmp5 = document.getElementsByClassName('side');
    var tmp6 = tmp5[0].querySelectorAll('input');
    for (i = 0; i < 2; i++){
        tmp6[i].onclick = function () {side_change(this.value)};
    };
};



