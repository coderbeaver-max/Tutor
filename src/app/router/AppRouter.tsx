import {
    Routes,
    Route,
} from "react-router-dom";

import MainLayout from "@/app/layouts/MainLayout";

import ChatPage from "@/app/pages/ChatPage";

function AppRouter() {

    return (

        <Routes>

            <Route
                path="/"
                element={<MainLayout />}
            >

                <Route
                    index
                    element={<ChatPage />}
                />

            </Route>

        </Routes>

    );

}

export default AppRouter;