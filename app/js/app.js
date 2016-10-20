var fs = require('fs');
const {clipboard} = require('electron');
var path = require('path');
var fileurl = path.join(__dirname, '', '../message.json');


/*点击复制按钮，复制页面*/
$("#copy").on("click",function(){
    var html = $("#previewBox").html();
    alert("复制预览页面成功！")
    clipboard.write({text: 'test', html: html},"selection")
});

/*写入文件*/
function writeFile() {
    var title = $("#inputTitle").val(),
         shareperson = $("#inputJia").val(),
         shareArray = [],shareQuestArray = [],imgArray = [],threeArray = [];

    $(".shareContext dd").each(function(index,item){
         var oText = $(item).find("textarea").val();
         var oString = {"text":oText};
         shareArray.push(oString);
    })

    $(".shareQuestion dd").each(function(index,item){
        var oText = $(item).find("textarea").val();
        var oString = {"text":oText};
        shareQuestArray.push(oString);
    });

   $(".imgArea input").each(function(index,item){
       var oText = $(item).val();
       var oString = {"url":oText};
       imgArray.push(oString);
   });

    $(".threeIMG").each(function(index,item){
        var imgUrl = $(item).find(".imgURL").val(),
            imgLink = $(item).find(".imgLink").val(),
            imgText = $(item).find(".imgText").val();
        var otring = {"link":imgLink,"imgUrl":imgUrl,"imgText":imgText};
        threeArray.push(otring);
    });

    var shareTime = $("#inputTime").val(),
         shareAddress = $("#inputAddress").val(),
         shareMember = $("#inputPeople").val(),
         shareLink = $("#inputbmAdress").val(),
         titles = $("#inputTitle-two").val(),
         titlesThree = $("#inputTitle-three").val(),
         titlesEN = $("#inputTitleEN-two").val(),
         titlesENThree = $("#inputTitleEN-three").val(),
         secondText = $(".secondText").val(),
         warning = $(".warning").val(),
         wmURL = $("#wm2").val(),
         pcLink = $("#PClink").val(),
         jsonText = {
            "part1":{
                "title":title,
                "shareperson":shareperson,
                "sharecontent":shareArray,
                "shareQuestion":shareQuestArray,
                "time":shareTime,
                "address":shareAddress,
                "member":shareMember,
                "href":shareLink
            },
             "part2":{
                 "title":titles,
                 "titleEn":titlesEN,
                 "imgurl":imgArray,
                 "secondText":secondText,
                 "warning":warning
             },
             "part3":{
                 "title":titlesThree,
                 "titleEn":titlesENThree,
                 "shareLink":threeArray,
                 "wm":wmURL,
                 "PClink":pcLink
             }
        }
    fs.writeFileSync(fileurl,
        JSON.stringify(jsonText), 'utf8');
}


var editBtn = $("#edit"),
     preview = $('#preview'),
     editBox = $('#editBox'),
     previewBox = $('#previewBox');

editBtn.on("click",function(){
    previewBox.hide();
    editBox.show();
})

$('body').on("click",'#preview',function(){
    previewBox.show();
    editBox.hide();
    firstFunc();
    writeFile();
})

/*预览函数*/
function firstFunc(){
        $(".J_tb_firstArea .title").text($("#inputTitle").val());
        $(".J_tb_firstArea .person").text($("#inputJia").val());
        var shareContextHtml = "";
        $(".shareContext dd").each(function(index,item){
            var oText = $(item).find("textarea").val();
            var otd = '<tr>\
                        <td style="line-height:22px;padding:10px 0;font-size:14px;text-indent:2em;font-size:16px;">'+ oText+'</td>\
                    </tr>';
            shareContextHtml += otd;
        })
        $(".J_tb_share tbody").html(shareContextHtml);

        var shareContextHtmlQ = "";
        $(".shareQuestion dd").each(function(index,item){
            var oText = $(item).find("textarea").val();
            var otd = '<tr>\
                            <td style="line-height:22px;padding:10px 0;font-size:14px;text-indent:2em;color:#2331ea;font-weight:700;padding-left:30px;width:600px;">'+ oText+'</td>\
                        </tr>';
         shareContextHtmlQ += otd;
        })
        $(".J_tb_shareQ tbody").html(shareContextHtmlQ);

        $(".J-time").text($("#inputTime").val());
        $(".J-address").text($("#inputAddress").val());
        $(".J-member").text($("#inputPeople").val());
        $(".J-time").text($("#inputTime").val());
        $(".J-apply").attr("href",$("#inputbmAdress").val())

        $(".J_tb_secondArea .title").text($("#inputTitle-two").val());
        $(".J_tb_secondArea .en").text($("#inputTitleEN-two").val());

        $(".J_tb_secondWrap img").each(function(index,item){
            var url = $(".imgArea input").eq(index).val();
            $(item).attr("src",url);
        })

       $(".J_tb_secondWrap p").eq(0).text($(".secondText").val());
       $(".J_tb_secondWrap p").eq(1).text($(".warning").val());


        $(".J_tb_threeIMG td").each(function(index,item){
            var alink = $(item).find("a"),
                imgurl = $(item).find("img"),
                imgText = $(item).find("div"),
                 showLink = $('.threeIMG').eq(index).find(".imgLink").val(),
                 showimgUrl = $('.threeIMG').eq(index).find(".imgURL").val(),
                 showText = $('.threeIMG').eq(index).find(".imgText").val();
            alink.attr("href",showLink);
            imgurl.attr("src",showimgUrl);
            imgText.html(showText)
        });

    $(".J_tb_threeArea .title").text($("#inputTitle-three").val());
    $(".J_tb_threeArea .person").text($("#inputTitleEN-three").val());
      $(".J-wmimg img").attr("src",$("#wm2").val());
      $(".J-pclink a").attr("src",$("#PClink").val()).text($("#PClink").val());


}

