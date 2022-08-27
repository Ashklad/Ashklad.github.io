var profile_img = ""
var sheet_img = ""
var lover_img1 = ""
var lover_img2 = ""
var lover_img3 = ""

$(document).ready(function() {
    let WIDTH = canvas.width
    let HEIGHT = canvas.height

    var sheet_img = document.getElementById("cream_main_2")

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
            x_offset += now_value.length * 13 + 15;
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
            x_offset += now_name.length * 13 + 25;
            if (now_index < label.length - 1) {
                ctx.fillStyle = "rgb(127, 127, 127)";
                ctx.fillText("/", x + x_offset - 15, y);
            }
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
        // imgs
        var profile_img = document.getElementById("basic_profile")
        var sheet_img = document.getElementById("basic_sheet")
        var lover_img1 = document.getElementById("lover_img_obj_1");
        var lover_img2 = document.getElementById("lover_img_obj_2");
        var lover_img3 = document.getElementById("lover_img_obj_3");

        // var
        var twitter_nickname = $("#twitter_nickname").val();
        var twitter_id = $("#twitter_id").val();
        var age = $("#age").val();
        var ingame_nickname = $("#ingame_nickname").val();
        var server = $("#server").val();
        var my_channel = $("#my_channel").val();
        var level = $("#level").val();
        var guild = $("#guild").val();
        var color1_name = $("#color1_name").val();
        var color2_name = $("#color2_name").val();
        var color3_name = $("#color3_name").val();
        var tw_personality_etc = $("#tw_personality_etc").val();
        var personality_etc = $("#personality_etc").val();
        var mk_personality_etc = $("#mk_personality_etc").val();
        var bomb_info = $("#bomb_info").val();
        var etc_talk = $("#etc_talk").val();

        var lover_name_1 = $("#lover_name_1").val();
        var lover_name_2 = $("#lover_name_2").val();
        var lover_name_3 = $("#lover_name_3").val();
        var lover_preview_img_1 = document.getElementById("lover_preview_img_1");
        var lover_preview_img_2 = document.getElementById("lover_preview_img_2");
        var lover_preview_img_3 = document.getElementById("lover_preview_img_3");
        var lover_img_src_1 = "./imgs/cream/npcs/" + lover_name_1 + ".png"
        var lover_img_src_2 = "./imgs/cream/npcs/" + lover_name_2 + ".png"
        var lover_img_src_3 = "./imgs/cream/npcs/" + lover_name_3 + ".png"

        var font_color = $("#font_color").val();

        // radio var
        var sheet_type = document.getElementsByName("sheet_type");
        var ppp_detail = document.getElementsByName("ppp_detail");
        var bomb_type = document.getElementsByName("bomb");
        var lover_cnt_radio = document.getElementsByName("lover_cnt");

        // make img
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        // select sheet
        if (sheet_type[0].checked){  // 메인트
            document.getElementById("select_main_p").style.display = ""
            document.getElementById("select_tchin_p").style.display = "none"
            if (lover_cnt_radio[0].checked){  // 최애 2명
                document.getElementById("lover_p_3").style.display = "none"
                document.getElementById("lover_img3").style.display = "none"
                sheet_img = document.getElementById("main_2_sheet");
            } else {  // 최애 3명
                document.getElementById("lover_p_3").style.display = ""
                document.getElementById("lover_img3").style.display = ""
                sheet_img = document.getElementById("main_3_sheet");
            }
        } else {  // 트친소
            document.getElementById("select_main_p").style.display = "none"
            document.getElementById("select_tchin_p").style.display = ""
            if (lover_cnt_radio[0].checked) {  // 최애 2명
                document.getElementById("lover_p_3").style.display = "none"
                document.getElementById("lover_img3").style.display = "none"
                sheet_img = document.getElementById("tchin_2_sheet");
            } else {  // 최애 3명
                document.getElementById("lover_p_3").style.display = ""
                document.getElementById("lover_img3").style.display = ""
                sheet_img = document.getElementById("tchin_3_sheet");
            }
        }

        //  ---------------- img & color ----------------- //
        ctx.fillStyle = "#000000"
        ctx.fillRect(canvas.width, canvas.height, 0, 0); // clear canvas
        drawRatio(ctx, profile_img, 195, 195, 43, 330); // profile img
        // color
        // color set
        var color_list = []
        var popup_x = 120; var popup_y = 625;
        for (now_index = 1; now_index <= 4; now_index++) {
            r = parseInt($("#color" + now_index + "_r").val());
            g = parseInt($("#color" + now_index + "_g").val());
            b = parseInt($("#color" + now_index + "_b").val());
            color_name = $("#color" + now_index + "_name").val();
            if (r < 0) {r = 0}; if (r > 255) {r = 255};
            if (g < 0) {g = 0}; if (g > 255) {g = 255};
            if (b < 0) {r = 0}; if (b > 255) {b = 255};
            var color_obj = new Object();
            color_obj.r = r;
            color_obj.g = g;
            color_obj.b = b;
            color_obj.name = color_name;
            color_list.push(color_obj);
        }
        // color_preview
        for (now_index = 0; now_index < 3; now_index++) {
            color_obj = color_list[now_index]
            select_color = "rgb(" + color_obj.r + "," + color_obj.g + "," + color_obj.b + ")"
            preview_box = document.getElementById("color" + (now_index + 1) + "_preview");
            preview_box.style.color = select_color;
        }
        // color fill
        for (now_index = 0; now_index < 3; now_index++) {
            color_obj = color_list[now_index]
            select_color = "rgb(" + color_obj.r + "," + color_obj.g + "," + color_obj.b + ")"
            select_color_show = color_obj.r + "." + color_obj.g + "." + color_obj.b
            ctx.fillStyle = select_color
            ctx.fillRect((popup_x + 105 * now_index), popup_y, 95, 95);
            ctx.fillStyle = "#ffffff"
        }
        // check npc
        ctx.fillRect(600, 150, 600, 420);
        drawRatio(ctx, lover_img1, 140, 140, 720, 420); // npc 1 img
        drawRatio(ctx, lover_img2, 140, 140, 865, 420); // npc 2 img
        drawRatio(ctx, lover_img3, 140, 140, 1010, 420); // npc 3 img
        var default_npc_img_src = "imgs/cream/lover_basic.png"

        if (!lover_img_insert_1.checked) {
            if (imageExists(lover_img_src_1)){
                document.getElementById("lover_img_obj_1").src = lover_img_src_1;
                lover_preview_img_1.src = lover_img_src_1;
            } else {
                document.getElementById("lover_img_obj_1").src = default_npc_img_src;
                lover_preview_img_1.src = default_npc_img_src;
            }
        }
        
        if (imageExists(lover_img_src_2)){
            lover_img2.src = lover_img_src_2;
            lover_preview_img_2.src = lover_img_src_2;
        } else{
            document.getElementById("lover_img_obj_2").src = default_npc_img_src;
            lover_preview_img_2.src = default_npc_img_src;
        }
        if (imageExists(lover_img_src_3)){
            lover_img3.src = lover_img_src_3;
            lover_preview_img_3.src = lover_img_src_3;
        } else{
            document.getElementById("lover_img_obj_3").src = default_npc_img_src;
            lover_preview_img_3.src = default_npc_img_src;
        }
        ctx.drawImage(sheet_img, 0, 0, WIDTH, HEIGHT);  // sheet img

        //  ---------------- img & color ----------------- //
        // font set
        ctx.font = '18px NexonLv2GothicBold';
        // ctx.font = "20px "+select_font;
        ctx.fillStyle = font_color;

        // text input
        ctx.fillText(twitter_nickname, 180, 155);
        ctx.fillText(twitter_id, 180, 190);

        ctx.fillText(age, 120, 230);

        ctx.fillText(ingame_nickname, 350, 350);
        ctx.fillText(my_channel, 355, 420);
        ctx.fillText(level, 370, 455);
        ctx.fillText(guild, 340, 490);

        ctx.fillText(color1_name, 133, 738);
        ctx.fillText(color2_name, 238, 738);
        ctx.fillText(color3_name, 340, 738);
        ctx.fillText(bomb_info, 710, 613);

        // selectDraw
        var server_labels = ["류트", "울프", "하프", "만돌린"];
        selectDraw(ctx, server_labels, server, 340, 385);

        // boolDraw
        var play_label = ["석상", "사냥", "합주", "의장", "마감", "수련", "수집", "미니게임"];
        boolDraw(ctx, play_label, "playType1", 120, 565);
        var play_label_2 = ["탐험", "저널", "제작", "판매"];
        boolDraw(ctx, play_label_2, "playType2", 120, 590);

        if (ppp_detail[0].checked){  // 심플
            document.getElementById("ppp_show_simple").style.display = ""
            document.getElementById("ppp_show_detail").style.display = "none"
            var ppp_label = ["사용", "미사용"];
            boolDraw(ctx, ppp_label, "pppTypeSimple", 150, 792);
        } else {  // 디테일
            document.getElementById("ppp_show_simple").style.display = "none"
            document.getElementById("ppp_show_detail").style.display = ""
            var ppp_label = ["콤비네이션 ", "베이직", "배틀", "라이프", "미사용"]
            boolDraw(ctx, ppp_label, "pppTypeDetail", 150, 792);
        }

        var tw_per_label = ["RT", "마음요정", "폭트", "일상트", "욕트", "섹트", "우울트"];
        boolDraw(ctx, tw_per_label, "tw_personality1", 735, 200);
        var tw_per_guitar = "기타 : " + tw_personality_etc;
        var tw_per_label_2 = ["자캐 덕질", "앤캐 덕질", "타장르 발언", "탐라 대화"];
        boolDraw(ctx, tw_per_label_2, "tw_personality2", 735, 235);
        var tw_per_label_3 = [tw_per_guitar];
        boolDraw(ctx, tw_per_label_3, "tw_personality3", 735, 270);

        var per_etc = "기타 : " + personality_etc;
        var per_label = ["GL", "HL", "BL", "논 커플링", "올라운더 ", per_etc];
        boolDraw(ctx, per_label, "personality1", 735, 313);

        var mk_etc = "기타 : " + mk_personality_etc;
        var mk_label = ["그림", "글", "코스프레", "제작", "소비", "스크린샷"];
        boolDraw(ctx, mk_label, "mk_personality1", 735, 360);
        var mk_label_2 = [mk_etc];
        boolDraw(ctx, mk_label_2, "mk_personality2", 735, 395);
        ctx.fillStyle = font_color;

        // radioDraw
        radioDraw(ctx, bomb_type, 735, 650);
        
        ctx.fillStyle = font_color;
        
        // textarea
        const etc_talks = etc_talk.split("\n")
        for (var etc_index in etc_talks) {
            // if (etc_index > 4) { break; }
            ctx.fillText(etc_talks[etc_index], 640, 710 + 20 * etc_index)
        }

        // select by sheet type
        if (sheet_type[0].checked) { // 메인트
            var main_follow_etc = $("#main_follow_etc").val();
            var var_guitar_str = "기타 : " + main_follow_etc;
            var follow_labels = ["구독", "멘션시 맞팔", var_guitar_str];
            boolDraw(ctx, follow_labels, "main_follow", 120, 260);
        } else {  // 트친소
            var follow_labels = ["RT", "마음", "팔로우", "멘션"];
            boolDraw(ctx, follow_labels, "tchin_follow", 120, 260);
            ctx.fillStyle = font_color;
            ctx.fillText("을 주시면 찾아갑니다!", 330, 260);
        }
        ctx.fillStyle = font_color;

        // lover insert menu show
        if (lover_img_insert_1.checked) {
            document.getElementById("lover_insert_1").style.display = "";
        } else {
            document.getElementById("lover_insert_1").style.display = "none";
        }
        if (lover_img_insert_2.checked) {
            document.getElementById("lover_insert_2").style.display = "";
        } else {
            document.getElementById("lover_insert_2").style.display = "none";
        }
        if (lover_img_insert_3.checked) {
            document.getElementById("lover_insert_3").style.display = "";
        } else {
            document.getElementById("lover_insert_3").style.display = "none";
        }
    }

    function imageExists(image_url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        console.log("http status : " + http.status)
        console.log(http.status != 404);
        return http.status != 404;
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
        readImage(e.target, "basic_profile")
	});

	const user_background_img = document.getElementById("basic_sheet");
	user_background_img.addEventListener("change", e => {
        readImage(e.target, "basic_sheet")
	});

    const lover_img_1 = document.getElementById("lover_img1");
	lover_img_1.addEventListener("change", e => {
        readImage(e.target, "lover_img_obj_1")
	});

    const lover_img_2 = document.getElementById("lover_img2");
	lover_img_2.addEventListener("change", e => {
        readImage(e.target, "lover_img_obj_2")
	});

    const lover_img_3 = document.getElementById("lover_img3");
	lover_img_3.addEventListener("change", e => {
        readImage(e.target, "lover_img_obj_3")
	});

    setTimeout(function() {
        draw();
    }, 1000);
});