/* 
2017-12-1 18:08
 */
document.getElementById("iframe").onload = function() {
    var parent = $(window.frames["iframe"].document);
    nojump();
    parent.find('head').append('<link href="/css/template-edit.css" rel="stylesheet" type="text/css" />');
    parent.find('body').append('<div class="wjdh-inline-mouse-box inline-box-top"></div><div class="wjdh-inline-mouse-box inline-box-right"></div><div class="wjdh-inline-mouse-box inline-box-bottom"></div><div class="wjdh-inline-mouse-box inline-box-left"></div>')
    parent.find('[data-wjdh-id]').each(function(index, el) {
        var $this = $(this);
        //模拟程序设置id
        $this.attr('data-wjdh-id', index)
        $this.hover(function() {
            var width = $this.innerWidth() - 2;
            var height = $this.innerHeight() - 2;
            var top = $this.offset().top;
            var left = $this.offset().left;
            parent.find('.inline-box-top').css({
                'top': top,
                'left': left,
                'width': width,
                'height': 0
            });
            parent.find('.inline-box-right').css({
                'top': top,
                'left': left + width,
                'width': 0,
                'height': height
            });

            parent.find('.inline-box-bottom').css({
                'top': top + height,
                'left': left,
                'width': width,
                'height': 0
            });

            parent.find('.inline-box-left').css({
                'top': top,
                'left': left,
                'width': 0,
                'height': height
            });
            $this.addClass('wjdh-inline-edit-on');
            parent.find('.wjdh-inline-mouse-box').show();
        }, function() {
            $this.removeClass('wjdh-inline-edit-on');
            parent.find('.wjdh-inline-mouse-box').hide();
        });
        $this.click(function(event) {
            var indexs = $this.attr('data-wjdh-id');
            var bg = $this.css('background-image');
            if ($this.is('img') == true) {
                img(indexs)
            } else if ($this.is('a') == true) {
                a(indexs)
            } else if (bg != 'none') {
                backg(indexs)
            } else {
                text(indexs)
            }
            event.stopPropagation(); 
        });
    });


    function img(indexs) {
        layui.use('layer', function() {
            var layer = layui.layer;
            layer.open({
                title: '在线编辑',
                area: '500px',
                content: '<div class="layui-form">' +
                    '<div class="img" id="uploadimg"><img src=""></div>' +
                    '<div class="layui-form-item">' +
                    '<div class="layui-input-block">' +
                    '<div class="layui-text"></div>' +
                    ' </div>' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">图片描述</label>' +
                    '<div class="layui-input-block">' +
                    '<input type="text" name="alt" id="alt" required  lay-verify="required" placeholder="请输入图片描述" autocomplete="off" class="layui-input">' +
                    ' </div>' +
                    '</div>' +                    
    
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">链接地址</label>' +
                    '<div class="layui-input-block">' +
                    '<input type="text" name="url" id="url" required  lay-verify="required" placeholder="以http://开头" autocomplete="off" class="layui-input">' +
                    ' </div>' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">链接提示</label>' +
                    '<div class="layui-input-block">' +
                    '<input type="text" name="title" id="title" required  lay-verify="required" placeholder="请输入链接提示" autocomplete="off" class="layui-input">' +
                    ' </div>' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">打开方式</label>' +
                    '<div class="layui-input-block">' +
                    '<div class="layui-unselect layui-form-radio"><i class="layui-anim layui-icon"></i><span>新页面打开</span><input type="radio" name="target" value="_blank"></div>' +
                    '<div class="layui-unselect layui-form-radio"><i class="layui-anim layui-icon layui-anim-scaleSpring"></i><span>当前页面打开</span><input type="radio" name="target" value="_self"></div>' +
                    ' </div>' +
                    '</div>' +
                    '<input id="img" name="img" type="hidden" value="">' +
                    '<input id="id" name="id" type="hidden" value="">' +
                    '<input id="content" name="content" type="hidden" value="">' +
                    '</div>',
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    saveimg();
                    layer.close(index)
                },
                btn1: function(index, layero) {
                    layer.close(index)
                },
                success: function(layero, index) {
                    radio(indexs);
                    initialization(indexs);
                    upload();
                    console.log(layero, index);
                }
            });
        });
    };

    function backg(indexs) {
        layui.use('layer', function() {
            var layer = layui.layer;
            layer.open({
                title: '在线编辑',
                area: '500px',
                content: '<div class="layui-form">' +
                    '<div class="img" id="uploadimg"><img src="" id="img"></div>' +
                    '<input id="id" name="id" type="hidden" value="">' +
                    '</div>',
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    //按钮【按钮一】的回调
                    savebg();
                    layer.close(index)
                },
                btn1: function(index, layero) {
                    //按钮【按钮二】的回调
                    layer.close(index)
                        //return false 开启该代码可禁止点击该按钮关闭
                },
                success: function(layero, index) {
                    initialization(indexs);
                    upload();
                    console.log(layero, index);
                }
            });
        });
    };

    function a(indexs) {
        layui.use('layer', function() {
            var layer = layui.layer;
            layer.open({
                title: '在线编辑',
                area: '500px',
                content: '<div class="layui-form">' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">文字描述</label>' +
                    '<div class="layui-input-block">' +
                    '<textarea name="content" placeholder="请输入文字描述" class="layui-textarea" id="content"></textarea>' +
                    ' </div>' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">链接地址</label>' +
                    '<div class="layui-input-block">' +
                    '<input type="text" name="url" id="url" required  lay-verify="required" placeholder="以http://开头" autocomplete="off" class="layui-input">' +
                    ' </div>' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">链接提示</label>' +
                    '<div class="layui-input-block">' +
                    '<input type="text" name="title" id="title" required  lay-verify="required" placeholder="请输入链接提示" autocomplete="off" class="layui-input">' +
                    ' </div>' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">打开方式</label>' +
                    '<div class="layui-input-block">' +
                    '<div class="layui-unselect layui-form-radio"><i class="layui-anim layui-icon"></i><span>新页面打开</span><input type="radio" name="target" value="_blank"></div>' +
                    '<div class="layui-unselect layui-form-radio"><i class="layui-anim layui-icon layui-anim-scaleSpring"></i><span>当前页面打开</span><input type="radio" name="target" value="_self"></div>' +
                    ' </div>' +
                    '</div>' +
                    '<input id="id" name="id" type="hidden" value="">' +
                    '</div>',
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    //按钮【按钮一】的回调
                    savea();
                    layer.close(index)
                },
                btn1: function(index, layero) {
                    //按钮【按钮二】的回调
                    layer.close(index)
                        //return false 开启该代码可禁止点击该按钮关闭
                },
                success: function(layero, index) {
                    radio(indexs);
                    initialization(indexs);
                    console.log(layero, index);
                }
            });
        });
    }

    function text(indexs) {
        layui.use('layer', function() {
            var layer = layui.layer;
            layer.open({
                title: '在线编辑',
                area: '500px',
                content: '<div class="layui-row">' +
                    '<label class="layui-col-md3">编辑</label>' +
                    '<div class="layui-col-md9">' +
                    '<textarea name="content" placeholder="请输入内容" class="layui-textarea" id="content"></textarea>' +
                    '</div>' +
                    '<input id="id" name="id" type="hidden" value="">' +
                    '</div>',
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    //按钮【按钮一】的回调
                    savetext();
                    layer.close(index)
                },
                btn1: function(index, layero) {
                    //按钮【按钮二】的回调
                    layer.close(index)
                        //return false 开启该代码可禁止点击该按钮关闭
                },
                success: function(layero, index) {
                    initialization(indexs);
                    console.log(layero, index);
                }
            });
        });
    };

    function upload() {
        layui.use('upload', function() {
            var upload = layui.upload;
            //执行实例
            var uploadInst = upload.render({
                elem: '#uploadimg',
                url: '/json.asp?type=upload',
                done: function(res) {
                    var host = parent.find('head base').attr('href');
                    $('#uploadimg img').attr('src', host + res.src);
                    $('#img').val(res.src)
                    $('#uploadimg').css('background-image', '');
                },
                error: function() {
                    alert('上传失败！')
                }
            });
        });
    }

    function initialization(indexs) {
        var host = parent.find('head base').attr('href');
        var that = parent.find('[data-wjdh-id="' + indexs + '"]');
        if (that.is('img') == true) {
            var url = that.parent('a').attr('href');
            var target = that.parent('a').attr('target');
            var src = that.attr('src');
            var title = that.attr('title');
            var alt = that.attr('alt');
            var imgw = that.width();
            var imgh = that.height();
            $('#id').val(indexs);
            $('#img').val(src);
            $('#uploadimg img').attr({'src': host + src});
            $('.layui-text').append('请上传大小为'+imgw+'*'+imgh+'的图片')
            $('#url').val(url);
            $('#title').val(title);
            $('#alt').val(alt);
            $('[value="' + target + '"]').parent().addClass('layui-form-radioed');
        } else if (that.is('a') == true) {
            var content = that.text();
            var url = that.attr('href');
            var title = that.attr('title');
            var target = that.attr('target');
            $('#id').val(indexs);
            $('#url').val(url);
            $('#title').val(title);
            $('#content').val(content);
            $('[value="' + target + '"]').parent().addClass('layui-form-radioed');
        } else if (that.css('background-image') != 'none') {
            $('#id').val(indexs);
            var src = that.css('background-image');
            $('#uploadimg').css('background-image', src);
        } else {
            var content = that.text();
            $('#id').val(indexs);
            $('#content').val(content);
        }
        /*在线获取方式*/
        /*        $.ajax({
                    url: "/json.asp",
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        $('#id').val(data.id);
                        $('#content').val(data.content);
                        if (data.alt.length != 0) {
                            $('#alt').val(data.alt)
                        }
                        if (data.title.length != 0) {
                            $('#title').val(data.title)
                        }
                        if (data.url.length != 0) {
                            $('#url').val(data.url)
                        }
                        if (data.src.length != 0) {
                            $('#img').attr('src', data.src)
                        }
                    },
                    error: function() {
                        alert('错误！')
                    }
                });*/
    };


    function saveimg() {
        var id = $('#id').val();
        var title = $('#title').val();
        var alt = $('#alt').val();
        var src = $('#img').val();
        var url = $('#url').val();
        var target = $('.layui-form-radioed').find('input').val();
        $.ajax({
            url: "/json.asp?type=img",
            type: 'POST',
            dataType: 'json',
            data: '{"id":"' + id + '","src":"' + src + '","alt":"' + alt + '", "url":"' + url + '","title":"' + title + '","target":"' + target + '"}',
            success: function(data) {
                displayimg(id, src, alt, title, url, target);
            },
            error: function() {
                alert('失败！')
            }
        });
    };

    function savebg() {
        var id = $('#id').val();
        var src = $('#img').val();
        $.ajax({
            url: "/json.asp?type=bg",
            type: 'POST',
            dataType: 'json',
            data: '{"id":"' + id + '","src":"' + src + '"}',
            success: function(data) {
                displaybg(id, src);
            },
            error: function() {
                alert('失败！')
            }
        });
    };

    function savea() {
        var id = $('#id').val();
        var content = $('#content').val();
        var title = $('#title').val();
        var url = $('#url').val();
        var target = $('.layui-form-radioed').find('input').val();
        if (target == undefined) {
            target = '_self'
        }
        $.ajax({
            url: "/json.asp?type=a",
            type: 'POST',
            dataType: 'json',
            data: '{ "id":"' + id + '","url":"' + url + '","title":"' + title + '","target":"' + target + '","content":"' + content + '"}',
            success: function(data) {
                displaya(id, title, url, target, content);
            },
            error: function() {
                alert('失败！')
            }
        });
    };

    function savetext() {
        var id = $('#id').val();
        var content = $('#content').val();
        $.ajax({
            url: "/json.asp?type=text",
            type: 'POST',
            dataType: 'json',
            data: '{"content":"' + content + '","id":"' + id + '"}',
            success: function(data) {
                displaytext(id, content);
            },
            error: function() {
                alert('失败！')
            }
        });
    };


    function displayimg(id, src, alt, title, url, target) {
        var host = parent.find('head base').attr('href')
        if (target == undefined) {
            target = '_self'
        }
        parent.find('[data-wjdh-id="' + id + '"]').attr({
            'src': src,
            'alt': alt,
            'title': title
        });
        parent.find('[data-wjdh-id="' + id + '"]').parent('a').attr({
            'href': url,
            'title': title,
            'target': target
        })
        nojump();
        if (url.length != 0) {
            var thisparent = parent.find('[data-wjdh-id="' + id + '"]').parent();
            var thisparenta = thisparent.is('a')
            if (thisparenta == true) {
                thisparent.attr('href', url);
            } else {
                parent.find('[data-wjdh-id="' + id + '"]').wrapAll('<a href="' + url + '" title="' + title + '" target="' + target + '"></a>')
            }
        }
    };

    function displaybg(id, src) {
        parent.find('[data-wjdh-id="' + id + '"]').css('background-image', 'url(' + src + ')');
    };

    function displaya(id, title, url, target, content) {
        var that = parent.find('[data-wjdh-id="' + id + '"]');
        that.attr({
            'title': title,
            'href': url,
            'target': target
        });
        if (content.length == 0) {
            content = '&nbsp;&nbsp;'
            that.html(content)
        } else {
            that.html(content)
        }
    };

    function displaytext(id, content) {
        var that = parent.find('[data-wjdh-id="' + id + '"]');
        if (content.length == 0) {
            content = '&nbsp;&nbsp;'
            that.html(content)
        } else {
            that.text(content)
        }
    };

    function nojump() {
        parent.find('a').bind('click', function(event) {
            return false;
        });
    };

    function radio(indexs) {
        $('.layui-form-radio').click(function(event) {
            var $this = $(this);
            $this.addClass('layui-form-radioed').siblings('.layui-form-radio').removeClass('layui-form-radioed');
            $this.find('i').addClass('layui-anim-scaleSpring');
            $this.siblings('.layui-form-radio').find('i').removeClass('layui-anim-scaleSpring')
        });
    }

    function edit() {
        layui.use('layedit', function() {
            var layedit = layui.layedit;
            layedit.build('content', {
                height: '160px',
                tool: ['strong', 'italic', 'underline', 'del']
            });
        });
    }
};
window.onbeforeunload = function(event) {
    return confirm("确定离开此页面吗？");
}
