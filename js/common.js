/* 
2017-12-5 11:09
 */

document.getElementById("iframe").onload = function () {
    var parent = $(window.frames["iframe"].document)
    var tempDom
    parent.find('head').append('<link href="http://192.168.0.115/admin/data_visualization/css/template-edit.css" rel="stylesheet" type="text/css" />')
    parent.find('body').append('<button class="edit-btn" id="mof-edit-btn">编辑</button><button class="edit-btn-save" id="mof-save-btn">保存</button><div class="wjdh-inline-mouse-box inline-box-top"></div><div class="wjdh-inline-mouse-box inline-box-right"></div><div class="wjdh-inline-mouse-box inline-box-bottom"></div><div class="wjdh-inline-mouse-box inline-box-left"></div>')

    parent.find('m').each(function (i, el) {
        var allAttr = attr(el)
        var $parent = $(el).parent()
        $parent.attr(allAttr)
        $parent.attr('title', '')
        $(this).remove()
    })

    parent.find('img').each(function (i, el) {
        var src = $(el).attr('src')
        $(el).attr('title', '')
        $(el).attr('alt', '')
        if ($.getUrlParam(src)['mof-type']) {
            $(el).attr('mof-type', $.getUrlParam(src)['mof-type'])
        }
        if ($.getUrlParam(src)['mof-field']){
            $(el).attr('mof-field', $.getUrlParam(src)['mof-field'])
        }
        if ($.getUrlParam(src)['mof-id']) {
            $(el).attr('mof-id', $.getUrlParam(src)['mof-id'])
        }
    })


    parent.find('.edit-btn').mouseover(function (event) {
        parent.find('.wjdh-inline-edit-on').removeClass('wjdh-inline-edit-on')
        tempDom.addClass('wjdh-inline-edit-on')
        parent.find('#mof-edit-btn').show()
        parent.find('.wjdh-inline-mouse-box').show()
        event.stopPropagation() //阻止事件冒泡
    }).mouseout(function (event) {
        tempDom.removeClass('wjdh-inline-edit-on')
        parent.find('#mof-edit-btn').hide()
        parent.find('.wjdh-inline-mouse-box').hide()
        event.stopPropagation() //阻止事件冒泡
    })

    parent.find('#mof-edit-btn').click(function (event) {
        event.preventDefault()
        var Attr = attr(tempDom);
        console.log(Attr)
        if (Attr['mof-type'] === 'cate' || Attr['mof-type'] === 'news' || Attr['mof-type'] === 'config') {
            if (tempDom.is('img')) {
                img()
            } else {
                text()
            }
        } else if (Attr['mof-type'] === 'diy') {
            if (tempDom.attr('contenteditable') === true) {

            } else {
                parent.find('#mof-save-btn').css({
                    'top': parent.find('#mof-edit-btn').css('top'),
                    'left': parent.find('#mof-edit-btn').css('left'),
                    "display": 'block'
                })
                tempDom.attr('contenteditable', true)
                tempDom.focus()
            }


        } else if (Attr['mof-type'] === 'setting') {
            iframe()
        }
        event.stopPropagation() //阻止事件冒泡
    })
    parent.find('#mof-save-btn').click(function () {
        parent.find('#mof-save-btn').hide()
        tempDom.attr('contenteditable', false)
        var type = tempDom.attr('mof-type')
        var id = tempDom.attr('mof-id')
        var field = tempDom.attr('mof-field')
        var content = tempDom.html();
        _post(type, id, field, content)
    })

    parent.find('[mof-type]').mouseover(function (event) {
        var $parent = $(this)
        tempDom = $parent
        var width = $parent.innerWidth() - 2
        var height = $parent.innerHeight() - 2
        var top = $parent.offset().top
        var left = $parent.offset().left
        parent.find('.edit-btn').css({
            'top': top,
            'left': left
        })
        parent.find('.inline-box-top').css({
            'top': top,
            'left': left,
            'width': width,
            'height': 0
        })
        parent.find('.inline-box-right').css({
            'top': top,
            'left': left + width,
            'width': 0,
            'height': height
        })
        parent.find('.inline-box-bottom').css({
            'top': top + height,
            'left': left,
            'width': width,
            'height': 0
        })
        parent.find('.inline-box-left').css({
            'top': top,
            'left': left,
            'width': 0,
            'height': height
        })
        parent.find('.wjdh-inline-edit-on').removeClass('wjdh-inline-edit-on')
        $parent.addClass('wjdh-inline-edit-on')
        parent.find('.wjdh-inline-mouse-box').show()
        parent.find('#mof-edit-btn').show()
        event.stopPropagation() //阻止事件冒泡
    }).mouseout(function (event) {
        var $parent = $(this)
        $parent.removeClass('wjdh-inline-edit-on')
        parent.find('.wjdh-inline-mouse-box').hide()
        parent.find('#mof-edit-btn').hide()
        event.stopPropagation() //阻止事件冒泡
    })

    function text(indexs) {
        layui.use('layer', function () {
            var layer = layui.layer
            layer.open({
                title: '在线编辑',
                area: '500px',
                content: '<div class="layui-row">' +
                    '<div class="layui-col-md12">' +
                    '<textarea name="content" placeholder="请输入内容" class="layui-textarea" id="content"></textarea>' +
                    '</div>' +
                    '<input id="id" name="id" type="hidden" value="">' +
                    '</div>',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //按钮【按钮一】的回调
                    var type = tempDom.attr('mof-type')
                    var id = tempDom.attr('mof-id')
                    var field = tempDom.attr('mof-field')
                    var content = $('#content').val();
                    _post(type, id, field, content,layer,index)
                    
                },
                btn1: function (index, layero) {
                    //按钮【按钮二】的回调
                    layer.close(index)
                    //return false 开启该代码可禁止点击该按钮关闭
                },
                success: function (layero, index) {
                    initialization(indexs)
                }
            })
        })
    }

    function iframe(indexs) {
        layui.use('layer', function () {
            var layer = layui.layer
            layer.open({
                type: 2,
                title: '编辑',
                shadeClose: true,
                area: ['80%', '90%'],
                content: 'http://192.168.0.115/admin/content/list.aspx?catid=59' //iframe的url
            });
        })

    }

    function img(indexs) {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.open({
                title: '在线编辑',
                area: '500px',
                content: '<div class="layui-form" style="text-align: center;">' +
                    '<div class="img"><img src="" id="img"></div>' +
                    '<button class="layui-btn" style="width:75%;margin:auto" id="uploadimg">点击上传</button>' +
                    '<input id="img" name="id" type="hidden" value="">' +
                    '</div>',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //按钮【按钮一】的回调
                    var type = tempDom.attr('mof-type')
                    var id = tempDom.attr('mof-id')
                    var field = tempDom.attr('mof-field')
                    var content = $('#img').val();
                    _post(type, id, field, content)
                    setTimeout(function(){layer.close(index)},500)
                },
                btn1: function (index, layero) {
                    //按钮【按钮二】的回调
                    layer.close(index)
                    //return false 开启该代码可禁止点击该按钮关闭
                },
                success: function (layero, index) {
                    initialization(indexs);
                    upload(layer,index);
                    console.log(tempDom.attr('src'))
                    $('#img').attr("src", tempDom.attr('src'))
                }
            });
        });
    };

    function initialization() {
        var content = parent.find('.wjdh-inline-edit-on').text()
        content = $.trim(content)
        $("#content").val(content)
    }

    function upload(layer,index) {
        layui.use('upload', function () {
            var upload = layui.upload;
            //执行实例
            var uploadInst = upload.render({
                elem: '#uploadimg',
                url: '/api/ui.ashx?action=image',
                data: {
                    type: tempDom.attr('mof-type'),
                    id: tempDom.attr('mof-id'),
                    field: tempDom.attr('mof-field'),

                },
                done: function (res) {
                    layer.msg('修改成功！');
                    tempDom.attr('src',res.data);
                    $('#img').val(res.data)
					layer.close(index)
                },
                error: function () {
                    alert('上传失败！')
                }
            });
        });
    }

    function _post(type, id, field, content,layer,index) {
        $.post('/api/ui.ashx?action=xinxi', {
            type: type,
            id: id,
            field: field,
            content: content
        }, function (res) {
            layer.msg('修改成功！');
            tempDom.text(res.data)
			layer.close(index)
        })
    }


}

function attr(el) {
    var arry = {}
    $(el).each(function () {
        $.each(this.attributes, function () {
            if (this.specified) {
                arry[this.name] = this.value
            }
        })
    })
    return arry
}

(function ($) {
    $.getUrlParam = function (url) {
		   var search = url.substring(url.lastIndexOf("?") + 1);
		   var obj = {};     
		   var reg = /([^?&=]+)=([^?&=]*)/g;
		   search.replace(reg, function (rs, $1, $2) {
		  　　 var name = decodeURIComponent($1);
		   　　var val = decodeURIComponent($2);
		  　　 val = String(val);
		  　　 obj[name] = val;

		   　　 return rs;
		  });
		// console.log(obj)
		 return obj;
		
        // var reg = new RegExp( "/(\\?|\\&)" + name + "=([^\\&]+)/");
        // var r = url.match(reg);
		// if (r != null) console.log(url,unescape(r[2]))
        // if (r != null) return unescape(r[2]);
        // return null;
    }
})(jQuery);


window.onbeforeunload = function (event) {
    // return confirm("确定离开此页面吗？")
}