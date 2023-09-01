import React, { useEffect, useState } from "react";
import budget from "../assets/budget.png";
const Home = () => {
  const [user, setuser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        setuser(json.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="carousel-inner">
        <div className="carousel-item active ">
          <h3
            style={{
              color: "Black",
              backgroundColor: "white",
              fontFamily: "Georgia, serif",
            }}
          >
            Hello {user}!
          </h3>

          <img
            src={budget}
            className=" d-block w-100 rounded mx-auto "
            alt=""
          />
          <br />
          <div className="carousel-caption d-none my-auto d-md-block">
            <br />
            <h1 className="bg-dark text-white text-xl my-3">
              Welcome To BudgetTrack
            </h1>
            <p style={{ color: "Black", backgroundColor: "white" }}>
              Manage your expense on cloud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
