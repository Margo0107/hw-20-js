$(document).ready(function () {
  $("#todo-list").on("click", "li", function () {
    const taskText = $(this).text();
    $("#modal-text").text(taskText);
    const modal = new bootstrap.Modal(document.getElementById("taskModal"));
    modal.show();
  });
});
