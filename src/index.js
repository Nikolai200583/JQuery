const API = "https://dummyjson.com/todos/";

async function getTodos() {
  try {
    const response = await fetch(API);
    if (response.ok) {
      const data = await response.json();
      const result = data.todos;
      createTodo(result);
    } else {
      console.log("Ошибка" + response.status);
    }
  } catch (error) {
    console.log("Ошибка " + error.message);
  }
}
getTodos();

function createTodo(todosData) {
  todosData.forEach((todoData) => {
    let task = $("<div class='task'></div>").text(todoData.todo);
    let isComplite = todoData.completed;
    let del = $("<i class='fas fa-trash-alt'></i>").click(function () {
      let p = $(this).parent();
      p.fadeOut(function () {
        p.remove();
      });
    });
    let check = $("<i class='fas fa-check'></i>").click(function () {
      let p = $(this).parent();
      p.fadeOut(function () {
        $(".comp").append(p);
        p.fadeIn();
      });
      $(this).remove();
    });
    if (isComplite === true) {
      $(".comp").append(task);
      task.append(del);
    } else {
      $(".notcomp").append(task);
      task.append(del, check);
    }
  });
}
$(".completed").on("click", function () {
  $(".notcomp").addClass("hidden");
  $(".comp").removeClass("hidden");
  $(".completed").addClass("isActive");
  $(".notCompleted").removeClass("isActive");
  $(".allTodos").removeClass("isActive");
});
$(".notCompleted").on("click", function () {
  $(".comp").addClass("hidden");
  $(".notcomp").removeClass("hidden");
  $(".notCompleted").addClass("isActive");
  $(".completed").removeClass("isActive");
  $(".allTodos").removeClass("isActive");
});
$(".allTodos").on("click", function () {
  $(".comp").removeClass("hidden");
  $(".notcomp").removeClass("hidden");
  $(".allTodos").addClass("isActive");
  $(".notCompleted").removeClass("isActive");
  $(".completed").removeClass("isActive");
});

$(".input").on("keyup", function (e) {
  if (e.keyCode == 13 && $(".input").val() != "") {
    let task = $("<div class='task'></div>").text($(".input").val());

    let del = $("<i class='fas fa-trash-alt'></i>").click(function () {
      let p = $(this).parent();
      p.fadeOut(function () {
        p.remove();
      });
    });

    let check = $("<i class='fas fa-check'></i>").click(function () {
      let p = $(this).parent();
      p.fadeOut(function () {
        $(".comp").append(p);
        p.fadeIn();
      });
      $(this).remove();
    });

    task.append(del, check);
    $(".notcomp").append(task);
    $(".input").val("");
  }
});
