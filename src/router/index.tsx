import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "@/layout";

import App from "@/App";
import AI from "@/pages/ai";
import NFTs from "@/pages/nfts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/ai", element: <AI /> },
      { path: "/nfts", element: <NFTs /> },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
