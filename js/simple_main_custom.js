
$(document).ready(function() {
    function draw() {

       var profile_img = $('#profile_img');

       // 이미지 생성
       var canvas = document.getElementById("canvas");
       if (!canvas.getContext) {
           return;
       }
       var ctx = canvas.getContext("2d");
       ctx.font = '48px serif';
       ctx.fillText('Hello world', 10, 50);

    }
}