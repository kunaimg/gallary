import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("valid");
    if (!login) {
      navigate("/");
    }
  }, []);
  const { Com } = props;
  return (
    <div>
      <Com />
    </div>
  );
}

export default Protected;
