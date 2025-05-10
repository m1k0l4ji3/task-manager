import { createSignal, onMount, Show } from "solid-js";
import styles from "./TaskForm.module.scss";
import { TaskSchema, TaskService } from "../../services/api/task/task-service";
import { useParams } from "@solidjs/router";
import { AiOutlineWarning } from 'solid-icons/ai'
import { useNavigate } from "@solidjs/router";


export default function TaskFormPage() {
    const taskService = new TaskService();
    const params = useParams();
    const navigate = useNavigate();
    const [progress, setProgress] = createSignal(50);
    const [errors, setErrors] = createSignal<Record<string, string>>({});
    const [formData, setFormData] = createSignal({
        title: "",
        description: "",
        progress: 50,
    });

    onMount(async () => {
        if (params.id) {
            try {
                const task = await taskService.getTask(Number(params.id));
                setFormData({
                    title: task.title,
                    description: task.description ?? "",
                    progress: task.progress,
                });
                setProgress(task.progress);
            } catch (error) {
                console.error("Failed to fetch task details:", error);
                navigate("/error/404");
            }
        }
    });

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        const data = {
            title: formData().title,
            description: formData().description,
            progress: progress(),
        };

        const validationResult = TaskSchema.safeParse(data);

        if (!validationResult.success) {
            const validationErrors: Record<string, string> = {};
            validationResult.error.errors.forEach((err) => {
                if (err.path[0]) {
                    validationErrors[err.path[0] as string] = err.message;
                }
            });
            setErrors(validationErrors);
        } else {
            setErrors({});
            if (params.id) {
                taskService.updateTask(Number(params.id), data).then((response) => {
                    if (response.status === 200) {
                        window.location.href = "/task/list";
                    } else {
                        setErrors({ general: "Failed to update task" });
                    }
                }).catch(() => {
                    setErrors({ general: "An unexpected error occurred while updating the task." });
                });
            } else {
                taskService.createTask(data).then((response) => {
                    if (response.status === 201) {
                        window.location.href = "/task/list";
                    } else {
                        setErrors({ general: "Failed to create task" });
                    }
                }).catch(() => {
                    setErrors({ general: "An unexpected error occurred while creating the task." });
                });
            }
        }
    };

    const handleCancel = () => {
        if (window.history.length > 2) {
            window.history.back();
        } else {
            window.location.href = "/";
        }
    };

    const handleDelete = () => {
        if (params.id) {
            if(!window.confirm("Are you sure you want to delete this task?")) {
                return;
            }

            taskService.deleteTask(Number(params.id)).then((response) => {
                if (response.status === 200) {
                    window.location.href = "/task/list";
                } else {
                    setErrors({ general: "Failed to delete task" });
                }
            });
        }
    }

    return (
        <form class={styles.form} onSubmit={handleSubmit}>
            <h1>{params.id ? "Edit Task" : "Create Task"}</h1>
            <div class={styles["form-group"]}>
                <label for="title" class="required-field">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData().title}
                    onInput={(e) => setFormData({ ...formData(), title: e.currentTarget.value })}
                />
                {errors().title && <div class={styles.error}>{errors().title}</div>}
            </div>
            <div class={styles["form-group"]}>
                <label for="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData().description}
                    onInput={(e) => setFormData({ ...formData(), description: e.currentTarget.value })}
                />
                {errors().description && <div class={styles.error}>{errors().description}</div>}
            </div>
            <div class={styles["form-group"]}>
                <label for="progress" class="required-field">Progress</label>
                <div class={styles.rangeContainer}>
                    <input
                        type="range"
                        id="progress"
                        name="progress"
                        min="0"
                        max="100"
                        value={progress()}
                        onInput={(e) => setProgress(Number(e.currentTarget.value))}
                    />
                    <span class={styles.percentage}>{progress()}%</span>
                </div>
                {errors().progress && <div class={styles.error}>{errors().progress}</div>}
            </div>
            {errors().general && (
                <div class={styles.error}>
                    {errors().general}
                </div>
            )}
            <Show when={params.id}>
                <button type="button" class='button danger icon' onclick={handleDelete}><AiOutlineWarning size={25}/>Delete task</button>
            </Show>
            <div class={styles["form-actions"]}>
                <button type="button" class="button danger" onClick={handleCancel}>
                    Cancel
                </button>
                <button type="submit" class="button primary">{params.id ? "Save" : "Create"}</button>
            </div>
        </form>
    );
}