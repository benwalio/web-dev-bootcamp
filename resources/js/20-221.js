$("li").on("click", function () {
  $(this).toggleClass("done");
});

$("li span").on("click", function (event) {
  $(this).parent().fadeOut(function () {
    $(this).remove();
  });
  event.stopPropagation();
})
