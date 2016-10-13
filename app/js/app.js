var fs = require('fs');
/*function writeFile() {
    var text = textarea.value;
    console.log(text);
    fs.writeFileSync('./app/message.txt',
        text, 'utf8');
}*/


var editBtn = $("#edit"),
     preview = $('#preview'),
     editBox = $('#editBox'),
     previewBox = $('#previewBox');

editBtn.on("click",function(){
    previewBox.hide();
    editBox.show();
})

preview.on("click",function(){
    previewBox.show();
    editBox.hide();
    populateStorage();
    firstFunc();
})


function firstFunc(){
        $(".J_tb_firstArea .title").text(localStorage.getItem('inputTitle'));
        $(".J_tb_firstArea .person").text(localStorage.getItem('shareperson'));

        $(".shareContext dd").each(function(index,item){
            var name = 'shareP'+index;
            $(".J_tb_share tr").eq(index).find("td").text(localStorage.getItem(name))
        })

        $(".shareQuestion dd").each(function(index,item){
            var name = 'shareQ'+index;
            $(".J_tb_shareQ tr").eq(index).find("td").text(localStorage.getItem(name))
        })
}

if(!localStorage.getItem('inputTitle')) {
    populateStorage();
} else {
    setStyles();
}

function setStyles() {
    var title = localStorage.getItem('inputTitle');
    var person = localStorage.getItem('shareperson');
    $('#inputTitle').val(title);
    $('#inputJia').val(person);

    $(".shareContext dd").each(function(index,item){
        var name = 'shareP'+index;
        $(item).find("textarea").val(localStorage.getItem(name))
    })
    $(".shareQuestion dd").each(function(index,item){
        var name = 'shareQ'+index;
        $(item).find("textarea").val(localStorage.getItem(name))
    })
}

function populateStorage() {
    localStorage.setItem('inputTitle', document.getElementById('inputTitle').value);
    localStorage.setItem('shareperson', document.getElementById('inputJia').value);
    //localStorage.setItem('image', document.getElementById('image').value);
    //localStorage.setItem('shareP1', $(".shareContext dd textarea").val());
    $(".shareContext dd").each(function(index,item){
        var name = 'shareP'+index;
        localStorage.setItem(name, $(item).find("textarea").val());
    })
    $(".shareQuestion dd").each(function(index,item){
        var name = 'shareQ'+index;
        localStorage.setItem(name, $(item).find("textarea").val());
    })

    setStyles();
}