define(function(require, exports) {
    require('markdown-js')
    var menu = require('./menu')
    
    function Editor(input, preview) {
        
        this.update = function () {
            if (input.value != '说点什么吧'){
                input.style.height = input.scrollHeight + input.scrollTop + 'px';
                input.style.background = '#f6f6f6'
                input.style.color = '#333'
                
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