var background_img = ""
var profile_img = ""


$(document).ready(function() {
    let WIDTH = canvas.width
    let HEIGHT = canvas.height

    var backplate_img = document.getElementById("simple_backplate")

    function selectDraw(ctx, label, target_name, x, y){
        var x_offset = 0;
        var highlight_color = $("#highlight").val();
        for (var now_index in label) {
            var now_name = label[now_index]
            if (target_name == now_name) {
                ctx.fillStyle = highlight_color;
            } else {
                ctx.fillStyle = "rgb(127, 127, 127)";
            }
            ctx.fillText(now_name, x + x_offset, y);
            x_offset += now_name.length * 18 + 15;
        }
    }

    function radioDraw(ctx, radio, x, y){
        var x_offset = 0;
        var highlight_color = $("#highlight").val();
        for (var now_index = 0, length = radio.length; now_index < length; now_index++) {
            var now_value = radio[now_index].value;
            if (radio[now_index].checked) {
                ctx.fillStyle = highlight_color;
            } else {
                ctx.fillStyle = "rgb(127, 127, 127)";
            }
            ctx.fillText(now_value, x + x_offset, y);
            x_offset += now_value.length * 18 + 15;
        }
    }

    function boolDraw(ctx, label, baseString, x, y) {
        var x_offset = 0;
        var highlight_color = $("#highlight").val();
        for (var now_index in label) {
            var now_name = label[now_index]
            var target_id = "#" + baseString + "_" + now_index
            if ($(target_id).is(":checked")) {
                ctx.fillStyle = highlight_color;
            } else {
                ctx.fillStyle = "rgb(127, 127, 127)";
            }
            ctx.fillText(now_name, x + x_offset, y);
            x_offset += now_name.length * 18 + 15;
        }
    }

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

    function draw() {
        // 이미지들
        var background_img = document.getElementById("simple_background")
        var profile_img = document.getElementById("simple_profile")

        // 변수들
        var channel_name = $("#server").val();
        var chara_name = $("#chara_name").val();
        var nickname = $("#nickname").val();
        var race = $("#race").val();
        var level = $("#level").val();
        var guild = $("#guild").val();
        var family = $("#family").val();
        var age = $("#age").val();
        var main_play = $("#main_play").val();

        var my_channel = $("#my_channel").val();

        var bomb = $("#bomb").val();
        var bomb_solve = $("#bomb_solve").val();
        var etc_talk = $("#etc_talk").val();

        var stroke_color = $("#stroke_color").val();
        var color_max = $("#color_max").val();

        // radio image
        var married = document.getElementsByName("married");
        var spoiler_do = document.getElementsByName("spoiler_do");
        var spoiler_in = document.getElementsByName("spoiler_in");

        // 이미지 생성
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        drawRatio(ctx, background_img, WIDTH, HEIGHT, 0, 0);
        ctx.drawImage(backplate_img, 0, 0, WIDTH, HEIGHT);
        drawRatio(ctx, profile_img, 516, 266, 60, 78);

        // categories
        ctx.font = '18px NexonLv2GothicBold';
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;

        ctx.fillText('캐릭터명', 100, 400);
        ctx.fillText('호칭', 100, 430);
        ctx.fillText('종족', 100, 460);
        ctx.fillText('누적레벨', 100, 490);

        ctx.fillText('길드', 350, 400);
        ctx.fillText('결혼', 350, 430);
        ctx.fillText('패밀리', 350, 460);
        ctx.fillText('메인진행', 350, 490);

        // ctx.fillText('지향색', 100, 540);

        ctx.fillText('서버', 660, 95);
        ctx.fillText('나이', 660, 125);
        ctx.fillText('플레이시간', 660, 155);

        ctx.fillText('평일', 690, 185);
        ctx.fillText('주말', 690, 215);

        ctx.fillText('플레이타입', 660, 245);

        ctx.fillText('주 채널', 660, 335);
        ctx.fillText('스포일러', 660, 365);  ctx.fillText('여부', 740, 365);
                                            ctx.fillText('민감도', 740, 395);

        ctx.fillText('지뢰', 660, 425);
        ctx.fillText('지뢰대응', 660, 455);
        ctx.fillText('하고싶은말', 660, 500);

        // content
        ctx.font = "18px NexonLv2GothicBold";
        ctx.shadowBlur = 0;

        ctx.fillText(chara_name, 200, 400);
        ctx.fillText(nickname, 200, 430);
        ctx.fillText(race, 200, 460);
        ctx.fillText(level, 200, 490);

        ctx.fillText(guild, 450, 400);
        // ctx.fillText(married, 450, 430); // --> 이건 select 로
        ctx.fillText(family, 450, 460);
        ctx.fillText(main_play, 450, 490);
        ctx.fillText(my_channel + " 채널", 750, 335);
        ctx.fillText(bomb, 750, 425);
        ctx.fillText(bomb_solve, 750, 455);

        const etc_talks = etc_talk.split("\n")
        for (var etc_index in etc_talks) {
            if (etc_index > 3) { break; }
            ctx.fillText(etc_talks[etc_index], 675, 550 + 20 * etc_index)
        }

        // select content
        var channel_label = ["류트", "울프", "하프", "만돌린"]
        selectDraw(ctx, channel_label, channel_name, 740, 95);

        var age_label = ["미성년자", "성인", "비공개"]
        selectDraw(ctx, age_label, age, 740, 125)

        // radio content
        radioDraw(ctx, married, 450, 430);
        radioDraw(ctx, spoiler_do, 820, 365);
        radioDraw(ctx, spoiler_in, 820, 395);

        // bool content
        var time_label = ["새벽", "오전", "낮", "저녁", "밤"]
        boolDraw(ctx, time_label, "weekday", 760, 185)
        boolDraw(ctx, time_label, "weekend", 760, 215)

        var play_type_label_1 = ["석상", "사냥", "합주", "의장", "수련", "키트", "수집"]
        var play_type_label_2 = ["저널", "탐험", "낭농", "지령"]
        boolDraw(ctx, play_type_label_1, "playType1", 690, 275)
        boolDraw(ctx, play_type_label_2, "playType2", 690, 305)

        // color set
        color_list = []
        for (now_index = 1; now_index <= 5; now_index++) {
            r = parseInt($("#color" + now_index + "_r").val())
            g = parseInt($("#color" + now_index + "_g").val())
            b = parseInt($("#color" + now_index + "_b").val())
            if (r < 0) {r = 0}; if (r > 255) {r = 255};
            if (g < 0) {g = 0}; if (g > 255) {g = 255};
            if (b < 0) {r = 0}; if (b > 255) {b = 255};
            var color_obj = new Object();
            color_obj.r = r;
            color_obj.g = g;
            color_obj.b = b;
            color_list.push(color_obj);
        }

        // color_preview
        for (now_index = 0; now_index < 5; now_index++) {
            color_obj = color_list[now_index]
            select_color = "rgb(" + color_obj.r + "," + color_obj.g + "," + color_obj.b + ")"
            preview_box = document.getElementById("color" + (now_index + 1) + "_preview");
            preview_box.style.color = select_color;
        }

        // colors
        ctx.font = "10px NexonLv2GothicBold";
        if (color_max > 5) {color_max = 5};
        if (color_max < 1) {color_max = 1};
        color_start_point = 270 - (color_max * 40)
        for (now_index = 0; now_index < color_max; now_index++) {
            color_obj = color_list[now_index]
            select_color = "rgb(" + color_obj.r + "," + color_obj.g + "," + color_obj.b + ")"
            ctx.fillStyle = select_color;
            ctx.fillRect(color_start_point + 105 * now_index, 530, 85, 85);
        }

        ctx.strokeStyle = stroke_color;
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.lineWidth = 3;
        for (now_index = 0; now_index < color_max; now_index++) {
            color_obj = color_list[now_index]
            select_color = "(" + color_obj.r + "," + color_obj.g + "," + color_obj.b + ")"
            ctx.strokeRect(color_start_point + 105 * now_index, 530, 85, 85);
            if (select_color == "(255,255,255)") { ctx.fillStyle = "#000000"; }
            ctx.fillText(select_color, 7 + color_start_point + 105 * now_index, 605);
            ctx.fillStyle = "#ffffff";
        }

        // 폰트 초기화
        ctx.font = '18px NexonLv2GothicBold';
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
    }

    function download(canvas, prefix) {
        var link = document.createElement('a');
        link.download = prefix + Date.now() + '.png';
        link.href = document.getElementById('canvas').toDataURL()
        link.click();
    }

	function colorChange(e, colorObj) {
	    colorObj = this.value;
	}

	function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if(result){
            var r= parseInt(result[1], 16);
            var g= parseInt(result[2], 16);
            var b= parseInt(result[3], 16);
            return r+","+g+","+b;//return 23,14,45 -> reformat if needed
        }
        return null;
    }

    $('#apply').click(function() {
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

	const user_profile_img = document.getElementById("profile_img");
	user_profile_img.addEventListener("change", e => {
        readImage(e.target, "simple_profile")
	});

	const user_background_img = document.getElementById("background_img");
	user_background_img.addEventListener("change", e => {
        readImage(e.target, "simple_background")
	});

    setTimeout(function() {
        draw();
    }, 1000);
});