import { createResource, Show } from "solid-js";
import { TaskService } from "../../services/api/task/task-service";
import TaskCard from "../../components/task-card/TaskCard";
import styles from "./TaskList.module.scss";
import { useNavigate } from "@solidjs/router";
import { TaskListResponse } from "../../services/api/task/task-types";

export default function TaskListPage() {
    const navigate = useNavigate();
    const taskService = new TaskService();

    const [res] = createResource<TaskListResponse | null>(async () => {
        try {
            return await taskService.getTasks();
        } catch (error: any) {
            if (error.response?.status === 429) {
                navigate("/error/429");
            } else {
                console.error("Failed to fetch tasks:", error);
            }
            return null;
        }
    });

    return (
        <>
            <Show when={res() && res()?.tasks && res()?.tasks.length! > 0} fallback={<span>There are no tasks to show...</span>}>
                <div class={styles.gridContainer}>
                    {res()?.tasks.map((task) => (
                        <TaskCard task={task}/>
                    ))}
                </div>
            </Show>
        </>
    );
}