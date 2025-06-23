"use strict";

$(document).ready(function () {
  var $form = $(".js--form");
  var $input = $(".js--form__input");
  var $todoWrapper = $(".js--todos-wrapper");
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function createToDoElement(task) {
    var $li = $("<li>").addClass("todo-item list-group-item").attr("data-id", task.id);
    if (task.done) {
      $li.toggleClass("todo-item--checked");
    }
    var $checkbox = $("<input>").attr("type", "checkbox").prop("checked", task.done);
    var $span = $("<span>").addClass("todo-item__description ms-2").text(task.text);
    var $button = $("<button>").addClass("todo-item__delete btn btn-danger btn-sm float-end").text("Delete");
    $li.append($checkbox, $span, $button);
    $checkbox.on("change", function () {
      $li.toggleClass("todo-item--checked");
      var index = todos.findIndex(function (t) {
        return t.id === task.id;
      });
      if (index !== -1) {
        todos[index].done = $checkbox.prop("checked");
        saveToLocalStorage();
      }
    });
    $button.on("click", function () {
      var index = todos.findIndex(function (t) {
        return t.id === task.id;
      });
      if (index !== -1) {
        todos.splice(index, 1);
        saveToLocalStorage();
        $li.remove();
      }
    });
    $span.on("click", function () {
      $("#modal-text").text(task.text);
      var modal = new bootstrap.Modal(document.getElementById("taskModal"));
      modal.show();
    });
    return $li;
  }
  todos.forEach(function (task) {
    var $todoElement = createToDoElement(task);
    $todoWrapper.append($todoElement);
  });
  $form.on("submit", function (event) {
    event.preventDefault();
    var newTaskText = $input.val().trim();
    if (newTaskText === "") return;
    var newTodo = {
      id: Date.now(),
      text: newTaskText,
      done: false
    };
    todos.push(newTodo);
    saveToLocalStorage();
    var $todoItem = createToDoElement(newTodo);
    $todoWrapper.append($todoItem);
    $input.val("");
  });
});
