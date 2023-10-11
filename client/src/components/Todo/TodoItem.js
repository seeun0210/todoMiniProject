import React from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});
export default function TodoItem({
  todo,
  index,
  handleDelete,
  todoList,
  setTodoList,
}) {
  const inputTextRef = useRef();
  const [isView, setIsView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.title);

  useEffect(() => {
    if (isEditing && inputTextRef.current) {
      inputTextRef.current.focus();
    }
  }, [isEditing]);
  const onChange = (e) => {
    setEditTodo(e.target.value);
  };

  const handleEditSubmit = async (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: editTodo };
      }
      return todo;
    });
    try {
      const newTodo = { title: editTodo };
      const response = await axiosInstance.patch(`/todo/${id}`, newTodo);
      const data = await response.data;
      setTodoList(newTodoList);
      alert(data.message);
      setIsEditing(false);
    } catch (err) {
      alert(err);
    }
  };

  const handleCheckbox = async (e, id) => {
    const done = e.target.checked;
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done };
      }
      return todo;
    });
    try {
      const newTodo = { done };
      const response = await axiosInstance.patch(`/todo/${id}`, newTodo);
      const data = await response.data;
      setTodoList(newTodoList);
      alert(data.message);
      setIsEditing(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <li
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      {!isEditing && (
        <input
          id={index}
          type="checkbox"
          checked={todo.done}
          onchange={(e) => handleCheckbox(e, todo.id)}
        />
      )}
      <div>
        {!isEditing && isShow && (
          <button onClick={() => setIsEditing(true)}></button>
        )}
        {isEditing ? (
          <button onClick={() => handleEditSubmit(todo.id)}></button>
        ) : (
          <button onClick={() => handleDelete(todo.id)}>x</button>
        )}
      </div>
      <label htmlFor={index} className="block w-full p-3">
        {isEditing ? (
          <input
            type="text"
            // defaultValue={todo.title}
            value={editTodo}
            onChange={handleChange}
            ref={inputTextRef}
            className="w-5/6"
          />
        ) : (
          todo.title
        )}
      </label>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  todoList: PropTypes.array,
  handleDelete: PropTypes.func,
  setTodoList: PropTypes.func,
};
