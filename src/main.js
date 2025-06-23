$(document).ready(function () {
  const $form = $(".js--form");
  const $input = $(".js--form__input");
  const $todoWrapper = $(".js--todos-wrapper");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function createToDoElement(task) {
    const $li = $("<li>")
      .addClass("todo-item list-group-item")
      .attr("data-id", task.id);
    if (task.done) {
      $li.toggleClass("todo-item--checked");
    }
    const $checkbox = $("<input>")
      .attr("type", "checkbox")
      .prop("checked", task.done);
    const $span = $("<span>")
      .addClass("todo-item__description ms-2")
      .text(task.text);
    const $button = $("<button>")
      .addClass("todo-item__delete btn btn-danger btn-sm float-end")
      .text("Delete");

    $li.append($checkbox, $span, $button);

    $checkbox.on("change", function () {
      $li.toggleClass("todo-item--checked");
      const index = todos.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        todos[index].done = $checkbox.prop("checked");
        saveToLocalStorage();
      }
    });
    $button.on("click", function () {
      const index = todos.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        todos.splice(index, 1);
        saveToLocalStorage();
        $li.remove();
      }
    });

    $span.on("click", function () {
      $("#modal-text").text(task.text);
      const modal = new bootstrap.Modal(document.getElementById("taskModal"));
      modal.show();
    });
    return $li;
  }

  todos.forEach((task) => {
    const $todoElement = createToDoElement(task);
    $todoWrapper.append($todoElement);
  });

  $form.on("submit", function (event) {
    event.preventDefault();
    const newTaskText = $input.val().trim();
    if (newTaskText === "") return;

    const newTodo = {
      id: Date.now(),
      text: newTaskText,
      done: false,
    };

    todos.push(newTodo);
    saveToLocalStorage();
    const $todoItem = createToDoElement(newTodo);
    $todoWrapper.append($todoItem);
    $input.val("");
  });
});
