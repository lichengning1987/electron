var fs = require('fs');
const {clipboard} = require('electron');

/*点击复制按钮，复制页面*/
$("#copy").on("click",function(){
    var html = $("#previewBox").html();
    clipboard.write({text: 'test', html: html},"selection")
})

/*写入文件*/
function writeFile() {
    var title = $("#inputTitle").val(),
         shareperson = $("#inputJia").val(),
         shareArray = [],shareQuestArray = [];

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

    var shareTime = $("#inputTime").val(),
         shareAddress = $("#inputAddress").val(),
         shareMember = $("#inputPeople").val(),
         shareLink = $("#inputbmAdress").val(),
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
            }
        }
    fs.writeFileSync('./app/message.json',
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
        $(".J_tb_share tbody").html(shareContextHtml)

        $(".shareQuestion dd").each(function(index,item){
            var oText = $(item).find("textarea").val();
            $(".J_tb_shareQ tr").eq(index).find("td").text(oText)
        });

        $(".J-time").text($("#inputTime").val());
        $(".J-address").text($("#inputAddress").val());
        $(".J-member").text($("#inputPeople").val());
        $(".J-time").text($("#inputTime").val());
        $(".J-apply").attr("href",$("#inputbmAdress").val())
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
            var contexts = odata.part1.sharecontent[i].text;
            var ohtmls= '<dd>\
                            <label>问题'+(i+1)+'<a href="javascript:;" class="btn btn-danger J-delete fn-right">删除</a></label>\
                            <textarea name="form-control" id="" cols="30" rows="3">'+ contexts +'</textarea>\
                        </dd>';
            shareContextHtmlQ += ohtmls;
        }
        $(".shareQuestion").html(shareContextHtml);

        $(".shareContext dd").each(function(index,item){
            var context = odata.part1.sharecontent[index].text;
            $(item).find("textarea").val(context)
        });

        $(".shareQuestion dd").each(function(index,item){
            var context = odata.part1.shareQuestion[index].text;
            $(item).find("textarea").val(context)
        });

        $("#inputTime").val(odata.part1.time);
        $("#inputAddress").val(odata.part1.address);
        $("#inputPeople").val(odata.part1.member);
        $("#inputbmAdress").val(odata.part1.href);
    })
}

getText();


$("#J-addContext").on("click",function(){
    var index =  $(".shareContext dd").length;
    var ohtml= '<dd>\
        <label>段落'+(index+1)+'<a href="javascript:;" class="btn btn-danger J-delete fn-right">删除</a></label>\
        <textarea name="form-control" id="" cols="30" rows="3"></textarea>\
        </dd>';
    $(".shareContext").append(ohtml)
})

$("#J-addQuest").on("click",function(){
    var index =  $(".shareContext dd").length;
    var ohtml= '<dd>\
        <label>问题'+(index+1)+'<a href="javascript:;" class="btn btn-danger J-delete fn-right">删除</a></label>\
        <textarea name="form-control" id="" cols="30" rows="3"></textarea>\
        </dd>';
    $(".shareContext").append(ohtml);
})

$('body').on("click",".J-delete",function(e){
    $(this).closest("dd").remove();
})


