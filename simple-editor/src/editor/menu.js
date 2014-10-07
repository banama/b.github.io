define(function(require, exports) {
    require('jquery')
    
    function init(editor){
        Strong(editor)
        Italic(editor)
        Link(editor)
        Image(editor)
        Hr(editor)
        Visible()
        Preview()
    }
    
    // strong font
    function Strong(editor){
        $("li[data-role=strong]").click(function(){
            var o = document.getElementById('text-input')
            o.focus();
            if(typeof document.selection !="undefined"){
                console.log(document.selection.createRange().text);
            } else {
                var start = o.selectionStart
                var end = o.selectionEnd
                var len = o.value.length
                if (start == end){
                    str = o.value.substr(0, start) + '**' + '加粗' + '**' + o.value.substr(end ,len - end)
                }
                else{
                    str = o.value.substr(0, start) + '**' + o.value.substr(start, end - start) + '**' + o.value.substr(end ,len - end)
                }
                o.value = str
                editor.update()
            }
        });
    }
    
    // italic font
    function Italic(editor){
         $("li[data-role=italic]").click(function(){
            var o = document.getElementById('text-input')
            o.focus();
            if(typeof document.selection !="undefined"){
                console.log(document.selection.createRange().text);
            } else {
                var start = o.selectionStart
                var end = o.selectionEnd
                var len = o.value.length
                if (start == end){
                    str = o.value.substr(0, start) + '**' + '斜体' + '**' + o.value.substr(end ,len - end)
                }
                else{
                    str = o.value.substr(0, start) + '*' + o.value.substr(start, end - start) + '*' + o.value.substr(end ,len - end)
                }
                o.value = str
                editor.update()
            }
        });
    }
    
    // super link
    function Link(editor){
        $("li[data-role=link]").click(function(){
            var o = document.getElementById('text-input')
            o.focus();
            if(typeof document.selection !="undefined"){
                console.log(document.selection.createRange().text);
            } else {
                var start = o.selectionStart
                var end = o.selectionEnd
                var len = o.value.length
                if (start == end){
                    str = o.value.substr(0, start) + '[]()' + o.value.substr(end ,len - end)
                }
                else{
                    str = o.value.substr(0, start) + '[' + o.value.substr(start, end - start) + ']()' + o.value.substr(end ,len - end)
                }
                o.value = str
                editor.update()
            }
        });
    }
    
    // add image
    function Image(editor){
        $("li[data-role=image]").click(function(){
            var o = document.getElementById('text-input')
            o.focus();
            if(typeof document.selection !="undefined"){
                console.log(document.selection.createRange().text);
            } else {
                var start = o.selectionStart
                var end = o.selectionEnd
                var len = o.value.length
                if (start == end){
                    str = o.value.substr(0, start) + '\n![]()\n' + o.value.substr(end ,len - end);
                }
                else{
                    str = o.value.substr(0, start) + '\n\n![' + o.value.substr(start, end - start) + ']()\n\n' + o.value.substr(end ,len - end);
                }
                o.value = str
                editor.update()
                
            }
        });
    }
    
    // add 分割线
    function Hr(editor){
        $("li[data-role=hr]").click(function(){
            var o = document.getElementById('text-input')
            o.focus();
            if(typeof document.selection !="undefined"){
                console.log(document.selection.createRange().text);
            } else {
                var start = o.selectionStart
                var end = o.selectionEnd
                var len = o.value.length
                if (start == end){
                    str = o.value.substr(0, start) + '\n***\n' + o.value.substr(end ,len - end);
                }
                else{
                    str = o.value.substr(0, len) + '\n***\n';
                }
                o.value = str
                editor.update()
                
            }
        });
    }
    
    // 即见即可得
    function Visible(){
         $("li[data-role=visible]").click(function(){
            mark = $(this).attr('value')
            if (mark == '0'){
                $('#preview').css('display', '')
                $(this).removeClass('editor-menu')
                $(this).addClass('editor-menu-i')
                $(this).attr('value', '1')
            }
            else{
                $('#preview').css('display', 'none')
                $(this).removeClass('editor-menu-i')
                $(this).addClass('editor-menu')
                $(this).attr('value', '0')
            }
         })
    }
    
    // 预览
    function Preview(){
    
    }
    
    exports.init = init;
        
})