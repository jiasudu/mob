/**
 * Created by Edwan on 14/11/23.
 */
(function ($) {
    var DOC = function () {
        this.init();
    };

    DOC.prototype = {
        init: function () {
            var me = this;
            me.render();
            me.initEvt();
        },
        render: function () {
            var me = this;
            $('.code').each(function () {
                var top = $(this).parent().position().top - 300;
                $(this).parent().addClass('module').attr('data-top', top);

                CodeMirror.fromTextArea(this, {
                    lineNumbers: true,
                    readOnly: true,
                    value: this.innerHTML,
                    line: true,
                    mode: "text/html"
                });
            });
            $(document.body).append('<div id="J_demo">' + '<iframe src="demo.html"></iframe>');
            me.show($('.code')[0].value);
        },
        initEvt: function () {
            var me = this;
            window.onscroll = function () {
                me.scrollHandler();
            };
        },
        scrollHandler: function () {
            var me = this;
            var top = document.body.scrollTop;
            $('.module').each(function (i) {
                var nextY;
                var y = parseInt($(this).attr('data-top'));
                if (i !== $('.module').length - 1) {
                    nextY = parseInt($(this).next().attr('data-top'));
                } else {
                    nextY = document.body.offsetHeight;
                }
                $(this).css({'opacity': 0.3});
                if (top > y && top < nextY) {
                    $cur = $(this).find('.code');
                    $(this).css({'opacity': 1});
                    me.show($cur[0].value);
                }
            });
        },
        show: function (html) {
            var frameBody = $('#J_demo iframe')[0].contentWindow.document.body;
            $(frameBody).html(html);
        }
    };

    $(function () {
        new DOC;
    });

})
(jQuery);
