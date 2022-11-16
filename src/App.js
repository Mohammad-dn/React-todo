import { useState } from "react";

function App() {
  const [todosList, setTodoList] = useState([]);

  const [todos, setTodos] = useState({
    title: "",
    desc: "",
    createdAt: "",
  });
  const handelCreatedTodo = (e) => {
    e.preventDefault();
    setTodoList([
      ...todosList,
      {
        ...todos,
        id: Date.now(),
        disabled: true,
        createdAt: new Date().toLocaleDateString(),
      },
    ]);
    setTodos({
      title: "",
      desc: "",
      createdAt: "",
    });
  };
  const handelDeletTodo = (id) => {
    const filteredTodo = todosList.filter((item) => item.id !== id);
    setTodoList(filteredTodo);
  };
  const handelEditeTodo = (id) => {
    const todosListCopy = todosList.map((i) => {
      if (i.id === id) {
        return { ...i, disabled: false };
      } else {
        return { ...i, disabled: true };
      }
    });
    setTodoList(todosListCopy)
  };

  let todoUiList = todosList.map((item) => (
    <li>
      <h3>
        <input disabled={item.disabled} value={item.title} />
      </h3>
      <p>{item.desc}</p>
      <small>{item.createdAt}</small>
      <button onClick={() => handelDeletTodo(item.id)}>DEL</button>
      <button onClick={() => handelEditeTodo(item.id)}>Edite</button>
      <hr></hr>
    </li>
  ));
  return (
    <>
      <h1>todo app</h1>
      <form>
        <input
          value={todos.title}
          onChange={(e) =>
            setTodos({
              ...todos,
              title: e.target.value,
            })
          }
        ></input>
        <br />
        <br />

        <textarea
          value={todos.desc}
          onChange={(e) =>
            setTodos({
              ...todos,
              desc: e.target.value,
            })
          }
        ></textarea>
        <br />
        <br />
        <button onClick={handelCreatedTodo}>submit</button>
      </form>
      <ul>{todoUiList}</ul>
    </>
  );
}

export default App;
