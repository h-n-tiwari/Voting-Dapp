import "../styles/globals.css"

import type { AppProps } from "next/app";

// INTERNAL IMPORT
import { VotingProvider } from "@/context/voter";
import NavBar from "@/components/Navbar/navbar";


const MyApp = ({ Component, pageProps }: AppProps) => {
    <VotingProvider>
        <div>
            <NavBar />
            <div>
                <Component {...pageProps} />;
            </div>
        </div>
    </VotingProvider>;
    
};

export default MyApp;
