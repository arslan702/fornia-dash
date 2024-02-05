import DashboardLayout from "@/layout/DashboardLayout";
import GeneralLayout from "@/layout/GeneralLayout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";
import { useState } from "react";
const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  if(router.pathname === "/"){
    return(
    <GeneralLayout>
    <Component {...pageProps}/>
    </GeneralLayout>
    )
      
  }
  else if(router.pathname === "/signUp"){
    return(
    <GeneralLayout>
    <Component {...pageProps}/>
    </GeneralLayout>
    )
      
  }
  else if(router.pathname === "/ForgotPassword"){
    return(
    <GeneralLayout>
    <Component {...pageProps}/>
    </GeneralLayout>
    )
      
  }
const [val,setVal]=useState("")

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout setVal={setVal}>
        <Component filterValue={val} {...pageProps} />
        <ReactQueryDevtools filterValue={val} initialIsOpen={false} />
      </DashboardLayout>
    </QueryClientProvider>
  );
};

export default App;
