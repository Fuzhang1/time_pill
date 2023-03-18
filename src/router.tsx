import { createHashRouter } from "react-router-dom";
import Action from "./pages/Action";
import Main from "./pages/Main";
import Open from "./pages/Open";
import Put from "./pages/Put";
import Success from "./pages/Success";

const router = createHashRouter([
    {
        path:'/',
        element:<Main/>
    },
    {
        path:'/action',
        element:<Action/>,
        children:[{
            path:'put',
            element:<Put/>
        },{
            path:'open',
            element:<Open/>
        },{
            path:'success/:key',
            element:<Success/>
        }]
    }
])

export default router