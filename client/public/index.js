/* eslint-env jquery */

$(document).ready(function () {
    var short = false;

    $(".more-img").click(function () {
        alert("hello");
        short = !short;
        if (short) {
            $(".r").css("grid-template-columns", "5% 95%");
            $(".c-1").addClass("text-center");
            $(this).css("margin", "auto");
            $(".c-item img").css({ margin: "auto" });
        } else {
            $(".r").css("grid-template-columns", "15% 85%");
            $(".c-1").removeClass("text-center");
            $(this).css({ margin: "" });
            $(".c-item img").css({ margin: "" });
        }
        $(".c-item p").toggle();
        $(".logo").toggle();
    });
});
