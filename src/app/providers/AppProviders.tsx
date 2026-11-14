import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

type Props = {
    children: React.ReactNode;
};

function AppProviders({
    children,
}: Props) {

    return (

        <BrowserRouter>

            {children}

            <Toaster
                richColors
                position="top-right"
            />

        </BrowserRouter>

    );

}

export default AppProviders;