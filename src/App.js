import { useSelector, useDispatch } from "react-redux";
import { fetchData, postData, deletePost, updatePost, toggleCompleted } from "./redux/reducer/fetchReducer";
import { useEffect, useState } from "react";
import style from "./app.module.css";

function App() {
  const dispatch = useDispatch();

  // Fetching the data
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);




  // Selectors
  const data = useSelector((state) => state.fetch.data);
  const allUniqueUsers = [...new Set(data.map(user => user.userId))];
  const [todo, setTodo] = useState("");
  const [selectedUserId, setSelectedUserId] = useState('');
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // New or Update Post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      const postToEdit = data.find((user) => user.id === editId);
      dispatch(updatePost({ id: editId, userId: Number(selectedUserId), title: todo, completed: postToEdit.completed }));
      setEdit(false);
      setEditId(null);
    } else {
      dispatch(postData({ userId: Number(selectedUserId), id: data.length + 1, title: todo, completed: false }));
    }
    setTodo("");
  };

  // Toggle Completed
  const handleToggleCompleted = (id, completed) => {
    const postToToggle = data.find((user) => user.id === id);
    dispatch(toggleCompleted({ id, userId: postToToggle.userId, title: postToToggle.title, completed }));
  };

  // Filter the data based on the selected user
  const filteredData = selectedUserId === '' ? [] : data.filter((user) => user.userId === Number(selectedUserId));

  return (
    <div className={style.body}>
      <div className={style.container}>
        {/* Heading */}
        <div className={style.heading}>
          <h2>TodoList</h2>
          <div>
            <label>Select User: </label>
            <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
              <option value="">Select User</option>
              {allUniqueUsers.map((userId) => (
                <option key={userId} value={userId}>{userId}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add or Edit Todo */}
        <div className="input-field">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={todo}
              className={style.input}
              placeholder="Enter the todo"
              onChange={(e) => setTodo(e.target.value)}
            />
            {edit ? <button type="submit">Edit</button> : <button type="submit">POST</button>}
          </form>
        </div>

        {/* Todo list */}
        <div className={style.todoBox}>
          {filteredData.map((user) => (
            <div key={user.id} className={style.todoItem}>
              <h3>{user.title}</h3>
              <input 
                type="checkbox" 
                id={user.id} 
                checked={user.completed} 
                onChange={() => handleToggleCompleted(user.id, user.completed)} 
              />
              <label htmlFor={user.id}>Completed</label>
              <span>|</span>
              <img className={style.icon} src="/edit.png" onClick={() => { setTodo(user.title); setEdit(true); setEditId(user.id); setSelectedUserId(user.userId); }} alt="Edit"/>
              <span>|</span>
              <img className={style.icon} src="/bin.png" onClick={() => dispatch(deletePost(user.id))} alt="Delete"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
