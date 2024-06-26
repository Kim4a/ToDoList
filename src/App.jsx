import './App.css'
import {useEffect, useState} from 'react'
import Tasks from "./components/tasks/tasks.jsx"
import Form from "./components/form/form.jsx"
import Button from "./components/buttons/button.jsx"

export default function App() {

    let defaultCategories = ["All Tasks", "Favourites", "Groceries", "Work", "Study", "Sport"]
    let defaultTasks = [
        {title: 'Buy Bananas for the pancakes', category: 'Groceries', isCompleted: false},
        {title: 'Go to the Gym', category: 'Sport', isCompleted: false},
        {title: 'Prepare roadmap for MVP', category: 'Work', isCompleted: false},
        {title: 'example 1', category: 'Favourites', isCompleted: false},
        {title: 'Read chapter 3 from Math book', category: 'Study', isCompleted: false},
        {title: 'Call Peter', category: 'Work', isCompleted: false},
    ]

    const [listButtons, setListButtons] = useState([]);
    const [listTasks, setListTasks] = useState([]);
    const [chosenCategory, setChosenCategory] = useState(defaultCategories[0]);
    const [selectedTask, setSelectedTask] = useState(defaultTasks);
    const [isVisibleForm, setIsVisibleForm] = useState(false);

    const handleAdd = () => setIsVisibleForm(!isVisibleForm)

    function handleFormSubmit(inputValue) {
        setListButtons([
            ...listButtons,
            {
                name: inputValue
            }
        ]);

    }

    function handleFormTask(inputValue) {
        if (chosenCategory === defaultCategories[0]) return alert("Выберите категорию")

        setListTasks([
            ...listTasks,
            {
                title: inputValue,
                category: chosenCategory,
                isCompleted: false
            }
        ]);

        setSelectedTask([...selectedTask, {
            title: inputValue,
            category: chosenCategory,
            isCompleted: false
        }]);

    }

    function handleChosenTask(task) {
        const changedArray = selectedTask.map((item) => item.title === task.title ? {...item, isCompleted: !item.isCompleted} : item);
        setSelectedTask(changedArray)
        setListTasks(changedArray)

        localStorage.setItem("task", JSON.stringify(changedArray));
    }

    useEffect(() => {

        let category = localStorage.getItem('category');

        if (!category) category = defaultCategories.join();


        category = category.split(",")

        setListButtons(category.map((item) => (
            {
                name: item,
            }
        )))

        let task = JSON.parse(localStorage.getItem("task"));

        if ((task === null) || (task?.length === 0)) {
            localStorage.setItem("task", JSON.stringify(defaultTasks));
        } else {
            defaultTasks = task
            setSelectedTask(task)
            setListTasks(task)
        }
    }, []);

    useEffect(() => {
        let category = listButtons.reduce((accumulatorCategory, button) => accumulatorCategory + `${button.name},`, '');

        if (category[category.length - 1] === ',') {
            category = category.slice(0, -1);
        }

        if (category) localStorage.setItem("category", category);

    }, [listButtons]);

    useEffect(() => {
        if (listTasks.length) {
            localStorage.setItem("task", JSON.stringify(listTasks));
        }
    }, [listTasks]);

    return (
        <div className="to_do_list">
            <div className="list_categories_block">
                <div className="list_categories" id="list_categories">
                    <Button
                        chosenCategory={chosenCategory}
                        setChosenCategory={setChosenCategory}
                        btns={listButtons}
                        setListTasks={setListTasks}
                        tasks={listTasks}
                        setSelectedTask={setSelectedTask}
                    />
                </div>
                <button className="new_category_button" onClick={handleAdd}>
                    + New category
                </button>
                {isVisibleForm && <Form handleFormSubmit={handleFormSubmit}/>}
            </div>

            <div className="line"></div>

            <div>
                <Tasks
                    category={chosenCategory}
                    tasks={selectedTask}
                    btns={listButtons}
                    handleFormTask={handleFormTask}
                    setSelectedTask={setSelectedTask}
                    handleChosenTask={handleChosenTask}
                />
            </div>
        </div>
    )
}