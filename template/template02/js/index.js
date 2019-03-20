jQuery(".bannerbox").slide({
    mainCell:".bd ul",
    effect:"fold",
    autoPlay:true,
    trigger:"click"
});
$('.proclasslist li').hover(function () {
    $(this).siblings().removeClass('active')
    $(this).addClass('active')
})
jQuery(".scrollqypic").slide({
    titCell:".hd ul",
    mainCell:".bd ul",
    autoPage:true,
    effect:"left",
    autoPlay:true,
    vis:3
});
$('.submitbtn').on('click', function () {
    var kcontent = $('.xqtext').val();
    var kuser = $('.user').val();
    var kphone = $('.usertel').val();
    if (kcontent == "") {
        $("#kuser").focus();
        return false;
    }
    if (kuser == "") {
        $("#kuser").focus();
        return false;
    }
    if (kphone == "") {
        $("#kuser").focus();
        return false;
    }
    $.post('/api/message.ashx?action=add', {
        "kcontent": kcontent,
        "kuser": kuser,
        "kphone": kphone,
    }, function (res) {
        if (res == '1') {
            alert("留言提交成功");
            $('.xqtext').val('');
            $('.user').val('');
            $('.usertel').val('');
        }else {
            alert('留言提交失败')
        }
    }) 
})
$('.allnews').first().show()
$('.rightclass li').hover(function () {
    $(this).siblings().removeClass('active')
    $(this).addClass('active')
    $('.allnews').hide().eq($(this).index()).show()
})