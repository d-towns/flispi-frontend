import React from "react";

export const PageLoader = () => {
  const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

  return (
    <div className="loader">
      <img  className="w-1/4 h-1/4 m-auto my-20"src={loadingImg} alt="Loading..." />
    </div>
  );
};