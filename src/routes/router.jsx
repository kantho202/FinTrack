import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import TransactionManagement from "../pages/Transaction Management/TransactionManagement";
import CategoryManagement from "../pages/Category Management/CategoryManagement";
import FinancialDashboard from "../pages/Dashboard/FinancialDashboard";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children:[
            {
                index:true,
                element:<TransactionManagement></TransactionManagement>
            },
           
            {
               path:'/dashboard',
               element:<FinancialDashboard></FinancialDashboard> 
            }
            
        ]
    },
    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:'/login',
                Component:Login
            },
            {
                path:'/register',
                Component:Register
            }
        ]
    }
])