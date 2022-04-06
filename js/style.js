$(document).ready(function() {

    // drawer
    $('.drawer').drawer();

    // スクロールしたらヘッダーの色を変える
    $(window).on('scroll', function() {
        if ( $('.header-pc').height() < $(this).scrollTop() ) {
            $('.header-pc').addClass('header-color');
        } else {
            $('.header-pc').removeClass('header-color');
        }
    })

    // slick
    $('.slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true, // 自動再生を設定
        autoplaySpeed:3000, // スライド切り替えの時間を設定
        arrow: false,
        dots: true,
        responsive: [{
            breakpoint: 768,
              settings: {
                slidesToShow: 1,
                arrow: false,
            }
        }]
    });

    // アコーディオン
    $('.accordion-head').click(function() {
        $(this).next().slideToggle();
        $(this).children('.accordion-icon').toggleClass('is-open');
    });

    // スムーススクロール
    $('a[href^="#"]').click(function() {

        //headerクラスがついた要素の高さを取得
        let header = $(".header").innerHeight();
        // topの戻るスピード
        let speed = 400;
        // hrefで指定されたidを取得
        let id = $(this).attr("href");
        // idのの値が#だけだったらターゲットをhtmlタグにしてtopに戻るようにする
        let target = $("#" == id ? "html" : id);
        // ページのトップを基準にターゲットの位置を取得
        let position = $(target).offset().top;
        // ターゲットの位置までspeedの速度で移動
        if ("fixd" !== $(".header").css("position")) {
            position = $(target).offset().top;
        }
        if (0 > position) {
            position= 0;
        }
        $("html, body").animate(
            {
                scrollTop: position - $("#js-header").outerHeight()
            },
            speed
        );
        return false;
    });

    // googleform
    let $form = $('#js-form')
    $form.submit(function (e) { 
        $.ajax({ 
          url: $form.attr('action'), 
          data: $form.serialize(), 
          type: "POST", 
          dataType: "xml", 
          statusCode: { 
            0: function () {
                // 送信に成功したときの処理
                $form.slideUp()
                $('#js-success').slideDown()
            }, 
            200: function () { 
                // 送信に失敗したときの処理
                $form.slideUp()
                $('#js-error').slideDown() 
            } 
          } 
        }); 
        return false; 
      }); 

    // formの入力確認
    let $submit = $('#js-submit')
    $('#js-form, #js-form textarea').on('change', function() {
        if(
            $('#js-form input[type="text"]').val() !== "" &&
            $('#js-form input[type="email"]').val() !== "" &&
            $('#js-form input[name="entry.2049517640"]').prop('checked') === true
        ) {
            // 全て入力された時
            $submit.prop("disabled", false);
            $submit.addClass("-active");
        } else {
            // 入力されていない時
            $submit.prop("disabled", true);
            $submit.removeClass("-active");
        }
    });
});
