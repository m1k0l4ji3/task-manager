import { Route, Router } from "@solidjs/router"
import TaskFormPage from "./pages/task-form/TaskForm";
import TaskListPage from "./pages/task-list/TaskList";
import styles from "./App.module.scss";
import logo from "./assets/logo.png";
import { BsListCheck } from 'solid-icons/bs'
import { VsAdd } from 'solid-icons/vs'
import BadRequestPage from "./pages/error/BadRequest";
import NotFoundPage from "./pages/error/NotFound";
import ServerErrorPage from "./pages/error/ServerError";
import TooManyRequestsPage from "./pages/error/TooManyRequests";
import HomePage from "./pages/home/Home";

export default function App() {
  return (
    <>
        <div class={styles.container}>
            <div class={styles.header}>
                <h1>Task Manager</h1>
            </div>
            <img src={logo} alt="logo" />
            <div class={styles.buttons}>
                <a class="button primary icon" href="/task/list"><BsListCheck size={30} />Task List</a>
                <a class="button primary icon" href="/task/create"><VsAdd size={30} />Create Task</a>
            </div>
            <div class={styles.main}>
                <Router>
                    <Route path="/task">
                        <Route path="/list" component={TaskListPage} />
                        <Route path="/create" component={TaskFormPage} />
                        <Route path="/edit/:id" component={TaskFormPage} />
                    </Route>
                    <Route path="/error">
                        <Route path="/404" component={NotFoundPage} />
                        <Route path="/429" component={TooManyRequestsPage} />
                        <Route path="/400" component={BadRequestPage} />
                        <Route path="/500" component={ServerErrorPage} />
                    </Route>
                    <Route path="*" component={NotFoundPage} />
                    <Route path="/" component={HomePage} />
                </Router>
            </div>
        </div>
    </>
  );
}

