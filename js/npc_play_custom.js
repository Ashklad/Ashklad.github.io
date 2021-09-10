var background_img = ""
var statue_img = ""

$(document).ready(function() {
    let WIDTH = canvas.width
    let HEIGHT = canvas.height
    let MAX_HEIGHT = canvas.height - 50
    var down_gradation = document.getElementById("npc_down")
    var textbox_1 = document.getElementById("npc_talk")
    var textbox_2 = document.getElementById("npc_talk_2")

    function drawRatio(ctx, imgObj, target_width, target_height, start_x, start_y) {
        w = imgObj.width
        h = imgObj.height

        target_ratio = target_width / target_height
        img_ratio = w / h

        if (img_ratio > target_ratio) {
            w = h * (target_width / target_height)
        } else {
            h = w * (target_height / target_width)
        }

        ctx.drawImage(imgObj, 0, 0, w, h, start_x, start_y, target_width, target_height);
    }

    function draw(){
        // 이미지들
        var background_img = document.getElementById("npc_background");
        var npc_standing = document.getElementById("npc_standing");

        // 변수들
        var window_type = document.getElementsByName("text_window_type");
        var site_logo = document.getElementsByName("site_url");
        var chara_name = $("#chara_name").val();
        var chara_talk = $("#chara_talk").val();

        var standing_pos = $("#standing_pos").val();
        var textbox_pos = $("#textbox_pos").val() * 1;
        var chara_talk_x = (textbox_pos + 70);

        // 이미지 생성
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        drawRatio(ctx, background_img, WIDTH, HEIGHT, 0, 0);

        if (npc_standing.height <= MAX_HEIGHT) {
            ctx.drawImage(npc_standing, standing_pos, (HEIGHT - npc_standing.height), npc_standing.width, npc_standing.height);
        } else {
            img_ratio = (npc_standing.width / npc_standing.height);
            new_ratio = (MAX_HEIGHT / npc_standing.height);
            new_height = MAX_HEIGHT;
            new_width = npc_standing.width * new_ratio;
            ctx.drawImage(npc_standing, standing_pos, (HEIGHT - new_height), new_width, new_height);
        }

        ctx.drawImage(down_gradation, 0, (HEIGHT - down_gradation.height), down_gradation.width, down_gradation.height);

        if (window_type[0].checked) { // 심플 말풍선
            ctx.drawImage(textbox_1, textbox_pos, 670, textbox_1.width, textbox_1.height);
        } else {  // 키워드대화
            ctx.drawImage(textbox_2, textbox_pos, 660, textbox_2.width, textbox_2.height);
        }

        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "19px NanumGothic";
        ctx.fillText(chara_name, chara_talk_x, 719);

        ctx.font = "15px NanumGothic"
        const chara_talks = chara_talk.split("\n")
        for (var chara_index in chara_talks) {
            if (chara_index > 3) { break; }
            ctx.fillText(chara_talks[chara_index], chara_talk_x, 761 + 20 * chara_index)
        }

        if (site_logo[0].checked) {
            ctx.font = "20px NexonLv2GothicBold"
            ctx.fillText("mabimg.github.io", (WIDTH - 190), 20)
        }
    }

    function download(canvas, prefix) {
        var link = document.createElement('a');
        link.download = prefix + Date.now() + '.png';
        link.href = document.getElementById('canvas').toDataURL()
        link.click();
    }

    function readImage(input, loadImageId){
	    if (input.files && input.files[0]) {
	        const reader = new FileReader()
	        reader.onload = e => {
	            const loadImage = document.getElementById(loadImageId)
	            loadImage.src = e.target.result
	        }
	        reader.readAsDataURL(input.files[0])
	    }
	}

    const user_background_img = document.getElementById("background_img");
	user_background_img.addEventListener("change", e => {
        readImage(e.target, "npc_background")
	});

    const user_standing_img = document.getElementById("standing_img");
	user_standing_img.addEventListener("change", e => {
        readImage(e.target, "npc_standing")
	});

    $('#apply').click(function() {
        draw();
    });

    $('#download').click(function() {
        download(document.getElementById('canvas'), 'mabi_npc_');
    });

    $("input").change(function() {
        setTimeout(function() {
            draw();
        }, 100);
    });
    $('input[type=checkbox], select').change(draw);
	$('input[type=select], change').change(draw);
    setTimeout(function() {
        draw();
    }, 1000);
});