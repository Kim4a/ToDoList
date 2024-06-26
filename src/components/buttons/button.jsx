function Button(props) {

    function filterTasks(btnName) {
        props.setChosenCategory(btnName)
        if (btnName === "All Tasks") {
            props.setSelectedTask(props.tasks.filter(task => task))
        } else {
            props.setSelectedTask(props.tasks.filter(task => task.category === btnName))
        }
    }

    let btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
        btn.addEventListener('click', function () {
            if (document.querySelector('button.active')) {
                document.querySelector('button.active').classList.remove('active');
            }
            btn.classList.add('active');
        });
    });

    return (
        <>
            {props.btns?.map((btn) =>
                <button key={btn.name} className="btn_category"
                        onClick={(() => {
                            filterTasks(btn.name);
                        })}
                >
                    {btn?.name}
                </button>
            )}
        </>
    )

}

export default Button;