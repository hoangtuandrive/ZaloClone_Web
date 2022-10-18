import Home from "../pages/home";
import chat from "../pages/chat";
import Login from "../pages/login";
import Resign from "../pages/resign";
import AuthResign from "../pages/authResign";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: chat },
    { path: '/login', component: Login },
    { path: '/resign', component: Resign },
    { path: '/authResign', component: AuthResign },
   

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };