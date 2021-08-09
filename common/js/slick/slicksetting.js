// slick slider settings


$('.slickcarousel').slick({
    // アクセシビリティ。左右ボタンで画像の切り替えをできるかどうか
    accessibility: true,
    // 自動再生。trueで自動再生される。
    autoplay: false,
    // 自動再生で切り替えをする時間
    autoplaySpeed: 5000,
    // 自動再生や左右の矢印でスライドするスピード
    speed: 750,
    // 自動再生時にスライドのエリアにマウスオンで一時停止するかどうか
    pauseOnHover: true,
    // 自動再生時にドットにマウスオンで一時停止するかどうか
    pauseOnDotsHover: true,
    // 切り替えのアニメーション。ease,linear,ease-in,ease-out,ease-in-out
    cssEase: 'ease',
    // 画像下のドット（ページ送り）を表示
    dots: true,
    // ドットのclass名をつける
    dotsClass: 'dot-class',
    // ドラッグができるかどうか
    draggable: true,
    // 切り替え時のフェードイン設定。trueでon
    fade: false,
    // 左右の次へ、前へボタンを表示するかどうか
    arrows: true,
    // 無限スクロールにするかどうか。最後の画像の次は最初の画像が表示される。
    infinite: true,
    // 最初のスライダーの位置
    initialSlide: 0,
    // 画像の遅延表示。‘ondemand’or'progressive'
    lazyLoad: 'ondemand',
    // スライドのエリアに画像がいくつ表示されるかを指定
    slidesToShow: 3,
    // 一度にスライドする数
    slidesToScroll: 1,
    // タッチスワイプに対応するかどうか
    swipe: true,
    // 縦方向へのスライド
    vertical: false,
    // 表示中の画像を中央へ
    centerMode: true,
    // 中央のpadding
    centerPadding: 0,
    // breakpoint
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: true,
                centerMode: true,
                slidesToShow: 1
            }
        }
    ]
});
