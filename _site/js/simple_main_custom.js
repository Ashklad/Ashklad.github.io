
$(document).ready(function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    let WIDTH = canvas.width
    let HEIGHT = canvas.height

    function draw() {
        // 기존 이미지 초기화
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        // 이미지 생성
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.font = '40px NexonLv2GothicBold';
        ctx.fillText('마비노기 트친소 시트', 50, 80);

        // https://lts0606.tistory.com/485 참고하기

    }

    function download(canvas, prefix) {
        var link = document.createElement('a');
        link.download = prefix + Date.now() + '.png';
        link.href = document.getElementById('canvas').toDataURL()
        link.click();
    }

    $('#draw').click(function() {
        draw();
    });

    $('#download').click(function() {
        download(document.getElementById('canvas'), 'mabi_');
    });

    $("input").change(function() {
        setTimeout(function() {
            draw();
        }, 100);
    });
    $('input[type=checkbox], select').change(draw);
	$('input[type=select], change').change(draw);

	const profile_img = document.getElementById("profile_img");
	profile_img.addEventListener('change', function (event) {
        let reader = new FileReader();
        reader.onload = function (e){
            img = new Image();
            img.src = e.target.result
            img.onload = function(){
                ctx.save()
                ctx.drawImage(img, 160, 160, 160, 160);
                ctx.restore()
        }
        };
        reader.readAsDataURL(event.target.files[0])
    });

    setTimeout(function() {
        draw();
    }, 1000);
});