/*读取数据函数getText*/
function getText(){
    var url = "./message.json";
    $.get(url,function(data){
        var odata = JSON.parse(data);
        $('#inputTitle').val(odata.part1.title);
        $('#inputJia').val(odata.part1.shareperson);

        var sharenum = odata.part1.sharecontent.length;
        var shareContextHtml = "";
        for(var i=0; i< sharenum; i++){
            var context = odata.part1.sharecontent[i].text;
            var ohtml= '<dd>\
                            <label>段落'+(i+1)+'<a href="javascript:;" class="btn btn-danger J-delete fn-right">删除</a></label>\
                            <textarea name="form-control" id="" cols="30" rows="3">'+ context +'</textarea>\
                        </dd>';
            shareContextHtml += ohtml;
        }
        $(".shareContext").html(shareContextHtml);

        var sharenumQ = odata.part1.shareQuestion.length;
        var shareContextHtmlQ = "";
        for(var i=0; i< sharenumQ; i++){
            var contexts = odata.part1.shareQuestion[i].text;
            var ohtmls= '<dd>\
                            <label>问题'+(i+1)+'<a href="javascript:;" class="btn btn-danger J-delete fn-right">删除</a></label>\
                            <textarea name="form-control" id="" cols="30" rows="3">'+ contexts +'</textarea>\
                        </dd>';
            shareContextHtmlQ += ohtmls;
        }
        $(".shareQuestion").html(shareContextHtmlQ);

        $("#inputTime").val(odata.part1.time);
        $("#inputAddress").val(odata.part1.address);
        $("#inputPeople").val(odata.part1.member);
        $("#inputbmAdress").val(odata.part1.href);

        $('#inputTitle-two').val(odata.part2.title);
        $('#inputTitleEN-two').val(odata.part2.titleEn);

        $(".imgArea input").each(function(index,item){
            $(item).val(odata.part2.imgurl[index].url)
        })

        $(".secondText").val(odata.part2.secondText);
        $(".warning").val(odata.part2.warning);

        $('#inputTitle-three').val(odata.part3.title);
        $('#inputTitleEN-three').val(odata.part3.titleEn);
        $(".threeIMG").each(function(index,item){
            $(item).find(".imgURL").val(odata.part3.shareLink[index].imgUrl);
            $(item).find(".imgLink").val(odata.part3.shareLink[index].link);
            $(item).find(".imgText").val(odata.part3.shareLink[index].imgText);
        });
        $("#wm2").val(odata.part3.wm);
        $("#PClink").val(odata.part3.PClink);

        
    })
}

getText();


$("#J-addContext").on("click",function(){
    var index =  $(".shareContext dd").length;
    var ohtml= '<dd>\
        <label>段落'+(index+1)+'<a href="javascript:;" class="btn btn-danger J-delete fn-right">删除</a></label>\
        <textarea name="form-control" id="" cols="30" rows="3"></textarea>\
        </dd>';
    $(".shareContext").append(ohtml);
})

$("#J-addQuest").on("click",function(){
    var index =  $(".shareQuestion dd").length;
    var ohtml= '<dd>\
        <label>问题'+(index+1)+'<a href="javascript:;" class="btn btn-danger J-delete fn-right">删除</a></label>\
        <textarea name="form-control" id="" cols="30" rows="3"></textarea>\
        </dd>';
    $(".shareQuestion").append(ohtml);
})

$('body').on("click",".J-delete",function(e){
    $(this).closest("dd").remove();
})


