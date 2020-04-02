$("ul").on("click", "li", function () {
  $(this).toggleClass("done");
});

$("ul").on("click", "li span", function (event) {
  $(this).parent().fadeOut(function () {
    $(this).remove();
  });
  event.stopPropagation();
});

$("#create-new-todo").on("keypress", (function(event) {
  /* Act on the event */
  let key = event.which;
  if (key == 13) {
    if ($(this).val() !== "") {
      let value = $(this).val();
      $("#container .tasks ul").append("<li><span><i class=\"fa fa-trash\"></i></span> " + value + "</li>");
      $(this).val("");
    }
  }
}));

$("h1 i").on("click", function () {
  $("#create-new-todo").slideToggle();
  $("#create-new-todo").is(":visible") ? "Collapse" : "Expand";
});
