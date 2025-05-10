import styles from './TaskCard.module.scss';
import { TaskListItem } from '../../services/api/task/task-types';
import { timeAgo } from '../../utils/time-ago';
import { HiOutlinePencilSquare } from 'solid-icons/hi'


interface TaskCardProps {
    task: TaskListItem;
}

export default function TaskCard({ task }: TaskCardProps) {
    return (
        <a href={`/task/edit/${task.id}`} class={styles.card}>
            <h2 class={styles.title}>{task.title}</h2>
            <p class={styles.description}>{task.description ?? '<no-description>'}</p>
            <div class={styles.bottom}>
                <div class={styles.progressBar} title={ 'Completed: ' + task.progress + '%'}>
                    <div class={styles.progress} style={{ width: `${task.progress}%` }}></div>
                </div>
                <div class={styles.split}>
                    <div class={styles.dates}>
                        <div title={task.created_at}>Created: {timeAgo(task.created_at)}</div>
                        <div title={task.updated_at}>Modified: {timeAgo(task.updated_at)}</div>
                    </div>
                    <div class={styles.badge}>
                        <span class={styles.link}><HiOutlinePencilSquare size={30} color='var(--color-text-secondary)'/></span>
                    </div>
                </div>
            </div>
        </a>
    );
}