require(["dom-binding.js"], function (DomBindable) {
  var bikeShed = new DomBindable();
  bikeShed.set("color", "purple");

  bikeShed.bindPropertyTo("color", "#bindable", "content");
  bikeShed.bindPropertyTo("color", "#bindable", 'class');

  $("#change-bind").click(function() {
    bikeShed.set("color", "red");
  });
})