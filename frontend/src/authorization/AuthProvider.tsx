import { Auth0Provider, AppState } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: React.ReactNode
}


const AuthProvider = ({children} : AuthProviderProps) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
    };

    return (
    <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
        }}
        onRedirectCallback={onRedirectCallback}
    >
        {children}
    </Auth0Provider>
    );
}

export default AuthProvider;