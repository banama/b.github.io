define(function(require, exports) {
    require('markdown-js')
    var menu = require('./menu')
    
    function Editor(input, preview) {
        
        this.update = function () {
            if (input.value != '说点什么吧'){
                input.style.height = input.scrollHeight + input.scrollTop + 'px';
                input.style.background = '#fff'
                input.style.color = '#333'
                input.style.border = '10px 10px 10px 10px solid #000' 
                
                preview.innerHTML = markdown.toHTML(input.value);
            }        
        };
        input.editor = this;
        this.update();
    }
    
    var $ = function (id) { return document.getElementById(id); };
    editor = new Editor($("text-input"), $("preview"));   
    menu.init(editor)
        
})