;(function($){
    var Dialog = function(config){
        var _this_ = this;
        //默认参数设置
        this.config = {
            //定义对话框的宽和高
            width:"auto",
            height:"auto",
            //对话框的提示信息
            message:null,
            //对话框的类型
            type:"waiting",
            //按钮配置
            button:null,
            //弹出框延迟多久关闭
            delay:null,
            //对话框遮罩透明度
            maskOpacity:null
        }
        //默认参数扩展
        if (config) {
            $.extend(this.config,config);
        }else {
            this.isConfig = true;
        }

        //创建基本的DOM
        this.body = $('body');
        //创建遮罩层
        this.mask = $('<section class="section-box section-box-mask">');
        //创建弹出框
        this.win = $('<div class="content-box">');
        //创建弹出框头部
        this.winHeader = $('<div class="mask-header"></div>');
        //创建提示信息
        this.winContent = $('<div class="mask-content">');
        //创建弹出框按钮组
        this.winFooter = $('<div class="mask-footer">');

        //渲染dom
        this.creat();
    }
    
    

    Dialog.prototype = {
        //创建弹出框
        creat:function(){
            var _this_ = this,
                config = this.config,
                mask = this.mask,
                win = this.win,
                header = this.winHeader,
                content = this.winContent,
                footer = this.winFooter,
                body = this.body;
            //如果没有传递任何参数
            if(this.isConfig){
                win.append(header.addClass('waiting'));
                mask.append(win);
                body.append(mask);
                console.log(123);
            }else {
                //根据配置参数创建相对应的弹框
                if (config.type) {
                    header.addClass(config.type);
                    win.append(header);
                }
                //如果传了文本信息
                if(config.message){
                    content.html(config.message);
                    win.append(content);
                }
                //按钮组
                if (config.button) {
                    this.creatButton(footer,config.button);
                    win.append(footer);
                }
                //插入到页面
                mask.append(win);
                body.append(mask);
                //设置对话框的宽
                if (config.width != "auto") {
                    win.width(config.width);
                }
                //设计对话框的高
                if (config.height != "auto") {
                    win.height(config.height);
                }
                //对话框遮罩层透明度maskOpacity
                if (config.maskOpacity) {
                    mask.css("backgroundColor","rgba(0,0,0,"+ config.maskOpacity +")");
                }
                //设置弹出框出现后多久关闭
                if (config.delay && config.delay != 0){
                    window.setTimeout(function(){
                        _this_.close();
                    },config.delay);
                };
            };
        },
        //创建按钮列表
        creatButton:function(footer,button){
            var _this_ = this;
            $(button).each(function(i){
                var type = this.type?"class='"+this.type+"'":"";
                var btnText = this.text?this.text:"按钮"+(i++);
                var callback = this.callback?this.callback:null;
                var button = $("<button "+type+">"+btnText+"</button>")
                if (callback){
                    button.click(function(){
                        var isClose = callback();
                        if (isClose != false) {
                             _this_.close();
                        }
                    })
                }else {
                    button.click(function(){
                        _this_.close();
                    })
                }
                footer.append(button);
            });
        },
        //关闭弹窗
        close:function(){
            this.mask.remove();
        },
    }
    window.Dialog = Dialog;   
})(Zepto)












