import React from "react";
import banner from "../assets/banner.jfif";
import { Link } from "react-router-dom";

//this is all about our landing page
const Landing = () => {
  return (
    <>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={banner}
              className=" d-block w-100 rounded mx-auto "
              alt=""
            />
            <div className="carousel-caption d-none my-auto d-md-block">
              <h1 className="bg-dark text-white text-xl">
                Welcome To BudgetTrack
              </h1>
              <p>Manage your expense on cloud.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={banner} className="d-block w-100" alt="" />
            <div className="carousel-caption d-none d-md-block">
              <h1 className="bg-dark text-white text-xl">Security Guarantee</h1>
              <p>Your privacy and expenses secured.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={banner} className=" d-block w-100" alt="" />
            <div className="carousel-caption d-none d-md-block">
              <h1 className="bg-dark text-white text-xl">Free to use</h1>
              <p>BudgetTrack is a free platform to manage your expenses.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom text-dark">
          Features of BudgetTrack
        </h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col mb-4">
            <h3 className="text-primary">Security Guarantee</h3>
            <p>
              We ensure that your expenses are highly secured in our database
              and you can safely access your account and expenses.
            </p>
            <Link to="/login" className="btn btn-warning">
              Login
            </Link>
          </div>
          <div className="feature col mb-4">
            <h3 className="text-primary">Expenses on the cloud</h3>
            <p>
              Your Expenses will be highly secured on the cloud and will be able
              to access them easily via your account login credentials.
            </p>
            <Link to="/signup" className="btn btn-warning">
              Sign Up
            </Link>
          </div>
          <div className="feature col mb-4">
            <h3 className="text-primary">Free to use</h3>
            <p>Create and Visualize your expenses without any charge.</p>
            <Link to="/signup" className="btn btn-warning icon-link">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
