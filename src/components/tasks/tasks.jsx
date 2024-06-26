import {useState} from "react";

function Tasks(props) {
    const [inputTask, setInputTask] = useState('')


    const handleClick = (e) => {
        e.preventDefault();
        props.handleFormTask(inputTask);
        setInputTask("");
    }

    return (
        <>
            <div className="tasks_block">
                <div className="title_block">
                    <p className="category_title">
                        {props.category}
                    </p>
                    <input className="add_new_task" placeholder="Add a new task" value={inputTask}
                           onChange={(e) => setInputTask(e.target.value)}/>
                    <button className="add_task_btn" type="submit" onClick={(e) => handleClick(e)}>
                        Добавить
                    </button>
                </div>
                <div className="list_tasks">
                    {props.tasks?.map((task) => (
                        <div key={task.title} className="task">
                            <input type="checkbox" className={"complete"}  onClick={() => props.handleChosenTask(task)}  />
                            <span className={task.isCompleted ? "checkmark checkmark_success" : "checkmark"}></span>
                            <p className={task.isCompleted ? "title_task complete_success" : "title_task"}>
                                {task.title}
                            </p>
                            <button className="category">
                                {task?.category}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Tasks